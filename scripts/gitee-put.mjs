// scripts/gitee-put.mjs — 把本地文件推送到 Gitee（供 Actions 写缓存）
// 用法: node scripts/gitee-put.mjs <repoPath> [localPath]
// 环境变量: GITEE_TOKEN
// Gitee API 姿势：POST=创建新文件（无 sha），PUT=更新（需 sha）
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const token = process.env.GITEE_TOKEN;
if (!token) { console.error('❌ GITEE_TOKEN 未设置'); process.exit(1); }

const repoPath = process.argv[2];
const localPath = process.argv[3] || join(__dirname, '..', repoPath);
const GITEE = 'https://gitee.com/api/v5/repos/hbatz/sx-douyin-data/contents/' + repoPath;
const HEADERS = { 'Authorization': 'token ' + token, 'User-Agent': 'Mozilla/5.0 (Actions)' };

const content = readFileSync(localPath, 'utf-8');
const b64 = Buffer.from(content, 'utf-8').toString('base64');
const msg = 'hotspot-cache: ' + repoPath + ' (' + new Date().toISOString().slice(0, 16) + ')';

// GET 拿 sha：文件不存在时 Gitee 返回 200 + []（空数组）
let sha = '';
try {
  const r = await fetch(GITEE + '?ref=master', { headers: HEADERS });
  if (r.ok) {
    const d = await r.json();
    if (Array.isArray(d) && d.length === 0) { console.log('文件不存在，走 POST 创建'); }
    else if (d && d.sha) { sha = d.sha; console.log('文件已存在 sha=' + sha.slice(0, 8) + '，走 PUT 更新'); }
    else { console.log('GET 返回非预期:', JSON.stringify(d).slice(0, 80)); }
  } else if (r.status === 404) { console.log('文件不存在(404)，走 POST 创建'); }
  else { console.warn('GET 非预期状态:', r.status); }
} catch (e) { console.warn('GET 异常:', e.message); }

// 文件存在 → PUT 更新（需 sha）；不存在 → POST 创建
const url = GITEE + '?access_token=' + token;
try {
  const method = sha ? 'PUT' : 'POST';
  const body = { access_token: token, content: b64, message: msg, branch: 'master' };
  if (sha) body.sha = sha;
  const r = await fetch(GITEE, { method, headers: { ...HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (r.ok) { console.log('✅ Gitee ' + (method === 'PUT' ? '更新' : '创建') + ' ' + repoPath); process.exit(0); }
  console.error('❌ Gitee ' + method + ' 失败', r.status, (await r.text()).slice(0, 200));
  process.exit(1);
} catch (e) {
  console.error('❌ Gitee 写入异常', e.message);
  process.exit(1);
}
