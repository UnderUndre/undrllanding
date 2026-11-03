import Link from "next/link";
import { getActiveProjectConfig } from "@/lib/project-config";

export default function Logo() {
  const config = getActiveProjectConfig();

  return (
    <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0 group" aria-label={config.name}>
      <div className="relative h-8 w-8 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={config.iconUrl} alt={`${config.name} Logo`} className="h-8 w-8 object-contain" />
      </div>
      <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-slate-100 truncate">
        {config.name}
      </span>
    </Link>
  );
}
