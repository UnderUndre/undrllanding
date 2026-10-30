import { BrandContact, BrandFaq, BrandPricing, PlaceholderHero } from "@/components/content/generic-sections";
import { templateBrand } from "./brand";

export { templateBrand };

// Server home composition for scaffolded brands (spec 003 FR-010, T-018):
// neutral generic sections driven by the project's data/*.json.
export function TemplateHome() {
  return (
    <main className="bg-brand-bg text-slate-100 min-h-screen">
      <PlaceholderHero />
      <BrandPricing slug={templateBrand.slug} />
      <BrandFaq slug={templateBrand.slug} />
      <BrandContact />
    </main>
  );
}
