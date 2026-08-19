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
  // N-5：语气模板取自共享常量 personas.js（TONE 不再本地硬编码）
  var PERSONAS = root.V3Personas || (typeof require === 'function' ? require('./personas') : {});
  var TONE = (PERSONAS && PERSONAS.TONE) || {};
  if (!TONE || !TONE.affinity) {
    console.warn('[pool] V3Personas.TONE 未加载，周备池模板拼装将失败（请确认 personas.js 在 pool.js 之前加载）');
  }
  // N-3：合规规则（档位合法表述识别，中文「兆」= 合规变体，见 config/compliance-rules.json）
  var RULES = (typeof require === 'function')
    ? (function () { try { return require('./compliance-rules'); } catch (e) { return null; } })()
    : (root.___COMPLIANCE_RULES || null);
  var VALID_TIER_RE = (RULES && RULES.tiers && RULES.tiers.validMentions)
    ? new RegExp('(' + RULES.tiers.validMentions.join('|') + ')')
    : /(300M|300兆|500M|500兆|1000M|1000兆|千兆|FTTR|融合套餐)/;
  var CACHE_KEY = 'sxdy_v3_pool_cache';
  var CACHE_MAX_AGE_MS = 7 * 24 * 3600 * 1000;

  var TYPE_META = {
    decision: { name: '决策指南', icon: '📊' },
    scene:    { name: '一线场景', icon: '🎬' },
    review:   { name: '深度测评', icon: '🔍' },
    local:    { name: '本地事件', icon: '📍' },
    hotspot:  { name: '热点跟拍', icon: '🔥' }
  };

  var HOOK_BY_TYPE = {
    decision: '选之前先搞清这一条', scene: '真实发生在营业厅的一件小事',
    review: '实测数据摆出来看', local: '[city]本地才有的这个安排', hotspot: '今天这个热点，营业厅能接'
  };

  // ==================== P-1 插槽事实替换（[city]/[store] → 营业厅实际信息） ====================
  var SHANXI_CITIES = ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'];

  /** 从营业厅名称推导城市（山西 11 地市首匹配），无匹配返回 '' */
  function cityOf(storeName) {
    if (!storeName) return '';
    for (var i = 0; i < SHANXI_CITIES.length; i++) {
      if (storeName.indexOf(SHANXI_CITIES[i]) >= 0) return SHANXI_CITIES[i];
    }
    return '';
  }

  /**
   * 把文本中的 [city]/[store]（及 {{city}}/{{store}}）占位符替换为营业厅实际信息。
   * 纯函数：ctx = { city?, storeName?|operatorId? }；缺失时用中性词兜底（本店/本地），不崩溃。
   */
  function applySlots(text, ctx) {
    if (!text || typeof text !== 'string') return text;
    ctx = ctx || {};
    var store = ctx.storeName || ctx.operatorId || '';
    var city = ctx.city || cityOf(store);
    return String(text)
      .replace(/\[store\]|\{\{store\}\}/g, store || '本店')
      .replace(/\[city\]|\{\{city\}\}/g, city || '本地');
  }

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
    // 3.0 三级池：日预热池(___dayPool，每日热点×3语气) → 周备池(___v3SeedPool) → fallback v2.x dailyScripts
    var d = root.___dayPool || root.___v3SeedPool || root.___dailyScripts;
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

  // ==================== 质量门禁下沉（G-3.0a/c · 与 3.0 构建门禁 checkScriptQuality 对齐） ====================
  // 硬门禁 = 完整口播稿(isFullScript) + 广告法(detectAdWords) + 立场红线(scanStance) + 山西电信在售档位。
  // 说明：不复用 2.x 前端 auditScript 作硬门禁——其 retention/cta 为软互动评分，实测会误伤 60-70% 已达标稿
  //       （seed-pool 在字数/beats/档位/红线全 100% 达标，却被 auditScript 卡掉 60-70%）。故门禁对齐 SCF
  //       构建门禁 checkScriptQuality.cjs 口径（beats/字数/红线/档位），并补广告法一维（构建门禁漏检项）。
  function gateText(text, topic) {
    var reasons = [];
    if (typeof root.isFullScript === 'function' && !root.isFullScript(text)) {
      reasons.push('非完整口播稿（字数/五段式结构不足）');
    }
    if (typeof root.detectAdWords === 'function') {
      var ad = root.detectAdWords(text || '');
      if (ad.length) reasons.push('广告法违禁词：' + ad.join('、'));
    }
    if (root.V3Core && typeof root.V3Core.scanStance === 'function') {
      var st = root.V3Core.scanStance(text || '');
      if (st.length) reasons.push('立场红线：' + st.join('、'));
    }
    // 档位检查：仅宽带语境强制（话费/手机/其他选题不误伤）；核心红线仍是"禁 100M/100兆"（BAD_TIER 见 compliance-rules）
    // v2.9.74 口径修正（根因：原 TIER_CONTEXT_RE 含 5G/路由器 等非宽带词 + 纯文本级触发 → 话费稿误伤）：
    //   ① 删 5G（文本中多为"5G流量/5G手机网络"，非宽带语境）；
    //   ② 选题级判断为主（对齐 2.x core.js isBroadband 语义）：宽带类选题强制档位，话费/手机类选题不强制；
    //   ③ 中性选题以文本明确宽带产品词（宽带/千兆/FTTR/Mbps/光猫/网速）为辅触发。
    var t = topic || '';
    var isBroadbandTopic = /宽带|兆|网速|路由|WiFi|wifi|光猫|网线|mesh|Mbps|千兆|FTTR/i.test(t);
    var isPhoneTopic = /手机卡|副卡|号卡|流量卡|电话卡|套餐|资费|月租|话费|手机|5G/i.test(t);
    var TIER_TEXT_RE = /(宽带|千兆|FTTR|Mbps|光猫|网速)/i;
    var needTier = isBroadbandTopic || (!isPhoneTopic && TIER_TEXT_RE.test(text || ''));
    if (needTier && !VALID_TIER_RE.test(text || '')) {
      reasons.push('缺山西电信在售档位(300/500/1000/FTTR)');
    }
    return { ok: reasons.length === 0, reasons: reasons };
  }

  function makeSeed(topic, type, isNew, idx) {
    var seedId = 's_w_' + type + '_' + C.stableHash(topic).toString(36);
    var variants = {};
    var moods = C.MOODS;
    var anyOk = false;
    for (var m = 0; m < moods.length; m++) {
      var mood = moods[m], arr = [], tpl = TONE[mood] || [];
      for (var i = 0; i < tpl.length; i++) {
        var text = tpl[i].f(topic, pointOf(topic));
        if (C.scanStance(text).length) continue;          // 合规最后一道闸：命中红线直接不入池
        var g = gateText(text, topic);                       // 质量门禁下沉：与 2.x auditScript 同标准
        if (g.ok) anyOk = true;
        arr.push({ _vid: mood.charAt(0) + (i + 1), _persona: tpl[i].p, bgm: ['温馨轻快', '沉稳专业', '动感'][m],
                   title: topic, script: text, tags: [ (TYPE_META[type] || {}).name || type ],
                   draft: !g.ok, quality: g });
      }
      variants[mood] = arr;
    }
    return {
      seedId: seedId, topic: topic, type: type,
      typeName: (TYPE_META[type] || {}).name || '脚本',
      typeIcon: (TYPE_META[type] || {}).icon || '📄',
      mood: 'affinity', hookType: '周备池', hook: HOOK_BY_TYPE[type] || '',
      isWeeklyNew: !!isNew, poolLevel: 'week',
      draft: !anyOk,                                       // 三条语气变体全未达门禁 → 整卡标草稿态
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

    // P-1 插槽事实替换：把 [city]/[store] 占位符替换为营业厅实际信息（写死"太原"的模板稿经 TONE 占位符后在此落位）
    if (res && res.length) {
      for (var i = 0; i < res.length; i++) {
        var s = res[i];
        if (!s || !s.variants) continue;
        for (var md in s.variants) {
          var arr = s.variants[md];
          if (!arr) continue;
          for (var j = 0; j < arr.length; j++) {
            if (arr[j] && arr[j].script) arr[j].script = applySlots(arr[j].script, ctx);
          }
        }
      }
    }

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
        var g = gateText(text, topic);                       // 质量门禁下沉：未过 audit 的人设稿不入前端
        if (!g.ok) continue;
        candidates.push({ script: text, _persona: persona });
      }
      if (candidates.length) break;
    }
    if (!candidates.length) return null;
    // 确定性钉选：同人同选题同周恒定同一嗓音
    var idx = C.pinnedIndex(operatorId || 'default', topic + '|full', isoWeek || '', candidates.length);
    var picked = candidates[idx];
    // P-1：人设真稿同样做插槽事实替换
    picked.script = applySlots(picked.script, { operatorId: operatorId });
    return picked;
  }

  root.V3Pool = {
    resolveToday: resolveToday,
    loadDayPool: loadDayPool,
    buildWeekPool: buildWeekPool,
    cacheRead: cacheRead,
    cacheWrite: cacheWrite,
    cacheClear: cacheClear,
    forcedEmpty: forcedEmpty,
    applySlots: applySlots,
    cityOf: cityOf,
    ensurePersonaScripts: ensurePersonaScripts,
    personaReady: personaReady,
    fullScriptFor: fullScriptFor,
    gateText: gateText,
    TYPE_META: TYPE_META,
    CACHE_KEY: CACHE_KEY,
    // G2 偏好向量：localStorage 使用信号 → 权重（无事件=全 1 不歪，冷启动安全；core3.prefVectorFrom）
    prefVector: function () {
      return C.prefVectorFrom(T && T.allEvents ? T.allEvents() : []);
    },
    // G3 季节配比：当前季节 → 内容配比 → n 天排期（core3 纯函数 seasonOf/ratio/allocateSlots，确定性）
    seasonPlan: function (n) {
      var s = C.seasonOf(new Date());
      var r = C.ratio(s.tag, null);
      return { tag: s.tag, label: s.label, ratios: r, slots: C.allocateSlots(r, n || 5) };
    }
  };
})(typeof self !== 'undefined' ? self : this);
