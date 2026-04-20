"use client";

import { useState } from "react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? "");

  const activeProject = projects.find((item) => item.id === activeId) ?? projects[0];

  return (
    <section id="projects" className="border-b border-white/10 bg-[#08101A]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Representative Projects
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            代表项目
          </h3>
          <p className="mt-4 text-base leading-8 text-white/60">
            以 4 个核心项目集中展示 AI 场景落地能力、平台能力、复杂业务抽象能力和结果导向。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {projects.map((project) => {
              const active = project.id === activeId;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    active
                      ? "border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {project.role}
                  </p>
                  <h4 className="mt-3 text-xl font-semibold text-white">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {project.subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/68"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-2">
                    {project.metrics.slice(0, 3).map((metric) => (
                      <div
                        key={metric}
                        className="text-sm font-medium text-cyan-300/90"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
                  Active Project
                </p>
                <h4 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  {activeProject.title}
                </h4>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                {activeProject.role}
              </span>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  项目背景
                </h5>
                <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.background}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  项目目标
                </h5>
                <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.goal}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  我的职责
                </h5>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.responsibility.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  关键产品判断
                </h5>
                <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.judgment}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  方案设计
                </h5>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.solution.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  AI / 平台能力发挥位置
                </h5>
                <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.capability}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  核心成果
                </h5>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {activeProject.detail.result.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-cyan-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold tracking-[0.18em] text-white/55 uppercase">
                  我的复盘
                </h5>
                <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">
                  {activeProject.detail.review}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
