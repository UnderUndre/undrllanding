"use client";

import { useLang } from "@/context/lang-context";
import { getActiveProjectConfig } from "@/lib/project-config";
import { Language } from "@/lib/i18n";

// Statutory Privacy Policy (spec 003 FR-006): GDPR Art. 13 disclosure,
// operator identity interpolated from the active project's `legal` config.
// Missing fields render clearly marked placeholders — never silently empty legal text.

export default function PrivacyPage() {
  const { lang } = useLang();
  const config = getActiveProjectConfig();
  const legal = config.legal;

  const missing = (value?: string) => !value || value.includes("PLACEHOLDER");

  const contactEmail = legal?.contactEmail ?? "";
  const entityName = legal?.entityName ?? config.name;
  const jurisdiction = legal?.jurisdiction ?? "";
  const retentionMonths = legal?.retentionMonths ?? 12;

  const content = {
    ru: {
      title: "Политика конфиденциальности",
      updated: "Дата последнего обновления: 30.10.2026",
      controller: "1. Контролёр данных",
      controllerBody: `Оператором обработки персональных данных является ${entityName} (классификация деятельности: ${jurisdiction || "уточняется"}). Контакт для вопросов о конфиденциальности: ${contactEmail || "[ЗАПОЛНИТЬ EMAIL]"}.`,
      data: "2. Какие данные мы собираем",
      dataBody:
        "Через форму брифа (/api/lead) мы обрабатываем: рабочий email; контакт для связи (мессенджер, телефон — опционально); описание вашей задачи; произвольные метаданные формы (например, тип узкого места, размер команды). Мы не собираем платёжные данные и специальные категории персональных данных.",
      purpose: "3. Цели и правовое основание",
      purposeBody:
        "Данные используются исключительно для ответа на ваш запрос, подготовки коммерческого предложения по фиксированному скоупу и последующего исполнения договора. Правовое основание — легитимный интерес (ст. 6(1)(f) GDPR) на этапе B2B-коммуникации и исполнение договора (ст. 6(1)(b) GDPR) после его заключения.",
      retention: "4. Срок хранения",
      retentionBody: `Данные хранятся не дольше ${retentionMonths} месяцев с момента последней коммуникации, после чего удаляются, если с вами не заключён договор.`,
      rights: "5. Ваши права",
      rightsBody: `Вы имеете право на доступ, исправление, удаление (забвение), ограничение обработки и возражение против обработки. Для реализации любого из прав напишите на ${contactEmail || "[ЗАПОЛНИТЬ EMAIL]"} — ответим в течение 30 дней. Вы также вправе подать жалобу в надзорный орган по месту жительства.`,
      noAutomated: "6. Автоматизированные решения",
      noAutomatedBody:
        "Мы не принимаем юридически значимых решений на основе исключительно автоматизированной обработки ваших данных.",
      recipients: "7. Получатели данных",
      recipientsBody:
        "Данные передаются только сервисам доставки уведомлений, необходимым для обработки вашего запроса (мессенджер-уведомления и, при наличии, CRM-вебхук оператора). Данные не продаются и не передаются третьим лицам в маркетинговых целях.",
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: 2026-10-30",
      controller: "1. Data Controller",
      controllerBody: `The data controller is ${entityName} (activity classification: ${jurisdiction || "TBD"}). Contact for privacy matters: ${contactEmail || "[FILL IN EMAIL]"}.`,
      data: "2. What data we collect",
      dataBody:
        "Via the brief form (/api/lead) we process: your work email; a contact handle (messenger, phone — optional); your project description; arbitrary form metadata (e.g. bottleneck type, team size). We do not collect payment data or special categories of personal data.",
      purpose: "3. Purposes & lawful basis",
      purposeBody:
        "Data is used solely to respond to your inquiry, prepare a fixed-scope commercial proposal, and subsequently perform the contract. Lawful basis: legitimate interest (Art. 6(1)(f) GDPR) during B2B communication and contract performance (Art. 6(1)(b) GDPR) once concluded.",
      retention: "4. Retention",
      retentionBody: `Data is retained for no longer than ${retentionMonths} months from the last communication, then deleted unless a contract has been concluded with you.`,
      rights: "5. Your rights",
      rightsBody: `You have the right to access, rectification, erasure, restriction of processing and objection. To exercise any right, email ${contactEmail || "[FILL IN EMAIL]"} — we respond within 30 days. You may also lodge a complaint with your local supervisory authority.`,
      noAutomated: "6. Automated decision-making",
      noAutomatedBody:
        "We do not make legally significant decisions based solely on automated processing of your data.",
      recipients: "7. Data recipients",
      recipientsBody:
        "Data is shared only with notification-delivery services required to process your request (messenger alerts and, if configured, the operator's CRM webhook). Data is never sold or shared with third parties for marketing purposes.",
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

        {missing(legal?.contactEmail) && (
          <p className="p-3 bg-yellow-950/50 border border-yellow-800/50 rounded-lg text-xs text-yellow-300">
            PLACEHOLDER: заполните блок `legal` в projects/&lt;slug&gt;/brand.ts перед production-релизом /
            Fill in the `legal` block in projects/&lt;slug&gt;/brand.ts before production release.
          </p>
        )}

        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.controller}</h2>
          <p className="text-purple-100/80">{c.controllerBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.data}</h2>
          <p className="text-purple-100/80">{c.dataBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.purpose}</h2>
          <p className="text-purple-100/80">{c.purposeBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.retention}</h2>
          <p className="text-purple-100/80">{c.retentionBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.rights}</h2>
          <p className="text-purple-100/80">{c.rightsBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.noAutomated}</h2>
          <p className="text-purple-100/80">{c.noAutomatedBody}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">{c.recipients}</h2>
          <p className="text-purple-100/80">{c.recipientsBody}</p>
        </section>
      </article>
    </main>
  );
}
