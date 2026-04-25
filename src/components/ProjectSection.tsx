"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailPanel from "./ProjectDetailPanel";

const fadeUp = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export default function ProjectSection() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");
  const desktopDetailScrollRef = useRef<HTMLDivElement | null>(null);

  const resetDetailScroll = () => {
    if (!desktopDetailScrollRef.current) return;
    desktopDetailScrollRef.current.scrollTop = 0;
    desktopDetailScrollRef.current.scrollTo({ top: 0, behavior: "auto" });
  };

  const activeProject = useMemo(
    () => projects.find((item) => item.id === activeId) ?? projects[0],
    [activeId]
  );

  const handleProjectSelect = (projectId: string) => {
    if (projectId === activeId) return;
    // 切换前先重置一次，避免切换过程出现中段停留
    resetDetailScroll();
    setActiveId(projectId);
  };

  useLayoutEffect(() => {
    resetDetailScroll();
  }, [activeId]);

  if (!activeProject) return null;

  return (
    <section
      id="projects"
      className="relative px-5 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      {/* 背景装饰 — 不用 overflow-hidden，改用 pointer-events-none 绝对定位 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_20%),linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.24),rgba(2,6,23,0))]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
          {...fadeUp(0.05)}
        >
          <h2 className="shrink-0 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            代表项目
          </h2>
          <p className="text-base leading-8 text-white/62 sm:leading-7">
            以 4 个核心项目集中展示 AI 场景落地能力、平台能力、复杂业务抽象能力和结果导向。
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* 左侧：项目卡片列表 */}
          <div className="grid gap-5">
            {projects.map((project, index) => (
              <motion.div key={project.id} {...fadeUp(0.1 + index * 0.06)}>
                <ProjectCard
                  project={project}
                  active={project.id === activeProject.id}
                  onClick={() => handleProjectSelect(project.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* 右侧：sticky 详情面板，固定在视口内可内部滚动 */}
          <div
            className="hidden lg:block lg:sticky lg:top-20"
            style={{ height: "calc(100vh - 6rem)" }}
          >
            <div
              ref={desktopDetailScrollRef}
              className="h-full overflow-y-auto rounded-[24px] [scrollbar-width:none] [overflow-anchor:none] [&::-webkit-scrollbar]:hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <ProjectDetailPanel project={activeProject} active />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 移动端：正常流式展示 */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectDetailPanel project={activeProject} active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
