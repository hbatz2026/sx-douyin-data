// validate-seedpool.cjs — 3.0 SEED_POOL / 日预热池 结构契约校验器（纯 JS，无第三方依赖）
// 由 seed-pool-mode.cjs 在写回 data/v3-seedpool.js / data/dayPool.js 前调用，阻断畸形池落地。
// 也作为 CLI 供 CI 门禁使用：node validate-seedpool.cjs <file1.js> [<file2.js> ...]
'use strict';
const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(__dirname, '..', 'schemas', 'v3-seedpool.schema.json');
let SCHEMA = null;
function loadSchema() {
  if (SCHEMA) return SCHEMA;
  SCHEMA = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  return SCHEMA;
}

// ── 轻量 JSON Schema (draft-07 子集) 校验：required/type/enum/format/pattern/minLength/minItems/minimum/items/$ref ──
function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v; // object/string/number/integer/boolean
}
function matchesType(v, t) {
  if (t === 'integer') return typeof v === 'number' && Number.isInteger(v);
  if (t === 'number') return typeof v === 'number';
  if (t === 'array') return Array.isArray(v);
  if (t === 'object') return v !== null && !Array.isArray(v) && typeof v === 'object';
  return typeOf(v) === t;
}
function checkFormat(v, fmt) {
  if (fmt === 'date-time') return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v);
  return true;
}
function walk(schema, value, pointer, errors) {
  if (!schema || typeof schema !== 'object') return;
  // required
  if (Array.isArray(schema.required)) {
    for (const k of schema.required) {
      if (value === undefined || value === null || (typeof value === 'object' && !(k in value))) {
        errors.push(pointer + '/' + k + ': 缺少必填字段');
      }
    }
  }
  if (value === undefined || value === null) return;
  // type
  if (schema.type && !matchesType(value, schema.type)) {
    errors.push(pointer + ': 类型应为 ' + schema.type + '，实际 ' + typeOf(value));
    // 类型不符时不再深究，避免噪音
    return;
  }
  // enum
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(pointer + ': 值 ' + JSON.stringify(value) + ' 不在枚举 ' + JSON.stringify(schema.enum));
  }
  // format
  if (schema.format && !checkFormat(value, schema.format)) {
    errors.push(pointer + ': 格式不符 ' + schema.format + ' (' + JSON.stringify(value) + ')');
  }
  // pattern
  if (schema.pattern) {
    try { if (!new RegExp(schema.pattern).test(String(value))) errors.push(pointer + ': 不匹配正则 ' + schema.pattern); }
    catch (e) { /* 正则无效，跳过 */ }
  }
  // minLength
  if (typeof schema.minLength === 'number' && typeof value === 'string' && [...value].length < schema.minLength) {
    errors.push(pointer + ': 长度 ' + [...value].length + ' < 最小 ' + schema.minLength);
  }
  // minimum
  if (typeof schema.minimum === 'number' && typeof value === 'number' && value < schema.minimum) {
    errors.push(pointer + ': 值 ' + value + ' < 最小 ' + schema.minimum);
  }
  // array items
  if (Array.isArray(value)) {
    if (typeof schema.minItems === 'number' && value.length < schema.minItems) {
      errors.push(pointer + ': 数组长度 ' + value.length + ' < 最小 ' + schema.minItems);
    }
    if (schema.items && schema.items.$ref) {
      const def = resolveRef(schema.items.$ref);
      value.forEach((it, i) => walk(def, it, pointer + '[' + i + ']', errors));
    } else if (schema.items && typeof schema.items === 'object') {
      value.forEach((it, i) => walk(schema.items, it, pointer + '[' + i + ']', errors));
    }
  }
  // object properties / $ref
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    if (schema.$ref) { const def = resolveRef(schema.$ref); walk(def, value, pointer, errors); return; }
    const props = schema.properties || {};
    for (const k of Object.keys(props)) {
      if (k in value) walk(props[k], value[k], pointer + '/' + k, errors);
    }
  }
}
let _root = null;
function resolveRef(ref) {
  if (ref.startsWith('#/definitions/')) return (_root.definitions || {})[ref.slice('#/definitions/'.length)];
  return {};
}

function validateSeedPool(pool) {
  const schema = loadSchema();
  _root = schema;
  const errors = [];
  walk(schema, pool, '', errors);
  return { valid: errors.length === 0, errors };
}

// 从 data/v3-seedpool.js / data/dayPool.js 解析 window.___v3SeedPool / window.___dayPool
function parsePoolFromJs(code) {
  const m = code.match(/window\.(___v3SeedPool|___dayPool)\s*=\s*(\{[\s\S]*?\});?\s*$/);
  if (!m) throw new Error('未找到 window.___v3SeedPool / window.___dayPool 赋值');
  try { return JSON.parse(m[2]); }
  catch (e) { throw new Error('JSON 解析失败: ' + e.message); }
}

// CLI
if (require.main === module) {
  const files = process.argv.slice(2);
  if (files.length === 0) { console.error('用法: node validate-seedpool.cjs <file1.js> [file2.js ...]'); process.exit(2); }
  let allOk = true;
  for (const f of files) {
    try {
      const code = fs.readFileSync(f, 'utf8');
      const pool = parsePoolFromJs(code);
      const r = validateSeedPool(pool);
      if (r.valid) { console.log('✅ ' + f + ' 结构契约通过 (' + (pool.scripts || []).length + ' 条 seed)'); }
      else { allOk = false; console.error('❌ ' + f + ' 结构校验失败:\n  ' + r.errors.join('\n  ')); }
    } catch (e) { allOk = false; console.error('❌ ' + f + ': ' + e.message); }
  }
  process.exit(allOk ? 0 : 1);
}

module.exports = { validateSeedPool, parsePoolFromJs, loadSchema };
