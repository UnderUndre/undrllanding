export const metadata = {
  title: "Undrlla — Запуск маркетплейса с кастомным брендингом в 1 клик",
  description: "Автономные маркетплейсы на Medusa 2.0 с уникальным брендингом, кастомным Next.js 15 лендингом, собственным доменом и приёмом карт (Paddle/Stripe) и крипты (SHKeeper).",
};

import HeroUndrlla from "@/components/hero-undrlla";
import MarketplacePreviewDemo from "@/components/marketplace-preview-demo";
import ShopifyStyleFeatures from "@/components/shopify-style-features";
import GlobalStats from "@/components/global-stats";
import PricingSection from "@/components/pricing-section";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      {/* Главный экран в стиле Shopify + Waitlist форма */}
      <div data-aos="fade-down">
        <HeroUndrlla />
      </div>

      {/* Интерактивные фичи в стиле Shopify с Bento Glow Card */}
      <div data-aos="fade-up">
        <ShopifyStyleFeatures />
      </div>

      {/* Интерактивный конструктор маркетплейса */}
      <section className="py-16 bg-white dark:bg-[#080808] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MarketplacePreviewDemo />
        </div>
      </section>

      {/* Блок метрик и архитектурного масштаба */}
      <div data-aos="fade-up">
        <GlobalStats />
      </div>

      {/* Секция тарифов, Rebate Setup и Реферального калькулятора */}
      <div data-aos="fade-up">
        <PricingSection />
      </div>

      {/* Финальный призыв к действию */}
      <Cta />
    </main>
  );
}
