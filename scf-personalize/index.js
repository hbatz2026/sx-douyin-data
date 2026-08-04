// SCF Web函数 — 抖本个性化脚本API
// 环境变量: GITEE_TOKEN, GITEE_USERNAME, SILICONFLOW_API_KEY
// 部署: v=2026-07-21 (BUNDLED_TIMESTAMP 自更新机制)
// 注意：BUNDLED_TS 由 push-scf-web.mjs 在推送时替换为实际时间戳
//      本地开发永远写 0，push-scf-web.mjs 自动注入时间戳
const BUNDLED_TS = 1785564338118;

const CACHE_VER = 'v21'; // BUNDLED_TIMESTAMP 自更新机制

const http = require('http');

let _configCache = {};
let _selfShaCheck = 0;
const SELF_SHA_INTERVAL = 30000; // 每30秒检查一次Gitee是否有新版本

// 自更新检查：每30秒查一次 Gitee 版本号，
// 检测到新版本后调用 SCF API 部署，无需等冷启动
// v2026-07-21: 改用 BUNDLED_TIMESTAMP 机制
//   首次运行时比较 BUNDLED_TS（打包时注入）和 Gitee version.txt
//   不同就触发 SCF API 自动部署，部署后新请求直接走新版本
async function maybeSelfUpdate() {
  const now = Date.now();
  if (now - _selfShaCheck < SELF_SHA_INTERVAL) return;
  _selfShaCheck = now;
  
  const token = process.env.GITEE_TOKEN;
  if (!token) return;
  
  try {
    // 从 Gitee 读取版本文件（小文件，快速拉取）
    const vRes = await fetch(
      'https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/scf-personalize/version.txt?ref=master',
      { headers: { 'Authorization': 'token ' + token }, signal: AbortSignal.timeout(3000) }
    );
    if (!vRes.ok) return;
    const vData = await vRes.json();
    const remoteVer = Buffer.from(vData.content, 'base64').toString('utf-8').trim();
    if (!remoteVer) return;
    
    // 确定本地版本：首次运行时用 BUNDLED_TS（代码里硬编码的），之后用 memory 里的
    const localVer = (typeof global._localVer !== 'undefined')
      ? global._localVer
      : String(BUNDLED_TS);
    
    // 首次运行：只是记录版本，不触发部署（因为刚部署完，版本应该一致）
    if (typeof global._localVer === 'undefined') {
      global._localVer = localVer;
      if (remoteVer !== localVer) {
        console.log('[selfUpdate] First run: bundled v' + localVer + ' vs gitee v' + remoteVer + ' — will redeploy');
        // 首次运行发现版本不一致 → 说明这是旧代码，需要更新
      } else {
        return; // 版本一致，无需操作
      }
    }
    
    if (remoteVer !== localVer) {
      global._localVer = remoteVer;
      console.log('[selfUpdate] Version change detected: ' + localVer + ' → ' + remoteVer);
      
      // 拉取 Gitee 最新代码
      const codeRes = await fetch(
        'https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/scf-personalize/index.js?ref=master',
        { headers: { 'Authorization': 'token ' + token }, signal: AbortSignal.timeout(5000) }
      );
      if (!codeRes.ok) { console.log('[selfUpdate] Code fetch failed: ' + codeRes.status); return; }
      const codeData = await codeRes.json();
      const code = Buffer.from(codeData.content, 'base64').toString('utf-8');
      if (!code) { console.log('[selfUpdate] Empty code'); return; }
      
      // 用 CAM 凭证调 SCF API 自部署：拉取完整 scf-personalize 目录（index.js + loader.js
      // + scf_bootstrap + version.txt）多文件打包，避免单文件 index.js 部署打坏 Web 函数。
      const secretId = process.env.TENCENTCLOUD_SECRETID;
      const secretKey = process.env.TENCENTCLOUD_SECRETKEY;
      const sessionToken = process.env.TENCENTCLOUD_SESSIONTOKEN;
      if (secretId && secretKey) {
        try {
          const FILES = ['index.js', 'loader.js', 'scf_bootstrap', 'version.txt'];
          const fetched = await Promise.all(FILES.map(async (f) => {
            const r = await fetch(`https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/scf-personalize/${f}?ref=master`, {
              headers: { 'Authorization': 'token ' + token }, signal: AbortSignal.timeout(5000)
            });
            if (!r.ok) throw new Error('fetch ' + f + ' ' + r.status);
            const d = await r.json();
            return { name: f, content: Buffer.from(d.content, 'base64').toString('utf-8') };
          }));
          const zip = buildSelfZipMulti(fetched);
          console.log('[selfUpdate] Deploying full bundle via SCF API (files=' + fetched.length + ', size=' + zip.length + ')...');
          const result = await callSCFApi('UpdateFunctionCode', {
            FunctionName: 'douyin-personalize',
            Handler: 'index.main_handler',
            ZipFile: zip.toString('base64')
          }, secretId, secretKey, sessionToken);
          console.log('[selfUpdate] Deploy result: ' + result.status + ' ' + (result.body || '').slice(0, 100));
        } catch (se) {
          console.log('[selfUpdate] Deploy failed: ' + se.message);
        }
      } else {
        console.log('[selfUpdate] No CAM credentials — cannot auto-deploy. 请在腾讯云SCF控制台为函数配置 SCF_FullAccess 权限策略，或等待冷启动自动拉取。');
      }
    }
  } catch(e) {
    // 静默失败，下次再试
    console.log('[selfUpdate] Check failed: ' + (e.message || e));
  }
}

function buildSelfZip(filename, content) {
  const zlib = require('zlib');
  const compressed = zlib.deflateRawSync(Buffer.from(content, 'utf-8'));
  const name = Buffer.from(filename, 'utf-8');
  let crc = 0xFFFFFFFF;
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  const buf = Buffer.from(content, 'utf-8');
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  crc = (crc ^ 0xFFFFFFFF) >>> 0;
  const lh = Buffer.alloc(30 + name.length);
  lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
  lh.writeUInt16LE(8, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12);
  lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(compressed.length, 18); lh.writeUInt32LE(buf.length, 22);
  lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28); name.copy(lh, 30);
  const ch = Buffer.alloc(46 + name.length);
  ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
  ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14);
  ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(compressed.length, 20); ch.writeUInt32LE(buf.length, 24);
  ch.writeUInt16LE(name.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
  ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38); ch.writeUInt32LE(0, 42);
  name.copy(ch, 46);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(1, 8); eocd.writeUInt16LE(1, 10);
  eocd.writeUInt32LE(70 + name.length, 12); eocd.writeUInt32LE(0, 16); eocd.writeUInt16LE(0, 20);
  return Buffer.concat([lh, compressed, ch, eocd]);
}

// 多文件打包（用于自更新安全部署 Web 函数：必须含 loader.js + scf_bootstrap + version.txt，
// 否则单文件 index.js 部署会让 Web 函数因缺 loader 而 UpdateFailed）。
function buildSelfZipMulti(files) {
  const zlib = require('zlib');
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) { let c = i; for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); table[i] = c; }
  function crc32(buf) { let crc = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8); return (crc ^ 0xFFFFFFFF) >>> 0; }
  const parts = []; const central = []; let offset = 0;
  for (const f of files) {
    const nameBuf = Buffer.from(f.name, 'utf-8');
    const contentBuf = Buffer.from(f.content, 'utf-8');
    const compressed = zlib.deflateRawSync(contentBuf);
    const crc = crc32(contentBuf);
    const lh = Buffer.alloc(30 + nameBuf.length);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(8, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(compressed.length, 18); lh.writeUInt32LE(contentBuf.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26); lh.writeUInt16LE(0, 28); nameBuf.copy(lh, 30);
    parts.push(lh, compressed);
    const ch = Buffer.alloc(46 + nameBuf.length);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(compressed.length, 20); ch.writeUInt32LE(contentBuf.length, 24);
    ch.writeUInt16LE(nameBuf.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38); ch.writeUInt32LE(0, 42);
    nameBuf.copy(ch, 46);
    central.push(ch);
    offset += lh.length + compressed.length;
  }
  const centralBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8); eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12); eocd.writeUInt32LE(offset, 16); eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...parts, centralBuf, eocd]);
}

// 调用腾讯云 SCF API
async function callSCFApi(action, params, secretId, secretKey, sessionToken) {
  const crypto = require('crypto');
  const endpoint = 'scf.tencentcloudapi.com';
  const version = '2018-04-16';
  const region = 'ap-guangzhou';
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify(params);
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const service = 'scf';
  const credentialScope = date + '/' + service + '/tc3_request';
  const canonicalRequest = 'POST\n/\n\ncontent-type:application/json\nhost:' + endpoint + '\n\ncontent-type;host\n' + payloadHash;
  const stringToSign = 'TC3-HMAC-SHA256\n' + timestamp + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  function hmac(k, s) { return crypto.createHmac('sha256', k).update(s).digest(); }
  const secretDate = hmac('TC3' + secretKey, date);
  const secretService = hmac(secretDate, service);
  const secretSigning = hmac(secretService, 'tc3_request');
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex');
  const auth = 'TC3-HMAC-SHA256 Credential=' + secretId + '/' + credentialScope + ', SignedHeaders=content-type;host, Signature=' + signature;
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: endpoint, port: 443, path: '/', method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Host': endpoint,
        'X-TC-Action': action, 'X-TC-Version': version, 'X-TC-Region': region,
        'X-TC-Timestamp': timestamp.toString(), 'X-TC-Token': sessionToken || '',
        'Authorization': auth
      }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ============================================================
// 热点跟拍 —— 真实多平台抓取 + tbnx 生成（mode: 'hotspot-fetch'）
// 2026-08-01: 移植 scripts/fetch-hotspots.mjs (4 lane) 与
// scripts/gen-hotspot-scripts.mjs (生成 schema) 的逻辑到 SCF 内联。
// 原因：SCF 自更新仅部署 index.js（不打包 .mjs），且 SCF 在腾讯云内
// 可直连国内热搜/音乐 API（开发沙箱不可达）。
// 合规清洗复用下方 sanitizeHardBan/sanitizeStance/sanitize100M；
// AI 调用复用 callSiliconFlow（已含 toAsciiJson + 清洗）。
// ============================================================

const HS_TIMEOUT = 8000;
async function hsFetch(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeout || HS_TIMEOUT);
  try {
    const r = await fetch(url, {
      signal: ctrl.signal,
      headers: Object.assign({ 'User-Agent': 'Mozilla/5.0' }, opts.headers || {})
    });
    if (!r.ok) return null;
    return opts.asText ? await r.text() : await r.json();
  } catch (e) { return null; }
  finally { clearTimeout(t); }
}
async function hsFetchJson(url, parse, opts) {
  const raw = await hsFetch(url, opts);
  if (raw == null) return [];
  try { return (parse(raw) || []).filter(x => x && x.word).slice(0, 20); }
  catch (e) { return []; }
}

// 话题热搜：原生上游优先（移植 DailyHotApi），第三方聚合兜底
const HS_TREND_SOURCES = [
  { platform: '抖音', candidates: [
    { url: 'https://api.vvhan.com/api/hotlist/douyin', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
    { url: 'https://www.oioweb.cn/api/v1/douyin/hot', parse: j => (j.data||j.list||[]).map(x => ({ word: x.title||x.word, heat: x.hot||x.num||'', url: x.url||'' })) },
  ]},
  { platform: '微博', candidates: [
    { url: 'https://weibo.com/ajax/side/hotSearch', parse: j => ((j.data&&j.data.realtime)||[]).map(x => ({ word: x.word||x.word_scheme, heat: x.num||'', url: 'https://s.weibo.com/weibo?q='+encodeURIComponent(x.word||x.word_scheme) })) },
    { url: 'https://tenapi.cn/v2/weibohot', parse: j => (j.data||j.list||[]).map(x => ({ word: x.word||x.title, heat: x.hot||x.num||'', url: x.url||'' })) },
  ]},
  { platform: '百度', candidates: [
    { url: 'https://top.baidu.com/board?tab=realtime', asText: true, parse: html => {
      const m = html.match(/<!--s-data:([\s\S]*?)-->/); if (!m) return [];
      let json; try { json = JSON.parse(m[1]); } catch(e) { return []; }
      const content = json.data?.cards?.[0]?.content ?? json.cards?.[0]?.content ?? [];
      const list = Array.isArray(content[0]?.content) ? content[0].content : content;
      return list.map(v => { const title = v.word ?? v.title ?? ''; const q = v.query ?? title;
        return { word: title, heat: (v.hotScore||v.hotTag||'').toString(), url: 'https://www.baidu.com/s?wd='+encodeURIComponent(q) }; });
    }},
    { url: 'https://api.vvhan.com/api/hotlist/baidu', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
  ]},
  { platform: '知乎', candidates: [
    { url: 'https://api.vvhan.com/api/hotlist/zhihu', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
    { url: 'https://api.zhihu.com/topstory/hot-lists/total?limit=50', parse: j => (j.data||[]).map(v => ({ word: v.target?.title, heat: (parseFloat((v.detail_text||'').split(' ')[0])*10000)||'', url: v.target?.url||'' })) },
  ]},
  { platform: '头条', candidates: [
    { url: 'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc', parse: j => (j.data||[]).map(v => ({ word: v.Title, heat: v.HotValue||'', url: 'https://www.toutiao.com/trending/'+v.ClusterIdStr+'/' })) },
    { url: 'https://api.vvhan.com/api/hotlist/toutiao', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
  ]},
  { platform: '快手', candidates: [
    { url: 'https://api.vvhan.com/api/hotlist/kuaishou', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
  ]},
  { platform: 'B站', candidates: [
    { url: 'https://api.vvhan.com/api/hotlist/bilibili', parse: j => (j.data||[]).map(x => ({ word: x.title||x.word, heat: x.hot||'', url: x.url||'' })) },
  ]},
];
const HS_XIAOHONGSHU = ['多巴胺穿搭','Citywalk','职场穿搭','减脂餐打卡','周末露营','手机摄影技巧','租房改造','副业搞钱']
  .map(w => ({ word: w, heat: '', url: 'https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(w) }));

// 热门 BGM：抖音音乐榜（移植 douyin-hot-hub）+ 酷狗/网易云兜底
const HS_MUSIC_SOURCES = [
  { platform: '抖音音乐', candidates: [
    { url: 'https://aweme.snssdk.com/aweme/v1/chart/music/list/?chart_id=6853972723954146568&count=50&device_platform=android&version_name=13.2.0&version_code=130200&aid=1128',
      headers: { 'user-agent': 'okhttp/3.13.1', 'Referer': 'https://www.douyin.com/' },
      parse: j => (j.music_list||[]).map(it => { const m = it.music_info||{};
        const play = (m.play_url&&(m.play_url.url_list||[])[0])||'';
        const title = m.title||m.matched_song?.title||''; const author = m.author||m.owner_nickname||'';
        return { word: `${title} - ${author}`, heat: (m.user_count||it.heat||'').toString(), url: play, songTitle: title, songAuthor: author };
      }) },
    { url: 'https://mobilecdn.kugou.com/api/v3/rank/song?ranktype=2&rankid=8888&page=1&pagesize=30',
      parse: j => (j.data?.info||[]).map(x => ({ word: `${x.songname} - ${x.singername}`, heat:'', url:'', songTitle: x.songname, songAuthor: x.singername })) },
    { url: 'https://music.163.com/api/v1/discovery/recommend/songs', headers: { 'Referer': 'https://music.163.com/' },
      parse: j => (j.recommend||[]).map(x => { const s = x.song||x; return { word: `${s.name} - ${(s.artists||[]).map(a=>a.name).join('/')}`, heat:'', url:'', songTitle: s.name, songAuthor: (s.artists||[]).map(a=>a.name).join('/') }; }) },
  ]},
];

// 短视频形式库（14 种）
const HS_FORM_LIBRARY = [
  { word:'卡点', desc:'踩节奏剪辑，画面随鼓点切换', example:'京剧卡点：用戏曲鼓点切营业厅服务画面', difficulty:1, needFace:false, type:'form' },
  { word:'变装', desc:'前后反差一键变身，常用于服务/形象展示', example:'工装→职业装变装，展示营业厅专业形象', difficulty:1, needFace:true, type:'form' },
  { word:'转场', desc:'丝滑转场串联多个场景', example:'从喧闹街景转场到安静营业厅', difficulty:2, needFace:false, type:'form' },
  { word:'图文/一图流', desc:'静态图+字幕滚动，适合政策/资费讲解', example:'一图看懂5G套餐区别', difficulty:0, needFace:false, type:'form' },
  { word:'口播', desc:'对着镜头讲干货，最稳的基础形式', example:'店员口播：宽带怎么选', difficulty:0, needFace:true, type:'form' },
  { word:'剧情/情景剧', desc:'小剧场演绎用户痛点', example:'顾客嫌套餐贵→店员算账反转', difficulty:2, needFace:true, type:'form' },
  { word:'探店/Vlog', desc:'第一视角带看营业厅', example:'带你逛山西电信XX营业厅', difficulty:1, needFace:true, type:'form' },
  { word:'才艺/手势舞', desc:'结合业务跳热门手势舞', example:'套餐手势舞', difficulty:1, needFace:true, type:'form' },
  { word:'混剪', desc:'多素材快剪，信息密度高', example:'一周服务高光混剪', difficulty:1, needFace:false, type:'form' },
  { word:'定格/逐帧', desc:'逐帧定格做出趣味效果', example:'资费数字定格跳动', difficulty:2, needFace:false, type:'form' },
  { word:'对比测评', desc:'前后/竞品对比，突出优势', example:'1000M vs 300M 实测', difficulty:1, needFace:false, type:'form' },
  { word:'采访/街访', desc:'街访或顾客真实反馈', example:'随机问：你流量够用吗', difficulty:1, needFace:true, type:'form' },
  { word:'挑战赛跟拍', desc:'跟抖音官方/品牌挑战', example:'#电信服务挑战', difficulty:1, needFace:true, type:'form' },
  { word:'京剧/国风混搭', desc:'戏曲/国风元素+现代业务，文化反差', example:'京剧卡点讲5G，国风营业厅', difficulty:2, needFace:false, type:'form' },
];

// 搜索截流词库（12 条高意图）
const HS_SEARCH_KEYWORDS = ['换套餐怎么换','宽带一年多少钱','携号转网怎么办理','流量不够用怎么办','IPTV怎么开通','手机号不用了怎么注销','5G套餐哪个划算','营业厅上班时间','电信和移动哪个信号好','家里WiFi总卡顿','老人机哪个好用','学生手机推荐']
  .map(w => ({ word: w, intent: '到店咨询', url: 'https://www.baidu.com/s?wd='+encodeURIComponent(w) }));

function hsDedupe(list) {
  const seen = new Set(); const out = [];
  for (const it of list) { const k = String(it.word||'').trim(); if (!k||seen.has(k)) continue; seen.add(k); out.push(it); }
  return out;
}
function hsSanitize(t) { return sanitize100M(sanitizeStance(sanitizeHardBan(t || ''))); }

async function fetchAllHotspotsSCF() {
  // 并行抓取各平台热搜（每个平台内部 candidates 并行取第一个成功）
  const hotTasks = HS_TREND_SOURCES.map(async src => {
    const results = await Promise.all(src.candidates.map(c => hsFetchJson(c.url, c.parse, { headers: c.headers||{}, asText: !!c.asText, timeout: 6000 })));
    const got = results.find(r => r && r.length) || [];
    return got.map(g => ({ platform: src.platform, lane:'hot', word: g.word, heat: g.heat, url: g.url }));
  });
  const hot = (await Promise.all(hotTasks)).flat().concat(HS_XIAOHONGSHU.map(t => ({ platform:'小红书', lane:'hot', word: t.word, heat: t.heat, url: t.url })));

  // 并行抓取音乐榜
  const musicTasks = HS_MUSIC_SOURCES.map(async src => {
    const results = await Promise.all(src.candidates.map(c => hsFetchJson(c.url, c.parse, { headers: c.headers||{}, asText: !!c.asText, timeout: 6000 })));
    const got = results.find(r => r && r.length) || [];
    return got.map(g => ({ platform: src.platform, lane:'music', word: g.word, heat: g.heat, url: g.url||'', songTitle: g.songTitle||'', songAuthor: g.songAuthor||'' }));
  });
  const music = (await Promise.all(musicTasks)).flat();

  const form = HS_FORM_LIBRARY.map(f => ({ platform:'形式库', lane:'form', word:f.word, heat:'', url:'', desc:f.desc, example:f.example, difficulty:f.difficulty, needFace:f.needFace }));
  const search = HS_SEARCH_KEYWORDS.map(k => ({ platform:'百度', lane:'search', word:k.word, heat:'', url:k.url, intent:k.intent }));
  return { hot: hsDedupe(hot), music: hsDedupe(music), form, search, fetchedAt: new Date().toISOString() };
}

function buildHotspotMessages(cands) {
  const hot = cands.hot.slice(0,20).map(c => `[${c.platform}热点] ${c.word}${c.heat?(' 热度'+c.heat):''}`).join('\n');
  const music = cands.music.slice(0,10).map(c => `[抖音热门BGM] ${c.songTitle||c.word}${c.songAuthor?(' - '+c.songAuthor):''}${c.heat?(' 使用量'+c.heat):''}`).join('\n');
  const form = cands.form.slice(0,8).map(c => `[短视频形式] ${c.word}：${c.desc}（示例：${c.example}）难度${c.difficulty}`).join('\n');
  const search = cands.search.slice(0,10).map(c => `[${c.platform}搜索截流] ${c.word} → 意图:${c.intent}`).join('\n');
  const system = `You are a senior short-video script editor for a China Telecom (Shanxi) retail store. Pick the most store-relevant trending topics, hot BGM, and video FORMS, then adapt them into compliant, ready-to-shoot Douyin short-video scripts that ride traffic WITHOUT violating platform rules.

Strict rules:
1. Speak as the store clerk, objective, helpful. Never attack any carrier. Never use banned words: 合约/话费/号卡/流量卡/月租/资费/办卡/0元购/免费领卡/套路/割韭菜/智商税 — replace with compliant phrasing.
2. Home broadband tiers in Shanxi are only 300M/500M/1000M/FTTR. NEVER output 100M/100兆.
3. Each script must include a clear on-screen CTA driving to the store. No hard-sell.
4. Every script MUST set "form" to ONE short-video form from the form library, and "bgm" to a concrete hot song (prefer from the 抖音热门BGM list, format "歌名 - 作者"; if none fits, suggest a fitting style).
5. Output ONLY a JSON array. No markdown, no commentary.

JSON schema (one object per script):
{
  "lane": "hot"|"music"|"form"|"search",
  "platform": "抖音|微博|百度|小红书|知乎|头条|快手|B站|抖音音乐|形式库",
  "tier": 1|2|3,
  "title": "script title",
  "heat": "heat text",
  "why": "why fits a telecom store",
  "sourceWord": "original topic/keyword/song/form",
  "sourceUrl": "original url",
  "form": "short-video form from the form library",
  "formTip": "how to execute this form for the store",
  "steps": [
    {"shot":"第1步画面动作（15-25字）","sub":"第1步屏幕字幕/关键信息（15-25字）","duration":"3-5秒"},
    {"shot":"第2步画面动作（15-25字）","sub":"第2步屏幕字幕/关键信息（15-25字）","duration":"3-5秒"},
    {"shot":"第3步画面动作（15-25字）","sub":"第3步屏幕字幕/关键信息（15-25字）","duration":"3-5秒"},
    {"shot":"第4步画面动作（15-25字）","sub":"第4步屏幕字幕/关键信息（15-25字）","duration":"3-5秒"}
  ],
  "voice": ["第1步口播逐字稿（营业员可照念）","第2步口播逐字稿","第3步口播逐字稿","第4步口播逐字稿"],
  "loop": "comment-zone guidance CTA",
  "tip": "shooting tip",
  "bgm": "concrete hot BGM (歌名 - 作者) or style",
  "musicUrl": "bgm play url if from music list, else empty",
  "tags": "#tag1 #tag2",
  "difficulty": 0|1|2,
  "needFace": true|false,
  "time": "duration/effort",
  "schedule": "suggested publish day + timeliness"
}`;
  const user = `以下是今日多平台候选（话题热点 + 热门BGM + 短视频形式 + 搜索截流）。
请严格按以下要求生成：总数 4 条脚本，覆盖话题热点(hot)和搜索截流(search)两类；每条脚本必须包含 4 个 steps，每个 step 必须包含 shot（画面动作，15-25字）、sub（屏幕字幕/关键信息，15-25字）、duration（建议时长，如"3-5秒"）；每条脚本必须包含 4 句 voice 口播逐字稿，与 4 个 steps 严格一一对应，营业员拿到可直接照念；必须包含 formTip（这种形式怎么拍最出彩）、tip（1条具体拍摄建议）、loop（1句诱导互动的问题）、bgm（具体热门歌名-作者）。务必完整输出 JSON 数组，不要被截断。

【话题热点候选】
${hot}

【抖音热门BGM候选（优先从这里选 bgm）】
${music}

【短视频形式库（每条必须选一个 form）】
${form}

【搜索截流候选】
${search}

请直接输出 JSON 数组，严格按上面 schema。口播逐字稿(voice)要口语化、可照念；步骤(steps)与逐字稿一一对应；评论引导(loop)要带一个问题诱导互动；formTip 写清这种形式怎么拍最出彩。`;
  return { system, user };
}

// 从 AI 返回文本中提取 JSON 数组：优先完整 parse，其次截取 [] 范围，再尝试匹配对象列表
function extractJsonArray(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch(e) {}
  // 截取第一个 [ 到最后一个 ]
  const bStart = text.indexOf('[');
  const bEnd = text.lastIndexOf(']');
  if (bStart !== -1 && bEnd !== -1 && bEnd > bStart) {
    try { return JSON.parse(text.slice(bStart, bEnd + 1)); } catch(e) {}
  }
  // 截取第一个 { 到最后一个 }，尝试对象数组
  const oStart = text.indexOf('{');
  const oEnd = text.lastIndexOf('}');
  if (oStart !== -1 && oEnd !== -1 && oEnd > oStart) {
    try { return [JSON.parse(text.slice(oStart, oEnd + 1))]; } catch(e) {}
  }
  // 兜底：逐字符扫描配对花括号，提取每个顶层对象
  const objs = [];
  let depth = 0, start = -1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') { if (depth === 0) start = i; depth++; }
    else if (ch === '}') { if (depth > 0) depth--; if (depth === 0 && start !== -1) { try { objs.push(JSON.parse(text.slice(start, i + 1))); } catch(e) {} start = -1; } }
  }
  return objs.length ? objs : null;
}

function normalizeHotspot(scripts) {
  const out = []; let n = 0;
  for (const s of scripts) {
    if (!s || !s.title) continue;
    const steps = Array.isArray(s.steps) ? s.steps.map(st => ({ shot: hsSanitize(st.shot||''), sub: hsSanitize(st.sub||''), duration: hsSanitize(st.duration||'') })) : [];
    const voice = Array.isArray(s.voice) ? s.voice.map(v => hsSanitize(v||'')) : [];
    out.push({
      id: 'hs_auto_'+(++n),
      lane: ['hot','music','form','search'].includes(s.lane) ? s.lane : 'hot',
      platform: s.platform||'抖音',
      tier: [1,2,3].includes(s.tier) ? s.tier : 2,
      title: hsSanitize(s.title),
      heat: hsSanitize(s.heat||''),
      why: hsSanitize(s.why||''),
      sourceWord: hsSanitize(s.sourceWord||''),
      sourceUrl: s.sourceUrl||'',
      form: hsSanitize(s.form||'口播'),
      formTip: hsSanitize(s.formTip||''),
      steps, voice,
      loop: hsSanitize(s.loop||''),
      tip: hsSanitize(s.tip||''),
      bgm: hsSanitize(s.bgm||''),
      musicUrl: s.musicUrl||'',
      tags: hsSanitize(s.tags||''),
      difficulty: [0,1,2].includes(s.difficulty) ? s.difficulty : 1,
      needFace: !!s.needFace,
      time: hsSanitize(s.time||''),
      schedule: hsSanitize(s.schedule||'')
    });
  }
  return out;
}

// Start HTTP server (SCF Web 函数标准模式)
const PORT = process.env.SCF_CUSTOM_CONTAINER_EVENT_PORT || 9000;

http.createServer(async (req, res) => {
  const ts = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  // CORS — use writeHead with headers object to ensure they are sent
  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders); res.end(); return;
  }

  // 2026-08-05 Option A: GET /data/<file>.js —— 前端 <script src> 实时拉取 Gitee 数据（带 CORS）。
  // 周一 weekly-persona 自动更新后，前端零人工重部署即可生效。仅放行白名单文件，其余 GET 仍 405。
  if (req.method === 'GET') {
    let _u;
    try { _u = new URL(req.url || '/', 'http://localhost'); } catch (e) { _u = null; }
    if (_u && _u.pathname.startsWith('/data/')) {
      const fname = _u.pathname.slice('/data/'.length).replace(/^\/+/, '');
      const ALLOWED = ['t1ScriptFullByPersona.js','t2ScriptFullByPersona.js','t4ScriptFullByPersona.js','t1Presets.js','t2Presets.js','t4Presets.js','topicPool.js','weeklyNew.js'];
      const jsHeaders = { 'Content-Type':'application/javascript; charset=utf-8', 'Access-Control-Allow-Origin':'*', 'Cache-Control':'no-cache' };
      if (ALLOWED.indexOf(fname) < 0) {
        res.writeHead(403, jsHeaders); res.end('// forbidden: ' + fname); return;
      }
      try {
        const token = process.env.GITEE_TOKEN, user = process.env.GITEE_USERNAME || 'hbatz';
        // ScriptFullByPersona 体量较大（19–37KB），SCF 出网无法单次写大文件到 Gitee（请求体被截断但返回200，内容不落盘）。
        // 改为分片小文件存储（data/{t}SFB/），此处内存拼装成单文件返回，前端无需改动。
        let raw;
        if (fname === 't1ScriptFullByPersona.js' || fname === 't2ScriptFullByPersona.js' || fname === 't4ScriptFullByPersona.js') {
          const t = fname.replace('ScriptFullByPersona.js', '');
          raw = await assembleScriptFullJs(t, token, user);
        } else {
          raw = await readGiteeFile('data/' + fname, token, user);
        }
        res.writeHead(200, jsHeaders); res.end(raw); return;
      } catch (e) {
        res.writeHead(404, jsHeaders); res.end('// not found: ' + fname); return;
      }
    }
    res.writeHead(405, corsHeaders); res.end(JSON.stringify({ error: 'Method not allowed' })); return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, corsHeaders); res.end(JSON.stringify({ error: 'Method not allowed' })); return;
  }

  try {
    // 自动更新检查（每30秒一次，不影响请求响应时间）
    await maybeSelfUpdate();

    // 2026-07-31: 必须用 Buffer.concat + utf8 解码，否则中文请求体在 SCF 容器里会被读成乱码，
    // 导致 JSON.parse 报 "Unexpected token � in JSON at position N" 并返回 HTTP 500。
    const chunks = [];
    for await (const chunk of req) { chunks.push(chunk); }
    const body = Buffer.concat(chunks).toString('utf8');
    const params = JSON.parse(body);

    // 2026-07-21: 诊断端点（不暴露 key，仅返回连通性状态）
    if (params.mode === 'diag') {
      const diag = { ts: new Date().toISOString(), bundledTs: BUNDLED_TS, checks: {} };
      // 1. AI 网关连通性（tbnx，5s 超时；原 siliconflow.cn 已废弃，改测实际网关）
      try {
        const cfg = await loadAIConfig(process.env.GITEE_TOKEN, process.env.GITEE_USERNAME || 'hbatz');
        const t0 = Date.now();
        const r = await fetch(cfg.endpoint || 'https://tbnx.plus7.plus/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.SILICONFLOW_API_KEY}` },
          body: JSON.stringify({ model: cfg.model || 'deepseek-v4-pro', messages: [{ role:'user', content:'ping' }], max_tokens: 1 }),
          signal: AbortSignal.timeout(5000)
        });
        diag.checks.ai_endpoint = cfg.endpoint;
        diag.checks.ai_status = r.status;
        diag.checks.ai_ms = Date.now() - t0;
        diag.checks.ai_reachable = (r.ok || [400,401,422].indexOf(r.status) >= 0);
      } catch(e) {
        diag.checks.ai_reachable = false;
        diag.checks.ai_error = e.name + ': ' + e.message;
      }
      // 2. Gitee 端点连通性
      try {
        const t0 = Date.now();
        const r = await fetch('https://gitee.com/api/v5/repos/hbatz/sx-douyin-data', {
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        diag.checks.gitee_status = r.status;
        diag.checks.gitee_ms = Date.now() - t0;
        diag.checks.gitee_reachable = r.ok;
      } catch(e) {
        diag.checks.gitee_reachable = false;
        diag.checks.gitee_error = e.name + ': ' + e.message;
      }
      // 3. 环境变量状态（不暴露 key）
      diag.env = {
        GITEE_TOKEN_set: !!process.env.GITEE_TOKEN,
        GITEE_USERNAME: process.env.GITEE_USERNAME || 'hbatz',
        SILICONFLOW_API_KEY_set: !!process.env.SILICONFLOW_API_KEY,
        SILICONFLOW_API_KEY_length: (process.env.SILICONFLOW_API_KEY || '').length,
        SCF_CUSTOM_CONTAINER_EVENT_PORT: process.env.SCF_CUSTOM_CONTAINER_EVENT_PORT || null
      };
      res.writeHead(200, corsHeaders); res.end(JSON.stringify(diag, null, 2)); return;
    }

    // 2026-07-21: AI key 传递端点（浏览器直调 SiliconFlow 需要 key）
    if (params.mode === 'get-ai-key') {
      const key = process.env.SILICONFLOW_API_KEY;
      if (!key) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'SILICONFLOW_API_KEY not configured' })); return; }
      res.writeHead(200, corsHeaders); res.end(JSON.stringify({ key: key }));
      return;
    }

    // Route by mode: 'search-t1' and 'search-t2' modes are free (web search, no AI)
    if (params.mode === 'search-t1') {
      const result = await searchT1({ topic: params.topic });
      res.writeHead(200, corsHeaders); res.end(JSON.stringify(result)); return;
    }
    if (params.mode === 'search-t2') {
      const result = await searchT2({ preset: params.preset, topic: params.topic });
      res.writeHead(200, corsHeaders); res.end(JSON.stringify(result)); return;
    }
    // 2026-07-23: 手动触发热点跟拍更新（调 Event 函数）
    if (params.mode === 'trigger-hotspot') {
      const secretId = process.env.TENCENTCLOUD_SECRETID;
      const secretKey = process.env.TENCENTCLOUD_SECRETKEY;
      const sessionToken = process.env.TENCENTCLOUD_SESSIONTOKEN;
      if (!secretId || !secretKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'No CAM credentials configured' })); return; }
      const start = Date.now();
      const invokeRes = await callSCFApi('Invoke', {
        FunctionName: 'douyin-update-hotspot',
        InvocationType: 'RequestResponse',
        Payload: Buffer.from(JSON.stringify({mode:'hotspot'})).toString('base64')
      }, secretId, secretKey, sessionToken);
      const elapsed = (Date.now() - start) / 1000;
      res.writeHead(200, corsHeaders); res.end(JSON.stringify({
        status: invokeRes.status,
        body: invokeRes.body ? invokeRes.body.slice(0, 500) : '(empty)',
        elapsed_sec: elapsed
      })); return;
    }
    // 2026-07-23: 直接生成热点跟拍数据（不依赖 CAM，走本函数内 SiliconFlow）
    if (params.mode === 'gen-hotspot') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      const apiKey = process.env.SILICONFLOW_API_KEY;
      if (!apiKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'SILICONFLOW_API_KEY not configured' })); return; }
      // 抓取热搜
      const trendRes = await fetch('https://60s.viki.moe/v2/douyin', { signal: AbortSignal.timeout(8000) });
      if (!trendRes.ok) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'Trend fetch failed: '+trendRes.status })); return; }
      const trends = (await trendRes.json()).data || [];
      const cfg = await loadAIConfig(token, user);
      const scripts = [];
      for (let i = 0; i < Math.min(trends.length, 7); i++) {
        const t = trends[i];
        try {
          const sys = '你是山西电信抖音脚本专家。将热搜改成电信营业厅跟拍脚本，输出JSON。';
          const usr = '热搜：'+(t.title||'')+'。输出JSON格式：{"title":"标题","why":"为什么跟","steps":[{"shot":"分镜","sub":"字幕"}],"tags":"#标签","bgm":"推荐","difficulty":1-3,"time":"耗时"}';
          const out = await callSiliconFlow(sys, usr, apiKey, { ...cfg, maxTokens: 800, temperature: 0.85 });
          if (out) {
            const jsonStr = out.replace(/```json|```/g,'').trim();
            try { scripts.push({ id:'h'+(i+1), ...JSON.parse(jsonStr) }); } catch(e) { scripts.push({ id:'h'+(i+1), title: t.title, why: '自动补位', steps: [{shot:t.title+'看看',sub:''}] }); }
          }
        } catch(e) { console.warn('Hotspot gen failed for', i, e.message); }
      }
      res.writeHead(200, corsHeaders); res.end(JSON.stringify({ count: scripts.length, scripts: scripts }));
      return;
    }
    // 持久化热点跟拍结果到 Gitee 共享缓存（data/hotspot-latest.json），前端秒级读取、无需等 AI
    async function persistHotspotLatest(payload, token, user) {
      if (!token) return;
      const content = JSON.stringify(payload);
      await createOrUpdateGiteeFile('data/hotspot-latest.json', content, token, user);
    }

    // 2026-08-01: 精选 BGM 库生成（随每日预热一起刷新，写入 data/bgmList.js 供模板下拉自动填充）
    function fetchWithUA(url) {
      return fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' },
        signal: AbortSignal.timeout(15000)
      });
    }
    async function genBgm(token, user) {
      const today = new Date().toISOString().slice(0, 10);
      let songs = [];
      try { songs = await fetchKugouRank(); }
      catch (e) { console.log('[genBgm] Kugou failed:', e.message); }
      if (songs.length < 10) {
        try { const fb = await getConfig('config/bgm-fallback.json', token, user); songs = fb.songs; } catch (e) { console.log('[genBgm] fallback failed:', e.message); }
      }
      let categorized = {};
      try {
        const bgmRules = await getConfig('config/bgm-rules.json', token, user);
        categorized = categorizeBgm(songs, bgmRules);
      } catch (e) { console.log('[genBgm] rules failed:', e.message); }
      const js = JSON.stringify(categorized, null, 2);
      return `// Auto-generated BGM\n// Updated: ${today}\nwindow.___bgmList = ${js};\n`;
    }
    async function fetchKugouRank() {
      const res = await fetchWithUA('https://www.kugou.com/yy/html/rank.html');
      const html = await res.text();
      const results = [];
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
        if (fastKw.some(k => s.title.includes(k) || (s.artist||'').includes(k))) { fast.push(label); }
        else if (slowKw.some(k => s.title.includes(k))) { slow.push(label); }
        else { medium.push(label); }
      }
      const pick = (arr, n) => arr.slice(0, Math.min(n, arr.length));
      const defaults = rules.defaultAssignments || {};
      function fill(key, subKey) {
        const def = defaults[key]?.[subKey];
        const mood = def?.mood || 'medium';
        const fb = def?.fallback || [];
        if (mood === 'none') return fb;
        const pool = mood === 'fast' ? fast : mood === 'slow' ? slow : medium;
        const picked = pick(pool, 3);
        return picked.length >= 3 ? picked : (pick(fb, 3).length >= 3 ? pick(fb, 3) : fb);
      }
      const cats = ['决策指南','一线场景','深度测评','本地事件','直播'];
      const result = {};
      for (const cat of cats) {
        result[cat] = {};
        for (const sk of Object.keys(defaults[cat] || {})) {
          result[cat][sk] = fill(cat, sk);
        }
      }
      return result;
    }
    // 2026-08-01: 共享缓存读取（秒级，无需等 AI 生成）—— 前端热点中心优先调用此模式
    if (params.mode === 'hotspot-cache') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      if (!token) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'GITEE_TOKEN not configured' })); return; }
      try {
        const content = await readGiteeFile('data/hotspot-latest.json', token, user);
        const data = JSON.parse(content);
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({
          ok: true, cached: true,
          scripts: data.scripts || [],
          musicCandidates: data.musicCandidates || [],
          lanes: data.lanes || {},
          fetchedAt: data.fetchedAt || '',
          promptVer: data.promptVer || ''
        }));
      } catch (e) {
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok:false, empty:true, error: e.message }));
      }
      return;
    }
    // 2026-08-01: 真实多平台热点抓取 + tbnx 生成（替代旧 gen-hotspot 的单一源 60s.viki.moe）
    // 在 SCF 内直连国内热搜/音乐 API，4 lane（话题/BGM/形式/搜索截流）真实驱动生成。
    if (params.mode === 'hotspot-fetch') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      const apiKey = process.env.SILICONFLOW_API_KEY;
      if (!apiKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'SILICONFLOW_API_KEY not configured' })); return; }
      try {
        const cands = await fetchAllHotspotsSCF();
        const cfg = await loadAIConfig(token, user);
        const msgs = buildHotspotMessages(cands);
        const raw = await callSiliconFlow(msgs.system, msgs.user, apiKey, {
          endpoint: cfg.endpoint,
          model: cfg.model || params.model || 'deepseek-v4-pro',
          temperature: 0.9,
          maxTokens: 10000,
          timeoutMs: 150000
        });
        if (!raw) { res.writeHead(502, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'AI 生成失败（空响应）' })); return; }
        const content = raw.replace(/```json|```/g, '').trim();
        const extracted = extractJsonArray(content);
        if (!extracted) {
          res.writeHead(502, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'AI 返回格式异常，无法提取 JSON 数组', rawPreview: raw.slice(0, 500), rawLength: raw.length }));
          return;
        }
        const scripts = normalizeHotspot(extracted);
        const fetchedAt = new Date().toISOString();
        const musicCandidates = cands.music.slice(0, 12).map(m => ({
          word: m.word || '',
          songTitle: m.songTitle || '',
          songAuthor: m.songAuthor || '',
          platform: m.platform || '抖音音乐'
        }));
        // 持久化到 Gitee 共享缓存（data/hotspot-latest.json），供前端秒级加载、无需等 AI 生成
        try {
          await persistHotspotLatest({ scripts, musicCandidates, lanes: {
            hot: cands.hot.length, music: cands.music.length, form: cands.form.length, search: cands.search.length
          }, fetchedAt, promptVer: 'v2' }, token, user);
        } catch (pe) { console.warn('[hotspot-fetch] persist shared cache failed:', pe.message); }
        // 2026-08-01: 每日额外生成精选 BGM 库（data/bgmList.js），随每日预热一起刷新，供模板下拉自动填充
        try {
          const bgmJs = await genBgm(token, user);
          await createOrUpdateGiteeFile('data/bgmList.js', bgmJs, token, user);
          console.log('[hotspot-fetch] 精选 BGM 库已刷新（data/bgmList.js）');
        } catch (be) { console.warn('[hotspot-fetch] genBgm failed:', be.message); }
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok:true, count: scripts.length, scripts, promptVer: 'v2', lanes: {
          hot: cands.hot.length, music: cands.music.length, form: cands.form.length, search: cands.search.length
        }, musicCandidates, fetchedAt }));
      } catch (e) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: e.message || 'hotspot-fetch failed' }));
      }
      return;
    }

    // ===== weekly-persona: 每周一 t1/t2/t4 各自动新增 3 选题/模板 =====
    if (params.mode === 'weekly-persona') {
      try {
        await handleWeeklyPersona(res, params, corsHeaders);
      } catch (e) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: e.message || 'weekly-persona dispatch failed' }));
      }
      return;
    }

    // ===== fill-missing-t1: 批量补齐 t1Presets 缺脚本的选题 =====
    if (params.mode === 'fill-missing-t1') {
      try { await handleFillMissingT1(res, params, corsHeaders); }
      catch (e) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: e.message || 'fill-missing-t1 failed' })); }
      return;
    }

    // 2026-08-01: 读取每日生成的精选 BGM 库（data/bgmList.js），供前端按日加载 ___bgmList
    if (params.mode === 'bgm-list') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      if (!token) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'GITEE_TOKEN not configured' })); return; }
      try {
        const raw = await readGiteeFile('data/bgmList.js', token, user);
        // 兼容 genBgm 生成的「// 注释头 + window.___bgmList = {...};」格式（注释行在赋值之前）
        // 必须用 m 标志：^ 要匹配每一行开头，否则只能剥掉第一行注释，第二行 // 残留会令 JSON.parse 失败
        const jsonStr = raw
          .replace(/^\s*\/\/.*$/gm, '')           // 去掉所有 // 注释行（多行）
          .trim()                                 // 去掉首尾空白（含注释残留的换行）
          .replace(/^window\.___\w+\s*=\s*/, '') // 去掉 window.___bgmList =
          .replace(/;\s*$/, '')                   // 去掉结尾 ;
          .trim();
        const bgmList = JSON.parse(jsonStr);
        const updatedAt = (raw.match(/\/\/\s*Updated:\s*([\d-]+)/) || [,''])[1];
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok: true, bgmList, updatedAt }));
      } catch (e) {
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok:false, empty:true, error: e.message }));
      }
      return;
    }
    // 2026-07-23: 直播复盘数据代理（SCF 抓取抖音来客，绕过本机 DNS 限制）
    if (params.mode === 'proxy-douyin') {
      const groupId = params.group_id || '18483772386431080';
      const date = params.date || '';
      const city = params.city || '';
      try {
        // 从 Gitee 读取存储的 cookie
        const token = process.env.GITEE_TOKEN;
        const user = process.env.GITEE_USERNAME || 'hbatz';
        let cookies = '';
        try {
          const cRes = await fetch(`https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/config/douyin-cookies.json?ref=master`, {
            headers: { 'Authorization': `token ${token}` }
          });
          if (cRes.ok) {
            const cData = await cRes.json();
            const cContent = JSON.parse(Buffer.from(cData.content, 'base64').toString());
            cookies = cContent.cookies || '';
          }
        } catch(e) { console.warn('No douyin cookies config'); }
        
        // 调用 抖音来客 API
        const apiUrl = `https://living.douyin.com/liveroom/group/${groupId}/list?date=${date}&city=${city}`;
        const apiRes = await fetch(apiUrl, {
          headers: { 'Cookie': cookies, 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          signal: AbortSignal.timeout(15000)
        });
        if (!apiRes.ok) {
          res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'API error: ' + apiRes.status, streams: [] }));
          return;
        }
        const apiData = await apiRes.json();
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ streams: apiData.list || apiData.data || apiData.room_list || [] }));
      } catch(e) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: e.message, streams: [] }));
      }
      return;
    }
    // 2026-07-30: 通用 AI 代理（收口回 SCF：浏览器不再直连 tbnx、不再明文存 key）
    // 浏览器把 system/user 透传过来，SCF 用自身环境变量里的 key 调 tbnx，
    // 返回前经 sanitizeHardBan 强制清洗硬封禁词，实现「服务端+前端」双校验。
    if (params.mode === 'ai') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      const apiKey = process.env.SILICONFLOW_API_KEY;
      if (!apiKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'SILICONFLOW_API_KEY not configured' })); return; }
      try {
        const cfg = await loadAIConfig(token, user);
        // 兼容两种入参：{system,user} 或 OpenAI 式 {messages:[{role,content}]}
        const messages = params.messages || null;
        let system = params.system || '';
        let userMsg = params.user || '';
        if (messages && Array.isArray(messages) && messages.length) {
          system = messages.filter(m => m.role === 'system').map(m => m.content).join('\n') || system;
          userMsg = messages.filter(m => m.role === 'user').map(m => m.content).join('\n') || userMsg;
        }
        if (!system && !userMsg) { res.writeHead(400, corsHeaders); res.end(JSON.stringify({ ok:false, error: 'empty prompt' })); return; }
        // 2026-07-31: tbnx 网关对中文 system prompt 编码处理异常，会返回乱码。
        // 兼容方案：system 含中文时，把 system 内容前置到 user prompt，system 改用英文占位。
        if (/[\u4e00-\u9fa5]/.test(system)) {
          userMsg = '[角色与要求]\n' + system + '\n\n[用户请求]\n' + userMsg;
          system = 'You are a helpful assistant acting as a Shanxi telecom store clerk. Follow the Chinese instructions in the user message. Output natural spoken Chinese. Keep all numbers, prices, addresses, and product names unchanged. No JSON, no markdown, no shot labels.';
        }
        const raw = await callSiliconFlow(system, userMsg, apiKey, {
          endpoint: cfg.endpoint,
          model: params.model || cfg.model || 'deepseek-v4-pro',
          temperature: params.temperature || cfg.temperature || 0.8,
          maxTokens: params.max_tokens || cfg.maxTokens || 2000,
          // 2026-07-31: tbnx deepseek-v4-pro 实测首响 ~82s，45s 太短必超时；提到 180s
          timeoutMs: 180000
        });
        res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok:true, content: sanitizeStance(raw || '') })); return;
      } catch (e) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error: e.message || 'ai failed' })); return;
      }
    }
    // ===== 真实统计上报（浏览器埋点直报，落 Gitee 跨店聚合）=====
    if (params.mode === 'track') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      if (token) {
        try {
          await loadStatsAgg(token, user);
          const act = params.action || 'unknown';
          const store = params.store || (params.payload && params.payload.store) || '';
          bumpStatsAgg(act, store);
          scheduleFlushStats(token, user);
        } catch (e) {
          console.warn('[track]', e.message);
        }
      }
      res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok: true }));
      return;
    }
    // ===== 读取真实统计聚合摘要（管理员统计页）=====
    if (params.mode === 'stats') {
      const token = process.env.GITEE_TOKEN;
      const user = process.env.GITEE_USERNAME || 'hbatz';
      if (!token) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: 'GITEE_TOKEN not configured' }));
        return;
      }
      try {
        const summary = await getStatsSummary(token, user);
        res.writeHead(200, corsHeaders); res.end(JSON.stringify(summary));
      } catch (e) {
        res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    const result = await personalize(params);
    res.writeHead(200, corsHeaders); res.end(JSON.stringify(result));
  } catch (e) {
    console.error(`[${ts()}] error: ${e.message}`);
    res.writeHead(500, corsHeaders); res.end(JSON.stringify({ error: e.message }));
  }
}).listen(PORT);

console.log('SCF Web function listening on port', PORT);

// ============================================================
// Config loader (reads from Gitee repo)
// ============================================================

async function getConfig(filename, token, user) {
  if (_configCache[filename]) return _configCache[filename];
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filename)}`;
  const res = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error(`Config not found: ${filename} (${res.status})`);
  const data = await res.json();
  const raw = Buffer.from(data.content, 'base64').toString('utf-8');
  _configCache[filename] = JSON.parse(raw);
  return _configCache[filename];
}

// ============================================================
// Persona prompts (6 types, synced with frontend)
// ============================================================

// 6种人设——已重写为"场景化身份"而非"角色描述"
// AI 需要知道的是：我是谁、我在跟谁说话、我在什么场景下说话
const PERSONA_PROMPTS = {
  sweet: {
    // 面对：刷抖音的年轻女性，喜欢种草和被种草
    who: '你是小区里最会买东西的姑娘。朋友换套餐、买手机都先问你。你刚在营业厅给别人推荐了一个好东西，趁热打铁掏出手机录条抖音。你没写稿子，就是对着前置摄像头跟小姐妹们聊天。',
    how: '快且甜，但不腻。常用"宝子们""姐妹们"，但要有真实感不是喊口号。说具体的事、具体的数字。"跟你说，就刚刚""这个真的好"是你会说的话。声音上扬有活力。面对50岁大爷你也这么说话——不是撒娇，是元气。'
  },
  tech: {
    // 面对：愿意被科普但怕被忽悠的普通用户
    who: '你是电信技术岗，平时爱折腾网络和数码。刚测了台设备/排查了个故障，确实有东西可说。你打开后置摄像头对着东西，边测边讲。你不是在上课，是给朋友安利/避坑。',
    how: '用数据说话，但数据后要跟一句人话解释。你说"延迟12毫秒"但马上跟"就是你打游戏不会460"。口头禅："今天测了""直接看数据""建议截图保留"。不吹不黑，不推销。对面是普通用户，不是你同事——不讲技术黑话。'
  },
  biz: {
    // 面对：企业老板/行政，时间值钱，要确定性结论
    who: '你是企业通信顾问。你的客户是开公司的人——他们没耐心听废话，只想知道"对我有什么好处，多少钱，怎么弄"。你刚从客户现场回来，事情谈得挺顺利，录条短视频让更多企业知道。',
    how: '结论先行，数字前置。先说"帮一家公司省了多少X"再解释怎么省的。句式短、信息密。不讲故事不煽情，讲效率和结果。"建议""结论明确""数据来源XX"是你的收尾方式。'
  },
  young: {
    // 面对：刷抖音消磨时间的年轻人，要好玩、有记忆点
    who: '你是装维小哥，刚给一户人家装好宽带/修好网络。这事挺逗的/挺坑的，你趁回程路上对着手机吐槽加分享。你没想好怎么说，就是讲段子一样开口。',
    how: '一开口就"兄弟们"，像在群里发语音。会吐槽、会夸张、会自黑。"你敢信""直接打脸""看了你就懂"这三句是你的三板斧。但吐槽归吐槽，关键信息要清楚——你本质上是在帮人避坑。'
  },
  master: {
    // 面对：普通家庭用户，对技术一知半解但有信任感
    who: '你干了二十年装维，什么故障都见过。今天这事对你来说很简单，但对普通人家影响很大。你刚帮一家人弄好，他们挺感谢的。你媳妇说"这事你应该拍条抖音"。你不追求流量，就想让更多人知道——这事没那么复杂。',
    how: '说话慢，气稳，人家觉得你靠谱。最爱说"干了这么多年""信我一次""经验之谈"。不讲大道理，就讲今天这家人的真实情况。你说话的时候手上可能在比划（"这个路由器放这就行"）。让观众觉得，这个老师傅说的话，听进去不亏。'
  },
  sister: {
    // 面对：居民区的普通家庭，阿姨大妈，年轻人也在刷
    who: '你是营业厅里人缘最好的员工。谁进来都先找你，因为你不推销，你真帮忙。今天帮了一位阿姨/一个学生，事情不大但他们特别感动。你下班后想了一下——这事值得说一说。',
    how: '说话温和，像在跟邻居阿姨唠嗑。"今天来了个大爷""门口王姐的儿子昨天来问"是你的叙事方式。不说"您可以"，说"你就"——更亲切。语速不快，有停顿。你不是在念稿，是在回忆今天发生的事。'
  }
};

// 模板语境：告诉 AI 这是在拍什么类型的视频
// TEMPLATE_GUIDES 仅用于 GENERATE 模式（从零生成），POLISH 模式走不同路径
const TEMPLATE_GUIDES = {
  t1: '这是决策指南类内容。帮用户对比选择，要说清楚"谁适合什么/为什么"。数据要有对比有结论。收尾必须引导截图保存+评论互动+关注。',
  t2: '**这是一线服务场景，只能讲故事。** 不管选题关键词是什么（宽带/手机/投诉/故障），你必须只讲一个真实发生的服务故事。结构：时间→地点→人物→遇到了什么问题→你是如何一步步解决的→客户什么反应→最后总结。禁止出现"对比""选择""哪个好""100M 300M 1000M"等决策指南用语。禁止做产品推荐。就像跟朋友聊天分享今天的经历。收尾自然带出「有类似问题来店里找我+点个关注」。',
  t3: '这是深度评测。你面前有一台具体设备，需要你上手实测并出报告。围绕设备的实际参数来写，讲体验不讲推销。禁止对比宽带套餐，禁止讲"100M/300M/1000M"。你就是科技博主在出评测视频。必须引导截图保存评测数据+评论区提问互动+关注。',
  t4: '这是本地探店/福利活动。重点讲清：在哪、有什么福利、怎么参与。要营造紧迫感或亲切感。必须引导截图到店+评论留名+关注获取下期福利。'
};

// ============================================================
// Comment generation (lightweight, co-generated with dialogue)
// ============================================================

async function generateComments(dialogue, persona, topic, templateType, store, city, apiKey, cfg) {
  if (!dialogue || dialogue.length < 20) return null;
  
  var tplHints = {
    t1: '引导用户投票/对比/评论自己的选择，引发讨论',
    t2: '引导情感共鸣和故事追问，让用户分享类似经历',
    t3: '引导参数讨论和设备提问，让用户问更多细节',
    t4: '引导到店行动和FOMO，让用户评论留名或转发'
  };
  var tplHint = tplHints[templateType] || '自然引导互动';
  
  var p = PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.sister;
  var personaLabel = (p.who || '').split('。')[0] || persona;
  
  // 2026-07-31: tbnx 对中文 system prompt 编码异常，system 改用英文，把中文要求下沉到 user prompt。
  var systemPrompt = 'You are a Douyin comment assistant. Based on the script, generate 3 engaging comments in Chinese. Each 20-40 Chinese characters. Conversational, like real Douyin comments. Output JSON array only.';

  var userPrompt = '[要求]\n根据口播脚本内容，生成3条引导互动的评论。每条20-40字。口语化，有抖音评论区感。直接输出JSON数组。\n注意：山西电信在售家宽档位只有 300M/500M/1000M/FTTR，评论中严禁出现 100M/100兆；若涉及宽带速度，统一用 300M/500M/1000M/FTTR。\n\n口播脚本：' + dialogue.slice(0, 400) + '\n\n人物：' + personaLabel + '\n互动方向：' + tplHint + '\n营业厅：' + store + '，城市：' + (city||'') + '\n\n生成3条评论区留言。输出格式：["评论1","评论2","评论3"]';
  
  var result = await callSiliconFlow(systemPrompt, userPrompt, apiKey, {
    ...cfg,
    temperature: 0.8,
    maxTokens: 300
  });
  
  if (!result) return null;
  
  try {
    var cleaned = result.replace(/```json|```/g, '').trim();
    var parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed) && parsed.length >= 3) {
      return parsed.slice(0, 3).map(function(c) { return sanitize100M(sanitizeStance(sanitizeHardBan(String(c)))).slice(0, 80); });
    }
    // Try to extract quoted strings
    var matches = cleaned.match(/"([^"]{5,80})"/g);
    if (matches && matches.length >= 2) {
      return matches.slice(0, 3).map(function(m) { return sanitize100M(sanitizeStance(sanitizeHardBan(m.replace(/"/g, '')))).slice(0, 80); });
    }
  } catch(e) {
    console.warn('Comment parse failed:', e.message);
  }
  return null;
}

// ============================================================
// Core: personalize script generation (懒生成 + 永久缓存)
// ============================================================

async function polishScript(params, token, user, apiKey) {
  const ts = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  const { store, persona, topic, city, templateType, script } = params;
  const templateNames = { t1: '决策指南', t2: '一线场景', t3: '深度测评', t4: '本地事件' };

  // Cache key for polish results
  const weekNum = getISOWeek();
  const rawKey = `${store}|${topic}|${persona}|${templateType || 'unknown'}|${weekNum}`;
  const cacheKey = require('crypto').createHash('md5').update(CACHE_VER + '|' + rawKey + '|polish').digest('hex').slice(0, 12);
  const cachePath = `cache/${cacheKey}.json`;

  console.log(`[${ts()}] polish cache=${cacheKey} topic="${(topic||'').slice(0,30)}"`);

  // Check cache
  try {
    const cached = await readGiteeFile(cachePath, token, user);
    const parsed = JSON.parse(cached);
    console.log(`[${ts()}] Polish Cache HIT: ${cacheKey}`);
    return parsed;
  } catch(e) {}

  console.log(`[${ts()}] Polish Cache MISS, generating...`);

  const cfg = await loadAIConfig(token, user);
  const p = (PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.sister);

  // Build persona context from scenario-based fields
  const personaWho = p.who || p.role || '';
  const personaHow = p.how || p.tone || '';

  // Trim script to avoid token overflow
  const trimmed = (script||'').trim().slice(0, 2500);

  // Template context (T4 = local events, others = generic)
  const isT2 = (templateType === 't2');
  const tplScene = isT2 ? '这是你在营业厅/现场服务时遇到的一件事，你要讲给刷抖音的普通观众听。'
    : (templateType === 't4' ? '这是你店里的一个活动/福利，你要告诉大家这好事——在哪、有什么、怎么来。要有"错过就亏了"的感觉。'
    : '');

  const systemPrompt = `【你的身份】${isT2 ? '\n你今天刚经历了一件事。别管下面草稿里的分镜格式——那就是你同事记的笔记，乱七八糟的。你把这事完整讲一遍就行。' : ''}
${personaWho}

【你说话的特点】
${personaHow}

【你现在在干什么】${isT2 ? '\n你刚经历完这件事，趁热掏出手机录条抖音。你不是在做报告、不是在培训新人——你就是在跟刷手机的人分享今天发生的事。就像你下班回家跟家人说"今天店里来了个..."那样自然。' : '\n你刚经历了一件事，现在掏手机对着自己、趁热把这事说出来。你在录抖音，对面是刷手机的普通人。'}

${isT2 ? '【下面是你同事记的笔记，别照着念】\n用你自己的语气把这件事重新讲一遍。你不是在"改写"——你是在"重述"。你就是当事人，你知道所有细节，用你的方式说。' : '【下面是你同事帮你写的草稿，写得太官方了】\n用你自己的语气和方式重写。核心原则：草稿说的是什么事，你就说什么事——时间、地点、人物、发生了什么、结果是什么，这些都不变。你怎么说可以变。'}

【必须保留】
- 故事骨架（时间地点人物事件结果）完整不动
- 所有数字、价格、地址、产品名、人名必须和原文一字不差
- 原文没有的数字、百分比、金额、时间、数量——一律不能编。比如原文没有"30%"，你就不能写"省了30%"
${isT2 ? '- 你是当事人在讲述自己的经历，不是在写报告、写总结、写培训材料。禁止用"本次""我们""本次服务"等汇报腔，用"我""他""那天"这类当事人的口吻。' : '- 你是换了一种说法来讲同一件事，不是在编一个新故事'}
${isT2 ? '- 草稿里的【X秒】和→箭头是拍摄标记，忽略它' : '- 忽略草稿里的拍摄标记'}

${isT2 ? '【T2特殊要求：你只能讲故事】\n不管选题关键词是什么（宽带/手机/投诉/故障），你讲的是一个真实的服务经历。禁止：对比"100M和300M哪个好"、推荐"建议选1000M"、列举"步骤一/步骤二"。你就是一个人，帮了另一个人，仅此而已。' : ''}

【连贯性要求】
输出必须是一段连续自然的口播稿——用"然后""接着说""你知道吗""所以"这类衔接词串联句子，不要用换行分割成多段。读起来就是一个人对着手机一口气说完的话。

【输出格式】${isT2 ? '\n直接输出一段纯文本口播台词（150-300字），不要JSON、不要markdown、不要分镜标记。就是一段完整的、可以直接照着念的话。' : '\n严格JSON数组（不要markdown代码块）：[{"orig":"草稿一句","new":"改写一句"}]\n合并/拆分句子都可以，最终拼成一段连续口播。'}`;

  const userPrompt = `【同事记的笔记${isT2 ? '——下面这件事你今天刚经历完' : '——下面这件事你刚经历完'}】
${trimmed}

${isT2 ? '用你自己的话，把这件事从头到尾讲一遍。直接从"今天"或"刚才"开始。说清楚：谁来了、什么问题、你怎么解决的、结果怎样。不要像报告，就像你在跟朋友聊天。纯文本输出，不要JSON。' : '用你自己的语气重说这件事。换说法、不换内容。输出一段连续的口播稿。只输出JSON。'}`;

  const result = await callSiliconFlow(systemPrompt, userPrompt, apiKey, {
    ...cfg,
    temperature: 0.7,
    maxTokens: 1800
  });

  let output = { dialogue: '', lines: [], warnings: [], safe: true, cached: false, cacheKey };
  
  if (result) {
    // T2: direct text output (not JSON) — treat raw response as dialogue
    if (isT2) {
      var cleaned = result.replace(/```\w*\s*|```/g, '').trim();
      // Remove any accidental JSON wrapping
      try { var maybeJson = JSON.parse(cleaned); if (typeof maybeJson === 'string') cleaned = maybeJson; } catch(e) {}
      output.dialogue = cleaned;
      output.lines = [{ orig: '', new: cleaned }];

      // Check for banned advertising words
      var adWords = ['最好','最大','最全','最佳','最低','最高','最先','最新','最便宜','第一','唯一','独家','首创','顶级','极品','至尊','王牌','冠军','百分百','100%','绝对','保证','担保','肯定没问题','永不','永久','免费送','免费领','私信我','最后一天','史上最低','绝版'];
      for (var j = 0; j < adWords.length; j++) {
        if (cleaned.indexOf(adWords[j]) >= 0) output.warnings.push(adWords[j]);
      }
      output.safe = output.warnings.length === 0;

      // Detect fabricated numbers
      var orgNums = (script||'').match(/\d+(\.\d+)?%?/g) || [];
      var outNums = cleaned.match(/\d+(\.\d+)?%?/g) || [];
      var orgSet = {};
      for (var k = 0; k < orgNums.length; k++) orgSet[orgNums[k]] = true;
      for (var k = 0; k < outNums.length; k++) {
        if (!orgSet[outNums[k]] && output.warnings.indexOf('数字编造:'+outNums[k]) < 0) {
          output.warnings.push('数字编造:' + outNums[k]);
          output.safe = false;
        }
      }

      // T2 quality check: flag report-like language
      var reportWords = ['本次', '我们', '综上所述', '总而言之', '经过', '步骤一', '步骤二', '第一步', '第二步', '首先', '其次', '最后'];
      for (var j = 0; j < reportWords.length; j++) {
        if (cleaned.indexOf(reportWords[j]) >= 0 && output.warnings.indexOf('汇报腔:'+reportWords[j]) < 0) {
          output.warnings.push('汇报腔:' + reportWords[j]);
        }
      }
    } else {
      // Non-T2: JSON line-by-line polishing
      try {
        var parsed = JSON.parse(result.replace(/```json|```/g, '').trim());
        if (Array.isArray(parsed)) {
          output.lines = parsed;
          output.dialogue = parsed.map(function(l){return l['new']||l['rewritten']||'';}).filter(Boolean).join('');
          var adWords = ['最好','最大','最全','最佳','最低','最高','最先','最新','最便宜','第一','唯一','独家','首创','顶级','极品','至尊','王牌','冠军','百分百','100%','绝对','保证','担保','肯定没问题','永不','永久','免费送','免费领','私信我','最后一天','史上最低','绝版'];
          for (var i = 0; i < parsed.length; i++) {
            var line = (parsed[i]['new']||parsed[i]['rewritten']||'');
            for (var j = 0; j < adWords.length; j++) {
              if (line.indexOf(adWords[j]) >= 0 && output.warnings.indexOf(adWords[j]) < 0) {
                output.warnings.push(adWords[j]);
              }
            }
          }
          output.safe = output.warnings.length === 0;
          var orgNums = (script||'').match(/\d+(\.\d+)?%?/g) || [];
          var outNums = output.dialogue.match(/\d+(\.\d+)?%?/g) || [];
          var orgSet = {};
          for (var k = 0; k < orgNums.length; k++) orgSet[orgNums[k]] = true;
          for (var k = 0; k < outNums.length; k++) {
            if (!orgSet[outNums[k]] && output.warnings.indexOf('数字编造:'+outNums[k]) < 0) {
              output.warnings.push('数字编造:' + outNums[k]);
              output.safe = false;
            }
          }
        }
      } catch(e) {
        output.dialogue = result.trim();
      }
    }
  }

  // Generate comments (lightweight AI call, co-generated with dialogue)
  try {
    output.comments = await generateComments(
      output.dialogue, persona, topic, templateType, store, city, apiKey, cfg
    );
  } catch(e) {
    console.warn(`[${ts()}] Comment generation failed: ${e.message}`);
    output.comments = null; // frontend will fall back to template
  }

  // Save cache
  try {
    output.cached = true;
    await createOrUpdateGiteeFile(cachePath, JSON.stringify(output), token, user);
  } catch(e) {
    console.warn(`[${ts()}] Cache write failed: ${e.message}`);
  }

  return output;
}

async function personalize(params) {
  const ts = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  const { store, persona, topic, city, fields, templateType } = params;

  if (!store || !topic || !persona) {
    throw new Error('Missing required params: store, topic, persona');
  }

  const token = process.env.GITEE_TOKEN;
  const user = process.env.GITEE_USERNAME || 'hbatz';
  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey) throw new Error('SILICONFLOW_API_KEY not configured');
  if (!token) throw new Error('GITEE_TOKEN not configured');

  // Cache key: deterministic per (version + store + topic + persona + templateType + week)
  const weekNum = getISOWeek();
  const cacheKey = require('crypto').createHash('md5')
    .update(`${CACHE_VER}|${store}|${topic}|${persona}|${templateType || 'unknown'}|${weekNum}`).digest('hex').slice(0, 12);
  const cachePath = `cache/${cacheKey}.json`;

  console.log(`[${ts()}] personalize cache=${cacheKey} topic="${topic.slice(0,30)}" persona=${persona}`);

  // Step 1: Check cache
  try {
    const cached = await readGiteeFile(cachePath, token, user);
    const parsed = JSON.parse(cached);
    console.log(`[${ts()}] Cache HIT: ${cacheKey}`);
    return { script: parsed.script, cached: true, cacheKey };
  } catch (e) {
    console.log(`[${ts()}] Cache MISS, generating...`);
  }

  // Step 2: Detect mode — polish (optimize existing template) vs generate (from scratch)
  const originalScript = params.script || '';
  const mode = originalScript ? 'polish' : 'generate';

  if (mode === 'polish') {
    return await polishScript(params, token, user, apiKey);
  }

  // ===== GENERATE MODE (from scratch) =====
  // Build prompt with full context
  const p = (PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.sister);
  const personaRole = `${p.who || p.role}\n${p.how || p.tone || ''}`;

  let fieldsContext = '';
  if (fields) {
    for (const [k, v] of Object.entries(fields)) {
      if (v) fieldsContext += `  ${k}: ${v}\n`;
    }
  }
  if (!fieldsContext.trim()) fieldsContext = '(用户未填写具体参数)';

  var tplNames = { t1: '决策指南', t2: '一线场景', t3: '深度测评', t4: '本地事件' };
  var tplName = tplNames[templateType] || '';
  var tplGuide = TEMPLATE_GUIDES[templateType] || '';

  const systemPrompt = `${personaRole}
${tplGuide}
营业厅：${store}，城市：${city || '未知'}。

核心任务：结合用户提供的选题和场景数据，写一段完整的口播脚本（200-400字），可直接录视频。

${templateType === 't2' ? 'T2特殊要求：你今天经历了一次服务。不要做报告、不要写总结——你就是当事人在讲述。开头用"今天""刚才""昨天"这类时间词自然切入，而不是"大家好我是XX营业厅的XX"。禁止用"本次""我们""经过""综上所述"等汇报语言。你不是在给领导汇报工作，你是在跟刷手机的路人聊天。' : ''}
结构要求：${templateType === 't2' ? '自然场景切入 → 讲发生了什么 → 你怎么做的 → 结果 → 一句收尾。不要"强钩子"，用真实的生活细节做开头。' : '强钩子开头 → 数据/故事/体验展开 → 收藏锚点（截图/对照表/清单）→ 评论引导（提一个问题让用户回答）→ 复访+到店收尾（关注我+来店里）。'}
数据原则：优先使用用户填写的真实参数，不要凭空编造速率/性能数据。如果用户未提供数据，用定性描述代替定量数据。
【抖音2026新算法强制要素】脚本末尾必须同时包含：①截图保存/收藏（可留存价值）②评论区引导互动 ③关注/下期（复访钩子）④到店/来营业厅（转化CTA）。四项缺一不可。
禁止：不要写分镜提示、字幕说明、BGM推荐。只输出口播台词。`;

  const userPrompt = `【选题】${topic}
【用户填写的参数】
${fieldsContext}
【模板类型】${tplName}

**必须遵守以下规则：**
${templateType === 't2' ? '- T2服务故事：你就是当事人。用"我"的角度讲（不是"我们营业厅"），从真实场景切入（不要汇报式开头）。禁止对比宽带、禁止产品推荐、禁止"100M 300M 1000M"、禁止"步骤一/步骤二"这种教程格式。你只是在分享你今天帮了一个人。' : templateType === 't3' ? '- 深度评测，围绕设备参数写，禁止宽带对比。' : ''}
- 基于用户填写的参数，不要凭空编造数据。
- 直接输出纯文本口播台词，不要JSON、不要markdown。`;

  const cfg = await loadAIConfig(token, user);
  const script = await callSiliconFlow(systemPrompt, userPrompt, apiKey, {
    ...cfg,
    temperature: 0.9,
    maxTokens: 1200
  });

  if (!script) throw new Error('AI returned empty response');

  const scriptClean = script.trim().replace(/^["']|["']$/g, '');

  // Generate comments (co-generated, non-blocking)
  var comments = null;
  try {
    comments = await generateComments(scriptClean, persona, topic, templateType, store, city, apiKey, cfg);
  } catch(e) {
    console.warn(`[${ts()}] Comment gen failed: ${e.message}`);
  }

  // Step 3: Save to Gitee cache (non-blocking: save in background)
  try {
    const cacheContent = JSON.stringify({
      script: scriptClean,
      comments: comments,
      persona, topic, store,
      generated: new Date().toISOString().slice(0, 10)
    });
    await createOrUpdateGiteeFile(cachePath, cacheContent, token, user);
    console.log(`[${ts()}] Generated + cached: ${cacheKey}`);
  } catch(e) {
    console.warn(`[${ts()}] Cache write failed (non-blocking): ${e.message}`);
  }

  return { script: scriptClean, comments: comments, cached: false, cacheKey };
}

// ============================================================
// Search-based topic/story enrichment (zero cost, no AI needed)
// ============================================================

// 从搜索结果中提取 3 个方案（T1 决策指南）
// 规则：找数字+关键词+价格组合，分类为低/中/高三档
function extractThreeOptions(results, topic) {
  if (!results || results.length < 2) return null;
  const text = results.join(' ').slice(0, 5000);
  
  // 提取 3 条方案：找包含数字、价格和具体场景的句子
  const sentences = text.split(/[。.！!]|\n/).filter(s => s.trim().length > 10);
  
  // 找包含"上行"、"直播"等关键词的句子优先（针对直播话题）
  const t = topic.toLowerCase();
  const isLive = /直播|上行|上传|推流/i.test(t);
  const isBroadband = /宽带|兆|千兆|FTTR|光纤|网速/i.test(t);
  const isPhone = /手机|合约|裸机|以旧换新|购机/i.test(t);
  const isPackage = /套餐|流量|月租|话费/i.test(t);
  
  let keySentences = [];
  
  // 策略1：按关键词筛选相关句子
  if (isLive) {
    keySentences = sentences.filter(s => /上行|直播|主播|推流|1080P|4K|延迟/i.test(s));
  } else if (isBroadband) {
    keySentences = sentences.filter(s => /兆|带宽|下行|上行|带机/i.test(s));
  } else if (isPhone) {
    keySentences = sentences.filter(s => /手机|售价|配置|芯片|屏幕|镜头/i.test(s));
  } else if (isPackage) {
    keySentences = sentences.filter(s => /月|流量|通话|套餐|分钟|元|档/i.test(s));
  } else {
    keySentences = sentences.filter(s => /\d/.test(s) && /元|价|档|方案|推荐|选/i.test(s));
  }
  
  if (keySentences.length < 3) keySentences = sentences; // fallback: all sentences
  
  // 策略2：按"入门/性价比/一步到位/低/中/高"分组
  const groups = { low: [], mid: [], high: [] };
  for (const s of keySentences) {
    if (/入门|单人|独居|小户型|低档|100兆|100M|最低|轻量|小型|基础/i.test(s)) groups.low.push(s);
    else if (/入门|性价比|最|多人|家庭|300兆|300M|中型|提升|均衡/i.test(s)) {
      if (/\d+兆/.test(s) && parseInt(s.match(/\d+/)) >= 500) groups.high.push(s);
      else groups.mid.push(s);
    }
    else if (/一步到位|旗舰|大户|千兆|千M|1000兆|1000M|全屋|全覆盖|豪华|专业|顶级|大型|全覆盖|最高/i.test(s)) groups.high.push(s);
    else if (/\d+兆/.test(s)) {
      const speed = parseInt(s.match(/\d+/));
      if (speed <= 100) groups.low.push(s);
      else if (speed <= 500) groups.mid.push(s);
      else groups.high.push(s);
    }
  }
  
  // 从每组选最优句子，若无则从keySentences补
  const pick = (arr, fallbackIdx) => {
    if (arr.length > 0) {
      // 选最短的包含数字和价格的句子（信息密度最高）
      return arr.sort((a,b) => a.length - b.length).filter(s => /\d/.test(s))[0] || arr[0];
    }
    return keySentences[fallbackIdx] || keySentences[0] || '';
  };
  
  const a = pick(groups.low, 0);
  const b = pick(groups.mid, 1) || pick(groups.high, 1);
  const c = pick(groups.high, 2) || pick(groups.low, 2);
  
  // 整理成标准格式：在句首加档位标记
  const clean = (s, prefix) => {
    if (!s) return '';
    const trimmed = s.trim().replace(/^[「」\s、，。]+/, '').slice(0, 80);
    if (isBroadband || isLive) return prefix + '｜' + trimmed;
    return prefix + '｜' + trimmed;
  };
  
  return {
    a: clean(a, '入门款'),
    b: clean(b, '推荐款'),
    c: clean(c, '一步到位')
  };
}

// 搜索缓存（进程内5分钟有效期）
const _searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

// 选题类型分类（避免「直播」歧义到直播平台）
function classifyTopic(topic) {
  const t = topic || '';
  if (/直播|带货|主播|推流|上行/i.test(t)) return 'live';
  if (/宽带|兆|千兆|FTTR|网速|路由|WiFi|布线|网线|老房|户型/i.test(t)) return 'broadband';
  if (/手机|合约|裸机|以旧换新|购机|学生|校园|老人|适老|携号|转网|5G|4G/i.test(t)) return 'phone';
  if (/套餐|流量|月租|通话|副卡|续费|提速|升级/i.test(t)) return 'package';
  if (/监控|摄像头|智能家居|物联网/i.test(t)) return 'iot';
  return 'general';
}

// 扩展搜索查询：根据类型加电信相关词
function expandQuery(topic, type) {
  const expansion = {
    live: '直播带货 选宽带 上行 网速 Mbps',  // 排除直播平台歧义
    broadband: '宽带 选 网速 上行 Mbps 千兆',
    phone: '电信 手机 套餐 月租 流量',
    package: '电信 套餐 月租 流量 通话',
    iot: '电信 宽带 监控 4G 网络',
    general: '电信 选 对比'
  };
  return (topic + ' ' + (expansion[type] || expansion.general)).trim().slice(0, 60);
}

// 电信关键词白名单（用于过滤搜索结果）
const TELECOM_KEYWORDS = /宽带|千兆|兆|上行|下行|网速|Mbps|Gbps|FTTR|光猫|路由|WiFi|网络|信号|套餐|月租|流量|通话|合约|裸机|以旧换新|购机|学生|校园|老人|适老|携号|转网|5G|4G|监控|智能家居|老房|布线|网线|提速|续费|避坑|攻略/i;
// 直播平台噪声词（命中即过滤）
const PLATFORM_NOISE = /虎牙|YY直播|CCTV直播|抖音直播|哔哩哔哩直播|快手直播|花椒直播|映客直播|酷狗直播|网易CC直播/i;

function isTelecomRelevant(text) {
  if (PLATFORM_NOISE.test(text)) return false;
  return TELECOM_KEYWORDS.test(text);
}

// T1 搜索：优先查 Gitee 知识库，其次必应，最后搜狗兜底
// 评估结论：必应(84ms/18/18) > 搜狗(限流) > 百度(660ms)
async function searchT1({ topic }) {
  console.log(`[searchT1] topic: ${topic}`);
  const results = [];
  const cleanKey = topic.replace(/[「」\?？!！、，。\s\d\-\/—]/g, '').slice(0, 20);
  
  // 缓存检查
  const cached = _searchCache.get(cleanKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    console.log(`[searchT1] Cache hit: ${cleanKey}`);
    return cached.data;
  }
  
  // 1. 知识库匹配（最快、最准）
  try {
    const knowledge = await getConfig('config/t1-knowledge.json', 
      process.env.GITEE_TOKEN, process.env.GITEE_USERNAME || 'hbatz');
    if (knowledge && knowledge.entries) {
      const cleaned = topic.replace(/[「」\?？!！、，。\s\d\-\/—]/g, '');
      let bestKey = null, bestScore = 0;
      for (const key of Object.keys(knowledge.entries)) {
        const kClean = key.replace(/[「」\?？!！、，。\s\d\-\/—]/g, '');
        if (kClean.length < 2) continue;
        let score = 0;
        if (cleaned.indexOf(kClean) >= 0) score += 30;
        if (cleaned.indexOf(kClean) === 0) score += 20;
        let maxSub = 0;
        for (let len = kClean.length; len >= 2; len--) {
          for (let i = 0; i <= kClean.length - len; i++) {
            if (cleaned.indexOf(kClean.substring(i, i + len)) >= 0) { maxSub = len; break; }
          }
          if (maxSub > 0) break;
        }
        score += maxSub * 3;
        if (kClean.length <= 3 && maxSub < 2) continue;
        if (kClean.length <= 5 && maxSub < 2) score -= 10;
        if (score > bestScore) { bestScore = score; bestKey = key; }
      }
      if (bestKey && bestScore >= 12) {
        console.log(`[searchT1] Knowledge: ${bestKey} (score=${bestScore})`);
        const value = knowledge.entries[bestKey];
        if (value.options) {
          const fmt = (opt) => opt.label + '｜' + (opt.detail || '').slice(0, 60);
          const data = {
            source: 'knowledge',
            a: fmt(value.options[0]),
            b: fmt(value.options[1]),
            c: fmt(value.options[2]),
            keyInsight: value.keyInsight || '',
            matchedKey: bestKey,
            results: [`✅ 知识库匹配: ${bestKey}`]
          };
          _searchCache.set(cleanKey, { ts: Date.now(), data });
          return data;
        }
      }
    }
  } catch(e) {
    console.log(`[searchT1] knowledge: ${e.message}`);
  }
  
  // 2. 必应搜索（84ms稳定，15/18相关）
  // 智能扩展查询：识别选题类型，添加电信相关关键词
  const rawTopic = topic.replace(/[？?！!。，、\s]+/g, ' ').slice(0, 30);
  const topicType = classifyTopic(rawTopic);
  const expandedQuery = expandQuery(rawTopic, topicType);
  const query = encodeURIComponent(expandedQuery);
  
  const bingHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Referer': 'https://cn.bing.com/'
  };
  
  try {
    const res = await fetch(`https://cn.bing.com/search?q=${query}&setlang=zh-cn&cc=cn&count=10`, {
      headers: bingHeaders,
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const html = await res.text();
      const algoBlocks = html.match(/<li[^>]*class="b_algo"[^>]*>[\s\S]*?<\/li>/g) || [];
      for (const block of algoBlocks.slice(0, 10)) {
        let title = '', snippet = '';
        const h2Match = block.match(/<h2[^>]*>[\s\S]*?<a[^>]*>((?:(?!<\/a>)[\s\S])*)<\/a>/);
        if (h2Match) title = h2Match[1].replace(/<[^>]+>/g, '').trim();
        const pMatch = block.match(/<p[^>]*>([^<]{20,300})<\/p>/);
        if (pMatch) snippet = pMatch[1].replace(/<[^>]+>/g, '').trim();
        // 过滤直播平台噪声 + 过滤不相关内容
        if (title && isTelecomRelevant(title)) results.push(title);
        if (snippet && isTelecomRelevant(snippet)) results.push(snippet);
      }
      // 备用解析：纯文本提取
      if (results.length < 3) {
        const cleanText = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
        const textChunks = cleanText.split(/\s{3,}|[。！\n]/).filter(t => t.trim().length > 15 && /\d/.test(t) && isTelecomRelevant(t));
        results.push(...textChunks.slice(0, 8));
      }
    }
  } catch(e) {
    console.log(`[searchT1] Bing: ${e.message}`);
  }
  
  // 3. 搜狗备用（若必应无结果）
  if (results.length < 3) {
    try {
      const sogouRes = await fetch(`https://www.sogou.com/web?query=${query}&ie=utf8`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Referer': 'https://www.sogou.com/'
        },
        signal: AbortSignal.timeout(6000)
      });
      if (sogouRes.ok) {
        const sogouHtml = await sogouRes.text();
        const sogouBlocks = sogouHtml.split('class="vrwrap"');
        for (let i = 1; i < Math.min(sogouBlocks.length, 8); i++) {
          const block = sogouBlocks[i];
          const titleM = block.match(/<h3[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
          const title = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim().slice(0, 80) : '';
          if (title && isTelecomRelevant(title)) results.push(title);
          const snippetM = block.match(/<p[^>]*>([^<]{20,300})<\/p>/);
          const snippet = snippetM ? snippetM[1].replace(/<[^>]+>/g, '').trim().slice(0, 100) : '';
          if (snippet && isTelecomRelevant(snippet)) results.push(snippet);
        }
      }
    } catch(e) {
      console.log(`[searchT1] Sogou: ${e.message}`);
    }
  }
  
  // 4. 提取 3 个方案
  const options = extractThreeOptions(results, topic);
  const source = options && results.length >= 3 ? 'search' : (results.length > 0 ? 'partial' : 'no-data');
  const fallbackA = '⚠️ 未找到该话题的准确数据，请手动填写真实方案（建议搜知乎或咨询营业厅）';
  const fallbackB = '⚠️ 填写参考：按 "入门级 → 推荐级 → 一步到位" 三个档位写';
  const fallbackC = '⚠️ 或搜 "' + topic.slice(0, 20) + ' 对比" 找到3个权威答案后填入';
  
  const data = {
    source,
    a: options?.a || fallbackA,
    b: options?.b || fallbackB,
    c: options?.c || fallbackC,
    keyInsight: '',
    results: results.slice(0, 5)
  };
  
  // 缓存搜索结果（缩短TTL）
  _searchCache.set(cleanKey, { ts: Date.now(), data });
  setTimeout(() => _searchCache.delete(cleanKey), CACHE_TTL);
  
  return data;
}

// T2 搜索：搜故事素材 → 返回匹配的故事模板字段
async function searchT2({ preset, topic }) {
  const searchTerms = {
    '维修': '宽带维修 上门 暖心 故事',
    '柜台': '营业厅 柜台 感动 故事',
    '温暖': '营业厅 温暖 感动 瞬间',
    '社区': '社区 电信 便民 服务 故事',
    '校园': '校园 开学 学生 故事',
    '突发': '暖心 突发 事件 帮助',
    '公益': '公益 电信 爱心 服务',
  };
  const query = searchTerms[preset?.slice(0,2)] || '营业厅 感人故事 电信';
  const results = [];
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Language': 'zh-CN,zh;q=0.9'
  };
  
  try {
    const res = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, {
      headers,
      timeout: 10000,
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      const html = await res.text();
      const algoMatches = html.match(/<li[^>]*class="b_algo"[^>]*>([\s\S]*?)<\/li>/g) || [];
      for (const m of algoMatches) {
        const titleMatch = m.match(/<a[^>]*>([^<]+)<\/a>/);
        const snippetMatch = m.match(/<p[^>]*>([^<]{20,300})<\/p>/);
        if (titleMatch) results.push(titleMatch[1].replace(/<[^>]+>/g, '').trim());
        if (snippetMatch) results.push(snippetMatch[1].replace(/<[^>]+>/g, '').trim());
      }
      if (results.length < 3) {
        const textBlocks = html.replace(/<script[\s\S]*?<\/script>/g, '')
                                .replace(/<style[\s\S]*?<\/style>/g, '')
                                .replace(/<[^>]+>/g, ' ')
                                .split(/\s{3,}/)
                                .filter(t => t.trim().length > 30);
        results.push(...textBlocks.slice(0, 8));
      }
    }
  } catch(e) {}
  
  return {
    source: results.length > 0 ? 'search' : 'fallback',
    snippets: results.slice(0, 5)
  };
}

// ============================================================
// AI call (SiliconFlow)
// ============================================================

async function loadAIConfig(token, user) {
  try {
    return await getConfig('config/ai-config.json', token, user);
  } catch (e) {
    return { enabled: true };
  }
}

// 2026-07-30: 硬封禁词强制清洗（抖音本地生活最致命的资费营销词）
// 宁可误伤：AI 一旦产出这些词，在返回前强制替换/剔除，杜绝封号风险。
// 长词优先（合约机/合约价 先于 合约），避免被部分替换后又残留。
const HARD_BAN = {
  '合约机': '合约套餐',
  '合约价': '套餐价',
  '合约': '套餐',
  '话费': '通信费',
  '号卡': '号码',
  '电话卡': '号码',
  '流量卡': '流量套餐',
  '月租费': '每月消费',
  '月租': '每月消费',
  '套餐费': '套餐价',
  '资费': '费用',
  '办卡': '办理',
  '开卡': '入网',
  '0元购': '特惠购',
  '免费领卡': '限时办理'
};
function sanitizeHardBan(text) {
  if (!text || typeof text !== 'string') return text;
  let out = text;
  for (const k in HARD_BAN) {
    if (out.indexOf(k) >= 0) out = out.split(k).join(HARD_BAN[k]);
  }
  return out;
}

// 2026-07-30: 立场安全清洗。脚本必须站在电信营业员角度，客观讲产品、讲故事，
// 禁止出现攻击/贬低电信或友商、否定运营商价值、明显错误立场的表述。
const STANCE_BAN = [
  { re: /电信更坑人|电信坑人|联通坑人|移动坑人|运营商坑人|运营商都是坑/g, to: '选套餐要细心' },
  { re: /不要相信运营商|别信运营商|不能相信运营商/g, to: '办理前多对比' },
  { re: /活该被.*坑/g, to: '别让老套餐多收钱' },
  { re: /被老套餐坑|被套餐坑|被宽带坑/g, to: '被老套餐多收钱' },
  { re: /坑三年|坑两年|坑一年/g, to: '多收钱三年' },
  { re: /纯纯大冤种/g, to: '多花冤枉钱' },
  { re: /大冤种/g, to: '多花钱' },
  { re: /交智商税/g, to: '花冤枉钱' },
  { re: /智商税/g, to: '冤枉钱' },
  { re: /被割韭菜/g, to: '花冤枉钱' },
  { re: /割韭菜/g, to: '不划算' },
  { re: /坑爹/g, to: '不合理' },
  { re: /黑心/g, to: '不合理' },
  { re: /瞎忽悠/g, to: '瞎宣传' },
  { re: /忽悠/g, to: '误导' },
  { re: /骗子套路/g, to: '骗子手法' },
  { re: /套路/g, to: '手法' }
];
function sanitizeStance(text) {
  if (!text || typeof text !== 'string') return text;
  let out = text;
  for (const rule of STANCE_BAN) {
    out = out.replace(rule.re, rule.to);
  }
  return out;
}

// 2026-07-30: 山西在售家宽档位统一为 300/500/1000/FTTR，禁止出现 100M/100兆。
function sanitize100M(text) {
  if (!text || typeof text !== 'string') return text;
  let out = text;
  // 先处理常见整句，避免直接替换后语义不通
  out = out.replace(/100兆打排位等于送人头/g, '300兆打排位才稳');
  out = out.replace(/100兆起步/g, '300兆起步');
  out = out.replace(/100兆宽带/g, '300兆宽带');
  out = out.replace(/100M/g, '300M');
  out = out.replace(/100兆/g, '300兆');
  // 2026-08-04: 补齐中文「百兆」写法（历史库曾出现「百兆宽带」），统一归到 300 档
  out = out.replace(/百兆宽带/g, '300兆宽带');
  out = out.replace(/百兆/g, '300兆');
  return out;
}

// 2026-07-31: tbnx 网关对 raw UTF-8 中文字节解析不稳定（偶发乱码/500）。
// 把 JSON 中的非 ASCII 字符统一转义为 \uXXXX，让请求体保持纯 ASCII，规避编码歧义。
function toAsciiJson(obj) {
  return JSON.stringify(obj).replace(/[\u007f-\uffff]/g, function(c) {
    return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

async function callSiliconFlow(system, user, apiKey, cfg) {
  const res = await fetch(cfg.endpoint || 'https://tbnx.plus7.plus/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${apiKey}`
    },
    body: toAsciiJson({
      model: cfg.model || 'deepseek-ai/DeepSeek-V4-Pro',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: cfg.temperature || 0.8,
      max_tokens: cfg.maxTokens || 2000
    }),
    signal: AbortSignal.timeout(cfg.timeoutMs || 180000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SiliconFlow ${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || null;
  return content ? sanitize100M(sanitizeStance(sanitizeHardBan(content))) : null;
}

// ============================================================
// Gitee file operations
// ============================================================

async function readGiteeFile(filePath, token, user) {
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filePath)}`;
  const res = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` }
  });
  if (!res.ok) throw new Error(`Gitee read ${res.status}`);
  const info = await res.json();
  if (!info.content) throw new Error('No content');
  return Buffer.from(info.content, 'base64').toString('utf-8');
}

async function createOrUpdateGiteeFile(filePath, content, token, user) {
  try {
    await updateGiteeFile(filePath, content, token, user);
  } catch (e) {
    if (e.message.includes('Cannot get SHA') || e.message.includes('404') || e.message.includes('Gitee read 404')) {
      const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filePath)}`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          content: Buffer.from(content, 'utf-8').toString('base64'),
          message: `auto(${new Date().toISOString().slice(0,10)}): create cache ${filePath.split('/').pop()}`,
          branch: 'master'
        })
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gitee create ${res.status}: ${errText}`);
      }
    } else {
      throw e;
    }
  }
}

async function updateGiteeFile(filePath, content, token, user) {
  // First get SHA
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filePath)}`;
  const getRes = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` }
  });
  if (!getRes.ok) throw new Error(`Gitee read ${getRes.status}`);
  const fileInfo = await getRes.json();
  if (!fileInfo.sha) throw new Error(`Cannot get SHA: ${JSON.stringify(fileInfo)}`);

  const updateRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      sha: fileInfo.sha,
      message: `auto(${new Date().toISOString().slice(0,10)}): update cache`,
      branch: 'master'
    })
  });
  if (!updateRes.ok) {
    const errText = await updateRes.text();
    throw new Error(`Gitee API ${updateRes.status}: ${errText}`);
  }
}

// ============================================================
// 真实统计聚合（落 Gitee data/stats.json，跨厅店真实统计）
// 设计：进程内聚合 + 20s 防抖回写 Gitee。
// 冷启动会从 Gitee 重新载入，因此跨实例/重启后仍能累计（最多丢失一个防抖窗口的数据）。
// ============================================================
const STATS_FILE = 'data/stats.json';
let __statsAgg = null;
let __statsFlushTimer = null;
const STATS_FLUSH_MS = 20000;

// action → 聚合计数器键
const STATS_ACTION_KEY = {
  store_bind: 'bind',
  store_change: 'bind',
  export_copy: 'export_copy',
  export_image: 'export_image',
  page_view: 'page_view',
  copy_text: 'export_copy',
  download_image: 'export_image'
};

async function loadStatsAgg(token, user) {
  if (__statsAgg) return __statsAgg;
  try {
    const raw = await readGiteeFile(STATS_FILE, token, user);
    __statsAgg = JSON.parse(raw);
  } catch (e) {
    __statsAgg = { stores: {}, total: { bind: 0, export_copy: 0, export_image: 0, page_view: 0 }, days: {}, updated: null };
  }
  return __statsAgg;
}

function bumpStatsAgg(action, store) {
  if (!__statsAgg) return;
  const today = new Date().toISOString().slice(0, 10);
  if (!__statsAgg.stores[store]) {
    __statsAgg.stores[store] = { bind: 0, export_copy: 0, export_image: 0, page_view: 0, first: today, last: today };
  }
  const st = __statsAgg.stores[store];
  st.last = today;
  if (!__statsAgg.days[today]) {
    __statsAgg.days[today] = { bind: 0, export_copy: 0, export_image: 0, page_view: 0, activeStores: {} };
  }
  const d = __statsAgg.days[today];
  const key = STATS_ACTION_KEY[action];
  if (key) {
    st[key] = (st[key] || 0) + 1;
    d[key] = (d[key] || 0) + 1;
    __statsAgg.total[key] = (__statsAgg.total[key] || 0) + 1;
  }
  if (store) d.activeStores[store] = (d.activeStores[store] || 0) + 1;
}

function scheduleFlushStats(token, user) {
  if (__statsFlushTimer) return;
  __statsFlushTimer = setTimeout(async function () {
    __statsFlushTimer = null;
    try {
      if (__statsAgg) {
        __statsAgg.updated = new Date().toISOString();
        await createOrUpdateGiteeFile(STATS_FILE, JSON.stringify(__statsAgg), token, user);
      }
    } catch (e) {
      console.warn('[stats] flush failed:', e.message);
    }
  }, STATS_FLUSH_MS);
}

// 读取真实聚合摘要（供管理员统计页展示）
async function getStatsSummary(token, user) {
  await loadStatsAgg(token, user);
  const a = __statsAgg;
  const today = new Date().toISOString().slice(0, 10);
  const todayAgg = a.days[today] || {};
  const activeToday = Object.keys(todayAgg.activeStores || {}).length;
  return {
    ok: true,
    updated: a.updated,
    totalStores: Object.keys(a.stores).length,
    totalBind: a.total.bind || 0,
    totalExport: (a.total.export_copy || 0) + (a.total.export_image || 0),
    totalPageView: a.total.page_view || 0,
    today: today,
    todayActiveStores: activeToday,
    todayBind: todayAgg.bind || 0,
    todayExport: (todayAgg.export_copy || 0) + (todayAgg.export_image || 0),
    todayPageView: todayAgg.page_view || 0,
    days: Object.keys(a.days).sort().slice(-30)
  };
}

// ============================================================
// Utility
// ============================================================

function getISOWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const ys = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - ys) / 86400000 + 1) / 7);
}

// ============================================================
// 冷启动自动更新 Event 函数
// Web 函数通过 Gitee + loader.js 自动获取最新代码，
// 同时用这个新代码帮 Event 函数也更新一次，以后全自动。
// ============================================================

const https = require('https');
const zlib = require('zlib');

async function updateEventFunction() {
  const giteeToken = process.env.GITEE_TOKEN;
  if (!giteeToken) return;
  console.log('[self-update] Checking Event function code from Gitee...');
  
  try {
    // 1. 从 Gitee 拉最新的 Event 函数代码
    const url = 'https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/scf-event/index.js';
    const getRes = await fetch(url + '?ref=master', {
      headers: { 'Authorization': 'token ' + giteeToken }
    });
    if (!getRes.ok) return;
    const data = await getRes.json();
    const code = Buffer.from(data.content, 'base64').toString('utf-8');
    
    // 2. 压缩为 zip（deflate + local file header）
    const compressed = zlib.deflateRawSync(code);
    const name = Buffer.from('index.js');
    
    function crc32(buf) {
      let crc = 0xFFFFFFFF;
      const table = new Int32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        table[i] = c;
      }
      for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
      return (crc ^ 0xFFFFFFFF) >>> 0;
    }
    
    const crc = crc32(code);
    const lh = Buffer.alloc(30 + name.length);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(8, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(compressed.length, 18); lh.writeUInt32LE(code.length, 22);
    lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28); name.copy(lh, 30);
    
    const ch = Buffer.alloc(46 + name.length);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(compressed.length, 20); ch.writeUInt32LE(code.length, 24);
    ch.writeUInt16LE(name.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38); ch.writeUInt32LE(0, 42);
    name.copy(ch, 46);
    
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(1, 8); eocd.writeUInt16LE(1, 10);
    eocd.writeUInt32LE(70 + name.length, 12); eocd.writeUInt32LE(0, 16); eocd.writeUInt16LE(0, 20);
    
    const zip = Buffer.concat([lh, compressed, ch, eocd]);
    const zipB64 = zip.toString('base64');
    
    // 3. 用腾讯云 SCF API 更新 Event 函数
    // CAM 临时凭证由 SCF 平台自动注入
    const secretId = process.env.TENCENTCLOUD_SECRETID;
    const secretKey = process.env.TENCENTCLOUD_SECRETKEY;
    const sessionToken = process.env.TENCENTCLOUD_SESSIONTOKEN;
    
    if (!secretId || !secretKey) {
      console.log('[self-update] No CAM credentials, skip SCF API call');
      return;
    }
    
    const endpoint = 'scf.tencentcloudapi.com';
    const action = 'UpdateFunctionCode';
    const version = '2018-04-16';
    const region = 'ap-guangzhou';
    const timestamp = Math.floor(Date.now() / 1000);
    
    // TC3-HMAC-SHA256 签名
    const crypto = require('crypto');
    const algorithm = 'TC3-HMAC-SHA256';
    const service = 'scf';
    const host = endpoint;
    const httpMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const payload = JSON.stringify({
      FunctionName: 'douyin-update-hotspot',
      Handler: 'index.main_handler',
      ZipFile: zipB64,
      EnvId: ''
    });
    const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
    const canonicalHeaders = 'content-type:application/json\nhost:' + host + '\n';
    const signedHeaders = 'content-type;host';
    const canonicalRequest = httpMethod + '\n' + canonicalUri + '\n' + canonicalQueryString + '\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;
    
    const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
    const credentialScope = date + '/' + service + '/tc3_request';
    const stringToSign = algorithm + '\n' + timestamp + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    
    const secretDate = crypto.createHmac('sha256', 'TC3' + secretKey).update(date).digest();
    const secretService = crypto.createHmac('sha256', secretDate).update(service).digest();
    const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest();
    const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex');
    
    const authorization = algorithm + ' Credential=' + secretId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
    
    const options = {
      hostname: host,
      port: 443,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Host': host,
        'X-TC-Action': action,
        'X-TC-Version': version,
        'X-TC-Region': region,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Token': sessionToken || '',
        'Authorization': authorization
      }
    };
    
    const updateRes = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk.toString());
        res.on('end', () => resolve({ status: res.statusCode, body }));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
    
    if (updateRes.status === 200) {
      console.log('[self-update] Event function updated successfully!');
    } else {
      console.log('[self-update] Update result:', updateRes.status, updateRes.body.slice(0, 200));
    }
  } catch(e) {
    console.error('[self-update] Failed:', e.message);
  }
}

// 冷启动触发一次
setTimeout(updateEventFunction, 1000);

// ============================================================
// weekly-persona: 每周一 t1/t2/t4 各自动新增 3 个选题，并直接生成 6 人设完整口播稿
// 内容来源：热点(4 lane) + 搜索截流 + 厅店日常活动(config 季节/活动/用户重点)
// 结果：合并写入 data/{t}ScriptFullByPersona.js（新增 key 保留历史），并写 data/weeklyNew.js 供前端标「本周新增」
// ============================================================
async function handleWeeklyPersona(res, params, corsHeaders) {
  const token = process.env.GITEE_TOKEN;
  const user = process.env.GITEE_USERNAME || 'hbatz';
  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error:'SILICONFLOW_API_KEY not configured' })); return; }
  try {
    const cands = await fetchAllHotspotsSCF();
    const hotTxt = cands.hot.slice(0, 25).map(c => '[热点] ' + c.word + (c.heat ? (' 热度' + c.heat) : '')).join('\n');
    const searchTxt = cands.search.slice(0, 15).map(c => '[搜索截流] ' + c.word + ' → 意图:' + (c.intent || '')).join('\n');
    let actTxt = '';
    try { const sa = await getConfig('config/t2-seasonal.json', token, user); actTxt += '【季节/活动配置】\n' + JSON.stringify(sa).slice(0, 1000) + '\n'; } catch (e) {}
    try { const up = await getConfig('config/user-priority.json', token, user); actTxt += '【用户固定重点选题】\n' + JSON.stringify(up).slice(0, 1000) + '\n'; } catch (e) {}
    try { const se = await getConfig('config/seasons.json', token, user); actTxt += '【季节】\n' + JSON.stringify(se).slice(0, 500) + '\n'; } catch (e) {}

    const cfg = await loadAIConfig(token, user);
    const added = {};
    for (const t of ['t1', 't2', 't4']) {
      const existing = await loadScriptFull(t, token, user);
      const existKeys = Object.keys(existing);
      const spec = SCRIPT_SPEC[t];
      const sys = '你是山西电信抖音内容运营专家。为「' + spec.name + '」内容生成3个全新选题，每个选题写6个人设版本的完整可拍脚本。\n\n' +
        '【6人设（key 必须严格用以下英文，禁止翻译或改名）】\n' +
        PERSONA_STD.map(function (k) { return '- ' + k + '：' + PERSONA_DESC[k]; }).join('\n') + '\n\n' +
        '【结构要求】\n' + spec.struct + '\n\n' +
        '【通用约束】\n' +
        '- 口语化、接地气，禁止AI味和书面腔\n' +
        '- 山西电信在售宽带仅300M/500M/1000M/FTTR，禁止出现100M/100兆/百兆\n' +
        '- 不直接做电信/联通/移动三家横向对比\n' +
        '- 输出严格JSON（不要markdown代码块、不要解释），结构：\n' +
        '{"选题名1":{"sister":"脚本","sweet":"脚本","tech":"脚本","biz":"脚本","young":"脚本","master":"脚本"},"选题名2":{...},"选题名3":{...}}';
      const userP = spec.task + '\n\n【话题热点】\n' + hotTxt + '\n\n【搜索截流词】\n' + searchTxt + '\n\n【厅店日常活动/季节】\n' + actTxt + '\n\n【现有选题（不要重复，新选题须明显不同）】\n' + existKeys.slice(0, 40).join('、') + '\n\n请生成3个新选题，每个选题写满6个人设脚本。';
      const raw = await callSiliconFlow(sys, userP, apiKey, { endpoint: cfg.endpoint, model: cfg.model || params.model || 'deepseek-v4-pro', temperature: 0.92, maxTokens: 8000, timeoutMs: 180000 });
      if (!raw) { added[t] = { error: 'AI 空响应' }; continue; }
      const parsed = extractJsonObject(raw);
      if (!parsed || typeof parsed !== 'object') { added[t] = { error: '解析失败', rawPreview: String(raw).slice(0, 300) }; continue; }
      const merged = Object.assign({}, existing);
      let cnt = 0;
      const cleanKeys = [];
      for (const k of Object.keys(parsed)) {
        const pm = coercePersonaMap(parsed[k]);
        if (pm) {
          // 选题名 + 每个 persona 脚本都过 立场/100M 红线净化
          const cleanKey = hsSanitize(k);
          const cleanPm = {};
          for (const pk of PERSONA_STD) cleanPm[pk] = hsSanitize(pm[pk] || '');
          merged[cleanKey] = cleanPm;
          cleanKeys.push(cleanKey);
          cnt++;
        }
      }
      await writeScriptFull(t, merged, token, user);
      added[t] = { count: cnt, keys: cleanKeys };
    }

    // t1 新选题同时并入选题库（topicPool.decision），供前端 t1 选题下拉展示「本周新增」
    try {
      const tpRaw = await readGiteeFile('data/topicPool.js', token, user);
      const tp = parseTopicPool(tpRaw);
      const t1New = (added.t1 && added.t1.keys) || [];
      const dec = Array.isArray(tp.decision) ? tp.decision.slice() : [];
      for (const k of t1New) { if (dec.indexOf(k) < 0) dec.push(k); }
      tp.decision = dec;
      const tpHeader = '// Auto-generated data file\n// Last updated: ' + new Date().toISOString().slice(0, 10) + ' · 数据源: 热点/搜索截流/厅店活动(每周一自动更新)\n';
      const tpJs = tpHeader + 'window.___topicPool = ' + JSON.stringify(tp, null, 2) + ';';
      await createOrUpdateGiteeFile('data/topicPool.js', tpJs, token, user);
    } catch (e) { console.warn('[weekly-persona] topicPool merge failed:', e.message); }

    const week = isoWeek(new Date());
    const weeklyNew = {
      t1: (added.t1.keys || []),
      t2: (added.t2.keys || []),
      t4: (added.t4.keys || []),
      week: week,
      updatedAt: new Date().toISOString()
    };
    const wnJs = '// Auto-generated: weekly new topics (updated weekly)\n// Updated: ' + new Date().toISOString().slice(0, 10) + ' · 标注「本周新增」的选题由每周一自动生成\nwindow.___weeklyNew = ' + JSON.stringify(weeklyNew, null, 2) + ';';
    await createOrUpdateGiteeFile('data/weeklyNew.js', wnJs, token, user);
    res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok: true, added: added, week: week, weeklyNew: weeklyNew }));
  } catch (e) {
    res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok: false, error: e.message || 'weekly-persona failed' }));
  }
}

// 2026-08-04: 批量补齐 t1Presets 中缺脚本的选题（topicPool.decision 有但 t1Presets 无）
async function handleFillMissingT1(res, params, corsHeaders) {
  const token = process.env.GITEE_TOKEN;
  const user = process.env.GITEE_USERNAME || 'hbatz';
  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey) { res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok:false, error:'SILICONFLOW_API_KEY not configured' })); return; }
  try {
    // 读 topicPool + t1Presets
    const [tpRaw, t1Raw] = await Promise.all([
      readGiteeFile('data/topicPool.js', token, user),
      readGiteeFile('data/t1Presets.js', token, user)
    ]);
    const pool = parseTopicPool(tpRaw);
    const presets = parsePresetJs(t1Raw, 't1');
    const haveKeys = new Set(Object.keys(presets));
    const missing = (pool.decision || []).filter(k => !haveKeys.has(k));

    if (missing.length === 0) {
      res.writeHead(200, corsHeaders); res.end(JSON.stringify({ ok:true, filled:0, message:'无缺口' }));
      return;
    }

    const cfg = await loadAIConfig(token, user);
    const BATCH_SIZE = 6;
    const allNew = {};

    for (let i = 0; i < missing.length; i += BATCH_SIZE) {
      const batch = missing.slice(i, i + BATCH_SIZE);
      const sys = '你是山西电信抖音内容运营专家。为以下「决策指南」类选题生成脚本模板。每个选题给出2-3个人群/档位视角的一句话脚本。';
      const userP = '请为以下' + batch.length + '个选题各生成脚本预设（JSON对象）：\n' + batch.map((k, idx) => (idx+1) + '. ' + k).join('\n') +
        '\n\n【输出要求】只返回一个JSON对象（不要markdown代码块），键为选题名，值为{人群档位:"一句话脚本",...}。\n注意：山西电信在售宽带仅300/500/1000/FTTR，禁止出现100M/100兆/百兆。脚本站在营业员角度。';
      const raw = await callSiliconFlow(sys, userP, apiKey, { endpoint: cfg.endpoint, model: cfg.model || params.model || 'deepseek-v4-pro', temperature: 0.85, maxTokens: 8000, timeoutMs: 180000 });
      if (!raw) continue;
      const parsed = extractJsonObject(raw);
      if (!parsed || typeof parsed !== 'object') continue;
      for (const k of Object.keys(parsed)) {
        if (parsed[k] && typeof parsed[k] === 'object') {
          const ck = hsSanitize(k);
          allNew[ck] = sanitizePresetObj(parsed[k]);
        }
      }
    }

    // 合并写回
    const merged = Object.assign({}, presets, allNew);
    await writePreset('t1', merged, token, user);

    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ ok: true, filled: Object.keys(allNew).length, total: Object.keys(merged).length, keys: Object.keys(allNew) }));
  } catch (e) {
    res.writeHead(500, corsHeaders); res.end(JSON.stringify({ ok: false, error: e.message }));
  }
}

function extractJsonObject(text) {
  if (!text) return null;
  const s = String(text);
  const start = s.indexOf('{');
  if (start < 0) return null;
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) return null;
  try { return JSON.parse(s.slice(start, end + 1)); } catch (e) { return null; }
}

// 2026-08-04: 递归净化 preset 对象的所有字符串叶子（选题名、脚本、desc 等），
// 统一过 立场安全 + 100M/百兆档位红线，避免 AI 生成的嵌套脚本带违规表述。
function sanitizePresetObj(obj) {
  if (Array.isArray(obj)) return obj.map(function (v) { return sanitizePresetObj(v); });
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) out[hsSanitize(k)] = sanitizePresetObj(obj[k]);
    return out;
  }
  if (typeof obj === 'string') return hsSanitize(obj);
  return obj;
}

// 2026-08-04 改造：weekly-persona 直接产出 6 人设完整口播稿（写 ScriptFullByPersona）
const PERSONA_STD = ['sister', 'sweet', 'tech', 'biz', 'young', 'master'];
const PERSONA_DESC = {
  sister: '陌棠宇组·知性姐姐，专业但不端着，像经验丰富的客服主管',
  sweet: '甜美学姐，甜美亲切，像邻家妹妹',
  tech: '技术达人，极客范儿，理性分析型',
  biz: '商务精英，干练简洁，效率优先',
  young: '青春达人，潮流年轻人，网感强',
  master: '资深店长，沉稳权威，像老师傅'
};
const PERSONA_ALIAS = {
  sister: ['sister', '姐', '知性', '陌棠'],
  sweet: ['sweet', '甜', '学姐', '妹'],
  tech: ['tech', '技术', '极客'],
  biz: ['biz', '商务', '精英', '老板'],
  young: ['young', '青春', '年轻', '潮'],
  master: ['master', '店长', '师傅', '资深', '老哥', '老弟', '叔']
};

// 把 AI 返回的任意 key 归一化为标准 6 人设；缺失/别名都兜底，保证 6 key 全有值
function coercePersonaMap(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const out = {};
  for (const k of PERSONA_STD) {
    if (typeof entry[k] === 'string' && entry[k].trim()) out[k] = entry[k];
  }
  for (const k of PERSONA_STD) {
    if (out[k]) continue;
    const aliases = PERSONA_ALIAS[k] || [];
    for (const ak of Object.keys(entry)) {
      if (aliases.some(a => ak.toLowerCase().indexOf(a.toLowerCase()) >= 0)) { out[k] = entry[ak]; break; }
    }
  }
  const vals = Object.values(out);
  if (vals.length) {
    for (const k of PERSONA_STD) if (!out[k]) out[k] = vals[0];
  }
  return Object.keys(out).length ? out : null;
}

// ── ScriptFullByPersona 分片存储（解决 SCF 出网无法写大文件到 Gitee 的问题）──
// 存储结构：data/{t}SFB/_index.json = [topicKey,...]；data/{t}SFB/{i}.json = 该选题的 6 人设脚本
// 读取时按 index 拼装回单对象；SCF /data 端点再包成 window.___tXScriptFullByPersona 返回给前端。
const __sfbCache = {};
async function readGiteeFileR(p, token, user, tries = 3) {
  for (let a = 0; a < tries; a++) {
    try { return await readGiteeFile(p, token, user); }
    catch (e) { if (a === tries - 1) throw e; await new Promise(r => setTimeout(r, 400 * (a + 1))); }
  }
}
async function readScriptFullChunked(t, token, user) {
  const idxRaw = await readGiteeFileR('data/' + t + 'SFB/_index.json', token, user);
  const keys = JSON.parse(idxRaw);
  if (!Array.isArray(keys)) throw new Error('bad SFB index');
  const parts = await Promise.all(keys.map((k, i) =>
    readGiteeFileR('data/' + t + 'SFB/' + i + '.json', token, user).then(r => [k, JSON.parse(r)])
  ));
  const out = {};
  for (const [k, v] of parts) out[k] = v;
  return out;
}
async function writeScriptFullChunked(t, obj, token, user) {
  const keys = Object.keys(obj);
  await createOrUpdateGiteeFile('data/' + t + 'SFB/_index.json', JSON.stringify(keys), token, user);
  for (let i = 0; i < keys.length; i++) {
    await createOrUpdateGiteeFile('data/' + t + 'SFB/' + i + '.json', JSON.stringify(obj[keys[i]]), token, user);
  }
  delete __sfbCache[t];
}
async function assembleScriptFullJs(t, token, user) {
  const now = Date.now();
  if (__sfbCache[t] && (now - __sfbCache[t].ts < 60000)) return __sfbCache[t].js;
  let obj;
  try {
    obj = await readScriptFullChunked(t, token, user);
  } catch (e) {
    try { const raw = await readGiteeFile('data/' + t + 'ScriptFullByPersona.js', token, user); obj = parsePresetJs(raw, t) || {}; }
    catch (e2) { obj = {}; }
  }
  const js = '// Auto-assembled ' + t + ' full scripts (by persona)\nwindow.___' + t + 'ScriptFullByPersona = ' + JSON.stringify(obj) + ';';
  __sfbCache[t] = { ts: now, js };
  return js;
}
async function loadScriptFull(t, token, user) {
  try {
    const chunked = await readScriptFullChunked(t, token, user);
    if (chunked && Object.keys(chunked).length) return chunked;
  } catch (e) {}
  try { const raw = await readGiteeFile('data/' + t + 'ScriptFullByPersona.js', token, user); return parsePresetJs(raw, t) || {}; }
  catch (e) { return {}; }
}
async function writeScriptFull(t, obj, token, user) {
  await writeScriptFullChunked(t, obj, token, user);
}

// 各类型脚本结构说明（用于 AI prompt）
const SCRIPT_SPEC = {
  t1: {
    name: '决策指南（对比推荐）口播稿',
    task: '生成3个适合电信营业厅的「决策指南」类选题（如：XX怎么选，给出不同人群/场景该选什么）。',
    struct: '每个选题写6人设口播稿，每版结构：开头钩子(1-2句，抓注意力)→分3档位口播正文(每档30-50字，像跟朋友聊天一样自然)→收尾CTA(引导到店/咨询)，总120-180字。'
  },
  t2: {
    name: '一线服务故事口播稿',
    task: '生成3个真实可拍的「一线服务场景」选题（如：某客户遇到XX问题，营业员怎么一步步解决）。',
    struct: '每个选题写6人设服务故事口播稿，结构：具体人物(客户)+时间+问题+发现原因+解决步骤+客户反应+一句话总结，像讲身边发生的事，有画面感有对话，150-250字，结尾自然带出营业厅服务价值。'
  },
  t4: {
    name: '本地福利活动推广口播稿',
    task: '生成3个「本地探店/福利活动」选题（如：免费贴膜、办业务送礼、以旧换新、0元体验）。',
    struct: '每个选题写6人设营销推广口播稿，结构：突出活动利益点(免费/优惠/礼品/体验)+明确行动号召(扫码/到店/关注)，短促有力，80-150字。'
  }
};

function parsePresetJs(text, t) {
  const m = String(text);
  const i = m.indexOf('{');
  const j = m.lastIndexOf('}');
  if (i < 0 || j < 0 || j < i) return {};
  return JSON.parse(m.slice(i, j + 1));
}

function parseTopicPool(text) {
  const m = String(text);
  const i = m.indexOf('{');
  const j = m.lastIndexOf('}');
  if (i < 0 || j < 0 || j < i) return { decision: [], scene: [], review: [], local: [] };
  return JSON.parse(m.slice(i, j + 1));
}

async function loadPreset(t, token, user) {
  try { const raw = await readGiteeFile('data/' + t + 'Presets.js', token, user); return parsePresetJs(raw, t) || {}; }
  catch (e) { return {}; }
}

async function writePreset(t, obj, token, user) {
  const header = '// Auto-generated ' + t.toUpperCase() + ' presets\n// Updated: ' + new Date().toISOString().slice(0, 10) + ' · 数据源: 热点/搜索截流/厅店活动(每周一自动更新)\n';
  const js = header + 'window.___' + t + 'Presets = ' + JSON.stringify(obj, null, 2) + ';';
  await createOrUpdateGiteeFile('data/' + t + 'Presets.js', js, token, user);
}

function isoWeek(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const week = 1 + Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return date.getFullYear() + '-W' + String(week).padStart(2, '0');
}

const PRESET_SPEC = {
  t1: {
    name: '决策指南（对比推荐）',
    task: '生成3个适合电信营业厅的「决策指南」类选题模板。每个选题下给出2-3个人群/档位视角的一句话脚本，帮用户对比选择、说清谁适合什么。',
    schema: `{
  "选题名1": { "人群档位A": "一句话脚本：适合谁、为什么选", "人群档位B": "一句话脚本", "人群档位C": "一句话脚本" },
  "选题名2": { ... },
  "选题名3": { ... }
}`
  },
  t2: {
    name: '一线服务故事',
    task: '生成3个真实可拍的「一线服务场景」故事模板（如上门维修/柜台服务/突发状况）。每个含 icon、desc、time、customer、problem、finding、steps、reaction、summary、tags。',
    schema: `{
  "场景名1": { "icon":"🔧","desc":"一句话场景描述","time":"今天下午","customer":"阿姨","problem":"客户遇到的问题","finding":"你发现的原因","steps":"1.步骤一 2.步骤二 3.步骤三","reaction":"客户反应","summary":"一句话总结（拉信任/引互动）","tags":"#标签1 #标签2" },
  "场景名2": { ... },
  "场景名3": { ... }
}`
  },
  t4: {
    name: '本地福利活动',
    task: '生成3个「本地探店/福利活动」模板（如免费贴膜、办业务送礼、以旧换新）。每个含 icon、benefit、desc、tags、season。',
    schema: `{
  "活动名1": { "icon":"📱","benefit":"福利一句话","desc":"活动详情（在哪、有什么福利、怎么参与）","tags":"#标签1 #标签2","season":"全年/暑期/节日名" },
  "活动名2": { ... },
  "活动名3": { ... }
}`
  }
};
