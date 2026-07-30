"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLang } from "@/context/lang-context";
import { publishAlphaStats, type AlphaStats } from "@/lib/use-alpha-stats";
import { getStoredH1Variant, trackH1Event, type H1Variant } from "@/lib/h1-ab";
import AlphaSpotsCounter from "./alpha-spots-counter";
import {
  IconLinkedIn,
  IconTwitter,
  IconInstagram,
  IconFacebook,
  IconWhatsApp,
  IconDiscord,
} from "./social-svg-icons";

type SocialPlatform = "linkedin" | "twitter" | "instagram" | "facebook" | "whatsapp" | "discord";

const SOCIAL_CONFIG: Record<
  SocialPlatform,
  { label: string; placeholder: string; renderIcon: () => React.ReactNode }
> = {
  linkedin: {
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/username",
    renderIcon: () => <IconLinkedIn className="w-4 h-4 text-blue-400" />,
  },
  twitter: {
    label: "Twitter / X",
    placeholder: "@username",
    renderIcon: () => <IconTwitter className="w-4 h-4 text-slate-800 dark:text-orange-200" />,
  },
  instagram: {
    label: "Instagram",
    placeholder: "@username",
    renderIcon: () => <IconInstagram className="w-4 h-4 text-pink-400" />,
  },
  facebook: {
    label: "Facebook",
    placeholder: "https://facebook.com/profile",
    renderIcon: () => <IconFacebook className="w-4 h-4 text-blue-500" />,
  },
  whatsapp: {
    label: "WhatsApp",
    placeholder: "+79001234567",
    renderIcon: () => <IconWhatsApp className="w-4 h-4 text-emerald-400" />,
  },
  discord: {
    label: "Discord",
    placeholder: "username#1234",
    renderIcon: () => <IconDiscord className="w-4 h-4 text-indigo-400" />,
  },
};

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 17) % 92)}%`,
        delay: `${(i % 8) * 0.03}s`,
        color: ["#b45500", "#69a700", "#f59e0b", "#10b981", "#e07000"][i % 5],
        rot: `${(i * 47) % 360}deg`,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl confetti-root" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-1/3 h-2 w-2 rounded-sm opacity-90"
          style={
            {
              left: p.left,
              backgroundColor: p.color,
              animationDelay: p.delay,
              ["--rot" as string]: p.rot,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function WaitlistForm() {
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [showMore, setShowMore] = useState(false);
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
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    setShowConfetti(true);
    const tmr = setTimeout(() => setShowConfetti(false), 900);
    return () => clearTimeout(tmr);
  }, [submitted]);

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
      setError("Please provide a valid email");
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

      const h1Variant: H1Variant | null = getStoredH1Variant();

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          telegram: telegram.trim()
            ? telegram.trim().startsWith("@")
              ? telegram.trim()
              : `@${telegram.trim()}`
            : "",
          socials: selectedSocials,
          h1_variant: h1Variant ?? undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setPosition(data.position || 1);
        if (h1Variant) {
          trackH1Event("waitlist_submit", h1Variant, {
            position: data.position,
            claimed: data.claimed,
          });
        }
        if (typeof data.claimed === "number") {
          const next: AlphaStats = {
            claimed: data.claimed,
            remaining: data.remaining ?? Math.max(0, (data.limit || 50) - data.claimed),
            limit: data.limit || 50,
            open: data.open !== false,
          };
          publishAlphaStats(next);
        }
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
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-white dark:bg-slate-950 p-8 text-center shadow-2xl">
        {showConfetti && <ConfettiBurst />}
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-500 border border-emerald-500/30 success-pop">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t("waitlist_success_title")}
          </h3>
          <p className="text-emerald-600 dark:text-emerald-300 text-lg mb-4">
            {t("waitlist_success_pos")}{" "}
            <span className="font-extrabold text-emerald-500 text-xl">#{position}</span>
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
            {t("waitlist_success_contact")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-2xl shadow-orange-500/5 transition-colors"
    >
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-[11px] font-bold uppercase tracking-wider mb-3">
          {t("waitlist_tag")}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t("waitlist_title")}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-1.5">
          {t("waitlist_sub")}
        </p>
      </div>

      {/* Live alpha counter + trust chips at decision point */}
      <AlphaSpotsCounter variant="inline" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-3 py-2.5" />

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[t("waitlist_proof_gmv"), t("waitlist_proof_alpha"), t("waitlist_proof_paddle")].map(
          (label) => (
            <span
              key={label}
              className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
            >
              {label}
            </span>
          )
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300 text-center">
          {error}
        </div>
      )}

      <div className="text-left">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          {t("waitlist_email_label")} <span className="text-orange-500">*</span>
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("waitlist_email_placeholder")}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25 transition-all text-sm"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="w-full text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors py-1"
      >
        {showMore ? `− ${t("waitlist_hide_contacts")}` : `+ ${t("waitlist_more_contacts")}`}
      </button>

      {showMore && (
        <div className="space-y-4 text-left border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-up">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("waitlist_tg_label")}{" "}
              <span className="text-slate-400 font-normal">{t("waitlist_socials_optional")}</span>
            </label>
            <input
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder={t("waitlist_tg_placeholder")}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
            />
            <p className="text-[11px] text-slate-500 mt-1">{t("waitlist_tg_hint")}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
              {t("waitlist_socials_label")}{" "}
              <span className="text-slate-400">{t("waitlist_socials_optional")}</span>
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
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-slate-900 dark:bg-orange-500/20 text-white dark:text-orange-100 border border-orange-500/50"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-orange-500/40"
                    }`}
                  >
                    <span>{config.renderIcon()}</span>
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
            {activeSocials.length > 0 && (
              <div className="space-y-3">
                {activeSocials.map((platform) => {
                  const config = SOCIAL_CONFIG[platform];
                  return (
                    <div key={platform} className="relative flex items-center">
                      <div className="absolute left-3">{config.renderIcon()}</div>
                      <input
                        type="text"
                        value={socialValues[platform]}
                        onChange={(e) => handleSocialChange(platform, e.target.value)}
                        placeholder={`${config.label}: ${config.placeholder}`}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary-cta relative w-full rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-[0.98] py-4 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 transition-all cursor-pointer disabled:opacity-60"
      >
        {loading ? t("waitlist_submitting") : t("waitlist_submit")}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-500 dark:text-slate-400">
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
