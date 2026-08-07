/**
 * 抖本内容工坊 3.0 · 纯函数核心（core3）
 * 契约来源：v3.0-完整方案.md §7.5 dim5/dim6、§7.6.1、§7.7.1
 *
 * 设计铁律（端测测）：
 *  1. 本文件只放纯函数——同输入必同输出，不读 DOM / 不读 localStorage / 不读 Date.now()。
 *     需要"当前时间""当前用户"的，一律由调用方以参数传入。→ 100% 可单测、可回归。
 *  2. 一切"随机"都走可注入的伪随机源；默认用 operatorId+ISOWeek 播种的确定性 PRNG。
 *     → 满足 §7.5.2 修正②「确定性兜底常驻」，同时保留 §7.7.1「换着变」的体验。
 *  3. UMD：浏览器挂 window.V3Core，Node 走 module.exports，同一份代码两处跑。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.V3Core = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ==================== 1. 哈希 / 时间 ====================

  /** djb2 确定性哈希 → 无符号 32 位（§7.6.1 钉选用） */
  function stableHash(str) {
    var h = 5381;
    str = String(str == null ? '' : str);
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h >>> 0;
  }

  /** mulberry32：由字符串播种的确定性 PRNG，返回 () => [0,1) */
  function seededRandom(seedStr) {
    var a = stableHash(seedStr);
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** ISO 周号：'2026-W32'（跨年周边界按 ISO-8601 处理） */
  function getISOWeek(d) {
    var date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dayNum = (date.getUTCDay() + 6) % 7;
    date.setUTCDate(date.getUTCDate() - dayNum + 3);
    var isoYear = date.getUTCFullYear();
    var firstThursday = new Date(Date.UTC(isoYear, 0, 4));
    var week = 1 + Math.round(((date - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
    return isoYear + '-W' + (week < 10 ? '0' + week : week);
  }

  // ==================== 2. 季节系数（§7.5 dim6） ====================

  var CONTENT_TYPES = ['decision', 'scene', 'review', 'local', 'hotspot'];

  /** 三桶视图：兼容方案原「60/25/15」表述 —— 常规 / 本地 / 热点 */
  var BUCKET_OF = {
    decision: 'evergreen', scene: 'evergreen', review: 'evergreen',
    local: 'local', hotspot: 'hotspot'
  };

  /** 全年基线配比（evergreen .60 / local .25 / hotspot .15，与方案 60/25/15 对齐） */
  var BASE_RATIO = { decision: 0.26, scene: 0.18, review: 0.16, local: 0.25, hotspot: 0.15 };

  /** 季节 / 营销节点增量（山西电信业务节奏），值为加到基线上的绝对增量 */
  var SEASON_DELTA = {
    spring:          { review: +0.04, local: +0.03, decision: -0.04, scene: -0.03 },
    summer:          { decision: +0.05, hotspot: +0.03, review: -0.04, scene: -0.04 },
    autumn:          { scene: +0.04, local: +0.03, decision: -0.03, review: -0.04 },
    winter:          { local: +0.05, scene: +0.03, decision: -0.04, review: -0.04 },
    // 营销节点（覆盖季节增量，优先级更高）
    spring_festival: { local: +0.10, scene: +0.05, decision: -0.08, review: -0.07 },
    back_to_school:  { decision: +0.10, scene: +0.04, review: -0.07, local: -0.07 },
    summer_break:    { decision: +0.08, hotspot: +0.05, review: -0.06, scene: -0.07 },
    double11:        { review: +0.10, decision: +0.03, scene: -0.06, local: -0.07 },
    may_day:         { local: +0.08, hotspot: +0.04, review: -0.06, decision: -0.06 }
  };

  /**
   * 判定季节与营销节点（纯函数，日期由调用方传入）
   * @returns {{season:string, tag:string, label:string}}
   */
  function seasonOf(date) {
    var m = date.getMonth() + 1, d = date.getDate();
    var season = (m >= 3 && m <= 5) ? 'spring'
      : (m >= 6 && m <= 8) ? 'summer'
      : (m >= 9 && m <= 11) ? 'autumn' : 'winter';
    var tag = season, label = { spring: '春季', summer: '夏季', autumn: '秋季', winter: '冬季' }[season];
    // 营销节点优先
    if ((m === 1 && d >= 15) || (m === 2 && d <= 20)) { tag = 'spring_festival'; label = '春节返乡季'; }
    else if ((m === 8 && d >= 20) || (m === 9 && d <= 15)) { tag = 'back_to_school'; label = '开学季'; }
    else if (m === 7 || (m === 8 && d < 20)) { tag = 'summer_break'; label = '暑期档'; }
    else if ((m === 10 && d >= 20) || (m === 11 && d <= 15)) { tag = 'double11'; label = '双11大促'; }
    else if ((m === 4 && d >= 25) || (m === 5 && d <= 5)) { tag = 'may_day'; label = '五一假期'; }
    return { season: season, tag: tag, label: label };
  }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function normalize(obj) {
    var sum = 0, k;
    for (k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) sum += obj[k];
    var out = {};
    if (sum <= 0) { for (k in obj) out[k] = 0; return out; }
    for (k in obj) out[k] = Math.round((obj[k] / sum) * 1000) / 1000;
    return out;
  }

  /**
   * 内容配比纯函数 —— §7.5.2 修正②第 1 条要求的可单测配比模型
   * @param {string} seasonTag  seasonOf().tag
   * @param {object|null} signal 归一化使用信号 {decision:.2,...}；null=不启用（确定性兜底）
   * @param {object} [opts] { enableSignal:boolean, signalWeight:number, maxDrift:number }
   * @returns {object} 各类型占比，和为 1
   *
   * 不变量（单测断言）：
   *  · 任意输入下 Σratio ≈ 1，且每项 ∈ [0,1]
   *  · signal=null 或 enableSignal=false → 结果只由 seasonTag 决定（确定性）
   *  · 启用 signal 时，每项相对确定性基线的偏移 ≤ maxDrift（默认 0.10）→ 可回归、不失控
   */
  function ratio(seasonTag, signal, opts) {
    opts = opts || {};
    var maxDrift = (opts.maxDrift == null) ? 0.10 : opts.maxDrift;
    var w = (opts.signalWeight == null) ? 0.2 : opts.signalWeight;

    var delta = SEASON_DELTA[seasonTag] || {};
    var base = {};
    for (var i = 0; i < CONTENT_TYPES.length; i++) {
      var t = CONTENT_TYPES[i];
      base[t] = clamp(BASE_RATIO[t] + (delta[t] || 0), 0.02, 0.9);
    }
    var deterministic = normalize(base);

    if (!signal || opts.enableSignal !== true) return deterministic;

    var sig = normalize(signal);
    var blended = {}, lo = {}, hi = {}, j, k;
    for (j = 0; j < CONTENT_TYPES.length; j++) {
      k = CONTENT_TYPES[j];
      lo[k] = Math.max(0, deterministic[k] - maxDrift);
      hi[k] = Math.min(1, deterministic[k] + maxDrift);
      blended[k] = (1 - w) * deterministic[k] + w * (sig[k] || 0);
    }
    // 硬限幅 + 归一化必须同时成立：直接 normalize 会把值重新顶出 ±maxDrift 窗口，
    // 所以做「盒约束单纯形投影」——夹紧后把残差只分摊给仍有余量的类型，迭代到 Σ=1。
    return projectToBox(blended, lo, hi);
  }

  /**
   * 把向量投影到 { Σx = 1 且 lo[k] ≤ x[k] ≤ hi[k] } 上。
   * 因 Σlo ≤ 1 ≤ Σhi（deterministic 已归一化且 maxDrift>0）必然可行。
   */
  function projectToBox(vals, lo, hi) {
    var keys = CONTENT_TYPES, v = {}, i, k;
    for (i = 0; i < keys.length; i++) { k = keys[i]; v[k] = clamp(vals[k] || 0, lo[k], hi[k]); }
    for (var it = 0; it < 64; it++) {
      var sum = 0;
      for (i = 0; i < keys.length; i++) sum += v[keys[i]];
      var resid = 1 - sum;
      if (Math.abs(resid) < 1e-12) break;
      var room = 0, roomOf = {};
      for (i = 0; i < keys.length; i++) {
        k = keys[i];
        var r = resid > 0 ? (hi[k] - v[k]) : (v[k] - lo[k]);
        roomOf[k] = r > 0 ? r : 0;
        room += roomOf[k];
      }
      if (room <= 1e-15) break;
      for (i = 0; i < keys.length; i++) {
        k = keys[i];
        v[k] = clamp(v[k] + resid * (roomOf[k] / room), lo[k], hi[k]);
      }
    }
    return v;
  }

  /** 五类 → 三桶（方案 60/25/15 视图） */
  function toBuckets(r) {
    var out = { evergreen: 0, local: 0, hotspot: 0 };
    for (var k in r) if (BUCKET_OF[k]) out[BUCKET_OF[k]] += r[k];
    for (var b in out) out[b] = Math.round(out[b] * 1000) / 1000;
    return out;
  }

  /**
   * 按配比把 n 个排期槽位分配给内容类型（最大余数法，完全确定性）
   * 再按"周一决策 / 周二场景 / 周三测评 / 周四本地 / 周五热点"的编排偏好落位。
   */
  var DAY_PREFERENCE = ['decision', 'scene', 'review', 'local', 'hotspot'];

  function allocateSlots(r, n) {
    n = n || 5;
    var quota = [], i, t;
    for (i = 0; i < CONTENT_TYPES.length; i++) {
      t = CONTENT_TYPES[i];
      var exact = (r[t] || 0) * n;
      quota.push({ type: t, floor: Math.floor(exact), rem: exact - Math.floor(exact) });
    }
    var used = quota.reduce(function (s, q) { return s + q.floor; }, 0);
    var left = n - used;
    quota.slice().sort(function (a, b) {
      if (b.rem !== a.rem) return b.rem - a.rem;
      return CONTENT_TYPES.indexOf(a.type) - CONTENT_TYPES.indexOf(b.type); // 平局按固定序，保确定性
    }).forEach(function (q) { if (left > 0) { q.floor += 1; left -= 1; } });

    var counts = {};
    quota.forEach(function (q) { counts[q.type] = q.floor; });

    // 按日偏好落位；某类型配额用尽则由剩余配额最多的类型顶替（固定序打平）
    var slots = [];
    for (i = 0; i < n; i++) {
      var pref = DAY_PREFERENCE[i % DAY_PREFERENCE.length];
      if (counts[pref] > 0) { counts[pref]--; slots.push(pref); continue; }
      var best = null;
      for (var j = 0; j < CONTENT_TYPES.length; j++) {
        var c = CONTENT_TYPES[j];
        if (counts[c] > 0 && (best === null || counts[c] > counts[best])) best = c;
      }
      if (best === null) best = pref;
      if (counts[best] > 0) counts[best]--;
      slots.push(best);
    }
    return slots;
  }

  // ==================== 3. 3 语气 × 6 人设映射（§7.6.1） ====================

  var MOODS = ['affinity', 'professional', 'young'];

  /** 6 人设 → 3 语气；兼容 2.x(sister/sweet/tech/biz/young/master) 与原型(warm/vibe/pro) 两套命名 */
  var PERSONA_TO_MOOD = {
    warm: 'affinity', sister: 'affinity', sweet: 'affinity',
    tech: 'professional', biz: 'professional', pro: 'professional', master: 'professional',
    vibe: 'young', young: 'young'
  };

  function moodOfPersona(p) { return PERSONA_TO_MOOD[p] || 'affinity'; }

  function personasOfMood(m) {
    var out = [];
    for (var p in PERSONA_TO_MOOD) if (PERSONA_TO_MOOD[p] === m) out.push(p);
    return out;
  }

  /**
   * 确定性钉选（§7.6.1）：同营业员 + 同选题 + 同周 → 恒定同一条变体
   */
  function pinnedIndex(operatorId, seedId, isoWeek, len) {
    if (!len || len <= 0) return 0;
    return stableHash(operatorId + '|' + seedId + '|' + isoWeek) % len;
  }

  // ==================== 4. 偏好向量 + 路由（§7.5 dim5） ====================

  /** 事件权重：复制/分享是强正反馈，换一条是负反馈，曝光是弱正反馈 */
  var SIGNAL_WEIGHT = { seed_copy: 2, seed_share: 3, seed_view: 0.2, seed_skip: -1.5 };

  /**
   * 由使用信号推导偏好向量（纯函数，事件数组由调用方给）
   * @returns {{mood:object, type:object, sample:number}} 权重区间约束在 [0.5,1.5]，避免过拟合
   */
  function prefVectorFrom(events, opts) {
    opts = opts || {};
    var lo = opts.lo == null ? 0.5 : opts.lo, hi = opts.hi == null ? 1.5 : opts.hi;
    var moodScore = {}, typeScore = {}, n = 0, i, e, w;
    for (i = 0; i < MOODS.length; i++) moodScore[MOODS[i]] = 0;
    for (i = 0; i < CONTENT_TYPES.length; i++) typeScore[CONTENT_TYPES[i]] = 0;
    events = events || [];
    for (i = 0; i < events.length; i++) {
      e = events[i]; if (!e || !e.ev) continue;
      w = SIGNAL_WEIGHT[e.ev]; if (w == null) continue;
      n++;
      if (e.mood && moodScore[e.mood] != null) moodScore[e.mood] += w;
      if (e.type && typeScore[e.type] != null) typeScore[e.type] += w;
    }
    function toWeights(score) {
      var keys = Object.keys(score), max = 0, k, i2;
      for (i2 = 0; i2 < keys.length; i2++) max = Math.max(max, Math.abs(score[keys[i2]]));
      var out = {};
      for (i2 = 0; i2 < keys.length; i2++) {
        k = keys[i2];
        out[k] = max === 0 ? 1 : clamp(1 + (score[k] / max) * ((hi - lo) / 2), lo, hi);
        out[k] = Math.round(out[k] * 1000) / 1000;
      }
      return out;
    }
    return { mood: toWeights(moodScore), type: toWeights(typeScore), sample: n };
  }

  /** 由使用信号推导内容类型信号分布（喂给 ratio 的 signal 参数，负分截零） */
  function signalDistFrom(events) {
    var dist = {}, i, t;
    for (i = 0; i < CONTENT_TYPES.length; i++) dist[CONTENT_TYPES[i]] = 0;
    events = events || [];
    for (i = 0; i < events.length; i++) {
      var e = events[i]; if (!e || !e.type || dist[e.type] == null) continue;
      var w = SIGNAL_WEIGHT[e.ev]; if (w == null) continue;
      dist[e.type] += w;
    }
    for (t in dist) dist[t] = Math.max(0, dist[t]);
    var sum = 0; for (t in dist) sum += dist[t];
    return sum > 0 ? normalize(dist) : null; // 无有效信号 → null，调用方走确定性
  }

  /** 池规模阈值：≥30 才做偏好过滤，否则回退随机去重（§7.5 dim5 采纳条款） */
  var MIN_POOL_FOR_PREF = 30;

  /**
   * 卡片池路由：偏好过滤 + 随机去重
   * @param {Array} items  待路由条目，需含 {seedId, type, mood}
   * @param {object} pref  prefVectorFrom() 结果，可为 null
   * @param {object} opts  { limit, rnd, dedupeKey, minPool }
   * @returns {{items:Array, mode:'pref'|'random', poolSize:number}}
   *
   * 注：rnd 默认由调用方注入确定性 PRNG（seededRandom(operatorId+week)），
   *     所以"随机去重"在同人同周内可复现 → E2E 可回归（§7.5.2 修正②第 2 条）。
   */
  function routePool(items, pref, opts) {
    opts = opts || {};
    var rnd = opts.rnd || Math.random;
    var limit = opts.limit || (items ? items.length : 0);
    var minPool = opts.minPool == null ? MIN_POOL_FOR_PREF : opts.minPool;
    var key = opts.dedupeKey || function (it) { return it && (it.seedId || it.topic || JSON.stringify(it)); };
    items = items || [];

    // 去重（保序，先到先得）
    var seen = {}, uniq = [];
    for (var i = 0; i < items.length; i++) {
      var k = key(items[i]);
      if (seen[k]) continue;
      seen[k] = 1; uniq.push(items[i]);
    }

    var mode = (pref && uniq.length >= minPool) ? 'pref' : 'random';
    var scored = uniq.map(function (it, idx) {
      var w = 1;
      if (mode === 'pref') {
        w = (pref.type && pref.type[it.type] != null ? pref.type[it.type] : 1) *
            (pref.mood && pref.mood[it.mood] != null ? pref.mood[it.mood] : 1);
      }
      // 随机扰动（确定性 PRNG）→ 同权重条目不至于永远同序
      return { it: it, idx: idx, score: w * (0.85 + 0.3 * rnd()) };
    });
    scored.sort(function (a, b) { return b.score - a.score || a.idx - b.idx; });
    return { items: scored.slice(0, limit).map(function (s) { return s.it; }), mode: mode, poolSize: uniq.length };
  }

  /**
   * 「换一条」下一变体（§7.7.1）：排除当前 + 跳过史 + 组内随机；组内耗尽则重置跳过史
   * @returns {{index:number, reset:boolean, exhausted:boolean}} index=-1 表示组内仅 1 条
   */
  function routeNext(groupLen, curIdx, skipList, rnd) {
    rnd = rnd || Math.random;
    skipList = skipList || [];
    if (!groupLen || groupLen <= 1) return { index: -1, reset: false, exhausted: true };
    var cand = [], i;
    for (i = 0; i < groupLen; i++) if (i !== curIdx && skipList.indexOf(i) < 0) cand.push(i);
    var reset = false;
    if (cand.length === 0) {
      reset = true;
      for (i = 0; i < groupLen; i++) if (i !== curIdx) cand.push(i);
    }
    return { index: cand[Math.floor(rnd() * cand.length)], reset: reset, exhausted: false };
  }

  // ==================== 5. 立场合规（红线，与 src/core.js sanitizeStance 同源） ====================

  var STANCE_PATTERNS = [
    /别?(急着)?骂运营商/g, /骂运营商/g, /怪运营商/g,
    /(白)?送钱给运营商/g, /给运营商(白)?送钱/g, /运营商白送钱/g,
    /电信更坑人/g, /不要相信运营商/g, /运营商都是坑/g, /运营商坑人/g
  ];

  /** 返回命中的违规片段（空数组=合规）——渲染前自检，杜绝红线内容出前端 */
  function scanStance(text) {
    var hits = [], t = String(text || '');
    for (var i = 0; i < STANCE_PATTERNS.length; i++) {
      var re = new RegExp(STANCE_PATTERNS[i].source, 'g');
      var m;
      while ((m = re.exec(t)) !== null) { hits.push(m[0]); if (re.lastIndex === m.index) re.lastIndex++; }
    }
    return hits;
  }

  return {
    stableHash: stableHash,
    seededRandom: seededRandom,
    getISOWeek: getISOWeek,
    seasonOf: seasonOf,
    ratio: ratio,
    toBuckets: toBuckets,
    allocateSlots: allocateSlots,
    moodOfPersona: moodOfPersona,
    personasOfMood: personasOfMood,
    pinnedIndex: pinnedIndex,
    prefVectorFrom: prefVectorFrom,
    signalDistFrom: signalDistFrom,
    routePool: routePool,
    routeNext: routeNext,
    scanStance: scanStance,
    CONTENT_TYPES: CONTENT_TYPES,
    MOODS: MOODS,
    BASE_RATIO: BASE_RATIO,
    MIN_POOL_FOR_PREF: MIN_POOL_FOR_PREF,
    DAY_PREFERENCE: DAY_PREFERENCE
  };
});
