// ai-script-mode.cjs — 3.0 G7：自定义选题 → AI 生成单条口播稿（SCF 端独立模块）
// 由 index.js 的 mode='ai' 调用。复用 seed-pool-mode.cjs 的 SYSTEM 脚本生成 prompt + quality-gate 门禁，
// 保证自定义选题生成的脚本与 SEED_POOL 同标准（五段式 beats / 红线 / 档位 / 广告法）。
// 用法：await runAiScript({ apiKey, token, user, cfg, params, helpers })
'use strict';
const { SYSTEM } = require('./seed-pool-mode.cjs');
const Q = require('./quality-gate.cjs');

const MOODS = {
  affinity: '暖心亲和（暖心姐姐式）：称呼"街坊/姐/宝子"，服务向、温暖、爱举例帮助人',
  professional: '专业理性（技术专家式）：数据、参数、专业判断，理性说服',
  young: '活力潮流（活力小哥式）："兄弟们"、年轻化、直接、利落'
};

async function runAiScript(ctx) {
  const { apiKey, cfg, params, helpers } = ctx;
  const { callSiliconFlow, extractJsonObject, hsSanitize } = helpers;
  const mood = (params.mood && MOODS[params.mood]) ? params.mood : 'affinity';
  const topic = hsSanitize((params.topic || '').trim());
  if (!topic || topic.length < 2) throw new Error('选题过短（至少 2 字）');

  const user = '选题：' + topic + '\n语气要求：' + MOODS[mood] +
    '\n\n请按 system 要求生成完整口播脚本（150-250字、五段式 beats、hookKind 四选一、红线零命中），只输出 JSON（含 title/script/beats/hookKind/bgm/tags）。';
  const model = cfg.model || 'qwen3.7-max';
  const raw = await callSiliconFlow(SYSTEM, user, apiKey, {
    endpoint: cfg.endpoint, model, temperature: 0.8, maxTokens: 1200, timeoutMs: 90000
  });
  if (!raw) throw new Error('AI 返回为空');
  let obj;
  try { obj = extractJsonObject(raw); } catch (e) { throw new Error('AI 输出无法解析为 JSON'); }
  if (!obj || !obj.script) throw new Error('AI 输出缺少 script 字段');

  const cand = {
    _vid: mood[0] + '1', _persona: 'gen', bgm: obj.bgm || '',
    title: obj.title || topic, script: obj.script || '', hookKind: obj.hookKind || 'value',
    beats: obj.beats || {}, tags: obj.tags || []
  };
  const r = Q.checkVariant(cand, {});
  if (!r.pass) throw new Error('生成未达内容门禁: ' + r.reasons.map(x => x.msg).join('; '));
  return { ok: true, mood, topic, seed: cand, score: r.score };
}

module.exports = { runAiScript, MOODS };
