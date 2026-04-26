export type GrowthItem = {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
  image?: string;
  tags: string[];
};

export const growthItems: GrowthItem[] = [
  {
    id: "knowledge-base",
    title: "个人知识库",
    subtitle: "把学习、项目和方法论沉淀为可复用资产",
    details: [
      "持续沉淀：AI 产品案例、项目复盘与方法框架，形成可复用的判断资产。",
      "知识体系：将分散的信息输入结构化，支持新场景下的快速分析与方案设计。",
      "长期积累：提升复杂业务抽象、方案比较、产品决策效率。"
    ],
    image: "/images/growth/knowledge-base.png",
    tags: ["知识沉淀", "项目复盘", "持续学习"]
  },
  {
    id: "wechat-official-account",
    title: "微信公众号",
    subtitle: "持续输出 AI 与产品认知",
    details: [
      "持续输出：AI 产品认知与方法思考，训练对概念、技术与场景的结构化表达。",
      "强化理解：通过写作强化对 AI 核心能力、应用边界与产品价值的理解。",
      "输出闭环：让输入、思考与输出形成闭环，沉淀更清晰的产品判断体系。"
    ],
    image: "/images/learning/wechat-official-account.png",
    tags: ["产品思考", "结构化表达"]
  },
  {
    id: "vibe-coding",
    title: "VibeCoding 实践",
    subtitle: "用 AI 工具提升从想法到实现的效率",
    details: [
      "工具探索：产品原型搭建，缩短从想法到可体验方案的路径。",
      "快速落地：通过实践，实现验证交互、信息架构与需求表达。",
      "产品验证：强化技术理解与实现判断，快速验证产品是否有效。"
    ],
    image: "/images/growth/vibe-coding.png",
    tags: ["工具探索", "项目开发", "实践验证"]
  },
  {
    id: "fitness",
    title: "健身跑步",
    subtitle: "长期主义与稳定节奏",
    details: [
      "长期执行：通过长期训练保持稳定节奏与持续投入，形成面向长期目标的执行力。",
      "结果导向：在规律训练中强化自我管理、抗波动能力与结果导向意识。",
      "清醒稳定：让我在复杂项目推进中保持更稳定的状态与耐力。"
    ],
    image: "/images/growth/fitness.png",
    tags: ["长期主义", "自我管理", "执行力"]
  }
];
