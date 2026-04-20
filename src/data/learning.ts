export type CourseCategory = {
  id: string;
  title: string;
  description?: string;
  courses: string[];
};

export type PracticeActivity = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "forum" | "class" | "practice" | "sharing";
};

export type LearningData = {
  sectionTitle: string;
  sectionSubtitle: string;
  schoolBlock: {
    title: string;
    degree: string;
    status: string;
    description: string;
    highlight: string[];
  };
  courseCategories: CourseCategory[];
  practiceBlock: {
    title: string;
    description: string;
  };
  practiceActivities: PracticeActivity[];
};

export const learningData: LearningData = {
  sectionTitle: "学习与实践",
  sectionSubtitle:
    "在工作之外，通过系统学习、课程训练与课余活动，持续补强管理方法、技术理解与复杂问题分析能力。",

  schoolBlock: {
    title: "上海交通大学 MEM 在读",
    degree: "工程管理硕士（非全日制）",
    status: "在读",
    description:
      "通过工程管理、定量分析、运营管理、风险决策及技术前沿课程，持续补强复杂项目管理、业务分析与技术理解能力，并将系统化学习反哺到 AI 产品与平台产品实践中。",
    highlight: [
      "系统化学习工程管理与运营方法",
      "持续补强定量分析与决策能力",
      "关注人工智能、物联网、移动互联网等技术前沿",
      "将课堂输入转化为产品判断与项目实践"
    ]
  },

  courseCategories: [
    {
      id: "management-method",
      title: "管理与方法类课程",
      description: "偏重复杂项目管理、业务分析与决策方法训练。",
      courses: [
        "工程管理导论",
        "定量分析：模型与方法",
        "工程管理实践案例分析",
        "运营管理",
        "风险管理与高效决策"
      ]
    },
    {
      id: "technology-frontier",
      title: "技术与前沿类课程",
      description: "帮助建立对技术趋势与 AI 应用场景的持续理解。",
      courses: [
        "人工智能",
        "物联网技术与发展趋势",
        "移动互联网前沿技术"
      ]
    }
  ],

  practiceBlock: {
    title: "课余活动与实践",
    description:
      "除了课程学习，我也持续通过论坛、学术活动、校园实践和行业分享拓展输入来源，让认知更新不局限于课堂，而是不断连接真实行业与产品场景。"
  },

  practiceActivities: [
    {
      id: "mem-forum",
      title: "上海交大 MEM 行业论坛",
      description:
        "通过行业论坛接触不同行业背景与实践案例，持续拓展对产业、管理与技术结合的理解，也帮助我建立更立体的产品判断视角。",
      image: "/images/learning/mem-forum.jpg",
      category: "forum"
    },
    {
      id: "class-learning",
      title: "课堂学习 / 班级研讨",
      description:
        "在系统课程学习之外，也持续参与课堂研讨与同学交流，强化复杂问题分析、跨背景协作与结构化表达能力。",
      image: "/images/learning/class-activity.jpg",
      category: "class"
    },
    {
      id: "campus-practice",
      title: "学术 / 校园活动参与",
      description:
        "通过校内活动和实践参与，持续训练表达、协作和现场应变能力，让学习不局限于课堂输入，也转化为真实参与和行动。",
      image: "/images/learning/campus-practice.jpg",
      category: "practice"
    },
    {
      id: "guest-sharing",
      title: "名人分享 / 企业家演讲",
      description:
        "通过参与企业家与行业嘉宾分享活动，持续获取对产品创新、组织发展与行业趋势的外部视角，保持对前沿变化的敏感度。",
      image: "/images/learning/guest-sharing.jpg",
      category: "sharing"
    }
  ]
};
