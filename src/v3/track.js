/**
 * 抖本内容工坊 3.0 · 信号埋点（§7.6.3 最小信号集）
 *
 * 5 事件：seed_view / seed_copy / seed_skip / seed_share / seed_fallback
 * 维度铁律：一律带 mood（用户可见 3 语气），**禁止**带 _persona（生成端嗓音库）。
 *
 * 落地姿态（§7.5.2 修正②第 4 条「信号采集先于权重演进」）：
 *  · 默认只做本地采集（内存 + localStorage ring buffer），不改线上推荐行为；
 *  · 远端上报挂 feature-flag（默认 OFF），开启后走现有 SCF 端点，keepalive 不阻塞交互；
 *  · 上报失败静默降级，绝不把埋点故障暴露成用户可见错误（控制台 0 error 是发布铁律）。
 */
(function (root) {
  'use strict';

  var STORE_KEY = 'sxdy_v3_events';
  var FLAG_KEY = 'sxdy_v3_flags';
  var MAX_EVENTS = 300;           // ring buffer 上限，防止 localStorage 膨胀
  var VALID = { seed_view: 1, seed_copy: 1, seed_skip: 1, seed_share: 1, seed_fallback: 1 };

  var DEFAULT_FLAGS = {
    trackRemote: false,       // 远端上报（默认关：先采集，后演进）
    signalRatio: false,       // 用使用信号影响配比（默认关：确定性兜底常驻）
    prefRouting: true,        // 偏好向量路由（确定性 PRNG 兜底，可回归，默认开）
    weeklyBadge: true         // 本周新增角标
  };

  var SCF_ENDPOINT = 'https://1253338744-66eug9kqc7.ap-guangzhou.tencentscf.com';

  function readFlags() {
    var f = {}, k;
    for (k in DEFAULT_FLAGS) f[k] = DEFAULT_FLAGS[k];
    try {
      var raw = localStorage.getItem(FLAG_KEY);
      if (raw) { var o = JSON.parse(raw); for (k in o) if (k in f) f[k] = !!o[k]; }
    } catch (e) {}
    // URL 覆盖：?flag=trackRemote:1,signalRatio:1 —— 便于灰度与 E2E 分支覆盖
    try {
      var q = new URLSearchParams(location.search).get('flag');
      if (q) q.split(',').forEach(function (pair) {
        var kv = pair.split(':');
        if (kv[0] && kv[0] in f) f[kv[0]] = (kv[1] !== '0' && kv[1] !== 'false');
      });
    } catch (e) {}
    return f;
  }

  var flags = readFlags();

  function setFlag(name, val) {
    if (!(name in DEFAULT_FLAGS)) return false;
    flags[name] = !!val;
    try { localStorage.setItem(FLAG_KEY, JSON.stringify(flags)); } catch (e) {}
    return true;
  }

  function loadEvents() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Object.prototype.toString.call(arr) === '[object Array]' ? arr : [];
    } catch (e) { return []; }
  }

  function saveEvents(arr) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(arr.slice(-MAX_EVENTS))); } catch (e) {}
  }

  // 内存镜像（E2E 直接断言 window.__seedEvents，无需读 storage）
  root.__seedEvents = root.__seedEvents || [];

  var viewedOnce = {}; // seed_view 去重：同一 seedId+mood 每次会话只报一次曝光

  /**
   * @param {string} ev      5 事件之一
   * @param {object} payload { seedId, type, mood, level, channel, vid }
   */
  function track(ev, payload) {
    if (!VALID[ev]) return null;
    payload = payload || {};
    var rec = {
      ev: ev,
      seedId: payload.seedId || null,
      type: payload.type || null,
      mood: payload.mood || null,          // 只记 mood，绝不记 _persona
      vid: payload.vid == null ? null : payload.vid,
      level: payload.level || null,        // 仅 seed_fallback
      channel: payload.channel || null,    // 仅 seed_share
      store: payload.store || null,
      week: payload.week || null,
      t: Date.now()
    };
    if (ev === 'seed_view') {
      var key = rec.seedId + '|' + rec.mood;
      if (viewedOnce[key]) return null;
      viewedOnce[key] = 1;
    }
    root.__seedEvents.push(rec);
    var all = loadEvents(); all.push(rec); saveEvents(all);
    if (flags.trackRemote) sendRemote(rec);
    return rec;
  }

  function sendRemote(rec) {
    try {
      var body = JSON.stringify({ mode: 'signal', event: rec });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(SCF_ENDPOINT, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(SCF_ENDPOINT, { method: 'POST', body: body, keepalive: true, headers: { 'Content-Type': 'application/json' } })
          .catch(function () {});
      }
    } catch (e) { /* 埋点故障静默降级 */ }
  }

  /** 供偏好向量/信号配比消费：内存 + 持久化合并去重 */
  function allEvents() {
    var persisted = loadEvents();
    var mem = root.__seedEvents || [];
    if (persisted.length >= mem.length) return persisted;
    return persisted.concat(mem.slice(persisted.length));
  }

  function clearEvents() {
    viewedOnce = {};
    root.__seedEvents = [];
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  }

  function summary() {
    var s = {}, all = allEvents();
    for (var i = 0; i < all.length; i++) s[all[i].ev] = (s[all[i].ev] || 0) + 1;
    return s;
  }

  root.V3Track = {
    track: track,
    allEvents: allEvents,
    clearEvents: clearEvents,
    summary: summary,
    flags: flags,
    setFlag: setFlag,
    ENDPOINT: SCF_ENDPOINT,
    EVENTS: Object.keys(VALID)
  };
})(typeof self !== 'undefined' ? self : this);
