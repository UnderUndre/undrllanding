import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadAllPrompts } from "@/lib/schemas/prompt-loaders";
import PromptsContent from "./prompts-content";

// Spec 009 FR-001/FR-004: public SpecKit prompt library. Bureau program —
// brand-gated (mirror of 008). Zero gated forms: the prompts ARE the pitch.

export const metadata: Metadata = {
  title: "Free Prompts — Run a Mini-Discovery Yourself",
  alternates: { canonical: "/prompts" },
};

export default function PromptsPage() {
  const config = getActiveProjectConfig();
  if (!config.hasPrompts || config.slug !== "underundre") {
    notFound();
  }
  const prompts = loadAllPrompts(config.slug);
  if (prompts.length === 0) {
    notFound();
  }
  // Serializable props only — node:fs stays server-side.
  return <PromptsContent prompts={prompts} />;
}
