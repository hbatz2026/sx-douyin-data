/**
 * 抖本内容工坊 3.0 · 三级池 + 四级显式回退（§7.6.2）
 *
 *   ① 日预热池 dayPool   —— SCF 每日 08:05 预热产出（现阶段落在 data/dailyScripts.js）
 *   ② 周备池   weekPool  —— 由 weeklyNew + presets + topicPool + hotspotData 现场编排
 *   ③ 本地缓存 cachePool —— localStorage，最近 7 天，命中即用（断网/池挂也能开工）
 *   ④ 空态     empty     —— 骨架屏 + "暂无今日推荐"，明确空态，绝不伪造数据
 *
 * 每级命中都发 seed_fallback(level)，供健康告警（§7.6.3）。
 * 测试钩子：URL ?forceEmpty=day,week 或 window.__V3_FORCE_EMPTY=['day','week']
 *          → 让 E2E 能逐条证明每级回退（§7.6.2「E2E 必修分支」）。
 */
(function (root) {
  'use strict';

  var C = root.V3Core;
  var T = root.V3Track;
  var CACHE_KEY = 'sxdy_v3_pool_cache';
  var CACHE_MAX_AGE_MS = 7 * 24 * 3600 * 1000;

  var TYPE_META = {
    decision: { name: '决策指南', icon: '📊' },
    scene:    { name: '一线场景', icon: '🎬' },
    review:   { name: '深度测评', icon: '🔍' },
    local:    { name: '本地事件', icon: '📍' },
    hotspot:  { name: '热点跟拍', icon: '🔥' }
  };

  // 语气模板：营业员视角，零攻击运营商表述（红线见 core3.scanStance）
  var TONE = {
    affinity: [
      { p: 'warm',   f: function (t, pt) { return '最近好多街坊问我' + t + '。' + pt + ' 拿不准的直接来厅里，我帮你一条条对。'; } },
      { p: 'sweet',  f: function (t, pt) { return '姐妹们问得最多的就是' + t + '～' + pt + ' 评论区留城市，我帮你看看哪档合适。'; } }
    ],
    professional: [
      { p: 'tech',   f: function (t, pt) { return t + '，直接给判断依据：' + pt + ' 到厅可现场实测，数据说话。'; } },
      { p: 'biz',    f: function (t, pt) { return '关于' + t + '，给一个可执行口径：' + pt + ' 建议每季度复核一次，避免长期错配。'; } }
    ],
    young: [
      { p: 'vibe',   f: function (t, pt) { return '兄弟们，' + t + '别瞎选！' + pt + ' 冲之前先看这条，省下的都是自己的。'; } },
      { p: 'young',  f: function (t, pt) { return t + '？三句话讲完：' + pt + ' 还有不懂的评论区喊我。'; } }
    ]
  };

  var HOOK_BY_TYPE = {
    decision: '选之前先搞清这一条', scene: '真实发生在营业厅的一件小事',
    review: '实测数据摆出来看', local: '太原本地才有的这个安排', hotspot: '今天这个热点，营业厅能接'
  };

  function forcedEmpty() {
    var set = {};
    var list = [];
    try {
      var q = new URLSearchParams(location.search).get('forceEmpty');
      if (q) list = list.concat(q.split(','));
    } catch (e) {}
    if (root.__V3_FORCE_EMPTY && root.__V3_FORCE_EMPTY.length) list = list.concat(root.__V3_FORCE_EMPTY);
    list.forEach(function (k) { if (k) set[String(k).trim()] = true; });
    return set;
  }

  // ==================== ① 日预热池 ====================
  function loadDayPool() {
    // 3.0 SEED_POOL：优先读 SCF seed-pool 模式产出的 mood 分组契约数据；fallback 回 v2.x dailyScripts
    var d = root.___v3SeedPool || root.___dailyScripts;
    if (!d || !d.scripts || !d.scripts.length) return null;
    var out = [];
    for (var i = 0; i < d.scripts.length; i++) {
      var s = d.scripts[i];
      if (!s || !s.variants) continue;
      s.type = s.type || 'decision';
      s.typeName = s.typeName || (TYPE_META[s.type] || {}).name || '脚本';
      s.typeIcon = s.typeIcon || (TYPE_META[s.type] || {}).icon || '📄';
      out.push(s);
    }
    return out.length ? out : null;
  }

  // ==================== ② 周备池 ====================
  function pointOf(topic) {
    var packs = [root.___t1Presets, root.___t2Presets, root.___t4Presets];
    for (var i = 0; i < packs.length; i++) {
      var p = packs[i]; if (!p || !p[topic]) continue;
      var keys = Object.keys(p[topic]);
      if (!keys.length) continue;
      var parts = [];
      for (var j = 0; j < Math.min(2, keys.length); j++) parts.push(keys[j] + '：' + p[topic][keys[j]]);
      return parts.join(' ');
    }
    return '按人数、房型、预算三步筛，山西电信家宽在售 300M / 500M / 1000M / FTTR 四档，对号入座就行。';
  }

  function makeSeed(topic, type, isNew, idx) {
    var seedId = 's_w_' + type + '_' + C.stableHash(topic).toString(36);
    var variants = {};
    var moods = C.MOODS;
    for (var m = 0; m < moods.length; m++) {
      var mood = moods[m], arr = [], tpl = TONE[mood] || [];
      for (var i = 0; i < tpl.length; i++) {
        var text = tpl[i].f(topic, pointOf(topic));
        if (C.scanStance(text).length) continue;          // 合规最后一道闸：命中红线直接不入池
        arr.push({ _vid: mood.charAt(0) + (i + 1), _persona: tpl[i].p, bgm: ['温馨轻快', '沉稳专业', '动感'][m],
                   title: topic, script: text, tags: [ (TYPE_META[type] || {}).name || type ] });
      }
      variants[mood] = arr;
    }
    return {
      seedId: seedId, topic: topic, type: type,
      typeName: (TYPE_META[type] || {}).name || '脚本',
      typeIcon: (TYPE_META[type] || {}).icon || '📄',
      mood: 'affinity', hookType: '周备池', hook: HOOK_BY_TYPE[type] || '',
      isWeeklyNew: !!isNew, poolLevel: 'week',
      compliance: { status: 'passed', autoFixed: 0, blocked: false },
      variants: variants
    };
  }

  /** weeklyNew 的 t1/t2/t4 → 内容类型 */
  var TIER_TYPE = { t1: 'decision', t2: 'scene', t4: 'local' };

  function buildWeekPool() {
    var out = [], seen = {}, i, t, list;
    function push(topic, type, isNew) {
      if (!topic || seen[topic]) return;
      seen[topic] = 1;
      out.push(makeSeed(topic, type, isNew, out.length));
    }
    // 本周新增优先（🆕 角标来源）
    var wn = root.___weeklyNew || {};
    for (t in TIER_TYPE) {
      list = wn[t] || [];
      for (i = 0; i < list.length; i++) push(list[i], TIER_TYPE[t], true);
    }
    // 常规选题池补足（decision/scene/review/local）
    var tp = root.___topicPool || {};
    ['decision', 'scene', 'review', 'local'].forEach(function (type) {
      var arr = tp[type] || [];
      for (var k = 0; k < Math.min(10, arr.length); k++) push(arr[k], type, false);
    });
    // 热点跟拍
    var hs = root.___hotspotData || [];
    for (i = 0; i < Math.min(6, hs.length); i++) if (hs[i] && hs[i].title) push(hs[i].title, 'hotspot', false);

    return out.length ? out : null;
  }

  // ==================== ③ 本地缓存（7 天） ====================
  function cacheWrite(level, scripts) {
    if (!scripts || !scripts.length) return;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        savedAt: Date.now(), fromLevel: level, scripts: scripts.slice(0, 20)
      }));
    } catch (e) {}
  }

  function cacheRead(now) {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.scripts || !o.scripts.length) return null;
      if ((now || Date.now()) - (o.savedAt || 0) > CACHE_MAX_AGE_MS) return null;
      return o.scripts;
    } catch (e) { return null; }
  }

  function cacheClear() { try { localStorage.removeItem(CACHE_KEY); } catch (e) {} }

  // ==================== 四级解析主入口 ====================
  /**
   * @param {object} ctx { operatorId, isoWeek, now }
   * @returns {{level:string, scripts:Array, label:string}}
   */
  function resolveToday(ctx) {
    ctx = ctx || {};
    var forced = forcedEmpty();
    var now = ctx.now || Date.now();
    var res = null, level = 'empty';

    if (!forced.day) { res = loadDayPool(); if (res) level = 'day'; }
    if (!res && !forced.week) { res = buildWeekPool(); if (res) level = 'week'; }
    if (!res && !forced.cache) { res = cacheRead(now); if (res) level = 'cache'; }
    if (!res) { level = 'empty'; res = []; }

    // 命中日/周池 → 顺手写本地缓存，供下次断网兜底
    if (level === 'day' || level === 'week') cacheWrite(level, res);

    if (T) T.track('seed_fallback', { level: level, store: ctx.operatorId || null, week: ctx.isoWeek || null });

    return {
      level: level,
      scripts: res,
      label: { day: '日预热池', week: '周备池', cache: '本地缓存', empty: '暂无今日推荐' }[level]
    };
  }

  // ==================== persona-scripts 按需增强 ====================
  var personaLoading = false, personaLoaded = false, personaWaiters = [];

  function personaReady() {
    return !!(root.___t1ScriptFullByPersona || root.___t2ScriptFullByPersona || root.___t4ScriptFullByPersona);
  }

  /** 懒加载 227KB 的 6 人设完整口播稿；失败静默降级为模板稿 */
  function ensurePersonaScripts(cb) {
    if (personaReady()) { personaLoaded = true; cb && cb(true); return; }
    if (cb) personaWaiters.push(cb);
    if (personaLoading) return;
    personaLoading = true;
    var s = document.createElement('script');
    s.src = 'data/persona-scripts.js';
    s.async = true;
    s.onload = function () { personaLoaded = true; personaLoading = false; flushWaiters(true); };
    s.onerror = function () { personaLoading = false; flushWaiters(false); };
    document.head.appendChild(s);
  }

  function flushWaiters(ok) {
    var ws = personaWaiters.slice(); personaWaiters = [];
    ws.forEach(function (w) { try { w(ok); } catch (e) {} });
  }

  /**
   * 取该选题在当前语气下的完整口播稿（6 人设 → 3 语气折叠，只暴露 mood）
   * @returns {{script:string, _persona:string}|null}
   */
  function fullScriptFor(topic, mood, operatorId, isoWeek) {
    var packs = [root.___t1ScriptFullByPersona, root.___t2ScriptFullByPersona, root.___t4ScriptFullByPersona];
    var candidates = [];
    for (var i = 0; i < packs.length; i++) {
      var p = packs[i]; if (!p || !p[topic]) continue;
      var byPersona = p[topic];
      for (var persona in byPersona) {
        if (C.moodOfPersona(persona) !== mood) continue;
        var text = byPersona[persona];
        if (!text || C.scanStance(text).length) continue;   // 存量 2.x 文本入前端前必须过红线扫描
        candidates.push({ script: text, _persona: persona });
      }
      if (candidates.length) break;
    }
    if (!candidates.length) return null;
    // 确定性钉选：同人同选题同周恒定同一嗓音
    var idx = C.pinnedIndex(operatorId || 'default', topic + '|full', isoWeek || '', candidates.length);
    return candidates[idx];
  }

  root.V3Pool = {
    resolveToday: resolveToday,
    loadDayPool: loadDayPool,
    buildWeekPool: buildWeekPool,
    cacheRead: cacheRead,
    cacheWrite: cacheWrite,
    cacheClear: cacheClear,
    forcedEmpty: forcedEmpty,
    ensurePersonaScripts: ensurePersonaScripts,
    personaReady: personaReady,
    fullScriptFor: fullScriptFor,
    TYPE_META: TYPE_META,
    CACHE_KEY: CACHE_KEY
  };
})(typeof self !== 'undefined' ? self : this);
