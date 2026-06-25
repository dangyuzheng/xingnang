# 项目上下文

## 项目简介

**行囊** — 旅行攻略随机推荐网站。用户点击按钮随机推荐国内旅行目的地，生成包含最佳时间、避坑、好玩、好吃、好逛等详细攻略，支持收藏保存和一键分享。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── api/share/      # 分享内容生成 API
│   │   ├── globals.css     # 全局样式 + 自定义动画
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页面（随机推荐 + 收藏 + 分享）
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/
│   │   └── use-favorites.ts # 收藏功能 Hook（localStorage）
│   ├── lib/
│   │   ├── city-data.ts    # 城市旅行攻略数据（20+国内城市）
│   │   └── utils.ts        # 通用工具函数
│   └── server.ts           # 自定义服务端入口
├── DESIGN.md               # 设计规范
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 核心功能

1. **随机推荐**：点击按钮从 20+ 国内城市中随机推荐，带加载动画
2. **详细攻略**：每个城市包含最佳时间、建议天数、好玩/好吃/好逛/避坑四个分类
3. **收藏保存**：localStorage 持久化，右侧抽屉查看收藏列表
4. **一键分享**：POST `/api/share` 生成格式化文本，支持复制剪贴板和系统原生分享

## API 接口

### POST /api/share
生成分享文本内容。
- 请求体：`{ city, province, guide: { bestTime, duration, pitfalls, funSpots, food, shopping } }`
- 响应：`{ text: string, shareUrl: string }`

## 包管理规范

**仅允许使用 pnpm** 作为包管理器。

## 开发规范

- TypeScript strict 模式，禁止隐式 any
- 所有客户端组件使用 `'use client'` 指令
- 收藏数据使用 localStorage，通过 `useFavorites` Hook 管理
- 页面动画使用 CSS keyframes（fade-in, slide-up, slide-in-right）
