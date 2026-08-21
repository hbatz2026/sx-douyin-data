// deploy.mjs — 一键部署（build + test + push）v2.8
// 用法:
//   node deploy.mjs           → 完整部署（含数据同步 + CDN 验证）
//   node deploy.mjs --quick   → 快速部署（跳过SCF zip + 跳过CDN验证）
//   node deploy.mjs --local   → 本地部署（跳过数据同步）
//   node deploy.mjs --full    → 完整部署 + SCF zip
import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LAB = __dirname;

const ARGS = process.argv.slice(2);
const FLAGS = { quick: ARGS.includes('--quick'), local: ARGS.includes('--local'), full: ARGS.includes('--full') };

console.log(`\n🚀 抖本工坊 · 部署${FLAGS.quick ? '（快速模式）' : FLAGS.local ? '（本地模式）' : ''}`);
const start = Date.now();

// ─── Step 0: 版本自增（保证 CDN 缓存击穿 + 部署可验证）───
console.log('  🏷 版本自增...');
try {
  const vPath = join(LAB, 'version.json');
  let v = existsSync(vPath) ? (JSON.parse(readFileSync(vPath, 'utf-8')).v || '2.9.2') : '2.9.2';
  const parts = v.split('.').map(Number);
  parts[2] = (parts[2] || 0) + 1;
  v = parts.join('.');
  writeFileSync(vPath, JSON.stringify({ v }, null, 2));
  const idxPath = join(LAB, 'index.html');
  let idx = readFileSync(idxPath, 'utf-8');
  // 时间戳穿透：给 ?v= 资源 URL 追加 &t=<时间戳>，每次部署 URL 都不同，
  // 强制 GitHub Pages CDN 边缘节点穿透，避免旧版缓存 1-2 分钟不刷新。
  const ts = Date.now();
  // P3 修复（2026-08-21）：整体重写缓存参数段，避免历史 &t= 累积（原来只匹配 ?v= 部分导致每次部署叠加一个 t=）
  idx = idx.replace(/\?v=[\d.]+(&t=\d+)*/g, '?v=' + v + '&t=' + ts).replace(/v[\d.]+\s*<\/span>/g, 'v' + v + '</span>');
  writeFileSync(idxPath, idx);
  console.log('    本地版本 → v' + v);
} catch (e) {
  console.error('    ⚠️ 版本自增失败（继续部署）:', e.message);
}

// ─── Step 1: 构建 ───
console.log('  [1/4] 构建...');
try {
  // 构建 app.js
  execSync(`node build-app.mjs`, { stdio: 'inherit', cwd: LAB, env: { ...process.env, SKIP_SCF_ZIP: FLAGS.quick || !FLAGS.full ? '1' : '0' } });
} catch (e) {
  console.error('❌ 构建失败');
  process.exit(1);
}

// build-app 里已经调用了 build-data-bundle.mjs（数据包合并）
// SCF zip 只在 --full 时生成

// ─── Step 2: 测试 ───
console.log('  [2/4] 全量测试...');
try {
  execSync(`node test-full.mjs`, { stdio: 'inherit', cwd: LAB });
} catch (e) {
  console.error('❌ 测试不通过，中止部署');
  process.exit(1);
}

// ── Step 2b: 同源 bug 守护（静态扫描 + 评分函数 vm 验证 + a11y/性能）──
console.log('  [2b/4] 同源 bug 守护（code-test）...');
try {
  execSync(`node tests/code-test.mjs`, { stdio: 'inherit', cwd: LAB });
} catch (e) {
  console.error('❌ 同源 bug 守护未通过（发现 HIGH 级缺陷），阻断部署');
  process.exit(1);
}

// ── Step 2c: 内容质量门禁(G6) + 3.0 池集成测试（部署前卡点）──
console.log('  [2c/4] 内容质量门禁 + 3.0 池集成...');
try {
  execSync(`node tests/quality-gate.test.mjs`, { stdio: 'inherit', cwd: LAB });
  execSync(`node tests/v3-pool.test.mjs`, { stdio: 'inherit', cwd: LAB });
} catch (e) {
  console.error('❌ 内容质量门禁/池集成未通过，阻断部署');
  process.exit(1);
}

// ─── Step 3: 部署 ───
console.log('  [3/4] 推送 GitHub...');
try {
  const extraEnv = {};
  if (FLAGS.quick) extraEnv.SKIP_CDN_CHECK = '1';
  if (FLAGS.local) extraEnv.SKIP_DATA_SYNC = '1';
  // 仅运行一次 deploy-https.mjs（此前误写两次，导致重复推送 + 双倍 API 调用）
  const output = execSync(`node deploy-https.mjs`, {
    stdio: 'pipe',
    cwd: join(__dirname, '..', 'douyin-cloud-auto'),
    env: { ...process.env, ...extraEnv }
  }).toString();
  output.split('\n').filter(l => l.includes('✅') || l.includes('📤') || l.includes('验证') || l.includes('⚠️') || l.includes('❌')).forEach(l => console.log('    ' + l.trim()));
} catch (e) {
  console.error('❌ 部署失败:', e.stderr?.toString().slice(0, 200) || e.message);
  process.exit(1);
}

// ─── Step 3b: 同步构建产物到 Gitee（让仓库快照与线上保持一致）───
if (!FLAGS.local) {
  console.log('  [3b/4] 同步 Gitee 源码快照...');
  try {
    const syncOutput = execSync('node scripts/sync-to-gitee.mjs', {
      stdio: 'pipe',
      cwd: LAB,
      env: { ...process.env, NODE_NO_WARNINGS: '1' }
    }).toString();
    syncOutput.split('\n').filter(l => l.includes('OK ') || l.includes('完成') || l.includes('FAIL')).forEach(l => console.log('    ' + l.trim()));
  } catch (e) {
    console.log('    ⚠️ Gitee 同步失败（前端已上线，可稍后单独重跑）:', e.stderr?.toString().slice(0, 100) || e.message);
  }
}

// ─── Step 4: SCF 自动部署（仅 --full 模式） ───
if (FLAGS.full) {
  console.log('  [4/4] SCF Event 自动部署...');
  try {
    execSync('node deploy-scf-event.mjs', { stdio: 'inherit', cwd: join(__dirname, '..', 'douyin-cloud-auto') });
  } catch (e) {
    console.error('❌ SCF 部署失败（前端已上线，稍后重试 SCF）');
  }
}

// ─── Step 5: 缓存穿透验证（每次部署后必跑，不等用户确认） ───
var stepVer = FLAGS.full ? '[5/5]' : '[4/4]';
console.log('  ' + stepVer + ' 部署验证...');
try {
  execSync('node verify-deploy.mjs', { stdio: 'inherit', cwd: __dirname, env: { ...process.env, NODE_NO_WARNINGS: '1' } });
} catch (e) {
  console.error('❌ 验证失败：部署可能未生效，请排查。');
}

// ─── 完成 ───

// ─── 完成 ───
const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n✅ 部署完成 ${elapsed}s → https://hbatz2026.github.io/sx-douyin-data`);
if (FLAGS.quick) console.log('  💡 快速模式：CDN 可能缓存旧版，1-2 分钟后自动刷新。');
