"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { FaqData } from "@/lib/schemas/content-schema";

// Client view for the schema-driven FAQ section (spec 003 FR-004, T-014).
// Data is loaded server-side (faq-section.tsx) and passed as typed props.

export default function FaqView({ data }: { data: FaqData }) {
  const { lang } = useLang();
  const pickText = (field: any) => pick(field, lang);

  return (
    <section id="faq" className="py-20 bg-[#06020a] border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {pickText(data.sectionBadge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {pickText(data.sectionTitle)}
          </h2>
          <p className="mt-4 text-purple-200/70 text-sm max-w-xl mx-auto">
            {pickText(data.sectionSubtitle)}
          </p>
        </div>

        <div className="space-y-4">
          {data.items.map((item, idx) => (
            <details
              key={idx}
              className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
                <span>{pickText(item.question)}</span>
                <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-brand-border pt-4 space-y-2">
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
