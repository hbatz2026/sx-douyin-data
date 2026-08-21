// deploy-web-codeonly.mjs — 仅更新 SCF Web 函数代码，不触碰环境变量
// 用途：安全地部署 scf-personalize/index.js，保留线上现有 env（GITEE_TOKEN/SILICONFLOW_API_KEY 等）
// 凭证来源：./tc-config.cjs（集中存放），或环境变量 TC_SECRET_ID/TC_SECRET_KEY 覆盖
import { createHash, createHmac } from 'crypto';
import { readFileSync, unlinkSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'scf-personalize');

// R4 部署护栏（v3.0-完整方案.md §1.4 Week 2）：--target dev|prod（默认 prod 保持现状）
// 生产只认 CI（GitHub Actions 真实 TC Secrets）；本地试跑请用 --target dev（需先在控制台创建 douyin-personalize-dev）。
const ARGS = process.argv.slice(2);
const TARGET = ARGS.includes('--target') ? (ARGS[ARGS.indexOf('--target') + 1] || 'prod') : 'prod';
const FUNC_NAME = TARGET === 'dev' ? 'douyin-personalize-dev' : 'douyin-personalize';

// 凭证：优先环境变量，回退 tc-config.cjs
let CREDS = { id: process.env.TC_SECRET_ID, key: process.env.TC_SECRET_KEY, region: process.env.TC_REGION || 'ap-guangzhou' };
try {
  const cfg = require('./tc-config.cjs');
  CREDS.id = CREDS.id || cfg.TC_SECRET_ID;
  CREDS.key = CREDS.key || cfg.TC_SECRET_KEY;
  CREDS.region = CREDS.region || cfg.TC_REGION || 'ap-guangzhou';
} catch (e) { console.error('读取 tc-config.cjs 失败:', e.message); }
if (!CREDS.id || !CREDS.key) { console.error('❌ 缺少腾讯云凭证'); process.exit(1); }

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
// Node 手写 zip（store 模式），强制权限位，不依赖系统 zip / git 文件权限。
// 关键：scf_bootstrap 必须 0755 且位于 zip 根，否则腾讯云 Web 函数 443。
function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function createZipFile(srcDir) {
  const files = ['index.js', 'loader.js', 'scf_bootstrap', 'version.txt', 'quality-gate.cjs', 'seed-pool-mode.cjs', 'validate-seedpool.cjs', 'ai-script-mode.cjs', 'ai-rewrite-mode.cjs', 'product-research.cjs', 'config/compliance-rules.json'];
  const localParts = [];
  const central = [];
  let offset = 0;
  for (const name of files) {
    let data = readFileSync(join(srcDir, name));
    // 统一 LF，避免 Windows CRLF 导致腾讯云校验丢弃
    data = Buffer.from(data.toString('utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
    const crc = crc32(data);
    const mode = (name === 'scf_bootstrap') ? 0o100755 : 0o100644;
    const nameBuf = Buffer.from(name, 'utf8');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8); // store, no compression
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    const localFull = Buffer.concat([local, nameBuf, data]);
    localParts.push(localFull);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0);
    cen.writeUInt16LE(20, 4);
    cen.writeUInt16LE(20, 6);
    cen.writeUInt16LE(0, 8);
    cen.writeUInt16LE(0, 10);
    cen.writeUInt16LE(0, 12);
    cen.writeUInt16LE(0, 14);
    cen.writeUInt32LE(crc, 16);
    cen.writeUInt32LE(data.length, 20);
    cen.writeUInt32LE(data.length, 24);
    cen.writeUInt16LE(nameBuf.length, 28);
    cen.writeUInt16LE(0, 30);
    cen.writeUInt16LE(0, 32);
    cen.writeUInt16LE(0, 34);
    cen.writeUInt16LE(0, 36);
    cen.writeUInt32LE((mode << 16) >>> 0, 38); // 权限位，>>>0 防 32 位有符号溢出
    cen.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([cen, nameBuf]));
    offset += localFull.length;
  }
  const zip = Buffer.concat([Buffer.concat(localParts), Buffer.concat(central), (() => {
    const end = Buffer.alloc(22);
    end.writeUInt32LE(0x06054b50, 0);
    end.writeUInt16LE(0, 4);
    end.writeUInt16LE(0, 6);
    end.writeUInt16LE(files.length, 8);
    end.writeUInt16LE(files.length, 10);
    end.writeUInt32LE(Buffer.concat(central).length, 12);
    end.writeUInt32LE(Buffer.concat(localParts).length, 16);
    end.writeUInt16LE(0, 20);
    return end;
  })()]);
  return zip.toString('base64');
}

async function main(){
  console.log(`🚀 仅更新代码: ${FUNC_NAME} @ ${CREDS.region} (target=${TARGET})`);
  // R4 护栏：非 CI 环境直连 prod 时醒目提示（不阻断——本地确实需要应急部署能力，但提醒确认）
  if (TARGET !== 'dev' && !process.env.GITHUB_ACTIONS) {
    console.log('⚠️  注意：本地直连生产函数 douyin-personalize。R4 原则「生产只认 CI」，请确认这是有意操作（--target dev 可指向 dev 函数）。');
  }
  if (!existsSync(join(SRC_DIR,'index.js'))) { console.error('❌ scf-personalize/index.js 不存在'); process.exit(1); }
  const zipB64 = createZipFile(SRC_DIR);
  console.log(`📦 打包完成 (${zipB64.length} chars)`);
  // 确认函数存在
  try { await callSCF('GetFunction', { FunctionName: FUNC_NAME }); }
  catch(e){ console.error('❌ 函数不存在或未授权:', e.message); process.exit(1); }
  console.log('🔄 UpdateFunctionCode（不动环境变量）...');
  const r = await callSCF('UpdateFunctionCode', { FunctionName: FUNC_NAME, Handler:'index.main_handler', ZipFile: zipB64 });
  console.log('✅ 代码部署完成:', r.Status || r.RequestId || 'ok');

  // ⚠️ 防复发硬保证（2026-08-07 复盘教训）：
  // 控制台/默认部署的函数超时是 3s，而 AI 网关首响 ~12s，会被平台超时掐断，
  // 表现为"函数能启动但 AI 调不通 / timed out after 3 seconds"。
  // 无论代码走控制台还是 API 部署，部署后强制把 Timeout 设为 180s。
  // 注：本凭证的 UpdateFunctionConfiguration 已证实能持久化（改 Description 生效），故这步确定落地。
  console.log('⏱  强制设置函数超时 Timeout=180s（防 AI 调用被 3s 默认超时掐断）...');
  try {
    await callSCF('UpdateFunctionConfiguration', { FunctionName: FUNC_NAME, Timeout: 180 });
    const cfg = await callSCF('GetFunctionConfiguration', { FunctionName: FUNC_NAME });
    console.log(`✅ Timeout 已生效: ${cfg.Timeout}s`);
  } catch (e) {
    console.error('⚠️  设置 Timeout 失败（不影响代码部署，但 AI 调用可能超时）:', e.message);
  }

  console.log('⏳ 等待云端生效（约 10-30s），之后请求即走新代码');
}
main().catch(e => { console.error('❌ 部署失败:', e.message); process.exit(1); });
