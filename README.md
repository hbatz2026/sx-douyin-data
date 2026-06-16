# 山西电信抖本内容工坊 · 云端自动化（Gitee 版）

每周一自动更新热点跟拍、选题库、BGM推荐数据，电脑关机也不影响。
国内网络无障碍，全程使用 Gitee + EdgeOne Pages。

## 架构

```
Gitee Go 流水线 (每周一 9:00/9:30 CST)
  ├─ fetchTrends() → hotflashnews.com 抓抖音热搜
  ├─ callDeepSeek() → AI 加工为电信营业厅内容
  ├─ 写入 data/*.js
  └─ git push → EdgeOne Pages 自动部署
```

## 首次配置（3 步）

### 1. 注册 Gitee 账号
- 打开 https://gitee.com/ （国内秒开）
- 注册账号，创建仓库（名称随意，建议私有）
- 获取仓库地址：`https://gitee.com/你的用户名/仓库名.git`

### 2. 推送代码到 Gitee
```bash
cd D:\Temp\WorkBuddy\douyin-cloud-auto
git init
git add .
git commit -m "init"
git remote add origin https://gitee.com/你的用户名/仓库名.git
git push -u origin master
```

### 3. 配置 Gitee Go
- 在 Gitee 仓库页面 → 服务 → Gitee Go
- 添加环境变量：`DEEPSEEK_API_KEY` = 你的 DeepSeek API Key
- 流水线配置文件 `.gitee/go/pipelines.yml` 已随代码推送

### 4. 连接 EdgeOne Pages（可选，推荐）
- EdgeOne 控制台 → 项目 `makers-3vsxkouc2mrk` → Git 连接
- 选择 Gitee → 授权 → 选择这个仓库
- 构建命令留空，输出目录留空（根目录部署）
- 之后每次 Gitee Go 流水线 push，EdgeOne 自动部署

## 备选方案（如果 Gitee Go 用不了）

如果 Gitee Go 的流水线功能未开启或有兼容问题，可以降级为**本地脚本 + Windows 计划任务**：

```bash
# 设置环境变量
set DEEPSEEK_API_KEY=你的key

# 手动运行
node scripts/update-data.mjs hotspot
node scripts/update-data.mjs topics
node scripts/update-data.mjs bgm
```

然后用 Windows 计划任务每周一触发这三个命令（和之前 WorkBuddy 自动化类似，但不依赖 WorkBuddy，只需要 Node.js）。

## 本地测试

```bash
set DEEPSEEK_API_KEY=你的key
cd D:\Temp\WorkBuddy\douyin-cloud-auto

# 测试热点更新
node scripts/update-data.mjs hotspot

# 测试选题更新
node scripts/update-data.mjs topics

# 测试BGM更新
node scripts/update-data.mjs bgm
```

## 文件结构

```
├── .gitee/go/
│   └── pipelines.yml         ← Gitee Go 流水线配置
├── scripts/
│   └── update-data.mjs       ← 核心脚本（3种模式）
├── data/                     ← 数据文件（每周自动更新）
├── index.html + styles.css + app.js  ← 工坊主站
└── package.json
```

## 费用

| 项目 | 单次 | 月费 |
|------|------|------|
| DeepSeek API | ~5000 token ≈ ¥0.005 | ¥0.16 |
| Gitee | 免费 | ¥0 |
| Gitee Go | 免费 | ¥0 |
| EdgeOne Pages | 免费 | ¥0 |
| **合计** | | **≈ ¥0.16/月** |
