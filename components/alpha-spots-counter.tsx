"use client";

import { useAlphaStats } from "@/lib/use-alpha-stats";
import { useLang } from "@/context/lang-context";

type Variant = "hero" | "inline" | "badge";

export default function AlphaSpotsCounter({
  variant = "hero",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const { t } = useLang();
  const { stats, loading } = useAlphaStats();
  const { claimed, remaining, limit, open } = stats;
  const pct = Math.min(100, Math.round((claimed / Math.max(limit, 1)) * 100));

  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[11px] font-bold text-orange-600 dark:text-orange-400 tabular-nums ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe-pulse" />
        {loading ? "…" : open ? `${claimed} / ${limit}` : t("counter_full_short")}
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-slate-600 dark:text-slate-400">{t("counter_label")}</span>
          <span className="tabular-nums text-slate-900 dark:text-white">
            {loading ? "…" : `${claimed} / ${limit}`}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700 ease-out"
            style={{ width: `${loading ? 4 : Math.max(pct, claimed > 0 ? 6 : 2)}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {loading
            ? "…"
            : open
              ? t("counter_remaining").replace("{n}", String(remaining))
              : t("counter_full")}
        </p>
      </div>
    );
  }

  // hero
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 min-w-[3.25rem] items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2.5 font-extrabold text-sm tabular-nums shadow-sm">
          {loading ? "—" : `${claimed}/${limit}`}
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-400 text-left max-w-[10rem]">
          {t("hero_stat_alpha")}
        </span>
      </div>
      <div className="w-40 h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-700"
          style={{ width: `${loading ? 4 : Math.max(pct, 2)}%` }}
        />
      </div>
      <span className="text-[11px] font-medium text-orange-600 dark:text-orange-400 tabular-nums">
        {loading
          ? "…"
          : open
            ? t("counter_remaining").replace("{n}", String(remaining))
            : t("counter_full")}
      </span>
    </div>
  );
}
