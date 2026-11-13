"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";
import { referralMetadata } from "@/lib/referral";
import { personaMetadata } from "@/lib/persona";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";
import waitlistJson from "@/projects/undreading/data/waitlist.json";

// Spec 009 FR-007/FR-008: trilingual waitlist form (ru/en/uk) posting to the
// existing /api/lead trunk (005) — no new infrastructure, no double-opt-in.
// Copy imported directly from the data JSON (003 data-layer convention) —
// uk is the first live consumer of the 004 uk-locale fallback.

type Copy = Record<
  "title" | "subtitle" | "emailLabel" | "consentLabel" | "submitLabel" | "successMessage",
  { ru: string; en: string; uk?: string }
>;

const copy = waitlistJson as Copy;
const pick = (
  t: { ru: string; en: string; uk?: string },
  lang: "ru" | "en" | "uk"
): string => t[lang] || t.en || t.ru;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistContent() {
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || status === "loading") return;
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const payload = {
      email,
      contact: email,
      topic: "undreading-waitlist",
      message: "Waitlist request — «Сантехника бытия» launch notification",
      metadata: {
        sourceComponent: "waitlist",
        lang,
        ...referralMetadata(),
        ...personaMetadata(),
      },
    };
    const parsed = GenericLeadSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      return;
    }
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="bg-brand-bg text-purple-50 min-h-screen flex items-center justify-center px-4">
        <p className="text-xl font-bold text-white text-center" data-testid="waitlist-success">
          {pick(copy.successMessage, lang)}
        </p>
      </main>
    );
  }

  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            {pick(copy.title, lang)}
          </h1>
          <p className="mt-4 text-purple-200/80 leading-relaxed">{pick(copy.subtitle, lang)}</p>

          <form
            data-testid="waitlist-form"
            onSubmit={submit}
            className="mt-10 rounded-2xl border border-brand-border bg-brand-surface-subtle p-6 space-y-5 text-left"
          >
            <div>
              <label htmlFor="wl-email" className="block text-sm font-medium text-purple-200 mb-2">
                {pick(copy.emailLabel, lang)}
              </label>
              <input
                id="wl-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg bg-brand-bg border border-brand-border px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <label className="flex items-start gap-3 text-xs text-purple-200/70">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-orange-500"
                required
              />
              <span>
                {pick(copy.consentLabel, lang)}{" "}
                <a href="/privacy" className="text-orange-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            <button
              type="submit"
              disabled={!consent || status === "loading"}
              className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-orange-600 px-6 py-3 text-sm font-bold text-white transition-colors"
            >
              {status === "loading" ? "…" : pick(copy.submitLabel, lang)}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400">
                {lang === "ru"
                  ? "Что-то порвалось — попробуйте ещё раз или напишите напрямую."
                  : "Something broke — try again or ping me directly."}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
