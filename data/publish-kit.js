// publish-kit.js — 发布套件（v2.6.11 · 可访问性+自动保存）
// 包含 buildPublishKit、getTemplateComments、AppState fallback
// 于 index.html 中在 app.js 之前加载

// AppState 轻量实现（如果 app.js 中已定义则复用，否则提供 fallback）
if (typeof AppState === 'undefined') {
  var AppState = (function() {
    var _s = {}, _p = 'dy_';
    return {
      get: function(k, fb) { try { var v = _s[k]; if (v !== undefined) return v; var r = localStorage.getItem(_p + k); if (r !== null) { _s[k] = JSON.parse(r); return _s[k]; } } catch(e) {} return fb; },
      set: function(k, v) { _s[k] = v; try { localStorage.setItem(_p + k, JSON.stringify(v)); } catch(e) {} }
    };
  })();
}

function buildPublishKit(tpl, city, topic) {
  var loc = city || '同城';
  var t = tpl;
  var scriptText = '';
  var bgmText = '';
  var bestTime = '';
  var previewEl = document.querySelector('[id^="preview"]:not([id*="calc"]):not([id*="walk"]):not([id*="mix"]):not([id*="countdown"]):not([id*="silent"]):not([id*="tell"]):not([id*="short"])');
  if (!previewEl) {
    var previews = document.querySelectorAll('[id^="preview"]');
    for (var i = 0; i < previews.length; i++) {
      if (previews[i].textContent && previews[i].textContent.length > 50) { previewEl = previews[i]; break; }
    }
  }
  if (previewEl) scriptText = previewEl.textContent.trim();
  if (scriptText.length > 500) scriptText = scriptText.slice(0, 500);

  // ═══ BGM 抓取：表单输入为真理源（与预览一致），DOM 降级兜底 ═══
  // 优先从表单元素直接读取（这是预览的数据源，100%一致）
  bgmText = readFieldVal(t + '_bgm');
  if (!bgmText) {
    // 降级1：从预览区 DOM 抓取
    bgmText = grabInfoTag(previewEl, '🎵 BGM:') || grabInfoTag(previewEl, '🎵 BGM：');
  }
  if (!bgmText) {
    // 降级2：通配 select[id$="_bgm"]
    var bgmEls = document.querySelectorAll('select[id$="_bgm"]');
    for (var i = 0; i < bgmEls.length; i++) { if (bgmEls[i].value) { bgmText = bgmEls[i].value; break; } }
  }
  if (!bgmText && scriptText) {
    // 降级3：从预览全文本正则
    var bgmMatch = scriptText.match(/(?:BGM|🎵|背景音乐)[：:]\s*(.+?)(?:\n|$)/);
    if (bgmMatch) bgmText = bgmMatch[1].trim();
  }
  // 去噪
  if (bgmText) bgmText = bgmText.replace(/[（(]音量[^)）]*[)）]?/g, '').replace(/[（(]推荐[)）]/g, '').trim();
  // 排除非法值（emoji/占位符）
  if (bgmText && /^[🔇🔈]/u.test(bgmText)) bgmText = '';

  // ═══ 标签抓取：表单输入为真理源，DOM 降级 ═══
  var tags = readFieldVal(t + '_tags');
  if (!tags) { tags = grabInfoTag(previewEl, '🏷 标签:') || grabInfoTag(previewEl, '🏷 标签：'); }
  if (!tags) { tags = buildTags(t, loc, topic, scriptText); }

  var poolIdx = { t1:0,t2:1,t3:2,t4:3 }[t] || 0;
  bestTime = getBestTime(poolIdx, city);
  // 2026-07-20: 用别名映射把 dropdown value 转成真实脚本键
  var topicKey = (window.___t1TopicAliases && t === 't1' && ___t1TopicAliases[topic]) || topic;
  var comments = null;
  try { comments = AppState.get('ai_comments_' + t, null); } catch(e) {}
  if (!comments || comments.length < 3) {
    var curatedComments = null;
    if (t === 't1' && window.___t1Comments) curatedComments = window.___t1Comments[topicKey] || ___t1Comments[topic];
    if (t === 't2' && window.___t2Comments) curatedComments = window.___t2Comments[topicKey] || ___t2Comments[topic];
    if (t === 't4' && window.___t4Comments) curatedComments = window.___t4Comments[topicKey] || ___t4Comments[topic];
    if (curatedComments && curatedComments.length >= 3) {
      comments = curatedComments;
    } else {
      comments = getTemplateComments(t, city, topicKey, scriptText);
    }
  }
  var seoTitle = buildSeoTitle(t, loc, topic, scriptText);
  var storeName = loc; // 只取地市名，不带营业厅名称
  // 如果 loc 仍是占位符，尝试从表单读取
  if (!loc || loc === '本地' || loc === '同城') {
    var cityFromField = readFieldVal(t + '_city');
    if (cityFromField) storeName = cityFromField;
  }
  var hasAI = (function(){try{var cc=AppState.get('ai_comments_'+t,null);return cc&&cc.length>=3}catch(e){return false}})();

  var html = '<div class="publish-kit" style="margin-top:16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">';

  // ── 头部信息条 ──
  html += '<div style="padding:14px 18px;background:linear-gradient(135deg,#F0F7FF,#FFF);border-bottom:1px solid #E8F0FE;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px;color:#64748B;">';
  html += '<span style="font-weight:700;color:#0052CC;font-size:13px;">📋 发布准备</span>';
  html += '<span style="background:#fff;border:1px solid #BFDBFE;border-radius:12px;padding:2px 8px;font-size:11px;color:#1E40AF;">⏱ ' + (scriptText ? Math.ceil(scriptText.length/4) + '秒' : '约25秒') + '</span>';
  if (bgmText) html += '<span style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:2px 8px;font-size:11px;color:#475569;">🎵 ' + esc(bgmText.slice(0,16)) + '</span>';
  html += '<span style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:2px 8px;font-size:11px;color:#475569;">⏰ ' + bestTime + '</span>';
  html += '</div>';

  // ── 一键复制按钮（最显眼位置）──
  html += '<div style="padding:16px 18px 8px;">';
  html += '<button onclick="copyPublishBundle()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1D9E75,#0EA968);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 6px rgba(29,158,117,0.25);">📋 一键复制发布包（脚本+标题+标签+评论）</button>';
  html += '</div>';

  // ── 标签行 ──
  html += '<div style="padding:10px 18px;border-top:1px dashed #E8F0FE;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">🏷 标签</span>';
  html += '<span style="flex:1;color:#1E293B;line-height:1.5;">' + esc(tags) + '</span>';
  html += '<span onclick="copyText(\'' + esc(tags).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
  html += '</div>';

  // ── 标题行 ──
  html += '<div style="padding:10px 18px;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">📌 标题</span>';
  html += '<span style="flex:1;color:#1E293B;line-height:1.5;">' + esc(seoTitle) + '</span>';
  html += '<span onclick="copyText(\'' + esc(seoTitle).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
  html += '</div>';

  // ── 位置行 ──
  html += '<div style="padding:10px 18px;border-top:1px dashed #E8F0FE;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">📍 位置</span>';
  html += '<span style="flex:1;color:#1E293B;">' + esc(storeName) + '</span>';
  html += '</div>';

  // ── 评论区 ──
  html += '<div style="padding:14px 18px 8px;border-top:1px dashed #E8F0FE;">';
  html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
  html += '<span style="font-weight:700;color:#0052CC;font-size:13px;">💬 ' + (hasAI ? 'AI 智能评论' : '评论区准备') + '</span>';
  html += '<button onclick="triggerCommentOptimize(\'' + t + '\',this)" style="font-size:11px;background:linear-gradient(135deg,#E0F2FE,#DBEAFE);border:1px solid #93C5FD;color:#0052CC;border-radius:14px;padding:2px 10px;cursor:pointer;font-weight:500;">🔄 换一批</button>';
  html += '</div>';
  html += '<div style="display:flex;flex-direction:column;gap:6px;">';
  for (var c = 0; c < comments.length; c++) {
    html += '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F8FAFC;border-radius:8px;border-left:3px solid #93C5FD;">';
    html += '<span style="background:#0052CC;color:#fff;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + (c+1) + '</span>';
    html += '<span style="flex:1;line-height:1.5;color:#1E293B;font-size:12px;">' + esc(comments[c]) + '</span>';
    html += '<span onclick="copyText(\'' + esc(comments[c]).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#fff;border:1px solid #93C5FD;color:#0052CC;padding:1px 8px;font-size:10px;border-radius:4px;flex-shrink:0;">复制</span>';
    html += '</div>';
  }
  html += '</div></div>';

  // ── T1 AI 配图提示词（仅 T1 显示）──
  if (t === 't1' && window.___t1ImagePrompts) {
    var imgKey = topicKey || topic;
    var imgPrompt = ___t1ImagePrompts[imgKey] || findScriptFuzzy(window.___t1ImagePrompts, imgKey) || ___t1ImagePrompts[topic];
    if (imgPrompt) {
      html += '<div style="padding:14px 18px 18px;border-top:1px dashed #E8F0FE;">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
      html += '<span style="font-weight:700;color:#7C3AED;font-size:13px;">🎨 AI 配图提示词</span>';
      html += '<span style="font-size:10px;color:#94A3B8;">豆包/即梦 → 生成抖音封面</span>';
      html += '<span onclick="copyText(\'' + esc(imgPrompt).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:linear-gradient(135deg,#7C3AED,#A855F7);color:#fff;border:0;padding:4px 14px;font-size:11px;border-radius:6px;font-weight:600;margin-left:auto;">📋 复制</span>';
      html += '</div>';
      html += '<div style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:8px;padding:10px 12px;font-size:11px;line-height:1.6;color:#4C1D95;white-space:pre-wrap;cursor:text;">' + esc(imgPrompt) + '</div>';
      html += '</div>';
    }
  }

  html += '</div>';  // 关闭 publish-kit
  return html;
}

// 2026-07-20: 评论区"换一批"按钮
function triggerCommentOptimize(t, btn) {
  if (!btn) return;
  btn.disabled = true;
  var orig = btn.innerHTML;
  btn.innerHTML = '⏳ 换一批中...';
  setTimeout(function() {
    try {
      var profile = JSON.parse(localStorage.getItem('douyin_lab_store') || '{}');
      var loc = profile.city || '同城';
      var topic = (document.getElementById(t + '_topic') || {}).value || '';
      var topicKey = (window.___t1TopicAliases && t === 't1' && ___t1TopicAliases[topic]) || topic;
      // 优先精选评论，再关键词生成，再随机打散顺序
      var pool = [];
      if (t === 't1' && window.___t1Comments) pool = pool.concat(___t1Comments[topicKey] || ___t1Comments[topic] || []);
      if (t === 't2' && window.___t2Comments) pool = pool.concat(___t2Comments[topicKey] || ___t2Comments[topic] || []);
      if (t === 't4' && window.___t4Comments) pool = pool.concat(___t4Comments[topicKey] || ___t4Comments[topic] || []);
      if (pool.length < 3) {
        var fresh = getTemplateComments(t, loc, topic, '');
        // 换一批：随机打乱顺序
        fresh = fresh.sort(function() { return Math.random() - 0.5; });
        renderCommentBatch(t, fresh);
      } else {
        // 精选评论换一批：随机选 3 条不同的
        var shuffled = pool.slice().sort(function() { return Math.random() - 0.5; });
        renderCommentBatch(t, shuffled.slice(0, 3));
      }
      toast('已换一批评论', 'success');
    } catch(e) {
      console.error('换一批评论失败:', e);
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  }, 400);
}

function renderCommentBatch(t, comments) {
  // 找当前 publish-kit，替换评论列表
  var pk = document.querySelector('.publish-kit');
  if (!pk) return;
  var lists = pk.querySelectorAll('.comment-list, [style*="border-top:1px dashed #E8F0FE"]');
  // 直接刷 renderPublishKit —— 但 publish-kit 是在 buildPreviewFooter 内生成的，难精确替换
  // 简化：调用对应 preview 函数重新渲染
  try {
    if (t === 't1') previewT1Talk();
    else if (t === 't2') previewT2Tell();
    else if (t === 't3') previewT3Talk();
    else if (t === 't4') previewT4Walk();
  } catch(e) {}
}

// ════════════════════════════════════════
// 动态标签构建（基于脚本内容+选题）
// ════════════════════════════════════════

function buildTags(tpl, loc, topic, scriptText) {
  var ctx = (topic || '') + ' ' + (scriptText || '');
  var kws = extractTagKeywords(ctx);

  // 同城标签 = 抖音本地流量的核心入口
  var localTag = '#' + loc + '同城';
  if (loc === '本地' || loc === '同城' || !loc) localTag = '#同城';

  if (tpl === 't1') {
    if (/宽带|网速|WiFi|光纤|FTTR/i.test(ctx)) return '#' + loc + '宽带 #宽带对比 #' + loc + '同城 #电信';
    if (/手机|iPhone|荣耀|华为|OPPO|vivo|小米|换机|购机/i.test(ctx)) return '#' + loc + '购机 #手机推荐 #' + loc + '电信 #同城';
    return '#' + loc + (kws[0]||'电信') + ' #实测对比 #' + loc + '同城';
  }

  if (tpl === 't2') {
    // T2 故事类：主题标签 + 同城 + 电信品牌 + 生活类泛标签
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    if (kws[1] && kws[1] !== kws[0]) arr.push('#' + kws[1]);
    arr.push(localTag);
    arr.push('#中国电信');
    if (arr.length < 4) arr.push('#' + loc + '生活');
    return arr.join(' ');
  }

  if (tpl === 't3') {
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    if (kws[1] && kws[1] !== kws[0]) arr.push('#' + kws[1]);
    arr.push(localTag);
    arr.push('#真实体验');
    return arr.join(' ');
  }

  if (tpl === 't4') {
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    arr.push(localTag);
    arr.push('#到店有礼');
    arr.push('#' + loc + '福利');
    return arr.join(' ');
  }

  return localTag + ' #' + loc + '电信 #同城';
}

/**
 * 从文本中提取适合做 hashtag 的关键词（2-6字）
 */
function extractTagKeywords(text) {
  if (!text) return [];
  // 业务关键词库（按匹配优先级排序）
  var candidates = [
    // T2 常见主题
    { kw: '防诈骗', re: /防骗|诈骗|骗局|防诈|反诈/i },
    { kw: '数字课堂', re: /数字课堂|智能手机教学|老人.*学|教.*手机/i },
    { kw: '暖心服务', re: /暖心|感动|耐心|特事特办|冒雨|上门服务/i },
    { kw: '政企服务', re: /政企|企业专线|专线|企业宽带|一站式|办公网络/i },
    { kw: '装机维修', re: /装机|修网|修光纤|上门修|网络不通|信号覆盖/i },
    { kw: '节日关怀', re: /节日|端午|中秋|春节|父亲节|母亲节|重阳|慰问/i },
    // T1 宽带/手机
    { kw: '宽带', re: /宽带|网速|光纤|FTTR|套餐|月租/i },
    { kw: '手机', re: /iPhone|荣耀|华为|OPPO|vivo|小米|nova|Mate|购机|换机/i },
    // T3 设备测评
    { kw: '测速', re: /测速|网速测试|跑分|带宽/i },
    { kw: '设备评测', re: /测评|评测|参数|续航|拍照|屏幕|芯片|处理器/i },
    // T4 活动
    { kw: '到店福利', re: /福利|优惠|免费领|礼品|特惠|限量|名额/i },
    { kw: '探店打卡', re: /探店|打卡|开业|新店|体验店|智慧厅/i },
  ];
  var found = [];
  for (var i = 0; i < candidates.length && found.length < 3; i++) {
    if (candidates[i].re.test(text)) found.push(candidates[i].kw);
  }
  // 兜底：从 topic 名提取
  if (found.length === 0 && text) {
    var topicMatch = text.match(/^(\S{2,8})\s/);
    if (topicMatch) found.push(topicMatch[1]);
  }
  return found;
}

// ════════════════════════════════════════
// 动态标题构建（基于脚本内容+选题）
// ════════════════════════════════════════

function buildSeoTitle(tpl, loc, topic, scriptText) {
  // 2026-07-20: 优先读取预设标题
  var curatedTitle = null;
  if (tpl === 't1' && window.___t1Titles) curatedTitle = window.___t1Titles[topic];
  if (tpl === 't2' && window.___t2Titles) curatedTitle = window.___t2Titles[topic];
  if (tpl === 't4' && window.___t4Titles) curatedTitle = window.___t4Titles[topic];
  if (curatedTitle) return loc + '：' + curatedTitle;

  var ctx = (topic || '') + ' ' + (scriptText || '');
  var shortTopic = (topic || '').slice(0, 12);
  var kw = extractTagKeywords(ctx)[0] || '';

  // 优先复用脚本预览中的黄金钩子做标题（抖音流量最佳实践）
  var hook = extractHookFromPreview();
  if (hook) return loc + '：' + hook.slice(0, 20);

  // ═══ Fallback：基于模板类型的SEO标题 ═══
  if (tpl === 't1') {
    if (/宽带|网速|WiFi|光纤/i.test(ctx)) return loc + '宽带怎么选？过来人告诉你真相';
    if (/手机|iPhone|荣耀|华为/i.test(ctx)) return loc + '买手机别踩坑，实测对比来了';
    return loc + (kw||'电信') + '怎么选？看完不花冤枉钱';
  }
  if (tpl === 't2') {
    if (/防骗|诈骗/i.test(ctx)) return loc + '又有人差点被骗！电信人紧急提醒';
    if (/暖心|感动|上门/i.test(ctx)) return loc + '一位' + loc + '电信师傅的真实一天';
    if (/装机|修网|网络/i.test(ctx)) return loc + '网络卡到崩溃？看电信师傅怎么修';
    if (/政企|企业|办公/i.test(ctx)) return loc + '企业网络怎么搭才稳？实测数据在这';
    return loc + '：' + (shortTopic || kw || '营业厅的故事');
  }
  if (tpl === 't3') {
    var devName = (topic || '').match(/^(\S{2,12})/);
    if (devName) return loc + (devName[1]) + '到底值不值？真实体验告诉你';
    return loc + (shortTopic || kw || '') + '到底值不值？';
  }
  if (tpl === 't4') {
    if (/福利|优惠|免费/i.test(ctx)) return loc + '人速看！这波电信福利别错过';
    if (/探店|打卡|新店/i.test(ctx)) return loc + '探店！' + loc + '这个电信营业厅有点不一样';
    return loc + '电信福利来了！' + (shortTopic || '到店有礼');
  }
  return loc + (kw || '电信') + '最新动态';
}

/**
 * 从预览区DOM提取黄金钩子台词（引号内的对话）
 * @returns {string} 钩子文本（最多20字），未找到返回空
 */
function extractHookFromPreview() {
  var dialogueEls = document.querySelectorAll('.dialogue');
  for (var i = 0; i < dialogueEls.length; i++) {
    var el = dialogueEls[i];
    // 只看可见元素的第一个 dialogue（钩子总是在开头）
    if (!el.offsetParent) continue;
    var text = (el.textContent || '').trim();
    // 提取引号中的文本
    var m = text.match(/"([^"]{5,})"/);
    if (m) return m[1].slice(0, 30);
  }
  return '';
}

/**
 * 安全读取表单字段值（按 ID）
 * @param {string} fieldId - 字段 DOM ID（如 "t2_bgm"）
 * @returns {string} 值或空字符串
 */
function readFieldVal(fieldId) {
  try {
    var el = document.getElementById(fieldId);
    if (el && el.value !== undefined) {
      var v = el.value.trim();
      return (v && v !== '-- 请选择 --' && v.indexOf('--') !== 0) ? v : '';
    }
  } catch(e) {}
  return '';
}

/**
 * 从预览区 DOM 中抓取 info-tag 标注的内容（BGM、标签等）
 * @param {Element} container - 预览区容器元素
 * @param {string} prefix - 标注前缀（如 "🎵 BGM:"）
 * @returns {string} 提取的内容或空字符串
 */
function grabInfoTag(container, prefix) {
  if (!container) return '';
  // 方案1：精确匹配 class="info-tag" 的元素
  var infoTags = container.querySelectorAll('.info-tag');
  for (var i = 0; i < infoTags.length; i++) {
    var t = infoTags[i].textContent.trim();
    if (t.indexOf(prefix) === 0) {
      return t.slice(prefix.length).trim().replace(/^[：:]\s*/, '');
    }
  }
  // 方案2：容器本身包含前缀（备降兜底）
  var ct = container.textContent || '';
  var idx = ct.indexOf(prefix);
  if (idx >= 0) {
    var rest = ct.slice(idx + prefix.length).replace(/^[：:]\s*/, '');
    var end = rest.indexOf('\n');
    return (end >= 0) ? rest.slice(0, end).trim() : rest.slice(0, 40).trim();
  }
  return '';
}

function getTemplateComments(tpl, city, topic, scriptText) {
  var loc = city || '同城';
  var t = tpl;
  // 合并选题和脚本文本用于关键词匹配（提高命中率）
  var ctx = (topic || '') + ' ' + (scriptText || '');

  // ═══ T2 一线场景（故事模板）——按主题匹配 ═══
  if (t === 't2') {
    if (/防骗|诈骗|骗局|被骗|假.*钱|冒充|中奖|退款|理财陷阱|养老骗局|保健品骗|投资骗/i.test(ctx)) {
      return [
        '你家里老人遇到过类似诈骗吗？评论区说说，提醒更多人',
        '这种骗术真的太常见了，转发给爸妈看，能帮一个是一个',
        '你们社区做过防骗宣传吗？来聊聊效果怎么样'
      ];
    }
    if (/数字课堂|教.*手机|教.*用|老年人.*智能|老人.*学|微信教学|智能手机|字大|看不清|不会操作/i.test(ctx)) {
      return [
        '你家老人学会用智能手机了吗？哪个功能教了最久？',
        '这种数字课堂你们社区有吗？评论区报个到，我看看有多少地方在做',
        '转发给爸妈，让他们知道营业厅能免费教这些'
      ];
    }
    if (/暖心|感动|帮忙|耐心|大爷|大妈|老人|阿姨|叔叔|冒雨|上门|特事特办/i.test(ctx)) {
      return [
        '这种服务态度真的难得，你们那营业厅怎么样？评论区聊聊',
        '你遇到过这么耐心的营业员吗？说出来表扬一下',
        '为'+loc+'电信点赞，这样的服务值得被更多人看到'
      ];
    }
    if (/装机|修网|WiFi|信号|覆盖|光纤|FTTR|上门.*修|网络不通|慢/i.test(ctx)) {
      return [
        '你家网速平时怎么样？有没有找师傅上门修过？',
        '装宽带的时候等了多久？师傅态度如何，聊聊',
        '觉得'+loc+'电信服务靠谱的点个赞，让更多人看到'
      ];
    }
    if (/节日|端午|中秋|春节|父亲节|母亲节|重阳|慰问|送礼|关怀/i.test(ctx)) {
      return [
        '这个节日你怎么陪家里人的？评论区晒晒',
        '你们社区有类似的节日活动吗？来分享一下',
        '转给家人看看，这份心意比什么都重要'
      ];
    }
    if (/政企|企业专线|企业宽带|云桌面|视频会议|办公网络|一站式|信息化|智慧办公/i.test(ctx)) {
      return [
        '你们公司用的什么网络方案？评论区聊聊，看谁家最快',
        '企业宽带贵不贵？来算笔账，别被代理商忽悠',
        'IT人进！你们公司网络有没有踩过坑？分享一下经验'
      ];
    }
    // T2 兜底：从上下文提取关键词嵌入
    var kw = extractKeyword(ctx, ['营业厅','服务','电信','师傅','老人','客户']);
    return [
      '这事搁你身上你会怎么处理？评论区聊聊' + (kw ? '，关于' + kw : ''),
      '你们遇到过类似情况吗？说出来让大家参考',
      '觉得这个' + (kw || '服务') + '靠谱点个赞，让更多' + loc + '人看到'
    ];
  }

  // ═══ T1 决策指南（口播对比）═══
  if (t === 't1') {
    if (/宽带|网速|WiFi|光纤|FTTR|套餐|月租|兆/i.test(ctx)) {
      return [
        loc + '的朋友，你家用的是哪家宽带？投个票，我帮你分析',
        '你家宽带一个月多少钱？评论区说说，我帮你看划不划算',
        '觉得这个对比有用的点个赞，选宽带不踩坑'
      ];
    }
    if (/手机|iPhone|荣耀|华为|OPPO|vivo|小米|换机|购机|nova|Mate|iQOO/i.test(ctx)) {
      return [
        '正在用的什么手机？评论区晒型号，聊聊使用体验',
        '你下一部手机打算买哪款？评论区做个小调查',
        '这个对比帮你省了研究时间，收藏一下慢慢看'
      ];
    }
    return [
      loc + '的朋友，你更倾向哪种？评论区投个票',
      '还有疑问直接问，我看到就回，帮你做决定',
      '觉得有用的转发给需要的朋友，别让他们瞎选'
    ];
  }

  // ═══ T3 深度测评（四选一/参数向）═══
  if (t === 't3') {
    var devKw = extractKeyword(ctx, ['手机','路由器','电视','平板','耳机','手表','设备']);
    if (/手机|iPhone|荣耀|华为|小米|OPPO|vivo|屏幕|拍照|续航|处理器|芯片/i.test(ctx)) {
      return [
        '这部' + (devKw || '手机') + '你用过吗？实际感受怎么样',
        '你最看重' + (devKw || '设备') + '哪个参数？评论区讨论下',
        '收藏一下，买之前回来对照着看，不花冤枉钱'
      ];
    }
    if (/宽带|网速|测速|WiFi|信号|延迟|光猫|路由/i.test(ctx)) {
      return [
        '你家宽带实际跑多少兆？评论区晒个测速图',
        'WiFi 哪个角落最弱？来聊聊你的户型和方案',
        '觉得测得准的点个赞，下期想测什么评论区告诉我'
      ];
    }
    return [
      (devKw || '这东西') + '你用过吗？真实体验评论区聊聊',
      '还有哪个参数想深入了解？下期可以安排',
      '买前收藏，买后回来对照，省得交智商税'
    ];
  }

  // ═══ T4 本地事件（福利/探店/活动）═══
  if (t === 't4') {
    if (/福利|优惠|送|免费|领|特惠|礼品|到店|进店|限量|名额/i.test(ctx)) {
      return [
        '就在' + loc + '，这周还有名额，评论区留「到店」我帮你留意',
        '已经有' + loc + '朋友领到了，真的划算，错过等下次',
        '转发给身边的' + loc + '朋友，一起来店里看看'
      ];
    }
    if (/探店|打卡|开业|新店|体验店|智慧厅/i.test(ctx)) {
      return [
        '你们去过这家店吗？环境和服务怎么样？',
        '这种体验店' + loc + '还有哪家？评论区推荐下',
        '@你想一起去的人，周末一起打卡'
      ];
    }
    return [
      loc + '的朋友注意了，这波别错过！评论区扣1我私信你详情',
      '已经有人去过了，真的不错，转发给朋友一起薅羊毛',
      '想知道更多福利？关注我，第一时间通知'
    ];
  }

  // ═══ 最终兜底 ═══
  var fk = extractKeyword(ctx, ['宽带','手机','电信','营业厅','福利','服务']);
  return [
    (fk ? fk + '相关：' : '') + loc + '的朋友，你们怎么看？评论区聊聊',
    '觉得有用的点个赞，让更多' + loc + '人看到',
    '有问题直接评论区问，我看到就回'
  ];
}

/**
 * 从文本中提取第一个匹配的关键词（用于评论个性化）
 * @param {string} text - 待匹配文本
 * @param {string[]} keywords - 关键词候选列表（按优先级排序）
 * @returns {string} 匹配到的关键词，或空字符串
 */
function extractKeyword(text, keywords) {
  if (!text) return '';
  for (var i = 0; i < keywords.length; i++) {
    if (text.indexOf(keywords[i]) !== -1) return keywords[i];
  }
  return '';
}
