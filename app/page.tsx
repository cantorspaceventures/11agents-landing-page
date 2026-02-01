import Navbar from "@/components/Navbar";
import SovereignHero from "@/components/SovereignHero";
import ManifestoScroll from "@/components/ManifestoScroll";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />
      <SovereignHero />
      <ManifestoScroll />
      <BentoGrid />
      <Footer />
    </main>
  );
}
