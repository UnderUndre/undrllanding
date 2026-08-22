import HeroUndreseller from "./components/hero-undreseller";
import LoomDemoSection from "./components/loom-demo-section";
import SprintPricing from "./components/sprint-pricing";
import OpsecProtocol from "./components/opsec-protocol";
import ComparisonMatrix from "./components/comparison-matrix";
import VibeCodingWarning from "./components/vibe-coding-warning";
import FaqSection from "./components/faq-section";
import CtaUndreseller from "./components/cta-undreseller";

export const undresellerProject = {
  slug: "undreseller",
  name: "Undreseller",
  domain: "undreseller.com",
  title: "Undreseller — Productized Engineering & Turnkey B2B Systems",
  description:
    "Production-Grade B2B MVPs & Workflows Shipped in 3–14 Days. Zero Budget Drag. Next.js 15, Supabase, n8n, AI. Protected by Upwork Direct Contracts Escrow.",
  Hero: HeroUndreseller,
  LoomDemo: LoomDemoSection,
  Pricing: SprintPricing,
  Opsec: OpsecProtocol,
  Comparison: ComparisonMatrix,
  VibeWarning: VibeCodingWarning,
  FAQ: FaqSection,
  CTA: CtaUndreseller,
};
