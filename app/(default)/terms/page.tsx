import type { Metadata } from "next";

// Spec 006 FR-003: page-specific canonical (fixes the layout-inherited canonical leak).
export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

import { getActiveProjectConfig } from "@/lib/project-config";
import { loadTermsData, loadLegalConfig } from "@/lib/schemas/content-loaders";
import LegalDocumentView, { type LegalTokens } from "@/components/content/legal-document-view";

// Statutory Terms of Service (spec 003 FR-007). Content lives in
// projects/<slug>/data/terms.json (bilingual, {{token}}-interpolated).
// White-Label resellers MUST replace escrow/warranty clauses with their own terms.

export default function TermsPage() {
  const config = getActiveProjectConfig();
  const doc = loadTermsData(config.slug);
  const legal = loadLegalConfig(config.slug) ?? config.legal;

  const tokens: LegalTokens = {
    name: config.name,
    domain: config.domain,
    entityName: legal?.entityName ?? config.name,
    jurisdiction: legal?.jurisdiction ?? "[PLACEHOLDER]",
    contactEmail: legal?.contactEmail ?? "[PLACEHOLDER]",
    retentionMonths: legal?.retentionMonths ?? 12,
    escrowProvider: legal?.escrowProvider ?? "[PLACEHOLDER]",
    warrantyDays: legal?.warrantyDays ?? 7,
  };

  const warning = !doc
    ? "PLACEHOLDER: projects/<slug>/data/terms.json отсутствует — заполните его перед production / missing — fill it in before production."
    : legal?.escrowProvider?.includes("PLACEHOLDER")
      ? "PLACEHOLDER: клаузулы эскроу/гарантии — замените блок `legal` в projects/<slug>/brand.ts под свои коммерческие условия / replace the `legal` block with your own commercial terms."
      : undefined;

  return (
    <LegalDocumentView
      doc={doc ?? { title: { ru: "Условия обслуживания", en: "Terms of Service" }, updatedAt: { ru: "Черновик", en: "Draft" }, sections: [] }}
      tokens={tokens}
      warning={warning}
    />
  );
}
