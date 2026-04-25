"use client";

import { ProjectItem } from "@/data/projects";

type Props = {
  project: ProjectItem;
  active?: boolean;
};

// 每个项目的重点词
const highlightKeywords: Record<string, string[]> = {
  "ai-health-report": [
    "检后健康管理产品设计与落地",
    "医疗知识图谱", "健康值量化", "个性化行动指南",
    "模型效果评估方案", "模型微调数据",
    "场景化模型优化",
    "健康值量化与异常指标结构化展示框架",
    "检后健康管理闭环",
    "bad case 反馈机制",
    "准确性 + 可执行性 + 商业承接",
  ],
  "ai-universal-service": [
    "AI 分流与人工兜底策略",
    "意图识别优化", "多轮对话状态管理", "全链路数据埋点",
    "AI 分流规则", "人工兜底策略",
    "上下文丢失",
    "bad case 分析",
    "合适边界内完成有效承接",
    "模型能力、流程设计和兜底机制",
  ],
  "home-testing-product": [
    "履约方产品经理",
    "产品规划、需求拆解、方案设计和项目统筹",
    "履约链路搭建",
    "全链路闭环",
    "推品提示与优惠券机制",
    "用户意图识别模型",
    "服务时效与交付标准",
    "前端转化与后端履约",
  ],
  "fulfillment-platform": [
    "流程抽象", "系统边界梳理",
    "标准履约流程",
    "运营后台、商户后台",
    "配置化能力",
    "服务模式抽象", "流程统一", "后台模块沉淀",
    "可复制能力",
    "稳定底座",
  ],
};

// 将文本中的重点词替换为高亮 span
function HighlightText({ text, keywords }: { text: string; keywords: string[] }) {
  if (!keywords.length) return <>{text}</>;

  // 按长度降序排，避免短词先匹配截断长词
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        keywords.includes(part) ? (
          <mark
            key={i}
            className="rounded-[3px] bg-cyan-300/15 px-0.5 text-cyan-200 not-italic"
            style={{ textDecoration: "none" }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SectionBlock({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "subtle" | "highlight";
}) {
  const bg = {
    default: "bg-white/[0.04]",
    subtle: "bg-white/[0.02]",
    highlight: "bg-cyan-400/[0.07]",
  }[variant];

  const tabBg = {
    default: "bg-white/[0.10]",
    subtle: "bg-white/[0.06]",
    highlight: "bg-cyan-400/[0.18]",
  }[variant];

  const tabColor = variant === "highlight" ? "text-cyan-200" : "text-slate-200/80";

  return (
    <div className="relative mt-3">
      {/* 标签 + 内容在同一卡片内，标签轻微外凸 */}
      <div className={`rounded-[12px] px-4 pt-3 pb-3.5 ${bg}`}>
        <div className={`inline-block -translate-x-6 rounded-[5px] px-2.5 py-0.5 mb-2 ${tabBg}`}>
          <span className={`text-[10px] font-medium tracking-[0.06em] whitespace-nowrap ${tabColor}`}>
            {title}
          </span>
        </div>
        <div className="text-sm leading-7 text-white/75">{children}</div>
      </div>
    </div>
  );
}

export default function ProjectDetailPanel({ project, active = false }: Props) {
  const keywords = highlightKeywords[project.id] ?? [];

  const H = ({ text }: { text: string }) => (
    <HighlightText text={text} keywords={keywords} />
  );

  return (
    <div className={[
      "relative rounded-[18px] border bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))] p-5 sm:p-6",
      active
        ? "border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.07),0_10px_28px_rgba(6,182,212,0.09)]"
        : "border-white/10",
    ].join(" ")}>
      {/* 顶부 渐变线（与卡片激活态一致） */}
      {active && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.07),transparent_30%)]" />

      <div className="relative">
        {/* 头部：标题 + 角色标签同行 */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
            {project.title}
          </h3>
          <span className="mt-0.5 shrink-0 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100/80">
            {project.role}
          </span>
        </div>

        <div className="mt-3 grid gap-1 ml-4">

          <SectionBlock title="项目背景">
            <p><H text={project.detail.background} /></p>
          </SectionBlock>

          <SectionBlock title="项目目标">
            <p><H text={project.detail.goal} /></p>
          </SectionBlock>

          <SectionBlock title="我的职责">
            <ul className="space-y-2">
              {project.detail.responsibility.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/60" />
                  <span><H text={item} /></span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title="方案设计">
            <ul className="space-y-2">
              {project.detail.solution.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/60" />
                  <span><H text={item} /></span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title="我的复盘" variant="subtle">
            <div className="space-y-3">
              <p className="text-[12px] font-medium text-cyan-300/60">
                AI / 平台能力发挥位置
              </p>
              <p className="text-sm leading-7 text-white/65">
                <H text={project.detail.capability} />
              </p>
              <p className="border-t border-white/8 pt-3">
                <H text={project.detail.review} />
              </p>
            </div>
          </SectionBlock>

        </div>
      </div>
    </div>
  );
}
