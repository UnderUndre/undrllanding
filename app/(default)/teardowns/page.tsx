import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadAllTeardowns } from "@/lib/schemas/teardown-loaders";
import TeardownIndexContent from "./teardown-index-content";

// Spec 008 FR-004: Teardown Vault index. Bureau program — brand-gated (review F3).

export const metadata: Metadata = {
  title: "Forensic Teardowns",
  alternates: { canonical: "/teardowns" },
};

export default function TeardownsPage() {
  const config = getActiveProjectConfig();
  if (!config.hasTeardowns || config.slug !== "underundre") {
    notFound();
  }
  const teardowns = loadAllTeardowns(config.slug);
  if (teardowns.length === 0) {
    notFound();
  }
  // Serializable case data passed as props — node:fs stays server-only.
  return <TeardownIndexContent cases={teardowns} />;
}
