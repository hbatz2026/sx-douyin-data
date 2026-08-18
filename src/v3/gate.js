/**
 * 抖本 3.0 · 质量门禁（gate）
 * 与 src/core.js 的 auditScript / isFullScript / detectAdWords / scoreScriptV2 同源。
 * 2026-08-18 从 core.js 搬运至此：3.0 试阅页 trial.html 不加载 2.x 主站 core.js
 * （避免全局函数命名冲突破坏试阅页），故此处独立提供同名全局门禁，保证 3.0 与 2.x 质量口径一致。
 *
 * ⚠️ 维护契约：改 src/core.js 上述四个函数时，必须同步本文件（否则 3.0 门禁会悄悄落后于 2.x）。
 *
 * UMD：浏览器挂 window.auditScript 等全局（pool.js 直接引用）；Node 走 module.exports（门禁单测）。
 */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.scoreScriptV2 = api.scoreScriptV2;
  root.isFullScript = api.isFullScript;
  root.detectAdWords = api.detectAdWords;
  root.auditScript = api.auditScript;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  // N-3：合规规则取自共享 compliance-rules.js（单一事实源 config/compliance-rules.json，见 scripts/sync-compliance.cjs）。
  // 缺失时回退内置默认（防御），正常路径以共享规则为准。
  var RULES = (typeof require === 'function')
    ? (function () { try { return require('./compliance-rules'); } catch (e) { return null; } })()
    : (root.___COMPLIANCE_RULES || null);

  var ALGO_WEIGHTS = {
    collect: 0.30,   // 收藏力（最高权重，内容长期价值，触发7天慢推流）
    revisit: 0.22,   // 复访力（系列化/关注，长效流量）
    interact: 0.20,  // 互动力（评论 + 铁粉共鸣 + 转发裂变）
    retention: 0.18, // 留存力（5秒钩子 + 完播结构，门槛级）
    convert: 0.10    // 转化力（到店核销，业务KPI，算法不直接加权但营业厅必需）
  };

  function scoreScriptV2(scriptText, ctx) {
    if (!scriptText) return { retention: 0, collect: 0, interact: 0, convert: 0, revisit: 0, total: 0, openerRepeat: false, ctaStuffed: false };
    var t = (scriptText || '').trim();
    var opener = t.slice(0, 4);

    var HOOK_STRONG = /^(为什么|怎么|谁|别|还在|不会|知道吗|你|兄弟们|哥|姐妹|上个月|昨天|前两天|想|说真的|说实话)/;
    var HOOK_WEAK = /^(我|咱们|咱|那个|最近|其实|很多人|有些|每次|记得|宝子|姐妹们|兄弟们|哥)/;
    var HOOK_TEMPLATE = /^(家人们)/;
    var hookPunct = /[？?！!]/;
    var hasStruct = /(\d+|\u5bf9\u7167|对比|第一|第二|第三|方案|步|种|vs|：)/;

    var hookBase;
    if (HOOK_TEMPLATE.test(t)) hookBase = 35;
    else if (HOOK_STRONG.test(t) || /^\d/.test(t)) hookBase = 55;
    else if (HOOK_WEAK.test(t)) hookBase = 38;
    else hookBase = 30;
    var punctBonus = (hookPunct.test(t.slice(0, 30)) && !HOOK_TEMPLATE.test(t)) ? 25 : 8;
    var structScore = hasStruct.test(t) ? 40 : 15;
    var retention = Math.min(100, hookBase + punctBonus + structScore);

    var collectKw = /(截图|保存|收藏|对照表|速查|清单|流程|指南|数据卡|留存|存好|留档|到厅对照|翻出来|拿出来看|记下来|存着|记牢|划重点|留着|备着|这份|这个表|收好)/g;
    var collect = Math.min(100, (t.match(collectKw) || []).length * 35 + 25);

    var commentKw = /(评论|说说|聊聊|告诉我|评论区|你怎么看|你的情况|你用什么|聊聊你|你住|你家|你月租|你体验)/g;
    var shareKw = /(转发|发给|分享给|发给你|转给)/g;
    var empathyKw = /(你|咱们|咱|兄弟|姐妹|宝子|家人们|阿姨|大姐|小伙|老人|孩子|王姐|大哥|姐)/g;
    var specificPerson = /(阿姨|大姐|小伙|老人|孩子|王姐|大哥|姐|兄弟|姐妹|宝子|家人们)/;
    var commentScore = Math.min(60, (t.match(commentKw) || []).length * 30 + 15);
    var shareScore = Math.min(20, (t.match(shareKw) || []).length * 20);
    var empathyScore = Math.min(30, (t.match(empathyKw) || []).length > 2 ? (specificPerson.test(t) ? 30 : 18) : 12);
    var interact = Math.min(100, commentScore + shareScore + empathyScore);

    var convertKw = /(到店|来店|来营业厅|预约|私信|扫码|链接|核销|门店|厅里|店里|办理|当场)/g;
    var convert = Math.min(100, (t.match(convertKw) || []).length * 22 + 22);

    var revisitKw = /(关注|下期|系列|主页|持续|记得看|点关注|关注我|下回|下次|后续|追更|每周)/g;
    var revisit = Math.min(100, (t.match(revisitKw) || []).length * 40 + 15);

    var openerRepeat = false;
    if (ctx && Array.isArray(ctx.usedOpeners) && ctx.usedOpeners.indexOf(opener) >= 0) {
      openerRepeat = true;
      retention = Math.max(0, retention - 15);
    }

    var hasCollect = !!(t.match(collectKw));
    var hasRevisit = !!(t.match(revisitKw));
    var hasComment = !!(t.match(commentKw));
    var hasConvert = !!(t.match(convertKw));
    var hasShare   = !!(t.match(shareKw));
    var ctaCount = (hasCollect ? 1 : 0) + (hasRevisit ? 1 : 0) + (hasComment ? 1 : 0) + (hasConvert ? 1 : 0) + (hasShare ? 1 : 0);

    var _ctaSentences = t.split(/[。！？!?\n]/).map(function (s) { return s.trim(); }).filter(Boolean)
      .filter(function (s) { return /(截图|保存|收藏|存着|记牢|收好|关注|点关注|评论|说说|聊聊|告诉我|来店|到店|来营业厅|私信|转发|转给|发给|分享)/.test(s); }).length;
    var ctaStuffed = (ctaCount >= 4) || (ctaCount >= 3 && _ctaSentences >= 3);
    if (ctaStuffed) retention = Math.max(0, retention - 10);

    var total = Math.round(
      collect * ALGO_WEIGHTS.collect +
      revisit * ALGO_WEIGHTS.revisit +
      interact * ALGO_WEIGHTS.interact +
      retention * ALGO_WEIGHTS.retention +
      convert * ALGO_WEIGHTS.convert
    );
    return { retention: retention, collect: collect, interact: interact, convert: convert, revisit: revisit, total: total, openerRepeat: openerRepeat, ctaStuffed: ctaStuffed, ctaCount: ctaCount };
  }

  // 判定文本是否为「完整口播稿」（而非选题提纲/决策话术）。
  function isFullScript(text) {
    if (!text || typeof text !== 'string') return false;
    var t = text.replace(/\s/g, '');
    if (t.length < 120) return false;
    if (/【.+】/.test(text)) return false;
    var pain = /(卡顿|慢|贵|坑|愁|烦|怕|难|信号差|掉线|纠结|选错|浪费|踩坑|后悔|投诉)/;
    var solution = /(建议|推荐|选|办|装|用|升级|换|直接上|一步到位|搞定|解决)/;
    var proof = /(实测|数据|对比|测试|案例|咱|电信|营业厅|师傅|上门|Mbps|兆|元|块|省)/;
    var convert = /(到店|来店|私信|扫码|办理|预约|核销|厅里|店里|点击|来营业厅)/;
    var revisit = /(关注|下期|系列|主页|后续|每周|追更|评论)/;
    var hit = [pain.test(t), solution.test(t), proof.test(t), convert.test(t), revisit.test(t)].filter(Boolean).length;
    return hit >= 3;
  }

  function auditScript(scriptText, ctx) {
    var s = scoreScriptV2(scriptText, ctx);
    var checks = [
      { name: '5秒钩子', ok: s.retention >= 60, detail: '开头需冲突/利益/悬念，拉住前3秒（当前' + s.retention + '）' },
      { name: 'CTA动作', ok: s.ctaCount >= 1, detail: '需至少含1个动作(收藏/复访/评论/到店/转发)（当前' + s.ctaCount + '个）' },
      { name: '无CTA堆砌', ok: !s.ctaStuffed, detail: s.ctaStuffed ? 'CTA动作≥4类或呈清单式堆砌，务必收口到1-2个最自然的' : 'CTA未堆砌（当前' + s.ctaCount + '个动作）' }
    ];
    if (ctx && Array.isArray(ctx.usedOpeners) && s.openerRepeat) checks.push({ name: '开头雷同', ok: false, detail: '该人设已用过相同开场，换一个更有记忆点的钩子' });
    var adWords = (typeof detectAdWords === 'function') ? detectAdWords(scriptText || '') : [];
    checks.push({ name: '违禁词', ok: adWords.length === 0, detail: adWords.length ? ('含：' + adWords.join('、')) : '无绝对化/违规表述' });
    var pass = checks.every(function (c) { return c.ok; });
    return { pass: pass, checks: checks, score: s };
  }

  function detectAdWords(text) {
    if (!text || typeof text !== 'string') return [];
    var ad = (RULES && RULES.adWords) || {};
    var words = (ad.block || []).concat(ad.auto_fix || []);
    if (!words.length) {
      // 防御回退（RULES 未加载时）：与 config/compliance-rules.json 保持同步
      words = ['最好', '最大', '最全', '最佳', '最低', '最高', '最先', '最新', '最便宜', '唯一', '独家', '首创', '顶级', '极品', '至尊', '王牌', '冠军', '百分百', '100%', '绝对', '保证', '担保', '肯定没问题', '永不', '永久', '免费送', '免费领', '私信我', '最后一天', '史上最低', '绝版'];
    }
    var found = [];
    for (var i = 0; i < words.length; i++) { if (text.indexOf(words[i]) >= 0) found.push(words[i]); }
    // 「第一」排除序数用法（第一步/第一名/第一位/第一时间），仅拦绝对化超级lative（全网第一/销量第一/第一品牌）
    var firstRe = new RegExp(ad.firstOrdinalPattern || '第一(?!步|名|位|顺|时间|次|回)', 'g');
    var m1 = text.match(firstRe);
    if (m1) for (var k = 0; k < m1.length; k++) if (found.indexOf('第一') < 0) found.push('第一');
    var zuiRe = new RegExp(ad.zuiPattern || '最(?:省|值|合适|靠谱|强|优|劣)', 'g');
    var m;
    while ((m = zuiRe.exec(text)) !== null) {
      if (found.indexOf(m[0]) < 0) found.push(m[0]);
    }
    return found;
  }

  return {
    scoreScriptV2: scoreScriptV2,
    isFullScript: isFullScript,
    auditScript: auditScript,
    detectAdWords: detectAdWords
  };
});
