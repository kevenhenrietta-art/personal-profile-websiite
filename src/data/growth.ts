export type GrowthItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  tags: string[];
};

export const growthItems: GrowthItem[] = [
  {
    id: "knowledge-base",
    title: "个人知识库",
    subtitle: "把学习、项目和方法论沉淀为可复用资产",
    description:
      "我习惯将项目复盘、AI 产品案例、平台产品方法、行业观察与学习资料沉淀到个人知识库中，帮助自己持续积累认知、复用思考框架，并加快新场景判断与方案设计。除了工作内容，也会把 MEM 课程、论坛活动、案例分析和项目经验总结纳入统一管理。",
    image: "/images/growth/knowledge-base.png",
    tags: ["知识沉淀", "方法论", "项目复盘", "持续学习"]
  },
  {
    id: "wechat-official-account",
    title: "微信公众号：产品经理升级打怪之路",
    subtitle: "持续输出 AI 与产品认知",
    description:
      "通过“产品经理升级打怪之路”持续输出产品思考、成长复盘与方法总结，希望把零散经验沉淀为可复用的表达，也训练自己更结构化地观察问题与表达观点。当前内容重点聚焦 AI 核心概念、底层技术拆解与产品理解。",
    image: "/images/growth/wechat-official-account.png",
    tags: ["内容输出", "AI 认知", "产品思考", "结构化表达"]
  },
  {
    id: "vibe-coding",
    title: "小程序开发 / Vibe Coding 实践",
    subtitle: "用 AI 工具提升从想法到实现的效率",
    description:
      "除了产品设计工作外，我也在持续尝试用 Cursor、Trae 等 AI 工具完成小程序和网页的快速搭建，希望提升从想法到原型、从需求到表达的实现效率，并让产品表达更接近真实可体验的形态。",
    tags: ["Cursor", "Trae", "小程序开发", "快速原型"]
  },
  {
    id: "fitness",
    title: "健身",
    subtitle: "长期主义与稳定节奏",
    description:
      "长期保持健身习惯，对我来说不仅是体能训练，也是一种稳定节奏、长期投入和自我管理方式。这种习惯也影响着我对工作和成长的看法：持续积累，慢慢变强。",
    tags: ["长期主义", "自我管理", "执行力", "稳定节奏"]
  }
];
