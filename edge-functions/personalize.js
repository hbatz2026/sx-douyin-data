// EdgeOne Pages Edge Function — 个性化脚本 API
// 触发: POST /personalize
// 代理: SilconFlow DeepSeek-V4-Pro
// 缓存: 前端 localStorage（无状态 edge function 不做事后缓存）
//
// 部署: 本文件放在 douyin-content-lab/edge-functions/ 目录
// 推代码到 Gitee 后 EdgeOne 自动识别并部署

export default async function handle(request, context) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json();
    const { store, persona, topic, city, fields, templateType } = body;

    if (!store || !topic || !persona) {
      return jsonResponse({ error: 'Missing: store, topic, persona' }, 400);
    }

    // API Key — 优先环境变量，否则从请求头获取
    const apiKey = context.env?.SILICONFLOW_API_KEY || 
                   request.headers.get('X-Api-Key') ||
                   '';

    if (!apiKey) {
      return jsonResponse({ error: 'API key not configured' }, 500);
    }

    // 6 种人设 System Prompt
    const personaPrompts = {
      sweet:   '你是电信营业厅的年轻女员工。口吻轻快甜美，有抖音网感，爱用"宝子们""姐妹们"。',
      tech:    '你是电信技术专家。用实测数据说话，"今天测了""直接上数据"是你的口头禅。',
      biz:     '你是商务专家。说话干练直奔主题，数字前置，结论先行。',
      young:   '你是年轻男员工。口语化接地气有网感，"兄弟们"开头，爱吐槽和夸张对比。',
      master:  '你是资深老师傅，二十年装维经验。用真实案例说话，"信我一次""经验之谈"。',
      sister:  '你是暖心姐姐。用客户故事和生活场景切入，真心帮忙不是推销。'
    };

    const personaPrompt = personaPrompts[persona] || personaPrompts.sister;

    // 构建 fields 上下文
    let fieldsCtx = '';
    if (fields) {
      for (const [k, v] of Object.entries(fields)) {
        if (v) fieldsCtx += `${k}: ${v}\n`;
      }
    }

    const systemPrompt = `${personaPrompt}\n你是山西电信抖音短视频脚本助手。营业厅：${store}(${city||'未知'})。\n为营业员写一段3-5句话的完整口播开场白，可直接照着念。\n要求：口语化、自然、有钩子、不要写分镜字幕说明，只写口播台词。`;

    const userPrompt = `选题：${topic}\n用户填的场景：\n${fieldsCtx}\n\n写3-5句话的开场白，用人设口吻。直接输出纯文本。`;

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V4-Pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return jsonResponse({ error: `AI API ${response.status}: ${err.slice(0,200)}` }, 502);
    }

    const json = await response.json();
    const script = json.choices?.[0]?.message?.content?.trim();

    if (!script) {
      return jsonResponse({ error: 'AI returned empty' }, 502);
    }

    return jsonResponse({ script });

  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
