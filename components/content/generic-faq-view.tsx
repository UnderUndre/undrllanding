"use client";

import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { FaqData } from "@/lib/schemas/content-schema";

// Neutral client FAQ view for scaffolded brands (spec 003 FR-010).
export default function GenericFaqView({ data }: { data: FaqData }) {
  const { lang } = useLang();
  const pickText = (field: any) => pick(field, lang);

  return (
    <section id="faq" className="py-20 bg-brand-bg border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block px-3 py-1 bg-slate-900 text-brand-accent text-xs font-semibold rounded-full uppercase tracking-wider border border-slate-700">
            {pickText(data.sectionBadge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {pickText(data.sectionTitle)}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">{pickText(data.sectionSubtitle)}</p>
        </div>

        <div className="space-y-4">
          {data.items.map((item, idx) => (
            <details
              key={idx}
              className="group p-6 bg-brand-surface-subtle/70 rounded-xl border border-brand-border open:border-brand-primary/50 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
                <span>{pickText(item.question)}</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-brand-border pt-4 space-y-2">
                {item.answers.map((paragraph, pIdx) => (
                  <p key={pIdx}>{pickText(paragraph)}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
