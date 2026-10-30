import type { ProjectConfig } from "@/lib/project-config";

// Brand configuration for the UnderUndre landing (spec 003, T-004).
// Navigation/footer copy is bilingual via labelKey → lib/i18n.ts,
// ported 1:1 from the previously hardcoded header/footer branches.

export const underundreBrand: ProjectConfig = {
  slug: "underundre",
  name: "UnderUndre",
  domain: "underundre.com",
  title: "UnderUndre — Productized Engineering & Workaround TCO Audit",
  description:
    "Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01.",
  iconUrl: "/projects/underundre/favicon.ico",
  heroBadge:
    "3X SALESFORCE CERTIFIED ENGINEER (ADMIN I & II · PLATFORM DEV) | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED",
  theme: {
    primaryColor: "#b45500",
    secondaryColor: "#4e007a",
  },
  navigation: {
    items: [
      { labelKey: "nav_audit", labelFallback: "TCO Audit", href: "#audit" },
      { labelKey: "nav_stack", labelFallback: "FOSS Stack", href: "#stack" },
      { labelKey: "nav_pricing", labelFallback: "Pricing", href: "#pricing" },
      {
        labelKey: "nav_comparison",
        labelFallback: "Comparison",
        href: "#comparison",
      },
      { labelKey: "nav_faq", labelFallback: "FAQ", href: "#faq" },
    ],
    ctaButton: {
      labelKey: "nav_cta_audit",
      labelFallback: "Audit for $350",
      href: "#contact",
    },
  },
  footer: {
    taglineKey: "footer_uu_tagline",
    taglineFallback:
      "Productized Engineering Bureau — Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems shipped with zero seat fees.",
    columns: [
      {
        titleKey: "footer_uu_products",
        titleFallback: "Product Ladder",
        links: [
          {
            labelKey: "footer_uu_product0",
            labelFallback: "Product 0: TCO Audit ($350 pilot)",
            href: "#audit",
          },
          {
            labelKey: "footer_uu_product_a",
            labelFallback: "Sprint A: FOSS Office ($3.5k)",
            href: "#pricing",
          },
          {
            labelKey: "footer_uu_custom",
            labelFallback: "Custom Dev — via brief",
            href: "#contact",
          },
        ],
      },
      {
        titleKey: "footer_uu_escrow",
        titleFallback: "Payments & Escrow",
        links: [
          {
            labelKey: "footer_uu_escrow_upwork",
            labelFallback: "Upwork Escrow (5% fee)",
            badge: "highlight",
          },
          {
            labelKey: "footer_uu_ip",
            labelFallback: "Split-IP: 100% rights on custom work",
          },
          { labelKey: "footer_uu_nace", labelFallback: "EU NACE 62.01 Standard" },
        ],
      },
    ],
    showLegalLinks: true,
    showManifestLink: true,
  },
  legal: {
    // NOTE: verify the real mailbox before production (spec 003 T-008).
    contactEmail: "contact@underundre.com",
    entityName: "UnderUndre",
    jurisdiction: "EU NACE 62.01",
    retentionMonths: 12,
    escrowProvider: "Upwork Direct Contracts (5% escrow fee paid by contractor; client: 0% via US ACH or standard card acquiring 3–5%)",
    warrantyDays: 7,
  },
};
