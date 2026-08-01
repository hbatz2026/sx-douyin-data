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
const FUNC_NAME = 'douyin-personalize';

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
function createZipFile(srcDir){
  const tmpZip = join(tmpdir(), `scf-${Date.now()}.zip`);
  if (process.platform === 'win32') {
    const psCmd = `Compress-Archive -Path '${srcDir}\\*' -DestinationPath '${tmpZip}' -Force`;
    execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio:'pipe' });
  } else {
    // GitHub Actions (ubuntu) 无 PowerShell，用系统 zip 命令（store 完整目录到 zip 根）
    execSync(`cd "${srcDir}" && zip -r - . > "${tmpZip}"`, { stdio:'pipe' });
  }
  const data = readFileSync(tmpZip);
  try { unlinkSync(tmpZip); } catch(e){}
  return data.toString('base64');
}

async function main(){
  console.log(`🚀 仅更新代码: ${FUNC_NAME} @ ${CREDS.region}`);
  if (!existsSync(join(SRC_DIR,'index.js'))) { console.error('❌ scf-personalize/index.js 不存在'); process.exit(1); }
  const zipB64 = createZipFile(SRC_DIR);
  console.log(`📦 打包完成 (${zipB64.length} chars)`);
  // 确认函数存在
  try { await callSCF('GetFunction', { FunctionName: FUNC_NAME }); }
  catch(e){ console.error('❌ 函数不存在或未授权:', e.message); process.exit(1); }
  console.log('🔄 UpdateFunctionCode（不动环境变量）...');
  const r = await callSCF('UpdateFunctionCode', { FunctionName: FUNC_NAME, Handler:'index.main_handler', ZipFile: zipB64 });
  console.log('✅ 部署完成:', r.Status || r.RequestId || 'ok');
  console.log('⏳ 等待云端生效（约 10-30s），之后请求即走新代码');
}
main().catch(e => { console.error('❌ 部署失败:', e.message); process.exit(1); });
