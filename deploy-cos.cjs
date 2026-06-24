// deploy-cos.js — 自动部署站点文件到腾讯云 COS
// 用法: node deploy-cos.js
// 环境变量: TC_SECRET_ID, TC_SECRET_KEY, COS_BUCKET, COS_REGION
// 首次部署后，每次改代码只需 run 这个脚本

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var SECRET_ID = process.env.TC_SECRET_ID || 'AKIDRoo2NcYXSDnEUZTAeCXijbHl2CTgiYJ2';
var SECRET_KEY = process.env.TC_SECRET_KEY || '';
var BUCKET = process.env.COS_BUCKET || 'sx-douyin-1253338744';
var REGION = process.env.COS_REGION || 'ap-guangzhou';
var HOST = BUCKET + '.cos.' + REGION + '.myqcloud.com';
var SRC = __dirname;

// COS 签名 (HMAC-SHA1)
function cosSign(method, objPath) {
  var now = Math.floor(Date.now() / 1000);
  var signTime = (now - 60) + ';' + (now + 900);
  var httpStr = method.toLowerCase() + '\n' + objPath + '\n\nhost=' + HOST.toLowerCase() + '\n';
  var sha1Http = crypto.createHash('sha1').update(httpStr).digest('hex');
  var strToSign = 'sha1\n' + signTime + '\n' + sha1Http + '\n';
  var signKey = crypto.createHmac('sha1', SECRET_KEY).update(signTime).digest('hex');
  var sig = crypto.createHmac('sha1', signKey).update(strToSign).digest('hex');
  return 'q-sign-algorithm=sha1&q-ak=' + SECRET_ID + '&q-sign-time=' + signTime + '&q-key-time=' + signTime + '&q-header-list=host&q-url-param-list=&q-signature=' + sig;
}

function mimeType(filename) {
  var map = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return map[path.extname(filename).toLowerCase()] || 'application/octet-stream';
}

async function uploadFile(key, filePath) {
  var data = fs.readFileSync(filePath);
  var res = await fetch('https://' + HOST + '/' + key, {
    method: 'PUT',
    headers: {
      'Host': HOST,
      'Authorization': cosSign('PUT', '/' + key),
      'Content-Type': mimeType(filePath),
      'x-cos-acl': 'public-read'
    },
    body: data
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return data.length;
}

async function main() {
  // Parse args
  var cmd = process.argv[2];
  if (cmd === '--setup') {
    console.log('\nCOS static site deployer');
    console.log('  Bucket: ' + BUCKET);
    console.log('  Region: ' + REGION);
    console.log('  Direct: https://' + BUCKET + '.cos.' + REGION + '.myqcloud.com/index.html');
    console.log('  Website: https://' + BUCKET + '.cos-website.' + REGION + '.myqcloud.com');
    console.log('');
    console.log('请在 COS 控制台完成:');
    console.log('  1. 基础配置 → 静态网站 → 开启 → 索引文档: index.html');
    console.log('  2. 权限管理 → 存储桶访问权限 → 公有读');
    return;
  }

  console.log('\n📦 部署到 COS: ' + BUCKET);

  if (!SECRET_KEY) {
    console.error('❌ 请设置 TC_SECRET_KEY 环境变量');
    process.exit(1);
  }

  var totalBytes = 0;
  var okCount = 0;

  // Root files
  var rootFiles = ['index.html', 'app.js', 'styles.css'];
  for (var i = 0; i < rootFiles.length; i++) {
    var f = rootFiles[i];
    var fp = path.join(SRC, f);
    if (!fs.existsSync(fp)) continue;
    try {
      var sz = await uploadFile(f, fp);
      console.log('  ✅ ' + f + ' (' + sz + ' bytes)');
      totalBytes += sz; okCount++;
    } catch(e) { console.log('  ❌ ' + f + ': ' + e.message); }
  }

  // data/ directory
  var dataDir = path.join(SRC, 'data');
  if (fs.existsSync(dataDir)) {
    var files = fs.readdirSync(dataDir);
    for (var j = 0; j < files.length; j++) {
      var fn = files[j];
      var fp = path.join(dataDir, fn);
      if (!fs.statSync(fp).isFile()) continue;
      var key = 'data/' + fn;
      try {
        var sz2 = await uploadFile(key, fp);
        console.log('  ✅ ' + key + ' (' + sz2 + ' bytes)');
        totalBytes += sz2; okCount++;
      } catch(e) { console.log('  ❌ ' + key + ': ' + e.message); }
    }
  }

  console.log('\n✅ 部署完成: ' + okCount + ' 文件, ' + totalBytes + ' bytes');
  console.log('🌐 https://' + BUCKET + '.cos-website.' + REGION + '.myqcloud.com');
}

main().catch(function(e) { console.error('❌ ' + e.message); process.exit(1); });
