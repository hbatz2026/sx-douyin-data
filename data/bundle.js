// 抖本工坊 · 数据包（自动合并 10 文件）
// 生成时间: 2026-07-16 08:17:24
// 合并文件: bgmList.js, dailyScripts.js, hotspotData.js, phonePool.js, publish-kit.js, t1Presets.js, t2Presets.js, t4Presets.js, techDB.js, topicPool.js
// 大小: 99667 bytes ( 10 source files)

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
// Auto-generated daily scripts (simulated for test environment)
// 数据格式模拟 SCF daily 模式产出
// Generated: 2026-07-15

window.___dailyScripts = {
  date: "2026-07-15",
  weekday: "周三",
  todayHots: [
    "入伏高温红色预警多地40℃",
    "暑假做饭翻车合集",
    "迪丽热巴新剧大魔王造型",
    "暑期档电影票房破纪录",
    "高考录取通知书开始发放",
    "318国道自驾游爆火",
    "国产手机618后价格反弹",
    "多地用电负荷创历史新高"
  ],
  scripts: [
    // ========== 决策类 — 宽带选多少兆 ==========
    {
      type: "decision",
      typeName: "决策指南",
      typeIcon: "📊",
      hotTopic: "入伏高温红色预警多地40℃",
      hookType: "后果式",
      hook: "天热总在家吹空调，结果 WiFi 卡得连视频都刷不了？",
      topic: "夏天全家在家，宽带选多少兆才够用？",
      coreOffer: "100M够日常/300M够全家/1000M一步到位",
      compliance: { status: "passed", autoFixed: 0, warnings: [] },
      variants: {
        warm: {
          persona: "暖心姐姐",
          title: "天热不出门，家里宽带可别掉链子",
          tags: "#宽带选择 #防卡顿 #夏日出游",
          bgm: "夏日漱石 - 橘子海",
          script: "天热出不了门，一家人全待在家里，手机刷视频、孩子上网课、自己追剧——结果 WiFi 卡得转圈圈？\n\n别急，阿姨给你算笔账。\n\n三口之家日常用，300M 宽带就够了。看视频不卡、上网课流畅、偶尔打个游戏也不掉线。\n\n要是家里人多、智能设备多、还爱看 4K 电影，直接上 1000M。千兆配全屋 WiFi，每个房间网速一样快。\n\n来店里找我，免费帮你测网速，看看你家的宽带够不够用。评论区留「测速」，我教你自查。",
          storyboard: [
            { sec: "0-3", speaker: "对镜头疑问表情", text: "天热在家，WiFi卡吗？", camera: "口播特写，家庭背景" },
            { sec: "3-13", speaker: "掰手指对比", text: "100M=1-2人 | 300M=3-5人 | 1000M=全屋智能", camera: "手写板/白板画示意图" },
            { sec: "13-20", speaker: "展示测速效果", text: "千兆实测下载电影只要10秒", camera: "手机测速截屏特写" },
            { sec: "20-25", speaker: "微笑直视镜头", text: "评论区留「测速」教你自查", camera: "口播半身，背后是营业厅" }
          ]
        },
        tech: {
          persona: "技术专家",
          title: "高温天网速实测：你家宽带跑满了吗？",
          tags: "#宽带实测 #网速科普 #技术流",
          bgm: "科技感电子音",
          script: "入伏高温，全国多地 40℃+。室外能煎蛋，室内 WiFi 掉线？\n\n不一定是路由器的问题，可能是你带宽选小了。\n\n100M 理论下行 12.5MB/s，刷 1080P 够用。\n300M 下行 37.5MB/s，3-4 人同时 4K 无压力。\n1000M 下行 125MB/s，全屋 20+ 设备同时在线。\n\n来营业厅我帮你跑个测速——5 分钟出结果，免费。评论区留「测速」，给你出方案。",
          storyboard: [
            { sec: "0-3", speaker: "展示测速App界面", text: "你家宽带跑满了吗？", camera: "手机测速软件特写" },
            { sec: "3-13", speaker: "数据对比图表", text: "100M:12.5MB/s 300M:37.5MB/s 1000M:125MB/s", camera: "平板上显示对比图" },
            { sec: "13-20", speaker: "实际操作演示", text: "测速÷8=实际下载速度", camera: "后台数据面板展示" },
            { sec: "20-25", speaker: "指向镜头", text: "留「测速」帮你分析", camera: "中景，背后设备墙" }
          ]
        },
        vibe: {
          persona: "活力小哥",
          title: "夏天家里WiFi卡到想砸路由器？看这里",
          tags: "#宽带选 #夏日福利 #营业厅整活",
          bgm: "夏日派对 - 告五人",
          script: "天热不出门，全家窝家里。你追剧、TA开黑、娃上网课——WiFi 直接崩了。\n\n3 秒教你选明白！\n\n一个人住 → 100M，刷视频够用。\n情侣/三口 → 300M，性价比天花板。\n三代同堂 → 1000M，全家一起刷也不会卡。\n\n现在到营业厅找我办千兆，送千兆路由器一个！评论区扣「1」，我帮你留名额。",
          storyboard: [
            { sec: "0-3", speaker: "夸张崩溃表情", text: "WiFi 又崩了？！", camera: "口播特写，加夸张字幕" },
            { sec: "3-13", speaker: "手势比划1/3/5", text: "1人=100M 3人=300M 5人=1000M", camera: "镜头拉近，表情丰富" },
            { sec: "13-20", speaker: "展示路由器实拍", text: "办千兆送路由器！", camera: "产品特写，快切3个角度" },
            { sec: "20-25", speaker: "比心+指向门店", text: "扣「1」帮你留名额！", camera: "口播半身，指向营业厅入口" }
          ]
        },
        sweet: {
          persona: "甜美学姐",
          title: "宝子们来抄作业！夏天宽带这样选",
          tags: "#宽带攻略 #夏日宅家 #抄作业",
          bgm: "恋爱ing - 五月天",
          script: "宝子们！天太热了不想出门对吧？全在家待着，一人刷剧一人打游戏——WiFi 直接卡成 ppt。\n\n学姐帮你们整理了 3 个方案，直接抄作业！\n\n一个人住 → 100M 就够了，月费最省。\n和室友/对象 → 300M 走起，一起看视频都不卡。\n一家老小 → 1000M，再也不怕被说网卡。\n\n到店报「学姐推荐」领小风扇一个！评论区留城市，帮你查附近的店。",
          storyboard: [
            { sec: "0-3", speaker: "可爱wink", text: "宝子，你家WiFi卡吗？", camera: "口播特写，甜美微笑" },
            { sec: "3-13", speaker: "拿出小本本", text: "抄作业：300M性价比最高", camera: "展示写好的卡片" },
            { sec: "13-20", speaker: "展示风扇赠品", text: "到店送小风扇！", camera: "产品互动展示" },
            { sec: "20-25", speaker: "指镜头比耶", text: "留城市，查门店", camera: "口播半身，轻快转场" }
          ]
        },
        pro: {
          persona: "商务精英",
          title: "夏天居家办公，网络效率不能打折",
          tags: "#居家办公 #宽带效率 #职场必看",
          bgm: "专业商务背景音乐",
          script: "夏天居家办公，网络稳定性直接决定工作效率。\n\n我见过太多客户——视频会议卡成幻灯片，老板问话你掉线。一个月少赚的钱够付几年宽带费了。\n\n建议方案：\n100M → 单人办公够用\n300M → 夫妻同时开会+孩子网课\n1000M → 居家工作室+团队远程协作\n\n来营业厅，5 分钟测完网速，给你出个效率建议。评论区留「效率」获取家庭网络优化方案。",
          storyboard: [
            { sec: "0-3", speaker: "干练站姿", text: "居家办公，网速就是效率", camera: "口播中景，办公背景" },
            { sec: "3-13", speaker: "双手示意对比", text: "视频会议不卡=月多赚3000", camera: "对比数据文字特效" },
            { sec: "13-20", speaker: "展示测速报告", text: "实测报告，5分钟出结果", camera: "打印的测速报告展示" },
            { sec: "20-25", speaker: "商务手势", text: "留「效率」获取方案", camera: "口播半身，专业微笑" }
          ]
        },
        master: {
          persona: "资深师傅",
          title: "干了几十年电信，告诉你宽带这么选不亏",
          tags: "#宽带入门 #老电信 #内行推荐",
          bgm: "温暖民谣纯音乐",
          script: "我干了十几年电信，天天上门装宽带。看到太多人花冤枉钱了。\n\n100M、300M、1000M 到底怎么选？你听师傅一句：\n\n一个人住、就刷刷视频的 → 100M 足够了，不浪费。\n一家三四口，同时上网的 → 300M 性价比最高。\n家里智能设备多、爱看 4K 的 → 1000M 一步到位。\n\n来店里找我，免费给你家做一次网络体检。评论区留「师傅」我给你预约。",
          storyboard: [
            { sec: "0-3", speaker: "师傅招牌微笑", text: "宽带选对了，十年不后悔", camera: "口播特写，穿工装" },
            { sec: "3-13", speaker: "拿工具包比划", text: "100M 300M 1000M 分场景推荐", camera: "展示工具箱，专业感" },
            { sec: "13-20", speaker: "手上网线动作", text: "免费上门测网速、调路由", camera: "操作特写，手部动作" },
            { sec: "20-25", speaker: "看着镜头说", text: "留「师傅」上门服务", camera: "口播中景，背后是服务车" }
          ]
        }
      }
    },

    // ========== 场景类 — 暑假故事 ==========
    {
      type: "scene",
      typeName: "一线场景",
      typeIcon: "🎬",
      hotTopic: "暑假做饭翻车合集",
      hookType: "直接点名",
      hook: "暑假在家做饭的、一个人住的，这个场景你一定遇到过。",
      topic: "暑假一个人在家做饭翻车，宽带正好帮了大忙",
      coreOffer: "营业员上门修宽带顺便帮做饭",
      compliance: { status: "passed", autoFixed: 0, warnings: [] },
      variants: {
        warm: {
          persona: "暖心姐姐", title: "暑假一个人在家，宽带坏了怎么办？",
          tags: "#温暖 #营业厅故事 #上门服务",
          bgm: "日常 - 陈粒",
          script: "暑假在家想做顿饭，结果炒菜时锅糊了，厨房烟雾缭绕，想去开抽油烟机——发现 WiFi 也断了，看不了菜谱。\n\n打电话报修，装维师傅上门。进门一看又是浓烟又是乱七八糟的，二话不说先帮我把厨房窗户打开通风。\n\n修好宽带后发现路由器就在微波炉旁边，难怪信号差。挪了位置，网速直接从 20M 变 200M。\n\n来店里找我，免费帮你看看路由器放对位置没。评论区留「上门」约个时间。",
          storyboard: [
            { sec: "0-3", speaker: "厨房背景", text: "做饭翻车，宽带也崩了", camera: "厨房环境口播" },
            { sec: "3-13", speaker: "讲述过程", text: "师傅上门先开窗再修网", camera: "跟拍视角还原" },
            { sec: "13-20", speaker: "展示路由器位置", text: "路由器不能放微波炉旁边！", camera: "手把手教学镜头" },
            { sec: "20-25", speaker: "微笑服务", text: "留「上门」免费帮看", camera: "营业厅口播" }
          ]
        },
        tech: {
          persona: "技术专家",
          title: "路由器放不对位置，千兆变百兆",
          tags: "#WiFi优化 #路由器摆放 #技术干货",
          bgm: "科技纯音",
          script: "80% 的家庭 WiFi 信号差，问题出在路由器位置。\n\n今天上门维修，一进门看到路由器放在微波炉旁边——微波炉 2.4GHz 信号干扰，直接让 WiFi 掉速 80%。\n\n挪到客厅开放位置，测速从 23Mbps 提升到 276Mbps。\n\n记住三条：①不能放金属物旁边 ②不能放墙角 ③不能放电器旁边。\n\n有 WiFi 问题评论区留「测速」，我帮你远程诊断。",
          storyboard: [
            { sec: "0-3", speaker: "测速软件展示", text: "23→276Mbps 提升12倍", camera: "手机测速截图" },
            { sec: "3-13", speaker: "指出错误位置", text: "路由器+微波炉=干扰", camera: "现场实拍对比" },
            { sec: "13-20", speaker: "演示正确位置", text: "开放区域+高处+远离电器", camera: "正确摆放示范" },
            { sec: "20-25", speaker: "指着测速结果", text: "留「测速」远程诊断", camera: "口播收尾" }
          ]
        },
        vibe: {
          persona: "活力小哥",
          title: "做饭翻车+WiFi崩了=今天的我",
          tags: "#暑假日常 #营业厅搞笑 #宽带维修",
          bgm: "好运来 - 背景音乐",
          script: "事情是这样的——\n\n暑假在家想秀一把厨艺，结果锅糊了。想去开抽油烟机顺便看菜谱，发现 WiFi 连不上。我拿着手机满屋走，信号死活不来。\n\n装维师傅来了，一看差点笑出声——路由器被我塞在微波炉旁边。\n\n挪到客厅，网速直接起飞。师傅临走还帮我收拾了厨房。\n\n营业厅的师傅就是这么硬核！评论区留「同款」看看你家路由器位置对不对。",
          storyboard: [
            { sec: "0-3", speaker: "夸张表情", text: "我：锅糊了+WiFi崩了 师傅：我来！", camera: "搞笑对比镜头" },
            { sec: "3-13", speaker: "快速还原场景", text: "路由器→微波炉→噩梦", camera: "场景重现，快节奏" },
            { sec: "13-20", speaker: "竖起大拇指", text: "修网+收拾厨房一条龙", camera: "展示前后对比" },
            { sec: "20-25", speaker: "指向镜头", text: "扣「同款」自查路由器", camera: "调皮收尾" }
          ]
        },
        sweet: {
          persona: "甜美学姐",
          title: "做饭翻车还断网？学姐教你",
          tags: "#暑假 #翻车日常 #学姐推荐",
          bgm: "和你 - 余佳运",
          script: "宝子们，暑假在家可别学我！\n\n想做个可乐鸡翅，结果锅糊了！想去看教程发现 WiFi 断了——整个人崩溃在厨房。\n\n师傅上门后一秒破案：路由器在微波炉旁边。我还以为放哪都一样呢！\n\n挪到客厅，网速蹭蹭蹭上去了。师傅还偷偷帮我收拾了灶台，太暖了。\n\n快看看你家路由器有没有放错位置！评论区留「检查」我教你。",
          storyboard: [
            { sec: "0-3", speaker: "可怜表情", text: "锅糊了+网断了=今天不适合做饭", camera: "口播特写" },
            { sec: "3-13", speaker: "展示路由器", text: "路由器≠微波炉邻居", camera: "产品展示" },
            { sec: "13-20", speaker: "wink", text: "师傅真的好暖！", camera: "微笑展示" },
            { sec: "20-25", speaker: "指镜头比心", text: "留「检查」自查", camera: "收尾口播" }
          ]
        },
        pro: {
          persona: "商务精英",
          title: "信号差耽误工作效率？可能只是位置问题",
          tags: "#办公效率 #网络优化 #职场",
          bgm: "商务纯音乐",
          script: "你以为 WiFi 信号差就要升级套餐、换路由器？\n\n今天一个案例：用户 1000M 宽带，测速只有 20M——以为是运营商问题。\n\n上门一看，路由器放在微波炉旁边，金属外壳屏蔽了 2.4GHz 信号。\n\n花了 30 秒把路由器挪到客厅，测速从 20Mbps → 280Mbps。\n\n问题解决，零成本。\n\n你家的路由器放在哪？拍张照发评论区，免费给你诊断。",
          storyboard: [
            { sec: "0-3", speaker: "专业冷静", text: "1000M宽带→20M：问题出在哪？", camera: "办公环境口播" },
            { sec: "3-13", speaker: "示意图", text: "金属干扰→信号衰减90%", camera: "白板画图讲解" },
            { sec: "13-20", speaker: "实际数据", text: "挪位置后280Mbps", camera: "前后数据对比" },
            { sec: "20-25", speaker: "专业手势", text: "拍照发评论，免费诊断", camera: "口播半身" }
          ]
        },
        master: {
          persona: "资深师傅",
          title: "干了十几年装维，这个问题一半家庭都有",
          tags: "#装维日常 #上门服务 #电信师傅",
          bgm: "简单纯音乐",
          script: "做装维十几年了，上门一看就知道问题出在哪。\n\n今天小姑娘在家做饭，锅糊了不说，网也卡。我去了一看——路由器就在微波炉旁边。难怪！微波炉一开，信号直接废了。\n\n帮她把路由器挪到客厅电视柜上，再测——从 20M 直接飞到 200M。小姑娘高兴得非要留我吃饭。\n\n你家路由器放哪的？拍张照片发评论，师傅给你看合不合理。",
          storyboard: [
            { sec: "0-3", speaker: "师傅温和表情", text: "上门一看就知问题在哪", camera: "工装口播" },
            { sec: "3-13", speaker: "展示常见错误", text: "路由器最怕放微波炉旁", camera: "实拍场景" },
            { sec: "13-20", speaker: "测速设备展示", text: "20M→200M 挪一下就行", camera: "测速仪表展示" },
            { sec: "20-25", speaker: "真诚眼神", text: "发照片到评论区帮你看看", camera: "口播中景" }
          ]
        }
      }
    },

    // ========== 测评类 — 热搜追热点 ==========
    {
      type: "review",
      typeName: "深度测评",
      typeIcon: "🔍",
      hotTopic: "暑期档电影票房破纪录",
      hookType: "数字式",
      hook: "暑期档电影票房破 100 亿了，你在家看还是去电影院？",
      topic: "在家看 4K 电影 vs 电影院，宽带要多少才不卡？",
      coreOffer: "千兆宽带看4K电影不卡顿",
      compliance: { status: "fixed", autoFixed: 1, warnings: [] },
      variants: {
        warm: {
          persona: "暖心姐姐",
          title: "在家看4K电影，宽带多少才不卡？",
          tags: "#4K观影 #宽带推荐 #家庭影院",
          bgm: "电影感纯音乐",
          script: "暑假电影太多了，去电影院又热又要排队。很多大姐问我：在家用电视看 4K 电影，宽带够不够？\n\n姐姐实测了一下：\n\n4K 电影一部大概 50-80GB，流畅播放需要 50Mbps 以上。你在家刷剧不卡、电影不转圈，建议至少 300M 宽带。\n\n想看真 4K 不压缩的，得上 1000M + FTTR全屋覆盖。\n\n来店里找我，免费体验 4K 电影播放效果。评论区留「电影」我告诉你方案。",
          storyboard: [
            { sec: "0-3", speaker: "手持遥控器", text: "在家看4K电影不卡，真的吗？", camera: "客厅环境口播" },
            { sec: "3-13", speaker: "展示电视画面", text: "4K电影50-80GB一部", camera: "电视播放画面" },
            { sec: "13-20", speaker: "测速对比", text: "300M=流畅 1000M=秒开", camera: "手机测速对比" },
            { sec: "20-25", speaker: "微笑邀请", text: "留「电影」推荐方案", camera: "口播收尾" }
          ]
        },
        tech: {
          persona: "技术专家",
          title: "4K vs 1080P 实测：网速差多少？",
          tags: "#4K对比 #网速实测 #技术流",
          bgm: "科技感音效",
          script: "暑期档大片想看 4K 版，又不想顶着 40℃ 去电影院？\n\n实话说，4K 流媒体需要稳定 50Mbps 以上带宽，HDR 版本要 75Mbps。\n\n如果你家是 100M 宽带，一部 4K 电影加载 30 秒。300M 只要 10 秒。1000M —— 3 秒加载，拖动进度条无缓冲。\n\n我帮你算一下你家宽带能不能看 4K：评论区留「测速」，我给你出报告。",
          storyboard: [
            { sec: "0-3", speaker: "展示数据", text: "50Mbps=4K最低门槛", camera: "数据面板" },
            { sec: "3-13", speaker: "对比分析", text: "100M→30秒 300M→10秒 1000M→3秒", camera: "技术对比画面" },
            { sec: "13-20", speaker: "播放画面实测", text: "HDR版本需要75Mbps", camera: "播放器信息展示" },
            { sec: "20-25", speaker: "专业建议", text: "留「测速」出报告", camera: "口播收尾" }
          ]
        },
        vibe: {
          persona: "活力小哥",
          title: "电影院太热？家里安排4K电影！",
          tags: "#4K电影 #夏日宅家 #千兆宽带",
          bgm: "夏日午后 - 岛屿心情",
          script: "电影院？太热了哥们。\n\n在家吹着空调看 4K 电影不爽吗？暑期档一部接一部，在家躺着刷。\n\n但注意啊——4K 电影不是随便一台电视就能看的，你家宽带得够！\n\n想不卡的：宽带至少 300M。想极致体验的：1000M 直接安排。\n\n现在办千兆宽带送 4K 机顶盒，评论区扣「电影」我告诉你到哪办最划算！",
          storyboard: [
            { sec: "0-3", speaker: "瘫沙发姿势", text: "40℃ 在家看4K不香吗？", camera: "休闲环境口播" },
            { sec: "3-13", speaker: "激动演示", text: "300M不卡 1000M起飞", camera: "表情丰富手势" },
            { sec: "13-20", speaker: "展示机顶盒", text: "办千兆送4K机顶盒", camera: "产品快切" },
            { sec: "20-25", speaker: "指向镜头", text: "扣「电影」发你地址", camera: "收尾口播" }
          ]
        },
        sweet: {
          persona: "甜美学姐",
          title: "暑假追剧的宝子，这份网速指南收好",
          tags: "#追剧 #4K #暑假必看",
          bgm: "恋爱循环 - 花泽香菜",
          script: "宝子们！暑期档好剧一堆堆的，但每次看到关键剧情就开始转圈圈？\n\n别急着换手机，可能是你家的宽带不够用！\n\n学姐实测过了：\n一个人追剧 → 100M 够\n两个人一起看不同剧 → 300M\n一家人一起看 4K → 1000M\n\n现在办千兆宽带还送视频会员！评论区留「追剧」我告诉你怎么办最划算。",
          storyboard: [
            { sec: "0-3", speaker: "抱抱枕表情", text: "追剧转圈圈？不是手机的问题！", camera: "居家口播" },
            { sec: "3-13", speaker: "展示方案卡片", text: "100M/300M/1000M追剧方案", camera: "展示手写卡片" },
            { sec: "13-20", speaker: "惊喜表情", text: "办千兆送视频会员！", camera: "开心展示" },
            { sec: "20-25", speaker: "比心wink", text: "留「追剧」发优惠", camera: "收尾口播" }
          ]
        },
        pro: {
          persona: "商务精英",
          title: "40℃高温，在家看4K电影的性价比方案",
          tags: "#4K电影 #性价比 #宽带推荐",
          bgm: "商务轻快配乐",
          script: "暑期档大片密集上映。去电影院，一家三口 200 块起步、来回 1 小时。在家看 4K——免费、随时、躺着看。\n\n但 4K 流媒体对网络有硬性要求：\n\n基础档（偶尔看）：100M 够用，加载慢 30 秒\n标准档（经常看）：300M 推荐，性价比最高\n旗舰档（追求极致）：1000M + FTTR\n\n我家自己用的是 300M，一年省下的电影票钱够付 3 年宽带费。评论区留「4K」我帮你算算哪档划算。",
          storyboard: [
            { sec: "0-3", speaker: "干练外套", text: "看电影=200块 在家看=免费", camera: "办公室口播" },
            { sec: "3-13", speaker: "列数据", text: "电影院vs家庭影院 年省3000元", camera: "数据对比" },
            { sec: "13-20", speaker: "自家案例", text: "300M宽带=3年省出一台电视", camera: "算账展示" },
            { sec: "20-25", speaker: "专业风范", text: "留「4K」帮你算账", camera: "口播收尾" }
          ]
        },
        master: {
          persona: "资深师傅",
          title: "想在家看4K？先看看你家宽带够不够",
          tags: "#4K观影 #宽带升级 #电信师傅",
          bgm: "轻松纯音乐",
          script: "夏天嘛，最舒服的事就是在家吹空调看电影。但很多人跟我说——4K 电影老是卡，一卡就来气。\n\n师傅告诉你，不一定是网的问题，是你家的宽带套餐太老了。\n\n现在的 4K 电影一部 50G 起步，老套餐哪撑得住？\n\n来店里找我，免费测你家网速能不能跑 4K。带身份证就行，5 分钟出结果。",
          storyboard: [
            { sec: "0-3", speaker: "站着说话", text: "4K卡？可能是宽带老了", camera: "营业厅口播" },
            { sec: "3-13", speaker: "拿工具演示", text: "测速就知道够不够", camera: "测速操作" },
            { sec: "13-20", speaker: "展示设备", text: "带身份证来测，5分钟", camera: "展示测试设备" },
            { sec: "20-25", speaker: "温暖笑容", text: "来店里，免费测", camera: "收尾口播" }
          ]
        }
      }
    },

    // ========== 活动类 — 入伏免费福利 ==========
    {
      type: "local",
      typeName: "本地事件",
      typeIcon: "📍",
      hotTopic: "多地用电负荷创历史新高",
      hookType: "反常识式",
      hook: "天热用电创纪录，但来电信营业厅反而能省电费？",
      topic: "入伏高温：到营业厅蹭空调、免费测网速、免费贴膜",
      coreOffer: "高温福利：到店免费贴膜+测速+领水",
      compliance: { status: "passed", autoFixed: 0, warnings: [] },
      variants: {
        warm: {
          persona: "暖心姐姐",
          title: "天热别在外面走，来营业厅凉快一下",
          tags: "#高温福利 #营业厅服务 #免费贴膜",
          bgm: "小清新纯音乐",
          script: "天太热了，最近好多大姐进来不是办业务的，就为了凉快一会儿喝杯水。\n\n姐姐我特别理解。所以咱们营业厅准备了：\n\n✅ 免费贴膜——什么手机都能贴，比外面 30 块的还好\n✅ 免费测速——看看你家宽带到底跑多少，不满意当场排查\n✅ 免费矿泉水——进来休息一下，喝杯水再走\n\n就算不办业务，也欢迎进来坐坐。路过的话进来喝口水。",
          storyboard: [
            { sec: "0-3", speaker: "门口迎接", text: "天太热了？进来凉快！", camera: "营业厅外景欢迎" },
            { sec: "3-13", speaker: "展示贴膜", text: "免费贴膜+清洁", camera: "贴膜操作特写" },
            { sec: "13-20", speaker: "递水", text: "免费矿泉水随便喝", camera: "温馨互动场景" },
            { sec: "20-25", speaker: "微笑挥手", text: "进来坐坐，不办业务也行", camera: "开心的笑容收尾" }
          ]
        },
        tech: {
          persona: "技术专家",
          title: "高温天设备最容易出问题，免费自查指南",
          tags: "#设备维护 #高温提醒 #营业厅免费服务",
          bgm: "科技轻音",
          script: "高温天，电子设备故障率上升 30%。主要是散热和静电问题。\n\n建议入伏后来营业厅做一次免费设备体检：\n\n① 路由器散热检查——过热会导致频繁掉线\n② 光猫信号强度测试——免费上门测速\n③ 手机清洁保养——超声波清洁+系统缓存清理\n\n来之前最好打个电话，不然排队要等。",
          storyboard: [
            { sec: "0-3", speaker: "展示设备", text: "高温天设备故障率↑30%", camera: "专业设备展示" },
            { sec: "3-13", speaker: "操作演示", text: "路由器散热/光猫/手机保养", camera: "技术操作画面" },
            { sec: "13-20", speaker: "检测过程", text: "免费上门测速", camera: "检测流程展示" },
            { sec: "20-25", speaker: "温馨提示", text: "来前打电话，省排队", camera: "口播收尾" }
          ]
        },
        vibe: {
          persona: "活力小哥",
          title: "天热到炸？来营业厅蹭3样东西",
          tags: "#高温福利 #营业厅蹭空调 #免费贴膜",
          bgm: "夏日活力音乐",
          script: "40℃的天，室外待 5 分钟就熟了！\n\n听哥一句：赶紧来营业厅蹭福利！\n\n① 免费贴膜——曲面直屏都能贴，省 30 块钱\n② 免费测速——看看你家宽带是不是被热缩水了\n③ 免费矿泉水——冰的！不是常温！\n\n办不办业务无所谓，来坐坐吹吹空调。我不坑你，真的。",
          storyboard: [
            { sec: "0-3", speaker: "擦汗表情", text: "40℃的室外 vs 营业厅的空调", camera: "夸张对比" },
            { sec: "3-13", speaker: "列举3样", text: "免费贴膜+测速+冰水", camera: "掰手指" },
            { sec: "13-20", speaker: "展示冰水", text: "冰矿泉水！真的冰！", camera: "展示水瓶" },
            { sec: "20-25", speaker: "真诚表情", text: "不办业务也欢迎", camera: "收尾口播" }
          ]
        },
        sweet: {
          persona: "甜美学姐",
          title: "宝子！天热别在外面跑，学姐在营业厅等你",
          tags: "#高温避暑 #营业厅 #免费福利",
          bgm: "夏日甜心 - 纯音乐",
          script: "宝子们！！天热到化妆 5 分钟就花了是不是？\n\n来营业厅找学姐啊！空调随便吹！\n\n而且还有免费服务：\n💅 免费贴膜——什么型号都行\n📱 免费清洁——超声波洗手机\n💧 免费冰水——直接拿去不客气\n\n到店报「学姐推荐」还有小礼物！快快快，评论区留城市我告诉你最近的店。",
          storyboard: [
            { sec: "0-3", speaker: "wink表情", text: "天热？来营业厅找学姐", camera: "甜美口播" },
            { sec: "3-13", speaker: "展示服务", text: "贴膜+清洁+冰水", camera: "服务展示" },
            { sec: "13-20", speaker: "神秘表情", text: "报暗号有小礼物", camera: "俏皮展示" },
            { sec: "20-25", speaker: "指镜头比心", text: "留城市发地址", camera: "甜美收尾" }
          ]
        },
        pro: {
          persona: "商务精英",
          title: "高温天不出门？营业厅提供上门服务",
          tags: "#高温避暑 #上门服务 #商务效率",
          bgm: "商务轻音乐",
          script: "40℃+的高温，出门确实不划算。\n\n但手机该贴膜了、宽带该测速了、家里老人手机该教了——怎么办？\n\n不用出门，我们提供上门服务：\n\n✅ 宽带免费上门测速、排查故障\n✅ 手机贴膜+清洁（可预约上门）\n✅ 教老人用智能手机\n\n评论区留「上门」+ 地址，当天预约当天上门。",
          storyboard: [
            { sec: "0-3", speaker: "办公室背景", text: "40℃不出门→我们上门", camera: "商务口播" },
            { sec: "3-13", speaker: "列举服务", text: "测速/贴膜/教老人→上门", camera: "服务清单展示" },
            { sec: "13-20", speaker: "展示上门服务", text: "当天预约当天上门", camera: "服务场景" },
            { sec: "20-25", speaker: "专业收尾", text: "留「上门」立即安排", camera: "口播收尾" }
          ]
        },
        master: {
          persona: "资深师傅",
          title: "高温天保养好家里这两样东西，不然容易坏",
          tags: "#高温保养 #宽带维护 #电信师傅",
          bgm: "生活纯音乐",
          script: "每年这个时候，设备故障就多起来了。\n\n师傅提醒大家两样东西要注意：\n\n第一，路由器。高温天记得放在通风处，别塞柜子里。散热不好容易断流。\n\n第二，光猫。检查一下指示灯，红灯闪烁说明信号有问题，及时报修。\n\n拿不准的，来营业厅我帮你看看。或者评论区留个地址，顺路的话上门帮你调。",
          storyboard: [
            { sec: "0-3", speaker: "展示工具箱", text: "天热容易坏的东西：路由器和光猫", camera: "工装口播" },
            { sec: "3-13", speaker: "操作演示", text: "路由器：通风≠塞柜子", camera: "设备操作特写" },
            { sec: "13-20", speaker: "光猫指示灯展示", text: "红灯=报修 绿灯=正常", camera: "指示灯教学" },
            { sec: "20-25", speaker: "师傅招牌微笑", text: "留地址顺路上门", camera: "收尾口播" }
          ]
        }
      }
    }
  ]
};

// ===== hotspotData.js =====
// Auto-generated hotspot follow-shot data
// Updated: 2026-07-13 · Mode: AI-enhanced
// Compliance: 7/7 passed
// Source: 60s.viki.moe/v2/douyin
window.___hotspotData = [
{
  "id": "h1",
  "tier": 3,
  "title": "世界杯四强聚齐，电信四大福利炸场！",
  "heat": "抖音热搜#34 · AI精选",
  "why": "蹭世界杯四强热度，用体育赛事类比电信营业厅四大优惠，反差玩法制造好奇，吸引线下到店。",
  "source": "https://www.douyin.com/search/%E4%B8%96%E7%95%8C%E5%89%8D%E5%9B%9B%E9%BD%90%E8%81%9A%E4%B8%96%E7%95%8C%E6%9D%AF%E5%9B%9B%E5%BC%BA",
  "steps": [
    {
      "shot": "拦下路人：“帅哥，世界杯四强是哪四个队知道不？”路人答或懵，主播接：“巧了，咱电信营业厅也有四大福利！”",
      "sub": "你知道世界杯四强吗？巧了，我们也有四大福利！"
    },
    {
      "shot": "镜头切主播展示手机：“每月消费一分不涨，新手机随便挑，华为苹果都有，还有一堆礼品白送。”",
      "sub": "每月消费不变，新手机随你挑，礼品白送！"
    },
    {
      "shot": "主播指地面：“评论区打‘世界杯’，直接来新建路营业厅，蓝牙耳机免费领，手慢无！”",
      "sub": "评论区扣世界杯，到新建路营业厅领耳机，手慢无！"
    }
  ],
  "bgm": "《Waka Waka》高潮片段，节奏感强",
  "tags": "#世界杯 #电信福利 #太原电信 #营业厅日常",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h2",
  "tier": 3,
  "title": "在电信营业厅跳jumpstyle是什么体验",
  "heat": "抖音热搜#28 · AI精选",
  "why": "纯粹蹭热搜第28名舞蹈热点，用反差场景（营业厅严肃环境VS魔性舞蹈）制造记忆点，顺便植入福利信息",
  "source": "https://www.douyin.com/search/%E8%B0%81%E8%BF%98%E6%B2%A1%E4%B8%8Ajumpstyle%E8%88%9E%E8%B9%88%E6%9C%AB%E7%8F%AD%E8%BD%A6",
  "steps": [
    {
      "shot": "店员突然叫住路人：“帅哥等一下，你还没上那趟舞蹈末班车吧？”",
      "sub": "钩子：蹭热搜话题，制造悬念"
    },
    {
      "shot": "镜头切到营业厅内，店员和路人一起跳jumpstyle，字幕弹出：每月消费不变，手机直接优惠500",
      "sub": "利益点：舞蹈反差中强插优惠，避开违禁词"
    },
    {
      "shot": "舞蹈结束，店员对镜头说：“评论区扣‘跳舞’到店领专属福利，地址在左下角”",
      "sub": "行动指令+地址，引导到店"
    }
  ],
  "bgm": "jumpstyle经典快节奏舞曲（如Da Tweekaz版）",
  "tags": "#jumpstyle舞蹈末班车 #电信营业厅 #反差舞蹈 #本地生活优惠",
  "difficulty": 2,
  "needFace": true,
  "time": "40秒"
},
{
  "id": "h3",
  "tier": 3,
  "title": "电信福利夯中夯，手机直接拿！",
  "heat": "抖音热搜#49 · AI精选",
  "why": "蹭电影热度，用“夯中夯”制造好奇，反差引出电信福利。",
  "source": "https://www.douyin.com/search/%E7%94%B5%E5%BD%B1%E5%85%AB%E4%BB%99%E5%8F%AF%E4%BB%A5%E7%BB%99%E5%88%B0%E5%A4%AF%E4%B8%AD%E5%A4%AF",
  "steps": [
    {
      "shot": "哎，停一下！你知道最近电影八仙里的“夯中夯”啥意思不？",
      "sub": "电信福利“夯中夯”是啥？"
    },
    {
      "shot": "就是强中强！咱电信现在每月消费不变，手机直接拿走，夯不夯？",
      "sub": "每月消费不变📱手机白拿！"
    },
    {
      "shot": "想夯的赶紧评论区扣“八仙”，到店还有隐藏福利，地址左下角！",
      "sub": "扣“八仙”领福利📍左下角地址"
    }
  ],
  "bgm": "轻快卡点，如《Dance Monkey》",
  "tags": "#电影八仙夯中夯 #山西电信 #电信福利 #手机优惠 #到店有礼",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h4",
  "tier": 1,
  "title": "火把节没去贵州？来山西电信营业厅照样“燃”",
  "heat": "抖音热搜#1 · AI精选",
  "why": "贵州火把节热搜第一，全民围观民族狂欢，电信营业厅借势打造“线下火把节”反差玩法，用热闹氛围引流到店。",
  "source": "https://www.douyin.com/search/%E8%B4%B5%E5%B7%9E%E7%81%AB%E6%8A%8A%E8%8A%82%E5%B7%B2%E7%BB%8F%E5%87%86%E5%A4%87%E5%B0%B1%E7%BB%AA%E4%BA%86",
  "steps": [
    {
      "shot": "店员突然叫住路人：“别去贵州挤啦！咱这儿也有火把节福利！”",
      "sub": "钩子：蹭热搜制造好奇心"
    },
    {
      "shot": "手持火把造型道具，指向营业厅：“每月消费不变，手机优惠直接‘燃’爆！”",
      "sub": "利益点：强调省钱，巧用‘燃’字呼应火把节"
    },
    {
      "shot": "镜头切到店内热闹布置，店员喊：“评论区扣‘火把’，到店领限量火把节礼包，地址在这！”",
      "sub": "行动指令+地址：引导互动并到店"
    }
  ],
  "bgm": "快节奏民族风卡点音乐（如《火把节》改编版）",
  "tags": "#山西电信 #火把节 #电信营业厅跟拍 #本地生活福利",
  "difficulty": 1,
  "needFace": true,
  "time": "15分钟（含简单道具准备）"
},
{
  "id": "h5",
  "tier": 1,
  "title": "旧凉席变身战甲冲进电信厅，店员都懵了",
  "heat": "抖音热搜#2 · AI精选",
  "why": "这条热搜是生活手工类，本身与电信无关，但我们可以硬蹭“旧物改造”概念，玩反差：你以为我在cos岳飞，其实我在薅电信的以旧换新福利，旧凉席能变战甲，旧手机更能变优惠。",
  "source": "https://www.douyin.com/search/%E7%94%A8%E6%97%A7%E5%87%89%E5%B8%AD%E6%89%93%E9%80%A0%E5%B2%B3%E6%AD%A6%E7%A9%86%E6%88%98%E7%94%B2",
  "steps": [
    {
      "shot": "身穿凉席战甲的人突然拦住路人，镜头怼脸：别跑！每月消费一分没多，手机却白拿，你信不信？",
      "sub": "钩子：cos+悬念，吸引停留"
    },
    {
      "shot": "主角脱下战甲头盔，指着电信营业厅：旧凉席都能改成战甲，你的旧手机在电信能换真金白银优惠，每月消费不变，新手机、新耳机直接带走。",
      "sub": "利益点：旧机换新，每月消费不变"
    },
    {
      "shot": "主角把战甲披在店员身上，对镜头招手：想换的评论区扣“换”，我直接带你到太原电信南中环厅，当面办！",
      "sub": "行动指令+地址，引导到店"
    }
  ],
  "bgm": "《精忠报国》搞笑变速版或古风卡点音乐",
  "tags": "#旧凉席战甲 #电信营业厅 #以旧换新 #每月消费不变 #太原电信",
  "difficulty": 2,
  "needFace": true,
  "time": "拍摄15分钟，剪辑20分钟"
},
{
  "id": "h6",
  "tier": 1,
  "title": "电信营业厅的“硬核福利”被发现了？",
  "heat": "抖音热搜#3 · AI精选",
  "why": "硬蹭热搜，用“硬核成就”话题制造反差，把电信福利包装成隐藏版硬核成就，吸引好奇点击",
  "source": "https://www.douyin.com/search/%E6%88%91%E5%9B%BD%E5%A4%9A%E9%A2%86%E5%9F%9F%E8%A7%A3%E9%94%81%E7%A1%AC%E6%A0%B8%E6%88%90%E5%B0%B1",
  "steps": [
    {
      "shot": "主播突然叫住路人：“等等！你知道最近我国解锁了很多硬核成就吧？”路人点头，主播话锋一转：“但你绝对不知道，电信也有个隐藏硬核福利！”",
      "sub": "钩子：用热点话题制造悬念，引起路人兴趣"
    },
    {
      "shot": "主播掏出手机展示：“每个月的消费不变，手机还能直接优惠拿，这算不算生活里的硬核成就？”路人惊讶凑近看。",
      "sub": "利益点：每月消费不变、手机优惠，避免禁用词"
    },
    {
      "shot": "主播指向镜头：“想解锁这个硬核福利？评论区扣‘硬核’，或者直接来太原平阳路电信营业厅，我带你实操！”",
      "sub": "行动指令+地址：评论区互动，引导到店"
    }
  ],
  "bgm": "《奇迹再现》副歌卡点片段，热血反转感",
  "tags": "#硬核成就 #电信福利 #山西电信 #营业厅跟拍",
  "difficulty": 2,
  "needFace": true,
  "time": "1.5小时"
},
{
  "id": "h7",
  "tier": 1,
  "title": "暴雨天别傻站着，进来领个手机",
  "heat": "抖音热搜#4 · AI精选",
  "why": "蹭沈阳暴雨热度，用避雨场景制造反差，把路人躲雨转化为电信福利体验，情感共鸣强易传播",
  "source": "https://www.douyin.com/search/%E6%B2%88%E9%98%B3%E6%9A%B4%E9%9B%A8",
  "steps": [
    {
      "shot": "营业厅门口，小哥朝雨中躲闪的路人招手：哎别淋了，快进来坐会儿，雨这么大！",
      "sub": "钩子：暴雨中叫住路人，建立情感链接"
    },
    {
      "shot": "镜头切到小哥和路人站在手机展示柜前，小哥说：每月消费不变，手机免费拿，你知道不？",
      "sub": "利益点：每月消费不变领手机，规避话费卡等词"
    },
    {
      "shot": "小哥递过宣传单，对着镜头说：想换手机的评论区扣1，或者直接导航山西电信营业厅，等你！",
      "sub": "行动指令+地址：评论区互动，引导到店"
    }
  ],
  "bgm": "轻快治愈系钢琴曲，如《Rainy Day Morning》",
  "tags": "#沈阳暴雨 #电信福利 #避雨好去处 #山西电信 #手机免费领",
  "difficulty": 2,
  "needFace": true,
  "time": "8分钟现场拍摄"
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
  var comments = null;
  try { comments = AppState.get('ai_comments_' + t, null); } catch(e) {}
  if (!comments || comments.length < 3) { comments = getTemplateComments(t, city, topic, scriptText); }
  var seoTitle = buildSeoTitle(t, loc, topic, scriptText);
  var storeName = loc; // 只取地市名，不带营业厅名称
  // 如果 loc 仍是占位符，尝试从表单读取
  if (!loc || loc === '本地' || loc === '同城') {
    var cityFromField = readFieldVal(t + '_city');
    if (cityFromField) storeName = cityFromField;
  }
  var hasAI = (function(){try{var cc=AppState.get('ai_comments_'+t,null);return cc&&cc.length>=3}catch(e){return false}})();

  var html = '<div class="publish-kit" style="margin-top:16px;padding:0;background:#fff;border-radius:14px;border:1px solid #D3D1C7;overflow:hidden;">';
  html += '<div style="padding:14px 16px;border-bottom:1px solid #E8E6DC;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12px;color:#888780;">';
  html += '<span style="font-weight:500;color:#5F5E5A;">发布准备</span>';
  html += '<span style="margin-left:auto;">' + (scriptText ? Math.ceil(scriptText.length/4) + '秒' : '约15分钟') + '</span>';
  if (bgmText) html += '<span>' + esc(bgmText.slice(0,20)) + '</span>';
  html += '<span>' + bestTime + '</span>';
  html += '</div>';
  // 标签行：有复制按钮
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;display:flex;align-items:center;gap:8px;"><span style="font-weight:500;color:#5F5E5A;">标签 </span><span style="flex:1;">' + esc(tags) + '</span><span onclick="copyText(\'' + esc(tags).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;">复制</span></div>';
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;display:flex;align-items:center;gap:8px;"><span style="font-weight:500;color:#5F5E5A;">标题 </span><span style="flex:1;">' + esc(seoTitle) + '</span><span onclick="copyText(\'' + esc(seoTitle).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;">复制</span></div>';
  // 位置行：不需要复制按钮
  html += '<div style="padding:10px 16px;border-bottom:1px solid #E8E6DC;font-size:11px;color:#888780;"><span style="font-weight:500;color:#5F5E5A;">位置 </span><span>' + esc(storeName) + '</span></div>';
  html += '<div style="padding:14px 16px;border-bottom:1px solid #E8E6DC;">';
  html += '<div style="font-weight:500;font-size:13px;color:#5F5E5A;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><span>' + (hasAI ? 'AI 智能评论' : '评论区准备') + '</span><button onclick="triggerCommentOptimize(\'' + t + '\',\'' + loc.replace(/'/g,'&#39;') + '\',\'' + (topic||'').replace(/'/g,'&#39;') + '\')" style="font-size:11px;background:none;border:1px dashed #1D9E75;color:#1D9E75;border-radius:4px;padding:1px 8px;cursor:pointer;white-space:nowrap;">🔄 AI 优化</button></div>';
  html += '<div class="comment-list">';
  for (var c = 0; c < comments.length; c++) {
    html += '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;"><span style="font-size:12px;min-width:18px;color:#888780;">' + (c+1) + '</span><span style="flex:1;line-height:1.5;color:#2C2C2A;">' + esc(comments[c]) + '</span><span onclick="copyText(\'' + esc(comments[c]).replace(/'/g,'&#39;') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;color:#1D9E75;font-size:11px;white-space:nowrap;padding:2px 8px;border:0.5px solid #5DCAA5;border-radius:6px;">复制</span></div>';
  }
  html += '</div>';
  
  // Build full bundle for one-click copy (uses dynamic read for AI-updated comments)
  html += '<div style="padding:14px 16px;">';
  html += '<button onclick="copyPublishBundle()" style="width:100%;padding:12px;background:#1D9E75;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;">一键复制发布包（脚本+标题+标签+评论）</button>';
  html += '<div style="text-align:center;font-size:11px;color:#B4B2A9;margin-top:6px;">粘贴到抖音，配视频，发布</div>';
  html += '</div>';
  html += '</div>';
  return html;
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
    { kw: '宽带', re: /宽带|网速|光纤|FTTR|套餐|月租/i },
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
    if (/宽带|网速|WiFi|光纤|FTTR|套餐|月租|兆/i.test(ctx)) {
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

// ===== t1Presets.js =====
// Auto-generated by simulate-topics-full.mjs
// Date: 2026-07-16 · Mode: L1+L2
window.___t1Presets = {
  "宽带选多少兆": [
    "一个人住，刷视频聊微信，100兆够用月租59",
    "两户三口之家，同时上网不打架，300兆月租79",
    "全屋智能多个设备，千兆一步到位月租99"
  ],
  "暑假孩子天天在家，宽带选多少兆够用？": [
    "一个人带娃在家刷视频上网课，100兆够用月租59",
    "两三个大人+孩子各玩各的，300兆不卡月租79",
    "一家老小全在家各刷各的，千兆一步到位月租99"
  ],
  "一个人住选什么宽带最划算？100M vs 300M vs 1000M": [
    "经常点外卖很少看电视，100兆入门够用月租59",
    "下班就开电脑打游戏看直播，300兆不卡月租79",
    "对网速没要求不折腾，100兆够用，省下来的钱点两杯奶茶"
  ],
  "家庭宽带怎么选？三口之家最优方案": [
    "夫妻俩都上班晚上刷刷手机，100兆够用不浪费",
    "孩子上网课家长看视频，300兆性价比最高月租79",
    "全家都爱看爱奇艺腾讯视频，300兆足够，不用多花钱上千兆"
  ],
  "套餐怎么选": [
    "月流量超过30G的，59元大流量套餐最适合你",
    "月通话超过300分钟的，39元畅聊套餐话费全包",
    "全家2-4人一起用，99元融合套餐人均不到30"
  ],
  "老人手机套餐怎么选？3款适老套餐对比": [
    "老人只接打电话发微信，月租39元的老年套餐够用",
    "老人想刷视频看新闻，59元大流量套餐更适合",
    "老人和子女一起用融合套餐，主号副号共享流量更划算"
  ],
  "合约机 vs 买裸机，3年算下来谁省钱？": [
    "预算有限想分期，合约机月付少首付低，3年比裸机省千元",
    "不想被绑定想换就换，裸机一次付清自由选套餐",
    "有旧手机想升级，以旧换新旧机折价加补贴相当于半价换新"
  ],
  "FTTR到底值不值得装？用数据说话": [
    "房子90平以内一个千兆路由器就够，不用多花钱装FTTR",
    "房子120平以上大平层，FTTR全屋光纤每个房间都满格",
    "复式别墅三层以上，FTTR是唯一解决方案非装不可"
  ],
  "家里WiFi信号差？先别急着换路由器": [
    "路由器放角落或者塞柜子里，先挪到客厅中间高处试试",
    "路由器旁边有微波炉电视机，金属干扰信号，挪开30厘米",
    "以上都试了还不行，换WiFi6千兆路由器200元内搞定"
  ],
  "全屋WiFi怎么布局？90平/120平/复式方案": [
    "90平两室一厅，一个千兆路由器放客厅中间就够了",
    "120平三室两厅，客厅+主卧各放一个组mesh全覆盖",
    "复式三层以上，FTTR全屋光纤每个房间信号都满格"
  ],
  "打游戏用什么宽带？延迟对比实测": [
    "偶尔打几把吃鸡王者，100兆够用延迟40ms以内",
    "每周固定开黑打端游，300兆延迟低于20ms不卡顿",
    "直播打游戏职业玩家，千兆FTTR延迟个位数不掉线"
  ],
  "学生套餐怎么选？4款热门横向对比": [
    "月流量30G以内刷社交聊天，29元校园卡够了",
    "天天刷视频看直播流量大户，49元大流量校园卡划算",
    "又要流量又要通话还要宽带，79元校园融合套餐一步到位"
  ],
  "流量不够用？5种加量方案帮你选": [
    "偶尔超流量，加一个10元5G流量包当月用下月取消",
    "每月都超流量但不多，升级到59元大流量套餐更划算",
    "全家都不够用，办融合套餐副卡共享流量人均省一半"
  ],
  "租房宽带怎么选？短期vs长期租房攻略": [
    "租期不到半年不确定，办个流量卡开热点够用了",
    "租期半年到一年有稳定需求，办低月租宽带可移机",
    "租期一年以上当自己家，办融合套餐宽带手机一起搞定"
  ]
};

// ===== t2Presets.js =====
// Auto-generated by simulate-topics-full.mjs
// Date: 2026-07-16 · Mode: L1+L2
window.___t2Presets = {
  "上门维修": {
    "time": "今天下午",
    "customer": "阿姨",
    "problem": "说家里网卡了好久了，看视频一直转圈",
    "finding": "路由器被塞在电视柜最里面，旁边还放着微波炉",
    "steps": "1. 把路由器挪到客厅中间\n2. 避开金属物和微波炉\n3. 重启路由器测信号",
    "reaction": "WiFi满格了！看视频再也不转圈了",
    "summary": "很多网慢问题，都是路由器位置没放对",
    "tags": "#上门维修 #WiFi卡顿 #装维日常"
  },
  "柜台服务": {
    "time": "今天上午",
    "customer": "年轻人",
    "problem": "来缴话费，顺便问了句流量老不够用怎么办",
    "finding": "查了一下套餐，发现用的是三年前的老套餐，同样价格现在能多30G",
    "steps": "1. 打开系统查当前套餐\n2. 对比同价位新套餐\n3. 帮客户一键换套餐",
    "reaction": "每个月多30G还不多花钱！太感谢了",
    "summary": "很多老客户的套餐都该更新了，来店里免费帮你查",
    "tags": "#柜台故事 #套餐升级 #省钱攻略"
  },
  "突发状况": {
    "time": "昨天傍晚",
    "customer": "大爷",
    "problem": "急匆匆跑进来说手机突然上不了网，孙子等着上网课",
    "finding": "一看是流量用完了，大爷不懂怎么看，急得满头大汗",
    "steps": "1. 安抚大爷情绪\n2. 查流量使用情况\n3. 赠送1G临时流量先用着",
    "reaction": "孙子网课上成了，大爷连说谢谢",
    "summary": "家里有老人用手机的，记得帮他们设置流量提醒",
    "tags": "#突发状况 #暖心服务 #流量告急"
  },
  "温暖瞬间": {
    "time": "上周",
    "customer": "独居老人",
    "problem": "来店里问能不能教她跟女儿视频通话",
    "finding": "手机是女儿买的但老人只会接电话，其他功能都不会用",
    "steps": "1. 帮老人连上营业厅WiFi\n2. 一步步教怎么打视频\n3. 写在纸上让老人带回家",
    "reaction": "打通了女儿的视频，老人眼眶红了",
    "summary": "有些服务，不在套餐里，在心意里",
    "tags": "#温暖瞬间 #老人服务 #数字鸿沟"
  },
  "装机故事": {
    "time": "今天",
    "customer": "年轻夫妻",
    "problem": "刚搬新家要装宽带，但房子是老小区，布线很麻烦",
    "finding": "楼道里光纤箱距离远，需要从外墙走线",
    "steps": "1. 勘察走线路径\n2. 外墙固定光纤\n3. 入户测速达标",
    "reaction": "新家终于有网了，夫妻俩一起开电视庆祝",
    "summary": "不管多难装的房子，我们都能搞定",
    "tags": "#装机故事 #新家宽带 #装维小哥"
  },
  "暑期蹭网故事": {
    "time": "暑假午后",
    "customer": "在家无事的初中生",
    "problem": "爸妈上班不在家，孩子想用手机看网课，但家里的WiFi太卡老是加载不出来",
    "finding": "孩子家是老套餐100兆，爸妈不在家时孩子开多个设备同时刷，带宽不够用了",
    "steps": "1.远程指导孩子检查路由器位置\n2.发现路由器在弱电箱里信号被屏蔽\n3.帮忙预约上门调试时间",
    "reaction": "调整后网速翻倍，孩子说终于能好好学习了",
    "summary": "暑期孩子一个人在家，别让网速耽误了他",
    "tags": "#暑期 #学生 #WiFi优化 #宽带升级"
  },
  "暑期换机": {
    "time": "七月中旬",
    "customer": "暑期打工的学生",
    "problem": "用暑假打工攒的钱来买手机，预算很有限但想做分期",
    "finding": "学生没信用卡做不了分期，但暑期有学生专属优惠和赠品方案",
    "steps": "1. 了解学生预算和心仪机型\n2. 推荐同价位性价比最高的选择\n3. 办理学生专属套餐+赠品（耳机/充电宝/保护壳）",
    "reaction": "拿着新手机和赠品走的，说暑假打工值了",
    "summary": "暑假不只有打工，还有攒钱买新手机的那份成就感",
    "tags": "#暑期换机 #学生购机 #打工换新机 #性价比"
  },
  "老客户情谊": {
    "time": "这周三",
    "customer": "老客户张叔",
    "problem": "来店里不是为了办业务，就是路过进来聊聊天",
    "finding": "张叔是十年老客户了，从办第一个宽带开始就在我们厅",
    "steps": "1. 给张叔倒了杯水\n2. 顺便帮他查了查有没有欠费\n3. 提醒他老客户积分可以换礼品",
    "reaction": "张叔笑着说你们还记得我，换了个保温杯高高兴兴走了",
    "summary": "十年老客户，处成了街坊邻居",
    "tags": "#老客户 #街坊邻里 #十年用户"
  },
  "校园迎新": {
    "time": "九月开学季",
    "customer": "大一新生",
    "problem": "和爸妈一起来办人生第一张手机卡，不知道该选什么套餐",
    "finding": "新生对流量需求很大但预算有限，校园套餐比社会套餐便宜一半",
    "steps": "1. 了解新生日常使用习惯\n2. 推荐校园专属融合套餐\n3. 手把手教激活和查流量",
    "reaction": "爸妈放心了，学生开心地说终于有自己号码了",
    "summary": "大学第一课：选对套餐，四年不愁",
    "tags": "#校园迎新 #开学季 #第一张电话卡 #新生报到"
  },
  "社区营销": {
    "time": "周六上午",
    "customer": "社区居民",
    "problem": "电信进社区摆摊做便民服务，居民围过来问宽带提速",
    "finding": "很多居民不知道自己的宽带可以免费提速，更不知道同价位的套餐已经升级了",
    "steps": "1. 搭好便民服务台\n2. 主动询问居民上网体验\n3. 现场查套餐和网速，给升级建议",
    "reaction": "王阿姨当场办理提速，开心地说晚上看直播不卡了",
    "summary": "走出去，把服务送到家门口",
    "tags": "#社区营销 #便民服务 #宽带提速 #进社区"
  },
  "政企服务": {
    "time": "周三",
    "customer": "某单位办公室",
    "problem": "单位网络改造，多条专线+宽带+固话综合方案，时间紧要求高",
    "finding": "现场勘查发现原有线路老化，需要重新布光纤并升级到企业级方案",
    "steps": "1. 带领技术团队现场勘查\n2. 出方案：企业专线+云桌面+视频会议一站式\n3. 协调施工队周末加班完成",
    "reaction": "甲方负责人说效率真高，下个标还找你们",
    "summary": "政企服务拼的是响应速度和专业度",
    "tags": "#政企服务 #企业专线 #网络改造 #一站式方案"
  },
  "银发服务": {
    "time": "下午三点",
    "customer": "退休李阿姨",
    "problem": "智能手机用了半年还是不太会，每次来营业厅都带个本子记步骤",
    "finding": "李阿姨最怕的是流量超了扣费，完全不敢用移动数据",
    "steps": "1. 帮李阿姨设置流量用量提醒\n2. 教她连WiFi、打微信视频\n3. 把关键步骤截图发到她微信",
    "reaction": "李阿姨第一次自己跟孙子视频成功，激动得发朋友圈",
    "summary": "帮银发族跨过数字鸿沟，是营业厅的社会责任",
    "tags": "#银发服务 #智慧助老 #数字鸿沟 #微信教学"
  },
  "投诉化解": {
    "time": "周一上午",
    "customer": "怒气冲冲的张先生",
    "problem": "宽带断了好几次，打电话报修说要等48小时，直接冲到营业厅来",
    "finding": "查了才知道是小区施工把光纤挖断了，属于意外故障，但响应确实慢了",
    "steps": "1. 先倒水让客户消消气\n2. 解释故障原因和修复进度\n3. 主动申请补偿+加急派单",
    "reaction": "张先生气消了说理解，走的时候还说了句辛苦了",
    "summary": "投诉不可怕，怕的是没人用心对待",
    "tags": "#投诉化解 #客户服务 #宽带故障 #用心服务"
  },
  "节日活动": {
    "time": "中秋节前夕",
    "customer": "来办业务的客户",
    "problem": "营业厅准备了中秋月饼和手工灯笼，怎么让客户感受到节日温暖",
    "finding": "很多客户是外地人，过节回不了家，在营业厅感受到一丝温暖",
    "steps": "1. 营业厅布置中秋主题装饰\n2. 每位客户办完业务送一个小月饼\n3. 主动问客户要不要和家人视频报平安",
    "reaction": "一个来办业务的小哥说这是他今年收到的第一个月饼",
    "summary": "营业厅不只是一个办业务的地方，也是城市的温度",
    "tags": "#节日活动 #中秋 #营业厅温暖 #异乡人"
  },
  "突发事件": {
    "time": "暴雨天",
    "customer": "路过的外卖小哥",
    "problem": "突然暴雨，外卖小哥浑身湿透跑进营业厅躲雨，手机快没电了",
    "finding": "小哥手机电量只剩5%，还有3单没送完，急得不行",
    "steps": "1. 让小哥进来坐着歇会儿\n2. 拿充电器帮他充电\n3. 倒了杯热水让他暖暖",
    "reaction": "小哥连说谢谢，雨停后继续送单，回头还专门来办了张流量卡",
    "summary": "营业厅的门，永远为需要帮助的人敞开",
    "tags": "#突发事件 #暖心 #外卖小哥 #营业厅故事"
  },
  "公益服务": {
    "time": "周末",
    "customer": "社区居民+环卫工人",
    "problem": "电信联合社区做公益，免费测网速、贴膜、教老人用手机",
    "finding": "最感动的是环卫阿姨说，你们的WiFi我能用一下吗，想跟老家的孩子视频",
    "steps": "1. 给环卫阿姨连上WiFi\n2. 帮她拨通视频通话\n3. 顺便送她一张特惠流量卡",
    "reaction": "阿姨边视频边抹眼泪，说好久没看到孩子了",
    "summary": "公益不是做样子，是真能帮到人的小事",
    "tags": "#公益服务 #环卫工人 #爱心 #社会责任"
  },
  "数字课堂": {
    "time": "周三下午",
    "customer": "社区老人",
    "problem": "营业厅开设银发数字课堂，教老人用智能手机、防诈骗",
    "finding": "老人们最怕的不是学不会，是怕被骗。有一个大爷说上次差点被假冒客服骗走养老钱",
    "steps": "1. 投影仪投屏一步步教操作\n2. 重点讲防诈骗案例\n3. 每个老人发大字版操作手册",
    "reaction": "下课后老人们都不想走，说下周三还来",
    "summary": "数字课堂，不只是教技能，更是守好老人的钱袋子",
    "tags": "#数字课堂 #银发族 #防诈骗 #智慧助老"
  },
  "高考换机": {
    "time": "高考结束第二天",
    "customer": "准大学生和家长",
    "problem": "考完第二天家长就带孩子来挑手机了，预算有限但要求不低：又要打游戏又要学习用还要好看",
    "finding": "很多家长对合约机和裸机搞不清楚，以为交话费领手机就是免费的",
    "steps": "1. 先问孩子用机习惯（打游戏多还是学习多）\n2. 讲清楚合约机和裸机的区别\n3. 推荐合适机型并当场开箱激活",
    "reaction": "孩子拿到新手机开心得不行，家长说比网上买放心多了，有售后还能教怎么用",
    "summary": "高考后的第一台手机，值得家长带孩子来实体店买",
    "tags": "#高考换机 #准大学生 #第一台手机 #合约机科普"
  }
};

// ===== t4Presets.js =====
// Auto-generated by simulate-topics-full.mjs
// Date: 2026-07-16 · Mode: L1+L2
window.___t4Presets = {
  "免费贴膜": {
    "benefit": "免费贴膜",
    "desc": "进店免费贴膜，苹果安卓曲面直屏都能贴，比外面30块的还好。不用预约来了就贴。",
    "tags": "#免费贴膜 #手机贴膜 #同城福利",
    "season": "全年"
  },
  "免费测速": {
    "benefit": "免费WiFi测速",
    "desc": "到店或者预约上门，免费测你家宽带到底跑多少兆。不满速当场排查，看看是套餐问题还是路由器问题。",
    "tags": "#免费测速 #宽带测速 #WiFi优化",
    "season": "全年"
  },
  "办业务送礼": {
    "benefit": "办业务送好礼",
    "desc": "新装宽带送千兆路由器，续约升档送流量包，老用户积分还能兑换精美礼品。办了不亏。",
    "tags": "#办业务送礼 #宽带优惠 #新装好礼",
    "season": "全年"
  },
  "以旧换新": {
    "benefit": "以旧换新最高抵1000",
    "desc": "旧手机旧光猫旧路由器拿来抵钱，换新款合约机最高能抵1000元。旧设备扔了也是扔了不如拿来换钱。",
    "tags": "#以旧换新 #合约机 #换新机",
    "season": "全年"
  },
  "手机清洁": {
    "benefit": "免费手机清洁",
    "desc": "进店免费给手机做超声波清洁加屏幕消毒还有系统缓存清理。几十块钱的清洁钱省了手机还跟新的一样。",
    "tags": "#手机清洁 #免费服务 #手机保养",
    "season": "全年"
  },
  "宽带体验": {
    "benefit": "千兆宽带免费体验",
    "desc": "到店体验千兆宽带到底有多快。下载一部4K电影只要10秒刷视频一点不卡，跟家里百兆宽带对比一下就知道差距。",
    "tags": "#千兆宽带 #免费体验 #网速对比",
    "season": "全年"
  },
  "暑期纳凉": {
    "benefit": "进店纳凉送冰水",
    "desc": "天热没处去？进来吹空调喝冰水免费贴膜免费测速。不办业务也没关系路过进来凉快一下。",
    "tags": "#暑期纳凉 #营业厅空调 #免费贴膜"
  },
  "学生购机": {
    "benefit": "学生购机暑期专享",
    "desc": "凭学生证准考证录取通知书享专属优惠价，购机还送大礼包。高考完准备换手机的趁暑假过来挑最划算。",
    "tags": "#学生购机 #暑期特惠 #准大学生"
  },
  "全家桶特惠": {
    "benefit": "暑假全家宽带手机一站式",
    "desc": "宽带加手机加IPTV一起办，比单独办省一半。适合一家三口暑期使用，爸妈的手机孩子的宽带一次搞定。",
    "tags": "#全家桶 #宽带优惠 #暑假"
  },
  "社区服务": {
    "benefit": "电信进社区便民服务",
    "desc": "宽带义诊加手机贴膜加业务咨询，不出小区就能办。老人行动不便的提前说一声我们上门服务。",
    "tags": "#社区服务 #便民 #上门服务",
    "season": "全年"
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
    }
  },
};
// ===== topicPool.js =====
// Auto-generated by simulate-topics-full.mjs
// Date: 2026-07-16 · Mode: L1+L2
window.___topicPool = {
  "decision": [
    "一个人住选什么宽带最划算？100M vs 300M vs 1000M",
    "家庭宽带怎么选？三口之家最优方案",
    "老人手机套餐怎么选？3款适老套餐对比",
    "FTTR到底值不值得装？用数据说话",
    "合约机 vs 买裸机，3年算下来谁省钱？",
    "家里WiFi信号差？先别急着换路由器",
    "学生套餐怎么选？4款热门横向对比",
    "流量不够用？5种加量方案帮你选",
    "全屋WiFi怎么布局？90平/120平/复式方案",
    "监控摄像头需要什么网络？4G还是宽带？",
    "家里网络老掉线？先排查这3个原因",
    "5G套餐到底快多少？实测对比告诉你",
    "老房子没预埋网线怎么办？3种解决方案",
    "租房宽带怎么选？短期vs长期租房攻略",
    "打游戏用什么宽带？延迟对比实测",
    "直播带货用什么网络最稳？选网避坑指南",
    "智能家居需要多大带宽？最少配置清单",
    "换运营商不换号？携号转网全流程",
    "宽带到期续费还是换套餐？决策树帮你判断",
    "电视盒子卡顿？可能是宽带的问题",
    "多人合租网络怎么分？3种方案优劣对比",
    "电信&联通&移动宽带怎么选？全方位横评",
    "家里有学生上网课，宽带怎么选？",
    "路由器放哪里信号最好？实测3个位置",
    "暑假孩子天天在家，宽带选多少兆够用？"
  ],
  "scene": [
    "阿姨说网慢3年了，上门一查是路由器放微波炉旁边",
    "80岁爷爷学会了视频通话，第一通打给了在外地的孙子",
    "暴雨天接到报修电话，冒雨修好宽带后阿姨硬塞了一把伞",
    "帮独居老人装监控，他说「终于能看见儿子了」",
    "凌晨3点接到紧急报修，是一个妈妈要给发烧的孩子挂号",
    "小朋友来营业厅说「阿姨我帮你擦桌子」",
    "大爷第一次用智能手机，说「这比电视还清楚」",
    "给盲人用户调试语音助手，他说「世界突然变亮了」",
    "上门装宽带，用户家的小朋友画了幅画送我",
    "退伍老兵来办业务，敬了个标准的军礼",
    "阿姨学会发朋友圈后，第一条发的是我们的营业厅",
    "半夜抢修光缆，用户端来热汤面",
    "帮老人找回被盗微信号，他哭了我也哭了",
    "装维师傅的背包里除了工具还装着糖果——给用户家小孩的",
    "客户说「你们电信的人态度真好」，我记了一整天",
    "帮行动不便的用户上门办业务，她坚持要送到楼下",
    "台风天抢修基站，全村人出来帮忙",
    "小朋友来营业厅蹭WiFi上网课，我们给他腾了张桌子",
    "独居老人每月都来交费，就为了有人说说话",
    "帮用户找回20年前的老号码，他激动得说不出话",
    "过年值班，用户送来热腾腾的饺子",
    "装维师傅的手机里存着每个独居老人的紧急联系人",
    "聋哑用户用手语说谢谢，那一刻觉得工作很值",
    "帮走失老人联系家人，靠的是他手机里的亲情号",
    "暑假第一个来办宽带的妈妈，理由让人泪目"
  ],
  "review": [
    "FTTR全屋光纤实测：每个房间网速都能跑满千兆吗？",
    "5G vs 4G实测对比：下载一个游戏差多少？",
    "光猫指示灯图解：每个灯代表什么意思？",
    "WiFi6 vs WiFi5实测：旧设备值得升级吗？",
    "电信营业厅办业务全流程：从进门到办完只要10分钟",
    "1000M宽带下载速度实测：下个电影要几秒？",
    "不同路由器穿墙能力横评：隔两堵墙还能用吗？",
    "合约机开箱：1999元的手机能流畅用3年吗？",
    "Mesh组网 vs 单路由器：全屋覆盖差距多大？",
    "网线种类科普：五类/超五类/六类线有什么区别？",
    "电信App vs 联通App vs 移动App：哪个更好用？",
    "光猫桥接 vs 路由模式：到底该用哪个？",
    "2.4G vs 5G WiFi：什么时候该切哪个？",
    "宽带测速工具横评：哪个最准？",
    "IPTV vs 网络机顶盒：画质延迟对比",
    "手机信号放大器真的有用吗？实测告诉你",
    "SIM卡大小科普：Nano/Micro/标准卡区别",
    "eSIM是什么？和实体SIM卡有什么不同？",
    "卫星通信手机实测：没信号的地方真能打电话吗？",
    "Mesh组网傻瓜教程：3步搞定全屋WiFi",
    "宽带故障自查指南：8个常见问题自己修",
    "运营商DNS对比：哪个解析最快？",
    "手机套餐隐藏权益大盘点：你可能白嫖了很多",
    "旧路由器别扔！3种方法让它变废为宝"
  ],
  "local": [
    "XX路电信营业厅重新装修了，欢迎来打卡",
    "本周末营业厅免费贴膜+手机清洁，限前50名",
    "XX小区光纤改造完成，千兆宽带开通啦",
    "营业厅新到了一批合约机，先到先得",
    "暴雨天不想出门？电信App上也能办业务",
    "XX路营业厅延长营业时间至晚8点",
    "开学季福利！学生到店办理享专属优惠",
    "本店新增自助缴费机，24小时可用",
    "XX社区电信便民服务点正式开业",
    "今日到店前10名送精美礼品一份",
    "老年人专场：每周三下午专人教用智能手机",
    "营业厅WiFi免费开放，欢迎来蹭网",
    "XX商圈电信5G体验区开放，欢迎来测速",
    "宽带到期提醒：XX小区的用户注意续费啦",
    "新装宽带赠送千兆路由器，数量有限",
    "营业厅新增手机维修服务，立等可取",
    "XX区FTTR体验间开放，欢迎来感受全屋千兆",
    "本周末光纤到户宣传进XX小区，现场办理优惠",
    "老用户回馈：到店免费升级套餐权益",
    "XX营业厅春节不打烊，全年无休",
    "电信&XX超市联名活动，办业务送购物券",
    "新用户首月免费体验千兆宽带",
    "积分兑换活动开启，您的积分可以换好礼",
    "XX营业厅招募用户体验官，反馈有礼",
    "暑假福利！学生宽带半价，家长速来"
  ]
};

