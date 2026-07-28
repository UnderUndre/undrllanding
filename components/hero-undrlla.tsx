"use client";

import { useLang } from "@/context/lang-context";
import WaitlistForm from "./waitlist-form";
import HeroTypingShowcase from "./hero-typing-showcase";

export default function HeroUndrlla() {
  const { t } = useLang();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-[#080808] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Фоновая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-purple-500/15 via-orange-500/15 to-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Альфа бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("hero_badge_alpha")}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">
              {t("hero_badge_offer")}
            </span>
          </div>

          {/* H1 Заголовок */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            {t("hero_title_1")}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 dark:from-orange-400 dark:via-amber-400 dark:to-emerald-400 bg-clip-text text-transparent">
              {t("hero_title_accent")}
            </span>{" "}
            {t("hero_title_2")}
          </h1>

          {/* Подзаголовок */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            {t("hero_subtitle")}
          </p>

          {/* Социальные индикаторы */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 text-base font-bold">
                0 / 50
              </span>
              <span>{t("hero_stat_alpha")}</span>
            </div>
            <div className="hidden sm:block text-slate-300 dark:text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 text-base font-bold">$0</span>
              <span>{t("hero_stat_cost")}</span>
            </div>
            <div className="hidden sm:block text-slate-300 dark:text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600 dark:text-orange-400 text-base font-bold">
                Medusa 2.0
              </span>
              <span>{t("hero_stat_engine")}</span>
            </div>
          </div>
        </div>

        {/* Сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div id="waitlist" className="lg:col-span-6 scroll-mt-32">
            <WaitlistForm />
          </div>
          <div className="lg:col-span-6">
            <HeroTypingShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
