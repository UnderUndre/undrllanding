export interface ProjectConfig {
  slug: string;
  name: string;
  domain: string;
  title: string;
  description: string;
  iconUrl: string;
  heroBadge?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const underundreConfig: ProjectConfig = {
  slug: "underundre",
  name: "UnderUndre",
  domain: "underundre.com",
  title: "UnderUndre — Productized Engineering & Turnkey B2B Systems",
  description:
    "Production-Grade B2B MVPs & Workflows Shipped in 3–14 Days. Zero Budget Drag. Next.js 15, Supabase, n8n, AI. Protected by Upwork Direct Contracts Escrow.",
  iconUrl: "/projects/underundre/icon.svg",
  heroBadge: "UPWORK ESCROW VERIFIED | 100% FIXED SCOPE | ZERO HOURLY BILLING",
  theme: {
    primaryColor: "#4e007a",
    secondaryColor: "#b45500",
  },
};

export const undrllaConfig: ProjectConfig = {
  slug: "undrlla",
  name: "Undrlla",
  domain: "undrlla.com",
  title: "Undrlla — Your branded store, live in one deploy",
  description:
    "Autonomous Medusa 2.0 marketplaces with custom branding, Next.js storefront, custom domains, Paddle/Stripe cards and SHKeeper crypto. 0% GMV fee.",
  iconUrl: "/projects/undrlla/icon.png",
  heroBadge: "MEDUSA 2.0 MARKETPLACE STOREFRONT",
  theme: {
    primaryColor: "#000000",
    secondaryColor: "#18181b",
  },
};

export function getActiveProjectConfig(): ProjectConfig {
  const raw = (process.env.NEXT_PUBLIC_PROJECT_NAME || "underundre").toLowerCase();
  // Spec 001 §6.2.3: transition alias — "undreseller" (legacy template name) resolves to "underundre".
  const projectName = raw === "undreseller" ? "underundre" : raw;

  if (projectName === "undrlla") {
    return undrllaConfig;
  }

  return underundreConfig;
}
