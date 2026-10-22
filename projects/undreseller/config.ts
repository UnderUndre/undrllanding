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
  name: "UnderUndre",
  domain: "underundre.com",
  title: "UnderUndre — Sovereign Engineering Bureau & Turnkey B2B Systems",
  description:
    "Production-Grade B2B MVPs & Sovereign Systems Shipped in 3–14 Days. Next.js 15, PostgreSQL, Twenty CRM, Trigger.dev v3, Inngest. Escrow-protected via Upwork Direct Contracts (5%) & DocuSeal.",
  Hero: HeroUndreseller,
  LoomDemo: LoomDemoSection,
  Pricing: SprintPricing,
  Opsec: OpsecProtocol,
  Comparison: ComparisonMatrix,
  VibeWarning: VibeCodingWarning,
  FAQ: FaqSection,
  CTA: CtaUndreseller,
};
