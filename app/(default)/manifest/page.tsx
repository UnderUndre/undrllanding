import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadManifestData } from "@/lib/schemas/content-schema";
import ManifestContent from "./manifest-content";

// Statutory Engineering Manifesto page (spec 003 FR-008).
// Absence semantics (review F3): projects without data/manifest.json render 404
// and omit the footer link (FooterConfig.showManifestLink).

export default function ManifestPage() {
  const config = getActiveProjectConfig();
  const manifest = loadManifestData(config.slug);

  if (!manifest) {
    notFound();
  }

  return <ManifestContent manifest={manifest} />;
}
