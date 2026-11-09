import type { MetadataRoute } from "next";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadManifestData } from "@/lib/schemas/content-loaders";

// Spec 006 FR-002: brand-scoped sitemap, prerendered at build time.
// Public routes only — auth/API routes MUST NOT appear (S-01).
export default function sitemap(): MetadataRoute.Sitemap {
  const config = getActiveProjectConfig();
  const base = `https://${config.domain}`;
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/manifest`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
  // /manifest returns 404 for brands without data/manifest.json (003 FR-008
  // absence semantics) — exclude it from their sitemap.
  if (!loadManifestData(config.slug)) {
    return entries.filter((e) => e.url !== `${base}/manifest`);
  }
  return entries;
}
