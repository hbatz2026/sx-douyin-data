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

// Suppress uncaught errors during module load (the remote code will handle its own errors)
process.on('uncaughtException', function(e) {
  if (e.code === 'EADDRINUSE') return;
  console.error('[Loader] uncaught:', e.message);
});

(async function boot() {
  // Try remote code first
  if (TOKEN) {
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
    console.log('[Loader] No GITEE_TOKEN, using bundled code');
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
