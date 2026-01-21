"use client";

import { useMemo, useState } from "react";
import type { CourseSchedulePart, CourseSections } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AboutTab } from "./AboutTab";
import { EvaluationTab } from "./EvaluationTab";
import { ResourcesTab } from "./ResourcesTab";
import { ScheduleTab } from "./ScheduleTab";

type Props = {
  content: string;
  sections: CourseSections;
};

type Tab = "About" | "Schedule" | "Evaluation" | "Final Project" | "Resources";

export function CourseTabsSimple({ content, sections }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("About");

  const scheduleParts: CourseSchedulePart[] = useMemo(() => {
    return sections.scheduleParts && sections.scheduleParts.length
      ? sections.scheduleParts
      : sections.schedule
        ? [
            {
              title: "Class schedule",
              body: sections.schedule,
              kind: "hero" as const,
            },
          ]
        : [];
  }, [sections.schedule, sections.scheduleParts]);

  const heroPart =
    scheduleParts.find((p) => p.kind === "hero") ?? scheduleParts[0] ?? null;
  const otherParts = heroPart ? scheduleParts.filter((p) => p !== heroPart) : scheduleParts;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["About", "Schedule", "Evaluation", "Final Project", "Resources"] as Tab[]).map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pill px-3 py-2 text-sm font-semibold ${
                activeTab === tab ? "bg-white/10 text-white" : "text-slate-200"
              }`}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {activeTab === "About" && <AboutTab sections={sections} content={content} />}

      {activeTab === "Schedule" && (
        <ScheduleTab heroPart={heroPart} otherParts={otherParts} />
      )}

      {activeTab === "Evaluation" && <EvaluationTab sections={sections} content={content} />}

      {activeTab === "Final Project" && (
        <div className="card-surface rounded-2xl p-5 md:p-6">
          <h3 className="text-lg font-semibold text-white">Final project</h3>
          {sections.finalProject ? (
            <div className="markdown-body mt-3">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {sections.finalProject}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="mt-3 text-slate-300">Details will be posted soon.</p>
          )}
        </div>
      )}

      {activeTab === "Resources" && <ResourcesTab sections={sections} />}
    </div>
  );
}
