# Are you lost?

> 一场关于末班地铁、十平米出租屋与人生岔路的深夜对话。这里没有标准答案，只有你与自己的坦诚时刻。

**Are you lost?** 是一款面向移动端竖屏优先（兼容桌面剧场模式）的极简电影感文字互动叙事游戏。作品围绕当代青年在加班、房租、合租独居、家庭期待与同辈比较之间的真实处境展开，通过克制的文本、代码生成的动态手绘线稿、随情绪演变的背景光影，以及全程序化生成的深夜柔音配乐，带来安静而沉浸的夜间阅读体验。

## 核心体验

- **分幕电影式叙事节奏**：覆盖末班地铁（23:40）到清晨天桥（05:30）的七幕夜行轨迹，包含十余次关键选择、前后呼应的记忆回响与 6 种余韵结局。
- **均匀柔显与情感标注排版**：支持逐字均匀浮现、手绘琥珀色下划线与圈点着重动画、内心低语及微震动表现，并在关键节点搭配可交互的手机通知 / 备忘录 / 账单物件浮卡。
- **动态手绘线稿舞台**：基于 `roughjs` 与 `Motion` 实时绘制 7 处城市夜景与 2.5D 视差景深，随剧情焦点变化柔和虚化或唤醒晨光。
- **生成式深夜音乐与音效**：使用原生 Web Audio API 实时合成随情绪切换调性的柔音钢琴（Felt Piano）乐句、雨声环境底噪，以及纸笔划圈、手机震动、翻页和钟鸣等触感音效。
- **本地自动存档与余韵图鉴**：支持随时继续未完的夜行，并永久记录已解锁的 6 种结局与对话轨迹。

## 技术栈

- **框架**：React 19 + TypeScript + Vite
- **样式**：Tailwind CSS v4
- **叙事引擎**：`inkjs`（`src/story/areYouLost.ink`）
- **手绘图形与动画**：`roughjs` + `motion`
- **音频引擎**：Web Audio API（零外部音频资源依赖）
- **图标**：`lucide-react`

## 目录结构

```text
src/
├── components/
│   ├── AmbientBackdrop.tsx   # 情景色调转换与呼吸光影背景
│   ├── ChoiceDeck.tsx        # 手绘边框抉择面板
│   ├── EndingScreen.tsx      # 结局余韵卡片与思考提问
│   ├── HandDrawnStage.tsx    # 7 幕手绘线稿舞台与 2.5D 视差
│   ├── HistorySheet.tsx      # 记忆回溯与 6 结局图鉴抽屉
│   ├── KineticText.tsx       # 均匀逐字浮现、圈点特效与幕间字幕
│   ├── StageHeader.tsx       # 极简顶部导航与静音/重开控制
│   ├── StoryPropCard.tsx     # 18 种手机消息、账单与草稿物件浮卡
│   └── TitleScreen.tsx       # 开场封面与手绘路灯剪影
├── engine/
│   ├── inkRunner.ts          # Ink 剧本编译、标签解析与本地存档
│   └── soundEngine.ts        # 生成式柔音钢琴配乐与拟真音效
├── story/
│   └── areYouLost.ink        # 完整多分支互动剧本
└── types/
    └── narrative.ts          # 叙事状态、场景、道具与结局类型定义
```

## 本地运行与构建

```bash
# 安装依赖
npm install

# 启动本地开发服务器（默认端口 3000）
npm run dev

# 类型检查
npm run lint

# 构建生产版本
npm run build
```

## 部署至 GitHub Pages

项目已内置 GitHub Actions 自动部署配置（`.github/workflows/deploy.yml`）并适配了子路径资源引用：

1. 将代码推送到你的 GitHub 仓库（如 `are-you-lost` 的 `main` 或 `master` 分支）。
2. 在仓库页面打开 **Settings → Pages**。
3. 将 **Build and deployment → Source** 切换为 **GitHub Actions**。
4. 触发一次工作流（或推送新提交）后，即可通过 `https://<你的用户名>.github.io/are-you-lost/` 在线访问。

