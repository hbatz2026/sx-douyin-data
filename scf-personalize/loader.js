// loader.js — SCF 自动更新入口
// 每次冷启动从 Gitee 拉最新代码，推送即部署，无需手动上传 zip

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.SCF_CUSTOM_CONTAINER_EVENT_PORT || 9000;
const TOKEN = process.env.GITEE_TOKEN;
const USER = process.env.GITEE_USERNAME || 'hbatz';
const REPO = 'sx-douyin-data';
const FILE_PATH = 'scf-personalize/index.js';
// 2026-08-06: 自部署开关。默认 false = GitHub-only 模式，冷启动只用 UpdateFunctionCode 打的 zip，不拉 Gitee；
// 设为 'true' 且 GITEE_TOKEN 存在时恢复从 Gitee 拉取（遗留/调试用）。
const SELF_DEPLOY = process.env.SELF_DEPLOY === 'true';

// Suppress uncaught errors during module load (the remote code will handle its own errors)
process.on('uncaughtException', function(e) {
  if (e.code === 'EADDRINUSE') return;
  console.error('[Loader] uncaught:', e.message);
});

(async function boot() {
  // 仅 SELF_DEPLOY 开启且持有 token 时，才从 Gitee 拉取远程代码（遗留/调试用）
  if (SELF_DEPLOY && TOKEN) {
    try {
      console.log('[Loader] Fetching latest from Gitee...');
      const res = await fetch(
        `https://gitee.com/api/v5/repos/${USER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}?ref=master`,
        { headers: { 'Authorization': `token ${TOKEN}` } }
      );
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (!data.content) throw new Error('No content');

      const code = Buffer.from(data.content, 'base64').toString('utf-8');
      const ver = (code.match(/部署: v=([^\n]+)/) || [])[1] || 'unknown';
      console.log(`[Loader] Remote version: ${ver} (${code.length} bytes)`);

      fs.writeFileSync('/tmp/latest.js', code);
      
      try {
        require('/tmp/latest.js');
        console.log('[Loader] Serving from remote code');
        return;
      } catch(modErr) {
        console.error(`[Loader] Remote code error: ${modErr.message}, fallback to bundled`);
      }
    } catch(e) {
      console.log(`[Loader] Fetch failed (${e.message}), using bundled code`);
    }
  } else {
    console.log(SELF_DEPLOY ? '[Loader] SELF_DEPLOY 开启但无 GITEE_TOKEN，使用 bundled 代码' : '[Loader] SELF_DEPLOY 关闭（GitHub-only 模式），使用 bundled 代码');
  }

  // Fallback: bundled code
  try {
    require('./index.js');
    console.log('[Loader] Serving from bundled code');
  } catch(e) {
    console.error('[Loader] Bundled code error:', e.message);
    // Start minimal fallback server
    http.createServer(function(req, res) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'SCF loading, please retry' }));
    }).listen(PORT, function() {
      console.log('[Loader] Fallback server on port', PORT);
    });
  }
})();
