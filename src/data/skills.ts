export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

export const skills: SkillCategory[] = [
  {
    id: "product",
    title: "产品能力",
    skills: [
      { name: "产品规划", level: 90 },
      { name: "需求分析", level: 95 },
      { name: "用户研究", level: 85 },
      { name: "数据分析", level: 80 },
      { name: "项目管理", level: 85 }
    ]
  },
  {
    id: "ai",
    title: "AI 能力",
    skills: [
      { name: "AI 场景落地", level: 90 },
      { name: "大模型应用", level: 85 },
      { name: "prompt 工程", level: 80 },
      { name: "AI 产品设计", level: 90 },
      { name: "模型评估", level: 75 }
    ]
  },
  {
    id: "platform",
    title: "平台能力",
    skills: [
      { name: "平台架构设计", level: 85 },
      { name: "流程抽象", level: 90 },
      { name: "标准化建设", level: 85 },
      { name: "API 设计", level: 80 },
      { name: "系统集成", level: 85 }
    ]
  }
];
