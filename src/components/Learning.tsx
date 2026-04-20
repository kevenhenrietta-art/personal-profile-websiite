import { learningData } from "@/data/learning";

export default function Learning() {
  return (
    <section id="learning" className="border-b border-white/10 bg-[#08111D]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Learning & Practice
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            {learningData.sectionTitle}
          </h3>
          <p className="mt-4 text-base leading-8 text-white/60">
            {learningData.sectionSubtitle}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                  School
                </p>
                <h4 className="mt-2 text-2xl font-semibold text-white">
                  {learningData.schoolBlock.title}
                </h4>
                <p className="mt-2 text-sm text-cyan-200">
                  {learningData.schoolBlock.degree} · {learningData.schoolBlock.status}
                </p>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                2024 - 2026
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/72 md:text-base">
              {learningData.schoolBlock.description}
            </p>

            <div className="mt-6 grid gap-3">
              {learningData.schoolBlock.highlight.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/74"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Course Modules
            </p>

            <div className="mt-6 space-y-6">
              {learningData.courseCategories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-3xl border border-white/8 bg-[#0B1420] p-5"
                >
                  <h4 className="text-lg font-semibold text-white">
                    {category.title}
                  </h4>
                  {category.description ? (
                    <p className="mt-2 text-sm leading-7 text-white/58">
                      {category.description}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.courses.map((course) => (
                      <span
                        key={course}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/74"
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

        <div className="mt-14">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
              Activities
            </p>
            <h4 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
              {learningData.practiceBlock.title}
            </h4>
            <p className="mt-4 text-base leading-8 text-white/60">
              {learningData.practiceBlock.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {learningData.practiceActivities.map((activity) => (
              <div
                key={activity.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/20"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#0D1522]">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-cyan-200">
                    {activity.category === "forum" && "行业论坛"}
                    {activity.category === "class" && "课堂学习"}
                    {activity.category === "practice" && "校园实践"}
                    {activity.category === "sharing" && "名人分享"}
                  </div>

                  <h5 className="text-lg font-semibold text-white">
                    {activity.title}
                  </h5>

                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
