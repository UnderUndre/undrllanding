import { getActiveProjectConfig, type ProjectConfig } from "@/lib/project-config";
import { loadFaqData, loadLegalConfig } from "@/lib/schemas/content-loaders";

// Spec 006 FR-006/FR-007: typed JSON-LD builders, brand-agnostic — sourced
// exclusively from ProjectConfig + data/*.json (FR-011). Pure functions;
// unit-tested in tests/unit/build-json-ld.test.ts.

const SCHEMA_CONTEXT = "https://schema.org";

export type BrandSchemaType = "ProfessionalService" | "Organization" | "Book";

function socialSameAs(config: ProjectConfig): string[] {
  return Object.values(config.social ?? {}).filter(
    (url) => typeof url === "string" && url.startsWith("http"),
  );
}

export function buildWebSiteJsonLd(config: ProjectConfig) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: config.name,
    url: `https://${config.domain}`,
    inLanguage: (config.supportedLocales ?? ["ru", "en"]).map(
      (lang) => ({ ru: "ru-RU", en: "en-US", uk: "uk-UA" })[lang] ?? lang,
    ),
    description: config.description,
  };
}

export function buildBrandEntityJsonLd(config: ProjectConfig) {
  const base = {
    "@context": SCHEMA_CONTEXT,
    name: config.name,
    url: `https://${config.domain}`,
    description: config.description,
    ...(socialSameAs(config).length ? { sameAs: socialSameAs(config) } : {}),
  };
  const legal = loadLegalConfig(config.slug);
  const withContact = legal?.contactEmail
    ? { ...base, email: legal.contactEmail }
    : base;

  const schemaType: BrandSchemaType =
    config.schemaType ?? "ProfessionalService";

  if (schemaType === "Book") {
    // Publishing brand (006 US3): Book + Author(s) attributed via `author`.
    return {
      ...withContact,
      "@type": "Book",
      ...(config.bookAuthor ? { author: { "@type": "Person", name: config.bookAuthor } } : {}),
    };
  }
  return { ...withContact, "@type": schemaType };
}

export function buildFaqJsonLd(slug: string) {
  const faq = loadFaqData(slug);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question.en || item.question.ru,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answers.map((a) => a.en || a.ru).join(" "),
      },
    })),
  };
}

/** All blocks for the active brand's homepage (spec 006 SC-003). */
export function buildHomeJsonLd(): Record<string, unknown>[] {
  const config = getActiveProjectConfig();
  return [buildWebSiteJsonLd(config), buildBrandEntityJsonLd(config)];
}
