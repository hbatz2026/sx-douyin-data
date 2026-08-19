// scripts/gitee-put.mjs — 把本地文件推送到 Gitee（供 Actions 写缓存）
// 用法: node scripts/gitee-put.mjs <repoPath> [localPath]
// 环境变量: GITEE_TOKEN
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const token = process.env.GITEE_TOKEN;
if (!token) { console.error('❌ GITEE_TOKEN 未设置'); process.exit(1); }

const repoPath = process.argv[2];
const localPath = process.argv[3] || join(__dirname, '..', repoPath);
const GITEE = 'https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/' + repoPath;

const content = readFileSync(localPath, 'utf-8');
const GITEE_HEADERS = { 'Authorization': 'token ' + token, 'User-Agent': 'Mozilla/5.0 (Actions)' };

// GET 拿 sha（不存在则 404 → sha=''，表示新建）
let sha = '';
try {
  const r = await fetch(GITEE + '?ref=master', { headers: GITEE_HEADERS });
  if (r.ok) { const d = await r.json(); sha = d.sha || ''; console.log('GET sha:', sha.slice(0, 8), '(文件已存在，将更新)'); }
  else if (r.status === 404) { console.log('文件不存在，将新建'); }
  else { console.warn('GET 非预期状态:', r.status); }
} catch (e) { console.warn('GET 异常:', e.message); }

const body = { access_token: token, content: Buffer.from(content, 'utf-8').toString('base64'), message: 'hotspot-cache: ' + repoPath + ' (' + new Date().toISOString().slice(0, 16) + ')' };
if (sha) body.sha = sha;

try {
  const r = await fetch(GITEE, { method: 'PUT', headers: { ...GITEE_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (r.ok) { console.log('✅ Gitee 已更新 ' + repoPath); process.exit(0); }
  console.error('❌ Gitee 写入失败', r.status, (await r.text()).slice(0, 200));
  process.exit(1);
} catch (e) {
  console.error('❌ Gitee 写入异常', e.message);
  process.exit(1);
}
