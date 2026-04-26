"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

function scrollToIdWithRetry(id: string, retries = 20) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (retries <= 0) return;
  window.setTimeout(() => scrollToIdWithRetry(id, retries - 1), 75);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function smoothScrollToY(targetY: number, durationMs: number) {
  if (typeof window === "undefined") return;
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 8) return;

  const startTs = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - startTs) / durationMs);
    const eased = easeOutCubic(t);
    window.scrollTo(0, startY + delta * eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function ProjectSection() {
  // 移动端默认不展示详情；桌面端会在 useEffect 中补上默认选中
  const [activeId, setActiveId] = useState<string>("");
  const desktopDetailScrollRef = useRef<HTMLDivElement | null>(null);
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const desktopStickyOuterRef = useRef<HTMLDivElement | null>(null);
  const handleDesktopJumpTo = (sectionId: string) => {
    const container = desktopDetailScrollRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pendingMobileScrollTargetRef = useRef<string | null>(null);
  const pendingMobileScrollTimeoutRef = useRef<number | null>(null);

  const resetDetailScroll = () => {
    if (!desktopDetailScrollRef.current) return;
    desktopDetailScrollRef.current.scrollTop = 0;
    desktopDetailScrollRef.current.scrollTo({ top: 0, behavior: "auto" });
  };

  const activeProject = useMemo(() => {
    if (!activeId) return undefined;
    return projects.find((item) => item.id === activeId) ?? projects[0];
  }, [activeId]);

  const handleProjectSelect = (projectId: string) => {
    const nextActiveId = projectId === activeId ? "" : projectId;

    // 切换前先把“详情内容”滚动到顶部
    // - PC：展示该项目详情顶部
    // - 移动：避免切换过程出现中段停留
    resetDetailScroll();
    setActiveId(nextActiveId);

    // PC 端：默认不滚动页面；但若“详情卡片高度 > 项目卡片列表高度”，则页面平滑上移以容纳详情
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      if (!nextActiveId) return;
      window.requestAnimationFrame(() => {
        const listEl = desktopListRef.current;
        const detailContainer = desktopDetailScrollRef.current;
        if (!listEl || !detailContainer) return;

        const listHeight = listEl.getBoundingClientRect().height;
        // 用详情内容的实际高度（scrollHeight）判断是否“超出左侧列表”
        const detailHeight = detailContainer.scrollHeight;
        if (detailHeight > listHeight) {
          const anchor = document.getElementById("projects-content-top");
          if (!anchor) return;

          const prefersReducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const navbarOffset = 88; // 导航栏 + 视觉留白
          const y = Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - navbarOffset);

          if (prefersReducedMotion) {
            window.scrollTo(0, y);
          } else {
            const distance = Math.abs(window.scrollY - y);
            const duration = Math.min(520, Math.max(260, distance * 0.45));
            smoothScrollToY(y, duration);
          }
        }
      });
      return;
    }

    // 移动端：展开时在“动画完成后”定位到详情顶部（避免二次滚动造成闪动）；
    // 收起时立即定位回项目卡片顶部
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      if (pendingMobileScrollTimeoutRef.current) {
        window.clearTimeout(pendingMobileScrollTimeoutRef.current);
        pendingMobileScrollTimeoutRef.current = null;
      }

      if (!nextActiveId) {
        pendingMobileScrollTargetRef.current = null;
        window.requestAnimationFrame(() => scrollToIdWithRetry(`project-card-${projectId}`));
        return;
      }

      // 先记录目标，等详情 motion 动画完成时再滚动
      const targetId = `project-detail-${projectId}`;
      pendingMobileScrollTargetRef.current = targetId;

      // 兜底：万一动画回调没触发（极少），延迟后滚一次
      pendingMobileScrollTimeoutRef.current = window.setTimeout(() => {
        if (pendingMobileScrollTargetRef.current === targetId) {
          scrollToIdWithRetry(targetId, 10);
          pendingMobileScrollTargetRef.current = null;
        }
      }, 650);
    }
  };

  useEffect(() => {
    // 桌面端默认展示第一个项目详情；移动端不自动展开
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const ensureDesktopDefault = () => {
      if (!mq.matches) return;
      if (activeId) return;
      const firstId = projects[0]?.id;
      if (firstId) setActiveId(firstId);
    };

    ensureDesktopDefault();
    mq.addEventListener("change", ensureDesktopDefault);
    return () => mq.removeEventListener("change", ensureDesktopDefault);
  }, [activeId]);

  useLayoutEffect(() => {
    resetDetailScroll();
  }, [activeId]);

  return (
    <section
      id="projects"
      className="relative px-5 py-16 sm:px-6 lg:px-10 lg:py-20"
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

        <div id="projects-content-top" className="scroll-mt-24" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* 左侧：项目卡片列表 */}
          <div ref={desktopListRef} className="grid gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                {...fadeUp(0.1 + index * 0.06)}
                className="scroll-mt-24"
              >
                <ProjectCard
                  project={project}
                  active={Boolean(activeProject && project.id === activeProject.id)}
                  onClick={() => handleProjectSelect(project.id)}
                />

                {/* 移动端：详情面板直接插在“被点击卡片”之后 */}
                <div className="mt-4 lg:hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeProject && project.id === activeProject.id ? (
                      <motion.div
                        key={`mobile-detail-${activeProject.id}`}
                        id={`project-detail-${activeProject.id}`}
                        className="scroll-mt-24"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onAnimationComplete={() => {
                          const targetId = `project-detail-${activeProject.id}`;
                          if (pendingMobileScrollTargetRef.current !== targetId) return;
                          if (pendingMobileScrollTimeoutRef.current) {
                            window.clearTimeout(pendingMobileScrollTimeoutRef.current);
                            pendingMobileScrollTimeoutRef.current = null;
                          }
                          scrollToIdWithRetry(targetId, 10);
                          pendingMobileScrollTargetRef.current = null;
                        }}
                      >
                        <ProjectDetailPanel project={activeProject} active />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 右侧：sticky 详情面板，固定在视口内可内部滚动 */}
          <div
            className="hidden lg:block lg:sticky lg:top-20"
            style={{ height: "calc(100vh - 6rem)" }}
            ref={desktopStickyOuterRef}
          >
            <div
              ref={(node) => {
                desktopDetailScrollRef.current = node;
              }}
              className="h-full overflow-y-auto rounded-[24px] [scrollbar-width:none] [overflow-anchor:none] [&::-webkit-scrollbar]:hidden"
            >
              <AnimatePresence mode="wait">
                {activeProject ? (
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <ProjectDetailPanel project={activeProject} active onJumpTo={handleDesktopJumpTo} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* 移动端详情已内联到卡片后方；此处不再额外渲染 */}
        </div>
      </div>
    </section>
  );
}
