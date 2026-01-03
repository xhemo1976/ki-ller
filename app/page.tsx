import { HeroSection } from "@/components/hero-section";
import { ServiceGrid } from "@/components/service-grid";
import { TechMarquee } from "@/components/tech-marquee";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-tech-grey selection:bg-neon-blue selection:text-black">
      <HeroSection />
      <ServiceGrid />
      <TechMarquee />
      <Footer />
    </main>
  );
}
