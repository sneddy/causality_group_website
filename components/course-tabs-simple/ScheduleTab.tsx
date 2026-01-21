"use client";

import { useState } from "react";
import type { CourseLecture, CourseSchedulePart } from "@/lib/types";
import { InfoCard } from "./InfoCard";

type Props = {
  heroPart: CourseSchedulePart | null;
  otherParts: CourseSchedulePart[];
};

type LectureProps = { lecture: CourseLecture };

const LectureCard = ({ lecture }: LectureProps) => (
  <InfoCard title={lecture.title} tag={lecture.date} body={lecture.body} />
);

export function ScheduleTab({ heroPart, otherParts }: Props) {
  const [activeScheduleIndex, setActiveScheduleIndex] = useState(0);

  return (
    <div className="space-y-4">
      {heroPart ? (
        <InfoCard title={heroPart.title} tag={heroPart.tag} body={heroPart.body} />
      ) : null}

      {otherParts.length ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {otherParts.map((section, idx) => (
              <button
                key={`sched-tab-${idx}`}
                type="button"
                onClick={() => setActiveScheduleIndex(idx)}
                className={`pill px-3 py-2 text-left text-sm font-semibold ${
                  activeScheduleIndex === idx ? "bg-white/10 text-white" : "text-slate-200"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-white">{section.title}</span>
                  {section.tag ? (
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                      {section.tag}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
          {otherParts[activeScheduleIndex] ? (
            <div className="space-y-3">
              <InfoCard
                key={`schedule-${activeScheduleIndex}`}
                title={otherParts[activeScheduleIndex].title}
                tag={otherParts[activeScheduleIndex].tag}
                body={
                  otherParts[activeScheduleIndex].partSummary ||
                  otherParts[activeScheduleIndex].body
                }
              />
              {otherParts[activeScheduleIndex].lectures?.length ? (
                <div className="grid gap-3">
                  {otherParts[activeScheduleIndex].lectures?.map((lecture, idx) => (
                    <LectureCard key={idx} lecture={lecture} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
