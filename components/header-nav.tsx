"use client";

import { useState, useEffect } from "react";
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
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            {/* i18n Language Toggle (RU / EN) */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700 transition-all cursor-pointer"
              title="Switch language / Сменить язык"
            >
              <span>🌐</span>
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Controller (System / Dark / Light) */}
            <div className="relative flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-0.5 text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleThemeChange("system")}
                className={`px-2 py-1 rounded-lg transition-all ${
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
                className={`px-2 py-1 rounded-lg transition-all ${
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
                className={`px-2 py-1 rounded-lg transition-all ${
                  theme === "light"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Light mode"
              >
                ☀️
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#waitlist"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{t("nav_reserve")}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
