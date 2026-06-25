// SCF Web函数 — 抖本个性化脚本API
// 环境变量: GITEE_TOKEN, GITEE_USERNAME, SILICONFLOW_API_KEY
// 部署: v=2026-06-24

const CACHE_VER = 'v7'; // stronger T2 story constraint

const http = require('http');

let _configCache = {};

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

  if (req.method !== 'POST') {
    res.writeHead(405, corsHeaders); res.end(JSON.stringify({ error: 'Method not allowed' })); return;
  }

  try {
    let body = '';
    for await (const chunk of req) { body += chunk; }
    const params = JSON.parse(body);
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

const PERSONA_PROMPTS = {
  sweet:   {role:'你是电信营业厅的年轻女员工。',tone:'口吻轻快甜美，有抖音网感，爱用"宝子们""姐妹们"。用热梗拉近距离。'},
  tech:    {role:'你是电信技术专家，专业测评人。',tone:'用实测数据和参数表说话。客观、有依据、不浮夸。数字精确到小数点。禁止用"宝子们""姐妹们""暖心"等销售腔。口头禅："今天实测了""数据在这，你自己看。"'},
  biz:     {role:'你是商务专家。',tone:'说话干练，直奔主题，信息密度高。数字前置，结论先行。不讲废话。'},
  young:   {role:'你是年轻男员工。',tone:'口语化接地气，有网感。爱用"兄弟们"开头，喜欢吐槽和夸张对比。'},
  master:  {role:'你是资深装维老师傅，干了二十年。',tone:'用真实案例说话，稳重有分量。"信我一次""经验之谈"是口头禅。'},
  sister:  {role:'你是电信营业厅的暖心姐姐。',tone:'用客户故事和生活场景切入。温暖亲切，不是推销是真心帮忙。'}
};

// Template-specific constraints for AI generation
const TEMPLATE_GUIDES = {
  t1: '这是决策指南类内容。帮用户对比选择，要说清楚"谁适合什么/为什么"。数据要有对比有结论。',
  t2: '**这是一线服务场景，只能讲故事。** 不管选题关键词是什么（宽带/手机/投诉/故障），你必须只讲一个真实发生的服务故事。结构：时间→地点→人物→遇到了什么问题→你是如何一步步解决的→客户什么反应→最后总结。禁止出现"对比""选择""哪个好""100M 300M 1000M"等决策指南用语。禁止做产品推荐。就像跟朋友聊天分享今天的经历。',
  t3: '这是深度评测。你面前有一台具体设备，需要你上手实测并出报告。围绕设备的实际参数来写，讲体验不讲推销。禁止对比宽带套餐，禁止讲"100M/300M/1000M"。你就是科技博主在出评测视频。',
  t4: '这是本地探店/福利活动。重点讲清：在哪、有什么福利、怎么参与。要营造紧迫感或亲切感。引导到店。'
};

// ============================================================
// Core: personalize script generation (懒生成 + 永久缓存)
// ============================================================

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

  // Step 2: Build prompt with full context
  const p = (PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.sister);
  const personaRole = p.role || p;
  const personaTone = p.tone || '';

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
${personaTone}
${tplGuide}
营业厅：${store}，城市：${city || '未知'}。

核心任务：结合用户提供的选题和场景数据，写一段完整的口播脚本（200-400字），可直接录视频。

结构要求：强钩子开头 → 数据/故事/体验展开 → 自然收尾。
数据原则：优先使用用户填写的真实参数，不要凭空编造速率/性能数据。如果用户未提供数据，用定性描述代替定量数据。
禁止：不要写分镜提示、字幕说明、BGM推荐。只输出口播台词。`;

  const userPrompt = `【选题】${topic}
【用户填写的参数】
${fieldsContext}
【模板类型】${tplName}

**必须遵守以下规则：**
${templateType === 't2' ? '- 这是一线服务故事，只能讲故事。用用户填写的具体信息（时间、人物、问题、经过、结果）来讲一个完整的故事。禁止对比宽带、禁止做产品推荐、禁止出现"100M 300M 1000M"。' : templateType === 't3' ? '- 深度评测，围绕设备参数写，禁止宽带对比。' : ''}
- 基于用户填写的参数，不要凭空编造数据。
- 直接输出纯文本口播台词，不要JSON、不要markdown。`;

  const cfg = await loadAIConfig(token, user);
  const script = await callSiliconFlow(systemPrompt, userPrompt, apiKey, {
    ...cfg,
    temperature: 0.9,
    maxTokens: 1200
  });

  if (!script) throw new Error('AI returned empty response');

  // Step 3: Save to Gitee cache (non-blocking: save in background)
  const scriptClean = script.trim().replace(/^["']|["']$/g, '');
  try {
    const cacheContent = JSON.stringify({
      script: scriptClean,
      persona, topic, store,
      generated: new Date().toISOString().slice(0, 10)
    });
    await createOrUpdateGiteeFile(cachePath, cacheContent, token, user);
    console.log(`[${ts()}] Generated + cached: ${cacheKey}`);
  } catch(e) {
    console.warn(`[${ts()}] Cache write failed (non-blocking): ${e.message}`);
  }

  return { script: scriptClean, cached: false, cacheKey };
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

async function callSiliconFlow(system, user, apiKey, cfg) {
  const res = await fetch(cfg.endpoint || 'https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: cfg.model || 'deepseek-ai/DeepSeek-V4-Pro',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: cfg.temperature || 0.8,
      max_tokens: cfg.maxTokens || 2000
    }),
    signal: AbortSignal.timeout(cfg.timeoutMs || 30000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SiliconFlow ${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || null;
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
// Utility
// ============================================================

function getISOWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const ys = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - ys) / 86400000 + 1) / 7);
}
