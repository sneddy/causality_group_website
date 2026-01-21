import { PublicationCard } from "@/components/publication-card";
import { SectionHeading } from "@/components/section-heading";
import { loadPublications } from "@/lib/content";

export const metadata = {
  title: "Publications | Causality Group @ MBZUAI",
  description:
    "Recent publications from the Causality Group at MBZUAI. Update /content/publications.json to edit without code changes.",
};

export default async function PublicationsPage() {
  const publications = await loadPublications();
  const sorted = publications.sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0),
  );

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Publications"
        title="Papers, preprints, and articles"
        description="Entries are stored in /content/publications.json. Add slug, title, authors, venue, year, tags, links, and summary. The list renders in reverse chronological order."
      />
      <div className="grid gap-4">
        {sorted.map((pub) => (
          <PublicationCard key={pub.slug} publication={pub} />
        ))}
        {sorted.length === 0 ? (
          <p className="text-slate-400">
            No publications yet. Add entries to <code>/content/publications.json</code>{" "}
            to populate this page.
          </p>
        ) : null}
      </div>
    </div>
  );
}
