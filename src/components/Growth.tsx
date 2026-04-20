import { growthItems } from "@/data/growth";

export default function Growth() {
  return (
    <section id="growth" className="border-b border-white/10 bg-[#070D16]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Long-term Growth
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            长期积累
          </h3>
          <p className="mt-4 text-base leading-8 text-white/60">
            工作之外，我持续通过知识沉淀、内容输出、AI 工具实践和长期习惯建设，保持对产品、技术与个人成长的持续投入。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {growthItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
            >
              {item.image ? (
                <div className="border-b border-white/10 bg-[#0D1522]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-64 w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_right,rgba(139,92,246,0.10),transparent_30%),#0D1522]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center">
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
                      Practice
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h4 className="text-2xl font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm text-cyan-200">{item.subtitle}</p>

                <p className="mt-5 text-sm leading-7 text-white/68 md:text-base">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/74"
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
    </section>
  );
}
