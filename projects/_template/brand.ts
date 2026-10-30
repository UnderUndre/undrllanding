import type { ProjectConfig } from "@/lib/project-config";

// CANONICAL STARTER TEMPLATE (spec 003 FR-010, T-018).
// `pnpm project:create` copies this folder and substitutes the placeholders.
// Values marked [PLACEHOLDER] MUST be replaced before production.

export const templateBrand: ProjectConfig = {
  slug: "_template",
  name: "[PLACEHOLDER] Brand Name",
  domain: "[PLACEHOLDER] example.com",
  title: "[PLACEHOLDER] Brand Name — One-line value proposition",
  description:
    "[PLACEHOLDER] Short landing description shown in the hero, metadata and privacy policy context.",
  iconUrl: "/projects/_template/favicon.ico",
  heroBadge: "[PLACEHOLDER] TRUST BADGE LINE",
  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#030712",
  },
  navigation: {
    items: [
      { labelFallback: "Pricing", href: "#pricing" },
      { labelFallback: "FAQ", href: "#faq" },
    ],
    ctaButton: {
      labelFallback: "Contact us",
      href: "#contact",
    },
  },
  footer: {
    taglineFallback: "[PLACEHOLDER] One-line brand mission statement.",
    columns: [
      {
        titleFallback: "Company",
        links: [
          { labelFallback: "Pricing", href: "#pricing" },
          { labelFallback: "FAQ", href: "#faq" },
        ],
      },
    ],
    showLegalLinks: true,
    showManifestLink: false, // set true only after adding data/manifest.json
  },
  legal: {
    contactEmail: "[PLACEHOLDER] privacy@example.com",
    entityName: "[PLACEHOLDER] Legal Entity Name",
    jurisdiction: "[PLACEHOLDER] e.g. EU NACE 62.01",
    retentionMonths: 12,
    // Replace escrow/warranty with YOUR commercial terms before production:
    escrowProvider: "[PLACEHOLDER] escrow arrangement",
    warrantyDays: 7,
  },
};
