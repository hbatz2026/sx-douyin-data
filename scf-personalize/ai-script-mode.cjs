// ai-script-mode.cjs — 3.0 G7：自定义选题 → AI 生成单条口播稿（SCF 端独立模块）
// 由 index.js 的 mode='ai-script' 调用。复用 seed-pool-mode.cjs 的 SYSTEM 脚本生成 prompt + quality-gate 门禁。
// 关键修复（2026-08-20 实证）：
//  1) MiniMax-M2.7 输出含 <think> 推理块，且推理里会出现 { 片段，extractJsonObject 会抓到错误的第一个 {}。
//     必须先 stripThink 再解析，否则主模型 100% 报「AI 输出缺少 script 字段」。
//  2) 镜像 seed-pool 外层重试：主模型失败 → fallbackModel（MiniMax-M3）重试（M3 输出干净 JSON 无 think 块）。
'use strict';
const { SYSTEM } = require('./seed-pool-mode.cjs');
const Q = require('./quality-gate.cjs');
const { researchProduct } = require('./product-research.cjs');

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
  const mood = (params.mood && MOODS[params.mood]) ? params.mood : 'sister';
  const topic = hsSanitize((params.topic || '').trim());
  // 2026-08-21 修复：<6 字一律拦截（前端同规则，后端兜底防绕过），提示带示例引导
  if (!topic || topic.length < 6) throw new Error('选题过短（至少 6 字）：请补充具体活动/卖点，如「充100元话费送抽纸礼品」');

  // —— 产品事实门（2026-08-21 反转假设，根治"输入越具体生成越空"）：
  // 信任顺序：用户填的 productInfo（官方资料） > 用户输入本身（≥6 字即事实） > AI 调研兜底（仅模糊词）
  // 旧逻辑拿用户输入去问 AI 认不认识，不认识(known=false) 就禁止输出输入里的具体信息 → 卖点全灭。
  // 新逻辑：营业员输入的 ≥6 字描述 = 自家真实活动/产品，直接当已知事实，不再调研。
  let research;
  if (params.productInfo && String(params.productInfo).trim().length >= 4) {
    const info = String(params.productInfo).trim();
    // 简化：把整段资料当作 bullets，单条作为"用户提供的官方资料"
    const bullets = info.split(/[\n\r]+|(?:[。！？])|(?:[，；])/).map(s => s.trim()).filter(s => s.length >= 4 && s.length <= 80).slice(0, 6);
    research = { known: true, bullets: bullets.length ? bullets : [info.slice(0, 120)], angle: '', source: 'user' };
  } else if (topic.length >= 6) {
    // 用户输入本身即事实：不调研、不降级，直接作为已知卖点上下文（source='user'，前端显示"基于官方资料"青色 chip）
    research = { known: true, bullets: [topic], angle: '', source: 'user' };
  } else {
    // 模糊选题（<6 字）才走 AI 调研兜底（标注 AI 参考）
    research = await researchProduct(topic, { apiKey, cfg, helpers }, { timeoutMs: 60000, maxTokens: 700 });
    research.source = 'ai';
  }
  let productCtx = '';
  let antiHallucinationNote = '';
  if (research.known && research.bullets && research.bullets.length) {
    productCtx = '\n\n【产品事实上下文（来源：' + (research.source === 'user' ? '用户提供的官方资料' : 'AI 模型调研（仅基于训练知识，不联网，准确度有限') + '，禁止超出这些事实瞎编）】\n' + research.bullets.map((b, i) => (i + 1) + '. ' + b).join('\n') + (research.angle ? '\n营业员口播角度：' + research.angle : '');
    antiHallucinationNote = '\n⚠️ 产品事实红线：script / beats / title / tags 中关于该产品的功能、参数、承诺**只能从上方「产品事实上下文」取**；未列出的功能/数字/案例**禁止编造**；不确定的内容用「据我了解」或避免具体数字；**痛点/反面案例部分也只能用通用营业表达（乱扣费/多花冤枉钱/找不到人/不清楚），禁止引入资料外的具体业务名词（加包/办卡/领流量/充值/查账单/营业厅话费等）**。';
  } else {
    // known=false（仅模糊词调研失败时触达）：不再反向锁死用户信息（≥6 字已走 ② 分支），只防"无中生有"
    antiHallucinationNote = '\n⚠️ 素材红线（用户未提供该活动/产品的具体信息）：**禁止编造**具体金额、礼品、套餐档位或服务承诺；可用通用营业员口吻（如「来营业厅我帮你看」「进店问问」「查最新政策」）引导用户到店核实；同时引导用户补充卖点（金额/礼品/优惠）以获得更具体脚本。';
  }

  const user = '选题：' + topic + '\n人设要求：' + MOODS[mood] +
    '\n\n⚠️ 字数硬约束（最高优先级）：script 正文必须 150-250 字，写完先自查字数，宁短勿长、精炼口语，超过 250 字或不足 150 字都会被系统驳回。' +
    productCtx +
    '\n\n请按 system 要求生成完整口播脚本（五段式 beats、hookKind 四选一、红线零命中），只输出 JSON（含 title/script/beats/hookKind/bgm/tags）。' +
    '\n⚠️ 广告法红线（必须零命中）：script 正文禁止出现「第一」「最」「首家」「国家级」等极限词；列举多个要点时用「首先/其次/再一个」替代。' +
    '\n⚠️ 强引导（必含，与 beats.cta 一致）：script 正文结尾必须包含可执行的强 CTA（三选一：评论区扣「关键词」/ 点赞过 N 解锁 / 到店报暗号+限时），禁止「来营业厅咨询」「进店问问」类弱引导收尾。' +
    '\n⚠️ 内容角度（先判断类型再写，与选题匹配）：若选题是**促销活动/优惠**（含送/赠/得/优惠/礼品/立减/返费等），角度=福利推荐——把活动当福利讲，强调划算实在、到店即领/限时抢、错过可惜；CTA 引导到店办理或评论区领福利。**禁止**写成「教用户判断值不值/先算账再决定」的避坑分析（活动本身是卖点，不是被审视对象）。若选题是选购建议/知识科普（宽带怎么选、套餐对比等），角度=避坑指南——教方法、给对照。' +
    antiHallucinationNote;

  let lastErr = null, v = null, score = 0;
  for (let attempt = 0; attempt <= MAX_RETRY && !v; attempt++) {
    try {
      // G7 实时交互：首试 fallbackModel（MiniMax-M3：6-18s、无 think 块、JSON 干净、字数稳），
      // 备选 cfg.model（MiniMax-M2.7：40-70s、think 块长易截断 JSON、易超字数）——稳定性优先
      const model = (attempt === 0) ? (cfg.fallbackModel || cfg.model || 'MiniMax-M3') : (cfg.model || 'MiniMax-M2.7');
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
      // 强 CTA 兜底（2026-08-21）：门禁只查 beats.cta 不查 script 正文，而营业员念的是 script——
      // 正文无强 CTA 信号时，从 beats.cta 截取强 CTA 句追加到末尾（保字数 ≤246），重新过门禁；失败回滚原稿
      const STRONG_CTA = /评论区|点赞过|到店报|扣[「“'"]|暗号/;
      if (r.pass && !STRONG_CTA.test(script) && cand.beats && cand.beats.cta) {
        const orig = script;
        const ctaText = String(cand.beats.cta);
        const ctaSegs = ctaText.split(/(?<=[。！？])/);
        const strongSeg = ctaSegs.find(seg => STRONG_CTA.test(seg)) || ctaText;
        const budget = Math.max(150, 246 - strongSeg.length);
        const sSegs = script.split(/(?<=[。！？])/);
        let acc = '';
        for (const seg of sSegs) { if ((acc + seg).length <= budget) acc += seg; else break; }
        cand.script = acc + (/([。！？!?])$/.test(acc) ? '' : '。') + strongSeg;
        const r3 = Q.checkVariant(cand, {});
        if (r3.pass) r = r3; else cand.script = orig;
      }
      if (r.pass) { v = cand; score = r.score || 0; }
      else lastErr = '生成未达内容门禁: ' + r.reasons.map(x => x.msg).join('; ');
    } catch (e) { lastErr = e.message || String(e); }
  }
  if (!v) throw new Error(lastErr || '生成失败（多次尝试未达标）');
  const result = { ok: true, mood, topic, seed: v, score };
  if (research) result.research = { known: !!research.known, bullets: research.bullets || [], source: research.source || 'ai' };
  return result;
}

module.exports = { runAiScript, MOODS };
