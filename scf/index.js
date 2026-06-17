// SCF 云函数 - 抖本工坊云端自动化 v3
// 纯爬虫+模板匹配，配置驱动。无需 AI API，无需上传 zip 即可调整规则。
// 环境变量: GITEE_TOKEN, GITEE_USERNAME, DEPLOY_HOOK_URL
//
// 修改规则/选题/关键词：直接编辑 Gitee 上 config/*.json 即可，SCF 下次运行自动生效。
//
// 触发参数: {"mode":"hotspot"} / {"mode":"bgm"} / {"mode":"topics"}
// 更新时间: 2026-06-16

// ============================================================
// Module-level config cache (survives warm starts)
// ============================================================
let _configCache = {};

exports.main_handler = async (event, context) => {
  // SCF 定时触发器把 mode 放在 Message 字段，手动测试直接放 event.mode
  let mode = event.mode;
  if (!mode && typeof event.Message === 'string') {
    try { const msg = JSON.parse(event.Message); mode = msg.mode; } catch(e) {}
  }
  if (!mode) mode = 'hotspot';

  const ts = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(`[${ts()}] SCF v3 config-driven | mode=${mode}`);

  try {
    const giteeToken = process.env.GITEE_TOKEN;
    const giteeUser = process.env.GITEE_USERNAME || 'hbatz';
    if (!giteeToken) throw new Error('GITEE_TOKEN not set');

    const result = {};

    if (mode === 'hotspot') {
      result['data/hotspotData.js'] = await genHotspot(giteeToken, giteeUser);
    } else if (mode === 'bgm') {
      result['data/bgmList.js'] = await genBgm(giteeToken, giteeUser);
    } else if (mode === 'topics') {
      const { topics, t1 } = await genTopics(giteeToken, giteeUser);
      result['data/topicPool.js'] = topics;
      result['data/t1Presets.js'] = t1;
    } else {
      throw new Error('Unknown mode: ' + mode);
    }

    // Update files on Gitee
    const updated = [];
    for (const [filename, content] of Object.entries(result)) {
      await updateGiteeFile(filename, content, giteeToken, giteeUser);
      updated.push(filename);
      console.log(`[${ts()}] Updated: ${filename}`);
    }

    // Trigger EdgeOne Pages deploy
    const deployed = await triggerDeploy();
    if (deployed) console.log(`[${ts()}] EdgeOne deploy triggered`);

    return { success: true, mode, files: updated, deployed, timestamp: ts() };
  } catch (err) {
    console.error(`[${ts()}] ERROR: ${err.message}`);
    return { success: false, error: err.message, timestamp: ts() };
  }
};

// ============================================================
// Config loader — reads from Gitee, caches in memory
// ============================================================

async function getConfig(filename, token, user) {
  if (_configCache[filename]) return _configCache[filename];
  console.log(`Loading config: config/${filename}`);

  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filename)}`;
  const res = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error(`Config not found: ${filename} (${res.status})`);

  const data = await res.json();
  const raw = Buffer.from(data.content, 'base64').toString('utf-8');
  const parsed = JSON.parse(raw);
  _configCache[filename] = parsed;
  return parsed;
}

// ============================================================
// HOTSPOT: 爬取热搜 + 模板匹配 (category rules from config)
// ============================================================

async function genHotspot(token, user) {
  const today = new Date().toISOString().slice(0, 10);
  const trends = await fetchTrends();
  if (trends.length === 0) throw new Error('No trends fetched');

  console.log(`Fetched ${trends.length} trending topics`);

  const catConfig = await getConfig('config/categories.json', token, user);
  const rules = catConfig.rules;

  const entries = [];
  let idx = 0;
  for (const t of trends) {
    if (entries.length >= 7) break;
    const cat = matchCategory(t.title, rules);
    if (!cat) continue;
    const entry = buildEntry(cat, t, ++idx);
    if (entry) entries.push(entry);
  }

  console.log(`Generated ${entries.length} hotspot entries`);

  const js = entries.map(e => JSON.stringify(e, null, 2)).join(',\n');
  return `// Auto-generated: hotspot follow-shot data (config-driven)\n// Updated: ${today} · Source: 60s.viki.moe/v2/douyin\nwindow.___hotspotData = [\n${js}\n];\n`;
}

function matchCategory(title, rules) {
  for (const rule of rules) {
    if (rule.kw.some(k => title.includes(k))) return rule.cat;
  }
  return null;
}

async function fetchTrends() {
  // Primary: 60s API (free, no key)
  try {
    const res = await fetch('https://60s.viki.moe/v2/douyin', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(12000)
    });
    const json = await res.json();
    if (json.code === 200 && Array.isArray(json.data)) {
      console.log(`60s API: ${json.data.length} trends`);
      return json.data.map((item, i) => ({
        rank: i + 1,
        title: item.title,
        douyinUrl: item.link || `https://www.douyin.com/search/${encodeURIComponent(item.title)}?type=general`,
        hotValue: item.hot_value || 0
      }));
    }
  } catch (e) { console.error('60s API failed:', e.message); }

  // Fallback: hotflashnews.com
  try {
    console.log('Fallback: hotflashnews.com');
    const res = await fetchWithUA('https://hotflashnews.com/platform/douyin');
    const html = await res.text();
    const regex = /(\d+)\.\s*\[([^\]]+)\]\((https:\/\/www\.douyin\.com\/hot\/\d+)\)/g;
    let match; const topics = [];
    while ((match = regex.exec(html)) !== null) {
      topics.push({ rank: parseInt(match[1]), title: match[2].trim(), douyinUrl: match[3], hotValue: 0 });
    }
    if (topics.length > 0) { console.log(`Fallback: ${topics.length} trends`); return topics; }
  } catch (e) { console.error('Fallback failed:', e.message); }

  return [];
}

// ============================================================
// HOTSPOT TEMPLATES (static — rarely changes)
// ============================================================

const DANCE_BGM = ['Waka Waka - Shakira', '枪火 - 宝石Gem', '骄傲的少年 - 南征北战NZBZ', '为爱痴狂 - 金志文'];
const STORY_BGM = ['我记得 - 赵雷', '起风了 - 买辣椒也用券', '阴天 - 莫文蔚', '恋人 - 李荣浩'];
const HOLIDAY_BGM = ['踏遍青山 - 晨夕之家', '西厢寻他', '万江天色 - 刘珂矣'];
const SPORTS_BGM = ['Waka Waka - Shakira', '枪火 - 宝石Gem', '骄傲的少年 - 南征北战NZBZ'];
const SHOPPING_BGM = ['枪火 - 宝石Gem', '为爱痴狂 - 金志文', '左转灯 - 派伟俊'];

function buildEntry(cat, t, idx) {
  switch (cat) {
    case 'dance':
      return {
        id: `h${idx}`, tier: t.rank <= 10 ? 1 : t.rank <= 25 ? 2 : 3,
        title: `「${t.title}」营业厅版挑战`,
        heat: `抖音热搜#${t.rank} · 全民跟拍中`,
        why: `「${t.title}」当前抖音热搜第${t.rank}名，动作简单易学。穿工装在营业厅跳，电信蓝+舞蹈反差感拉满，完播率高。`,
        source: `https://www.douyin.com/search/${encodeURIComponent(t.title + '教程')}?type=general`,
        steps: [
          { shot: `手机架柜台，先搜"${t.title}"教程看一遍分解动作`, sub: `字幕：${t.title}挑战，电信营业员申请出战！` },
          { shot: '穿工装完整跟拍一遍，表情自信看镜头，节奏跟上BGM', sub: '关键：笑容灿烂、动作有力度、结尾比✌️' },
          { shot: '同事在旁边突然加入，两人相视而笑，镜头拉远看群魔乱舞', sub: `标签 #${t.title.replace(/[「」]/g,'')} #营业厅日常 #反差萌` }
        ],
        bgm: DANCE_BGM[Math.floor(Math.random() * DANCE_BGM.length)],
        tags: `#${t.title.replace(/[「」]/g,'')} #营业厅日常 #反差萌 #手势舞`,
        difficulty: 2, needFace: true, time: '15分钟'
      };
    case 'festival':
      return {
        id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
        title: `「${t.title}」营业厅送福篇`,
        heat: `抖音热搜#${t.rank} · 节日氛围正浓`,
        why: `「${t.title}」当前热搜第${t.rank}名，节日氛围拉满。拍营业厅节日服务/送福利短视频，温暖+正能量=高互动。`,
        source: `https://www.douyin.com/search/${encodeURIComponent(t.title + '营业厅')}?type=general`,
        steps: [
          { shot: '营业厅前台，手拿节日小礼品，微笑面对镜头', sub: `字幕：${t.title}，来营业厅就送！` },
          { shot: '给来办业务的客户送上节日祝福和小礼品，拍自然互动', sub: '动作轻柔自然，眼神温暖，BGM中国风' },
          { shot: '结尾大家一起亮出节日祝福手势/举杯，定格画面', sub: `标签 #${t.title.replace(/[「」]/g,'')} #营业厅温度 #节日快乐` }
        ],
        bgm: HOLIDAY_BGM[Math.floor(Math.random() * HOLIDAY_BGM.length)],
        tags: `#${t.title.replace(/[「」]/g,'')} #营业厅温度 #节日快乐 #传统节日`,
        difficulty: 1, needFace: true, time: '8分钟'
      };
    case 'sports':
      return {
        id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
        title: `「${t.title}」你家宽带能看4K吗？`,
        heat: `抖音热搜#${t.rank} · 体育赛事持续霸榜`,
        why: `「${t.title}」热搜第${t.rank}名，体育赛事实时关注度极高。在营业厅大屏前测速对比——同样看直播，不同宽带差距明显。`,
        source: `https://www.douyin.com/search/${encodeURIComponent('宽带测速')}?type=general`,
        steps: [
          { shot: '营业厅电视大屏播放体育赛事，手机同时拍摄画面', sub: '字幕：看球你最怕什么？——卡！' },
          { shot: '切100兆WiFi→画面卡顿出现缓冲圈，特写缓冲图标，字幕弹出"100兆"', sub: '字幕：100兆——球进了你还在缓冲' },
          { shot: '切1000兆→多台设备同时播放4K无缝流畅，字幕弹出"千兆FTTR"', sub: '标签 #宽带测速 #看球不卡 #世界杯 #营业厅实测' }
        ],
        bgm: SPORTS_BGM[Math.floor(Math.random() * SPORTS_BGM.length)],
        tags: '#宽带测速 #看球不卡 #营业厅实测 #FTTR', difficulty: 1, needFace: false, time: '8分钟'
      };
    case 'shopping':
      return {
        id: `h${idx}`, tier: 1,
        title: `「${t.title}」营业厅最后一波福利`,
        heat: `抖音热搜#${t.rank} · 大促倒计时`,
        why: `「${t.title}」热搜第${t.rank}名，购物需求集中爆发。电信营业厅天然适配——合约机直降、宽带新装优惠、以旧换新补贴叠加。`,
        source: `https://www.douyin.com/search/${encodeURIComponent('合约机优惠')}?type=general`,
        steps: [
          { shot: '营业厅柜台，一排合约机排开，特写价格标签（划线价→福利价）', sub: `字幕：${t.title}倒计时！营业厅这几款现在买最划算` },
          { shot: '分别举起三款手机对比：老人机→学生机→旗舰机，快速展示价格差', sub: '字幕：国家补贴+电信合约=省上加省' },
          { shot: '人像出镜竖手指倒计时：最后X天，来营业厅直接拿走', sub: '标签 #大促 #合约机 #以旧换新 #营业厅优惠' }
        ],
        bgm: SHOPPING_BGM[Math.floor(Math.random() * SHOPPING_BGM.length)],
        tags: '#大促 #合约机 #以旧换新 #宽带优惠 #倒计时', difficulty: 1, needFace: true, time: '10分钟'
      };
    case 'edu':
      return {
        id: `h${idx}`, tier: 2,
        title: `「${t.title}」你的套餐该换了`,
        heat: `抖音热搜#${t.rank} · 学生群体高度关注`,
        why: `「${t.title}」热搜第${t.rank}名。换号/换套餐/换手机三重需求集中。同样月租多出几十G流量。`,
        source: `https://www.douyin.com/search/${encodeURIComponent('套餐升级学生')}?type=general`,
        steps: [
          { shot: '手机屏幕录屏，打开电信App→我的套餐，特写月租和剩余流量', sub: `字幕：${t.title}，你的套餐该换了` },
          { shot: '手指滑到新套餐详情：同月租→流量翻倍+宽带+会员', sub: '字幕：评论报月租帮你看值不值' },
          { shot: '人像出镜表情从震惊到微笑：换完套餐省下来的钱够吃一个月食堂', sub: '标签 #套餐升级 #学生党福利 #省钱攻略' }
        ],
        bgm: STORY_BGM[Math.floor(Math.random() * STORY_BGM.length)],
        tags: '#套餐升级 #学生党福利 #省钱攻略 #开学季', difficulty: 1, needFace: true, time: '10分钟'
      };
    case 'tech':
      return {
        id: `h${idx}`, tier: t.rank <= 15 ? 1 : 2,
        title: `「${t.title}」跟电信有什么关系？`,
        heat: `抖音热搜#${t.rank} · 科技话题热门`,
        why: `「${t.title}」热搜第${t.rank}名。科技热点+电信天然绑定——5G网络、光纤宽带、智能家居，都能自然植入。知识科普型内容，收藏率高。`,
        source: `https://www.douyin.com/search/${encodeURIComponent(t.title + ' 5G')}?type=general`,
        steps: [
          { shot: '手机正对自己半身，表情认真：你知道XX跟电信有什么关系吗？', sub: `字幕：${t.title} · 幕后推手竟然是电信？` },
          { shot: '切换到营业厅设备展示：FTTR/千兆光猫/5G基站，逐一讲解', sub: '关键：用大白话讲，不要太专业，每点不超过15秒' },
          { shot: '结尾：下次来营业厅，我给你现场演示！', sub: '标签 #科技科普 #5G #宽带 #营业厅知识' }
        ],
        bgm: '骄傲的少年 - 南征北战NZBZ',
        tags: '#科技科普 #5G #宽带 #营业厅知识 #冷知识', difficulty: 1, needFace: true, time: '10分钟'
      };
    case 'lifestyle':
      return {
        id: `h${idx}`, tier: 2,
        title: `「${t.title}」营业厅的温暖瞬间`,
        heat: `抖音热搜#${t.rank} · 网友共鸣热议`,
        why: `「${t.title}」热搜第${t.rank}名，情绪共鸣型内容。1句字幕+1个表情+1段BGM=15秒完播率极高。`,
        source: `https://www.douyin.com/search/${encodeURIComponent('营业厅故事')}?type=general`,
        steps: [
          { shot: '手机正对半身，先面无表情看镜头2秒，然后突然抿嘴/笑/擦眼角', sub: `字幕：${t.title}，想起上次那个阿姨…` },
          { shot: '同事在旁边递纸巾，两人对视一笑', sub: '关键：不要演，想一件真正感动的小事，自然流露' },
          { shot: '画面定格+字幕弹出', sub: '标签 #营业厅故事 #感动瞬间 #服务行业 #温暖' }
        ],
        bgm: STORY_BGM[Math.floor(Math.random() * STORY_BGM.length)],
        tags: '#营业厅故事 #感动瞬间 #服务行业 #温暖', difficulty: 1, needFace: true, time: '5分钟'
      };
    case 'tvshow':
      return {
        id: `h${idx}`, tier: 2,
        title: `「${t.title}」追剧必备千兆宽带`,
        heat: `抖音热搜#${t.rank} · 全民追剧中`,
        why: `「${t.title}」热搜第${t.rank}名。新剧/新片全民追，4K画质需要好宽带。`,
        source: `https://www.douyin.com/search/${encodeURIComponent('追剧宽带')}?type=general`,
        steps: [
          { shot: '手机/电视播放新片预告，千兆WiFi下4K秒加载', sub: `字幕：${t.title}，4K追剧不卡顿的秘密` },
          { shot: '对比测试：普通套餐 vs 千兆套餐加载速度', sub: '字幕：评论区报兆数帮你看 #追剧必备 #千兆宽带' },
          { shot: '结尾展示FTTR设备：来营业厅升千兆，追剧不等待', sub: '标签 #追剧 #千兆宽带 #FTTR' }
        ],
        bgm: '恋人 - 李荣浩', tags: '#追剧必备 #千兆宽带 #FTTR #4K', difficulty: 1, needFace: false, time: '8分钟'
      };
    default: return null;
  }
}

// ============================================================
// BGM: 爬取酷狗 + 规则配置驱动
// ============================================================

async function genBgm(token, user) {
  const today = new Date().toISOString().slice(0, 10);
  let songs = [];

  try { songs = await fetchKugouRank(); }
  catch (e) { console.log('Kugou failed, using fallback:', e.message); }

  if (songs.length < 10) {
    const fb = await getConfig('config/bgm-fallback.json', token, user);
    songs = fb.songs;
  }

  console.log(`Got ${songs.length} songs`);

  const bgmRules = await getConfig('config/bgm-rules.json', token, user);
  const categorized = categorizeBgm(songs, bgmRules);

  const js = JSON.stringify(categorized, null, 2);
  return `// Auto-generated: BGM recommendations (config-driven)\n// Updated: ${today} · Source: kugou.com 飙升榜\nwindow.___bgmList = ${js};\n`;
}

async function fetchKugouRank() {
  const res = await fetchWithUA('https://www.kugou.com/yy/html/rank.html');
  const html = await res.text();
  const results = [];

  // Parse markdown-style: - **N**[Title\n    \- Artist](url)
  const titleRegex = /\*\*(\d+)\*\*\[([^\]]+)\]/g;
  let m;
  while ((m = titleRegex.exec(html)) !== null) {
    results.push({ rank: parseInt(m[1]), title: m[2], artist: '' });
  }
  const artistRegex = /\\\s*-\s*([^\]\n<]+)/g;
  const artists = [];
  while ((m = artistRegex.exec(html)) !== null) { artists.push(m[1].trim()); }
  for (let i = 0; i < Math.min(results.length, artists.length); i++) {
    results[i].artist = artists[i];
  }
  return results.filter(s => s.artist && s.artist.length > 0).slice(0, 30);
}

function categorizeBgm(songs, rules) {
  const fast = [], medium = [], slow = [];
  const fastKw = rules.fast || [];
  const slowKw = rules.slow || [];

  for (const s of songs) {
    const label = `${s.title} - ${s.artist}`;
    if (fastKw.some(k => s.title.includes(k) || (s.artist || '').includes(k))) { fast.push(label); }
    else if (slowKw.some(k => s.title.includes(k))) { slow.push(label); }
    else { medium.push(label); }
  }

  const pick = (arr, n) => arr.slice(0, Math.min(n, arr.length));
  const defaults = rules.defaultAssignments || {};

  function fill(key, subKey) {
    const def = defaults[key] && defaults[key][subKey];
    const mood = def ? def.mood : 'medium';
    const fb = def ? def.fallback : [];
    let pool;
    if (mood === 'fast') pool = fast;
    else if (mood === 'slow') pool = slow;
    else if (mood === 'none') return fb;
    else pool = medium;
    const picked = pick(pool, 3);
    return picked.length >= 3 ? picked : pick(fb, 3).length >= 3 ? pick(fb, 3) : fb;
  }

  const cats = ['决策指南', '一线场景', '深度测评', '本地事件', '直播'];
  const result = {};
  for (const cat of cats) {
    result[cat] = {};
    const subKeys = Object.keys(defaults[cat] || {});
    for (const sk of subKeys) {
      result[cat][sk] = fill(cat, sk);
    }
  }
  return result;
}

// ============================================================
// TOPICS: 选题库 + 季节规则 (config-driven)
// ============================================================

async function genTopics(token, user) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateStr = today.toISOString().slice(0, 10);

  // Load base topics from config
  const baseTopics = await getConfig('config/base-topics.json', token, user);

  // Load seasonal rules
  const seasonConfig = await getConfig('config/seasons.json', token, user);

  // Merge seasonal topics
  const merged = { ...baseTopics };
  delete merged._comment;

  for (const rule of seasonConfig.rules) {
    if (dateInRange(rule.match, month, day)) {
      for (const [key, vals] of Object.entries(rule.topics)) {
        if (merged[key]) {
          merged[key] = [...vals, ...merged[key]].slice(0, 24);
        }
      }
    }
  }

  // T1 presets
  const t1 = getT1Presets(month, day);

  return {
    topics: `// Auto-generated: topic pool (config-driven)\n// Updated: ${dateStr}\nwindow.___topicPool = ${JSON.stringify(merged, null, 2)};\n`,
    t1: `// Auto-generated: T1 decision guide presets\n// Updated: ${dateStr}\nwindow.___t1Presets = ${JSON.stringify(t1, null, 2)};\n`
  };
}

function dateInRange(range, month, day) {
  try {
    const [start, end] = range.split('~');
    const [sm, sd] = start.split('-').map(Number);
    const [em, ed] = end.split('-').map(Number);
    const val = month * 100 + day;
    const sv = sm * 100 + sd;
    const ev = em * 100 + ed;
    return val >= sv && val <= ev;
  } catch (e) { return false; }
}

function getT1Presets(month, day) {
  const base = {
    "宽带选多少兆": {
      "100M 够用党": "日常刷视频+微信，一个人住，预算有限。100M看1080P流畅，4K勉强。适合租房党、老年人。",
      "300M 性价比": "2-3人家庭，同时看视频+打游戏+上网课。300M不卡顿有余量，月费多10几块体验翻倍。",
      "1000M 一步到位": "4人以上家庭/智能家居多/游戏直播。千兆+FTTR全屋覆盖，每个房间跑满。多花30块用3年不后悔。"
    },
    "合约机还是裸机": {
      "合约机(月付)": "首付低(0-500)，月租含话费+流量+宽带。3年总花费比裸机少500-1500元。",
      "裸机(全款)": "一次付清，自由换套餐。适合已经有满意套餐不想被绑定的。",
      "以旧换新": "旧手机折价+电信补贴=新机半价。适合手上有旧机想升级的。"
    },
    "套餐怎么选": {
      "流量党": "月流量>30G，看直播/刷视频/导航/外卖→选大流量套餐(59-99元档)。",
      "通话党": "月通话>300分钟，工作电话多/家里老人→选含通话套餐(39-59元档)。",
      "全家桶": "2-4人共用→融合套餐(99-199元档)。3张副卡+宽带+IPTV，人均30-50元。"
    }
  };

  if (month === 6 && day <= 18) {
    base["618该不该入手"] = {
      "618营业厅买": "合约机直降+国家补贴+送宽带，三重叠加比线上便宜。到店可上手真机对比。",
      "618线上买": "线上选择多对比方便，但看不到真机且不能办合约。纯买裸机线上更灵活。",
      "不等了先办": "早买早享受，618后可能恢复原价。先到营业厅看看有合适的直接拿走。"
    };
  }
  return base;
}

// ============================================================
// UTILS
// ============================================================

async function triggerDeploy() {
  const hookUrl = process.env.DEPLOY_HOOK_URL;
  if (!hookUrl) { console.log('No DEPLOY_HOOK_URL'); return false; }
  try {
    const res = await fetch(hookUrl, { method: 'POST', signal: AbortSignal.timeout(30000) });
    console.log(`Deploy hook: ${res.status}`);
    return res.ok || res.status < 400;
  } catch (e) { console.error('Deploy hook failed:', e.message); return false; }
}

async function updateGiteeFile(filePath, content, token, user) {
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filePath)}`;
  const getRes = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` }
  });
  const fileInfo = await getRes.json();
  if (!fileInfo.sha) throw new Error(`Cannot get SHA for ${filePath}: ${JSON.stringify(fileInfo)}`);

  const updateRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      sha: fileInfo.sha,
      message: `auto(${new Date().toISOString().slice(0,10)}): update ${filePath.split('/').pop()}`,
      branch: 'master'
    })
  });
  if (!updateRes.ok) {
    const errText = await updateRes.text();
    throw new Error(`Gitee API ${updateRes.status}: ${errText}`);
  }
}

function fetchWithUA(url) {
  return fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' },
    signal: AbortSignal.timeout(15000)
  });
}
