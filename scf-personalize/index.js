// SCF Web函数 — 抖本个性化脚本API
// 环境变量: GITEE_TOKEN, GITEE_USERNAME, SILICONFLOW_API_KEY
// 部署: v=2026-06-24

const CACHE_VER = 'v3'; // bump to invalidate all old caches

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
  sweet:   '你是电信营业厅的年轻女员工。口吻轻快甜美，有抖音网感，爱用"宝子们""姐妹们"。用热梗拉近距离。',
  tech:    '你是电信技术专家。用实测数据说话，喜欢对比参数。专业但不死板。"今天测了""直接上数据"是你的口头禅。',
  biz:     '你是商务专家。说话干练，直奔主题，信息密度高。数字前置，结论先行。不讲废话。',
  young:   '你是年轻男员工。说话口语化接地气，有网感。爱用"兄弟们"开头，喜欢吐槽和夸张对比。',
  master:  '你是资深老师傅。干了二十年装维。用真实案例说话，稳重有分量。"信我一次""经验之谈"是你的口头禅。',
  sister:  '你是暖心姐姐。用客户故事和生活场景切入。温暖亲切，感觉你不是在推销，是在真心帮忙。'
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
  const personaPrompt = PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.sister;

  let fieldsContext = '';
  if (fields) {
    for (const [k, v] of Object.entries(fields)) {
      if (v) fieldsContext += `${k}: ${v}\n`;
    }
  }

  var tplNames = { t1: '决策指南', t2: '一线场景', t3: '深度测评', t4: '本地事件' };
  var tplName = tplNames[templateType] || '';

  const systemPrompt = `${personaPrompt}
你是山西电信抖音短视频脚本生成器，营业厅名称：${store}，所在城市：${city || '未知'}。${tplName ? '当前模板：「' + tplName + '」。' : ''}
你的任务是：结合用户填写的具体信息，为营业厅员工写一段完整的一段式口播脚本（约200-400字），可以直接对着镜头念、录成视频。
脚本结构：第1句强钩子抓注意力 → 中间2-4句展开核心内容（数据/故事/对比/场景）→ 最后1句自然收尾或引导互动。
要求：口语化、自然、有网感、有节奏感，结合营业厅实地特点和城市语境。
不要写分镜、不要写字幕说明、不要写BGM推荐——只写口播台词。`;

  const userPrompt = `选题：${topic}
用户填写的场景数据：
${fieldsContext}

请为${store}的营业员写一段完整的口播脚本（200-400字），用"${personaPrompt.split('。')[0]}"的口吻。
要覆盖：钩子开头 → 核心内容 → 自然收尾，三个层次都要有。
直接输出纯文本，不要JSON，不要markdown。`;

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
