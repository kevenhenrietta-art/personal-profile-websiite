import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Learning from "@/components/Learning";
import Growth from "@/components/Growth";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070B12] text-white">
      <Hero />
      <Projects />
      <Career />
      <Learning />
      <Growth />
      <Footer />
    </main>
  );
}
