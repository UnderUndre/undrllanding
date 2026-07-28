"use client";

import { useState } from "react";

export default function PricingSection() {
  const [referralsCount, setReferralsCount] = useState(2);

  const estimatedPassiveIncome = (referralsCount * 5.8).toFixed(2);

  return (
    <section id="pricing" className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
      {/* Свечение фонового градиента */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-orange-600/10 via-purple-600/10 to-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            Прозрачная экономика без комиссий с продаж
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            Простые тарифы. 0% комиссии с вашего оборота.
          </h2>
          <p className="text-slate-300 text-base md:text-lg mt-3">
            В отличие от других платформ, мы не берём налог с ваших продаж. Вы платите только за реальный PaaS-хостинг.
          </p>
        </div>

        {/* Сетка карточек тарифов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Альфа-Набор */}
          <div className="rounded-3xl border-2 border-orange-500/80 bg-slate-900/90 p-8 backdrop-blur-xl shadow-2xl shadow-orange-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
              Бесплатно
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Альфа-Когорта</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Первые 50 мест</h3>
              <p className="text-slate-400 text-xs mt-2">Для первых создателей за развернутый отзыв и кейс.</p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-slate-400 text-sm"> / мес на 6 месяцев</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> 1 Автономный маркетплейс
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Движок Medusa 2.0 + Postgres + Redis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Приём карт (Paddle/Stripe) + Крипта (SHKeeper)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Бесплатный SSL-домен и Telegram Mini App
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Персональный саппорт от инженеров
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-orange-500 hover:bg-orange-400 py-3.5 px-4 text-xs font-bold text-slate-950 text-center transition-all shadow-md shadow-orange-500/20"
              >
                🔥 Занять 1 из 50 мест
              </a>
            </div>
          </div>

          {/* Тариф Стартер */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Публичный запуск</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Starter Lite</h3>
              <p className="text-slate-400 text-xs mt-2">Идеально для запуска своего первого магазина.</p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-slate-400 text-sm"> / мес</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> 0.0% комиссия с ваших продаж
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Автоматический разворот в 1 клик
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Кастомная тема и Next.js 15 лендинг
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Прямые крипто-платежи через SHKeeper
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Привязка кастомного доменного имени
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3.5 px-4 text-xs font-bold text-white text-center transition-all"
              >
                Вступить в Waitlist
              </a>
            </div>
          </div>

          {/* Модель Rebate Setup (Кастомизация бесплатно) */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Rebate Оффер</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Кастомизация под ключ</h3>
              <p className="text-slate-400 text-xs mt-2">Индивидуальный дизайн и сборка с 100% кешбэком.</p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$150</span>
                <span className="text-slate-400 text-sm"> разово (100% кэшбэк)</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Уникальный дизайн верстки под ваш бренд
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> 100% уплаченной суммы возвращается скидками
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> $25/мес скидки на подписку в течение 6 месяцев
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Разработка по ставке $25/час по факту БЕСПЛАТНО
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#waitlist"
                className="block w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3.5 px-4 text-xs font-bold text-white text-center transition-all"
              >
                Заказать кастомизацию
              </a>
            </div>
          </div>
        </div>

        {/* Секция Партнерской и Реферальной Программы */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                💸 Реферальная программа & RevShare
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Привлекайте маркетплейсы — получайте 20% RevShare в USDT или бесплатный сайт
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Зарабатывайте пожизненную комиссию за каждого привлечённого создателя магазина или полностью обнулите стоимость своего хостинга!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-emerald-400 font-bold text-sm mb-1">🎁 Для владельцев сайтов</div>
                  <p className="text-slate-400 text-xs">
                    Приведи 2 друзей = <strong className="text-white">Бесплатный хостинг навсегда ($0/мес)</strong>. 1 друг = -50% скидка на саппорт.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-orange-400 font-bold text-sm mb-1">🪙 Для аффилиатов и блогеров</div>
                  <p className="text-slate-400 text-xs">
                    <strong className="text-white">20% Пожизненный RevShare</strong> от всех платежей подписки. Прямые выплаты в USDT (SHKeeper) от $50.
                  </p>
                </div>
              </div>
            </div>

            {/* Интерактивный калькулятор дохода реферала */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Калькулятор пассивного дохода
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-200 mb-2">
                    <span>Привлечено маркетплейсов:</span>
                    <span className="text-orange-400 text-sm font-extrabold">{referralsCount} сайтов</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={referralsCount}
                    onChange={(e) => setReferralsCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-center">
                  <div className="text-slate-400 text-xs">Ваш ежемесячный RevShare в крипте:</div>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                    ${estimatedPassiveIncome} <span className="text-xs font-normal text-slate-300">USDT / мес</span>
                  </div>
                  {referralsCount >= 2 && (
                    <div className="text-[11px] text-amber-300 mt-1 font-semibold">
                      🎉 Ваш собственный маркетплейс обслуживается БЕСПЛАТНО!
                    </div>
                  )}
                </div>

                <a
                  href="#waitlist"
                  className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 px-4 text-xs font-bold text-slate-950 text-center shadow-md shadow-emerald-500/20"
                >
                  Стать реферальным партнёром
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
