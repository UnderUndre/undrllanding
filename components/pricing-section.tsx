"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";
import BentoGlowCard from "./bento-glow-card";

export default function PricingSection() {
  const { t } = useLang();
  const [referralsCount, setReferralsCount] = useState(2);

  const estimatedPassiveIncome = (referralsCount * 5.8).toFixed(2);

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/80 transition-colors relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            {t("pricing_tag")}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            {t("pricing_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-3">
            {t("pricing_sub")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Alpha Card */}
          <BentoGlowCard glowColor="rgba(249, 115, 22, 0.45)" className="flex flex-col justify-between border-2 border-orange-500">
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
                  {t("card_alpha_tag")}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500 text-slate-950 font-bold text-[10px] uppercase">
                  {t("card_alpha_badge")}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {t("card_alpha_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-2">
                {t("card_alpha_desc")}
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {t("card_alpha_price")}
                </span>
                <span className="text-slate-500 text-sm">{t("card_alpha_period")}</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 1 Marketplace Instance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Medusa 2.0 + Postgres + Redis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Paddle/Stripe + SHKeeper Crypto
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Automated SSL + TG Mini App
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-orange-500 hover:bg-orange-400 py-3.5 px-4 text-xs font-bold text-slate-950 text-center transition-all shadow-md shadow-orange-500/20"
              >
                {t("card_alpha_btn")}
              </a>
            </div>
          </BentoGlowCard>

          {/* Starter Card */}
          <BentoGlowCard className="flex flex-col justify-between">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t("card_starter_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {t("card_starter_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-2">
                {t("card_starter_desc")}
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {t("card_starter_price")}
                </span>
                <span className="text-slate-500 text-sm">{t("card_starter_period")}</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 0.0% GMV fee
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 1-Click Automated PaaS deploy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Custom Next.js 15 theme
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> SHKeeper non-custodial crypto
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white py-3.5 px-4 text-xs font-bold text-center transition-all"
              >
                {t("card_starter_btn")}
              </a>
            </div>
          </BentoGlowCard>

          {/* Rebate Card */}
          <BentoGlowCard glowColor="rgba(16, 185, 129, 0.4)" className="flex flex-col justify-between">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {t("card_rebate_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {t("card_rebate_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-2">
                {t("card_rebate_desc")}
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {t("card_rebate_price")}
                </span>
                <span className="text-slate-500 text-sm">{t("card_rebate_period")}</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Custom design layout under your brand
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> 100% of setup fee credited back as discounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> $25/mo sub discount for 6 months
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white py-3.5 px-4 text-xs font-bold text-center transition-all"
              >
                {t("card_rebate_btn")}
              </a>
            </div>
          </BentoGlowCard>
        </div>

        {/* Affiliate Section */}
        <BentoGlowCard glowColor="rgba(249, 115, 22, 0.35)">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                {t("revshare_tag")}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t("revshare_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("revshare_sub")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">
                    {t("revshare_client_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("revshare_client_desc")}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                  <div className="text-orange-500 dark:text-orange-400 font-bold text-sm mb-1">
                    {t("revshare_affiliate_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("revshare_affiliate_desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 space-y-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("revshare_calc_title")}
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    <span>{t("revshare_calc_label")}</span>
                    <span className="text-orange-500 dark:text-orange-400 text-sm font-extrabold">
                      {referralsCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={referralsCount}
                    onChange={(e) => setReferralsCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                  <div className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("revshare_calc_result")}
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    ${estimatedPassiveIncome}{" "}
                    <span className="text-xs font-normal text-slate-500">USDT / mo</span>
                  </div>
                  {referralsCount >= 2 && (
                    <div className="text-[11px] text-amber-600 dark:text-amber-300 mt-1 font-semibold">
                      {t("revshare_free_badge")}
                    </div>
                  )}
                </div>

                <a
                  href="#waitlist"
                  className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 px-4 text-xs font-bold text-slate-950 text-center shadow-md shadow-emerald-500/20"
                >
                  {t("revshare_calc_btn")}
                </a>
              </div>
            </div>
          </div>
        </BentoGlowCard>
      </div>
    </section>
  );
}
