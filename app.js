'use strict';
// 抖本内容工坊 v2.7.0 — 模块化构建
// 构建时间: 2026-07-20 09:15:00
// 模块: core.js, schedule.js, templates.js, ai.js, live.js, pages.js, init.js
// 此文件由 build-app.mjs 自动生成，请编辑 src/ 下的源文件

// ═══════ core.js ═══════
'use strict';

'use strict';

'use strict';

function esc(s) { return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;') : ''; }

function sanitizeFilename(name) {
  return String(name).replace(/[\/\\:*?"<>|]/g, '-').replace(/\s+/g, '_').slice(0, 80);
}

function sanitizeHTML(html) {
  if (!html) return '';
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '');
}

function toast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast ' + (type||'');
  requestAnimationFrame(function() { t.classList.add('show'); });
  clearTimeout(t._tid);
  t._tid = setTimeout(function() { t.classList.remove('show'); }, 2000);
}

function safeCall(fn) {
  try { fn(); }
  catch(e) {
    console.error('safeCall error:', fn.name || 'anonymous', e);
    var msg = e.message || String(e);
    if (msg.indexOf('undefined') > -1 || msg.indexOf('null') > -1) {
      toast('请先完成表单填写后再预览', 'error');
    } else {
      toast('预览生成失败，请检查填写是否完整', 'error');
    }
  }
}

var PERSONA_KEY = 'douyin_lab_persona';

(function cleanOldCaches() {
  try {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('dy_personalize_') === 0 && keys[i].indexOf('v4_dy_personalize_') !== 0) {
        localStorage.removeItem(keys[i]);
      }
    }
  } catch(e) {}
})();

var personaDB = {
  sweet:   { label: '甜美学姐', icon: '🌸', tone: '亲切网感',   tags: '年轻女性 抖音原生 活泼语速 会用热梗',
             desc: '轻声快语、有网感、用抖音流行口吻拉近距离',
             prompt: '你是电信营业厅的年轻女员工。口吻轻快甜美，有抖音网感，爱用"宝子们""姐妹们"之类称呼。语速活泼，善于用emoji和热梗拉近距离。',
             hook: '宝子们！今天来聊聊{topic}，一分钟跟你讲清楚👇',
             cta: '截图保存慢慢看～' },
  tech:    { label: '技术专家', icon: '🔧', tone: '数据硬核',   tags: '不分性别 参数对比 测试数据 专业术语',
             desc: '用数据说话，实测对比，专业但不生硬',
             prompt: '你是电信营业厅的技术专家。用实测数据说话，喜欢对比参数和性能。专业但不死板，能用通俗方式解释技术。"今天测了""直接上数据""建议截图"是你的口头禅。',
             hook: '直接说结论：{topic}，看完你就知道该怎么选了。',
             cta: '建议截图保存。' },
  biz:     { label: '商务精英', icon: '💼', tone: '简洁干练',   tags: '不分性别 信息密度 数字前置 直奔主题',
             desc: '直奔主题、信息密度高，适合政企商务场景',
             prompt: '你是电信营业厅的商务专家。说话干练，直奔主题，信息密度高。数字前置，结论先行。"建议""结论明确""数据来源"是你的风格。不讲废话。',
             hook: '{topic}，结论前置——选对了每月省好几十。',
             cta: '截图存一下，到店带着来。' },
  young:   { label: '活力小哥', icon: '😎', tone: '吐槽有梗',   tags: '年轻男性 快节奏 有情绪 夸张对比',
             desc: '口语化接地气、快节奏、有网感有情绪起伏',
             prompt: '你是电信营业厅的年轻男员工。说话口语化、接地气，有网感。爱用"兄弟们"开头，喜欢吐槽、夸张对比。"你敢信""直接打脸""看了你就懂"是你的风格。',
             hook: '兄弟们！{topic}，这条干货直接截图，我不删的。',
             cta: '截图存好这条。' },
  master:  { label: '资深师傅', icon: '👔', tone: '经验稳重',   tags: '成熟男性 案例切入 娓娓道来 让人信任',
             desc: '经验感、用真实案例说话，稳重有分量',
             prompt: '你是电信营业厅的资深老师傅。干了二十年装维，经验丰富。用真实案例说话，说话稳重有分量。"干了这么多年""信我一次""经验之谈"是你的口头禅。不吹不黑，实事求是。',
             hook: '做了这么多年营业员，{topic}，我说几句实在的。',
             cta: '截图留着，到店里直接找我。' },
  sister:  { label: '暖心姐姐', icon: '💝', tone: '温暖共情',   tags: '成熟女性 故事切入 生活场景 亲切自然',
             desc: '用生活场景和真实故事打动客户，温暖有温度',
             prompt: '你是电信营业厅的暖心姐姐。用客户故事和生活场景切入，温暖亲切。喜欢说"昨天来了个阿姨""门口的王姐"这种开头。让观众感觉你不是在推销，是在真心帮忙。',
             hook: '昨天来了个客户，也是问{topic}，我帮他算了笔账👇',
             cta: '截图转发给需要的朋友～' }
};

var personaOrder = ['sweet','tech','biz','young','master','sister'];

var PERSONALIZE_API = 'https://1253338744-66eug9kqc7.ap-guangzhou.tencentscf.com';

async function callPersonalizeAPI(templateType, topicKey, fields, skipCache) {
  try {
    var profile = getStoreProfile();
    if (!profile) { return null; }
    // Check localStorage cache first (skip on retry)
    if (!skipCache) {
      var weekNum = getWeekNumber();
      var topicHash = simpleHash(topicKey);
      var cacheKey = CACHE_VERSION + '_dy_personalize_' + profile.hash + '_' + templateType + '_' + weekNum + '_' + topicHash;
      try {
        var cached = localStorage.getItem(cacheKey);
        if (cached) { return JSON.parse(cached).script; }
      } catch(e) {}
    }
    var weekNum = getWeekNumber();
    var topicHash = simpleHash(topicKey);
    var cacheKey = CACHE_VERSION + '_dy_personalize_' + profile.hash + '_' + templateType + '_' + weekNum + '_' + topicHash;
    // Try API
    try {
      var body = {
        store: profile.name, persona: profile.persona,
        topic: topicKey, city: profile.city,
        fields: fields || readFormFields(templateType),
        templateType: templateType
      };
      var controller = new AbortController();
      var timeoutId = setTimeout(function() { controller.abort(); }, 45000);
      var res = await fetch(PERSONALIZE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('API ' + res.status);
      var data = await res.json();
      if (data.script) {
        // Cache for next time
        try { localStorage.setItem(cacheKey, JSON.stringify({ script: data.script })); } catch(e) {}
        return data.script;
      }
    } catch(e) {
      console.warn('Personalize API failed:', e.message);
    }
    // API failed — return null (let caller handle the UI fallback)
    return null;
  } catch(e) {
    console.warn('callPersonalizeAPI error:', e.message);
    return null;
  }
}

var CACHE_VERSION = 'v4';

function simpleHash(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
  return Math.abs(h).toString(36);
}

function readFormFields(prefix) {
  var fields = {};
  // Common fields across all templates
  var commonIds = ['city','topic','bgm','tags','title'];
  // Template-specific fields
  var extraIds = {
    t1: ['a','b','c'],
    t2: ['time','customer','problem','finding','steps','reaction','summary','preset'],
    t3: ['item','func','p1','p2','p3','hook_text'],
    t4: ['benefit','desc','addr','hours','landmark','shop','preset']
  };
  var ids = commonIds.concat(extraIds[prefix] || []);
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(prefix + '_' + ids[i]);
    if (el && el.value) fields[ids[i]] = el.value;
  }
  return fields;
}

function hashStore(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function getPersona() {
  return localStorage.getItem(PERSONA_KEY) || 'sister';
}

function setPersona(key) {
  localStorage.setItem(PERSONA_KEY, key);
  // Visual feedback on labels
  var labels = document.querySelectorAll('.persona-opt');
  for (var i = 0; i < labels.length; i++) {
    var radio = labels[i].querySelector('input');
    if (radio && radio.value === key) {
      labels[i].style.borderColor = 'var(--blue)';
      labels[i].style.background = '#E8F0FE';
    } else {
      labels[i].style.borderColor = 'var(--border)';
      labels[i].style.background = '';
    }
  }
}

function initPersonaPicker() {
  var key = getPersona();
  var radio = document.querySelector('input[name="persona"][value="' + key + '"]');
  if (radio) { radio.checked = true; setPersona(key); }
}

function getStoreProfile() {
  var raw = localStorage.getItem(STORE_KEY);
  var name = '';
  try {
    var obj = JSON.parse(raw);
    name = obj && obj.name ? obj.name : (typeof raw === 'string' ? raw : '');
  } catch(e) {
    name = (typeof raw === 'string') ? raw : '';
  }
  if (!name) return null;
  // 城市提取：山西11地市白名单优先，否则取前2字，截掉营业厅/店/路/街后缀
  var SX_CITIES = ['太原','大同','阳泉','长治','晋城','朔州','忻州','吕梁','晋中','临汾','运城'];
  var city = '';
  for (var i = 0; i < SX_CITIES.length; i++) {
    if (name.indexOf(SX_CITIES[i]) === 0) { city = SX_CITIES[i]; break; }
  }
  if (!city) {
    city = name.slice(0, 2);
    city = city.replace(/[营业厅店路街坊镇乡县区市]/g, '');
  }
  return {
    name: name,
    city: city || name.slice(0,2),
    persona: getPersona(),
    hash: hashStore(name)
  };
}

function getWeekNumber() {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  var yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function selectVariant(topicKey) {
  return null; // variantPool.js deprecated, feature disabled
}

function composeScript(variant) {
  var script = typeof variant === 'string' ? variant : (variant.script || variant.text || '');
  var profile = getStoreProfile();
  if (profile) {
    script = script.replace(/\{user_store\}/g, profile.name);
    script = script.replace(/\{user_city\}/g, profile.city);
  }
  // Auto-inject form fields from all templates (T1 scenes, T2 story, etc.)
  for (var t = 1; t <= 4; t++) {
    var prefix = 't' + t + '_';
    var fields = ['a','b','c','problem','finding','steps','reaction','summary','customer','time','benefit','landmark'];
    for (var fi = 0; fi < fields.length; fi++) {
      var el = document.getElementById(prefix + fields[fi]);
      if (el && el.value) {
        script = script.replace(new RegExp('\\{' + fields[fi] + '\\}', 'g'), esc(el.value));
      }
    }
  }
  return script;
}

var T1_SCENE_PRESETS = {
  family: ['三口之家，手机+平板+电视同时在用，300兆起步，月租99元','四口二娃家庭，全屋智能家居+网课，500兆稳妥，月租129元','大家庭带老人，7-8台设备同时在线，直接上千兆，月租169元'],
  student: ['大学宿舍4人合租，分摊后每人30元，100兆基础够用','学生党刷网课+打手游，需要低延迟，200兆性价比最高','毕业季租房初装，选可移机套餐，押金100元，搬家带走'],
  senior: ['老人自用刷微信看新闻，100兆够用，月租59元','银发族追剧看广场舞，200兆更流畅，月租79元','帮子女带孩子，需要监控摄像头+视频通话，300兆起步'],
  rent: ['短期租3个月，选按季度付费，到期自动停，不绑长合约','合租4人分摊宽带，500兆共享不卡顿，每人月均30元','租房一年续租，老用户续约享折扣，比新装省20%'],
  gamer: ['重度手游玩家，延迟<20ms，200兆+游戏加速器起步','PC主机电竞玩家，千兆宽带才是刚需','直播推流+游戏同时进行，上行带宽至少30M，500兆起跳'],
  streamer: ['一人刷剧看高清，100兆流畅1080P，月租59元够用','一家三口同时看4K+刷抖音+上网课，300兆不卡顿','家庭影院级4K投影，杜比全景声，千兆宽带才有沉浸感']
};

function fillT1ScenePreset(type) {
  var scenes = T1_SCENE_PRESETS[type];
  if (!scenes) return;
  document.getElementById('t1_a').value = scenes[0];
  document.getElementById('t1_b').value = scenes[1];
  document.getElementById('t1_c').value = scenes[2];
  var btns = document.querySelectorAll('#t1-scene-presets .scene-preset-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  var ab = document.querySelector('#t1-scene-presets .scene-preset-btn[onclick*="' + type + '"]');
  if (ab) ab.classList.add('active');
  ['t1_a','t1_b','t1_c'].forEach(function(id) {
    var el = document.getElementById(id);
    el.style.borderColor = '#008A5C';
    el.style.background = '#F0FFF4';
    setTimeout(function(){ el.style.borderColor = ''; el.style.background = ''; }, 1200);
  });
}

function expandT2Detail() {
  var a = document.getElementById('t2-detail-area');
  var h = document.getElementById('t2-autofill-hint');
  if (a) a.style.display = 'block';
  if (h) h.style.display = 'none';
}

function getDailyQuota() {
  var today = new Date().toISOString().slice(0,10);
  try {
    var data = JSON.parse(localStorage.getItem('dy_ai_quota') || '{}');
    if (data.date !== today) { data = { date: today, used: 0, max: 5 }; }
    // Debug override: add ?quota=999 to URL for testing
    if (/[?&]quota=(\d+)/.test(location.search)) data.max = parseInt(RegExp.$1);
    return data;
  } catch(e) { return { date: today, used: 0, max: 3 }; }
}

function useDailyQuota() {
  var q = getDailyQuota();
  q.used = Math.min(q.max, q.used + 1);
  localStorage.setItem('dy_ai_quota', JSON.stringify(q));
  syncAllQuotaBadges();
  return q.max - q.used;
}

function quotaRemaining() { return getDailyQuota().max - getDailyQuota().used; }

function syncAllQuotaBadges() {
  var rem = quotaRemaining();
  var cards = document.querySelectorAll('[id$="-quota"]');
  for (var i = 0; i < cards.length; i++) {
    cards[i].textContent = '剩余' + rem + '次';
  }
  var btns = document.querySelectorAll('[id$="-btn"]');
  for (var j = 0; j < btns.length; j++) {
    if (rem > 0) {
      btns[j].style.display = '';
      btns[j].disabled = false;
      btns[j].textContent = rem===5 ? '🚀 AI 优化台词（全站剩余5次）' : (rem===4 ? '🔄 AI 优化（全站剩余4次）' : (rem===3 ? '🔄 AI 优化（全站剩余3次）' : (rem===2 ? '🔄 AI 优化（全站剩余2次）' : '🔄 最后一次（全站剩余1次）')));
    } else {
      btns[j].style.display = 'none';
    }
  }
}

function detectTemplateType() {
  if (document.querySelector('.template-page[style*="block"]') || document.getElementById('page-template1')?.style.display !== 'none') return 't1';
  if (document.getElementById('page-template2')?.style.display !== 'none') return 't2';
  if (document.getElementById('page-template3')?.style.display !== 'none') return 't3';
  if (document.getElementById('page-template4')?.style.display !== 'none') return 't4';
  return 't2'; // default
}

function getTemplateTopic(tpl) {
  var sel = document.getElementById(tpl + '_topic');
  return sel ? sel.value : '';
}

function copyText(text, btn) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      toast('已复制到剪贴板', 'success');
      if (btn) { btn.classList.add('copied'); btn.textContent='已复制 ✓'; setTimeout(function(){ btn.classList.remove('copied'); btn.textContent='复制'; }, 2000); }
    }).catch(function() { toast('复制失败，请手动复制', 'error'); });
  } else {
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('已复制到剪贴板', 'success'); } catch(e) { toast('复制失败，请手动复制', 'error'); }
    document.body.removeChild(ta);
    if (btn) { btn.classList.add('copied'); btn.textContent='已复制 ✓'; setTimeout(function(){ btn.classList.remove('copied'); btn.textContent='复制'; }, 2000); }
  }
  track('export_copy');
}

const FORBIDDEN_WORDS = [
  // 绝对化用语
  '最好','最佳','最优','第一','NO.1','TOP1','唯一','独一无二','顶级','最高级','极品',
  '全网最低价','世界级','国家级','万能','百分百','100%有效','100%','最好用',
  '全网第一','行业第一','史上第一','最强','最便宜','最先进','最大',
  // 权威虚假宣称
  '央视推荐','CCTV认证','国家认证','政府推荐','官方指定',
  '明星同款','获奖产品',
  // 功效承诺
  '立竿见影','立即见效','根治','治愈','治疗','药到病除','一针见效',
  '包治百病','保证见效','无效退款','一盒见效','三天瘦','7天美白',
  '祛痘','祛斑','美白','瘦身','减肥','抗衰老','逆龄','药妆',
  '增高','丰胸','壮阳',
  // 收益诱导
  '稳赚不赔','保本保息','立马升值','月入过万','零风险','收益保障',
  '数字货币','炒币',
  // 诱导互动（严控）
  '不点赞就划走','不赞不是中国人','不转发倒霉','转发3个群',
  '评论区打"1"','扣1送','关注才能看','点关注领福利',
  // 引流
  '加微信','加QQ','扫码加','二维码',
  // 迷信
  '旺宅','辟邪','逢凶化吉','转运','招财','开光','保平安',
  // 价格欺诈
  '秒杀','最后一件','不买就亏了','错过等一年',
  // 虚假数据
  '销量第一','全网销冠','99%好评率','百万用户选择',
  // 医疗暗示
  '消炎','抗炎','杀菌','抗菌','灭菌','脱敏','抗敏','排毒','解毒',
  '处方级','医用级','手术级效果',
  // 金融
  '保本','理财课程','财商教育',
];

function checkForbiddenWords(text) {
  var found = [];
  var lower = text.toLowerCase();
  FORBIDDEN_WORDS.forEach(function(w) {
    if (lower.indexOf(w.toLowerCase()) !== -1) {
      found.push(w);
    }
  });
  return found;
}

function checkPublishForm(pageId) {
  var inputs = document.querySelectorAll('#page-' + pageId + ' input[type=text], #page-' + pageId + ' textarea, #page-' + pageId + ' select');
  var allText = '';
  var checklist = [];
  inputs.forEach(function(el) {
    if (el.tagName === 'SELECT' && el.value) allText += ' ' + el.options[el.selectedIndex].text;
    else if (el.value) allText += ' ' + el.value;
  });
  // 1. 违禁词检测
  var fw = checkForbiddenWords(allText);
  var fwEl = document.getElementById(pageId + '-fw-warn');
  var fwClean = document.getElementById(pageId + '-fw-clean');
  if (fwEl && fwClean) {
    if (fw.length > 0) {
      fwEl.classList.add('show');
      fwEl.querySelector('ul').innerHTML = fw.map(function(w) { return '<li><b>' + esc(w) + '</b> — 建议替换或删除</li>'; }).join('');
      fwClean.classList.remove('show');
    } else {
      fwEl.classList.remove('show');
      fwClean.classList.add('show');
    }
  }
  // 2. 表单完整性检查
  var allFilled = true;
  inputs.forEach(function(el) {
    if (el.tagName !== 'SELECT' && el.hasAttribute('required') && !el.value.trim()) allFilled = false;
  });
  // 3. 更新检查清单UI
  renderChecklist(pageId, {
    noFw: fw.length === 0,
    allFilled: allFilled,
    hasHook: checkHasHook(allText),
    hasCollect: checkHasCollect(allText),
    hasKeyword: checkHasKeyword(allText),
  });
}

function checkHasHook(text) {
  var hooks = ['你知道吗','教你','干货','分享一个','别再','千万不要','竟然','原来','终于','实测','揭秘','避坑','攻略','怎么选','怎么用','该不该','值不值',
    '注意','记住','关键','秘密','省钱','免费','白交','亏了','划算','为什么','？','!','别买','先别','等等','不会','没人','骗','真相','99%','90%','80%','一半'];
  return hooks.some(function(h) { return text.indexOf(h) !== -1; });
}

function checkHasCollect(text) {
  var collects = ['截图保存','收藏','先收藏','转发给','告诉','记得','避坑','对','错','怎么选','vs','对比','指南'];
  return collects.some(function(c) { return text.indexOf(c) !== -1; });
}

function checkHasKeyword(text) {
  return text.length > 10 && (text.indexOf('宽带') !== -1 || text.indexOf('套餐') !== -1 || text.indexOf('电信') !== -1 || text.indexOf('WiFi') !== -1 || text.indexOf('路由器') !== -1 || text.indexOf('信号') !== -1 || text.indexOf('流量') !== -1);
}

function renderChecklist(pageId, results) {
  var el = document.getElementById(pageId + '-checklist');
  if (!el) return;
  // 2026-07-20: 精简为 2 项（钩子/收藏诱饵/关键词已被评分条覆盖）
  var items = [
    {label:'无违禁词', hint:'绝对化用语、功效承诺、诱导互动等零出现', pass:results.noFw, icon:results.noFw?'✅':'❌'},
    {label:'表单已填完', hint:'所有必填项都有内容', pass:results.allFilled, icon:results.allFilled?'✅':'⚠️'}
  ];
  el.innerHTML = '<h3>📋 发布前检查清单</h3>' + items.map(function(item) {
    var cls = item.pass ? 'pass' : (item.icon === '❌' ? 'fail' : 'warn');
    return '<div class="checklist-item ' + cls + '"><span class="check-icon">' + item.icon + '</span><div class="check-text"><div>' + item.label + '</div><div class="check-hint">' + item.hint + '</div></div></div>';
  }).join('');
  // Track checklist results
  track('checklist_' + (results.noFw ? 'pass' : 'fail'), pageId);
  if (!results.noFw) track('fw_detected', pageId);
}

// 2026-07-20: 脚本评分（钩子力/信任力/转化力）
function scoreScript(scriptText) {
  if (!scriptText) return { hook: 0, trust: 0, conv: 0, total: 0 };
  var hookStarters = /^(你|大家|兄弟们|宝子|家人们|还在|不会|想|知道吗|说真的|说实话|我|这|一|上个月|昨天|今天)/;
  var hookPunct = /[？?！!]/;
  var trustKw = /(官方|正规|专业|免费|无忧|上门|营业厅|本地|靠谱|放心|安心|透明|24小时|老用户|电信|师傅|店员|小王|阿姨|王姐)/g;
  var priceKw = /(\d+\s*元|\d+\s*兆|\d+\s*M|免费|0\s*元|9\.9|19|59|99|169|套餐|月租|年付|返|补贴)/g;
  var ctaKw = /(扣\d|评论|私信|点击|预约|来店|到店|链接|扫码|关注|截图|保存|转发|主页|小红|群)/g;
  var hookScore = (hookStarters.test(scriptText.trim()) ? 50 : 30) + (hookPunct.test(scriptText) ? 30 : 10);
  var trustScore = Math.min(100, (scriptText.match(trustKw) || []).length * 22 + 30);
  var priceScore = Math.min(100, (scriptText.match(priceKw) || []).length * 25 + 20);
  var ctaScore = Math.min(100, (scriptText.match(ctaKw) || []).length * 18 + 20);
  var convScore = Math.round((priceScore + ctaScore) / 2);
  return {
    hook: Math.min(100, hookScore),
    trust: trustScore,
    conv: convScore,
    total: Math.round((hookScore + trustScore + convScore) / 3)
  };
}

// 2026-07-20: 记忆库命中（痛点/信任/价格/CTA 关键词覆盖度）
function matchMemoryBank(scriptText) {
  if (!scriptText) return { total: 0, pct: 0, hits: [] };
  var PAIN = ['卡顿', '慢', '贵', '坑', '骗', '亏', '不会', '难', '信号', '排队', '掉线', '网速', '差', '换', '升级', '怕', '烦恼'];
  var TRUST = ['官方', '营业厅', '上门', '免费', '老用户', '专业', '透明', '无隐形', '电信', '师傅'];
  var PRICE = ['元', '兆', 'M', '块', '免费', '套餐', '月租', '年付', '返', '补贴'];
  var CTA = ['扣', '评论', '私信', '到店', '预约', '链接', '扫码', '关注', '截图', '保存', '转发'];
  function matchOne(arr, label) { return arr.filter(function(k){ return scriptText.indexOf(k) >= 0; }).map(function(k){ return {tag:k, label:label}; }); }
  var hits = matchOne(PAIN, '痛点').concat(matchOne(TRUST, '信任')).concat(matchOne(PRICE, '价格')).concat(matchOne(CTA, 'CTA'));
  var TOTAL = PAIN.length + TRUST.length + PRICE.length + CTA.length;
  return {
    total: hits.length,
    pct: Math.round(hits.length / TOTAL * 100),
    hits: hits,
    summary: {
      pain: hits.filter(function(h){ return h.label === '痛点'; }).length,
      trust: hits.filter(function(h){ return h.label === '信任'; }).length,
      price: hits.filter(function(h){ return h.label === '价格'; }).length,
      cta: hits.filter(function(h){ return h.label === 'CTA'; }).length
    }
  };
}

window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

var ADMIN_PASSWORD = 'admin2026';

var STATS_KEY = 'douyin_lab_stats';

var statsPeriod = 'week';

function loadStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || '{"events":[]}'); }
  catch(e) { return { events: [] }; }
}

function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

function track(action, detail) {
  var s = loadStats();
  var entry = { ts: Date.now(), action: action, detail: detail || '' };
  // Auto-attach bound store if available
  var store = localStorage.getItem('douyin_lab_bound_store');
  if (store) entry.store = store;
  s.events.push(entry);
  // Keep max 5000 events to avoid localStorage overflow
  if (s.events.length > 5000) s.events = s.events.slice(-4000);
  saveStats(s);
}

function unlockAdmin() {
  var pw = prompt('请输入管理员密码：');
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem('douyin_admin', '1');
    document.getElementById('adminLock').textContent = '🔓';
    document.getElementById('adminLock').style.opacity = '1';
    showStatsTab();
    toast('管理员已解锁', 'success');
  } else if (pw !== null) {
    toast('密码错误', 'error');
  }
}

function showStatsTab() {
  var tab = document.getElementById('nav-stats');
  if (tab) tab.style.display = '';
}

function isAdmin() {
  return sessionStorage.getItem('douyin_admin') === '1';
}

(function() {
  if (isAdmin()) {
    document.getElementById('adminLock').textContent = '🔓';
    document.getElementById('adminLock').style.opacity = '1';
    showStatsTab();
  }
})();

function switchStatsPeriod(p, el) {
  statsPeriod = p;
  document.querySelectorAll('#page-stats .bank-filter').forEach(function(b) { b.classList.remove('active'); });
  if (el) el.classList.add('active');
  renderStats();
}

var origSwitchPage = switchPage;

switchPage = function(name, el, noPush) {
  // Track page visit (only for content pages, not internal routing)
  if (name !== currentPage) track('page_' + name);
  if (name === 'stats') setTimeout(renderStats, 50);
  var result = origSwitchPage(name, el, noPush);
  // Auto-fill store after page switch (slight delay for DOM to settle)
  setTimeout(autoFillStore, 80);
  return result;
};

var STORE_KEY = 'douyin_lab_bound_store';

function bindStore() {
  var input = document.getElementById('storeInput');
  if (!input) return;
  var name = (input.value || '').trim();
  if (!name) { toast('请输入营业厅名称'); return; }
  var persona = getPersona(); // already saved from selector
  localStorage.setItem(STORE_KEY, JSON.stringify({ name: name, persona: persona }));
  showBoundStore(name, persona);
  autoFillStore();
  toast('已绑定：' + name + ' · ' + (personaDB[persona]||{}).label, 'success');
  track('store_bind');
}

function showBoundStore(name, persona) {
  var badge = document.getElementById('storeBadge');
  var prompt = document.getElementById('storePrompt');
  var nameEl = document.getElementById('storeNameDisplay');
  if (nameEl) nameEl.textContent = (name || '') + ' · ' + ((personaDB[persona||getPersona()]||{}).icon||'') + ((personaDB[persona||getPersona()]||{}).label||'');
  if (badge) badge.style.display = '';
  if (prompt) prompt.style.display = 'none';
}

function changeStore() {
  if (!confirm('更换绑定的营业厅？')) return;
  localStorage.removeItem(STORE_KEY);
  var badge = document.getElementById('storeBadge');
  var prompt = document.getElementById('storePrompt');
  var input = document.getElementById('storeInput');
  if (badge) badge.style.display = 'none';
  if (prompt) prompt.style.display = '';
  if (input) { input.value = ''; input.focus(); }
}

function readStoreName() {
  var raw = localStorage.getItem(STORE_KEY);
  if (!raw) return '';
  try { var obj = JSON.parse(raw); return (obj && obj.name) || ''; } catch(e) { return raw; }
}

function autoFillStore() {
  var name = readStoreName();
  if (!name) return;
  // City fields: extract city from store name (e.g. "太原迎泽区柳巷..." → "太原")
  var cityMatch = name.match(/^([^\s区县]+)/);
  var city = cityMatch ? cityMatch[1] : name;
  // Extract district & landmark for t4
  var districtMatch = name.match(/([^\s]+?区)/);
  var landmarkMatch = name.match(/[区县]([^\s]+?(?:路|街|巷|里|坊|广场|大厦|中心))/);
  var district = districtMatch ? districtMatch[1] : '';
  var landmark = landmarkMatch ? landmarkMatch[1] : '';
  // Template 1: t1_city
  var t1c = document.getElementById('t1_city');
  if (t1c && !t1c.value) t1c.value = city;
  // Template 2: t2_city
  var t2c = document.getElementById('t2_city');
  if (t2c && !t2c.value) t2c.value = city;
  // Template 3: t3_city
  var t3c = document.getElementById('t3_city');
  if (t3c && !t3c.value) t3c.value = city;
  // Template 4: t4_city, t4_landmark, t4_shop, t4_addr
  var t4c = document.getElementById('t4_city');
  if (t4c && !t4c.value) t4c.value = city;
  var t4s = document.getElementById('t4_shop');
  if (t4s && !t4s.value) t4s.value = name;
  var t4l = document.getElementById('t4_landmark');
  if (t4l && !t4l.value && landmark) t4l.value = landmark;
  var t4a = document.getElementById('t4_addr');
  if (t4a && !t4a.value) t4a.value = city + (district || '') + (landmark || '') + '（请补充详细地址）';
  // Live: lv_store
  var lvs = document.getElementById('lv_store');
  if (lvs && !lvs.value) lvs.value = name;
}

(function(){
  var saved = localStorage.getItem(STORE_KEY);
  if (saved) {
    try {
      var obj = JSON.parse(saved);
      showBoundStore(obj.name, obj.persona);
    } catch(e) {
      showBoundStore(saved);
    }
    // Defer autoFill to let DOM settle
    setTimeout(autoFillStore, 300);
  } else {
    var prompt = document.getElementById('storePrompt');
    if (prompt) prompt.style.display = '';
  }
})();

function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  const fmt = d => `${d.getMonth()+1}/${d.getDate()}`;
  return { monday, sunday: friday, friday, label: `${fmt(monday)}-${fmt(friday)}`, mLabel: `${monday.getMonth()+1}月${monday.getDate()}日` };
}

const week = getWeekRange();

document.getElementById('weekLabel').textContent = `📅 本周：${week.label}`;

const _wr = document.getElementById('weekRange');

if (_wr) _wr.textContent = week.label;

let bgmAudio = null;

let bgmCurrentId = '';

function toggleBGM(id) {
  const sel = document.getElementById(id);
  if (!sel || !sel.value) return;
  const btn = document.querySelector('.bgm-btn-' + id);
  // If same BGM is playing, stop it
  if (bgmCurrentId === id && bgmAudio && !bgmAudio.paused) {
    bgmAudio.pause();
    if (btn) btn.classList.remove('playing');
    bgmCurrentId = '';
    return;
  }
  // Stop any previous playback
  if (bgmAudio) { bgmAudio.pause(); bgmAudio = null; }
  document.querySelectorAll('.bgm-play-btn').forEach(b => b.classList.remove('playing'));
  // Build a search URL for preview (search on Douyin for videos using this BGM)
  const song = encodeURIComponent(sel.value.split(' - ')[0] || sel.value);
  const url = 'https://www.douyin.com/search/' + song + '?type=general';
  if (btn) btn.classList.add('playing');
  bgmCurrentId = id;
  // Open preview in new tab (browsers block autoplay without user gesture)
  const w = window.open(url, 'bgm_preview', 'width=500,height=600');
  if (!w) {
    alert('🎵 已打开抖音搜索"' + sel.value + '"的热门视频。如被拦截，请允许弹窗或手动搜索。');
  }
  // Stop playing animation after a few seconds
  setTimeout(() => {
    if (btn) btn.classList.remove('playing');
    bgmCurrentId = '';
  }, 3000);
}

function injectBGMButtons() {
  // Add play buttons to all BGM select elements
  document.querySelectorAll('select[id$="_bgm"]').forEach(sel => {
    if (sel.parentElement.querySelector('.bgm-play-btn')) return; // Already injected
    const btn = document.createElement('button');
    btn.className = 'bgm-play-btn bgm-btn-' + sel.id;
    btn.innerHTML = '▶';
    btn.title = '试听BGM';
    btn.setAttribute('aria-label', '试听BGM：' + (sel.options[sel.selectedIndex]?.text || ''));
    btn.onclick = function(e) { e.preventDefault(); toggleBGM(sel.id); };
    sel.parentElement.appendChild(btn);
  });
}

let currentPage = 'schedule';

const pageHistory = ['schedule'];

function switchPage(name, el, noPush) {
  // Save current template form before leaving
  saveTemplateForm(currentPage);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const pageEl = document.getElementById('page-' + name);
  if (pageEl) pageEl.classList.add('active');
  // Get the clicked element — el is always passed from onclick, no fallback needed
  const tab = el;
  if (tab) tab.classList.add('active');
  // Track current context for topic bank auto-filter
  const typeMap = { 'template1': 0, 'template2': 1, 'template3': 2, 'template4': 3 };
  currentTab = typeMap[name] !== undefined ? typeMap[name] : -1;
  // If switching to topic bank, auto-filter by current context
  if (name === 'bank' && currentTab >= 0) {
    bankFilter = 'context';
    buildTopicBank();
    updateBankFilterButtons();
  }
  // Re-inject BGM buttons in case they were cleared
  setTimeout(injectBGMButtons, 100);
  // Mobile: auto-collapse nav after selecting a page
  var nav = document.querySelector('.nav-tabs');
  var ham = document.getElementById('hamburgerBtn');
  if (nav && ham && !nav.classList.contains('nav-collapsed') && window.innerWidth <= 640) {
    nav.classList.add('nav-collapsed');
    ham.innerHTML = '☰ 展开全部菜单';
  }
  // Inject weekly recommendation banner
  injectWeeklyBanner(name);
  // Push to browser history (except for initial load)
  if (!noPush && name !== currentPage) {
    pageHistory.push(name);
    currentPage = name;
    history.pushState({ page: name, historyIndex: pageHistory.length - 1 }, '', '#' + name);
  }
  // Restore form data for the new template page
  setTimeout(function() { restoreTemplateForm(name); }, 50);
}

window.addEventListener('popstate', function(e) {
  if (e.state && e.state.page) {
    var pageId = e.state.page;
    switchPage(pageId, document.querySelector('.nav-tab[onclick*=' + pageId + ']'), true);
    currentPage = pageId;
  } else {
    var btn = document.querySelector('.nav-tab[onclick*=schedule]');
    switchPage('schedule', btn, true);
    currentPage = 'schedule';
  }
});

(function() {
  try {
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById('page-' + hash)) {
      switchPage(hash, null, true);
      currentPage = hash;
      if (hash !== 'schedule') {
        // Ensure browser back always lands on schedule page
        // replaceState: set current entry as #schedule base
        // pushState: push #hash on top → history = [schedule, hash] → back works
        try { history.replaceState({ page: 'schedule', historyIndex: 0 }, '', '#schedule'); } catch(e) {}
        try { history.pushState({ page: hash, historyIndex: 1 }, '', '#' + hash); } catch(e) {}
        pageHistory.length = 0;
        pageHistory.push('schedule', hash);
      } else {
        try { history.replaceState({ page: 'schedule', historyIndex: 0 }, '', '#schedule'); } catch(e) {}
      }
    } else {
      try { history.replaceState({ page: 'schedule', historyIndex: 0 }, '', '#schedule'); } catch(e) {}
    }
  } catch(e) { /* Never let routing fail block the rest of init */ }
})();

const typeColors = { '口播脚本': 'type-guide', '故事脚本': 'type-scene', '产品测评': 'type-review', '同城活动': 'type-local', '自由选题': 'type-flex', '灵活选题': 'type-flex' };

const typeIcons = { '口播脚本': '💬', '故事脚本': '📖', '产品测评': '🔬', '同城活动': '🏠', '自由选题': '🎯', '灵活选题': '🎯' };

const WEEK_ZERO = new Date(2026, 0, 5);

const currentWeekNum = Math.floor((new Date() - WEEK_ZERO) / (7*24*60*60*1000)) + 1;

const topicPool = (function() {
  try { if (window.___topicPool) return window.___topicPool; } catch(e) {}
  return { decision: [], scene: [], review: [], local: [] };
})();

const t1Presets = (function() {
  try { if (window.___t1Presets) return window.___t1Presets; } catch(e) {}
  return window.___t1Presets || {};
})();

const phonePool = (function() {
  try { if (window.___phonePool) return window.___phonePool; } catch(e) {}
  return window.___phonePool || [];
})();

function pickFromPool(pool, offset) {
  if (!pool || !pool.length) return '暂无选题，请等待数据更新';
  return pool[(currentWeekNum + offset - 1) % pool.length];
}

function toggleSchedule() {
  var grid = document.getElementById('scheduleGrid');
  var icon = document.getElementById('scheduleTabIcon');
  if (!grid) return;
  if (grid.style.display === 'none') {
    grid.style.display = '';
    if (icon) icon.textContent = '▼';
  } else {
    grid.style.display = 'none';
    if (icon) icon.textContent = '▶';
  }
}

function getTopicMeta(topic, typeIdx) {
  const text = topic.toLowerCase();
  let people = 1, needFace = true, quickTime = false;
  if (typeIdx === 0) {
    people = 1; needFace = false; quickTime = false;
  } else if (typeIdx === 1) {
    people = 1; needFace = true; quickTime = text.includes('实录') || text.includes('一句话');
  } else if (typeIdx === 2) {
    people = 1; needFace = false; quickTime = false;
  } else if (typeIdx === 3) {
    people = 1; needFace = true; quickTime = true;
  }
  return { people, needFace, quickTime, badges: getTopicBadges(topic) };
}

function getTopicBadges(topic) {
  const badges = [];
  // Hot topics: current events, trending keywords
  const hotKW = ['618', '高考', '暑假', '暑期', '考生', '世界杯', '五一', '十一', '春节', '双11', '毕业季', '中考'];
  if (hotKW.some(k => topic.includes(k))) badges.push({text: '🔥热点', cls: 'badge-hot'});
  // New topics: recently added (matches our 12 new additions)
  const newKW = ['世界杯看球', '毕业季大学生', '世界杯期间', '毕业季营业厅', '毕业季学生', '暑假装机', '世界杯看球路由', '暑期出游拍照', '毕业季换手机', '世界杯期间电信', '毕业生凭学生证', '暑假电信', '中考考场'];
  if (newKW.some(k => topic.includes(k))) badges.push({text: '🆕新题', cls: 'badge-new'});
  // Classic evergreen topics
  const classicKW = ['宽带选多少兆', '套餐横向对比', '指示灯', '避坑', '怎么选', '值不值', '光猫', '路由器', '指南', '图解'];
  if (classicKW.some(k => topic.includes(k)) && !badges.length) badges.push({text: '⭐经典', cls: 'badge-classic'});
  // Seasonal topics
  const seasonalKW = ['暑假', '寒假', '除夕', '春节', '高考', '开学', '618', '双11', '五一', '国庆', '节日', '毕业季', '中考', '世界杯'];
  if (seasonalKW.some(k => topic.includes(k))) badges.push({text: '📅应季', cls: 'badge-seasonal'});
  return badges;
}

let bankFilter = 'all';

let currentTab = -1;

function copyPanelText(panelId, mode) {
  var panel = document.getElementById(panelId);
  if (!panel) return;
  var text = '';
  if (mode === 'clean') {
    // 仅提取台词内容：.stage 标题 + .dialogue / [data-role] 台词，过滤 action-note 和 info-tag
    var parts = [];
    var children = panel.querySelectorAll('.stage, .dialogue, [data-role="hook"], [data-role="script-body"], [data-role="cta"]');
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.className === 'stage' && /口播脚本|拍摄指南|一镜到底/.test(el.textContent)) continue;
      var t = (el.textContent || '').trim();
      if (t) {
        // 剥掉 data-role 容器的标签文字（"💫 甜美学姐 开口：" 等）
        t = t.replace(/^[^\u4e00-\u9fff"]*[：:]/, '').replace(/^[📖🎯💫]+\s*[^：:]*[：:]/, '').trim();
        parts.push(t);
      }
    }
    text = parts.join('\n');
  } else {
    // 全文模式
    text = panel.textContent || panel.innerText || '';
  }
  var btn = mode === 'clean' ? panel.querySelector('.copy-clean-btn') : panel.querySelector('.copy-script-btn');
  navigator.clipboard.writeText(text).then(function() {
    if (btn) { var orig = btn.innerHTML; btn.innerHTML = '✅ 已复制！'; setTimeout(function(){ btn.innerHTML = orig; }, 1500); }
    if (typeof track === 'function') track('copy_script_' + panelId);
  }).catch(function() {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    if (btn) { var orig = btn.innerHTML; btn.innerHTML = '✅ 已复制！'; setTimeout(function(){ btn.innerHTML = orig; }, 1500); }
  });
}

function findPhoneByName(name) {
  if (!name) return null;
  var pool = window.___phonePool || phonePool || [];
  // v2.7: 去掉下拉选里的 "(8G+256G)" 后缀，因为下拉选value含 storage 但 phonePool.brand+model 不含
  var cleanName = String(name).replace(/\s*\([^)]+\)\s*$/, '').trim();
  for (var i = 0; i < pool.length; i++) {
    var p = pool[i];
    if (p.model === cleanName || p.model === name) return p;
    if (p.brand && (p.brand + ' ' + p.model === cleanName || p.brand + ' ' + p.model === name)) return p;
  }
  return null;
}

function initT3DeviceOptions() {
  var og = document.getElementById('t3_phone_optgroup');
  if (!og) return;
  var pool = window.___phonePool || phonePool || [];
  if (!pool || !pool.length) return;
  var html = '';
  var brands = {};
  for (var i = 0; i < pool.length; i++) {
    var p = pool[i];
    var brand = p.brand || p.model.split(' ')[0];
    if (!brands[brand]) { brands[brand] = []; }
    brands[brand].push(p);
  }
  var brandKeys = Object.keys(brands).sort();
  for (var bi = 0; bi < brandKeys.length; bi++) {
    var bk = brandKeys[bi];
    var models = brands[bk];
    html += '<optgroup label="' + bk + '">';
    for (var mi = 0; mi < models.length; mi++) {
      var m = models[mi];
      var displayName = m.brand ? (m.brand + ' ' + m.model) : m.model;
      if (m.storage) displayName += ' (' + m.storage + ')';
      html += '<option value="' + displayName + '">' + displayName + ' ¥' + (m.guidePrice || m.price || '') + (m.isCore ? ' ★' : '') + '</option>';
    }
    html += '</optgroup>';
  }
  og.insertAdjacentHTML('afterend', html);
  og.remove();
}

function addCopyButton(panelId) {
  var panel = document.getElementById(panelId);
  if (!panel) return;
  var existing = panel.querySelector('.copy-script-wrap');
  if (existing) existing.remove();
  var wrap = document.createElement('div');
  wrap.className = 'copy-script-wrap';
  wrap.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;margin-bottom:10px;';
  // 仅台词按钮（默认主推）
  var cleanBtn = document.createElement('button');
  cleanBtn.className = 'copy-clean-btn';
  cleanBtn.style.cssText = 'padding:6px 14px;background:#008A5C;color:#fff;border:none;border-radius:6px 0 0 6px;cursor:pointer;font-size:13px;font-weight:600;';
  cleanBtn.innerHTML = '📋 复制台词';
  cleanBtn.onclick = function() { copyPanelText(panelId, 'clean'); };
  // 全文按钮
  var fullBtn = document.createElement('button');
  fullBtn.className = 'copy-script-btn';
  fullBtn.style.cssText = 'padding:6px 14px;background:#0052CC;color:#fff;border:none;border-radius:0 6px 6px 0;cursor:pointer;font-size:13px;font-weight:600;';
  fullBtn.innerHTML = '全文';
  fullBtn.onclick = function() { copyPanelText(panelId, 'full'); };
  wrap.appendChild(cleanBtn);
  wrap.appendChild(fullBtn);
  panel.insertBefore(wrap, panel.firstChild);
}

const t2Presets = (function() {
  try { if (window.___t2Presets) return window.___t2Presets; } catch(e) {}
  return window.___t2Presets || {};
})();

const techDB = (function() {
  try { if (window.___techDB) return window.___techDB; } catch(e) {}
  return window.___techDB || {};
})();

const t4Presets = (function() {
  try { if (window.___t4Presets) return window.___t4Presets; } catch(e) {}
  return window.___t4Presets || {};
})();

function downloadAsImage(previewId) {
  const el = document.getElementById(previewId);
  if (el.style.display === 'none') { alert('请先生成预览脚本！'); return; }
  // Create a clean printable card
  const card = document.createElement('div');
  card.style.cssText = 'padding:40px;background:#1a1a2e;color:#e0e0e0;font-family:"Microsoft YaHei",sans-serif;font-size:14px;line-height:2;max-width:680px;width:100%;min-height:500px;border-radius:12px;';
  card.innerHTML = `
    <div style="font-size:11px;color:#999;margin-bottom:16px;">山西电信抖本内容工坊 | ${week.label}</div>
    ${el.innerHTML}
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:#666;">
      📋 填空即拍 | 前3秒必须有人+大字 | 中段有值得收藏的信息 | 结尾抛讨论问题
    </div>`;
  document.body.appendChild(card);
  // Use html2canvas if available, otherwise offer print
  if (typeof html2canvas !== 'undefined') {
    html2canvas(card, { backgroundColor: '#1a1a2e', scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = '脚本_' + sanitizeFilename(previewId) + '_' + sanitizeFilename(week.label) + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      document.body.removeChild(card);
    });
  } else {
    // Fallback: open print window
    const w = window.open('', '_blank');
    if (!w) { toast('弹窗被阻止，请允许弹窗后重试', 'error'); return; }
    w.document.write(`<html><head><title>脚本卡</title><style>body{background:#1a1a2e;color:#e0e0e0;padding:20px;font-family:"Microsoft YaHei";line-height:2;}</style></head><body>${card.innerHTML}</body></html>`);
    w.document.close();
    track('export_image');
    setTimeout(() => { w.print(); document.body.removeChild(card); }, 500);
  }
}

function syncTopicDropdown() {
  if (!window.___topicPool) return;
  var pool = window.___topicPool;
  var sel = document.getElementById('t1_topic');
  if (!sel) return;
  // 2026-07-20: 过滤抖音禁止销售的单号卡类选题
  var banned = /学生套餐|老人手机套餐|手机卡套餐|套餐横向|5G套餐|4G套餐|流量不够用|流量包|加包|号卡|合约机|月租/;
  var topics = (pool.decision || []).filter(function(t) { return !banned.test(t); });
  topics = topics.slice(0, 24);
  var html = '';
  topics.forEach(function(t) {
    html += '<option value="' + esc(t) + '">' + esc(t) + '</option>';
  });
  if (html) { sel.innerHTML = html; try { labelDropdownOptions(); } catch(e) {} }
}

function checkDataFiles() {
  var map = {
    '___topicPool': '选题库', '___t1Presets': '决策指南预设', '___t2Presets': '一线场景预设',
    '___t4Presets': '本地事件预设', '___phonePool': '手机评测池', '___techDB': '技术知识库',
    '___hotspotData': '热点跟拍', '___bgmList': 'BGM推荐'
  };
  var missing = [];
  for (var k in map) { if (typeof window[k] === 'undefined') missing.push(map[k]); }
  var banner = document.getElementById('dataErrorBanner');
  if (missing.length > 0) {
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'dataErrorBanner';
      banner.style.cssText = 'background:#C62828;color:#fff;padding:10px 16px;text-align:center;font-size:14px;position:fixed;top:0;left:0;right:0;z-index:99999;line-height:1.5;';
      document.body.insertBefore(banner, document.body.firstChild);
    }
    banner.style.display = '';
    banner.innerHTML = '&#9888; 数据加载失败：' + missing.join('、') + '。请刷新页面重试，如持续出现请联系管理员。';
  } else if (banner) {
    banner.style.display = 'none';
  }
  return missing.length;
}

function labelDropdownOptions() {
  // T1 decision guide: label each option with its badge
  const t1sel = document.getElementById('t1_topic');
  if (t1sel) {
    for (let i = 0; i < t1sel.options.length; i++) {
      const opt = t1sel.options[i];
      const badges = getTopicBadges(opt.value);
      if (badges.length > 0) {
        const label = badges.map(b => b.text).join('');
        opt.textContent = opt.textContent.replace(/^[^\u4e00-\u9fa5\w]+/, '') + '  ' + label;
      }
    }
  }
  // T2 story presets: label with difficulty hints
  const t2sel = document.getElementById('t2_preset');
  if (t2sel) {
    const hints = {
      '上门维修': '⭐经典', '柜台服务': '⭐经典', '突发状况': '⚡快拍',
      '温暖瞬间': '⭐经典', '装机故事': '🆕新题', '老客户情谊': '💛走心'
    };
    for (let i = 0; i < t2sel.options.length; i++) {
      const opt = t2sel.options[i];
      if (hints[opt.value]) {
        opt.textContent += '  [' + hints[opt.value] + ']';
      }
    }
  }
  // T4 activity presets: label with usage hints
  const t4sel = document.getElementById('t4_preset');
  if (t4sel) {
    const hints = {
      '免费贴膜': '⭐人气最高', '免费测速': '🔍专业感', '办业务送礼': '🎁转化强',
      '以旧换新': '💎高客单', '手机清洁': '🧹零成本', '宽带体验': '🌐拉新客',
      '暑期特惠': '🔥应季', '社区服务': '🏘口碑'
    };
    for (let i = 0; i < t4sel.options.length; i++) {
      const opt = t4sel.options[i];
      if (hints[opt.value]) {
        opt.textContent += '  [' + hints[opt.value] + ']';
      }
    }
  }
}

document.querySelectorAll('input[id$="_city"]').forEach(el => {
  el.addEventListener('input', function() {
    const city = this.value;
    const pageNum = this.id.replace('t','').replace('_city','');
    const tagsEl = document.getElementById('t'+pageNum+'_tags');
    if (tagsEl && !tagsEl.value && city) {
      const defaults = {
        '1': `#${city}宽带 #宽带对比 #省钱攻略`,
        '4': `#${city} #同城发现`
      };
      tagsEl.value = defaults[pageNum] || '';
    }
  });
});

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    const map = { '1': 'schedule', '2': 'template1', '3': 'template2', '4': 'template3', '5': 'template4', '6': 'bank', '7': 'hotspot', '8': 'live', '9': 'history', '0': 'stats' };
    if (map[e.key]) { e.preventDefault(); var pageId = map[e.key]; switchPage(pageId, document.querySelector('.nav-tab[onclick*=' + pageId + ']')); }
    // Ctrl+Enter: trigger preview on current template page based on active mode
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      safeCall(function() {
      if (currentPage === 'template1') {
        if (document.getElementById('t1-mode-talk') && document.getElementById('t1-mode-talk').classList.contains('active')) previewT1Talk();
        else if (document.getElementById('t1-mode-card') && document.getElementById('t1-mode-card').classList.contains('active')) previewT1Card();
        else if (document.getElementById('t1-mode-calc') && document.getElementById('t1-mode-calc').classList.contains('active')) previewT1Calc();
      } else if (currentPage === 'template2') {
        if (document.getElementById('t2-mode-tell') && document.getElementById('t2-mode-tell').classList.contains('active')) previewT2Tell();
        else if (document.getElementById('t2-mode-doc') && document.getElementById('t2-mode-doc').classList.contains('active')) previewT2Doc();
        else if (document.getElementById('t2-mode-short') && document.getElementById('t2-mode-short').classList.contains('active')) previewT2Short();
      } else if (currentPage === 'template3') {
        if (document.getElementById('t3-mode-talk') && document.getElementById('t3-mode-talk').classList.contains('active')) previewT3Talk();
        else if (document.getElementById('t3-mode-silent') && document.getElementById('t3-mode-silent').classList.contains('active')) previewT3Silent();
      } else if (currentPage === 'template4') {
        if (document.getElementById('t4-mode-walk') && document.getElementById('t4-mode-walk').classList.contains('active')) previewT4Walk();
        else if (document.getElementById('t4-mode-mix') && document.getElementById('t4-mode-mix').classList.contains('active')) previewT4Mix();
        else if (document.getElementById('t4-mode-countdown') && document.getElementById('t4-mode-countdown').classList.contains('active')) previewT4Countdown();
      } else if (currentPage === 'live') {
        if (typeof previewLiveScript === 'function') previewLiveScript();
      }
      });
    }
  }
});

document.addEventListener('keydown', function(e) {
  if ((e.key === 'Enter' || e.key === ' ') && !e.ctrlKey && !e.metaKey && !e.altKey) {
    var el = document.activeElement;
    if (el && el.getAttribute('tabindex') === '0' && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT') {
      e.preventDefault();
      if (typeof el.click === 'function') el.click();
    }
  }
});

function saveTemplateForm(pageName) {
  var prefixMap = { template1: 't1', template2: 't2', template3: 't3', template4: 't4' };
  var pf = prefixMap[pageName];
  if (!pf) return;
  var data = {};
  document.querySelectorAll('#page-' + pageName + ' input, #page-' + pageName + ' textarea, #page-' + pageName + ' select').forEach(function(el) {
    if (el.id && el.id.indexOf(pf + '_') === 0) data[el.id] = el.value;
  });
  try { localStorage.setItem('douyin_lab_form_' + pf, JSON.stringify(data)); } catch(e) {}
}

function restoreTemplateForm(pageName) {
  var prefixMap = { template1: 't1', template2: 't2', template3: 't3', template4: 't4' };
  var pf = prefixMap[pageName];
  if (!pf) return;
  try {
    var data = JSON.parse(localStorage.getItem('douyin_lab_form_' + pf));
    if (!data) return;
    Object.keys(data).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = data[id];
    });
  } catch(e) {}
}

(function(){
  setTimeout(function() {
    var ids = ['lv_store','lv_product','lv_price','lv_date','lv_deadline','lv_tags','lv_bgm','lv_location','lv_highlight'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el) {
        el.addEventListener('input', saveLiveForm);
        el.addEventListener('change', saveLiveForm);
      }
    }
    setTimeout(restoreLiveForm, 300);
    updateLiveProductDesc();
  }, 500);

  // ═══ Periodic auto-save (every 30s) ═══
  setInterval(function() {
    if (currentPage && currentPage.indexOf('template') === 0) {
      saveTemplateForm(currentPage);
    }
  }, 30000);

  // Save on page unload (refresh/close)
  window.addEventListener('beforeunload', function() {
    if (currentPage && currentPage.indexOf('template') === 0) {
      saveTemplateForm(currentPage);
    }
    saveLiveForm();
  });
})();

(function() {
  var d = new Date();
  var dateStr = (d.getMonth()+1) + '月' + d.getDate() + '日';
  var el = document.getElementById('lv_date');
  if (el && !el.value) el.value = dateStr;
})();

var HOOK_TYPES = {
  conflict: { label: '⚡ 冲突型', desc: '制造对比/反差', examples: ['你家宽带199？那你可能白交了一半','这个免费服务90%的人不知道','2900的手机今天只要9块9？'] },
  value:    { label: '💰 价值型', desc: '直接告诉看这个有什么好处', examples: ['花3分钟看完，办宽带至少省300','学会这招WiFi速度翻倍','2026年最划算的宽带套餐清单'] },
  suspense: { label: '❓ 悬念型', desc: '说一半留一半', examples: ['我在电信营业厅干了5年，发现一个秘密','装宽带的师傅偷偷告诉我一件事','为什么懂行的人都选这种套餐？'] },
  empathy:  { label: '💬 共鸣型', desc: '说中用户痛处', examples: ['每次刷视频到关键地方就卡？我也是','月底流量告急的绝望，你懂吗','家里WiFi死角能逼疯人，我受不了了'] }
};

function injectHookSelector() {
  if (['template1','template2','template3','template4'].indexOf(currentPage) < 0) return;
  var templateMap = { template1: 't1', template2: 't2', template3: 't3', template4: 't4' };
  var t = templateMap[currentPage];
  if (!t) return;
  // Check if already injected IN THIS PAGE (use page-scoped ID)
  var hookId = 'hook_selector_' + t;
  if (document.getElementById(hookId)) return;
  // Find the mode-selector as insertion point, or first card
  var target = document.querySelector('#page-' + currentPage + ' .card');
  if (!target) return;
  var html = '<div id="' + hookId + '" style="margin:12px 0;padding:12px;background:#FFF8E1;border-radius:8px;border:1px solid #FFB74D;">';
  html += '<div style="font-weight:700;font-size:14px;margin-bottom:8px;">🎯 黄金3秒钩子 <span style="font-size:11px;color:#E65100;font-weight:400;">— 开头第一句决定80%的完播率</span></div>';
  html += '<select id="' + t + '_hook_type" onchange="applyHook(\'' + t + '\')" style="padding:8px 12px;border:1px solid #FFB74D;border-radius:6px;width:100%;font-size:14px;margin-bottom:8px;">';
  html += '<option value="">-- 选故事模板后自动匹配，也可手动改 --</option>';
  for (var k in HOOK_TYPES) {
    html += '<option value="' + k + '">' + HOOK_TYPES[k].label + ' — ' + HOOK_TYPES[k].desc + '</option>';
  }
  html += '</select>';
  html += '<input id="' + t + '_hook_text" placeholder="钩子台词会自动填充，也可以自己改" style="width:100%;padding:8px;border:1px dashed #FFB74D;border-radius:6px;font-size:13px;display:none;" oninput="triggerCheck(\'' + t + '\')">';
  html += '</div>';
  // For T2: insert after story template; For others: insert after mode-selector
  if (currentPage === 'template2') {
    var presetContainer = document.getElementById('t2_preset').parentNode;
    if (presetContainer) {
      presetContainer.insertAdjacentHTML('afterend', html);
      var hEl = document.getElementById(hookId);
      if (hEl) { hEl.style.opacity = '0.6'; hEl.style.background = '#fafafa'; hEl.style.borderColor = '#ddd'; }
      return;
    }
  }
  // Default: insert at card top
  target.insertAdjacentHTML('afterbegin', html);
}

function applyHook(t) {
  var typeEl = document.getElementById(t + '_hook_type');
  var textEl = document.getElementById(t + '_hook_text');
  if (!typeEl || !textEl) return;
  var type = typeEl.value;
  if (!type) { textEl.style.display = 'none'; triggerCheck(t); return; }
  // Generate rich context-aware hooks based on template type + hook type
  var hooks = generateContextHooks(t, type);
  var hook = hooks[Math.floor(Math.random() * hooks.length)];
  textEl.style.display = 'block';
  textEl.value = hook;
  textEl.style.borderColor = '#008A5C';
  textEl.style.background = '#F0FFF4';
  setTimeout(function() { textEl.style.borderColor = '#FFB74D'; textEl.style.background = '#fff'; }, 1500);
  // Also trigger the publish checklist refresh
  triggerCheck(t);
}

function triggerCheck(t) {
  var map = { t1: 'template1', t2: 'template2', t3: 'template3', t4: 'template4' };
  var pageId = map[t];
  if (pageId) checkPublishForm(pageId);
}

function generateContextHooks(t, type) {
  var topic = '';
  var device = '';
  var city = '';
  var problem = '';
  try { city = (document.getElementById(t + '_city') || {}).value || '本地'; } catch(e) {}
  try { topic = (document.getElementById(t + '_topic') || {}).value || ''; } catch(e) {}
  try { device = (document.getElementById('t3_device') || {}).value || '设备'; } catch(e) {}
  try { problem = (document.getElementById('t2_problem') || {}).value || ''; } catch(e) {}
  // ===== T1: Oral Script (口播脚本) — context-aware =====
  if (t === 't1') {
    var tp = topic || '';
    var isCard = /手机卡|副卡|号卡|流量卡|电话卡/i.test(tp);
    var isBroadband = /宽带|兆|网速|路由|WiFi|光猫|网线|mesh/i.test(tp);
    var isPorting = /携号转网|转网|换运营商|不换号/i.test(tp);
    var isPlan = /套餐|资费|月租/i.test(tp);
    var subject = isCard ? '电话卡套餐' : isPorting ? '携号转网' : isPlan ? '套餐' : '宽带';
    var unit = isCard ? '话费' : '宽带费';
    var pain = isCard ? '话费越用越多' : isBroadband ? '网速慢还贵' : '钱花得不明不白';
    var save = isCard ? '电话费' : isBroadband ? '宽带费' : '冤枉钱';
    if (type === 'conflict') return [
      '你的' + subject + '一个月多少钱？看完这条你可能会去找客服',
      '同一个' + subject + '，有人交99有人交199，你是哪一个？',
      '别再被' + subject + '坑了！教你一眼看出哪个是真划算'
    ];
    if (type === 'value') return [
      '花3分钟看完，办' + subject + '至少省300块——内部员工才知道的',
      '2026年最全' + subject + '攻略，收藏这篇就够了',
      (city||'太原') + '人注意！来营业厅前先看这个，能少花冤枉钱'
    ];
    if (type === 'suspense') return [
      '我在电信营业厅干了5年，今天告诉你一个' + subject + '的秘密——',
      '90%的人办' + subject + '都多花了' + unit + '，你知道是哪吗？',
      '为什么懂行的人都选这个' + subject + '？看完你就明白了'
    ];
    if (type === 'empathy') return [
      pain + '？别急，其实有更好的办法',
      '每个月' + unit + '交了这么多，你算过到底值不值吗？',
      '是不是觉得' + unit + '越来越贵？今天帮你看一下'
    ];
  }
  // ===== T2: Story Script (故事脚本) =====
  if (t === 't2') {
    var preset = '';
    try { preset = document.getElementById('t2_preset').value; } catch(e) {}
    // Hooks matched to specific story templates
    var presetHooks = {
      '上门维修': { conflict: ['客户说网慢了3年，我一检查才发现根本不是宽带的问题','上门修个路由器，结果发现一个让所有人震惊的问题'], value: ['今天上门修宽带，发现80%的人家里都有这个坑','花30秒看完，你也能学会自己排查WiFi慢的原因'], suspense: ['这个路由器位置放错了3年，移动半米网速翻倍','修完宽带准备走，客户突然拉住我说了一句话——'], empathy: ['你家网是不是也一到晚上就卡？我帮你看看到底怎么回事','每次加载视频转圈的时候是不是想摔手机？问题不在手机'] },
      '装机故事': { conflict: ['老小区装个宽带这么难？你猜我最后怎么搞定的','搬新家最崩溃的不是搬家，而是没有网！'], value: ['新家装宽带别踩这3个坑，装维师傅的真心话','刚搬' + (city||'家') + '装宽带的看过来，这几点提前准备好省大事'], suspense: ['老楼的外墙走线把我都难住了，最后想到一个办法——','装完宽带测速，数值一出来客户傻眼了'], empathy: ['搬家的痛苦我都懂，至少宽带这件事可以帮你搞定','老小区装宽带不用愁，看看我们是怎么从外墙走线的'] },
      '柜台服务': { conflict: ['来营业厅缴费才发现——你的套餐可能3年没换过！','同样是办宽带，为什么你比别人多花钱？'], value: ['来营业厅顺便查了一下套餐，结果省了每月30块','每个人到店都应该做的第一件事：查套餐升级'], suspense: ['系统里跳出来一个红色提示，我一看客户的套餐——','查完这位小哥的套餐，我和他都沉默了'], empathy: ['是不是觉得话费越来越贵？今天来店我帮你看一下','每次月底流量告急的时候，是不是特想换个套餐？'] },
      '突发状况': { conflict: ['大爷冲进营业厅满头大汗：我孙子要上网课，快帮我！','手机突然没网了，一看原因大爷差点急哭'], value: ['流量突然没了先别慌，有3个急救办法','流量告急怎么办？教你临时救急的3个妙招'], suspense: ['大爷的手机余额只剩3毛钱——接下来发生的事','他拿着手机跑进来的时候，所有人都以为出大事了'], empathy: ['月底流量告急的绝望，这位大爷比我们都懂','家里老人流量总是不够用的，举手我看看'] },
      '投诉化解': { conflict: ['客户冲进来就拍桌子——宽带断了3次你们还不管？','报修说等48小时？客户直接冲到营业厅了！'], value: ['遇到宽带故障怎么办？教你先查3个地方再打电话','宽带突然断了别急着投诉，可能是你家的这个原因'], suspense: ['客户气冲冲来找我，但我查了一下后台数据——','他以为我是推脱，但我一查发现事情没那么简单'], empathy: ['宽带断了谁都着急，但冲动解决不了问题','被客户吼完我差点哭了——但我还是给他解决了问题'] },
      '温暖瞬间': { conflict: [''], value: ['今天营业厅发生了一件事，让我觉得这份工作很值得','帮一位阿姨做了件小事，她感动得不行'], suspense: ['帮老人连上视频通话后，她对着屏幕哭了——','一个简单的操作，让这对祖孙相隔千里终于见面'], empathy: ['你有多久没和家里人视频了？今天帮一位阿姨打给女儿','在外打工的人，看到这个阿姨的视频通话你也会想家'] },
      '银发服务': { conflict: ['智能手机对年轻人是工具，对老人是一座翻不过的山','今天花了1小时，只教会了李阿姨一件事'], value: ['帮银发族跨过数字鸿沟，我们营业厅每天都在做这件事','李阿姨半年没学会的事，今天来营业厅终于搞定了'], suspense: ['李阿姨掏出一个写满步骤的小本子——我看了差点哭出来','教了10遍微信视频，最后一次她自己打出去了'], empathy: ['你家老人会打微信视频吗？不会的话来营业厅，我手把手教','看到李阿姨学会发朋友圈那一刻，什么都值了'] },
      '数字课堂': { conflict: ['一位大爷说：上次差点被假冒客服骗走养老钱！','老人最怕的不是手机难学，是你根本不知道骗子在哪'], value: ['今天我们开课教老人防诈骗，这5种骗术一定要警惕','给家里有老人的必看！3分钟学会保护爸妈不被骗'], suspense: ['我问老人们最怕什么，答案不是学不会，而是——','一台投影仪、几个老人、一本手册，改变正在发生'], empathy: ['你爸妈接过冒充客服的诈骗电话吗？来看看这个','如果我不教你，你就可能成为下一个被骗的老人'] },
    };
    // Try preset-specific hooks first
    if (preset && presetHooks[preset] && presetHooks[preset][type] && presetHooks[preset][type].length > 1) {
      return presetHooks[preset][type];
    }
    // Fallback: context-aware hooks based on problem field
    var ctx = buildT2HookContext();
    if (type === 'conflict') return [
      ctx.scene + '，' + ctx.actor + '遇到了' + ctx.trouble + '——',
      ctx.scene + ctx.action + '，发现' + ctx.surprise
    ];
    if (type === 'value') return [
      ctx.scene + '，帮你省心省钱的' + ctx.tip + '分享给你',
      ctx.helpful || '花30秒看完，以后碰到这种事不再慌'
    ];
    if (type === 'suspense') return [
      ctx.scene + ctx.action + '，结果让我没想到的是——',
      ctx.actor + ctx.situation + '，最后' + (ctx.turn || '让我特别意外')
    ];
    if (type === 'empathy') return [
      ctx.scene + ctx.actor + '，我帮' + (ctx.pronoun || '他') + '做完之后' + ctx.ending,
      ctx.empathy || '你是不是也遇到过类似的情况？评论区说说'
    ];
  }
  // ===== T3: Product Review (产品测评) =====
  if (t === 't3') {
    var devName = device || '这款手机';
    var isPhone = !/光猫|路由|机顶盒|宽带|mesh|AP|接入点/i.test(device);
    var devType = isPhone ? '手机' : '设备';
    var devAct = isPhone ? '买' : '换';
    if (type === 'conflict') return [
      devName + '值不值？我先说缺点——但优点太强我忍了',
      '别被广告骗了！' + devName + '的真实体验和官网写的不一样',
      isPhone ? '2900块的手机和9900块的比，差距在哪？实测结果很意外' : '你家的' + devName + '该不该换？看完再决定'
    ];
    if (type === 'value') return [
      isPhone ? '花2分钟看完，买' + devName + '不踩坑——全干货无废话' : '花2分钟看完，选' + devName + '不踩坑——全干货无废话',
      devName + '的5个隐藏功能，90%的人都不知道',
      isPhone ? '准备换手机的先别买！看完这个真实续航测试再决定' : '准备换' + devName + '的先别急！看完这个实测再决定'
    ];
    if (type === 'suspense') return [
      '我测了7天' + devName + '，最后发现一个问题——',
      devName + '最让我意外的不是相机，不是外观，而是——',
      isPhone ? '信号/续航/发热，' + devName + '哪个翻车了？结果出乎意料' : '信号/速度/稳定性，' + devName + '哪个翻车了？结果出乎意料'
    ];
    if (type === 'empathy') return [
      isPhone ? '打工人选手机太难了？我用' + devName + '一周的真实感受' : '家里网卡到崩溃的人举手！换了' + devName + '之后终于解脱',
      isPhone ? '旧手机卡到崩溃的人举手！换了' + devName + '之后终于解脱' : '你以为宽带慢是运营商的问题？可能是你' + devName + '在拖后腿',
      isPhone ? '学生党预算有限？这个' + devName + '可能正适合你' : '不想多花钱又想要好网络？这个' + devName + '可能正适合你'
    ];
  }
  // ===== T4: Local Event (同城活动) =====
  if (t === 't4') {
    if (type === 'conflict') return [
      city + '的朋友注意了！这个福利只剩3天，错过真没了',
      '别人办宽带花599，你来店里只要99？真的假的？',
      (city||'这里') + '的营业厅疯了？免费贴膜还送流量？'
    ];
    if (type === 'value') return [
      '来' + (city||'我们店') + '办宽带，送你一个路由器值200块',
      (city||'同城') + '福利！免费贴膜+测速+清洁，一分钱不花',
      '就在' + (city||'附近') + '！营业厅重新装修开业，前50名有惊喜'
    ];
    if (type === 'suspense') return [
      (city||'本地') + '这家营业厅有个隐藏福利——来的人都知道',
      '今天路过' + (city||'柳巷') + '发现电信在搞事情——',
      '这个活动只能到店办，网上查不到——'
    ];
    if (type === 'empathy') return [
      '住在' + (city||'附近') + '的朋友，你家宽带该续费了吗？',
      '下雨天不想出门？这个业务手机上就能办，教你',
      (city||'同城') + '最热的时候来了，来营业厅吹空调+免费上网'
    ];
  }
  // Fallback
  return ['花2分钟看完这条视频，绝对不会亏', '这条视频可能帮你省不少钱', '分享一个你可能不知道的事'];
}

function buildT2HookContext() {
  var problem = '';
  var customer = '';
  try { problem = (document.getElementById('t2_problem')||{}).value || ''; } catch(e) {}
  try { customer = (document.getElementById('t2_customer')||{}).value || '客户'; } catch(e) {}
  var p = problem.toLowerCase();
  // Detect scene type
  var isInStore = /营业厅|进店|进来|进来躲|冲进|跑进|来厅|厅里/.test(p);
  var isRain = /下雨|暴雨|淋湿|淋雨|湿透/.test(p);
  var isPhone = /打电话|接到.*电话|来电|客服/.test(p);
  var isHome = /上门|到他家|家里|去.*家/.test(p);
  var isDelivery = /外卖|小哥|骑手|配送/.test(p);
  var isElderly = /老人|大爷|阿姨|爷爷|奶奶|爸妈|父母|婆婆/.test(p);
  var isStudent = /学生|同学|学校|校园/.test(p);
  var ctx = {};
  if (isInStore && isRain && isDelivery) {
    ctx.scene = '暴雨天';
    ctx.actor = '一位浑身湿透的外卖小哥冲进营业厅';
    ctx.trouble = '手机快没电，还有单没送完';
    ctx.action = '正准备关门，突然跑进来一个人——';
    ctx.surprise = '他不是来躲雨的';
    ctx.situation = '手机只剩5%电却还有3单没送——';
    ctx.tip = '手机没电急救法';
    ctx.turn = '办完业务后他做了件暖心的事';
    ctx.ending = '，他回头特意来办了张流量卡';
    ctx.helpful = '如果你也在路上的话，记住这几个应急办法';
    ctx.empathy = '风里来雨里去的外卖骑手，看到这一幕你会感动';
    ctx.pronoun = '他';
  } else if (isInStore && isElderly) {
    ctx.scene = '今天在营业厅值班';
    ctx.actor = '一位' + customer;
    ctx.trouble = '智能手机上的功能都不会用';
    ctx.action = '正在柜台整理资料，' + customer + '走了进来——';
    ctx.surprise = '她掏出一个写满步骤的小本子';
    ctx.situation = '她拿着手机犹豫了半天——';
    ctx.tip = '银发族用手机小技巧';
    ctx.turn = '她学会后特别开心';
    ctx.ending = '，她脸上笑得特别暖';
    ctx.helpful = '家里有老人的，这几步一定要教会他们';
    ctx.empathy = '你家老人也会用智能手机吗？';
    ctx.pronoun = '她';
  } else if (isInStore) {
    ctx.scene = '今天在营业厅柜台值班';
    ctx.actor = customer;
    ctx.trouble = problem.substring(0, 12);
    ctx.action = '正准备下班，' + customer + '急匆匆走了进来——';
    ctx.surprise = '事情不像表面那么简单';
    ctx.situation = '正在犹豫要不要开口——';
    ctx.tip = '到店办理的小秘诀';
    ctx.turn = '结果让所有人都很意外';
    ctx.ending = '，事情圆满解决';
    ctx.helpful = '来营业厅前先看这个，能省不少时间';
    ctx.empathy = '你在营业厅遇到过类似的事吗？';
    ctx.pronoun = '他';
  } else if (isPhone) {
    ctx.scene = '刚处理完一个工单';
    ctx.actor = customer + '打来电话';
    ctx.trouble = problem.substring(0, 12);
    ctx.action = '接了个电话，' + customer + '声音很急——';
    ctx.surprise = '电话里说的事让我坐不住了';
    ctx.situation = '电话那头的' + customer + '特别焦急——';
    ctx.tip = '宽带问题的应急排查法';
    ctx.turn = '最后解决的办法很简单';
    ctx.ending = '，' + customer + '在电话里连声说谢谢';
    ctx.helpful = '以后遇到这种情况，先试试这几步';
    ctx.empathy = '接过这种求救电话的举手！';
    ctx.pronoun = '他';
  } else if (isHome && isRain) {
    ctx.scene = '大雨天上门维修';
    ctx.actor = customer;
    ctx.trouble = problem.substring(0, 12);
    ctx.action = '冒雨赶到' + customer + '家';
    ctx.surprise = '进门一看问题完全不是说的那样';
    ctx.situation = '我全身淋湿了但顾不上——';
    ctx.tip = '雨天WiFi变慢的应对法';
    ctx.turn = '弄完后' + customer + '的反应让我觉得一切都值了';
    ctx.ending = '，虽然衣服全湿了但心里很暖';
    ctx.helpful = '下雨天信号变差？试试这几招';
    ctx.empathy = '雨天还在跑上跑下的打工人，说多了都是泪';
    ctx.pronoun = '他';
  } else if (isHome) {
    ctx.scene = '今天上门';
    ctx.actor = customer;
    ctx.trouble = problem.substring(0, 12);
    ctx.action = '背上工具包去了' + customer + '家';
    ctx.surprise = '一检查发现根本不是他说的那个问题';
    ctx.situation = '他在旁边看着我将信将疑——';
    ctx.tip = '自己就能排查的小技巧';
    ctx.turn = '弄完之后' + customer + '试了试笑了';
    ctx.ending = '，' + customer + '说原来这么简单';
    ctx.helpful = '花30秒看完，你也能学会自己排查';
    ctx.empathy = '你家是不是也这样？评论区说说';
    ctx.pronoun = '他';
  } else {
    // Generic fallback
    ctx.scene = '今天';
    ctx.actor = customer;
    ctx.trouble = problem.substring(0, 12) || '碰到了一个棘手的问题';
    ctx.action = '碰到了' + customer;
    ctx.surprise = '发现的事情让我很意外';
    ctx.situation = '一开始我还以为是什么大事——';
    ctx.tip = '解决问题的实用办法';
    ctx.turn = '最后的结局让我特别感动';
    ctx.ending = '，' + customer + '很满意地笑了';
    ctx.helpful = '下次遇到这种情况可以试试这个方法';
    ctx.empathy = '你有没有遇到过类似的事？评论区告诉我';
    ctx.pronoun = '他';
  }
  return ctx;
}

function buildChecklist(template) {
  // Replaced by buildPublishKit — kept for backward compat, returns empty
  return '';
}

function buildCommentSEO(t, city, topic) {
  // Merged into buildPublishKit
  return '';
}

function buildPreviewFooter(t, city, topic) {
  return buildPublishKit(t, city || '本地', topic || '');
}

var _origSwitchPage2 = switchPage;

switchPage = function(name, el, noPush) {
  var result = _origSwitchPage2(name, el, noPush);
  setTimeout(injectHookSelector, 100);
  setTimeout(injectMobileBar, 200);
  if (name === "template3") setTimeout(reorderDeviceList, 150);
  if (name === "template4") setTimeout(autoFillT4FromStore, 150);
  return result;
};

function reorderDeviceList() {
  var sel = document.getElementById('t3_device');
  if (!sel) return;
  var phone = window.___phonePool || phonePool;
  var weekIdx = getWeekNumber() % phone.length;
  var weeklyPhone = phone[weekIdx] && phone[weekIdx].model;
  if (!weeklyPhone) return;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === weeklyPhone && i > 4) {
      sel.options[i].textContent = '⭐ ' + sel.options[i].textContent + ' [本周主推]';
      break;
    }
  }
}

function autoFillT4FromStore() {
  var store = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  if (!store || !store.name) return;
  var cityEl = document.getElementById('t4_city');
  if (cityEl && !cityEl.value && store.city) {
    cityEl.value = store.city;
    cityEl.style.borderColor = '#008A5C';
    setTimeout(function(){ cityEl.style.borderColor = ''; }, 1500);
  }
  var shopEl = document.getElementById('t4_shop');
  if (shopEl && !shopEl.value) {
    shopEl.value = store.name;
    shopEl.style.borderColor = '#008A5C';
    setTimeout(function(){ shopEl.style.borderColor = ''; }, 1500);
  }
  var tagsEl = document.getElementById('t4_tags');
  if (tagsEl && !tagsEl.value) {
    var t = [];
    if (store.city) t.push('#' + store.city);
    t.push('#电信福利 #到店有礼');
    tagsEl.value = t.join(' ');
  }
}

function autoSelectHook(t, presetKey) {
  var typeEl = document.getElementById(t + '_hook_type');
  var textEl = document.getElementById(t + '_hook_text');
  if (!typeEl || !textEl) return;
  // Hook type mapping per template
  var t1HookMap = {
    '宽带选多少兆最划算': 'value', '手机卡套餐横向对比': 'conflict',
    '不同人群宽带怎么选': 'empathy', '5G套餐vs4G套餐实际体验': 'suspense',
    '宽带避坑指南': 'conflict', '光猫路由网线哪个最影响网速': 'suspense',
    '本月最值得办的3个活动': 'value', '老用户vs新用户套餐差在哪': 'conflict',
    '融合套餐vs单宽带哪个更划算': 'value', '100/300/1000兆看视频实测差距': 'value',
    '暑假学生宽带怎么选最省钱': 'empathy', '租房宽带避坑指南': 'conflict',
    '二宽半价到底值不值': 'suspense', '携号转网不换号改套餐全攻略': 'suspense',
    '携号转网实际体验全流程': 'suspense',
    '全屋WiFi覆盖mesh路由值不值': 'value', '家庭宽带该选多大带宽': 'empathy',
    '千兆宽带实际网速有多快': 'suspense', '一个人租房上网该怎么选': 'empathy',
    '父母家用什么宽带最划算': 'empathy', '流量卡和宽带哪个划算': 'conflict'
  };
  var t2HookMap = {
    '上门维修': 'empathy', '装机故事': 'suspense', '柜台服务': 'value',
    '突发状况': 'conflict', '投诉化解': 'empathy', '温暖瞬间': 'empathy',
    '银发服务': 'value', '数字课堂': 'conflict', '校园迎新': 'empathy',
    '社区营销': 'value', '政企服务': 'value', '节日活动': 'empathy',
    '突发事件': 'empathy', '公益服务': 'empathy', '老客户情谊': 'empathy'
  };
  var t4HookMap = {
    '免费贴膜': 'value', '免费测速': 'value', '办业务送礼': 'conflict',
    '以旧换新': 'value', '手机清洁': 'empathy', '宽带体验': 'suspense',
    '暑期特惠': 'conflict', '社区服务': 'empathy'
  };
  var hookType = null;
  if (t === 't1') {
    hookType = t1HookMap[presetKey] || null;
    // Fuzzy fallback for unlisted T1 topics
    if (!hookType) {
      var tt = presetKey || '';
      if (/对比|测评|pk|vs|实测/i.test(tt)) hookType = 'value';
      else if (/避坑|坑|防坑|别.*买|骗|翻车/i.test(tt)) hookType = 'conflict';
      else if (/值不值|实际.*体验|到底|究竟|真的|秘密/i.test(tt)) hookType = 'suspense';
      else if (/怎么选|选哪|选什么|省钱|划算|一个人|家庭/i.test(tt)) hookType = 'empathy';
      else hookType = 'value'; // default to value for comparison/guide content
    }
  } else if (t === 't2') hookType = t2HookMap[presetKey] || null;
  else if (t === 't4') hookType = t4HookMap[presetKey] || null;
  else if (t === 't3') {
    if (/测评|对比|续航|信号|发热/.test(presetKey || '')) hookType = 'value';
    else if (/避坑|翻车|差评|踩雷/.test(presetKey || '')) hookType = 'conflict';
    else if (/隐藏|秘密|发现/.test(presetKey || '')) hookType = 'suspense';
    else if (/学生|打工|预算|省钱/.test(presetKey || '')) hookType = 'empathy';
  }
  if (!hookType) return; // don't force-match unknown presets
  // Find matching option
  for (var i = 0; i < typeEl.options.length; i++) {
    if (typeEl.options[i].value === hookType) {
      typeEl.selectedIndex = i;
      applyHook(t);
      // Highlight: show the auto-matched hook clearly
      var hs = document.getElementById('hook_selector_' + t);
      if (hs) {
        hs.style.opacity = '1';
        hs.style.background = '#FFF8E1';
        hs.style.borderColor = '#FFB74D';
        hs.querySelector('div').innerHTML = '🎯 黄金3秒钩子 <span style="font-size:11px;color:#E65100;font-weight:400;">— 根据模板自动匹配，开头第一句决定80%完播率</span>';
      }
      return;
    }
  }
}

function injectMobileBar() {
  var templatePages = ['template1','template2','template3','template4','live'];
  if (templatePages.indexOf(currentPage) < 0) return;
  var existing = document.getElementById('mobileActionBar');
  if (existing) return;
  var bar = document.createElement('div');
  bar.id = 'mobileActionBar';
  bar.className = 'mobile-action-bar';
  // Determine the primary action for this template — use active mode
  var act = getMobileAction();
  bar.innerHTML = '<button class="mab-secondary mab-btn" onclick="toggleMobileNav()" style="font-size:20px;padding:8px 16px;">☰</button>' +
    '<button class="mab-primary mab-btn" id="mabActionBtn">' + act.label + '</button>' +
    '<button class="mab-secondary mab-btn" onclick="copyScriptFromPreview()">📋</button>';
  document.body.appendChild(bar);
  // Set onclick via direct reference (no eval)
  document.getElementById('mabActionBtn').onclick = act.fn;
}

function getMobileAction() {
  if (currentPage === 'template1') {
    if (document.querySelector('#t1-mtab-card.active')) return { fn: function(){ safeCall(previewT1Card); }, label: '👁 预览图卡脚本' };
    if (document.querySelector('#t1-mtab-calc.active')) return { fn: function(){ safeCall(previewT1Calc); }, label: '👁 预览算账脚本' };
    return { fn: function(){ safeCall(previewT1Talk); }, label: '👁 预览口播脚本' };
  }
  if (currentPage === 'template2') {
    if (document.querySelector('#t2-mtab-doc.active')) return { fn: function(){ safeCall(previewT2Doc); }, label: '👁 预览微纪录' };
    if (document.querySelector('#t2-mtab-short.active')) return { fn: function(){ safeCall(previewT2Short); }, label: '👁 预览一句话' };
    return { fn: function(){ safeCall(previewT2Tell); }, label: '👁 预览故事脚本' };
  }
  if (currentPage === 'template3') {
    if (document.querySelector('#t3-mtab-silent.active')) return { fn: function(){ safeCall(function(){ previewT3Silent('A'); }); }, label: '👁 预览无声脚本' };
    return { fn: function(){ safeCall(previewT3Talk); }, label: '👁 预览评测脚本' };
  }
  if (currentPage === 'template4') {
    if (document.querySelector('#t4-mtab-mix.active')) return { fn: function(){ safeCall(previewT4Mix); }, label: '👁 预览混剪脚本' };
    if (document.querySelector('#t4-mtab-countdown.active')) return { fn: function(){ safeCall(previewT4Countdown); }, label: '👁 预览倒计时' };
    return { fn: function(){ safeCall(previewT4Walk); }, label: '👁 预览探店脚本' };
  }
  if (currentPage === 'live') return { fn: function(){ safeCall(previewLiveScript); }, label: '📺 生成直播话术' };
  return { fn: function(){}, label: '👁 预览脚本' };
}

function updateMobileBarAction() {
  var btn = document.getElementById('mabActionBtn');
  if (!btn) return;
  var act = getMobileAction();
  btn.textContent = act.label;
  btn.onclick = function() { act.fn(); };
}

function toggleMobileNav() {
  var nav = document.querySelector('.nav-tabs');
  if (nav) nav.style.display = nav.style.display === 'none' ? '' : 'none';
}

function toggleHamburger() {
  var n = document.querySelector('.nav-tabs');
  n.classList.toggle('nav-collapsed');
  document.getElementById('hamburgerBtn').innerHTML = n.classList.contains('nav-collapsed') ? '☰ 展开全部菜单' : '✕ 收起菜单';
  // Show/hide hint for collapsed nav
  var hint = document.getElementById('navCollapseHint');
  if (hint) hint.style.display = n.classList.contains('nav-collapsed') ? '' : 'none';
}

function toggleNavGroup(group) {
  var el = document.querySelector('.nav-group[data-group="' + group + '"]');
  if (!el) return;
  el.classList.toggle('expanded');
  // Save state to localStorage
  try {
    var states = {};
    document.querySelectorAll('.nav-group').forEach(function(g) {
      if (g.dataset.group) states[g.dataset.group] = g.classList.contains('expanded');
    });
    localStorage.setItem('navGroupStates', JSON.stringify(states));
  } catch(e) {}
}

function loadNavGroupStates() {
  if (window.innerWidth > 640) return; // PC: always expanded
  try {
    var states = JSON.parse(localStorage.getItem('navGroupStates'));
    if (states) {
      document.querySelectorAll('.nav-group').forEach(function(g) {
        if (states[g.dataset.group]) g.classList.add('expanded');
      });
    }
  } catch(e) {}
}

function copyScriptFromPreview() {
  // Try to find any visible preview and copy its text
  var previews = document.querySelectorAll('[id^="preview"]');
  for (var i = 0; i < previews.length; i++) {
    if (previews[i].style.display !== 'none' && previews[i].textContent.trim()) {
      copyText(previews[i].textContent);
      toast('脚本已复制', 'success');
      return;
    }
  }
  toast('请先生成预览脚本', 'error');
}

function genHotspotComment(h) {
  var title = h.title || '';
  var tags = h.tags || '';
  // Detect category and generate fitting comment
  if (/挑战|舞|跳舞|跟拍|翻拍/i.test(title)) {
    return '拍完的兄弟评论区交作业！我看看谁跳得最魔性 👇';
  }
  if (/世界杯|看球|比赛|进球|亚马尔|马宁/i.test(title)) {
    return '你押谁赢？评论区留下你的预测，赛后回来挖坟 ⚽';
  }
  if (/手机|nova|荣耀|iPhone|换机|购机/i.test(title)) {
    return '正在用的什么手机？评论区晒型号，我帮你看看值不值得换 📱';
  }
  if (/宽带|网速|WiFi|套餐|FTTR|光纤/i.test(title)) {
    return '你家宽带多少兆？一个月多少钱？评论区告诉我，我帮你看划不划算 🏠';
  }
  if (/福利|优惠|限时|免费|送|特惠|618|双11/i.test(title)) {
    return '这波福利你赶上了吗？评论区扣1，我告诉你还能不能领 🎁';
  }
  if (/AI|科技|揭秘|辟谣|实测|真相/i.test(title)) {
    return '你之前听过这个说法吗？评论区说说，我看看多少人被骗了 🤔';
  }
  if (/父亲|端午|节日|中秋|过年|春节/i.test(title)) {
    return '这个节日你怎么过的？评论区晒晒，点赞最高的送小礼物 🎊';
  }
  // Default: use actual title
  var snippet = esc(title.slice(0, 25));
  return snippet + '... 你们遇到过吗？评论区聊聊 👇';
}

// ============================================================
// T3 卖点翻译层 (v2.7) — phonePool 结构化规格 → 宣传文案
// ============================================================

// 规格→宣传文案映射
var SPEC_SUFFIXES = {
  chip: '性能强劲',
  camera: '细节清晰',
  battery: '续航持久'
};

function translateSpecToSlogan(raw, type) {
  if (!raw) return '';
  var suffix = SPEC_SUFFIXES[type] || '';
  var text = String(raw);

  // 芯片：保留型号+结论词
  if (type === 'chip') {
    return text + ' · ' + suffix;
  }

  // 相机：提取像素数值+结论词
  if (type === 'camera') {
    var mp = text.match(/(\d+万)/);
    if (mp) return mp[1] + '像素 · ' + suffix;
    // 没有像素数值时用"超清"代替
    return '超清影像 · ' + suffix;
  }

  // 电池：提取容量+结论词
  if (type === 'battery') {
    var cap = text.match(/(\d+mAh)/i);
    if (cap) return cap[1] + ' · ' + suffix;
    return '持久续航 · ' + suffix;
  }

  return text;
}

// v2.7 扩展：仅提取事实数据（不带结论词后缀），用于口播脚本
function translateSpecToFact(raw, type) {
  if (!raw) return '';
  var text = String(raw);
  if (type === 'camera') {
    var mp = text.match(/(\d+万[主长]?摄?)/);
    if (mp) return mp[1];
    var yi = text.match(/(\d+亿[主]?长?焦?)/);
    if (yi) return yi[1];
    return text;
  }
  if (type === 'battery') {
    var cap = text.match(/(\d+mAh)/i);
    if (cap) return cap[1] + '容量电池';
    return text;
  }
  if (type === 'highlight') {
    // highlight 提取核心短语
    return text.replace(/·/g, '，').replace(/[，,\s]+$/, '');
  }
  return text;
}

// 从 phonePool 获取3条卖点
function getPhoneSellPoints(deviceName) {
  var phone = findPhoneByName(deviceName);
  if (!phone) return null;
  return [
    { icon: '📷', label: '影像', text: translateSpecToSlogan(phone.camera, 'camera') },
    { icon: '🔲', label: '芯片', text: translateSpecToSlogan(phone.chip, 'chip') },
    { icon: '🔋', label: '续航', text: translateSpecToSlogan(phone.battery, 'battery') }
  ];
}

// 渲染卖点展示区
function renderT3SellPointSection(deviceName, city) {
  var area = document.getElementById('t3_slogan_area');
  if (!area) return;

  var points = getPhoneSellPoints(deviceName);
  var phone = findPhoneByName(deviceName);
  var displayName = phone ? (phone.brand + ' ' + phone.model) : deviceName;
  var priceStr = phone ? ('¥' + (phone.guidePrice || phone.price || '到店询')) : '';
  city = city || document.getElementById('t3_city').value || '本地';

  if (!points) {
    area.style.display = 'none';
    return;
  }

  var cards = points.map(function(p) {
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#F8F6F0;border:1.5px solid #E4DCC8;border-radius:8px;">' +
      '<div style="flex-shrink:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:6px;font-size:16px;">' + p.icon + '</div>' +
      '<div style="flex:1;"><div style="font-size:10px;color:#8C7A5E;letter-spacing:1px;">' + p.label + '</div>' +
      '<div style="font-size:14px;font-weight:700;color:#2C1810;">' + esc(p.text) + '</div></div></div>';
  }).join('');

  // 引导收藏文案
  var tagStr = ('#' + (phone ? phone.brand + phone.model.replace(/ /g,'') : deviceName.replace(/ /g,'')) + ' #手机评测 #' + city + '电信');

  area.innerHTML =
    '<div style="max-width:460px;margin:12px auto 0;padding:16px;background:#FFFDF7;border:2px solid #D4C9A8;">' +
      '<div style="font-size:18px;font-weight:800;color:#2C1810;margin-bottom:12px;font-family:serif;">' + esc(displayName) + ' · 实力派' +
        (priceStr ? '<span style="float:right;font-size:14px;color:#C0392B;font-weight:700;">' + esc(priceStr) + '</span>' : '') +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;">' + cards + '</div>' +
      '<div style="font-size:10px;color:#9B8E7A;margin-top:8px;text-align:right;">参数来源：品牌公开资料 · 请到店确认实物</div>' +
      // 引导收藏
      '<div style="margin-top:12px;padding:8px 12px;background:#F0EDE4;border-left:3px solid #C4B998;font-size:11px;color:#5C5040;">' +
        '📌 发抖音时附上：<br><b>' + esc('收藏这条，买手机不踩坑') + '</b><br><span style="font-size:10px;color:#8B7A60;">' + esc(tagStr) + '</span></div>' +
    '</div>';
  area.style.display = 'block';

  // 更新引导收藏标签输入框
  var tagsEl = document.getElementById('t3_tags');
  if (tagsEl) tagsEl.value = tagStr;
}

// ============================================================
// v2.7: T3 脚本生成提示词（复制→DeepSeek/豆包）
// ============================================================

var SCENE_OPTIONS = [
  { id:'store', label:'🏪 店内（柜台前，手持手机）' },
  { id:'community', label:'🏘 小区（活动现场，外景收音）' },
  { id:'outdoor', label:'🚶 户外（商圈探店，边走边聊）' },
  { id:'home', label:'🔧 入户（用户家中，问题解决）' }
];

var TOPIC_ALIAS = {
  '续航':'续航和充电体验',
  '拍照':'拍照和影像测评',
  '样张':'拍照和影像测评',
  '5G':'5G网络和信号',
  '网速':'5G网络和信号',
  '信号':'5G网络和信号',
  '合约':'合约和优惠',
  '优惠':'合约和优惠',
  '划算':'合约和优惠'
};

function buildScriptPrompt(phone, topic, city, bgm) {
  var p = phone;
  var model = p.brand + ' ' + p.model;
  var price = p.guidePrice || p.price || '到店询';
  var topicDesc = TOPIC_ALIAS[topic] || topic + '体验';
  var persona = getPersona();
  var pd = personaDB[persona] || personaDB['tech'];
  var scene = document.getElementById('t3_scene')?.value || 'store';
  var sceneLabel = SCENE_OPTIONS.find(function(s){return s.id===scene;})?.label || '🏪 店内';

  var lines = [];
  lines.push('你是一个25-35岁的抖音博主，风格直接有自信不绕弯子。用户要看真实体验，不是产品说明书。');
  lines.push('');
  lines.push('【写作原则】');
  lines.push('❌ 不要产品说明书：禁止"搭载XX处理器""支持XX功能"');
  lines.push('✅ 要人话：把参数翻译成"用起来怎么样"');
  lines.push('✅ 真实场景：刷视频/玩王者/拍夜景/挤地铁/下雨天');
  lines.push('✅ 反常识钩子：开头别"大家好"，直接抛痛点');
  lines.push('✅ 具体数字：电池就说"出门一天不用充电宝"');
  lines.push('✅ 价格对比：电信合约价 vs 电商价，差多少说多少');
  lines.push('');
  lines.push('【产品数据 - 禁止编造）');
  lines.push('手机型号：' + model);
  lines.push('芯片：' + p.chip + ' → 翻译成人话描述');
  lines.push('影像：' + p.camera + ' → 翻译成人话描述');
  lines.push('电池：' + p.battery + ' → 翻译成人话描述');
  lines.push('核心卖点：' + p.highlight);
  lines.push('参考价格：¥' + price + '（电信合约价）');
  lines.push('门店地址：' + city + '电信营业厅');
  lines.push('');
  lines.push('【选题方向】' + topicDesc);
  lines.push('');
  lines.push('【45秒口播结构】');
  lines.push('');
  lines.push('▎0-8秒 开场钩子');
  lines.push('- 一句话钩住：不讲废话，直接抛痛点/反常识/悬念');
  lines.push('- 例："千元机打王者居然不卡？今天我测给你看。"');
  lines.push('- 例："天天手机发热？这台xxxx你信不信？"');
  lines.push('');
  lines.push('▎8-20秒 核心卖点1（最该被记住的那个）');
  lines.push('- 用"人用了什么感觉"，不用"搭载了什么"');
  lines.push('- 错误："搭载天玑7300" → 正确："打游戏不卡，玩王者不掉帧"');
  lines.push('- 必须 7-15 字一句话说清楚');
  lines.push('');
  lines.push('▎20-32秒 核心卖点2（选最反常识的）');
  lines.push('- 大电池："出门一天不用带充电宝"');
  lines.push('- 防水："下雨天也能拿手机拍"');
  lines.push('- 长焦："演唱会坐山顶能拍清台上"');
  lines.push('');
  lines.push('▎32-45秒 结尾CTA');
  lines.push('- 价格：电信合约价¥' + price + '，对比电商价');
  lines.push('- 地点：' + city + '电信营业厅');
  lines.push('- 行动：截图/评论区/到店');
  lines.push('');
  lines.push('【格式要求】');
  lines.push('- 口语化，用"你"不用"您"');
  lines.push('- 全文控制在150字以内');
  lines.push('- 不要"以下""众所周知""大家"等套话');
  lines.push('- 开头第一句就是钩子，不要自我介绍');
  lines.push('- 每段直接是可念的对话文本，不要分段标题');
  lines.push('- BGM：' + bgm + '（音量25%铺底不压人声）');
  lines.push('');
  lines.push('【参考风格】');
  lines.push('- 贤贤小姐姐（临汾）：强CTA直销，每句话都有行动指令');
  lines.push('- 沁县艳儿（长治）：亲切有温度，像跟朋友说话');

  return lines.join('\n');
}

function renderT3AutoSection(deviceName) {
  // 先渲染卖点区（已有函数）
  renderT3SellPointSection(deviceName);

  var area = document.getElementById('t3_auto_section');
  if (!area) return;

  var phone = findPhoneByName(deviceName);
  var city = document.getElementById('t3_city')?.value || '本地';
  var topic = document.getElementById('t3_topic')?.value || '';
  var bgm = document.getElementById('t3_bgm')?.value || 'Windy Hill - 羽肿';
  var tags = document.getElementById('t3_tags')?.value || '';

  if (!phone) {
    area.style.display = 'none';
    return;
  }

  // 脚本生成提示词
  var scriptPrompt = buildScriptPrompt(phone, topic, city, bgm);

  // 图片生成提示词（复用已有逻辑但直接生成文本）
  var imgPromptLines = [
    '一张抖音竖版手机卖点海报，9:16比例。',
    '设计风格：苹果发布会式的简洁高级感。深蓝色底（#0A1628），底部暖橙渐变过渡。',
    '画面排版：',
    '顶部：大字标题 "' + esc(phone.brand + ' ' + phone.model) + '"，副标题 "实力派"',
    '中部：三个磨砂白低圆角卡片，配小图标：',
    '  - ' + esc(translateSpecToSlogan(phone.camera, 'camera')),
    '  - ' + esc(translateSpecToSlogan(phone.chip, 'chip')),
    '  - ' + esc(translateSpecToSlogan(phone.battery, 'battery')),
    '卡片下方："¥' + (phone.guidePrice || phone.price || '到店询') + ' 电信合约价"',
    '底部："到店体验真机"',
    '禁止出现手机实物照片。不要疑问句。文字不重叠。'
  ].join('\n');

  var imgPrompt = imgPromptLines;

  area.innerHTML =
    // 脚本提示词区
    '<div style="margin-top:16px;background:#FFFDF7;border:2px solid #D4C9A8;border-radius:8px;padding:16px;">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
        '<span style="font-size:14px;">🤖</span>' +
        '<span style="font-weight:700;font-size:13px;color:#2C1810;">生成口播脚本</span>' +
        '<span style="font-size:10px;color:#8C7A5E;">复制 → 打开 DeepSeek/豆包 → 粘贴 → 自动生成完整脚本</span>' +
      '</div>' +
      '<textarea readonly id="t3ScriptPromptText" style="width:100%;height:160px;font-size:12px;line-height:1.6;border:1px solid #E4DCC8;border-radius:6px;padding:10px;resize:vertical;font-family:inherit;background:#fff;color:#3C3024;">' + esc(scriptPrompt) + '</textarea>' +
      '<div style="margin-top:8px;display:flex;gap:8px;">' +
        '<button onclick="var t=document.getElementById(\'t3ScriptPromptText\');navigator.clipboard.writeText(t.value).then(function(){var b=event.target;b.textContent=\'✅ 已复制\';setTimeout(function(){b.textContent=\'📋 复制提示词\'},1500)})" style="padding:6px 16px;background:#2C1810;color:#FFFDF7;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;">📋 复制提示词</button>' +
      '</div>' +
    '</div>' +
    // 图片生成提示词区
    '<div style="margin-top:12px;background:#F0F4FF;border:1.5px solid #B5D4F4;border-radius:8px;padding:16px;">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
        '<span style="font-size:14px;">🖼</span>' +
        '<span style="font-weight:700;font-size:13px;color:#185FA5;">生成卖点海报</span>' +
        '<span style="font-size:10px;color:#5F5E5A;">复制 → 打开豆包/即梦 → 粘贴 → 生成9:16海报</span>' +
      '</div>' +
      '<textarea readonly id="t3ImgPromptText" style="width:100%;height:100px;font-size:12px;line-height:1.6;border:1px solid #B5D4F4;border-radius:6px;padding:10px;resize:vertical;font-family:inherit;background:#fff;">' + esc(imgPrompt) + '</textarea>' +
      '<div style="margin-top:8px;display:flex;gap:8px;">' +
        '<button onclick="var t=document.getElementById(\'t3ImgPromptText\');navigator.clipboard.writeText(t.value).then(function(){var b=event.target;b.textContent=\'✅ 已复制\';setTimeout(function(){b.textContent=\'📋 复制提示词\'},1500)})" style="padding:6px 16px;background:#185FA5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;">📋 复制提示词</button>' +
      '</div>' +
    '</div>' +
    // 收藏引导 + 完整信息
    '<div style="margin-top:8px;padding:8px 12px;background:#F8F6F0;border:1px solid #E4DCC8;border-radius:6px;font-size:11px;color:#5C5040;">' +
      '📌 全部内容已就绪。复制脚本提示词→DeepSeek生成口播文案，复制海报提示词→豆包生成封面图。' +
      (tags ? '<br><b>标签：</b>' + esc(tags) : '') +
    '</div>';

  area.style.display = 'block';
}

// ═══════ schedule.js ═══════
function getBestTime(idx, city) {
  const bases = [[12,14],[8,10],[20,22],[16,18],[15,16]];
  const b = bases[idx] || bases[0];
  const offset = (city && city.indexOf('太原') !== -1) ? -1 : 0;
  const s = b[0] + offset;
  const e = b[1] + offset;
  return (s < 10 ? '0' + s : s) + ':00-' + (e < 10 ? '0' + e : e) + ':00';
}

function buildTodayHero() {
  var hero = document.getElementById('todayHero');
  if (!hero) return;
  var today = new Date().getDay();
  var rawIdx = today === 0 ? 4 : Math.min(today - 1, 4);
  if (today === 0 || today === 6) { hero.innerHTML = ''; return; }
  var poolIdx = rawIdx % 4;
  var types = ['口播脚本', '故事脚本', '产品测评', '同城活动'];
  var pageIds = ['template1', 'template2', 'template3', 'template4'];
  var pools = [topicPool.decision, topicPool.scene, topicPool.review, topicPool.local];
  var configs = [
    { css: 'type-guide' },
    { css: 'type-scene' },
    { css: 'type-review' },
    { css: 'type-local' }
  ];
  var topic = pickFromPool(pools[poolIdx], 0);
  var type = rawIdx === 4 ? '选题库' : types[poolIdx];
  var pageId = pageIds[poolIdx];
  var html = '<div tabindex="0" role="button" aria-label="今日速推：' + esc(type) + ' · ' + esc(topic) + '" onclick="switchPage(\'' + pageId + '\',document.querySelector(\'.nav-tab[onclick*=' + pageId + ']\'));jumpToTemplate(\'' + topic.replace(/'/g, "\\'") + '\',' + rawIdx + ')" class="today-hero-compact">';
  html += '<span class="thc-label">🎯 今日速推</span>';
  html += '<span class="thc-type ' + configs[poolIdx].css + '">' + type + '</span>';
  html += '<span class="thc-topic">' + esc(topic) + '</span><span class="thc-arrow">→</span>';
  html += '</div>';
  hero.innerHTML = html;
}

function buildSchedule() {
  const grid = document.getElementById('scheduleGrid');
  if (!grid) { console.warn('buildSchedule: #scheduleGrid not found'); return; }
  const types = ['口播脚本', '故事脚本', '产品测评', '同城活动', '自由选题'];
  const pageIds = ['template1', 'template2', 'template3', 'template4', 'bank'];
  const weekTopics = [
    pickFromPool(topicPool.decision, 0),
    pickFromPool(topicPool.scene, 0),
    pickFromPool(topicPool.review, 0),
    pickFromPool(topicPool.local, 0),
    '从选题库自选一个'
  ];
  const dayNames = ['周一', '周二', '周三', '周四', '周五'];
  let html = '';
  for (let i = 0; i < 5; i++) {
    const d = new Date(week.monday);
    d.setDate(week.monday.getDate() + i);
    var bestTime = getBestTime(i % 4);
    html += `<div class="schedule-day clickable" tabindex="0" role="button" aria-label="点击跳转到${types[i]}模板：${weekTopics[i]}" onclick="switchPage('${pageIds[i]}', document.querySelector('.nav-tab[onclick*=${pageIds[i]}]'));jumpToTemplate('${weekTopics[i].replace(/'/g, "\\'")}',${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick()}" title="点击跳转到${types[i]}模板">
      <div class="day-name">${dayNames[i]}</div>
      <div class="day-date">${d.getMonth()+1}/${d.getDate()}</div>
      <div class="day-type ${typeColors[types[i]]}">${typeIcons[types[i]]} ${types[i]}</div>
      <div class="day-topic">${esc(weekTopics[i])}</div>
      <div class="day-time">⏰ ${bestTime}</div>
    </div>`;
  }
  grid.innerHTML = '<div class="schedule-info-bar"><span class="sib-label">📅 ' + week.label + ' 本周排期</span><button class="btn btn-outline btn-sm sib-copy-btn" onclick="copySchedule()" title="复制本周排期方案">📋 复制</button></div>' + html;
  // Update week device
  const devSpan = document.getElementById('weekDevice');
  if (devSpan) {
    if (phonePool.length > 0) {
      const phone = phonePool[currentWeekNum % phonePool.length];
      // 兼容新旧两种 phonePool 格式
      var devInfo;
      if (phone.guidePrice) {
        // 新格式: brand/model/storage/price/stock
        devInfo = `${phone.brand || ''} ${phone.model}${phone.storage ? ' (' + phone.storage + ')' : ''} · ¥${phone.guidePrice}${phone.isCore ? ' ★核心主推' : ''}${phone.stock !== undefined ? ' · 库存' + phone.stock : ''}`;
      } else {
        // 旧格式: model/chip/battery/screen/highlight
        devInfo = `${phone.model}（${phone.chip} | ${phone.battery} | ${phone.screen}）— ${phone.highlight}`;
      }
      devSpan.textContent = '📱 本周评测设备：' + devInfo;
    } else {
      devSpan.innerHTML = '📱 本周评测设备：数据加载中...';
    }
  }
}

function copySchedule() {
  var lines = [];
  document.querySelectorAll('#scheduleGrid .schedule-day').forEach(function(day) {
    lines.push(day.querySelector('.day-name').textContent + ' ' + day.querySelector('.day-date').textContent + ' | ' + day.querySelector('.day-type').textContent.trim() + ' | ' + day.querySelector('.day-topic').textContent + ' | ' + day.querySelector('.day-time').textContent);
  });
  copyText(lines.join('\n'));
}

function filterBank(mode, el) {
  bankFilter = mode;
  if (mode !== 'context') {
    // Update active button
    document.querySelectorAll('.bank-filter').forEach(b => b.classList.remove('active'));
    const btn = el;
    if (btn) btn.classList.add('active');
  }
  buildTopicBank();
}

function updateBankFilterButtons() {
  document.querySelectorAll('.bank-filter').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector('.bank-filter[onclick*="' + bankFilter + '"]');
  if (activeBtn) activeBtn.classList.add('active');
  else {
    const allBtn = document.querySelector('.bank-filter[onclick*="all"]');
    if (allBtn) allBtn.classList.add('active');
  }
}

function buildTopicBank() {
  const bankIds = ['bank1', 'bank2', 'bank3', 'bank4'];
  const pools = [topicPool.decision || [], topicPool.scene || [], topicPool.review || [], topicPool.local || []];
  const modeNames = [['口播','图卡','算账'], ['讲述','纪录','短故事'], ['口播','无声A','无声B','无声C','无声D'], ['探店','混剪','倒计时']];
  // Show/hide context hint
  const hint = document.getElementById('bankContextHint');
  if (hint) hint.style.display = (bankFilter === 'context') ? 'block' : 'none';
  // Apply search filter
  var searchEl = document.getElementById('bankSearch');
  var searchText = searchEl ? searchEl.value.toLowerCase() : '';
  pools.forEach((pool, idx) => {
    const el = document.getElementById(bankIds[idx]);
    if (!el) return;
    let html = '';
    pool.forEach((t, i) => {
      const isThisWeek = i === ((currentWeekNum - 1) % pool.length);
      const meta = getTopicMeta(t, idx);
      // Apply filter
      if (bankFilter === 'solo' && meta.people > 1) return;
      if (bankFilter === 'noface' && meta.needFace) return;
      if (bankFilter === 'quick' && !meta.quickTime) return;
      if (bankFilter === 'thisweek' && !isThisWeek) return;
      // Context filter: when coming from a template page, only show matching pool
      if (bankFilter === 'context' && idx !== currentTab) return;
      // Search filter
      if (searchText && t.toLowerCase().indexOf(searchText) < 0) return;
      const marker = isThisWeek ? 'style="background:var(--orange);font-weight:700;"' : '';
      const idxClass = idx===0 ? '' : (idx===1 ? 'g' : (idx===2 ? 'o' : 'p'));
      // Build meta badges
      let badges = '';
      if (meta.people <= 1) badges += '<span class="meta-badge meta-solo">单人</span>';
      if (!meta.needFace) badges += '<span class="meta-badge meta-noface">免露脸</span>';
      if (meta.quickTime) badges += '<span class="meta-badge meta-quick">10分钟</span>';
      // Add classification badges
      (meta.badges || []).forEach(b => {
        badges += '<span class="meta-badge ' + b.cls + '">' + b.text + '</span>';
      });
      html += `<div class="topic-item" tabindex="0" role="button" aria-label="选题：${t}" style="cursor:pointer;${isThisWeek ? 'border-color:var(--orange);background:#FFF8E1;' : ''}" onclick="jumpToTemplate('${t.replace(/'/g, "\\'")}',${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick()}" title="点击跳转到对应模板">
        <span class="idx ${idxClass}" ${marker}>${i+1}</span>
        ${isThisWeek ? '⭐ ' : ''}${esc(t)}
        ${isThisWeek ? '<span style="font-size:10px;color:var(--orange);margin-left:4px;">本周</span>' : ''}
        <div class="topic-meta">${badges}</div>
      </div>`;
    });
    // Show count after filtering
    const visibleCount = pool.filter((t, i) => {
      const meta = getTopicMeta(t, idx);
      const isTW = i === ((currentWeekNum - 1) % pool.length);
      if (bankFilter === 'solo' && meta.people > 1) return false;
      if (bankFilter === 'noface' && meta.needFace) return false;
      if (bankFilter === 'quick' && !meta.quickTime) return false;
      if (bankFilter === 'thisweek' && !isTW) return false;
      return true;
    }).length;
    // Context filter: hide empty cards
    if (bankFilter === 'context' && visibleCount === 0) {
      el.parentElement.style.display = 'none';
    } else {
      el.parentElement.style.display = '';
    }
    el.innerHTML = html + (bankFilter !== 'all' && bankFilter !== 'thisweek' && bankFilter !== 'context' ? 
      `<div style="font-size:11px;color:#999;text-align:center;padding:4px;">筛选结果：${visibleCount} 个</div>` : '');
  });
}

function buildHistory() {
  const el = document.getElementById('historyContent');
  if (!el) return;
  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">';
  const pools = [topicPool.decision, topicPool.scene, topicPool.review, topicPool.local];
  const typeNames = ['决策指南型', '一线场景型', '深度测评型', '本地化事件型'];
  for (let w = Math.max(1, currentWeekNum - 8); w <= currentWeekNum; w++) {
    const isThisWeek = w === currentWeekNum;
    html += `<div class="card" style="${isThisWeek ? 'border:2px solid var(--orange);' : ''}padding:12px;">
      <div style="font-size:12px;color:${isThisWeek ? 'var(--orange)' : '#999'};margin-bottom:6px;">
        ${isThisWeek ? '⭐ 本周' : ''} 第${w}周
      </div>`;
    const phone = phonePool[w % phonePool.length];
    html += `<div style="font-size:11px;color:var(--body);margin-bottom:8px;">📱 ${phone.model}</div>`;
    for (let t = 0; t < 4; t++) {
      const topic = pools[t][(w - 1) % pools[t].length];
      html += `<div style="font-size:11px;padding:3px 0;border-bottom:1px solid var(--border);">
        <span class="type-${['guide','scene','review','local'][t]}">${['📊','🎬','🔍','📍'][t]}</span> ${topic}
      </div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  el.innerHTML = html;
}

function jumpToTemplate(topic, typeIdx) {
  // typeIdx: 0=decision→template1, 1=scene→template2, 2=review→template3, 3=local→template4, 4=bank(no jump)
  const templatePages = ['template1', 'template2', 'template3', 'template4'];
  if (typeIdx >= templatePages.length) return; // Friday is "flexible topic" → already on bank, no prefill needed
  switchPage(templatePages[typeIdx], document.querySelector('.nav-tab[onclick*="' + templatePages[typeIdx] + '"]'));
  if (typeIdx === 0) {
    // Decision guide: select topic → triggers presets
    // Option values are now synced from topicPool.js, try exact match first then fuzzy
    var topicSel = document.getElementById('t1_topic');
    var matched = false;
    // Try exact match first
    for (var i = 0; i < topicSel.options.length; i++) {
      if (topicSel.options[i].value === topic) {
        topicSel.selectedIndex = i;
        matched = true; break;
      }
    }
    // Fallback: fuzzy match (strip digits, slashes, dashes, compare first 6 chars)
    if (!matched) {
      var tClean = topic.replace(/[0-9\s\/、\-—]/g, '').substring(0, 6);
      for (var i = 0; i < topicSel.options.length; i++) {
        var oClean = topicSel.options[i].value.replace(/[0-9\s\/、\-—]/g, '').substring(0, 6);
        if (oClean === tClean) {
          topicSel.selectedIndex = i;
          break;
        }
      }
    }
    fillT1Presets();
    const city = document.getElementById('t1_city').value;
    if (!document.getElementById('t1_tags').value && city) {
      document.getElementById('t1_tags').value = '#' + city + '宽带 #宽带对比 #省钱攻略';
    }
  }
  if (typeIdx === 1) {
    // Scene: fill problem field with topic as story starter and auto-match preset
    document.getElementById('t2_problem').value = topic;
    document.getElementById('t2_problem').style.borderColor = '#008A5C';
    document.getElementById('t2_problem').style.background = '#F0FFF4';
    setTimeout(function() { document.getElementById('t2_problem').style.borderColor = ''; document.getElementById('t2_problem').style.background = ''; }, 1200);
    setTimeout(function() { matchT2Preset(); }, 100);
  }
  if (typeIdx === 2) {
    // Review: auto-fill device → load topics → select best match
    const devSel = document.getElementById('t3_device');
    if (!devSel.value) { devSel.value = '光猫'; loadTopicsByDevice(); }
    setTimeout(function() {
      const topicSel = document.getElementById('t3_topic');
      // Fuzzy match: try different strategies
      var bestIdx = -1, bestScore = 0;
      for (var i = 0; i < topicSel.options.length; i++) {
        var optText = topicSel.options[i].textContent;
        // Strategy 1: topic appears in option text
        if (optText.includes(topic.substring(0, 6))) { bestIdx = i; break; }
        // Strategy 2: keyword overlap score
        var score = 0;
        var kw = topic.replace(/[?？，,！!]/g, '').split(/\s+/);
        for (var k = 0; k < kw.length; k++) {
          if (kw[k].length >= 2 && optText.includes(kw[k])) score++;
        }
        if (score > bestScore) { bestScore = score; bestIdx = i; }
      }
      if (bestIdx >= 0 && bestScore >= 1) {
        topicSel.selectedIndex = bestIdx;
        autoFillTech();
      } else if (bestIdx >= 0) {
        topicSel.selectedIndex = bestIdx;
        autoFillTech();
      }
    }, 200);
  }
  if (typeIdx === 3) {
    // Local: fill benefit + desc fields, then auto-match activity type
    document.getElementById('t4_benefit').value = topic;
    document.getElementById('t4_desc').value = topic + '，来店里看看，就在附近';
    document.getElementById('t4_benefit').style.borderColor = '#008A5C';
    document.getElementById('t4_benefit').style.background = '#F0FFF4';
    setTimeout(function() { 
      document.getElementById('t4_benefit').style.borderColor = ''; 
      document.getElementById('t4_benefit').style.background = ''; 
      matchT4Preset();
    }, 1200);
  }
}

// ═══════ templates.js ═══════
function switchT1Mode(mode) {
  ['talk','card','calc'].forEach(m => {
    document.getElementById('t1-mode-'+m).classList.remove('active');
    document.getElementById('t1-mtab-'+m).classList.remove('active');
  });
  document.getElementById('t1-mode-'+mode).classList.add('active');
  document.getElementById('t1-mtab-'+mode).classList.add('active');
  ['preview1-talk','preview1-card','preview1-calc'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  updateMobileBarAction();
}

// 通用辅助：脚本模糊匹配（dropdown value 与 t1ScriptFull key 不完全一致时回退）
// 匹配规则：取脚本 key 的前 6 个字，看是否出现在用户选项中
function findScriptFuzzy(scriptMap, topic) {
  if (!scriptMap || !topic) return null;
  for (var key in scriptMap) {
    if (key.indexOf(topic.substring(0, 6)) >= 0 || topic.indexOf(key.substring(0, 6)) >= 0) {
      return scriptMap[key];
    }
  }
  return null;
}

function previewT1Talk() {
  const city = (document.getElementById('t1_city')||{}).value;
  const topic = (document.getElementById('t1_topic')||{}).value;
  if (!city || !topic) { alert('请选一个选题！'); return; }
  const bgm = (document.getElementById('t1_bgm')||{}).value || '';
  const tags = (document.getElementById('t1_tags')||{}).value || '';
  var variantHtml = tryVariantInjection(topic, bgm, 'preview1-talk');
  // alias mapping → exact match → fuzzy
  var topicKey = (window.___t1TopicAliases && ___t1TopicAliases[topic]) || topic;
  // 2026-07-20: 人设差异化脚本（完整版，非拼接）
  var personaKey = 'sister';
  try { var _p = JSON.parse(localStorage.getItem('douyin_lab_store') || '{}'); if (_p.persona) personaKey = _p.persona; } catch(e) {}
  var personaScript = window.___t1ScriptFullByPersona && ___t1ScriptFullByPersona[topicKey] && ___t1ScriptFullByPersona[topicKey][personaKey];
  var fullScript = personaScript
    || (window.___t1ScriptFull && ___t1ScriptFull[topicKey])
    || (window.___t1ScriptFull && ___t1ScriptFull[topic])
    || findScriptFuzzy(window.___t1ScriptFull, topic);
  if (fullScript) {
    var pData = (window.personaDB && personaDB[personaKey]) || personaDB.sister;
    // 2026-07-20: 人设完整版 → 直接展示（无hook/cta拼接）；兜底版 → 用hook+cta
    var isPersonaFull = personaScript === fullScript;
    var scriptBg = 'background:#FAFAF8;border:1px solid #E8E5DC;border-radius:12px;padding:16px 18px;margin:8px 0;font-size:15px;line-height:1.85;color:#1E293B;';
    var hookStyle = 'background:#F5F3FF;border-left:4px solid #7C5CFF;border-radius:6px;padding:10px 12px;margin-bottom:8px;color:#5B3FD1;font-weight:600;font-size:14px;';
    var ctaStyle = 'background:#E0F7F0;border-left:4px solid #10B981;border-radius:6px;padding:10px 12px;margin-top:8px;color:#065F46;font-weight:600;font-size:14px;';
    var dialogHtml;
    if (isPersonaFull) {
      dialogHtml = '<div style="' + scriptBg + '">' +
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px dashed #E8E5DC;">' +
        '<span style="font-size:14px;">' + pData.icon + '</span>' +
        '<span style="font-weight:700;color:#5B3FD1;font-size:13px;">' + pData.label + '</span>' +
        '<span style="font-size:10px;color:#94A3B8;">' + pData.tone + '</span>' +
        '</div>' +
        '<div style="white-space:pre-line;line-height:1.85;">"' + fullScript + '"</div></div>';
    } else {
      // 2026-07-20: 兜底时不再强行包 hook/cta（避免"人格错位"）
      // 直接展示通用 body，并标注"通用版，等生成完整人设版"
      dialogHtml = '<div data-role="script-body" style="' + scriptBg + '">' +
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px dashed #E8E5DC;">' +
        '<span style="font-size:13px;">📄 通用版脚本</span>' +
        '<span style="font-size:10px;color:#94A3B8;">' + pData.icon + ' ' + pData.label + ' · 主体通用，开口/收尾按人设</span>' +
        '</div>' +
        '<div style="white-space:pre-line;line-height:1.85;">"' + fullScript + '"</div></div>';
    }

    // 2026-07-20: 脚本评分 + 记忆库命中
    var fullText = isPersonaFull ? fullScript : ((pData.hook || '').replace(/\{topic\}/g, topic) + '\n' + fullScript + '\n' + (pData.cta || ''));
    var score = (typeof scoreScript === 'function') ? scoreScript(fullText) : null;
    var mem = (typeof matchMemoryBank === 'function') ? matchMemoryBank(fullText) : null;
    var scoreHtml = '';
    if (score) {
      function bar(s) {
        var filled = Math.round(s / 10);
        var empty = 10 - filled;
        var color = s >= 80 ? '#10B981' : s >= 60 ? '#F59E0B' : '#EF4444';
        return '<span style="display:inline-block;width:' + (filled * 10) + 'px;height:8px;background:' + color + ';border-radius:4px;"></span>' +
               '<span style="display:inline-block;width:' + (empty * 10) + 'px;height:8px;background:#E2E8F0;border-radius:4px;"></span>';
      }
      scoreHtml = '<div style="margin-top:14px;padding:14px 16px;background:linear-gradient(135deg,#F0F7FF,#FEFEFE);border:1px solid #BFDBFE;border-radius:12px;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">' +
        '<span style="font-weight:700;color:#0052CC;font-size:13px;">📊 脚本评分</span>' +
        '<span style="font-size:11px;color:#64748B;background:#fff;padding:2px 8px;border-radius:8px;border:1px solid #E2E8F0;">综合 ' + score.total + ' / 100</span>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">' +
        '<div><div style="font-size:11px;color:#64748B;margin-bottom:4px;">🎯 钩子力 <b style="color:#1E293B;">' + score.hook + '</b></div>' + bar(score.hook) + '</div>' +
        '<div><div style="font-size:11px;color:#64748B;margin-bottom:4px;">🤝 信任力 <b style="color:#1E293B;">' + score.trust + '</b></div>' + bar(score.trust) + '</div>' +
        '<div><div style="font-size:11px;color:#64748B;margin-bottom:4px;">🛒 转化力 <b style="color:#1E293B;">' + score.conv + '</b></div>' + bar(score.conv) + '</div>' +
        '</div>';
      if (mem && mem.total > 0) {
        scoreHtml += '<div style="margin-top:10px;padding-top:10px;border-top:1px dashed #BFDBFE;">' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">' +
          '<span style="font-weight:600;color:#0052CC;font-size:12px;">📚 记忆库命中 ' + mem.total + ' 个关键词</span>' +
          '<span style="font-size:10px;color:#64748B;">(' + mem.pct + '%)</span>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:4px;">' +
          mem.hits.map(function(h) { return '<span style="font-size:10px;padding:2px 6px;background:#E0F2FE;color:#0EA5E9;border-radius:8px;">' + h.label + ':' + h.tag + '</span>'; }).join('') +
          '</div></div>';
      }
      scoreHtml += '</div>';
    }

    var html = (variantHtml || '') + `
<div class="cover-hint"><strong>💡 本脚本覆盖：</strong>三种宽带场景对比（单人/家庭/多人多设备）· 月租价格区间与适用人群 · 评论互动引导。</div>
<div class="stage">🎬 口播脚本 <span style="font-size:11px;font-weight:400;color:#64748B;">· 人设：${pData.icon} ${pData.label}</span></div>
<div class="info-tag">⏱ 约25秒 | 🎤 全程口播面对镜头 | 🎵 BGM: ${bgm}（音量25%）</div>

${dialogHtml}
${scoreHtml}

<div class="info-tag" style="margin-top:12px;">📝 发布标题: ${topic} | 看完不花冤枉钱</div>
<div class="info-tag">🏷 标签: ${tags}</div>`;
    showT1Preview('preview1-talk', html);
  } else {
    alert('该选题暂无精选脚本，请选择其他选题。');
  }
}

function previewT1Card() {
  const c = id => document.getElementById('t1_'+id).value;
  if (!c('city') || !c('a')) { alert('请至少填写地名和场景A！'); return; }
  const city = c('city');
  const topic = c('topic');
  const a = c('a'), b = c('b'), cVal = c('c');
  const bgm = c('bgm'), tags = c('tags');
  var hookText = '';
  var hookEl = document.getElementById('t1_hook_text');
  if (hookEl && hookEl.value.trim()) hookText = hookEl.value.trim();
  // Extract price and speed from scenario text
  function extPrice(t) { const m = t.match(/(\d+)元/); return m ? m[1]+'元' : '?元'; }
  function extSpeed(t) { const m = t.match(/(\d+)兆/); return m ? m[1]+'兆' : '?兆'; }
  function extTitle(t) { return t.split('，')[0] || t.substring(0,8); }
  const cols = [
    { title: extTitle(a), speed: extSpeed(a), price: extPrice(a), desc: a, color: '#1565C0' },
    { title: extTitle(b), speed: extSpeed(b), price: extPrice(b), desc: b, color: '#E65100' },
    { title: extTitle(cVal), speed: extSpeed(cVal), price: extPrice(cVal), desc: cVal, color: '#2E7D32' }
  ];
  const cardHTML = `
${hookText ? '<div class="stage">🎯 黄金钩子</div>\n<div class="dialogue" style="color:#BF360C;font-weight:700;">"' + esc(hookText) + '"</div>\n' : ''}
<div id="t1-card-visual" style="background:#1a1a2e;border-radius:12px;padding:20px;margin-bottom:16px;position:relative;overflow:hidden;">
  <div style="text-align:center;color:#FFD54F;font-size:18px;font-weight:700;margin-bottom:4px;">${topic}</div>
  <div style="text-align:center;color:#81C784;font-size:12px;margin-bottom:16px;">${city}电信 · 一张图看懂</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
    ${cols.map(col => `
    <div style="background:rgba(255,255,255,0.06);border:2px solid ${col.color};border-radius:10px;padding:14px 10px;text-align:center;">
      <div style="font-size:12px;color:#B0BEC5;margin-bottom:6px;">${col.title}</div>
      <div style="font-size:32px;font-weight:900;color:#FFD54F;line-height:1;">${col.speed}</div>
      <div style="font-size:13px;color:#81C784;margin:6px 0;">宽带</div>
      <div style="display:inline-block;background:${col.color};color:#fff;padding:4px 12px;border-radius:14px;font-size:14px;font-weight:700;">${col.price}/月</div>
      <div style="font-size:10px;color:#78909C;margin-top:6px;line-height:1.3;">${col.desc}</div>
    </div>
    `).join('')}
  </div>
  <div style="text-align:center;margin-top:16px;padding:8px;border-top:1px solid rgba(255,255,255,0.1);">
    <span style="color:#FFD54F;font-size:12px;">📸 截图保存 · 选套餐不纠结</span>
    <span style="color:#78909C;font-size:11px;margin-left:8px;">📍 ${city}电信营业厅</span>
  </div>
</div>
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🎬 剪映制作指令</div>
<div class="shot-step">
  <span class="shot-time">片段1：0-3秒</span>
  <span class="shot-action">🎬 导入上图作为第一帧</span>
  <span class="shot-note">或用剪映"新建"→深色背景+大字"${topic}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段2：3-9秒</span>
  <span class="shot-action">🎬 蓝色卡片弹出："${cols[0].speed}宽带 ${cols[0].price}/月"</span>
  <span class="shot-subtitle">适合：${extTitle(a)}</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段3：9-15秒</span>
  <span class="shot-action">🎬 橙色卡片弹出："${cols[1].speed}宽带 ${cols[1].price}/月"</span>
  <span class="shot-subtitle">适合：${extTitle(b)}</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段4：15-21秒</span>
  <span class="shot-action">🎬 绿色卡片弹出："${cols[2].speed}宽带 ${cols[2].price}/月"</span>
  <span class="shot-subtitle">适合：${extTitle(cVal)}</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段5：21-30秒</span>
  <span class="shot-action">🎬 三卡并排 → 底部弹出"截图保存" → 添加转场音效</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${bgm}（音量30%）| ⏱ 约30秒 | 👤 无需出镜</div>
<div class="shot-note">💡 对比图卡是收藏率最高的形态 — 用户本能会截图"以后选套餐对比用"</div>
<div class="info-tag">📝 发布标题: ${city}${topic}，截图保存慢慢看</div>
<div class="info-tag">🏷 标签: ${tags}</div>`;
  showT1Preview('preview1-card', cardHTML);
  // Add download button
  const container = document.getElementById('preview1-card');
  if (container) {
    const dlBtn = document.createElement('button');
    dlBtn.className = 'btn btn-orange btn-sm';
    dlBtn.style.cssText = 'margin-top:12px;';
    dlBtn.textContent = '🖼 下载对比图卡';
    dlBtn.onclick = function() { downloadCardImage(); };
    container.appendChild(dlBtn);
  }
}

function downloadCardImage() {
  const card = document.getElementById('t1-card-visual');
  if (!card) return;
  if (typeof html2canvas !== 'undefined') {
    html2canvas(card, { backgroundColor: '#1a1a2e', scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = '对比图卡_' + sanitizeFilename(week.label) + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  } else {
    // Fallback: open in new window for print/save
    const w = window.open('', '_blank');
    if (!w) { toast('弹窗被阻止，请允许弹窗后重试', 'error'); return; }
    w.document.write('<html><head><title>对比图卡</title><style>body{background:#1a1a2e;display:flex;justify-content:center;padding:20px;margin:0;}</style></head><body>' + card.outerHTML + '</body></html>');
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
  }
}

function previewT1Calc() {
  const c = id => document.getElementById('t1_'+id).value;
  if (!c('city') || !c('a')) { alert('请至少填写地名和场景A！'); return; }
  const city = c('city');
  const topic = c('topic');
  const a = c('a'), b = c('b'), cVal = c('c');
  const bgm = c('bgm'), tags = c('tags');
  var hookText = '';
  var hookEl = document.getElementById('t1_hook_text');
  if (hookEl && hookEl.value.trim()) hookText = hookEl.value.trim();
  // Parse scenario: try to extract user type and price
  function extractPrice(txt) {
    const m = txt.match(/(\d+)元/);
    return m ? m[1]+'元' : 'XX元';
  }
  function extractType(txt) {
    return txt.split('，')[0] || txt;
  }
  function extractSpeed(txt) {
    const m = txt.match(/(\d+)兆/);
    return m ? m[1]+'兆' : 'XX兆';
  }
  var variantHtml = tryVariantInjection(getTemplateTopic('t1'), c('bgm'), 'preview1-calc');
  const html = (variantHtml || '') + `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🧮 场景化算账（模拟真实用户·高转发率）</div>
${hookText ? '<div class="stage">🎯 黄金钩子</div>\n<div class="dialogue" style="color:#BF360C;font-weight:700;">"' + esc(hookText) + '"</div>\n' : ''}
<div class="stage">🎬 拍摄方式</div>
<div class="action-note">→ 手机屏幕录屏：打开计算器App。录屏+人声讲解就可以。</div>
<div class="stage">【0-5秒】抛出场景</div>
<div class="dialogue">"假设你在${city}，${extractType(a)}。一个月宽带上要花多少钱？我来给你算。"</div>
<div class="stage">【5-18秒】算第一笔账</div>
<div class="action-note">→ 计算器按出对应月租</div>
<div class="dialogue">"第一种，${extractType(a)}——${extractSpeed(a)}宽带够用，月租${extractPrice(a)}。一年就是${extractPrice(a)}×12，算一下——"</div>
<div class="action-note">→ 计算器显示结果，屏幕弹出字幕"一年约XXX元"</div>
<div class="stage">【18-30秒】算对比账</div>
<div class="action-note">→ 如果想升级到更高档，差多少？</div>
<div class="dialogue">"那如果家里人多呢？${extractType(b)}——${extractSpeed(b)}，月租${extractPrice(b)}。一年多花多少？"</div>
<div class="action-note">→ 计算器按出差价，字幕弹出"一年多花XXX元"</div>
<div class="stage">【30-38秒】结论+行动引导</div>
<div class="dialogue">"所以你看，宽带不是越贵越好——是你用得到才算划算。你是哪种情况？截图保存，来店里我帮你算得更细。${city}的朋友，地址在评论区。"</div>
<div class="action-note">→ 画面定格在三种方案的价格对比，字幕"截图保存"</div>
<div class="info-tag" style="margin-top:12px;">🎵 BGM: ${bgm}（音量25%） | ⏱ 约38秒 | 👤 1人+计算器App</div>
<div class="info-tag">📝 发布标题: 在${city}办宽带，一个月到底花多少？我帮你算清楚</div>
<div class="info-tag">🏷 标签: ${tags}</div>`;
  showT1Preview('preview1-calc', html);
}

function showT1Preview(id, html) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  // Get city/topic for footer
  var city = (document.getElementById('t1_city')||{}).value || '';
  var topic = (document.getElementById('t1_topic')||{}).value || '';
  el.innerHTML = html + buildPreviewFooter('t1', city, topic);
  addCopyButton(id);
  el.scrollIntoView({ behavior: 'smooth' });
  checkPublishForm('template1');
}

function clearT1() {
  document.getElementById('t1_city').value = '';
  document.getElementById('t1_topic').value = '';
  document.getElementById('t1_a').value = '';
  document.getElementById('t1_b').value = '';
  document.getElementById('t1_c').value = '';
  document.getElementById('t1_tags').value = '';
  ['preview1-talk','preview1-card','preview1-calc'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

function fillT1Presets() {
  const topic = document.getElementById('t1_topic').value;
  if (!topic) return;
  // Auto-select hook type based on topic
  autoSelectHook('t1', topic);
  // 先填入预设或自动生成（瞬时反馈）
  // 1. Try exact match
  if (t1Presets[topic]) {
    applyT1Presets(t1Presets[topic]);
    return;
  }
  // 2. Try fuzzy match (strip symbols, compare first meaningful chars)
  var tClean = topic.replace(/[「」\?？!！、，。\s\d\-\/—]/g, '').substring(0, 8);
  for (var key in t1Presets) {
    var kClean = key.replace(/[「」\?？!！、，。\s\d\-\/—]/g, '').substring(0, 8);
    if (kClean === tClean) {
      applyT1Presets(t1Presets[key]);
      return;
    }
  }
  // 3. Auto-generate 3 scenarios based on topic keywords
  var generated = generateT1Scenarios(topic);
  applyT1Presets(generated);
  // 【2026-07-16】实时搜索已下线（搜索结果质量差，改用离线话术库）
  // searchT1AndFill(topic);
}

/*
 * 【2026-07-16】实时搜索已下线
 * 
 * 原因：搜索引擎返回的通用网页摘要无法提取电信套餐结构化数据，
 *       结果质量差（噪音词残留、档位混乱、缺价格锚点）。
 *       改用离线 AI 生成 + 知识库 + 本地预设三层方案。
 *       
 * 保留代码供参考，不再调用。
 */
function searchT1AndFill(topic) {
  var city = (document.getElementById('t1_city')||{}).value || '';
  var API = window.PERSONALIZE_API || 'https://1253338744-66eug9kqc7.ap-guangzhou.tencentscf.com';
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'search-t1', topic: topic, city: city })
  }).then(function(r) { return r.json(); }).then(function(data) {
    if (data && data.a && data.b && data.c) {
      // 区分数据来源：知识库(蓝) / 搜索(绿) / 无数据(灰)
      var sourceColors = { knowledge: '#1565C0', search: '#2E7D32', partial: '#E65100', 'no-data': '#666' };
      var sourceLabels = { knowledge: '🏛️ 知识库', search: '🌐 实时搜索', partial: '⚠️ 部分数据', 'no-data': '❌ 无数据' };
      var color = sourceColors[data.source] || '#1565C0';
      var label = sourceLabels[data.source] || '';
      var ts = new Date().toLocaleTimeString();
      
      ['a','b','c'].forEach(function(k, i) {
        var val = data[k];
        var el = document.getElementById('t1_' + k);
        if (el && val && !el.dataset.userEdited) {
          el.value = val;
          el.style.borderColor = color;
          el.style.background = color + '18';
          el.title = label + ' | ' + ts + (data.matchedKey ? ' | ' + data.matchedKey : '');
        }
      });
    } else if (data && data.a && data.source === 'no-data') {
      // 无数据：保留兜底但变色提示
      ['a','b','c'].forEach(function(k) {
        var el = document.getElementById('t1_' + k);
        if (el) {
          el.title = '❌ 搜索无数据，请手动填写 | ' + new Date().toLocaleTimeString();
          el.style.color = '#999';
        }
      });
    } else {
      // 搜索失败：保持 auto-generate
      ['a','b','c'].forEach(function(k) {
        var el = document.getElementById('t1_' + k);
        if (el) el.title = '🤖 AI 兜底（搜索失败） | ' + new Date().toLocaleTimeString();
      });
    }
  }).catch(function(e) {
    console.log('Search T1 error:', e.message);
    ['a','b','c'].forEach(function(k) {
      var el = document.getElementById('t1_' + k);
      if (el) el.title = '⚠️ 搜索异常，已用 AI 兜底';
    });
  });
}

function applyT1Presets(presets) {
  document.getElementById('t1_a').value = presets[0] || '';
  document.getElementById('t1_b').value = presets[1] || '';
  document.getElementById('t1_c').value = presets[2] || '';
  // Flash effect
  ['t1_a','t1_b','t1_c'].forEach(function(id) {
    var el = document.getElementById(id);
    el.style.borderColor = '#008A5C';
    el.style.background = '#F0FFF4';
    setTimeout(function(){ el.style.borderColor = ''; el.style.background = ''; }, 1200);
  });
}

function generateT1Scenarios(topic) {
  var t = topic.toLowerCase();
  // === 直播/避坑/带货（删除乱给套话的内容，宁可不给也别误导）===
  // 之前这段给了"先看价格区间"这种通用鸡汤，问题是用户选了"直播带宽带"实际
  // 想要的是"上行速度"的技术内容，自动生成器无法准确回答
  if (/直播|带货|避坑|避雷|指南|主播|短视频|自拍|网络|欠费|坑/i.test(topic)) {
    return [
      '⚠️ 该选题太具体，自动生成器无法给出准确答案，请在【场景A】中搜索真实数据后手动填写',
      '⚠️ 请在【场景B】补充数据来源或相关实测，避免用通用模板',
      '⚠️ 建议直接联系营业厅现场测速，或在官网/知乎搜索"宽带上行速度"等技术贴'
    ];
  }
  // === 携号转网/号码携带 ===
  if (/携号转网|号码携带|转网|换运营商|不换号/i.test(topic)) {
    return [
      '场景A：符合转网条件的老用户——无合约/无欠费/满120天，直接APP申请，1小时搞定',
      '场景B：有合约但想转——先打客服查违约金，或等合约到期前30天预约，省解约费',
      '场景C：异地号码想转——先确认归属地支持跨省转网，或先迁回本地再办理'
    ];
  }
  // === 二宽/第二条宽带 ===
  if (/二宽|第二条宽带|第二路|两个宽带/i.test(topic)) {
    return [
      '场景A：二楼/阁楼独立网络——二宽半价，月租仅30元，跟主宽带共用账户',
      '场景B：父母同住不同楼层——各自独立WiFi不干扰，老人用简单的，年轻人用千兆',
      '场景C：租客/室友分摊——二宽单独计费，搬家可带走，不影响主宽带合约'
    ];
  }
  // === 异地宽带/跨省 ===
  if (/异地|跨省|外地|非本地|老家|父母家/i.test(topic)) {
    return [
      '场景A：工作地办宽带，老家也有需求——异地宽带月租30元起步，不用两地办卡',
      '场景B：给父母装宽带，自己缴费——主号在自己这，异地宽带绑副卡，话费统一出',
      '场景C：租房短期用——异地宽带按季度付费，到期自动停，不用回老家销户'
    ];
  }
  // === 新装/安装/装机 ===
  if (/新装|安装|装机|首次|新开/i.test(topic)) {
    return [
      '场景A：租房首次办——选可移机套餐，押金100元，搬家带走不重新缴费',
      '场景B：新房装修——预埋六类线+光纤到屋，直接上千兆，未来10年不折腾',
      '场景C：光猫路由一站式——新装送WiFi6路由器+光猫，省设备钱200-500元'
    ];
  }
  // === 老用户/存量用户 ===
  if (/老用户|存量|老客户|在网|续约/i.test(topic)) {
    return [
      '场景A：3年以上老用户——专属折扣套餐，同等配置比新办省20%，找客服要隐藏优惠',
      '场景B：合约到期前30天——提前续约送3个月会员或流量包，别等自动续费',
      '场景C：多年老号不想换——叠加副卡或二宽，老号保号，新需求用新套餐更划算'
    ];
  }
  // === 提速/升级 ===
  if (/提速|升级|升档|换更快的/i.test(topic)) {
    return [
      '场景A：100兆→300兆——月租+10元，多设备同时在线明显快，性价比最高',
      '场景B：300兆→千兆——月租+30元，上传下载翻倍，适合居家办公/游戏主播',
      '场景C：光猫/路由瓶颈排查——先换光猫再提速，否则千兆宽带跑不满白花钱'
    ];
  }
  // === 电视/IPTV/机顶盒 ===
  if (/电视|IPTV|机顶盒|看剧|影视|会员/i.test(topic)) {
    return [
      '场景A：基础电视需求——IPTV基础版月租10元，央视卫视全有，老人够用',
      '场景B：追剧/球赛/电影——IPTV会员版月租30元，4K画质+回看7天+VIP专区',
      '场景C：多屏同看——手机投屏+电视同播，套餐内含3屏会员，出差也能看直播'
    ];
  }
  // === 合约/到期/续费 ===
  if (/合约|到期|续费|续约|违约金/i.test(topic)) {
    return [
      '场景A：合约还有3个月到期——等自动续费前改套餐，别提前解约赔违约金',
      '场景B：想提前解约换套餐——算违约金vs新套餐省的钱，省得多就付违约金换',
      '场景C：合约到期没注意被自动续——到期前30天打10000取消自动续，再选新套餐'
    ];
  }
  // === 副卡/亲情号 ===
  if (/副卡|亲情号|家庭号|共享|多人/i.test(topic)) {
    return [
      '场景A：夫妻两人——主卡+1张副卡，月租+10元，共享流量和通话',
      '场景B：一家三口——主卡+2张副卡，月租+20元，孩子用副卡防超支',
      '场景C：三世同堂5口人——家庭共享套餐，5张卡+宽带+电视，人均月租30元封顶'
    ];
  }
  // === 活动/促销/优惠 ===
  if (/活动|促销|优惠|限时|送|减|打折/i.test(topic)) {
    return [
      '场景A：新用户首年5折——第一年省50%，第二年恢复原价，到期前记得改套餐',
      '场景B：老带新送话费——推荐朋友办各得100元话费，上不封顶',
      '场景C：节日限时——618/双11/春节专属套餐，比平时办多送路由器或会员年卡'
    ];
  }
  // === 世界杯/看球 ===
  if (/世界杯|看球|球赛|足球/i.test(topic)) {
    return [
      '看球专用｜一个人住，100兆入门，看1080P球赛流畅，月租59元',
      '看球专用｜两口/三口之家，300兆起步，两台设备同时看不同赛事不卡，月租99元',
      '看球专用｜4K看球直播，千兆FTTR全屋覆盖，4K超清球赛直播零延迟，月租169元'
    ];
  }
  // === 学生/毕业/校园 ===
  if (/学生|毕业|校园|考生|高考|中考|暑假|寒假|开学/i.test(topic)) {
    return [
      '学生刚需｜学生宿舍/一个人住，100兆入门，刷视频看剧够用，月租59元',
      '学生刚需｜两口/三口之家，300兆起步，多设备同时在线不卡，月租99元',
      '学生刚需｜重度游戏/4K视频/直播，千兆FTTR全屋覆盖，上传下载极速不等待，月租169元'
    ];
  }
  // === 租房/合租 ===
  if (/租房|合租|独居/i.test(topic)) {
    return [
      '租房党｜一个人住，100兆入门，搬家方便移机，月租59元',
      '租房党｜室友合租分摊，300兆起步，各房间信号满格，月租99元人均33元',
      '租房党｜重度使用+居家办公，千兆FTTR全屋覆盖，合约期灵活可短签，月租169元'
    ];
  }
  // === 宽带（通用上下文感知版）===
  if (/宽带|光纤|千兆|百兆|兆|网速|FTTR|WiFi/i.test(topic)) {
    var isGame = /游戏|电竞|直播|主播/i.test(topic);
    var ctxC = isGame ? '电竞直播/高清连麦' : '重度游戏/4K视频/直播';
    return [
      '一个人住，刷抖音看视频，100兆入门够用，月租59元',
      '两口/三口之家，300兆起步，多设备同时在线不卡，月租99元',
      ctxC + '，千兆FTTR全屋覆盖，上传下载极速不等待，月租169元'
    ];
  }
  // === 手机/合约机 ===
  if (/手机|合约|购机|以旧换新|nova|荣耀|华为|小米|OPPO|vivo|iPhone|苹果/i.test(topic)) {
    var isStudent = /学生|毕业/i.test(topic);
    return [
      '合约机方案：首付低+月租含话费流量，3年比裸机省500-1500元',
      '裸机全款：一次付清不绑定套餐，适合已有满意套餐的用户',
      '以旧换新：旧手机折价' + (isStudent ? '，学生再减100元' : '+电信补贴') + '，新机半价到手'
    ];
  }
  // === 套餐/话费/流量 ===
  if (/套餐|月租|话费|流量|分钟|资费/i.test(topic)) {
    var isStudent = /学生|毕业/i.test(topic);
    var planA = isStudent ? '学生轻量版：每月20G+200分钟，校园流量免费，月租29元' : '轻度用户：每月5G流量+100分钟通话，月租29元';
    var planB = isStudent ? '学生进阶版：每月40G+500分钟，含视频会员，月租59元' : '中度用户：每月30G流量+500分钟通话+App会员，月租59元';
    var planC = isStudent ? '学生全能版：每月100G+1000分钟+宽带，毕业前不涨价，月租99元' : '全家桶：3张卡+宽带+IPTV，人均30-50元/月';
    return [planA, planB, planC];
  }
  // === 疑难杂症/避坑 ===
  if (/避坑|指南|问题|故障|怎么办|卡顿|慢|连不上|掉线/i.test(topic)) {
    if (/路由器|WiFi|无线/i.test(topic)) {
      return [
        '坑1：路由器放墙角→信号衰减60%，正确：放客厅中央高出1米',
        '坑2：用了5年前的老路由→跑不满千兆，正确：换WiFi6路由器',
        '坑3：2.4G和5G混用→手机自动连错频段，正确：分开命名，主力设备锁5G'
      ];
    }
    if (/光猫|宽带|网速|网络/i.test(topic)) {
      return [
        '问题1：光猫指示灯全闪→可能是线路故障，先重启再报修',
        '问题2：测速达标但刷视频卡→路由老化或连接设备过多，换路由解决',
        '问题3：晚上8-10点网速变慢→小区带宽高峰期，升级千兆可解'
      ];
    }
    return [
      '问题1：最常见的误操作——检查设备是否插好电源和网线',
      '问题2：第二步排查——重启光猫和路由器，等2分钟再看',
      '问题3：终极方案——打10000号或到营业厅，免费上门检测'
    ];
  }
  // === 对比/选择类 ===
  if (/对比|怎么选|哪个|值得|横评/i.test(topic)) {
    return [
      '方案A 省钱党：基础配置够用不浪费，月费最低，平时刷视频看微信完全OK',
      '方案B 性价比：中配方案黄金比例，多设备同时用不卡顿，90%人选这一档',
      '方案C 旗舰党：顶配一步到位，未来3年不用愁升级，钱花在体验上'
    ];
  }
  // === Fallback ===
  return [
    '场景A：基础入门款，适合一个人，月费最低，日常够用',
    '场景B：进阶体验款，适合多设备家庭，性价比最优',
    '场景C：旗舰全能款，适合重度使用，一步到位长期划算'
  ];
}

function switchT2Mode(mode) {
  ['tell','doc','short'].forEach(m => {
    document.getElementById('t2-mode-'+m).classList.remove('active');
    document.getElementById('t2-mtab-'+m).classList.remove('active');
  });
  document.getElementById('t2-mode-'+mode).classList.add('active');
  document.getElementById('t2-mtab-'+mode).classList.add('active');
  ['preview2-tell','preview2-doc','preview2-short'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  updateMobileBarAction();
}

function previewT2Tell() {
  var preset = '';
  try { preset = document.getElementById('t2_preset').value; } catch(e) {}
  if (!preset) { alert('请选一个故事场景！'); return; }
  var bgm = '';
  try { bgm = document.getElementById('t2_bgm').value; } catch(e) {}
  var tags = '';
  try { tags = document.getElementById('t2_tags').value; } catch(e) {}
  var variantHtml = tryVariantInjection(preset, bgm, 'preview2-tell');
  
  var fullScript = (window.___t2ScriptFull && ___t2ScriptFull[preset])
    || findScriptFuzzy(window.___t2ScriptFull, preset);
  if (fullScript) {
    var html = (variantHtml || '') + `
<div class="cover-hint"><strong>💡 本脚本覆盖：</strong>真实服务案例全流程（时间·客户·问题排查·解决方案·客户反应·总结）。</div>
<div class="stage">🎬 故事口播</div>
<div class="info-tag">⏱ 约25秒 | 🎤 原声口播 | 🎵 BGM: ${bgm || '🔇 现场原声'}</div>

<div class="dialogue" style="white-space:pre-line;line-height:1.6;">"${fullScript}"</div>

<div class="info-tag" style="margin-top:12px;">🏷 标签: ${tags || '#真实故事 #装维日常 #宽带小知识'}</div>`;
    showT2Preview('preview2-tell', html);
  } else {
    alert('该场景暂无精选故事，请选择其他场景。');
  }
}

function previewT2Doc() {
  const c = id => document.getElementById('t2_'+id).value;
  if (!c('time') || !c('customer')) { alert('请至少填写时间和客户类型！'); return; }
  var hookSubtitle = '';
  var hookEl = document.getElementById('t2_hook_text');
  if (hookEl && hookEl.value.trim()) {
    hookSubtitle = esc(hookEl.value.trim());
  }
  // User content drives everything; only differentiate broad setting
  var preset = '';
  try { preset = document.getElementById('t2_preset').value; } catch(e) {}
  var isOutreach = /社区|校园|政企/i.test(preset);
  var isOnsite = /上门|装机|维修/i.test(preset);
  var openShot = isOutreach ? '布置活动现场，摆摊/拉横幅' : isOnsite ? '拍楼栋外观/门牌号（不拍具体号码）' : '拍门牌号/营业厅外观';
  var meetShot = isOutreach ? c('customer') + '走过来咨询，拍交流场景' : c('customer') + '开门引路，拍背影或手部';
  var problemShot = c('finding') ? c('finding').substring(0, 20) : '正在处理中的场景';
  var variantHtml = tryVariantInjection(c('preset'), c('bgm'), 'preview2-doc');
  const html = (variantHtml || '') + `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🎥 微纪录 · 拍摄指令（零口播/极少口播）</div>
${hookSubtitle ? `
<div class="shot-step" style="border-left:4px solid var(--orange);">
  <span class="shot-time">0-3秒 🎯</span>
  <span class="shot-action">🎬 ${openShot}</span>
  <span class="shot-subtitle">字幕："${hookSubtitle}"</span>
  <span style="font-size:10px;color:#E65100;">⚡ 黄金钩子 · 3秒决定完播率</span>
</div>` : ''}
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '3-6秒' : '0-3秒'}</span>
  <span class="shot-action">🎬 ${openShot}</span>
  <span class="shot-subtitle">字幕："${c('time')}，${c('customer')}说家里网卡了好久了"</span>
</div>
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '6-11秒' : '3-8秒'}</span>
  <span class="shot-action">🎬 ${meetShot}</span>
  <span class="shot-subtitle">字幕：${c('problem')}</span>
</div>
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '11-23秒' : '8-20秒'}</span>
  <span class="shot-action">🎬 ${problemShot}</span>
  <span class="shot-subtitle">字幕："问题在这——${c('finding')}"</span>
  <span class="shot-note">→ 用第一人称POV，仿佛观众就在现场看</span>
</div>
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '23-35秒' : '20-32秒'}</span>
  <span class="shot-action">🎬 拍操作过程——手入镜操作，动作清晰可见</span>
  <span class="shot-subtitle">${c('steps').split('\n').map((s,i) => '字幕'+(i+1)+'：'+s).join('<br>')}</span>
</div>
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '35-41秒' : '32-38秒'}</span>
  <span class="shot-action">🎬 ${c('customer')}试用，拍表情变化——从怀疑到惊喜</span>
  <span class="shot-subtitle">字幕："${c('reaction')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">${hookSubtitle ? '41-45秒' : '38-42秒'}</span>
  <span class="shot-action">🎬 你收拾工具离开的背影，${c('customer')}在远处挥手</span>
  <span class="shot-subtitle">字幕："${c('summary')} | 你家WiFi怎么样？评论区说说"</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${c('bgm') || '🔇 现场原声'} | ⏱ 约${hookSubtitle ? '45' : '42'}秒 | 👤 1人跟拍 | 🎬 POV视角</div>
<div class="shot-note">💡 微纪录的核心：镜头是旁观者，不是讲解者。让画面说话，字幕只说必要信息。</div>`;
  showT2Preview('preview2-doc', html);
}

function previewT2Short() {
  const c = id => document.getElementById('t2_'+id).value;
  if (!c('customer') || !c('reaction')) { alert('请至少填写客户类型和客户反应！'); return; }
  var hookTitle = '';
  var hookEl = document.getElementById('t2_hook_text');
  if (hookEl && hookEl.value.trim()) hookTitle = esc(hookEl.value.trim());
  // Build a one-sentence story from all form fields
  var storyLine = c('time') + '，' + c('customer') + '——' + c('problem');
  var storyEnd = c('reaction').replace(/[。！!？?]$/, '') + '。' + c('summary');
  var variantHtml = tryVariantInjection(c('preset'), c('bgm'), 'preview2-short');
  const html = (variantHtml || '') + `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">⚡ 一句话故事（15秒·高完播）</div>
<div class="stage">🎬 拍摄指南</div>
<div class="action-note">→ 只拍一个画面 + 一行字幕 + 一段BGM。不发语音、不露脸。</div>
<div class="stage">📱 画面选择</div>
<div class="action-note">→ 选${c('customer')}最打动人的那个瞬间：</div>
<div class="dialogue">${c('reaction')} —— 就定格在这个画面上，2-3秒</div>
${c('finding') ? '<div class="shot-note">💡 关键信息（字幕展示）：' + esc(c('finding')) + '</div>' : ''}
${c('steps') ? '<div class="shot-note">🔧 操作要点：' + esc(c('steps').split('\n')[0]) + '</div>' : ''}
<div class="stage">📝 字幕内容（画面底部大字）</div>
<div class="shot-step"${hookTitle?' style="border-left:4px solid var(--orange);"':''}>
  ${hookTitle ? '<span class="shot-subtitle">"' + hookTitle + '"</span><span class="shot-note">⚡ 钩子先抓眼球，下面跟着故事</span>' : ''}
  <span class="shot-subtitle">"${storyLine}"</span>
  <span class="shot-note">→ 第二行字幕（3秒后淡入）："${storyEnd}"</span>
</div>
<div class="stage">📱 发布信息</div>
<div class="info-tag">🎵 BGM: ${c('bgm') || '我记得 - 赵雷'}（音量20%，温柔铺底）</div>
<div class="info-tag">⏱ 时长: 15-18秒 | 👤 出镜: 不用 | 📱 格式: 1张照片/3秒视频片段</div>
<div class="info-tag">🏷 标签: ${c('tags') || '#平凡故事 #装维小哥 #中国电信'}</div>
<div class="info-tag">💡 一句话故事的完播率通常是其他形态的2-3倍——因为太短了，观众来不及划走。</div>`;
  showT2Preview('preview2-short', html);
}

function showT2Preview(id, html) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  // 城市直接读绑定的营业厅 profile，无需额外表单字段
  var storeCity = '';
  try {
    var profile = getStoreProfile();
    if (profile && profile.city) storeCity = profile.city;
    if (!storeCity) toast('⚠ 请先绑定营业厅（右上角"绑定营业厅"）获取地市信息', 'warn');
  } catch(e) {}
  var preset = '';
  try { preset = document.getElementById('t2_preset').value || ''; } catch(e) {}
  // 诊断：检查 variant card 是否在 HTML 中
  var hasVariant = html.indexOf('variant-card-') > -1;
  console.log('[诊断] showT2Preview id=' + id + ' city=' + storeCity + ' preset=' + preset + ' hasVariantCard=' + hasVariant + ' htmlLen=' + html.length);
  if (hasVariant) {
    var cardIdMatch = html.match(/variant-card-([a-z0-9]+)/);
    if (cardIdMatch) console.log('[诊断] variant card ID = variant-card-' + cardIdMatch[1]);
  }
  el.innerHTML = html + buildPreviewFooter('t2', storeCity, preset);
  // 诊断：验证 innerHTML 后 variant card 是否存在
  if (hasVariant) {
    var cardInDom = el.querySelector('[id^="variant-card-"]');
    console.log('[诊断] variant card in DOM = ' + (cardInDom ? 'YES id=' + cardInDom.id : 'NO'));
  }
  addCopyButton(id);
  el.scrollIntoView({ behavior: 'smooth' });
  checkPublishForm('template2');
}

function clearT2() {
  ['t2_time','t2_customer','t2_problem','t2_finding','t2_reaction','t2_summary','t2_tags'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('t2_steps').value = '1. 把路由器挪到客厅中间\n2. 避开金属物和电器\n3. 重启路由器测信号';
  ['preview2-tell','preview2-doc','preview2-short'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

function fillT2Presets() {
  const key = document.getElementById('t2_preset').value;
  if (!key || !t2Presets[key]) return;
  const p = t2Presets[key];
  ['time','customer','problem','finding','steps','reaction','summary','tags'].forEach(f => {
    const el = document.getElementById('t2_'+f);
    if (el && p[f]) { el.value = p[f]; el.style.borderColor = '#008A5C'; el.style.background = '#F0FFF4'; }
    if (el) setTimeout(function() { el.style.borderColor = ''; el.style.background = ''; }, 1200);
  });
  // Auto-fill BGM based on scene type
  var subCat = '温情叙事';
  if (p.tags && (p.tags.indexOf('装维') > -1 || p.tags.indexOf('装机') > -1)) subCat = '快节奏爽片';
  else if (p.tags && (p.tags.indexOf('突发') > -1 || p.tags.indexOf('投诉') > -1)) subCat = '轻纪录片';
  autoFillBGM('template2', 't2_bgm', '一线场景', subCat);
  // v2.0: Auto-select best hook type for this story template
  autoSelectHook('t2', key);
  // Dynamic label: change "上门发现的具体问题" → scene-appropriate wording
  var labelMap = {
    '上门维修': '现场发现的具体问题', '装机故事': '装维现场发现的问题',
    '柜台服务': '沟通中了解到的真实情况', '突发状况': '当时的具体情况',
    '投诉化解': '客户投诉的具体问题', '温暖瞬间': '当时的真实情况',
    '银发服务': '聊天中发现的问题', '数字课堂': '课堂中遇到的问题',
    '校园迎新': '迎新中发现的问题', '社区营销': '社区走访了解的情况',
    '政企服务': '政企客户反映的问题', '节日活动': '活动现场的情况',
    '公益服务': '公益服务中的情况', '老客户情谊': '老客户反映的问题'
  };
  var lbl = document.getElementById('t2_finding_label');
  if (lbl) lbl.textContent = labelMap[key] || '发现的具体问题';
  // 异步搜索 T2 故事素材（零成本、零 AI）
  searchT2AndFill(key);
}

// 异步从 Web 函数搜索 T2 故事素材
function searchT2AndFill(preset) {
  var API = window.PERSONALIZE_API || 'https://1253338744-66eug9kqc7.ap-guangzhou.tencentscf.com';
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'search-t2', preset: preset, topic: preset })
  }).then(function(r) { return r.json(); }).then(function(data) {
    if (data && data.snippets && data.snippets.length > 0) {
      // 把搜索到的素材片段显示在 summary 字段下方作为参考
      var summaryEl = document.getElementById('t2_summary');
      if (summaryEl && !summaryEl.dataset.userEdited) {
        // 拼接 2 条最相关的搜索片段作为参考
        var refs = data.snippets.slice(0, 2).join(' / ').slice(0, 200);
        // 在 tags 字段追加搜索标记
        var tagsEl = document.getElementById('t2_tags');
        if (tagsEl && !tagsEl.dataset.userEdited) {
          var cur = tagsEl.value || '';
          tagsEl.value = cur + (cur ? ' ' : '') + '#搜索素材' + (data.source === 'search' ? '✓' : '');
          tagsEl.title = '🌐 搜索素材已添加';
        }
      }
    }
  }).catch(function(e) {
    console.log('Search T2 error:', e.message);
  });
}

function matchT2Preset() {
  var problemEl = document.getElementById('t2_problem');
  var customerEl = document.getElementById('t2_customer');
  var presetEl = document.getElementById('t2_preset');
  if (!problemEl || !presetEl) return;
  var text = ((problemEl.value || '') + ' ' + (customerEl ? customerEl.value : '')).toLowerCase();
  if (text.length < 2) return; // too short to match
  // Keyword → preset key mapping (order matters: more specific first)
  var rules = [
    { kw: /投诉|不满|生气|态度|服务差|解决|赔偿/i, preset: '投诉化解' },
    { kw: /装机|新装|安装|拉线|布线|新迁|搬新家|装修/i, preset: '装机故事' },
    { kw: /中秋|春节|端午|节日|过年|送|福利|慰问/i, preset: '节日活动' },
    { kw: /暴雨|风雪|台风|晚上|半夜|凌晨|抢修|紧急/i, preset: '突发事件' },
    { kw: /环卫|外卖|快递|骑手|小哥|失物|找|免费|爱心|帮助/i, preset: '公益服务' },
    { kw: /单位|企业|公司|政府|改造|项目|网络部署/i, preset: '政企服务' },
    { kw: /学生|迎新|报到|新生|校园|开学|大学|高考/i, preset: '校园迎新' },
    { kw: /小区|社区|广场|摆摊|便民|服务点|宣传|活动/i, preset: '社区营销' },
    { kw: /老人.*(手机|智能|教|学|不会|怕|微信)|防诈骗|数字/i, preset: '数字课堂' },
    { kw: /老人|帮|谢谢|感动|视频通话|联系|子女|孙子|哭了|银发/i, preset: '银发服务' },
    { kw: /老街坊|多年|回头客|认识|熟悉|老顾客|十年前|老客户/i, preset: '老客户情谊' },
    { kw: /网慢|网卡|WiFi|路由器|宽带|信号|光猫|报修|不能上网|断网/i, preset: '上门维修' },
    { kw: /套餐|办业务|升级|降档|资费|缴费|换套餐/i, preset: '柜台服务' },
    { kw: /流量|超了|突然|紧急|超支|用完|没流量/i, preset: '突发状况' },
    { kw: /温暖|感动|温馨|治愈|感谢/i, preset: '温暖瞬间' },
  ];
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].kw.test(text)) {
      for (var j = 0; j < presetEl.options.length; j++) {
        if (presetEl.options[j].value === rules[i].preset) {
          presetEl.selectedIndex = j;
          fillT2Presets();
          return;
        }
      }
    }
  }
}

function autoFillBGM(pageId, bgmElId, category, subCategory) {
  var bgmEl = document.getElementById(bgmElId);
  if (!bgmEl || !window.___bgmList) return;
  var cat = window.___bgmList[category];
  if (!cat || !cat[subCategory]) return;
  var songs = cat[subCategory];
  if (songs && songs.length > 0) {
    bgmEl.value = songs[Math.floor(Math.random() * songs.length)];
    bgmEl.style.borderColor = '#008A5C';
    bgmEl.style.background = '#F0FFF4';
    setTimeout(function() { bgmEl.style.borderColor = ''; bgmEl.style.background = ''; }, 1500);
  }
}

function getPhoneTopics(modelName) {
  const phone = phonePool.find(p =>
    (p.brand && p.model && modelName.includes(p.model) && modelName.includes(p.brand)) ||
    p.model === modelName
  );
  if (!phone) return null;
  var brand = phone.brand || '';
  var displayName = phone.brand ? (phone.brand + ' ' + phone.model +
    (phone.storage ? ' (' + phone.storage + ')' : '') +
    (phone.isCore ? ' ★核心' : '')) : phone.model;
  var priceStr = phone.guidePrice ? ('¥' + phone.guidePrice) : (phone.price || '');
  var price = phone.guidePrice || 0;

  // Build spec info
  var specParts = [];
  if (phone.chip) specParts.push(phone.chip);
  if (phone.camera) specParts.push(phone.camera);
  if (phone.battery) specParts.push(phone.battery);
  if (phone.stock !== undefined) specParts.push('库存' + phone.stock + '台');
  if (price) specParts.push('¥' + price);
  var specInfo = specParts.join(' | ');

  // ── 选题智能匹配：根据机型卖点打分 ──
  var scored = [];

  // 基础选题（所有机型都有）
  scored.push({ key: '卖点展示', score: 1, data: {
    item: displayName, func: '核心卖点',
    title: displayName + '卖点一图看：值不值得买？',
    tags: '#' + brand + ' #手机推荐 #换机指南 #电信合约机',
    p1: '配置：' + (phone.chip || phone.storage || '') + (phone.color ? (' · ' + phone.color) : ''),
    p2: '价格：' + priceStr + (phone.stock !== undefined ? (' · 库存' + phone.stock + '台可发货') : ''),
    p3: '亮点：' + (phone.highlight || specInfo),
  }});

  // 选题目录（根据卖点条件匹配，缺参数时用价格段+型号推断）
  var topicTemplates = [
    { key:'续航实测', cond: function(){ var b = (phone.battery || '').replace(/[^0-9]/g,''); return b && b >= 5500 || (!b && price > 2000); }, score:3, data:{ item:displayName, func:'续航实测', title:displayName + '重度使用能撑多久？一天实测告诉你', tags:'#手机续航 #电池实测 #' + brand + ' #换机参考', p1:'早上8点满电出门，开5G+蓝牙+定位，模拟日常使用', p2:'刷抖音2小时+打游戏1小时+拍照100张，看看剩多少电', p3:(phone.battery||'大电池')+'电池，' + displayName + '比同价位机型多撑半天' }},
    { key:'快充体验', cond: function(){ return /闪充|快充|100W|90W|80W/.test(phone.highlight||'') || (phone.battery && phone.battery >= 6500) || price > 3000; }, score:2, data:{ item:displayName, func:'快充体验', title:displayName + '充电有多快？实测从0到100%', tags:'#快充 #' + brand + ' #手机评测', p1:'电量耗尽开始充电，每隔5分钟记录一次电量', p2:'对比普通充电和快充模式，差多少时间', p3:(phone.battery||'大电池')+'配快充，碎片时间充10分钟够用半天' }},
    { key:'拍照样张', cond: function(){ return /OIS|长焦|人像|哈苏|徕卡|光变|XMAGE|潜望|2亿/.test(phone.camera||'') || /2亿|哈苏|人像|拍人/.test(phone.highlight||'') || price > 2500; }, score:3, data:{ item:displayName, func:'拍照样张', title:displayName + '拍照到底怎么样？实拍样张对比', tags:'#手机拍照 #' + brand + ' #影像评测 #换机指南', p1:'白天场景：主摄直出，色彩还原度和解析力如何', p2:'夜景/人像：('+(phone.camera||'高清摄像头')+') 暗光与人像表现', p3:(phone.highlight||'影像实力')+'，和旧手机拍的照片放一起对比' }},
    { key:'5G实测', cond: function(){ return (phone.chip || /5G/i.test(modelName)) && !/小天才|手表|儿童/.test(brand+modelName); }, score:1, data:{ item:displayName, func:'电信5G实测', title:displayName + '电信5G实测：信号+网速', tags:'#手机评测 #电信5G #' + brand + ' #网速测试', p1:'电信5G实测：市区/室内/地库三场景信号对比', p2:(phone.chip||'处理器')+'性能：日常应用启动速度和后台保活', p3:'刷抖音/看直播/视频通话，全程流畅不卡顿' }},
    { key:'性价比', cond: function(){ return price < 2000; }, score:2, data:{ item:displayName, func:'性价比之王', title:displayName + '为什么是' + (price<1200?'百元':'千元') + '机里的性价比之王？', tags:'#性价比 #' + brand + ' #手机推荐 #百元机', p1:'同价位机型对比：' + displayName + '的('+(phone.chip||'')+'+'+(phone.battery||'')+')配置碾压竞品', p2:'日常体验：刷抖音不卡、拍照够用、电池一天一充', p3:'电信合约价'+priceStr+'，还能分期0首付，学生打工人都能上车' }},
    { key:'旗舰横评', cond: function(){ return price > 4000; }, score:2, data:{ item:displayName, func:'旗舰横评', title:displayName + ' vs 同价位旗舰，怎么选？', tags:'#旗舰手机 #' + brand + ' #手机推荐', p1:displayName + '核心卖点：'+ (phone.highlight||specInfo), p2:'对比同价位：' + (phone.chip||'旗舰芯片') + ' ' + (phone.camera||'旗舰影像') + ' ' + (phone.battery||'大电池'), p3:'适合谁：' + (price>6000?'追求极致体验的用户':'预算充足的品质用户') }},
    { key:'大存储', cond: function(){ return /1T|1TB/i.test(phone.storage||''); }, score:2, data:{ item:displayName, func:'大存储方案', title:displayName + ' 1T存储够不够用？教你判断该选多大', tags:'#手机存储 #' + brand + ' #换机指南', p1:'1TB到底能存多少：2万张照片+500个App+100部电影', p2:'谁需要1T：摄影爱好者/视频创作者/工作文件多的人', p3:'对比256G/512G版本差价，算算每GB成本值不值' }},
    { key:'抗摔耐用', cond: function(){ return /抗摔|防摔|防水|IP68|IP69|昆仑/.test(phone.highlight||''); }, score:3, data:{ item:displayName, func:'耐用实测', title:displayName + '真的抗摔防水吗？实测给你看', tags:'#手机耐用 #' + brand + ' #暴力测试', p1:'防水实测：水龙头冲洗/泡水盆，擦干后功能正常', p2:'防摔实测：从桌面/裤兜高度摔落，屏幕完好' + (phone.highlight||''), p3:'送给家里老人/跑工地/送外卖的用户，这个比旗舰芯片重要' }},
    { key:'老年模式', cond: function(){ return price < 2000 && !/小天才|儿童/i.test(brand+modelName); }, score:2, data:{ item:displayName, func:'老年模式', title:displayName + '给爸妈买的手机这样设置才省心', tags:'#老年机 #' + brand + ' #适老手机', p1:'简易模式设置：字体最大+图标最大+屏蔽广告推送', p2:'远程协助：儿女远程帮爸妈操作，不用见面', p3:'电信孝心套餐：' + priceStr + '机价+低月租，爸妈不心疼' }},
    { key:'学生首选', cond: function(){ return price < 2500 && !/小天才|儿童/i.test(brand+modelName); }, score:2, data:{ item:displayName, func:'学生党首选', title:displayName + '学生党换机首选？一天真实体验告诉你', tags:'#学生手机 #' + brand + ' #开学季 #换机指南', p1:'上课记录笔记/拍PPT/刷网课，' + displayName + '够不够用', p2:'课余打游戏/刷抖音/拍照，一天体验总结', p3:'电信校园套餐：' + priceStr + '机价+学生专属大流量套餐' }},
    { key:'生态联动', cond: function(){ return /华为|苹果|HarmonyOS|iOS/.test(brand) && price > 4000; }, score:2, data:{ item:displayName, func:'生态联动', title:displayName + '和家里其他' + brand + '设备怎么联动？', tags:'#' + brand + '生态 #全家桶 #智能生活', p1:brand+'全家桶：手机+平板+手表+电视，一个账号打通', p2:'实用场景：手机上复制→平板上粘贴，手表接电话→手机看消息', p3:'电信全家桶套餐：' + brand + '手机+宽带+电视，比单买省30%' }},
    // 儿童专属
    { key:'儿童安全', cond: function(){ return /小天才|儿童|手表/i.test(brand+modelName); }, score:5, data:{ item:displayName, func:'儿童安全', title:displayName + '孩子定位防护全攻略', tags:'#儿童手表 #小天才 #安全教育 #家长必看', p1:'实时定位+安全围栏：孩子进出校门/到家自动通知', p2:'上课禁用+通话白名单：防沉迷，只接家人电话', p3:priceStr+'电信儿童副卡：共享主卡流量，月租低至10元' }},
    // 默认兜底（排除儿童手表，已有专用选题）
    { key:'5G实测', cond: function(){ return !/小天才|儿童|手表/i.test(brand+modelName); }, score:1, data:{ item:displayName, func:'电信5G实测', title:displayName + '电信5G实测：信号+网速', tags:'#手机评测 #电信5G #' + brand, p1:'电信5G网络下，' + displayName + '的下载上传速度实测', p2:'日常使用：微信/抖音/导航，一整天流畅度体验', p3:'到' + (phone.store||'附近电信营业厅') + '，免费测速+体验真机' }},
  ];

  // 过滤并排序：满足条件的选题按分数降序
  var matched = topicTemplates.filter(function(t) {
    return t.cond() && !scored.find(function(s) { return s.key === t.key; });
  });

  // 防止重复 key
  var seen = {};
  scored.forEach(function(s) { seen[s.key] = true; });
  var final = scored.concat(matched);
  var deduped = [];
  for (var i = 0; i < final.length; i++) {
    if (!seen[final[i].key]) {
      deduped.push(final[i]);
      seen[final[i].key] = true;
    }
  }

  // 取 top 4 + 合约机优惠（固定）
  deduped.sort(function(a, b) { return b.score - a.score; });
  var top4 = deduped.slice(0, 4);

  var result = {};
  for (var i = 0; i < top4.length; i++) {
    var t = top4[i];
    result[t.key] = t.data;
  }
  // 合约/优惠始终排在最后（儿童手表显示副卡方案）
  var isChild = /小天才|儿童|手表/i.test(brand+modelName);
  result['合约机优惠'] = isChild ? {
    item: displayName, func: '儿童副卡方案',
    title: displayName + '电信儿童副卡怎么开最划算？',
    tags: '#儿童手表 #小天才 #电信副卡 #省钱攻略',
    p1: '儿童副卡月租低至10元/月，共享主卡流量',
    p2: '定位+通话每月流量消耗不到1GB，主卡流量完全够用',
    p3: '来' + (phone.store||'电信营业厅') + '免费开卡，当场设置好安全围栏',
  } : {
    item: displayName, func: '合约机方案',
    title: displayName + '电信合约机怎么买最划算？3种方案对比',
    tags: '#合约机 #' + brand + ' #电信优惠 #省钱攻略',
    p1: '方案一：裸机买 ' + priceStr + '，没优惠但最自由',
    p2: '方案二：套餐合约，最低月消费XX元，立减300-500',
    p3: '方案三：融合套餐，宽带+手机+电视打包，比单买省30%',
  };

  return result;
}

function loadTopicsByDevice() {
  const device = document.getElementById('t3_device').value;
  const topicSelect = document.getElementById('t3_topic');
  const infoDiv = document.getElementById('t3_autofill_info');
  topicSelect.innerHTML = '<option value="">-- 选择选题 --</option>';
  infoDiv.style.display = 'none';
  if (!device) return;
  // Check phone pool first
  const phoneTopics = getPhoneTopics(device);
  if (phoneTopics) {
    Object.keys(phoneTopics).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key + ' — ' + phoneTopics[key].title;
      topicSelect.appendChild(opt);
    });
    return;
  }
  // Check techDB for telecom devices
  if (techDB[device]) {
    Object.keys(techDB[device].topics).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key + ' — ' + techDB[device].topics[key].title;
      topicSelect.appendChild(opt);
    });
    return;
  }
  // Fallback: brand fuzzy match for any device not in phonePool or techDB
  var fallbackTopics = buildFallbackTopics(device);
  if (fallbackTopics) {
    Object.keys(fallbackTopics).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key + ' — ' + fallbackTopics[key].title;
      topicSelect.appendChild(opt);
    });
  }
}

function autoFillTech() {
  const device = document.getElementById('t3_device').value;
  const topic = document.getElementById('t3_topic').value;
  const infoDiv = document.getElementById('t3_autofill_info');
  const summary = document.getElementById('t3_fill_summary');
  let data = null;
  // Check phone pool first
  const phoneTopics = getPhoneTopics(device);
  if (phoneTopics && phoneTopics[topic]) {
    data = phoneTopics[topic];
  }
  // Check techDB for telecom devices
  else if (techDB[device] && techDB[device].topics[topic]) {
    data = techDB[device].topics[topic];
  }
  // Fallback: fuzzy match by topic keyword
  if (!data && topic) {
    data = fuzzyTechFill(device, topic);
  }
  // Final fallback: generic topics for any unrecognized device
  if (!data && topic) {
    var fb = buildFallbackTopics(device);
    if (fb && fb[topic]) data = fb[topic];
  }
  if (!data) {
    infoDiv.style.display = 'none';
    return;
  }
  document.getElementById('t3_item').value = data.item || device;
  document.getElementById('t3_func').value = data.func || '详解';
  document.getElementById('t3_p1').value = data.p1 || '';
  document.getElementById('t3_p2').value = data.p2 || '';
  document.getElementById('t3_p3').value = data.p3 || '';
  document.getElementById('t3_title').value = data.title || '';
  document.getElementById('t3_tags').value = data.tags || '';
  summary.textContent = '设备: ' + (data.item || device) + ' | 选题: ' + topic + ' | 标题: ' + data.title + ' | 3个要点已自动填入';
  infoDiv.style.display = 'block';

  // v2.7: 手机类强制走 phonePool 翻译层（替换 techDB 话术）
  var phone = findPhoneByName(device);
  if (phone) {
    document.getElementById('t3_item').value = phone.brand + ' ' + phone.model;
    document.getElementById('t3_p1').value = translateSpecToSlogan(phone.camera, 'camera');
    document.getElementById('t3_p2').value = translateSpecToSlogan(phone.chip, 'chip');
    document.getElementById('t3_p3').value = translateSpecToSlogan(phone.battery, 'battery');
    document.getElementById('t3_title').value = phone.brand + ' ' + phone.model;
    summary.textContent = '设备: ' + phone.brand + ' ' + phone.model + ' | 选题: ' + topic + ' ✅ 自动生成已就绪';
    // 自动渲染三大区
    renderT3AutoSection(device);
  }
}

function fuzzyTechFill(device, topic) {
  var t = topic.toLowerCase();
  var item = device;
  var func = '详解';
  var title = topic;
  var tags = '#宽带科普 #电信营业厅 #实用知识';
  var p1 = '', p2 = '', p3 = '';
  // Detect topic type
  if (/实测|对比|测试|速度/i.test(t)) {
    func = '实测对比';
    if (/FTTR|全屋/i.test(t)) {
      p1 = 'FTTR每个房间实测：主路由放在客厅，卧室隔两堵墙WiFi信号格数对比';
      p2 = 'Speedtest实测数据：普通路由器卧室50M，FTTR光纤到屋卧室900M+';
      p3 = '结论：FTTR多花的月租值不值？算一笔账，月均多30元换来全屋满速';
    } else if (/5G|网速|下载/i.test(t)) {
      p1 = '实测环境：电信5G网络，市区/室内/室外三个场景分别测试';
      p2 = '下载速度：王者荣耀1.5GB下载仅需12秒，4G需要3分钟';
      p3 = '对比友商：同样位置电信5G快30%，延迟低15ms';
    } else {
      p1 = '实测条件：统一环境、统一时间、三次测量取平均值';
      p2 = '核心数据：列举3个关键指标的实测数值对比表';
      p3 = '选购建议：就你日常使用场景，选性价比最高的方案';
    }
    tags = '#实测 #网速测试 #对比评测';
  } else if (/图|指示|灯|接口|说明/i.test(t)) {
    func = '图解说明';
    p1 = '正面/前面板：从左到右逐一标注，功能一句话说明';
    p2 = '背面接口：网口/电源/光纤口/复位键，用箭头标注每个的作用';
    p3 = '指示灯含义：不同颜色/闪烁代表什么状态，一张图秒懂';
  } else if (/值不值|划算|价格|省钱|费用/i.test(t)) {
    func = '成本分析';
    p1 = '月费：基础套餐XX元，算上所有优惠实际月均多少钱';
    p2 = '对比：同档位移动/联通套餐，电信多送了哪些权益';
    p3 = '长期算账：3年合约期总花费 vs 单买设备+单办宽带，省了多少';
    tags = '#省钱攻略 #宽带套餐 #电信优惠';
  } else if (/装|DIY|教程|步骤|怎么|如何/i.test(t)) {
    func = '安装教程';
    p1 = '第一步：准备工具和材料（光猫/路由器/网线/光纤/工具刀）';
    p2 = '第二步：连接顺序详解（光纤→光猫→路由器→设备），每种线的颜色标记';
    p3 = '第三步：通电测试，指示灯是否正常，手机搜WiFi连接测速';
  } else {
    func = '核心卖点';
    p1 = '产品定位：适合什么人群、什么使用场景，一句话说清楚';
    p2 = '核心优势：对比同类产品的3个差异化卖点';
    p3 = '注意事项：购买/安装/使用中容易踩的坑，提前避雷';
  }
  return { item: item, func: func, title: title, tags: tags, p1: p1, p2: p2, p3: p3 };
}

function switchT3Mode(mode) {
  document.querySelectorAll('#t3-mode-talk, #t3-mode-silent').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('#t3-mtab-talk, #t3-mtab-silent').forEach(el => el.classList.remove('active'));
  document.getElementById('t3-mode-' + mode).classList.add('active');
  document.getElementById('t3-mtab-' + mode).classList.add('active');
  // Hide all previews on switch
  document.getElementById('preview3-talk').style.display = 'none';
  document.getElementById('preview3-silent').style.display = 'none';
  var sdBtns = document.getElementById('silentDownloadBtns');
  if (sdBtns) sdBtns.style.display = 'none';
  updateMobileBarAction();
}

function previewT3Talk() {
  const c = id => document.getElementById('t3_'+id).value;
  if (!c('item') || !c('title')) { alert('请先在顶部选好设备和选题！'); return; }
  const item = c('item');
  const city = c('city') || '本地';
  const bgm = c('bgm');
  const title = c('title');
  const tags = c('tags');
  const topic = document.getElementById('t3_topic').value;
  // Check if phone review → use phone-specific talking scripts (兼容新旧格式)
  const phone = findPhoneByName(item);
  var html = '';
  if (phone) {
    var t3hookText = (document.getElementById('t3_hook_text')||{}).value || '';
    html = buildPhoneTalkScript(phone, topic, city, bgm, title, tags, t3hookText);
  } else {
    html = buildDeviceTalkScript(item, c, city, bgm, title, tags);
  }
  var variantHtml = tryVariantInjection(item + ' ' + topic, bgm, 'preview3-talk');
  const el = document.getElementById('preview3-talk');
  el.style.display = 'block';
  var t3hook = '';
  var t3hookEl = document.getElementById('t3_hook_text');
  if (t3hookEl && t3hookEl.value.trim()) {
    t3hook = '<div class="stage">🎯 黄金钩子 — 对着镜头直接说这句话</div>\n<div class="dialogue" style="color:#BF360C;font-weight:700;">"' + esc(t3hookEl.value.trim()) + '"</div>\n';
  }
  el.innerHTML = (variantHtml || '') + t3hook + html + buildPreviewFooter('t3', city, topic);
  console.log('[诊断] T3 Talk variant card in HTML = ' + (variantHtml ? 'YES' : 'NO') + ' city=' + city);
  addCopyButton('preview3-talk');
  el.scrollIntoView({ behavior: 'smooth' });
  checkPublishForm('template3');
}

function buildPhoneTalkScript(phone, topic, city, bgm, title, tags, userHook) {
  const model = phone.model;
  const price = phone.guidePrice || phone.price || 0;
  // v2.7: phonePool 字段走翻译层（口语化版本，不带结论词后缀）
  const chip = translateSpecToFact(phone.chip, 'chip') || (price > 4000 ? '旗舰芯片' : price > 2000 ? '性能芯片' : '高性价比芯片');
  const battery = translateSpecToFact(phone.battery, 'battery') || (price > 3000 ? '大容量电池' : price > 1500 ? '长续航电池' : '日常够用电池');
  const camera = translateSpecToFact(phone.camera, 'camera') || (price > 3500 ? '旗舰级影像系统' : price > 2000 ? '高清多摄' : '高清主摄');
  const highlight = translateSpecToFact(phone.highlight, 'highlight') || (price > 4000 ? '旗舰性能·顶级体验' : price > 2000 ? '均衡实力派' : '入门首选·物超所值');
  // Choose hook and talking points based on topic category
  var hook = '', p1 = '', p2 = '', p3 = '';
  if (topic.includes('续航')) {
    var isChildDevice = /小天才|儿童|手表/.test(phone.brand + phone.model + (phone.highlight||''));
    if (isChildDevice) {
      hook = '给孩子买手表，最怕什么？学校还没放学，手表没电了，联系不上！';
      p1 = model + '用的是' + battery + '，正常使用能用1-2天。什么概念？早上孩子戴出门，白天定位一直开着、偶尔打个电话，到晚上回家还有电。你不用天天记着充电，周末充一次差不多够一周上学用。';
      p2 = '待机长还有一个好处——安全围栏和实时定位不会断。最怕的就是孩子手表没电了你找不到人。' + model + '的低电量会自动提醒你，还剩15%就发通知，你提前就知道，不会突然失联。';
      p3 = highlight + '，' + (price||'') + '。' + city + '的家长来店里，我帮你设置好低电量提醒和安全围栏，回去直接用，省心。';
    } else {
      hook = '你们是不是也这样——手机用到下午三四点就没电，到处找充电宝？';
      p1 = '我今天说的' + model + '，电池' + battery + '。什么概念呢？你早上8点满电出门，刷抖音、看微信、中午打两把游戏，到晚上回家还剩20%。你想想你现在的手机能不能撑到下班？咱不吹，' + battery + '这个数字在这儿摆着，你拿同价位的比一圈就懂了。而且' + chip + '功耗控制得也好，续航这东西芯片+电池都得看。';
      p2 = '充电也快——你利用洗脸刷牙那十几分钟插上，够你用半天了。不用非得睡觉前充一宿。这个习惯其实对电池寿命也有好处。';
      p3 = highlight + '，这个价位有这个续航，讲真性价比挺能打的。你要是一天到晚到处跑、开会、出差，真的别再忍充电宝了，换个大电池的该换了。';
    }
  } else if (topic.includes('拍照') || topic.includes('样张')) {
    var isChildDevice = /小天才|儿童|手表/.test(phone.brand + phone.model + (phone.highlight||''));
    if (isChildDevice) {
      hook = '很多家长问我：' + model + '能视频通话吗？画质怎么样？';
      p1 = model + '有' + camera + '。很多家长最关心的问题——孩子在学校想你了，能不能清楚地看到你？这个双摄就是干这个的，前置视频通话，后置拍作业、拍环境。';
      p2 = '实际体验怎么样？' + highlight + '。光线好的时候很清楚，光线暗的时候也不会一片黑。孩子放学路上、在公园里，你打开手机随时能看到他在干嘛。';
      p3 = '最后说一句：' + (price||'') + '，买的不只是手表，是 peace of mind。' + city + '的家长来店里，我帮你设置好视频通话，回去就能跟孩子连上。';
    } else {
      hook = '买手机最怕什么？网上看样张美得不行，到手一拍——就这？';
      p1 = model + '用的' + camera + '。我们先不说参数——你知道怎么判断一个手机拍照好不好？教你们一个最简单的办法：直接来店里，拿你现在的手机跟我这台站同一个位置、拍同一个东西，两张放一起比。参数都是虚的，你自己的眼睛不会骗你。';
      p2 = '日常拍照最容易翻车的是什么？不是白天，是晚上。餐馆灯光暗、路边光线杂——' + model + '的' + camera + '在暗光这块，' + highlight + '。你想想你手机相册里糊掉的那些照片，是不是都是晚上拍的？';
      p3 = '最后说一句掏心窝的话：' + price + '这个价位，你要想拍照，' + model + '值得你来店里摸摸。别信网上的评测图，来店里自己拍两张，你说了算。';
    }
  } else if (topic.includes('5G') || topic.includes('网速') || topic.includes('信号')) {
    var isChildDevice = /小天才|儿童|手表/.test(phone.brand + phone.model + (phone.highlight||''));
    if (isChildDevice) {
      hook = '很多家长担心：' + model + '通话会不会断？定位准不准？';
      p1 = model + '用的电信4G全网通，信号稳。孩子在学校、在小区、在公园，你打电话过去秒接通。不会出现"暂时无法接通"那种让家长心跳加速的情况。咱营业厅实测过，地下车库、电梯里，通话不会断。';
      p2 = '定位靠什么？靠的是4G+GPS+WiFi三重定位，电信基站覆盖密度在咱山西是领先的。孩子走到哪，你手机上看得一清二楚，定位刷新延迟不超过30秒。' + highlight + '——说白了就是让你放心。';
      p3 = '怎么验证？来' + city + '营业厅，我拿' + model + '当场给你演示：你手机装个App，手表绑上去，你走出店门看定位刷新多快。亲眼看到比你听我说一百遍都管用。';
    } else {
      hook = '你有没有遇到过——明明显示5G满格，视频就是加载不出来？';
      p1 = '问题不在手机，在运营商。' + model + '搭配电信5G网络，我给大家说个真实的——电信的基站覆盖密度在咱山西这边，尤其是太原市区，你在地下车库、电梯里都不断网。这不是手机好，这是电信的信号好。你用别的运营商的卡，同样的手机，信号差一截。';
      p2 = chip + '这个处理器本身就支持完整的5G频段，电信的N78主流频段完美适配。简单说就是：手机和网络都拉满了。你打视频电话不会花屏、看直播不会转圈。';
      p3 = '怎么验证？来店里我直接用' + model + '给你跑个测速，你自己看数字——下载速度几百兆、延迟十几毫秒。不用我说，数据说话。' + city + '的朋友有空过来，就当路过看看。';
    }
  } else if (topic.includes('合约') || topic.includes('优惠') || topic.includes('划算')) {
    var isChildDevice = /小天才|儿童|手表/.test(phone.brand + phone.model + (phone.highlight||''));
    if (isChildDevice) {
      hook = '给孩子买' + model + '，怎么买最省钱？我给你算笔账。';
      p1 = model + '单买是' + (price||'') + '。但如果你家里已经有电信宽带或者套餐，办一张儿童副卡——月租低至10块，手表' + highlight + '一起打包，整体比单买能省不少。你等于把手表和以后每月的通话流量钱一起解决了。';
      p2 = '很多人不知道——电信儿童副卡是共享主卡流量的。你家里宽带给的那几十G流量，全家用不完，分10G给孩子手表绰绰有余。手表导航定位、视频通话、语音消息，一个月根本用不了多少流量。';
      p3 = '最后说句实在的：' + (price||'') + '买的是安心。定位+围栏+上课禁用+副卡低月租，打包算下来比外面单买划算。' + city + '的家长来店里，我帮你把主卡副卡全部设置好，你回去插卡就能用。';
    } else {
      hook = '你买手机是直接掏' + price + '买裸机，还是走合约省几百？';
      p1 = '先说裸机——' + model + '官方价' + price + '。去哪都是这个价，没毛病。但你如果正好要办宽带，或者要续费你现在的套餐——那合约机至少帮你省两三百，有时候更多。';
      p2 = '这个省钱原理很简单——电信跟手机厂商拿货有集采价，你本质上是把宽带的钱、套餐的钱汇总在一起，电信把采购差价让利给你。你要是不办宽带也不办套餐，那直接买裸机就行，不强求。';
      p3 = highlight + '，' + camera + '，' + battery + '续航，' + chip + '——东西是好东西，怎么买划算你自己算。来' + city + '营业厅我帮你算清楚，算完不买也没事，至少你知道这个手机到底该花多少钱。';
    }
  } else {
    // 卖点展示/通用——根据机型类型生成不同话术
    var isChildDevice = /小天才|儿童|手表/.test(phone.brand + phone.model + (phone.highlight||''));
    var isSeniorPhone = /老年|老人|大字|简易/.test(phone.model + (phone.highlight||''));
    
    if (isChildDevice) {
      hook = '最近好多家长问我：' + model + '到底值不值得买？我今天不说参数，就说三点。';
      if (userHook && /缺点|先说|不足/i.test(userHook)) {
        p1 = '先说缺点——' + model + '毕竟不是手机，屏幕小、不能装游戏App。但这就是我要给家长推荐的：孩子不该整天抱着手机刷短视频。';
        p2 = '但定位这块太强了。实时定位+安全围栏，孩子放学到没到小区门口，手机立刻通知你。上课禁用模式一开，上课时间段只能看时间，什么电话都打不进来。';
        p3 = '第三，' + highlight + '。' + (price||'') + '，电信儿童副卡月租低至10块。' + city + '的家长来店里，我帮你设置好安全围栏和上课时段，回去直接用。';
      } else {
        p1 = '第一，定位——' + model + '支持实时定位+安全围栏。孩子进校门、出校门、到家，你手机第一时间收到通知。不是大概位置，是精准到小区哪栋楼。';
        p2 = '第二，上课禁用——设置好时间段，上课期间只能看时间、打紧急电话。什么游戏、什么短视频，根本进不去。放学铃一响自动恢复。';
        p3 = '第三，' + highlight + '。' + (price||'') + '，电信儿童副卡共享主卡流量，月租低到10块。' + city + '的家长来店里，我帮你设置好，回去直接用。';
      }
    } else if (isSeniorPhone) {
      hook = '最近好多叔叔阿姨问我：' + model + '老人用方不方便？我今天不说参数，就说三点。';
      p1 = '第一，字体大、声音大——' + model + '把字体调到最大，老花眼不用眯着眼看。来电铃声也大，厨房做饭都能听见。';
      p2 = '第二，操作简单——没有乱七八糟的App，桌面就几个大图标：电话、短信、相机。不会误触，不会点到广告下载一堆东西。';
      p3 = '第三，' + highlight + '。' + (price||'') + '，电信老人套餐月租低，家里宽带一起打包更省。' + city + '的叔叔阿姨来店里，我教你怎么用，包教包会。';
    } else {
      // 普通手机话术（原有逻辑）
      hook = '最近好多人问我：' + model + '到底值不值得买？我今天不念参数，就说三点。';
      if (userHook && /缺点|先说|不足/i.test(userHook)) {
        p1 = '先说缺点——' + chip + '虽然日常完全够用，但重度游戏党可能会觉得不如旗舰机。不过说实话，这个价格段你找不出更好的了。';
        p2 = '但优点太强了。第一是续航——' + battery + '，你不用天天操心电量。正常上下班一天妥妥的，周末出去逛一天不用带充电宝。再加上' + camera + '拍照，日常拍拍足够了。';
        p3 = '第二是' + highlight + '。如果你正好要办宽带或者续套餐，合约买比裸机便宜。' + price + '起，' + city + '的直接来店里我给你算清楚。来了不买也没事，至少你知道怎么买最省钱。';
      } else {
        p1 = '第一，处理器' + chip + '——性能这块你完全不用担心。刷抖音、打游戏、开好几个App来回切，它不卡。我这么说吧，日常使用两年内你不会觉得慢。';
        p2 = '第二，续航和充电——' + battery + '，你不用天天操心电量。正常上下班一天妥妥的，周末出去逛一天不用带充电宝。再加上' + camera + '拍照，日常拍拍足够了。';
        p3 = '第三，最打动人的——' + highlight + '。如果你正好要办宽带或者续套餐，合约买比裸机便宜。' + price + '起，' + city + '的直接来店里我给你算清楚。来了不买也没事，至少你知道怎么买最省钱。';
      }
    }
  }
  return '<div class="stage">🎬 口播脚本 · 直接念就行</div>' +
    '<div class="info-tag">📱 ' + model + ' | ⏱ 约45秒 | 手持手机边说边展示外观</div>' +
    '<div class="info-tag">🎵 BGM: ' + bgm + '（音量25-30%，铺底不压人声）</div>' +
    '<div class="info-tag" style="color:#E65100;">💡 重点是念顺嘴——不用测续航/拍照，话术已经帮你写好了</div>' +
    '<div class="stage">【开场 0-5秒】拿出' + model + '，眼睛看镜头</div>' +
    '<div class="action-note">→ 手机自然拿在手里，不要挡脸。对着镜头像跟朋友聊天。</div>' +
    '<div class="dialogue">"' + (userHook || hook) + '先收藏，我给你一个一个说清楚。"</div>' +
    '<div class="stage">【话术一 5-18秒】' +
    '<div class="dialogue">' + p1 + '</div>' +
    '<div class="action-note">→ 说到这里把手机翻个面，展示后背/侧面设计，手指在对应的位置点一下</div>' +
    '<div class="stage">【话术二 18-30秒】' +
    '<div class="dialogue">' + p2 + '</div>' +
    '<div class="action-note">→ 点一下摄像头区域/边框，表示在做对比。表情轻松，像在分享心得不是卖货</div>' +
    '<div class="stage">【话术三 30-42秒】' +
    '<div class="dialogue">' + p3 + '</div>' +
    '<div class="action-note">→ 收尾时微笑看镜头，点头。语气从讲解变成邀请</div>' +
    '<div class="stage">【结尾引导】</div>' +
    '<div class="dialogue">"地址我放评论区了。觉得有用帮我点个收藏，下次你买手机拿出来对着看——别到时候又忘了。"</div>' +
    '<div class="action-note">→ 笑着挥手。尾部加字幕"📍 ' + city + '电信营业厅 · 欢迎来试真机"</div>' +
    '<div class="info-tag" style="margin-top:12px;">📝 发布标题: ' + title + '</div>' +
    '<div class="info-tag">🏷 标签: ' + tags + '</div>' +
    '<div class="info-tag">💡 忘词了就换种说法接着说——自然的磕巴比完美念稿好100倍。话术都写好了，别紧张。</div>';
}

function buildDeviceTalkScript(item, c, city, bgm, title, tags) {
  const p1raw = c('p1') || '';
  const p2raw = c('p2') || '';
  const p3raw = c('p3') || '';
  function cleanP(raw) {
    var idx = raw.indexOf('：');
    return idx > 0 ? raw.substring(idx+1).trim() : raw.trim();
  }
  var feat1 = cleanP(p1raw);
  var feat2 = cleanP(p2raw);
  var feat3 = cleanP(p3raw);
  // 兜底：空卖点时用设备类型生成通用话术
  var isDevice = item.includes('光猫')||item.includes('路由')||item.includes('机顶盒')||item.includes('宽带');
  var objZh = isDevice ? '设备' : '手机';
  var fallbacks = isDevice ?
    ['安装简单，自己也能搞定', '信号稳定，不掉线', '性价比高，比外面单买划算'] :
    ['屏幕清晰，看视频舒服', '电池耐用，一天不用充电', '价格实惠，这个价位性价比很高'];
  if (!feat1) feat1 = fallbacks[0];
  if (!feat2) feat2 = fallbacks[1];
  if (!feat3) feat3 = fallbacks[2];
  return '<div class="stage">🎬 一镜到底 · 拍摄指南</div>' +
    '<div class="info-tag">📱 全程一个镜头，手持' + objZh + '边走边聊 | ⏱ 约40秒 | 不剪辑</div>' +
    '<div class="info-tag">🎵 BGM: ' + bgm + '（音量调25-30%，铺底不压人声）</div>' +
    '<div class="stage">【开场 0-5秒】自然拿出' + objZh + '，建立场景</div>' +
    '<div class="action-note">→ 像跟朋友聊天一样，不要播音腔。眼睛看镜头=看观众。</div>' +
    '<div class="dialogue">"来，今天给你们看个东西——' + item + '。这东西很多人天天用，但好多人不知道——它是怎么选的、值不值、用起来到底咋样。先收藏，我给你一个一个说清楚。"</div>' +
    '<div class="stage">【中段 5-30秒】边走边展示三个点，手指指向实物对应部位</div>' +
    '<div class="action-note">→ 每换一个功能点，自然地把手中' + objZh + '转个角度，手指点指对应位置</div>' +
    '<div class="dialogue">"第一，（' + feat1 + '）——这个是最多人关心的。"</div>' +
    '<div class="action-note">→ 手指指向/展示对应部位，停留2-3秒让镜头捕捉</div>' +
    '<div class="dialogue">"第二，（' + feat2 + '）——这个一般人不知道，来镜头拉近看。"</div>' +
    '<div class="action-note">→ 把' + objZh + '凑近镜头</div>' +
    '<div class="dialogue">"最重要的是第三个，（' + feat3 + '）——这个才是值不值的关键。"</div>' +
    '<div class="action-note">→ 竖大拇指/点头，给肯定表情</div>' +
    '<div class="stage">【结尾 30-38秒】价格锚点 + 行动引导</div>' +
    '<div class="dialogue">"那多少钱呢？来店里你就知道了。你在' + city + '的话直接过来上手试，地址我放评论区。觉得有用点个收藏，下次买' + (item.includes('手机')?'手机':'设备') + '拿出来对照看——别到时候又忘了。"</div>' +
    '<div class="action-note">→ 笑着挥手，自然淡出。尾部加字幕"📍 ' + city + '电信营业厅欢迎来试"</div>' +
    '<div class="info-tag" style="margin-top:12px;">📝 发布标题: ' + title + '</div>' +
    '<div class="info-tag">🏷 标签: ' + tags + '</div>' +
    '<div class="info-tag">💡 一镜到底关键：忘词了就换种说法接着说，不要停。自然的磕巴比完美念稿好100倍。</div>';
}

let silentCurrentOption = '';

function previewT3Silent(option) {
  const c = id => document.getElementById('t3_'+id).value;
  if (!c('item') || !c('title')) { alert('请先在顶部选好设备和选题！'); return; }
  silentCurrentOption = option;
  const item = c('item');
  const city = c('city') || '本地';
  const bgm = c('bgm');
  const title = c('title');
  const tags = c('tags');
  const topic = document.getElementById('t3_topic').value;
  const p1raw = c('p1') || '';
  const p2raw = c('p2') || '';
  const p3raw = c('p3') || '';
  function cleanP(raw) {
    const idx = raw.indexOf('：');
    return idx > 0 ? raw.substring(idx+1).trim() : raw.trim();
  }
  const feat1 = cleanP(p1raw);
  const feat2 = cleanP(p2raw);
  const feat3 = cleanP(p3raw);
  let html = '';
  const isDevice = item.includes('光猫')||item.includes('路由')||item.includes('机顶盒')||item.includes('宽带');
  const obj = isDevice ? '设备' : '手机';
  if (option === 'A') {
    html = `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">📱 方案A：实操演示 + 字幕卡（零口播）</div>
<div class="shot-step">
  <span class="shot-time">0-3秒</span>
  <span class="shot-action">🎬 黑屏+白字标题卡弹出</span>
  <span class="shot-subtitle">字幕：${title}</span>
</div>
<div class="shot-step">
  <span class="shot-time">3-15秒</span>
  <span class="shot-action">🎬 ${obj}实物特写，手指从左到右划过关键部位</span>
  <span class="shot-subtitle">字幕：${feat1}</span>
</div>
<div class="shot-step">
  <span class="shot-time">15-27秒</span>
  <span class="shot-action">🎬 演示第二个功能 / 换个角度拍${obj}</span>
  <span class="shot-subtitle">字幕：${feat2}</span>
</div>
<div class="shot-step">
  <span class="shot-time">27-38秒</span>
  <span class="shot-action">🎬 演示第三个功能 / 拍一个完整展示镜头</span>
  <span class="shot-subtitle">字幕：${feat3}</span>
</div>
<div class="shot-step">
  <span class="shot-time">38-42秒</span>
  <span class="shot-action">🎬 画面缩小，弹出收藏引导卡</span>
  <span class="shot-subtitle">字幕：📸 截图保存 · 买${obj}对照看 | 📍 ${city}电信</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${bgm} | 🎬 拍完用剪映加字幕（抖音自带字幕功能即可） | ⏱ 时长约42秒</div>
<div class="shot-note">📱 机位：手机固定桌面/三脚架，${obj}放在镜头前 | 👤 需出镜：否</div>`;
  } else if (option === 'B') {
    html = `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🖼 方案B：一图流 + BGM（最省事）</div>
<div class="shot-step">
  <span class="shot-action">📋 步骤1：点击下方「💎 生成卖点卡」按钮，导出PNG图片</span>
</div>
<div class="shot-step">
  <span class="shot-action">📋 步骤2：打开剪映 → 导入PNG → 时长拉到15-20秒</span>
</div>
<div class="shot-step">
  <span class="shot-action">📋 步骤3：添加BGM「${bgm}」→ 音量调30%</span>
</div>
<div class="shot-step">
  <span class="shot-action">📋 步骤4：加转场效果（推荐"叠化"）→ 导出 → 发布</span>
</div>
<div class="shot-note" style="margin-top:8px;">⏱ 总耗时约3分钟 | 👤 需拍摄：否 | 🎬 需剪辑：是（基本操作）</div>
<div class="shot-note">💡 适合：完全不会拍视频的厅店，一张图+BGM就能发</div>
<div class="info-tag">📝 发布标题: ${title}</div>
<div class="info-tag">🏷 标签: ${tags}</div>`;
  } else if (option === 'C') {
    html = `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">⚖ 方案C：对比画面 + 字幕（收藏率最强）</div>
<div style="font-size:12px;color:#999;margin-bottom:12px;">需要两台${obj}（一台本机+一台对比机），并排放在桌面</div>
<div class="shot-step">
  <span class="shot-time">0-3秒</span>
  <span class="shot-action">🎬 标题卡：${item} vs 同价位对比</span>
  <span class="shot-subtitle">字幕：两台${obj}放桌面，镜头俯拍</span>
</div>
<div class="shot-step">
  <span class="shot-time">3-13秒</span>
  <span class="shot-action">🎬 两台${obj}同时执行同一个操作（开机/打开APP/拍照）</span>
  <span class="shot-subtitle">字幕：${feat1}</span>
  <span class="shot-note">→ 左边是${item}，右边的对比机标注型号</span>
</div>
<div class="shot-step">
  <span class="shot-time">13-23秒</span>
  <span class="shot-action">🎬 同场景拍照对比 / 充电速度对比</span>
  <span class="shot-subtitle">字幕：${feat2}</span>
</div>
<div class="shot-step">
  <span class="shot-time">23-33秒</span>
  <span class="shot-action">🎬 第三个维度对比</span>
  <span class="shot-subtitle">字幕：${feat3}</span>
</div>
<div class="shot-step">
  <span class="shot-time">33-38秒</span>
  <span class="shot-action">🎬 总结卡 + 收藏引导</span>
  <span class="shot-subtitle">字幕：你会选哪个？截图收藏·买${obj}对照看 | 📍 ${city}电信</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${bgm} | ⏱ 约38秒 | 📱 机位：俯拍/桌面固定</div>
<div class="shot-note">💡 对比是收藏率最高的内容形态——用户会截图"以后买的时候对比"</div>`;
  } else if (option === 'D') {
    html = `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🎭 方案D：场景化微对话（最生动）</div>
<div style="font-size:12px;color:#999;margin-bottom:12px;">需要2人配合 | 15-20秒 | 全程不用背词，字幕补信息</div>
<div class="shot-step">
  <span class="shot-time">0-3秒</span>
  <span class="shot-action">🎬 A入画，${obj}拿在手里，表情困惑</span>
  <span class="shot-subtitle">A："这${obj}到底咋样啊？"</span>
</div>
<div class="shot-step">
  <span class="shot-time">3-10秒</span>
  <span class="shot-action">🎬 B接过${obj}，不说话，手指指向关键部位展示</span>
  <span class="shot-subtitle">字幕：${feat1}</span>
  <span class="shot-note">→ B保持微笑不说话，靠画面和字幕传递信息</span>
</div>
<div class="shot-step">
  <span class="shot-time">10-16秒</span>
  <span class="shot-action">🎬 B把${obj}翻个面/换个功能，A凑近看</span>
  <span class="shot-subtitle">字幕：${feat2}</span>
</div>
<div class="shot-step">
  <span class="shot-time">16-18秒</span>
  <span class="shot-action">🎬 A露出满意的表情，竖大拇指</span>
  <span class="shot-subtitle">字幕：${feat3} | 📍 ${city}电信营业厅欢迎来试</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${bgm}（音量25%） | ⏱ 约18秒 | 👥 2人出镜</div>
<div class="shot-note">💡 核心技巧：B不需要背任何参数——字幕会显示所有技术信息。B只需要自信微笑+展示${obj}。</div>`;
  }
  const el = document.getElementById('preview3-silent');
  el.style.display = 'block';
  var t3city = (document.getElementById('t3_city')||{}).value || '';
  var t3topic = (document.getElementById('t3_topic')||{}).value || '';
  var t3hook = '';
  var t3hookEl = document.getElementById('t3_hook_text');
  if (t3hookEl && t3hookEl.value.trim()) {
    t3hook = '<div class="shot-step" style="border-left:4px solid var(--orange);margin-bottom:8px;">\n  <span class="shot-time">0-3秒 🎯</span>\n  <span class="shot-action">🎬 黑屏+大字幕出现</span>\n  <span class="shot-subtitle">"' + esc(t3hookEl.value.trim()) + '"</span>\n  <span style="font-size:10px;color:#E65100;">⚡ 黄金钩子 · 3秒决定完播率</span>\n</div>';
  }
  var variantHtml = tryVariantInjection(item + ' ' + topic, bgm, 'preview3-silent');
  el.innerHTML = (variantHtml || '') + t3hook + html + buildPreviewFooter('t3', t3city, t3topic);
  addCopyButton('preview3-silent');
  var sdBtns = document.getElementById('silentDownloadBtns');
  if (sdBtns) sdBtns.style.display = 'flex';
  el.scrollIntoView({ behavior: 'smooth' });
  checkPublishForm('template3');
}

function switchT4Mode(mode) {
  ['walk','mix','countdown'].forEach(m => {
    document.getElementById('t4-mode-'+m).classList.remove('active');
    document.getElementById('t4-mtab-'+m).classList.remove('active');
  });
  document.getElementById('t4-mode-'+mode).classList.add('active');
  document.getElementById('t4-mtab-'+mode).classList.add('active');
  ['preview4-walk','preview4-mix','preview4-countdown'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  updateMobileBarAction();
}

function previewT4Walk() {
  const city = (document.getElementById('t4_city')||{}).value;
  const preset = (document.getElementById('t4_preset')||{}).value;
  if (!city || !preset) { alert('请选择活动和填写地名！'); return; }
  const bgm = (document.getElementById('t4_bgm')||{}).value || '';
  const shop = (document.getElementById('t4_shop')||{}).value || '电信营业厅';
  const landmark = (document.getElementById('t4_landmark')||{}).value || '';
  const addr = (document.getElementById('t4_addr')||{}).value || '';
  const tags = (document.getElementById('t4_tags')||{}).value || '';
  var variantHtml = tryVariantInjection(preset, bgm, 'preview4-walk');
  
  var fullScript = (window.___t4ScriptFull && ___t4ScriptFull[preset])
    || findScriptFuzzy(window.___t4ScriptFull, preset);
  if (fullScript) {
    var scriptText = fullScript
      .replace(/XX路/g, addr || 'XX路')
      .replace(/XX营业厅/g, (shop.indexOf('电信')>=0 ? shop : ('电信' + shop)));
    var dedupShop = shop;
    if (dedupShop && city && dedupShop.indexOf(city) === 0) dedupShop = dedupShop.slice(city.length).trim();
    var displayShop = dedupShop || shop || '电信营业厅';
    var html = (variantHtml || '') + `
<div class="cover-hint"><strong>💡 本脚本覆盖：</strong>具体福利介绍、到店引导、同城引流话术。</div>
<div class="stage">🎬 探店口播</div>
<div class="info-tag">⏱ 约25秒 | 🎤 手持口播 | 🎵 BGM: ${bgm}</div>

<div class="dialogue" style="white-space:pre-line;line-height:1.6;">"${scriptText}"</div>

<div class="info-tag" style="margin-top:12px;">📝 发布标题: ${city}${landmark ? ' · '+landmark : ''}${displayShop ? ' · '+displayShop : ''}</div>
<div class="info-tag">🏷 标签: ${tags}</div>`;
    showT4Preview('preview4-walk', html);
  } else {
    alert('该活动暂无精选脚本，请选择其他活动。');
  }
}

function previewT4Mix() {
  const c = id => document.getElementById('t4_'+id).value;
  if (!c('city') || !c('benefit')) { alert('请至少填写地名和福利！'); return; }
  var topic = c('preset') || c('benefit');
  var variantHtml = tryVariantInjection(topic, c('bgm'), 'preview4-mix');
  const html = (variantHtml || '') + `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">🎬 海报+实拍混剪（零口播·快速出片）</div>
<div class="shot-step">
  <span class="shot-time">片段1：0-3秒</span>
  <span class="shot-action">🎬 活动海报——纯色背景+大字"${c('benefit')}"+营业厅名</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段2：3-8秒</span>
  <span class="shot-action">🎬 店门口实拍——${c('landmark')}方向的路牌/街景→推进到店门</span>
  <span class="shot-subtitle">字幕："${c('city')}${c('landmark')}·${c('shop')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段3：8-15秒</span>
  <span class="shot-action">🎬 店内环境/服务过程——员工在做什么/设备展示/客户在享受服务</span>
  <span class="shot-subtitle">字幕："${c('desc')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段4：15-22秒</span>
  <span class="shot-action">🎬 信息卡——大字显示地址和时间</span>
  <span class="shot-subtitle">字幕："${c('addr')} | ${c('hours')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">片段5：22-25秒</span>
  <span class="shot-action">🎬 结尾卡——营业厅Logo + 欢迎来店</span>
  <span class="shot-subtitle">字幕："📍${c('shop')} 欢迎来体验"</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${c('bgm')}（音量30%）| ⏱ 约25秒 | 👤 无需出镜</div>
<div class="shot-note">📱 制作：剪映 → 导入5张照片/视频 → 加字幕 → 加BGM → 导出</div>
<div class="info-tag">🏷 标签: ${c('tags')} | 📍 发时加POI位置</div>`;
  showT4Preview('preview4-mix', html);
}

function previewT4Countdown() {
  const c = id => document.getElementById('t4_'+id).value;
  if (!c('city') || !c('benefit')) { alert('请至少填写地名和福利！'); return; }
  var topic = c('preset') || c('benefit');
  var variantHtml = tryVariantInjection(topic, c('bgm'), 'preview4-countdown');
  const html = (variantHtml || '') + `
<div style="font-weight:700;color:#FFD54F;font-size:14px;margin-bottom:12px;">⏰ 倒计时福利卡（紧迫感·限期活动专用）</div>
<div class="shot-step">
  <span class="shot-time">卡片1：0-3秒</span>
  <span class="shot-action">🎬 大红背景+白色大字——"仅剩3天"或"本周末最后"</span>
  <span class="shot-subtitle">紧迫感必须在前3秒砸出来</span>
</div>
<div class="shot-step">
  <span class="shot-time">卡片2：3-8秒</span>
  <span class="shot-action">🎬 福利大字——"${c('benefit')}"</span>
  <span class="shot-subtitle">字幕："${c('desc')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">卡片3：8-15秒</span>
  <span class="shot-action">🎬 实拍或照片——店门口/地标/店内环境</span>
  <span class="shot-subtitle">字幕："${c('city')}${c('landmark')}·${c('shop')}"</span>
</div>
<div class="shot-step">
  <span class="shot-time">卡片4：15-20秒</span>
  <span class="shot-action">🎬 地点+时间——"${c('addr')} | ${c('hours')}"</span>
  <span class="shot-subtitle">字幕："过期不候·现在就来"</span>
</div>
<div class="shot-note" style="margin-top:8px;">🎵 BGM: ${c('bgm')}（节奏感强）| ⏱ 约20秒 | 👤 无需出镜</div>
<div class="shot-note">💡 倒计时的完播率和转化率都比普通活动通知高40%以上。</div>
<div class="info-tag">🏷 标签: ${c('tags')} #限时活动 #${c('city')}同城</div>`;
  showT4Preview('preview4-countdown', html);
}

function showT4Preview(id, html) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  var t4city = (document.getElementById('t4_city')||{}).value || '';
  var t4benefit = (document.getElementById('t4_benefit')||{}).value || '';
  var t4hook = '';
  var t4hookEl = document.getElementById('t4_hook_text');
  if (t4hookEl && t4hookEl.value.trim()) {
    t4hook = '<div class="stage">🎯 黄金钩子 — 对着镜头直接说这句话</div>\n<div class="dialogue" style="color:#BF360C;font-weight:700;">"' + esc(t4hookEl.value.trim()) + '"</div>\n';
  }
  el.innerHTML = t4hook + html + buildPreviewFooter('t4', t4city, t4benefit);
  addCopyButton(id);
  el.scrollIntoView({ behavior: 'smooth' });
  checkPublishForm('template4');
}

function clearT4() {
  ['t4_city','t4_landmark','t4_shop','t4_addr','t4_tags'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('t4_benefit').value = '免费贴膜';
  document.getElementById('t4_desc').value = '苹果安卓、曲面直屏都能贴，比外面30块的还好';
  document.getElementById('t4_hours').value = '早9点到晚8点';
  ['preview4-walk','preview4-mix','preview4-countdown'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

function fillT4Presets() {
  const key = document.getElementById('t4_preset').value;
  if (!key || !t4Presets[key]) return;
  const p = t4Presets[key];
  document.getElementById('t4_benefit').value = p.benefit;
  document.getElementById('t4_desc').value = p.desc;
  document.getElementById('t4_tags').value = p.tags + ' #' + (document.getElementById('t4_city').value || '同城');
  ['t4_benefit','t4_desc','t4_tags'].forEach(id => {
    const el = document.getElementById(id);
    el.style.borderColor = '#008A5C'; el.style.background = '#F0FFF4';
    setTimeout(function() { el.style.borderColor = ''; el.style.background = ''; }, 1200);
  });
  // Auto-fill BGM based on activity type
  var subCat = '探店活力';
  if (/清洁|贴膜/i.test(key)) subCat = '温馨服务';
  else if (/体验|测速/i.test(key)) subCat = '福利快闪';
  else if (/送礼|特惠|换新/i.test(key)) subCat = '福利快闪';
  else if (/社区/i.test(key)) subCat = '温馨服务';
  autoFillBGM('template4', 't4_bgm', '本地事件', subCat);
  // v2.0: Auto-select best hook type based on activity
  var t4Hooks = {'免费贴膜':'value','免费测速':'value','办业务送礼':'conflict','以旧换新':'value','手机清洁':'empathy','宽带体验':'conflict','暑期特惠':'conflict','社区服务':'empathy'};
  autoSelectHook('t4', key);
}

function matchT4Preset() {
  var benefitEl = document.getElementById('t4_benefit');
  var presetEl = document.getElementById('t4_preset');
  if (!benefitEl || !presetEl) return;
  var text = (benefitEl.value || '').toLowerCase();
  if (text.length < 2) return;
  var rules = [
    { kw: /贴膜|膜/i, preset: '免费贴膜' },
    { kw: /测速|网速|网.*测/i, preset: '免费测速' },
    { kw: /送礼|办业务|新装|宽带.*办|优惠/i, preset: '办业务送礼' },
    { kw: /以旧换新|换新|旧.*换|抵|回收/i, preset: '以旧换新' },
    { kw: /清洁|消毒|保养|除尘/i, preset: '手机清洁' },
    { kw: /体验|试用|试.*宽带|尝鲜/i, preset: '宽带体验' },
    { kw: /暑假|暑期|毕业|学生|应届/i, preset: '暑期特惠' },
    { kw: /社区|小区|便民|上门|服务点/i, preset: '社区服务' },
  ];
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].kw.test(text)) {
      for (var j = 0; j < presetEl.options.length; j++) {
        if (presetEl.options[j].value === rules[i].preset) {
          presetEl.selectedIndex = j;
          fillT4Presets();
          return;
        }
      }
    }
  }
}

function clearTemplate3() {
  document.getElementById('t3_device').value = '';
  document.getElementById('t3_topic').innerHTML = '<option value="">-- 请先选设备，再选选题 --</option>';
  document.getElementById('t3_city').value = '';
  document.getElementById('t3_autofill_info').style.display = 'none';
  ['t3_item','t3_func','t3_p1','t3_p2','t3_p3','t3_title','t3_tags'].forEach(id => {
    document.getElementById(id).value = '';
  });
  var talkEl = document.getElementById('preview3-talk');
  if (talkEl) talkEl.style.display = 'none';
  document.getElementById('preview3-silent').style.display = 'none';
  var sdBtns = document.getElementById('silentDownloadBtns');
  if (sdBtns) sdBtns.style.display = 'none';
  var infoPanel = document.getElementById('infographicPanel');
  if (infoPanel) infoPanel.style.display = 'none';
  // v2.7: 隐藏新区域
  var sloganArea = document.getElementById('t3_slogan_area');
  if (sloganArea) sloganArea.style.display = 'none';
  var autoSection = document.getElementById('t3_auto_section');
  if (autoSection) autoSection.style.display = 'none';
}

// ═══════ ai.js ═══════
function tryVariantInjection(topicKey, bgm, previewDivId) {
  if (!topicKey) { console.log('[AI卡] 跳过：无 topicKey'); return ''; }
  var persona = getPersona();
  var p = personaDB[persona] || personaDB['sister'];
  var cardId = 'variant-card-' + Math.random().toString(36).slice(2, 8);
  var rem = quotaRemaining();
  console.log('[AI卡] 渲染中 person=' + persona + ' quota=' + rem + ' topic=' + topicKey);
  window['__preview_' + cardId] = previewDivId;
  window['__persona_' + cardId] = persona;
  var btnHtml = rem > 0
    ? '<button id="' + cardId + '-btn" onclick="triggerVariantOptimize(\'' + cardId + '\',\'' + esc(topicKey) + '\')" style="width:100%;padding:10px;border:1.5px dashed var(--blue);border-radius:8px;background:#fff;color:var(--blue);font-size:14px;cursor:pointer;margin-top:4px;">🚀 AI 优化台词（全站剩余' + rem + '次）</button>'
    : '<button id="' + cardId + '-btn" disabled style="width:100%;padding:10px;border:1.5px dashed #ccc;border-radius:8px;background:#f5f5f5;color:#999;font-size:14px;cursor:not-allowed;margin-top:4px;">⛔ 今日5次已用完</button>';
  return '<div id="' + cardId + '" style="background:linear-gradient(135deg,#E8F0FE,#F3E5F5);border:1.5px solid var(--blue);border-radius:10px;padding:12px 16px;margin-bottom:12px;">' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
    '<span style="font-size:0.9em;">' + p.icon + '</span>' +
    '<span style="font-size:12px;font-weight:700;color:var(--blue);">' + p.label + '风格 · AI 工具箱</span>' +
    '<span id="' + cardId + '-quota" style="font-size:10px;color:#999;margin-left:auto;">全站剩余' + rem + '次</span></div>' +
    '<div id="' + cardId + '-body" style="font-size:15px;line-height:1.9;color:var(--dark);min-height:24px;padding:8px 0;"></div>' +
    btnHtml + '</div>';
}

function triggerVariantOptimize(cardId, topicKey) {
  if (quotaRemaining() <= 0) { syncAllQuotaBadges(); return; }
  var btn = document.getElementById(cardId + '-btn'), bodyEl = document.getElementById(cardId + '-body'), quotaEl = document.getElementById(cardId + '-quota');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ 优化中…'; }
  if (quotaEl) quotaEl.textContent = '优化中…';
  var profile = getStoreProfile();
  if (!profile) { if (bodyEl) bodyEl.innerHTML = '<span style="color:#999;">⚠️ 请先绑定营业厅</span>'; if (btn) { btn.disabled = false; btn.textContent = '🚀 AI 优化台词（全站剩余' + quotaRemaining() + '次）'; } return; }
  fetchVariantAI(cardId, topicKey, profile, btn, bodyEl, quotaEl);
}

async function fetchVariantAI(cardId, topicKey, profile, btn, bodyEl, quotaEl) {
  var previewEl = document.getElementById(window['__preview_' + cardId] || '');
  if (!previewEl) { if (bodyEl) bodyEl.innerHTML = '<span style="color:#999;">请先生成预览再点优化</span>'; if (btn) { btn.disabled = false; } return; }
  // Extract all quoted dialogue lines from the preview HTML
  var fullHtml = previewEl.innerHTML;
  var dialogueRegex = /"([^"]{6,})"/g;
  var dialogueLines = [];
  var match;
  while ((match = dialogueRegex.exec(fullHtml)) !== null) {
    dialogueLines.push(match[1]);
  }
  if (dialogueLines.length === 0) {
    if (bodyEl) bodyEl.innerHTML = '<span style="color:#999;">未找到台词，请先生成预览</span>';
    if (btn) { btn.disabled = false; btn.textContent = '🚀 AI 优化台词（全站剩余' + quotaRemaining() + '次）'; }
    return;
  }
  // Build context for AI: structured text from preview
  var src = previewEl.textContent.replace(/\s{3,}/g,'\n').trim().slice(0, 3000);
  try {
    var tpl = detectTemplateType();
    var ctrl = new AbortController(), tid = setTimeout(function(){ctrl.abort();},90000);
    var res = await fetch(PERSONALIZE_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({store:profile.name,persona:profile.persona,topic:topicKey,city:profile.city,templateType:tpl,script:src}),signal:ctrl.signal});
    clearTimeout(tid);
    if (!res.ok) throw new Error('API '+res.status);
    var data = await res.json();
    // Check for backend error
    if (data.error) throw new Error(data.error);
    // New SCF returns {lines: [{orig,new},...]}, old returns {script} or {dialogue}
    var rewrites = (data.lines && data.lines.length > 0) ? data.lines : null;
    var fallbackScript = data.dialogue || data.script || '';
    // Declare polishedText at function scope level
    var polishedText = '';
    var warns = data.warnings || [];
    var aiComments = data.comments || null; // AI co-generated comments
    if (rewrites) {
      polishedText = (data.dialogue && data.dialogue.length > 10) ? data.dialogue : rewrites.map(function(r){ return r['new'] || (r.rewritten || ''); }).filter(Boolean).join('\n\n');
    } else if (fallbackScript && fallbackScript.length > 10) {
      polishedText = fallbackScript;
      warns = data.warnings || [];
    } else {
      throw new Error('empty');
    }
    // Consume global quota (failure also counts)
    var rem = useDailyQuota();
    renderVariantResult(cardId, polishedText, warns, rem, btn, bodyEl, quotaEl, '', rewrites);
    // Cache AI comments for publish kit
    if (aiComments && aiComments.length >= 3) {
      try { AppState.set('ai_comments_' + tpl, aiComments); } catch(e) {}
    }
  } catch(e) {
    // Distinguish error types; don't consume quota for network errors
    var errType = 'unknown';
    var errMsg = e.message || '';
    if (e.name === 'AbortError' || errMsg.indexOf('AbortError') >= 0) {
      errType = 'timeout';
    } else if (errMsg.indexOf('API ' ) === 0) {
      errType = 'api';
    } else if (errMsg === 'empty') {
      errType = 'empty';
    }
    // Only consume quota for real failures (not network issues)
    var rem;
    if (errType === 'timeout' || errType === 'api') {
      // Network/system error — free retry, don't consume quota
      rem = quotaRemaining();
    } else {
      rem = useDailyQuota();
    }
    renderVariantResult(cardId, '', [], rem, btn, bodyEl, quotaEl, errType);
  }
}

function renderVariantResult(cardId, dlg, warns, rem, btn, bodyEl, quotaEl, errType, origLines) {
  errType = errType || '';
  if (dlg) {
    var usageCount = getDailyQuota().used;
    bodyEl.innerHTML = '<div style="font-size:15px;line-height:1.9;color:#222;white-space:pre-wrap;max-height:300px;overflow-y:auto;">'+esc(dlg)+'</div>'+
      '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">'+
      '<span style="font-size:10px;background:#0d7c0d;color:#fff;padding:2px 8px;border-radius:10px;">✨ 优化版 · 第'+usageCount+'次</span>'+
      '<span style="font-size:10px;background:#E8F0FE;color:#1a73e8;padding:2px 8px;border-radius:10px;cursor:pointer;" onclick="copyText(this.parentElement.previousElementSibling.textContent,this)">📋 复制到剪贴板</span>';
    // Add comparison toggle if we have original lines
    if (origLines && origLines.length > 0) {
      bodyEl.innerHTML += '<span id="'+cardId+'-compare-btn" style="font-size:10px;background:#FFF3E0;color:#E65100;padding:2px 8px;border-radius:10px;cursor:pointer;" onclick="var el=document.getElementById(\''+cardId+'-compare\');if(el.style.display===\'none\'){el.style.display=\'block\';this.textContent=\'🔽 收起原文\';}else{el.style.display=\'none\';this.textContent=\'📝 查看原文对比\';}">📝 查看原文对比</span>';
      var compareHtml = '<div id="'+cardId+'-compare" style="display:none;margin-top:6px;padding:8px 10px;background:#FFF3E0;border-radius:6px;font-size:12px;line-height:1.7;color:#666;">';
      for (var c = 0; c < origLines.length; c++) {
        var o = origLines[c];
        if (o.orig && o['new']) {
          compareHtml += '<div style="margin-bottom:6px;"><span style="color:#999;text-decoration:line-through;">'+esc(o.orig)+'</span><br><span style="color:#0d7c0d;">→ '+esc(o['new'])+'</span></div>';
        }
      }
      compareHtml += '</div>';
      bodyEl.innerHTML += compareHtml;
    }
    if (warns && warns.length > 0) {
      bodyEl.innerHTML += '<div style="margin-top:6px;font-size:11px;color:#C62828;background:#FFF3F0;padding:6px 8px;border-radius:6px;">⚠️ 广告法违禁词：'+esc(warns.join(', '))+'</div>';
    }
  } else {
    var errText = '优化失败';
    if (errType === 'timeout') errText = '⏱ 生成超时（模型繁忙），建议稍后重试';
    else if (errType === 'api') errText = '🔧 服务端异常，正在恢复中，稍后重试';
    else if (errType === 'empty') errText = '📭 模型返回为空，可能是输入太短或内容冲突，修改后重试';
    else errText = '⚠️ 优化失败，可重试（无需重新生成预览）';
    bodyEl.innerHTML = '<span style="color:#999;">'+errText+'</span>';
    // 2026-07-20: 失败时也弹 toast，让用户看清
    if (typeof toast === 'function') toast(errText, 'error');
  }
  quotaEl.textContent = '全站剩余' + rem + '次';
  if (rem > 0) { btn.disabled = false; btn.textContent = rem===2 ? '🔄 AI 优化（全站剩余2次）' : '🔄 最后一次（全站剩余1次）'; btn.style.display = ''; }
  else { btn.style.display = 'none'; quotaEl.textContent = '今日已用完';
    var ft = '<div style="margin-top:8px;font-size:11px;color:#999;border-top:1px dashed #ddd;padding-top:6px;">';
    ft += dlg ? '今日5次已用完。可复制上方结果到其他AI工具继续优化。' : '今日5次均失败。建议复制模板台词到其他AI工具（如DeepSeek、豆包）继续优化。';
    ft += '</div>'; bodyEl.innerHTML += ft; }
  syncAllQuotaBadges();
}

// ═══════ live.js ═══════
var liveMode = 'store';

var liveProducts = {
  'store': [
    {name:'🔥 办千兆宽带送手机', price:'129', desc:'盛夏狂欢·vivo/荣耀/小米/OPPO任选'},
    {name:'宽带新装预约（50元）', price:'50', desc:'300M/500M/1000M新装福利价'},
    {name:'宽带提速升级千兆', price:'50', desc:'宽带提速到千兆'},
    {name:'FTTR全光礼包（老用户）', price:'59', desc:'FTTR设备+智屏'},
    {name:'到店领代金券', price:'50', desc:'50元得200元代金券到店领纸品'}
  ],
  'community': [
    {name:'🔥 办千兆宽带送手机', price:'129', desc:'千兆+手机，盛夏狂欢价'},
    {name:'宽带新装预约（50元）', price:'50', desc:'50元预约新装，划算'},
    {name:'宽带提速升级', price:'50', desc:'提速到千兆'},
    {name:'免费WiFi测速', price:'0', desc:'现场免费测宽带速率'},
    {name:'到店送小礼品', price:'免费', desc:'扫码即送'}
  ],
  'outdoor': [
    {name:'🔥 宽带新装预约（50元）', price:'50', desc:'50元预约宽带'},
    {name:'到店领代金券', price:'50', desc:'50元得200元代金券'},
    {name:'免费贴膜', price:'0', desc:'到店享免费贴膜'},
    {name:'到店路线指引', price:'免费', desc:'导航直达'}
  ],
  'home': [
    {name:'宽带提速升级', price:'50', desc:'50元升至千兆'},
    {name:'🔥 办千兆宽带送手机', price:'129', desc:'盛夏狂欢·vivo/荣耀任选'},
    {name:'FTTR全光礼包（老用户）', price:'59', desc:'FTTR+智屏'},
    {name:'路由器以旧换新', price:'到店询', desc:'旧换新享补贴'},
    {name:'企业微信扫码', price:'免费', desc:'加企微，随时咨询'}
  ]
};

function switchLiveMode(mode) {
  liveMode = mode;
  var tabs = document.querySelectorAll('#page-live .mode-tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  var mt = document.getElementById('lv-mtab-' + mode);
  if (mt) mt.classList.add('active');
  var tips = document.getElementById('lv-tips');
  var extra = document.getElementById('lv-extra-fields');
  var plist = document.getElementById('lv-product-list');
  var tipMap = {};
  tipMap['store'] = '<strong>🏪 厅店带货要点：</strong>开播先做福利预告，展示实物或价签，引导点击小房子查看商品。话术结构：福利钩子→产品介绍→引导下单→限时逼单。<br><span style="font-size:11px;color:#999;">💡 数据验证：78%的一线认为「福利促销」是最吸引人的直播内容</span>';
  tipMap['community'] = '<strong>🏘 小区活动要点：</strong>现场收音要好（用领夹麦），拍摄角度拍活动现场+路人。话术结构：现场氛围→服务演示→引导到厅。挂小房子里的团购券方便邻居直接下单。<br><span style="font-size:11px;color:#999;">💡 提醒：直播间必须挂出门店标识牌</span>';
  tipMap['outdoor'] = '<strong>🚶 户外探店要点：</strong>开播挂POI定位，配地名+商圈名本地标签。边走边聊。话术结构：本地标签→探店→小房子商品→到厅引导。<br><span style="font-size:11px;color:#999;">💡 POI挂载率88-92%但直播场景100%在厅店——户外是蓝海</span>';
  tipMap['home'] = '<strong>🔧 入户服务要点：</strong>征得用户同意后拍摄，保护隐私。聚焦「问题→解决」对比。话术结构：痛点→专业解决→小房子预约。<br><span style="font-size:11px;color:#999;">💡 只有16-18%的一线曾入户拍摄——低竞争蓝海内容</span>';
  if (tips) tips.innerHTML = tipMap[mode] || tipMap['store'];
  if (extra) extra.style.display = (mode === 'store') ? 'none' : '';
  // Update product list
  var products = liveProducts[mode] || liveProducts['store'];
  var productHtml = '';
  for (var i = 0; i < products.length; i++) {
    productHtml += '☐ ' + esc(products[i].name) + '（' + esc(products[i].price) + '元）— ' + esc(products[i].desc) + '<br>';
  }
  productHtml += '<span style="font-size:11px;color:#D84315;">⚠️ 小房子上架确认：以上商品需提前在抖音来客后台创建团购券</span>';
  if (plist) plist.innerHTML = productHtml;
  if (typeof track === 'function') track('live_mode_' + mode);
}

function updateLiveProductDesc() {
  var sel = document.getElementById('lv_product');
  var customEl = document.getElementById('lv_product_custom');
  if (!sel) return;
  var val = sel.value;
  // Visual hint: gray when placeholder selected, normal otherwise
  if (!val) {
    sel.style.color = '#999';
    sel.style.fontWeight = '400';
  } else {
    sel.style.color = '';
    sel.style.fontWeight = '';
  }
  // Show/hide custom input
  if (customEl) {
    if (val === '__custom__') {
      customEl.style.display = '';
      customEl.focus();
    } else {
      customEl.style.display = 'none';
    }
  }
  // Update price field based on product selection
  var priceMap = {
    '🔥 办千兆宽带送手机':'129', '宽带新装预约（50元）':'50',
    '宽带提速升级千兆':'50', '宽带提速升级':'50',
    'FTTR全光礼包（老用户）':'59', '到店领代金券':'50',
    '免费贴膜':'0', '免费WiFi测速':'0',
    '路由器以旧换新':'到店询', '企业微信扫码':'免费',
    '到店送小礼品':'免费', '到店路线指引':'免费'
  };
  var priceEl = document.getElementById('lv_price');
  if (priceEl && priceMap[val]) {
    priceEl.value = priceMap[val];
    priceEl.style.borderColor = '#008A5C';
    priceEl.style.background = '#F0FFF4';
    setTimeout(function(){ priceEl.style.borderColor=''; priceEl.style.background=''; }, 1200);
  }
}

var LIVE_STORAGE_KEY = 'douyin_lab_live_form';

function saveLiveForm() {
  try {
    var data = {
      store: (document.getElementById('lv_store')||{}).value||'',
      product: (document.getElementById('lv_product')||{}).value||'',
      price: (document.getElementById('lv_price')||{}).value||'',
      date: (document.getElementById('lv_date')||{}).value||'',
      deadline: (document.getElementById('lv_deadline')||{}).value||'',
      tags: (document.getElementById('lv_tags')||{}).value||'',
      bgm: (document.getElementById('lv_bgm')||{}).value||'',
      location: (document.getElementById('lv_location')||{}).value||'',
      highlight: (document.getElementById('lv_highlight')||{}).value||'',
      mode: liveMode,
      productCustom: (document.getElementById('lv_product_custom')||{}).value||''
    };
    localStorage.setItem(LIVE_STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
}

function restoreLiveForm() {
  try {
    var raw = localStorage.getItem(LIVE_STORAGE_KEY);
    if (!raw) return;
    var data = JSON.parse(raw);
    var ids = ['lv_store','lv_product','lv_price','lv_date','lv_deadline','lv_tags','lv_bgm','lv_location','lv_highlight'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      var key = ids[i].replace('lv_','');
      var val = data[key] || '';
      if (!el || !val) continue;
      el.value = val;
      // Handle custom product restore
      if (ids[i] === 'lv_product' && val === '__custom__') {
        var ce = document.getElementById('lv_product_custom');
        if (ce && data.productCustom) { ce.style.display = ''; ce.value = data.productCustom; }
      }
    }
    if (data.mode && data.mode !== 'store') {
      switchLiveMode(data.mode);
    }
  } catch(e) {}
}

function previewLiveScript() {
  try {
  var storeEl = document.getElementById('lv_store');
  var prodEl = document.getElementById('lv_product');
  var priceEl = document.getElementById('lv_price');
  var dateEl = document.getElementById('lv_date');
  var deadlineEl = document.getElementById('lv_deadline');
  var useDeadline = document.getElementById('lv_use_deadline');
  var deadlineOn = useDeadline && useDeadline.checked;
  var tagsEl = document.getElementById('lv_tags');
  var bgmEl = document.getElementById('lv_bgm');
  var locEl = document.getElementById('lv_location');
  var hlEl = document.getElementById('lv_highlight');
  if (!storeEl || !prodEl) {
    alert('页面加载异常，请刷新后重试');
    return;
  }
  var store = (storeEl.value || '').trim() || 'XX电信营业厅';
  var prod = (prodEl.value || '').trim();
  if (prod === '__custom__') {
    var customEl = document.getElementById('lv_product_custom');
    prod = (customEl && customEl.value || '').trim() || '自定义产品';
  }
  if (!prod) prod = '宽带福利';
  var price = (priceEl && priceEl.value || '').trim() || '1元';
  var date = (dateEl && dateEl.value || '').trim() || '今天';
  var deadline = deadlineOn ? ((deadlineEl && deadlineEl.value || '').trim() || '今晚24点') : '';
  var deadlineLabel = deadlineOn ? ('，' + deadline + '截止') : '，长期在售随时来';
  var tags = (tagsEl && tagsEl.value || '').trim() || '#同城';
  var bgm = '好运来';
  if (bgmEl && bgmEl.value) {
    var parts = bgmEl.value.split(' - ');
    bgm = parts[0];
  }
  var loc = locEl ? esc((locEl.value || '').trim()) : '';
  var hl = hlEl ? esc((hlEl.value || '').trim()) : '';
  var safe_store = esc(store);
  var safe_prod = esc(prod);
  var safe_price = esc(price);
  var safe_date = esc(date);
  var safe_deadline = esc(deadline);
  var safe_tags = esc(tags);
  var safe_bgm = esc(bgm);
  var safe_loc = esc(loc);
  var safe_hl = esc(hl);
  var titleMap = {};
  titleMap['store'] = safe_date + ' ' + safe_store + ' ' + safe_prod + '福利专场！点击小房子查看';
  titleMap['community'] = safe_date + ' ' + safe_store + '走进' + (safe_loc||'小区') + '！' + (safe_hl||'便民服务') + '等你来';
  titleMap['outdoor'] = safe_date + ' ' + (safe_loc||'本地探店') + ' | ' + safe_store + '带你逛' + (safe_loc||'商圈') + '，小房子有惊喜';
  titleMap['home'] = safe_date + ' ' + safe_store + '上门服务现场！网速慢怎么办？小房子预约';
  var sceneScripts = {};
  sceneScripts['store'] = buildStoreScript(safe_store, safe_prod, safe_price, safe_date, safe_deadline);
  sceneScripts['community'] = buildCommunityScript(safe_store, safe_prod, safe_price, safe_date, safe_deadline, safe_loc, safe_hl);
  sceneScripts['outdoor'] = buildOutdoorScript(safe_store, safe_prod, safe_price, safe_date, safe_deadline, safe_loc);
  sceneScripts['home'] = buildHomeScript(safe_store, safe_prod, safe_price, safe_date, safe_loc, safe_hl);
  var title = titleMap[liveMode] || titleMap['store'];
  var script = sceneScripts[liveMode] || sceneScripts['store'];
  // Adjust deadline in script: when deadline is off, convert urgency language to everlasting
  if (!deadlineOn) {
    script = script.replace(/限时限量/g, '超值');
    script = script.replace(/下播即止/g, '随时可购');
    script = script.replace(/没有补单、没有返场！/g, '');
    script = script.replace(/名额有限|最后.个名额|还剩.*名额/g, '库存充足');
    script = script.replace(/最后\d+秒！/g, '');
    script = script.replace(/错过.*不等/g, '随时欢迎');
  }
  var html = '<div style="margin-bottom:12px;">';
  html += '<span class="time-tag">📺 直播标题：</span><span class="line">' + title + '</span><br>';
  html += '<span class="time-tag">🎵 BGM：</span><span class="scene">' + safe_bgm + '</span> · ';
  html += '<span class="time-tag">🏷 标签：</span><span class="scene">' + safe_tags + '</span><br>';
  html += '<span class="time-tag">📱 挂载：</span><span class="action">抖音本地生活「小房子」</span>';
  html += '</div>';
  html += '<div class="hr"></div>';
  html += script;
  html += '<div class="hr"></div>';
  html += '<div style="font-size:11px;color:#888;">📱 开播前5分钟：商品已上架到小房子 √ | POI已挂载 √ | 门店标识牌已展示 √ | 画面/灯光/声音正常 √</div>';
  var panel = document.getElementById('live-preview');
  if (!panel) {
    alert('预览区域加载失败，请刷新后重试');
    return;
  }
  panel.innerHTML = html;
  panel.style.display = 'block';
  addCopyButton('live-preview');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (typeof track === 'function') track('live_preview_' + liveMode);
  setTimeout(checkLiveCompliance, 200);
  } catch(e) { console.error('previewLiveScript error:', e); alert('脚本生成出错: ' + e.message); }
}

function buildStoreScript(store, prod, price, date, deadline) {
  var h = '';
  h += '<div class="time-tag">⏱ 0:00-2:00 开场暖场+福利预告</div>';
  h += '<div class="scene">💬 「家人们，欢迎来到' + store + '的抖音直播间！我是今天的主播小X，' + date + '福利专场！新进来的小伙伴赶紧点个关注，这样第一时间收到开播提醒，福利不会错过！今天直播间只干一件事——给大家送' + prod + '专属福利，只要' + price + '元！不管你是在家追剧、上网课还是居家办公，网络卡顿太影响心情了。今天不玩套路，就是给咱们本地家人送宽带专属福利！想要福利的家人在公屏扣个「想要」！」</div>';
  h += '<div class="action">🎬 动作：微笑看镜头，展示门店标识牌。念弹幕欢迎新进观众，引导关注+亮灯牌。</div>';
  h += '<div class="time-tag">⏱ 2:00-4:00 第一款产品深度讲解</div>';
  h += '<div class="scene">💬 「来，家人们看第一个福利——' + prod + '！只要' + price + '元！你去任何地方对比都没有这个价。点击屏幕下方小房子看到所有商品。今天直播间是本地专属价，没有任何隐形消费、不捆绑套路！平时营业厅办宽带，今天直播间专属优惠。主播只讲参数和体验，支持线上线下所有平台比价，觉得划算的家人公屏扣个值！」</div>';
  h += '<div class="action">🎬 动作：展示实物/价签/海报，凑近镜头展示细节。逐条讲清楚产品权益，至少讲满90秒。</div>';
  h += '<div class="time-tag">⏱ 4:00-6:00 公屏互动+答疑</div>';
  h += '<div class="scene">💬 「来，公屏告诉我——家里网速多少兆？100M扣1、300M扣2、500M以上扣3。有家人扣2了，欢迎！300M一个人够用，一家三口刷视频+打游戏就得500M以上。' + prod + '刚好解决！已经下单的扣1让我看到！还在犹豫的家人有任何问题公屏留言，主播全程在线一一解答。」</div>';
  h += '<div class="action">🎬 动作：拿纸笔算账。念3-5个观众ID互动。认真回答公屏提问，拖停留时长。</div>';
  h += '<div class="time-tag">⏱ 6:00-8:00 第二款产品转款</div>';
  h += '<div class="scene">💬 「感谢家人们的热情！第一款已经卖了XX单。来我再给大家上一款更重磅的——FTTR全光礼包！40元老用户升级全屋光纤+千兆宽带+智屏！很多家人不知道——普通WiFi只到客厅，FTTR每个房间都有满格信号！刚没抢到第一款的家人，这款务必盯住！已经下单的家人，听主播的都去把这款也带一单，反正要去一趟营业厅，福利都领全！」</div>';
  h += '<div class="action">🎬 动作：切换展示第二款产品。对比两款差异，强调升级优势。</div>';
  h += '<div class="time-tag">⏱ 8:00-9:30 福利回锅+逼单冲刺</div>';
  h += '<div class="scene">💬 「最后90秒！所有优惠下播即止，没有补单、没有返场！我快速过一遍：第一款' + prod + '只要' + price + '元，第二款FTTR全光礼包40元全屋光纤。两款都在下方小房子。名额限时限量，随时会截止！犹豫徘徊等于白来，看好了马上下单！拍单到店核销后有专人对接，免米上门检测、上门安装！」</div>';
  h += '<div class="action">🎬 动作：倒计时手势，反复指向小房子。语速加快，制造急迫感。</div>';
  h += '<div class="time-tag">⏱ 9:30-10:00 收尾预告</div>';
  h += '<div class="scene">💬 「感谢所有家人的支持和信任！下单后的家人，我们的客服或您附近的营业员会尽快联系确认办理细节。点个关注不迷路，明天同一时间继续放福利，不见不散！' + store + '随时欢迎大家来店里坐坐！」</div>';
  h += '<div class="action">🎬 动作：微笑告别，再次展示门店标识牌。提醒明天直播时间。</div>';
  return h;
}

function buildCommunityScript(store, prod, price, date, deadline, loc, hl) {
  loc = loc || '本小区';
  hl = hl || '便民服务';
  var h = '';
  h += '<div class="time-tag">⏱ 0:00-2:00 现场氛围+活动介绍</div>';
  h += '<div class="scene">💬 「家人们好！' + date + '我们' + store + '来到' + loc + '做' + hl + '活动！大家看，我身后就是服务点，已经有邻居在排队了。今天直播间专属福利——' + prod + '只要' + price + '元，点击小房子就能下单，直接来现场核销！"</div>';
  h += '<div class="action">🎬 动作：镜头扫活动现场，展示人流量和服务细节。展示门店标识牌。</div>';
  h += '<div class="time-tag">⏱ 2:00-4:00 产品深度讲解</div>';
  h += '<div class="scene">💬 「来给咱们' + loc + '的邻居们详细说说——' + prod + '只要' + price + '元！正规电信官方活动，没有隐形消费。点下方小房子下单，拿着订单到服务点核销，工作人员全程一对一帮你办理！」</div>';
  h += '<div class="action">🎬 动作：展示实物/宣传单页，互动展示办理流程。</div>';
  h += '<div class="time-tag">⏱ 4:00-6:00 现场互动+答疑</div>';
  h += '<div class="scene">💬 「现场的邻居，来镜头前跟大家打个招呼！咱们' + loc + '的邻居们太热情了！公屏上有什么问题直接问——宽带多少兆够用？家里网速慢怎么办？主播现场给你解答！已经下单的邻居扣个1让我看到！」</div>';
  h += '<div class="action">🎬 动作：邀请现场路人入镜互动。回答公屏提问。</div>';
  h += '<div class="time-tag">⏱ 6:00-8:00 福利回锅+逼单</div>';
  h += '<div class="scene">💬 「' + loc + '的邻居们注意了！今天现场活动还剩最后一点时间！' + prod + '只要' + price + '元，活动结束就恢复日常价。没有补单、没有返场！现场来的邻居优先办理，马上给你安排！还在观望的邻居抓紧最后机会，直接下方小房子下单！」</div>';
  h += '<div class="action">🎬 动作：倒计时手势，展示现场排队情况，语速加快。</div>';
  h += '<div class="time-tag">⏱ 8:00-10:00 收尾+引导关注</div>';
  h += '<div class="scene">💬 「感谢' + loc + '的邻居们的热情！今天没赶上的家人点个关注，下次活动提前通知！' + store + '随时欢迎大家来店里坐坐！下次活动见！」</div>';
  h += '<div class="action">🎬 动作：展示门店标识牌，微笑告别。提醒关注账号。</div>';
  return h;
}

function buildOutdoorScript(store, prod, price, date, deadline, loc) {
  loc = loc || '本地商圈';
  var h = '';
  h += '<div class="time-tag">⏱ 0:00-2:00 本地标签开场</div>';
  h += '<div class="scene">💬 「' + loc + '的朋友看过来！我是' + store + '的主播小X，' + date + '带大家逛' + loc + '。你看这人流量——很多人不知道，我们' + store + '就在旁边，今天给路过的朋友准备了直播间专属福利！想要的朋友公屏扣个想要！」</div>';
  h += '<div class="action">🎬 动作：边走边拍街景，挂POI定位，加入本地标签。</div>';
  h += '<div class="time-tag">⏱ 2:00-5:00 探店+福利讲解</div>';
  h += '<div class="scene">💬 「你看这边多热闹！逛街累了可以来我们店坐坐，免费喝水充电，顺便了解一下' + prod + '。只要' + price + '元，比你在别处划算多了。点击小房子就能下单，到店核销享受专属福利。' + loc + '的家人们，这个福利错过就太亏了！不放心随时可以退！」</div>';
  h += '<div class="action">🎬 动作：交替展示街景和产品福利卡，语气轻松自然。</div>';
  h += '<div class="time-tag">⏱ 5:00-8:00 挂POI+小房子引导</div>';
  h += '<div class="scene">💬 「点左下角定位就能看到我们' + store + '的位置。路过的朋友直接过来，今天' + deadline + '前小房子下单' + prod + '的家人，到店报「探店专享」额外再送福利。认准' + store + '，我在这儿等你！」</div>';
  h += '<div class="time-tag">⏱ 8:00-10:00 逼单+关注引导</div>';
  h += '<div class="scene">💬 「' + loc + '还有哪些好逛的地方？评论区推荐，下次换个地方继续播！关注我不迷路，今天' + deadline + '，别犹豫了，点小房子下单！」</div>';
  return h;
}

function buildHomeScript(store, prod, price, date, loc, hl) {
  loc = loc || '用户家';
  hl = hl || '网速检测';
  var h = '';
  h += '<div class="time-tag">⏱ 0:00-2:00 痛点场景开场</div>';
  h += '<div class="scene">💬 「家人们好！' + date + '我现在在' + loc + '，给用户做' + hl + '。这位用户说家里网速一到晚上就卡。来，我们看看问题出在哪——原来路由器塞在电视柜最里面，旁边还有微波炉在干扰！」</div>';
  h += '<div class="action">🎬 动作：征得用户同意后展示入户场景和检测过程。</div>';
  h += '<div class="time-tag">⏱ 2:00-6:00 专业解决过程</div>';
  h += '<div class="scene">💬 「来给大家展示——把路由器挪到客厅中间、避开金属遮挡物、重启之后信号满格，速度秒开！很多家人不知道——' + store + '提供免费上门' + hl + '服务！不需要花钱，点小房子预约就行，我们师傅上门帮你看！网速慢、WiFi信号覆盖不到——赶紧在小房子里点「宽带网络优化服务」预约！不花一分钱！」</div>';
  h += '<div class="action">🎬 动作：展示检测数据对比和实际效果。</div>';
  h += '<div class="time-tag">⏱ 6:00-9:00 服务延伸+小房子引导</div>';
  h += '<div class="scene">💬 「' + loc + '的家人非常满意了——WiFi满格，秒开！你的网速也可能有问题只是你不知道——赶紧点小房子预约免费检测。今天直播间专属福利——' + prod + '只要' + price + '元，比直接办便宜很多。点击小房子下单，到店核销就行！免米上门安装、正规电信官方活动！」</div>';
  h += '<div class="time-tag">⏱ 9:00-10:00 收尾+引导关注</div>';
  h += '<div class="scene">💬 「关注我，下次直播继续带你看真实的入户服务！' + store + '随时欢迎来店里坐坐，任何网络问题我们帮您解决！感谢支持，明天同一时间再见！」</div>';
  return h;
}

function showEmergencyScripts() {
  var store = esc((document.getElementById('lv_store') || {}).value || '').trim() || 'XX营业厅';
  var card = document.getElementById('live-emergency-card');
  var content = document.getElementById('live-emergency-content');
  if (!card || !content) return;
  var scripts = [
    { t: '📢 只有你一个人 · 自说自话模式', s: '"大家好，我是' + store + '的主播小X。现在直播间就我一个人，没关系——我先给大家介绍一下今天的产品。' + store + '是咱们本地的电信营业厅，专做宽带和终端。你在小房子里能看到今天所有商品。路过的朋友点个关注，说不定哪天你需要宽带就知道找谁了。"' },
    { t: '📢 进来1个又走了 · 挽留话术', s: '"诶，刚有位朋友进来又走了——没关系，我继续讲。我们' + store + '的宽带团购券，5块钱抵200元，比别人家便宜一截。你在太原范围内都能用，到我们店核销就行。不用拼团、不用等，拍了就能用。"' },
    { t: '📢 2-3人在线 · 一对一聊天模式', s: '"我看到有2位家人在线，欢迎欢迎！你们现在用的宽带多少兆的？有没有遇到过晚上看视频卡顿的情况？别不好意思，公屏告诉我。我在' + store + '干了X年了，网速慢的问题我见太多了——大部分都是路由器放角落或者设备太老，我今天专门教你们怎么解决。"' },
    { t: '📢 冷场超1分钟 · 自言自语熬时长', s: '"（喝口水，调整镜头）很多家人不知道——抖音本地生活这个功能特别方便。你点屏幕下方小房子，看到我们' + store + '的商品，直接下单，到店核销。不用下载App、不用注册、不用绑卡。从下单到核销，两分钟搞定。我再说一遍流程——先点小房子，选商品，点下单，付5块钱，然后来我们店，扫码核销，完事。"' },
    { t: '📢 有人点赞但没人说话 · 破冰引导', s: '"感谢点赞的朋友！你点赞说明你在听——那能不能在公屏告诉我，你家宽带用得怎么样？随便说一句就行。没人说话的话，我就当你默认网速还可以了哈（笑）。其实山西很多老小区网速都一般，因为线路老。来' + store + '免费测一下，我们师傅帮你排查。"' },
    { t: '📢 3-5人在线 · 小范围互动', s: '"现在有几位家人在线了，感谢陪伴！这样吧——家里网速觉得够用的扣1，觉得不够用的扣2。来，我看看。没人扣也没关系，我自己先说——我家之前也卡，后来换了路由器，速度直接翻倍。你们可能也有同样的问题只是不知道。"' },
    { t: '📢 有人提问 · 宝贵的互动机会', s: '"终于有家人提问了！你问的太好了——（大声重复问题）这个问题90%的人都不知道答案。来我给你详细讲：……（展开讲至少2分钟，中间反复问"听懂了吗"，尽量让提问者再次互动）感谢提问！其他人有想问的也尽管说，主播在线解答。"' },
    { t: '📢 10分钟了人还不多 · 心态稳住', s: '"我再说一遍——哪怕直播间只有一个人，我也会认真讲完。因为我们' + store + '的这个宽带福利确实划算：5元抵200元，到店核销。你拿这个价格去任何一个营业厅问，绝对没有。我不是吹，这是抖音本地生活专属团购价。你在小房子里看到的所有商品，都是这个价。"' },
    { t: '📢 有人下单了 · 信任背书', s: '"感谢这位家人下单！小房子那边提示有新订单了。下单的朋友放心——24小时内我们客服会联系你，预约核销时间。来' + store + '核销的时候报我名字，我亲自接待你。其他还在犹豫的家人——你看，人家都下单了，名额有限的，别等没了再后悔。"' },
    { t: '📢 准备下播 · 温柔收尾', s: '"好了家人们，今天播了30分钟了，感谢陪伴。哪怕今天只有几个人在线，我也很珍惜。' + store + '的小房子一直在，你随时可以点进去下单。关注我，我基本上每天都在播。下次想了解什么——宽带、路由器、手机——评论区告诉我，我提前准备。感谢大家，晚安！"' },
    { t: '📢 违规自查 · 降低音量', s: '"（放低声调）大家放心啊，我们直播间是正规的。门店标识牌挂了、商品都在小房子里、不卖号卡不推销套餐。说得不对的地方欢迎大家指正。纯宽带和终端服务，合规的。"' }
  ];
  var html = '<p style="font-size:12px;color:var(--body);margin-bottom:16px;">💡 以上话术基于真实数据：68.5%的厅店直播观看<100人、中位数仅38人。99%的时间面对个位数观众——你的任务不是"控场"，而是"稳住"和"熬时长"。每条说完微笑等待5秒，自言自语不可怕，没人听才是常态。</p>';
  for (var i = 0; i < scripts.length; i++) {
    var urgency = i < 4 ? '🟢 低紧迫' : i < 8 ? '🟡 中紧迫' : '🔴 高紧迫';
    html += '<div style="background:#1a1a2e;color:#e0e0e0;border-radius:8px;padding:14px;margin-bottom:10px;">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div class="time-tag">' + scripts[i].t + '</div>';
    html += '<span style="font-size:10px;color:#999;">' + urgency + '</span>';
    html += '</div>';
    html += '<div class="scene">💬 ' + scripts[i].s + '</div>';
    html += '</div>';
  }
  content.innerHTML = html + buildChecklist('live');
  card.style.display = 'block';
  addCopyButton('live-emergency-content');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (typeof track === 'function') track('live_emergency');
}

function toggleDeadline() {
  var cb = document.getElementById('lv_use_deadline');
  var row = document.getElementById('lv-deadline-row');
  if (cb && row) {
    row.style.display = cb.checked ? '' : 'none';
    saveLiveForm();
  }
}

function downloadLiveScript() {
  var panel = document.getElementById('live-preview');
  if (!panel || panel.style.display === 'none') { alert('请先点击「预览直播脚本」生成内容后再下载'); return; }
  if (typeof track === 'function') track('live_download');
  safeCall(function(){ downloadAsImage('live-preview'); });
}

function checkLiveCompliance() {
  var panel = document.getElementById('live-preview');
  if (!panel) return;
  var text = panel.textContent || '';
  var inputs = ['lv_store','lv_product','lv_price'];
  for (var i = 0; i < inputs.length; i++) {
    var el = document.getElementById(inputs[i]);
    if (el) text += ' ' + (el.value || '');
  }
  // Live-specific forbidden words
  var liveForbiddenWords = [
    '月租','套餐','话费','靓号','办卡','号卡','合约','小黄车',
    '第一','最好','100%','绝对','全网最低','保证','永久免费',
    '最后一天','仅此一次','错过等一年'
  ];
  var warnWords = [];
  for (var i = 0; i < liveForbiddenWords.length; i++) {
    if (text.indexOf(liveForbiddenWords[i]) >= 0) warnWords.push(liveForbiddenWords[i]);
  }
  // Also check global FORBIDDEN_WORDS
  var fw = typeof FORBIDDEN_WORDS !== 'undefined' ? FORBIDDEN_WORDS : [];
  for (var i = 0; i < fw.length; i++) {
    if (fw[i] && text.indexOf(fw[i]) >= 0 && warnWords.indexOf(fw[i]) < 0) warnWords.push(fw[i]);
  }
  var warnBar = document.getElementById('live-fw-warn');
  var cleanBar = document.getElementById('live-fw-clean');
  if (!warnBar || !cleanBar) return;
  if (warnWords.length > 0) {
    warnBar.style.display = 'block';
    warnBar.querySelector('ul').innerHTML = warnWords.map(function(w) { return '<li>' + esc(w) + '</li>'; }).join('');
    cleanBar.style.display = 'none';
  } else {
    warnBar.style.display = 'none';
    cleanBar.style.display = 'block';
  }
}

// ═══════ pages.js ═══════
function getPeriodStart(period) {
  var now = new Date();
  if (period === 'week') {
    var d = new Date(now); d.setDate(now.getDate() - now.getDay() + 1); d.setHours(0,0,0,0); return d.getTime();
  } else if (period === 'month') {
    return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  } else if (period === 'daily') {
    var d = new Date(now); d.setDate(now.getDate() - 30); d.setHours(0,0,0,0); return d.getTime();
  }
  return 0;
}

function filterEvents(period) {
  var all = loadStats().events;
  if (period === 'all') return all;
  var start = getPeriodStart(period);
  return all.filter(function(e) { return e.ts >= start; });
}

function renderStats() {
  var events = filterEvents(statsPeriod);
  var total = events.length;
  // Summary cards
  var pages = {}, actions = {}, topics = {}, dailyCounts = {};
  var today = new Date(); today.setHours(0,0,0,0);
  var todayTS = today.getTime();
  var todayCount = 0;
  events.forEach(function(e) {
    // Page counts
    var p = e.action.replace('page_','').replace('preview_','').replace('export_','');
    pages[p] = (pages[p]||0) + 1;
    // Actions
    actions[e.action] = (actions[e.action]||0) + 1;
    // Topics
    if (e.detail && e.detail.length > 1) topics[e.detail] = (topics[e.detail]||0) + 1;
    // Daily
    if (e.ts >= todayTS) todayCount++;
    var dayKey = new Date(e.ts).toISOString().slice(0,10);
    dailyCounts[dayKey] = (dailyCounts[dayKey]||0) + 1;
    if (e.action === 'checklist_pass') todayCount++;
  });
  // Summary cards
  var uniquePages = Object.keys(pages).length;
  var uniqueTopics = Object.keys(topics).length;
  var cardHtml = '<div class="card" style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--blue);">'+total+'</div><div style="font-size:12px;color:var(--body);">总操作次数</div></div>';
  cardHtml += '<div class="card" style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--green);">'+uniquePages+'</div><div style="font-size:12px;color:var(--body);">使用模块数</div></div>';
  cardHtml += '<div class="card" style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--orange);">'+todayCount+'</div><div style="font-size:12px;color:var(--body);">今日操作</div></div>';
  cardHtml += '<div class="card" style="text-align:center;"><div style="font-size:32px;font-weight:700;color:#7B1FA2;">'+uniqueTopics+'</div><div style="font-size:12px;color:var(--body);">选题覆盖数</div></div>';
  document.getElementById('statsCards').innerHTML = cardHtml;
  // Module chart (horizontal bars)
  var pageNames = { 'schedule':'📋 每周排期','template1':'💬 口播脚本','template2':'📖 故事脚本','template3':'🔬 产品测评','template4':'🏠 同城活动','bank':'📚 选题库','hotspot':'🔥 热点跟拍','history':'📜 历史','stats':'📊 统计' };
  var pageActionNames = { 'page_schedule':'访问排期','page_template1':'口播脚本','page_template2':'故事脚本','page_template3':'产品测评','page_template4':'同城活动','preview_generated':'生成预览','export_image':'导出图片','export_copy':'复制脚本','checklist_pass':'✅检查通过','checklist_fail':'❌检查失败','fw_detected':'违禁词告警' };
  var sorted = Object.entries(pages).sort(function(a,b) { return b[1]-a[1]; });
  var maxVal = sorted.length > 0 ? sorted[0][1] : 1;
  var bars = sorted.map(function(e) {
    var pct = Math.round(e[1]/maxVal*100);
    return '<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>'+(pageNames[e[0]]||e[0])+'</span><span style="color:var(--blue);font-weight:600;">'+e[1]+'次</span></div><div style="background:#F0F2F5;border-radius:4px;height:8px;overflow:hidden;"><div style="background:linear-gradient(90deg,var(--blue),#66B2FF);height:100%;width:'+pct+'%;border-radius:4px;transition:width 0.5s;"></div></div></div>';
  }).join('');
  document.getElementById('statsModuleChart').innerHTML = bars || '<div style="color:#999;text-align:center;padding:20px;">暂无数据</div>';
  // Action chart
  var actSorted = Object.entries(actions).sort(function(a,b) { return b[1]-a[1]; });
  var actMax = actSorted.length > 0 ? actSorted[0][1] : 1;
  var actBars = actSorted.map(function(e) {
    var pct = Math.round(e[1]/actMax*100);
    var color = e[0].indexOf('preview')>=0?'var(--green)':e[0].indexOf('export')>=0?'var(--orange)':e[0].indexOf('checklist')>=0?'#7B1FA2':e[0].indexOf('fw')>=0?'#C62828':'var(--blue)';
    return '<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span>'+(pageActionNames[e[0]]||e[0])+'</span><span style="color:var(--blue);font-weight:600;">'+e[1]+'次</span></div><div style="background:#F0F2F5;border-radius:4px;height:8px;overflow:hidden;"><div style="background:'+color+';height:100%;width:'+pct+'%;border-radius:4px;transition:width 0.5s;"></div></div></div>';
  }).join('');
  document.getElementById('statsActionChart').innerHTML = actBars || '<div style="color:#999;text-align:center;padding:20px;">暂无数据</div>';
  // Daily chart (last 30 days)
  var days = [];
  for (var i = 29; i >= 0; i--) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var key = d.toISOString().slice(0,10);
    days.push({ date: (d.getMonth()+1)+'/'+d.getDate(), count: dailyCounts[key]||0 });
  }
  var dayMax = Math.max.apply(null, days.map(function(d) { return d.count; })) || 1;
  var dayBars = days.map(function(d) {
    var h = Math.max(2, Math.round(d.count/dayMax*120));
    return '<div style="display:flex;flex-direction:column;align-items:center;width:100%;"><div style="font-size:10px;color:#999;">'+d.count+'</div><div style="width:100%;max-width:20px;height:'+h+'px;background:linear-gradient(180deg,var(--blue),#E3F2FD);border-radius:3px 3px 0 0;margin-top:2px;"></div><div style="font-size:9px;color:#aaa;margin-top:2px;transform:rotate(-45deg);transform-origin:left top;white-space:nowrap;">'+d.date+'</div></div>';
  }).join('');
  document.getElementById('statsDailyChart').innerHTML = '<div style="display:flex;align-items:flex-end;gap:2px;height:160px;overflow-x:auto;">'+dayBars+'</div>';
  // Top topics (top 15)
  var topicSorted = Object.entries(topics).sort(function(a,b) { return b[1]-a[1]; }).slice(0,15);
  var topicMax = topicSorted.length > 0 ? topicSorted[0][1] : 1;
  var topicHtml = topicSorted.map(function(e,i) {
    var pct = Math.round(e[1]/topicMax*100);
    var heatColor = pct > 70 ? '#C62828' : pct > 40 ? '#E65100' : pct > 20 ? '#F57C00' : 'var(--blue)';
    return '<div style="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid var(--border);"><span style="font-weight:700;color:'+heatColor+';min-width:24px;font-size:12px;">#'+(i+1)+'</span><span style="flex:1;font-size:13px;">'+esc(e[0])+'</span><span style="display:inline-block;min-width:40px;height:14px;background:linear-gradient(90deg,'+heatColor+',#FFCDD2);border-radius:7px;width:'+Math.max(4,pct)+'%;margin-right:8px;"></span><span style="color:var(--orange);font-weight:600;font-size:12px;min-width:30px;text-align:right;">'+e[1]+'次</span></div>';
  }).join('');
  document.getElementById('statsTopics').innerHTML = topicHtml || '<div style="color:#999;text-align:center;padding:20px;">暂无数据</div>';
  // Store usage chart
  var stores = {};
  events.forEach(function(e) {
    if (e.store) stores[e.store] = (stores[e.store]||0) + 1;
  });
  var storeSorted = Object.entries(stores).sort(function(a,b) { return b[1]-a[1]; }).slice(0,15);
  var storeMax = storeSorted.length > 0 ? storeSorted[0][1] : 1;
  var hasStores = storeSorted.length > 0;
  var storeHtml = '';
  if (hasStores) {
    storeHtml = '<div style="font-size:12px;color:var(--green);margin-bottom:4px;">'+Object.keys(stores).length+' 个厅店有使用记录</div>';
    storeHtml += storeSorted.map(function(e) {
      var pct = Math.round(e[1]/storeMax*100);
      return '<div style="margin-bottom:6px;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:65%;">'+esc(e[0])+'</span><span style="color:var(--blue);font-weight:600;">'+e[1]+'次</span></div><div style="background:#F0F2F5;border-radius:4px;height:6px;overflow:hidden;"><div style="background:linear-gradient(90deg,var(--green),#81C784);height:100%;width:'+pct+'%;border-radius:4px;"></div></div></div>';
    }).join('');
  } else {
    storeHtml = '<div style="color:#999;text-align:center;padding:20px;">暂无厅店绑定数据<br><span style="font-size:11px;">绑定门店后开始跟踪各厅店使用情况</span></div>';
  }
  document.getElementById('statsStoreChart').innerHTML = storeHtml;
  // Weekly comparison
  var now = new Date();
  var thisMonday = new Date(now); thisMonday.setDate(now.getDate() - now.getDay() + 1); thisMonday.setHours(0,0,0,0);
  var lastMonday = new Date(thisMonday); lastMonday.setDate(thisMonday.getDate() - 7);
  var thisWeek = events.filter(function(e) { return e.ts >= thisMonday.getTime(); });
  var lastWeek = events.filter(function(e) { return e.ts >= lastMonday.getTime() && e.ts < thisMonday.getTime(); });
  var twActions = {}, lwActions = {};
  thisWeek.forEach(function(e) { twActions[e.action] = (twActions[e.action]||0) + 1; });
  lastWeek.forEach(function(e) { lwActions[e.action] = (lwActions[e.action]||0) + 1; });
  var actionLabels = { 'page_schedule':'排期','page_template1':'口播脚本','page_template2':'故事脚本','page_template3':'产品测评','page_template4':'同城活动','page_live':'直播脚本','page_bank':'选题库','page_hotspot':'热点跟拍','page_history':'历史','preview_generated':'生成预览' };
  var cmpRows = [];
  Object.keys(actionLabels).forEach(function(k) {
    var tw = twActions[k]||0, lw = lwActions[k]||0;
    var diff = tw - lw;
    var arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
    var arrowColor = diff > 0 ? 'var(--green)' : diff < 0 ? '#C62828' : '#999';
    var changeText = diff !== 0 ? (arrow+' '+Math.abs(diff)) : '—';
    if (tw > 0 || lw > 0) cmpRows.push({ label: actionLabels[k], tw: tw, lw: lw, change: changeText, arrowColor: arrowColor });
  });
  cmpRows.sort(function(a,b) { return b.tw - a.tw; });
  var cmpMax = cmpRows.length > 0 ? Math.max.apply(null, cmpRows.map(function(r) { return Math.max(r.tw, r.lw); })) : 1;
  var cmpHtml = cmpRows.map(function(r) {
    var twPct = Math.round(r.tw/cmpMax*100), lwPct = Math.round(r.lw/cmpMax*100);
    return '<div style="margin-bottom:6px;"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:1px;"><span>'+r.label+'</span><span>本周 <b style="color:var(--blue);">'+r.tw+'</b> 上周 '+r.lw+' <span style="color:'+r.arrowColor+';font-weight:600;">'+r.change+'</span></span></div><div style="display:flex;gap:2px;height:6px;"><div style="background:var(--blue);width:'+twPct+'%;border-radius:3px 0 0 3px;"></div><div style="background:#E0E0E0;width:'+(lwPct-twPct > 0 ? lwPct-twPct : 0)+'%;border-radius:0 3px 3px 0;"></div></div></div>';
  }).join('');
  document.getElementById('statsWeekCompare').innerHTML = cmpHtml || '<div style="color:#999;text-align:center;padding:20px;">暂无上周对比数据</div>';
  document.getElementById('statsLastUpdate').textContent = '更新于 '+new Date().toLocaleTimeString('zh-CN');
  // Show data span
  var firstTS = events.length > 0 ? events[events.length-1].ts : Date.now();
  var lastTS = events.length > 0 ? events[0].ts : Date.now();
  var spanDays = Math.ceil((lastTS - firstTS) / 86400000);
  var storageUsed = (JSON.stringify(loadStats()).length / 1024).toFixed(1);
  document.getElementById('statsMeta').innerHTML = '📅 '+spanDays+'天数据 · 💾 '+storageUsed+'KB / 5MB · 📊 '+total+'条记录';
  if (storageUsed > 3500) {
    document.getElementById('statsMeta').style.color = '#D84315';
    document.getElementById('statsMeta').innerHTML += ' ⚠️ 存储接近上限，建议导出后清除';
  }
}

function exportStats() {
  var s = loadStats();
  var json = JSON.stringify(s, null, 2);
  // Download as file instead of copy to clipboard
  var blob = new Blob([json], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'douyin-lab-stats-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('统计数据已下载为 JSON 文件', 'success');
}

function exportStatsCSV() {
  var s = loadStats();
  var csv = '时间,操作,详情,门店\n';
  s.events.forEach(function(e) {
    var row = [
      new Date(e.ts).toISOString(),
      e.action,
      (e.detail || '').replace(/,/g, ' '),
      (e.store || '')
    ];
    csv += row.join(',') + '\n';
  });
  var blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'douyin-lab-stats-' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('统计数据已下载为 CSV 文件', 'success');
}

function clearStats() {
  if (!confirm('⚠️ 确定清除所有统计数据？此操作不可恢复！\n建议先导出备份。')) return;
  if (!confirm('再次确认：清除 ' + loadStats().events.length + ' 条操作记录？')) return;
  localStorage.removeItem(STATS_KEY);
  toast('统计数据已清除', 'success');
  renderStats();
}

function generateInfographic() {
  // v2.7: 已废弃，提示词在 t3_auto_section 中自动展示
  var area = document.getElementById('t3_auto_section');
  if (area) area.scrollIntoView({ behavior: 'smooth' });
}

function generateSellingPointCard() {
  generateInfographic();
}

function generateDouyinPrompt() {
  var item = document.getElementById('t3_item').value;
  var title = document.getElementById('t3_title').value;
  var p1 = document.getElementById('t3_p1').value;
  var p2 = document.getElementById('t3_p2').value;
  var p3 = document.getElementById('t3_p3').value;
  var city = document.getElementById('t3_city').value || '本地';
  if (!p1 || !p2 || !p3) {
    alert('请先在顶部选好设备和选题（自动填充后生成）');
    return;
  }
  var phone = findPhoneByName(item);
  var displayName = phone ? (phone.brand + ' ' + phone.model) : (title || item);
  var priceStr = phone ? ('¥' + (phone.guidePrice || phone.price || '到店询')) : '';

  // 卖点文案（已过翻译层，无脏数据）
  var cleanPrompts = [
    p1.replace(/^.*?[：:]/, '').trim(),
    p2.replace(/^.*?[：:]/, '').trim(),
    p3.replace(/^.*?[：:]/, '').trim()
  ];

  // 收集禁止词（原始 phonePool 数据，防止 AI 渲染）
  var bannedWords = [phone && phone.camera, phone && phone.chip, phone && phone.battery, phone && phone.highlight].filter(Boolean);
  var bannedList = bannedWords.map(function(w) { return '禁止出现："' + w + '"'; }).join('\n');

  // 引导收藏标签
  var tagStr = document.getElementById('t3_tags').value || ('#' + item.replace(/ /g,'') + ' #手机评测 #' + city + '电信');

  var prompt = [
    '一张抖音竖版手机卖点海报，9:16比例。',
    '',
    '设计风格：苹果发布会式的简洁高级感。深蓝色底（#0A1628），底部向上做少量暖橙渐变过渡。留白充足，不拥挤。',
    '',
    '画面排版从上到下：',
    '',
    '1. 顶部：大字标题 "' + esc(displayName) + '"，下面用一行小字写副标题 "实力派"，颜色白色，字体细且干净。',
    '',
    '2. 中部：三个卖点横向排列，每个卖点是一个磨砂白底圆角卡片，卡片左上角放一个小图标（分别对应芯片/相机/电池），卡片中央写卖点文案：',
    '   - "' + esc(cleanPrompts[0]) + '"',
    '   - "' + esc(cleanPrompts[1]) + '"',
    '   - "' + esc(cleanPrompts[2]) + '"',
    '',
    '3. 卡片下方放一行小字 "' + esc(priceStr) + ' 电信合约价"，橙色文字。',
    '',
    '4. 底部：浅色区域写 "到店体验真机"，右下角标注 "参数来源：品牌公开资料"。',
    '',
    '画面整体感受：高级、可信、不浮夸。像手机厂商官方海报的质感，而不是促销传单。',
    '',
    '不要出现：手机外观实拍图、疑问句感叹句、文字重叠拥挤、过度促销感。',
    bannedList ? '\n绝对禁止：以下原文不得出现在画面中：\n' + bannedList : ''
  ].filter(Boolean).join('\n');

  var panel = document.getElementById('infographicPanel');
  panel.innerHTML =
    '<div style="max-width:440px;margin:0 auto;padding:20px;background:#FAFBFC;border-radius:12px;">' +
      '<div style="font-weight:700;font-size:14px;color:#172B4D;margin-bottom:4px;">🤖 豆包生图提示词</div>' +
      '<div style="font-size:12px;color:#666;margin-bottom:10px;">复制 → 打开 <b>豆包/即梦</b> → 9:16竖版 → 粘贴 → 生成</div>' +
      '<div style="font-size:11px;color:#E65100;margin-bottom:8px;background:#FFF3E0;padding:6px 10px;border-radius:6px;">' +
        '📌 提示：生图后可以发抖音，配文 <b>"收藏这条，买手机不踩坑"</b> ' + esc(tagStr) +
      '</div>' +
      '<textarea readonly id="aiPromptText" style="width:100%;height:250px;font-size:12px;line-height:1.7;border:1px solid #DFE1E6;border-radius:8px;padding:12px;resize:vertical;font-family:inherit;background:#fff;">' + esc(prompt) + '</textarea>' +
      '<div style="margin-top:10px;display:flex;gap:8px;">' +
        '<button onclick="var t=document.getElementById(\'aiPromptText\');navigator.clipboard.writeText(t.value).then(function(){var b=event.target;b.textContent=\'✅ 已复制！\';b.style.background=\'#008A5C\';setTimeout(function(){b.textContent=\'📋 复制提示词\';b.style.background=\'#0052CC\'},1500)})" style="flex:1;padding:8px;background:#0052CC;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">📋 复制提示词</button>' +
        '<button onclick="document.getElementById(\'infographicPanel\').style.display=\'none\'" style="padding:8px 16px;background:#fff;color:#666;border:1px solid #DFE1E6;border-radius:6px;cursor:pointer;font-size:13px;">✕ 收起</button>' +
      '</div>' +
    '</div>';
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth' });
}

// 兼容旧调用
function buildAiPrompt(mode) { generateDouyinPrompt(); }

const hotspotData = (function() {
  try { if (window.___hotspotData) return padHotspotData(window.___hotspotData); } catch(e) {}
  return padHotspotData(window.___hotspotData || []);
})();

function padHotspotData(data) {
  if (!Array.isArray(data)) data = [];
  if (data.length >= 7) return data;
  var fallbacks = [
    { id: '_pad_1', tier: 3, title: '你的宽带每月花多少钱？全网比价挑战', heat: '全网热门', why: '宽带资费是全民痛点，对比三家运营商套餐性价比。', source: 'https://www.douyin.com/search/宽带比价', steps: [{ shot: '展示本月宽带账单', sub: '特写账单金额，露出惊讶表情' }, { shot: '对比三家同档位套餐', sub: '用表格展示电信vs联通vs移动' }, { shot: '实测速度+稳定性', sub: '同时开视频/游戏/下载测试' }, { shot: '算出结论推荐最优选', sub: '最终推荐电信套餐，扫码可办' }], bgm: '为爱痴狂 - 金志文', tags: '#宽带比价 #省钱攻略 #电信宽带', difficulty: 1, needFace: true, time: '8分钟' },
    { id: '_pad_2', tier: 3, title: '手机信号大比拼：电梯+地库+山区三场景实测', heat: '全网热门', why: '信号痛点场景最能打动人，真实测试有说服力。', source: 'https://www.douyin.com/search/手机信号测试', steps: [{ shot: '进电梯看信号格变化', sub: '电信vs友商，谁先掉信号' }, { shot: '地下车库测网速', sub: 'Speedtest实测数值对比' }, { shot: '郊区边缘地带测试', sub: '信号盲区谁还能打电话' }, { shot: '总结+营业厅信息', sub: '电信综合覆盖最优，到店可办' }], bgm: '悬溺 - 葛东琪', tags: '#信号测试 #5G #电梯挑战', difficulty: 1, needFace: true, time: '10分钟' },
    { id: '_pad_3', tier: 3, title: 'FTTR到底值不值得装？入户实景对比', heat: '全网热门', why: 'FTTR是新款宽带主力产品，实景对比最有说服力。', source: 'https://www.douyin.com/search/FTTR实测', steps: [{ shot: '普通路由器测速：客厅→卧室', sub: '隔两堵墙后速度腰斩' }, { shot: 'FTTR安装过程快放', sub: '15分钟从装机到全屋覆盖' }, { shot: 'FTTR全屋测速对比', sub: '每个房间都跑满千兆' }, { shot: '算一笔账：月均多花多少钱', sub: '多花的钱值不值，算给用户看' }], bgm: '卡农 - DJ版', tags: '#FTTR #全屋WiFi #千兆宽带', difficulty: 1, needFace: true, time: '8分钟' }
  ];
  var padded = data.slice(); // copy original
  var nextId = data.length + 1;
  for (var i = 0; i < fallbacks.length && padded.length < 7; i++) {
    var fb = fallbacks[i];
    fb.id = 'h' + nextId++;
    padded.push(fb);
  }
  return padded;
}

let hotspotFilter = 'all';

function filterHotspot(mode, el) {
  hotspotFilter = mode;
  document.querySelectorAll('#page-hotspot .bank-filter').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderHotspots();
}

function toggleHotspot(id) {
  const card = document.getElementById('hsc-' + id);
  if (card) card.classList.toggle('open');
}

function renderHotspots() {
  const grid = document.getElementById('hotspotGrid');
  if (!grid) return;
  const tiers = ['', '专业翻拍', '行业套用', '纯跟拍'];
  const tierClasses = ['', 'tier-1', 'tier-2', 'tier-3'];
  let html = '';
  hotspotData.forEach(h => {
    if (hotspotFilter === 'tier1' && h.tier !== 1) return;
    if (hotspotFilter === 'tier2' && h.tier !== 2) return;
    if (hotspotFilter === 'tier3' && h.tier !== 3) return;
    if (hotspotFilter === 'easy' && h.difficulty > 1) return;
    html += `<div class="hotspot-card" id="hsc-${h.id}">
      <div class="hs-header" tabindex="0" role="button" aria-label="展开${esc(h.title)}脚本" onclick="toggleHotspot('${h.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick()}">
        <span class="hs-tier ${tierClasses[h.tier]}">${'🥇🥈🥉'.charAt(h.tier-1)} ${tiers[h.tier]}</span>
        <div style="flex:1;">
          <div class="hs-title">${esc(h.title)}</div>
          <div class="hs-meta">🔥 ${h.heat} · ⏱ ${h.time} · ${'★'.repeat(h.difficulty)}☆</div>
        </div>
        <span style="color:#999;font-size:12px;">展开▼</span>
      </div>
      <div class="hs-body">
        <div style="font-size:12px;color:var(--orange);margin-bottom:10px;">💡 ${h.why}</div>
        ${h.steps.map((s, i) => `
          <div class="hs-step">
            <div class="hs-step-num">第${i+1}步</div>
            <div class="hs-step-shot">🎬 ${s.shot}</div>
            <div class="hs-step-sub">${s.sub}</div>
          </div>`).join('')}
        <div class="hs-footer">
          <span class="hs-tag">🎵 ${h.bgm}</span>
          <span class="hs-tag">👤 ${h.needFace ? '需出镜' : '免露脸'}</span>
          <span class="hs-tag">⏱ ${h.time}</span>
          ${h.source ? '<a href="' + h.source + '" target="_blank" rel="noopener" class="hs-tag" style="background:#E3F2FD;color:#1565C0;text-decoration:none;font-weight:600;">📺 看原版视频 →</a>' : '<span class="hs-tag" style="background:#FFF3E0;color:#E65100;">📺 抖音App内搜同名话题</span>'}
        </div>
        <div style="margin-top:8px;font-size:11px;color:#999;">🏷 ${esc(h.tags)}</div>
        <div style="margin-top:10px;padding:10px;background:#FFF8E1;border-radius:6px;font-size:11px;color:#E65100;">
          <strong>💬 评论引导：</strong>发布后发「${genHotspotComment(h)}」— 带问题的评论能多拿40%回复
        </div>
      </div>
    </div>`;
  });
  if (html === '') html = '<div class="card" style="text-align:center;padding:40px;color:#999;">没有匹配的热点内容，试试切换过滤条件</div>';
  grid.innerHTML = html;
  document.getElementById('hotspotUpdateTime').textContent = '· 更新时间：' + new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
}

function addHotspotSummary() {
  const container = document.getElementById('scheduleGrid');
  if (!container) return;
  const summary = document.getElementById('hotspotSummary');
  if (!summary) {
    const div = document.createElement('div');
    div.id = 'hotspotSummary';
    div.style.cssText = 'margin-top:20px;';
    div.innerHTML = '<div class="card"><h3 style="display:flex;justify-content:space-between;align-items:center;">🔥 本周热点跟拍速览 <a href="#" onclick="switchPage(\'hotspot\', document.querySelector(\'.nav-tab[onclick*=hotspot]\'));return false;" style="font-size:12px;color:var(--blue);">查看全部 →</a></h3><div id="hotspotSummaryCards" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;"></div></div>';
    container.parentElement.appendChild(div);
  }
  const cards = document.getElementById('hotspotSummaryCards');
  if (cards) {
    cards.innerHTML = hotspotData.slice(0, 4).map(h => `
      <div style="background:#FAFBFC;border:1px solid var(--border);border-radius:8px;padding:12px;cursor:pointer;" onclick="switchPage('hotspot', document.querySelector('.nav-tab[onclick*=hotspot]'));setTimeout(()=>document.getElementById('hsc-${h.id}').classList.add('open'),300)">
        <span style="font-size:10px;font-weight:700;color:${h.tier===1?'#C62828':h.tier===2?'#E65100':'#2E7D32'};">${'🥇🥈🥉'.charAt(h.tier-1)}</span>
        <div style="font-size:13px;font-weight:600;margin:4px 0;">${esc(h.title)}</div>
        <div style="font-size:10px;color:#999;">⏱${h.time} · ${'★'.repeat(h.difficulty)}</div>
      </div>
    `).join('');
  }
}

function renderBgmRecommend() {
  var grid = document.getElementById('bgmRecommendGrid');
  if (!grid) return;
  var bgmData = window.___bgmList;
  if (!bgmData) {
    grid.innerHTML = '<div style="grid-column:1/-1;color:#999;text-align:center;padding:20px;">BGM数据加载中，请刷新页面...</div>';
    return;
  }
  var types = [
    { key: '决策指南', icon: '💬', color: '#2E7D32', bg: '#E8F5E9', sub: '轻快对比' },
    { key: '一线场景', icon: '📖', color: '#1565C0', bg: '#E3F2FD', sub: '温情叙事' },
    { key: '深度测评', icon: '🔬', color: '#E65100', bg: '#FFF3E0', sub: '科技感' },
    { key: '本地事件', icon: '🏠', color: '#7B1FA2', bg: '#F3E5F5', sub: '探店活力' }
  ];
  var html = '';
  types.forEach(function(t) {
    var cat = bgmData[t.key];
    var songs = cat && cat[t.sub] ? cat[t.sub] : [];
    if (!songs || songs.length === 0) {
      // Try other sub-categories
      for (var k in cat) {
        if (cat[k] && cat[k].length > 0) { songs = cat[k]; break; }
      }
    }
    var songHtml = songs.slice(0, 2).map(function(s) {
      var parts = s.split(' - ');
      var name = parts[0], artist = parts[1] || '';
      var searchUrl = 'https://www.douyin.com/search/' + encodeURIComponent(name);
      return '<a href="' + searchUrl + '" target="_blank" rel="noopener" style="display:block;color:#333;text-decoration:none;margin-top:4px;transition:color 0.15s;" onmouseover="this.style.color=\'#0052CC\'" onmouseout="this.style.color=\'#333\'">🎵 ' + esc(name) + '<br><span style="font-size:11px;color:#888;">' + esc(artist) + '</span></a>';
    }).join('');
    html += '<div style="padding:10px;background:' + t.bg + ';border-radius:8px;">' +
      '<div style="font-weight:700;color:' + t.color + ';">' + t.icon + ' ' + t.key + '型</div>' +
      songHtml +
      '</div>';
  });
  grid.innerHTML = html;
}

function tryRenderBgm() {
  if (window.___bgmList) {
    renderBgmRecommend();
  } else {
    // Retry after a short delay if data not loaded yet
    var count = 0;
    var timer = setInterval(function() {
      count++;
      if (window.___bgmList) {
        clearInterval(timer);
        renderBgmRecommend();
      } else if (count > 20) {
        clearInterval(timer);
        var grid = document.getElementById('bgmRecommendGrid');
        if (grid) grid.innerHTML = '<div style="grid-column:1/-1;color:#999;text-align:center;padding:20px;">BGM数据加载失败，请检查网络后刷新页面</div>';
      }
    }, 200);
  }
}

function syncBgmDropdowns() {
  if (!window.___bgmList) return;
  var bgmData = window.___bgmList;
  var mappings = [
    { selectId: 't1_bgm', category: '决策指南', subs: ['轻快对比','算账节奏','温馨推荐'] },
    { selectId: 't2_bgm', category: '一线场景', subs: ['温情叙事','轻纪录片','快节奏爽片','原声不加BGM'] },
    { selectId: 't3_bgm', category: '深度测评', subs: ['科技感','冷静专业','干货教学'] },
    { selectId: 't4_bgm', category: '本地事件', subs: ['探店活力','福利快闪','温馨服务'] },
    { selectId: 'lv_bgm', category: '直播', subs: ['暖场','逼单','福利'] }
  ];
  mappings.forEach(function(m) {
    var sel = document.getElementById(m.selectId);
    if (!sel) return;
    // Collect all songs from all sub-categories
    var seen = {};
    var html = '';
    m.subs.forEach(function(sub) {
      var cat = bgmData[m.category];
      if (!cat || !cat[sub]) return;
      cat[sub].forEach(function(song) {
        if (seen[song]) return;
        seen[song] = true;
        html += '<option value="' + esc(song) + '">🎵 ' + esc(song) + '</option>';
      });
    });
    if (html) {
      sel.innerHTML = html;
      sel.options[0].selected = true;
    }
  });
}

// ═══════ init.js ═══════
(function initAll() {
  checkDataFiles();
  try { buildSchedule(); } catch(e) { console.error('buildSchedule:', e); }
  try { buildTodayHero(); } catch(e) { console.error('buildTodayHero:', e); }
  try { loadHotContentPool(); } catch(e) { console.error('loadHotContentPool:', e); }
  try { buildTopicBank(); } catch(e) { console.error('buildTopicBank:', e); }
  try { buildHistory(); } catch(e) { console.error('buildHistory:', e); }
  try { renderHotspots(); } catch(e) { console.error('renderHotspots:', e); }
  try { addHotspotSummary(); } catch(e) { console.error('addHotspotSummary:', e); }
  try { labelDropdownOptions(); } catch(e) { console.error('labelDropdownOptions:', e); }
  try { injectBGMButtons(); } catch(e) { console.error('injectBGMButtons:', e); }
  try { tryRenderBgm(); } catch(e) { console.error('tryRenderBgm:', e); }
  try { syncBgmDropdowns(); } catch(e) { console.error('syncBgmDropdowns:', e); }
  try { syncTopicDropdown(); } catch(e) { console.error('syncTopicDropdown:', e); }
  try { loadNavGroupStates(); } catch(e) { console.error('loadNavGroupStates:', e); }
  try { initPersonaPicker(); } catch(e) { console.error('initPersonaPicker:', e); }
  try { initT3DeviceOptions(); } catch(e) { console.error('initT3DeviceOptions:', e); }
  try { showOnboarding(); } catch(e) { console.error('showOnboarding:', e); }
})();

var ONBOARD_KEY = 'douyin_lab_onboarded';

function showOnboarding() {
  if (localStorage.getItem(STORE_KEY)) return;

  var _obPersona = 'sister';
  var obOverlay = null, obInput = null, obBtn = null, obHint = null;
  var OB_CITIES = ['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'];
  var OB_ENDS = ['厅','店','点','商'];

  function obValidate(name) {
    name = (name || '').trim();
    if (name.length < 4) return false;
    var hasCity = false;
    for (var i = 0; i < OB_CITIES.length; i++) {
      if (name.indexOf(OB_CITIES[i]) === 0) { hasCity = true; break; }
    }
    if (!hasCity) return false;
    var lastCh = name.charAt(name.length - 1);
    for (var j = 0; j < OB_ENDS.length; j++) {
      if (lastCh === OB_ENDS[j]) return true;
    }
    return false;
  }

  function obUpdateBtn() {
    if (!obBtn || !obInput) return;
    var name = (obInput.value || '').trim();
    var valid = obValidate(name);
    obBtn.style.opacity = valid ? '1' : '0.4';
    obBtn.style.pointerEvents = valid ? 'auto' : 'none';
    // Show hint when user has typed but format is wrong
    if (obHint) {
      if (!name) {
        obHint.textContent = '填一次，以后就不用填了';
        obHint.style.color = '#999';
      } else if (valid) {
        obHint.innerHTML = '✅ 格式正确';
        obHint.style.color = '#2E7D32';
      } else {
        obHint.innerHTML = '⚠ 请以地市开头（如：太原/临汾…），以"厅/店/点"结尾';
        obHint.style.color = '#C62828';
      }
    }
  }

  function obSelectPersona(key) {
    _obPersona = key;
    var btns = document.querySelectorAll('#obPersonas .ob-p-btn');
    for (var i = 0; i < btns.length; i++) {
      var isSel = btns[i].getAttribute('data-p') === key;
      btns[i].style.borderColor = isSel ? 'var(--blue)' : 'var(--border)';
      btns[i].style.background = isSel ? '#E8F0FE' : 'var(--card)';
      btns[i].style.fontWeight = isSel ? '600' : '400';
    }
  }

  function obBind() {
    var name = (obInput.value || '').trim();
    if (!obValidate(name)) {
      toast('请输入完整营业厅名称（地市开头 + 厅/店/点结尾）', 'error');
      if (obInput) { obInput.focus(); obInput.style.borderColor = '#C62828'; setTimeout(function(){ obInput.style.borderColor = ''; }, 1500); }
      return;
    }
    setPersona(_obPersona);
    localStorage.setItem(STORE_KEY, JSON.stringify({ name: name, persona: _obPersona }));
    toast('已绑定：' + name + ' · ' + ((personaDB[_obPersona] || {}).label || ''), 'success');
    try { track('store_bind'); } catch(e) {}
    if (obOverlay) obOverlay.remove();
    setTimeout(function() {
      showBoundStore(name, _obPersona);
      autoFillStore();
      initPersonaPicker();
    }, 200);
  }

  var ps = personaOrder || ['sweet','tech','biz','young','master','sister'];
  var html = '<div id="onboardOverlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.82);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;">';
  html += '<div style="background:var(--card);border-radius:20px;padding:32px 28px 28px;max-width:420px;width:100%;box-shadow:0 12px 48px rgba(0,0,0,0.4);">';
  html += '<div style="margin-bottom:24px;">';
  html += '<div style="font-size:22px;font-weight:700;color:var(--dark);">🎬 欢迎使用抖本工坊</div>';
  html += '<div style="font-size:13px;color:var(--body);margin-top:4px;">绑定你的营业厅，脚本自动带上城市和店名</div>';
  html += '</div>';
  html += '<div style="margin-bottom:20px;">';
  html += '<label style="font-size:13px;font-weight:600;color:var(--dark);display:block;margin-bottom:6px;">📍 营业厅名称</label>';
  html += '<input id="obStoreInput" type="text" placeholder="如：太原迎泽区柳巷电信营业厅" style="width:100%;padding:12px 14px;border:2px solid var(--border);border-radius:10px;font-size:15px;outline:none;transition:border-color 0.2s;box-sizing:border-box;">';
  html += '<div id="obStoreHint" style="font-size:11px;color:#999;margin-top:4px;">填一次，以后就不用填了</div>';
  html += '</div>';
  html += '<div style="margin-bottom:24px;">';
  html += '<label style="font-size:13px;font-weight:600;color:var(--dark);display:block;margin-bottom:8px;">💬 选最像你的风格</label>';
  html += '<div id="obPersonas" style="display:flex;flex-wrap:wrap;gap:8px;">';
  for (var pi = 0; pi < ps.length; pi++) {
    var p = personaDB[ps[pi]] || {};
    html += '<button class="ob-p-btn" data-p="' + ps[pi] + '" style="padding:8px 12px;border:2px solid ' + (ps[pi] === 'sister' ? 'var(--blue)' : 'var(--border)') + ';border-radius:10px;background:' + (ps[pi] === 'sister' ? '#E8F0FE' : 'var(--card)') + ';font-size:13px;cursor:pointer;transition:all 0.2s;font-weight:' + (ps[pi] === 'sister' ? '600' : '400') + ';white-space:nowrap;">' + (p.icon || '') + ' ' + (p.label || ps[pi]) + '</button>';
  }
  html += '</div></div>';
  html += '<div style="display:flex;justify-content:flex-end;">';
  html += '<button id="obBindBtn" style="padding:12px 28px;border:none;border-radius:10px;background:var(--blue);color:#fff;font-size:15px;font-weight:600;cursor:pointer;opacity:0.4;pointer-events:none;transition:all 0.3s;">开始绑定</button>';
  html += '</div>';
  html += '</div></div>';

  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);

  obOverlay = document.getElementById('onboardOverlay');
  obInput = document.getElementById('obStoreInput');
  obBtn = document.getElementById('obBindBtn');
  obHint = document.getElementById('obStoreHint');

  if (obInput) {
    obInput.addEventListener('input', obUpdateBtn);
    obInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') obBind(); });
    setTimeout(function() { obInput.focus(); }, 300);
  }
  if (obBtn) {
    obBtn.addEventListener('click', obBind);
  }
  var pbtns = document.querySelectorAll('#obPersonas .ob-p-btn');
  for (var i = 0; i < pbtns.length; i++) {
    pbtns[i].addEventListener('click', function() {
      obSelectPersona(this.getAttribute('data-p'));
    });
  }
}

