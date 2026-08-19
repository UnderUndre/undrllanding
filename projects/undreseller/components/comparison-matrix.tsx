"use client";

import React from "react";

export default function ComparisonMatrix() {
  return (
    <section className="py-20 bg-white dark:bg-[#080808] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Engineered Speed vs. Industry Standard Inefficiency.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See how Productized Engineering eliminates budget drag and unpredictable freelance timelines.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Evaluation Metric</th>
                <th className="p-4 font-bold text-blue-600 dark:text-blue-400">Undreseller Productized Bureau</th>
                <th className="p-4 font-bold text-slate-500">Traditional Software Agencies</th>
                <th className="p-4 font-bold text-slate-500">Marketplace Freelancers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Delivery Timeline</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">3–14 Calendar Days (Guaranteed)</td>
                <td className="p-4 text-slate-500">3 to 6 Months</td>
                <td className="p-4 text-slate-500">Unpredictable (2–12 Weeks)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Pricing Structure</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">$3,500 – $4,900 Flat Fee</td>
                <td className="p-4 text-slate-500">$30,000 – $60,000+ (T&M)</td>
                <td className="p-4 text-slate-500">$30–$80/hr (Scope bloat)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Capital Security</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">100% Upwork Escrow Protection</td>
                <td className="p-4 text-slate-500">50% non-refundable upfront deposit</td>
                <td className="p-4 text-slate-500">100% upfront or weekly tracking</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Architecture Quality</td>
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">Next.js 15 + Supabase + Zod Types</td>
                <td className="p-4 text-slate-500">Over-engineered legacy stack</td>
                <td className="p-4 text-slate-500">Undocumented spaghetti code</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Runtime Error Handling</td>
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">Automated Zod DLQ + Telegram Alerts</td>
                <td className="p-4 text-slate-500">Paid support ticketing</td>
                <td className="p-4 text-slate-500">None (Silent app failures)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Post-Launch Warranty</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">7-Day P1/P2 Bugfix SLA Included</td>
                <td className="p-4 text-slate-500">Expensive monthly SLA contracts</td>
                <td className="p-4 text-slate-500">Disappears after final payment</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Code & IP Ownership</td>
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">Git + OpenAPI 3.0 + Supabase DDL</td>
                <td className="p-4 text-slate-500">Proprietary CMS lock-in</td>
                <td className="p-4 text-slate-500">Incomplete repository handover</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
