import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_24%),#060A10]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              Contact
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              {profileData.name}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/62">
              {profileData.title}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              联系方式
            </p>

            <div className="mt-5 space-y-3 text-sm md:text-base">
              <a
                href={`mailto:${profileData.contacts.email}`}
                className="block text-white/76 transition hover:text-cyan-300"
              >
                {profileData.contacts.email}
              </a>
              <a
                href={`tel:${profileData.contacts.phone}`}
                className="block text-white/76 transition hover:text-cyan-300"
              >
                {profileData.contacts.phone}
              </a>
            </div>

            <a
              href={profileData.resumeUrl}
              className="mt-6 inline-flex rounded-xl bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              下载 PDF 简历
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {profileData.name}. All rights reserved.</p>
          <p>Built for AI Product Manager Interview Portfolio</p>
        </div>
      </div>
    </footer>
  );
}
