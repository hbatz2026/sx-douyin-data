// ai-script-mode.cjs — 3.0 G7：自定义选题 → AI 生成单条口播稿（SCF 端独立模块）
// 由 index.js 的 mode='ai-script' 调用。复用 seed-pool-mode.cjs 的 SYSTEM 脚本生成 prompt + quality-gate 门禁。
// 关键修复（2026-08-20 实证）：
//  1) MiniMax-M2.7 输出含 <think> 推理块，且推理里会出现 { 片段，extractJsonObject 会抓到错误的第一个 {}。
//     必须先 stripThink 再解析，否则主模型 100% 报「AI 输出缺少 script 字段」。
//  2) 镜像 seed-pool 外层重试：主模型失败 → fallbackModel（MiniMax-M3）重试（M3 输出干净 JSON 无 think 块）。
'use strict';
const { SYSTEM } = require('./seed-pool-mode.cjs');
const Q = require('./quality-gate.cjs');

const MAX_RETRY = 2;

const MOODS = {
  affinity: '暖心亲和（暖心姐姐式）：称呼"街坊/姐/宝子"，服务向、温暖、爱举例帮助人',
  professional: '专业理性（技术专家式）：数据、参数、专业判断，理性说服',
  young: '活力潮流（活力小哥式）："兄弟们"、年轻化、直接、利落'
};

function stripThink(text) {
  if (!text) return text;
  return String(text)
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
    .trim();
}

function extractJson(extractJsonObject, text) {
  const cleaned = stripThink(text);
  try { const o = extractJsonObject(cleaned); if (o) return o; } catch (e) {}
  // 兜底：剥 markdown 代码块后取首个 { 到最后一个 }
  const t = cleaned.replace(/```(?:json)?/g, '').trim();
  const s = t.indexOf('{'), e = t.lastIndexOf('}');
  if (s >= 0 && e > s) { try { return JSON.parse(t.slice(s, e + 1)); } catch (err) {} }
  throw new Error('AI 输出无法解析为 JSON');
}

async function runAiScript(ctx) {
  const { apiKey, cfg, params, helpers } = ctx;
  const { callSiliconFlow, extractJsonObject, hsSanitize } = helpers;
  const mood = (params.mood && MOODS[params.mood]) ? params.mood : 'affinity';
  const topic = hsSanitize((params.topic || '').trim());
  if (!topic || topic.length < 2) throw new Error('选题过短（至少 2 字）');

  const user = '选题：' + topic + '\n语气要求：' + MOODS[mood] +
    '\n\n请按 system 要求生成完整口播脚本（五段式 beats、hookKind 四选一、红线零命中），只输出 JSON（含 title/script/beats/hookKind/bgm/tags）。' +
    '\n⚠️ 硬性要求：script 正文字数必须严格控制在 150-250 字（中文按字符数计），不足 150 字或超过 250 字都会被系统直接驳回，务必精确控制长度、精炼表达。' +
    '\n⚠️ 广告法红线（必须零命中）：script 正文禁止出现「第一」「最」「首家」「国家级」等极限词；列举多个要点时用「首先/其次/再一个」替代。';

  let lastErr = null, v = null, score = 0;
  for (let attempt = 0; attempt <= MAX_RETRY && !v; attempt++) {
    try {
      const model = (attempt === 0) ? (cfg.model || 'qwen3.7-max') : (cfg.fallbackModel || 'deepseek-v4-flash');
      const raw = await callSiliconFlow(SYSTEM, user, apiKey, {
        endpoint: cfg.endpoint, model, temperature: 0.8, maxTokens: 2000, timeoutMs: 90000
      });
      if (!raw) { lastErr = 'AI 返回为空'; continue; }
      const obj = extractJson(extractJsonObject, raw);
      const script = obj.script || obj.content || obj.text || '';
      const cand = {
        _vid: mood[0] + '1', _persona: 'gen', bgm: obj.bgm || '',
        title: obj.title || topic, script, hookKind: obj.hookKind || 'value',
        beats: obj.beats || {}, tags: obj.tags || []
      };
      const r = Q.checkVariant(cand, {});
      if (r.pass) { v = cand; score = r.score || 0; }
      else lastErr = '生成未达内容门禁: ' + r.reasons.map(x => x.msg).join('; ');
    } catch (e) { lastErr = e.message || String(e); }
  }
  if (!v) throw new Error(lastErr || '生成失败（多次尝试未达标）');
  return { ok: true, mood, topic, seed: v, score };
}

module.exports = { runAiScript, MOODS };
