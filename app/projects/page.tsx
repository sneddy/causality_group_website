import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { loadPeople, loadProjects } from "@/lib/content";

export const metadata = {
  title: "Projects | Causality Group @ MBZUAI",
  description:
    "Research projects in causal discovery, robust machine learning, and decision-making.",
};

export default async function ProjectsPage() {
  const [projects, people] = await Promise.all([loadProjects(), loadPeople()]);
  const peopleLookup = new Map(people.map((person) => [person.id, person]));

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Projects"
        title="Causal discovery, representation, and robust ML"
        description="Projects are loaded from /content/projects.json with optional people references."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            peopleLookup={peopleLookup}
          />
        ))}
        {projects.length === 0 ? (
          <p className="text-slate-400">
            Add project entries to <code>/content/projects.json</code> to show
            work in progress.
          </p>
        ) : null}
      </div>
    </div>
  );
}
