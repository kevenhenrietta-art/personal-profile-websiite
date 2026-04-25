import { learningData } from "@/data/learning";

export default function Learning() {
  return (
    <section
      id="learning"
      className="relative border-b border-white/10 bg-[#08111D] px-5 sm:px-6 lg:px-10"
    >
      <div className="relative mx-auto max-w-7xl py-20">
        <div className="mb-12 flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:mb-14">
          <h3 className="shrink-0 text-3xl font-semibold text-white md:text-4xl">
            {learningData.sectionTitle}
          </h3>
          <p className="text-base leading-8 text-white/62 sm:leading-7">
            {learningData.sectionSubtitle}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7">
          <div className="rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.06),rgba(9,16,28,0.10))] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_0_36px_rgba(34,211,238,0.06)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-2">
                <h4 className="text-2xl font-semibold text-white">
                  {learningData.schoolBlock.title}
                </h4>
                <p className="text-sm text-cyan-200">
                  {learningData.schoolBlock.degree} · {learningData.schoolBlock.status}
                </p>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                2024 - 2026
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/64 md:text-base">
              {learningData.schoolBlock.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/72">
              {learningData.schoolBlock.highlight.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.06),rgba(9,16,28,0.10))] p-5 shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_0_36px_rgba(34,211,238,0.06)] md:p-7">
            <div className="divide-y divide-white/10">
              {learningData.courseCategories.map((category) => (
                <div
                  key={category.id}
                  className="py-4 first:pt-0 last:pb-0 md:py-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <h4 className="shrink-0 text-lg font-semibold text-white">
                      {category.title}
                    </h4>
                    {category.description ? (
                      <p className="text-sm leading-7 text-white/58">
                        {category.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.courses.map((course) => (
                      <span
                        key={course}
                        className="rounded-xl border border-white/12 bg-white/[0.02] px-3 py-1.5 text-xs leading-5 text-white/74 transition hover:border-cyan-300/25 hover:bg-cyan-300/5 hover:text-white/88"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:mb-10">
            <h3 className="shrink-0 text-3xl font-semibold text-white md:text-4xl">
              {learningData.practiceBlock.title}
            </h3>
            <p className="text-base leading-8 text-white/62 sm:leading-7 sm:whitespace-nowrap">
              {learningData.practiceBlock.description}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))] p-5 sm:p-6">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_40%)] opacity-80"
              aria-hidden
            />
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {learningData.practiceActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="group overflow-hidden rounded-[18px] border border-white/10 bg-[#0B1320]/90 transition hover:-translate-y-1 hover:border-cyan-400/20"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#0D1522]">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 inline-flex max-w-full truncate rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-cyan-200">
                      {activity.title}
                    </div>

                    <p className="mt-2 text-sm leading-7 text-white/58">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
