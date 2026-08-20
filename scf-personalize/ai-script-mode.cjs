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

// 6 人设（对齐 index.js PERSONA_STD：sister/sweet/tech/biz/young/master）；
// 兼容旧 3 语气别名：affinity→sister（亲和=知性姐姐）、professional→tech（专业=技术专家）、young 保留。
const MOODS = {
  sister: '知性姐姐：温柔亲切、像经验丰富的客服主管，称呼"街坊/姐"',
  sweet: '甜美学姐：活泼甜美、像邻家妹妹，称呼"宝子/姐妹们"',
  tech: '技术专家：数据实测、用参数说话，理性专业',
  biz: '商务精英：专业干练、帮客户算账，效率优先',
  young: '活力小哥：幽默有梗、接地气，称呼"兄弟们"',
  master: '资深店长：沉稳权威、像老师傅，用故事讲道理',
  affinity: '知性姐姐：温柔亲切、像经验丰富的客服主管，称呼"街坊/姐"',
  professional: '技术专家：数据实测、用参数说话，理性专业'
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

// ad_002「第一」轻清洗（与 gate 同口径负向断言保护序数；两段式避免「第一个」→「头一个个」）
function cleanFirstText(s) {
  return String(s || '').replace(/第一个/g, '首先').replace(/第一(?!步|名|位|顺|时间|次|回)/g, '头一个');
}
// 清洗 cand 全部字符串字段（title/script/tags/beats），ad_002 可能命中任意字段
function cleanFirstCand(cand) {
  cand.title = cleanFirstText(cand.title);
  cand.script = cleanFirstText(cand.script);
  if (Array.isArray(cand.tags)) cand.tags = cand.tags.map(cleanFirstText);
  if (cand.beats && typeof cand.beats === 'object') {
    for (const k of Object.keys(cand.beats)) cand.beats[k] = cleanFirstText(cand.beats[k]);
  }
  return cand;
}

async function runAiScript(ctx) {
  const { apiKey, cfg, params, helpers } = ctx;
  const { callSiliconFlow, extractJsonObject, hsSanitize } = helpers;
  const mood = (params.mood && MOODS[params.mood]) ? params.mood : 'affinity';
  const topic = hsSanitize((params.topic || '').trim());
  if (!topic || topic.length < 2) throw new Error('选题过短（至少 2 字）');

  const user = '选题：' + topic + '\n人设要求：' + MOODS[mood] +
    '\n\n⚠️ 字数硬约束（最高优先级）：script 正文必须 150-250 字，写完先自查字数，宁短勿长、精炼口语，超过 250 字或不足 150 字都会被系统驳回。' +
    '\n\n请按 system 要求生成完整口播脚本（五段式 beats、hookKind 四选一、红线零命中），只输出 JSON（含 title/script/beats/hookKind/bgm/tags）。' +
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
      let script = obj.script || obj.content || obj.text || '';
      // 超长兜底：按完整句（。！？）截断到 ≤246 字，保住 [150,250] 门禁；截到 <150 则放弃本次走重试
      if (script.length > 250) {
        const segs = script.split(/(?<=[。！？])/);
        let acc = '';
        for (const seg of segs) { if ((acc + seg).length <= 246) acc += seg; else break; }
        if (acc.length >= 150) script = acc;
      }
      const cand = {
        _vid: mood + '1', _persona: 'gen', bgm: obj.bgm || '',
        title: obj.title || topic, script, hookKind: obj.hookKind || 'value',
        beats: obj.beats || {}, tags: obj.tags || []
      };
      let r = Q.checkVariant(cand, {});
      if (!r.pass) {
        // ad_002「第一」轻清洗（cand 全字段）后重新过门禁一次
        const hitFirst = r.reasons && r.reasons.some(x => (x.msg || '').indexOf('ad_002') >= 0 || (x.msg || '').indexOf('第一') >= 0);
        if (hitFirst) {
          cleanFirstCand(cand);
          const r2 = Q.checkVariant(cand, {});
          if (r2.pass) r = r2;
        }
      }
      if (r.pass) { v = cand; score = r.score || 0; }
      else lastErr = '生成未达内容门禁: ' + r.reasons.map(x => x.msg).join('; ');
    } catch (e) { lastErr = e.message || String(e); }
  }
  if (!v) throw new Error(lastErr || '生成失败（多次尝试未达标）');
  return { ok: true, mood, topic, seed: v, score };
}

module.exports = { runAiScript, MOODS };
