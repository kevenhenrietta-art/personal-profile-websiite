import { growthItems } from "@/data/growth";

export default function Growth() {
  return (
    <section
      id="growth"
      className="relative border-b border-white/10 bg-[#070D16] px-5 sm:px-6 lg:px-10"
    >
      <div className="relative mx-auto max-w-7xl py-20">
        <div className="mb-8 flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:mb-10">
          <h3 className="shrink-0 text-3xl font-semibold text-white md:text-4xl">
            长期积累
          </h3>
          <p className="text-base leading-8 text-white/62 sm:leading-7">
            工作之外，我持续通过知识沉淀、内容输出、AI 工具实践和长期习惯建设，保持对产品、技术与个人成长的持续投入。
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))] p-5 sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_40%)] opacity-80"
            aria-hidden
          />
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {growthItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-[18px] border border-white/10 bg-[#0B1320]/90 transition hover:-translate-y-1 hover:border-cyan-400/20"
              >
                {item.image ? (
                  <div className="aspect-[4/3] overflow-hidden bg-[#0D1522]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0D1522]">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
                        Practice
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <h4 className="text-lg font-semibold leading-7 text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-cyan-200/80">{item.subtitle}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-white/58">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/60" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-nowrap gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs leading-5 text-white/74"
                      >
                        {tag}
                      </span>
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
