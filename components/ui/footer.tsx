"use client";

import Link from "next/link";
import Logo from "./logo";
import { useLang } from "@/context/lang-context";

export default function Footer({ border = false }: { border?: boolean }) {
  const { t } = useLang();

  return (
    <footer className="bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs py-12 relative overflow-hidden transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="space-y-3 sm:col-span-12 lg:col-span-4 text-left">
            <Logo />
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              {t("footer_desc")}
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} Undrlla Network. {t("footer_rights")}
            </div>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 text-left">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("nav_features")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#pricing">
                  {t("nav_pricing")}
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#waitlist">
                  Waitlist
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#0">
                  Medusa Specs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 text-left">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Payments</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-700 dark:text-slate-300">Paddle Billing MoR</span>
              </li>
              <li>
                <span className="text-slate-700 dark:text-slate-300">Stripe Integration</span>
              </li>
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SHKeeper Crypto</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 text-left">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Ecosystem</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#0">
                  Telegram Channel
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#pricing">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#0">
                  GitHub Repos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div>Undrlla Ecosystem • Medusa 2.0 • PaaS Undevops • SHKeeper</div>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
