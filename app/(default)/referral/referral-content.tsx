"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "@/projects/underundre/locales";

// Spec 007 FR-001: client-side link minting — zero network requests,
// canonical domain link (plan D2), lowercase sanitized nickname.

const NETWORKS = [
  { id: "linkedin", labelKey: "networkLinkedIn" },
  { id: "x", labelKey: "networkX" },
  { id: "community", labelKey: "networkCommunity" },
] as const;

export default function ReferralContent() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).referral;
  const [nick, setNick] = useState("");
  const [network, setNetwork] = useState<string>("linkedin");
  const [copied, setCopied] = useState(false);

  const sanitized = nick.trim().toLowerCase();
  const valid = /^[a-z0-9_.-]{1,32}$/.test(sanitized);
  const link = useMemo(
    () => (valid ? `https://underundre.com/?ref=${sanitized}` : ""),
    [valid, sanitized],
  );

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen transition-colors">
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.title}
          </h1>
          <p className="mt-4 text-purple-200/80 leading-relaxed">{t.subtitle}</p>

          {/* Mint form — FR-001: fully client-side, zero network requests */}
          <div className="mt-10 p-6 bg-brand-surface-subtle rounded-2xl border border-brand-border space-y-5">
            <div>
              <label htmlFor="ref-nick" className="block text-sm font-medium text-purple-200 mb-2">
                {t.nickLabel}
              </label>
              <input
                id="ref-nick"
                type="text"
                maxLength={32}
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder="alice"
                className="w-full rounded-lg bg-brand-bg border border-brand-border px-4 py-3 text-white placeholder:text-purple-300/40 focus:outline-none focus:border-orange-500"
              />
              {nick && !valid && (
                <p className="mt-2 text-xs text-orange-400">{t.nickInvalid}</p>
              )}
            </div>
            <div>
              <label htmlFor="ref-network" className="block text-sm font-medium text-purple-200 mb-2">
                {t.networkLabel}
              </label>
              <select
                id="ref-network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full rounded-lg bg-brand-bg border border-brand-border px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              >
                {NETWORKS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {t[n.labelKey]}
                  </option>
                ))}
              </select>
            </div>
            {valid && (
              <div>
                <p className="block text-sm font-medium text-purple-200 mb-2">{t.linkLabel}</p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={link}
                    aria-label={t.linkLabel}
                    className="flex-1 rounded-lg bg-brand-bg border border-brand-border px-4 py-3 text-orange-300 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-lg bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-bold text-white transition-colors"
                  >
                    {copied ? t.copiedButton : t.copyButton}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Program rules — FR-003 verbatim */}
          <div className="mt-10 p-6 bg-brand-surface-subtle rounded-2xl border border-brand-border">
            <h2 className="text-lg font-bold text-white">{t.rulesTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-purple-100/80 leading-relaxed list-disc pl-5">
              <li>{t.ruleBase}</li>
              <li>{t.ruleDiscount}</li>
              <li>{t.ruleReview}</li>
              <li>{t.ruleReview2}</li>
              <li>{t.ruleCap}</li>
              <li>{t.ruleIneligible}</li>
              <li>{t.rulePayout}</li>
              <li>{t.ruleCollision}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
