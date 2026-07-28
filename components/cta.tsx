"use client";

import { useLang } from "@/context/lang-context";

export default function Cta() {
  const { t } = useLang();

  return (
    <section className="py-20 bg-white dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" data-aos="fade-up">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-8 md:p-14 text-center shadow-2xl transition-colors">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

          <span className="inline-block text-xs font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400 mb-3">
            {t("cta_tag")}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-2xl mx-auto">
            {t("cta_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
            {t("cta_sub")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-8 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all text-center"
            >
              {t("cta_btn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
