"use client";

import React, { useState } from "react";

export default function CtaUndreseller() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 bg-[#08030f] text-white border-b border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
          Limited Production Slots
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Stop Burning Runway. Ship Your Product This Month.
        </h2>
        <p className="text-purple-200/70 max-w-xl mx-auto mb-10 text-sm">
          We accept only 3 engineering sprints per month to enforce our strict 14-day SLA. Submit your task brief below to secure your production slot.
        </p>

        {submitted ? (
          <div className="p-8 bg-brand-green/10 border border-brand-green/30 rounded-2xl text-brand-green font-semibold mb-8">
            ✓ Brief submitted successfully! We will prepare your DDL schema & Upwork Escrow link within 2 hours.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="p-8 bg-[#120524] rounded-2xl border border-purple-800/40 text-left max-w-xl mx-auto mb-10 space-y-4 shadow-2xl"
          >
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Work Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Telegram Username / WhatsApp *</label>
              <input
                type="text"
                name="telegram"
                required
                placeholder="@username or phone"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Select Sprint / Package *</label>
              <select name="sprint" className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange">
                <option value="tripwire">Product 0 — 24h Architecture Audit & Blueprint ($350 flat)</option>
                <option value="sku2">SKU 2 — 14-Day SaaS MVP Factory ($4,900 flat)</option>
                <option value="sku1">SKU 1 — B2B Operations & FOSS Office Stack ($3,500 + $500/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Describe your product or automation bottleneck in 2-3 sentences *</label>
              <textarea
                name="bottleneck"
                required
                rows={3}
                placeholder="e.g. Need Next.js 15 + Supabase auth, Stripe/NOWPayments checkout, and Inngest background workflows..."
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-950/40 transition-colors text-sm"
            >
              Initialize Sprint Proposal via Escrow →
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-purple-900/30 text-xs text-purple-300/60">
          <p className="mb-2">Prefer instant booking or direct e-sign?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://demo.undreseller.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 rounded-lg font-semibold transition-colors border border-emerald-800/40"
            >
              Book 1-on-1 Audit Slot ($350) →
            </a>
            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 rounded-lg font-semibold transition-colors border border-purple-800/40"
            >
              Open Direct Upwork Escrow (5%) →
            </a>
            <a
              href="https://sign.underundre.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 rounded-lg font-semibold transition-colors border border-purple-800/40"
            >
              DocuSeal e-Sign MSA →
            </a>
          </div>
          <p className="mt-2 text-purple-300/40">Standard Upwork Direct Contract (5% fee) or sovereign DocuSeal e-Sign with 100% IP code transfer.</p>
        </div>
      </div>
    </section>
  );
}
