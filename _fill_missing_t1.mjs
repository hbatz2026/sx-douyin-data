// _fill_missing_t1.mjs — 批量补齐 t1Presets 缺脚本的选题
// 从 topicPool.decision 找出 t1Presets 里没有的选题，分批调 AI 生成脚本，合并写回 Gitee
const TOKEN = process.env.GITEE_TOKEN || '2bb7658fad09c69904a09dd61195ac6e';
const USER = 'hbatz';
const API_BASE = `https://gitee.com/api/v5/repos/${USER}/sx-douyin-data/contents`;

// ── Gitee 读写 ──
async function giteeRead(path) {
  const r = await fetch(API_BASE + '/' + encodeURIComponent(path) + '?ref=master', { headers: { 'Authorization': `token ${TOKEN}` } });
  if (!r.ok) throw new Error(`Gitee read ${path}: ${r.status}`);
  const j = await r.json();
  return Buffer.from(j.content, 'base64').toString('utf-8');
}
async function giteeWrite(path, content, msg) {
  let sha;
  try { const r = await fetch(API_BASE + '/' + encodeURIComponent(path) + '?ref=master', { headers: { 'Authorization': `token ${TOKEN}` } }); if (r.ok) { const j = await r.json(); sha = j.sha; } } catch {}
  const body = { access_token: TOKEN, content: Buffer.from(content, 'utf-8').toString('base64'), message: msg, branch: 'master' };
  if (sha) body.sha = sha;
  const r = await fetch(API_BASE + '/' + encodeURIComponent(path), { method: sha ? 'PUT' : 'POST', headers: { 'Authorization': `token ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) { const t = await r.text(); throw new Error(`Gitee write ${path}: ${r.status} ${t}`); }
  console.log(`  ✅ ${path} written`);
}

function parseJsObj(text) {
  const s = String(text); const i = s.indexOf('{'); const j = s.lastIndexOf('}');
  if (i < 0 || j < 0) return {}; return JSON.parse(s.slice(i, j + 1));
}

// ── 净化（从 index.js 复制，保持一致）──
const HARD_BAN = {'合约机':'合约套餐','合约价':'套餐价','合约':'套餐','话费':'通信费','号卡':'号码','电话卡':'号码','流量卡':'流量套餐','月租费':'每月消费','月租':'每月消费','套餐费':'套餐价','资费':'费用','办卡':'办理','开卡':'入网','0元购':'特惠购','免费领卡':'限时'};
function sanitizeHardBan(t){if(!t||typeof t!=='string')return t;let out=t;for(const k in HARD_BAN){if(out.indexOf(k)>=0)out=out.split(k).join(HARD_BAN[k]);}return out;}
const STANCE_BAN=[{re:/电信更坑人|电信坑人|联通坑人|移动坑子|运营商坑人|运营商都是坑/g,to:'选套餐要细心'},{re:/不要相信运营商|别信运营商|不能相信运营商/g,to:'办理前多对比'},{re:/忽悠/g,to:'误导'}];
function sanitizeStance(t){if(!t||typeof t!=='string')return t;let out=t;for(const r of STANCE_BAN)out=out.replace(r.re,r.to);return out;}
function sanitize100M(t){if(!t||typeof t!=='string')return t;let out=t;out=out.replace(/100兆打排位等于送人头/g,'300兆打排位才稳');out=out.replace(/100兆起步/g,'300兆起步');out=out.replace(/100兆宽带/g,'300兆宽带');out=out.replace(/100M/g,'300M');out=out.replace(/100兆/g,'300兆');out=out.replace(/百兆宽带/g,'300兆宽带');out=out.replace(/百兆/g,'300兆');return out;}
function hs(t){return sanitize100M(sanitizeStance(sanitizeHardBan(t||'')));}
function sanitizeObj(obj){
  if(Array.isArray(obj))return obj.map(v=>sanitizeObj(v));
  if(obj&&typeof obj==='object'){const o={};for(const k of Object.keys(o))o[hs(k)]=sanitizeObj(obj[k]);return o;}
  if(typeof obj==='string')return hs(obj);
  return obj;
}

// ── AI 调用 ──
async function callAI(sys, userP, apiKey, cfg) {
  const endpoint = cfg.endpoint || 'https://tbnx.plus7.plus/v1/chat/completions';
  const model = cfg.model || 'deepseek-v4-pro';
  const body = { model, messages: [{ role: 'system', content: sys }, { role: 'user', content: userP }], temperature: 0.85, max_tokens: 8000 };
  const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` }, body: JSON.stringify(body), signal: AbortSignal.timeout(180000) });
  if (!r.ok) { const t = await r.text(); throw new Error(`AI ${r.status}: ${t.slice(0,200)}`); }
  const j = await r.json();
  return j.choices?.[0]?.message?.content || '';
}
function extractJson(text) {
  if (!text) return null; const s = String(text);
  const start = s.indexOf('{'); if (start < 0) return null;
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = start; i < s.length; i++) {
    const ch = s[i]; if (esc) { esc = false; continue; } if (ch === '\\') { esc = true; continue; } if (ch === '"') { inStr = !inStr; continue; } if (inStr) continue;
    if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) return null;
  try { return JSON.parse(s.slice(start, end + 1)); } catch(e) { return null; }
}

// ── 主流程 ──
async function main() {
  console.log('📖 读取 Gitee 数据...');
  const tpRaw = await giteeRead('data/topicPool.js');
  const t1Raw = await giteeRead('data/t1Presets.js');
  const pool = parseJsObj(tpRaw);
  const presets = parseJsObj(t1Raw);
  const haveKeys = new Set(Object.keys(presets));
  const missing = (pool.decision || []).filter(k => !haveKeys.has(k));

  console.log(`topicPool.decision: ${(pool.decision||[]).length} 个选题`);
  console.log(`t1Presets 已有: ${haveKeys.size} 个`);
  console.log(`缺失脚本: ${missing.length} 个`);

  if (missing.length === 0) { console.log('✅ 无缺口，无需补齐'); return; }

  // 读 AI 配置
  let aiCfg = {};
  try { const cfgRaw = await giteeRead('config/ai-config.json'); aiCfg = parseJsObj(cfgRaw); } catch(e) { console.warn('读 ai-config 失败，用默认'); }
  const apiKey = process.env.SILICONFLOW_API_KEY || aiCfg.apiKey || '';
  if (!apiKey) { console.error('❌ 无 SILICONFLOW_API_KEY'); process.exit(1); }

  // 分批：每批最多 6 个
  const BATCH_SIZE = 6;
  const batches = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) batches.push(missing.slice(i, i + BATCH_SIZE));
  console.log(`\n🤗 分 ${batches.length} 批调 AI 补齐...`);

  const allNew = {};
  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    console.log(`\n--- 批次 ${bi+1}/${batches.length} (${batch.join(', ')}) ---`);
    const sys = '你是山西电信抖音内容运营专家。为以下「决策指南」类选题生成脚本模板。每个选题给出2-3个人群/档位视角的一句话脚本。';
    const userP = `请为以下${batch.length}个选题各生成脚本预设（JSON对象）：\n${batch.map((k,i)=>`${i+1}. ${k}`).join('\n')}\n\n【输出要求】只返回一个JSON对象（不要markdown代码块），键为选题名，值为{人群档位:"一句话脚本",...}。\n注意：山西电信在售宽带仅300/500/1000/FTTR，禁止出现100M/100兆/百兆。脚本站在营业员角度。`;
    const raw = await callAI(sys, userP, apiKey, aiCfg);
    const parsed = extractJson(raw);
    if (!parsed) { console.log(`  ⚠️ 批次 ${bi+1} 解析失败，跳过`); continue; }
    for (const k of Object.keys(parsed)) {
      if (parsed[k] && typeof parsed[k] === 'object') {
        allNew[hs(k)] = sanitizeObj(parsed[k]);
        console.log(`  ✅ ${k}`);
      }
    }
  }

  // 合并写回
  const merged = Object.assign({}, presets, allNew);
  const header = '// Auto-generated T1 presets\n// Updated: ' + new Date().toISOString().slice(0,10) + ' · 数据源: 热点/搜索截流/厅店活动(每周一自动更新+缺口径补齐)\n';
  const js = header + 'window.___t1Presets = ' + JSON.stringify(merged, null, 2) + ';';
  await giteeWrite('data/t1Presets.js', js, 'fix(数据补齐): 批量补齐 '+Object.keys(allNew).length+'个缺脚本选题的t1预设');

  console.log(`\n✅ 完成！新增 ${Object.keys(allNew).length} 个选题脚本，t1Presets 总计 ${Object.keys(merged).length} 个`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
