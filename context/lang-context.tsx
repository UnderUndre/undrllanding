"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/i18n";

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations["ru"]) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");

  useEffect(() => {
    // Spec 005 FR-011: single storage key — legacy "undrlla_lang" removed.
    const saved = localStorage.getItem("app_lang") as Language | null;
    if (saved === "ru" || saved === "en" || saved === "uk") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const t = (key: keyof typeof translations["ru"]): string => {
    return translations[lang][key] || translations["ru"][key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      lang: "ru" as Language,
      setLang: () => {},
      t: (key: keyof typeof translations["ru"]) => translations["ru"][key] || key,
    };
  }
  return context;
}
