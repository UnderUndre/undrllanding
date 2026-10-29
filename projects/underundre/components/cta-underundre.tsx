"use client";

import React, { useState } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";
import { getContactChannels } from "@/lib/social-links";

export default function CtaUnderundre() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).cta;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fallbackMode, setFallbackMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const triageUrl = process.env.NEXT_PUBLIC_CAL_TRIAGE_URL;
  const socialLinks = getContactChannels();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: (formData.get("email") as string) || "",
      messenger: (formData.get("messenger") as string) || "",
      bottleneckType: (formData.get("bottleneckType") as string) || "whatsapp-manual",
      stackAndTeam: (formData.get("stackAndTeam") as string) || "",
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
        if (data.fallback === "direct") {
          setFallbackMode(true);
        }
      } else {
        setStatus("error");
        setErrorMessage(
          data.message ||
            (lang === "ru"
              ? "Не удалось отправить бриф. Напишите напрямую в мессенджер ниже."
              : "Submission failed. Reach out directly via messenger below.")
        );
      }
    } catch (err) {
      console.error("Lead submit error:", err);
      setStatus("error");
      setFallbackMode(true);
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
          <div className="p-8 bg-brand-green/10 border border-brand-green/30 rounded-2xl text-left max-w-xl mx-auto mb-10 space-y-4">
            <p className="text-brand-green font-bold text-lg">{t.thankYouTitle}</p>
            <p className="text-sm text-purple-100 leading-relaxed">{t.thankYouLoom}</p>
            <p className="text-sm text-purple-100 leading-relaxed">{t.thankYouEscrow}</p>
            {triageUrl && triageUrl.trim().length > 0 && (
              <div className="pt-4 border-t border-purple-900/40">
                <p className="text-xs text-purple-200/70 mb-2">{t.thankYouTriage}</p>
                <a
                  href={triageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg transition-all text-sm"
                >
                  {t.triageBtn}
                </a>
              </div>
            )}
            {fallbackMode && socialLinks.length > 0 && (
              <div className="pt-4 border-t border-purple-900/40">
                <p className="text-xs text-orange-300 mb-2">{t.fallbackNotice}</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ key, label, url, Icon }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/50 text-purple-200 text-xs font-semibold hover:border-orange-500/50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </a>
                  ))}
                </div>
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
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.email}</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.messenger}</label>
              <input
                type="text"
                name="messenger"
                placeholder={t.labels.messengerPlaceholder}
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.bottleneck}</label>
              <select
                name="bottleneckType"
                defaultValue="whatsapp-manual"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              >
                <option value="whatsapp-manual">{t.bottlenecks.whatsapp}</option>
                <option value="excel-chaos">{t.bottlenecks.excel}</option>
                <option value="saas-tax-foss">{t.bottlenecks.saasTax}</option>
                <option value="custom-sprint">{t.bottlenecks.custom}</option>
                <option value="other">{t.bottlenecks.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">{t.labels.stack}</label>
              <textarea
                name="stackAndTeam"
                required
                rows={3}
                placeholder={t.labels.stackPlaceholder}
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

        {socialLinks.length > 0 && (
          <div className="pt-6 border-t border-purple-900/30 text-xs text-purple-300/60">
            <p className="mb-3">{t.directLinks.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              {socialLinks.map(({ key, label, url, Icon }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 rounded-lg font-semibold transition-colors border border-purple-800/40"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label} →
                </a>
              ))}
            </div>
            <p className="text-purple-300/40">{t.directLinks.note}</p>
          </div>
        )}
      </div>
    </section>
  );
}
