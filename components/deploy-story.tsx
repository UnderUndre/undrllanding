"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/lang-context";

const STEPS = [
  { key: "1" as const, icon: "①", accent: "from-orange-500/20 to-orange-500/5 border-orange-500/30" },
  { key: "2" as const, icon: "②", accent: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
  { key: "3" as const, icon: "③", accent: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" },
];

export default function DeployStory() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(2);
      return;
    }
    setActive(0);
    const t1 = setTimeout(() => setActive(1), 700);
    const t2 = setTimeout(() => setActive(2), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  const titles = [t("story_1_title"), t("story_2_title"), t("story_3_title")];
  const descs = [t("story_1_desc"), t("story_2_desc"), t("story_3_desc")];

  return (
    <section
      ref={ref}
      id="how"
      className="py-20 md:py-24 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-200 dark:border-slate-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
            {t("story_tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            {t("story_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-3">
            {t("story_sub")}
          </p>
        </div>

        {/* Progress rail */}
        <div className="relative max-w-3xl mx-auto mb-10">
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((active + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => {
            const on = i <= active;
            return (
              <div
                key={step.key}
                className={`relative rounded-2xl border bg-gradient-to-b p-6 transition-all duration-500 ${
                  step.accent
                } ${
                  on
                    ? "opacity-100 translate-y-0 scale-100 shadow-lg"
                    : "opacity-40 translate-y-3 scale-[0.98]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black ${
                      on
                        ? "bg-orange-500 text-slate-950"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    } transition-colors duration-300`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {titles[i]}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {descs[i]}
                </p>
                {/* Mini visual per step */}
                <div className="mt-5 h-20 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-950/50 flex items-center justify-center overflow-hidden">
                  {i === 0 && (
                    <div className="w-4/5 space-y-2 px-3">
                      <div className="h-2.5 w-full rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-8 rounded-lg bg-orange-500/90 flex items-center justify-center text-[10px] font-bold text-slate-950">
                        email@brand.com
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="font-mono text-[10px] text-left w-full px-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <p className={on ? "text-orange-500 font-bold" : ""}>
                        $ undevops provision
                      </p>
                      <p className={active >= 1 ? "text-emerald-500" : "opacity-40"}>
                        ✓ medusa · postgres · tls
                      </p>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="w-4/5 rounded-lg border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-900">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-5 w-5 rounded bg-orange-500 text-[9px] font-bold text-white flex items-center justify-center">
                          U
                        </span>
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">
                          yourshop.com
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="h-6 rounded bg-slate-100 dark:bg-slate-800" />
                        <div className="h-6 rounded bg-slate-100 dark:bg-slate-800" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
