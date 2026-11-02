// Inversion-of-control contracts for the multi-brand landing engine.
// Brand configs live in projects/<slug>/brand.ts and are registered in the
// GENERATED PROJECT REGISTRY block below (managed by scripts/create-project.mjs).

import type { Language } from "./i18n";

export interface NavItem {
  labelKey?: string; // key into lib/i18n.ts translations (bilingual)
  labelFallback: string; // English fallback when the key is absent
  href: string;
}

export interface NavigationConfig {
  items: NavItem[];
  ctaButton?: {
    labelKey?: string;
    labelFallback: string;
    href: string;
  };
}

export interface FooterLink {
  labelKey?: string;
  labelFallback: string;
  href?: string; // omit → rendered as a plain text/badge entry
  badge?: string;
}

export interface FooterColumn {
  titleKey?: string;
  titleFallback: string;
  links: FooterLink[];
}

export interface FooterConfig {
  taglineKey?: string;
  taglineFallback: string;
  columns: FooterColumn[];
  showLegalLinks?: boolean; // default true — renders /privacy + /terms links
  showManifestLink?: boolean; // default false — renders /manifest link only for projects shipping manifest.json
}

export interface LegalConfig {
  contactEmail: string; // GDPR Art. 13 data-protection contact
  entityName: string; // legal/operator identity shown on statutory pages
  jurisdiction: string; // e.g. "EU NACE 62.01"
  retentionMonths?: number; // default 12
  escrowProvider?: string; // default Upwork Direct Contracts clause
  warrantyDays?: number; // default 7
}

export interface ProjectConfig {
  slug: string;
  name: string;
  domain: string;
  title: string;
  description: string;
  iconUrl: string;
  /** Small raster favicon (16–48px PNG/ICO); falls back to iconUrl when omitted */
  faviconUrl?: string;
  /** 180×180 PNG for iOS apple-touch-icon; falls back to faviconUrl/iconUrl */
  appleIconUrl?: string;
  heroBadge?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  navigation: NavigationConfig;
  footer: FooterConfig;
  /** Locales supported by this brand (default: ["ru", "en"]) */
  supportedLocales?: Language[];
  /** Optional fallback — preferred source is projects/<slug>/data/legal.json */
  legal?: LegalConfig;
}

// BEGIN GENERATED PROJECT REGISTRY (managed by scripts/create-project.mjs — do not edit outside this block)
import { underundreBrand } from "@/projects/underundre/brand";

const projectRegistry: Record<string, ProjectConfig> = {
  underundre: underundreBrand,
};
// END GENERATED PROJECT REGISTRY

export function getActiveProjectConfig(): ProjectConfig {
  const raw = (process.env.NEXT_PUBLIC_PROJECT_NAME || "underundre").toLowerCase();
  // Spec 001 §6.2.3: transition alias — "undreseller" (legacy template name) resolves to "underundre".
  const projectName = raw === "undreseller" ? "underundre" : raw;

  return projectRegistry[projectName] ?? underundreBrand;
}
