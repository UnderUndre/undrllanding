"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./ui/logo";
import { useLang } from "@/context/lang-context";
import { getActiveProjectConfig } from "@/lib/project-config";
import { Language } from "@/lib/i18n";

export default function HeaderNav() {
  const { lang, setLang, t } = useLang();
  const config = getActiveProjectConfig();
  const isUnderundre = config.slug === "underundre" || config.slug === "undreseller";
  const [theme, setTheme] = useState<ThemeMode>("dark");

  type ThemeMode = "system" | "dark" | "light";

  useEffect(() => {
    const savedTheme = localStorage.getItem("undrlla_theme") as ThemeMode | null;
    const modeToApply = savedTheme || "dark";
    setTheme(modeToApply);
    applyTheme(modeToApply);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "undrlla-dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "undrlla");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "undrlla-dark");
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "undrlla");
      }
    }
  };

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
    localStorage.setItem("undrlla_theme", newMode);
    applyTheme(newMode);
  };

  const toggleLang = () => {
    const nextLang: Language = lang === "ru" ? "en" : "ru";
    setLang(nextLang);
  };

  return (
    <header className="fixed top-2 z-50 w-full px-4 sm:px-6 md:top-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex h-14 items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 px-4 shadow-xl backdrop-blur-xl transition-colors">
          <div className="flex items-center gap-5 min-w-0">
            <Logo />
            {/* Nav items dependent on active project config */}
            <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isUnderundre ? (
                <>
                  <a href="#audit" className="hover:text-orange-500 transition-colors">
                    {lang === "ru" ? "TCO-Аудит" : "TCO Audit"}
                  </a>
                  <a href="#stack" className="hover:text-orange-500 transition-colors">
                    {lang === "ru" ? "FOSS-Стек" : "FOSS Stack"}
                  </a>
                  <a href="#pricing" className="hover:text-orange-500 transition-colors">
                    {lang === "ru" ? "Тарифы" : "Pricing"}
                  </a>
                  <a href="#comparison" className="hover:text-orange-500 transition-colors">
                    {lang === "ru" ? "Сравнение" : "Comparison"}
                  </a>
                  <a href="#faq" className="hover:text-orange-500 transition-colors">
                    {lang === "ru" ? "Вопросы" : "FAQ"}
                  </a>
                </>
              ) : (
                <>
                  <a href="#how" className="hover:text-orange-500 transition-colors">
                    {t("nav_how")}
                  </a>
                  <a href="#pricing" className="hover:text-orange-500 transition-colors">
                    {t("nav_pricing")}
                  </a>
                  <Link
                    href="/economics"
                    className="hover:text-orange-500 transition-colors opacity-80"
                  >
                    {t("nav_manifest")}
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:border-orange-500/40 transition-all cursor-pointer"
              title="Switch language / Сменить язык"
            >
              {lang.toUpperCase()}
            </button>

            <div className="hidden sm:flex relative items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-0.5 text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleThemeChange("system")}
                className={`p-1.5 rounded-lg transition-all ${
                  theme === "system"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="System theme"
                aria-label="System theme"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`p-1.5 rounded-lg transition-all ${
                  theme === "dark"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Dark mode"
                aria-label="Dark mode"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`p-1.5 rounded-lg transition-all ${
                  theme === "light"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Light mode"
                aria-label="Light mode"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </button>
            </div>

            <a
              href={isUnderundre ? "#contact" : "#waitlist"}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 px-3 sm:px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/25 transition-all"
            >
              <span>{isUnderundre ? (lang === "ru" ? "Аудит за $350" : "Audit for $350") : t("nav_reserve")}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
