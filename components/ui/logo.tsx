import Link from "next/link";
import { getActiveProjectConfig } from "@/lib/project-config";

export default function Logo() {
  const config = getActiveProjectConfig();
  const isUnderundre = config.slug === "underundre" || config.slug === "undreseller";

  if (isUnderundre) {
    return (
      <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="UnderUndre">
        <div className="relative h-8 w-8 overflow-hidden rounded-lg group-hover:scale-105 transition-transform flex items-center justify-center bg-[#4e007a] border border-[#b45500]/50 p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/underundre/favicon.ico"
            alt="UnderUndre Logo"
            className="h-6 w-6 object-contain"
          />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100">
          UnderUndre
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Undrlla">
      <div className="relative h-8 w-8 overflow-hidden rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/undrlla-icon.png"
          alt="Undrlla Icon"
          className="h-8 w-8 object-contain"
        />
      </div>
      <div className="relative h-6 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/undrlla.png"
          alt="Undrlla"
          className="h-5.5 w-auto object-contain dark:invert-0 dark:brightness-100 transition-all"
        />
      </div>
    </Link>
  );
}
