/**
 * 抖本内容工坊 3.0 · 合规规则（自动生成，勿手改）
 * 由 scripts/sync-compliance.cjs 从 config/compliance-rules.json 生成（N-3 单一事实源）。
 * 修改规则 → 编辑 config/compliance-rules.json → 运行 `node scripts/sync-compliance.cjs`。
 * UMD：浏览器挂 window.___COMPLIANCE_RULES，Node 走 module.exports。
 */
(function (root) {
  var RULES = {
  "_comment": "抖本内容工坊 3.0 · 合规规则唯一事实源（N-3 / v3.0-完整方案.md §2.4 Phase 0a）。新增/修订规则只改本文件，然后运行 `node scripts/sync-compliance.cjs` 重新生成 src/v3/compliance-rules.js；CI 门禁校验两处一致。severity: block=硬拦(红线) / auto_fix=可自动替换(广告法) / warn=标记提示",
  "version": 2,
  "tiers": {
    "valid": [
      "300M",
      "500M",
      "1000M",
      "FTTR",
      "融合套餐"
    ],
    "validMentions": [
      "300M",
      "300兆",
      "500M",
      "500兆",
      "1000M",
      "1000兆",
      "千兆",
      "FTTR",
      "融合套餐"
    ],
    "badTierPattern": "100\\s?[Mm兆]"
  },
  "adWords": {
    "block": [
      "唯一",
      "独家",
      "首创",
      "顶级",
      "极品",
      "至尊",
      "王牌",
      "冠军",
      "百分百",
      "100%",
      "绝对",
      "保证",
      "担保",
      "肯定没问题",
      "永不",
      "永久",
      "绝版",
      "最后一天",
      "史上最低",
      "免费送",
      "免费领",
      "私信我"
    ],
    "auto_fix": [
      "最好",
      "最大",
      "最全",
      "最佳",
      "最低",
      "最高",
      "最先",
      "最新",
      "最便宜"
    ],
    "zuiPattern": "最(?:省|值|合适|靠谱|强|优|劣)",
    "firstOrdinalPattern": "第一(?!步|名|位|顺|时间|次|回|反应|件事|现场|关|站|个|晚|刀|种|条|，|、|：|天|年|月|周|季|档|台|家|场|局|篇|轮|排|把|号|届|版|代|查|看|问|道|类|项|款|记|做|要|别|先)"
  },
  "stance": {
    "block": [
      "别?(急着)?骂运营商",
      "骂运营商",
      "怪运营商",
      "(白)?送钱给运营商",
      "给运营商(白)?送钱",
      "运营商白送钱",
      "电信更坑人",
      "不要相信运营商",
      "运营商都是坑",
      "运营商坑人"
    ]
  },
  "forbidden": {
    "block": [
      "别给运营商白送钱",
      "给运营商白送钱",
      "给运营商送钱",
      "运营商白送钱",
      "白给运营商送钱",
      "别急着骂运营商",
      "别骂运营商",
      "骂运营商",
      "别怪运营商",
      "怪运营商",
      "电信更坑人",
      "不要相信运营商",
      "运营商都是坑",
      "运营商坑人"
    ]
  }
};
  root.___COMPLIANCE_RULES = RULES;
  if (typeof module === 'object' && module.exports) module.exports = RULES;
})(typeof self !== 'undefined' ? self : this);
