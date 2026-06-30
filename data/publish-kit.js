// publish-kit.js — 发布套件（v2.6.4）
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
  var bgmEls = document.querySelectorAll('select[id$="_bgm"]');
  for (var i = 0; i < bgmEls.length; i++) { if (bgmEls[i].value) { bgmText = bgmEls[i].value; break; } }
  var poolIdx = { t1:0,t2:1,t3:2,t4:3 }[t] || 0;
  bestTime = getBestTime(poolIdx, city);
  var comments = null;
  try { comments = AppState.get('ai_comments_' + t, null); } catch(e) {}
  if (!comments || comments.length < 3) { comments = getTemplateComments(t, city, topic, scriptText); }
  var seoTitle = ({'t1':loc+'宽带怎么选？实测对比','t2':loc+'电信营业厅故事：'+(topic||'').slice(0,12),'t3':loc+(topic||'').slice(0,15)+'到底值不值？','t4':loc+'电信福利！'+(topic||'').slice(0,10)+'就在'+loc+'营业厅'})[t]||loc+'宽带怎么选';
  var tags = ({'t1':'#'+loc+'宽带 #宽带对比 #'+loc+'同城','t2':'#'+loc+'电信 #服务故事 #'+loc+'生活','t3':'#'+loc+'评测 #真实体验 #'+loc+'同城','t4':'#'+loc+'福利 #到店有礼 #'+loc+'同城'})[t]||'#'+loc+'宽带';
  var profile = getStoreProfile();
  var storeName = (profile && profile.name) ? profile.name : loc + '电信营业厅';
  var hasAI = (function(){try{var cc=AppState.get('ai_comments_'+t,null);return cc&&cc.length>=3}catch(e){return false}})();

  var html = '<div class="publish-kit" style="margin-top:16px;padding:0;background:#fff;border-radius:14px;border:1px solid #D3D1C7;overflow:hidden;">';
  html += '<div style="padding:14px 16px;border-bottom:1px solid #E8E6DC;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12px;color:#888780;">';
  html += '<span style="font-weight:500;color:#5F5E5A;">发布准备</span>';
  html += '<span style="margin-left:auto;">' + (scriptText ? Math.ceil(scriptText.length/4) + '秒' : '约15分钟') + '</span>';
  if (bgmText) html += '<span>' + esc(bgmText.slice(0,20)) + '</span>';
  html += '<span>' + bestTime + '</span>';
  html += '</div>';
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;"><span style="font-weight:500;color:#5F5E5A;">标签 </span>' + esc(tags) + '</div>';
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;display:flex;align-items:center;gap:8px;"><span style="font-weight:500;color:#5F5E5A;">标题 </span><span style="flex:1;">' + esc(seoTitle) + '</span><span onclick="copyText(\'' + esc(seoTitle).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;">复制</span></div>';
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;display:flex;align-items:center;gap:8px;"><span style="font-weight:500;color:#5F5E5A;">位置 </span><span style="flex:1;">' + esc(storeName) + '</span><span onclick="copyText(\'' + esc(storeName).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;">复制</span></div>';
  html += '<div style="padding:14px 16px;border-bottom:1px solid #E8E6DC;">';
  html += '<div style="font-weight:500;font-size:13px;color:#5F5E5A;margin-bottom:10px;">' + (hasAI ? 'AI 智能评论' : '评论区准备') + '</div>';
  for (var c = 0; c < comments.length; c++) {
    html += '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;"><span style="font-size:12px;min-width:18px;color:#888780;">' + (c+1) + '</span><span style="flex:1;line-height:1.5;color:#2C2C2A;">' + esc(comments[c]) + '</span><span onclick="copyText(\'' + esc(comments[c]).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;padding:2px 8px;border:0.5px solid #5DCAA5;border-radius:6px;">复制</span></div>';
  }
  html += '</div>';
  
  // Build full bundle for one-click copy
  var bundle = seoTitle + '\\n\\n' + scriptText + '\\n\\n' + tags + '\\n\\n' + comments.join('\\n');
  html += '<div style="padding:14px 16px;">';
  html += '<button onclick="copyText(\'' + bundle.replace(/'/g,'&#39;') + '\');toast(\'发布包已复制！去抖音粘贴即可\',\'success\')" style="width:100%;padding:12px;background:#1D9E75;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;">一键复制发布包（脚本+标题+标签+评论）</button>';
  html += '<div style="text-align:center;font-size:11px;color:#B4B2A9;margin-top:6px;">粘贴到抖音，配视频，发布</div>';
  html += '</div>';
  html += '</div>';
  return html;
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
