export const metadata = {
  title: "Undrlla — Your branded store, live in one deploy",
  description:
    "Autonomous Medusa 2.0 marketplaces with custom branding, Next.js storefront, custom domains, Paddle/Stripe cards and SHKeeper crypto. 0% GMV fee. Alpha free for first 50.",
};

import HeroUndrlla from "@/components/hero-undrlla";
import DeployStory from "@/components/deploy-story";
import MarketplacePreviewDemo from "@/components/marketplace-preview-demo";
import ShopifyStyleFeatures from "@/components/shopify-style-features";
import GlobalStats from "@/components/global-stats";
import PricingSection from "@/components/pricing-section";
import Cta from "@/components/cta";
import StickyCta from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <main className="bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
        <HeroUndrlla />

        <DeployStory />

        <div data-aos="fade-up">
          <ShopifyStyleFeatures />
        </div>

        <section className="py-16 bg-white dark:bg-[#080808] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <MarketplacePreviewDemo />
          </div>
        </section>

        <div data-aos="fade-up">
          <GlobalStats />
        </div>

        <div data-aos="fade-up">
          <PricingSection />
        </div>

        <Cta />
      </main>
      <StickyCta />
    </>
  );
}
