import Link from "next/link";
import type { Person, Project } from "@/lib/types";

type Props = {
  project: Project;
  peopleLookup?: Map<string, Person>;
};

export function ProjectCard({ project, peopleLookup }: Props) {
  const associatedPeople =
    project.people_ids
      ?.map((id) => peopleLookup?.get(id))
      .filter(Boolean)
      .map((p) => p?.name) ?? [];

  return (
    <div className="card-surface relative flex h-full flex-col gap-4 rounded-2xl p-6">
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
      <div className="flex flex-wrap gap-2">
        {project.tags?.map((tag) => (
          <span
            key={tag}
            className="pill text-xs uppercase tracking-[0.14em] text-[var(--accent-strong)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-slate-300">{project.summary}</p>
      </div>
      {associatedPeople.length ? (
        <p className="text-sm text-slate-400">
          With{" "}
          <span className="font-medium text-slate-200">
            {associatedPeople.join(", ")}
          </span>
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-3">
        {project.links?.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="pill px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
