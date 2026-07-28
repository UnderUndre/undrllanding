"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";

type SocialPlatform = "linkedin" | "twitter" | "instagram" | "facebook" | "whatsapp" | "discord";

const SOCIAL_CONFIG: Record<SocialPlatform, { label: string; placeholder: string; icon: string }> = {
  linkedin: { label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "💼" },
  twitter: { label: "Twitter / X", placeholder: "@username", icon: "🐦" },
  instagram: { label: "Instagram", placeholder: "@username", icon: "📸" },
  facebook: { label: "Facebook", placeholder: "https://facebook.com/profile", icon: "👤" },
  whatsapp: { label: "WhatsApp", placeholder: "+79001234567", icon: "💬" },
  discord: { label: "Discord", placeholder: "username#1234", icon: "🎮" },
};

export default function WaitlistForm() {
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [activeSocials, setActiveSocials] = useState<SocialPlatform[]>([]);
  const [socialValues, setSocialValues] = useState<Record<SocialPlatform, string>>({
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    discord: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSocial = (platform: SocialPlatform) => {
    if (activeSocials.includes(platform)) {
      setActiveSocials(activeSocials.filter((p) => p !== platform));
    } else {
      setActiveSocials([...activeSocials, platform]);
    }
  };

  const handleSocialChange = (platform: SocialPlatform, value: string) => {
    setSocialValues({ ...socialValues, [platform]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Email invalid");
      return;
    }

    if (!telegram || telegram.trim().length < 2) {
      setError("Telegram handle required");
      return;
    }

    setLoading(true);

    try {
      const selectedSocials: Record<string, string> = {};
      activeSocials.forEach((platform) => {
        if (socialValues[platform].trim()) {
          selectedSocials[platform] = socialValues[platform].trim();
        }
      });

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          telegram: telegram.trim().startsWith("@") ? telegram.trim() : `@${telegram.trim()}`,
          socials: selectedSocials,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setPosition(data.position || 1421);
      } else {
        setError(data.error || "Submission failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 dark:bg-emerald-950/40 p-8 text-center backdrop-blur-md shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400 border border-emerald-500/40">
          🎉
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{t("waitlist_success_title")}</h3>
        <p className="text-emerald-300 text-lg mb-4">
          {t("waitlist_success_pos")}{" "}
          <span className="font-extrabold text-emerald-400 text-xl">#{position}</span>
        </p>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          {t("waitlist_success_contact")} (<span className="font-semibold text-white">{telegram}</span>)
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-colors"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
          {t("waitlist_tag")}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t("waitlist_title")}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-1">
          {t("waitlist_sub")}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500 dark:text-red-300 text-center">
          ⚠️ {error}
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-4 text-left">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {t("waitlist_email_label")} <span className="text-orange-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("waitlist_email_placeholder")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {t("waitlist_tg_label")} <span className="text-orange-500">*</span>
          </label>
          <input
            type="text"
            required
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder={t("waitlist_tg_placeholder")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
          />
          <p className="text-[11px] text-slate-500 mt-1">{t("waitlist_tg_hint")}</p>
        </div>
      </div>

      {/* Progressive Social Disclosure */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-left">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          {t("waitlist_socials_label")}{" "}
          <span className="text-slate-400 dark:text-slate-500 font-normal">
            {t("waitlist_socials_optional")}
          </span>
        </label>

        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.keys(SOCIAL_CONFIG) as SocialPlatform[]).map((platform) => {
            const isSelected = activeSocials.includes(platform);
            const config = SOCIAL_CONFIG[platform];
            return (
              <button
                type="button"
                key={platform}
                onClick={() => toggleSocial(platform)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-slate-800 dark:bg-slate-700 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span className="text-slate-400 font-bold ml-0.5">{isSelected ? "✓" : "+"}</span>
              </button>
            );
          })}
        </div>

        {activeSocials.length > 0 && (
          <div className="space-y-3 pt-2">
            {activeSocials.map((platform) => {
              const config = SOCIAL_CONFIG[platform];
              return (
                <div key={platform} className="relative flex items-center">
                  <div className="absolute left-3 text-sm">{config.icon}</div>
                  <input
                    type="text"
                    value={socialValues[platform]}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                    placeholder={`${config.label}: ${config.placeholder}`}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSocial(platform)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Button with Glowing Border Effect */}
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 opacity-60 blur transition duration-500 group-hover:opacity-100" />
        <button
          type="submit"
          disabled={loading}
          className="relative w-full rounded-xl bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 py-4 px-6 text-sm font-bold text-white border border-orange-500/50 shadow-xl transition-all cursor-pointer"
        >
          {loading ? t("waitlist_submitting") : t("waitlist_submit")}
        </button>
      </div>

      <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="text-emerald-500 font-bold">✓</span> {t("waitlist_no_spam")}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-500 font-bold">✓</span> {t("waitlist_no_card")}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-500 font-bold">✓</span> {t("waitlist_auto_domain")}
        </span>
      </div>
    </form>
  );
}
