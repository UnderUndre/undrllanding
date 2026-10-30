"use client";

import { useLang } from "@/context/lang-context";
import { getActiveProjectConfig } from "@/lib/project-config";
import { Language } from "@/lib/i18n";

// Statutory Terms of Service (spec 003 FR-007). Escrow/warranty clauses are
// interpolated from overridable `config.legal` fields — White-Label resellers
// MUST replace defaults with their own commercial terms before production.

export default function TermsPage() {
  const { lang } = useLang();
  const config = getActiveProjectConfig();
  const legal = config.legal;

  const entityName = legal?.entityName ?? config.name;
  const jurisdiction = legal?.jurisdiction ?? "";
  const escrowProvider =
    legal?.escrowProvider ?? "Upwork Direct Contracts (5% fee, 0% client fee)";
  const warrantyDays = legal?.warrantyDays ?? 7;

  const missing = !legal?.escrowProvider;

  const content = {
    ru: {
      title: "Условия обслуживания",
      updated: "Дата последнего обновления: 30.10.2026",
      intro: `Настоящие условия регулируют оказание продуктовых инженерных услуг ${entityName} (классификация: ${jurisdiction || "уточняется"}).`,
      scope: "1. Фиксированный скоуп",
      scopeBody:
        "Каждое оказание услуги имеет строго фиксированный объём (scope), согласованный письменно до старта. Работы за пределами согласованного объёма оцениваются отдельно и не включаются в фиксированную цену.",
      escrow: "2. Эскроу-защита платежей",
      escrowBody: `Платежи проводятся через стороннее эскроу-решение: ${escrowProvider}. Средства замораживаются эскроу до приёмки этапа; оплата releasing после вашего подтверждения результата.`,
      ip: "3. 100% отчуждение прав",
      ipBody:
        "После релиза этапа (milestone release) заказчик получает 100% исключительных имущественных прав на код и артефакты этапа, включая полный Git-репозиторий. Подрядчик не удерживает лицензий, бэкдоров или отложенных прав.",
      warranty: "4. Гарантийный период",
      warrantyBody: `На переданные артефакты действует ${warrantyDays}-дневная гарантия на исправление дефектов (SLA P1/P2: критические — в течение 24 часов, значимые — в течение 72 часов). Гарантия не покрывает изменение требований.`,
      liability: "5. Ограничение ответственности",
      liabilityBody:
        "Ответственность подрядчика ограничена суммой фактически полученных гонораров за предшествующие 30 дней. Упущенная выгода возмещению не подлежит.",
      independence: "6. Статус сторон",
      independenceBody:
        "Стороны действуют как независимые подрядчики. Подрядчик самостоятельно определяет способ выполнения работ в рамках согласованного скоупа.",
    },
    en: {
      title: "Terms of Service",
      updated: "Last updated: 2026-10-30",
      intro: `These terms govern productized engineering services provided by ${entityName} (classification: ${jurisdiction || "TBD"}).`,
      scope: "1. Fixed scope",
      scopeBody:
        "Every engagement has a strictly fixed scope agreed in writing before kickoff. Work beyond the agreed scope is estimated separately and is not included in the fixed price.",
      escrow: "2. Escrow-protected payments",
      escrowBody: `Payments run through a third-party escrow arrangement: ${escrowProvider}. Funds are held in escrow until milestone acceptance; release happens after your confirmation of the deliverable.`,
      ip: "3. 100% IP transfer",
      ipBody:
        "Upon milestone release the client receives 100% exclusive intellectual property rights to the stage's code and artifacts, including the complete Git repository. The contractor retains no licenses, backdoors, or deferred rights.",
      warranty: "4. Warranty period",
      warrantyBody: `Delivered artifacts carry a ${warrantyDays}-day bugfix warranty (P1/P2 SLA: critical — within 24 hours, significant — within 72 hours). The warranty does not cover changed requirements.`,
      liability: "5. Limitation of liability",
      liabilityBody:
        "The contractor's liability is capped at the fees actually received in the preceding 30 days. Lost profits are not recoverable.",
      independence: "6. Independent parties",
      independenceBody:
        "The parties act as independent contractors. The contractor determines the method of performance within the agreed scope.",
    },
  } as const;

  const c = content[lang as Language];

  return (
    <main className="bg-[#080808] text-purple-50 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-sm leading-relaxed space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{c.title}</h1>
          <p className="text-purple-200/60 text-xs">{c.updated}</p>
        </header>

        {missing && (
          <p className="p-3 bg-yellow-950/50 border border-yellow-800/50 rounded-lg text-xs text-yellow-300">
            PLACEHOLDER: клаузулы эскроу/гарантии взяты из дефолтов шаблона — замените блок `legal` в
            projects/&lt;slug&gt;/brand.ts под свои коммерческие условия перед production /
            Escrow/warranty clauses fall back to template defaults — replace the `legal` block in
            projects/&lt;slug&gt;/brand.ts with your own commercial terms before production.
          </p>
        )}

        <p className="text-purple-100/80">{c.intro}</p>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.scope}</h2>
          <p className="text-purple-100/80">{c.scopeBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.escrow}</h2>
          <p className="text-purple-100/80">{c.escrowBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.ip}</h2>
          <p className="text-purple-100/80">{c.ipBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.warranty}</h2>
          <p className="text-purple-100/80">{c.warrantyBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.liability}</h2>
          <p className="text-purple-100/80">{c.liabilityBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.independence}</h2>
          <p className="text-purple-100/80">{c.independenceBody}</p>
        </section>
      </article>
    </main>
  );
}
