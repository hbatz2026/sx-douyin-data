// 山西电信抖本内容工坊 · 云端自动化核心脚本
// 在 GitHub Actions / Node.js 环境下运行，不依赖 WorkBuddy
// 用法: node scripts/update-data.mjs hotspot|topics|bgm

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');

// ========== 配置 ==========
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';

// ========== 工具函数 ==========
function log(msg) { console.log(`[${new Date().toISOString().slice(11,19)}] ${msg}`); }

async function callDeepSeek(systemPrompt, userPrompt, maxTokens = 4000) {
  if (!DEEPSEEK_API_KEY) throw new Error('DEEPSEEK_API_KEY not set');
  
  log('Calling DeepSeek API...');
  const res = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    })
  });
  
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err}`);
  }
  
  const json = await res.json();
  return json.choices[0].message.content;
}

async function fetchTrends() {
  log('Fetching trending data...');
  try {
    const res = await fetch('https://hotflashnews.com/platform/douyin', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    
    // Extract trending topics from HTML
    const topics = [];
    const regex = /<a href="https:\/\/www\.douyin\.com\/hot\/(\d+)"[^>]*>([^<]+)<\/a>.*?热度\s*(\d+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      topics.push({ id: match[1], title: match[2].trim(), heat: parseInt(match[3]) });
    }
    
    if (topics.length === 0) {
      // Fallback: try simpler extraction
      const simpleRegex = /<a href="https:\/\/www\.douyin\.com\/hot\/\d+">([^<]+)<\/a>/g;
      while ((match = simpleRegex.exec(html)) !== null) {
        topics.push({ id: '', title: match[1].trim(), heat: 0 });
      }
    }
    
    log(`Found ${topics.length} trending topics`);
    return topics.slice(0, 50);
  } catch (e) {
    log(`Failed to fetch trends: ${e.message}`);
    return [];
  }
}

// ========== 热点跟拍更新 ==========
async function updateHotspot() {
  log('=== 更新热点跟拍数据 ===');
  
  const trends = await fetchTrends();
  if (trends.length === 0) {
    log('No trends found, using DeepSeek web search fallback');
  }
  
  const trendList = trends.map((t, i) => `${i+1}. ${t.title}`).join('\n');
  
  const systemPrompt = `你是山西电信抖音内容运营专家。基于提供的今日抖音热搜榜，生成7条适合电信营业厅跟拍的热点内容。
输出必须是合法的JavaScript代码，格式为：

window.___hotspotData = [
  {
    id: 'h1', tier: 1, title: '热点标题',
    heat: '热度描述（含真实数字）',
    why: '为什么适合电信营业厅跟拍',
    source: 'https://www.douyin.com/search/关键词?type=general',
    steps: [
      { shot: '拍摄步骤1', sub: '字幕提示' },
      { shot: '拍摄步骤2', sub: '字幕提示' },
      { shot: '拍摄步骤3', sub: '字幕提示' }
    ],
    bgm: 'BGM歌名 - 艺人',
    tags: '#标签1 #标签2',
    difficulty: 1,
    needFace: true,
    time: '5分钟'
  },
  // ... 共7条
];

规则：
1. 难度分三级：tier=1（专业翻拍，适合有经验的，2条）、tier=2（行业套用，适合营业厅改编，2-3条）、tier=3（纯跟拍，零基础，剩余）
2. 优先选：零基础手势舞/对口型/慢动作/搞笑段子类
3. 每个热点必须具体可执行，营业厅员工能拍得出来
4. 优先当前真实热搜，其次未来7天内节日/活动
5. 每条热点的heat字段需包含真实热度数字或话题播放量
6. 输出纯JS代码，不要包裹在markdown代码块中`;

  const userPrompt = `今日抖音热搜榜TOP50：
${trendList || '（热搜获取失败，请基于你对2026年6月当前热门话题的了解生成）'}

请生成7条适合电信营业厅跟拍的热点内容。要求包含：
- 2条世界杯/体育相关
- 2条节日/生活相关（端午节6.19、618大促、毕业季）
- 1条通信/宽带/手机相关
- 2条零门槛通用跟拍（舞蹈/对口型/情绪短片）

注意：今天是2026年6月16日周二，端午节6月19日周五，618大促6月18日截止。输出纯JavaScript代码，不要包裹在markdown中。`;

  const result = await callDeepSeek(systemPrompt, userPrompt, 4000);
  
  // Clean up any markdown wrapping
  let js = result.trim();
  js = js.replace(/^```(?:javascript|js)?\s*/i, '').replace(/\s*```$/, '');
  
  // Add header comment
  const header = `// Auto-generated: hotspot follow-shot data (updated weekly)\n// Last updated: ${new Date().toISOString().slice(0,10)} · 数据来源: hotflashnews.com + DeepSeek\n`;
  js = header + js;
  
  if (!js.startsWith('window.___hotspotData')) {
    throw new Error('Generated JS does not start with window.___hotspotData');
  }
  
  // Validate JS syntax
  try {
    new Function(js);
    log('JS syntax valid');
  } catch (e) {
    log(`JS syntax error: ${e.message}`);
    log('Raw output: ' + result.slice(0, 500));
    throw e;
  }
  
  writeFileSync(join(DATA_DIR, 'hotspotData.js'), js, 'utf-8');
  log('hotspotData.js updated successfully');
}

// ========== 选题库更新 ==========
async function updateTopics() {
  log('=== 更新选题库 ===');
  
  const trends = await fetchTrends();
  const trendList = trends.map((t, i) => `${i+1}. ${t.title}`).join('\n');
  
  const systemPrompt = `你是山西电信抖音内容运营专家。基于今日热搜和行业动态，生成电信营业厅短视频选题库。
输出两个合法的JavaScript文件内容，格式为：

FILE 1: window.___topicPool = {
  decision: ['选题1', '选题2', ...],  // 决策指南型，24个
  scene: ['选题1', '选题2', ...],     // 一线场景型，24个
  review: ['选题1', '选题2', ...],    // 深度测评型，24个
  local: ['选题1', '选题2', ...]      // 本地事件型，24个
};

FILE 2: window.___t1Presets = {
  '选题名称': [
    '场景A描述：包含具体价格/数据',
    '场景B描述：包含具体价格/数据',
    '场景C描述：包含具体价格/数据'
  ],
  // ... 每个decision选题对应一个预设
};

规则：
1. 每个分类24个选题，共96个
2. 替换30-50%过时选题，保留经过验证的高互动选题
3. 前瞻节日（未来14天内）优先级最高
4. 选题必须具体可操作，电信营业厅员工能拍
5. 输出纯JS代码，不要包裹markdown`;

  const userPrompt = `今日抖音热搜：
${trendList || '获取失败，请基于当前热点自行生成'}

今天是2026年6月16日，前瞻节日：端午节6.19、618大促6.18截止、毕业季、暑假将至。

请生成完整的 topicPool 和 t1Presets。
输出两个代码块，用 ===FILE_SPLIT=== 分隔：
第一个是 topicPool，第二个是 t1Presets。
每个代码块都是纯JavaScript，不要包裹markdown。`;

  const result = await callDeepSeek(systemPrompt, userPrompt, 6000);
  
  const parts = result.split('===FILE_SPLIT===');
  if (parts.length !== 2) {
    throw new Error(`Expected 2 parts, got ${parts.length}. Response: ${result.slice(0,300)}`);
  }
  
  const header = `// Auto-generated data file\n// Last updated: ${new Date().toISOString().slice(0,10)} · 数据来源: hotflashnews.com + DeepSeek\n`;
  
  // Topic pool
  let topicJs = parts[0].trim();
  topicJs = topicJs.replace(/^```(?:javascript|js)?\s*/i, '').replace(/\s*```$/, '');
  if (!topicJs.includes('window.___topicPool')) {
    topicJs = 'window.___topicPool = ' + topicJs;
  }
  topicJs = header + topicJs;
  
  // T1 presets
  let presetJs = parts[1].trim();
  presetJs = presetJs.replace(/^```(?:javascript|js)?\s*/i, '').replace(/\s*```$/, '');
  if (!presetJs.includes('window.___t1Presets')) {
    presetJs = 'window.___t1Presets = ' + presetJs;
  }
  presetJs = header + presetJs;
  
  // Validate
  new Function(topicJs);
  new Function(presetJs);
  
  writeFileSync(join(DATA_DIR, 'topicPool.js'), topicJs, 'utf-8');
  writeFileSync(join(DATA_DIR, 't1Presets.js'), presetJs, 'utf-8');
  log('topicPool.js + t1Presets.js updated');
}

// ========== BGM 更新 ==========
async function updateBgm() {
  log('=== 更新BGM推荐 ===');
  
  const systemPrompt = `你是抖音短视频BGM专家。请生成当前抖音热门BGM推荐列表，用于电信营业厅短视频内容生产。
输出必须是合法的JavaScript代码，格式为：

window.___bgmList = {
  "决策指南": {
    "轻快对比": ["歌名 - 艺人", ...],
    "算账节奏": [...],
    "温馨推荐": [...]
  },
  "一线场景": {
    "温情叙事": [...],
    "轻纪录片": [...],
    "快节奏爽片": [...],
    "原声不加BGM": ["🔇 现场原声（推荐）"]
  },
  "深度测评": {
    "科技感": [...],
    "冷静专业": [...],
    "干货教学": [...]
  },
  "本地事件": {
    "探店活力": [...],
    "福利快闪": [...],
    "温馨服务": [...]
  },
  "直播": {
    "暖场": [...],
    "逼单": [...],
    "福利": [...]
  }
};

规则：
1. 每个子分类2-3首
2. 优先2026年6月抖音热歌榜歌曲
3. 兼顾中国风、电子、流行、轻音乐等风格
4. 如有未来节日，对应情绪分类填充节日应景BGM
5. BGM必须是抖音App内可搜到的
6. 输出纯JS代码，不包裹markdown`;

  const userPrompt = `今天是2026年6月16日。前瞻节日：端午节6.19（中国风）、618大促（快节奏）。
请生成完整的bgmList，覆盖5大内容形态×3情绪分类。
确保歌曲是2026年抖音上真实热门的，能在抖音App内搜到。
输出纯JavaScript代码。`;

  const result = await callDeepSeek(systemPrompt, userPrompt, 3000);
  
  let js = result.trim();
  js = js.replace(/^```(?:javascript|js)?\s*/i, '').replace(/\s*```$/, '');
  
  if (!js.startsWith('window.___bgmList')) {
    js = 'window.___bgmList = ' + js;
  }
  
  const header = `// Auto-generated: BGM recommendations\n// Last updated: ${new Date().toISOString().slice(0,10)} · 数据来源: DeepSeek + 抖音热歌榜\n`;
  js = header + js;
  
  new Function(js);
  writeFileSync(join(DATA_DIR, 'bgmList.js'), js, 'utf-8');
  log('bgmList.js updated');
}

// ========== 主入口 ==========
const mode = process.argv[2];
if (!mode || !['hotspot', 'topics', 'bgm'].includes(mode)) {
  console.error('Usage: node scripts/update-data.mjs <hotspot|topics|bgm>');
  process.exit(1);
}

try {
  log(`Starting update mode: ${mode}`);
  
  if (mode === 'hotspot') await updateHotspot();
  else if (mode === 'topics') await updateTopics();
  else if (mode === 'bgm') await updateBgm();
  
  log('Done!');
} catch (e) {
  log(`ERROR: ${e.message}`);
  console.error(e);
  process.exit(1);
}
