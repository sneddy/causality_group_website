"use client";

import Image from "next/image";
import type { CourseSections } from "@/lib/types";
import { InfoCard } from "./InfoCard";

type Props = {
  sections: CourseSections;
  content: string;
};

export function AboutTab({ sections, content }: Props) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <Image
            src="/course_logo.png"
            alt="Course logo"
            fill
            className="object-contain p-1.5"
            sizes="48px"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            {sections.description ? "Course" : ""}
          </p>
          <p className="text-sm text-slate-300">Causality and Machine Learning</p>
        </div>
      </div>
      <InfoCard
        title="Description"
        body={sections.description || sections.about || content}
      />
      {sections.questions ? <InfoCard title="Questions" body={sections.questions} /> : null}
      {sections.problems ? <InfoCard title="Problems" body={sections.problems} /> : null}
      {sections.objectives ? <InfoCard title="Course objectives" body={sections.objectives} /> : null}
      {sections.materials ? <InfoCard title="Materials" body={sections.materials} /> : null}
    </div>
  );
}
