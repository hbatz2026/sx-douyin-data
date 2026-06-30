// publish-kit.js — 发布套件（v2.6.3）
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
  if (!comments || comments.length < 3) { comments = getTemplateComments(t, city, topic); }
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

function getTemplateComments(tpl, city, topic) {
  var loc = city || '同城';
  var t = tpl;
  if (t === 't1') return [loc+'的朋友，你家用的是哪家宽带？评论区投个票，我帮你分析哪种适合你家','觉得有用点个赞，让更多'+loc+'人看到这个对比','还有疑问直接评论区问，我看到就回'];
  if (t === 't2') return ['这事搁你身上你会怎么处理？评论区聊聊，我也想听听你的想法','你们遇到过类似情况吗？说出来让大家避个坑','觉得这个师傅靠谱的点个赞，让更多'+loc+'人看到好服务'];
  if (t === 't3') return ['这个'+(topic?topic.slice(0,8):'设备')+'你用过吗？实际体验怎么样，评论区聊聊','还有哪个参数你想了解的？评论区告诉我，下期帮你测','收藏一下，买之前回来看一眼，别花冤枉钱'];
  if (t === 't4') return ['就在'+loc+'，这周还有名额，评论区留「到店」我帮你预留','已经有'+loc+'朋友领了，真的划算，错过等下次','转发给你身边的'+loc+'朋友，一起来店里看看'];
  return [loc+'的朋友，你家宽带一个月多少钱？评论区说说','觉得有用的话点个赞，让更多'+loc+'人看到','想了解具体套餐的，评论区留「'+loc+'」，我私信发你'];
}
