// 抖本工坊 · 每日脚本精选（3.0 mood 版 SEED_POOL 契约样例）
// 契约见 v3.0-完整方案.md §7.6.1：3 语气(mood) × 6 人设(_persona 生成端元数据)
// 渲染层只读 variants[mood] 数组，绝不读 _persona
// 生成时间: 2026-08-05（样例数据，非正式 SCF 产出）
window.___dailyScripts = {
  "week": "2026-W32",
  "generatedAt": "2026-08-05T09:00:00Z",
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
      "seedId": "s_aff_001",
      "topic": "宽带到期：续费还是换套餐",
      "type": "decision",
      "typeName": "口播脚本",
      "typeIcon": "📊",
      "mood": "affinity",
      "hookType": "痛点共鸣",
      "hook": "三年前的老套餐，现在还划算吗？",
      "structure": "三段对比",
      "scene": "店内柜台",
      "day": 3,
      "hotTopic": "8月电信日5G套餐优惠预告",
      "compliance": { "status": "passed", "autoFixed": 0, "blocked": false },
      "variants": {
        "affinity": [
          { "_vid": "a1", "_persona": "warm", "bgm": "温馨轻快",
            "title": "宽带到期了，先别急着续费",
            "script": "三年前的老套餐现在真不划算了。同价位现在流量翻了一倍，带身份证来店里三分钟帮你查，不换号不换卡免费办。",
            "tags": ["宽带","续费"],
            "storyboard": [{"sec":"0-2","speaker":"亲切开场","text":"「老套餐还划算吗」","camera":"柜台口播"},{"sec":"2-4","speaker":"算账","text":"「同价流量翻倍」","camera":"套餐单页"}] },
          { "_vid": "a2", "_persona": "sweet", "bgm": "甜美节奏",
            "title": "宝子们的宽带是不是也多年没动过",
            "script": "宝子们的宽带是不是也用了好几年没动过？套餐早升级了你还按老价格交。评论区留城市，学姐帮你看看能不能降档不降速～" }
        ],
        "professional": [
          { "_vid": "p1", "_persona": "tech", "bgm": "沉稳专业",
            "title": "宽带续费 ROI 实测对比",
            "script": "三年期套餐 ROI 对比：原地续费¥59/20G，换新¥59/60G，流量提升200%。到厅三分钟免费测速，不换号当场生效。",
            "tags": ["宽带","测速"],
            "storyboard": [{"sec":"0-2","speaker":"数据开场","text":"「不讲废话上数据」","camera":"测速屏"},{"sec":"2-4","speaker":"对比","text":"「20G→60G 同价」","camera":"白板写数字"}] },
          { "_vid": "p2", "_persona": "pro", "bgm": "商务节奏",
            "title": "老宽带资费建议每季度核对",
            "script": "企业/家庭老宽带普遍存在套餐过期仍按原价的情况。建议每季度核对一次资费，太原柳巷厅可免费出比对单。" }
        ],
        "young": [
          { "_vid": "y1", "_persona": "vibe", "bgm": "动感",
            "title": "你那宽带是不是办了就再没管过",
            "script": "兄弟们，你那宽带是不是办了就再没管过？同价现在能翻倍流量！老套餐多年没动等于白花冤枉钱，来姐这查查能不能升档不升价。",
            "tags": ["宽带","年轻人"],
            "storyboard": [{"sec":"0-2","speaker":"活力开场","text":"「宽带别白送钱」","camera":"门店实景"},{"sec":"2-4","speaker":"引导","text":"「来查查翻倍」","camera":"互动口播"}] },
          { "_vid": "y2", "_persona": "vibe", "bgm": "轻松",
            "title": "帮爸妈查查老宽带",
            "script": "爸妈家的宽带十年没换过套餐了吧？帮他们查查，很多时候降档反而更省，年轻人顺手的事。" }
        ]
      },
      "slots": ["city","store"]
    },
    {
      "seedId": "s_scn_001",
      "topic": "家里 WiFi 卡，先别急着升套餐",
      "type": "scene",
      "typeName": "服务故事",
      "typeIcon": "🎬",
      "mood": "affinity",
      "hookType": "场景代入",
      "hook": "网速慢，八成不是宽带的问题",
      "structure": "问题-排查-解决",
      "scene": "用户家中",
      "day": 4,
      "compliance": { "status": "passed", "autoFixed": 0, "blocked": false },
      "variants": {
        "affinity": [
          { "_vid": "a1", "_persona": "warm", "bgm": "温馨轻快",
            "title": "上个月修了12户，10户不是宽带问题",
            "script": "上个月修了12户网，10户根本不是宽带问题——路由器塞电视柜挨着微波炉，信号直接减半。挪出来放客厅中间满格了。你家路由器搁哪的？",
            "tags": ["WiFi","路由器"],
            "storyboard": [{"sec":"0-2","speaker":"暖心开场","text":"「网慢先别慌」","camera":"服务画面"},{"sec":"2-4","speaker":"排查","text":"「挪出柜子满格」","camera":"路由器特写"}] },
          { "_vid": "a2", "_persona": "sweet", "bgm": "甜美节奏",
            "title": "WiFi 卡先别花钱升级",
            "script": "宝子们 WiFi 卡先别急着花钱升级！八成是路由器位置不对。拍张照发评论区，学姐免费帮你看看摆哪信号最稳～" }
        ],
        "professional": [
          { "_vid": "p1", "_persona": "tech", "bgm": "沉稳专业",
            "title": "83% 弱覆盖源于位置而非带宽",
            "script": "实测：83% 家庭 WiFi 弱覆盖源于路由器位置/信道干扰，非带宽不足。优化位置后覆盖率可从41%升至88%，无需升档。",
            "tags": ["WiFi","实测"],
            "storyboard": [{"sec":"0-2","speaker":"专业开场","text":"「先查位置再谈升级」","camera":"检测设备"},{"sec":"2-4","speaker":"数据","text":"「41%→88%覆盖率」","camera":"检测报告"}] },
          { "_vid": "p2", "_persona": "tech", "bgm": "沉稳专业",
            "title": "千兆跑不满先查协商速率",
            "script": "千兆宽带跑不满先查协商速率：WAN口若协商成100M，换根六类线即可恢复。先查线路再谈升级。" }
        ],
        "young": [
          { "_vid": "y1", "_persona": "vibe", "bgm": "动感",
            "title": "网速慢先别急着怪宽带",
            "script": "网速慢先别急着怪宽带！先看看你那路由器是不是塞柜子里了。挪出来，立马满血复活，这波操作不花一分钱。",
            "tags": ["WiFi","吐槽"],
            "storyboard": [{"sec":"0-2","speaker":"活力开场","text":"「先别急」","camera":"门店实景"},{"sec":"2-4","speaker":"演示","text":"「挪出满血复活」","camera":"路由器操作"}] },
          { "_vid": "y2", "_persona": "vibe", "bgm": "轻松",
            "title": "晒晒你家路由器位置",
            "script": "打游戏卡顿先别甩锅宽带！大概率路由器摆错地儿。兄弟们评论区晒晒你家路由器位置，我挨个点评。" }
        ]
      },
      "slots": ["city","store"]
    },
    {
      "seedId": "s_loc_001",
      "topic": "暑期千兆宽带提速",
      "type": "local",
      "typeName": "本地活动",
      "typeIcon": "📍",
      "mood": "affinity",
      "hookType": "利益直给",
      "hook": "暑假在家，老宽带真顶不住",
      "structure": "场景-方案",
      "scene": "营业厅",
      "day": 5,
      "hotTopic": "华为新品发布会倒计时",
      "compliance": { "status": "passed", "autoFixed": 0, "blocked": false },
      "variants": {
        "affinity": [
          { "_vid": "a1", "_persona": "warm", "bgm": "温馨轻快",
            "title": "暑假孩子刷课打游戏，老宽带顶不住",
            "script": "暑假孩子在家刷课打游戏，老宽带真顶不住。现在千兆暑期特惠，新装99一个月还送路由器，一家人看4K也不卡。",
            "tags": ["千兆","暑期"],
            "storyboard": [{"sec":"0-2","speaker":"亲切开场","text":"「暑假网速顶不住」","camera":"营业厅"},{"sec":"2-4","speaker":"方案","text":"「千兆99送路由」","camera":"套餐展示"}] },
          { "_vid": "a2", "_persona": "sweet", "bgm": "甜美节奏",
            "title": "暑期宅家追剧的宝子看过来",
            "script": "暑期宅家追剧的宝子看过来！千兆宽带现在半价，一个人住300M够用，一家人直接上千兆，评论区留人数学姐帮你选～" }
        ],
        "professional": [
          { "_vid": "p1", "_persona": "tech", "bgm": "沉稳专业",
            "title": "按设备数选带宽，不盲目上顶配",
            "script": "暑期多设备并发：50台以内300M足够；全屋4K+监控建议1000M或FTTR全光组网。按设备数选，不盲目上顶配。",
            "tags": ["千兆","FTTR"],
            "storyboard": [{"sec":"0-2","speaker":"专业开场","text":"「按设备数选带宽」","camera":"户型图"},{"sec":"2-4","speaker":"建议","text":"「300M/1000M/FTTR」","camera":"方案白板"}] },
          { "_vid": "p2", "_persona": "pro", "bgm": "商务节奏",
            "title": "中小企业远程办公带宽建议",
            "script": "中小企业暑期远程办公：1000M专线实测穿墙与并发优于家用宽带，一天3块3换来全年不卡，可预约免费上门测速。" }
        ],
        "young": [
          { "_vid": "y1", "_persona": "vibe", "bgm": "动感",
            "title": "暑假别让网速拖后腿",
            "script": "暑假别让网速拖后腿！千兆宽带现在白菜价，打游戏零延迟刷剧不转圈，年轻人该有的排面必须有。",
            "tags": ["千兆","年轻人"],
            "storyboard": [{"sec":"0-2","speaker":"活力开场","text":"「网速别拖后腿」","camera":"门店实景"},{"sec":"2-4","speaker":"利益","text":"「零延迟不转圈」","camera":"游戏画面"}] },
          { "_vid": "y2", "_persona": "vibe", "bgm": "轻松",
            "title": "合租兄弟怎么选宽带最划算",
            "script": "宿舍/合租的兄弟看过来！几个人共用一条宽带最划算？1000M分摊下来每人一天一块钱，比单办香多了。" }
        ]
      },
      "slots": ["city","store"]
    }
  ]
};
