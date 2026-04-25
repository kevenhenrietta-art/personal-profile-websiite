"use client";

import { ProjectItem } from "@/data/projects";

type Props = {
  project: ProjectItem;
  active?: boolean;
  onClick?: () => void;
};

// 每个项目的顶部类型标签
const projectLabels: Record<string, string[]> = {
  "ai-health-report":      ["AI 提升闭环体验", "商业化创收"],
  "ai-universal-service":  ["AI 客服", "一键履约"],
  "home-testing-product":  ["AI 赋能", "创新服务"],
  "fulfillment-platform":  ["履约平台", "从 0 到 1 到 10 倍增长"],
};

// 收入增长节点（履约平台专用）
const revenueSteps = [
  { year: "原收入", value: "4000w" },
  { year: "23年",   value: "1.3亿" },
  { year: "24年",   value: "3.1亿" },
  { year: "25年",   value: "5.7亿" },
];

// 将 metric 文本中的数字/百分比/箭头部分高亮
function MetricText({ text }: { text: string }) {
  const parts = text.split(/([\d]+[%w亿万]?[\d]*%?|→|\d+\.\d+亿?|\d+w)/g);
  return (
    <>
      {parts.map((part, i) =>
        /[\d%→亿万w]/.test(part) && part.length > 0 ? (
          <span key={i} className="font-bold text-cyan-300">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function MetricDot({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-1.5">
      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/60" />
      <p className="text-[13px] leading-5 text-white/70">
        <MetricText text={text} />
      </p>
    </div>
  );
}

function MetricsBlock({ project }: { project: ProjectItem }) {
  const { id, metrics } = project;

  if (id === "ai-health-report") {
    return (
      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
        <div className="space-y-1">{metrics.slice(0, 3).map((m) => <MetricDot key={m} text={m} />)}</div>
        <div className="space-y-1">{metrics.slice(3).map((m) => <MetricDot key={m} text={m} />)}</div>
      </div>
    );
  }

  if (id === "ai-universal-service") {
    return (
      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
        <div className="space-y-1">{metrics.slice(3).map((m) => <MetricDot key={m} text={m} />)}</div>
        <div className="space-y-1">{metrics.slice(0, 3).map((m) => <MetricDot key={m} text={m} />)}</div>
      </div>
    );
  }

  if (id === "home-testing-product") {
    return (
      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
        <div className="space-y-1">{metrics.slice(1).map((m) => <MetricDot key={m} text={m} />)}</div>
        <div className="space-y-1"><MetricDot text={metrics[0]} /></div>
      </div>
    );
  }

  if (id === "fulfillment-platform") {
    return (
      <div className="mt-1.5 space-y-1.5">
        <p className="text-[11px] text-white/50">平台支持业务收入持续增长</p>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {revenueSteps.map((step, idx) => (
            <div key={step.year} className="flex items-baseline gap-1">
              <span className="text-[10px] text-white/35">{step.year}</span>
              <span className="text-[13px] font-bold text-cyan-300">{step.value}</span>
              {idx < revenueSteps.length - 1 && (
                <svg className="mx-0.5 h-2.5 w-2.5 text-cyan-300/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/35">24年获平安集团董事长特别奖一等奖</p>
      </div>
    );
  }

  return (
    <div className="mt-1.5 space-y-1">
      {metrics.map((m) => <MetricDot key={m} text={m} />)}
    </div>
  );
}

export default function ProjectCard({ project, active = false, onClick }: Props) {
  const labels = projectLabels[project.id] ?? [];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative w-full overflow-hidden rounded-[18px] border text-left transition-all duration-300",
        "bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))]",
        active
          ? "border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.07),0_10px_28px_rgba(6,182,212,0.09)]"
          : "border-white/10 hover:border-cyan-400/20 hover:shadow-[0_6px_20px_rgba(2,8,23,0.26)]",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_40%)] opacity-80" />
      {active && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      )}

      <div className="relative px-4 py-3.5">

        {/* 顶部：激活箭头 */}
        {active && (
          <div className="flex justify-end mb-1">
            <div className="flex items-center gap-1 text-cyan-300/80">
              <span className="hidden sm:flex items-center gap-0.5">
                {[0,1,2].map(i => (
                  <span key={i} className="h-px w-2 rounded-full bg-cyan-300/40" />
                ))}
              </span>
              <svg className="h-5 w-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        )}

        {/* 标题 + 角色标签同行 */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <span className="mt-0.5 shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/45 whitespace-nowrap">
            {project.role}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-5 text-white/52 line-clamp-2">
          {project.subtitle}
        </p>

        {/* 标签：亮点标签 + 技术标签合并一行 */}
        <div className="mt-2 flex flex-wrap gap-1">
          {labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300/90"
            >
              {label}
            </span>
          ))}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/42"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 关键结果 */}
        <div className="mt-2.5 border-t border-white/[0.07] pt-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/50">
            关键结果
          </p>
          <MetricsBlock project={project} />
        </div>

      </div>
    </button>
  );
}
