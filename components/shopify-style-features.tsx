"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";
import BentoGlowCard from "./bento-glow-card";

export default function ShopifyStyleFeatures() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("storefront");

  const tabs = [
    {
      id: "storefront",
      badge: t("tab_storefront"),
      title: "Next.js 15 + @underundre/undesign",
      subtitle: "Full design control with 100/100 Lighthouse performance",
      bullets: [
        "React 19 Server Components",
        "Light & Dark themes (@underundre/undesign)",
        "Mobile & Telegram Mini App ready",
      ],
      content: (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white text-xs">
                U
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                CyberBrand Store
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                Catalog
              </span>
              <span className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold border border-orange-500/30">
                Cart (0)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
              Flagship Collection
            </span>
            <h5 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Custom Storefront Theme
            </h5>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                <div className="h-14 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl mb-2">
                  💎
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Product #1</div>
                <div className="text-xs text-orange-500 font-extrabold mt-1">$149.00</div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                <div className="h-14 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl mb-2">
                  ⚡
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">VIP Access</div>
                <div className="text-xs text-orange-500 font-extrabold mt-1">$49 / mo</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "medusa",
      badge: t("tab_medusa"),
      title: "Medusa 2.0 + PostgreSQL",
      subtitle: "Autonomous e-commerce engine with zero transaction fee",
      bullets: [
        "Isolated Postgres database schema per merchant",
        "Redis worker & inventory synchronization",
        "0.0% platform take-rate",
      ],
      content: (
        <div className="space-y-3 font-mono text-xs text-left">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">PostgreSQL Status:</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">🟢 Isolated DB</span>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Redis Cache Worker:</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">⚡ 0ms Latency</span>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 space-y-1">
            <div className="text-slate-400 text-[10px]">API Endpoint Status:</div>
            <div className="text-amber-500">POST /store/carts/cart_01H9... 200 OK</div>
            <div className="text-emerald-500">POST /store/orders/order_01H9... 201 Created</div>
          </div>
        </div>
      ),
    },
    {
      id: "payments",
      badge: t("tab_payments"),
      title: "Paddle / Stripe + SHKeeper Crypto",
      subtitle: "Accept fiat cards & non-custodial crypto payments globally",
      bullets: [
        "Paddle Billing MoR / Stripe for global card processing",
        "SHKeeper crypto node (BTC, ETH, USDT, TON)",
        "Direct payouts to your wallets",
      ],
      content: (
        <div className="space-y-3 text-left">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Paddle / Stripe</div>
                <div className="text-[10px] text-slate-500">Cards & Apple Pay</div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-500">Active</span>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🪙</span>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">SHKeeper Crypto</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  USDT, TON, BTC, ETH
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-500">Non-Custodial</span>
          </div>
        </div>
      ),
    },
    {
      id: "telegram",
      badge: t("tab_telegram"),
      title: "Telegram Mini App",
      subtitle: "Sell directly inside Telegram chats in 0.2s",
      bullets: [
        "Native Telegram WebApp SDK",
        "1-Click initData authentication",
        "Merchant order notification bot",
      ],
      content: (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">✈️</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Telegram Store</span>
            </div>
            <span className="text-[10px] bg-sky-500/20 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded font-bold">
              Mini App
            </span>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-3 text-xs space-y-2 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white">📦 Order #TG-4819</div>
            <div className="flex justify-between items-center text-emerald-500 font-bold">
              <span>Paid via SHKeeper:</span>
              <span>45.00 USDT</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            {t("features_tag")}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            {t("features_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mt-3">
            {t("features_sub")}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white dark:text-slate-950 shadow-lg shadow-orange-500/20 scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.badge}
              </button>
            );
          })}
        </div>

        {/* Bento Glow Card Container */}
        <BentoGlowCard glowColor="rgba(249, 115, 22, 0.3)">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
                {currentTab.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentTab.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm md:text-base">
                {currentTab.subtitle}
              </p>

              <ul className="space-y-2.5 pt-2 text-xs md:text-sm text-slate-700 dark:text-slate-200">
                {currentTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">{currentTab.content}</div>
          </div>
        </BentoGlowCard>
      </div>
    </section>
  );
}
