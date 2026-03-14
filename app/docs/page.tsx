import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DocsClient } from "@/components/docs/DocsClient";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

export const metadata = {
  title: "Docs | datasciencekibaatein",
  description: "In-depth tutorials on Python, Machine Learning, Gen AI, and SQL — all in one place.",
};

export default function DocsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleCanvas />
      <Navbar />
      <DocsClient />
      <Footer />
    </main>
  );
}