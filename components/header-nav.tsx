"use client";

import { useState, useEffect } from "react";
import Logo from "./ui/logo";
import { useLang } from "@/context/lang-context";
import { getActiveProjectConfig } from "@/lib/project-config";
import { Language, TranslationKey } from "@/lib/i18n";

export default function HeaderNav() {
  const { lang, setLang, t } = useLang();
  const config = getActiveProjectConfig();
  const [theme, setTheme] = useState<ThemeMode>("dark");

  type ThemeMode = "system" | "dark" | "light";

  // Theme-mode persistence keys derive from the active brand (spec 003 FR-001) —
  // no brand-name literals in shared components.
  const themeStorageKey = `${config.slug}_theme`;
  const themeAttr = (mode: "dark" | "light") => (mode === "dark" ? `${config.slug}-dark` : config.slug);

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeStorageKey) as ThemeMode | null;
    const modeToApply = savedTheme || "dark";
    setTheme(modeToApply);
    applyTheme(modeToApply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", themeAttr("dark"));
    } else if (mode === "light") {
      root.classList.remove("dark");
      root.setAttribute("data-theme", themeAttr("light"));
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
        root.setAttribute("data-theme", themeAttr("dark"));
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", themeAttr("light"));
      }
    }
  };

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
    localStorage.setItem(themeStorageKey, newMode);
    applyTheme(newMode);
  };

  const availableLanguages = config.supportedLocales ?? ["ru", "en"];

  const toggleLang = () => {
    const currentIndex = availableLanguages.indexOf(lang);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % availableLanguages.length;
    setLang(availableLanguages[nextIndex]);
  };

  const navLabel = (item: { labelKey?: string; labelFallback: string }) =>
    item.labelKey ? t(item.labelKey as TranslationKey) : item.labelFallback;

  return (
    <header className="fixed top-2 z-50 w-full px-4 sm:px-6 md:top-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex h-14 items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 px-4 shadow-xl backdrop-blur-xl transition-colors">
          <div className="flex items-center gap-5 min-w-0">
            <Logo />
            <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {config.navigation.items.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-orange-500 transition-colors">
                  {navLabel(item)}
                </a>
              ))}
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

            {config.navigation.ctaButton && (
              <a
                href={config.navigation.ctaButton.href}
                className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 px-3 sm:px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/25 transition-all"
              >
                <span>{navLabel(config.navigation.ctaButton)}</span>
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
