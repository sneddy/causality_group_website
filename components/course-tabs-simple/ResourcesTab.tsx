"use client";

import { InfoCard } from "./InfoCard";
import type { CourseSections } from "@/lib/types";

type Props = {
  sections: CourseSections;
};

export function ResourcesTab({ sections }: Props) {
  if (!sections.materialsList) {
    return (
      <div className="card-surface rounded-2xl p-5 md:p-6 text-slate-300">
        Resources will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.materialsList.recommended_textbooks?.length ? (
        <InfoCard
          title="Recommended textbooks"
          body={sections.materialsList.recommended_textbooks
            .map((book) => {
              const parts = [
                book.title,
                book.authors ? `— ${book.authors}` : "",
                book.edition ? `(${book.edition})` : "",
                book.publisher ? `${book.publisher}` : "",
                book.year ? `${book.year}` : "",
              ]
                .filter(Boolean)
                .join(" ");
              if (book.url) {
                return `- [${parts}](${book.url})`;
              }
              return `- ${parts}`;
            })
            .join("\n")}
        />
      ) : null}
      {sections.materialsList.weekly_materials?.length ? (
        <InfoCard
          title={sections.materialsList.weekly_materials_note || "Weekly materials"}
          body={sections.materialsList.weekly_materials
            .map((week) => {
              const items =
                week.items
                  ?.map((item) =>
                    item.url ? `- [${item.label}](${item.url})` : `- ${item.label}`,
                  )
                  .join("\n") ?? "";
              return `Week ${week.week ?? ""}\n${items}`;
            })
            .join("\n\n")}
        />
      ) : null}
    </div>
  );
}
