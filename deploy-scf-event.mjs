// deploy-scf-event.mjs — 自动部署 SCF Event 函数 (douyin-update-hotspot)
// 用法: node deploy-scf-event.mjs
// 需要环境变量: TC_SECRET_ID, TC_SECRET_KEY
// 可选: TC_REGION (默认 ap-guangzhou)

import { createHash, createHmac } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'scf');
const FUNC_NAME = 'douyin-update-hotspot';
const FUNC_NS = 'default';

function getCreds() {
  const args = process.argv.slice(2);
  let id = ''; let key = ''; let region = 'ap-guangzhou';

  // Read shared config from tc-config.cjs
  try {
    const cfgPath = join(__dirname, 'tc-config.cjs');
    if (existsSync(cfgPath)) {
      const cfgContent = readFileSync(cfgPath, 'utf-8');
      const idMatch = cfgContent.match(/TC_SECRET_ID:\s*['"]([^'"]+)['"]/);
      const keyMatch = cfgContent.match(/TC_SECRET_KEY:\s*['"]([^'"]+)['"]/);
      if (idMatch && keyMatch) {
        id = idMatch[1]; key = keyMatch[1];
      }
    }
  } catch(e) {}

  // Fallback to env
  id = id || process.env.TC_SECRET_ID || '';
  key = key || process.env.TC_SECRET_KEY || '';
  region = process.env.TC_REGION || 'ap-guangzhou';

  for (const a of args) {
    if (a.startsWith('--id=')) id = a.slice(5);
    else if (a.startsWith('--key=')) key = a.slice(6);
    else if (a.startsWith('--region=')) region = a.slice(9);
  }
  if (!id || !key) {
    console.error('❌ 需要腾讯云 API 凭证');
    console.error('   放入 tc-config.cjs 或设置环境变量 TC_SECRET_ID / TC_SECRET_KEY');
    process.exit(1);
  }
  return { id, key, region };
}

// ============================================================
// TC3-HMAC-SHA256 签名
// ============================================================

function sha256Hex(data) {
  return createHash('sha256').update(data).digest('hex');
}

function signTC3(secretKey, date, service, stringToSign) {
  const kDate = createHmac('sha256', `TC3${secretKey}`).update(date).digest();
  const kService = createHmac('sha256', kDate).update(service).digest();
  const kSigning = createHmac('sha256', kService).update('tc3_request').digest();
  return createHmac('sha256', kSigning).update(stringToSign).digest('hex');
}

async function callSCF(action, payload, creds) {
  const { id, key, region } = creds;
  const service = 'scf';
  const host = 'scf.tencentcloudapi.com';
  const version = '2018-04-16';
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const payloadStr = JSON.stringify(payload);
  const hashedPayload = sha256Hex(payloadStr);

  const canonicalRequest = [
    'POST', '/', '',
    'content-type:application/json\nhost:' + host + '\n',
    'content-type;host',
    hashedPayload
  ].join('\n');

  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = [
    'TC3-HMAC-SHA256', timestamp, credentialScope,
    sha256Hex(canonicalRequest)
  ].join('\n');

  const signature = signTC3(key, date, service, stringToSign);
  const authorization = `TC3-HMAC-SHA256 Credential=${id}/${credentialScope}, SignedHeaders=content-type;host, Signature=${signature}`;

  const res = await fetch(`https://${host}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Host': host,
      'X-TC-Action': action,
      'X-TC-Version': version,
      'X-TC-Timestamp': String(timestamp),
      'X-TC-Region': region,
      'Authorization': authorization
    },
    body: payloadStr
  });

  const json = await res.json();
  if (json.Response.Error) {
    throw new Error(`${json.Response.Error.Code}: ${json.Response.Error.Message}`);
  }
  return json.Response;
}

// ============================================================
// 创建 ZIP
// ============================================================

function createZipFile() {
  const tmpZip = join(tmpdir(), `scf-hotspot-${Date.now()}.zip`);

  if (!existsSync(join(SRC_DIR, 'index.js'))) {
    throw new Error(`源文件不存在: ${SRC_DIR}/index.js`);
  }

  const files = [];
  if (existsSync(join(SRC_DIR, 'index.js'))) files.push('index.js');
  if (existsSync(join(SRC_DIR, 'package.json'))) files.push('package.json');

  if (process.platform === 'win32') {
    const psCmd = `Compress-Archive -Path '${files.map(f => join(SRC_DIR, f)).join("','")}' -DestinationPath '${tmpZip}' -Force`;
    execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: 'pipe' });
  } else {
    // GitHub Actions (ubuntu) 无 PowerShell，用系统 zip 命令
    execSync(`cd "${SRC_DIR}" && zip -r - ${files.join(' ')} > "${tmpZip}"`, { stdio: 'pipe' });
  }
  console.log(`📦 打包完成: ${tmpZip} (${files.length} 个文件)`);
  return { path: tmpZip, files };
}

// ============================================================
// 部署 Event 函数
// ============================================================

async function deploy() {
  console.log('');
  console.log('═══ SCF Event 函数自动部署 ═══');
  console.log(`函数: ${FUNC_NAME}`);
  console.log('');

  const creds = getCreds();

  // Step 1: 打包
  const zip = createZipFile();
  const zipData = readFileSync(zip.path);
  const base64 = zipData.toString('base64');

  console.log(`ZIP 大小: ${(zipData.length / 1024).toFixed(0)}KB (base64: ${(base64.length / 1024).toFixed(0)}KB)`);

  // Step 2: 获取函数信息（确认存在）
  console.log('检查函数是否存在...');
  let funcExists = false;
  try {
    const info = await callSCF('GetFunction', { FunctionName: FUNC_NAME, Namespace: FUNC_NS }, creds);
    funcExists = true;
    console.log(`  函数存在: ${info.Qualifier || 'LATEST'}, 状态: ${info.Status}`);
  } catch (e) {
    if (e.message.includes('FunctionNotFound') || e.message.includes('ResourceNotFound')) {
      console.log('  函数不存在，将创建新函数');
    } else {
      throw e;
    }
  }

  // Step 3: 更新或创建函数
  if (funcExists) {
    console.log('更新函数代码...');
    await callSCF('UpdateFunctionCode', {
      FunctionName: FUNC_NAME,
      Namespace: FUNC_NS,
      Handler: 'index.main_handler',
      CodeSource: 'ZipFile',
      ZipFile: base64
    }, creds);
    console.log('✅ 函数代码已更新');

    // 同步把超时锁在 900s（SCF 上限），避免新题→脚本管线被 300s 超时杀掉 t4
    try {
      await callSCF('UpdateFunctionConfiguration', {
        FunctionName: FUNC_NAME,
        Namespace: FUNC_NS,
        Timeout: 900,
        MemorySize: 256
      }, creds);
      console.log('✅ 函数超时已锁定为 900s');
    } catch (e) {
      console.warn('⚠️ 超时配置更新失败（不影响代码部署）:', e.message);
    }
  } else {
    console.log('创建函数...');
    await callSCF('CreateFunction', {
      FunctionName: FUNC_NAME,
      Namespace: FUNC_NS,
      Runtime: 'Nodejs18.15',
      Handler: 'index.main_handler',
      Type: 'Event',
      MemorySize: 256,
      Timeout: 300,
      Code: { ZipFile: base64 },
      Description: '抖本内容工坊 · 热点/BGM/选题自动生成 (v4.4)',
      Environment: {
        Variables: [
          { Key: 'GITEE_TOKEN', Value: process.env.GITEE_TOKEN || '' },
          { Key: 'GITEE_USERNAME', Value: process.env.GITEE_USERNAME || 'hbatz' },
          { Key: 'SILICONFLOW_API_KEY', Value: process.env.SILICONFLOW_API_KEY || '' },
          { Key: 'GITHUB_TOKEN', Value: process.env.GITHUB_TOKEN || '' },
          { Key: 'GITHUB_USERNAME', Value: process.env.GITHUB_USERNAME || 'hbatz2026' }
        ]
      }
    }, creds);
    console.log('✅ 函数已创建！请手动配置 cron 触发器');
  }

  console.log('');
  console.log('═══ 部署完成 ═══');
  console.log('');
}

deploy().catch(err => {
  console.error('');
  console.error(`❌ 部署失败: ${err.message}`);
  console.error('');
  process.exit(1);
});
