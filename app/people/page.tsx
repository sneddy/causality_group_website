import { PeopleGrid } from "@/components/people-grid";
import { SectionHeading } from "@/components/section-heading";
import { loadPeople } from "@/lib/content";

export const metadata = {
  title: "People | Causality Group @ MBZUAI",
  description:
    "Meet the members of the Causality Group at MBZUAI. Filter by role or status.",
};

export default async function PeoplePage() {
  const people = await loadPeople();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="People"
        title="Team and collaborators"
        description="Profiles are loaded from /content/people.json. Add or reorder people without touching React code."
      />
      <PeopleGrid people={people} />
    </div>
  );
}
