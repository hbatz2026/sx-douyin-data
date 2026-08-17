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

// 抖音算法要素库（用于 SYSTEM 注入 + few-shot 覆盖）—— 8-17 抖音算法评分 36/100 复盘后强化
// 用户常搜词（记忆库命中 = 推荐池宽度）：命中越多推荐越多
const ALGO_KEYWORDS = ['信任','营业厅','电信','到店','价格','M档位','对比','划算','留校','暑假','宽带','学生','高考','毕业','上门','测速','路由器','FTTR','千兆','套餐','流量','续费','加包','免费','薅羊毛','保姆级','干货','避坑','后悔','平价','宝藏','手把手','省心'];
// 强 CTA 三选一模板（产出脚本时必须命中其一）
const CTA_TEMPLATES = [
  '评论区扣「{{KW}}」+你的情况，我挨个回复推荐档位',
  '点赞过 {{N}} 解锁「{{TITLE}}」底价表，截图保存到店可用',
  '到店报暗号「{{KW}}」领 3 步对照表，限本周'
];
// 互动钩子（中间要埋，不要只在文末）
const HOOK_TEMPLATES = [
  '你家是哪种情况，评论区告诉我',
  '你觉得这个避坑指南有用吗，评论区扣个有用',
  '觉得有用先收藏，到店问不亏'
];

const SYSTEM = `你是山西电信营业厅短视频脚本专家，为一线营业员写抖音口播脚本。**所有 12 条硬约束缺一不可**：

【内容质量（7 条）】
1. 营业员第一人称视角，口语化，可直接照着拍
2. 纯口播：单人口播稿，150-250字（**务必精炼，目标 180-220 字，宁可少写绝不超 250**；算法要素用短语融入，不靠堆字数），禁止分镜/时间码
3. 五段式结构 beats：hook(开场钩子，≥6字) / pain(痛点，≥12字) / solution(解决方案，≥12字) / proof(真实案例证明，≥12字) / cta(到店/评论引导，≥12字)
4. hookKind 四选一：conflict / value / suspense / resonance（对应 冲突/价值/悬念/共鸣）
5. 红线：绝不攻击/贬低运营商；宽带档位只提 300M / 500M / 1000M / FTTR，绝不出现 100M 或 100兆
6. 同一选题的多条变体必须换切入角度、换真实案例，避免雷同
7. 只输出合法 JSON，不要 markdown

【抖音算法要素（5 条 · 8-17 评分 36/100 复盘后强制 · 缺一条即不及格）】
8. **强 CTA（必含）**：cta 段必须含 1 个可执行动作指令——三选一模板：
   A. 评论区扣「{{关键词}}」+你的情况，我挨个回复推荐
   B. 点赞过 {{N}} 解锁「{{标题}}」底价表
   C. 到店报暗号「{{关键词}}」领对照表，限本周
   （禁止"去营业厅问"等弱 CTA）
9. **互动钩子（中间埋 1 个）**：pain 或 proof 段必须植入 1 个互动触发——"你觉得呢/你家哪种情况/评论区告诉我"。不要只在文末才互动
10. **收藏价值（必含）**：proof 或 cta 段必须给"为什么收藏"的具体钩子——"收藏吃 3 步对照表/截图保存避坑清单/点赞解锁底价"
11. **算法词命中 ≥4 个**：tags + script 全文必须出现以下关键词至少 4 个（用于抖音记忆库推荐池宽度）：
    信任/营业厅/电信/到店/价格/M档位/对比/划算/留校/暑假/宽带/学生/高考/毕业/上门/测速/路由器/FTTR/千兆/套餐/流量/续费/加包/免费/保姆级/干货/避坑/后悔/平价
12. **算法钩子开头（必含）**：hook 段前 30 字必须含"用户常搜的疑问词"（如"怎么选/值不值/避坑/后悔/划算/避雷"）— 触发搜索推荐

【100 分脚本示例 · 留校场景 · few-shot 标杆】
选题：暑假留校宽带怎么选
hook: "宝子们暑假留校最怕宿舍没网！哥教你三步选宽带，评论区扣'留校'我整理了一份 3 步对照表。"
pain: "去年留校的我一开始乱选 300M 卡到爆，室友刷剧我打游戏都掉线，最后才发现原来选档位看人数和场景就够。"
solution: "一个人用选 300M 够刷剧，两人合租选 500M 开黑不卡，做毕设剪视频直接上 1000M。山西电信学生宽带 79 块起 1000M 合约到毕业。"
proof: "上周帮学弟 4 人合租选了 1000M，平均每人 50 块一个月，4 个设备同时直播都不卡，截图发评论区我帮你们看。"
cta: "评论区扣'留校'+你宿舍几个人，我挨个回复推荐档位。点赞过 200 解锁暑假学生宽带底价表，到店报暗号'留校'领 3 步对照表。"
tags: 暑假留校, 宽带选择, 学生电信, 山西电信, 避坑
hookKind: value
【该示例算法命中】信任/营业厅/电信/宽带/价格/M档位/对比/划算/留校/暑假/学生/高考/毕业/FTTR/千兆/套餐/避坑 → 命中 14 个（远超 4 个及格线）
【该示例 CTA 强度】"评论区扣留校+人数"(A) + "点赞过 200 解锁底价表"(B) + "到店报暗号留校领对照表"(C) → 三选三全中
【该示例互动钩子】中间"去年留校的我..."+"评论区告诉我"双触发
【该示例收藏价值】"点赞解锁底价表"+"截图发评论区"明确给收藏理由

【输出 JSON 格式】
{"title":"标题","script":"完整口播稿（150-250字）","beats":{"hook":"≥6字含算法词","pain":"≥12字含互动钩子","solution":"≥12字","proof":"≥12字含收藏价值","cta":"≥12字含强CTA三选一"},"hookKind":"conflict|value|suspense|resonance","bgm":"BGM风格","tags":["含≥4个算法词"]}`;

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

// ISO 周（周一为一周起点），draft.week 用动态周而非写死
function isoWeek(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return date.getFullYear() + '-W' + String(weekNo).padStart(2, '0');
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
    draft = { week: isoWeek(new Date()), jobs, done: {}, updatedAt: new Date().toISOString(), force: !!force };
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
