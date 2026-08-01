// push-scf-web.mjs — 推送 SCF Web 函数代码到 Gitee
// 同时推送 Event 函数代码到 Gitee
// v2026-07-21: 自动注入 BUNDLED_TIMESTAMP + 推 version.txt
// 这是新版本部署的核心——SCF 运行时每30s比对自身版本和 Gitee 版本，
// 发现不同则自动调用 SCF API 部署，无需等冷启动。
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.GITEE_TOKEN;
if (!TOKEN) { console.error('❌ 缺少 GITEE_TOKEN 环境变量（CI 请在仓库 Secrets 配置）'); process.exit(1); }
const USER = 'hbatz';
const REPO = 'sx-douyin-data';

async function pushToGitee(localPath, remotePath, contentOverride) {
  const content = contentOverride || readFileSync(localPath, 'utf-8');
  const apiUrl = `https://gitee.com/api/v5/repos/${USER}/${REPO}/contents/${encodeURIComponent(remotePath)}`;
  const b64 = Buffer.from(content, 'utf-8').toString('base64');

  let sha = null;
  try {
    const getRes = await fetch(apiUrl + '?ref=master', {
      headers: { 'Authorization': `token ${TOKEN}` }
    });
    if (getRes.ok) {
      const info = await getRes.json();
      sha = info.sha;
      console.log(`   SHA: ${sha.slice(0,7)}`);
    } else if (getRes.status === 404) {
      console.log('   NEW');
    }
  } catch(e) {}

  const body = {
    access_token: TOKEN,
    content: b64,
    message: `deploy: ${remotePath}`,
    branch: 'master'
  };
  if (sha) body.sha = sha;
  // For new files, POST instead of PUT
  const method = sha ? 'PUT' : 'POST';

  const putRes = await fetch(apiUrl, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    console.error(`   FAIL: ${errText.slice(0, 200)}`);
    return false;
  }
  const result = await putRes.json();
  console.log(`   OK → ${result.commit?.sha?.slice(0,7) || 'done'}`);
  return true;
}

async function main() {
  console.log('=== 推送 SCF 代码到 Gitee ===\n');
  const TS = Date.now();

  // 1. Web 函数 — 注入 BUNDLED_TS 时间戳后推送
  console.log('[1/2] Web 函数 scf-personalize/index.js (BUNDLED_TS=' + TS + ')');
  const rawCode = readFileSync(join(__dirname, 'scf-personalize', 'index.js'), 'utf-8');
  // 将 const BUNDLED_TS = 0 替换为当前时间戳
  const injectedCode = rawCode.replace(
    /const BUNDLED_TS = \d+/,
    'const BUNDLED_TS = ' + TS
  );
  await pushToGitee(
    join(__dirname, 'scf-personalize', 'index.js'),
    'scf-personalize/index.js',
    injectedCode
  );

  // 2. 推送 version.txt（SCF 运行时读取此文件比对版本）
  console.log('[2/3] Version file version.txt');
  await pushToGitee(
    null, // no local file
    'scf-personalize/version.txt',
    String(TS)
  );

  // 3. Event 函数
  console.log('[3/3] Event 函数 scf-event/index.js');
  await pushToGitee(
    join(__dirname, 'scf', 'index.js'),
    'scf-event/index.js'
  );

  console.log('\n=== 完成 ===');
  console.log('SCF 函数将在下次请求时自动检测版本变化并自部署');
  console.log('无需冷启动等待');
  console.log('如需手动触发冷启动，可等待此函数空闲5-15分钟');
}

main().catch(e => {
  console.error(`\nFAIL: ${e.message}`);
  process.exit(1);
});
