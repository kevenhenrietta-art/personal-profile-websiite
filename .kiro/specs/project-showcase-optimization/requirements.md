# Requirements Document

## Introduction

本需求文档针对个人求职网站的项目展示模块（第二屏）进行全面优化。当前模块包含左侧的 4 个项目卡片和右侧的项目详情面板，用户反馈"非常不好看"，需要提升视觉吸引力、信息层次、交互体验和专业度，以更好地展示求职者的项目能力和成果。

## Glossary

- **Project_Card**: 左侧展示的项目卡片组件，包含项目标题、副标题、角色、标签和关键结果
- **Detail_Panel**: 右侧展示的项目详情面板组件，显示当前选中项目的完整信息
- **Project_Section**: 整个项目展示模块的容器组件
- **Active_State**: 当前被选中查看的项目卡片状态
- **Viewport**: 用户设备的可视区域，包括移动端和桌面端
- **Visual_Hierarchy**: 视觉层次结构，通过大小、颜色、间距等建立信息的重要性层级
- **Interaction_Feedback**: 用户操作时的视觉或动效反馈
- **Responsive_Layout**: 响应式布局，根据不同屏幕尺寸自适应调整

## Requirements

### Requirement 1: 视觉吸引力提升

**User Story:** 作为求职者，我希望项目展示模块具有专业且现代的视觉设计，以便给招聘方留下良好的第一印象。

#### Acceptance Criteria

1. THE Project_Card SHALL 使用渐变背景、柔和阴影和边框效果增强视觉层次
2. THE Detail_Panel SHALL 采用卡片式设计，具有清晰的内容分区和视觉呼吸感
3. THE Project_Section SHALL 使用一致的配色方案，主色调为青色系（cyan），辅以深色背景
4. WHEN 用户滚动到项目模块时，THE Project_Card SHALL 依次以淡入动画出现
5. THE Active_State SHALL 通过高亮边框、顶部渐变线和标签徽章明确标识当前选中项目

### Requirement 2: 信息层次优化

**User Story:** 作为招聘方，我希望快速识别项目的核心信息和亮点，以便高效评估候选人能力。

#### Acceptance Criteria

1. THE Project_Card SHALL 按照"角色 → 标题 → 副标题 → 标签 → 关键结果"的层次结构组织信息
2. THE Detail_Panel SHALL 将项目信息分为"背景与目标"、"职责与方案"、"能力发挥"、"核心成果"、"复盘总结"四个模块
3. THE Project_Card SHALL 使用不同字号（3xl 标题、lg 副标题、sm 标签）建立视觉层次
4. THE Detail_Panel SHALL 使用卡片容器区分不同信息模块，每个模块具有独立的背景和边框
5. THE 关键结果 SHALL 使用圆点列表和高亮文本颜色突出显示
6. THE 核心成果 SHALL 使用网格布局和独立卡片展示，每项成果具有青色背景高亮
7. THE Detail_Panel SHALL NOT 包含"关键产品判断"字段，保持项目详情结构简洁

### Requirement 3: 交互体验增强

**User Story:** 作为用户，我希望项目切换流畅自然，操作反馈清晰，以便获得良好的浏览体验。

#### Acceptance Criteria

1. WHEN 用户点击 Project_Card 时，THE Project_Card SHALL 在 300ms 内切换到 Active_State
2. WHEN 用户点击 Project_Card 时，THE Detail_Panel SHALL 以淡入淡出动画（400ms）切换内容
3. WHEN 用户悬停在非激活的 Project_Card 上时，THE Project_Card SHALL 显示边框高亮和阴影加深效果
4. THE Project_Card SHALL 使用 cursor-pointer 指示可点击性
5. WHEN 项目内容切换时，THE Detail_Panel SHALL 保持平滑的过渡动画，避免内容跳动
6. THE 动画效果 SHALL 使用缓动函数 [0.22, 1, 0.36, 1] 实现自然的加速和减速

### Requirement 4: 移动端适配

**User Story:** 作为移动端用户，我希望在小屏幕上也能清晰浏览项目信息，以便随时随地查看候选人作品。

#### Acceptance Criteria

1. WHEN Viewport 宽度小于 1280px 时，THE Project_Section SHALL 将布局从左右分栏切换为上下堆叠
2. WHEN Viewport 宽度小于 768px 时，THE Project_Card SHALL 从 2 列网格切换为单列布局
3. WHEN Viewport 宽度小于 640px 时，THE Project_Card SHALL 调整内边距从 p-7 到 p-6
4. WHEN Viewport 宽度小于 640px 时，THE 标题字号 SHALL 从 3xl 调整为适配小屏的尺寸
5. THE Detail_Panel SHALL 在移动端保持可读性，内边距和字号根据屏幕尺寸自适应调整
6. THE 核心成果网格 SHALL 在移动端从 2 列切换为单列布局

### Requirement 5: 内容可读性提升

**User Story:** 作为阅读者，我希望文本内容清晰易读，排版舒适，以便快速理解项目详情。

#### Acceptance Criteria

1. THE Project_Card 标题 SHALL 使用 font-semibold 和 tracking-[-0.02em] 提升可读性
2. THE Project_Card 副标题 SHALL 使用 text-lg 和 leading-8 确保行高舒适
3. THE Detail_Panel 正文 SHALL 使用 text-base 和 leading-8 保持阅读舒适度
4. THE 标签文本 SHALL 使用 text-sm 和适当的内边距（px-3.5 py-1.5）确保可点击区域
5. THE 列表项 SHALL 使用圆点标记和 3 单位间距（gap-3）提升扫描性
6. THE 文本颜色 SHALL 使用白色透明度变体（text-white/78、text-white/62）确保在深色背景上的对比度

### Requirement 6: 性能优化

**User Story:** 作为用户，我希望页面加载和交互响应迅速，以便获得流畅的浏览体验。

#### Acceptance Criteria

1. THE Project_Card 动画 SHALL 使用 CSS transform 和 opacity 属性以利用 GPU 加速
2. THE Detail_Panel 切换 SHALL 使用 AnimatePresence 的 mode="wait" 避免内容重叠
3. THE 组件 SHALL 使用 useMemo 缓存 activeProject 计算结果，避免不必要的重渲染
4. THE 渐变背景 SHALL 使用 CSS 渐变而非图片，减少资源加载
5. WHEN 用户滚动到项目模块时，THE 动画 SHALL 使用 viewport={{ once: true }} 仅触发一次
6. THE 组件 SHALL 避免在渲染路径中进行复杂计算或数据转换

### Requirement 7: 视觉一致性

**User Story:** 作为设计师，我希望项目模块与整站设计风格保持一致，以便呈现统一的品牌形象。

#### Acceptance Criteria

1. THE Project_Section SHALL 使用与全站一致的青色系主题色（cyan-300、cyan-400）
2. THE 圆角尺寸 SHALL 遵循设计系统规范（rounded-[28px]、rounded-[30px]、rounded-[24px]）
3. THE 间距系统 SHALL 使用 Tailwind 标准间距单位（4、5、6、7、8 等）
4. THE 字体粗细 SHALL 使用 font-medium 和 font-semibold 保持层次一致
5. THE 边框样式 SHALL 使用白色透明度变体（border-white/10、border-white/8）
6. THE 阴影效果 SHALL 使用自定义 shadow 值保持视觉深度一致

### Requirement 8: 可访问性支持

**User Story:** 作为使用辅助技术的用户，我希望能够通过键盘和屏幕阅读器访问项目信息，以便无障碍浏览内容。

#### Acceptance Criteria

1. THE Project_Card SHALL 使用语义化的 button 元素确保键盘可访问性
2. THE Project_Card SHALL 具有 type="button" 属性明确按钮类型
3. THE 标题元素 SHALL 使用正确的语义标签（h2、h3、h4）建立文档大纲
4. THE Active_State 标签 SHALL 提供视觉和文本双重指示（"当前查看"）
5. THE 颜色对比度 SHALL 满足 WCAG AA 标准（文本与背景对比度至少 4.5:1）
6. THE 交互元素 SHALL 具有足够的点击区域（至少 44x44 像素）

### Requirement 9: 数据展示优化

**User Story:** 作为招聘方，我希望项目的关键数据和成果清晰突出，以便快速评估项目价值。

#### Acceptance Criteria

1. THE 关键结果 SHALL 在 Project_Card 底部独立区域展示，使用圆点列表格式
2. THE 核心成果 SHALL 在 Detail_Panel 中使用网格布局和高亮卡片展示
3. THE 数据指标 SHALL 使用青色系高亮（text-cyan-100/88、bg-cyan-400/[0.05]）
4. THE 标签 SHALL 使用圆角胶囊样式（rounded-full）和半透明背景
5. THE 项目角色 SHALL 在 Project_Card 顶部和 Detail_Panel 标题区域双重展示
6. THE 复盘总结 SHALL 使用独立的 subtle 样式卡片区分于其他内容模块
7. THE Detail_Panel SHALL 展示以下字段：background、goal、responsibility、solution、capability、result、review（不包含 judgment 字段）

### Requirement 10: 扩展性设计

**User Story:** 作为开发者，我希望组件结构清晰可维护，以便未来添加新功能或调整样式。

#### Acceptance Criteria

1. THE Project_Card SHALL 接受 project、active、onClick 三个清晰定义的 props
2. THE Detail_Panel SHALL 接受 project 单一 prop，保持组件职责单一
3. THE SectionBlock SHALL 作为可复用的内容容器组件，支持 title、children、subtle 参数
4. THE 样式类名 SHALL 使用数组拼接方式，便于条件样式的添加和移除
5. THE 组件 SHALL 使用 TypeScript 类型定义确保类型安全
6. THE 数据结构 SHALL 与组件解耦，通过 @/data/projects 统一管理

### Requirement 11: 动画性能

**User Story:** 作为用户，我希望动画效果流畅不卡顿，以便获得高质量的视觉体验。

#### Acceptance Criteria

1. THE 入场动画 SHALL 使用 stagger 效果，每个卡片延迟 60ms（index * 0.06）
2. THE 动画持续时间 SHALL 控制在 400-550ms 之间，避免过长或过短
3. THE 动画 SHALL 使用 framer-motion 库的优化实现，利用 GPU 加速
4. THE 切换动画 SHALL 使用 AnimatePresence 确保退出动画完成后再渲染新内容
5. WHEN 设备性能较低时，THE 浏览器 SHALL 自动降级动画效果保持流畅性
6. THE 动画 SHALL 避免触发 layout reflow，仅使用 transform 和 opacity 属性

### Requirement 12: 错误处理

**User Story:** 作为开发者，我希望组件能够优雅处理异常情况，以便提升系统稳定性。

#### Acceptance Criteria

1. WHEN projects 数组为空时，THE Project_Section SHALL 返回 null 不渲染任何内容
2. WHEN activeProject 未找到时，THE Project_Section SHALL 回退到 projects[0] 作为默认值
3. WHEN activeProject 为 undefined 时，THE Project_Section SHALL 返回 null 避免渲染错误
4. THE 组件 SHALL 使用可选链操作符（?.）安全访问嵌套属性
5. THE 数组遍历 SHALL 使用唯一的 key 值（project.id）避免渲染问题
6. THE 组件 SHALL 在开发环境提供清晰的错误提示信息

