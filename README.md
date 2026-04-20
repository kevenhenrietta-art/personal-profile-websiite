# 个人作品集网站

基于 Next.js + TypeScript + Tailwind CSS + Framer Motion 构建的个人求职作品集网站。

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

## 项目结构

```
.
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 主页
│   │   └── globals.css   # 全局样式
│   ├── components/       # 组件
│   │   ├── Navbar.tsx    # 导航栏
│   │   ├── Hero.tsx      # 首页英雄区
│   │   ├── About.tsx     # 关于我
│   │   ├── Projects.tsx  # 项目作品
│   │   ├── Skills.tsx    # 技术技能
│   │   ├── Growth.tsx    # 成长历程
│   │   ├── Learning.tsx  # 学习记录
│   │   └── Footer.tsx    # 页脚
│   └── data/             # 数据文件
│       ├── index.ts      # 数据导出
│       ├── profile.ts    # 个人信息
│       ├── projects.ts   # 项目数据
│       ├── skills.ts     # 技能数据
│       ├── growth.ts     # 成长数据
│       └── learning.ts   # 学习数据
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   └── files/            # 文件资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 自定义内容

### 修改个人信息

编辑 `src/data/profile.ts` 文件来更新个人信息。

### 添加项目

编辑 `src/data/projects.ts` 文件来添加或修改项目信息。

### 更新技能

编辑 `src/data/skills.ts` 文件来更新技能列表。

### 添加成长经历

编辑 `src/data/growth.ts` 文件来添加成长历程。

### 添加学习记录

编辑 `src/data/learning.ts` 文件来添加学习记录。

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入仓库
3. 等待自动部署完成

### 其他平台

项目可以部署到任何支持 Next.js 的平台，如：
- Netlify
- Cloudflare Pages
- 阿里云 / 腾讯云

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## License

MIT
