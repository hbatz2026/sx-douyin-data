// _push_web_only.mjs — 仅推送 Web 函数到 Gitee（不动 Event），避免影响每日 08:05 跟拍
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.GITEE_TOKEN;
if (!TOKEN) { console.error('❌ 缺少 GITEE_TOKEN'); process.exit(1); }
const USER = 'hbatz';
const REPO = 'sx-douyin-data';

async function pushToGitee(localPath, remotePath, contentOverride) {
  const content = contentOverride || readFileSync(localPath, 'utf-8');
  const apiUrl = `https://gitee.com/api/v5/repos/${USER}/${REPO}/contents/${encodeURIComponent(remotePath)}`;
  const b64 = Buffer.from(content, 'utf-8').toString('base64');
  let sha = null;
  try {
    const getRes = await fetch(apiUrl + '?ref=master', { headers: { 'Authorization': `token ${TOKEN}` } });
    if (getRes.ok) { const info = await getRes.json(); sha = info.sha; console.log(`   SHA: ${sha.slice(0,7)}`); }
    else if (getRes.status === 404) console.log('   NEW');
  } catch (e) {}
  const body = { access_token: TOKEN, content: b64, message: `deploy: ${remotePath}`, branch: 'master' };
  if (sha) body.sha = sha;
  const method = sha ? 'PUT' : 'POST';
  const putRes = await fetch(apiUrl, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!putRes.ok) { const errText = await putRes.text(); console.error(`   FAIL: ${errText.slice(0, 200)}`); return false; }
  const result = await putRes.json();
  console.log(`   OK → ${result.commit?.sha?.slice(0,7) || 'done'}`);
  return true;
}

async function main() {
  console.log('=== 仅推送 Web 函数 scf-personalize 到 Gitee ===\n');
  const TS = Date.now();
  console.log('[1/2] scf-personalize/index.js (BUNDLED_TS=' + TS + ')');
  const rawCode = readFileSync(join(__dirname, 'scf-personalize', 'index.js'), 'utf-8');
  const injectedCode = rawCode.replace(/const BUNDLED_TS = \d+/, 'const BUNDLED_TS = ' + TS);
  await pushToGitee(join(__dirname, 'scf-personalize', 'index.js'), 'scf-personalize/index.js', injectedCode);
  console.log('[2/2] scf-personalize/version.txt');
  await pushToGitee(null, 'scf-personalize/version.txt', String(TS));
  console.log('\n=== 完成 ===\nWeb 函数将在 30s 内比对 version.txt 并自部署');
}
main().catch(e => { console.error(`\nFAIL: ${e.message}`); process.exit(1); });
