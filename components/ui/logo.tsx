import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Undrlla">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#4e007a] via-[#b45500] to-[#69a700] p-0.5 shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform">
        <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-sm tracking-tighter">
          U
        </div>
      </div>
      <span className="font-extrabold text-white text-lg tracking-tight">
        undrlla<span className="text-orange-400">.</span>
      </span>
    </Link>
  );
}
