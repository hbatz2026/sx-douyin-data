// 一次性修复：把 t4Presets.js 中历史遗留的「百兆宽带」归一到「300兆宽带」

const TOKEN = process.env.GITEE_TOKEN || '2bb7658fad09c69904a09dd61195ac6e';
const USER = 'hbatz';
const REPO = 'sx-douyin-data';
const FILE = 'data/t4Presets.js';

const apiUrl = `https://gitee.com/api/v5/repos/${USER}/${REPO}/contents/${encodeURIComponent(FILE)}`;

const getRes = await fetch(apiUrl + '?ref=master', { headers: { 'Authorization': `token ${TOKEN}` } });
if (!getRes.ok) { console.error('GET 失败', getRes.status); process.exit(1); }
const info = await getRes.json();
const raw = Buffer.from(info.content, 'base64').toString('utf-8');

const before = (raw.match(/百兆宽带|百兆/g) || []).length;
const fixed = raw.replace(/百兆宽带/g, '300兆宽带').replace(/百兆/g, '300兆');
const after = (fixed.match(/百兆宽带|百兆/g) || []).length;

if (before === 0) { console.log('无需修复，已无百兆违例'); process.exit(0); }

const putRes = await fetch(apiUrl, {
  method: 'PUT',
  headers: { 'Authorization': `token ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_token: TOKEN,
    content: Buffer.from(fixed, 'utf-8').toString('base64'),
    message: 'fix(红线): t4Presets 百兆宽带→300兆宽带',
    branch: 'master',
    sha: info.sha
  })
});
if (!putRes.ok) { console.error('PUT 失败', putRes.status, await putRes.text()); process.exit(1); }
console.log(`修复完成：命中 ${before} 处，剩余 ${after} 处（应为 0）`);
