// 终端在库机型池（t3 机型推荐页数据源）
// 更新于 2026-07-31：依据营业厅库存截图（OCR）+ 官网 / ZOL 真实参数校对
// 规则（用户铁律）：
//   1) 全量替换——旧 18 款全部下线，仅保留本期在库机型
//   2) 品牌 / 机型名按真实型号纠错（HOROR→荣耀、Wova→Nova、Fura→Pura、Kovai→Nova）
//   3) 不含提货价(guidePrice)，以后也一律不写价格
//   4) 同基础型号合并为一条（颜色 / 容量收敛为数组，库存求和），只出现一次
// tier: 'flagship' 旗舰 | 'mid' 中端 | 'entry' 入门（用于脚本话术分级，替代原 price>X 判断）
window.___phonePool = [
  // ═══ 荣耀 HONOR ═══
  { brand:'荣耀', model:'600 Pro', code:'VKI-AN00', tier:'flagship',
    chip:'天玑8550 Elite', camera:'2亿主摄+5000万潜望长焦+1200万超广角微距', battery:'8000mAh',
    highlight:'2亿影像+8000mAh青海湖电池', isCore:true,
    colors:['幸运星'], storage:['16G+512G'], stock:2 },

  { brand:'荣耀', model:'600 超级版', code:'VKJ-AN00', tier:'mid',
    chip:'骁龙7 Gen4', camera:'2亿主摄+1200万', battery:'8600mAh',
    highlight:'3天超长续航·大电池', isCore:true,
    colors:['光羽蓝','青苹果','幸运星','曜石黑'], storage:['12G+256G'], stock:15 },

  { brand:'荣耀', model:'600 元气版', code:'WKJ-AN90', tier:'mid',
    chip:'骁龙7 Gen4', camera:'5000万主摄+1200万', battery:'7000mAh',
    highlight:'轻薄长续航·高性价比', isCore:true,
    colors:['好事橙','元气白'], storage:['12G+256G','12G+512G'], stock:10 },

  { brand:'荣耀', model:'畅玩80 Plus', code:'LAB-AN00', tier:'entry',
    chip:'第四代骁龙4', camera:'1300万主摄+500万前摄', battery:'7500mAh',
    highlight:'五星抗摔+7500mAh大电池', isCore:true,
    colors:['墨岩黑'], storage:['8G+256G'], stock:41 },

  // ═══ OPPO ═══
  { brand:'OPPO', model:'Find N6', code:'PLP110', tier:'flagship',
    chip:'骁龙8 Elite Gen5', camera:'200MP哈苏影像', battery:'6000mAh',
    highlight:'折叠屏·哈苏影像旗舰', isCore:true,
    colors:['深黑'], storage:['16G+512G'], stock:2 },

  { brand:'OPPO', model:'Find X9 Ultra', code:'PMA110', tier:'flagship',
    chip:'骁龙8 Elite Gen5', camera:'哈苏双2亿(2亿广角+2亿长焦)+5000万超广角+5000万超长焦', battery:'7050mAh',
    highlight:'双2亿哈苏·10倍光变', isCore:true,
    colors:['极地冰川'], storage:['16G+1T'], stock:2 },

  // ═══ 华为 HUAWEI ═══
  { brand:'华为', model:'Mate 70 Pro', code:'FLR-AL30', tier:'flagship',
    chip:'麒麟9020', camera:'5000万超聚光+4800万长焦', battery:'5500mAh',
    highlight:'商务旗舰·卫星通信', isCore:true,
    colors:['雪域白','云杉绿'], storage:['12G+512G'], stock:5 },

  { brand:'华为', model:'Mate 80', code:'VYG-AL30', tier:'flagship',
    chip:'麒麟9020', camera:'5000万主摄+1200万潜望', battery:'5750mAh',
    highlight:'旗舰性能·大电池', isCore:true,
    colors:['晨曦金'], storage:['16G+512G'], stock:2 },

  { brand:'华为', model:'Nova 16', code:'EMA-AL00', tier:'mid',
    chip:'麒麟9010S', camera:'2亿红枫影像', battery:'7000mAh',
    highlight:'2亿红枫影像·7000mAh巨鲸电池', isCore:true,
    colors:['幻彩贝母','晴空蓝','天际白','星空黑'], storage:['12G+256G','12G+512G'], stock:10 },

  { brand:'华为', model:'Nova 16 Ultra', code:'HIF-AL00', tier:'flagship',
    chip:'麒麟9010S', camera:'2亿红枫影像', battery:'7000mAh',
    highlight:'2亿红枫影像·7000mAh巨鲸电池', isCore:true,
    colors:['晴空蓝','星空黑'], storage:['12G+512G'], stock:5 },

  { brand:'华为', model:'Pura 90 Pro Max', code:'SCA-AL00', tier:'flagship',
    chip:'麒麟9030S', camera:'2亿长焦+XMAGE', battery:'6000mAh',
    highlight:'影像王者·北斗卫星', isCore:true,
    colors:['晨曦金','霞光紫'], storage:['12G+512G','16G+512G'], stock:2 },
];
