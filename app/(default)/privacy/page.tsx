import { getActiveProjectConfig } from "@/lib/project-config";
import { loadPrivacyData } from "@/lib/schemas/content-loaders";
import LegalDocumentView, { type LegalTokens } from "@/components/content/legal-document-view";

// Statutory Privacy Policy (spec 003 FR-006). Content lives in
// projects/<slug>/data/privacy.json (bilingual, {{token}}-interpolated);
// missing file renders a clearly marked placeholder — never silently empty legal text.

export default function PrivacyPage() {
  const config = getActiveProjectConfig();
  const doc = loadPrivacyData(config.slug);
  const legal = config.legal;

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
    ? "PLACEHOLDER: projects/<slug>/data/privacy.json отсутствует — заполните его перед production / missing — fill it in before production."
    : legal?.contactEmail?.includes("PLACEHOLDER")
      ? "PLACEHOLDER: заполните блок `legal` в projects/<slug>/brand.ts перед production-релизом / Fill in the `legal` block before production release."
      : undefined;

  return (
    <LegalDocumentView
      doc={doc ?? { title: { ru: "Политика конфиденциальности", en: "Privacy Policy" }, updatedAt: { ru: "Черновик", en: "Draft" }, sections: [] }}
      tokens={tokens}
      warning={warning}
    />
  );
}
