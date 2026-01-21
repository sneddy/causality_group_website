"use client";

import { useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CourseSections } from "@/lib/types";

type EvalItem = { key: string; label: string; percent?: number; body: string };
type EvalDate = { label: string; dateText: string; targetKey: string };

function parseEvaluationContent(markdown: string): {
  items: EvalItem[];
  dates: EvalDate[];
} {
  const blocks = markdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const items: EvalItem[] = [];
  const dates: EvalDate[] = [];

  blocks.forEach((block, idx) => {
    const lines = block.split("\n");
    const first = lines[0]?.replace(/^[*-]\s*/, "") ?? "";
    const titleMatch = first.match(/\*\*([^*]+)\*\*/);
    const label = titleMatch ? titleMatch[1] : first.replace(/:\s*.*/, "").trim();
    const percentMatch = block.match(/(\d{1,3})%/);
    const percent = percentMatch ? Number(percentMatch[1]) : undefined;
    const key = `eval-${idx}`;
    items.push({ key, label: label || `Item ${idx + 1}`, percent, body: block });

    const dateRegex =
      /(\d{1,2}\s+[A-Za-z]+(?:\s*\(.*?\))?(?:,\s*\d{1,2}:\d{2}\s*(?:AM|PM))?)/g;
    let match: RegExpExecArray | null;
    while ((match = dateRegex.exec(block)) !== null) {
      dates.push({ label: label || `Item ${idx + 1}`, dateText: match[1], targetKey: key });
    }
  });

  return { items, dates };
}

type Props = {
  sections: CourseSections;
  content: string;
};

export function EvaluationTab({ sections, content }: Props) {
  const evalData = sections.evaluationData;
  const evalMarkdown = sections.evaluation || content;
  const parsedEval = useMemo(() => parseEvaluationContent(evalMarkdown), [evalMarkdown]);
  const evalRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToKey = (key: string) => {
    const el = evalRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-2", "ring-[var(--accent)]");
      setTimeout(() => el.classList.remove("ring-2", "ring-[var(--accent)]"), 1200);
    }
  };

  if (evalData) {
    return (
      <div className="space-y-5">
        {evalData.grades ? (
          <div className="card-surface rounded-2xl p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Grading</h3>
            </div>
            <div className="space-y-3">
              {(() => {
                const items: {
                  label: string;
                  weight?: string;
                  details?: string[];
                }[] = [];
                const g = evalData.grades;
                if (g?.class_participation) {
                  items.push({
                    label: "Class participation",
                    weight: g.class_participation.weight,
                    details: g.class_participation.policy ? [g.class_participation.policy] : [],
                  });
                }
                if (g?.in_class_discussions) {
                  items.push({
                    label: "In-class discussions",
                    weight: g.in_class_discussions.weight,
                    details: g.in_class_discussions.policy ? [g.in_class_discussions.policy] : [],
                  });
                }
                if (g?.homework_assignments) {
                  items.push({
                    label: `Homework assignments${g.homework_assignments.count ? ` (${g.homework_assignments.count})` : ""}`,
                    weight: g.homework_assignments.weight,
                    details: [
                      g.homework_assignments.submission,
                      g.homework_assignments.late_policy,
                    ].filter(Boolean) as string[],
                  });
                }
                if (g?.midterm_exam) {
                  items.push({
                    label: "Midterm exam",
                    weight: g.midterm_exam.weight,
                    details: g.midterm_exam.coverage ? [g.midterm_exam.coverage] : [],
                  });
                }
                if (g?.project) {
                  const parts: string[] = g.project.components
                    ? ([
                        g.project.components.proposal
                          ? `Proposal ${g.project.components.proposal}`
                          : null,
                        g.project.components.final_report
                          ? `Final report ${g.project.components.final_report}`
                          : null,
                        g.project.components.final_presentation
                          ? `Final presentation ${g.project.components.final_presentation}`
                          : null,
                      ].filter((p): p is string => typeof p === "string"))
                    : [];
                  const notes: string[] = (g.project.notes ?? []).filter(
                    (note): note is string => typeof note === "string",
                  );
                  const details: string[] = [...parts, ...notes];
                  items.push({
                    label: "Project",
                    weight: g.project.total_weight,
                    details,
                  });
                }
                return items.map((item, idx) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white">{item.label}</span>
                      {item.weight ? (
                        <span className="pill px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                          {item.weight}
                        </span>
                      ) : null}
                    </div>
                    {item.details?.length ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ));
              })()}
            </div>
          </div>
        ) : null}

        {evalData.deadlines?.length ? (
          <div className="card-surface rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-semibold text-white">Deadlines</h3>
            <div className="mt-3 grid gap-2">
              {evalData.deadlines.map((d, idx) => (
                <div
                  key={`${d.item}-${idx}`}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="text-sm text-white">{d.item}</div>
                  <span className="pill whitespace-nowrap px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                    {d.due}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {parsedEval.items.length ? (
          parsedEval.items.map((item) => {
            return (
              <div
                key={item.key}
                id={item.key}
                ref={(el) => {
                  evalRefs.current[item.key] = el;
                }}
                className="card-surface rounded-2xl p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{item.label}</span>
                  {item.percent != null ? (
                    <span className="pill px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                      {item.percent}%
                    </span>
                  ) : null}
                </div>
                <div className="markdown-body mt-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-surface rounded-2xl p-5 md:p-6">
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {sections.evaluation || content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {parsedEval.dates.length ? (
        <div className="card-surface rounded-2xl p-5 md:p-6">
          <h3 className="text-lg font-semibold text-white">Key dates</h3>
          <div className="mt-3 grid gap-2">
            {parsedEval.dates.map((d, idx) => (
              <button
                key={`${d.targetKey}-${idx}`}
                type="button"
                onClick={() => scrollToKey(d.targetKey)}
                className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10"
              >
                <span className="text-white">{d.dateText}</span>
                <span className="text-xs text-slate-400">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
