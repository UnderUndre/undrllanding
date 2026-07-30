"use client";

import { useLang } from "@/context/lang-context";

export default function FeaturesGrid() {
  const { t } = useLang();

  const features = [
    {
      icon: "🎨",
      title: "Кастомный брендинг и лендинги",
      description:
        "Каждому маркетплейсу нужен уникальный стиль. Мы разрабатываем Next.js 15 лендинг под ваш бренд без шаблонной штамповки. Все уплаченные за дизайн деньги возвращаются скидками!",
    },
    {
      icon: "🌐",
      title: t("hub_title"),
      description: t("hub_desc"),
    },
    {
      icon: "⚡",
      title: "Мощный e-commerce (Medusa 2.0)",
      description:
        "Изолированная база данных Postgres, Redis-кэширование, управление каталогом, вариациями товаров и автоматическое списывание остатков.",
    },
    {
      icon: "💳",
      title: "Фиат (Paddle / Stripe) + Крипта (SHKeeper)",
      description:
        "Готовый прием банковских карт через Paddle MoR / Stripe и прямые non-custodial крипто-платежи через SHKeeper (BTC, ETH, USDT, TON).",
    },
    {
      icon: "💸",
      title: "Встроенная реферальная программа",
      description:
        "Привлекайте новые маркетплейсы: покупатели получают скидку на саппорт и подписку, а внешние рефералы — прямые выплаты в USDT/крипте.",
    },
    {
      icon: "📲",
      title: "Telegram Mini App интеграция",
      description:
        "Ваш маркетплейс мгновенно открывается прямо внутри Telegram. Покупатели оформляют заказ без лишних переходов в браузер.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            {t("features_tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            {t("features_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mt-3">
            {t("features_sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-400 dark:hover:border-slate-700 transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
