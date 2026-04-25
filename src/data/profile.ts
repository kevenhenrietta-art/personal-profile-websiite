export type ProfileData = {
  name: string;
  title: string;
  tagline: string;
  description: string;
  navItems: { label: string; target: string }[];
  contacts: {
    phone: string;
    email: string;
  };
  resumeUrl: string;
  quickFacts: string[];
  buttons: {
    primary: {
      label: string;
      target: string;
      type: "anchor" | "file";
    };
    secondary: {
      label: string;
      target: string;
      type: "anchor" | "contact";
    };
  };
};

export const profileData: ProfileData = {
  name: "闫朝霞的个人主页",
  title: "兼具平台能力、业务增长与大模型场景落地能力的 AI 产品经理",
  tagline:
    "8 年互联网产品经验，聚焦医疗健康、消费医疗与平台化建设，主导多个 AI 产品和复杂业务系统从 0 到 1 到多落地，持续推动产品落地、效率提升与商业收入增长。",
  description:
    "具备复杂业务抽象、模型协同、跨团队推进与结果闭环能力，关注 AI 能力在真实业务场景中的产品化落地与长期价值。",
  navItems: [
    { label: "代表项目", target: "projects" },
    { label: "职业经历", target: "career" },
    { label: "学习与实践", target: "learning" },
    { label: "长期积累", target: "growth" }
  ],
  contacts: {
    phone: "15026510174",
    email: "15026510174@163.com"
  },
  resumeUrl: "/files/resume.pdf",
  quickFacts: [
    "8 年互联网产品经验",
    "医疗健康 / 消费医疗",
    "AI 产品落地",
    "平台化能力建设",
    "复杂业务系统",
    "Vibe Coding 实践"
  ],
  buttons: {
    primary: {
      label: "下载 PDF 简历",
      target: "/files/resume.pdf",
      type: "file"
    },
    secondary: {
      label: "获取联系方式",
      target: "contact",
      type: "contact"
    }
  }
};
