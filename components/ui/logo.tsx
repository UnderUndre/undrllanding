import Link from "next/link";
import { getActiveProjectConfig } from "@/lib/project-config";

export default function Logo() {
  const config = getActiveProjectConfig();

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label={config.name}>
      <div
        className="relative h-8 w-8 overflow-hidden rounded-lg group-hover:scale-105 transition-transform flex items-center justify-center border p-1"
        style={{
          backgroundColor: config.theme.secondaryColor,
          borderColor: `${config.theme.primaryColor}80`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={config.iconUrl} alt={`${config.name} Logo`} className="h-6 w-6 object-contain" />
      </div>
      <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100">
        {config.name}
      </span>
    </Link>
  );
}
