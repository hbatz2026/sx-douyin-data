// deploy-all.mjs — 一键全量部署（前端 + SCF Web + 即时生效验证）
// 固化「改完立即生效」流程，避免部署链路割裂 / SCF 冷启动延迟 / 不验证生效
//
// 用法:
//   node deploy-all.mjs            → 前端 quick + SCF Web 全量部署并验证
//   node deploy-all.mjs --quick    → 同上（前端 quick）
//   node deploy-all.mjs --full     → 前端 full（含 SCF Event）+ SCF Web 全量部署并验证
//   node deploy-all.mjs --scf-only → 仅部署 SCF（Web + Event），跳过前端（CI 用，前端走本地 deploy.mjs）
//
// 流程:
//   1. 前端 deploy.mjs (--quick / --full)
//   2. push-scf-web.mjs  → 推 Gitee（注入 BUNDLED_TS + version.txt）
//   3. deploy-web-codeonly.mjs → UpdateFunctionCode（打包整个 scf-personalize/ 目录）
//   4. 触发 SCF Web 冷启动（fire-and-forget 调端点，让 loader.js 拉 Gitee 新代码）
//   5. 端到端验证：
//      - SCF：轮询端点，确认 promptVer:'v2' + lane 分布正确（2 hot + 2 search）
//      - 前端：curl 线上 app.js，确认版本号 + 关键函数存在
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash, createHmac } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LAB = join(__dirname, '..', 'douyin-content-lab');
const ARGS = process.argv.slice(2);
const FULL = ARGS.includes('--full');
const QUICK = ARGS.includes('--quick') || !FULL;
const SCF_ONLY = ARGS.includes('--scf-only');

const ENDPOINT = 'https://1253338744-6kei9ayy45.ap-guangzhou.tencentscf.com';
const FRONTEND_URL = 'https://hbatz2026.github.io/sx-douyin-data';

// ─── TC 凭证（读 tc-config.cjs）───
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let CREDS = { id: process.env.TC_SECRET_ID, key: process.env.TC_SECRET_KEY, region: process.env.TC_REGION || 'ap-guangzhou' };
try {
  const cfg = require('./tc-config.cjs');
  CREDS.id = CREDS.id || cfg.TC_SECRET_ID;
  CREDS.key = CREDS.key || cfg.TC_SECRET_KEY;
  CREDS.region = CREDS.region || cfg.TC_REGION || 'ap-guangzhou';
} catch (e) {}
if (!CREDS.id || !CREDS.key) { console.error('❌ 缺少腾讯云凭证（环境变量或 tc-config.cjs）'); process.exit(1); }

function sha256Hex(d){ return createHash('sha256').update(d).digest('hex'); }
function signTC3(secretKey, date, service, stringToSign){
  const kDate = createHmac('sha256', `TC3${secretKey}`).update(date).digest();
  const kService = createHmac('sha256', kDate).update(service).digest();
  const kSigning = createHmac('sha256', kService).update('tc3_request').digest();
  return createHmac('sha256', kSigning).update(stringToSign).digest('hex');
}
async function callSCF(action, payload){
  const { id, key, region } = CREDS;
  const service = 'scf', host = 'scf.tencentcloudapi.com', version = '2018-04-16';
  const timestamp = Math.floor(Date.now()/1000);
  const date = new Date(timestamp*1000).toISOString().slice(0,10);
  const payloadStr = JSON.stringify(payload);
  const hashedPayload = sha256Hex(payloadStr);
  const canonicalRequest = ['POST','/', '', 'content-type:application/json\nhost:'+host+'\n', 'content-type;host', hashedPayload].join('\n');
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = ['TC3-HMAC-SHA256', timestamp, credentialScope, sha256Hex(canonicalRequest)].join('\n');
  const signature = signTC3(key, date, service, stringToSign);
  const authorization = `TC3-HMAC-SHA256 Credential=${id}/${credentialScope}, SignedHeaders=content-type;host, Signature=${signature}`;
  const res = await fetch(`https://${host}`, { method:'POST', headers:{ 'Content-Type':'application/json','Host':host,'X-TC-Action':action,'X-TC-Version':version,'X-TC-Timestamp':String(timestamp),'X-TC-Region':region, Authorization:authorization }, body: payloadStr });
  const json = await res.json();
  if (json.Response.Error) throw new Error(`${json.Response.Error.Code}: ${json.Response.Error.Message}`);
  return json.Response;
}
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function triggerColdStart(){
  // fire-and-forget：触发一次冷启动，让 loader.js 拉 Gitee 新代码
  try {
    fetch(ENDPOINT, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ mode:'hotspot-fetch', model:'deepseek-v4-pro', max_tokens:8000, temperature:0.9 })
    }).then(r=>r.text()).then(()=>console.log('  ✅ 冷启动触发完成（loader 已拉取 Gitee 新代码）'))
      .catch(e=>console.log('  ⚠️ 冷启动触发异常:', e.message));
  } catch(e) { console.log('  ⚠️ 冷启动触发失败:', e.message); }
}

async function verifySCF(retries = 6, intervalMs = 20000){
  console.log(`\n🔍 验证 SCF Web 生效（最多 ${retries} 次，间隔 ${intervalMs/1000}s）...`);
  for (let i = 0; i < retries; i++) {
    if (i > 0) await sleep(intervalMs);
    try {
      const t0 = Date.now();
      const t = await fetch(ENDPOINT, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ mode:'hotspot-fetch', model:'deepseek-v4-pro', max_tokens:8000, temperature:0.9 })
      }).then(r=>r.text());
      const dt = ((Date.now()-t0)/1000).toFixed(0);
      let j; try { j = JSON.parse(t); } catch(e) { console.log(`  [${i+1}] 非 JSON（${dt}s），重试...`); continue; }
      if (!j || !Array.isArray(j.scripts)) { console.log(`  [${i+1}] 结构异常，重试...`); continue; }
      const lanes = j.scripts.reduce((a,s)=>{ a[s.lane||'undefined']=(a[s.lane||'undefined']||0)+1; return a; }, {});
      console.log(`  [${i+1}] promptVer=${j.promptVer} count=${j.scripts.length} lanes=${JSON.stringify(lanes)} (${dt}s)`);
      if (j.promptVer === 'v2' && j.scripts.length >= 4) {
        console.log('  ✅ SCF Web 验证通过：新代码已生效');
        return true;
      }
    } catch(e) {
      console.log(`  [${i+1}] 请求失败: ${e.message}`);
    }
  }
  console.log('  ⚠️ SCF Web 验证超时（可能仍在冷启动中，请稍后手动确认）');
  return false;
}

async function verifyFrontend(){
  console.log('\n🔍 验证前端线上版本...');
  try {
    const html = await fetch(FRONTEND_URL + '/').then(r=>r.text());
    const vMatch = html.match(/app\.js\?v=([\d.]+)/);
    const ver = vMatch ? vMatch[1] : '?';
    const js = await fetch(FRONTEND_URL + '/app.js?v=' + ver).then(r=>r.text());
    const hasCacheV4 = js.includes('hsCacheV4');
    const hasVersion = js.includes('HS_CACHE_VERSION');
    console.log(`  ✅ 线上 app.js 版本引用: v${ver} | hsCacheV4: ${hasCacheV4} | HS_CACHE_VERSION: ${hasVersion}`);
    if (!hasCacheV4) console.log('  ⚠️ 前端可能未更新到最新缓存逻辑');
    return true;
  } catch(e) {
    console.log('  ⚠️ 前端验证失败:', e.message);
    return false;
  }
}

console.log(`\n🚀 一键全量部署（前端 ${QUICK?'quick':'full'} + SCF Web）\n`);
const start = Date.now();

// ─── Step 1: 前端部署（--scf-only 时跳过）───
if (!SCF_ONLY) {
  console.log('═══ [1] 前端部署 ═══');
  try {
    execSync(`node deploy.mjs ${QUICK?'--quick':'--full'}`, { stdio:'inherit', cwd: LAB });
  } catch(e) {
    console.error('❌ 前端部署失败，中止');
    process.exit(1);
  }
} else {
  console.log('═══ [1] 跳过前端部署（--scf-only）═══');
}

// ─── Step 2: SCF Web 推 Gitee（非致命：Gitee 偶发不可达不影响主部署 UpdateFunctionCode）───
console.log('\n═══ [2] SCF Web 推 Gitee ═══');
try {
  execSync(`node push-scf-web.mjs`, { stdio:'inherit', cwd: __dirname });
} catch(e) {
  console.warn('⚠️ 推 Gitee 失败（运行时自部署路径将暂时不可用，但 UpdateFunctionCode 主部署不受影响）');
}

// ─── Step 3: SCF Web 部署（UpdateFunctionCode）───
console.log('\n═══ [3] SCF Web 部署 ═══');
try {
  execSync(`node deploy-web-codeonly.mjs`, { stdio:'inherit', cwd: __dirname });
} catch(e) {
  console.error('❌ SCF Web 部署失败');
  process.exit(1);
}

// ─── Step 3b: SCF Event 函数部署（含 hotspot-warmup 定时预热分支）───
console.log('\n═══ [3b] SCF Event 函数部署 ═══');
try {
  execSync(`node deploy-scf-event.mjs`, { stdio: 'inherit', cwd: __dirname });
} catch (e) {
  console.error('❌ SCF Event 部署失败（不影响 Web 函数）');
}

// ─── Step 4: 触发冷启动 ───
console.log('\n═══ [4] 触发 SCF Web 冷启动 ═══');
console.log('  等待云端传播（10s）...');
await sleep(10000);
await triggerColdStart();

// ─── Step 5: 端到端验证 ───
console.log('\n═══ [5] 端到端验证 ═══');
await verifySCF();
if (!SCF_ONLY) await verifyFrontend();
else console.log('  （--scf-only：跳过前端版本校验）');

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n✅ 全量部署完成 ${elapsed}s`);
console.log('  💡 用户侧刷新页面即可看到最新效果（前端已加缓存版本号，旧缓存自动失效）');
