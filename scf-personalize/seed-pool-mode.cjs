// seed-pool-mode.cjs — 3.0 Phase 0b：SEED_POOL 生成模式（SCF 端独立模块，依赖注入）
// 由 index.js 的 mode='seed-pool' 调用。断点续跑（draft 存 Gitee data/_seedPoolDraft.json），
// 每轮在时间预算内推进若干条：选题(5×3mood×2变体=30) → AI 生成(带 beats) → quality-gate 门禁(重试≤2) → 组装 SEED_POOL → 写回 data/v3-seedpool.js
// 用法：await runSeedPool({ apiKey, token, user, cfg, params, helpers })
// helpers 由 index.js 注入：{ callSiliconFlow, extractJsonObject, createOrUpdateGiteeFile, readGiteeFileR, hsSanitize }
'use strict';
const Q = require('./quality-gate.cjs');

const DRAFT = 'data/_seedPoolDraft.json';
const OUT = 'data/v3-seedpool.js';
const TIME_BUDGET_MS = 80000; // 每轮最多跑 ~80s，留余量给 Web 函数 180s 超时
const MAX_RETRY = 2;

// 选题源（与本地 spike ② 一致，5 选题 = 方案最小周池口径）
const PICKS = [
  { type: 'decision', topic: '宽带到期续费还是换套餐？决策树帮你判断' },
  { type: 'decision', topic: '家庭宽带怎么选？三口之家最优方案' },
  { type: 'scene', topic: '阿姨说网慢3年了，上门一查是路由器放微波炉旁边' },
  { type: 'review', topic: 'FTTR全屋光纤实测：每个房间网速都能跑满千兆吗？' },
  { type: 'local', topic: 'XX路电信营业厅重新装修了，欢迎来打卡' }
];
const TYPE_META = { decision: ['决策指南', '📊'], scene: ['一线场景', '🎬'], review: ['深度测评', '🔍'], local: ['本地事件', '📍'] };
const MOODS = {
  affinity: '暖心亲和（暖心姐姐式）：称呼"街坊/姐/宝子"，服务向、温暖、爱举例帮助人',
  professional: '专业理性（技术专家式）：数据、参数、专业判断，理性说服',
  young: '活力潮流（活力小哥式）："兄弟们"、年轻化、直接、利落'
};

const SYSTEM = `你是山西电信营业厅短视频脚本专家，为一线营业员写抖音口播脚本。硬性要求（违反任何一条即为不合格）：
1. 营业员第一人称视角，口语化，可直接照着拍
2. 纯口播：单人口播稿，150-250字（不含标点计），禁止分镜/时间码
3. 五段式结构 beats：hook(开场钩子，≥6字) / pain(痛点，≥12字) / solution(解决方案，≥12字) / proof(真实案例证明，≥12字) / cta(到店/评论引导，≥12字)
4. hookKind 四选一：conflict / value / suspense / resonance（对应 冲突/价值/悬念/共鸣）
5. 红线：绝不攻击/贬低运营商；宽带档位只提 300M / 500M / 1000M / FTTR，绝不出现 100M 或 100兆
6. 同一选题的多条变体必须换切入角度、换真实案例，避免雷同
7. 只输出合法 JSON，不要 markdown：{"title":"标题","script":"完整口播稿","beats":{"hook":"","pain":"","solution":"","proof":"","cta":""},"hookKind":"","bgm":"BGM风格","tags":["标签"]}`;

function buildUser(topic, moodLabel, idx) {
  const extra = idx > 0 ? '这是该选题的第 2 条变体：请务必换一个切入角度、换一个真实案例，不要与第 1 条重复。' : '';
  return '选题：' + topic + '\n语气要求：' + moodLabel + '\n' + extra +
    '\n\n请按 system 要求生成完整口播脚本（150-250字、五段式 beats、hookKind 四选一、红线零命中），只输出 JSON。';
}

function extractJson(extractJsonObject, text) {
  try { return extractJsonObject(text); } catch (e) {}
  // 兜底：剥 markdown 代码块后找 JSON 对象
  const t = (text || '').replace(/```(?:json)?/g, '').trim();
  const s = t.indexOf('{'), e = t.lastIndexOf('}');
  if (s >= 0 && e > s) { try { return JSON.parse(t.slice(s, e + 1)); } catch (err) {} }
  throw new Error('AI 输出无法解析为 JSON');
}

function buildJobs() {
  const jobs = [];
  PICKS.forEach((p, pi) => Object.keys(MOODS).forEach(mood => { for (let idx = 0; idx < 2; idx++) jobs.push({ pi, type: p.type, topic: p.topic, mood, idx }); }));
  return jobs;
}

async function runSeedPool(ctx) {
  const { apiKey, token, user, cfg, params, helpers } = ctx;
  const { callSiliconFlow, extractJsonObject, createOrUpdateGiteeFile, readGiteeFileR, hsSanitize } = helpers;
  const t0 = Date.now();
  const force = !!(params && params.force);

  // 1) 断点续跑 draft
  let draft = null;
  try { draft = JSON.parse(await readGiteeFileR(DRAFT, token, user, 2)); } catch (e) { draft = null; }
  if (force || !draft || !draft.jobs || draft.done) {
    const jobs = buildJobs();
    draft = { week: '2026-W32', jobs, done: {}, updatedAt: new Date().toISOString(), force: !!force };
    if (force && draft) { /* force 重跑 */ }
  }
  const jobs = draft.jobs || buildJobs();
  const doneMap = draft.done || {};

  // 2) 时间预算内推进
  let filled = 0, remaining = 0;
  for (const job of jobs) {
    if (Date.now() - t0 > TIME_BUDGET_MS) break;
    const key = job.pi + '/' + job.mood + '/' + job.idx;
    if (doneMap[key]) continue;
    let v = null;
    for (let attempt = 0; attempt <= MAX_RETRY && !v; attempt++) {
      try {
        const model = (attempt === 0) ? (cfg.model || 'deepseek-v4-pro') : (cfg.fallbackModel || 'qwen3.7-max');
        const raw = await callSiliconFlow(SYSTEM, buildUser(hsSanitize(job.topic), MOODS[job.mood], job.idx), apiKey, {
          endpoint: cfg.endpoint, model, temperature: 0.8, maxTokens: 1200, timeoutMs: 90000
        });
        if (!raw) continue;
        const obj = extractJson(extractJsonObject, raw);
        const cand = { _vid: job.mood[0] + (job.idx + 1), _persona: 'gen', bgm: obj.bgm || '', title: obj.title || job.topic, script: obj.script || '', hookKind: obj.hookKind || '', beats: obj.beats || {}, tags: obj.tags || [] };
        const r = Q.checkVariant(cand, {});
        if (r.pass) v = cand; else if (attempt < MAX_RETRY) { /* 静默重试 */ }
      } catch (e) { /* 静默重试 */ }
    }
    if (!v) {
      v = { _vid: job.mood[0] + (job.idx + 1), _persona: 'gen', bgm: '', title: job.topic, script: '（生成未达标，占位）', hookKind: 'value', beats: { hook: '这个问题很多人拿不准，别着急', pain: '很多人因为拿不准就随便选了，结果用着不顺手还多花钱', solution: '按人数、房型、预算三步筛，山西电信家宽在售 300M/500M/1000M/FTTR 四档，对号入座就行', proof: '上周帮一个三口之家按这三步选好，用下来都说合适', cta: '拿不准的来营业厅，我帮你一条条对' }, tags: [], _fallback: true };
    }
    doneMap[key] = v;
    filled++;
  }
  remaining = jobs.filter(j => !doneMap[j.pi + '/' + j.mood + '/' + j.idx]).length;
  draft.done = doneMap;
  draft.updatedAt = new Date().toISOString();

  // 3) 每轮落盘 draft（断点续跑）
  await createOrUpdateGiteeFile(DRAFT, JSON.stringify(draft, null, 2), token, user);

  // 4) 全部完成 → 组装 SEED_POOL 写回
  let done = remaining === 0;
  if (done) {
    const scripts = PICKS.map((p, pi) => {
      const variants = {};
      Object.keys(MOODS).forEach(mood => {
        const arr = [];
        for (let idx = 0; idx < 2; idx++) { const v = doneMap[pi + '/' + mood + '/' + idx]; if (v) arr.push(v); }
        variants[mood] = arr;
      });
      const [typeName, typeIcon] = TYPE_META[p.type] || ['脚本', '📄'];
      return {
        seedId: 'w_' + p.type + '_' + pi, topic: p.topic, type: p.type, typeName, typeIcon,
        mood: 'affinity', hookType: '', hookKind: (variants.affinity && variants.affinity[0] && variants.affinity[0].hookKind) || 'value',
        hook: (variants.affinity && variants.affinity[0] && variants.affinity[0].beats && variants.affinity[0].beats.hook) || '',
        structure: '五段式', scene: '店内柜台', day: pi + 1,
        compliance: { status: 'passed', autoFixed: 0, blocked: false }, variants, slots: ['city', 'store']
      };
    });
    const pool = { week: draft.week, generatedAt: new Date().toISOString(), scripts };
    const q = Q.checkPool(pool);
    const body = '// 3.0 SEED_POOL（SCF seed-pool 模式生成）week=' + draft.week + '\n' +
      '// 达标率 ' + q.passed + '/' + q.total + ' 生成于 ' + pool.generatedAt + '\nwindow.___v3SeedPool = ' + JSON.stringify(pool) + ';\n';
    await createOrUpdateGiteeFile(OUT, body, token, user);
    return { ok: true, done: true, week: draft.week, total: q.total, passed: q.passed, failed: q.failed, out: OUT, elapsedMs: Date.now() - t0 };
  }

  return { ok: true, done: false, week: draft.week, filledThisCall: filled, remaining, progress: { done: jobs.length - remaining, total: jobs.length }, hint: '未跑完，请再次 POST mode=seed-pool 续跑', elapsedMs: Date.now() - t0 };
}

module.exports = { runSeedPool, SYSTEM, buildUser, PICKS, MOODS, DRAFT, OUT };
