import { BrandContact, BrandFaq, BrandPricing, PlaceholderHero } from "@/components/content/generic-sections";
import { undreadingBrand } from "./brand";

export { undreadingBrand };

// Server home composition for scaffolded brands (spec 003 FR-010, T-018):
// neutral generic sections driven by the project's data/*.json.
export function undreadingHome() {
  return (
    <main className="bg-brand-bg text-slate-100 min-h-screen">
      <PlaceholderHero />
      <BrandPricing slug={undreadingBrand.slug} />
      <BrandFaq slug={undreadingBrand.slug} />
      <BrandContact />
    </main>
  );
}
