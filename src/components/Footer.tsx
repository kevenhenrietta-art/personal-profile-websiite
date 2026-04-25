import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_24%),#060A10]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {profileData.name}. All rights reserved.</p>
          <p>Built for AI Product Manager Interview Portfolio</p>
        </div>
      </div>
    </footer>
  );
}
