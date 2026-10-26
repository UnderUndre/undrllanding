"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function ComparisonMatrix() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).comparison;

  return (
    <section id="comparison" className="py-20 bg-white dark:bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-purple-900/30 bg-slate-50 dark:bg-[#110721]/60">
                <th className="p-4 font-bold text-slate-900 dark:text-slate-100">{t.headers.metric}</th>
                <th className="p-4 font-bold text-orange-400">{t.headers.underundre}</th>
                <th className="p-4 font-bold text-slate-400 dark:text-purple-200/80">{t.headers.agencies}</th>
                <th className="p-4 font-bold text-slate-400 dark:text-purple-200/80">{t.headers.freelancers}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-purple-900/30">
              {t.rows.map((r, i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{r.metric}</td>
                  <td className="p-4 font-bold text-brand-green">{r.underundre}</td>
                  <td className="p-4 text-slate-500 dark:text-purple-200/70">{r.agencies}</td>
                  <td className="p-4 text-slate-500 dark:text-purple-200/70">{r.freelancers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
