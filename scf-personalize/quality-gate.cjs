// quality-gate.js — 内容质量门禁（G6）SCF 端内联模块
// 从 douyin-content-lab/checkScriptQuality.cjs 提取核心（checkVariant/checkPool/红线），供 SCF index.js 直接 require。
// 契约：变体需含 script(150-250字口播稿) + beats(五段: hook/pain/solution/proof/cta) + hookKind(四选一)
// 红线：不攻击运营商 + 宽带档位仅 300/500/1000/FTTR（禁 100M/100兆）
// 用法：const Q = require('./quality-gate.js'); Q.checkVariant(v, parent) / Q.checkPool(pool)
(function (root, factory) {
  const mod = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = mod;
  else root.CheckScriptQuality = mod;
})(typeof self !== 'undefined' ? self : this, function () {
  const FORBIDDEN = [
    '别给运营商白送钱', '给运营商白送钱', '给运营商送钱', '运营商白送钱', '白给运营商送钱',
    '别急着骂运营商', '别骂运营商', '骂运营商', '别怪运营商', '怪运营商',
    '电信更坑人', '不要相信运营商', '运营商都是坑', '运营商坑人'
  ];
  const BAD_TIER = /100\s?[Mm兆]/;
  const HOOK_KINDS = ['conflict', 'value', 'suspense', 'resonance', '冲突', '价值', '悬念', '共鸣'];
  const BEAT_KEYS = ['hook', 'pain', 'solution', 'proof', 'cta'];
  const MIN_CHARS = 150, MAX_CHARS = 250, MIN_BEAT = 12, MIN_HOOK = 6;

  // ── 外部规则（config/compliance-rules.json，零代码加规则）──
  let EXT = { block: [], warn: [] }; // {id, pattern} 列表

  function setExternalRules(rules) {
    EXT = { block: [], warn: [] };
    const list = (rules && rules.rules) || [];
    for (const r of list) {
      if (!r || !r.pattern) continue;
      if (r.severity === 'block') EXT.block.push({ id: r.id, pattern: r.pattern });
      else if (r.severity === 'warn') EXT.warn.push({ id: r.id, pattern: r.pattern });
    }
  }

  function countChars(s) { return (s || '').replace(/\s/g, '').length; }

  function redlineHit(text) {
    const t = text || '';
    for (const w of FORBIDDEN) if (t.includes(w)) return w;
    for (const r of EXT.block) if (t.includes(r.pattern)) return '[' + (r.id || 'rule') + '] ' + r.pattern;
    if (BAD_TIER.test(t)) return '100M/100兆档位字样';
    return null;
  }

  function warnHits(text) {
    const out = [];
    for (const r of EXT.warn) if ((text || '').includes(r.pattern)) out.push(r.pattern);
    return out;
  }

  function checkVariant(v, parent) {
    const reasons = [];
    const script = v && v.script ? String(v.script) : '';
    const beats = (v && v.beats) || {};
    let score = 100;

    for (const k of BEAT_KEYS) {
      const minLen = k === 'hook' ? MIN_HOOK : MIN_BEAT;
      const seg = (beats[k] || '').replace(/\s/g, '');
      if (!seg) { reasons.push({ level: 'error', msg: 'beats.' + k + ' 缺失' }); score -= 15; }
      else if (seg.length < minLen) { reasons.push({ level: 'warn', msg: 'beats.' + k + ' 过短(' + seg.length + '字)，疑似单句摘要' }); score -= 6; }
    }

    const n = countChars(script);
    if (!script) { reasons.push({ level: 'error', msg: 'script 为空' }); score -= 20; }
    else if (n < MIN_CHARS || n > MAX_CHARS) {
      reasons.push({ level: 'error', msg: 'script 字数 ' + n + ' 超出 [' + MIN_CHARS + ',' + MAX_CHARS + ']' });
      score -= 20;
    }

    const hk = (v && v.hookKind) || (parent && parent.hookKind);
    if (!hk || !HOOK_KINDS.includes(hk)) {
      reasons.push({ level: 'error', msg: 'hookKind 非法: ' + hk }); score -= 10;
    }

    const allText = [script].concat(BEAT_KEYS.map(k => beats[k] || '')).join('\n');
    const hit = redlineHit(allText);
    if (hit) { reasons.push({ level: 'error', msg: '红线命中: ' + hit }); score -= 40; }

    // 外部规则 warn 级：标记人工复核，不阻断
    const warns = warnHits(allText);
    for (const w of warns) { reasons.push({ level: 'warn', msg: '规则warn: ' + w }); score -= 3; }

    const pass = !reasons.some(r => r.level === 'error');
    return { pass, score: Math.max(0, Math.round(score)), reasons };
  }

  function checkPool(data) {
    const out = { total: 0, passed: 0, failed: 0, details: [] };
    const scripts = (data && data.scripts) || [];
    for (const s of scripts) {
      const variants = (s && s.variants) || {};
      for (const mood of Object.keys(variants)) {
        for (const v of variants[mood]) {
          out.total++;
          const r = checkVariant(v, s);
          if (r.pass) out.passed++; else out.failed++;
          out.details.push({ seedId: s.seedId, mood: mood, vid: v._vid, pass: r.pass, score: r.score, reasons: r.reasons });
        }
      }
    }
    return out;
  }

  return { checkVariant, checkPool, setExternalRules, FORBIDDEN, BEAT_KEYS, MIN_CHARS, MAX_CHARS, MIN_BEAT, MIN_HOOK, HOOK_KINDS };
});
