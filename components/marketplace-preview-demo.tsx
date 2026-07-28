"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";

const THEME_OPTIONS = [
  { id: "amber", name: "Amber & Dark", primary: "bg-amber-500", border: "border-amber-500", text: "text-amber-500 dark:text-amber-400", bg: "bg-slate-50 dark:bg-slate-950" },
  { id: "emerald", name: "Emerald Cyber", primary: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/50 dark:bg-emerald-950/40" },
  { id: "orange", name: "Solar Orange", primary: "bg-orange-500", border: "border-orange-500", text: "text-orange-500 dark:text-orange-400", bg: "bg-orange-50/50 dark:bg-orange-950/40" },
  { id: "purple", name: "Royal Velvet", primary: "bg-indigo-500", border: "border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-slate-100 dark:bg-slate-900" },
];

export default function MarketplacePreviewDemo() {
  const { t } = useLang();

  const [storeName, setStoreName] = useState("CyberGear");
  const [domain, setDomain] = useState("cybergear");
  const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0]);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleSimulateDeploy = () => {
    setDeploying(true);
    setDeployed(false);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 1800);
  };

  return (
    <div
      data-aos="fade-up"
      className="w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            {t("demo_tag")}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t("demo_title")}
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          {t("demo_engine")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t("demo_name_label")}
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""));
              }}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none"
              placeholder="My Store"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t("demo_domain_label")}
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white">
              <span className="text-slate-900 dark:text-slate-200 font-semibold">{domain || "store"}</span>
              <span className="text-slate-400">.undrlla.shop</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t("demo_theme_label")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THEME_OPTIONS.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedTheme.id === theme.id
                      ? "border-orange-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className={`h-4 w-4 rounded-full ${theme.primary}`} />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSimulateDeploy}
              disabled={deploying}
              className="w-full rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white py-3.5 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {deploying ? (
                <>
                  <span className="animate-spin text-orange-400">⚙️</span>
                  <span>{t("demo_btn_deploying")}</span>
                </>
              ) : (
                <>
                  <span>{t("demo_btn_deploy")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Mockup */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-white dark:bg-slate-900 text-[11px] text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 font-mono">
                🔒 https://{domain || "store"}.undrlla.shop
              </div>
              <div className="text-[10px] text-slate-400">{t("demo_preview_live")}</div>
            </div>

            <div className={`p-6 min-h-[320px] transition-all ${selectedTheme.bg}`}>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg ${selectedTheme.primary} flex items-center justify-center font-bold text-white text-sm`}>
                    {(storeName || "M")[0]}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
                    {storeName || "My Store"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className={`px-3 py-1 rounded-lg ${selectedTheme.primary} text-white font-bold`}>
                    🛒 (0)
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 mb-6">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${selectedTheme.text}`}>
                  {t("demo_banner_tag")}
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t("demo_banner_title")} {storeName}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
                  {t("demo_banner_desc")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                  <div className="h-20 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-xl mb-2">
                    📦
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">{t("demo_prod_a")}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${selectedTheme.text}`}>$99.00</span>
                    <button className="text-[10px] bg-slate-800 text-white px-2 py-1 rounded">
                      {t("demo_add_cart")}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                  <div className="h-20 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-xl mb-2">
                    ⚡
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">{t("demo_prod_b")}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${selectedTheme.text}`}>$49/mo</span>
                    <button className="text-[10px] bg-slate-800 text-white px-2 py-1 rounded">
                      {t("demo_add_cart")}
                    </button>
                  </div>
                </div>
              </div>

              {deployed && (
                <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center text-xs text-emerald-600 dark:text-emerald-300">
                  {t("demo_deploy_success")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
