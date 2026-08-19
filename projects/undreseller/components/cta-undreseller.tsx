"use client";

import React, { useState } from "react";

export default function CtaUndreseller() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
          Limited Production Slots
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Stop Burning Runway. Ship Your Product This Month.
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-sm">
          We accept only 3 engineering sprints per month to enforce our strict 14-day SLA. Submit your task brief below to secure your production slot.
        </p>

        {submitted ? (
          <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-semibold mb-8">
            ✓ Brief submitted successfully! We will prepare your DDL schema & Upwork Escrow link within 2 hours.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="p-8 bg-slate-950 rounded-2xl border border-slate-800 text-left max-w-xl mx-auto mb-10 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Telegram Username / WhatsApp *</label>
              <input
                type="text"
                required
                placeholder="@username or phone"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Sprint *</label>
              <select className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500">
                <option value="sku2">SKU 2 - 14-Day SaaS MVP Factory ($4,900 flat)</option>
                <option value="sku1">SKU 1 - B2B Operations & Workflow Plumbing ($3,500 + $500/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Describe your product or automation bottleneck in 2-3 sentences *</label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Need Next.js + Supabase auth, Stripe subscriptions, and n8n webhook triage for inbound leads..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-colors text-sm"
            >
              Initialize Sprint Proposal via Escrow →
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
          <p className="mb-2">Prefer to bypass forms and initiate the contract directly?</p>
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-colors"
          >
            Open Direct Upwork Escrow Contract →
          </a>
          <p className="mt-2 text-slate-500">Standard Upwork Direct Contract. 0% extra client fee, full third-party dispute mediation included.</p>
        </div>
      </div>
    </section>
  );
}
