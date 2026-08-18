/**
 * 抖本内容工坊 3.0 · 人设/语气共享常量（N-5）
 * 前后端共用，禁止各自硬编码（v3.0-完整方案.md §2.3 / 8.5：「personas.js 共享常量文件」）。
 *
 * 契约：
 *  · 6 人设(warm/sister/sweet/tech/biz/pro/master/vibe/young) 是生成端"嗓音库"，永不出现在用户契约；
 *  · 前端只暴露 3 语气(affinity/professional/young)，映射关系在此一处定义；
 *  · TONE 模板(周备池拼装用) 也在此一处定义，pool.js 引用，不再本地硬编码。
 *
 * UMD：浏览器挂 window.V3Personas，Node 走 module.exports（核心3/池 均 require 本文件）。
 */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.V3Personas = api;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  // 3 语气（用户可见入口，UI 只暴露这三个）
  var MOODS = ['affinity', 'professional', 'young'];

  // 语气展示元数据（图标/BGM 基调）
  var MOOD_META = {
    affinity:    { label: '亲和', icon: '😊', bgm: '温馨轻快' },
    professional: { label: '专业', icon: '🎯', bgm: '沉稳专业' },
    young:       { label: '年轻', icon: '⚡', bgm: '动感' }
  };

  // 6 人设 → 3 语气（兼容 2.x sister/sweet/tech/biz/young/master 与原型 warm/vibe/pro 两套命名）
  var PERSONA_TO_MOOD = {
    warm: 'affinity', sister: 'affinity', sweet: 'affinity',
    tech: 'professional', biz: 'professional', pro: 'professional', master: 'professional',
    vibe: 'young', young: 'young'
  };

  // 语气模板：营业员视角，零攻击运营商表述（红线见 core3.scanStance）
  // pool.js makeSeed 按 mood 取本组模板现场拼装周备池口播稿
  var TONE = {
    affinity: [
      { p: 'warm',  f: function (t, pt) { return '最近好多街坊问我' + t + '。' + pt + ' 拿不准的直接来厅里，我帮你一条条对。'; } },
      { p: 'sweet', f: function (t, pt) { return '姐妹们问得最多的就是' + t + '～' + pt + ' 评论区留城市，我帮你看看哪档合适。'; } }
    ],
    professional: [
      { p: 'tech', f: function (t, pt) { return t + '，直接给判断依据：' + pt + ' 到厅可现场实测，数据说话。'; } },
      { p: 'biz',  f: function (t, pt) { return '关于' + t + '，给一个可执行口径：' + pt + ' 建议每季度复核一次，避免长期错配。'; } }
    ],
    young: [
      { p: 'vibe',  f: function (t, pt) { return '兄弟们，' + t + '别瞎选！' + pt + ' 冲之前先看这条，省下的都是自己的。'; } },
      { p: 'young', f: function (t, pt) { return t + '？三句话讲完：' + pt + ' 还有不懂的评论区喊我。'; } }
    ]
  };

  return { MOODS: MOODS, MOOD_META: MOOD_META, PERSONA_TO_MOOD: PERSONA_TO_MOOD, TONE: TONE };
});
