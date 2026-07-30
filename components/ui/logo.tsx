import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/images/undrlla-icon.png";
import logoText from "@/public/images/undrlla.png";

export default function Logo() {
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
