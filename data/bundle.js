// 抖本工坊 · 核心数据包（首页加载）
// 生成时间: 2026-07-25 17:36:50
// 合并文件: bgmList.js, dailyScripts.js, hotspotData.js, phonePool.js, publish-kit.js, t1Comments.js, t1ImagePrompts.js, t1Presets.js, t1ScriptFull.js, t1ScriptFullByPersona.js, t1ScriptStyles.js, t1Titles.js, t1TopicAliases.js, t2Presets.js, t4Presets.js, techDB.js, topicPool.js
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

// ===== t1ScriptFullByPersona.js =====
window.___t1ScriptFullByPersona = {
  "宽带选多少兆": {
    "sister": "装宽带，你有没有算过这笔冤枉账？最容易被坑的不是选贵了，是选错了兆数。\n\n今早对门小姑娘急吼吼来找我：姐，500兆和100兆差出半年奶茶钱，到底怎么选？我甩给她一张对照——独居刷剧，100兆够用，省下的钱买三杯奶茶不香吗；三口之家直接300兆，孩子网课你追剧不打架；游戏党才得上500兆，不然团战卡成PPT能气到摔手机。\n\n这张对照表你截个图存着，下次办宽带直接掏出来，不纠结。你家电竞少年是不是天天抢网速？评论区告诉我，我帮你算笔账。\n\n拿不准就来南中环电信营业厅，扫码提前约个号，我亲手给你测实测速再定。关注姐，下期教你宽带师傅绝不外传的提速招。",
    "sweet": "宝子们～选宽带千万别闭眼入最便宜的！上次有个姐妹跟我说家里100兆卡得怀疑人生，一查才发现三个人八台设备在抢网。\n\n听我说：一个人住100兆够刷剧，两个人住300兆才不抢网，有孩子的直接上1000兆一步到位。就像买衣服一样，选对码数才舒服～\n\n截图保存这个速度对照表，选宽带的时候翻出来看看，不踩坑！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "直接上数据：100兆宽带理论下行128Mbps，实际跑110Mbps，适合1-2人轻量使用。300兆理论384Mbps，实测350Mbps，同时支持4K+游戏+下载。1000兆理论1Gbps，实测930Mbps，可支撑15+设备并发。\n\n基于实测数据，90%的山西家庭300兆是性价比最优解。100兆的瓶颈期在2台设备同时使用时就显现了，而1000兆对多数家庭明显配置过剩。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论前置：300兆宽带是山西家庭的最优解。\n\n理由有三：第一，100兆在3台以上设备并发时掉包率超15%，影响办公和网课质量。第二，300兆比100兆每月多付40元，但带宽翻了三倍，性价比最高。第三，大部分营业厅现在新装300兆送千兆光猫，一步到位。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！100兆宽带打排位就是在送分！延迟80ms以上，团战必卡。我测了12个宽带用户的数据——\n\n100兆：下载22MB/s，延迟50-80ms，2人同时用开始卡\n300兆：下载35MB/s，延迟30-50ms，4人同时用不卡\n1000兆：下载110MB/s，延迟10-20ms，随便造！\n\n简单说：一个人住100兆够了，合租/情侣上300兆，游戏党直接1000兆，不解释！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n截图保存这个对照，下次办宽带直接掏出来，不纠结！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带装维，有个事我必须掏心窝子说说。去年冬天在坞城路老小区，碰见个着急上火的大哥，家里孩子上网课总卡顿，老爷子追剧老缓冲。一查，三代同堂五口人，十来个设备挤在100兆宽带里，跟早高峰挤公交似的。\n\n我给他画了张图：手机刷视频好比水管流水，100兆就是根细水管。你们家同时开三四个视频，再加俩游戏，就像五六个人同时接水，能不满地溅水花？后来换了300兆，前两天碰见他家孩子买煎饼，非塞给我个加蛋的，说现在抢网速答题终于能进全班前十了。\n\n经验之谈，宽带就像家里用电：独居的100兆够亮盏灯，小两口300兆得开空调冰箱，要是逢年过节一大家子回来，1000兆才撑得住七大姑八大姨的手机平板。建设南路营业厅后头我那工具间，常备着测速仪，谁拿不准就来试试，茶水管够。"
  },
  "FTTR到底值不值得装？用数据说话": {
    "sister": "装FTTR的人，70%都被坑过——我昨天又劝退一个。（先点赞收藏，结尾给你一张「该不该装」自查表）\n\n你家用不用装，就看这3条：① 户型超过90平 ② 隔一堵墙信号就掉一格 ③ 家里有娃上网课或老人视频。三条全中，FTTR是真救星；只中一两条，普通千兆+好路由就够用。\n\n算笔账你就懂：自己买mesh组网至少两三千，用两年换一次，三年下来四五千；咱电信FTTR套餐，三年全包，每月多花不到一杯奶茶钱，全屋千兆还带售后。\n\n评论区扣个「户型+面积」，我帮你看一眼值不值装。下期讲「100平以下千万别装的3个坑」，关注我别丢。\n拿不准来南中环电信营业厅，我帮你现场算。\n这条你截个图存着，办业务前翻出来对着看。",
    "sweet": "宝子们！如果你家是120平以上的大房子，WiFi信号老是房间有格、客厅没格的——FTTR光纤就是你的救星！\n\n普通路由器穿一堵墙信号掉一半，穿两堵墙直接废了。FTTR是光纤直接拉到每个房间，就像每个房间单独拉了一根宽带一样。\n\n90平以内一个千兆路由搞定，不花冤枉钱。120平以上再考虑FTTR～截图对比图，选前看一眼！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "实测数据：普通路由器穿1堵砖墙信号衰减47%，穿2堵衰减72%，掉包率超30%。FTTR光纤到房间方案，每个房间独立光纤接入，信号满格不掉包。\n\n适用场景量化：\n- ≤90㎡：1个千兆路由即可（覆盖半径10m，1-2堵墙）\n- 90-140㎡：AP面板或Mesh组网（2-3节点）\n- ≥140㎡ 或复式：FTTR（每层独立光纤）\n\n评论区报户型+设备数，我逐个回复方案。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：FTTR适合120平以上或复式结构的家庭。\n\n成本对比：90平以内千兆路由器¥200-500，一次性投入。120平以上FTTR月费¥59起含设备租赁，三年总成本¥2124。但全屋千兆覆盖，每个房间信号满格。\n\n建议到厅看实际演示效果，再决定是否值得这笔投入。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n这条值你收藏。下次做决策翻出来直接用。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！家里WiFi信号差先别砸路由器！先看是不是户型问题。\n\n我测过：90平以内，随便一个千兆路由放客厅中间，够了。120平以上，普通路由穿2堵墙直接废——这不是路由的问题，是物理定律。\n\nFTTR就是每个房间拉一根光纤，信号直接满格。最适合大平层、复式、别墅。小户型别花冤枉钱！\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，街坊邻居问得最多的就是\"家里WiFi老断，换啥路由器好使？\"其实啊，十家有九家都不是路由器的事儿。\n\n去年冬天在长风小区给老张家装FTTR，那是个三层复式，他家儿子在二楼打游戏总抱怨460延迟。之前用三个路由器桥接，光猫发热烫手，网速就跟太原冬天的气温似的——说掉就掉。我给他换了全屋光纤，主从光猫直接走暗管穿到每个房间。上个月碰到老张买菜，他拍着我肩膀说：\"现在全家五个手机两个平板同时在线，孩子打游戏再没喊过卡。\"\n\n经验之谈：90平的小户型，买个三百块的千兆路由够你用三年。要是像星河湾那些大平层或者别墅，就别折腾什么子母路由了。我经手过四十七家FTTR改装，光纤到房间的稳定性就跟老面馒头似的——实在。\n\n南中环营业厅往东走两百米，蓝招牌底下就是我。带着户型图来，咱边喝茶边给你算笔明白账。"
  },
  "套餐怎么选": {
    "sister": "98和129的套餐，你猜哪个更费钱？说出来你可能不信——98那个。\n\n上周帮隔壁姐妹算账，98月租98但流量不够，月月超支60，一年白扔720；换成129融合（30G+宽带），反而省出两顿火锅钱。宽带加流量双省，才是真香。\n\n这张账你截图留着，办套餐前翻出来比一比。你月租现在多少？评论区扣个数，超150的我帮你重算。来南中环电信营业厅，扫码发你对比表，两分钟搞定。关注我，下期揭秘5G隐藏彩蛋。",
    "sweet": "宝子们～月费¥59每月十五号就用完了？别买加油包！你看同价位流量翻倍的你都不知道？打开电信App看看套餐用几年了。三年以上的直接来店里换，月费不变流量翻倍。一家人各交各的？来我帮你算家庭套餐，人均¥30封顶还送宽带。\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "数据对比：三年前¥59档含20G+200分钟，当前¥59档含40G+300分钟，性价比提升100%。67%的用户不知道自己的套餐可以免费升级。解决方案：到店免费查套餐使用情况，3分钟出分析报告。\n\n评论区报户型+设备数，我逐个回复方案。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：三年换一次套餐是最优策略。不换每月多付¥30-50加油包，年度多付¥360-600。全家五口月付¥295vs家庭共享¥169，年度省¥1512。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\n这条值你收藏。下次做决策翻出来直接用。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！月费¥59每个月十五号花完？还花30买加油包？一个月实际89！你被套餐坑了三年！同样99现在能买60G。一家人的各交各的295，全家169还送宽带人均30。截图这个店址来店里，帮你看套餐到底能不能省。\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带装维，有个事儿我琢磨不透——为啥大伙儿宁可每月多掏几十块加油包，也不肯花十分钟查查套餐？就上礼拜三下午，南中环菜市场卖猪肉的老张来营业厅交费，我顺手给他打详单，好家伙！128元的5G套餐底下还挂着两个15元流量包，手机屏都划出火星子了也不敢关，怕孙子看动画片卡顿。我给他换成158元全家享，流量翻倍不说，还能绑三台设备。老张攥着刚退的180块话费券直嘬牙花子：\"早两年遇见你就好了！\"  \n\n各位街坊听我句经验之谈：运营商套餐就像秋裤，天热了就得换薄的。带着身份证来南中环营业厅，我老李用这套测速仪给你现场比对，哪家划算用哪家。要觉得管用，给师傅捎包烟就成。"
  },
  "购机 vs 买裸机，3年算下来谁省钱？": {
    "sister": "今天说个实在的，买裸机还是合约机这事儿90%的人都算错了。一台裸机五千多吧？再搭上百十块的月租，三年奔着一万去了。但你要是办电信合约机，手机补贴完两千出头，套餐虽然贵一档，可算上话费返还，三年反而能省两千。这账明白了吧？手机店可不会给你算这笔账。南中环营业厅找姐，手把手帮你理清楚。\n\n我说的这组数你记牢，别转头就忘。\n关注我看下期，接着聊这个话题。\n你家是啥情况？评论说说，我帮你参谋。\n我说的这组数你记牢，别转头就忘。",
    "sweet": "宝子们想换手机预算有限？裸机2999一次付清，购机首付999以后每月交话费三年共2880。还送耳机充电宝！有旧手机以旧换新最高抵1000，半价换新手机。截图保存这个对比买手机前翻出来看。\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你最近也为这事发愁吗？评论区说说我帮你。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "数据对比某款2999机型：方案A裸机一次性2999三年总成本2999+话费。方案B购机首付999含话费流量三年总支出2880省119。方案C以旧换新旧机折价300-800+补贴200-600=最高抵1000。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：购机三年内最优。财务分析首付999+月付80=三年2880比裸机2999省119。以旧换新折扣力度最大可达1000。截图分析到店专人办理。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\nROI算清楚了。截图发给老板，明天就能省。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们换新机预算紧？裸机2999直接劝退。购机首付999月费含流量话费三年共2880，省了119还送耳机。最狠的是以旧换新旧手机拿来折价加补贴最高抵1000，半价换新。截图方案到店说兄弟介绍的。\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n评论区扣1，我看多少人中招了。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，帮客户算过不下500部手机的账。去年冬天有个老哥非跟我杠，说买裸机肯定划算，结果把他那部用裂屏的旧手机往柜台一搁——您猜怎么着？购机价直接抵了800，套餐费再打个七折，三年下来比单买裸机少花1200多。我拿计算器当面给他按了三遍，这老哥最后拎着新手机还非要塞给我包玉溪。说实在的，像建设南路那家华为店里的以旧换新，现在连充电器折价都算，前两天刚给个外卖小哥旧机子抵了1000整。你们要信我这二十年经验，绑购机就跟买菜认准老摊位一个理儿。西华苑营业厅拐角第二间，我这紫砂壶天天泡着茶，谁来都给你用A4纸列个明细账。"
  },
  "家里WiFi信号差？先别急着换路由器": {
    "sister": "上周帮8个邻居看WiFi问题，7个都没必要换路由器。姐，网速卡真不一定是机器老化了——你家电冰箱微波炉是不是跟路由器挤一块儿了？金属柜子挡着没？八成问题就在这儿。墙多的户型可以把路由器支棱高点，躲开电器干扰，再进后台挑个冷门信道。要是客厅信号满格，卧室死活连不上，直接打电话约电信工程师上门，他们带着检测仪能找出信号死角，单补一个放大器可能就比换全套省两百多。营业厅就在菜市场斜对面，随时来问都行。\n\n这个表你收好，下次直接照着办。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们WiFi信号差先别急着买新路由器！600块可能白花了！路由器放角落的先挪到客厅中间高处。旁边有微波炉电视机的挪开30厘米。都试了还不行再换WiFi6路由200。截图保存这个步骤WiFi卡了先看再买。\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "路由器在封闭空间信号衰减60-80%。5cm内有金属物时2.4GHz干扰提升45%。正确方案：房屋几何中心离地1-1.5米远离金属30cm以上。此方案提升全屋覆盖率至85%。仍不满足换WiFi6千兆路由器200-500。截图此摆位标准到店对比。\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论WiFi信号差90%是位置问题。先确认位置客厅正中高出地面远离金属0成本通用于90%家庭。其次确认年龄5年以上换WiFi6两百解决。最后确认干扰微波炉蓝牙。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\nROI算清楚了。截图发给老板，明天就能省。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们WiFi卡先别砸路由器！上次兄弟花600买了最贵的新路由还是卡。我看一眼塞电视柜里还挨微波炉。拿出来放客厅中间马上满格。放中间放高处远离电器。都试了还不行再换WiFi6路由200顶配了。截图这个原则说什么换路由先看看。\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n评论区扣1，我看多少人中招了。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，十回有九回客户喊WiFi卡，一进门就看见路由器蹲在电视柜最底层，跟微波炉、鱼缸挤成一团。去年春天有个老哥，花六百多换了最新款路由器，结果网速还没他老伴跳广场舞利索。我把他家那个“路由器监狱”拆开，把机器挪到客厅花架上——您猜怎么着？三格信号直接拉满，老哥举着手机满屋跑测试，乐得跟孩子似的。\n\n经验之谈：金属电器、鱼缸水族箱这些玩意儿都是信号杀手。我常跟客户说，你先试试把路由器从墙角旮旯请出来，放客厅正中间的高处，就像给自家WiFi盖个瞭望塔。要是还不行，您带着户型图来南中环营业厅找我，我拿信号检测仪给您屋里走一圈。二十年摸过的路由器比你们小区住户都多，这经验不白给。"
  },
  "打游戏用什么宽带？延迟对比实测": {
    "sister": "是不是每次团战关键时刻就给你整460？看着队友骂街自己还委屈，明明百兆宽带测速贼快，偏偏游戏里卡成PPT。上周帮个暴躁老妹测了下，同一部手机换电信宽带，延迟直接从68ms降到21ms——就这么邪乎。  \n为啥电信打游戏稳？人家服务器有专属VIP通道，数据不绕远路。你那宽带看着带宽大，晚上一扎堆上网就堵车，电信这条道全天畅通。  \n现在那妹子天天安利队友换宽带，上分速度都赶上她吐槽的手速了。南中环营业厅测速器现成的，卡不卡一测就知道。\n\n这份对照你拍下来，临场不用抓瞎。\n关注我，后面专门讲更多门道。\n你家是啥情况？评论说说，我帮你参谋。\n这条你截个图存着，办业务前翻出来对着看。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们你男朋友打排位总卡？100兆延迟50-80ms团战必卡。300兆延迟30-50ms打排位稳如狗。千兆延迟10-20ms职业级体验。截图发给男朋友他看了会感动。\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "实测对比山西电信N=50户：100兆延迟50-80ms轻量浏览。300兆延迟30-50ms适合90%游戏。千兆FTTR延迟10-20ms电竞级。建议游戏玩家至少300兆。截图此数据表到店挑套餐。\n\n评论区报户型+设备数，我逐个回复方案。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论游戏玩家首选300兆预算充足上千兆FTTR。100兆59月只能轻度游戏。300兆99月多花40月体验质变。千兆169月多花110月延迟10ms。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\n有疑问直接评论区，我回邮件快的。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们打排位延迟460不是你的问题是宽带的问题！100兆打王者等于送分！300兆延迟30从黄金到钻石一周的事。千兆FTTR延迟10职业选手水平。截图这个对比表到店办游戏宽带送加速器。\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带安装，南中环这片儿谁家打游戏卡顿我一耳朵就能听出门道。上回有个穿红球衣的小伙子蹲营业厅门口抽烟，脚边键盘都摔缺个角——跟我当年在城中村装宽带遇到的街机少年一模一样。100兆单跑游戏是够用，可您家那口子追《狂飙》4K高清，孩子刷着特效拉满的短视频，三台设备同时跑数据，就跟早高峰挤地铁似的。那小伙子换了300兆套餐后特意拎着西瓜来谢我，说现在团战放大招再没卡成ppt。经验之谈：您先瞅瞅电视柜底下摞着几个机顶盒，餐桌旁还亮着几台pad，这比看广告牌上写的速率实在多了。要拿不准，带着设备来南中环旗舰店，我拿测速仪给您现场跑分。老手艺人不玩虚的，机箱上这层灰都比那些网红客服的工龄厚。"
  },
  "老人手机套餐怎么选？3款适老套餐对比": {
    "sister": "上周营业厅里，一位阿姨攥着话费单直叹气。老伴总担心流量用超，连视频都不敢接孙子电话。其实很多老人根本用不着高价套餐，今天给你们比三款实惠的：孝心卡29元，2G流量加100分钟，基础通话够用了；59元的畅享卡流量是多，但老人刷不完10G纯浪费；最推荐39元亲情卡，绑三个号码随便打，3G流量够视频聊天。你们算算，光通话费一年就能省下好几百。老人家手机屏小、手指慢，那些花哨功能真不如省下钱买斤排骨实在。\n\n这条你截个图存着，办业务前翻出来对着看。\n点个关注，系列里还有更多避坑招。\n你遇到过这情况没？评论区聊聊。",
    "sweet": "宝子们～给爸妈换手机别光想着买贵的！套餐选不对，爸妈一个月白花好几十！\n\n老人家用手机就三件事：微信视频、刷抖音、打电话。一个月2-3G流量足够了，大流量包纯属浪费。电信有适老孝心卡，19块含2G流量+100分钟通话，还送防诈骗提醒和免费体检。\n\n赶紧收藏这篇，周末带爸妈来营业厅查套餐，不合适当场换！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你是不是也遇到过呀？评论区聊聊～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "数据显示：山西电信老年人智能手机用户月均流量消耗1.8-3.2G（2026年Q2数据），以微信、抖音极速版、新闻类App为主。三款主流适老套餐对比：\n\n电信孝心卡：¥19/月，2G流量+100分钟+防诈骗+免费体检\n移动孝亲卡：¥25/月，3G流量+150分钟\n联通银龄卡：¥29/月，5G流量+200分钟\n\n结论：轻度使用选孝心卡¥19，性价比最优。建议到厅办理。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论前置：老人套餐选19元档最合理。\n\n分析：老年用户月均消耗流量不到3G，通话不超过150分钟。¥59以上大流量套餐80%的流量浪费。推荐电信孝心卡¥19/月，含2G流量+100分钟+防诈骗和体检增值服务。\n\n优化方案：带父母到营业厅查询当前套餐使用情况，3分钟出分析报告，现场办理。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n\n这条值你收藏。下次做决策翻出来直接用。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！给爸妈换套餐看我这条就够了！\n\n老人家用流量真的很少——微信刷抖音看新闻，一个月撑死3G。你给他们办59的大流量套餐，等于每月扔几十块进水里。\n\n我推荐电信孝心卡19块，2G+100分钟，还送防诈骗和免费体检。实用不浪费！\n\n截图发给爸妈，周末带去营业厅换了，省下来的钱给爸妈买点好吃的！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，见过太多老人用着贵套餐却只打个电话。去年冬天在坞城路营业厅，帮80岁的王大爷查账单，他拿个2000块的智能手机，每月交79块钱套餐费，可连2G流量都用不完。儿子给买了好手机，可套餐还是五年前儿子上学时办的——这钱花得我看了都心疼。\n\n我信我的经验，老人用电信孝心卡最实在。19块月租，2G流量够刷视频看新闻，100分钟通话能跟子女唠够本。上回给李奶奶办完这卡，她专门拎着自家腌的酸菜来谢我，说闺女视频时再也不卡了，还夸那个防诈骗提醒帮她挡了两次骗子电话。\n\n不吹不黑，现在老人套餐花样多，但咱得看实际需求。您家里要是有老人还用着高价套餐，抽空带来南中环营业厅，我拿测速仪给您现场比对。横竖都是免费查，能省则省才是硬道理。"
  },
  "学生套餐怎么选？4款热门横向对比": {
    "sister": "姐，您给孩子看学生套餐呢？来来来咱坐下说——这四款最火的我都门儿清！您看头一款19块，30G通用流量干干净净，自己用着最省心；第二款29块看着送视频会员挺诱人，可通用流量才5G，刷两下就没了；要说第三款39块100G是挺唬人，但校园外直接限速成乌龟爬，这不是变相坐牢嘛！最坑是59块送宽带那个，一签就是两年卖身契，不用也扣钱。要我说啊，19块这款最实在，九成学生都够用。记着姐，选套餐别看虚的，通用流量和合约期限才是命根子！拿不准随时来南中环找我~\n\n这份对照你拍下来，临场不用抓瞎。\n关注我，后面专门讲更多门道。\n你家是啥情况？评论说说，我帮你参谋。\n拿不准来南中环电信营业厅，我帮你现场算。\n我说的这组数你记牢，别转头就忘。",
    "sweet": "宝子们～上大学前第一件事就是换套餐！别再用家里的老套餐了，流量根本不够用！\n\n校园卡学生专属了解一下：39块一个月30G，刷剧打游戏随便造，放假回家全国流量不涨价。普通套餐59才20G，直接省出一杯奶茶钱。\n\n快收藏这篇，开学前来营业厅换上校园卡！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "数据对比（2026年6月山西电信校园套餐数据）：\n\n校园39套餐：¥39/月，30G全国流量+200分钟通话+4张手机卡共享\n校园59套餐：¥59/月，60G全国流量+500分钟通话+校园宽带\n普通59套餐：¥59/月，20G全国流量+300分钟通话\n\n性价比排序：校园39 > 校园59 > 普通59。校园套餐比同价位普通套餐流量多50%-200%。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：学生套餐选校园39/59档。\n\n分析：校园39性价比最优（¥39/30G/200分钟），月均¥1.3/G。校园59适合重度用户（¥59/60G/500分钟+宽带）。对比普通套餐，同价位流量翻倍。\n\n建议：在校生持学生证到厅办理，无需学生证也可凭身份证办理。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\n这条值你收藏。下次做决策翻出来直接用。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！升学的第一件事不是买手机，是换套餐！\n\n你在家用爸妈的融合套餐无所谓，但出去上大学呢？流量一个月不到10G分分钟超。\n\n校园卡39块30G，打游戏刷剧发朋友圈随便用，还能办4张副卡跟室友一起摊。不比你在外面买59才20G的香？\n\n截图存了，开学前去营业厅办了再说！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，一到开学季营业厅就跟赶集似的。去年有个太原老哥，儿子考上西安交大，非得给孩子办199的冰淇淋套餐，说贵的好。结果孩子第一个月话费超了八十多——大学教室宿舍都有WiFi，套餐里500分钟通话根本用不上。\n\n我信我的经验，学生用39块校园套餐最实在。南中环这边理工大的学生，十个有七个用这个。30G流量刷网课够使，200分钟通话跟家里报平安刚好，省下钱买排骨不香吗？宿舍开黑打游戏的，校园59套餐给60G流量还捎带条宽带，路由器往床头一插，四个人平摊下来比网吧划算。\n\n这阵子柜台抽屉里备着改锥，好些家长带孩子来办卡，顺道让我帮着调手机APN。要办趁这两天，等开学那周队能排到电梯口。我就在南中环营业厅玻璃房工位，穿蓝工装戴老花镜那个就是，来了提抖音刷到的，我给你挑个靓号。"
  },
  "流量不够用？5种加量方案帮你选": {
    "sister": "（突然举起手机屏幕）看到这个流量警报没...你以为只是提醒？其实它在偷偷扣你钱！（停顿）\n\n流量不够用的人 90%都选错套餐了（放大手机）看这5种加量方案：日包周包月包 升级档 还有个隐藏的翻倍包...刷剧狂人？翻倍包9块拿30G 比单买日包省一百（翻转手机）\n\n现在知道为什么总不够用了吧…（突然靠近镜头）你用的哪种？南中环电信营业厅找我 帮你挑最省的那个——（画面突然切黑）\n\n划重点——上面这几点你存手机里随时看。\n关注我，后面专门讲更多门道。\n你遇到过这情况没？评论区聊聊。\n这几条你存着，比记脑子靠谱。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～每个月后半段就靠加油包续命的看过来！\n\n一个月花30买加油包，一年就是360，够买支口红了。不如直接换个套餐，多加10块流量翻倍不香吗？\n\n流量不够的5种解法：方案一升档最划算；方案二办个大流量副卡；方案三用WiFi时关流量；方案四App省流模式开起来；方案五全家共享流量。\n\n截图保存，下次不够用了翻出来看一眼再决定要不要加油包！\n\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你最近也为这事发愁吗？评论区说说我帮你。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "数据分析（山西电信2026年Q2）：月流量超支用户平均超支3.2G，月均加油包支出¥28-45。五种方案成本对比：\n\n方案一：套餐升档，¥10-20/月，增加20-40G，性价比最高\n方案二：大流量副卡，¥10/月，20G独立流量\n方案三：WiFi自动切换+数据关闭，¥0/月\n方案四：App省流模式（抖音/微信等），节省15-30%\n方案五：家庭融合套餐，人均¥30-50，全家共享100G+\n\n建议：优先方案一或方案五，长期成本最优。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：套餐升档或融合套餐是流量不够的最佳解。\n\n分析：月加油包¥30×12=¥360/年。升档每月多¥10-20，年多¥120-240，省¥120-240。融合套餐全家共享，人均成本更低。\n\n有疑问直接评论区，我回邮件快的。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！每个月后半段省着用流量是不是你！\n\n加油包30块5G？你算算一年360打水漂！直接升个档多10块拿20G不比加油包香几百倍？\n\n流量不够的5条路：升档＞融合套餐＞副卡＞省流模式＞换WiFi。升档就是最直接的，多10块享受翻倍！\n\n截图保存，下个月流量不够的时候看一遍再买加油包！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，见过太多人抱怨流量不够用，其实很多都是套餐和实际用量对不上号。上个月在坞城路营业厅，碰见个开小超市的王老板，老主顾了，抱着个屏幕碎成蜘蛛网的旧手机来，说每个月59套餐加40多块流量加油包还是老断网。我把他这半年用量记录调出来一看——好家伙！平均每月42G，峰值能冲到58G。当场给他换了99套餐60G流量，这都过去三周了，昨天还专门给我发微信说现在刷监控录像都不卡了。  \n\n经验之谈啊，现在很多人还守着三年前的套餐，像穿小鞋似的硬撑。我信我的经验：流量就像裤腰带，要紧但是不能勒。各位要是拿不准用量，随时来南中环营业厅，我柜台抽屉里常年备着核桃酥——边吃边给你查半年用量记录，不花冤枉钱的方案当场算给你看。觉得在理的，路过柜台敲两下我的老茶缸就行。"
  },
  "全屋WiFi怎么布局？90平/120平/复式方案": {
    "sister": "哎我跟你说个事儿，前天遛弯碰见隔壁李婶，愁眉苦脸说家里WiFi跟闹脾气似的，客厅刷剧挺溜，一到卧室就卡成PPT。我一听就乐了——这不典型的路由器没摆对嘛！90平房子，路由器塞电视柜后头跟蹲监狱似的，信号能好才怪。挪到餐厅吊灯下边，立马满血复活。要是120平大户型，单枪匹马肯定罩不住，得安排一主一从俩路由，像打配合的姐妹花，全屋溜达不断网。复式更得讲究，装修时就得埋好网线，每个屋装面板AP，跟镶在墙上的小太阳似的。诶你们家电工要是整不明白，南中环电信营业厅拐进来，姐给你画个布线图。\n\n我说的这组数你记牢，别转头就忘。\n关注我，后面专门讲更多门道。\n你家是啥情况？评论说说，我帮你参谋。\n这个表你收好，下次直接照着办。",
    "sweet": "宝子们～家里WiFi有房间信号差的看过来！不是路由器的问题，是布局不对！\n\n90平以内的房子一个千兆路由放客厅中间足够了。120平左右的装个Mesh组网，两个小盒子搞定全屋。复式或者大别墅就直接上FTTR光纤到每层楼。\n\n截图保存这个布局指南，装修前翻出来看看，省了走明线的头疼！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "户型WiFi覆盖解决方案（实测数据）：\n\n≤90㎡：1个WiFi6千兆路由 ¥200-400，覆盖半径8-12m，穿2砖墙后信号衰减≤50%\n90-140㎡：Mesh组网(2-3节点) ¥400-800，无缝漫游，全屋信号≥-65dBm\n≥140㎡/复式：FTTR光纤到房间 ¥59-99/月，每个房间独立光纤，信号满格\n\n建议：按户型截图对照，到厅咨询工程师推荐最优方案。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：WiFi布局方案按户型选，不花冤枉钱。\n\n方案A(≤90㎡)：千兆路由 ¥200-400，一次性投入\n方案B(90-140㎡)：Mesh组网 ¥400-800，三年均摊¥11-22/月\n方案C(≥140㎡)：FTTR ¥59-99/月，含设备无需自购\n\n建议到厅看实际演示效果，按需选择。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n有疑问直接评论区，我回邮件快的。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！家里WiFi有房间收不到信号的看过来！\n\n90平以内：一个千兆路由放客厅当中，完事。\n120平左右：Mesh组网，两个盒子装客厅和走廊。\n复式大平层：直接上FTTR，每个房间拉光纤，不折腾。\n\n截图保存，装修布线的时候翻出来看看，省得后面走明线丑死！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，给不下500户人家调过WiFi，最常被问的就是全屋覆盖怎么弄。上周在长风街老小区给一家90平的两室调网，业主非要花2000多买电竞路由器，我一看户型就乐了——客厅电视柜旁边摆个300块的普通路由，实测每个角落网速跑满。  \n\n120平以上就别硬撑了，去年丽华苑那家三室，女主人天天抱怨厕所刷不了剧。给她装了俩Mesh子母路由，一个放书房博古架顶上，一个塞客厅花瓶后头，现在阳台浇花都能4K直播。  \n\n复式别墅最麻烦，迎泽西大街那家美容院老板非说穿墙王够用。结果二楼VIP室客人老掉线，最后走暗管铺了光纤，每个房间甩个小白盒，连负一层的SPA房都满格。  \n\n不吹不黑，先拿卷尺量户型，再决定掏多少钱。南中环营业厅二楼找老张，拎上户型图我帮你比划——反正晌午这会儿我都在，顺便蹭杯你的茶喝。"
  },
  "家里网络老掉线？先排查这3个原因": {
    "sister": "一到月底就开始有人来找我，说家里WiFi跟闹脾气似的，刷个剧卡成PPT，打游戏直接掉线。其实啊，先别急着报修，自己就能查这几个地方。\n\n看看路由器是不是被关禁闭了。那些藏在电视柜后头、弱电箱里的，信号都闷坏了。搬出来放客厅中央，网速能快一半。\n\n再捏捏网线头。发黑生锈的接头像老化的血管，换个新线也就奶茶钱的事。\n\n最后打开路由器后台数数，现在谁家不是十几台设备抢网啊。五年前的老古董路由器，哪儿扛得住这么多手机平板智能家电折腾？该换就得换。\n\n要是这三板斧还不管用，咱们再细查。我在南中环电信厅，带着路由器来，姐给你把把脉。\n\n这几条你存着，比记脑子靠谱。\n记得来看下期，我接着给你支招。\n你家是啥情况？评论说说，我帮你参谋。\n拿不准来南中环电信营业厅，我帮你现场算。\n这份对照你拍下来，临场不用抓瞎。",
    "sweet": "宝子们～家里网络老掉线的别一上来就骂运营商！先排查这三步：\n\n第一步：路由器旁边有没有微波炉冰箱电视机？有的话挪开30厘米以上。\n第二步：路由器是不是塞在柜子里或者角落里？拿出来放高处。\n第三步：光猫指示灯看一下，不正常的话拍下来。\n\n这三步解决80%的掉线问题！截图保存，掉线了先看一遍！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你最近也为这事发愁吗？评论区说说我帮你。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "网络掉线问题诊断指南（基于500+案例统计）：\n\n物理干扰占比52%——路由器30cm内存在金属/微波炉等，2.4GHz干扰提升45%以上\n散热问题占比23%——路由器/光猫在封闭空间，温度>45°C导致性能下降\n线路老化占比15%——光猫到入户光纤接口接触不良\n运营商侧占比10%——区域光衰或维护\n\n自行排查前三项可解决90%问题。未解决建议到厅报修。\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：90%家庭掉线问题可自行排查。\n\n排查步骤：1. 路由器拿到开阔位置，远离金属/电器（解决52%问题）2. 检查散热通风（解决23%问题）3. 检查光猫指示灯，红灯说明信号异常（解决15%问题）\n\n截图存上，网络出问题先自己查一遍，省得白跑一趟。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！打团掉线的看过来！不是电信的问题是你家的问题！\n\n第一，路由器旁边有微波炉冰箱？挪开！电磁干扰懂不懂！\n第二，路由器塞柜子里了？拿出来！憋坏了当然掉线！\n第三，光猫灯是不是红了？红了打10000！\n\n这三个排查能解决90%掉线问题。自己先试试，别动不动骂运营商——有时候真是你自己家的问题！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n截图保存这个对照，下次办宽带直接掏出来，不纠结！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带装维，南中环这片儿三千多户的网络都是我亲手调的。昨儿还碰见老李头家，路由器跟微波炉摞一块儿，一热饭全家就断网——这毛病我闭着眼都能闻出来。\n\n你们猜怎么着？前年供电局家属院那单更绝。王老师把路由器塞电视柜夹层里，散热孔堵得严严实实，大夏天摸着都烫手。我直接搬个小马扎坐那儿，等路由器凉透了再开机，当场就好了七八成。\n\n经验之谈啊，查网络先摸三处：一看路由器是不是跟家电扎堆，二摸外壳烫不烫手，三瞅瞅天线是不是让绿萝给缠住了。上个月解放路那家修洗衣机的张老板，就是被鱼缸反射信号坑的，挪开半米网速直接翻番。\n\n要还不行，带着路由器来店里。我这老联想笔记本装着信号测试仪，二十年攒的故障代码库比新华字典还厚。街坊们都知道，修不好我不收茶钱。"
  },
  "老房子没预埋网线怎么办？3种解决方案": {
    "sister": "王姐昨天拍我桌子：我家老房子没埋线，是不是得砸墙？我乐了——谁说非要砸。\n\n三招无损搞定：隐形光纤贴踢脚线走，千兆满速，李阿姨用了半年还夸；Mesh摆俩小白盒，厕所刷剧都满格；电力猫插插座就用，但老线路超15年慎用。选哪种看两点：墙厚不厚、钱包鼓不鼓。\n\n这三招你截图存好，照着选准没错。评论区说说你家墙多厚，我帮你挑。来南中环电信营业厅找红马甲姐，扫码预约，免费测户型。关注我，下期教你怎么砍价办千兆。",
    "sweet": "宝子们～老房子没预埋网线想装宽带怎么办？别愁！三种方法帮你搞定：\n\n方案一电力猫：插插座就行，适合小户型。方案二Mesh无线组网：不用打孔穿墙，90-120平够用。方案三FTTR隐形光纤：透明光纤沿墙角走，几乎看不出。\n\n截图保存这三个方案，老房子装宽带不纠结！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你是不是也遇到过呀？评论区聊聊～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "老房子无预埋网线的三种方案对比：\n\n方案A电力猫：利用电力线传输，理论速率600Mbps，实际200-400Mbps，受电路质量影响。适合≤80㎡，布线成本¥100-300。\n方案B Mesh无线组网：无线回程，理论速率1200Mbps，实际500-800Mbps。适合90-140㎡，成本¥300-800。\n方案C FTTR隐形光纤：光纤沿踢脚线敷设，千兆满速，成本¥59-99/月含设备。\n\n建议到厅咨询工程师，免费上门勘测后推荐方案。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：老房子装宽带走FTTR隐形光纤最优。\n\n方案对比：电力猫¥100-300一次性，但受电路干扰大。Mesh组网¥300-800，适合中等户型。FTTR隐形光纤¥59-99/月含设备，千兆满速且不影响美观。\n\n从长期体验看，FTTR隐形光纤性价比最高。建议\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！老房子没预埋网线就不能装宽带了？谁说的！\n\n方案一电力猫：插电就能用，适合一个人住的小户型。方案二Mesh组网：无线连，不用打孔，合租房必备。方案三FTTR隐形光纤：透明光纤沿墙角走，看不出来，千兆满速。\n\n老房装宽带方法多得是，截图存了来店里咨询！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n评论区扣1，我看多少人中招了。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，老房子布线那点事儿门儿清。去年在杏花岭区给个八十年代的筒子楼装宽带，业主王大爷叼着烟卷直嘬牙花子：\"小同志啊，我这墙里可没埋线，你们那些钻墙打眼的招数可不行！\"您猜怎么着？最后用隐形光纤从他家那台老牡丹缝纫机后头走线，顺着踢脚线绕到书房，老爷子愣是没找着线在哪儿。\n\n要说老房改造网线，我信我的经验：小户型您就使电力猫，电视墙插座一插，连上机顶盒就能用，不破坏装修还省钱。家里要是三室两厅，两个Mesh路由往客厅和卧室衣柜顶上一摆，穿两堵墙照样满格信号。最讲究的还是FTTR隐形光纤，线细得跟蜘蛛丝似的，拿热熔胶往踢脚线上一贴，连您家那只会逮耗子的狸花猫都发现不了。\n\n不吹不黑，上个月刚给柳巷的旗袍裁缝铺子装完，七十平的老店面跑起千兆宽带嗖嗖的。您要拿不准主意，带着户型图来南中环营业厅，我拿测线仪给您现场比划——放心，老师傅看现场不收钱。"
  },
  "租房宽带怎么选？短期vs长期租房攻略": {
    "sister": "今天说个实在的，租房宽带这事儿90%的人都花冤枉钱。短租三五个月别签长合约，电信有按月交的短期宽带，随时停不扣钱。或者直接用流量卡+小宽带，搬家拔腿就走。长租一年以上直接办融合套餐最划算，宽带免费用还包话费流量，每月能省几十块，攒一年够吃顿火锅。对了，装机前先问房东有没有电信端口，别等师傅白跑一趟。南中环电信营业厅这儿能帮你细算账，来之前打个电话就行。\n\n这个表你收好，下次直接照着办。\n你家是啥情况？评论说说，我帮你参谋。\n关注我，后面专门讲更多门道。",
    "sweet": "宝子们～租房子宽带怎么选？别乱花钱！\n\n短租半年的选短期宽带套餐，59块300兆灵活不绑定。长租一年以上的办正常套餐，送路由器更划算。最重要的是——电信宽带移机免费，搬家宽带跟着走，不怕浪费！\n\n截图保存，租房选宽带翻出来看看！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "租房宽带方案数据对比：\n\n短租方案（≤6个月）：短期宽带¥59/月，300兆，灵活合约到期可退。\n长租方案（≥12个月）：融合套餐¥99/月，500兆+手机卡30G流量，送千兆路由。\n移机服务：山西省内免费移机，支持跨市搬迁，原套餐不变。\n\n建议按租期选择，短租不绑定长租更划算。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：租房宽带按租期选方案最划算。\n\n分析：短租6个月内选短期宽带¥59/月，无违约金。长租1年以上选融合套餐¥99/月，含宽带+手机流量+路由器，性价比更高。移机免费，搬家不受影响。\n\nROI算清楚了。截图发给老板，明天就能省。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！租房宽带怎么选？别被忽悠签三年合约！\n\n短租半年的：办短期宽带59块300兆，到期就退，不跟你啰嗦。\n长租一年以上的：办融合套餐99块，宽带+流量+送路由器，划算。\n\n而且电信移机免费，搬家宽带跟着走，不怕浪费。截图存了去办！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，南中环这一片的出租房我闭着眼都能数出宽带接口位置。上周帮后生小李解决问题，小伙子租了个半年短租房，图便宜装了个野路子宽带，结果晚上打游戏卡得直拍大腿。要我说啊，短租的兄弟们直接办电信短期乐享套餐，像咱老面馆的月票一样灵活，到期拍屁股走人不用扯皮。\n\n长租的讲究就多了。去年给锦绣家园的王婶装网，老太太儿子在外地，非得视频看小孙子。我直接给她推了全家享融合套餐，送的路由器还是千兆的，手机卡给儿媳妇当副卡用——您猜怎么着？前天碰见老太太拎着韭菜盒子谢我，说现在连孙子喝奶呛着都能看清。\n\n记得重点：宽带就跟咱的铺盖卷似的，电信移机免费给你打包带走。别学隔壁老刘，图省事用杂牌宽带，搬家那天发现接口不对版，急得在楼道转圈。我这柜台抽屉里常年备着测速仪，来南中环店喝口茶功夫，我给您测测房间信号死角在哪。二十年经验摆这儿，您琢磨琢磨是不是这个理？"
  },
  "换运营商不换号？携号转网全流程": {
    "sister": "上周帮8个姐妹办携号转网，6个都不知道能退话费余额！来，姐掰开揉碎了说：第一步发CXXZ到10086查资格，合约机宽带绑着的得先解约；第二步拿授权码的时候，千万记得让原运营商退余额；第三步带身份证+授权码来新运营商办入网。电信现在128套餐送3个月视频会员，要不要来南中环营业厅找我比比价？这羊毛不薅白不薅。\n\n这条你截个图存着，办业务前翻出来对着看。\n点个关注，系列里还有更多避坑招。\n你遇到过这情况没？评论区聊聊。",
    "sweet": "宝子们～套餐太贵又不想换号的看过来！携号转网了解一下！\n\n手机号不变，运营商随便换。三步搞定：第一步发短信查资格，第二步去现运营商拿授权码，第三步来电信营业厅选套餐。全程不超过半小时！\n\n截图存好，想转网的时候翻出来看，不麻烦！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "携号转网技术流程：\n\n前置条件：手机号实名且无在网合约限制。\n操作步骤：\n1. 编辑短信\"CXXZ#姓名#身份证号\"发送至当前运营商客服号，查询转网资格\n2. 如符合条件，编辑\"SQXZ#姓名#身份证号\"申请授权码\n3. 携带身份证+授权码到新运营商营业厅办理\n\n注意事项：授权码有效期60分钟；转网后当月话费按天折算。到厅可一站式协助办理。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：携号转网三步搞定，不换号换运营商。\n\n流程：发短信查资格→申请授权码→到厅办理，全程约30分钟。转网后套餐可按需选择，比原套餐更划算。\n\n建议先到厅咨询当前最优套餐，对比后决定是否转网。截图流程到店办理。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！想换运营商又舍不得手机号的看过来！携号转网三步搞定——\n\n第一步发CXXZ到10001查资格。第二步去营业厅拿授权码。第三步来电信营业厅选套餐。全程不到半小时！\n\n别再因为舍不得号被老套餐坑了，截图办了！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，见太多人为了换运营商被老号码绑住手脚。去年有个开小超市的赵大姐，被原套餐多收了两年冤枉钱，就卡在\"舍不得用惯的号码\"上。其实啊，携号转网这事就像给老房子换新水管——号码还是那个门牌号，里头的服务咱能换成更实惠的。\n\n具体怎么办？我手把手教过不下两百号人：先掏出手机编短信\"CXXZ#姓名#身份证号\"发到10086（移动为例），30秒内就知道符不符合条件。记得去年帮退休教师老李操作时，他原运营商柜台上那盆绿萝都蔫了——等他们出授权码确实得耗会儿功夫。带着这串数字来咱们电信营业厅，新套餐任选，最多半小时连号码带服务全迁移妥了。\n\n南中环营业厅靠窗第二个工位总摆着茉莉花茶，来查资格的老街坊我都给泡一杯。省下的套餐钱够买半年茶叶，这账你得会算。"
  },
  "宽带到期续费还是换套餐？决策树帮你判断": {
    "sister": "是不是一到宽带续费就头大？续吧怕多花钱，换吧又怕踩坑…（停顿）其实判断超简单——掏手机看看你家每月账单！  \n\n像上周我帮个小姐姐算账，她家两条手机号+单宽带，每月190多。后来换成189的千兆融合套餐，全家流量通话全包，宽带还提速200M，一年直接省出两顿火锅钱（笑）  \n\n重点看三点：家里几口人？刷视频多不多？有没有孩子上网课？把这几个数往纸上一列，营业厅小姐姐都能帮你搭出最优解。我在南中环电信厅等你，咱一起算笔明白账\n\n这份对照你拍下来，临场不用抓瞎。\n关注我，后面专门讲更多门道。\n这几条你存着，比记脑子靠谱。\n点个关注，系列里还有更多避坑招。",
    "sweet": "宝子们～宽带到期了别闭眼续费！先看看现在市面上的套餐变了多少！\n\n三年前59块20G，现在59块40G翻倍了！直接续原套餐等于每月丢20G流量。\n\n决策三步走：查对比→看需求→选方案。不放心的话来店里我帮你查，免费出方案！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n截图存好这篇，下次选套餐直接翻出来看，省得再搜～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "宽带续费决策数据：2023年vs2026年同价位套餐内容对比：\n\n¥59档：20G→40G（+100%）\n¥99档：40G→80G（+100%）\n¥169档：80G+200M→150G+1000M+FTTR\n\n建议方案：到期前30天到厅查询最新套餐对比。月流量使用量变化超过50%的，建议换套餐而非续费。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：宽带到期不续费，先查最新套餐再决定。\n\n决策树：1. 查看当前套餐与最新版对比→如果有升值换新套餐；2. 查看近半年月均用量变化→如果增长超50%升级融合套餐；3. 当前套餐专属最适合→续费保留。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！宽带到期了就闭眼续费？亏大了我告诉你！\n\n三年前59买20G，现在59买40G——你续原套餐每月亏20G流量。\n\n到期了先来店里看看最新套餐，同价位流量翻倍了你就赚了。要是家里需求多了直接升级融合套餐，更划算。\n\n截图存了，到期前翻出来看一眼不亏钱！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n评论区扣1，我看多少人中招了。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带装维，最怕老客户进门就甩句“师傅，老套餐续费”。上周五有个穿红毛衣的大姐，攥着缴费单就往柜台冲，我赶紧拦下她：“别急，让我先给你查查。”一查可好，她三年前办的59元套餐，现在同价位流量翻倍不说，还送了个路由器——就是柜台边上那个黑盒子瞧见没？新装用户排队领的那个。大姐听完一拍大腿：“早来两天就好了，刚自己往APP里充了三百！” \n\n经验之谈啊：宽带这玩意儿跟买菜一个理，隔年的皇历看不得。您要信我的经验，到期前带着身份证来南中环营业厅，我拿系统给您比划比划。不吹不黑，合适就换，不合适您扭头就走，横竖不亏。门口那棵老槐树底下，我天天给街坊们这么查套餐，王大爷上个月刚省出半年的鸡蛋钱。"
  },
  "多人合租网络怎么分？3种方案优劣对比": {
    "sister": "上周营业厅快下班时，看见个小姑娘蹲墙角抹眼泪。一问才知，合租室友嫌她刷剧影响游戏，直接把WiFi密码改了。像这种合租分网问题，其实有三个解法。第一是共用宽带，人均二三十挺划算，但抢网速容易红脸；第二都用手机热点，不卡顿可钱包顶不住，40G流量几天就见底；第三种现在年轻人选得多，电信的合租WiFi套餐能分独立通道，打游戏的、追剧的各走各的，月租平摊跟买杯奶茶差不多。后来那姑娘选了第三种，上周还带室友来办了呢。\n\n我说的这组数你记牢，别转头就忘。\n记得来看下期，我接着给你支招。\n你家是啥情况？评论说说，我帮你参谋。\n这个表你收好，下次直接照着办。",
    "sweet": "宝子们～合租网络怎么分最划算？别各交各的冤枉钱！\n\n三个人各办各的，一个月177。合办一条千兆宽带加融合套餐，人均才56，省了三分之二！\n\n三种方案：各办各的（自由贵）、合办均摊（省钱但麻烦）、融合套餐主副卡（最低最省心）。\n\n截图跟室友商量，人均50爽不爽！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "合租网络方案费用对比（以三室为例）：\n\n方案A各办各的：3×¥59=¥177/月，3条100M宽带，各管各的\n方案B合办一条：¥99/月300M，人均¥33，需一人代缴\n方案C融合套餐：¥169/月1000M+3张手机卡(30G/张)，人均¥56，主卡管理副卡\n\n成本排序：B<C<A。体验排序：C(千兆)>B(300M)>A(各自100M)。综合推荐方案C。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：合租推荐融合套餐方案。\n\n分析：各办各的¥177体验最差，合办均摊¥33但管理不便。融合套餐¥169/月人均¥56，千兆全屋覆盖+各人独立手机卡，管理便捷。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！合租别各交各的话费了！亏麻了！\n\n三个人各办59套餐=177，共用一条光纤才多大点事！合办融合套餐169千兆宽带+三人手机卡，人均56——比各自办省了121！\n\n一个人交主卡，室友副卡，网速快还省钱。截图跟室友说，不办是傻子！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，给合租房拉网线少说也装了上千户。去年开春那会儿，三个医学院小姑娘在南中环城中村合租，每人单独办了59元套餐，结果看网课老卡顿。我一看她们光猫就摆在冰箱顶上，信号穿过两道承重墙能好才怪。经验之谈，这种户型得把光猫搁客厅电视柜，再配个百十来块的千兆路由器——但最根本还是得换融合套餐。\n\n现在169的千兆套餐带三张副卡，算上话费补贴人均才53块。上个月那仨姑娘来回访，说现在三台手机+笔记本同时开网课都不卡。不过得提醒你们，要是有人经常出差，最好把主卡给最常住的室友，副卡通话分钟数共享的。\n\n我这人说话实在，你们要拿不准就来南中环营业厅。柜台老张认识我，提王师傅给的方案，他给你算账比计算器还溜。路由调试这些活儿，我顺手就给你们安排了。"
  },
  "家里有学生上网课，宽带怎么选？": {
    "sister": "大姐，您先别急——孩子上网课又卡了吧？是不是老师提问时候画面老冻结？对对对，我懂，刚举手画面就卡住，等恢复时候都叫下一个同学了...这事儿啊，多半是您家宽带的上行不够。\n\n（停顿）您看啊，网课跟刷视频不一样，得双向传数据。现在很多套餐都是下行快上行慢，像水龙头——进水管粗出水管细。您原来用的100兆套餐上行才4兆，那能不卡吗？\n\n（放慢语速）上个月帮李姐换了300兆宽带，上行提到30兆，第二天孩子上课就能流畅发言了。您要是拿不准，随时到南中环营业厅找我，给您测测速。\n\n这几条你存着，比记脑子靠谱。\n关注我看下期，接着聊这个话题。\n你家是啥情况？评论说说，我帮你参谋。\n划重点——上面这几点你存手机里随时看。",
    "sweet": "宝子们～家里有熊孩子上网课的看过来！网课卡不卡，就看宽带选得好不好！\n\n100兆三个人用肯定卡。至少300兆起步，孩子上课不卡，家长刷剧不用抢网。有条件的直接上千兆，抖音刷到飞起也不影响孩子听课～\n\n截图保存，开学前安排好，省得孩子上课卡了来找你哭！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你最近也为这事发愁吗？评论区说说我帮你。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "网课带宽需求分析：主流在线课堂（腾讯会议/钉钉/ClassIn）单路视频稳定需求5-8Mbps上行。家庭多设备并发建议方案：\n\n2人家庭：至少100兆（实测可用带宽80Mbps，支持6路课堂并发）\n3-4人家庭：至少300兆（实测可用带宽250Mbps，支持15+设备并发）\n4人以上+智能家居：最少1000兆+FTTR\n\n山西电信融合套餐含网课专属加速通道，赠三个月体验。\n\n有疑问评论区提，我知道的全告诉你。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：有学生的家庭宽带至少300兆起步。\n\n分析：100兆在三设备并发时上行带宽不足，网课卡顿概率超40%。300兆融合套餐¥99/月含网课加速，解决90%卡顿问题。1000兆套餐¥169/月适合多孩家庭。\n\n建议开学前到厅办理，暑期有学生专属优惠。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！家里有弟弟妹妹上网课的吧？宽带不够他们卡了来找你！\n\n100兆三个人用——你看剧他刷抖音孩子上网课，不卡才怪。至少300兆，多花几十块大家都爽。\n\n融合套餐99块300兆+手机卡，还有网课加速通道。截图让爸妈去办！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，给南中环老小区换网线的时候，总碰见家长急吼吼拽着我说\"师傅快看看，孩子卡得连老师鼻子眼睛都看不清\"。前两天在17号楼2单元，一进门就看见孩子蹲在路由器边上写作业，他爸举着手机满屋找信号——您说这三伏天的，大人孩子遭这罪图啥？ \n\n要我说实话，100兆宽带三个人分，就跟早高峰挤公交似的。孩子传作业视频占上行通道，老妈追剧抢下行流量，老爹再开个视频会议？卡成PPT那是轻的。上个月给纺织厂家属院老刘家换了300兆融合套餐，他家闺女现在上网课能看清黑板上的粉笔灰，老婆子刷短视频也不骂街了。 \n\n我信我的经验：网课这套东西，上行带宽就像水管子，水流不够急，课件传得就慢。营业厅那网课加速服务，说白就是给教育类网站开个VIP通道。贵？一个月多掏包烟钱，省得孩子因为网络卡顿挨老师骂。 \n\n南中环营业厅后头那棵老槐树看见没？每天下午我都在树底下摆工具包。带着测速数据来，我给您掰开揉碎讲明白——这服务二十年老师傅不收费。"
  },
  "一个人住选什么宽带最划算？100M vs 300M vs 1000M": {
    "sister": "（手机屏幕亮起）注意看这个套餐价差...（停顿）你是不是也以为越贵越好？（镜头切近）  \n\n100M其实刷视频够用，但晚上想追4K剧？卡成PPT没商量。300M只比100M贵顿奶茶钱，游戏办公都不闪退。至于1000M...（突然笑）除非你天天在家开直播当网红！  \n\n（放下手机）一个人住真犯不着为用不到的网速买单。下次看见营业厅推销千兆的...（眨眼）记得拔腿就跑。\n\n这条你截个图存着，办业务前翻出来对着看。\n你家是啥情况？评论说说，我帮你参谋。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～一个人住选宽带别被忽悠上1000兆！一个人一天流量用不了多少，100兆59块一个月，刷剧打游戏完全够了。300兆适合打游戏多的，1000兆一个人用就是浪费钱。\n\n记住：一个人100兆→日常够用，300兆→游戏党，1000兆→土豪随意。截图保存，租房办宽带前看一眼！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "单人居住带宽需求分析（基于山西电信单人用户月均数据）：\n\n日常使用（社交+视频）：100兆实际下行110Mbps，上行20Mbps，满足4K视频+网页+社交\n游戏用户（网游+直播）：300兆实际下行350Mbps，上行50Mbps，延迟<50ms\n极限场景（PT下载+直播推流）：可上1000兆\n\n结论：单人用户100兆性价比最高，300兆已覆盖99%的使用场景，1000兆对单人用户配置过剩。\n\n评论区报户型+设备数，我逐个回复方案。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：一个人住选100兆最划算。\n\n分析：月费¥59/100兆覆盖95%单人使用场景（刷剧/聊天/轻度游戏）。升级到¥99/300兆仅覆盖额外4%的高需求场景（重度游戏/高清下载）。1000兆¥169/月多付110块但单人用不上。\n\n建议：到厅办100兆，如后续感觉不够可随时升档。\n\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n有疑问直接评论区，我回邮件快的。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们一个人租房宽带别交智商税！\n\n100兆59块——看剧刷抖音打LOL够了。300兆99块——打吃鸡下蓝光。1000兆169块——你一个人用网速再快也没人跟你抢。\n\n一个人住100兆是正解，300兆是土豪版，1000兆是……你钱多没处花。截图存了去办！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n你们遇到过没？评论区吐槽一波。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，在南中环营业厅光螺丝刀都拧秃了五把。上个月有个穿曼联球衣的小伙子非跟我杠：师傅我租单间必须装千兆，吃鸡不能卡！我把他领到后头机房，指着那排闪着蓝光的设备说：看见没？那根标100M的线接了三层楼48户，半夜测速照样跑满。你一个人开个100兆，白天追剧晚上开黑，路由器插线稳当点，根本用不出差别。\n\n前年给老棉纺厂家属区的张婶装宽带，老太太就爱用手机看梨园春。100M套餐用了两年，昨天见我还说电视投屏都不带转圈的。那些忽悠你多花钱的，你问他家马桶是不是也得装双排水？省下三百块买排骨吃不香么。\n\n营业厅柜台右手边有个搪瓷缸子，磨得都露铁了。来了给你泡杯高沫，咱边喝边测速。南中环电信，找老周。"
  },
  "家庭宽带怎么选？三口之家最优方案": {
    "sister": "哎，上午买菜碰到隔壁王阿姨还念叨呢，说闺女上网课总卡顿，女婿打游戏也老掉线。我一听就乐了——这不跟我表妹家情况一模一样嘛。\n\n其实啊，三口之家根本不用冲千兆。电信那五百兆融合套餐就特实在，一个月139，全家宽带流量通话全齐活，还白送个千兆路由器。你们算算，单买宽带加电话费少说两百吧？省下的钱都够涮两顿羊肉了。\n\n对了，最近他们营业厅搞活动，连安装费都免了。我家装完连阳台上刷剧都不卡，你们要办就去南中环那个网点，找穿红马甲的小李就行。\n\n这份对照你拍下来，临场不用抓瞎。\n关注我，后面专门讲更多门道。\n你家是啥情况？评论说说，我帮你参谋。\n这条你截个图存着，办业务前翻出来对着看。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～三口之家选宽带记住一句话：300兆起步，别省那几十块！\n\n100兆三个人用——老公开视频会、老婆追剧、孩子上网课，不卡才怪。300兆是全家同时在线的底线，一个月多花几十块，少吵架！\n\n融合套餐99块，宽带+手机卡+网课加速，一家三口人均33块。截图存了去办～\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你最近也为这事发愁吗？评论区说说我帮你。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "三口之家带宽实测数据（山西电信N=50户样本）：\n\n100兆：3台设备并发时实测下行降至40-60Mbps，视频会议+网课同时进行时上行带宽不足，卡顿概率42%\n300兆：3台设备并发实测下行200-280Mbps，支持1路4K+1路网课+1路办公，卡顿概率8%\n1000兆：全场景无瓶颈，适合重度用户\n\n推荐方案：300兆融合套餐¥99/月含网课加速+手机卡，三口之家最优解。\n\n评论区报户型+设备数，我逐个回复方案。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：三口之家宽带至少300兆。\n\n分析：100兆在2台以上设备同时使用时上行带宽已达瓶颈。300兆融合套餐¥99/月，满足全家同时在线需求。比100兆多¥40/月，每年多¥480，但体验质的飞跃。\n\n建议到厅办理融合套餐，一家三口人均成本最低。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n\n这条值你收藏。下次做决策翻出来直接用。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！三口之家别想着省钱上100兆！\n\n你老婆看剧你打游戏孩子上网课——100兆你试试，卡到你怀疑人生。300兆是最低配置，大家各用各的互不干扰。\n\n融合套餐99块，宽带+手机卡，人均33。比各自办59套餐省一半。截图跟老婆商量去办！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年宽带装维，给三口之家推荐套餐，我信我的经验。300兆起步是黄金档，就像炒菜得先热锅——去年冬天，迎泽西大街的老张家，媳妇用平板追《狂飙》，儿子网课钉钉打卡，他自己手机刷着游戏直播，100兆的宽带直接卡成PPT。大冷天爷俩裹着羽绒服跑来营业厅，路由器后台一查，三台设备同时跑满速，这不就跟早高峰挤公交一个道理？\n\n不吹不黑，300兆就是三口之家的门槛价。前两天给晋阳街卖刀削面的王师傅换套餐，他那个小饭馆二楼住家，四部手机加智能电视全开着，300兆稳稳当当。要是孩子爱打网游或者家里有智能家居，千兆才算真舒坦——我工具箱里测速仪随时备着，来南中环营业厅喝口茶，免费给你测个真实网速。\n\n这种案例我抽屉里能翻出几十本工单，不信你瞅瞅评论区多少人在问同样的事。"
  },
  "监控摄像头需要什么网络？4G还是宽带？": {
    "sister": "一到月底，手机就开始叮叮当当响，那些老家的亲戚啊朋友啊，全来找我问监控的事：\"院子没网线咋整？\"\"4G的会不会很费钱？\"  \n\n其实家里有宽带的，直接连WiFi最省心，看回放不卡，还不用操心流量。要是真没宽带，4G摄像头也能用，但得注意——高清视频一天能吃好几个G，普通套餐根本扛不住。我遇过好几个客户，光流量费一个月就六七十，后来改了融合套餐，手机费里含宽带，算下来反而便宜。  \n\n南中环营业厅这边经常有人来算这笔账，装监控这事，真别急着下单。\n\n划重点——上面这几点你存手机里随时看。\n关注我，后面专门讲更多门道。\n你遇到过这情况没？评论区聊聊。\n这几条你存着，比记脑子靠谱。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～给爸妈装监控选4G还是宽带？一句话说清楚：\n\n老家没宽带的→4G摄像头，插手机卡就能用，一个月十来块钱流量费。家里有宽带的→WiFi版监控，直接用家里的网，不花额外钱。\n\n截图存了，想装监控的时候翻出来看，不纠结！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你是不是也遇到过呀？评论区聊聊～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "监控摄像头网络方案对比：\n\n方案A：4G摄像头\n- 适用场景：无宽带覆盖的农村/门面房/工棚\n- 月成本：¥10-20流量费（1-5G/月，视传输频率）\n- 优势：无需布线，即插即用\n\n方案B：WiFi摄像头（宽带网络）\n- 适用场景：已有宽带的家庭\n- 月成本：¥0（共享宽带）\n- 优势：无额外费用，画质更稳定\n\n建议：有宽带的地方用WiFi版，无宽带用4G版。到厅有售。\n\n觉得有收获扣个1，满100我下周测新款。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：有宽带用WiFi版，无宽带用4G版。\n\n分析：WiFi摄像头零额外月费，只需一次性设备费¥150-300。4G摄像头每月¥10-20流量费，年支出¥120-240，适合无宽带的场所。\n\n建议到厅看实物，安装调试一站式服务。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们给老家装监控选什么网？\n\n有宽带：直接上WiFi摄像头，不用额外花钱。没宽带：上4G摄像头，插卡就用，一个月流量费才十几块。\n\n别傻乎乎没宽带的地方装WiFi版——买了也用不了。截图这个对比，买之前看一眼！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了二十年装维，光南中环这片的监控就装了不下五百户。去年给老刘头装摄像头那事儿印象最深——老爷子住城郊大棚看果园，扯宽带得架三公里线，最后给他用的电信4G摄像头，插卡就能用。\n\n您猜怎么着？到现在一年多了，半夜有人偷果子，4G画面照样拍得清清楚楚，一个月流量费才8块钱。要是家里有宽带，那肯定首选WiFi摄像头，像建设路五金店张老板用的就是这种，连上店里现成宽带，手机上看回放不费一点流量。\n\n不吹不黑，现在电信4G基站覆盖广了，传监控画面真不卡。摄像头选对网络关键看实地条件：能拉宽带就选WiFi款，没布线条件就用4G的。明儿我都在南中环营业厅后院装设备，带您机器来我手把手教调试——这二十年经手的机器，闭着眼都能摸清脾气。"
  },
  "直播带货用什么网络最稳？选网避坑指南": {
    "sister": "有没有发现？明明家里宽带百兆起步，一开直播就卡成PPT？粉丝急得狂刷弹幕，订单刷刷往下掉…（停顿）问题就出在「上传速度」上！普通宽带上传才几兆，根本扛不住高清直播。  \n\n选网重点看三点：上行速率要高（电信直播专线能到50M）、延迟要低、得有高峰保障。那些便宜的小运营商，关键时刻掉链子，亏的是自己钱。  \n\n来南中环电信营业厅，姐拿测速仪给你现场试，挑对网络比砍价实在多了。\n\n这条你截个图存着，办业务前翻出来对着看。\n点个关注，系列里还有更多避坑招。\n你遇到过这情况没？评论区聊聊。",
    "sweet": "宝子们～做直播的看过来！直播卡顿掉线不是设备的问题，是你家宽带的问题！\n\n100兆上行才20兆，一边推流一边放BGM就满了。300兆上行50兆，稳稳的。要是团队做直播，直接上千兆+FTTR，保证不卡。\n\n截图存了，做直播买宽带前看一眼！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "直播网络带宽需求分析：\n\n单人直播：720P 30fps稳定推流需要3-5Mbps上行，1080P 60fps需要8-12Mbps上行\n同时放BGM/音效：+2Mbps\n同时看弹幕+互动：+2Mbps\n\n方案建议：\n- 个人直播（1-2人）：300兆宽带（上行50Mbps，充足余量）\n- 工作室直播（多人）：1000兆+FTTR（上行200Mbps+，多人同时推流）\n- 户外直播：5G CPE设备（5G上行80-120Mbps）\n\n建议到厅体验后选择方案。\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：直播宽带至少选300兆。\n\n分析：100兆上行仅20Mbps，推流+音效+互动已接近饱和，导致卡顿。300兆上行50Mbps，单人直播余量充足。工作室建议千兆+FTTR。\n\n月成本对比：100兆¥59/月（直播不稳定）→ 300兆¥99/月（稳）→ 千兆¥169/月（专业级）。\n\n建议到厅办理直播专项方案。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们做直播的看过来！直播卡顿别找设备的问题了，是你家宽带不行！\n\n100兆上行20M，推流就占了大半，不卡才怪。300兆上行50M，推流放音乐看弹幕三不误。\n\n工作室几个人同时播的，直接上千兆FTTR。户外直播用5G CPE。截图了这个去办！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，南中环这片区的直播工作室基本都经我手调过。要说直播带货最怕啥？不是货不行，是网络卡成PPT。上周有个穿皮卡丘T恤的小伙子，抱着台二手iPhone就冲进营业厅，说他100兆宽带直播老断流，粉丝骂他\"幻灯片带货\"——结果一测上行才15兆，连背景音乐都带不动。\n\n经验之谈，单人直播300兆起步。去年给体育路卖渔具的老李调网络，他非得用手机热点凑合，结果有回演示抛竿动作，镜头直接卡成慢动作回放，钓友刷屏骂他\"空气竿\"。后来换了500兆宽带+六类线，现在天天直播切鳙鱼跟切豆腐似的顺溜。\n\n要是三五个人的工作室，千兆+FTTR才是正解。记得文化广场那家卖紫砂壶的？原先用普通路由器分线，五个主播同时开播直接把设备干重启了。现在每间直播间独立光纤到桌，掌柜的泡茶都不用说\"稍等加载\"。\n\n网络这玩意儿就跟炒菜的火候一样，不够旺就出锅准夹生。西华苑的随时来店里，我拿测速仪给你现场试——反正我工具箱里这些水晶头压了二十年，比有些主播的网龄都长。"
  },
  "智能家居需要多大带宽？最少配置清单": {
    "sister": "说个你可能不信的——家里装20个智能设备，用的流量还没你刷10分钟短视频多！（停顿）但为啥总感觉网卡？问题出在上传带宽和路由器上。给你个保姆级清单：宽带最少300兆，上传速度别低于30兆，不然远程看监控能急死人。路由器必须换！运营商送的那种老古董，带5个设备就喘，得买千兆双频的。（笑）要是家里有智能窗帘、网关这些，墙面网口提前留好，死角？不存在的。对了，设备超过15个，加个中枢网关能省心一半。具体咋配，带上户型图来南中环电信，姐给你现场测速。\n记得来看下期，我接着给你支招。\n你遇到过这情况没？评论区聊聊。\n来营业厅找我，当面给你测算。\n这条你截个图存着，办业务前翻出来对着看。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～家里装了一堆智能家居设备怕网不够用？放心！一个智能灯泡一年用的流量还没你刷一条抖音多。\n\n100兆轻松带50个智能设备，300兆带100个。真正占网的是你看视频打游戏，智能家居走的是另一个频段，互不影响。\n\n截图存了，智能家居选宽带不纠结！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n觉得有用帮点个赞呗，让更多同事看到～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "智能家居带宽需求分析：\n\n单个智能设备（灯/插座/传感器）平均月流量50-200MB，远低于一台手机的5-10GB/月。智能家居走IoT频段（Zigbee/蓝牙），不占用WiFi视频带宽。\n\n带宽建议：\n- 10-30个智能设备：100兆足够（智能设备总带宽需求<5Mbps）\n- 30-80个智能设备：300兆足够\n- 80+智能设备+全屋4K监控：可上1000兆\n\n结论：智能家居设备数不影响宽带选择，按平时上网人数选即可。\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：智能家居不影响宽带选择。\n\n分析：单个智能设备月均流量50-200MB，远低于宽带套餐的流量下限。智能家居运行在独立IoT频段，不占用主力带宽。宽带选择仍按家庭上网人数和设备数决定。\n\n建议：已装智能家居的用户无需升级套餐，保持原套餐即可。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n有疑问直接评论区，我回邮件快的。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！家里装了智能家居怕网不够用？\n\n想多了！一个智能灯泡一年用的流量还没你女朋友发一条短视频多。智能家居走的是独立的频段，跟你刷抖音打游戏互不干扰。\n\n100兆带50个设备轻轻松松。别因为装了智能家居就被忽悠升级宽带。截图存了！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n评论区扣1，我看多少人中招了。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，有个事儿我琢磨得透透的——太原南中环那片儿的老客户装修新房，十个有八个要问智能家居带宽的事儿。上个月给学府街张老师家调测，128个智能设备亮着绿灯，老爷子非拽着我要升级千兆宽带。我拿他桌上那个用了三年的小米路由器给他看实时流量：所有设备加起来还没他孙子上网课用的零头多。\n\n经验之谈啊兄弟们，智能门锁一天传不了两张照片的数据量，扫地机器人规划路线的流量还没老太太微信语音长。去年给长风商务区那个三百平的智能别墅做维护，客户原装的200兆宽带，智能窗帘、灯光、安防全开着，监控录像云存储都不带卡的。\n\n我信我的经验，普通家庭一百兆绝对够使。你要实在不放心，带两包烟来南中环营业厅后院找我，用老周那台专业测试仪给你现场跑数据。不吹不黑，测完你就知道该不该花那冤枉钱。"
  },
  "电视盒子卡顿？可能是宽带的问题": {
    "sister": "今天说个实在的，电视盒子卡顿这事儿90%的人真怪错对象了。你知道么，现在随便一个4K片源都得25兆起步，家里要是还用50兆的老宽带，手机电脑电视一抢网，不卡才怪。给你算笔账：升级千兆宽带，摊到每天就多两三块钱，全家网速飞起，追剧打游戏再也不转圈。下次觉得盒子不行，先查查宽带套餐是不是该换了——南中环电信营业厅实测，八成用户升级完就解决问题。\n\n这条你截个图存着，办业务前翻出来对着看。\n你家是啥情况？评论说说，我帮你参谋。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～看电视盒子一直转圈的看过来！不是盒子坏了，是你家宽带的问题！\n\n电视盒子分两种：连宽带WiFi的——跟手机抢网，家里人多就得300兆以上。连IPTV专线的——检查机顶盒和线路，跟宽带没关系。\n\n截图存了，电视盒子卡了先看这个再决定修什么！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你是不是也遇到过呀？评论区聊聊～\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "电视盒子卡顿诊断指南：\n\n场景A：网络盒子（连WiFi/宽带）\n- 卡顿原因：多设备并发导致带宽不足\n- 诊断：查看同时在线设备数，100兆在3+设备并发时可能出现带宽不足\n- 解决：升级到300兆或使用IPTV专线\n\n场景B：IPTV机顶盒（电视专线）\n- 卡顿原因：机顶盒缓存不足/线路老化/光猫问题\n- 诊断：重启机顶盒，检查HDMI线，检查光猫指示灯\n- 解决：重启不行到厅更换机顶盒\n\n建议到厅检测，免费诊断卡顿原因。\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：电视盒子卡顿先分清楚是宽带还是机顶盒的问题。\n\n分析：网络盒子卡顿→家中带宽不足，升级宽带即可。IPTV专线卡顿→机顶盒或线路问题，需检测。\n\n建议：到厅免费检测，附带优化宽带方案。30分钟内解决。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\n数据在这儿。评论区报公司人数，给你算一版。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们！看电视一直转圈别急着砸电视！\n\n先看你是用WiFi看的还是IPTV看的。WiFi看的→家里网不够用了，升级宽带。IPTV看的→机顶盒问题，重启或者去营业厅换一个。\n\n别傻乎乎买了新电视结果还是卡。截图存了排查一下！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n\n猜对没？扣个\"稳\"让我膨胀一下。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，电视盒子卡顿的问题我闭着眼都能说出个一二三。去年冬天在长风小区就碰上个典型的，老太太急得直跺脚说春晚看一半就卡成PPT。一查发现她家还用着十年前的老路由，连个5G频段都没有。我顺手从工具包里掏出测速仪——好家伙，50兆宽带硬是跑出个位数！换上千兆路由立马顺滑得跟德芙巧克力似的。\n\n要说这里头的门道，走宽带看视频的，八成是家里网不够用了；要是走IPTV专线的，那得重点查机顶盒和光纤接头。路由器这玩意儿就跟老棉裤一样，年头久了就不顶用。经验之谈，现在家里至少得备个千兆路由，别省那百八十块的。\n\n我在南中环营业厅后院备着全套检测设备，街坊们常端着机顶盒来找我唠这个。你有啥拿不准的，后晌遛弯时候捎过来，我拿光功率计给你测线路损耗，分文不取。这二十年见过太多把电视盒子冤枉坏了的——有时候就是根网线老化的事儿。"
  },
  "电信&联通&移动宽带怎么选？全方位横评": {
    "sister": "上周帮15个邻居挑宽带，13个都后悔没早点看网速实测数据。移动月费59看着香，但绑定手机套餐至少两年，提前解约违约金够交半年网费；联通在长风街信号直接掉两格，维修工单经常排三天。电信贵20块？可人家下载速度稳定跑满200兆，晚上追剧从没转圈圈，装宽带当天师傅连路由器都帮你调试好。选错运营商真能天天上火，就南中环电信营业厅这个蓝招牌，你报我名字直接找值班经理。\n\n这份对照你拍下来，临场不用抓瞎。\n关注我，后面专门讲更多门道。\n你家是啥情况？评论说说，我帮你参谋。\n这条你截个图存着，办业务前翻出来对着看。\n关注我看下期，接着聊这个话题。",
    "sweet": "宝子们～三家宽带选哪个？我帮你理清楚：\n\n打游戏→选电信，延迟最低，团战不卡。日常刷剧聊天→联通够用，价格适中。想省钱→移动便宜，但高峰期可能掉速。\n\n更推荐的办法：看看你家小区哪个有覆盖，有电信就选电信准没错。\n\n截图存了，选宽带纠结的时候翻出来看！\n\n宝子们点个关注，下期教你怎么跟营业厅砍价不踩坑～\n宝子们评论区聊聊，你每个月话费多少呀？我来帮你看看能不能省～\n\n你有什么想问的？评论区说呀我一个个回。\n在南中环电信厅～来找我玩呀，免费的。",
    "tech": "三大运营商宽带对比数据（山西电信实测，2026年Q2）：\n\n稳定性（晚高峰）：电信98.5% > 联通95.2% > 移动91.8%\n平均延迟：电信18ms > 联通25ms > 移动35ms\n上传速度：电信50Mbps > 联通35Mbps > 移动25Mbps\n服务响应：电信4小时 > 联通8小时 > 移动12小时\n\n价格对比（300兆）：电信¥99/月 > 联通¥89/月 > 移动¥79/月\n\n性价比评分：电信8.5/10 > 联通7/10 > 移动6/10\n\n数据全在这了。值不值得存，你说了算。\n到店免费测信号出报告。位置见主页。",
    "biz": "结论：综合体验电信最优，价格联通适中，移动适合预算有限。\n\n电信：月费高¥10-20但稳定性98.5%，延迟最低，服务响应最快。适合对网络质量有要求的用户。\n联通：价格低¥10-15，质量中等，适合日常使用。\n移动：价格最低但高峰期掉速明显，适合轻度用户。\n\n建议到厅试装体验，不满意包退。\n\n点关注，这个系列会把家庭通信怎么省钱讲透。\n你现在的套餐月费多少？评论告诉我，帮你算算有没有更优解。\n截图保存，到厅办理带着这份分析，当场就能拍板。\n带证件来营业厅，专人3分钟出方案，当场生效。\n\nROI算清楚了。截图发给老板，明天就能省。\n免费上门勘测，48h出方案。评论区留言预约。",
    "young": "兄弟们三家宽带横评来了！\n\n打游戏的→电信，低延迟不坑队友。日常用的→联通，够用不贵。想省钱的→移动，便宜但高峰期可能拉胯。\n\n别问哪个好——你自己干什么用就选哪个。打游戏选了移动你就等着哭。截图存了！\n\n兄弟们评论区报一下你们用的啥套餐，我看看谁被坑了！\n来店里说兄弟介绍的，我给你走专属通道，当场办好。\n\n这条值不值？值的话评论区打个\"存\"。\n到店报我名走绿色通道。南中环等你。",
    "master": "干了这么多年装维，有个事儿我必须说道说道。前两天去阳光100小区给老张家装宽带，老爷子非得让我评评理——电信联通移动到底选哪家？我掏出测速仪当场给他测了最实在的数据。\n\n电信为啥贵那百八十块？去年腊月二十八晚上，我蹲在万达金街奶茶店测速，别家都卡成PPT了，电信还能稳住50兆。联通的妙处是我媳妇发现的——她天天追《长相思》从来不缓冲，价格还比电信便宜顿烧烤钱。移动嘛...上个月给城中村小饭馆装宽带，老板娘说只要便宜，午休时刷会儿抖音够用就行。\n\n看人下菜碟才是正经。家里有俩熬夜打电竞的小子？闭眼选电信。独居老太太就爱在全民K歌嚎两嗓子？联通200兆足够。要是租房图个便宜，移动100兆挂个微信也成。\n\n我这人实在，从不说虚的。测速仪就在包里，不信的来和平路营业厅，我当场给你演。"
  }
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
