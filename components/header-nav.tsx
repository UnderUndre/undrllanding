"use client";

import { useState, useEffect } from "react";
import Logo from "./ui/logo";

type Language = "ru" | "en";
type ThemeMode = "system" | "dark" | "light";

export default function HeaderNav() {
  const [lang, setLang] = useState<Language>("ru");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    // Получаем тему из localStorage или системной настройки
    const savedTheme = localStorage.getItem("undrlla_theme") as ThemeMode | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
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
      // system
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
    const nextLang = lang === "ru" ? "en" : "ru";
    setLang(nextLang);
    // Пробрасываем событие смены языка для страницы
    window.dispatchEvent(new CustomEvent("undrlla_lang_change", { detail: nextLang }));
  };

  return (
    <header className="fixed top-2 z-50 w-full px-4 sm:px-6 md:top-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex h-14 items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 shadow-xl backdrop-blur-xl transition-colors">
          {/* Бренд Логотип */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Правая панель: Переключатели Языка, Темы и Кнопка Waitlist */}
          <div className="flex items-center gap-3">
            {/* i18n Переключатель языка (RU / EN) */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
              title="Switch language / Сменить язык"
            >
              <span>🌐</span>
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Переключатель Темы (Системная / Тёмная / Светлая) */}
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900 p-0.5 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => handleThemeChange("system")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  theme === "system" ? "bg-slate-800 text-white font-bold" : "hover:text-slate-200"
                }`}
                title="Системная тема"
              >
                💻
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  theme === "dark" ? "bg-slate-800 text-white font-bold" : "hover:text-slate-200"
                }`}
                title="Тёмная тема"
              >
                🌙
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  theme === "light" ? "bg-slate-800 text-white font-bold" : "hover:text-slate-200"
                }`}
                title="Светлая тема"
              >
                ☀️
              </button>
            </div>

            {/* Кнопка быстрого перехода к Waitlist */}
            <a
              href="#waitlist"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{lang === "ru" ? "Забронировать место" : "Reserve Spot"}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
