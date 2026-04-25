# Design Document: 项目展示模块优化

## Overview

### Purpose

本设计文档针对个人求职网站的项目展示模块进行全面优化设计。该模块是整个网站的核心展示区域,用于向招聘方展示求职者的代表性项目、核心能力和业务成果。当前模块存在视觉吸引力不足、信息层次不清晰、交互体验欠佳等问题,需要通过系统化的设计提升专业度和用户体验。

### Scope

本设计涵盖以下内容:

- **ProjectSection 容器组件**: 整个项目展示模块的布局和状态管理
- **ProjectCard 卡片组件**: 左侧项目卡片的视觉设计和交互逻辑
- **ProjectDetailPanel 详情面板**: 右侧项目详情的内容结构和展示方式
- **视觉系统**: 配色方案、圆角规范、间距系统、字体层次
- **交互系统**: 切换动画、悬停效果、入场动画、响应式适配
- **数据结构**: ProjectItem 类型定义和状态管理方案
- **性能优化**: GPU 加速、缓存策略、动画优化

### Goals

1. **提升视觉吸引力**: 通过渐变背景、柔和阴影、边框效果和青色系主题色,打造专业且现代的视觉体验
2. **优化信息层次**: 建立清晰的视觉层次结构,让招聘方能够快速识别项目核心信息和亮点
3. **增强交互体验**: 实现流畅的项目切换动画、清晰的操作反馈和自然的悬停效果
4. **保证移动端体验**: 通过响应式布局确保在不同设备上都能获得良好的浏览体验
5. **提升可读性**: 优化字号、行高、颜色对比度,确保内容清晰易读
6. **优化性能**: 利用 GPU 加速、缓存策略和动画优化,确保流畅的用户体验

### Non-Goals

- 不涉及项目数据的后台管理功能
- 不包含项目的增删改查操作
- 不实现项目的搜索和筛选功能
- 不添加项目的评论或互动功能
- 不涉及其他页面模块的设计

## Architecture

### Component Hierarchy

```
ProjectSection (容器组件)
├── Section Header (标题区域)
│   ├── Label (小标题)
│   ├── Title (主标题)
│   └── Description (描述文本)
├── Grid Layout (网格布局)
│   ├── Left Column (左侧列)
│   │   └── ProjectCard[] (项目卡片列表)
│   │       ├── Role Badge (角色标签)
│   │       ├── Active Indicator (激活指示器)
│   │       ├── Title (项目标题)
│   │       ├── Subtitle (项目副标题)
│   │       ├── Tags (标签列表)
│   │       └── Metrics (关键结果)
│   └── Right Column (右侧列)
│       └── ProjectDetailPanel (详情面板)
│           ├── Header (头部区域)
│           │   ├── Active Label (激活标签)
│           │   ├── Role Badge (角色徽章)
│           │   └── Title (项目标题)
│           └── Content Sections (内容区域)
│               ├── SectionBlock: 项目背景
│               ├── SectionBlock: 项目目标
│               ├── SectionBlock: 我的职责
│               ├── SectionBlock: 方案设计
│               ├── SectionBlock: AI/平台能力发挥位置
│               ├── SectionBlock: 核心成果
│               └── SectionBlock: 我的复盘
```

### State Management

**组件状态**:
- `activeId: string` - 当前激活的项目 ID
- `activeProject: ProjectItem` - 当前激活的项目对象(通过 useMemo 计算)

**状态流转**:
1. 初始化时,`activeId` 设置为 `projects[0]?.id`
2. 用户点击 ProjectCard 时,调用 `setActiveId(project.id)`
3. `activeProject` 通过 `useMemo` 根据 `activeId` 从 `projects` 数组中查找
4. ProjectCard 根据 `project.id === activeId` 判断是否为激活状态
5. ProjectDetailPanel 接收 `activeProject` 并渲染详情内容

**数据流向**:
```
projects.ts (数据源)
    ↓
ProjectSection (状态管理)
    ↓
├── ProjectCard (接收 active 状态)
└── ProjectDetailPanel (接收 activeProject)
```

### Technology Stack

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **状态管理**: React Hooks (useState, useMemo)
- **类型系统**: TypeScript 严格模式

## Components and Interfaces

### ProjectSection Component

**职责**:
- 管理项目列表的激活状态
- 协调 ProjectCard 和 ProjectDetailPanel 的交互
- 提供整体布局和背景装饰

**Props**: 无(直接从 `@/data/projects` 导入数据)

**State**:
```typescript
const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? "");
const activeProject = useMemo(
  () => projects.find((item) => item.id === activeId) ?? projects[0],
  [activeId]
);
```

**Layout**:
- 外层容器: `section` 标签,相对定位,带内边距
- 背景装饰: 径向渐变叠加,青色系点缀
- 网格布局: `xl:grid-cols-[0.92fr_1.08fr]` (桌面端左右分栏)
- 左侧: `grid gap-5 md:grid-cols-2 xl:grid-cols-1` (响应式网格)
- 右侧: AnimatePresence 包裹的详情面板

### ProjectCard Component

**职责**:
- 展示项目的概览信息
- 提供点击交互和视觉反馈
- 显示激活状态的视觉指示

**Props**:
```typescript
type Props = {
  project: ProjectItem;
  active?: boolean;
  onClick?: () => void;
};
```

**Visual States**:
- **Default**: 深色背景,白色半透明边框,径向渐变装饰
- **Hover**: 边框高亮(cyan-400/20),阴影加深
- **Active**: 青色边框(cyan-400/38),顶部渐变线,发光阴影,"当前查看"徽章

**Content Structure**:
1. 顶部: 角色标签 + 激活徽章(条件渲染)
2. 标题: 3xl 字号,font-semibold
3. 副标题: lg 字号,leading-8
4. 标签列表: 圆角胶囊样式,flex-wrap
5. 关键结果: 独立区域,圆点列表,青色高亮

**Animation**:
- 入场动画: `initial={{ opacity: 0, y: 18 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger 延迟: `delay: index * 0.06`
- 持续时间: 550ms
- 缓动函数: `[0.22, 1, 0.36, 1]`

### ProjectDetailPanel Component

**职责**:
- 展示项目的完整详细信息
- 提供结构化的内容分区
- 突出显示核心成果和复盘总结

**Props**:
```typescript
type Props = {
  project: ProjectItem;
};
```

**Content Sections**:
1. **Header**: Active Project 标签 + 角色徽章 + 项目标题
2. **项目背景与目标**: 2 列网格布局(lg 断点)
3. **我的职责**: 圆点列表
4. **方案设计**: 圆点列表
5. **AI/平台能力发挥位置**: Subtle 样式卡片
6. **核心成果**: 2 列网格(sm 断点),青色高亮卡片
7. **我的复盘**: Subtle 样式卡片

**SectionBlock Component**:
```typescript
type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
  subtle?: boolean;
};
```
- **Default**: `border-white/10`, `bg-white/[0.035]`
- **Subtle**: `border-white/8`, `bg-white/[0.025]`

**Animation**:
- 切换动画: `initial={{ opacity: 0, y: 22 }}` → `animate={{ opacity: 1, y: 0 }}`
- 退出动画: `exit={{ opacity: 0, y: 14 }}`
- 持续时间: 400ms
- AnimatePresence mode: "wait"

## Data Models

### ProjectItem Type

```typescript
type ProjectItem = {
  id: string;                    // 唯一标识符
  title: string;                 // 项目标题
  subtitle: string;              // 项目副标题(一句话定义)
  role: string;                  // 项目角色
  tags: string[];                // 关键词标签
  metrics: string[];             // 关键结果数据
  coverTheme: string;            // 封面主题(用于未来扩展)
  detail: {
    background: string;          // 项目背景
    goal: string;                // 项目目标
    responsibility: string[];    // 我的职责(列表)
    solution: string[];          // 方案设计(列表)
    capability: string;          // AI/平台能力发挥位置
    result: string[];            // 核心成果(列表)
    review: string;              // 我的复盘
  };
};
```

**注意**: 
- `detail.judgment` 字段已从数据结构中移除,不在详情面板中展示
- 所有数据来源于 `@/data/projects.ts`,不在组件中硬编码

### Visual Design Tokens

**配色方案**:
```typescript
const colors = {
  // 背景色
  pageBg: 'rgba(2,6,23,0)',
  cardBg: 'linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))',
  panelBg: 'linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.95))',
  
  // 主题色
  primary: 'cyan-300',
  primaryLight: 'cyan-100',
  primaryDark: 'cyan-400',
  
  // 边框色
  borderDefault: 'white/10',
  borderSubtle: 'white/8',
  borderActive: 'cyan-400/38',
  borderHover: 'cyan-400/20',
  
  // 文本色
  textPrimary: 'white',
  textSecondary: 'white/78',
  textTertiary: 'white/62',
  textMuted: 'white/48',
  textHighlight: 'cyan-100/88',
};
```

**圆角规范**:
```typescript
const borderRadius = {
  card: 'rounded-[28px]',
  panel: 'rounded-[30px]',
  section: 'rounded-[24px]',
  result: 'rounded-[18px]',
  badge: 'rounded-full',
};
```

**间距系统**:
```typescript
const spacing = {
  sectionPadding: 'px-5 py-16 sm:px-6 lg:px-10 lg:py-24',
  cardPadding: 'p-6 sm:p-7',
  panelPadding: 'p-6 sm:p-7 lg:p-8',
  sectionPadding: 'p-5 sm:p-6',
  gap: {
    cards: 'gap-5',
    grid: 'gap-6',
    sections: 'gap-4',
    tags: 'gap-2.5',
    list: 'gap-3',
  },
};
```

**字体层次**:
```typescript
const typography = {
  hero: 'text-4xl sm:text-[44px] font-semibold leading-[1.15] tracking-[-0.025em]',
  h2: 'text-3xl font-semibold tracking-[-0.02em]',
  h3: 'text-3xl font-semibold leading-[1.2] tracking-[-0.02em]',
  subtitle: 'text-lg leading-8',
  body: 'text-base leading-8',
  small: 'text-sm',
  label: 'text-xs font-medium uppercase tracking-[0.28em]',
};
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // 移动端
  md: '768px',   // 平板端
  lg: '1024px',  // 小桌面
  xl: '1280px',  // 大桌面
};
```

**布局变化**:
- `< xl`: 左右分栏 → 上下堆叠
- `< md`: 左侧 2 列网格 → 单列
- `< sm`: 内边距和字号缩小

## Error Handling

### Component-Level Error Handling

**ProjectSection**:
```typescript
// 处理空数据
if (!activeProject) return null;

// 安全的初始化
const [activeId, setActiveId] = useState(projects[0]?.id ?? "");

// 安全的查找
const activeProject = useMemo(
  () => projects.find((item) => item.id === activeId) ?? projects[0],
  [activeId]
);
```

**ProjectCard**:
```typescript
// 默认值处理
active = false  // 默认非激活状态
onClick?: () => void  // 可选的点击处理器

// 安全的数组遍历
{project.tags.map((tag) => (
  <span key={tag}>...</span>
))}
```

**ProjectDetailPanel**:
```typescript
// 安全的属性访问
{project.detail.responsibility.map((item) => (
  <li key={item}>...</li>
))}

// 条件渲染
{project.detail.result.length > 0 && (
  <div>...</div>
)}
```

### Data Validation

**类型检查**:
- 所有组件使用 TypeScript 严格模式
- Props 类型明确定义
- 数据结构与 ProjectItem 类型匹配

**运行时检查**:
```typescript
// 检查数组是否为空
if (projects.length === 0) {
  console.warn('No projects data available');
  return null;
}

// 检查必需字段
if (!project.id || !project.title) {
  console.error('Invalid project data:', project);
  return null;
}
```

### User Feedback

**加载状态**:
- 使用 viewport={{ once: true }} 确保动画只触发一次
- 避免在数据加载时显示空白内容

**错误状态**:
- 数据缺失时优雅降级,不显示错误信息
- 使用默认值确保组件不崩溃

**交互反馈**:
- 点击时立即更新 activeId 状态
- 动画提供视觉反馈,确认操作已执行
- Hover 状态提供即时的交互提示

## Testing Strategy

### Unit Testing

本项目主要涉及 UI 组件和视觉呈现,不适合使用 property-based testing。测试策略将聚焦于:

**组件渲染测试**:
- 验证 ProjectSection 正确渲染项目列表
- 验证 ProjectCard 显示正确的项目信息
- 验证 ProjectDetailPanel 展示完整的详情内容
- 验证激活状态的视觉指示正确显示

**交互测试**:
- 验证点击 ProjectCard 切换激活状态
- 验证 activeId 状态正确更新
- 验证 activeProject 根据 activeId 正确计算
- 验证动画在状态切换时正确触发

**响应式测试**:
- 验证不同断点下的布局变化
- 验证移动端单列布局正确渲染
- 验证桌面端左右分栏正确渲染

**边界情况测试**:
- 验证空数据时组件返回 null
- 验证 activeProject 未找到时回退到 projects[0]
- 验证数组遍历使用唯一 key 值

### Integration Testing

**数据集成测试**:
- 验证从 `@/data/projects` 正确导入数据
- 验证数据结构符合 ProjectItem 类型定义
- 验证所有必需字段存在且格式正确

**动画集成测试**:
- 验证 Framer Motion 动画正确执行
- 验证 AnimatePresence 正确处理进入/退出动画
- 验证 viewport 触发器正确工作

### Visual Regression Testing

**快照测试**:
- 对 ProjectCard 的不同状态(default, hover, active)进行快照
- 对 ProjectDetailPanel 的内容布局进行快照
- 对不同断点下的响应式布局进行快照

**样式验证**:
- 验证配色方案符合设计规范
- 验证圆角尺寸符合设计系统
- 验证间距和字体层次正确应用

### Accessibility Testing

**键盘导航测试**:
- 验证 Tab 键可以聚焦到 ProjectCard
- 验证 Enter/Space 键可以激活项目
- 验证焦点指示器清晰可见

**屏幕阅读器测试**:
- 验证语义化标签正确使用(button, h2, h3, h4)
- 验证激活状态有文本指示("当前查看")
- 验证列表结构正确标记

**颜色对比度测试**:
- 验证文本与背景对比度满足 WCAG AA 标准(至少 4.5:1)
- 验证交互元素的点击区域至少 44x44 像素

### Performance Testing

**渲染性能测试**:
- 验证 useMemo 正确缓存 activeProject 计算
- 验证动画使用 GPU 加速(transform, opacity)
- 验证 AnimatePresence mode="wait" 避免内容重叠

**动画性能测试**:
- 验证动画帧率保持在 60fps
- 验证动画不触发 layout reflow
- 验证 viewport={{ once: true }} 避免重复触发

**加载性能测试**:
- 验证渐变背景使用 CSS 而非图片
- 验证组件避免复杂计算
- 验证首次渲染时间在可接受范围内

