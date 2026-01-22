import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import type { NavigationItem } from "@/lib/types";

type Props = {
  navItems: NavigationItem[];
};

export function SiteHeader({ navItems }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#04070e]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/10 bg-white shadow-md">
            <Image
              src="/brand/logo.png"
              alt="MBZUAI logo"
              fill
              className="object-contain p-1"
              sizes="44px"
              priority
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              MBZUAI
            </p>
            <p className="text-lg font-semibold">Causality Group</p>
          </div>
        </Link>
        <div className="hidden flex-1 justify-end lg:flex">
          <NavLinks navItems={navItems} />
        </div>
        {navItems.every((item) => item.href !== "/news") ? (
          <Link
            href="/news"
            className="accent-pill hidden items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-0.5 lg:inline-flex"
          >
            News
          </Link>
        ) : null}
      </div>
      <div className="px-5 pb-4 lg:hidden">
        <NavLinks navItems={navItems} className="overflow-x-auto pb-1" />
      </div>
    </header>
  );
}
