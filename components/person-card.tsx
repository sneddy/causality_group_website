import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/lib/types";

type Props = {
  person: Person;
};

export function PersonCard({ person }: Props) {
  const hasPhoto = Boolean(person.photo_url);

  return (
    <div className="card-surface flex flex-col gap-4 rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {hasPhoto ? (
            <Image
              src={person.photo_url as string}
              alt={person.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-[var(--accent-strong)]">
              {person.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{person.name}</h3>
            <span className="pill px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              {person.role}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Status: {person.status === "active" ? "Active" : "Alumni"}
          </p>
          {person.bio ? (
            <p className="mt-2 text-slate-300">{person.bio}</p>
          ) : null}
        </div>
      </div>
          {person.research_interests?.length ? (
            <div className="flex flex-wrap gap-2">
              {person.research_interests.map((topic) => (
                <span
                  key={topic}
                  className="pill px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--accent-strong)]"
                >
                  {topic}
                </span>
              ))}
            </div>
      ) : null}
      {person.links?.length ? (
        <div className="flex flex-wrap gap-3">
          {person.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="pill px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
