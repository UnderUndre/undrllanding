export interface ProjectConfig {
  slug: string;
  name: string;
  domain: string;
  title: string;
  description: string;
  heroBadge?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const undresellerConfig: ProjectConfig = {
  slug: "undreseller",
  name: "Undreseller",
  domain: "undreseller.com",
  title: "Undreseller — Productized Engineering & Turnkey B2B Systems",
  description:
    "Production-Grade B2B MVPs & Workflows Shipped in 3–14 Days. Zero Budget Drag. Next.js 15, Supabase, n8n, Claude 3.7. Protected by Upwork Direct Contracts Escrow.",
  heroBadge: "UPWORK ESCROW VERIFIED | 100% FIXED SCOPE | ZERO HOURLY BILLING",
  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#0f172a",
  },
};

export const undrllaConfig: ProjectConfig = {
  slug: "undrlla",
  name: "Undrlla",
  domain: "undrlla.com",
  title: "Undrlla — Your branded store, live in one deploy",
  description:
    "Autonomous Medusa 2.0 marketplaces with custom branding, Next.js storefront, custom domains, Paddle/Stripe cards and SHKeeper crypto. 0% GMV fee.",
  heroBadge: "MEDUSA 2.0 MARKETPLACE STOREFRONT",
  theme: {
    primaryColor: "#000000",
    secondaryColor: "#18181b",
  },
};

export function getActiveProjectConfig(): ProjectConfig {
  const projectName = (process.env.NEXT_PUBLIC_PROJECT_NAME || "undrlla").toLowerCase();
  
  if (projectName === "undreseller") {
    return undresellerConfig;
  }
  
  return undrllaConfig;
}
