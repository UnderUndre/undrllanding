import HeroUnderundre from "./components/hero-underundre";
import LoomDemoSection from "./components/loom-demo-section";
import SprintPricing from "./components/sprint-pricing";
import OpsecProtocol from "./components/opsec-protocol";
import ComparisonMatrix from "./components/comparison-matrix";
import VibeCodingWarning from "./components/vibe-coding-warning";
import FaqSection from "./components/faq-section";
import CtaUnderundre from "./components/cta-underundre";
import TaglineRevealSection from "./components/tagline-reveal";

// ForkServiceLine stays available for v2 re-enable once the undreseller
// engine passes release verification; it is intentionally not exported here.
export const underundreProject = {
  slug: "underundre",
  name: "UnderUndre",
  domain: "underundre.com",
  title: "UnderUndre — Productized Engineering & Workaround TCO Audit",
  description:
    "Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01.",
  Hero: HeroUnderundre,
  TaglineReveal: TaglineRevealSection,
  LoomDemo: LoomDemoSection,
  Pricing: SprintPricing,
  Opsec: OpsecProtocol,
  Comparison: ComparisonMatrix,
  VibeWarning: VibeCodingWarning,
  FAQ: FaqSection,
  CTA: CtaUnderundre,
};
