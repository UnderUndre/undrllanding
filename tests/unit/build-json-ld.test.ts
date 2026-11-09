import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildWebSiteJsonLd, buildBrandEntityJsonLd, buildFaqJsonLd } from "@/lib/seo/build-json-ld";
import type { ProjectConfig } from "@/lib/project-config";

// Spec 006 T010: unit tests for JSON-LD builders (escape guard is in the
// serializer — json-ld.tsx; here we validate entity selection and shapes).

const baseConfig: ProjectConfig = {
  slug: "testbrand",
  name: "TestBrand",
  domain: "testbrand.example",
  title: "TestBrand Title",
  description: "Test description with <script>alert(1)</script> injection probe",
  iconUrl: "/projects/testbrand/icon.svg",
  theme: { primaryColor: "#111111", secondaryColor: "#222222" },
  navigation: { items: [] },
  footer: { columns: [], taglineFallback: "t" },
  supportedLocales: ["ru", "en"],
};

describe("build-json-ld", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("WebSite block carries schema.org context, domain url and brand locales", () => {
    const site = buildWebSiteJsonLd(baseConfig);
    expect(site["@context"]).toBe("https://schema.org");
    expect(site["@type"]).toBe("WebSite");
    expect(site.url).toBe("https://testbrand.example");
    expect(site.inLanguage).toEqual(["ru-RU", "en-US"]);
  });

  it("defaults to ProfessionalService and includes legal contactEmail", () => {
    vi.doMock("@/lib/schemas/content-loaders", () => ({
      loadLegalConfig: () => ({ contactEmail: "contact@test.example" }),
      loadFaqData: () => ({ items: [] }),
    }));
    // re-import with the mock in place
    return import("@/lib/seo/build-json-ld").then(({ buildBrandEntityJsonLd }) => {
      const entity = buildBrandEntityJsonLd(baseConfig) as Record<string, unknown>;
      expect(entity["@type"]).toBe("ProfessionalService");
      expect(entity.email).toBe("contact@test.example");
    });
  });

  it("schemaType Book emits Book with author (undreading pattern)", () => {
    const brand: ProjectConfig = {
      ...baseConfig,
      schemaType: "Book",
      bookAuthor: "Undre",
    };
    const entity = buildBrandEntityJsonLd(brand);
    expect(entity["@type"]).toBe("Book");
    expect(entity.author).toEqual({ "@type": "Person", name: "Undre" });
  });

  it("sameAs built only from http(s) social links", () => {
    const brand: ProjectConfig = {
      ...baseConfig,
      social: { linkedin: "https://linkedin.com/company/test", junk: "javascript:alert(1)" },
    };
    const entity = buildBrandEntityJsonLd(brand);
    expect(entity.sameAs).toEqual(["https://linkedin.com/company/test"]);
  });

  it("FAQPage mainEntity mirrors faq items (en fallback)", () => {
    vi.doMock("@/lib/schemas/content-loaders", () => ({
      loadFaqData: () => ({
        items: [
          {
            question: { ru: "Вопрос?", en: "Question?" },
            answers: [{ ru: "Ответ", en: "Answer" }],
          },
        ],
      }),
    }));
    return import("@/lib/seo/build-json-ld").then(({ buildFaqJsonLd }) => {
      const faq = buildFaqJsonLd("testbrand");
      expect(faq["@type"]).toBe("FAQPage");
      expect(faq.mainEntity[0].name).toBe("Question?");
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe("Answer");
    });
  });
});
