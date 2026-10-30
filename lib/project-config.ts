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
  title: "UnderUndre — Productized Engineering & Workaround TCO Audit",
  description:
    "Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01.",
  iconUrl: "/projects/underundre/favicon.ico",
  heroBadge: "3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED",
  theme: {
    primaryColor: "#4e007a",
    secondaryColor: "#b45500",
  },
};

// Legacy undrlla brand decommissioned per spec 003 FR-011 (T-023).
// Its replacement landing will be re-created later as a regular template consumer
// via `pnpm project:create`.

export function getActiveProjectConfig(): ProjectConfig {
  const raw = (process.env.NEXT_PUBLIC_PROJECT_NAME || "underundre").toLowerCase();
  // Spec 001 §6.2.3: transition alias — "undreseller" (legacy template name) resolves to "underundre".
  const projectName = raw === "undreseller" ? "underundre" : raw;

  return underundreConfig;
}
