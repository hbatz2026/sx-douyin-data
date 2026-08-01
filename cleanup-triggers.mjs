// cleanup-triggers.mjs — 删除 douyin-update-hotspot 上的冗余定时器（幂等，可重复运行）
// 保留 daily-hotspot-warmup（每日 09:05 预热，驱动热点跟拍 + 精选 BGM 生成）
// 本地 tc-config.cjs 凭证对写操作是 no-op，本脚本由 CI（带 TC_SECRET_ID/KEY 环境变量）真正执行删除
import { createHash, createHmac } from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// CI 环境无本地 tc-config.cjs（未提交仓库），依赖环境变量 TC_SECRET_ID/KEY；本地有则读取
let cfg = {};
try { cfg = require('./tc-config.cjs'); } catch (e) { /* 回退环境变量 */ }
function sha256Hex(d){ return createHash('sha256').update(d).digest('hex'); }
function signTC3(secretKey, date, service, stringToSign){
  const kDate = createHmac('sha256', `TC3${secretKey}`).update(date).digest();
  const kService = createHmac('sha256', kDate).update(service).digest();
  const kSigning = createHmac('sha256', kService).update('tc3_request').digest();
  return createHmac('sha256', kSigning).update(stringToSign).digest('hex');
}
async function callSCF(action, payload){
  const id = process.env.TC_SECRET_ID || cfg.TC_SECRET_ID;
  const key = process.env.TC_SECRET_KEY || cfg.TC_SECRET_KEY;
  const region = process.env.TC_REGION || cfg.TC_REGION || 'ap-guangzhou';
  if (!id || !key) throw new Error('缺少腾讯云凭证');
  const service = 'scf', host = 'scf.tencentcloudapi.com', version = '2018-04-16';
  const timestamp = Math.floor(Date.now()/1000);
  const date = new Date(timestamp*1000).toISOString().slice(0,10);
  const payloadStr = JSON.stringify(payload);
  const hashedPayload = sha256Hex(payloadStr);
  const canonicalRequest = ['POST','/', '', 'content-type:application/json\nhost:'+host+'\n', 'content-type;host', hashedPayload].join('\n');
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = ['TC3-HMAC-SHA256', timestamp, credentialScope, sha256Hex(canonicalRequest)].join('\n');
  const signature = signTC3(key, date, service, stringToSign);
  const authorization = `TC3-HMAC-SHA256 Credential=${id}/${credentialScope}, SignedHeaders=content-type;host, Signature=${signature}`;
  const res = await fetch(`https://${host}`, { method:'POST', headers:{ 'Content-Type':'application/json','Host':host,'X-TC-Action':action,'X-TC-Version':version,'X-TC-Timestamp':String(timestamp),'X-TC-Region':region, Authorization:authorization }, body: payloadStr });
  const json = await res.json();
  if (json.Response.Error) throw new Error(`${json.Response.Error.Code}: ${json.Response.Error.Message}`);
  return json.Response;
}
const FUNC = 'douyin-update-hotspot';
const KEEP = new Set(['daily-hotspot-warmup']);
(async () => {
  console.log(`\n🧹 清理 ${FUNC} 冗余定时器（保留 ${[...KEEP]}）...`);
  // 先列全部，取每个触发器的真实 Type/Qualifier（关键：$DEFAULT 绑定的触发器删时必须带 Qualifier）
  const list = await callSCF('ListTriggers', { FunctionName: FUNC });
  const triggers = (list.Triggers || []).filter(t => !KEEP.has(t.TriggerName));
  for (const t of triggers) {
    const name = t.TriggerName;
    const type = t.Type || 'timer';
    const qualifier = t.Qualifier || '$LATEST';
    try {
      await callSCF('DeleteTrigger', { FunctionName: FUNC, TriggerName: name, Type: type, Qualifier: qualifier });
      console.log(`  ✅ 已删除: ${name} (Type=${type}, Qualifier=${qualifier})`);
    } catch (e) {
      if (/NotFound|ResourceNotFound|InvalidParameter|NoSuch/i.test(e.message)) {
        console.log(`  ⏭️ 不存在(已删/从未有): ${name}`);
      } else {
        console.log(`  ⚠️ 删除失败: ${name} -> ${e.message}`);
      }
    }
  }
  // 校验剩余（最终一致，可能延迟数秒，以 CI 日志 ✅ 为准、隔数分钟实读确认）
  try {
    const r = await callSCF('ListTriggers', { FunctionName: FUNC });
    const names = (r.Triggers||[]).map(t=>t.TriggerName);
    console.log(`  🔎 剩余触发器(${names.length}): ${names.join(', ')}`);
  } catch(e){ console.log('  ⚠️ 校验失败:', e.message); }
})();
