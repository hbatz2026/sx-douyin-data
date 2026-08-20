// scripts/fetch-hotspots-actions.mjs — 全平台热搜候选抓取（GitHub Actions 运行）
// 背景：SCF（腾讯云数据中心出口）被 viki.moe 非抖音路径 / imsyy CDN / 快手官方 WAF 风控；
//       Actions runner 出口 IP 不受限，可抓全平台 → 写 Gitee data/hotspot-raw.json
//       → SCF hotspot-fetch 优先读该缓存（<12h）喂 AI 生成，回退 SCF 直连。
// 输出：data/hotspot-raw.json = { hot:[{platform,lane:'hot',word,heat,url}], music, form, search, fetchedAt }
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function get(url, opts = {}) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(opts.timeout || 8000), headers: { 'User-Agent': UA, ...(opts.headers || {}) } });
    if (!r.ok) return null;
    return opts.asText ? await r.text() : await r.json();
  } catch (e) { return null; }
}
function dedupe(list) {
  const seen = new Set(), out = [];
  for (const it of list) { const k = String(it.word || '').trim(); if (!k || seen.has(k)) continue; seen.add(k); out.push(it); }
  return out;
}

// 旧热点/过期话题过滤（v2.9.82）：剔除明显不是当日热榜的旧闻/旧梗，避免 AI 生成陈旧内容。
// 规则：① 历史台风名称（非当年编号台风）；② 过期节日（根据当前日期判断）；③ 明确旧年份；④ 已沉淀为长期老梗的地域/事件。
const STALE_KEYWORDS = [
  // 历史台风（2020-2024 已退场台风，非当年实时编号台风）
  '台风红霞','台风沙德尔','台风浪卡','台风莲花','台风海高斯','台风美莎克','台风海神','台风森拉克','台风黑格比','台风米克拉',
  // 老梗/旧事件
  '淄博烧烤','淄博博山菜','携程被罚','宋亚轩拍抖音','吃菌子自由','海底盾构机','卡顿滤镜',
];
const OLD_YEAR_RE = /20(1[5-9]|2[0-5])年/;
function isStaleHot(word) {
  const w = String(word || '');
  if (OLD_YEAR_RE.test(w)) return true;
  for (const kw of STALE_KEYWORDS) if (w.includes(kw)) return true;
  return false;
}
function filterStale(list) {
  return list.filter(x => !isStaleHot(x.word));
}

// 每平台一个抓取函数（含主源+兜底），失败返回 []
const SOURCES = [
  { platform: '抖音', fn: async () => {
      let j = await get('https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/');
      if (j && j.word_list) return j.word_list.map(x => ({ word: x.word, heat: String(x.hot_value || ''), url: 'https://www.douyin.com/search/' + encodeURIComponent(x.word) }));
      j = await get('https://60s.viki.moe/v2/douyin');
      return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.hot_value || ''), url: x.link || '' }));
  }},
  { platform: '微博', fn: async () => { const j = await get('https://60s.viki.moe/v2/weibo'); return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.hot_value || ''), url: x.link || '' })); }},
  { platform: '知乎', fn: async () => { const j = await get('https://60s.viki.moe/v2/zhihu'); return (j && j.data || []).map(x => ({ word: x.title, heat: '', url: x.link || '' })); }},
  { platform: '头条', fn: async () => {
      const j = await get('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc');
      if (j && j.data) return j.data.map(v => ({ word: v.Title, heat: String(v.HotValue || ''), url: 'https://www.toutiao.com/trending/' + v.ClusterIdStr + '/' }));
      const j2 = await get('https://60s.viki.moe/v2/toutiao');
      return (j2 && j2.data || []).map(x => ({ word: x.title, heat: String(x.hot_value || ''), url: x.link || '' }));
  }},
  { platform: '小红书', fn: async () => { const j = await get('https://60s.viki.moe/v2/rednote', { timeout: 15000 }); return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.score || ''), url: x.link || 'https://www.xiaohongshu.com/search_result?keyword=' + encodeURIComponent(x.title) })); }},
  { platform: 'B站', fn: async () => {
      let j = await get('https://60s.viki.moe/v2/bili', { timeout: 15000 });
      if (!j) j = await get('https://60s.viki.moe/v2/bili', { timeout: 15000 }); // 重试一次（viki 偶发）
      return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.hot_value || x.score || ''), url: x.link || '' }));
  }},
  { platform: '快手', fn: async () => {
      // 快手官方 GraphQL（Actions runner 出口相对友好）
      try {
        const res = await fetch('https://www.kuaishou.com/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': UA, 'Referer': 'https://www.kuaishou.com/hot-list', 'Origin': 'https://www.kuaishou.com' }, body: JSON.stringify({ operationName: 'hotListBoard', variables: {}, query: 'query hotListBoard { hotListBoard { list { id title hotValue hotType url } } }' }), signal: AbortSignal.timeout(8000) });
        if (res.ok) { const j2 = await res.json(); const list = (j2.data && j2.data.hotListBoard && j2.data.hotListBoard.list) || []; if (list.length) return list.map(x => ({ word: x.title, heat: String(x.hotValue || ''), url: x.url || 'https://www.kuaishou.com/search/video?searchKey=' + encodeURIComponent(x.title) })); }
      } catch (e) {}
      return [];
  }},
  { platform: '百度', fn: async () => {
      const html = await get('https://top.baidu.com/board?tab=realtime', { asText: true });
      if (!html) return [];
      const m = html.match(/<!--s-data:([\s\S]*?)-->/); if (!m) return [];
      let json; try { json = JSON.parse(m[1]); } catch (e) { return []; }
      const content = (json.data && json.data.cards && json.data.cards[0] && json.data.cards[0].content) || (json.cards && json.cards[0] && json.cards[0].content) || [];
      const list = Array.isArray(content[0] && content[0].content) ? content[0].content : content;
      return list.map(v => { const title = v.word ?? v.title ?? ''; const q = v.query ?? title; return { word: title, heat: (v.hotScore || v.hotTag || '').toString(), url: 'https://www.baidu.com/s?wd=' + encodeURIComponent(q) }; });
  }},
];

const results = await Promise.all(SOURCES.map(async s => {
  const items = await s.fn();
  return items.map(g => ({ platform: s.platform, lane: 'hot', word: g.word, heat: g.heat, url: g.url }));
}));

const flat = results.flat();
// music 源：imsyy CDN 已不可用（api-hot.imsyy.top 解析失败），改用 QQ音乐/网易云原生榜
// 抖音 aweme 音乐榜在 Actions runner 出口常被风控，SCF 端会补抓。
const music = [];
const musicSources = [
  { name: 'qq_toplist', url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?type=top&topid=26&song_begin=0&song_num=30&format=json', parse: j => (j.songlist || []).map(x => { const d = x.data || x; const name = d.songname || d.name || ''; const singer = (d.singer || []).map(a => a.name).join('/'); return { word: `${name} - ${singer}`, heat: '', url: '', songTitle: name, songAuthor: singer }; }) },
  { name: 'netease_toplist', url: 'https://music.163.com/api/playlist/detail?id=3778678', headers: { 'Referer': 'https://music.163.com/' }, parse: j => ((j.result && j.result.tracks) || []).map(x => ({ word: `${x.name} - ${(x.artists || []).map(a => a.name).join('/')}`, heat: '', url: '', songTitle: x.name, songAuthor: (x.artists || []).map(a => a.name).join('/') })) },
];
for (const src of musicSources) {
  if (music.length >= 20) break;
  try {
    const j = await get(src.url, { timeout: 15000, headers: src.headers || {} });
    const items = src.parse(j).slice(0, 20).map(x => ({ platform: '抖音音乐', lane: 'music', ...x }));
    if (items.length) {
      music.push(...items);
      console.log(`✅ music 源 ${src.name} 命中 ${items.length} 条`);
      break; // 主源成功即停，避免多源混杂
    }
    console.log(`⚠️ music 源 ${src.name} 空（${j ? '有返回' : '无返回'}）`);
  } catch (e) { console.log(`⚠️ music 源 ${src.name} 异常 ${e.message.slice(0, 50)}`); }
}
const form = [
  { platform: '形式库', lane: 'form', word: '卡点', heat: '', url: '', desc: '踩节奏剪辑，画面随鼓点切换', example: '京剧卡点：用戏曲鼓点切营业厅服务画面', difficulty: 1, needFace: false },
  { platform: '形式库', lane: 'form', word: '变装', heat: '', url: '', desc: '前后反差一键变身，常用于服务/形象展示', example: '工装→职业装变装，展示营业厅专业形象', difficulty: 1, needFace: true },
  { platform: '形式库', lane: 'form', word: '口播', heat: '', url: '', desc: '对着镜头讲干货，最稳的基础形式', example: '店员口播：宽带怎么选', difficulty: 0, needFace: true },
  { platform: '形式库', lane: 'form', word: '图文/一图流', heat: '', url: '', desc: '静态图+字幕滚动，适合政策/资费讲解', example: '一图看懂5G套餐区别', difficulty: 0, needFace: false },
  { platform: '形式库', lane: 'form', word: '对比测评', heat: '', url: '', desc: '前后/竞品对比，突出优势', example: '1000M vs 300M 实测', difficulty: 1, needFace: false },
  { platform: '形式库', lane: 'form', word: '剧情/情景剧', heat: '', url: '', desc: '小剧场演绎用户痛点', example: '顾客嫌套餐贵→店员算账反转', difficulty: 2, needFace: true },
  { platform: '形式库', lane: 'form', word: '探店/Vlog', heat: '', url: '', desc: '第一视角带看营业厅', example: '带你逛山西电信XX营业厅', difficulty: 1, needFace: true },
];
const search = ['换套餐怎么换', '宽带一年多少钱', '携号转网怎么办理', '流量不够用怎么办', 'IPTV怎么开通', '手机号不用了怎么注销', '5G套餐哪个划算', '营业厅上班时间', '电信和移动哪个信号好', '家里WiFi总卡顿', '老人机哪个好用', '学生手机推荐']
  .map(w => ({ platform: '百度', lane: 'search', word: w, heat: '', url: 'https://www.baidu.com/s?wd=' + encodeURIComponent(w), intent: '到店咨询' }));

const hotClean = filterStale(dedupe(flat));
const staleDropped = flat.length - hotClean.length;
const out = { hot: hotClean, music: dedupe(music), form, search, fetchedAt: new Date().toISOString(), staleDropped };
const byPlat = {};
hotClean.forEach(x => { byPlat[x.platform] = (byPlat[x.platform] || 0) + 1; });

const target = join(__dirname, '..', 'data', 'hotspot-raw.json');
writeFileSync(target, JSON.stringify(out, null, 2));
console.log('✅ hotspot-raw.json 生成:', JSON.stringify(byPlat), '| hot', out.hot.length, '| music', out.music.length, '| form', form.length, '| search', search.length);
