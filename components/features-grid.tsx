export default function FeaturesGrid() {
  const features = [
    {
      icon: "🎨",
      title: "Кастомный брендинг и лендинги",
      description:
        "Ваш маркетплейс получает уникальную цветовую гамму, логотип и Next.js 15 лендинг без шаблонов из инкубатора. Каждая деталь подстраивается под бренд.",
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
      icon: "🌐",
      title: "Собственный домен в 1 клик",
      description:
        "Привязывайте ваш уникальный домен `shop.mybrand.com`. Автоматический провижининг через undevops с выдачей SSL/TLS сертификатов.",
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
    <section className="py-20 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            Фундамент вашего бизнеса
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2">
            Всё для запуска прибыльного маркетплейса за пару минут
          </h2>
          <p className="text-slate-400 text-base mt-3">
            Мы объединили лучшие технологии электронной коммерции в один автономный стекированный движок.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-700 hover:bg-slate-900/90 transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
