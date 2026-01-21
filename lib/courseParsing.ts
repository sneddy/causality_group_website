import { CourseLecture, CourseSections, CourseSchedulePart } from "@/lib/types";
import fs from "fs/promises";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

type EvalJson = {
  evaluation?: string;
  grades?: NonNullable<CourseSections["evaluationData"]>["grades"];
  deadlines?: NonNullable<CourseSections["evaluationData"]>["deadlines"];
  criteria?: { title: string; detail?: string }[];
};

type FinalProjectJson =
  | { finalProject?: string }
  | {
      final_project?: {
        title?: string;
        description?: string;
        topics?: string[];
        requirements?: string;
        timetable?: { label?: string; date?: string; time?: string | null; notes?: string[] }[];
      };
    };

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

function sectionBetween(content: string, start: string, end?: string): string {
  const startIdx = content.indexOf(start);
  if (startIdx === -1) return "";
  const fromStart = content.slice(startIdx);
  if (!end) return fromStart.trim();
  const endIdx = fromStart.indexOf(end);
  if (endIdx === -1) return fromStart.trim();
  return fromStart.slice(0, endIdx).trim();
}

export function parseCourseContent(content: string): CourseSections {
  const about = content.split("## Grading")[0]?.trim() ?? "";
  const description = sectionBetween(about, "## Description", "## Course objectives");

  const questionsSplit = description.split("We will address the following questions:");
  const descriptionText = questionsSplit[0]?.trim() ?? "";
  const questionsText =
    questionsSplit[1] ? `We will address the following questions:${questionsSplit[1]}` : "";
  const problemsText = description.includes("Two main causality problems are emphasized:")
    ? description.slice(description.indexOf("Two main causality problems are emphasized:")).trim()
    : "";

  const objectives = sectionBetween(content, "## Course objectives", "## Who can attend");
  const materials = sectionBetween(content, "## Course materials", "## Grading");
  const evaluation = sectionBetween(content, "## Grading", "## Class schedule");
  const schedule = sectionBetween(content, "## Class schedule", "# Final Project");
  const finalProject = sectionBetween(content, "# Final Project", "## Recommended Textbooks");
  const presentations = sectionBetween(content, "## Recommended Textbooks");

  const scheduleParts: CourseSchedulePart[] = schedule
    .split(/\n---\n/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((body, idx) => {
      const lines = body.split("\n");
      const headingLine = lines[0]?.match(/^#+\s*(.+)/)?.[1] ?? null;
      const cleanedBody =
        headingLine && lines.length > 1 ? lines.slice(1).join("\n").trim() : body;
      let title = headingLine || `Schedule Part ${idx}`;
      let tag: string | undefined;
      if (headingLine && headingLine.includes(":")) {
        const [left, ...rest] = headingLine.split(":");
        tag = left.trim();
        const after = rest.join(":").trim();
        title = after || title;
      }
      return {
        title: idx === 0 ? "Class schedule" : title,
        tag,
        body: cleanedBody,
        kind: idx === 0 ? "hero" : "section",
      };
    });

  return {
    about,
    description: descriptionText || description,
    questions: questionsText,
    problems: problemsText,
    objectives,
    materials,
    evaluation,
    schedule,
    scheduleParts,
    finalProject,
    presentations,
  };
}

function formatFinalProjectMarkdown(finalProject: FinalProjectJson | null): string | undefined {
  if (!finalProject) return undefined;
  if ("finalProject" in finalProject && typeof finalProject.finalProject === "string") {
    return finalProject.finalProject;
  }

  const data = "final_project" in finalProject ? finalProject.final_project : null;
  if (!data) return undefined;

  const lines: string[] = [];
  if (data.title) lines.push(`## ${data.title}`);
  if (data.description) lines.push(data.description);

  if (data.topics?.length) {
    lines.push("### Topics");
    lines.push(...data.topics.map((topic) => `- ${topic}`));
  }

  if (data.requirements) {
    lines.push("### Requirements");
    lines.push(data.requirements);
  }

  if (data.timetable?.length) {
    lines.push("### Key dates");
    data.timetable.forEach((item) => {
      const time = item.time ? `, ${item.time}` : "";
      const notes = item.notes?.length ? ` — ${item.notes.join(" ")}` : "";
      lines.push(`- ${item.date ?? ""}${time}: ${item.label ?? ""}${notes}`);
    });
  }

  return lines.join("\n\n").trim();
}

export async function loadCourseSections(
  slug: string,
  mdContent: string,
): Promise<CourseSections> {
  const baseDir = path.join(contentDir, "courses", slug);

  const [
    aboutJson,
    scheduleJson,
    evalJson,
    finalJson,
    presentationsJson,
    materialsJson,
  ] = await Promise.all([
    readJson<{
      description?: string;
      questions?: string;
      problems?: string;
      objectives?: string;
      materials?: string;
    }>(path.join(baseDir, "about.json")),
    readJson<{
      main_section?: string;
      parts?: Array<{
        title: string;
        week?: string;
        part_id?: string;
        part_summary?: string;
        tag?: string;
        lectures?: CourseLecture[];
      }>;
    }>(path.join(baseDir, "schedule.json")),
    readJson<EvalJson>(path.join(baseDir, "evaluation.json")),
    readJson<FinalProjectJson>(path.join(baseDir, "final_project.json")),
    readJson<{ presentations?: string }>(path.join(baseDir, "presentations.json")),
    readJson<{
      recommended_textbooks?: {
        authors?: string;
        title?: string;
        edition?: string | null;
        publisher?: string | null;
        year?: string | null;
        url?: string | null;
      }[];
      weekly_materials_note?: string;
      weekly_materials?: { week?: number | string; items?: { label: string; url?: string | null }[] }[];
    }>(path.join(baseDir, "materials.json")),
  ]);

  if (aboutJson || scheduleJson || evalJson || finalJson || presentationsJson || materialsJson) {
    const scheduleParts: CourseSchedulePart[] = [];
    if (scheduleJson?.main_section) {
      scheduleParts.push({
        title: "Class schedule",
        body: scheduleJson.main_section,
        kind: "hero",
        tag: "Overview",
      });
    }
    if (scheduleJson?.parts?.length) {
      scheduleJson.parts.forEach((part) => {
        scheduleParts.push({
          title: part.title,
          tag: part.week || part.tag,
          body: part.part_summary,
          week: part.week,
          partSummary: part.part_summary,
          lectures: part.lectures,
          kind: "section",
        });
      });
    }

    return {
      about: aboutJson?.description ?? mdContent,
      description: aboutJson?.description ?? mdContent,
      questions: aboutJson?.questions,
      problems: aboutJson?.problems,
      objectives: aboutJson?.objectives,
      materials: aboutJson?.materials,
      evaluation: evalJson?.evaluation,
      evaluationData:
        evalJson && (evalJson.grades || evalJson.deadlines)
          ? {
              grades: evalJson.grades,
              deadlines: evalJson.deadlines,
            }
          : undefined,
      evaluationCriteria: evalJson?.criteria,
      scheduleParts,
      finalProject: formatFinalProjectMarkdown(finalJson),
      presentations: presentationsJson?.presentations,
      materialsList: materialsJson
        ? {
            recommended_textbooks: materialsJson.recommended_textbooks,
            weekly_materials_note: materialsJson.weekly_materials_note,
            weekly_materials: materialsJson.weekly_materials,
          }
        : undefined,
    };
  }

  // Fallback to parsing the Markdown directly.
  return parseCourseContent(mdContent);
}
