// 抖本工坊 · 数据包（自动合并 19 文件）
// 生成时间: 2026-07-20 09:13:25
// 合并文件: bgmList.js, dailyScripts.js, hotspotData.js, phonePool.js, publish-kit.js, t1Comments.js, t1ImagePrompts.js, t1Presets.js, t1ScriptFull.js, t1ScriptFullByPersona.js, t1ScriptStyles.js, t1Titles.js, t1TopicAliases.js, t2Presets.js, t2ScriptFull.js, t4Presets.js, t4ScriptFull.js, techDB.js, topicPool.js
// 大小: 165540 bytes ( 19 source files)

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
// Updated: 2026-07-20 · Mode: AI-enhanced
// Compliance: 7/7 passed
// Source: 60s.viki.moe/v2/douyin
window.___hotspotData = [
{
  "id": "h1",
  "tier": 2,
  "title": "罗德里拿奖了，你的手机消费也该拿奖了！",
  "heat": "抖音热搜#14 · AI精选",
  "why": "罗德里获世界杯金球奖是体育热点，和电信业务无关，但可以用“颁奖”概念设计反差，蹭热度的同时有趣味性引出电信福利。",
  "source": "https://www.douyin.com/search/%E7%BD%97%E5%BE%B7%E9%87%8C%E8%8E%B7%E4%B8%96%E7%95%8C%E6%9D%AF%E9%87%91%E7%90%83%E5%A5%96",
  "steps": [
    {
      "shot": "帅哥，罗德里获世界杯金球奖了！但你的每月消费还没获过奖吧？",
      "sub": "罗德里拿奖了，你的每月消费呢？"
    },
    {
      "shot": "来电信，每月消费不变，直接送你一部新手机，这奖比金球奖还实在！",
      "sub": "每月消费不变，手机免费拿！"
    },
    {
      "shot": "想要这个奖的，评论区扣1，到店就能领！地址看左下角。",
      "sub": "地址：山西电信营业厅"
    }
  ],
  "bgm": "激昂体育集锦音乐，如《We Are The Champions》",
  "tags": "#罗德里金球奖 #山西电信 #手机免费拿 #蹭热度",
  "difficulty": 2,
  "needFace": true,
  "time": "约15分钟"
},
{
  "id": "h2",
  "tier": 2,
  "title": "世界杯决赛中场秀？你的每月消费该'中场休息'了！",
  "heat": "抖音热搜#16 · AI精选",
  "why": "蹭世界杯决赛中场秀热度，用'中场休息'概念带出电信福利优化，吸引球迷到店，反差玩法。",
  "source": "https://www.douyin.com/search/%E4%B8%96%E7%95%8C%E6%9D%AF%E5%86%B3%E8%B5%9B%E4%B8%AD%E5%9C%BA%E7%A7%80",
  "steps": [
    {
      "shot": "世界杯决赛中场秀看了吗？别光顾着看球，你的每月消费可能正在浪费！",
      "sub": "世界杯决赛中场秀 / 每月消费浪费？"
    },
    {
      "shot": "来山西电信营业厅，每月消费不变，手机直接优惠一千多！还送世界杯周边。",
      "sub": "每月消费不变 / 手机优惠1000+ / 送世界杯周边"
    },
    {
      "shot": "评论区打'中场秀'，到店就能领福利！地址在左下角，快冲！",
      "sub": "评论区打'中场秀' / 到店领福利 / 地址在这"
    }
  ],
  "bgm": "世界杯主题曲混剪版或激昂卡点BGM",
  "tags": "#世界杯决赛 #山西电信 #电信福利 #手机优惠 #中场秀",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h3",
  "tier": 2,
  "title": "世界杯金手套？山西电信接住这波福利！",
  "heat": "抖音热搜#17 · AI精选",
  "why": "蹭热度，用金手套概念比喻电信服务帮你扑掉多余消费，反差引流。",
  "source": "https://www.douyin.com/search/%E4%B9%8C%E5%A5%88%E8%A5%BF%E8%92%99%E8%8E%B7%E4%B8%96%E7%95%8C%E6%9D%AF%E9%87%91%E6%89%8B%E5%A5%97%E5%A5%96",
  "steps": [
    {
      "shot": "哎！世界杯金手套奖得主你知道不？乌奈西蒙！不知道？那我告诉你一个本地金福利！",
      "sub": "街头突袭 用热点钩子吸引路人"
    },
    {
      "shot": "每月消费不变，手机直接优惠拿走！就像门将扑点，我们帮你扑掉多余消费！",
      "sub": "进店展示 利益点：消费不变拿手机"
    },
    {
      "shot": "评论区扣‘金手套’，到店领额外福利！左下角地址，快冲！",
      "sub": "行动指令：评论+到店 地址露出"
    }
  ],
  "bgm": "动感足球卡点BGM（如Waka Waka混音版）",
  "tags": "#山西电信 #乌奈西蒙 #金手套奖 #电信福利 #本地优惠",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h4",
  "tier": 2,
  "title": "姆巴佩金靴奖的福利速度，电信营业厅也能“进球”？",
  "heat": "抖音热搜#19 · AI精选",
  "why": "蹭热度，把姆巴佩蝉联金靴的“快”和“多”与电信网速快、福利多绑定，用足球梗制造反差吸引点击。",
  "source": "https://www.douyin.com/search/%E5%A7%86%E5%B7%B4%E4%BD%A9%E8%9D%89%E8%81%94%E4%B8%96%E7%95%8C%E6%9D%AF%E9%87%91%E9%9D%B4%E5%A5%96",
  "steps": [
    {
      "shot": "叫住路人：‘哥们，你知道姆巴佩为啥能蝉联金靴奖吗？’",
      "sub": "钩子：足球悬念，引发好奇"
    },
    {
      "shot": "自答：‘因为他快啊！射门快、进球多，跟我们电信福利一样，来得又快又猛！每月消费不变，优惠直接拉满！’",
      "sub": "利益点：网速快、福利多，类比姆巴佩"
    },
    {
      "shot": "‘想知道你的每月消费能换多少福利？评论区扣‘1’，或者直接到山西电信营业厅，我帮你查！’",
      "sub": "行动指令+地址：引导评论或到店"
    }
  ],
  "bgm": "节奏感强的足球主题BGM或激昂电子乐",
  "tags": "#姆巴佩 #世界杯金靴奖 #电信福利 #山西电信 #网速快",
  "difficulty": 2,
  "needFace": true,
  "time": "拍摄15分钟，剪辑5分钟"
},
{
  "id": "h5",
  "tier": 3,
  "title": "当世界杯决赛遇上电信营业厅，我的反应绝了！",
  "heat": "抖音热搜#42 · AI精选",
  "why": "世界杯决赛热度正高，用reaction形式蹭热度，结合电信福利设计反差，吸引用户到店。",
  "source": "https://www.douyin.com/search/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E6%9D%AF%E5%86%B3%E8%B5%9Breaction",
  "steps": [
    {
      "shot": "营业员在厅外看到大哥盯手机狂喊，上前问：“大哥看啥呢这么激动？”大哥：“世界杯决赛点球大战，太刺激了！”",
      "sub": "钩子：世界杯决赛reaction"
    },
    {
      "shot": "营业员：“用电信网络看球就是流畅！现在每月消费不变，到店免费领世界杯限定周边，手机还有超值优惠！”",
      "sub": "利益点：每月消费不变，福利白拿"
    },
    {
      "shot": "营业员对镜头：“评论区扣‘冠军’，来山西电信营业厅，我直接安排福利！”",
      "sub": "行动指令：扣冠军，到店领福利"
    }
  ],
  "bgm": "世界杯主题曲《Waka Waka》高潮部分",
  "tags": "#世界杯决赛 #reaction #山西电信 #到店有礼",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h6",
  "tier": 3,
  "title": "暑假顶配不是新疆，是电信营业厅？",
  "heat": "抖音热搜#48 · AI精选",
  "why": "蹭热度：原热搜讲暑期带娃旅游，我们反向操作，带娃去电信营业厅也能领福利，制造反差吸引家长关注。",
  "source": "https://www.douyin.com/search/%E5%B8%A6%E5%A8%83%E9%80%9B%E9%81%8D%E6%96%B0%E7%96%86%E6%89%8D%E6%98%AF%E6%9A%91%E5%81%87%E9%A1%B6%E9%85%8D",
  "steps": [
    {
      "shot": "姐，暑假带娃去哪玩？新疆啊？太远了吧！有个近的地儿，每月消费不变，还能给孩子领个手机！",
      "sub": "钩子：叫住家长，用新疆旅游制造悬念"
    },
    {
      "shot": "就这儿，电信营业厅！家长每月消费不变，孩子免费拿新手机，学习娱乐两不误，这不比去新疆香吗？",
      "sub": "利益点：每月消费不变，暑期福利领手机"
    },
    {
      "shot": "想给孩子领的，评论区扣1，或者直接来XX路电信营业厅，到店说找我就行，等你哦！",
      "sub": "行动指令+地址：评论区互动或到店，字幕标注详细地址"
    }
  ],
  "bgm": "欢快夏日Vlog音乐，如《Summer Vibes》",
  "tags": "#暑假带娃 #电信福利 #营业厅跟拍 #山西电信 #本地生活",
  "difficulty": 2,
  "needFace": true,
  "time": "30分钟"
},
{
  "id": "h7",
  "tier": 3,
  "title": "小个子秋冬穿搭？别找了，这有更香的！",
  "heat": "抖音热搜#31 · AI精选",
  "why": "纯蹭穿搭热搜，用反差吸引小个子女生：看穿搭不如领福利，到店还能换手机。",
  "source": "https://www.douyin.com/search/%E6%8F%90%E5%89%8D%E9%A2%84%E4%B9%A0%E5%B0%8F%E4%B8%AA%E5%AD%90%E7%A7%8B%E5%86%AC%E7%A9%BF%E6%90%AD%E6%8C%87%E5%8D%97",
  "steps": [
    {
      "shot": "在营业厅门口，叫住正在刷手机的路人：姐妹，是不是在找小个子秋冬穿搭？别找了，我这有个更香的！",
      "sub": "钩子：叫住路人，制造悬念"
    },
    {
      "shot": "镜头切到营业厅内，店员展示手机：每月消费不变，就能换台新手机，不比买衣服划算？还有叠加福利，到店才能领！",
      "sub": "利益点：每月消费不变换手机，福利叠加"
    },
    {
      "shot": "店员对镜头招手：评论区扣“穿搭”我偷偷告诉你额外优惠，左下角地址，快来！",
      "sub": "行动指令：评论区扣字领隐藏福利，地址在左下角"
    }
  ],
  "bgm": "轻快卡点流行乐（如《Lucid Dream》）",
  "tags": "#小个子穿搭 #秋冬穿搭 #山西电信营业厅 #太原福利 #到店有惊喜",
  "difficulty": 2,
  "needFace": true,
  "time": "1.5小时"
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
  html += '<span onclick="copyText(\'' + esc(tags).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
  html += '</div>';

  // ── 标题行 ──
  html += '<div style="padding:10px 18px;font-size:12px;display:flex;align-items:center;gap:8px;">';
  html += '<span style="font-weight:600;color:#0052CC;min-width:60px;">📌 标题</span>';
  html += '<span style="flex:1;color:#1E293B;line-height:1.5;">' + esc(seoTitle) + '</span>';
  html += '<span onclick="copyText(\'' + esc(seoTitle).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#E0F2FE;color:#0EA5E9;border:0;padding:3px 10px;font-size:11px;border-radius:6px;">复制</span>';
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
    html += '<span onclick="copyText(\'' + esc(comments[c]).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#fff;border:1px solid #93C5FD;color:#0052CC;padding:1px 8px;font-size:10px;border-radius:4px;flex-shrink:0;">复制</span>';
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
      html += '<span onclick="copyText(\'' + esc(imgPrompt).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:linear-gradient(135deg,#7C3AED,#A855F7);color:#fff;border:0;padding:4px 14px;font-size:11px;border-radius:6px;font-weight:600;margin-left:auto;">📋 复制</span>';
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
      '<span onclick="copyText(\'' + esc(comments[c]).replace(/'/g,'\\x27') + '\');toast(\'已复制\',\'success\')" style="cursor:pointer;background:#fff;border:1px solid #93C5FD;color:#0052CC;padding:1px 8px;font-size:10px;border-radius:4px;flex-shrink:0;">复制</span>' +
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
    "你现在的月租多少流量多少？评论区发出来，我帮你查有没有更便宜的",
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
  "合约机 vs 买裸机，3年算下来谁省钱？": [
    "你现在用的什么手机？合约机还是裸机？评论区说说",
    "我算过一笔账，合约机3年比买裸机省好几百",
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
    "老人家就用个微信视频通话，月租29就够了",
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
    "准大学生们，来办合约机比买裸机省钱多了",
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
// 思路（参考 T3 设备库）：每个选题带 3 个对比档位数据 → AI 生成具体对比海报
// 营业员复制 → 豆包/即梦 → 9:16 竖版海报
// 更新：2026-07-20
window.___t1ImagePrompts = {
  "宽带选多少兆": "一张抖音竖版9:16海报。深蓝渐变底（#0A1628→#1A237E），中央三个白色圆角卡片并排排列，每个卡片之间留出空隙：\n\n卡片1：「100兆 入门」/ ¥59/月 / 1-2人 / 刷视频微信\n卡片2：「300兆 推荐」/ ¥99/月 / 2-3人 / 玩游戏看剧\n卡片3：「1000兆 旗舰」/ ¥169/月 / 全家 / 直播4K\n\n卡片底部小字：「太原南中环电信营业厅」。\n整体苹果发布会式简洁高级感，白色大字标题「宽带选多少兆？」置于顶部。底部「💾 截图保存」。",

  "套餐怎么选": "一张抖音竖版9:16海报。暖蓝紫色渐变底。中央三个白色圆角卡片并排：\n\n卡片1：「月租59」/ 20G流量 / 适合轻度用户\n卡片2：「月租99」/ 60G流量+通话 / 适合中度\n卡片3：「家庭套餐」/ 199元/3人共享 / 适合全家\n\n顶部标题：「套餐选错了？每月多花好几十」。底部小字：「太原南中环电信营业厅 · 截图领报价单」。高级感对比风格。",

  "家庭宽带怎么选？三口之家最优方案": "一张抖音竖版9:16海报。深蓝偏灰底。中央三个圆角卡片横排：\n\n卡片1：「100兆」/ ¥59-79 / 一家三口够用 / 部分卡\n卡片2：「300兆 推荐」/ ¥99 / 全家同时在线 / 推荐\n卡片3：「千兆」/ ¥169 / 4K+直播+游戏 / 浪费\n\n大字标题：「三口之家宽带，300兆就够了」。底部：「太原南中环 · 截图到店选」。家庭温暖感。",

  "携号转网全流程攻略": "一张抖音竖版9:16海报。暗蓝紫底。三个圆形步骤图卡横排：\n\n步骤1：「算违约金」/ 还剩多久？300-500块\n步骤2：「算套餐」/ 转过去省多少？半年回本\n步骤3：「试信号」/ 借卡用3天 / 准了再转\n\n顶部标题：「携号转网三笔账」。底部：「太原南中环 · 截图来算账」。信息卡风格。",

  "宽带到期续费还是换套餐？决策树帮你判断": "一张抖音竖版9:16海报。蓝紫渐变底。三个判断问题竖排：\n\n判断1：「3年前办的？」/ 流量翻倍了\n判断2：「搬家了？」/ 旧套餐不适合\n判断3：「只用宽带？」/ 加手机+电视更划算\n\n顶部：「宽带到期了？3个问题告诉你」。底部：「截图来我帮你算」。决策树风。",

  "家人合办副卡亲情号怎么划算": "一张抖音竖版9:16海报。暖蓝底。三个家庭场景对比横排：\n\n家庭1：「夫妻2人」/ 主卡+1副卡 / 月租+10 / 30G共享\n家庭2：「一家3口」/ 主卡+2副卡 / 月租+20 / 50G共享\n家庭3：「5人三代」/ 融合套餐 / 169元 / 5张卡人均30\n\n顶部：「一家人各交各的话费？每月多花好几十」。底部：「截图来办融合套餐」。",

  "合约机 vs 买裸机，3年算下来谁省钱？": "一张抖音竖版9:16海报。深蓝渐变底。三个方案对比横排：\n\n方案1：「合约机」/ 月付少 / 3年省500-1500 / 绑定\n方案2：「裸机全款」/ 一次付清 / 自由换套餐 / 贵\n方案3：「以旧换新」/ 旧机折价+补贴 / 抵1000 / 半价\n\n顶部：「合约机还是裸机？3年省一台手机」。底部：「截图到店选 · 太原南中环」。",

  "家里WiFi信号差？先别急着换路由器": "一张抖音竖版9:16海报。蓝绿渐变底。三个排查步骤竖排：\n\n步骤1：「挪位置」/ 路由器放客厅中间高处 / 0元\n步骤2：「挪干扰」/ 远离微波炉电视 / 0元\n步骤3：「才换路由」/ WiFi6千兆 / 200元用5年\n\n顶部：「WiFi信号差？90%不是路由器的锅」。底部：「截图排查 · 太原南中环」。技术排障风。",

  "家里网络老掉线先排查这3个原因": "一张抖音竖版9:16海报。暗蓝底。三个步骤竖排：\n\n步骤1：「重启」/ 断电2分钟再通电 / 80%解决\n步骤2：「看灯」/ 红灯闪=外线故障 / 运营商的锅\n步骤3：「报修」/ 打10000 / 24小时上门\n\n顶部：「网断了先别报修」。底部：「重启→查灯→报修 · 截图存」。信息卡风。",

  "手机套餐隐藏权益大盘点": "一张抖音竖版9:16海报。暖橙蓝渐变底。三个隐藏权益卡横排：\n\n权益1：「已订业务」/ 没用过彩铃/天云盘 / 取消省200\n权益2：「我的权益」/ 视频会员/外卖券 / 99以上含\n权益3：「老套餐」/ 3年没换 / 现在流量翻倍\n\n顶部：「你的话费里白给了？每月多交好几十」。底部：「截图去查 · 太原南中环」。",

  "直播带货用什么网络最稳？选网避坑指南": "一张抖音竖版9:16海报。深紫红渐变底。三个档位对比横排：\n\n档位1：「100兆」/ 上行20M / 不能连麦+放BGM\n档位2：「300兆」/ 上行50M / 推流稳定不卡\n档位3：「千兆」/ 上传快 / 直播直接上\n\n顶部：「直播老卡顿？选对了宽带就能解决」。底部：「截图找我 · 太原南中环」。性能风。",

  "租房宽带怎么选？短期vs长期租房攻略": "一张抖音竖版9:16海报。清新蓝绿底。三个租期对比横排：\n\n方案1：「<半年」/ 流量卡+开热点 / 几十元 / 自由走\n方案2：「半年-1年」/ 低月租宽带 / 可移机 / 灵活\n方案3：「>1年」/ 融合套餐 / 宽带+手机 / 最划算\n\n顶部：「租房宽带怎么选？按租期选」。底部：「截图问 · 太原南中环」。",

  "打游戏用什么宽带？延迟对比实测": "一张抖音竖版9:16海报。暗蓝底+橙色点缀。三个延迟档位对比横排：\n\n档位1：「100兆」/ 延迟50-80ms / 送人头\n档位2：「300兆 推荐」/ 延迟30-50ms / 不坑\n档位3：「千兆」/ 延迟10-20ms / 电竞级\n\n顶部：「打游戏延迟460？不是技术问题」。底部：「截图看装游戏宽带 · 太原南中环」。游戏风。",

  "FTTR到底值不值得装？用数据说话": "一张抖音竖版9:16海报。深蓝底+暖橙渐变。三个户型横排：\n\n户型1：「90平以内」/ 一个千兆路由 / 不用多花钱\n户型2：「120平+大平层」/ FTTR全屋光纤 / 每间房满格\n户型3：「复式别墅」/ FTTR是唯一方案 / 必须装\n\n顶部：「FTTR值不值？看你家多大」。底部：「截图体验 · 太原南中环」。",

  "学生套餐怎么选？4款热门横向对比": "一张抖音竖版9:16海报。活力渐变（蓝→紫）。四个套餐卡横排：\n\n套餐1：「29元」/ 20G校园卡 / 校园免费\n套餐2：「49元」/ 流量+通话 / 性价比\n套餐3：「59元」/ 40G+视频会员 / 刷暑假\n套餐4：「99元」/ 100G+1000分钟+宽带 / 封顶\n\n顶部：「学生套餐怎么选？29-99元」。底部：「凭学生证办 · 太原南中环」。年轻活力风。",

  "老人手机套餐怎么选？3款适老套餐对比": "一张抖音竖版9:16海报。暖杏色渐变。三个套餐卡横排：\n\n套餐1：「29元」/ 5G+100分钟 / 接打电话够\n套餐2：「49元 推荐」/ 15G+300分钟 / 刷抖音\n套餐3：「69元」/ 30G+500分钟 / 视频通话\n\n顶部：「你爸妈的话费可能比你还贵」。底部：「带爸妈来办 · 太原南中环」。大字清晰。",

  "异地跨省宽带怎么装最省钱": "一张抖音竖版9:16海报。蓝灰渐变。三个方案横排：\n\n方案1：「跨省迁」/ 免费移机 / 合约继续 / 适合租房\n方案2：「二宽优惠」/ 第二条半价 / 老家+城里\n方案3：「融合套餐」/ 手机+宽带+电视 / 一站搞定\n\n顶部：「老家一套房城里一套？宽带怎么装最省」。底部：「截图问 · 太原南中环」。",

  "电视盒子卡顿IPTV和网络盒子怎么选": "一张抖音竖版9:16海报。深蓝底。三个方案横排：\n\n方案1：「IPTV基础」/ ¥10/月 / 央视卫视 / 老人看\n方案2：「IPTV会员」/ ¥30/月 / 4K+回看+VIP / 追剧\n方案3：「多屏同看」/ 含3屏 / 出差也能看直播\n\n顶部：「电视盒子老是卡？不是网速问题」。底部：「截图来店 · 太原南中环」。"
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

  "套餐怎么选": "你每个月流量够用吗？真事：上个月有个朋友来店里说月租59，20G。每个月15号用完了，花30买加油包。实际一个月89。\n\n我给他换了99的大流量套餐，60G。他一个月用40G，还剩20G。钱少了，流量多了。还有一种更狠的——全家5口各交各的话费，一个月5x59=295。换家庭共享套餐，3张卡+宽带+电视，人均¥30封顶。\n\n你的套餐用了几年了？评论说说月租和流量，我帮你算。截图到店免费查，3分钟知道该不该换。",

  "家庭宽带怎么选？三口之家最优方案": "三口之家，你老公打游戏你刷抖音孩子上网课。三台设备同时在线，100兆够不够？够呛。\n\n上个月有个妈妈跟我投诉，孩子上网课老卡。我一查——100兆宽带三个人同时用。换了300兆¥99后，孩子网课不卡了，老公排位不坑了。多花40块解决的问题。千兆三口之家用不上，多花的70块存着报个班不香吗？\n\n评论说说你家几口人几台设备同时用，我帮你推荐。截图到店办，立等可取。",

  "携号转网全流程攻略": "想换运营商又舍不得用了十年的号？上周隔壁王哥也这么想。合约还有8个月到期，违约金380块。但新套餐每月省60，8个月省480。交违约金380，净赚100。当场转了。\n\n转网先算三笔账。第一，合约多久到期？剩不到3个月到期免费转。第二，转过去每月省多少？半年能不能覆盖违约金。第三，小区哪个运营商信号最好？先借朋友的卡试三天。\n\n评论说说你月租多少合约多久，我帮你算。截图到店我当面帮你查，10分钟出结论。",

  "宽带到期续费还是换套餐？决策树帮你判断": "宽带到期了，续费还是换？上周一个客户续费后才后悔——同样价格新套餐流量翻倍还送IPTV。\n\n到期先问自己三个问题：套餐是3年前办的？现在同价位流量翻倍了，别续，换。搬家了？新小区可能有新装优惠，续费就亏。只有宽带还是加手机电视？融合套餐加几十块多一条宽带+手机+电视。\n\n评论说说你的情况，我帮你决策。截图到店免费查下个月到期提醒，别自动续。",

  "家人合办副卡亲情号怎么划算": "你一个月交59，老婆也59，爸妈各39——加一起快200了。一半可能是白交的。\n\n上个月一户五口人，原来各办各的一个月295。换家庭共享套餐169，省了126。两个人主卡+1副卡月租加10共享30G。一家三口月租加20共享50G。三代同堂5张卡+宽带+电视，人均¥30封顶。\n\n评论说说你家几口人各交多少，我帮算。截图到店我当面查，给你出方案。",

  // ══════ A. 经典CTA直销型 ══════

  "合约机 vs 买裸机，3年算下来谁省钱？": "上个月一个小伙子算了一下午——合约机划算还是裸机划算？\n\n那台手机裸机¥2999。合约机首付¥999，月租含话费流量，3年一共¥2880。比裸机省了119，还送充电宝和耳机。不想被绑定，裸机一次付清¥2999，自由换套餐。有旧手机拿来以旧换新折价+电信补贴，最高抵¥1000（相当于半价换新）。\n\n评论说说你现在用什么手机，我帮你算。截图到店，XX营业厅30分钟办好。",

  "家里WiFi信号差？先别急着换路由器": "上个月一个客户花600换了个新路由器，信号还是差。我一到她家——路由器放客厅角落电视柜里，门关着。打开门拿到客厅中间，信号从一格变满格。省了600块。\n\n路由器放角落塞柜子的——先挪到客厅中间高处，信号提升60%。旁边有微波炉电视机的——挪开30厘米。都试了还不行，路由器用了5年以上的换WiFi6千兆路由，¥200用5年。\n\n评论说说你家路由器放哪的？XX营业厅免费给你测信号，不用花冤枉钱。",

  "家里网络老掉线先排查这3个原因": "家里网断了先别报修。上个月有个大姐等了一天维修师傅——师傅来了重启了一下光猫，好了。\n\n记住三步：第一步光猫和路由器一起断电，等2分钟再通电，80%的问题重启就好。第二步看光猫指示灯——红灯闪是外线故障，运营商的锅，报修。绿灯正常。第三步重启了灯正常网还断？打10000报修，承诺24小时上门。\n\n重启 看灯 报修。顺序别搞反。评论说说你家网有没有问题，我帮你远程看看。截图保存这三步，下次不断网。",

  "手机套餐隐藏权益大盘点": "你每个月交的话费里可能含了从来不知道的东西。上个月帮一个客户查，发现三年交了彩铃费¥720——他压根没开通过。\n\n三招教你查。第一招：打开电信App→我的→已订业务。彩铃天翼云读书会员，取消掉一年省¥200。第二招：去电信App我的权益，月租¥99以上至少含一个视频会员外卖券。第三招：套餐是3年前办的？现在同价位流量翻倍了，来营业厅免费查。\n\n不换号不换卡白嫖好几百。评论说说月租多少，我帮你看看还能省什么。截图到店10分钟搞定。",

  // ══════ B. 直播引流型 ══════

  "直播带货用什么网络最稳？选网避坑指南": "上周一个做直播的朋友来找我，说直播老卡顿掉线。一查——100兆宽带，上行才20兆。直播推流最少要上行50兆，不然一定卡。\n\n100兆能直播但不能开美颜加连麦放BGM。300兆上行50兆以上，推流稳定不卡。做直播直接上千兆，上传快下载快，不砸直播间口碑。今天点进我直播间，我正在讲直播网络怎么选。",

  "租房宽带怎么选？短期vs长期租房攻略": "租房住不到一年，办宽带怕浪费不办又没网用？三个方案：半年内办流量卡开热点，灵活走人。半年到一年办低月租宽带¥50起，电信免费移机搬家带走。一年以上当自己家办融合套餐宽带+手机，比单独办省一半还送路由器。\n\n评论说说你租期多久，我帮你推荐。截图到店问移机政策，不浪费一分钱。",

  // ══════ C. 热梗植入型 ══════

  "打游戏用什么宽带？延迟对比实测": "打排位遇到延迟460是什么感觉？上个月一个兄弟用100兆延迟60-80毫秒，团战永远比别人慢0.5秒。换了300兆延迟降到30，第二天从黄金打到钻石了。\n\n100兆延迟50-80ms打排位等于送人头。300兆延迟30-50ms，90%玩家选这个够了。千兆FTTR延迟10-20ms，职业选手用的。\n\n评论说说你打什么游戏延迟多少，我帮你看看是不是宽带的问题。截图这个延迟对照表，选套餐时对比一下。到店来办游戏宽带送加速器。",

  "FTTR到底值不值得装？用数据说话": "上个月给一个复式楼的客户装FTTR。他家三楼一个路由器，二楼信号剩两格，一楼完全没网。换FTTR光纤到每个房间——一楼二楼三楼全满格。\n\n90平以内一个千兆路由¥200够了。120平以上大平层FTTR光纤到每间房¥59/月起。复式别墅三层以上，FTTR是唯一方案。\n\n你住多大的房子？评论说说户型，我帮你判断。截图户型图到店，XX营业厅有FTTR体验间实地看效果。",

  "学生套餐怎么选？4款热门横向对比": "学生套餐比你想象的便宜一半。月租¥29=20G校园不限速。月租¥49=30G+500分钟。月租¥59=40G+视频会员刷一暑假。月租¥99=100G+1000分钟+宽带。\n\n其他套餐开学涨价，学生套餐反着来。带学生证来办，暑假要刷剧的、宿舍要装宽带的，趁现在办了。截图这些套餐到店，工作人员一看就懂。评论说说你一个月用多少流量。",

  // ══════ D. 方言亲切型 ══════

  "老人手机套餐怎么选？3款适老套餐对比": "咱爸咱妈一个月交多少话费？上个月一个大姐说老妈一个月交¥69。一查——老人家就接电话刷抖音，根本用不了那么多。\n\n换月租¥29的5G+100分钟够了。爱刷抖音的月租¥49的15G+300分钟，最推荐。靠手机跟外地孩子视频的月租¥69的30G+500分钟。到店来免费查，带老人来也行，我们教你用智能手机。\n\n评论说说你爸妈现在交多少，我帮看能不能换。截图到店直接办，XX营业厅老乡来了找我。",

  "异地跨省宽带怎么装最省钱": "老家的房子装了宽带，城里的房子也想装——是不是每个都得单独办一条？不用。\n\n上个月帮太原运城两头跑的小伙子办的融合套餐，一张主卡+两条宽带。太原一条运城一条，一个月才多收¥30。比单独再办一条省一半。跨省迁用电信免费移机。二宽优惠有一条了第二条半价。\n\n评论说说你几套房子要装宽带，我帮你算。截图到店当场出方案。",

  // ══════ E. 产品讲解型 ══════

  "电视盒子卡顿IPTV和网络盒子怎么选": "电视盒子看视频老是转圈圈？不是网速的问题，是设备的问题。上个月一个客户换了三个电视盒子还是卡——后来发现WiFi信号不稳。换成IPTV，稳了。\n\nIPTV基础版¥10/月，央视卫视全有老人看新闻够了。IPTV会员版¥30/月，4K+回看+VIP专区。多屏同看含3屏会员，客厅卧室各看各的。\n\n评论说说你家现在用什么看电视？截图到店来，我现场演示IPTV和电视盒子的差别，3分钟见分晓。不用纠结，试了再买。"
};

// ===== t1ScriptFullByPersona.js =====
// 抖本内容工坊 · T1 人设差异化脚本（v3.0 标准）
// 每个选题 6 个版本，整条脚本按人设风格生成（非拼接）
// 结构：___t1ScriptFullByPersona[topic][personaKey]
// 更新：2026-07-20
window.___t1ScriptFullByPersona = {
  "宽带选多少兆": {
    "sister": '上个月遇到一个大姐，跑过来跟我说家里网卡得孩子上网课都掉线了。我一问——还在用100兆的老宽带，家里四个人、八台设备同时在线。帮她换到300兆以后，孩子上课再也没掉过线。\n\n你想想——一个人刷抖音100兆够用，两个人同时打游戏看4K就吃力了。三口之家起步至少300兆，一个月多花几十块，体验翻倍。\n\n你住多大的房子？评论说说，我帮你参谋选多少兆够用。',
    "sweet": '宝子们～选宽带千万别闭眼入最便宜的！上次有个姐妹跟我说家里100兆卡得怀疑人生，一查才发现三个人八台设备在抢网。\n\n听我说：一个人住100兆够刷剧，两个人住300兆才不抢网，有孩子的直接上1000兆一步到位。就像买衣服一样，选对码数才舒服～\n\n截图保存这个速度对照表，选宽带的时候翻出来看看，不踩坑！',
    "tech": '直接上数据：100兆宽带理论下行128Mbps，实际跑110Mbps，适合1-2人轻量使用。300兆理论384Mbps，实测350Mbps，同时支持4K+游戏+下载。1000兆理论1Gbps，实测930Mbps，可支撑15+设备并发。\n\n基于实测数据，90%的山西家庭300兆是性价比最优解。100兆的瓶颈期在2台设备同时使用时就显现了，而1000兆对多数家庭明显配置过剩。\n\n建议截图留存，到店办理时带这个表格对比。',
    "biz": '结论前置：300兆宽带是山西家庭的最优解。\n\n理由有三：第一，100兆在3台以上设备并发时掉包率超15%，影响办公和网课质量。第二，300兆比100兆每月多付40元，但带宽翻了三倍，性价比最高。第三，大部分营业厅现在新装300兆送千兆光猫，一步到位。\n\n建议截图留档，到厅直接报需求，不用纠结。',
    "young": '兄弟们！100兆宽带打排位就是在送分！延迟80ms以上，团战必卡。我测了12个宽带用户的数据——\n\n100兆：下载22MB/s，延迟50-80ms，2人同时用开始卡\n300兆：下载35MB/s，延迟30-50ms，4人同时用不卡\n1000兆：下载110MB/s，延迟10-20ms，随便造！\n\n简单说：一个人住100兆够了，合租/情侣上300兆，游戏党直接1000兆，不解释！',
    "master": '干了二十年装维，说实话：宽带选多少兆看的是家里几口人、几台设备，不是看价格。\n\n我上个月去一户人家，一家五口，六七个手机、两台电视、两个平板，还用的100兆宽带——不卡才怪。帮他换了300兆，老人家还跟我说"师傅你这技术好，现在看抖音不转了"。\n\n我信我的经验：一个人100兆够用，两口300兆起步，三口及以上直接上1000兆。不吹不黑，实事求是。'
  },
  "FTTR到底值不值得装？用数据说话": {
    "sister": '上个月去一个复式楼的大姐家，她跟我说二楼信号就只有两格，孩子在楼上上网课经常卡。我一看——路由器放一楼电视柜，微波炉就在旁边。\n\n帮她装了FTTR光纤到每个房间以后，二楼三楼全满格。她拉着我说"早知道有这么好的方案，何必让孩子卡了半年"。\n\n90平以内一个路由器放客厅中间就够了。120平以上大平层和复式楼，FTTR光纤到每间房是唯一不卡的办法。',
    "sweet": '宝子们！如果你家是120平以上的大房子，WiFi信号老是房间有格、客厅没格的——FTTR光纤就是你的救星！\n\n普通路由器穿一堵墙信号掉一半，穿两堵墙直接废了。FTTR是光纤直接拉到每个房间，就像每个房间单独拉了一根宽带一样。\n\n90平以内一个千兆路由搞定，不花冤枉钱。120平以上再考虑FTTR～截图对比图，选前看一眼！',
    "tech": '实测数据：普通路由器穿1堵砖墙信号衰减47%，穿2堵衰减72%，掉包率超30%。FTTR光纤到房间方案，每个房间独立光纤接入，信号满格不掉包。\n\n适用场景量化：\n- ≤90㎡：1个千兆路由即可（覆盖半径10m，1-2堵墙）\n- 90-140㎡：AP面板或Mesh组网（2-3节点）\n- ≥140㎡ 或复式：FTTR（每层独立光纤）\n\n建议截图数据到厅演示，用实测说话。',
    "biz": '结论：FTTR适合120平以上或复式结构的家庭。\n\n成本对比：90平以内千兆路由器¥200-500，一次性投入。120平以上FTTR月费¥59起含设备租赁，三年总成本¥2124。但全屋千兆覆盖，每个房间信号满格。\n\n建议到厅看实际演示效果，再决定是否值得这笔投入。',
    "young": '兄弟们！家里WiFi信号差先别砸路由器！先看是不是户型问题。\n\n我测过：90平以内，随便一个千兆路由放客厅中间，够了。120平以上，普通路由穿2堵墙直接废——这不是路由的问题，是物理定律。\n\nFTTR就是每个房间拉一根光纤，信号直接满格。最适合大平层、复式、别墅。小户型别花冤枉钱！\n\n截图这个户型对照表，选方案之前看一眼！',
    "master": '干装维这些年，最常被问的是"我家WiFi信号差怎么办？"——九成跟路由器没关系。\n\n去年给一个200平的跃层客户装FTTR。之前他用三个路由器组网，二楼到三楼经常断。FTTR光纤拉上去以后，他说"再也没掉过"。\n\n信我一次：90平以内一个千兆路由够用。120平以上复式别墅，花钱装FTTR是最省事的方案，一步到位。'
  },
  "套餐怎么选": {
    "sister": '上个月一个大姐来店里，月租¥59每月十五号就没流量了。我一看——用三年了，现在同价位流量翻了一倍。帮她换到¥99/60G，一个月用40G还剩20G。钱少了流量多了。

还有一种更狠的——全家各交各的话费5×59=¥295。换家庭共享¥169，省了¥126还含宽带。评论说说你月租多少，我免费帮你查能不能省。',
    "sweet": '宝子们～月租¥59每月十五号就用完了？别买加油包！你看同价位流量翻倍的你都不知道？打开电信App看看套餐用几年了。三年以上的直接来店里换，月租不变流量翻倍。一家人各交各的？来我帮你算家庭套餐，人均¥30封顶还送宽带。截图到店找我免费查，不换号不换卡。',
    "tech": '数据对比：三年前¥59档含20G+200分钟，当前¥59档含40G+300分钟，性价比提升100%。67%的用户不知道自己的套餐可以免费升级。解决方案：到店免费查套餐使用情况，3分钟出分析报告。',
    "biz": '结论：三年换一次套餐是最优策略。不换每月多付¥30-50加油包，年度多付¥360-600。全家五口月付¥295vs家庭共享¥169，年度省¥1512。截图到店办，当场生效。',
    "young": '兄弟们！月租¥59每个月十五号花完？还花30买加油包？一个月实际89！你被套餐坑了三年！同样99现在能买60G。一家人的各交各的295，全家169还送宽带人均30。截图这个店址来店里，帮你看套餐到底能不能省。',
    "master": '办了这么多年，最常遇到老客户还在用三年前的套餐。上个月一个老客户来交话费我一查，每月多花45加油包。帮他换了以后他握着我的手说早点来就好了。信我一次：你的套餐该检查了，带身份证来店里免费查。'
  },
  "合约机 vs 买裸机，3年算下来谁省钱？": {
    "sister": '上个月一个小伙子算了一下午合约机划算还是裸机划算。那台手机裸机2999。合约机首付999月租含话费流量，三年共2880。比裸机省了119还送充电宝和耳机。有旧手机以旧换新折价加补贴最高抵1000——相当于半价换新。截图到店我帮你算，30分钟办好。',
    "sweet": '宝子们想换手机预算有限？裸机2999一次付清，合约机首付999以后每月交话费三年共2880。还送耳机充电宝！有旧手机以旧换新最高抵1000，半价换新手机。截图保存这个对比买手机前翻出来看。',
    "tech": '数据对比某款2999机型：方案A裸机一次性2999三年总成本2999+话费。方案B合约机首付999含话费流量三年总支出2880省119。方案C以旧换新旧机折价300-800+补贴200-600=最高抵1000。截图到店对比实际机型。',
    "biz": '结论：合约机三年内最优。财务分析首付999+月付80=三年2880比裸机2999省119。以旧换新折扣力度最大可达1000。截图分析到店专人办理。',
    "young": '兄弟们换新机预算紧？裸机2999直接劝退。合约机首付999月租含流量话费三年共2880，省了119还送耳机。最狠的是以旧换新旧手机拿来折价加补贴最高抵1000，半价换新。截图方案到店说兄弟介绍的。',
    "master": '做了这么多年买手机问我准没错。裸机一次付清适合不想被绑定的。合约机绑定三年省100多适合长期的。以旧换新力度最大最高抵1000。拿不定主意来店里当面帮你算。'
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
  "合约机 vs 买裸机，3年算下来谁省钱？": "合约机还是裸机？3年算下来省一台手机",
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
  "盛夏狂欢办千兆送手机":           "合约机 vs 买裸机，3年算下来谁省钱？",
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

  "柜台服务": "昨天来了个小伙子交话费，顺口问一句流量老不够用怎么办。一查——三年前的套餐，20G流量¥59。现在同样价格能办60G了。三年多交了快一千块冤枉钱。\n\n帮他换了个同价位套餐，流量翻了三倍。他瞪大眼睛说：这真的不加钱？我说不加，就是该更新了。三年前的套餐，现在同价位流量翻倍了。\n\n你的套餐还是三年前的吗？评论说说你月租多少，我帮你查。截图到店里带上身份证，3分钟出结果不换号不换卡。",

  "突发状况": "昨天傍晚10分钟下班，一个大爷急匆匆跑进来满头大汗，说手机突然上不了网了，孙子等着上网课。\n\n一查——大爷的流量用完了。他不懂怎么看急得团团转。我说先给您加上1G临时流量用着。开通之后爷爷拨通了孙子的视频——屏幕那头传来孩子的声音：爷爷我看到你了！爷爷眼眶一下就红了。\n\n家里有老人的，帮他们把流量提醒打开。老人流量不够用的评论说说，我教你怎么在App上设置提醒。截图步骤发给爸妈，省得他们为这种小事着急。",

  "温暖瞬间": "上周来了一个独居阿姨，在门口站了好几分钟才进来，怯生生地问我：姑娘，能不能教我怎么跟闺女视频？阿姨的手机是闺女买的，但只会接电话。闺女在深圳打工一年才回来一次，想闺女了。\n\n一步步教她——点这个绿色的按钮，找到闺女的名字，点视频通话。阿姨手有点抖，点了好几次才点对。视频接通的那一刻屏幕那头传来一声妈！阿姨眼泪就下来了。\n\n带爸妈来营业厅，我们免费教用智能手机。每周三下午有数字课堂。截图转发给不在爸妈身边的朋友。",

  "装机故事": "上个月去装了一户老小区，楼道里光纤箱离得远，走线要绕外墙。客户刚结婚，新家刚装修好不想打孔。以前遇到这情况可能就说装不了——现在有隐形光纤，比头发丝还细，沿着踢脚线走几乎看不见。\n\n花了两个多小时装完测速——千兆跑满。小夫妻试4K电影秒开，击了个掌。不管新房子老房子都有办法。\n\n你家装修布线有问题吗？评论说说，我免费帮你看。截图到店咨询，有专业方案不花冤枉钱。",

  "暑期蹭网故事": "上周接到电话，是个初中生打来的，声音怯生生的：叔叔我家WiFi好卡，上网课老是加载不出来。孩子爸妈都上班了一个人在家。\n\n远程指导他检查——发现路由器放弱电箱里，铁皮门把WiFi信号屏蔽得死死的。我说你打开弱电箱门试试。打开之后网速从2兆变成50兆，翻了25倍。孩子说叔叔你真厉害我终于能上课了。\n\n暑期孩子一个人在家，别让网速耽误了他。评论说说你家孩子上网课卡不卡，我教你几步自己排查。截图保存排查法，暑假用得上。",

  "暑期换机": "上周一个晒得黑黑的初中生跑进来，盯着柜台里的手机看了半天。我说小伙子想买手机？打了一个月暑假工攒了2000块想换台手机。天天在大太阳底下发传单晒得脸上两团红。\n\n推荐了一款合约机首付低月租含话费，还送了耳机充电宝。拿到新手机他一直在笑，说值了值了。准大学生们刚考完试想换手机的，合约机首付¥999起。\n\n带着准考证来找我，有学生专属优惠。评论说说你预算多少我帮你推荐。截图到店半小时办好。",

  "老客户情谊": "上周三，张叔像往常一样溜达到店里来了。不是来办业务的，就是路过进来坐坐聊聊天。\n\n张叔是十年老客户了。当年他家第一个宽带就是我装的还是ADSL拨号上网。十年换了三次套餐升了两次宽带换了一台光猫，一直在我们厅。我给他倒了杯水查了查有没有欠费提醒积分可以换礼品。换了个保温杯笑着说：你们还记着我呢。\n\n十年老客户处成了街坊邻居。评论说说你在这办了几年的业务？截图到店有老客户专属礼品，不用办业务也领。",

  "校园迎新": "每年九月开学，大一新生来办人生第一张手机卡。前几天来了个新生爸妈陪着来的，孩子一脸懵选套餐。\n\n校园套餐比社会套餐便宜一半。推荐给他月租¥59校园专属套餐——40G流量+500分钟+校园宽带，够用一整个学期不带加油包。爸妈一听价格放心了，孩子开心地说终于有自己的号码了。\n\n准大学生们来之前先问问，别多花冤枉钱。评论说说你选什么套餐我帮看看。截图到店办，学生证在手立马生效。",

  "社区营销": "上周末去迎泽区桥东街道摆摊，50户来测速30户没跑满。最大原因——办了300兆套餐路由器还是5年前的老款根本跑不满。\n\n这个周末我们去杏花岭区桃园北路社区文化中心，这周四上午9点到12点。免费测速不达标当场排查。路由器太旧当场以旧换新抵¥200。\n\n报你家小区名字优先排到你那。评论说说你家在哪天方便。截图保存时间地点，到现场免费领礼品。",

  "政企服务": "上个月一个做电商的小公司老板找到我，说办公室网一到下午就卡，直播带不动货。一查——一条普通宽带撑20个人用，还在用一个路由器。\n\n给他换了企业专线加云桌面加视频会议方案。花了半天装好，他说第二天直播没卡过一次。一家企业便宜的一年也就¥3000-5000，比断网一天亏几千强。\n\n你的公司网络也得升升级了，评论区说说需求，上门勘察出方案，报个价看看。截图留着年底预算有用。",

  "银发服务": "上周一个老大爷来营业厅，问能不能帮他跟儿子视频。大爷一个人住，手机只会打电话接电话。\n\n我在柜台一步步教他怎么开视频怎么找到儿子。大爷学了一个多小时终于会了。接通的那一刻他愣了一下然后笑了——那个笑容我现在还记得。\n\n每周三下午有免费手机教学课，带爸妈来我们教。截图转发给不在爸妈身边的朋友，让他们知道营业厅能免费教用手机。",

  "投诉化解": "上个月一个大哥气冲冲来投诉，说网费多扣了三个月。我让他坐下倒了杯水，说大哥别急我先查查。\n\n一查——确实多扣了，是系统自动续费了一个老套餐。当场退款没有废话。大哥走的时候说态度不错下次还来。投诉不是可怕的事，怕的是没人用心对待。\n\n有网络问题直接来店找我，比打电话快。评论说说你有问题留言，截图到店有专人对接。",

  "节日活动": "中秋的时候我们在营业厅门口摆了个月饼摊。30分钟送了28个月饼。有人说是今年收到的第一个月饼。还有一位骑手小哥路过，我塞给他一个月饼，他愣了一下说谢谢。\n\n营业厅不只是办业务的地方，也是城市的温度。每个节假日我们都有活动，评论说说你期待什么活动，截图到店领小礼品。",

  "突发事件": "上个月突然下雨，一个外卖小哥跑进来躲雨。我给他倒了杯水说进来坐坐不急。他说手机没电了，还借了充电器充了半小时。\n\n过了几天他回来了，办了一张流量卡。说上次躲雨发现这里服务挺好，以后就在这里办了。有时候一个善意的动作就能换来一个客户。\n\n路过来坐坐喝杯水，不办业务也欢迎。评论说说你被营业厅暖到过的瞬间。",

  "公益服务": "我们在营业厅门口设了个爱心站，免费给环卫工人提供热水和充电。有天一个环卫阿姨在门口蹭WiFi跟孩子视频了半小时。她走的时候一直说谢谢。\n\n后来同事问她为啥不去营业厅里面坐着充？她说怕弄脏地板。我们说不脏，您来我们欢迎。小事见人心。\n\n转发这条给身边的环卫工人，让他们知道营业厅能免费充电喝水。评论说说你身边有让人暖心的服务故事吗？",

  "数字课堂": "每周三下午数字课堂。上个月刚讲了防诈骗专题——有阿姨说自己差点被骗了养老钱。她说骗子冒充公检法让她转账，她想起我在课堂上讲过"公检法不会电话要求转账"，挂了电话。\n\n数字课堂不只是教手机，更是守好老人的养老钱。每周三下午免费参加，带爸妈来也行。评论报名预留位置。截图转发给家里有老人的朋友。",

  "高考换机": "高考完第二天就来买手机，爸爸比孩子还紧张。\n\n孩子想要最新款，爸爸偷偷跟我说预算有限。推荐了合约机方案首付¥999，月租含话费流量，还送耳机充电宝。孩子满意了爸爸也放心了。高考是人生大事，选对人生第一台手机也是大事。\n\n带着准考证来店里买手机有学生专属优惠。评论说说你想买什么手机，我帮你查能不能学生价。截图到店半小时拿新机。"
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

  "办业务送礼": "办宽带送千兆路由器价值¥299，续约升档送流量包价值¥100，老客户积分还能换礼品。办个融合套餐宽带+手机+IPTV，比单独办省一半。还送路由器送流量，相当于白捡好几百。\n\n老客户来查查你的积分账户，可能还躺着几千分没花。活动到这个月底。评论说说你现在宽带月租多少我帮你算哪个套餐最省。截图到店带身份证就行。",

  "以旧换新": "旧手机放家里吃灰卖二手嫌麻烦扔了又可惜。拿来我们店里当场估价当场抵钱，不管能不能开机屏幕碎没碎，拿来就能抵。最高抵¥1000。\n\n上周一个客户5年前的旧机抵了¥300换了台新机，高兴得发了个朋友圈。带旧设备来XX路电信营业厅，当场估价当场抵。\n\n不买也来估个价心里有个数。评论说说你什么型号的旧机，我先帮你估个价。截图这个活动到月底。",

  "手机清洁": "手机用久了屏幕全油听筒堵了声音小充电口积灰充不进电？超声波清洁+屏幕消毒+Type-C口清理+系统缓存清理，外面做一次¥68-98，我们免费。整个流程10分钟，做完了手机跟新的一样。\n\n等清洁的工夫顺便测测网速看看宽带有没有问题。XX路电信营业厅长期免费手机清洁。评论预约不用排队，截图到店直接做。",

  "宽带体验": "千兆宽带到底多快？下载一部4K电影只要10秒——你从1数到10电影就下完了。刷视频不卡打游戏延迟十几毫秒。\n\n试完了想办就办不想办也没关系，试试又不收费。地址在XX路电信营业厅有千兆体验区随时来试。千兆¥169/月，300兆¥99/月，到店实测再决定。\n\n评论预约体验时间。截图保存地址导航过来。",

  "暑期纳凉": "太原38度了。不想在家吹空调费电？来我们营业厅吹空调喝冰水——免费的。手机免费贴膜免费清洁免费测网速，都是免费的。\n\n带孩子的还能让他在厅里坐会儿蹭WiFi写作业。不办业务也欢迎路过进来凉快一下。XX路电信营业厅就是大家的避暑点。\n\n评论你说我在路上，我开门等你。截图地址导航过来纳凉。",

  "学生购机": "准大学生们注意了——凭学生证/准考证/录取通知书来买手机有专属优惠价。比网上便宜好几百还送大礼包：耳机+充电宝+手机壳，外面买一套¥200多免费送。\n\n手机能亲手摸到真机能当场比价格有售后出了问还能直接找我。合约机首付¥999起。到月底。\n\n评论说说你想要的手机型号，我帮你查有没有学生价。截图到店带上学生证，30分钟拿新机。",

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
// Auto-generated topic pool
// Updated: 2026-07-20
window.___topicPool = {
  "decision": [
    "暑假孩子天天在家，宽带选多少兆够用？",
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
    "家里有学生上网课，宽带怎么选？"
  ],
  "scene": [
    "暑假第一个来办宽带的妈妈，理由让人泪目",
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
    "聋哑用户用手语说谢谢，那一刻觉得工作很值"
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
    "暑假福利！学生宽带半价，家长速来",
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
    "积分兑换活动开启，您的积分可以换好礼"
  ]
};

