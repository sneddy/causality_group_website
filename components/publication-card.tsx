import Link from "next/link";
import type { Publication } from "@/lib/types";

type Props = {
  publication: Publication;
};

export function PublicationCard({ publication }: Props) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="absolute left-3 top-5 h-10 w-[3px] rounded-full bg-[var(--accent)] opacity-80 transition-all duration-200 group-hover:h-16 group-hover:opacity-100" />
      <div className="pl-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          <span>{publication.year ?? "Year TBD"}</span>
          {publication.venue ? (
            <span className="pill px-2 py-1 text-[11px] font-semibold text-white">
              {publication.venue}
            </span>
          ) : null}
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-white md:text-xl">
            {publication.title}
          </h3>
          {publication.authors?.length ? (
            <p className="mt-1 text-sm text-slate-300">
              {publication.authors.join(", ")}
            </p>
          ) : null}
          {publication.summary ? (
            <p className="mt-3 text-slate-300">{publication.summary}</p>
          ) : null}
        </div>
        {publication.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {publication.tags.map((tag) => (
              <span
                key={tag}
                className="pill px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--accent-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          {publication.links?.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="pill px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
