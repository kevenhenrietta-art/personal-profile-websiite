import { profileData } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_right,rgba(139,92,246,0.14),transparent_28%),#070B12]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-300 uppercase">
              AI Product Manager Portfolio
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-semibold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                闫
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                  Yan Zhaoxia
                </p>
                <h1 className="text-xl font-semibold text-white md:text-2xl">
                  {profileData.name}
                </h1>
              </div>
            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              {profileData.title}
            </h2>

            <p className="mt-6 max-w-4xl text-base leading-8 text-white/72 md:text-lg">
              {profileData.tagline}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/56 md:text-base">
              {profileData.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {profileData.quickFacts.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={profileData.buttons.primary.target}
                className="inline-flex items-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                {profileData.buttons.primary.label}
              </a>

              <a
                href="#contact"
                className="inline-flex items-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/8"
              >
                {profileData.buttons.secondary.label}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="mb-5 text-sm uppercase tracking-[0.24em] text-white/45">
              Quick Navigation
            </p>

            <div className="grid gap-3">
              {profileData.navItems.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className="group rounded-2xl border border-white/10 bg-[#0B1220]/70 px-4 py-4 transition hover:border-cyan-300/30 hover:bg-[#10192A]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/82">{item.label}</span>
                    <span className="text-cyan-300 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Contact
              </p>
              <div className="mt-3 space-y-2 text-sm text-white/72">
                <p>{profileData.contacts.phone}</p>
                <p>{profileData.contacts.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
