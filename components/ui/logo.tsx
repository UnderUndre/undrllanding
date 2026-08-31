import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/images/undrlla-icon.png";
import logoText from "@/public/images/undrlla.png";
import { getActiveProjectConfig } from "@/lib/project-config";

export default function Logo() {
  const config = getActiveProjectConfig();

  if (config.slug === "undreseller") {
    return (
      <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Undreseller">
        <div className="relative h-8 w-8 overflow-hidden rounded-lg group-hover:scale-105 transition-transform flex items-center justify-center">
          <Image
            src={config.iconUrl}
            alt="Undreseller Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100">
          Undreseller
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Undrlla">
      {/* Иконка логотипа */}
      <div className="relative h-8 w-8 overflow-hidden rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center">
        <Image
          src={logoIcon}
          alt="Undrlla Icon"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          priority
        />
      </div>

      {/* ПНГшка надписи логотипа */}
      <div className="relative h-6 flex items-center">
        <Image
          src={logoText}
          alt="Undrlla"
          height={22}
          className="h-5.5 w-auto object-contain dark:invert-0 dark:brightness-100 transition-all"
          priority
        />
      </div>
    </Link>
  );
}
