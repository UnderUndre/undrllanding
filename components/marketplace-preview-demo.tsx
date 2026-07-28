"use client";

import { useState } from "react";

const THEME_OPTIONS = [
  { id: "amber", name: "Amber & Dark", primary: "bg-amber-500", border: "border-amber-500", text: "text-amber-400", bg: "bg-slate-950" },
  { id: "emerald", name: "Emerald Cyber", primary: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-400", bg: "bg-emerald-950/40" },
  { id: "orange", name: "Solar Orange", primary: "bg-orange-500", border: "border-orange-500", text: "text-orange-400", bg: "bg-orange-950/40" },
  { id: "purple", name: "Royal Velvet", primary: "bg-indigo-500", border: "border-indigo-500", text: "text-indigo-400", bg: "bg-slate-900" },
];

export default function MarketplacePreviewDemo() {
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
    <div className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            ⚡ Интерактивный конструктор
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Создайте ваш уникальный маркетплейс за 10 секунд
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          Движок: <span className="font-semibold text-white">Medusa 2.0 + SHKeeper + Undevops PaaS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Панель настройки */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Название маркетплейса
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""));
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none"
              placeholder="Мой Маркетплейс"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Доменное имя
            </label>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white">
              <span className="text-slate-200 font-semibold">{domain || "store"}</span>
              <span className="text-slate-500">.undrlla.shop</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Цветовая тема брендинга
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THEME_OPTIONS.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedTheme.id === theme.id
                      ? "border-orange-500 bg-slate-800 text-white shadow-md"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
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
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3.5 px-4 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {deploying ? (
                <>
                  <span className="animate-spin text-orange-400">⚙️</span>
                  <span>Разворачиваем контейнеры Medusa + SHKeeper + TLS...</span>
                </>
              ) : (
                <>
                  <span>⚡ Симулировать 1-Click Деплой</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Живое интерактивное превью создаваемого маркетплейса */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl">
            {/* Имитация окна браузера */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-900 text-[11px] text-emerald-400 border border-slate-800">
                🔒 https://{domain || "store"}.undrlla.shop
              </div>
              <div className="text-[10px] text-slate-500">Live Preview</div>
            </div>

            {/* Контент превью магазина */}
            <div className={`p-6 min-h-[320px] transition-all ${selectedTheme.bg}`}>
              {/* Шапка магазина */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg ${selectedTheme.primary} flex items-center justify-center font-bold text-slate-950`}>
                    {(storeName || "M")[0]}
                  </div>
                  <span className="font-bold text-white text-base tracking-tight">{storeName || "Мой Маркетплейс"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-300 hidden sm:inline">Каталог</span>
                  <span className="text-slate-300 hidden sm:inline">О нас</span>
                  <span className={`px-3 py-1 rounded-lg ${selectedTheme.primary} text-slate-950 font-bold`}>
                    🛒 Корзина (0)
                  </span>
                </div>
              </div>

              {/* Баннер первого экрана магазина */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-6">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${selectedTheme.text}`}>
                  Официальный магазин
                </span>
                <h4 className="text-xl font-extrabold text-white mt-1">
                  Эксклюзивные товары {storeName}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Автономный каталог на Medusa 2.0 с доставкой и приёмом Paddle/Stripe + SHKeeper (крипта).
                </p>
              </div>

              {/* Карточки товаров */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="h-24 rounded-lg bg-slate-900 flex items-center justify-center text-2xl mb-2">
                    📦
                  </div>
                  <div className="text-xs font-semibold text-white">Флагманский Товар A</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${selectedTheme.text}`}>$99.00</span>
                    <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded">
                      + В корзину
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="h-24 rounded-lg bg-slate-900 flex items-center justify-center text-2xl mb-2">
                    ⚡
                  </div>
                  <div className="text-xs font-semibold text-white">Премиум Подписка</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${selectedTheme.text}`}>$49/mo</span>
                    <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded">
                      + В корзину
                    </button>
                  </div>
                </div>
              </div>

              {deployed && (
                <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/80 p-3 text-center text-xs text-emerald-300 animate-fadeIn">
                  🚀 Контейнер Medusa + Postgres + SHKeeper успешно развернут на PaaS Undevops!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
