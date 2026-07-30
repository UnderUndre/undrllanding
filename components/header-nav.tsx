"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./ui/logo";
import { useLang } from "@/context/lang-context";
import { Language } from "@/lib/i18n";

type ThemeMode = "system" | "dark" | "light";

export default function HeaderNav() {
  const { lang, setLang, t } = useLang();
  const [theme, setTheme] = useState<ThemeMode>("dark");

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
            {/* Secondary only — primary path is waitlist (CRO single purpose) */}
            <nav className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
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
                className={`px-1.5 py-1 rounded-lg transition-all ${
                  theme === "system"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="System theme"
              >
                💻
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`px-1.5 py-1 rounded-lg transition-all ${
                  theme === "dark"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Dark mode"
              >
                🌙
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`px-1.5 py-1 rounded-lg transition-all ${
                  theme === "light"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Light mode"
              >
                ☀️
              </button>
            </div>

            <a
              href="#waitlist"
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 px-3 sm:px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/25 active:scale-95 transition-all"
            >
              <span className="hidden xs:inline sm:inline">{t("nav_reserve")}</span>
              <span className="sm:hidden">Waitlist</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
