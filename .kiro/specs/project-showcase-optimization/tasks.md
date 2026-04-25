# Implementation Plan: 项目展示模块优化

## Overview

本实现计划将项目展示模块优化分为数据结构更新、组件视觉优化、交互动画实现和响应式适配四个主要阶段。每个阶段都包含具体的编码任务,确保从数据层到视图层的完整优化。所有任务都基于 TypeScript + React + Next.js 技术栈,使用 Tailwind CSS 进行样式开发,使用 Framer Motion 实现动画效果。

## Tasks

- [ ] 1. 更新数据结构和类型定义
  - [x] 1.1 从 ProjectItem 类型中移除 judgment 字段
    - 修改 `src/data/projects.ts` 中的 `ProjectItem` 类型定义
    - 从 `detail` 对象中删除 `judgment?: string` 字段
    - _Requirements: 2.7_
  
  - [x] 1.2 更新所有项目数据,移除 judgment 字段
    - 从 `projects` 数组中的每个项目对象中删除 `detail.judgment` 字段
    - 确保数据结构与类型定义一致
    - _Requirements: 2.7_
  
  - [ ] 1.3 更新 ProjectDetailPanel 组件的类型定义
    - 修改 `src/components/ProjectDetailPanel.tsx` 中的本地 `ProjectItem` 类型
    - 从 `detail` 对象中删除 `judgment?: string` 字段
    - 确保组件类型与数据源类型一致
    - _Requirements: 2.7_

- [ ] 2. 优化 ProjectCard 组件视觉样式
  - [ ] 2.1 更新卡片背景和边框样式
    - 保持现有的渐变背景 `linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))`
    - 更新默认边框为 `border-white/10`
    - 更新 hover 边框为 `border-cyan-400/20`
    - 更新 active 边框为 `border-cyan-400/38`
    - 添加 hover 阴影效果 `shadow-[0_18px_44px_rgba(2,8,23,0.32)]`
    - 添加 active 阴影效果 `shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_18px_48px_rgba(8,145,178,0.12)]`
    - _Requirements: 1.1, 1.3, 7.2, 7.5, 7.6_
  
  - [ ] 2.2 优化卡片内容层次和间距
    - 调整角色标签样式为 `text-sm font-medium tracking-[0.08em] text-white/45`
    - 调整标题样式为 `text-3xl font-semibold leading-[1.2] tracking-[-0.02em]`
    - 调整副标题样式为 `text-lg leading-8 text-white/74`
    - 优化标签列表间距为 `gap-2.5`
    - 优化关键结果区域的边框和内边距
    - _Requirements: 2.1, 2.3, 5.1, 5.2, 5.5, 7.3, 7.4_
  
  - [ ] 2.3 优化激活状态视觉指示
    - 确保顶部渐变线使用 `bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent`
    - 确保"当前查看"徽章使用 `border-cyan-400/22 bg-cyan-400/10 text-cyan-200`
    - 验证激活状态的视觉层次清晰可辨
    - _Requirements: 1.5, 8.4_

- [ ] 3. 优化 ProjectDetailPanel 组件
  - [ ] 3.1 移除 judgment 字段的展示逻辑
    - 从组件中删除所有与 `project.detail.judgment` 相关的渲染代码
    - 确保不再显示"关键产品判断"模块
    - _Requirements: 2.7, 9.7_
  
  - [ ] 3.2 优化详情面板整体布局和样式
    - 确保面板使用 `rounded-[30px]` 圆角
    - 确保背景渐变为 `linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.95))`
    - 确保阴影效果为 `shadow-[0_24px_70px_rgba(2,8,23,0.32)]`
    - 优化内边距为 `p-6 sm:p-7 lg:p-8`
    - _Requirements: 1.2, 7.2, 7.6_
  
  - [ ] 3.3 优化 SectionBlock 组件样式
    - 确保默认样式使用 `border-white/10 bg-white/[0.035]`
    - 确保 subtle 样式使用 `border-white/8 bg-white/[0.025]`
    - 确保圆角为 `rounded-[24px]`
    - 优化内边距为 `p-5 sm:p-6`
    - 优化标题样式为 `text-sm font-medium tracking-[0.12em] text-white/48`
    - _Requirements: 1.2, 2.4, 7.2, 7.5_
  
  - [ ] 3.4 优化核心成果模块的网格展示
    - 确保使用 `grid gap-3 sm:grid-cols-2` 实现响应式网格
    - 确保每个成果卡片使用 `rounded-[18px]`
    - 确保成果卡片样式为 `border-cyan-400/12 bg-cyan-400/[0.05]`
    - 确保文本样式为 `text-sm leading-7 text-cyan-50/92`
    - _Requirements: 2.6, 4.6, 9.3, 9.6_
  
  - [ ] 3.5 优化内容模块的响应式布局
    - 确保"项目背景与目标"使用 `lg:grid-cols-2` 实现桌面端双列
    - 确保所有模块在移动端正确堆叠
    - 验证间距系统在不同断点下的一致性
    - _Requirements: 2.2, 4.5_

- [ ] 4. 实现交互动画效果
  - [ ] 4.1 实现 ProjectCard 入场动画
    - 在 ProjectSection 中为每个 ProjectCard 添加 Framer Motion 动画
    - 设置 `initial={{ opacity: 0, y: 18 }}`
    - 设置 `whileInView={{ opacity: 1, y: 0 }}`
    - 设置 `viewport={{ once: true, amount: 0.2 }}`
    - 实现 stagger 效果,每个卡片延迟 `index * 0.06` 秒
    - 设置动画持续时间为 550ms,缓动函数为 `[0.22, 1, 0.36, 1]`
    - _Requirements: 1.4, 3.6, 6.5, 11.1, 11.2_
  
  - [ ] 4.2 实现 ProjectDetailPanel 切换动画
    - 使用 AnimatePresence 包裹 ProjectDetailPanel
    - 设置 `mode="wait"` 确保退出动画完成后再渲染新内容
    - 设置入场动画 `initial={{ opacity: 0, y: 22 }}` → `animate={{ opacity: 1, y: 0 }}`
    - 设置退出动画 `exit={{ opacity: 0, y: 14 }}`
    - 设置动画持续时间为 400ms,缓动函数为 `[0.22, 1, 0.36, 1]`
    - _Requirements: 3.2, 3.5, 6.2, 6.4, 11.2, 11.4_
  
  - [ ] 4.3 优化 ProjectCard 悬停和激活状态过渡
    - 确保所有状态变化使用 `transition-all duration-300`
    - 验证 hover 状态的边框和阴影过渡流畅
    - 验证 active 状态的视觉反馈清晰
    - _Requirements: 3.3, 3.4_

- [ ] 5. 优化 ProjectSection 容器组件
  - [ ] 5.1 优化整体布局和间距
    - 确保外层容器使用 `px-5 py-16 sm:px-6 lg:px-10 lg:py-24`
    - 确保网格布局使用 `xl:grid-cols-[0.92fr_1.08fr]`
    - 确保左侧卡片列表使用 `grid gap-5 md:grid-cols-2 xl:grid-cols-1`
    - 确保整体间距为 `gap-6`
    - _Requirements: 4.1, 4.2, 7.3_
  
  - [ ] 5.2 优化背景装饰效果
    - 确保背景使用径向渐变 `radial-gradient(circle_at_top_right,rgba(34,211,238,0.06),transparent_22%)`
    - 确保叠加线性渐变 `linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.28),rgba(2,6,23,0))`
    - 验证背景装饰不影响内容可读性
    - _Requirements: 1.3, 7.1_
  
  - [ ] 5.3 验证状态管理逻辑
    - 确保 `activeId` 初始化为 `projects[0]?.id ?? ""`
    - 确保 `activeProject` 使用 useMemo 缓存计算结果
    - 确保点击 ProjectCard 正确更新 activeId
    - 确保空数据时组件返回 null
    - _Requirements: 6.3, 12.1, 12.2, 12.3_

- [ ] 6. 验证响应式布局
  - [ ] 6.1 测试桌面端布局 (≥1280px)
    - 验证左右分栏布局正确显示
    - 验证左侧卡片单列排列
    - 验证右侧详情面板宽度合适
    - _Requirements: 4.1_
  
  - [ ] 6.2 测试平板端布局 (768px-1279px)
    - 验证左右分栏切换为上下堆叠
    - 验证左侧卡片 2 列网格正确显示
    - 验证内边距和间距适配
    - _Requirements: 4.1, 4.2_
  
  - [ ] 6.3 测试移动端布局 (<768px)
    - 验证左侧卡片切换为单列
    - 验证内边距从 p-7 调整为 p-6
    - 验证字号和间距适配小屏幕
    - 验证核心成果网格切换为单列
    - _Requirements: 4.2, 4.3, 4.4, 4.6_

- [ ] 7. 验证可访问性和性能
  - [ ] 7.1 验证语义化标签和键盘导航
    - 确保 ProjectCard 使用 `<button type="button">` 元素
    - 确保标题使用正确的语义标签 (h2, h3, h4)
    - 测试 Tab 键可以聚焦到所有 ProjectCard
    - 测试 Enter/Space 键可以激活项目
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ] 7.2 验证颜色对比度和可读性
    - 使用浏览器开发工具检查文本与背景对比度
    - 确保所有文本对比度满足 WCAG AA 标准 (≥4.5:1)
    - 验证交互元素的点击区域至少 44x44 像素
    - _Requirements: 5.6, 8.5, 8.6_
  
  - [ ] 7.3 验证动画性能
    - 使用浏览器性能工具检查动画帧率
    - 确保动画使用 GPU 加速 (transform, opacity)
    - 确保动画不触发 layout reflow
    - 验证 viewport={{ once: true }} 避免重复触发
    - _Requirements: 6.1, 6.5, 11.3, 11.5, 11.6_

- [ ] 8. 最终验证和测试
  - [ ] 8.1 跨浏览器测试
    - 在 Chrome、Firefox、Safari 中测试所有功能
    - 验证渐变背景和阴影效果在不同浏览器中的一致性
    - 验证动画效果在不同浏览器中流畅运行
    - _Requirements: 1.1, 1.2, 3.1, 3.2_
  
  - [ ] 8.2 端到端功能测试
    - 测试点击每个 ProjectCard 切换详情面板
    - 验证激活状态的视觉指示正确显示
    - 验证所有项目数据正确展示
    - 验证 judgment 字段已完全移除
    - _Requirements: 2.7, 3.1, 9.7_
  
  - [ ] 8.3 视觉回归测试
    - 对比设计稿验证配色方案 (青色系主题)
    - 验证圆角规范 (28px, 30px, 24px, 18px)
    - 验证间距系统符合设计规范
    - 验证字体层次清晰合理
    - _Requirements: 1.3, 7.1, 7.2, 7.3, 7.4_

- [ ] 9. Checkpoint - 确保所有测试通过
  - 确保所有测试通过,如有问题请向用户提问。

## Notes

- 所有任务都基于 TypeScript + React + Next.js 技术栈
- 使用 Tailwind CSS 进行样式开发,遵循现有的设计系统
- 使用 Framer Motion 实现所有动画效果
- 每个任务都明确引用了对应的需求编号,确保可追溯性
- 重点关注视觉优化、交互体验和响应式适配
- 数据结构更新是第一步,确保类型安全
- 动画性能优化使用 GPU 加速属性 (transform, opacity)
- 所有组件保持类型安全,使用 TypeScript 严格模式
