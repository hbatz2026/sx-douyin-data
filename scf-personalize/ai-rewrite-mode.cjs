// ai-rewrite-mode.cjs — 今日脚本「就地改写」（mode='ai-rewrite'，2026-08-21）
// 场景：营业员对今日卡现有口播稿点「✏️ 改写」→ 按意图改（换说法/缩短/口语化/加本店信息），
//       而非换一条（变体固定）或 G7 从零生成（丢原文）。
// 复用：index.js 的 callSiliconFlow + hsSanitize（立场/100M/硬禁清洗）；
//       门禁内联（广告法极限词 / 字数按意图 / 宽带档位 / 强 CTA），不合格重试 ≤2 次。
'use strict';
const crypto = require('crypto');

const INTENTS = {
  polish: { label: '换种说法更顺口', size: [150, 250], hint: '保持原意和全部事实，换成更自然顺口的说法。' },
  short:  { label: '缩短到 100 字左右', size: [80, 130], hint: '压成快节奏短版，删铺垫留干货，保留核心卖点和强 CTA。' },
  casual: { label: '更口语、像聊天', size: [150, 250], hint: '去掉书面腔，像营业员跟熟人聊天，多用口语词和语气词。' },
  local:  { label: '加入本店信息', size: [150, 250], hint: '把用户补充的店名/活动/优惠自然融入，不要生硬列举。' }
};

// 广告法极限词（与前端 detectAdWords 词表同口径；「第一」序数保护独立处理）
const AD_WORDS = ['最好', '最大', '最全', '最佳', '最低', '最高', '最先', '最新', '最便宜', '唯一', '独家', '首创', '顶级', '极品', '至尊', '王牌', '冠军', '百分百', '绝对', '免费送', '最后一天', '史上最低', '绝版', '国家级'];
const AD_RE = new RegExp('(' + AD_WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')');
const FIRST_RE = /第一(?!步|名|位|顺|时间|次|回|个)/;
const STRONG_CTA_RE = /评论区|点赞|到店报|扣[「“'"『]|暗号/;
const TIER_RE = /(300M|300兆|500M|500兆|1000M|1000兆|千兆|FTTR)/;
const BANDWIDTH_TEXT_RE = /宽带|千兆|FTTR|Mbps|光猫|网速|路由|WiFi|wifi|光猫|网线|mesh/;
const BROADBAND_TOPIC_RE = /宽带|兆|网速|路由|WiFi|wifi|光猫|网线|mesh|Mbps|千兆|FTTR/;

const MOOD_DESC = {
  affinity: '亲切温暖，像邻家姐姐跟你唠家常',
  professional: '专业干练，数据清晰，语气利落',
  young: '年轻有梗，口语化节奏快，接地气'
};

// 模块级内存缓存（SCF 实例生命周期内；同一人同一稿同意图不重复花钱）
const cache = new Map();
const CACHE_MAX = 200;

function stripThink(t) {
  return String(t || '').replace(/<think>[\s\S]*?<\/think>|<thinking>[\s\S]*?<\/thinking>/g, '').trim();
}
function countChars(s) { return String(s || '').replace(/\s/g, '').length; }

async function runAiRewrite(ctx) {
  const { apiKey, cfg, params, helpers } = ctx;
  const { callSiliconFlow } = helpers;
  const topic = String(params.topic || '').trim();
  const original = String(params.script || '').trim();
  const mood = MOOD_DESC[params.mood] ? params.mood : 'affinity';
  const intentKey = INTENTS[params.intent] ? params.intent : 'polish';
  const intent = INTENTS[intentKey];
  const extra = String(params.extra || '').trim();

  if (!original || original.length < 20) throw new Error('缺少原稿 script（至少 20 字）');
  if (!topic) throw new Error('缺少选题 topic');

  const [minC, maxC] = intent.size;
  const cacheKey = topic + '|' + crypto.createHash('md5').update(original).digest('hex').slice(0, 8) + '|' + mood + '|' + intentKey + '|' + extra;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const system = '你是山西电信营业厅的资深营业员，正在录抖音短视频。用户给你一条现成的口播稿，你要按要求改写。\n\n' +
    '【改写要求】' + intent.hint + '\n' +
    '- 保留原稿的事实骨架：数字、价格、地址、产品名、档位（300M/500M/1000M/FTTR）一字不差\n' +
    '- 原文没有的数字、优惠、功能一律禁止编造\n' +
    '- 广告法红线（必须零命中）：禁止「第一」「最」「首家」「国家级」「顶级」「绝对」「唯一」等极限词；列举多个要点用「首先/其次/再一个」\n' +
    '- 站在电信营业员视角，客观讲产品，不攻击任何运营商\n' +
    (extra ? '- 必须自然融入以下补充信息（不要生硬列举）：' + extra + '\n' : '') +
    '- 结尾保留强 CTA（评论区扣「关键词」/ 点赞过 N 解锁 / 到店报暗号），禁止「来营业厅咨询」「进店问问」类弱引导\n' +
    '- 直接输出一段完整口播稿（' + minC + '-' + maxC + ' 字），纯文本，不要 JSON、不要 markdown、不要分镜标记';

  const user = '【原稿】\n' + original + '\n\n' +
    '【语气】' + MOOD_DESC[mood] + '\n' +
    '【改写意图】' + intent.label +
    (extra ? '\n【补充信息】' + extra : '') +
    '\n\n直接输出改写后的口播稿：';

  let lastErr = null;
  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      // 交互场景稳定性优先：首试 fallbackModel（MiniMax-M3 快），备选主模型
      const model = (attempt === 0) ? (cfg.fallbackModel || cfg.model || 'MiniMax-M3') : (cfg.model || 'MiniMax-M2.7');
      const raw = await callSiliconFlow(system, user, apiKey, {
        endpoint: cfg.endpoint, model, temperature: 0.75, maxTokens: 1200, timeoutMs: 60000
      });
      if (!raw) { lastErr = 'AI 返回为空'; continue; }
      let out = stripThink(raw).replace(/```\w*\s*|```/g, '').trim();
      // 模型偶发包 JSON 字符串 → 剥出来
      try {
        const j = JSON.parse(out);
        if (typeof j === 'string') out = j;
        else if (j.script) out = String(j.script);
        else if (j.content) out = String(j.content);
      } catch (e) {}
      // 立场/100M/硬禁清洗（复用 index.js 的 hsSanitize）
      const cleaned = (helpers.hsSanitize ? helpers.hsSanitize(out) : out);
      const n = countChars(cleaned);
      if (AD_RE.test(cleaned) || FIRST_RE.test(cleaned)) { lastErr = '广告法命中，重试'; continue; }
      if (n < minC || n > maxC) { lastErr = '字数 ' + n + ' 超出 [' + minC + ',' + maxC + ']，重试'; continue; }
      const isBroadband = BANDWIDTH_TEXT_RE.test(cleaned) || BROADBAND_TOPIC_RE.test(topic);
      if (isBroadband && !TIER_RE.test(cleaned)) { lastErr = '宽带语境缺合法档位（300/500/1000/FTTR），重试'; continue; }
      if (!STRONG_CTA_RE.test(cleaned)) { lastErr = '缺强 CTA，重试'; continue; }
      const res = { ok: true, mode: 'ai-rewrite', topic, intent: intentKey, script: cleaned, chars: n, source: 'rewrite' };
      if (cache.size >= CACHE_MAX) cache.clear();
      cache.set(cacheKey, res);
      return res;
    } catch (e) { lastErr = e.message || String(e); }
  }
  throw new Error('改写失败（多次未达标）：' + lastErr);
}

module.exports = { runAiRewrite, INTENTS };
