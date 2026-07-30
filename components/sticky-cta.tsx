"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/lang-context";
import { useAlphaStats } from "@/lib/use-alpha-stats";

export default function StickyCta() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const { stats } = useAlphaStats(30000);

  useEffect(() => {
    const onScroll = () => {
      const waitlist = document.getElementById("waitlist");
      if (!waitlist) {
        setVisible(window.scrollY > 420);
        return;
      }
      const rect = waitlist.getBoundingClientRect();
      // Hide when waitlist form is in view; show after user scrolls past hero form
      const formOutOfView = rect.bottom < 80 || rect.top > window.innerHeight * 0.55;
      setVisible(window.scrollY > 360 && formOutOfView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-orange-500/10 p-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {t("sticky_cta")}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate tabular-nums">
            {stats.open
              ? `${stats.claimed}/${stats.limit} · ${t("counter_remaining").replace("{n}", String(stats.remaining))}`
              : t("counter_full_short")}
          </p>
        </div>
        <a
          href="#waitlist"
          className="shrink-0 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/30 transition-all"
        >
          →
        </a>
      </div>
    </div>
  );
}
