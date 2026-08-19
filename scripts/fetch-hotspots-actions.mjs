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
  { platform: '小红书', fn: async () => { const j = await get('https://60s.viki.moe/v2/rednote'); return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.score || ''), url: x.link || 'https://www.xiaohongshu.com/search_result?keyword=' + encodeURIComponent(x.title) })); }},
  { platform: 'B站', fn: async () => { const j = await get('https://60s.viki.moe/v2/bili'); return (j && j.data || []).map(x => ({ word: x.title, heat: String(x.hot_value || x.score || ''), url: x.link || '' })); }},
  { platform: '快手', fn: async () => {
      // 首选开源 DailyHotApi（imsyy）
      let j = await get('https://api-hot.imsyy.top/kuaishou');
      if (j && j.data) return j.data.map(x => ({ word: x.title, heat: String(x.hot || x.heat || ''), url: x.url || 'https://www.kuaishou.com/search/video?searchKey=' + encodeURIComponent(x.title) }));
      // 兜底：快手官方 GraphQL
      const r = await get('https://www.kuaishou.com/graphql', { headers: { 'Content-Type': 'application/json', 'Referer': 'https://www.kuaishou.com/hot-list' } });
      // GraphQL 需 POST，这里用 fetch 直发
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
const out = { hot: dedupe(flat), music: [], form: [], search: [], fetchedAt: new Date().toISOString() };
const byPlat = {};
flat.forEach(x => { byPlat[x.platform] = (byPlat[x.platform] || 0) + 1; });

const target = join(__dirname, '..', 'data', 'hotspot-raw.json');
writeFileSync(target, JSON.stringify(out, null, 2));
console.log('✅ hotspot-raw.json 生成:', JSON.stringify(byPlat), '| 总', out.hot.length, '条');
