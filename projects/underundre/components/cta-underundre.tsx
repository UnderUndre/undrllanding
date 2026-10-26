"use client";

import React, { useState } from "react";

export default function CtaUnderundre() {
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
        setErrorMessage(data.message || "Submission failed. Please try direct Upwork Escrow.");
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
          Limited Production Slots
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Stop Burning Runway. Ship Your Product This Month.
        </h2>
        <p className="text-purple-200/70 max-w-xl mx-auto mb-10 text-sm">
          We accept only 3 engineering sprints per month to enforce our strict delivery SLA. Submit your operational brief below to secure your production slot.
        </p>

        {status === "success" ? (
          <div className="p-8 bg-brand-green/10 border border-brand-green/30 rounded-2xl text-brand-green font-semibold mb-8 space-y-4">
            <p>✓ Brief submitted successfully! We will prepare your DDL schema & Upwork Escrow link within 2 hours.</p>
            {fallbackMode && (
              <div className="p-4 bg-purple-950/50 border border-purple-800/50 rounded-xl text-xs text-purple-200">
                <p className="mb-2">Network fallback active: connect directly via Upwork Direct Contracts to lock escrow instantly.</p>
                <a
                  href="https://www.upwork.com/direct-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                >
                  Open Upwork Direct Contracts (5%) →
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
              <label className="block text-xs font-medium text-purple-200 mb-1">Your Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Alex Smith"
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Company / Project Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Smith Clinic LLC"
                  className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Est. Monthly SaaS / Labor Waste</label>
                <input
                  type="text"
                  name="estimatedMonthlySaaSCost"
                  placeholder="e.g. $2,500/mo"
                  className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Select Product / Service *</label>
              <select name="sprint" className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange">
                <option value="tco-audit">Workaround TCO Audit & Architecture Spec ($490 flat, 24-48h)</option>
                <option value="foss-office">Grand Slam FOSS Office Stack ($3,500 setup + $500/mo)</option>
                <option value="custom-sprint">Sovereign Booking & Custom Systems ($4,900 flat)</option>
                <option value="other">Other Engineering Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">Describe your operational bottleneck or manual tasks *</label>
              <textarea
                name="bottleneck"
                required
                rows={3}
                placeholder="e.g. Dispatchers waste 15 hours a week copying WhatsApp bookings into Excel..."
                className="w-full px-4 py-3 bg-[#090212] border border-purple-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-brand-orange"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-brand-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-lg shadow-lg shadow-orange-950/40 transition-colors text-sm cursor-pointer"
            >
              {status === "loading" ? "Submitting Brief..." : "Initialize Sprint Proposal via Escrow →"}
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-purple-900/30 text-xs text-purple-300/60">
          <p className="mb-2">Prefer instant booking or direct contracting?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://shop.underundre.com/book?itemId=sovereign-architecture-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 rounded-lg font-semibold transition-colors border border-emerald-800/40"
            >
              Book 1-on-1 Audit Slot ($490) →
            </a>
            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 rounded-lg font-semibold transition-colors border border-purple-800/40"
            >
              Open Direct Upwork Escrow (5%) →
            </a>
          </div>
          <p className="mt-2 text-purple-300/40">Standard Upwork Direct Contract (5% fee) with 100% IP code transfer.</p>
        </div>
      </div>
    </section>
  );
}
