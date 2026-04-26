"use client";

import { motion } from "framer-motion";
import { careerItems } from "@/data/career";

export default function Career() {
  // 数据按时间正序（最早在上）展示成长路径
  const items = [...careerItems].reverse();

  return (
    <section id="career" className="relative border-b border-white/10 bg-[#070D16]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">

        {/* 标题 */}
        <div className="mb-14 flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <h3 className="shrink-0 text-3xl font-semibold text-white md:text-4xl">职业经历</h3>
          <p className="text-base leading-8 text-white/55 sm:leading-7">
            从运营到复杂系统产品，再到 AI 场景落地与平台化建设，逐步形成完整的产品能力结构。
          </p>
        </div>

        {/* 时间线 */}
        <div className="relative">
          {/* 主轴线 */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-300/50 via-cyan-300/20 to-transparent md:left-[11px]" />

          <div className="space-y-0">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* 节点 */}
                  <div className="absolute left-0 top-1.5 md:left-1">
                    {isLast ? (
                      /* 最新经历：发光节点 */
                      <div className="h-4 w-4 rounded-full border-2 border-cyan-300 bg-cyan-300/20 shadow-[0_0_12px_rgba(34,211,238,0.5)] md:h-5 md:w-5" />
                    ) : (
                      /* 历史经历：普通节点 */
                      <div className="h-3.5 w-3.5 rounded-full border border-white/30 bg-white/10 md:h-4 md:w-4" />
                    )}
                  </div>

                  {/* 内容区 */}
                  <div className={`pb-10 ${isLast ? "" : ""}`}>
                    {/* 角色 + 时间 + 公司 */}
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-sm font-medium text-cyan-300/80">{item.role}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[11px] font-medium tracking-[0.12em] text-white/35">
                        {item.period}
                      </span>
                      <span className="h-px w-4 bg-white/20" />
                      <h4 className="text-lg font-semibold text-white">{item.company}</h4>
                    </div>

                    {/* 关键词标签 */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white/50"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* 阶段简述 */}
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {item.summary}
                    </p>

                    {/* 代表成果 */}
                    <div className="mt-3 space-y-1.5">
                      {item.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/50" />
                          <p className="text-sm leading-7 text-white/72">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
