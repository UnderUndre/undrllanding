import type { ProjectConfig } from "@/lib/project-config";

// Brand configuration for the UnderUndre landing (spec 003, T-004).
// Navigation/footer copy is bilingual via labelKey → lib/i18n.ts,
// ported 1:1 from the previously hardcoded header/footer branches.

export const underundreBrand: ProjectConfig = {
  slug: "underundre",
  name: "UnderUndre",
  domain: "underundre.com",
  title: "UnderUndre — Productized Engineering & SpecKit Discovery",
  description:
    "Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour SpecKit Discovery, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01.",
  iconUrl: "/projects/underundre/icon.svg",
  schemaType: "ProfessionalService",
  hasTeardowns: true,
  hasCalculator: true,
  hasPrompts: true,
  personas: [
    {
      id: "owner",
      badge: { ru: "НАЛОГ НА ТРЕНИЕ СЖИГАЕТ ВАШ БЮДЖЕТ", en: "THE FRICTION TAX IS BURNING YOUR BUDGET" },
      title: { ru: "Пока вы не считаете часы ручной возни, вы платите зарплату за дублирование данных", en: "While you don't count manual-work hours, you pay salaries for duplicating data" },
      subtitle: { ru: "Я измеряю операционный засор в часах и деньгах за 24–48 часов. Счёт за подписки и переработки перестаёт расти после внедрения контрактов.", en: "I measure your operational clog in hours and dollars within 24–48 hours. Subscription bills and overtime stop growing once contracts are in." },
      ctaLabel: { ru: "Посчитать мой налог на трение", en: "Price my friction tax" },
    },
    {
      id: "ops",
      badge: { ru: "ХВАТИТ ПЕРЕПЕЧАТЫВАТЬ ИЗ ЧАТА В ТАБЛИЦУ", en: "STOP RETYPING FROM CHAT INTO SPREADSHEETS" },
      title: { ru: "Ваши операции текут через WhatsApp и Excel — я превращаю переписку в контракты", en: "Your operations flow through WhatsApp and Excel — I turn conversations into contracts" },
      subtitle: { ru: "48-часовой аудит находит, где заказы теряются при ручном переносе, и заменяет переписку схемами с валидацией. Без смены команды и без шестинедельного внедрения.", en: "A 48-hour audit finds where orders get lost in manual transfer and replaces chat chaos with validated schemas. No team swap, no six-week rollout." },
      ctaLabel: { ru: "Найти мои протечки", en: "Find my leaks" },
    },
    {
      id: "cto",
      badge: { ru: "АРХИТЕКТУРА КАК КОНТРАКТ, А НЕ КАК ЗАМОЧНАЯ СКЛАДКА", en: "ARCHITECTURE AS A CONTRACT, NOT A LOCK-STITCH" },
      title: { ru: "SaaS-зоопарк и склейка на вебхуках против схемы с DDL и идемпотентностью", en: "SaaS sprawl and webhook glue versus schema with DDL and idempotency" },
      subtitle: { ru: "Каждый вскрытый кейс показывает контракты: таблицы, уникальные индексы, идемпотентные ключи. OpenAPI 3.0 и Docker-mock в поставке — проверяйте, а не верьте.", en: "Every teardown shows the contracts: tables, unique indexes, idempotency keys. OpenAPI 3.0 and a Docker mock ship with delivery — verify, don't trust." },
      ctaLabel: { ru: "Смотреть вскрытия архитектуры", en: "See the architecture teardowns" },
    },
  ],
  faviconUrl: "/projects/underundre/icon-48.png",
  appleIconUrl: "/projects/underundre/apple-icon-180.png",
  heroBadge:
    "3X SALESFORCE CERTIFIED ENGINEER (ADMIN I & II · PLATFORM DEV) | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED",
  theme: {
    primaryColor: "#b45500",
    secondaryColor: "#4e007a",
  },
  navigation: {
    items: [
      { labelKey: "nav_audit", labelFallback: "Discovery", href: "#audit" },
      { labelKey: "nav_stack", labelFallback: "FOSS Stack", href: "#stack" },
      { labelKey: "nav_pricing", labelFallback: "Pricing", href: "#pricing" },
      {
        labelKey: "nav_comparison",
        labelFallback: "Comparison",
        href: "#comparison",
      },
      { labelKey: "nav_faq", labelFallback: "FAQ", href: "#faq" },
    ],
    ctaButton: {
      labelKey: "nav_cta_audit",
      labelFallback: "Discovery for $350",
      href: "#contact",
    },
  },
  footer: {
    taglineKey: "footer_uu_tagline",
    taglineFallback:
      "Productized Engineering Bureau — SpecKit Discovery, OpenAPI specifications, and self-hosted FOSS systems shipped with zero seat fees.",
    columns: [
      {
        titleKey: "footer_uu_products",
        titleFallback: "Product Ladder",
        links: [
          {
            labelKey: "footer_uu_product0",
            labelFallback: "Product 0: SpecKit Discovery ($350 pilot)",
            href: "#audit",
          },
          {
            labelKey: "footer_uu_refer",
            labelFallback: "Refer & Save — $50 per client",
            href: "/referral",
          },
          {
            labelKey: "footer_uu_prompts",
            labelFallback: "Free prompts — run a mini-audit yourself",
            href: "/prompts",
          },
          {
            labelKey: "footer_uu_product_a",
            labelFallback: "Sprint A: FOSS Office ($3.5k)",
            href: "#pricing",
          },
          {
            labelKey: "footer_uu_custom",
            labelFallback: "Custom Dev — via brief",
            href: "#contact",
          },
        ],
      },
      {
        titleKey: "footer_uu_escrow",
        titleFallback: "Payments & Escrow",
        links: [
          {
            labelKey: "footer_uu_escrow_upwork",
            labelFallback: "Upwork Escrow (5% fee)",
            badge: "highlight",
          },
          {
            labelKey: "footer_uu_ip",
            labelFallback: "Split-IP: 100% rights on custom work",
          },
          { labelKey: "footer_uu_nace", labelFallback: "EU NACE 62.01 Standard" },
        ],
      },
    ],
    showLegalLinks: true,
    showManifestLink: true,
  },
  supportedLocales: ["ru", "en"],
};
