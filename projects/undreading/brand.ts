import type { ProjectConfig } from "@/lib/project-config";

// Brand config for projects/undreading (FR-011 pilot brand).
// Sourced from undreading-business-plan.md v2.5/2.6.

export const undreadingBrand: ProjectConfig = {
  slug: "undreading",
  name: "Undreading",
  domain: "undreading.com",
  title: "Undreading — Сантехника Бытия | Open Sovereign Engineering Platform",
  description:
    "Открытая международная издательская платформа и база знаний суверенной инженерии. Монография «Сантехника бытия» (RU/EN/UK) и ZTA Security Architecture Kit.",
  iconUrl: "/projects/undreading/icon.svg",
  schemaType: "Book",
  bookAuthor: "Undre",
  faviconUrl: "/projects/undreading/icon-48.png",
  appleIconUrl: "/projects/undreading/apple-icon-180.png",
  heroBadge: "PRIX PASCAL 2026 NOMINEE | OPEN SOURCE ZTA ARCHITECTURE | TRILINGUAL RU / EN / UK",
  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#030712",
  },
  supportedLocales: ["ru", "en", "uk"],
  navigation: {
    items: [
      { labelFallback: "Monograph", href: "https://undreading.com" },
      { labelFallback: "Pricing & Editions", href: "#pricing" },
      { labelFallback: "FAQ", href: "#faq" },
    ],
    ctaButton: {
      labelFallback: "Read Online (Free)",
      href: "https://undreading.com",
    },
  },
  footer: {
    taglineFallback: "Open Sovereign Engineering Publishing Platform & ZTA Architecture Knowledge Base.",
    columns: [
      {
        titleFallback: "Monograph Editions",
        links: [
          { labelFallback: "Web Reader (Free)", href: "https://undreading.com" },
          { labelFallback: "Supporter & ZTA Kit (PWYW)", href: "#pricing" },
          { labelFallback: "Paperback Edition", href: "#pricing" },
        ],
      },
    ],
    showLegalLinks: true,
    showManifestLink: false,
  },
};
