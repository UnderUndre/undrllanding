"use client";

import { useLang } from "@/context/lang-context";
import BentoGlowCard from "./bento-glow-card";

export default function GlobalStats() {
  const { t } = useLang();

  const stats = [
    {
      value: t("stat_1_val"),
      label: t("stat_1_lbl"),
      description: t("stat_1_desc"),
    },
    {
      value: t("stat_2_val"),
      label: t("stat_2_lbl"),
      description: t("stat_2_desc"),
    },
    {
      value: t("stat_3_val"),
      label: t("stat_3_lbl"),
      description: t("stat_3_desc"),
    },
    {
      value: t("stat_4_val"),
      label: t("stat_4_lbl"),
      description: t("stat_4_desc"),
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <BentoGlowCard glowColor="rgba(16, 185, 129, 0.25)">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
              {t("stats_tag")}
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              {t("stats_title")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 dark:from-orange-400 dark:via-amber-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Примечание Радикальной Честности: Гарантии Экономики vs Инженерные Ориентиры */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium">
              {t("stats_guarantee_note")}
            </p>
          </div>
        </BentoGlowCard>
      </div>
    </section>
  );
}
