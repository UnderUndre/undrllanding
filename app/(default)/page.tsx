import { underundreProject } from "@/projects/underundre/config";
import { getActiveProjectConfig } from "@/lib/project-config";

export function generateMetadata() {
  const config = getActiveProjectConfig();
  
  return {
    title: config.title,
    description: config.description,
    icons: {
      icon: config.iconUrl,
      shortcut: config.iconUrl,
      apple: config.iconUrl,
    },
  };
}

export default function Home() {
  const { Hero, TaglineReveal, LoomDemo, Pricing, Opsec, Comparison, VibeWarning, FAQ, ForkServiceLine, CTA } = underundreProject;

  return (
    <main className="bg-[#080808] text-purple-50 min-h-screen transition-colors">
      <Hero />
      <TaglineReveal />
      <LoomDemo />
      <Pricing />
      <ForkServiceLine />
      <Opsec />
      <Comparison />
      <VibeWarning />
      <FAQ />
      <CTA />
    </main>
  );
}
