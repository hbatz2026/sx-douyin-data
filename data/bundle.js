// 抖本工坊 · 核心数据包（首页加载，不含人设脚本）
// 合并文件: bgmList.js, dailyScripts.js, hotspotData.js, phonePool.js, publish-kit.js, t1Comments.js, t1ImagePrompts.js, t1Presets.js, t1ScriptFull.js, t1ScriptStyles.js, t1Titles.js, t1TopicAliases.js, t2Presets.js, t2ScriptFull.js, t4Presets.js, t4ScriptFull.js, techDB.js, topicPool.js
// ===== bgmList.js =====
// Auto-generated BGM
// Updated: 2026-07-13 · Mode: AI-driven
window.___bgmList = {
  "决策指南": {
    "轻快对比": [
      "阳光开朗大男孩 - 卦者灵风",
      "小城夏天 - LBI利比",
      "New Boy - 房东的猫"
    ],
    "算账节奏": [
      "Counting Stars - OneRepublic",
      "Money - Lisa",
      "我在人民广场吃炸鸡 - 阿肆"
    ],
    "温馨推荐": [
      "萱草花 - 张小斐",
      "落在生命里的光 - 尹昔眠",
      "平凡的一天 - 毛不易"
    ]
  },
  "一线场景": {
    "温情叙事": [
      "如愿 - 王菲",
      "人世间 - 雷佳",
      "起风了 - 买辣椒也用券"
    ],
    "轻纪录片": [
      "China-X - 徐梦圆",
      "鸿雁 - 呼斯楞",
      "星辰大海 - 黄霄雲"
    ],
    "快节奏爽片": [
      "Star Unkind (Lanfranchi & Farina Remix) - 2Someone",
      "骁 - 井胧/井迪",
      "Wake - Hillsong Young & Free"
    ],
    "原声不加BGM": [
      "🔇 现场原声（推荐）"
    ]
  },
  "深度测评": {
    "科技感": [
      "Digital World - Amarante",
      "Technology - K391",
      "Cyberpunk - Max Brhon"
    ],
    "冷静专业": [
      "The Truth That You Leave - Pianoboy高至豪",
      "River Flows In You - Yiruma",
      "A Thousand Miles - Josh Vietti"
    ],
    "干货教学": [
      "Sunny Day - Ted Fresco",
      "Happy Up Here - Röyksopp",
      "Paper Planes - M.I.A."
    ]
  },
  "本地事件": {
    "探店活力": [
      "热爱105°C的你 - 阿肆",
      "Mojito - 周杰伦",
      "快乐崇拜 - 潘玮柏/张韶涵"
    ],
    "福利快闪": [
      "好运来 - 祖海",
      "卡路里 - 火箭少女101",
      "野狼disco - 宝石Gem"
    ],
    "温馨服务": [
      "世间美好与你环环相扣 - 柏松",
      "微微 - 傅如乔",
      "暖暖 - 梁静茹"
    ]
  },
  "直播": {
    "暖场": [
      "Summer - 久石让",
      "菊次郎的夏天 - 钢琴曲",
      "青空 - Candy_Wind"
    ],
    "逼单": [
      "Sold Out - Hawk Nelson",
      "HandClap - Fitz and The Tantrums",
      "Dance Monkey - Tones and I"
    ],
    "福利": [
      "你笑起来真好看 - 李昕融/樊桐舟/李凯稠",
      "小美满 - 周深",
      "听我说谢谢你 - 李昕融"
    ]
  }
};

// ===== dailyScripts.js =====
// 抖本工坊 · 每日脚本精选（v2.8 人设库联动版）
// 每周一排期确定后自动生成，每条脚本选取对应人设库中的完整版本
// 生成时间: 2026-07-25
// 说明: 数据格式模拟 SCF daily 模式，供本地测试
window.___dailyScripts = {
  "date": "2026-07-25",
  "weekday": "周五",
  "city": "太原",
  "isSummer": true,
  "todayHots": [
    "暑假过半各地旅游持续火爆",
    "多地发布暴雨蓝色预警",
    "华为新品发布会倒计时",
    "8月电信日5G套餐优惠预告",
    "暑期档票房破纪录",
    "以旧换新政策刺激消费",
    "智能家居普及率持续上升"
  ],
  "scripts": [
    {
      "type": "decision",
      "typeName": "口播脚本",
      "templateId": "template1",
      "topic": "宽带到期续费还是换",
      "variants": {
        "sister": { "title": "宽带到期了续费还是换？", "persona": "知心姐姐", "script": "三年以上的套餐换吧！同价位现在流量翻了一倍多了。比如你以前59块20G，现在59能办60G，月费不变流量翻三倍。带身份证来店里3分钟搞定不换号不换卡，免费的帮你查。" },
        "tech": { "title": "宽带到期续费vs换套餐：数据说话", "persona": "技术小哥", "script": "三年期套餐更新ROI对比：原地续费保持¥59/20G，换新套餐¥59/60G，性能提升200%。测算三年多付¥1080流量费。到厅3分钟免费检测，不换号不换卡当场生效。" }
      }
    },
    {
      "type": "scene",
      "typeName": "服务故事",
      "templateId": "template2",
      "topic": "上门维修",
      "variants": {
        "sister": { "title": "你家WiFi卡？先别急着升级套餐", "persona": "知心姐姐", "script": "上个月修了12户网，10户问题跟宽带没关系——全是路由器放错位置。塞在电视柜里、贴着微波炉，信号直接减半。拿出来放客厅中间满格了。你家路由器放哪的？拍张照发评论区我帮你看。" },
        "master": { "title": "干了二十年装维：先看位置再花钱", "persona": "老师傅", "script": "干了这么多年，上门维修十户有八户不是宽带问题。前几天去一户，路由器塞柜子里还挨着冰箱。拿出来放客厅当中满格。信我一句：先看路由器位置再花冤枉钱。来店里我免费帮你测。" }
      }
    },
    {
      "type": "review",
      "typeName": "产品测评",
      "templateId": "template3",
      "topic": "信号对比测试",
      "variants": {
        "young": { "title": "5G信号哪家强？实测对比给你看", "persona": "潮流小哥", "script": "兄弟们今天实测5G信号跑分——下载速度、刷抖音延迟、打王者卡不卡全给你测。结果很精彩！关注我明天直接发实测视频，比你看参数直观一百倍。" }
      }
    },
    {
      "type": "local",
      "typeName": "本地活动",
      "templateId": "template4",
      "topic": "免费WiFi体检",
      "variants": {
        "sister": { "title": "今天免费给你家WiFi做体检", "persona": "知心姐姐", "script": "带你家路由器来我免费帮你测信号强度、覆盖范围、有没有被邻居干扰。上次帮一个客户测客厅满格卧室一格——挪个位置全屋满格。今天免费的评论预约直接来。" },
        "tech": { "title": "全屋WiFi体检：免费检测三个核心指标", "persona": "技术小哥", "script": "今日免费全屋WiFi体检：信号强度测试/信道干扰分析/覆盖盲区检测。上月50户检测41户存在盲区，83%因路由器位置不当。优化后覆盖率从41%提升至88%。评论报名免费上门。" }
      }
    },
    {
      "type": "decision",
      "typeName": "口播脚本",
      "templateId": "template1",
      "topic": "智能家居需要多大带宽",
      "variants": {
        "tech": { "title": "装了智能家居要不要升级千兆？", "persona": "技术小哥", "script": "实话：50个智能设备100M完全够用。摄像头和灯泡走的是低功耗信号，不挤主通道。除非你家80个以上设备加全屋4K监控，否则不用上光纤。来店测一下你实际需要多少带宽，免费的。" }
      }
    },
    {
      "type": "scene",
      "typeName": "服务故事",
      "templateId": "template2",
      "topic": "校园迎新",
      "variants": {
        "sister": { "title": "新生办卡指南：别在路上被人骗了", "persona": "知心姐姐", "script": "新生们听我一句：来营业厅办校园套餐比外面便宜一半。校园59块40G+500分钟+宽带，外面同价位只有20G。带录取通知书来立即可用。评论说说你的专业和用网习惯我帮你参谋哪个套餐最合适。" }
      }
    },
    {
      "type": "local",
      "typeName": "本地活动",
      "templateId": "template4",
      "topic": "企业宽带义诊",
      "variants": {
        "biz": { "title": "公司网到下午就卡？免费的诊断", "persona": "商务精英", "script": "中小企业免费上门网络诊断：测延迟/丢包率/带宽利用率。上个月诊断15人公司——100M家用宽带撑不住→换企业专线效率提升120%。免费出书面报告不办业务也出。评论区报公司人数我安排工程师48h到。" }
      }
    }
  ]
};

// ===== hotspotData.js =====
// 抖本工坊 · 热点跟拍速览（手动更新 2026-07-25 14:00）
// 源：60s.viki.moe/v2/douyin 实时热搜 + AI改写
window.___hotspotData = [
  {
    "id": "hs_v28_1", "tier": 1, "title": "台风红霞最新路径——营业厅应急指南蹭热点",
    "heat": "1086万热度", "why": "全省关注的自然灾害话题，适合展示营业厅便民服务",
    "source": "https://www.douyin.com/search/台风红霞最新路径",
    "steps": [
      {"shot": "手机特写台风预警通知 + 营业厅背景", "sub": "字幕：台风天也要服务在线"},
      {"shot": "展示营业厅便民措施：免费充电/热水/WiFi/避雨", "sub": "字幕：山西各电信营业厅开放避雨休息"},
      {"shot": "展示家庭WiFi/宽带的重要性，台风天更需要稳定网络", "sub": "过渡到FTTR/千兆宽带推荐"},
      {"shot": "结束CTA：地址+到店福利", "sub": "字幕：📍山西电信营业厅 风雨无阻为您服务"}
    ],
    "bgm": "Windy Hill - 羽肿", "tags": "#台风红霞 #电信服务 #风雨无阻",
    "difficulty": 2, "needFace": true, "time": "8分钟"
  },
  {
    "id": "hs_v28_2", "tier": 1, "title": "携程被罚51亿——提醒用户保护个人信息，电信防诈骗指南",
    "heat": "1145万热度", "why": "全民关注数据安全，营业厅可做防诈骗服务宣传",
    "source": "https://www.douyin.com/search/携程被罚51.79亿元",
    "steps": [
      {"shot": "展示携程罚款新闻截图 + 吃惊表情", "sub": "字幕：信息泄露有多严重？"},
      {"shot": "用手机展示电信防骚扰拦截功能设置步骤", "sub": "教观众打开防骚扰"},
      {"shot": "营业厅免费防诈骗服务介绍（来电拦截/短信过滤）", "sub": "字幕：到店免费开通"},
      {"shot": "结束CTA：保护信息安全来营业厅", "sub": "字幕：📍山西电信营业厅 免费帮您设"}
    ],
    "bgm": "轻悬疑钢琴", "tags": "#数据安全 #防诈骗 #携程被罚",
    "difficulty": 2, "needFace": true, "time": "10分钟"
  },
  {
    "id": "hs_v28_3", "tier": 2, "title": "淄博博山菜香迷糊了——用「真香」梗推电信全家套餐",
    "heat": "804万热度", "why": "美食话题高互动，适合用「真香」反转植入业务",
    "source": "https://www.douyin.com/search/淄博博山菜真的香迷糊了",
    "steps": [
      {"shot": "模仿原视频BGM，端出「电信全家套餐」当菜", "sub": "字幕：这家套餐也香迷糊了"},
      {"shot": "分别介绍套餐内容：副卡+宽带+IPTV+流量", "sub": "像三道菜这样展示"},
      {"shot": "算账：人均月费vs单独办", "sub": "字幕：人均省30-50/月"},
      {"shot": "结束CTA：到店点「全家套餐」", "sub": "字幕：📍山西电信 全家一起更划算"}
    ],
    "bgm": "小城夏天 - LBI利比", "tags": "#真香 #全家套餐 #淄博博山菜",
    "difficulty": 1, "needFace": true, "time": "8分钟"
  },
  {
    "id": "hs_v28_4", "tier": 2, "title": "卡顿滤镜解锁故障画风——WiFi卡顿怎么办？电信帮你测",
    "heat": "766万热度", "why": "卡顿话题直接关联宽带/WiFi业务",
    "source": "https://www.douyin.com/search/卡顿滤镜解锁故障画风",
    "steps": [
      {"shot": "用卡顿滤镜拍营业厅，突然恢复清晰", "sub": "字幕：你家WiFi也这样卡？"},
      {"shot": "展示测速过程：卡顿→诊断→修复→满速", "sub": "路由器位置是关键"},
      {"shot": "对比前后网速数字（100M→300M实测）", "sub": "字幕：免费测速到店"},
      {"shot": "结束CTA：来店免费测", "sub": "字幕：📍山西电信 免费WiFi体检"}
    ],
    "bgm": "卡点电子", "tags": "#WiFi卡顿 #免费测速 #故障画风",
    "difficulty": 1, "needFace": false, "time": "6分钟"
  },
  {
    "id": "hs_v28_5", "tier": 3, "title": "暑期实现吃菌子自由——暑假流量包/学生套餐推荐",
    "heat": "767万热度", "why": "暑期+自由体热搜，暑期流量包旺季",
    "source": "https://www.douyin.com/search/在暑期实现吃菌子自由",
    "steps": [
      {"shot": "展示「吃菌子自由」VS「流量自由」对比", "sub": "字幕：这个暑假，流量也要自由"},
      {"shot": "介绍暑期流量包：低至15元/月，暑假专属", "sub": "字幕：学生党/旅游党/游戏党都适合"},
      {"shot": "展示套餐详情+办卡流程", "sub": "到店3分钟即可开通"},
      {"shot": "结束CTA", "sub": "字幕：📍山西电信营业厅 暑假流量不愁"}
    ],
    "bgm": "阳光开朗大男孩 - 卦者灵风", "tags": "#暑期流量 #学生套餐 #暑假自由",
    "difficulty": 0, "needFace": true, "time": "5分钟"
  },
  {
    "id": "hs_v28_6", "tier": 3, "title": "宋亚轩拍抖音就要胆子大——营业厅员工挑战拍同款",
    "heat": "765万热度", "why": "明星话题自带流量，适合员工出镜跟拍",
    "source": "https://www.douyin.com/search/宋亚轩 拍抖音就要胆子大",
    "steps": [
      {"shot": "模仿原视频动作，手里拿电信宣传单页", "sub": "字幕：拍抖音就要胆子大"},
      {"shot": "自信展示营业厅环境和业务", "sub": "用宋亚轩同款节奏介绍宽带套餐"},
      {"shot": "同事配合拍，轻松风趣", "sub": "表情夸张一点"},
      {"shot": "结束CTA", "sub": "字幕：📍山西电信 来了就不想走"}
    ],
    "bgm": "New Boy - 房东的猫", "tags": "#宋亚轩 #胆子大 #营业厅日常",
    "difficulty": 0, "needFace": true, "time": "5分钟"
  },
  {
    "id": "hs_v28_7", "tier": 1, "title": "中国破解海底盾构机世界难题——电信5G助力科技创新",
    "heat": "1112万热度", "why": "科技成就话题，适合讲5G/千兆的创新价值",
    "source": "https://www.douyin.com/search/中国破解海底盾构机世界难题",
    "steps": [
      {"shot": "播放原视频片段或截图 + 镜头转营业厅", "sub": "字幕：破纪录的不止盾构机"},
      {"shot": "展示电信千兆宽带测速（接近理论值）", "sub": "用数字说话：下行937Mbps"},
      {"shot": "强调中国技术+电信网络的双重突破", "sub": "字幕：中国速度，我们也有份"},
      {"shot": "结束CTA：5G/千兆体验", "sub": "字幕：📍山西电信营业厅 体验中国速度"}
    ],
    "bgm": "激昂电子管弦", "tags": "#盾构机 #中国速度 #千兆宽带 #5G",
    "difficulty": 2, "needFace": true, "time": "8分钟"
  }
];
// ===== phonePool.js =====
// Updated from terminal inventory + official specs search (2026-07-09)
// Source: OCR + WebSearch官网/ZOL/百科参数
// Total: 18 models (10 core)
// Fields: brand, model, code, specs, color, storage, stock, guidePrice, isCore
//          chip(芯片), camera(摄像头), battery(电池), highlight(一句话卖点)
window.___phonePool = [
  // ═══ 荣耀 HONOR ═══
  { brand:'荣耀', model:'500 Pro', code:'NEP-A00O', specs:'(海蓝机)(16G+1T)', color:'海蓝机', storage:'16G+1T', stock:8, guidePrice:4611, isCore:true,
    chip:'骁龙8 Elite', camera:'2亿主摄+OIS', battery:'8000mAh', highlight:'影像+性能均衡旗舰' },
  { brand:'荣耀', model:'600 超续航', code:'VXJ-AN00', specs:'(月光羽)(12G+256G)', color:'月光羽', storage:'12G+256G', stock:1, guidePrice:2861, isCore:true,
    chip:'骁龙7 Gen4', camera:'2亿主摄+OIS', battery:'8600mAh', highlight:'3天超长续航' },
  { brand:'荣耀', model:'600 超续航', code:'VXJ-AN00', specs:'(光羽蓝)(12G+512G)', color:'光羽蓝', storage:'12G+512G', stock:8, guidePrice:3208, isCore:true,
    chip:'骁龙7 Gen4', camera:'2亿主摄+OIS', battery:'8600mAh', highlight:'3天超长续航' },
  { brand:'荣耀', model:'600 超续航', code:'VXJ-AN00', specs:'(春苹果)(12G+256G)', color:'春苹果', storage:'12G+256G', stock:9, guidePrice:3208, isCore:false,
    chip:'骁龙7 Gen4', camera:'2亿主摄+OIS', battery:'8600mAh', highlight:'3天超长续航' },
  { brand:'荣耀', model:'600 超续航', code:'VXJ-AN00', specs:'(羊玉墨)(12G+512G)', color:'羊玉墨', storage:'12G+512G', stock:5, guidePrice:3260, isCore:false,
    chip:'骁龙7 Gen4', camera:'2亿主摄+OIS', battery:'8600mAh', highlight:'3天超长续航' },
  { brand:'荣耀', model:'畅玩60 Plus 星耀版', code:'LBA-AN00C', specs:'(曜岩黑)(8G+128G)', color:'曜岩黑', storage:'8G+128G', stock:23, guidePrice:1274, isCore:true,
    chip:'骁龙4 Gen2', camera:'5000万主摄', battery:'6000mAh', highlight:'五星抗摔+300%大音量' },

  // ═══ OPPO ═══
  { brand:'OPPO', model:'A5 Pro', code:'', specs:'(薄荷绿)(8G+256G)', color:'薄荷绿', storage:'8G+256G', stock:17, guidePrice:1877, isCore:false,
    chip:'天玑7300', camera:'5000万主摄', battery:'6000mAh', highlight:'360°防摔+猎手天线' },
  { brand:'OPPO', model:'A5 Pro', code:'', specs:'(雾月白)(8G+256G)', color:'雾月白', storage:'8G+256G', stock:23, guidePrice:1702, isCore:false,
    chip:'天玑7300', camera:'5000万主摄', battery:'6000mAh', highlight:'360°防摔+猎手天线' },
  { brand:'OPPO', model:'Find X9 Ultra', code:'PMMA10', specs:'(极光黑)(16G+1T)', color:'极光黑', storage:'16G+1T', stock:2, guidePrice:9965, isCore:true,
    chip:'骁龙8 Elite Gen5', camera:'哈苏双2亿+10倍光变', battery:'7050mAh', highlight:'影像天花板·哈苏10倍长焦' },

  // ═══ vivo ═══
  { brand:'vivo', model:'S60', code:'V2553IA', specs:'(晴云黑)(8G+512G)', color:'晴云黑', storage:'8G+512G', stock:16, guidePrice:1165, isCore:true,
    chip:'骁龙8s Gen3', camera:'5000万+3倍潜望长焦', battery:'7200mAh', highlight:'4K人像Live·拍人神器' },
  { brand:'vivo', model:'Y500s', code:'V2555A', specs:'(曜石黑)(8G+256G)', color:'曜石黑', storage:'8G+256G', stock:20, guidePrice:1156, isCore:false,
    chip:'骁龙4 Gen2', camera:'5000万主摄', battery:'7200mAh', highlight:'入门大电池·超长待机' },
  { brand:'vivo', model:'Y500s Pro', code:'V2501A', specs:'(浮光金)(8G+256G)', color:'浮光金', storage:'8G+256G', stock:14, guidePrice:1961, isCore:false,
    chip:'天玑7300', camera:'5000万主摄', battery:'8200mAh', highlight:'大电池+IP69防水' },
  { brand:'vivo', model:'Y600 Pro', code:'V2501A', specs:'(皓月黑)(12G+256G)', color:'皓月黑', storage:'12G+256G', stock:20, guidePrice:2471, isCore:false,
    chip:'天玑7300e', camera:'5000万主摄+超广角', battery:'6500mAh', highlight:'中端大屏·性价比之选' },

  // ═══ 华为 ═══
  { brand:'华为', model:'Mate 70 Pro', code:'PLU-AL30', specs:'(雅丹白)(12G+512G)', color:'雅丹白', storage:'12G+512G', stock:67, guidePrice:5038, isCore:true,
    chip:'麒麟9100', camera:'50MP超光变OIS+12MP潜望', battery:'5500mAh', highlight:'商务旗舰·卫星通信' },
  { brand:'华为', model:'Nova 16', code:'EMA-AL000', specs:'(曜天蓝)(12G+256G)', color:'曜天蓝', storage:'12G+256G', stock:4, guidePrice:2935, isCore:true,
    chip:'麒麟9010S', camera:'5000万主摄', battery:'7000mAh', highlight:'7000mAh巨鲸电池·鸿蒙AI加持' },
  { brand:'华为', model:'Nova 16 Ultra', code:'HIP-A100', specs:'(曜宇蓝)(12G+512G)', color:'曜宇蓝', storage:'12G+512G', stock:2, guidePrice:4360, isCore:true,
    chip:'麒麟9010S', camera:'2亿红枫影像', battery:'7000mAh', highlight:'2亿红枫影像·7000mAh巨鲸电池' },
  { brand:'华为', model:'Pura 90 Pro Max', code:'SCA-AL00', specs:'(墨韵金)(16G+512G)', color:'墨韵金', storage:'16G+512G', stock:1, guidePrice:6561, isCore:true,
    chip:'麒麟9030S', camera:'2亿长焦+XMAGE', battery:'6000mAh', highlight:'影像王者·北斗卫星' },

  // ═══ 苹果 ═══
  { brand:'苹果', model:'iPhone 17', code:'', specs:'(白瓷)(512GB)', color:'白瓷', storage:'512GB', stock:7, guidePrice:5750, isCore:true,
    chip:'A19', camera:'4800万主摄+超广角', battery:'约4000mAh', highlight:'A19芯片·iOS生态' },

  // ═══ 小米/红米 ═══
  { brand:'小米', model:'Redmi R70 5G', code:'26020RWIAC', specs:'(冰雪黑)(6G+128G)', color:'冰雪黑', storage:'6G+128G', stock:102, guidePrice:1155, isCore:true,
    chip:'紫光展锐T8300', camera:'5000万主摄', battery:'6000mAh', highlight:'百元5G·学生老人首选' },

  // ═══ 小天才 ═══
  { brand:'小天才', model:'Z6 Pro', code:'W2302AC', specs:'(天空蓝)', color:'天空蓝', storage:'', stock:5, guidePrice:859, isCore:true,
    chip:'—', camera:'双摄', battery:'40h续航', highlight:'儿童定位·防水防摔·上课禁用' },
];

// ===== publish-kit.js =====
// publish-kit.js — 发布套件（v2.6.11 · 可访问性+自动保存）
// 包含 buildPublishKit、getTemplateComments、AppState fallback
// 于 index.html 中在 app.js 之前加载

// AppState 轻量实现（如果 app.js 中已定义则复用，否则提供 fallback）
if (typeof AppState === 'undefined') {
  var AppState = (function() {
    var _s = {}, _p = 'dy_';
    return {
      get: function(k, fb) { try { var v = _s[k]; if (v !== undefined) return v; var r = localStorage.getItem(_p + k); if (r !== null) { _s[k] = JSON.parse(r); return _s[k]; } } catch(e) {} return fb; },
      set: function(k, v) { _s[k] = v; try { localStorage.setItem(_p + k, JSON.stringify(v)); } catch(e) {} }
    };
  })();
}

function buildPublishKit(tpl, city, topic) {
  var loc = city || '同城';
  var t = tpl;
  var scriptText = '';
  var bgmText = '';
  var bestTime = '';
  var previewEl = document.querySelector('[id^="preview"]:not([id*="calc"]):not([id*="walk"]):not([id*="mix"]):not([id*="countdown"]):not([id*="silent"]):not([id*="tell"]):not([id*="short"])');
  if (!previewEl) {
    var previews = document.querySelectorAll('[id^="preview"]');
    for (var i = 0; i < previews.length; i++) {
      if (previews[i].textContent && previews[i].textContent.length > 50) { previewEl = previews[i]; break; }
    }
  }
  if (previewEl) scriptText = previewEl.textContent.trim();
  if (scriptText.length > 500) scriptText = scriptText.slice(0, 500);

  // ═══ BGM 抓取：表单输入为真理源（与预览一致），DOM 降级兜底 ═══
  // 优先从表单元素直接读取（这是预览的数据源，100%一致）
  bgmText = readFieldVal(t + '_bgm');
  if (!bgmText) {
    // 降级1：从预览区 DOM 抓取
    bgmText = grabInfoTag(previewEl, '🎵 BGM:') || grabInfoTag(previewEl, '🎵 BGM：');
  }
  if (!bgmText) {
    // 降级2：通配 select[id$="_bgm"]
    var bgmEls = document.querySelectorAll('select[id$="_bgm"]');
    for (var i = 0; i < bgmEls.length; i++) { if (bgmEls[i].value) { bgmText = bgmEls[i].value; break; } }
  }
  if (!bgmText && scriptText) {
    // 降级3：从预览全文本正则
    var bgmMatch = scriptText.match(/(?:BGM|🎵|背景音乐)[：:]\s*(.+?)(?:\n|$)/);
    if (bgmMatch) bgmText = bgmMatch[1].trim();
  }
  // 去噪
  if (bgmText) bgmText = bgmText.replace(/[（(]音量[^)）]*[)）]?/g, '').replace(/[（(]推荐[)）]/g, '').trim();
  // 排除非法值（emoji/占位符）
  if (bgmText && /^[🔇🔈]/u.test(bgmText)) bgmText = '';

  // ═══ 标签抓取：表单输入为真理源，DOM 降级 ═══
  var tags = readFieldVal(t + '_tags');
  if (!tags) { tags = grabInfoTag(previewEl, '🏷 标签:') || grabInfoTag(previewEl, '🏷 标签：'); }
  if (!tags) { tags = buildTags(t, loc, topic, scriptText); }

  var poolIdx = { t1:0,t2:1,t3:2,t4:3 }[t] || 0;
  bestTime = getBestTime(poolIdx, city);
  // 2026-07-20: 用别名映射把 dropdown value 转成真实脚本键
  var topicKey = (window.___t1TopicAliases && t === 't1' && ___t1TopicAliases[topic]) || topic;
  var comments = null;
  try { comments = AppState.get('ai_comments_' + t, null); } catch(e) {}
  if (!comments || comments.length < 3) {
    var curatedComments = null;
    if (t === 't1' && window.___t1Comments) curatedComments = window.___t1Comments[topicKey] || ___t1Comments[topic];
    if (t === 't2' && window.___t2Comments) curatedComments = window.___t2Comments[topicKey] || ___t2Comments[topic];
    if (t === 't4' && window.___t4Comments) curatedComments = window.___t4Comments[topicKey] || ___t4Comments[topic];
    if (curatedComments && curatedComments.length >= 3) {
      comments = curatedComments;
    } else {
      comments = getTemplateComments(t, city, topicKey, scriptText);
    }
  }
  var seoTitle = buildSeoTitle(t, loc, topic, scriptText);
  var storeName = loc; // 只取地市名，不带营业厅名称
  // 如果 loc 仍是占位符，尝试从表单读取
  if (!loc || loc === '本地' || loc === '同城') {
    var cityFromField = readFieldVal(t + '_city');
    if (cityFromField) storeName = cityFromField;
  }
  var hasAI = (function(){try{var cc=AppState.get('ai_comments_'+t,null);return cc&&cc.length>=3}catch(e){return false}})();

  var html = '<div class="publish-kit" style="margin-top:16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">';

  // ── 头部信息条 ──
  html += '<div style="padding:14px 18px;background:linear-gradient(135deg,#F0F7FF,#FFF);border-bottom:1px solid #E8F0FE;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px;color:#64748B;">';
  html += '<span style="font-weight:700;color:#0052CC;font-size:13px;">📋 发布准备</span>';
  html += '<span style="background:#fff;border:1px solid #BFDBFE;border-radius:12px;padding:2px 8px;font-size:11px;color:#1E40AF;">⏱ ' + (scriptText ? Math.ceil(scriptText.length/4) + '秒' : '约25秒') + '</span>';
  if (bgmText) html += '<span style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:2px 8px;font-size:11px;color:#475569;">🎵 ' + esc(bgmText.slice(0,16)) + '</span>';
  html += '<span style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:2px 8px;font-size:11px;color:#475569;">⏰ ' + bestTime + '</span>';
  html += '</div>';

  // ── 一键复制按钮（最显眼位置）──
  html += '<div style="padding:16px 18px 8px;">';
  html += '<button onclick="copyPublishBundle()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1D9E75,#0EA968);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 6px rgba(29,158,117,0.25);">📋 一键复制发布包（脚本+标题+标签+评论）</button>';
  html += '</div>';

  // ── 标签行 ──
  html += '<div style="padding:10px 18px;border-top:1px dashed #E8F0FE;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">🏷 标签</span>';
  html += '<span style="flex:1;color:#1E293B;line-height:1.5;">' + esc(tags) + '</span>';
  html += '<span onclick="copySiblingText(this)" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
  html += '</div>';

  // ── 标题行 ──
  html += '<div style="padding:10px 18px;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">📌 标题</span>';
  html += '<span style="flex:1;color:#1E293B;line-height:1.5;">' + esc(seoTitle) + '</span>';
  html += '<span onclick="copySiblingText(this)" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
  html += '</div>';

  // ── 位置行 ──
  html += '<div style="padding:10px 18px;border-top:1px dashed #E8F0FE;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">📍 位置</span>';
  html += '<span style="flex:1;color:#1E293B;">' + esc(storeName) + '</span>';
  html += '</div>';

  // ── 评论区 ──
  html += '<div style="padding:14px 18px 8px;border-top:1px dashed #E8F0FE;">';
  html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
  html += '<span style="font-weight:700;color:#0052CC;font-size:13px;">💬 ' + (hasAI ? 'AI 智能评论' : '评论区准备') + '</span>';
  html += '<button onclick="triggerCommentOptimize(\'' + t + '\',this)" style="font-size:11px;background:linear-gradient(135deg,#E0F2FE,#DBEAFE);border:1px solid #93C5FD;color:#0052CC;border-radius:14px;padding:2px 10px;cursor:pointer;font-weight:500;">🔄 换一批</button>';
  html += '<button onclick="triggerCommentAI(\'' + t + '\',this)" style="font-size:11px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);border:1px solid #F59E0B;color:#92400E;border-radius:14px;padding:2px 10px;cursor:pointer;font-weight:500;">🤖 AI 生成</button>';
  html += '</div>';
  html += '<div class="comment-list" style="display:flex;flex-direction:column;gap:6px;">';
  for (var c = 0; c < comments.length; c++) {
    html += '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F8FAFC;border-radius:8px;border-left:3px solid #93C5FD;">';
    html += '<span style="background:#0052CC;color:#fff;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + (c+1) + '</span>';
    html += '<span style="flex:1;line-height:1.5;color:#1E293B;font-size:12px;">' + esc(comments[c]) + '</span>';
    html += '<span onclick="copySiblingText(this)" style="cursor:pointer;background:#fff;border:1px solid #93C5FD;color:#0052CC;padding:1px 8px;font-size:10px;border-radius:4px;flex-shrink:0;">复制</span>';
    html += '</div>';
  }
  html += '</div></div>';

  // ── T1 AI 配图提示词（仅 T1 显示）──
  if (t === 't1' && window.___t1ImagePrompts) {
    var imgKey = topicKey || topic;
    var imgPrompt = ___t1ImagePrompts[imgKey] || findScriptFuzzy(window.___t1ImagePrompts, imgKey) || ___t1ImagePrompts[topic];
    if (imgPrompt) {
      html += '<div style="padding:14px 18px 18px;border-top:1px dashed #E8F0FE;">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
      html += '<span style="font-weight:700;color:#7C3AED;font-size:13px;">🎨 AI 配图提示词</span>';
      html += '<span style="font-size:10px;color:#94A3B8;">豆包/即梦 → 生成抖音封面</span>';
      html += '<span onclick="copyImgPrompt(this)" style="cursor:pointer;background:linear-gradient(135deg,#7C3AED,#A855F7);color:#fff;border:0;padding:4px 14px;font-size:11px;border-radius:6px;font-weight:600;margin-left:auto;">📋 复制</span>';
      html += '</div>';
      html += '<div style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:8px;padding:10px 12px;font-size:11px;line-height:1.6;color:#4C1D95;white-space:pre-wrap;cursor:text;">' + esc(imgPrompt) + '</div>';
      html += '</div>';
    }
  }

  html += '</div>';  // 关闭 publish-kit
  return html;
}

// 2026-07-20: 评论区"换一批"按钮 — 本地精选评论
function triggerCommentOptimize(t, btn) {
  if (!btn) return;
  btn.disabled = true;
  var orig = btn.innerHTML;
  btn.innerHTML = '⏳ 换一批中...';
  setTimeout(function() {
    try {
      var profile = JSON.parse(localStorage.getItem('douyin_lab_store') || '{}');
      var loc = profile.city || '同城';
      var topic = (document.getElementById(t + '_topic') || {}).value || '';
      var topicKey = (window.___t1TopicAliases && t === 't1' && ___t1TopicAliases[topic]) || topic;
      // 收集可用评论池
      var pool = [];
      if (t === 't1' && window.___t1Comments) pool = pool.concat(___t1Comments[topicKey] || ___t1Comments[topic] || []);
      if (t === 't2' && window.___t2Comments) pool = pool.concat(___t2Comments[topicKey] || ___t2Comments[topic] || []);
      if (t === 't4' && window.___t4Comments) pool = pool.concat(___t4Comments[topicKey] || ___t4Comments[topic] || []);
      // 优先精选评论，否则用 getTemplateComments，再否则给兜底
      var fresh;
      if (pool.length >= 3) {
        fresh = pool.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 3);
      } else {
        fresh = getTemplateComments(t, loc, topic, '');
      }
      // 直接 DOM 更新：找 .comment-list 替换其内部 HTML
      var commentList = document.querySelector('.publish-kit .comment-list');
      if (commentList && fresh && fresh.length) {
        commentList.innerHTML = renderCommentItems(fresh);
      }
      // 缓存最新评论
      try { AppState.set('ai_comments_' + t, fresh); } catch(e) {}
      toast('已换一批评论', 'success');
    } catch(e) {
      console.error('换一批评论失败:', e);
      toast('换一批失败：' + (e.message || '未知错误'), 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  }, 400);
}

// 渲染 3 条评论项 HTML
function renderCommentItems(comments) {
  var html = '';
  for (var c = 0; c < comments.length; c++) {
    html += '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F8FAFC;border-radius:8px;border-left:3px solid #93C5FD;">' +
      '<span style="background:#0052CC;color:#fff;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + (c+1) + '</span>' +
      '<span style="flex:1;line-height:1.5;color:#1E293B;font-size:12px;">' + esc(comments[c]) + '</span>' +
      '<span onclick="copySiblingText(this)" style="cursor:pointer;background:#fff;border:1px solid #93C5FD;color:#0052CC;padding:1px 8px;font-size:10px;border-radius:4px;flex-shrink:0;">复制</span>' +
      '</div>';
  }
  return html;
}

// 2026-07-20: AI 真实生成评论（调 SCF Web 函数）
async function triggerCommentAI(t, btn) {
  if (!btn) return;
  // 1) 配额检查
  if (typeof quotaRemaining === 'function' && quotaRemaining() <= 0) {
    toast('今日 AI 配额已用完，明天再来', 'error');
    return;
  }
  // 2) 取脚本 + 标题 + 标签
  var scriptEl = document.querySelector('[data-role="script-body"]');
  var scriptText = scriptEl ? scriptEl.textContent.replace(/^"|"$/g, '').replace(/^📖 主体：/, '').trim() : '';
  var title = (document.querySelector('.info-tag') || {}).textContent || '';
  if (!scriptText || scriptText.length < 20) {
    toast('请先预览脚本，再点 AI 生成评论', 'error');
    return;
  }
  // 3) UI 状态
  btn.disabled = true;
  var orig = btn.innerHTML;
  btn.innerHTML = '⏳ AI 生成中…';
  var commentList = document.querySelector('.publish-kit .comment-list');
  if (commentList) commentList.innerHTML = '<div style="padding:20px;text-align:center;color:#92400E;font-size:12px;">🤖 AI 正在生成匹配本条脚本的评论区引导（5-15秒）…</div>';
  try {
    var profile = JSON.parse(localStorage.getItem('douyin_lab_store') || '{}');
    var topic = (document.getElementById(t + '_topic') || {}).value || '';
    var persona = profile.persona || 'sister';
    // 调 SCF 评论生成
    var resp = await fetch((window.PERSONALIZE_API || '') + '/generate-comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: topic,
        script: scriptText.slice(0, 1500),
        title: title.slice(0, 100),
        persona: persona,
        store: profile.name || '',
        city: profile.city || ''
      })
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var data = await resp.json();
    var aiComments = (data && data.comments) || [];
    if (aiComments.length < 3) throw new Error('AI 返回评论不足 3 条');
    if (commentList) commentList.innerHTML = renderCommentItems(aiComments);
    // 扣配额
    if (typeof useDailyQuota === 'function') useDailyQuota();
    // 缓存标记 AI 模式
    try { AppState.set('ai_comments_' + t, aiComments); AppState.set('ai_comment_source_' + t, 'scf'); } catch(e) {}
    // 标题改成 AI 智能评论
    var headEl = commentList && commentList.previousElementSibling;
    if (headEl && headEl.querySelector('span')) {
      headEl.querySelector('span').innerHTML = '💬 AI 智能评论 <span style="font-size:10px;background:#F59E0B;color:#fff;border-radius:8px;padding:1px 6px;margin-left:4px;">SCF 真实生成</span>';
    }
    toast('AI 已生成 ' + aiComments.length + ' 条评论', 'success');
  } catch(e) {
    console.error('AI 评论生成失败:', e);
    toast('AI 失败：' + (e.message || '网络/服务异常'), 'error');
    // 回退到本地精选评论
    triggerCommentOptimize(t, btn);
  } finally {
    btn.disabled = false;
    btn.innerHTML = orig;
  }
}

// ════════════════════════════════════════
// 动态标签构建（基于脚本内容+选题）
// ════════════════════════════════════════

function buildTags(tpl, loc, topic, scriptText) {
  var ctx = (topic || '') + ' ' + (scriptText || '');
  var kws = extractTagKeywords(ctx);

  // 同城标签 = 抖音本地流量的核心入口
  var localTag = '#' + loc + '同城';
  if (loc === '本地' || loc === '同城' || !loc) localTag = '#同城';

  if (tpl === 't1') {
    if (/宽带|网速|WiFi|光纤|FTTR/i.test(ctx)) return '#' + loc + '宽带 #宽带对比 #' + loc + '同城 #电信';
    if (/手机|iPhone|荣耀|华为|OPPO|vivo|小米|换机|购机/i.test(ctx)) return '#' + loc + '购机 #手机推荐 #' + loc + '电信 #同城';
    return '#' + loc + (kws[0]||'电信') + ' #实测对比 #' + loc + '同城';
  }

  if (tpl === 't2') {
    // T2 故事类：主题标签 + 同城 + 电信品牌 + 生活类泛标签
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    if (kws[1] && kws[1] !== kws[0]) arr.push('#' + kws[1]);
    arr.push(localTag);
    arr.push('#中国电信');
    if (arr.length < 4) arr.push('#' + loc + '生活');
    return arr.join(' ');
  }

  if (tpl === 't3') {
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    if (kws[1] && kws[1] !== kws[0]) arr.push('#' + kws[1]);
    arr.push(localTag);
    arr.push('#真实体验');
    return arr.join(' ');
  }

  if (tpl === 't4') {
    var arr = [];
    if (kws[0]) arr.push('#' + kws[0]);
    arr.push(localTag);
    arr.push('#到店有礼');
    arr.push('#' + loc + '福利');
    return arr.join(' ');
  }

  return localTag + ' #' + loc + '电信 #同城';
}

/**
 * 从文本中提取适合做 hashtag 的关键词（2-6字）
 */
function extractTagKeywords(text) {
  if (!text) return [];
  // 业务关键词库（按匹配优先级排序）
  var candidates = [
    // T2 常见主题
    { kw: '防诈骗', re: /防骗|诈骗|骗局|防诈|反诈/i },
    { kw: '数字课堂', re: /数字课堂|智能手机教学|老人.*学|教.*手机/i },
    { kw: '暖心服务', re: /暖心|感动|耐心|特事特办|冒雨|上门服务/i },
    { kw: '政企服务', re: /政企|企业专线|专线|企业宽带|一站式|办公网络/i },
    { kw: '装机维修', re: /装机|修网|修光纤|上门修|网络不通|信号覆盖/i },
    { kw: '节日关怀', re: /节日|端午|中秋|春节|父亲节|母亲节|重阳|慰问/i },
    // T1 宽带/手机
    { kw: '宽带', re: /宽带|网速|光纤|FTTR|套餐|月费/i },
    { kw: '手机', re: /iPhone|荣耀|华为|OPPO|vivo|小米|nova|Mate|购机|换机/i },
    // T3 设备测评
    { kw: '测速', re: /测速|网速测试|跑分|带宽/i },
    { kw: '设备评测', re: /测评|评测|参数|续航|拍照|屏幕|芯片|处理器/i },
    // T4 活动
    { kw: '到店福利', re: /福利|优惠|免费领|礼品|特惠|限量|名额/i },
    { kw: '探店打卡', re: /探店|打卡|开业|新店|体验店|智慧厅/i },
  ];
  var found = [];
  for (var i = 0; i < candidates.length && found.length < 3; i++) {
    if (candidates[i].re.test(text)) found.push(candidates[i].kw);
  }
  // 兜底：从 topic 名提取
  if (found.length === 0 && text) {
    var topicMatch = text.match(/^(\S{2,8})\s/);
    if (topicMatch) found.push(topicMatch[1]);
  }
  return found;
}

// ════════════════════════════════════════
// 动态标题构建（基于脚本内容+选题）
// ════════════════════════════════════════

function buildSeoTitle(tpl, loc, topic, scriptText) {
  // 2026-07-20: 优先读取预设标题
  var curatedTitle = null;
  if (tpl === 't1' && window.___t1Titles) curatedTitle = window.___t1Titles[topic];
  if (tpl === 't2' && window.___t2Titles) curatedTitle = window.___t2Titles[topic];
  if (tpl === 't4' && window.___t4Titles) curatedTitle = window.___t4Titles[topic];
  if (curatedTitle) return loc + '：' + curatedTitle;

  var ctx = (topic || '') + ' ' + (scriptText || '');
  var shortTopic = (topic || '').slice(0, 12);
  var kw = extractTagKeywords(ctx)[0] || '';

  // 优先复用脚本预览中的黄金钩子做标题（抖音流量最佳实践）
  var hook = extractHookFromPreview();
  if (hook) return loc + '：' + hook.slice(0, 20);

  // ═══ Fallback：基于模板类型的SEO标题 ═══
  if (tpl === 't1') {
    if (/宽带|网速|WiFi|光纤/i.test(ctx)) return loc + '宽带怎么选？过来人告诉你真相';
    if (/手机|iPhone|荣耀|华为/i.test(ctx)) return loc + '买手机别踩坑，实测对比来了';
    return loc + (kw||'电信') + '怎么选？看完不花冤枉钱';
  }
  if (tpl === 't2') {
    if (/防骗|诈骗/i.test(ctx)) return loc + '又有人差点被骗！电信人紧急提醒';
    if (/暖心|感动|上门/i.test(ctx)) return loc + '一位' + loc + '电信师傅的真实一天';
    if (/装机|修网|网络/i.test(ctx)) return loc + '网络卡到崩溃？看电信师傅怎么修';
    if (/政企|企业|办公/i.test(ctx)) return loc + '企业网络怎么搭才稳？实测数据在这';
    return loc + '：' + (shortTopic || kw || '营业厅的故事');
  }
  if (tpl === 't3') {
    var devName = (topic || '').match(/^(\S{2,12})/);
    if (devName) return loc + (devName[1]) + '到底值不值？真实体验告诉你';
    return loc + (shortTopic || kw || '') + '到底值不值？';
  }
  if (tpl === 't4') {
    if (/福利|优惠|免费/i.test(ctx)) return loc + '人速看！这波电信福利别错过';
    if (/探店|打卡|新店/i.test(ctx)) return loc + '探店！' + loc + '这个电信营业厅有点不一样';
    return loc + '电信福利来了！' + (shortTopic || '到店有礼');
  }
  return loc + (kw || '电信') + '最新动态';
}

/**
 * 从预览区DOM提取黄金钩子台词（引号内的对话）
 * @returns {string} 钩子文本（最多20字），未找到返回空
 */
function extractHookFromPreview() {
  var dialogueEls = document.querySelectorAll('.dialogue');
  for (var i = 0; i < dialogueEls.length; i++) {
    var el = dialogueEls[i];
    // 只看可见元素的第一个 dialogue（钩子总是在开头）
    if (!el.offsetParent) continue;
    var text = (el.textContent || '').trim();
    // 提取引号中的文本
    var m = text.match(/"([^"]{5,})"/);
    if (m) return m[1].slice(0, 30);
  }
  return '';
}

/**
 * 安全读取表单字段值（按 ID）
 * @param {string} fieldId - 字段 DOM ID（如 "t2_bgm"）
 * @returns {string} 值或空字符串
 */
function readFieldVal(fieldId) {
  try {
    var el = document.getElementById(fieldId);
    if (el && el.value !== undefined) {
      var v = el.value.trim();
      return (v && v !== '-- 请选择 --' && v.indexOf('--') !== 0) ? v : '';
    }
  } catch(e) {}
  return '';
}

/**
 * 从预览区 DOM 中抓取 info-tag 标注的内容（BGM、标签等）
 * @param {Element} container - 预览区容器元素
 * @param {string} prefix - 标注前缀（如 "🎵 BGM:"）
 * @returns {string} 提取的内容或空字符串
 */
function grabInfoTag(container, prefix) {
  if (!container) return '';
  // 方案1：精确匹配 class="info-tag" 的元素
  var infoTags = container.querySelectorAll('.info-tag');
  for (var i = 0; i < infoTags.length; i++) {
    var t = infoTags[i].textContent.trim();
    if (t.indexOf(prefix) === 0) {
      return t.slice(prefix.length).trim().replace(/^[：:]\s*/, '');
    }
  }
  // 方案2：容器本身包含前缀（备降兜底）
  var ct = container.textContent || '';
  var idx = ct.indexOf(prefix);
  if (idx >= 0) {
    var rest = ct.slice(idx + prefix.length).replace(/^[：:]\s*/, '');
    var end = rest.indexOf('\n');
    return (end >= 0) ? rest.slice(0, end).trim() : rest.slice(0, 40).trim();
  }
  return '';
}

function getTemplateComments(tpl, city, topic, scriptText) {
  var loc = city || '同城';
  var t = tpl;
  // 合并选题和脚本文本用于关键词匹配（提高命中率）
  var ctx = (topic || '') + ' ' + (scriptText || '');

  // ═══ T2 一线场景（故事模板）——按主题匹配 ═══
  if (t === 't2') {
    if (/防骗|诈骗|骗局|被骗|假.*钱|冒充|中奖|退款|理财陷阱|养老骗局|保健品骗|投资骗/i.test(ctx)) {
      return [
        '你家里老人遇到过类似诈骗吗？评论区说说，提醒更多人',
        '这种骗术真的太常见了，转发给爸妈看，能帮一个是一个',
        '你们社区做过防骗宣传吗？来聊聊效果怎么样'
      ];
    }
    if (/数字课堂|教.*手机|教.*用|老年人.*智能|老人.*学|微信教学|智能手机|字大|看不清|不会操作/i.test(ctx)) {
      return [
        '你家老人学会用智能手机了吗？哪个功能教了最久？',
        '这种数字课堂你们社区有吗？评论区报个到，我看看有多少地方在做',
        '转发给爸妈，让他们知道营业厅能免费教这些'
      ];
    }
    if (/暖心|感动|帮忙|耐心|大爷|大妈|老人|阿姨|叔叔|冒雨|上门|特事特办/i.test(ctx)) {
      return [
        '这种服务态度真的难得，你们那营业厅怎么样？评论区聊聊',
        '你遇到过这么耐心的营业员吗？说出来表扬一下',
        '为'+loc+'电信点赞，这样的服务值得被更多人看到'
      ];
    }
    if (/装机|修网|WiFi|信号|覆盖|光纤|FTTR|上门.*修|网络不通|慢/i.test(ctx)) {
      return [
        '你家网速平时怎么样？有没有找师傅上门修过？',
        '装宽带的时候等了多久？师傅态度如何，聊聊',
        '觉得'+loc+'电信服务靠谱的点个赞，让更多人看到'
      ];
    }
    if (/节日|端午|中秋|春节|父亲节|母亲节|重阳|慰问|送礼|关怀/i.test(ctx)) {
      return [
        '这个节日你怎么陪家里人的？评论区晒晒',
        '你们社区有类似的节日活动吗？来分享一下',
        '转给家人看看，这份心意比什么都重要'
      ];
    }
    if (/政企|企业专线|企业宽带|云桌面|视频会议|办公网络|一站式|信息化|智慧办公/i.test(ctx)) {
      return [
        '你们公司用的什么网络方案？评论区聊聊，看谁家最快',
        '企业宽带贵不贵？来算笔账，别被代理商忽悠',
        'IT人进！你们公司网络有没有踩过坑？分享一下经验'
      ];
    }
    // T2 兜底：从上下文提取关键词嵌入
    var kw = extractKeyword(ctx, ['营业厅','服务','电信','师傅','老人','客户']);
    return [
      '这事搁你身上你会怎么处理？评论区聊聊' + (kw ? '，关于' + kw : ''),
      '你们遇到过类似情况吗？说出来让大家参考',
      '觉得这个' + (kw || '服务') + '靠谱点个赞，让更多' + loc + '人看到'
    ];
  }

  // ═══ T1 决策指南（口播对比）═══
  if (t === 't1') {
    if (/宽带|网速|WiFi|光纤|FTTR|套餐|月费|兆/i.test(ctx)) {
      return [
        loc + '的朋友，你家用的是哪家宽带？投个票，我帮你分析',
        '你家宽带一个月多少钱？评论区说说，我帮你看划不划算',
        '觉得这个对比有用的点个赞，选宽带不踩坑'
      ];
    }
    if (/手机|iPhone|荣耀|华为|OPPO|vivo|小米|换机|购机|nova|Mate|iQOO/i.test(ctx)) {
      return [
        '正在用的什么手机？评论区晒型号，聊聊使用体验',
        '你下一部手机打算买哪款？评论区做个小调查',
        '这个对比帮你省了研究时间，收藏一下慢慢看'
      ];
    }
    return [
      loc + '的朋友，你更倾向哪种？评论区投个票',
      '还有疑问直接问，我看到就回，帮你做决定',
      '觉得有用的转发给需要的朋友，别让他们瞎选'
    ];
  }

  // ═══ T3 深度测评（四选一/参数向）═══
  if (t === 't3') {
    var devKw = extractKeyword(ctx, ['手机','路由器','电视','平板','耳机','手表','设备']);
    if (/手机|iPhone|荣耀|华为|小米|OPPO|vivo|屏幕|拍照|续航|处理器|芯片/i.test(ctx)) {
      return [
        '这部' + (devKw || '手机') + '你用过吗？实际感受怎么样',
        '你最看重' + (devKw || '设备') + '哪个参数？评论区讨论下',
        '收藏一下，买之前回来对照着看，不花冤枉钱'
      ];
    }
    if (/宽带|网速|测速|WiFi|信号|延迟|光猫|路由/i.test(ctx)) {
      return [
        '你家宽带实际跑多少兆？评论区晒个测速图',
        'WiFi 哪个角落最弱？来聊聊你的户型和方案',
        '觉得测得准的点个赞，下期想测什么评论区告诉我'
      ];
    }
    return [
      (devKw || '这东西') + '你用过吗？真实体验评论区聊聊',
      '还有哪个参数想深入了解？下期可以安排',
      '买前收藏，买后回来对照，省得交智商税'
    ];
  }

  // ═══ T4 本地事件（福利/探店/活动）═══
  if (t === 't4') {
    if (/福利|优惠|送|免费|领|特惠|礼品|到店|进店|限量|名额/i.test(ctx)) {
      return [
        '就在' + loc + '，这周还有名额，评论区留「到店」我帮你留意',
        '已经有' + loc + '朋友领到了，真的划算，错过等下次',
        '转发给身边的' + loc + '朋友，一起来店里看看'
      ];
    }
    if (/探店|打卡|开业|新店|体验店|智慧厅/i.test(ctx)) {
      return [
        '你们去过这家店吗？环境和服务怎么样？',
        '这种体验店' + loc + '还有哪家？评论区推荐下',
        '@你想一起去的人，周末一起打卡'
      ];
    }
    return [
      loc + '的朋友注意了，这波别错过！评论区扣1我私信你详情',
      '已经有人去过了，真的不错，转发给朋友一起薅羊毛',
      '想知道更多福利？关注我，第一时间通知'
    ];
  }

  // ═══ 最终兜底 ═══
  var fk = extractKeyword(ctx, ['宽带','手机','电信','营业厅','福利','服务']);
  return [
    (fk ? fk + '相关：' : '') + loc + '的朋友，你们怎么看？评论区聊聊',
    '觉得有用的点个赞，让更多' + loc + '人看到',
    '有问题直接评论区问，我看到就回'
  ];
}

/**
 * 从文本中提取第一个匹配的关键词（用于评论个性化）
 * @param {string} text - 待匹配文本
 * @param {string[]} keywords - 关键词候选列表（按优先级排序）
 * @returns {string} 匹配到的关键词，或空字符串
 */
function extractKeyword(text, keywords) {
  if (!text) return '';
  for (var i = 0; i < keywords.length; i++) {
    if (text.indexOf(keywords[i]) !== -1) return keywords[i];
  }
  return '';
}

// 2026-07-22: 复制配图提示词（无需 inline 多行 onclick）
function copyImgPrompt(btn) {
  var textDiv = btn.parentElement && btn.parentElement.nextElementSibling;
  if (textDiv) {
    var txt = textDiv.textContent || textDiv.innerText || '';
    if (txt) copyText(txt);
  }
}

// 2026-07-23: 通用复制按钮——复制相邻 DOM 节点的文本
// 按钮和文本在同一行：<span>文本内容</span><span onclick="copySiblingText(this)">复制</span>
function copySiblingText(btn) {
  var textSpan = btn && btn.previousElementSibling;
  if (textSpan) {
    var txt = textSpan.textContent || textSpan.innerText || '';
    if (txt) copyText(txt);
  }
}

// 2026-07-23: 一键复制发布包——收集所有发布包内容合并复制
function copyPublishBundle() {
  var kit = document.querySelector('.publish-kit');
  if (!kit) { toast('找不到发布包内容', 'error'); return; }
  var parts = [];
  // 脚本部分（预览区域）
  var previewEl = document.querySelector('[id^="preview"]:not([id*="calc"]):not([id*="walk"])');
  if (previewEl && previewEl.textContent.trim().length > 20) {
    parts.push('【脚本】\n' + previewEl.textContent.trim());
  }
  // 遍历所有行，按标签文字提取内容
  var allDivs = kit.querySelectorAll('div');
  for (var i = 0; i < allDivs.length; i++) {
    var row = allDivs[i];
    var txt = row.textContent || '';
    if (txt.indexOf('🏷 标签') >= 0 && txt.indexOf('复制') >= 0) {
      parts.push('【标签】\n' + txt.replace('🏷 标签', '').replace('复制', '').trim());
    }
    if (txt.indexOf('📌 标题') >= 0 && txt.indexOf('复制') >= 0) {
      parts.push('【标题】\n' + txt.replace('📌 标题', '').replace('复制', '').trim());
    }
  }
  // 评论列表
  var commentList = kit.querySelector('.comment-list');
  if (commentList) {
    var commentTexts = [];
    var commentSpans = commentList.querySelectorAll('span:not([onclick])');
    for (var c = 0; c < commentSpans.length; c++) {
      var t = (commentSpans[c].textContent || '').trim();
      if (t && t.length > 2) commentTexts.push(t);
    }
    if (commentTexts.length) parts.push('【评论区】\n' + commentTexts.join('\n'));
  }
  var finalText = parts.join('\n\n');
  if (finalText) {
    copyText(finalText);
  } else {
    toast('发布包内容为空', 'error');
  }
}

// ===== t1Comments.js =====
// 抖本内容工坊 · 精选评论区引导词
// buildPublishKit 优先读此表，匹配不到走 getTemplateComments 兜底
// 更新：2026-07-20
window.___t1Comments = {
  "宽带选多少兆": [
    "你家几口人几台设备？评论区说说，我帮你算最划算的兆数",
    "刚办了100兆有点后悔，想升300兆怎么办？直接来营业厅改套餐就行",
    "楼下营业厅免费测速，报我名字优先安排"
  ],
  "套餐怎么选": [
    "你现在的月费多少流量多少？评论区发出来，我帮你查有没有更便宜的",
    "我家三个人各自交话费，看了这个才发现可以共享，省了一半",
    "携号转网能便宜多少？我帮你算，评论区私我也行"
  ],
  "家庭宽带怎么选？三口之家最优方案": [
    "三口之家你选的多少兆？不卡的评论区举手",
    "我家也是三口人，300兆够了，打游戏看视频都不卡",
    "你家宽带够用吗？测速低于套餐速度的来店里，我帮你查"
  ],
  "携号转网全流程攻略": [
    "你合约还有多久到期？评论区说，我帮你算违约金划不划算",
    "携号转网最怕信号差。先借朋友电话卡试三天，没问题再转",
    "转网办过的人说一下流程麻烦吗？评论区聊聊"
  ],
  "宽带到期续费还是换套餐？决策树帮你判断": [
    "宽带到期了，你续费了还是换了？",
    "我查了一下自己的套餐，3年前办的现在流量翻倍了，果断换",
    "不要自动续费！先来店里看看有没有更划算的新套餐"
  ],
  "家人合办副卡亲情号怎么划算": [
    "你家几个人各交多少话费？评论说说，我算你能不能省一半",
    "最划算的方案就是全家一起办，人均30块封顶",
    "帮爸妈办副卡，他们不用操心流量够不够"
  ],
  "购机 vs 买裸机，3年算下来谁省钱？": [
    "你现在用的什么手机？购机还是裸机？评论区说说",
    "我算过一笔账，购机3年比买裸机省好几百",
    "旧手机别扔，拿来以旧换新最高抵1000块"
  ],
  "家里WiFi信号差？先别急着换路由器": [
    "你家路由器放哪的？拍张照发评论区，我帮你看要不要挪位置",
    "信号差先看位置，再决定要不要换设备，别白花钱",
    "路由器旁边有微波炉电视机的，先挪开30厘米试试"
  ],
  "家里网络老掉线先排查这3个原因": [
    "你家网断过吗？重启光猫解决了还是报修了？",
    "记住三步：重启光猫→看指示灯→打10000",
    "有网络问题评论说说，我帮你远程看看能不能自己修"
  ],
  "手机套餐隐藏权益大盘点": [
    "查了一下自己的套餐，发现每个月多交了10块彩铃费",
    "你的套餐里有没用过的权益吗？评论区聊聊",
    "去电信App→我的权益，有惊喜"
  ],
  "直播带货用什么网络最稳？选网避坑指南": [
    "做直播的朋友跟我说，上行带宽是命根子，低于50兆必卡",
    "你直播用的什么宽带？卡不卡？评论说说",
    "想了解直播宽带怎么选的，点进我直播间，在线解答"
  ],
  "租房宽带怎么选？短期vs长期租房攻略": [
    "租房的你办的什么宽带？搬走了能移机吗？",
    "短期租客别办一年合约，办个流量卡开热点更划算",
    "租房宽带可以免费移机，搬家带着走"
  ],
  "打游戏用什么宽带？延迟对比实测": [
    "你打游戏延迟多少？评论区报一下，我帮你看看正常不正常",
    "100兆打排位等于送人头，300兆起步才不坑队友",
    "装个游戏宽带送加速器，来店里找我"
  ],
  "FTTR到底值不值得装？用数据说话": [
    "你家多大面积？90平以内一个路由器就够，不用多花钱",
    "120平以上不装FTTR，二楼信号肯定差",
    "来店里体验FTTR，全屋千兆什么感觉试了就知道"
  ],
  "学生套餐怎么选？4款热门横向对比": [
    "学生党你的套餐多少钱？29块够不够用？",
    "暑假在家刷视频流量不够？来办学生套餐，毕业前不涨价",
    "带学生证来办，比外面的套餐便宜一半"
  ],
  "老人手机套餐怎么选？3款适老套餐对比": [
    "你爸妈现在一个月交多少话费？评论说说，我帮你看能不能换",
    "老人家就用个微信视频通话，月费29就够了",
    "带爸妈来店里，我帮你查套餐帮你换"
  ],
  "异地跨省宽带怎么装最省钱": [
    "你有几处房子要装宽带？一套还是两套？",
    "老家和城里各一条宽带，融合套餐能省一半",
    "电信宽带可以跨省迁，搬家带走免费移机"
  ],
  "电视盒子卡顿IPTV和网络盒子怎么选": [
    "你家现在用什么看电视？评论区说说，卡不卡？",
    "IPTV比电视盒子稳定太多了，10块钱一个月",
    "来店里我现场给你演示IPTV和电视盒子的区别"
  ]
};

window.___t2Comments = {
  "上门维修": [
    "你家网速慢过吗？师傅上门查出来是什么问题？",
    "路由器位置放对了，信号能提升一半",
    "你家宽带得多少兆？测过实际速度吗？"
  ],
  "柜台服务": [
    "你的套餐多久没换过了？3年前的流量翻倍了",
    "来营业厅免费查套餐，说不定你也在白交钱",
    "柜台小哥说：很多人套餐该换了，来店里我帮你查"
  ],
  "突发状况": [
    "家里有老人的，帮他们把流量提醒打开了没？",
    "流量用完了别着急，来营业厅续就行",
    "这种突发情况你们遇到过吗？评论区说说怎么解决的"
  ],
  "温暖瞬间": [
    "这种故事看了真暖心，你们营业厅有这样的故事吗？",
    "有些服务不在套餐里，在心意里",
    "转发给爸妈，让他们知道营业厅能免费教用手机"
  ],
  "装机故事": [
    "你家装宽带的时候顺利吗？师傅态度怎么样？",
    "装宽带最怕老小区不好走线，现在有隐形光纤了",
    "不管多难装的房子，我们都有办法"
  ],
  "暑期蹭网故事": [
    "暑假孩子一个人在家，网速够用吗？",
    "路由器放弱电箱里信号会被屏蔽，赶紧拿出来",
    "孩子上网课卡的，先检查路由器位置"
  ],
  "暑期换机": [
    "小时候暑假打工攒钱买手机的心情还记得吗？",
    "准大学生们，来办购机比买裸机省钱多了",
    "暑假打工换手机，这份成就感比手机本身更值钱"
  ],
  "老客户情谊": [
    "你在这家营业厅办业务多少年了？",
    "十年老客户的感情，不是钱能衡量的",
    "营业厅不只是办业务的地方"
  ],
  "校园迎新": [
    "大学生们你们的套餐多少钱？",
    "校园套餐比社会套餐便宜一半，别多花冤枉钱",
    "准大学生来办卡之前先问问我，选最划算的套餐"
  ],
  "社区营销": [
    "你们社区有电信摆摊服务吗？",
    "很多居民不知道自己的宽带可以免费提速",
    "出来摆摊真正能帮到人，这种服务最有意义"
  ],
  "政企服务": [
    "你们公司网络稳定吗？有没有被网络问题坑过？",
    "企业宽带找我们，专线+云桌面+视频会议一条龙",
    "单位要换网络的，评论区说说需求，我上门勘察出方案"
  ],
  "银发服务": [
    "你教过爸妈用智能手机吗？教了多久？",
    "每周三下午营业厅有免费手机教学，带爸妈来",
    "老人学会视频通话的那一刻，是最温暖的时候"
  ],
  "投诉化解": [
    "你投诉过电信吗？最后怎么解决的？",
    "有网络问题直接来店里找我，比打10000快",
    "投诉不可怕，怕的是没人用心对待"
  ],
  "节日活动": [
    "你今年收到的第一个月饼是谁送的？",
    "营业厅不只是办业务的地方，也是城市的温度",
    "过节回不了家的，来营业厅我们陪你过"
  ],
  "突发事件": [
    "你遇到过最暖心的一次服务是什么？",
    "营业厅的门永远为需要帮助的人敞开",
    "路过营业厅可以进来坐坐，喝杯水"
  ],
  "公益服务": [
    "你们那有电信进社区做公益吗？",
    "环卫阿姨蹭网跟孩子视频，看着真不是滋味",
    "公益不是做样子，是真能帮到人的小事"
  ],
  "数字课堂": [
    "你爸妈被电信诈骗骚扰过吗？",
    "每周三下午有防诈骗课堂，免费参加",
    "数字课堂不只是教手机，更是守好老人的养老钱"
  ],
  "高考换机": [
    "高考完你买的第一台手机是什么？",
    "带准考证来办学生套餐，比网上便宜多了",
    "给准大学生买手机，来实体店比网上放心"
  ]
};

window.___t4Comments = {
  "免费贴膜": [
    "你的手机贴膜了吗？来店里免费贴",
    "外面贴一张30，我们免费贴，来了就贴",
    "路过进来贴个膜，免费的不办业务也行"
  ],
  "免费测速": [
    "你家宽带实际速度是多少？来店里免费测",
    "测完告诉你三个事：跑了多少兆、哪有问题、要不要花钱",
    "很多人办了300兆宽带结果只跑了100兆，白花钱"
  ],
  "办业务送礼": [
    "办宽带送千兆路由器，续费送流量包",
    "老客户来查查你的积分，可能还躺着几千分没花",
    "活动到这个月底，要办的抓紧"
  ],
  "以旧换新": [
    "旧手机放家里吃灰不如拿来抵钱",
    "最高抵1000块，半价换新机",
    "旧设备不管能不能开机都能抵"
  ],
  "手机清洁": [
    "手机听筒堵了声音小？来店里免费清洁",
    "超声波清洁+屏幕消毒，外面做一次几十块",
    "手机清洁只要10分钟，跟新的一样"
  ],
  "宽带体验": [
    "千兆宽带到底有多快？下载一部4K电影只要10秒",
    "来店里体验千兆宽带，免费试不收费",
    "试试又不要钱，比在家测准多了"
  ],
  "暑期纳凉": [
    "太原38度了，进来吹空调喝冰水",
    "营业厅空调免费，路过进来凉快一下",
    "带孩子的来蹭WiFi写作业，有座位有空调"
  ],
  "学生购机": [
    "准大学生来买手机，有学生专属价",
    "带准考证来，比网上便宜好几百还送大礼包",
    "买手机来实体店，有售后能直接找我们"
  ],
  "全家桶特惠": [
    "一家三口宽带+手机+电视，比单独办省一半",
    "人均30块封顶，宽带+手机+IPTV全包",
    "暑假孩子在家上网课，一条宽带全搞定"
  ],
  "社区服务": [
    "你家小区我们去做过社区服务吗？",
    "评论说你小区名，我们优先排到你那",
    "免费测速免费贴膜，不办业务也欢迎"
  ]
};
// ===== t1ImagePrompts.js =====
// 抖本内容工坊 · T1 AI 配图生图提示词
// v2.7.1: 去掉编号前缀（判断1/2/3等），去掉底部「截图」字样
// 营业员复制 → 豆包/即梦 → 9:16 竖版海报
// 更新：2026-07-22
window.___t1ImagePrompts = {
  "宽带选多少兆": "一张抖音竖版9:16海报。深蓝渐变底（#0A1628→#1A237E），中央三个白色圆角卡片并排排列，每个卡片之间留出空隙：\n\n左：「100兆 入门」/ ¥59/月 / 1-2人 / 刷视频微信\n中：「300兆 推荐」/ ¥99/月 / 2-3人 / 玩游戏看剧\n右：「1000兆 旗舰」/ ¥169/月 / 全家 / 直播4K\n\n卡片底部小字：「太原南中环电信营业厅」。\n整体苹果发布会式简洁高级感，白色大字标题「宽带选多少兆？」置于顶部。底部「💾 保存对照」。",

  "套餐怎么选": "一张抖音竖版9:16海报。暖蓝紫色渐变底。中央三个白色圆角卡片并排：\n\n左：「月费59」/ 20G流量 / 适合轻度用户\n中：「月费99」/ 60G流量+通话 / 适合中度\n右：「家庭套餐」/ 199元/3人共享 / 适合全家\n\n顶部标题：「套餐选错了？每月多花好几十」。底部小字：「太原南中环电信营业厅 · 领报价单」。高级感对比风格。",

  "家庭宽带怎么选？三口之家最优方案": "一张抖音竖版9:16海报。深蓝偏灰底。中央三个圆角卡片横排：\n\n左：「100兆」/ ¥59-79 / 一家三口够用 / 部分卡\n中：「300兆 推荐」/ ¥99 / 全家同时在线 / 推荐\n右：「千兆」/ ¥169 / 4K+直播+游戏 / 浪费\n\n大字标题：「三口之家宽带，300兆就够了」。底部：「太原南中环 · 到店选购」。家庭温暖感。",

  "携号转网全流程攻略": "一张抖音竖版9:16海报。暗蓝紫底。三个圆形步骤图卡横排：\n\n左：「算违约金」/ 还剩多久？300-500块\n中：「算套餐」/ 转过去省多少？半年回本\n右：「试信号」/ 借卡用3天 / 准了再转\n\n顶部标题：「携号转网三笔账」。底部：「太原南中环 · 来店算账」。信息卡风格。",

  "宽带到期续费还是换套餐？决策树帮你判断": "一张抖音竖版9:16海报。蓝紫渐变底。三个问题竖排：\n\n上：「3年前办的？」/ 流量翻倍了\n中：「搬家了？」/ 旧套餐不适合\n下：「只用宽带？」/ 加手机+电视更划算\n\n顶部：「宽带到期了？3个问题告诉你」。底部：「来店帮你算」。决策树风。",

  "家人合办副卡亲情号怎么划算": "一张抖音竖版9:16海报。暖蓝底。三个家庭场景对比横排：\n\n左：「夫妻2人」/ 主卡+1副卡 / 月费+10 / 30G共享\n中：「一家3口」/ 主卡+2副卡 / 月费+20 / 50G共享\n右：「5人三代」/ 融合套餐 / 169元 / 5张卡人均30\n\n顶部：「一家人各交各的话费？每月多花好几十」。底部：「来办融合套餐」。",

  "购机 vs 买裸机，3年算下来谁省钱？": "一张抖音竖版9:16海报。深蓝渐变底。三个方案对比横排：\n\n左：「购机」/ 月付少 / 3年省500-1500 / 绑定\n中：「裸机全款」/ 一次付清 / 自由换套餐 / 贵\n右：「以旧换新」/ 旧机折价+补贴 / 抵1000 / 半价\n\n顶部：「购机还是裸机？3年省一台手机」。底部：「到店选方案 · 太原南中环」。",

  "家里WiFi信号差？先别急着换路由器": "一张抖音竖版9:16海报。蓝绿渐变底。三个排查步骤竖排：\n\n上：「挪位置」/ 路由器放客厅中间高处 / 0元\n中：「挪干扰」/ 远离微波炉电视 / 0元\n下：「才换路由」/ WiFi6千兆 / 200元用5年\n\n顶部：「WiFi信号差？90%不是路由器的锅」。底部：「排查指南 · 太原南中环」。技术排障风。",

  "家里网络老掉线先排查这3个原因": "一张抖音竖版9:16海报。暗蓝底。三个步骤竖排：\n\n上：「重启」/ 断电2分钟再通电 / 80%解决\n中：「看灯」/ 红灯闪=外线故障 / 运营商的锅\n下：「报修」/ 打10000 / 24小时上门\n\n顶部：「网断了先别报修」。底部：「重启→查灯→报修 · 存下来备用」。信息卡风。",

  "手机套餐隐藏权益大盘点": "一张抖音竖版9:16海报。暖橙蓝渐变底。三个隐藏权益卡横排：\n\n左：「已订业务」/ 没用过彩铃/天云盘 / 取消省200\n中：「我的权益」/ 视频会员/外卖券 / 99以上含\n右：「老套餐」/ 3年没换 / 现在流量翻倍\n\n顶部：「你的话费里白给了？每月多交好几十」。底部：「去营业厅查 · 太原南中环」。",

  "直播带货用什么网络最稳？选网避坑指南": "一张抖音竖版9:16海报。深紫红渐变底。三个档位对比横排：\n\n左：「100兆」/ 上行20M / 不能连麦+放BGM\n中：「300兆」/ 上行50M / 推流稳定不卡\n右：「千兆」/ 上传快 / 直播直接上\n\n顶部：「直播老卡顿？选对了宽带就能解决」。底部：「到店咨询 · 太原南中环」。性能风。",

  "租房宽带怎么选？短期vs长期租房攻略": "一张抖音竖版9:16海报。清新蓝绿底。三个租期对比横排：\n\n左：「<半年」/ 流量卡+开热点 / 几十元 / 自由走\n中：「半年-1年」/ 低月费宽带 / 可移机 / 灵活\n右：「>1年」/ 融合套餐 / 宽带+手机 / 最划算\n\n顶部：「租房宽带怎么选？按租期选」。底部：「问营业员 · 太原南中环」。",

  "打游戏用什么宽带？延迟对比实测": "一张抖音竖版9:16海报。暗蓝底+橙色点缀。三个延迟档位对比横排：\n\n左：「100兆」/ 延迟50-80ms / 送人头\n中：「300兆 推荐」/ 延迟30-50ms / 不坑\n右：「千兆」/ 延迟10-20ms / 电竞级\n\n顶部：「打游戏延迟460？不是技术问题」。底部：「装游戏宽带 · 太原南中环」。游戏风。",

  "FTTR到底值不值得装？用数据说话": "一张抖音竖版9:16海报。深蓝底+暖橙渐变。三个户型横排：\n\n左：「90平以内」/ 一个千兆路由 / 不用多花钱\n中：「120平+大平层」/ FTTR全屋光纤 / 每间房满格\n右：「复式别墅」/ FTTR是专属方案 / 必须装\n\n顶部：「FTTR值不值？看你家多大」。底部：「体验咨询 · 太原南中环」。",

  "学生套餐怎么选？4款热门横向对比": "一张抖音竖版9:16海报。活力渐变（蓝→紫）。四个套餐卡横排：\n\n从左到右：「29元」/ 20G校园卡 / 校园免费\n「49元」/ 流量+通话 / 性价比\n「59元」/ 40G+视频会员 / 刷暑假\n「99元」/ 100G+1000分钟+宽带 / 封顶\n\n顶部：「学生套餐怎么选？29-99元」。底部：「凭学生证办 · 太原南中环」。年轻活力风。",

  "老人手机套餐怎么选？3款适老套餐对比": "一张抖音竖版9:16海报。暖杏色渐变。三个套餐卡横排：\n\n左：「29元」/ 5G+100分钟 / 接打电话够\n中：「49元 推荐」/ 15G+300分钟 / 刷抖音\n右：「69元」/ 30G+500分钟 / 视频通话\n\n顶部：「你爸妈的话费可能比你还贵」。底部：「带爸妈来办 · 太原南中环」。大字清晰。",

  "异地跨省宽带怎么装最省钱": "一张抖音竖版9:16海报。蓝灰渐变。三个方案横排：\n\n左：「跨省迁」/ 免费移机 / 合约继续 / 适合租房\n中：「二宽优惠」/ 第二条半价 / 老家+城里\n右：「融合套餐」/ 手机+宽带+电视 / 一站搞定\n\n顶部：「老家一套房城里一套？宽带怎么装最省」。底部：「到店咨询 · 太原南中环」。",

  "电视盒子卡顿IPTV和网络盒子怎么选": "一张抖音竖版9:16海报。深蓝底。三个方案横排：\n\n左：「IPTV基础」/ ¥10/月 / 央视卫视 / 老人看\n中：「IPTV会员」/ ¥30/月 / 4K+回看+VIP / 追剧\n右：「多屏同看」/ 含3屏 / 出差也能看直播\n\n顶部：「电视盒子老是卡？不是网速问题」。底部：「来店体验 · 太原南中环」。",

  "一个人住选什么宽带最划算？100M vs 300M vs 1000M": "一张抖音竖版9:16海报。清新蓝底。三个档位横排：\n\n左：「100兆」/ ¥59/月 / 刷剧微信 / 够用\n中：「300兆」/ ¥99/月 / 打网游看4K / 游戏党\n右：「1000兆」/ ¥169/月 / 一人用浪费\n\n顶部：「一个人住宽带选多少兆？」。底部：「到店咨询 · 太原南中环」。",

  "家庭宽带怎么选？三口之家最优方案": "一张抖音竖版9:16海报。暖蓝渐变。三个家庭场景对比横排：\n\n左：「100兆」/ 轻度用网 / 偶尔抢网\n中：「300兆 推荐」/ 全家同时在线 / 稳\n右：「千兆」/ 互不干扰 / 随便造\n\n顶部：「三口之家宽带，300兆起步」。底部：「到店选套餐 · 太原南中环」。",

  "监控摄像头需要什么网络？4G还是宽带？": "一张抖音竖版9:16海报。深蓝蓝底。两个方案左右分栏：\n\n左：「4G摄像头」/ 无宽带可用 / 插卡即用 / 月流量¥10-20\n右：「WiFi摄像头」/ 有宽带用 / 零月费 / 画质稳\n\n顶部：「给老家装监控，选哪个？」。底部：「到店选购 · 太原南中环」。",

  "直播带货用什么网络最稳？选网避坑指南": "一张抖音竖版9:16海报。深紫渐变底。三个档位横排：\n\n左：「100兆」/ 上行20M / 推流会卡 / 不推荐\n中：「300兆」/ 上行50M / 单人直播稳 / 推荐\n右：「千兆」/ 上行200M / 工作室多人播\n\n顶部：「直播老卡顿？问题可能在宽带」。底部：「到店咨询 · 太原南中环」。",

  "智能家居需要多大带宽？最少配置清单": "一张抖音竖版9:16海报。科技蓝底。三个智能设备数量场景横排：\n\n左：「30个设备」/ 100兆 / 完全够用 / 无需升级\n中：「80个设备」/ 300兆 / 还有余量\n右：「全屋4K监控」/ 可上千兆\n\n顶部：「装了智能家居，要升级宽带吗？」。底部：「到店咨询 · 太原南中环」。",

  "电信&联通&移动宽带怎么选？全方位横评": "一张抖音竖版9:16海报。三色对比：左蓝电信、中绿联通、右橙移动。三个运营商横排：\n\n左：「电信」/ ¥99/月 / 稳98% / 延迟最低 / 推荐\n中：「联通」/ ¥89/月 / 性价比 / 日常够用\n右：「移动」/ ¥79/月 / 便宜 / 高峰期掉速\n\n顶部：「三家宽带怎么选？」。底部：「到店体验 · 太原南中环」。"
};

// ===== t1Presets.js =====
// Auto-generated T1 presets
// Updated: 2026-07-20
window.___t1Presets = {
  "宽带选多少兆": {
    "100M 够用党": "日常刷视频+微信，一人住。100M看1080P流畅。适合租房党、老年人。",
    "300M 性价比": "2-3人家庭，同时看视频+打游戏+上网课。月费多10几块体验翻倍。",
    "1000M 一步到位": "4人以上/智能家居/游戏直播。千兆+FTTR全屋覆盖，多花30块用3年不后悔。"
  },
  "合约机还是裸机": {
    "合约机(月付)": "首付低，月租含话费+流量+宽带。3年比裸机少500-1500元。",
    "裸机(全款)": "一次付清自由换套餐。适合已有满意套餐不想被绑定的。",
    "以旧换新": "旧手机折价+电信补贴=新机半价。有旧机想升级的最划算。"
  },
  "套餐怎么选": {
    "流量党": "月流量>30G→大流量套餐(59-99元档)。流量不够叠加比升级划算。",
    "通话党": "月通话>300分钟→含通话套餐(39-59元档)。",
    "全家桶": "2-4人→融合套餐(99-199元)。3张副卡+宽带+IPTV，人均30-50元。"
  }
};

// ===== t1ScriptFull.js =====
// 抖本内容工坊 · T1 完整脚本（v3 评分优化版）
// 优化原则：①钩子讲故事 ②价格锚点显性 ③CTA多元化(扣/截图/到店/私信)
// 每篇目标评分：钩子力≥80 信任力≥70 转化力≥80
// 更新：2026-07-20
window.___t1ScriptFull = {

  "宽带选多少兆": "上个月我帮12户人家测了网速，8户的套餐根本不用升级——是把100兆的套餐用到300兆人家里的设备上，白花钱。\n\n你家多少兆够用？看三笔。一个人住刷抖音微信，100兆¥59/月够用了。三口之家你打游戏老婆刷剧孩子上网课，三台设备同时在线，100兆必卡。升300兆¥99/月，多花40块换来全家不卡不吵架。做直播打4K千兆¥169/月，上传速度快5倍。\n\n你家用多少就花多少。评论说说几口人几台设备，我帮算。截图保留下次选套餐对一下，不花冤枉钱。到店来找我也行，XX营业厅免费测速。",

  "套餐怎么选": "你每个月流量够用吗？真事：上个月有个朋友来店里说月费59，20G。每个月15号用完了，花30买加油包。实际一个月89。\n\n我给他换了99的大流量套餐，60G。他一个月用40G，还剩20G。钱少了，流量多了。还有一种更狠的——全家5口各交各的话费，一个月5x59=295。换家庭共享套餐，3张卡+宽带+电视，人均¥30封顶。\n\n你的套餐用了几年了？评论说说月费和流量，我帮你算。截图到店免费查，3分钟知道该不该换。",

  "家庭宽带怎么选？三口之家最优方案": "三口之家，你老公打游戏你刷抖音孩子上网课。三台设备同时在线，100兆够不够？够呛。\n\n上个月有个妈妈跟我投诉，孩子上网课老卡。我一查——100兆宽带三个人同时用。换了300兆¥99后，孩子网课不卡了，老公排位不坑了。多花40块解决的问题。千兆三口之家用不上，多花的70块存着报个班不香吗？\n\n评论说说你家几口人几台设备同时用，我帮你推荐。截图到店办，立等可取。",

  "携号转网全流程攻略": "想换运营商又舍不得用了十年的号？上周隔壁王哥也这么想。合约还有8个月到期，违约金380块。但新套餐每月省60，8个月省480。交违约金380，净赚100。当场转了。\n\n转网先算三笔账。第一，合约多久到期？剩不到3个月到期免费转。第二，转过去每月省多少？半年能不能覆盖违约金。第三，小区哪个运营商信号更推荐？先借朋友的卡试三天。\n\n评论说说你月费多少合约多久，我帮你算。截图到店我当面帮你查，10分钟出结论。",

  "宽带到期续费还是换套餐？决策树帮你判断": "宽带到期了，续费还是换？上周一个客户续费后才后悔——同样价格新套餐流量翻倍还送IPTV。\n\n到期先问自己三个问题：套餐是3年前办的？现在同价位流量翻倍了，别续，换。搬家了？新小区可能有新装优惠，续费就亏。只有宽带还是加手机电视？融合套餐加几十块多一条宽带+手机+电视。\n\n评论说说你的情况，我帮你决策。截图到店免费查下个月到期提醒，别自动续。",

  "家人合办副卡亲情号怎么划算": "你一个月交59，老婆也59，爸妈各39——加一起快200了。一半可能是白交的。\n\n上个月一户五口人，原来各办各的一个月295。换家庭共享套餐169，省了126。两个人主卡+1副卡月费加10共享30G。一家三口月费加20共享50G。三代同堂5张卡+宽带+电视，人均¥30封顶。\n\n评论说说你家几口人各交多少，我帮算。截图到店我当面查，给你出方案。",

  // ══════ A. 经典CTA直销型 ══════

  "购机 vs 买裸机，3年算下来谁省钱？": "上个月一个小伙子算了一下午——购机划算还是裸机划算？\n\n那台手机裸机¥2999。购机首付¥999，月费含话费流量，3年一共¥2880。比裸机省了119，还送充电宝和耳机。不想被绑定，裸机一次付清¥2999，自由换套餐。有旧手机拿来以旧换新折价+电信补贴，最高抵¥1000（相当于半价换新）。\n\n评论说说你现在用什么手机，我帮你算。截图到店，XX营业厅30分钟办好。",

  "家里WiFi信号差？先别急着换路由器": "上个月一个客户花600换了个新路由器，信号还是差。我一到她家——路由器放客厅角落电视柜里，门关着。打开门拿到客厅中间，信号从一格变满格。省了600块。\n\n路由器放角落塞柜子的——先挪到客厅中间高处，信号提升60%。旁边有微波炉电视机的——挪开30厘米。都试了还不行，路由器用了5年以上的换WiFi6千兆路由，¥200用5年。\n\n评论说说你家路由器放哪的？XX营业厅免费给你测信号，不用花冤枉钱。",

  "家里网络老掉线先排查这3个原因": "家里网断了先别报修。上个月有个大姐等了一天维修师傅——师傅来了重启了一下光猫，好了。\n\n记住三步：第一步光猫和路由器一起断电，等2分钟再通电，80%的问题重启就好。第二步看光猫指示灯——红灯闪是外线故障，运营商的锅，报修。绿灯正常。第三步重启了灯正常网还断？打10000报修，承诺24小时上门。\n\n重启 看灯 报修。顺序别搞反。评论说说你家网有没有问题，我帮你远程看看。截图保存这三步，下次不断网。",

  "手机套餐隐藏权益大盘点": "你每个月交的话费里可能含了从来不知道的东西。上个月帮一个客户查，发现三年交了彩铃费¥720——他压根没开通过。\n\n三招教你查。第一招：打开电信App→我的→已订业务。彩铃天翼云读书会员，取消掉一年省¥200。第二招：去电信App我的权益，月费¥99以上至少含一个视频会员外卖券。第三招：套餐是3年前办的？现在同价位流量翻倍了，来营业厅免费查。\n\n不换号不换卡白嫖好几百。评论说说月费多少，我帮你看看还能省什么。截图到店10分钟搞定。",

  // ══════ B. 直播引流型 ══════

  "直播带货用什么网络最稳？选网避坑指南": "上周一个做直播的朋友来找我，说直播老卡顿掉线。一查——100兆宽带，上行才20兆。直播推流最少要上行50兆，不然一定卡。\n\n100兆能直播但不能开美颜加连麦放BGM。300兆上行50兆以上，推流稳定不卡。做直播直接上千兆，上传快下载快，不砸直播间口碑。今天点进我直播间，我正在讲直播网络怎么选。",

  "租房宽带怎么选？短期vs长期租房攻略": "租房住不到一年，办宽带怕浪费不办又没网用？三个方案：半年内办流量卡开热点，灵活走人。半年到一年办低月费宽带¥50起，电信免费移机搬家带走。一年以上当自己家办融合套餐宽带+手机，比单独办省一半还送路由器。\n\n评论说说你租期多久，我帮你推荐。截图到店问移机政策，不浪费一分钱。",

  // ══════ C. 热梗植入型 ══════

  "打游戏用什么宽带？延迟对比实测": "打排位遇到延迟460是什么感觉？上个月一个兄弟用100兆延迟60-80毫秒，团战永远比别人慢0.5秒。换了300兆延迟降到30，第二天从黄金打到钻石了。\n\n100兆延迟50-80ms打排位等于送人头。300兆延迟30-50ms，90%玩家选这个够了。千兆FTTR延迟10-20ms，职业选手用的。\n\n评论说说你打什么游戏延迟多少，我帮你看看是不是宽带的问题。截图这个延迟对照表，选套餐时对比一下。到店来办游戏宽带送加速器。",

  "FTTR到底值不值得装？用数据说话": "上个月给一个复式楼的客户装FTTR。他家三楼一个路由器，二楼信号剩两格，一楼完全没网。换FTTR光纤到每个房间——一楼二楼三楼全满格。\n\n90平以内一个千兆路由¥200够了。120平以上大平层FTTR光纤到每间房¥59/月起。复式别墅三层以上，FTTR是专属方案。\n\n你住多大的房子？评论说说户型，我帮你判断。截图户型图到店，XX营业厅有FTTR体验间实地看效果。",

  "学生套餐怎么选？4款热门横向对比": "学生套餐比你想象的便宜一半。月费¥29=20G校园不限速。月费¥49=30G+500分钟。月费¥59=40G+视频会员刷一暑假。月费¥99=100G+1000分钟+宽带。\n\n其他套餐开学涨价，学生套餐反着来。带学生证来办，暑假要刷剧的、宿舍要装宽带的，趁现在办了。截图这些套餐到店，工作人员一看就懂。评论说说你一个月用多少流量。",

  // ══════ D. 方言亲切型 ══════

  "老人手机套餐怎么选？3款适老套餐对比": "咱爸咱妈一个月交多少话费？上个月一个大姐说老妈一个月交¥69。一查——老人家就接电话刷抖音，根本用不了那么多。\n\n换月费¥29的5G+100分钟够了。爱刷抖音的月费¥49的15G+300分钟，最推荐。靠手机跟外地孩子视频的月费¥69的30G+500分钟。到店来免费查，带老人来也行，我们教你用智能手机。\n\n评论说说你爸妈现在交多少，我帮看能不能换。截图到店直接办，XX营业厅老乡来了找我。",

  "异地跨省宽带怎么装最省钱": "老家的房子装了宽带，城里的房子也想装——是不是每个都得单独办一条？不用。\n\n上个月帮太原运城两头跑的小伙子办的融合套餐，一张主卡+两条宽带。太原一条运城一条，一个月才多收¥30。比单独再办一条省一半。跨省迁用电信免费移机。二宽优惠有一条了第二条半价。\n\n评论说说你几套房子要装宽带，我帮你算。截图到店当场出方案。",

  // ══════ E. 产品讲解型 ══════

  "电视盒子卡顿IPTV和网络盒子怎么选": "电视盒子看视频老是转圈圈？不是网速的问题，是设备的问题。上个月一个客户换了三个电视盒子还是卡——后来发现WiFi信号不稳。换成IPTV，稳了。\n\nIPTV基础版¥10/月，央视卫视全有老人看新闻够了。IPTV会员版¥30/月，4K+回看+VIP专区。多屏同看含3屏会员，客厅卧室各看各的。\n\n评论说说你家现在用什么看电视？截图到店来，我现场演示IPTV和电视盒子的差别，3分钟见分晓。不用纠结，试了再买。"
};

// ===== t1ScriptStyles.js =====
// 抖本内容工坊 · T1 脚本标签/标题/动作映射
// 作用：让 previewT1Talk 不再硬套「第一档/第二档/第三档」
// 用法：previewT1Talk 中查此表，找不到走默认三档
// 更新：2026-07-16
window.___t1ScriptStyles = {

  // ══════ A. 经典CTA型 → 用「招/步」══════

  "家里网络老掉线先排查这3个原因": {
    labels: ["第一步", "第二步", "第三步"],
    sectionTitle: "排查 5-17秒 · 三步走",
    actionNote: "→ 边排查边说，1-2-3 逐步递进",
    emoji: "🔧"
  },
  "家里WiFi信号差？先别急着换路由器": {
    labels: ["第一步", "第二步", "第三步"],
    sectionTitle: "排查 5-17秒 · 三步走",
    actionNote: "→ 边说边做，先免费后花钱逐步递进",
    emoji: "📶"
  },
  "手机套餐隐藏权益大盘点": {
    labels: ["第一招", "第二招", "第三招"],
    sectionTitle: "薅羊毛 5-17秒 · 三招搞定",
    actionNote: "→ 边讲解边说，每招递进",
    emoji: "💰"
  },

  // ══════ C. 热梗植入型 → 用「种」══════

  "FTTR到底值不值得装？用数据说话": {
    labels: ["第一种", "第二种", "第三种"],
    sectionTitle: "三种户型 5-17秒 · 对号入座",
    actionNote: "→ 边比划边说，你家属于哪种？",
    emoji: "🏠"
  },
  "打游戏用什么宽带？延迟对比实测": {
    labels: ["第一种", "第二种", "第三种"],
    sectionTitle: "三种延迟 5-17秒 · 对号入座",
    actionNote: "→ 手比划 1-2-3，延迟越来越低",
    emoji: "🎮"
  },

  // ══════ D. 方言亲切型 → 用「场景」══════

  "老人手机套餐怎么选？3款适老套餐对比": {
    labels: ["场景一", "场景二", "场景三"],
    sectionTitle: "三种用法 5-17秒 · 咱爸咱妈对号入座",
    actionNote: "→ 站在老人视角讲，越土越贴心",
    emoji: "👴"
  },
  "异地跨省宽带怎么装最省钱": {
    labels: ["场景一", "场景二", "场景三"],
    sectionTitle: "三种方案 5-17秒 · 看哪种适合你",
    actionNote: "→ 按你家房子数量选",
    emoji: "🏡"
  },

  // ══════ F. 逻辑说服型（默认走三档）══════
  // 不配置走默认 "第一档/第二档/第三档"

  // ══════ 默认值（找不到映射时使用）══════
  _default: {
    labels: ["第一档", "第二档", "第三档"],
    sectionTitle: "升级 5-17秒 · 三档对比",
    actionNote: "→ 手画1-2-3，每档语速递进，最后一档加重",
    emoji: "📈"
  }
};

// ===== t1Titles.js =====
// 抖本内容工坊 · 精选发布标题模板
// buildSeoTitle 优先读此表，匹配不到走关键词生成兜底
// 更新：2026-07-20
window.___t1Titles = {
  "宽带选多少兆": "宽带选100兆还是1000兆？看完不花冤枉钱",
  "套餐怎么选": "流量不够用？不是加钱的事，是套餐没选对",
  "家庭宽带怎么选？三口之家最优方案": "三口之家宽带选多少兆？300兆够了！",
  "携号转网全流程攻略": "携号转网算好三笔账，别白交违约金",
  "宽带到期续费还是换套餐？决策树帮你判断": "宽带到期了，续费还是换套餐？先回答3个问题",
  "家人合办副卡亲情号怎么划算": "一家人各交各的话费？每月多花好几十",
  "购机 vs 买裸机，3年算下来谁省钱？": "购机还是裸机？3年算下来省一台手机",
  "家里WiFi信号差？先别急着换路由器": "WiFi信号差先别花几百块换路由器，90%不是它的锅",
  "家里网络老掉线先排查这3个原因": "网断了先别报修，自己3步搞定",
  "手机套餐隐藏权益大盘点": "你每个月交的话费里，可能白给了好几十",
  "直播带货用什么网络最稳？选网避坑指南": "做直播就选这条宽带，不卡不掉不坑",
  "租房宽带怎么选？短期vs长期租房攻略": "租房宽带这样选，搬走了也不浪费",
  "打游戏用什么宽带？延迟对比实测": "打游戏延迟460？不是技术问题，是宽带没选对",
  "FTTR到底值不值得装？用数据说话": "FTTR值不值得装？看你家多大就知道了",
  "学生套餐怎么选？4款热门横向对比": "学生党选套餐，29块够用99块封顶",
  "老人手机套餐怎么选？3款适老套餐对比": "你爸妈的话费可能比你还贵，换这个省一半",
  "异地跨省宽带怎么装最省钱": "老家一套房城里一套，宽带怎么装最省？",
  "电视盒子卡顿IPTV和网络盒子怎么选": "电视盒子老是卡？不是网速的问题是设备的问题"
};

window.___t2Titles = {
  "上门维修": "10户网慢问题9户跟宽带没关系，原因太意外了",
  "柜台服务": "小伙子交话费发现月月白花钱，三年前的套餐该换了",
  "突发状况": "爷爷急得满头汗，只为孙子能上网课",
  "温暖瞬间": "独居老人第一次跟女儿视频，红了眼眶",
  "装机故事": "老小区装光纤走不了线？隐形光纤了解一下",
  "暑期蹭网故事": "初中生打电话说WiFi好卡，发现路由器被关在铁箱里",
  "暑期换机": "学生打一个月暑假工，只为换一台新手机",
  "老客户情谊": "十年老客户来店里不是办业务，就是想坐坐",
  "校园迎新": "大一新生办第一张手机卡，选对了比同学省一半",
  "社区营销": "摆摊测50户30户网速不达标，最大原因不是宽带",
  "政企服务": "企业网络改造从勘查到完工只用了三天",
  "银发服务": "阿姨拿本子记每一步，终于自己打出了视频电话",
  "投诉化解": "大哥气冲冲来投诉，一杯水后气消了大半",
  "节日活动": "半小时送了28个月饼，有人说是今年第一个",
  "突发事件": "外卖小哥跑进来躲雨，过了几天回来办了流量卡",
  "公益服务": "环卫阿姨蹭网跟孩子视频，看着真不是滋味",
  "数字课堂": "老人差点被骗走养老钱，电信课堂紧急开课",
  "高考换机": "高考完第二天就来买手机，爸爸比孩子还紧张"
};

window.___t4Titles = {
  "免费贴膜": "免费贴膜，就在XX路电信营业厅",
  "免费测速": "免费测宽带速度，测完告诉你要不要花钱",
  "办业务送礼": "办宽带送千兆路由器，续费送流量包",
  "以旧换新": "旧手机放家里吃灰不如拿来抵钱",
  "手机清洁": "手机听筒堵了？来营业厅免费清洁",
  "宽带体验": "千兆宽带有多快？下载4K电影只用10秒",
  "暑期纳凉": "进店免费吹空调喝冰水，不办业务也行",
  "学生购机": "准大学生买手机，带准考证有专属价",
  "全家桶特惠": "一家三口宽带手机电视一起办，省一半",
  "社区服务": "这周末电信进社区，免费测速免费贴膜"
};
// ===== t1TopicAliases.js =====
// 抖本内容工坊 · T1 选题别名映射
// 解决 dropdown value 与 t1ScriptFull key 不一致问题
// previewT1Talk 先查别名表，再查精确 key，最后用模糊匹配兜底
// 更新：2026-07-20
window.___t1TopicAliases = {
  "100/300/1000兆看视频实测差距":   "宽带选多少兆",
  "不同人群宽带怎么选":              "家庭宽带怎么选？三口之家最优方案",
  "世界杯看球宽带怎么选不卡顿不掉线": "直播带货用什么网络最稳？选网避坑指南",
  "二宽半价到底值不值":              "套餐怎么选",
  "光猫路由网线哪个最影响网速":     "家里WiFi信号差？先别急着换路由器",
  "全家宽带套餐真的划算吗":         "套餐怎么选",
  "宽带+手机+电视三合一方案":       "套餐怎么选",
  "宽带提速该不该升一档":           "套餐怎么选",
  "宽带提速升千兆":                 "套餐怎么选",
  "宽带选多少兆最划算":             "宽带选多少兆",
  "宽带避坑指南":                   "家里WiFi信号差？先别急着换路由器",
  "异地宽带怎么办理最方便":         "异地跨省宽带怎么装最省钱",
  "携号转网实际体验全流程":         "携号转网全流程攻略",
  "换运营商不换号？携号转网全流程": "携号转网全流程攻略",
  "新装宽带送路由器活动解析":       "套餐怎么选",
  "暑假学生宽带怎么选最省钱":       "学生套餐怎么选？4款热门横向对比",
  "租房宽带避坑指南":               "租房宽带怎么选？短期vs长期租房攻略",
  "老用户领FTTR设备升级":           "FTTR到底值不值得装？用数据说话",
  "到店体验领福利":                 "套餐怎么选",
  "盛夏狂欢办千兆送手机":           "购机 vs 买裸机，3年算下来谁省钱？",
  "宽带新装300Mvs500Mvs1000M":     "宽带选多少兆",
  "本月宽带优惠活动":               "套餐怎么选",
  "暑假孩子天天在家，宽带选多少兆够用？": "宽带选多少兆",
  "一个人住选什么宽带最划算？100M vs 300M vs 1000M": "宽带选多少兆",
  "全屋WiFi怎么布局？90平/120平/复式方案": "FTTR到底值不值得装？用数据说话",
  "监控摄像头需要什么网络？4G还是宽带？": "套餐怎么选",
  "老房子没预埋网线怎么办？3种解决方案": "套餐怎么选",
  "智能家居需要多大带宽？最少配置清单": "套餐怎么选",
  "电视盒子卡顿？可能是宽带的问题": "电视盒子卡顿IPTV和网络盒子怎么选",
  "多人合租网络怎么分？3种方案优劣对比": "套餐怎么选",
  "电信&联通&移动宽带怎么选？全方位横评": "套餐怎么选",
  "家里有学生上网课，宽带怎么选？": "套餐怎么选"
};

// ===== t2Presets.js =====
// Auto-generated: expanded first-line scene presets (6 -> 15 scenarios)
// Updated weekly by WorkBuddy automation tasks
window.___t2Presets = {
  '上门维修': { time: '今天下午', customer: '阿姨', problem: '说家里网卡了好久了，看视频一直转圈', finding: '路由器被塞在电视柜最里面，旁边还放着微波炉', steps: '1. 把路由器挪到客厅中间\n2. 避开金属物和微波炉\n3. 重启路由器测信号', reaction: 'WiFi满格了！看视频再也不转圈了', summary: '很多网慢问题，都是路由器位置没放对', tags: '#上门维修 #WiFi卡顿 #装维日常' },
  '柜台服务': { time: '今天上午', customer: '年轻人', problem: '来缴话费，顺便问了句流量老不够用怎么办', finding: '查了一下套餐，发现用的是三年前的老套餐，同样价格现在能多30G', steps: '1. 打开系统查当前套餐\n2. 对比同价位新套餐\n3. 帮客户一键换套餐', reaction: '每个月多30G还不多花钱！太感谢了', summary: '很多老客户的套餐都该更新了，来店里免费帮你查', tags: '#柜台故事 #套餐升级 #省钱攻略' },
  '突发状况': { time: '昨天傍晚', customer: '大爷', problem: '急匆匆跑进来说手机突然上不了网，孙子等着上网课', finding: '一看是流量用完了，大爷不懂怎么看，急得满头大汗', steps: '1. 安抚大爷情绪\n2. 查流量使用情况\n3. 赠送1G临时流量先用着', reaction: '孙子网课上成了，大爷连说谢谢', summary: '家里有老人用手机的，记得帮他们设置流量提醒', tags: '#突发状况 #暖心服务 #流量告急' },
  '温暖瞬间': { time: '上周', customer: '独居老人', problem: '来店里问能不能教她跟女儿视频通话', finding: '手机是女儿买的但老人只会接电话，其他功能都不会用', steps: '1. 帮老人连上营业厅WiFi\n2. 一步步教怎么打视频\n3. 写在纸上让老人带回家', reaction: '打通了女儿的视频，老人眼眶红了', summary: '有些服务，不在套餐里，在心意里', tags: '#温暖瞬间 #老人服务 #数字鸿沟' },
  '装机故事': { time: '今天', customer: '年轻夫妻', problem: '刚搬新家要装宽带，但房子是老小区，布线很麻烦', finding: '楼道里光纤箱距离远，需要从外墙走线', steps: '1. 勘察走线路径\n2. 外墙固定光纤\n3. 入户测速达标', reaction: '新家终于有网了，夫妻俩一起开电视庆祝', summary: '不管多难装的房子，我们都能搞定', tags: '#装机故事 #新家宽带 #装维小哥' },
  '老客户情谊': { time: '这周三', customer: '老客户张叔', problem: '来店里不是为了办业务，就是路过进来聊聊天', finding: '张叔是十年老客户了，从办第一个宽带开始就在我们厅', steps: '1. 给张叔倒了杯水\n2. 顺便帮他查了查有没有欠费\n3. 提醒他老客户积分可以换礼品', reaction: '张叔笑着说你们还记得我，换了个保温杯高高兴兴走了', summary: '十年老客户，处成了街坊邻居', tags: '#老客户 #街坊邻里 #十年用户' },
  '校园迎新': { time: '九月开学季', customer: '大一新生', problem: '和爸妈一起来办人生第一张手机卡，不知道该选什么套餐', finding: '新生对流量需求很大但预算有限，校园套餐比社会套餐便宜一半', steps: '1. 了解新生日常使用习惯\n2. 推荐校园专属融合套餐\n3. 手把手教激活和查流量', reaction: '爸妈放心了，学生开心地说终于有自己号码了', summary: '大学第一课：选对套餐，四年不愁', tags: '#校园迎新 #开学季 #第一张电话卡 #新生报到' },
  '社区营销': { time: '周六上午', customer: '社区居民', problem: '电信进社区摆摊做便民服务，居民围过来问宽带提速', finding: '很多居民不知道自己的宽带可以免费提速，更不知道同价位的套餐已经升级了', steps: '1. 搭好便民服务台\n2. 主动询问居民上网体验\n3. 现场查套餐和网速，给升级建议', reaction: '王阿姨当场办理提速，开心地说晚上看直播不卡了', summary: '走出去，把服务送到家门口', tags: '#社区营销 #便民服务 #宽带提速 #进社区' },
  '政企服务': { time: '周三', customer: '某单位办公室', problem: '单位网络改造，多条专线+宽带+固话综合方案，时间紧要求高', finding: '现场勘查发现原有线路老化，需要重新布光纤并升级到企业级方案', steps: '1. 带领技术团队现场勘查\n2. 出方案：企业专线+云桌面+视频会议一站式\n3. 协调施工队周末加班完成', reaction: '甲方负责人说效率真高，下个标还找你们', summary: '政企服务拼的是响应速度和专业度', tags: '#政企服务 #企业专线 #网络改造 #一站式方案' },
  '银发服务': { time: '下午三点', customer: '退休李阿姨', problem: '智能手机用了半年还是不太会，每次来营业厅都带个本子记步骤', finding: '李阿姨最怕的是流量超了扣费，完全不敢用移动数据', steps: '1. 帮李阿姨设置流量用量提醒\n2. 教她连WiFi、打微信视频\n3. 把关键步骤截图发到她微信', reaction: '李阿姨第一次自己跟孙子视频成功，激动得发朋友圈', summary: '帮银发族跨过数字鸿沟，是营业厅的社会责任', tags: '#银发服务 #智慧助老 #数字鸿沟 #微信教学' },
  '投诉化解': { time: '周一上午', customer: '怒气冲冲的张先生', problem: '宽带断了好几次，打电话报修说要等48小时，直接冲到营业厅来', finding: '查了才知道是小区施工把光纤挖断了，属于意外故障，但响应确实慢了', steps: '1. 先倒水让客户消消气\n2. 解释故障原因和修复进度\n3. 主动申请补偿+加急派单', reaction: '张先生气消了说理解，走的时候还说了句辛苦了', summary: '投诉不可怕，怕的是没人用心对待', tags: '#投诉化解 #客户服务 #宽带故障 #用心服务' },
  '节日活动': { time: '中秋节前夕', customer: '来办业务的客户', problem: '营业厅准备了中秋月饼和手工灯笼，怎么让客户感受到节日温暖', finding: '很多客户是外地人，过节回不了家，在营业厅感受到一丝温暖', steps: '1. 营业厅布置中秋主题装饰\n2. 每位客户办完业务送一个小月饼\n3. 主动问客户要不要和家人视频报平安', reaction: '一个来办业务的小哥说这是他今年收到的第一个月饼', summary: '营业厅不只是一个办业务的地方，也是城市的温度', tags: '#节日活动 #中秋 #营业厅温暖 #异乡人' },
  '突发事件': { time: '暴雨天', customer: '路过的外卖小哥', problem: '突然暴雨，外卖小哥浑身湿透跑进营业厅躲雨，手机快没电了', finding: '小哥手机电量只剩5%，还有3单没送完，急得不行', steps: '1. 让小哥进来坐着歇会儿\n2. 拿充电器帮他充电\n3. 倒了杯热水让他暖暖', reaction: '小哥连说谢谢，雨停后继续送单，回头还专门来办了张流量卡', summary: '营业厅的门，永远为需要帮助的人敞开', tags: '#突发事件 #暖心 #外卖小哥 #营业厅故事' },
  '公益服务': { time: '周末', customer: '社区居民+环卫工人', problem: '电信联合社区做公益，免费测网速、贴膜、教老人用手机', finding: '最感动的是环卫阿姨说，你们的WiFi我能用一下吗，想跟老家的孩子视频', steps: '1. 给环卫阿姨连上WiFi\n2. 帮她拨通视频通话\n3. 顺便送她一张特惠流量卡', reaction: '阿姨边视频边抹眼泪，说好久没看到孩子了', summary: '公益不是做样子，是真能帮到人的小事', tags: '#公益服务 #环卫工人 #爱心 #社会责任' },
  '数字课堂': { time: '周三下午', customer: '社区老人', problem: '营业厅开设银发数字课堂，教老人用智能手机、防诈骗', finding: '老人们最怕的不是学不会，是怕被骗。有一个大爷说上次差点被假冒客服骗走养老钱', steps: '1. 投影仪投屏一步步教操作\n2. 重点讲防诈骗案例\n3. 每个老人发大字版操作手册', reaction: '下课后老人们都不想走，说下周三还来', summary: '数字课堂，不只是教技能，更是守好老人的钱袋子', tags: '#数字课堂 #银发族 #防诈骗 #智慧助老' }
};
// ===== t2ScriptFull.js =====
// 抖本内容工坊 · T2 完整故事脚本（v3 评分优化版）
// 优化原则：保留故事温度 + 显性价格锚点 + CTA 多元化
// 更新：2026-07-20
window.___t2ScriptFull = {

  "上门维修": "上个月我上门修了12户网，10户的问题跟宽带没关系——全是路由器位置放错了。最近这户阿姨说家里网卡了好久了，看视频一直转圈圈。\n\n到现场一看：路由器塞在电视柜最里面，旁边还放着微波炉。我帮她挪到客厅中间高出地面一米的地方，避开金属物。重启。WiFi满格了。\n\n一分钱不花。很多人以为网慢就要升级套餐，其实换个位置就行。你家路由器放哪的？拍张照发评论区，我帮你看看。截图保存这个位置标准，下次先自己查。到店来也行，免费帮你测。",

  "柜台服务": "昨天来了个小伙子交话费，顺口问一句流量老不够用怎么办。一查——三年前的套餐，20G流量¥59。现在同样价格能办60G了。三年多交了快一千块冤枉钱。\n\n帮他换了个同价位套餐，流量翻了三倍。他瞪大眼睛说：这真的不加钱？我说不加，就是该更新了。三年前的套餐，现在同价位流量翻倍了。\n\n你的套餐还是三年前的吗？评论说说你月费多少，我帮你查。截图到店里带上身份证，3分钟出结果不换号不换卡。",

  "突发状况": "昨天傍晚10分钟下班，一个大爷急匆匆跑进来满头大汗，说手机突然上不了网了，孙子等着上网课。\n\n一查——大爷的流量用完了。他不懂怎么看急得团团转。我说先给您加上1G临时流量用着。开通之后爷爷拨通了孙子的视频——屏幕那头传来孩子的声音：爷爷我看到你了！爷爷眼眶一下就红了。\n\n家里有老人的，帮他们把流量提醒打开。老人流量不够用的评论说说，我教你怎么在App上设置提醒。截图步骤发给爸妈，省得他们为这种小事着急。",

  "温暖瞬间": "上周来了一个独居阿姨，在门口站了好几分钟才进来，怯生生地问我：姑娘，能不能教我怎么跟闺女视频？阿姨的手机是闺女买的，但只会接电话。闺女在深圳打工一年才回来一次，想闺女了。\n\n一步步教她——点这个绿色的按钮，找到闺女的名字，点视频通话。阿姨手有点抖，点了好几次才点对。视频接通的那一刻屏幕那头传来一声妈！阿姨眼泪就下来了。\n\n带爸妈来营业厅，我们免费教用智能手机。每周三下午有数字课堂。截图转发给不在爸妈身边的朋友。",

  "装机故事": "上个月去装了一户老小区，楼道里光纤箱离得远，走线要绕外墙。客户刚结婚，新家刚装修好不想打孔。以前遇到这情况可能就说装不了——现在有隐形光纤，比头发丝还细，沿着踢脚线走几乎看不见。\n\n花了两个多小时装完测速——千兆跑满。小夫妻试4K电影秒开，击了个掌。不管新房子老房子都有办法。\n\n你家装修布线有问题吗？评论说说，我免费帮你看。截图到店咨询，有专业方案不花冤枉钱。",

  "暑期蹭网故事": "上周接到电话，是个初中生打来的，声音怯生生的：叔叔我家WiFi好卡，上网课老是加载不出来。孩子爸妈都上班了一个人在家。\n\n远程指导他检查——发现路由器放弱电箱里，铁皮门把WiFi信号屏蔽得死死的。我说你打开弱电箱门试试。打开之后网速从2兆变成50兆，翻了25倍。孩子说叔叔你真厉害我终于能上课了。\n\n暑期孩子一个人在家，别让网速耽误了他。评论说说你家孩子上网课卡不卡，我教你几步自己排查。截图保存排查法，暑假用得上。",

  "暑期换机": "上周一个晒得黑黑的初中生跑进来，盯着柜台里的手机看了半天。我说小伙子想买手机？打了一个月暑假工攒了2000块想换台手机。天天在大太阳底下发传单晒得脸上两团红。\n\n推荐了一款购机首付低月费含话费，还送了耳机充电宝。拿到新手机他一直在笑，说值了值了。准大学生们刚考完试想换手机的，购机首付¥999起。\n\n带着准考证来找我，有学生专属优惠。评论说说你预算多少我帮你推荐。截图到店半小时办好。",

  "老客户情谊": "上周三，张叔像往常一样溜达到店里来了。不是来办业务的，就是路过进来坐坐聊聊天。\n\n张叔是十年老客户了。当年他家第一个宽带就是我装的还是ADSL拨号上网。十年换了三次套餐升了两次宽带换了一台光猫，一直在我们厅。我给他倒了杯水查了查有没有欠费提醒积分可以换礼品。换了个保温杯笑着说：你们还记着我呢。\n\n十年老客户处成了街坊邻居。评论说说你在这办了几年的业务？截图到店有老客户专属礼品，不用办业务也领。",

  "校园迎新": "每年九月开学，大一新生来办人生第一张手机卡。前几天来了个新生爸妈陪着来的，孩子一脸懵选套餐。\n\n校园套餐比社会套餐便宜一半。推荐给他月费¥59校园专属套餐——40G流量+500分钟+校园宽带，够用一整个学期不带加油包。爸妈一听价格放心了，孩子开心地说终于有自己的号码了。\n\n准大学生们来之前先问问，别多花冤枉钱。评论说说你选什么套餐我帮看看。截图到店办，学生证在手立马生效。",

  "社区营销": "上周末去迎泽区桥东街道摆摊，50户来测速30户没跑满。最大原因——办了300兆套餐路由器还是5年前的老款根本跑不满。\n\n这个周末我们去杏花岭区桃园北路社区文化中心，这周四上午9点到12点。免费测速不达标当场排查。路由器太旧当场以旧换新抵¥200。\n\n报你家小区名字优先排到你那。评论说说你家在哪天方便。截图保存时间地点，到现场免费领礼品。",

  "政企服务": "上个月一个做电商的小公司老板找到我，说办公室网一到下午就卡，直播带不动货。一查——一条普通宽带撑20个人用，还在用一个路由器。\n\n给他换了企业专线加云桌面加视频会议方案。花了半天装好，他说第二天直播没卡过一次。一家企业便宜的一年也就¥3000-5000，比断网一天亏几千强。\n\n你的公司网络也得升升级了，评论区说说需求，上门勘察出方案，报个价看看。截图留着年底预算有用。",

  "银发服务": "上周一个老大爷来营业厅，问能不能帮他跟儿子视频。大爷一个人住，手机只会打电话接电话。\n\n我在柜台一步步教他怎么开视频怎么找到儿子。大爷学了一个多小时终于会了。接通的那一刻他愣了一下然后笑了——那个笑容我现在还记得。\n\n每周三下午有免费手机教学课，带爸妈来我们教。截图转发给不在爸妈身边的朋友，让他们知道营业厅能免费教用手机。",

  "投诉化解": "上个月一个大哥气冲冲来投诉，说网费多扣了三个月。我让他坐下倒了杯水，说大哥别急我先查查。\n\n一查——确实多扣了，是系统自动续费了一个老套餐。当场退款没有废话。大哥走的时候说态度不错下次还来。投诉不是可怕的事，怕的是没人用心对待。\n\n有网络问题直接来店找我，比打电话快。评论说说你有问题留言，截图到店有专人对接。",

  "节日活动": "中秋的时候我们在营业厅门口摆了个月饼摊。30分钟送了28个月饼。有人说是今年收到的第一个月饼。还有一位骑手小哥路过，我塞给他一个月饼，他愣了一下说谢谢。\n\n营业厅不只是办业务的地方，也是城市的温度。每个节假日我们都有活动，评论说说你期待什么活动，截图到店领小礼品。",

  "突发事件": "上个月突然下雨，一个外卖小哥跑进来躲雨。我给他倒了杯水说进来坐坐不急。他说手机没电了，还借了充电器充了半小时。\n\n过了几天他回来了，办了一张流量卡。说上次躲雨发现这里服务挺好，以后就在这里办了。有时候一个善意的动作就能换来一个客户。\n\n路过来坐坐喝杯水，不办业务也欢迎。评论说说你被营业厅暖到过的瞬间。",

  "公益服务": "我们在营业厅门口设了个爱心站，免费给环卫工人提供热水和充电。有天一个环卫阿姨在门口蹭WiFi跟孩子视频了半小时。她走的时候一直说谢谢。\n\n后来同事问她为啥不去营业厅里面坐着充？她说怕弄脏地板。我们说不脏，您来我们欢迎。小事见人心。\n\n转发这条给身边的环卫工人，让他们知道营业厅能免费充电喝水。评论说说你身边有让人暖心的服务故事吗？",

  "数字课堂": "每周三下午数字课堂。上个月刚讲了防诈骗专题——有阿姨说自己差点被骗了养老钱。她说骗子冒充公检法让她转账，她想起我在课堂上讲过「公检法不会电话要求转账」，挂了电话。\n\n数字课堂不只是教手机，更是守好老人的养老钱。每周三下午免费参加，带爸妈来也行。评论报名预留位置。截图转发给家里有老人的朋友。",

  "高考换机": "高考完第二天就来买手机，爸爸比孩子还紧张。\n\n孩子想要最新款，爸爸偷偷跟我说预算有限。推荐了购机方案首付¥999，月费含话费流量，还送耳机充电宝。孩子满意了爸爸也放心了。高考是人生大事，选对人生第一台手机也是大事。\n\n带着准考证来店里买手机有学生专属优惠。评论说说你想买什么手机，我帮你查能不能学生价。截图到店半小时拿新机。"
};

// ===== t4Presets.js =====
// Auto-generated data file for t4Presets
// Updated weekly by WorkBuddy automation tasks
window.___t4Presets = {
  '免费贴膜': {
    benefit: '免费贴膜', desc: '苹果安卓、曲面直屏都能贴，比外面30块的还好',
    tags: '#免费贴膜 #手机贴膜 #同城福利'
  },
  '免费测速': {
    benefit: '免费WiFi测速', desc: '到店或预约上门，免费测你家宽带到底跑多少兆，不满速当场排查',
    tags: '#免费测速 #宽带测速 #WiFi优化'
  },
  '办业务送礼': {
    benefit: '办业务送好礼', desc: '新装宽带送路由器，续约升档送流量包，老用户积分兑换精美礼品',
    tags: '#办业务送礼 #宽带优惠 #新装好礼'
  },
  '以旧换新': {
    benefit: '以旧换新', desc: '旧手机、旧光猫、旧路由器拿来抵钱，换新款合约机最高抵1000元',
    tags: '#以旧换新 #合约机 #换新机'
  },
  '手机清洁': {
    benefit: '免费手机清洁', desc: '超声波清洁+屏幕消毒+系统缓存清理，让你的手机焕然一新',
    tags: '#手机清洁 #免费服务 #手机保养'
  },
  '宽带体验': {
    benefit: '千兆宽带免费体验', desc: '到店体验千兆宽带到底多快，下载一部电影只要10秒，玩游戏0延迟',
    tags: '#千兆宽带 #免费体验 #网速对比'
  },
  '暑期特惠': {
    benefit: '毕业季&暑期专属优惠', desc: '学生/教师/应届毕业生凭有效证件享专属套餐优惠，暑期流量包低至15元，毕业季合约机直降500元',
    tags: '#毕业季优惠 #暑期特惠 #学生优惠 #应届生福利'
  },
  '社区服务': {
    benefit: '电信进社区便民服务', desc: '宽带义诊+手机贴膜+业务咨询，不出小区就能办，老人优先',
    tags: '#社区服务 #便民 #上门服务'
  }
};
// ===== t4ScriptFull.js =====
// 抖本内容工坊 · T4 完整活动脚本（v3 评分优化版）
// 优化原则：具体金额替代"免费" + CTA 多元化 + 活动明确
// 更新：2026-07-20
window.___t4ScriptFull = {

  "免费贴膜": "贴一张手机膜店里¥30，网上¥19.9自己贴全是气泡。来我们营业厅免费贴，苹果安卓曲面直屏都能贴。不用预约不用排队，来了就贴。\n\n贴完顺便测测你家宽带速度看看有没有跑满。就在XX路电信营业厅，路过进来坐坐贴个膜再走。免费的，不办业务也行。评论说说你手机型号，我看看有没有膜。截图这个地址导航过来。",

  "免费测速": "你家办了300兆宽带实际能跑多少？来测一下。上个月我测了50户30户没跑满。原因就三种：路由器太老、光纤入户不到位、多个设备抢带宽。\n\n测完我告诉你三件事：实际跑了多少兆、哪个环节有问题、要不要花钱解决（前两种免费）。XX路电信营业厅长期免费测速，也可以预约我上门。\n\n评论预约时间。截图保存测速结果到店直接查。",

  "办业务送礼": "办宽带送千兆路由器价值¥299，续约升档送流量包价值¥100，老客户积分还能换礼品。办个融合套餐宽带+手机+IPTV，比单独办省一半。还送路由器送流量，相当于白捡好几百。\n\n老客户来查查你的积分账户，可能还躺着几千分没花。活动到这个月底。评论说说你现在宽带月费多少我帮你算哪个套餐最省。截图到店带身份证就行。",

  "以旧换新": "旧手机放家里吃灰卖二手嫌麻烦扔了又可惜。拿来我们店里当场估价当场抵钱，不管能不能开机屏幕碎没碎，拿来就能抵。最高抵¥1000。\n\n上周一个客户5年前的旧机抵了¥300换了台新机，高兴得发了个朋友圈。带旧设备来XX路电信营业厅，当场估价当场抵。\n\n不买也来估个价心里有个数。评论说说你什么型号的旧机，我先帮你估个价。截图这个活动到月底。",

  "手机清洁": "手机用久了屏幕全油听筒堵了声音小充电口积灰充不进电？超声波清洁+屏幕消毒+Type-C口清理+系统缓存清理，外面做一次¥68-98，我们免费。整个流程10分钟，做完了手机跟新的一样。\n\n等清洁的工夫顺便测测网速看看宽带有没有问题。XX路电信营业厅长期免费手机清洁。评论预约不用排队，截图到店直接做。",

  "宽带体验": "千兆宽带到底多快？下载一部4K电影只要10秒——你从1数到10电影就下完了。刷视频不卡打游戏延迟十几毫秒。\n\n试完了想办就办不想办也没关系，试试又不收费。地址在XX路电信营业厅有千兆体验区随时来试。千兆¥169/月，300兆¥99/月，到店实测再决定。\n\n评论预约体验时间。截图保存地址导航过来。",

  "暑期纳凉": "太原38度了。不想在家吹空调费电？来我们营业厅吹空调喝冰水——免费的。手机免费贴膜免费清洁免费测网速，都是免费的。\n\n带孩子的还能让他在厅里坐会儿蹭WiFi写作业。不办业务也欢迎路过进来凉快一下。XX路电信营业厅就是大家的避暑点。\n\n评论你说我在路上，我开门等你。截图地址导航过来纳凉。",

  "学生购机": "准大学生们注意了——凭学生证/准考证/录取通知书来买手机有专属优惠价。比网上便宜好几百还送大礼包：耳机+充电宝+手机壳，外面买一套¥200多免费领。\n\n手机能亲手摸到真机能当场比价格有售后出了问还能直接找我。购机首付¥999起。到月底。\n\n评论说说你想要的手机型号，我帮你查有没有学生价。截图到店带上学生证，30分钟拿新机。",

  "全家桶特惠": "一家三口，宽带¥59+手机两个¥59+电视¥30=每月¥208。换融合套餐宽带+手机+IPTV一起办一个月¥169，比各办各的省出一顿火锅钱。\n\n宽带速度还翻倍了300兆起步。暑假孩子在家上网课爸妈刷手机看电视，一条宽带全搞定。一家人均¥30封顶。\n\n带一家人的身份证来XX路营业厅，半小时办好当天通网。评论说说你家现在一个月花多少，我帮你算能省多少。截图来办，报名字优先安排。",

  "社区服务": "上个月去迎泽区某街道50户来测速30户没跑满。最大原因是路由器太旧。这周末我们去杏花岭区桃园北路社区文化中心，周四上午9点到12点。免费测速免费贴膜免费手机清洁。路由器太旧当场以旧换新抵¥200。\n\n报你家小区名字优先排到你那。评论说说你家在哪里哪天方便。截图时间地点到现场领小礼品。"
};

// ===== techDB.js =====
// Auto-generated data file for techDB
// Updated weekly by WorkBuddy automation tasks
window.___techDB = {
  '光猫': {
    topics: {
      '指示灯图解': {
        item: '光猫', func: '指示灯',
        title: '光猫指示灯全图解：哪个灯闪代表什么故障，照着查不用打电话',
        tags: '#光猫故障 #宽带维修 #网络知识 #实用技巧',
        p1: '电源灯：常亮正常，不亮就是没通电，检查电源插头',
        p2: '光信号灯：不亮正常，红灯闪=光纤断了，打10000报修',
        p3: '宽带灯：常亮正常，不亮或闪=没网，重启光猫试试',
      },
      '注册灯详解': {
        item: '光猫', func: '注册状态灯',
        title: '光猫注册灯一直闪？3种情况对号入座',
        tags: '#光猫故障 #宽带自助 #电信知识',
        p1: '注册灯常亮：正常上线，不用管',
        p2: '注册灯慢闪：正在注册中，等2分钟自动连上',
        p3: '注册灯快闪：注册失败，断电重启光猫，不行就打10000',
      },
      '桥接模式': {
        item: '光猫', func: '桥接和路由模式',
        title: '光猫桥接还是路由模式？装维师傅告诉你哪个好用',
        tags: '#光猫 #桥接 #路由模式 #宽带设置',
        p1: '路由模式：光猫自带路由功能，插上就用，适合普通家庭',
        p2: '桥接模式：用自己的高级路由器，需要联系客服改，适合玩家',
        p3: '90%的家庭用路由模式就够了，不用折腾桥接',
      },
    }
  },
  '路由器': {
    topics: {
      '位置摆放': {
        item: '路由器', func: '摆放位置',
        title: '路由器放哪里网速最快？我在3个位置实测给你看',
        tags: '#WiFi提速 #路由器摆放 #宽带小技巧',
        p1: '放墙角：信号被墙挡住一半，隔一个房间只剩1格',
        p2: '放电视柜里：金属和电器干扰，速度直接砍半',
        p3: '放客厅中央：全屋满格，隔两堵墙还能看4K',
      },
      '指示灯图解': {
        item: '路由器', func: '指示灯',
        title: '路由器指示灯全图解：哪个灯闪代表什么',
        tags: '#路由器故障 #WiFi维修 #网络知识',
        p1: '电源灯：常亮正常，不亮=没通电或适配器坏了',
        p2: '互联网灯：常亮已联网，不亮=没插网线或光猫没信号',
        p3: 'WiFi灯：常亮已开启，不亮=WiFi被关了，按后面开关打开',
      },
    }
  },
  '机顶盒': {
    topics: {
      '故障自查': {
        item: 'IPTV机顶盒', func: '故障自查',
        title: '电视看不了？IPTV机顶盒3个常见问题自己搞定',
        tags: '#IPTV故障 #电视看不了 #机顶盒维修',
        p1: '黑屏没反应：检查机顶盒电源灯亮不亮，不亮=换电源线',
        p2: '有画面但卡顿：检查网线插紧了没，重启光猫和路由',
        p3: '显示"无信号"：电视信号源选错了，遥控器按"信号源"切换到HDMI',
      },
      '遥控器配对': {
        item: 'IPTV机顶盒', func: '遥控器配对',
        title: 'IPTV遥控器不好使？3步重新配对就搞定',
        tags: '#IPTV #遥控器 #机顶盒 #实用技巧',
        p1: '按"设置"键3秒进入配对模式，指示灯开始闪烁',
        p2: '靠近机顶盒10cm以内，按"确定"键自动配对',
        p3: '还不行？换新电池再试，可能是电池没电了',
      },
    }
  },
  '宽带': {
    topics: {
      '网速慢自查': {
        item: '宽带网速', func: '慢的原因自查',
        title: '家里网速慢？按这3步自查，90%的问题自己解决',
        tags: '#网速慢 #宽带提速 #WiFi优化',
        p1: '第一步：路由器重启——断电30秒再插上，解决大部分慢问题',
        p2: '第二步：检查WiFi频段——2.4G穿墙强但慢，5G快但穿墙差，手机连5G',
        p3: '第三步：测速判断——用电信官方测速APP，不满速就打10000报修',
      },
      'FTTR体验': {
        item: 'FTTR全屋光纤', func: '实际体验',
        title: 'FTTR全屋光纤到底值不值？我在100平家里实测',
        tags: '#FTTR #全屋光纤 #宽带升级 #电信',
        p1: '客厅：千兆跑满，下载1G电影只要8秒',
        p2: '主卧：隔一堵墙，网速还在900M以上，和客厅几乎一样',
        p3: '卫生间：最远角落，网速还有600M，刷视频完全没问题',
      },
      '网线选择': {
        item: '宽带网线', func: '网线类型选择',
        title: '网线五类六类七类到底怎么选？装维师傅说真话',
        tags: '#网线 #宽带布线 #网络知识 #装维',
        p1: '五类线：100兆宽带够用，十年前的老线，换宽带记得换线',
        p2: '六类线：千兆宽带标准配线，新装修直接用这个，性价比最高',
        p3: '七类线：万兆级别，家庭用不上，多花钱没必要',
      },
    }
  },
  '手机': {
    topics: {
      '信号差排查': {
        item: '手机信号', func: '信号差原因排查',
        title: '手机信号差？别急着换手机，先排查这3个原因',
        tags: '#手机信号 #信号差 #电信 #手机常识',
        p1: '金属手机壳：金属壳屏蔽信号，换塑料/硅胶壳试试',
        p2: '基站覆盖：走到窗口或室外试试，好了说明是位置问题',
        p3: 'SIM卡问题：卡太旧或没插好，去营业厅免费换新卡',
      },
      '5G开关设置': {
        item: '5G手机', func: '5G开关设置',
        title: '换了5G手机但感觉和4G一样快？是不是没开这个开关',
        tags: '#5G #手机设置 #网速 #电信',
        p1: '苹果：设置→蜂窝网络→语音与数据→选"5G自动"',
        p2: '安卓：设置→移动网络→优先网络类型→选5G/4G自动',
        p3: '省电模式会关5G：关闭省电模式或用5G时临时关掉',
      },
      '电池续航': {
        item: '手机电池', func: '续航优化',
        title: '新手机续航崩？3个设置让电池多用半天',
        tags: '#手机续航 #电池 #手机设置 #实用技巧',
        p1: '关后台刷新：设置→通用→后台App刷新→关掉不常用的',
        p2: '降低屏幕亮度：自动亮度打开，或者手动调到40%以下',
        p3: '关5G用4G：5G比4G费电，日常用4G续航多半天',
      },
    }
  },
  '摄像头': {
    topics: {
      '安装位置': {
        item: '监控摄像头', func: '安装位置建议',
        title: '家用监控摄像头装哪里最合适？3个位置最佳',
        tags: '#监控摄像头 #家庭安防 #摄像头安装',
        p1: '门口：对着大门，来人看得清，注意别拍邻居家门',
        p2: '客厅角落：俯拍全屋，放在电视柜上方视野更推荐',
        p3: '阳台/窗前：对着窗户或阳台门，防盗重点区域',
      },
      '夜视设置': {
        item: '监控摄像头', func: '夜视设置教程',
        title: '监控摄像头晚上看不清？3个参数调好就清楚',
        tags: '#监控 #夜视 #摄像头设置 #安防',
        p1: '红外夜视没亮：检查红外灯有没有被遮挡，撕掉保护膜',
        p2: '画面太暗或过曝：调整摄像头角度，避免直对强光源',
        p3: '夜视模糊：擦一下镜头玻璃，或者在附近装个小夜灯',
      },
    }
  },
  'WiFi': {
    topics: {
      '2.4Gvs5G': {
        item: 'WiFi频段', func: '2.4G和5G区别',
        title: 'WiFi的2.4G和5G到底连哪个？90%的人选错了',
        tags: '#WiFi #2.4G #5G #网速提升 #网络知识',
        p1: '2.4G穿墙强信号远，但速度慢干扰多，适合隔墙远的地方',
        p2: '5G速度快干扰少，但穿墙差，适合在路由器同个房间用',
        p3: '最佳方案：手机连5G看视频打游戏，智能家居连2.4G',
      },
      'Mesh组网': {
        item: 'Mesh组网', func: 'Mesh组网教程',
        title: 'Mesh组网3步搞定：全屋一个WiFi名，走到哪都不掉线',
        tags: '#Mesh组网 #全屋WiFi #网络升级 #教程',
        p1: '第一步：主路由连光猫，设置好WiFi名和密码',
        p2: '第二步：子路由放信号差的地方，插电自动配对',
        p3: '第三步：用App检查信号覆盖，调整子路由位置直到满格',
      },
      'WiFi6指南': {
        item: 'WiFi6路由器', func: 'WiFi6选购指南',
        title: '要不要换WiFi6路由器？看完这3点再做决定',
        tags: '#WiFi6 #路由器 #网络升级 #数码评测',
        p1: '如果你家宽带小于300兆：WiFi5完全够用，不用换',
        p2: '如果家里设备多(10台+)：WiFi6多设备并发不卡，值得换',
        p3: '如果打游戏/看4K：WiFi6延迟更低，打排位更稳',
      },
      '信号满格速查': {
        item: 'WiFi信号', func: '信号强度检查',
        title: 'WiFi信号明明满格但网速慢？3个原因最容易被忽略',
        tags: '#WiFi信号 #网速慢 #网络知识 #实用技巧',
        p1: '满格不代表高速：信号强度只看连接质量，干扰多照样慢',
        p2: '邻居WiFi干扰：信道拥堵，进路由器设置换个信道解决',
        p3: '连接设备太多：手机平板电脑抢带宽，关掉不用的设备',
      },
    }
  },
  '流量卡': {
    topics: {
      '套餐对比': {
        item: '流量套餐', func: '大流量卡选择',
        title: '流量不够用？3种加量方案不看亏了',
        tags: '#流量不够 #套餐升级 #电信 #省钱攻略',
        p1: '方案一升档：多花10块流量翻倍，最划算',
        p2: '方案二副卡：单独办个大流量副卡，2张卡分开用',
        p3: '方案三融合套餐：全家共享流量，人均30-50',
      },
    }
  },
};
// ===== topicPool.js =====
// 抖本工坊 · 选题池 v2.8
// ⚠️ 选题文本必须与 t1ScriptFullByPersona / t2ScriptFullByPersona / t4ScriptFullByPersona 的 key 完全一致
// 否则预览会弹"暂无精选脚本"
// 2026-07-25 更新
window.___topicPool = {
  "decision": [
    "宽带选多少兆",
    "FTTR到底值不值得装？用数据说话",
    "套餐怎么选",
    "购机 vs 买裸机，3年算下来谁省钱？",
    "家里WiFi信号差？先别急着换路由器",
    "打游戏用什么宽带？延迟对比实测",
    "全屋WiFi怎么布局？90平/120平/复式方案",
    "家里网络老掉线？先排查这3个原因",
    "老房子没预埋网线怎么办？3种解决方案",
    "租房宽带怎么选？短期vs长期租房攻略",
    "换运营商不换号？携号转网全流程",
    "宽带到期续费还是换套餐？决策树帮你判断",
    "多人合租网络怎么分？3种方案优劣对比",
    "家里有学生上网课，宽带怎么选？",
    "一个人住选什么宽带最划算？100M vs 300M vs 1000M",
    "家庭宽带怎么选？三口之家最优方案",
    "监控摄像头需要什么网络？4G还是宽带？",
    "直播带货用什么网络最稳？选网避坑指南",
    "智能家居需要多大带宽？最少配置清单",
    "电视盒子卡顿？可能是宽带的问题",
    "电信&联通&移动宽带怎么选？全方位横评"
  ],
  "scene": [
    "上门维修",
    "柜台服务",
    "突发状况",
    "温暖瞬间",
    "银发服务",
    "投诉化解",
    "装机故事",
    "老客户情谊",
    "校园迎新",
    "社区营销",
    "政企服务",
    "节日活动",
    "突发事件",
    "公益服务",
    "数字课堂"
  ],
  "review": [
    "信号对比测试 — 5G实测跑分",
    "续航挑战 — 充一次用三天",
    "拍照样张 — 5000万像素实战",
    "光猫对比 — 新款vs老款",
    "路由器排名 — 三款对比实测",
    "千兆宽带实测 — 下载速度",
    "WiFi6 vs WiFi5 — 区别在哪",
    "FTTR光纤 — 全屋覆盖实测",
    "Mesh组网 — 两节点够用吗",
    "电力猫 — 老房子不布线方案",
    "IPTV机顶盒 — 不卡顿设置",
    "全屋WiFi怎么布局？90平/120平/复式方案"
  ],
  "local": [
    "免费贴膜",
    "免费测速",
    "办业务送礼",
    "以旧换新",
    "手机清洁",
    "宽带体验",
    "暑期特惠",
    "社区服务",
    "抖音直播教学",
    "企业宽带义诊",
    "老客户专属回馈",
    "免费WiFi体检",
    "夜场闪购活动",
    "新机体验日",
    "积分兑换好礼",
    "防诈骗公益讲座"
  ]
};
