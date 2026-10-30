"use client";

import Link from "next/link";
import Logo from "./logo";
import { useLang } from "@/context/lang-context";
import { TranslationKey } from "@/lib/i18n";
import { getActiveProjectConfig } from "@/lib/project-config";
import { getSocialLinks } from "@/lib/social-links";

export default function Footer({ border = false }: { border?: boolean }) {
  const { t } = useLang();
  const config = getActiveProjectConfig();
  const socialLinks = getSocialLinks();

  const label = (item: { labelKey?: string; labelFallback: string }) =>
    item.labelKey ? t(item.labelKey as TranslationKey) : item.labelFallback;

  const showLegalLinks = config.footer.showLegalLinks !== false;
  const showManifestLink = config.footer.showManifestLink === true;

  return (
    <footer className="bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs py-12 relative overflow-hidden transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="space-y-3 sm:col-span-12 lg:col-span-4 text-left">
            <Logo />
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              {config.footer.taglineKey
                ? t(config.footer.taglineKey as TranslationKey)
                : config.footer.taglineFallback}
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
            </div>
          </div>

          {config.footer.columns.map((column) => (
            <div
              key={column.titleFallback}
              className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 text-left"
            >
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {column.titleKey ? t(column.titleKey as TranslationKey) : column.titleFallback}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.labelFallback}>
                    {link.href ? (
                      link.href.startsWith("/") ? (
                        <Link
                          className="hover:text-slate-900 dark:hover:text-white transition-colors"
                          href={link.href}
                        >
                          {label(link)}
                        </Link>
                      ) : (
                        <a
                          className="hover:text-slate-900 dark:hover:text-white transition-colors"
                          href={link.href}
                        >
                          {label(link)}
                        </a>
                      )
                    ) : (
                      <span
                        className={
                          link.badge === "highlight"
                            ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "text-slate-700 dark:text-slate-300"
                        }
                      >
                        {label(link)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Dynamically rendered Social Media Links from ENV */}
          {socialLinks.length > 0 && (
            <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-4 text-left">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Socials</h3>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {socialLinks.map((social) => {
                  const Icon = social.Icon;
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

        {(showLegalLinks || showManifestLink) && (
          <div className="pt-8 flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
            {showLegalLinks && (
              <>
                <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  {t("footer_privacy")}
                </Link>
                <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  {t("footer_terms")}
                </Link>
              </>
            )}
            {showManifestLink && (
              <Link href="/manifest" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                {t("footer_manifest")}
              </Link>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
