# 行囊 - 轻量级旅行决策工具

这是一个基于 [React 19](https://react.dev) + [Vite 8](https://vitejs.dev) + [shadcn/ui](https://ui.shadcn.com) 的旅行决策工具，帮助用户发现小众目的地，获得随机灵感，规划完美旅程。

## 快速开始

### 启动开发服务器

```bash
pnpm run dev
```

启动后，在浏览器中打开 [http://localhost:5173/xingnang](http://localhost:5173/xingnang) 查看应用。

开发服务器支持热更新，修改代码后页面会自动刷新。

### 构建生产版本

```bash
pnpm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产版本

```bash
pnpm run preview
```

## 项目结构

```
src/
├── app/                      # 页面组件目录
│   ├── globals.css           # 全局样式（包含 shadcn 主题变量）
│   ├── page.tsx             # 首页（盲盒推荐）
│   ├── city/[id]/page.tsx    # 城市详情页
│   ├── favorites/page.tsx    # 收藏页
│   ├── nearby/page.tsx       # 周边短途页
│   ├── niche/page.tsx        # 小众秘境页
│   └── holiday/page.tsx      # 节假日避坑页
├── components/              # React 组件目录
│   └── ui/                  # shadcn/ui 基础组件（优先使用）
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/                     # 工具函数库
│   ├── utils.ts             # cn() 等工具函数
│   ├── types.ts             # TypeScript 类型定义
│   ├── data-index.ts        # 数据索引与筛选逻辑
│   └── share-utils.ts       # 分享功能工具函数
├── hooks/                   # 自定义 React Hooks
│   └── use-favorites.ts     # 收藏功能 Hook
└── main.tsx                 # 应用入口（React Router 配置）
```

## 核心开发规范

### 1. 组件开发

**优先使用 shadcn/ui 基础组件**

本项目已预装完整的 shadcn/ui 组件库，位于 `src/components/ui/` 目录。开发时应优先使用这些组件作为基础：

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>标题</CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  );
}
```

**可用的 shadcn 组件清单**

- 表单：`button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`
- 布局：`card`, `separator`, `tabs`, `accordion`, `collapsible`, `scroll-area`
- 反馈：`alert`, `alert-dialog`, `dialog`, `toast`, `sonner`, `progress`
- 导航：`dropdown-menu`, `menubar`, `navigation-menu`, `context-menu`
- 数据展示：`table`, `avatar`, `badge`, `hover-card`, `tooltip`, `popover`
- 其他：`calendar`, `command`, `carousel`, `resizable`, `sidebar`

详见 `src/components/ui/` 目录下的具体组件实现。

### 2. 路由开发

使用 React Router v7 进行路由管理，路由配置在 `src/main.tsx` 中：

```tsx
// 在 main.tsx 中添加新路由
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/city/:id', element: <CityDetailPage /> },
]);
```

**页面组件示例**

```tsx
// src/app/about/page.tsx
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <Button>了解更多</Button>
    </div>
  );
}
```

**动态路由示例**

```tsx
// src/app/city/[id]/page.tsx
import { useParams, useNavigate } from 'react-router-dom';

export default function CityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>城市 ID: {id}</h1>
      <Button onClick={() => navigate('/')}>返回首页</Button>
    </div>
  );
}
```

**链接组件**

```tsx
import { Link } from 'react-router-dom';

<Link to="/about">关于页面</Link>
<Link to={`/city/${city.id}`}>城市详情</Link>
```

### 3. 依赖管理

**必须使用 pnpm 管理依赖**

```bash
pnpm install

pnpm add package-name

pnpm add -D package-name
```

项目已配置 `preinstall` 脚本，使用其他包管理器会报错。

### 4. 样式开发

**使用 Tailwind CSS v4**

本项目使用 Tailwind CSS v4 进行样式开发，并已配置 shadcn 主题变量。

```tsx
<div className="flex items-center gap-4 p-4 rounded-lg bg-background">
  <Button className="bg-primary text-primary-foreground">
    主要按钮
  </Button>
</div>

import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)}>
  内容
</div>
```

**主题变量**

主题变量定义在 `src/app/globals.css` 中，支持亮色/暗色模式：

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### 5. 表单开发

推荐使用 `react-hook-form` + `zod` 进行表单开发：

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, '用户名至少 2 个字符'),
  email: z.string().email('请输入有效的邮箱'),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', email: '' },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('username')} />
      <Input {...form.register('email')} />
      <Button type="submit">提交</Button>
    </form>
  );
}
```

### 6. 数据获取

**客户端数据获取**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

## 常见开发场景

### 添加新页面

1. 在 `src/app/` 下创建组件文件
2. 在 `src/main.tsx` 中注册路由
3. 使用 shadcn 组件构建 UI

### 创建业务组件

1. 在 `src/components/` 下创建组件文件（非 UI 组件）
2. 优先组合使用 `src/components/ui/` 中的基础组件
3. 使用 TypeScript 定义 Props 类型

### 添加全局状态

推荐使用 React Context 或 Zustand：

```tsx
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 技术栈

- **框架**: React 19 + Vite 8
- **路由**: React Router v7
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS v4
- **表单**: React Hook Form + Zod
- **图标**: Lucide React
- **包管理器**: pnpm 9+
- **TypeScript**: 5.x

## 参考文档

- [React 官方文档](https://react.dev)
- [Vite 官方文档](https://vitejs.dev)
- [React Router 文档](https://reactrouter.com)
- [shadcn/ui 组件文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)

## 重要提示

1. **必须使用 pnpm** 作为包管理器
2. **优先使用 shadcn/ui 组件** 而不是从零开发基础组件
3. **使用 TypeScript** 进行类型安全开发
4. **使用 `@/` 路径别名** 导入模块（已配置）
5. **路由配置在 `src/main.tsx`** 中管理
