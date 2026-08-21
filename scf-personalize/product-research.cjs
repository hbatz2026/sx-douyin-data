// product-research.cjs — G7 产品事实门：生成前先调研产品真实卖点，禁止 AI 瞎编产品功能
// 设计：两阶段 AI 调用：先 researchProduct 列产品真实卖点（known/bullets/angle），再拼入生成 prompt 作为"产品事实上下文"
// 为什么：用户输入具体产品时，模型常编造功能（如（"查套餐/领流量" → 这些不是产品本身卖点）。先调研 + 硬约束 = 防瞎编
// 2026-08-21 v2：新增 researchProductWeb —— MiniMax Server Tool 联网搜索（web_search_20250305），
//   模型服务端自动搜索真实资料（新闻/官网/百科）→ 提炼卖点。优先用 web 版，失败退训练知识版（researchProduct）。
'use strict';

const SYSTEM = '你是山西电信产品调研助手。只基于你对该产品的真实认知回答；不确定的产品请直接返回 known=false，不要硬猜。回答严格按用户要求的 JSON 格式。';

function buildUser(topic) {
  return '产品/选题：「' + topic + '」\n请基于你对该产品的真实认知完成两步：\n1) 列 3-5 个核心功能/卖点（每项一句话、20-40 字，避免营销黑话）\n2) 给 1 个适合营业员抖音口播的角度（10-20 字）\n\n若你不确定该产品（如不在训练数据、信息不足、产品太新），直接返回 known=false 并说明原因。\n\n只输出 JSON，二选一：\n- 确认: {"known": true, "bullets": ["核心功能1", "核心功能2", ...], "angle": "营业员口播角度"}\n- 不确定: {"known": false, "reason": "不确定的原因，如产品太新 / 信息不足"}';
}

// 联网搜索版 prompt：要求基于真实搜索结果提炼，禁止编造
function buildUserWeb(topic) {
  return '请联网搜索「' + topic + '」的真实产品信息（它是什么、有哪些核心功能卖点、适用场景/用户群体）。搜索后**只基于真实搜索结果**提炼 3-5 个核心功能/卖点（每项一句话、20-40 字，避免营销黑话），并给 1 个适合营业员抖音口播的角度（10-20 字）。\n禁止编造搜索结果里没有的功能、参数或数字。\n\n只输出 JSON，二选一：\n- 确认: {"known": true, "bullets": ["真实功能1", "真实功能2", ...], "angle": "营业员口播角度"}\n- 不确定（搜索不到可靠资料）: {"known": false, "reason": "原因"}';
}

function stripThink(text) {
  if (!text) return text;
  return String(text)
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
    .trim();
}

function extractJsonObj(extractJsonObject, text) {
  const cleaned = stripThink(text);
  try { const o = extractJsonObject(cleaned); if (o) return o; } catch (e) {}
  const t = cleaned.replace(/```(?:json)?/g, '').trim();
  const s = t.indexOf('{'), e = t.lastIndexOf('}');
  if (s >= 0 && e > s) { try { return JSON.parse(t.slice(s, e + 1)); } catch (err) {} }
  return null;
}

// ── 联网搜索版（2026-08-21）：MiniMax Server Tool web_search_20250305，Anthropic Messages 格式 ──
// 模型在服务端自动搜索并把结果用于生成最终答复，无需多轮 tool 回传；直接读 content 里最后一个 text 块。
async function researchProductWeb(topic, ctx, opts) {
  const { apiKey, cfg } = ctx;
  const timeoutMs = (opts && opts.timeoutMs) || 60000;
  const model = (opts && opts.model) || cfg.fallbackModel || cfg.model || 'MiniMax-M3';
  try {
    const res = await fetch('https://api.minimaxi.com/anthropic/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        messages: [{ role: 'user', content: buildUserWeb(topic) }],
        tools: [{ type: 'web_search_20250305', name: 'web_search' }]
      }),
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (!res.ok) {
      const body = (await res.text()).slice(0, 200);
      return { known: false, reason: '联网调研 HTTP ' + res.status + ': ' + body };
    }
    const j = await res.json();
    const blocks = (j && j.content) || [];
    // 取最后一个 text 块（模型搜索后的最终回答）
    let finalText = '';
    for (const b of blocks) { if (b && b.type === 'text' && b.text) finalText = b.text; }
    if (!finalText) return { known: false, reason: '联网调研无文本输出' };
    const obj = extractJsonObj(null, finalText);
    if (obj && obj.known === true && Array.isArray(obj.bullets) && obj.bullets.length) {
      return { known: true, bullets: obj.bullets.slice(0, 5).map(s => String(s).trim()).filter(Boolean), angle: obj.angle ? String(obj.angle).trim() : '', source: 'web' };
    }
    if (obj && obj.known === false) return { known: false, reason: String(obj.reason || '未搜到可靠资料') };
    // 模型没按 JSON 输出：尝试从搜索结果块提取标题作为卖点线索（弱降级）
    for (const b of blocks) {
      if (b && b.type === 'web_search_tool_result') {
        const rs = (b.content || []).filter(x => x.type === 'web_search_result' && x.title && x.content);
        if (rs.length) {
          return { known: true, bullets: rs.slice(0, 4).map(r => (r.title || '').trim().slice(0, 40) + '：' + (r.content || '').trim().slice(0, 60)), angle: '', source: 'web', degraded: true };
        }
      }
    }
    return { known: false, reason: '联网调研输出未识别' };
  } catch (e) {
    return { known: false, reason: '联网调研异常: ' + (e.message || String(e)) };
  }
}

// 调研产品真实卖点（训练知识版，兜底）；返回 { known, bullets[], angle, reason? }
// 失败/超时一律返回 known=false，调用方决定是否退化
async function researchProduct(topic, ctx, opts) {
  const { apiKey, cfg, helpers } = ctx;
  const { callSiliconFlow, extractJsonObject } = helpers;
  // 首选 fallbackModel（M3 快稳无 think），低 token 控制成本
  const model = (opts && opts.model) || cfg.fallbackModel || cfg.model || 'MiniMax-M3';
  const timeoutMs = (opts && opts.timeoutMs) || 60000;
  const maxTokens = (opts && opts.maxTokens) || 700;
  try {
    const raw = await callSiliconFlow(SYSTEM, buildUser(topic), apiKey, {
      endpoint: cfg.endpoint, model, temperature: 0.4, maxTokens, timeoutMs
    });
    if (!raw) return { known: false, reason: '产品调研 AI 返回为空' };
    const obj = extractJsonObj(extractJsonObject, raw);
    if (obj && obj.known === true && Array.isArray(obj.bullets) && obj.bullets.length) {
      return { known: true, bullets: obj.bullets.slice(0, 5).map(s => String(s).trim()).filter(Boolean), angle: obj.angle ? String(obj.angle).trim() : '' };
    }
    if (obj && obj.known === false) return { known: false, reason: String(obj.reason || '模型未确认该产品') };
    return { known: false, reason: '产品调研输出未识别' };
  } catch (e) {
    return { known: false, reason: '产品调研异常: ' + (e.message || String(e)) };
  }
}

module.exports = { researchProduct, researchProductWeb, SYSTEM, buildUser, buildUserWeb };