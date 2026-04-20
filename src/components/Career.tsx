import { careerItems } from "@/data/career";

export default function Career() {
  return (
    <section id="career" className="border-b border-white/10 bg-[#070D16]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Career Path
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            职业经历
          </h3>
          <p className="mt-4 text-base leading-8 text-white/60">
            从运营到复杂系统产品，再到 AI 场景落地与平台化建设，逐步形成完整的产品能力结构。
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/40 via-white/10 to-transparent md:block" />

          <div className="space-y-8">
            {careerItems.map((item, index) => (
              <div
                key={item.id}
                className="relative grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[72px_1fr] md:p-8"
              >
                <div className="relative hidden md:flex">
                  <div className="relative z-10 mt-1 h-8 w-8 rounded-full border border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_25px_rgba(34,211,238,0.25)]" />
                </div>

                <div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                        Experience {String(index + 1).padStart(2, "0")}
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold text-white">
                        {item.company}
                      </h4>
                      <p className="mt-2 text-base text-cyan-200">{item.role}</p>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
                      {item.period}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/10 bg-[#0D1522] px-3 py-1 text-xs text-white/68"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-7 text-white/72 md:text-base">
                    {item.summary}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/74"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
