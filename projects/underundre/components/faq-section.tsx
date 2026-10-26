"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function FaqSection() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).faq;

  return (
    <section id="faq" className="py-20 bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-4 text-purple-200/70 text-sm max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.items.map((item, idx) => (
            <details
              key={idx}
              className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
                <span>{item.q}</span>
                <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
                {item.a.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
