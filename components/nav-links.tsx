"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/types";

type Props = {
  navItems: NavigationItem[];
  className?: string;
};

export function NavLinks({ navItems, className }: Props) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`pill px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                  : "text-slate-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
