# 项目上下文

## 项目简介

**行囊** — 国内轻量化旅行决策工具 + 小众目的地灵感库。解决选择困难、信息冗余、决策低效三大痛点，提供全结论式内容、无冗余信息、可控随机灵感、开箱即用的轻方案。

### 版本技术栈

- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── src/
│   ├── app/                # 页面组件
│   │   ├── globals.css     # 全局样式 + 自定义动画
│   │   ├── page.tsx        # 首页（偏好筛选+随机推荐+快捷专区）
│   │   ├── city/[id]/page.tsx    # 目的地详情页（头图+四Tab+懒人行程+工具区）
│   │   ├── favorites/page.tsx    # 收藏夹页面（多清单+对比+足迹）
│   │   ├── holiday/page.tsx      # 节假日人流预警页面
│   │   ├── nearby/page.tsx       # 周边短途推荐页面
│   │   └── niche/page.tsx        # 小众秘境推荐页面
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/
│   │   └── use-favorites.ts # 收藏功能 Hook（多清单+想去/去过+对比+足迹）
│   ├── lib/
│   │   ├── types.ts        # TypeScript 类型定义
│   │   ├── city-data.ts    # 主力城市攻略数据（20+城市）
│   │   ├── niche-data.ts   # 小众目的地数据（10+县城/村落）
│   │   ├── more-data.ts    # 扩展城市数据
│   │   ├── data-index.ts   # 数据索引（筛选/推荐/季节/周边逻辑）
│   │   ├── share-utils.ts  # 分享功能工具函数
│   │   └── utils.ts        # 通用工具函数
│   └── main.tsx            # 应用入口 + React Router 配置
├── DESIGN.md               # 设计规范
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # TypeScript 构建配置
├── index.html              # HTML 入口
└── package.json
```

## 核心功能

1. **偏好筛选随机推荐**：支持目的地类型/天数/预算/季节多维度标签筛选，无筛选时纯盲盒模式
2. **目的地详情页**：头图信息卡+四大Tab（好玩/好吃/好逛/避坑）+懒人现成行程+行李清单/预算速算工具
3. **收藏系统升级**：多自定义清单、「想去/去过」双标记、对比模式、去过自动屏蔽随机推荐
4. **周边短途**：按出发城市推荐1-2小时高铁/自驾可达的周末目的地
5. **小众秘境**：非网红县城/村落推荐，差异化内容池
6. **季节推荐**：当月最佳目的地 + 随机优先当季
7. **节假日人流预警**：热门目的地预警 + 替代小众方案

## 分享功能

分享文本生成使用 `src/lib/share-utils.ts` 中的工具函数：

```tsx
import { generateShareText } from '@/lib/share-utils';

const text = generateShareText(city, province, {
  bestTime,
  duration,
  pitfalls,
  funSpots,
  food,
  shopping,
});
```

## 包管理规范

**仅允许使用 pnpm** 作为包管理器。

## 开发规范

- TypeScript strict 模式，禁止隐式 any
- 路由使用 React Router v7，配置在 `src/main.tsx`
- 链接使用 `<Link to="...">` 组件
- 导航使用 `useNavigate()` Hook
- 动态路由参数使用 `useParams()` Hook
- 收藏数据使用 localStorage，通过 `useFavorites` Hook 管理
- 页面动画使用 CSS keyframes（fade-in, slide-up, slide-in-right）
- 数据类型定义在 `src/lib/types.ts`，新字段先更新类型再使用
