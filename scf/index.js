// SCF 云函数 v4 — 抖本工坊云端自动化
// AI 增强（硅基流动） + 模板变体 + 关联度过滤
// 环境变量: GITEE_TOKEN, GITEE_USERNAME, DEPLOY_HOOK_URL, SILICONFLOW_API_KEY
//
// 模式: hotspot | bgm | topics
// 更新时间: 2026-06-17

let _configCache = {};

exports.main_handler = async (event, context) => {
  let mode = event.mode;
  if (!mode && typeof event.Message === 'string') {
    try { mode = JSON.parse(event.Message).mode; } catch(e) {}
  }
  if (!mode) mode = 'hotspot';

  const ts = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(`[${ts()}] SCF v4 AI-enhanced | mode=${mode}`);

  try {
    const token = process.env.GITEE_TOKEN;
    const user = process.env.GITEE_USERNAME || 'hbatz';
    if (!token) throw new Error('GITEE_TOKEN not set');

    const result = {};
    if (mode === 'hotspot') {
      result['data/hotspotData.js'] = await genHotspot(token, user);
    } else if (mode === 'bgm') {
      result['data/bgmList.js'] = await genBgm(token, user);
    } else if (mode === 'topics') {
      const { topics, t1 } = await genTopics(token, user);
      result['data/topicPool.js'] = topics;
      result['data/t1Presets.js'] = t1;
    } else {
      throw new Error('Unknown mode: ' + mode);
    }

    const updated = [];
    for (const [filename, content] of Object.entries(result)) {
      await updateGiteeFile(filename, content, token, user);
      updated.push(filename);
      console.log(`[${ts()}] Updated: ${filename}`);
    }

    const deployed = await deployViaEdgeOne(token, user);
    console.log(`[${ts()}] EdgeOne deploy: ${deployed ? 'OK' : 'skipped'}`);

    return { success: true, mode, files: updated, deployed, timestamp: ts() };
  } catch (err) {
    console.error(`[${ts()}] ERROR: ${err.message}`);
    return { success: false, error: err.message, timestamp: ts() };
  }
};

// ============================================================
// Config loader
// ============================================================

async function getConfig(filename, token, user) {
  if (_configCache[filename]) return _configCache[filename];
  console.log(`Loading config: ${filename}`);
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filename)}`;
  const res = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error(`Config not found: ${filename} (${res.status})`);
  const data = await res.json();
  const raw = Buffer.from(data.content, 'base64').toString('utf-8');
  _configCache[filename] = JSON.parse(raw);
  return _configCache[filename];
}

// ============================================================
// HOTSPOT — AI增强 + 模板变体 + 关联度过滤
// ============================================================

async function genHotspot(token, user) {
  const today = new Date().toISOString().slice(0, 10);
  const weekNum = getWeekNumber();

  // 1. Fetch trends
  const trends = await fetchTrends();
  if (trends.length === 0) throw new Error('No trends fetched');
  console.log(`Fetched ${trends.length} trends`);

  // 2. Load configs
  const catConfig = await getConfig('config/categories.json', token, user);
  const rules = catConfig.rules;

  // 3. Filter & rank by relevance
  const aiCfg = await loadAIConfig(token, user);
  const minScore = aiCfg.relevanceMinScore || 2;

  const scored = trends.map(t => ({
    ...t,
    cat: matchCategory(t.title, rules),
    score: scoreRelevance(t.title)
  }));

  // Primary: score >= threshold. Fallback: use top-scored if threshold yields nothing.
  let relevant = scored
    .filter(t => t.score >= minScore)
    .sort((a, b) => b.score - a.score);

  if (relevant.length === 0) {
    console.log(`No trends pass score>=${minScore}, using all trends (fallback)`);
    relevant = scored
      .filter(t => t.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  console.log(`Relevant: ${relevant.length} (score>=${minScore}) / ${trends.length} total`);

  // 4. Generate entries — AI first, template fallback
  const apiKey = process.env.SILICONFLOW_API_KEY;
  const useAI = aiCfg.enabled && apiKey;

  const entries = [];
  for (let i = 0; i < Math.min(relevant.length, 12) && entries.length < 7; i++) {
    const t = relevant[i];
    const variant = (weekNum + i) % 2; // alternate templates

    if (useAI) {
      try {
        const aiResult = await generateAIScript(t, aiCfg, apiKey);
        if (aiResult) {
          entries.push({ id: `h${entries.length + 1}`, ...aiResult });
          console.log(`  AI: ${t.title.slice(0, 20)} (score=${t.score})`);
          continue;
        }
      } catch (e) { console.log(`  AI failed for "${t.title.slice(0, 20)}": ${e.message}`); }
    }

    // Template fallback
    if (!t.cat) t.cat = 'lifestyle'; // safeguard: assign default category
    const entry = buildEntry(t.cat, t, entries.length + 1, variant);
    if (entry) {
      entries.push(entry);
      console.log(`  TPL: ${t.title.slice(0, 20)} (score=${t.score}, cat=${t.cat})`);
    }
  }

  // Safety: ensure exact totalSlots entries
  if (entries.length < totalSlots) {
    console.warn(`Only ${entries.length} entries generated, padding to ${totalSlots}`);
    while (entries.length < totalSlots) {
      const idx = entries.length + 1;
      entries.push({
        id: `h${idx}`, tier: 3,
        title: '你的宽带每月花多少钱？全网比价挑战',
        heat: '全网热门 · 自动补位',
        why: '宽带资费是全民痛点，对比三家运营商的套餐性价比最吸引人。',
        source: 'https://www.douyin.com/search/宽带比价',
        steps: [
          { shot: '展示本月宽带账单，露出惊讶表情', sub: '特写账单金额，引起用户共鸣' },
          { shot: '对比三家运营商同档位套餐', sub: '用表格清晰展示电信vs联通vs移动' },
          { shot: '实测网速+稳定性对比', sub: '同时开视频/游戏/下载测试最终结论' },
          { shot: '推荐最优方案+办理入口', sub: '扫码到店可办理，限时福利' }
        ],
        bgm: '为爱痴狂 - 金志文',
        tags: '#宽带比价 #省钱攻略 #电信宽带',
        difficulty: 1, needFace: true, time: '8分钟'
      });
    }
  }

  console.log(`Generated ${entries.length} entries (${useAI ? 'AI+tpl' : 'tpl only'})`);

  const js = entries.map(e => JSON.stringify(e, null, 2)).join(',\n');
  return `// Auto-generated hotspot follow-shot data\n// Updated: ${today} · Mode: ${useAI ? 'AI-enhanced' : 'template'}\n// Source: 60s.viki.moe/v2/douyin\nwindow.___hotspotData = [\n${js}\n];\n`;
}

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
}

// ============================================================
// Relevance scoring (keyword heuristic)
// ============================================================

function scoreRelevance(title) {
  const high = ['宽带', '网络', '套餐', '5G', '光纤', 'WiFi', '手机', '营业厅', '电信', '合约',
    '网速', '流量', '话费', '路由器', 'FTTR', '号卡', '缴费'];
  const medium = ['世界杯', '高考', '毕业', '学生', '618', '双11', '端午', '节日', '开学',
    '暑假', '寒假', '补贴', '优惠', '数码', '科技', 'AI', '面试', '租房'];
  const low = ['故事', '温暖', '感动', '治愈', '日常', '记录', '美食', '旅游', '舞蹈',
    '挑战', '追剧', '电影', '新歌', '穿搭'];

  let score = 0;
  for (const kw of high) { if (title.includes(kw)) score += 3; }
  for (const kw of medium) { if (title.includes(kw)) score += 2; }
  for (const kw of low) { if (title.includes(kw)) score += 1; }
  // Penalize heavy politics/negative
  if (/坠毁|遇害|谣言|赌球|木马/.test(title)) score -= 2;
  return Math.max(0, Math.min(10, score));
}

// ============================================================
// AI Script Generation (SiliconFlow)
// ============================================================

async function loadAIConfig(token, user) {
  try {
    return await getConfig('config/ai-config.json', token, user);
  } catch (e) {
    console.log('No AI config found, using defaults:', e.message);
    return { enabled: false };
  }
}

async function generateAIScript(trend, cfg, apiKey) {
  const catLabel = { dance: '舞蹈跟拍', festival: '节日氛围', sports: '体育赛事',
    shopping: '购物大促', edu: '学生/教育', tech: '科技热点',
    lifestyle: '生活情感', tvshow: '影视综艺' }[trend.cat] || '热点跟拍';

  const userPrompt = cfg.userPromptTemplate
    .replace(/\{title\}/g, trend.title)
    .replace(/\{rank\}/g, String(trend.rank))
    .replace(/\{category\}/g, catLabel);

  const out = await callSiliconFlow(cfg.systemPrompt, userPrompt, apiKey, cfg);
  if (!out) return null;

  // Parse JSON from response
  const cleaned = out.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (!m) { console.log('AI output not JSON, got:', cleaned.slice(0, 100)); return null; }

  const parsed = JSON.parse(m[0]);
  if (!parsed.title || !parsed.steps) return null;

  // Normalize
  return {
    tier: trend.rank <= 10 ? 1 : trend.rank <= 25 ? 2 : 3,
    title: parsed.title.slice(0, 50),
    heat: `抖音热搜#${trend.rank} · AI精选`,
    why: parsed.why || `「${trend.title}」当前热搜第${trend.rank}名。`,
    source: trend.douyinUrl || `https://www.douyin.com/search/${encodeURIComponent(trend.title)}?type=general`,
    steps: (parsed.steps || []).slice(0, 4).map(s => ({
      shot: (s.shot || '').slice(0, 80),
      sub: (s.sub || '').slice(0, 80)
    })),
    bgm: parsed.bgm || '为爱痴狂 - 金志文',
    tags: (parsed.tags || `#${trend.title.replace(/[「」]/g,'')}`).slice(0, 60),
    difficulty: parsed.difficulty || 1,
    needFace: parsed.needFace !== false,
    time: parsed.time || '8分钟'
  };
}

async function callSiliconFlow(system, user, apiKey, cfg) {
  const res = await fetch(cfg.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: cfg.temperature || 0.8,
      max_tokens: cfg.maxTokens || 2000
    }),
    signal: AbortSignal.timeout(cfg.timeoutMs || 25000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SiliconFlow ${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || null;
}

// ============================================================
// Template matching (with variants A/B)
// ============================================================

function matchCategory(title, rules) {
  for (const rule of rules) {
    if (rule.kw.some(k => title.includes(k))) return rule.cat;
  }
  return 'lifestyle'; // fallback: default to lifestyle category
}

// Template variant rotation: variant=0 uses A, variant=1 uses B
function buildEntry(cat, t, idx, variant) {
  const v = variant || 0;
  switch (cat) {
    case 'dance': return v === 0 ? danceA(t, idx) : danceB(t, idx);
    case 'festival': return v === 0 ? festivalA(t, idx) : festivalB(t, idx);
    case 'sports': return v === 0 ? sportsA(t, idx) : sportsB(t, idx);
    case 'shopping': return v === 0 ? shoppingA(t, idx) : shoppingB(t, idx);
    case 'edu': return v === 0 ? eduA(t, idx) : eduB(t, idx);
    case 'tech': return v === 0 ? techA(t, idx) : techB(t, idx);
    case 'lifestyle': return v === 0 ? lifestyleA(t, idx) : lifestyleB(t, idx);
    case 'tvshow': return v === 0 ? tvshowA(t, idx) : tvshowB(t, idx);
    default: return null;
  }
}

// ---- DANCE ----
function danceA(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : t.rank <= 25 ? 2 : 3,
    title: `「${t.title}」营业厅版挑战`,
    heat: `抖音热搜#${t.rank} · 全民跟拍中`,
    why: `「${t.title}」热搜第${t.rank}名，动作简单。穿工装跳反差感拉满，完播率高。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title + '教程')}?type=general`,
    steps: [
      { shot: `手机架柜台搜"${t.title}教程"先看分解动作`, sub: '字幕：电信营业员申请出战！' },
      { shot: '穿工装跟拍一遍，表情自信', sub: '关键：笑容灿烂、节奏跟BGM' },
      { shot: '同事乱入一起跳，镜头拉远', sub: `标签 #${t.title.replace(/[「」]/g,'')} #营业厅日常` }
    ],
    bgm: '枪火 - 宝石Gem', tags: `#${t.title.replace(/[「」]/g,'')} #营业厅日常 #反差萌`,
    difficulty: 2, needFace: true, time: '15分钟'
  };
}

function danceB(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : t.rank <= 25 ? 2 : 3,
    title: `不会跳舞的营业员不是好网红「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 花式整活中`,
    why: `「${t.title}」热搜第${t.rank}名。谁说营业厅只能办业务？一个人一台手机就能拍。15分钟出片。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title)}?type=general`,
    steps: [
      { shot: '正面半身出镜：听说最近都在跳这个？营业员也能整活！', sub: '字幕：挑战开始！' },
      { shot: '切换全身：跟BGM跳核心动作，背景是营业厅大门/柜台', sub: '字幕：动作不求标准，开心就好' },
      { shot: '结束pose定格：比心+微笑+字幕弹出', sub: '标签 #营业厅整活 #电信人' }
    ],
    bgm: '骄傲的少年 - 南征北战NZBZ', tags: `#${t.title.replace(/[「」]/g,'')} #营业厅整活 #电信人舞蹈`,
    difficulty: 2, needFace: true, time: '12分钟'
  };
}

// ---- FESTIVAL ----
function festivalA(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
    title: `「${t.title}」营业厅送福篇`,
    heat: `抖音热搜#${t.rank} · 节日氛围正浓`,
    why: `「${t.title}」热搜第${t.rank}名。节日+营业厅温暖服务，治愈感拉满。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title + '营业厅')}?type=general`,
    steps: [
      { shot: '前台手持节日礼品微笑面对镜头', sub: `字幕：${t.title}，来营业厅就送！` },
      { shot: '给客户送上祝福和礼品，自然互动', sub: '动作轻柔，眼神温暖' },
      { shot: '大家亮出祝福手势/举杯定格', sub: '标签 #营业厅温度 #节日快乐' }
    ],
    bgm: '踏遍青山 - 晨夕之家', tags: `#${t.title.replace(/[「」]/g,'')} #营业厅温度 #节日快乐`,
    difficulty: 1, needFace: true, time: '8分钟'
  };
}

function festivalB(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
    title: `过节还在上班的电信人「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 节日坚守`,
    why: `「${t.title}」热搜第${t.rank}名。节假日营业厅不关门，拍坚守岗位的真实瞬间比任何广告都有说服力。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title)}?type=general`,
    steps: [
      { shot: '手机对着值班表：今天过节，名单上是我', sub: '字幕：过节？不存在的' },
      { shot: '切换到忙碌场景：接待客户/接电话/操作电脑，快剪3个片段', sub: '字幕：但看到客户满意就是最好的节日礼物' },
      { shot: '抬头微笑+节日祝福', sub: '标签 #节日我在岗 #电信人' }
    ],
    bgm: '阴天 - 莫文蔚', tags: '#节日我在岗 #电信人 #坚守',
    difficulty: 1, needFace: true, time: '5分钟'
  };
}

// ---- SPORTS ----
function sportsA(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
    title: `「${t.title}」你家宽带能看4K吗？`,
    heat: `抖音热搜#${t.rank} · 体育赛事霸榜`,
    why: `「${t.title}」热搜第${t.rank}名。体育赛事+宽带测速天然适配，三屏同看无需口播。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('宽带测速')}?type=general`,
    steps: [
      { shot: '营业厅大屏播赛事，手机拍', sub: '字幕：看球最怕什么？——卡！' },
      { shot: '切100兆→卡顿缓冲，字幕"100兆"', sub: '字幕：球进了你还在缓冲' },
      { shot: '切千兆→多设备4K流畅，字幕"FTTR"', sub: '标签 #宽带测速 #看球不卡' }
    ],
    bgm: 'Waka Waka - Shakira', tags: '#宽带测速 #看球不卡 #营业厅实测 #FTTR',
    difficulty: 1, needFace: false, time: '8分钟'
  };
}

function sportsB(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 10 ? 1 : 2,
    title: `世界杯期间营业厅最忙的不是办业务「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 全民狂欢`,
    why: `体育赛事期间宽带咨询量飙升。在营业厅拍「围观看球」场景——客户、员工、路人一起看大屏的真实氛围比广告动人。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('营业厅宽带')}?type=general`,
    steps: [
      { shot: '手机横拍营业厅大屏前围了一群人看球', sub: '字幕：谁说营业厅只能办业务的？' },
      { shot: '抓拍精彩瞬间大家同时欢呼/惋惜，纯现场音', sub: '字幕：这一刻我们都是球迷' },
      { shot: '镜头切到测速数据：千兆宽带实时码率4M/s+', sub: '标签 #世界杯 #营业厅观赛' }
    ],
    bgm: 'Waka Waka - Shakira', tags: '#世界杯 #营业厅观赛 #千兆宽带 #真4K',
    difficulty: 1, needFace: false, time: '5分钟'
  };
}

// ---- SHOPPING ----
function shoppingA(t, idx) {
  return {
    id: `h${idx}`, tier: 1,
    title: `「${t.title}」最后一波营业厅福利`,
    heat: `抖音热搜#${t.rank} · 大促倒计时`,
    why: `大促+合约机天然适配。营业厅能线上不能做的事：上手真机对比+电信补贴叠加。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('合约机优惠')}?type=general`,
    steps: [
      { shot: '一排合约机排开，特写划线价→福利价', sub: `字幕：${t.title}！这几款现在买最划算` },
      { shot: '举老人机→学生机→旗舰机快速比价', sub: '字幕：国家补贴+电信合约=省上加省' },
      { shot: '人像竖手指倒计时：最后X天来营业厅', sub: '标签 #大促 #合约机 #以旧换新' }
    ],
    bgm: '左转灯 - 派伟俊', tags: '#大促 #合约机 #以旧换新 #营业厅优惠',
    difficulty: 1, needFace: true, time: '10分钟'
  };
}

function shoppingB(t, idx) {
  return {
    id: `h${idx}`, tier: 1,
    title: `大促最后一天来营业厅「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 抄底进行中`,
    why: `大促最后一波，营业厅的隐藏福利很多人不知道——合约机直降+国家补贴+送宽带。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('国家补贴手机')}?type=general`,
    steps: [
      { shot: '第一人称拿手机拍：今天带你看营业厅的隐藏玩法', sub: '字幕：大促最后一天，不看就亏了' },
      { shot: '镜头扫过合约机专区→特写价签→展示算账纸', sub: '字幕：同样配置线上XX元，营业厅XXX元' },
      { shot: '自己出镜：不懂怎么薅？留言我帮你算', sub: '标签 #国家补贴 #合约机 #省钱攻略' }
    ],
    bgm: '枪火 - 宝石Gem', tags: '#国家补贴 #合约机 #省钱攻略 #大促',
    difficulty: 1, needFace: true, time: '8分钟'
  };
}

// ---- EDU ----
function eduA(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `「${t.title}」你的套餐该换了`,
    heat: `抖音热搜#${t.rank} · 学生关注`,
    why: `换号/换套餐需求集中。录屏对比新旧套餐——同样价格差几十G流量。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('套餐升级')}?type=general`,
    steps: [
      { shot: '屏幕录屏电信App→我的套餐，特写月租和剩余流量', sub: `字幕：${t.title}，看看你的套餐` },
      { shot: '手指滑到新套餐详情：同月租→流量翻倍+宽带+会员', sub: '字幕：评论报月租我帮你看值不值' },
      { shot: '人像：换完省下的够吃一个月食堂', sub: '标签 #套餐升级 #学生党福利 #省钱攻略' }
    ],
    bgm: '我记得 - 赵雷', tags: '#套餐升级 #学生党福利 #省钱攻略',
    difficulty: 1, needFace: true, time: '10分钟'
  };
}

function eduB(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `电信人的校园记忆「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 共鸣`,
    why: `教育话题自带共鸣。营业厅里遇到过的大学生故事——办卡、办宽带、问套餐，每个都能勾起回忆。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('学生套餐')}?type=general`,
    steps: [
      { shot: '半身出镜：大一办第一张卡、大四注销宽带……', sub: '字幕：在营业厅看过了太多青春' },
      { shot: '快剪几个画面：学生掏学生证/家长陪同/毕业注销', sub: '字幕：4年很快，但网络信号一直在' },
      { shot: '微笑：不管你去哪座城市，电信都在', sub: '标签 #校园记忆 #电信人 #毕业季' }
    ],
    bgm: '起风了 - 买辣椒也用券', tags: '#校园记忆 #电信人 #毕业季',
    difficulty: 1, needFace: true, time: '8分钟'
  };
}

// ---- TECH ----
function techA(t, idx) {
  return {
    id: `h${idx}`, tier: t.rank <= 15 ? 1 : 2,
    title: `「${t.title}」跟电信有什么关系？`,
    heat: `抖音热搜#${t.rank} · 科技热门`,
    why: `科技热点+电信天然绑定。知识科普→收藏率高。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title + ' 5G')}?type=general`,
    steps: [
      { shot: '正面半身：你知道XX跟电信有什么关系吗？', sub: `字幕：${t.title}幕后推手竟然是电信？` },
      { shot: '展示设备：FTTR/光猫/基站逐一讲解', sub: '大白话讲，每点不超15秒' },
      { shot: '下次来营业厅我现场演示', sub: '标签 #科技科普 #5G #营业厅知识' }
    ],
    bgm: '骄傲的少年 - 南征北战NZBZ', tags: '#科技科普 #5G #营业厅知识 #冷知识',
    difficulty: 1, needFace: true, time: '10分钟'
  };
}

function techB(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `电信营业厅里的黑科技「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 涨知识`,
    why: `科技话题要直观。用营业厅现成的设备做3个「大多数人不知道的功能」展示。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title)}?type=general`,
    steps: [
      { shot: '第一人称视角走进营业厅：今天带你看看电信的黑科技', sub: '字幕：这些功能99%的人不知道' },
      { shot: '快切3个展示：FTTR信号穿墙→千兆下载→光猫自检', sub: '每个展示5-10秒+字幕说明' },
      { shot: '自己出镜总结：常来营业厅，不止办业务', sub: '标签 #黑科技 #营业厅 #涨知识' }
    ],
    bgm: '骄傲的少年 - 南征北战NZBZ', tags: '#黑科技 #营业厅 #涨知识 #科普',
    difficulty: 2, needFace: true, time: '12分钟'
  };
}

// ---- LIFESTYLE ----
function lifestyleA(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `「${t.title}」营业厅的温暖瞬间`,
    heat: `抖音热搜#${t.rank} · 网友共鸣`,
    why: `情绪内容高完播率高互动。1句字幕+1个表情+1段BGM=15秒爆款。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('营业厅故事')}?type=general`,
    steps: [
      { shot: '半身面无表情2秒，然后抿嘴/笑/擦眼角', sub: `字幕：${t.title}，想起上次那个阿姨…` },
      { shot: '同事递纸巾，对视一笑', sub: '关键：不要演，想一件真事自然流露' },
      { shot: '画面定格+字幕', sub: '标签 #营业厅故事 #感动瞬间 #服务行业' }
    ],
    bgm: '我记得 - 赵雷', tags: '#营业厅故事 #感动瞬间 #服务行业 #温暖',
    difficulty: 1, needFace: true, time: '5分钟'
  };
}

function lifestyleB(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `电信营业厅最治愈的10秒「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 萌/治愈`,
    why: `温馨日常不挑时间地点。在营业厅随手抓拍一个有爱的画面就行。`,
    source: `https://www.douyin.com/search/${encodeURIComponent(t.title)}?type=general`,
    steps: [
      { shot: '手机横屏：镜头安静地观察营业厅一角（柜台/等候区/门口）', sub: '字幕：你有多久没有慢下来了？' },
      { shot: '捕捉温暖细节：老人被搀扶/小朋友问好/同事递水', sub: '字幕：发生在营业厅的，不止是办业务' },
      { shot: '淡出+字幕：你今天被治愈了吗？', sub: '标签 #治愈 #营业厅 #日常' }
    ],
    bgm: '阴天 - 莫文蔚', tags: '#治愈 #营业厅 #日常 #温暖',
    difficulty: 1, needFace: false, time: '5分钟'
  };
}

// ---- TVSHOW ----
function tvshowA(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `「${t.title}」追剧必备千兆宽带`,
    heat: `抖音热搜#${t.rank} · 全民追剧中`,
    why: `新剧/新片→4K画质需要好宽带。演示加载速度对比。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('追剧宽带')}?type=general`,
    steps: [
      { shot: '手机播放新片预告，千兆WiFi下秒加载', sub: `字幕：${t.title}，4K不卡顿的秘密` },
      { shot: '对比普通vs千兆加载速度', sub: '字幕：评论区报兆数帮你看' },
      { shot: '展示FTTR设备：来营业厅升千兆', sub: '标签 #追剧 #千兆宽带 #FTTR' }
    ],
    bgm: '恋人 - 李荣浩', tags: '#追剧必备 #千兆宽带 #FTTR #4K',
    difficulty: 1, needFace: false, time: '8分钟'
  };
}

function tvshowB(t, idx) {
  return {
    id: `h${idx}`, tier: 2,
    title: `在营业厅刷到神剧「${t.title}」`,
    heat: `抖音热搜#${t.rank} · 剧集热播`,
    why: `刷剧场景+宽带对比。不需要你推荐剧，只需要对比你的网络能不能流畅看4K。`,
    source: `https://www.douyin.com/search/${encodeURIComponent('宽带测速')}?type=general`,
    steps: [
      { shot: '在营业厅用手机打开新剧播放', sub: '字幕：猜猜我用的是什么宽带？' },
      { shot: '画中画：同一部剧左边普通宽带缓冲，右边千兆4K流畅', sub: '字幕：差的就是这100块月费' },
      { shot: '自拍反问：你用的什么宽带？评论区说说', sub: '标签 #追剧体验 #千兆宽带 #不懂就问' }
    ],
    bgm: '恋人 - 李荣浩', tags: '#追剧体验 #千兆宽带 #不懂就问 #FTTR',
    difficulty: 1, needFace: true, time: '8分钟'
  };
}

// ============================================================
// Data fetching
// ============================================================

async function fetchTrends() {
  try {
    const res = await fetch('https://60s.viki.moe/v2/douyin', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(12000)
    });
    const json = await res.json();
    if (json.code === 200 && Array.isArray(json.data)) {
      return json.data.map((item, i) => ({
        rank: i + 1,
        title: item.title,
        douyinUrl: item.link || `https://www.douyin.com/search/${encodeURIComponent(item.title)}?type=general`,
        hotValue: item.hot_value || 0
      }));
    }
  } catch (e) { console.error('60s API failed:', e.message); }

  try {
    const res = await fetchWithUA('https://hotflashnews.com/platform/douyin');
    const html = await res.text();
    const regex = /(\d+)\.\s*\[([^\]]+)\]\((https:\/\/www\.douyin\.com\/hot\/\d+)\)/g;
    let match; const topics = [];
    while ((match = regex.exec(html)) !== null) {
      topics.push({ rank: parseInt(match[1]), title: match[2].trim(), douyinUrl: match[3], hotValue: 0 });
    }
    if (topics.length > 0) return topics;
  } catch (e) { console.error('Fallback failed:', e.message); }

  return [];
}

// ============================================================
// BGM (unchanged v3 logic)
// ============================================================

async function genBgm(token, user) {
  const today = new Date().toISOString().slice(0, 10);
  let songs = [];
  try { songs = await fetchKugouRank(); }
  catch (e) { console.log('Kugou failed:', e.message); }
  if (songs.length < 10) {
    const fb = await getConfig('config/bgm-fallback.json', token, user);
    songs = fb.songs;
  }
  const bgmRules = await getConfig('config/bgm-rules.json', token, user);
  const categorized = categorizeBgm(songs, bgmRules);
  const js = JSON.stringify(categorized, null, 2);
  return `// Auto-generated BGM\n// Updated: ${today}\nwindow.___bgmList = ${js};\n`;
}

async function fetchKugouRank() {
  const res = await fetchWithUA('https://www.kugou.com/yy/html/rank.html');
  const html = await res.text();
  const results = [];
  const titleRegex = /\*\*(\d+)\*\*\[([^\]]+)\]/g;
  let m;
  while ((m = titleRegex.exec(html)) !== null) {
    results.push({ rank: parseInt(m[1]), title: m[2], artist: '' });
  }
  const artistRegex = /\\\s*-\s*([^\]\n<]+)/g;
  const artists = [];
  while ((m = artistRegex.exec(html)) !== null) { artists.push(m[1].trim()); }
  for (let i = 0; i < Math.min(results.length, artists.length); i++) {
    results[i].artist = artists[i];
  }
  return results.filter(s => s.artist && s.artist.length > 0).slice(0, 30);
}

function categorizeBgm(songs, rules) {
  const fast = [], medium = [], slow = [];
  const fastKw = rules.fast || [];
  const slowKw = rules.slow || [];
  for (const s of songs) {
    const label = `${s.title} - ${s.artist}`;
    if (fastKw.some(k => s.title.includes(k) || (s.artist||'').includes(k))) { fast.push(label); }
    else if (slowKw.some(k => s.title.includes(k))) { slow.push(label); }
    else { medium.push(label); }
  }
  const pick = (arr, n) => arr.slice(0, Math.min(n, arr.length));
  const defaults = rules.defaultAssignments || {};
  function fill(key, subKey) {
    const def = defaults[key]?.[subKey];
    const mood = def?.mood || 'medium';
    const fb = def?.fallback || [];
    if (mood === 'none') return fb;
    const pool = mood === 'fast' ? fast : mood === 'slow' ? slow : medium;
    const picked = pick(pool, 3);
    return picked.length >= 3 ? picked : (pick(fb, 3).length >= 3 ? pick(fb, 3) : fb);
  }
  const cats = ['决策指南','一线场景','深度测评','本地事件','直播'];
  const result = {};
  for (const cat of cats) {
    result[cat] = {};
    for (const sk of Object.keys(defaults[cat] || {})) {
      result[cat][sk] = fill(cat, sk);
    }
  }
  return result;
}

// ============================================================
// TOPICS (unchanged v3 logic)
// ============================================================

async function genTopics(token, user) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateStr = today.toISOString().slice(0, 10);
  const baseTopics = await getConfig('config/base-topics.json', token, user);
  const seasonConfig = await getConfig('config/seasons.json', token, user);
  const merged = { ...baseTopics };
  delete merged._comment;
  for (const rule of seasonConfig.rules) {
    if (dateInRange(rule.match, month, day)) {
      for (const [key, vals] of Object.entries(rule.topics)) {
        if (merged[key]) merged[key] = [...vals, ...merged[key]].slice(0, 24);
      }
    }
  }
  const t1 = getT1Presets(month, day);
  return {
    topics: `// Auto-generated topic pool\n// Updated: ${dateStr}\nwindow.___topicPool = ${JSON.stringify(merged, null, 2)};\n`,
    t1: `// Auto-generated T1 presets\n// Updated: ${dateStr}\nwindow.___t1Presets = ${JSON.stringify(t1, null, 2)};\n`
  };
}

function dateInRange(range, month, day) {
  try {
    const [s, e] = range.split('~');
    const [sm, sd] = s.split('-').map(Number);
    const [em, ed] = e.split('-').map(Number);
    return month * 100 + day >= sm * 100 + sd && month * 100 + day <= em * 100 + ed;
  } catch (e) { return false; }
}

function getT1Presets(month, day) {
  const base = {
    "宽带选多少兆": {
      "100M 够用党": "日常刷视频+微信，一人住。100M看1080P流畅。适合租房党、老年人。",
      "300M 性价比": "2-3人家庭，同时看视频+打游戏+上网课。月费多10几块体验翻倍。",
      "1000M 一步到位": "4人以上/智能家居/游戏直播。千兆+FTTR全屋覆盖，多花30块用3年不后悔。"
    },
    "合约机还是裸机": {
      "合约机(月付)": "首付低，月租含话费+流量+宽带。3年比裸机少500-1500元。",
      "裸机(全款)": "一次付清自由换套餐。适合已有满意套餐不想被绑定的。",
      "以旧换新": "旧手机折价+电信补贴=新机半价。有旧机想升级的最划算。"
    },
    "套餐怎么选": {
      "流量党": "月流量>30G→大流量套餐(59-99元档)。流量不够叠加比升级划算。",
      "通话党": "月通话>300分钟→含通话套餐(39-59元档)。",
      "全家桶": "2-4人→融合套餐(99-199元)。3张副卡+宽带+IPTV，人均30-50元。"
    }
  };
  if (month === 6 && day <= 18) {
    base["618该不该入手"] = {
      "618营业厅买": "合约机直降+国家补贴+送宽带，三重叠加。到店可上手真机对比。",
      "618线上买": "线上选择多但看不到真机且不能办合约。",
      "不等了先办": "早买早享受，618后可能恢复原价。先看看有合适的直接拿走。"
    };
  }
  return base;
}

// ============================================================
// EdgeOne Pages direct deploy via CLI (npx)
// ============================================================

const SITE_FILES = [
  'index.html', 'app.js', 'styles.css', 'package.json',
  'data/hotspotData.js', 'data/topicPool.js', 'data/t1Presets.js',
  'data/t2Presets.js', 'data/t4Presets.js', 'data/techDB.js',
  'data/phonePool.js', 'data/bgmList.js'
];

async function deployViaEdgeOne(token, user) {
  const eoToken = process.env.EDGEONE_TOKEN;
  if (!eoToken) { console.log('No EDGEONE_TOKEN, skipping deploy'); return false; }

  try {
    const siteDir = '/tmp/site';
    await ensureDir(siteDir);

    // Download all site files from Gitee
    const baseUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents`;
    let downloaded = 0;

    for (const f of SITE_FILES) {
      try {
        const res = await fetch(`${baseUrl}/${encodeURIComponent(f)}?ref=master`, {
          headers: { 'Authorization': `token ${token}` },
          signal: AbortSignal.timeout(15000)
        });
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.content) continue;

        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const dest = siteDir + '/' + f;
        await ensureDir(dest.substring(0, dest.lastIndexOf('/')));
        await writeTextFile(dest, content);
        downloaded++;
      } catch (e) { /* skip missing files */ }
    }

    if (downloaded === 0) {
      console.log('No site files downloaded');
      return false;
    }

    console.log(`Downloaded ${downloaded} site files, deploying...`);

    const cmd = `npx --cache /tmp/npm-cache edgeone pages deploy -n sxdouyingongfang -t ${eoToken}`;
    const { exec } = require('child_process');
    const result = await new Promise((resolve, reject) => {
      exec(cmd, {
        cwd: siteDir,
        env: { ...process.env, HOME: '/tmp', PAGES_SOURCE: 'skills' },
        timeout: 180000,
        maxBuffer: 5 * 1024 * 1024
      }, (err, stdout) => {
        if (err) { console.log('CLI stdout:', (stdout || '').slice(-400)); reject(err); }
        else resolve(stdout);
      });
    });
    console.log('Deploy OK:', (result || '').slice(-200));
    return true;
  } catch (e) {
    console.error('Deploy failed:', e.message);
    return false;
  }
}

async function ensureDir(dirPath) {
  const fs = require('fs');
  try { fs.mkdirSync(dirPath, { recursive: true }); } catch (e) {}
}

async function writeTextFile(filePath, content) {
  const fs = require('fs');
  fs.writeFileSync(filePath, content, 'utf-8');
}

// ============================================================
// Gitee file update
// ============================================================

async function updateGiteeFile(filePath, content, token, user) {
  const apiUrl = `https://gitee.com/api/v5/repos/${user}/sx-douyin-data/contents/${encodeURIComponent(filePath)}`;
  const getRes = await fetch(apiUrl + '?ref=master', {
    headers: { 'Authorization': `token ${token}` }
  });
  const fileInfo = await getRes.json();
  if (!fileInfo.sha) throw new Error(`Cannot get SHA: ${JSON.stringify(fileInfo)}`);
  const updateRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      sha: fileInfo.sha,
      message: `auto(${new Date().toISOString().slice(0,10)}): update ${filePath.split('/').pop()}`,
      branch: 'master'
    })
  });
  if (!updateRes.ok) {
    const errText = await updateRes.text();
    throw new Error(`Gitee API ${updateRes.status}: ${errText}`);
  }
}

function fetchWithUA(url) {
  return fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' },
    signal: AbortSignal.timeout(15000)
  });
}
