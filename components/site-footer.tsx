import Link from "next/link";
import type { NavigationItem } from "@/lib/types";

type Props = {
  navItems: NavigationItem[];
};

export function SiteFooter({ navItems }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/5 bg-[#050910]/80 text-sm text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-10 md:grid md:grid-cols-[1.1fr_1fr_1fr] md:gap-10">
        <div className="mb-6 md:mb-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Research Group
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">
            Causality Group @ MBZUAI
          </h3>
          <p className="mt-3 leading-relaxed text-slate-400">
            Led by Professors Kun Zhang. We study causal discovery, robust
            learning, and decision-making for real-world systems.
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-base font-semibold text-white">Quick links</h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-1 text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-base font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li>Email: causality@mbzuai.ac.ae (placeholder)</li>
            <li>Location: MBZUAI Campus, Masdar City</li>
            <li>Office hours: By appointment</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            © {year} Causality Group @ MBZUAI. All rights reserved.
          </p>
          <p className="text-slate-500">
            Built with Next.js & Tailwind. Content editable in /content and
            Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
