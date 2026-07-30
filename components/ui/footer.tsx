"use client";

import Link from "next/link";
import Logo from "./logo";
import { useLang } from "@/context/lang-context";
import {
  IconGitHub,
  IconTwitter,
  IconTelegram,
  IconYouTube,
  IconReddit,
  IconDiscord,
  IconLinkedIn,
} from "../social-svg-icons";

export default function Footer({ border = false }: { border?: boolean }) {
  const { t } = useLang();

  const socialLinks = [
    { key: "github", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB, label: "GitHub", icon: IconGitHub },
    { key: "twitter", url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER, label: "Twitter / X", icon: IconTwitter },
    { key: "telegram", url: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM, label: "Telegram", icon: IconTelegram },
    { key: "youtube", url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE, label: "YouTube", icon: IconYouTube },
    { key: "reddit", url: process.env.NEXT_PUBLIC_SOCIAL_REDDIT, label: "Reddit", icon: IconReddit },
    { key: "discord", url: process.env.NEXT_PUBLIC_SOCIAL_DISCORD, label: "Discord", icon: IconDiscord },
    { key: "linkedin", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN, label: "LinkedIn", icon: IconLinkedIn },
  ].filter((item) => Boolean(item.url && item.url.trim().length > 0));

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
              &copy; {new Date().getFullYear()} Undrlla. {t("footer_rights")}
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
                <Link className="hover:text-slate-900 dark:hover:text-white transition-colors" href="/economics">
                  {t("nav_manifest")}
                </Link>
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

          {/* Dinamically rendered Social Media Links from ENV */}
          {socialLinks.length > 0 && (
            <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-4 text-left">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Socials</h3>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-slate-400 dark:hover:border-slate-700 transition-all text-xs shadow-xs"
                      aria-label={social.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
