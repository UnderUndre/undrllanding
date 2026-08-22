import { undresellerProject } from "@/projects/undreseller/config";
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
  const { Hero, LoomDemo, Pricing, Opsec, Comparison, VibeWarning, FAQ, CTA } = undresellerProject;

  return (
    <main className="bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <Hero />
      <LoomDemo />
      <Pricing />
      <Opsec />
      <Comparison />
      <VibeWarning />
      <FAQ />
      <CTA />
    </main>
  );
}
