// src/hotspot.js — 热点跟拍中心（2.x 功能完整移植 → 3.0 hot tab，v2.9.75）
// 数据链路：静态兜底 ___hotspotData → localStorage 缓存(1天) → SCF hotspot-cache 共享 → SCF hotspot-fetch 实时生成
// 功能：卡片渲染/展开/难度·lane 过滤/收藏选题库(与2.x共享 myHotspotLib)/复制全文/看原版/手动+自动刷新/骨架屏/空态
// 说明：依赖 index.html 内联的 esc()/showToast()/copyToClipboard()；自身自包含 PERSONALIZE_API/AI_MODEL/toAsciiJson/genHotspotComment
(function () {
  'use strict';
  var PERSONALIZE_API = 'https://1253338744-6kei9ayy45.ap-guangzhou.tencentscf.com';
  var AI_MODEL = 'MiniMax-M2.7';

  function toAsciiJson(obj) {
    return JSON.stringify(obj).replace(/[\u007f-\uffff]/g, function (c) {
      return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });
  }

  // ── 数据：静态兜底 + 本地缓存（与 2.x 同 key 同版本，跨站点共享）──
  var HS_CACHE_KEY = 'hsCacheV4';
  var HS_CACHE_VERSION = 2;
  var HS_REFRESH_MS = 24 * 3600 * 1000;
  var MY_LIB_KEY = 'myHotspotLib'; // 与 2.x 选题库共享
  var _hsAutoStarted = false;

  function getHotspotData() {
    try { return padHotspotData(window.___hotspotData || []); } catch (e) { return []; }
  }
  function padHotspotData(data) {
    if (!Array.isArray(data)) data = [];
    data = data.map(function (h) { if (!h.lane) h.lane = 'hot'; return h; });
    if (data.length >= 7) return data;
    var fallbacks = [
      { id: '_pad_1', lane: 'hot', tier: 3, title: '你的宽带每月花多少钱？全网比价挑战', heat: '全网热门', why: '宽带资费是全民痛点，对比三家运营商套餐性价比。', source: 'https://www.douyin.com/search/宽带比价', steps: [{ shot: '展示本月宽带账单', sub: '特写账单金额，露出惊讶表情', duration: '3秒' }, { shot: '对比三家同档位套餐', sub: '用表格展示电信vs联通vs移动', duration: '5秒' }, { shot: '实测速度+稳定性', sub: '同时开视频/游戏/下载测试', duration: '5秒' }, { shot: '算出结论推荐最优选', sub: '最终推荐电信套餐，扫码可办', duration: '4秒' }], voice: ['很多朋友问我，家里宽带一个月到底花多少钱才不算亏。', '我拿了三大运营商同档位的套餐一比，月租、网速、赠品全写在屏幕上。', '最后测了个速，电信这个下载和稳定性，确实更适合家里设备多的。', '想知道自己家适合哪档，直接到店，我帮你算最省的方案。'], bgm: '为爱痴狂 - 金志文', tags: '#宽带比价 #省钱攻略 #电信宽带', difficulty: 1, needFace: true, time: '8分钟' },
      { id: '_pad_2', lane: 'hot', tier: 3, title: '手机信号大比拼：电梯+地库+山区三场景实测', heat: '全网热门', why: '信号痛点场景最能打动人，真实测试有说服力。', source: 'https://www.douyin.com/search/手机信号测试', steps: [{ shot: '进电梯看信号格变化', sub: '电信vs友商，谁先掉信号', duration: '4秒' }, { shot: '地下车库测网速', sub: 'Speedtest实测数值对比', duration: '5秒' }, { shot: '郊区边缘地带测试', sub: '信号盲区谁还能打电话', duration: '5秒' }, { shot: '总结+营业厅信息', sub: '电信综合覆盖最优，到店可办', duration: '4秒' }], voice: ['大家总说信号到电梯里就没了，今天我拿两台手机实测一下。', '电梯、地库、郊区三个场景，谁先有信号、谁的网速更快，数据会说话。', '测完发现电信在弱信号环境下确实稳，打电话刷视频都没问题。', '如果你也常被信号困扰，可以到店测测你常用地方的覆盖情况。'], bgm: '悬溺 - 葛东琪', tags: '#信号测试 #5G #电梯挑战', difficulty: 1, needFace: true, time: '10分钟' },
      { id: '_pad_3', lane: 'search', tier: 3, title: '家里WiFi总卡顿？先查这3个设置', heat: '高搜索意图', why: '搜索截流词直接对应用户问题，内容精准度高。', source: 'https://www.douyin.com/search/家里WiFi总卡顿', steps: [{ shot: '用户吐槽家里WiFi卡', sub: '抛出共情问题', duration: '3秒' }, { shot: '检查路由器位置/信道/设备数量', sub: '三个排查动作', duration: '6秒' }, { shot: '给出提速方案', sub: '推荐电信全屋WiFi/FTTR', duration: '5秒' }, { shot: '引导到店测速', sub: '免费测速，到店有礼', duration: '4秒' }], voice: ['家里WiFi卡，别急着换路由器，先检查这三个设置。', '第一看路由器放哪儿了，第二看连了多少设备，第三看用的是不是拥挤的信道。', '如果家里房间多、墙厚，电信全屋WiFi或者FTTR能根本解决。', '不确定怎么弄，带手机来厅里，我帮你免费测速、现场看问题。'], bgm: '小美满 - 周深', tags: '#WiFi卡顿 #全屋WiFi #电信宽带', difficulty: 1, needFace: true, time: '8分钟' }
    ];
    var padded = data.slice();
    var nextId = data.length + 1;
    for (var i = 0; i < fallbacks.length && padded.length < 7; i++) {
      var fb = fallbacks[i];
      fb.id = 'h' + nextId++;
      padded.push(fb);
    }
    return padded;
  }

  function persistHotspotCache(scripts) {
    try { localStorage.setItem(HS_CACHE_KEY, JSON.stringify({ ts: Date.now(), v: HS_CACHE_VERSION, scripts: scripts })); } catch (e) {}
  }
  function loadHotspotCache() {
    try {
      var cache = JSON.parse(localStorage.getItem(HS_CACHE_KEY) || 'null');
      if (!cache || cache.v !== HS_CACHE_VERSION) return null;
      return cache;
    } catch (e) { return null; }
  }
  function persistHotspotBgmCache(list) {
    try { localStorage.setItem('hsBgmCacheV4', JSON.stringify({ ts: Date.now(), list: list || [] })); } catch (e) {}
  }

  // ── 渲染：2.x renderHotspots 完整版（tier/heat/why/steps/voice/footer/看原版/收藏/评论引导）──
  var hotspotFilter = 'all';
  var hotspotLane = '';
  var SKELETON_CARDS = (function () {
    var s = '';
    for (var i = 0; i < 3; i++) {
      s += '<div class="hotspot-card skeleton-card"><div class="hs-header"><div style="flex:1;min-width:0;"><div class="sk sk-title"></div><div class="sk sk-meta"></div></div></div></div>';
    }
    return s;
  })();

  function genHotspotComment(h) {
    var title = h.title || '';
    if (/挑战|舞|跳舞|跟拍|翻拍/i.test(title)) return '拍完的兄弟评论区交作业！我看看谁跳得最魔性 👇';
    if (/世界杯|看球|比赛|进球|亚马尔|马宁/i.test(title)) return '你押谁赢？评论区留下你的预测，赛后回来挖坟 ⚽';
    if (/手机|nova|荣耀|iPhone|换机|购机/i.test(title)) return '正在用的什么手机？评论区晒型号，我帮你看看值不值得换 📱';
    if (/宽带|网速|WiFi|套餐|FTTR|光纤/i.test(title)) return '你家宽带多少兆？一个月多少钱？评论区告诉我，我帮你看划不划算 🏠';
    if (/福利|优惠|限时|免费|送|特惠|618|双11/i.test(title)) return '这波福利你赶上了吗？评论区扣1，我告诉你还能不能领 🎁';
    if (/AI|科技|揭秘|辟谣|实测|真相/i.test(title)) return '你之前听过这个说法吗？评论区说说，我看看多少人被骗了 🤔';
    if (/父亲|端午|节日|中秋|过年|春节/i.test(title)) return '这个节日你怎么过的？评论区晒晒，点赞最高的送小礼物 🎊';
    var snippet = esc(title.slice(0, 25));
    return snippet + '... 你们遇到过吗？评论区聊聊 👇';
  }

  function renderHotspots() {
    var grid = document.getElementById('hotspotGrid');
    if (!grid) return;
    var tiers = ['', '专业翻拍', '行业套用', '纯跟拍'];
    var tierClasses = ['', 'tier-1', 'tier-2', 'tier-3'];
    var laneLabels = { hot: '🔥 热门话题' };
    var laneColors = { hot: 'background:#FFEBEE;color:#C62828;' };
    window.__hotIdMap = window.__hotIdMap || {};
    window.__kitMap = window.__kitMap || {};
    var html = '';
    getHotspotData().forEach(function (h) {
      // v2.9.79: 仅保留纯热点（去掉搜索截流/form/music）
      if (h.lane && h.lane !== 'hot') return;
      var safeId = 'hs_' + String(h.id || '').replace(/[^A-Za-z0-9_-]/g, '_');
      window.__hotIdMap[safeId] = h.id;
      if (hotspotFilter === 'tier1' && h.tier !== 1) return;
      if (hotspotFilter === 'tier2' && h.tier !== 2) return;
      if (hotspotFilter === 'tier3' && h.tier !== 3) return;
      if (hotspotFilter === 'easy' && h.difficulty > 1) return;
      var laneTag = h.lane && laneLabels[h.lane] ? '<span class="hs-tag" style="' + (laneColors[h.lane] || '') + 'font-weight:600;">' + laneLabels[h.lane] + '</span>' : '';
      var formTag = h.form ? '<span class="hs-tag" style="background:#F3E5F5;color:#6A1B9A;">🎬 ' + esc(h.form) + '</span>' : '';
      var srcUrl = h.sourceUrl || h.source || '';
      var platform = h.platform || '抖音';
      // 蹭热点三件套：原热点标题 / 话题标签 / BGM（照抄去发视频）
      var kitWord = h.sourceWord || h.source || h.title || '';
      var kitTags = h.tags || ('#' + String(kitWord || '').replace(/[，#\s]/g, '').slice(0, 12));
      var kitBgm = h.bgm || '—';
      window.__kitMap[safeId + '_w'] = kitWord;
      window.__kitMap[safeId + '_t'] = kitTags;
      window.__kitMap[safeId + '_b'] = kitBgm;
      var platTag = srcUrl
        ? '<a class="hs-plat" href="' + esc(srcUrl) + '" target="_blank" rel="noopener" aria-label="跳转到' + esc(platform) + '热点原文">📱 ' + esc(platform) + ' ↗</a>'
        : '<span class="hs-plat">📱 ' + esc(platform) + '</span>';
      var kitHtml = '<div class="hs-kit">' +
        '<div class="hs-kit-title">🔥 蹭热点三件套（发视频直接照抄）</div>' +
        '<div class="hs-kit-row"><span class="hk-l">① 原热点标题</span><span class="hk-v">' + esc(kitWord) + '</span><button class="hk-btn" onclick="copyKit(\'' + safeId + '_w\')">📋 复制</button></div>' +
        '<div class="hs-kit-row"><span class="hk-l">② 话题标签</span><span class="hk-v">' + esc(kitTags) + '</span><button class="hk-btn" onclick="copyKit(\'' + safeId + '_t\')">📋 复制</button></div>' +
        '<div class="hs-kit-row"><span class="hk-l">③ BGM</span><span class="hk-v">' + esc(kitBgm) + '</span><button class="hk-btn" onclick="copyKit(\'' + safeId + '_b\')">📋 复制</button></div>' +
      '</div>';
      html += '<div class="hotspot-card" id="hsc-' + esc(h.id) + '">' +
        '<div class="hs-header" tabindex="0" role="button" aria-label="展开' + esc(h.title) + '脚本" onclick="toggleHotspot(\'' + esc(h.id) + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();this.onclick()}">' +
          '<span class="hs-tier ' + tierClasses[h.tier] + '">' + '🥇🥈🥉'.charAt((h.tier || 3) - 1) + ' ' + tiers[h.tier || 3] + '</span>' +
          '<div style="flex:1;min-width:0;">' +
            '<div class="hs-title">' + esc(h.title) + '</div>' +
            '<div class="hs-meta">' + platTag + ' · 🔥 ' + esc(h.heat || '') + ' · ⏱ ' + esc(h.time || '—') + ' · ' + '★'.repeat(h.difficulty || 0) + '☆ · ' + (h.needFace ? '需出镜' : '免露脸') + '</div>' +
          '</div>' +
          '<span style="color:#6B7280;font-size:12px;white-space:nowrap;">展开 ▼</span>' +
        '</div>' +
        '<div class="hs-body">' +
          kitHtml +
          '<div style="font-size:12px;color:var(--orange);margin-bottom:12px;background:#FFF8E1;padding:8px 10px;border-radius:6px;">💡 ' + esc(h.why || '') + '</div>' +
          (h.steps || []).map(function (s, i) {
            return '<div class="hs-step">' +
              '<div class="hs-step-num">第' + (i + 1) + '步' + (s.duration ? ' · ' + esc(s.duration) : '') + '</div>' +
              '<div class="hs-step-shot">🎬 ' + esc(s.shot || '') + '</div>' +
              (s.sub ? '<div class="hs-step-sub">' + esc(s.sub) + '</div>' : '') +
              (h.voice && h.voice[i] ? '<div class="hs-step-voice">🎤 ' + esc(h.voice[i]) + '</div>' : '') +
            '</div>';
          }).join('') +
          (h.formTip ? '<div style="margin-top:10px;padding:8px 10px;background:#E8F5E9;border-radius:6px;font-size:12px;color:#2E7D32;"><strong>🎬 形式怎么拍：</strong>' + esc(h.formTip) + '</div>' : '') +
          (h.tip ? '<div style="margin-top:8px;padding:8px 10px;background:#FFF3E0;border-radius:6px;font-size:12px;color:#C2410C;"><strong>💡 拍摄提示：</strong>' + esc(h.tip) + '</div>' : '') +
          '<div class="hs-footer">' +
            laneTag + formTag +
            '<span class="hs-tag">🎵 ' + esc(h.bgm || '—') + '</span>' +
            (srcUrl ? '<a href="' + esc(srcUrl) + '" target="_blank" rel="noopener" class="hs-tag" style="background:#E3F2FD;color:#1565C0;text-decoration:none;font-weight:600;">📺 看原版 →</a>' : '<span class="hs-tag" style="background:#FFF3E0;color:#C2410C;">📺 抖音搜同名话题</span>') +
            '<button id="favbtn-' + safeId + '" class="hs-tag" style="cursor:pointer;background:#FFF8E1;color:#C2410C;border:none;font:inherit;font-weight:600;margin-left:auto;" onclick="saveToMyLibrary(\'' + safeId + '\')">⭐ 收进选题库</button>' +
          '</div>' +
          (h.tags ? '<div style="margin-top:8px;font-size:12px;color:#55606e;">🏷 ' + esc(h.tags) + '</div>' : '') +
          '<div style="margin-top:10px;padding:10px;background:#FFF8E1;border-radius:6px;font-size:12px;color:#C2410C;"><strong>💬 评论引导：</strong>' + genHotspotComment(h) + '</div>' +
        '</div>' +
      '</div>';
    });
    if (html === '') {
      if (window.___hotspotLoading) {
        html = SKELETON_CARDS;
      } else {
        html = '<div class="card" style="text-align:center;padding:40px;color:#6B7280;">没有匹配的热点内容，试试切换过滤条件</div>';
      }
    }
    grid.innerHTML = html;
    var ut = document.getElementById('hotspotUpdateTime');
    if (ut) ut.textContent = '· 更新：' + new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
    updateHomeHotspotCounts();
  }

  function toggleHotspot(id) {
    var card = document.getElementById('hsc-' + id);
    if (card) card.classList.toggle('open');
  }

  function filterHotspot(mode, el) {
    hotspotFilter = mode;
    var sel = document.getElementById('hsDifficulty');
    if (sel && sel.value !== mode) sel.value = mode;
    renderHotspots();
  }
  function filterHotspotLane(lane, el) {
    hotspotLane = lane;
    document.querySelectorAll('#page-hot .lane-filter').forEach(function (b) { b.classList.remove('active'); });
    if (el) el.classList.add('active');
    renderHotspots();
  }

  // ── 收藏选题库（与 2.x 共享 myHotspotLib）──
  window.__myLibIdMap = window.__myLibIdMap || {};
  function loadMyLibrary() {
    try { return JSON.parse(localStorage.getItem(MY_LIB_KEY) || '[]') || []; } catch (e) { return []; }
  }
  function updateLibBadge() {
    var b = document.getElementById('libCountBadge');
    if (!b) return;
    var n = loadMyLibrary().length;
    b.textContent = n > 0 ? '(' + n + ')' : '';
  }
  function saveToMyLibrary(safeId) {
    var realId = window.__hotIdMap[safeId] || safeId;
    var all = getHotspotData();
    var item = null;
    for (var i = 0; i < all.length; i++) { if (all[i].id === realId) { item = all[i]; break; } }
    if (!item) { showToast('未找到该脚本', 'error'); return; }
    var lib = loadMyLibrary();
    if (lib.some(function (x) { return x.id === realId; })) { showToast('已在选题库'); return; }
    lib.unshift(Object.assign({}, item, { savedAt: Date.now() }));
    try { localStorage.setItem(MY_LIB_KEY, JSON.stringify(lib)); } catch (e) {}
    updateLibBadge();
    var btn = document.getElementById('favbtn-' + safeId);
    if (btn) { btn.outerHTML = '<span class="hs-tag" style="background:#E8F5E9;color:#2E7D32;">✓ 已收藏</span>'; }
    showToast('⭐ 已收进选题库');
  }
  function removeFromMyLibrary(safeId) {
    var realId = window.__myLibIdMap[safeId] || safeId;
    var lib = loadMyLibrary().filter(function (x) { return x.id !== realId; });
    try { localStorage.setItem(MY_LIB_KEY, JSON.stringify(lib)); } catch (e) {}
    renderMyLibrary();
    showToast('已移出选题库');
  }
  function genMyLibText(h) {
    var steps = (h.steps || []).map(function (s, i) {
      var dur = s.duration ? '（' + s.duration + '）' : '';
      var voice = h.voice && h.voice[i] ? '\n口播：' + h.voice[i] : '';
      return (i + 1) + '. ' + (s.shot || '') + '｜' + (s.sub || '') + dur + voice;
    }).join('\n\n');
    return ['【' + (h.title || '') + '】', '💡 ' + (h.why || ''), '', '分镜：', steps, '', '🎬 形式：' + (h.form || '—'), h.formTip ? '形式怎么拍：' + h.formTip : '', '🎵 BGM：' + (h.bgm || '—'), '👤 ' + (h.needFace ? '需出镜' : '免露脸') + ' · ⏱ ' + (h.time || '—'), '🏷 ' + (h.tags || ''), '', '💬 评论引导：' + genHotspotComment(h)].join('\n');
  }
  function genMyLibCardHtml(h) {
    var safeId = 'ml_' + String(h.id || '').replace(/[^A-Za-z0-9_-]/g, '_');
    window.__myLibIdMap[safeId] = h.id;
    var stepsHtml = (h.steps || []).map(function (s, i) {
      var dur = s.duration ? ' · ' + esc(s.duration) : '';
      var voice = h.voice && h.voice[i] ? '<div class="hs-step-voice">🎤 ' + esc(h.voice[i]) + '</div>' : '';
      return '<div class="hs-step"><div class="hs-step-num">第' + (i + 1) + '步' + dur + '</div><div class="hs-step-shot">🎬 ' + esc(s.shot) + '</div><div class="hs-step-sub">' + esc(s.sub) + '</div>' + voice + '</div>';
    }).join('');
    return '<div class="hotspot-card" id="mlc-' + safeId + '">' +
      '<div class="hs-header"><span class="hs-tier tier-3">📚 我的选题</span><div style="flex:1;"><div class="hs-title">' + esc(h.title) + '</div><div class="hs-meta">⏱ ' + esc(h.time || '—') + ' · ' + (h.needFace ? '需出镜' : '免露脸') + '</div></div></div>' +
      '<div class="hs-body" style="display:block;">' +
        '<div style="font-size:12px;color:var(--orange);margin-bottom:10px;">💡 ' + esc(h.why || '') + '</div>' +
        stepsHtml +
        (h.formTip ? '<div style="margin-top:10px;padding:8px 10px;background:#E8F5E9;border-radius:6px;font-size:12px;color:#2E7D32;"><strong>🎬 形式怎么拍：</strong>' + esc(h.formTip) + '</div>' : '') +
        (h.tip ? '<div style="margin-top:8px;padding:8px 10px;background:#FFF3E0;border-radius:6px;font-size:12px;color:#C2410C;"><strong>💡 拍摄提示：</strong>' + esc(h.tip) + '</div>' : '') +
        '<div class="hs-footer"><span class="hs-tag">🎵 ' + esc(h.bgm || '—') + '</span><span class="hs-tag">⏱ ' + esc(h.time || '—') + '</span></div>' +
        (h.tags ? '<div style="margin-top:8px;font-size:12px;color:#55606e;">🏷 ' + esc(h.tags || '') + '</div>' : '') +
        '<div style="margin-top:10px;padding:10px;background:#FFF8E1;border-radius:6px;font-size:12px;color:#C2410C;"><strong>💬 评论引导：</strong>' + genHotspotComment(h) + '</div>' +
        '<div style="margin-top:10px;display:flex;gap:8px;">' +
          '<button class="btn btn-sm" style="background:var(--blue);color:#fff;" onclick="copyMyLibText(\'' + safeId + '\')">📋 复制全文</button>' +
          '<button class="btn btn-sm" style="background:#F5F5F5;color:#C62828;" onclick="removeFromMyLibrary(\'' + safeId + '\')">🗑 移除</button>' +
        '</div>' +
        '<pre id="mylib-full-' + safeId + '" style="display:none;">' + esc(genMyLibText(h)) + '</pre>' +
      '</div></div>';
  }
  function renderMyLibrary() {
    var grid = document.getElementById('myLibraryGrid');
    if (!grid) return;
    var empty = document.getElementById('myLibraryEmpty');
    var lib = loadMyLibrary();
    if (!lib || lib.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = '';
      updateLibBadge();
      return;
    }
    if (empty) empty.style.display = 'none';
    grid.innerHTML = lib.map(function (h) { return genMyLibCardHtml(h); }).join('');
    updateLibBadge();
  }
  function copyMyLibText(safeId) {
    var el = document.getElementById('mylib-full-' + safeId);
    var txt = el ? el.textContent : '';
    if (!txt) { showToast('无可复制内容'); return; }
    copyToClipboard(txt, '脚本全文已复制');
  }
  // 蹭热点三件套复制（v2.9.79）：从 __kitMap 取原热点标题/话题标签/BGM
  function copyKit(kid) {
    var txt = (window.__kitMap && window.__kitMap[kid]) || '';
    if (!txt) { showToast('无可复制内容'); return; }
    copyToClipboard(txt, '已复制，去抖音直接粘贴');
  }
  function toggleHotspotLibrary() {
    var panel = document.getElementById('lane-lib');
    if (!panel) return;
    var show = panel.style.display === 'none';
    panel.style.display = show ? '' : 'none';
    if (show) renderMyLibrary();
  }

  // ── 刷新：手动（hotspot-fetch） + 自动（缓存→共享→实时）──
  function setHStatus(msg) {
    var s = document.getElementById('hotspotRefreshStatus');
    if (s) s.textContent = msg;
  }
  async function manualRefreshHotspot() {
    var btn = document.getElementById('hotspotRefreshBtn');
    if (!btn) return;
    btn.disabled = true; btn.textContent = '⏳ 抓热点+生成中...';
    setHStatus('正在多平台抓热点 + AI 生成脚本...');
    try {
      var resp = await fetch(PERSONALIZE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: toAsciiJson({ mode: 'hotspot-fetch', model: AI_MODEL, max_tokens: 8000, temperature: 0.9 })
      });
      var data;
      try { data = await resp.json(); } catch (e) { throw new Error('接口返回非 JSON 数据'); }
      if (!data || !data.ok || !Array.isArray(data.scripts)) {
        throw new Error((data && data.error) ? data.error : 'AI 返回结构异常');
      }
      var scripts = data.scripts;
      window.___hotspotData = scripts;
      persistHotspotCache(scripts);
      if (data.musicCandidates && data.musicCandidates.length > 0) {
        persistHotspotBgmCache(data.musicCandidates);
      }
      renderHotspots();
      setHStatus('✅ 已生成 ' + scripts.length + ' 条（真实热点驱动）');
    } catch (e) {
      setHStatus('⚠️ 刷新失败：' + (e.message || '未知错误') + '，可继续用上方静态版');
      console.error('Hotspot refresh error:', e);
    }
    btn.disabled = false; btn.textContent = '🤖 刷新热点脚本';
  }
  async function autoRefreshHotspotIfStale() {
    if (_hsAutoStarted) return;
    _hsAutoStarted = true;
    window.___hotspotLoading = true;
    try {
      var cache = loadHotspotCache();
      var grid = document.getElementById('hotspotGrid');
      if (cache && Array.isArray(cache.scripts) && (Date.now() - cache.ts) < HS_REFRESH_MS) {
        if ((!window.___hotspotData || window.___hotspotData.length === 0) && grid) {
          window.___hotspotData = cache.scripts;
          renderHotspots();
        }
        return;
      }
      if (!window.___hotspotData || window.___hotspotData.length === 0) {
        window.___hotspotData = padHotspotData([]);
        if (grid) renderHotspots();
      }
      setHStatus('⏳ 正在加载今日热点...');
      try {
        var cacheResp = await fetch(PERSONALIZE_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: toAsciiJson({ mode: 'hotspot-cache' })
        });
        var cacheData = await cacheResp.json();
        if (cacheData && cacheData.ok && Array.isArray(cacheData.scripts) && cacheData.scripts.length) {
          var fetchedTs = cacheData.fetchedAt ? new Date(cacheData.fetchedAt).getTime() : 0;
          if (Date.now() - fetchedTs < HS_REFRESH_MS) {
            window.___hotspotData = cacheData.scripts;
            persistHotspotCache(cacheData.scripts);
            if (grid) renderHotspots();
            setHStatus('✅ 今日热点已加载（' + cacheData.scripts.length + ' 条）');
            return;
          }
        }
      } catch (e) { console.warn('Shared hotspot cache unavailable:', e.message); }
      setHStatus('⏳ 后台正在抓取今日真实热点并生成脚本，约需 60-120 秒...');
      try {
        var resp = await fetch(PERSONALIZE_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: toAsciiJson({ mode: 'hotspot-fetch', model: AI_MODEL, max_tokens: 8000, temperature: 0.9 })
        });
        var data = await resp.json();
        if (data && data.ok && data.scripts) {
          window.___hotspotData = data.scripts;
          persistHotspotCache(data.scripts);
          if (grid) renderHotspots();
          setHStatus('✅ 今日热点已自动更新（' + data.scripts.length + ' 条）');
        }
      } catch (e) {
        setHStatus('⚠️ 后台刷新失败，当前为示例数据，可点右上角按钮手动刷新');
        console.warn('Auto hotspot refresh skipped:', e.message);
      }
    } finally {
      window.___hotspotLoading = false;
    }
  }

  // ── 首页双车道入口（2.x 移植）：计数 + 跳转 hot tab 并预置 lane 过滤 ──
  function updateHomeHotspotCounts() {
    var all = getHotspotData();
    var hot = all.filter(function (h) { return h.lane === 'hot'; }).length;
    var hc = document.getElementById('homeHotCount');
    if (hc) hc.textContent = hot > 0 ? '今日已生成 ' + hot + ' 条' : '点击查看今日热点';
  }
  function enterHotspotLane(lane) {
    var tab = document.querySelector('.tab-bar .tab[data-tab="hot"]');
    if (typeof switchTab === 'function') switchTab('hot', tab);
    setTimeout(function () {
      var btnId = lane === 'hot' ? 'hs-lane-hot-btn' : 'hs-lane-all-btn';
      var btn = document.getElementById(btnId);
      filterHotspotLane(lane || '', btn);
    }, 150);
  }

  // ── 导出全局（供 index.html onclick / switchTab 调用）──
  window.renderHotspots = renderHotspots;
  window.toggleHotspot = toggleHotspot;
  window.filterHotspot = filterHotspot;
  window.filterHotspotLane = filterHotspotLane;
  window.saveToMyLibrary = saveToMyLibrary;
  window.removeFromMyLibrary = removeFromMyLibrary;
  window.copyMyLibText = copyMyLibText;
  window.toggleHotspotLibrary = toggleHotspotLibrary;
  window.manualRefreshHotspot = manualRefreshHotspot;
  window.autoRefreshHotspotIfStale = autoRefreshHotspotIfStale;
  window.updateLibBadge = updateLibBadge;
  window.updateHomeHotspotCounts = updateHomeHotspotCounts;
  window.enterHotspotLane = enterHotspotLane;
  window.copyKit = copyKit;
})();
