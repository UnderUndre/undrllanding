export const metadata = {
  title: "Undrlla — Запуск маркетплейса с кастомным брендингом в 1 клик",
  description: "Автономные маркетплейсы на Medusa 2.0 с уникальным брендингом, кастомным Next.js 15 лендингом, собственным доменом и приёмом карт и крипты.",
};

import HeroUndrlla from "@/components/hero-undrlla";
import MarketplacePreviewDemo from "@/components/marketplace-preview-demo";
import FeaturesGrid from "@/components/features-grid";
import PricingSection from "@/components/pricing-section";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Главный экран + Waitlist форма */}
      <HeroUndrlla />

      {/* Секция интерактивного конструктора/демо */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MarketplacePreviewDemo />
        </div>
      </section>

      {/* Секция преимуществ и фичей */}
      <FeaturesGrid />

      {/* Прозрачная экономическая секция и Реферальный калькулятор */}
      <PricingSection />

      {/* Финальный призыв к действию */}
      <Cta />
    </main>
  );
}
