"use client";

import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { LegalDocument } from "@/lib/schemas/content-schema";

export type LegalTokens = Record<string, string | number>;

// Shared renderer for statutory legal pages (spec 003 FR-006/FR-007).
// Body strings may carry {{token}} placeholders resolved from ProjectConfig.legal.
export default function LegalDocumentView({
  doc,
  tokens,
  warning,
}: {
  doc: LegalDocument;
  tokens: LegalTokens;
  warning?: string;
}) {
  const { lang } = useLang();

  const pickText = (field: any) => pick(field, lang);
  const interpolate = (text: string) =>
    text.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
      tokens[key] !== undefined ? String(tokens[key]) : `{{${key}}}`
    );

  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-sm leading-relaxed space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{pickText(doc.title)}</h1>
          <p className="text-purple-200/60 text-xs">{pickText(doc.updatedAt)}</p>
        </header>

        {warning && (
          <p className="p-3 bg-yellow-950/50 border border-yellow-800/50 rounded-lg text-xs text-yellow-300">
            {warning}
          </p>
        )}

        {doc.intro && <p className="text-purple-100/80">{interpolate(pickText(doc.intro))}</p>}

        {doc.sections.map((section) => (
          <section key={pickText(section.heading)}>
            <h2 className="text-lg font-bold text-white mb-2">{pickText(section.heading)}</h2>
            {section.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-purple-100/80">
                {interpolate(pickText(paragraph))}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
