"use client";

import React from "react";
import { useLang } from "@/context/lang-context";

/**
 * Product 3 (post-Sprint-B): Template Fork & Custom Development Service Line.
 * Source of truth: undreseller-business-plan.md v18.9 §2 Продукт 3.
 * Ladder Protection Law: a fork is NEVER sold below Sprint B ($4,900).
 */
export default function ForkServiceLine() {
  const { lang } = useLang();
  const isRu = lang === "ru";

  return (
    <section id="fork-care" className="py-20 bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {isRu ? "Для клиентов Спринта Б, переросших базовый шаблон" : "For Sprint B Clients Who Outgrow the Template"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {isRu ? "Fork & Care: Кастомная разработка на базе Спринта Б" : "Fork & Care: Custom Development on Your Sprint B Base"}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            {isRu
              ? "Нишевые воркфлоу, нестандартные банки, дополнительные языки, интеграции. Кастомный код изолирован в адаптерах — ядро остаётся чистым, обновления шаблона никогда не приведут к конфликтам в 450 файлах."
              : "Niche workflows, non-standard payment gateways, extra languages, integrations. Your custom code lives in isolated adapters — the core template stays untouched, so template upgrades never turn into a 450-file merge conflict."}
          </p>
        </div>

        {/* A. Fork Deployment Packages */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          {isRu ? "Шаг 1 — Развёртывание форка (разово)" : "Step 1 — Fork Deployment (one-time)"}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-14">
          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                FORK FOUNDATION
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {isRu ? "Чистый деплой Спринта Б" : "Clean Sprint B Deploy"}
              </h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$4,900</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-1 font-mono">
                  {isRu ? "Hetzner VPS · Docker · Traefik · Postgres · брендинг · боты — ноль кастомного кода" : "Hetzner VPS · Docker · Traefik · Postgres · branding · bots · crypto/Stars — zero custom code"}
                </div>
              </div>
              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300">
                <strong>{isRu ? "Обязательный Care:" : "Care required:"}</strong> {isRu ? "от $149/мес (Essential)." : "from $149/mo (Essential)."}
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-purple-900 hover:bg-purple-800 active:scale-[0.98] text-white font-semibold rounded-lg text-center transition-all text-sm"
            >
              {isRu ? "Запустить Fork Foundation →" : "Start Fork Foundation →"}
            </a>
          </div>

          <div className="p-8 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              {isRu ? "ХИТ — ЛОНЧ МЕНЮ" : "HERO — LAUNCH MENU"}
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-500/20">
                FORK TAILORED
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {isRu ? "Шаблон + до 25ч глубокой кастомизации" : "Template + 25h Deep Customization"}
              </h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$6,800</div>
                <div className="text-sm font-semibold text-orange-400 mt-1">
                  {isRu ? "+ Care Standard $349/мес" : "+ Care Standard $349/mo"}
                </div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">
                  {isRu
                    ? "Адаптация полей бронирования, настройка под нишу, +1 интеграция. Годовой якорь ≈ $10,988 — готовая система уровня Enterprise менее чем за 15% зарплаты одного мидл-разработчика."
                    : "Booking field adaptation, niche workflow tuning, +1 integration. First-year anchor ≈ $10,988 — an enterprise-grade production system for under 15% of one mid-level developer's salary."}
                </div>
              </div>
              <div className="p-3 bg-orange-950/20 border border-orange-800/30 rounded-lg text-xs text-orange-300">
                <strong>{isRu ? "Состав Day-1:" : "Day-1 launch menu:"}</strong> Fork Tailored + Care Standard + Feature Pack $990.
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg text-center transition-all shadow-lg shadow-orange-950/40 text-sm"
            >
              {isRu ? "Запустить Fork Tailored →" : "Start Fork Tailored →"}
            </a>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                FORK ENTERPRISE-LITE
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {isRu ? "Сложные сценарии" : "Complex Scenarios"}
              </h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  $8,900<span className="text-base font-normal text-slate-500 dark:text-purple-300/60">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-1 font-mono">
                  {isRu ? "Специфические платёжные шлюзы, интеграция со складской CRM, кастомные отчёты." : "Specific payment gateways, inventory CRM integration, custom reporting."}
                </div>
              </div>
              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300">
                <strong>{isRu ? "Точный расчёт после платного аудита" : "Scoped after a paid audit"}</strong> — {isRu ? "фиксированный чек до старта." : "fixed price before start, never open-ended."}
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-purple-900 hover:bg-purple-800 active:scale-[0.98] text-white font-semibold rounded-lg text-center transition-all text-sm"
            >
              {isRu ? "Оценить Fork Enterprise-Lite →" : "Scope Fork Enterprise-Lite →"}
            </a>
          </div>
        </div>

        {/* B. Care Retainers */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          {isRu ? "Шаг 2 — Ежемесячная поддержка Care (обязательно 3–6 мес)" : "Step 2 — Monthly Care (required 3–6 months with any fork)"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="p-6 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/40">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">Care Essential</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
              $149<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">{isRu ? "/мес" : "/mo"}</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "Хостинг VPS, ежедневные бэкапы Restic S3, мониторинг аптайма" : "VPS hosting, daily Restic S3 backups, uptime monitoring"}</li>
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "Патчи безопасности · SLA 24ч" : "Security patches · SLA 24h"}</li>
              <li className="flex items-start gap-1.5 text-slate-500"><span className="font-bold text-slate-400">—</span> {isRu ? "Часы доработок через Change Packs" : "Change hours billed via Change Packs"}</li>
            </ul>
          </div>
          <div className="p-6 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-xl border border-brand-orange">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400">{isRu ? "Care Standard (Выбор бюро)" : "Care Standard (Recommended)"}</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
              $349<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">{isRu ? "/мес" : "/mo"}</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "Всё из Essential · SLA 8ч" : "Everything in Essential · SLA 8h"}</li>
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "2 часа доработок/консультаций ежемесячно (сгораемые)" : "2 change/consultancy hours monthly (use-it-or-lose-it)"}</li>
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "Бесплатные минорные обновления безопасности ядра" : "Free minor template upgrades (security & core fixes)"}</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/30 opacity-75">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">Care Priority</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
              $690<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">{isRu ? "/мес" : "/mo"}</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "Всё из Standard · SLA 4ч · приоритетная очередь" : "Everything in Standard · SLA 4h · priority queue"}</li>
              <li className="flex items-start gap-1.5"><span className="text-[#69a700] font-bold">✓</span> {isRu ? "5 часов доработок ежемесячно" : "5 change hours monthly"}</li>
              <li className="flex items-start gap-1.5 text-slate-500"><span className="font-bold text-slate-400">—</span> {isRu ? "Отложено — откроется после набора группы Standard" : "Deferred — opens after the Care Standard batch"}</li>
            </ul>
          </div>
        </div>

        {/* C. Change Request Packages */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          {isRu ? "Шаг 3 — Пакеты доработок Change Packs (результат вместо часов)" : "Step 3 — Change Packs (results, not hours)"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {[
            {
              name: "Micro-Change",
              price: "$490",
              what: isRu ? "1–2 поля, логика нотификаций, пиксель аналитики" : "1–2 fields, notification logic, analytics pixel",
            },
            {
              name: isRu ? "Feature Pack (Популярный)" : "Feature Pack (Popular)",
              price: "$990",
              what: isRu ? "Кастомный отчёт, webhook-шлюз, промокоды" : "Custom report, webhook gateway, promo codes",
            },
            {
              name: "Mini-Sprint",
              price: "$1,990",
              what: isRu ? "Новый модуль, переработка схемы БД" : "New module, DB schema rework",
            },
            {
              name: "Overage",
              price: "$100/h",
              what: isRu ? "Шаг 30 минут, предоплата блоками по 5ч" : "30-min steps, prepaid in 5h blocks",
            },
          ].map((c) => (
            <div key={c.name} className="p-5 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/40">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300">{c.name}</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{c.price}</div>
              <div className="text-[11px] text-slate-600 dark:text-purple-200/70 mt-2">{c.what}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-emerald-300">
            <strong>{isRu ? "Защита лестницы:" : "Ladder Protection:"}</strong>{" "}
            {isRu
              ? "форк никогда не продаётся дешевле Спринта Б ($4,900) и без базовой лицензии. Никаких «Lite» форков и revenue-share."
              : "a fork is never sold below Sprint B ($4,900) and never without a Sprint B base license. No \"Lite\" forks, no revenue-share."}
          </div>
          <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg text-purple-300">
            <strong>{isRu ? "Политика апгрейдов:" : "Upgrade Policy:"}</strong>{" "}
            {isRu
              ? "кастомный код живёт только в адаптерах extensions/ — модификация ядра запрещена, поэтому минорные обновления безопасны."
              : "custom code lives only in extensions/ adapters — core modifications are off-limits, so minor upgrades stay free for Care Standard/Priority."}
          </div>
          <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg text-purple-300">
            <strong>{isRu ? "Разделение прав (Split IP):" : "Split IP:"}</strong>{" "}
            {isRu
              ? "ядро шаблона остаётся за бюро (бессрочная лицензия вам); кастомные модули — ваши. Выход в любой момент: дамп PostgreSQL + compose архив."
              : "the template core stays ours (perpetual license to you); your custom modules are yours. Exit anytime: PostgreSQL dump + compose archive."}
          </div>
        </div>
      </div>
    </section>
  );
}
