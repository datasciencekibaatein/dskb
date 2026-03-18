// ✅ Server component by default in App Router
// Only leaf components that need interactivity are marked "use client"
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { TutorialsSection } from "@/components/sections/TutorialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { LiveClassesSection } from "@/components/sections/LiveClassesSection";


export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient animated particle layer — fixed, behind everything */}
      <ParticleCanvas />

      <Navbar />

      <HeroSection />
      <StatsSection />
      <AboutSection />
      <LiveClassesSection />
      <CoursesSection />
      <TutorialsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
