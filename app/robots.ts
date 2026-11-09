import type { MetadataRoute } from "next";
import { getActiveProjectConfig } from "@/lib/project-config";

// Spec 006 FR-001: brand-scoped robots.txt, prerendered at build time.
export default function robots(): MetadataRoute.Robots {
  const config = getActiveProjectConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/signin", "/signup", "/reset-password"],
    },
    sitemap: `https://${config.domain}/sitemap.xml`,
  };
}
