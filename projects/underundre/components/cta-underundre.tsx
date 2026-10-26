"use client";

import React, { useState } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function CtaUnderundre() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).cta;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fallbackMode, setFallbackMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: (formData.get("name") as string) || "Anonymous Founder",
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || "",
      estimatedMonthlySaaSCost: (formData.get("estimatedMonthlySaaSCost") as string) || "",
      productInterest: (formData.get("sprint") as string) || "tco-audit",
      details: (formData.get("bottleneck") as string) || "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        if (data.fallback === "upwork") {
          setFallbackMode(true);
        }
      } else {
        setStatus("error");
        setErrorMessage(data.message || (lang === "ru" ? "Ошибка отправки. Попробуйте через Upwork Escrow." : "Submission failed. Please try direct Upwork Escrow."));
      }
    } catch (err) {
      console.error("Lead submit error:", err);
      setStatus("success");
      setFallbackMode(true); // Graceful fallback
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#08030f] text-white border-b border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
          {t.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {t.title}
        </h2>
        <p className="text-purple-200/70 max-w-xl mx-auto mb-10 text-sm">
          {t.subtitle}
        </p>

        {status === "success" ? (
          <div className="p-8 bg-brand-green/10 border border-brand-green/30 rounded-2xl text-brand-green font-semibold mb-8 space-y-4">
            <p>{t.successTitle}</p>
            {fallbackMode && (
              <div className="p-4 bg-purple-950/50 border border-purple-800/50 rounded-xl text-xs text-purple-200">
                <p className="mb-2">{t.fallbackNotice}</p>
                <a
                  href="https://www.upwork.com/direct-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg transition-all"
                >
                  {t.fallbackBtn}
                </a>
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 bg-[#120524] rounded-2xl border border-purple-800/40 text-left max-w-xl mx-auto mb-10 space-y-4 shadow-2xl"
          >
            {status === "error" && (
              <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-lg text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.name}</label>
              <input
                type="text"
                name="name"
                required
                placeholder={lang === "ru" ? "Алексей Смирнов" : "Alex Smith"}
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.email}</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.company}</label>
                <input
                  type="text"
                  name="company"
                  placeholder={lang === "ru" ? "Клиника / Студия" : "Smith Logistics LLC"}
                  className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.waste}</label>
                <input
                  type="text"
                  name="estimatedMonthlySaaSCost"
                  placeholder="e.g. $2,500/mo"
                  className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.sprint}</label>
              <select name="sprint" className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange">
                <option value="tco-audit">{t.options.tcoAudit}</option>
                <option value="foss-office">{t.options.fossOffice}</option>
                <option value="custom-sprint">{t.options.customSprint}</option>
                <option value="other">{t.options.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.details}</label>
              <textarea
                name="bottleneck"
                required
                rows={3}
                placeholder={lang === "ru" ? "Например: 2 администратора вручную перебивают брони из чатов в Excel..." : "e.g. Dispatchers waste 15 hours a week copying WhatsApp bookings into Excel..."}
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-lg shadow-lg shadow-orange-950/40 transition-all text-sm cursor-pointer"
            >
              {status === "loading" ? t.labels.submitting : t.labels.submitBtn}
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-purple-900/30 text-xs text-purple-300/60">
          <p className="mb-2">{t.directLinks.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://shop.underundre.com/book?itemId=sovereign-architecture-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 rounded-lg font-semibold transition-colors border border-emerald-800/40"
            >
              {t.directLinks.bookAudit}
            </a>
            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 rounded-lg font-semibold transition-colors border border-purple-800/40"
            >
              {t.directLinks.openUpwork}
            </a>
          </div>
          <p className="mt-2 text-purple-300/40">{t.directLinks.note}</p>
        </div>
      </div>
    </section>
  );
}
