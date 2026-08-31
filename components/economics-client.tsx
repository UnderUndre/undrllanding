"use client";

import Link from "next/link";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { LangProvider, useLang } from "@/context/lang-context";
import BentoGlowCard from "@/components/bento-glow-card";

function EconomicsContent() {
  const { t } = useLang();

  return (
    <main className="bg-slate-50 dark:bg-[#080808] text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-20 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            {t("breadcrumb_home")}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">
            {t("breadcrumb_econ")}
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            {t("econ_tag")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {t("econ_title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            {t("econ_sub")}
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="mb-12 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 backdrop-blur-xl text-left">
          <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {t("econ_guarantee_title")}
          </h3>
          <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed">
            {t("econ_guarantee_desc")}
          </p>
        </div>

        {/* Section Cards */}
        <div className="space-y-10">
          {/* Block 1: Alpha 50 spots */}
          <BentoGlowCard glowColor="rgba(249, 115, 22, 0.4)">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                {t("econ_b1_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_b1_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b1_desc")}
              </p>
              <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                {t("econ_b1_cond")}
              </div>
            </div>
          </BentoGlowCard>

          {/* Block 2: Zero GMV Tax */}
          <BentoGlowCard glowColor="rgba(16, 185, 129, 0.35)">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {t("econ_b2_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_b2_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b2_desc1")}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b2_desc2")}
              </p>
            </div>
          </BentoGlowCard>

          {/* Block 3: Rebate Setup ($150 100% cashback) */}
          <BentoGlowCard glowColor="rgba(245, 158, 11, 0.35)">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {t("econ_b3_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_b3_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b3_desc1")}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b3_desc2")}
              </p>
            </div>
          </BentoGlowCard>

          {/* Block 4: Domain Options & Policy */}
          <BentoGlowCard glowColor="rgba(14, 165, 233, 0.35)">
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                {t("econ_domain_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_domain_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_domain_desc")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                  <div className="font-bold text-xs text-sky-500 mb-1">
                    {t("econ_domain_opt1_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("econ_domain_opt1_desc")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                  <div className="font-bold text-xs text-emerald-500 mb-1">
                    {t("econ_domain_opt2_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("econ_domain_opt2_desc")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                  <div className="font-bold text-xs text-amber-500 mb-1">
                    {t("econ_domain_opt3_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("econ_domain_opt3_desc")}
                  </p>
                </div>
              </div>
            </div>
          </BentoGlowCard>

          {/* Block 5: Undrlla Hub Streaming */}
          <BentoGlowCard glowColor="rgba(168, 85, 247, 0.35)">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                {t("econ_b4_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_b4_title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b4_desc1")}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t("econ_b4_desc2")}
              </p>
            </div>
          </BentoGlowCard>

          {/* Block 6: RevShare & Affiliate */}
          <BentoGlowCard glowColor="rgba(99, 102, 241, 0.35)">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                {t("econ_b5_tag")}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("econ_b5_title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                  <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {t("revshare_client_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("revshare_client_desc")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                  <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {t("revshare_affiliate_title")}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {t("revshare_affiliate_desc")}
                  </p>
                </div>
              </div>
            </div>
          </BentoGlowCard>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-8 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
          >
            {t("econ_btn_claim")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function EconomicsClient() {
  return (
    <LangProvider>
      <Header />
      <EconomicsContent />
      <Footer />
    </LangProvider>
  );
}
