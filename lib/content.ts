import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import {
  Course,
  CourseWithContent,
  HomeContent,
  NavigationItem,
  Person,
  Publication,
  Project,
} from "@/lib/types";

const contentDir = path.join(process.cwd(), "content");

async function readJsonFile<T>(relativePath: string, fallback: T): Promise<T> {
  try {
    const file = await fs.readFile(path.join(contentDir, relativePath), "utf-8");
    return JSON.parse(file) as T;
  } catch (error) {
    console.warn(`Content file missing or invalid: ${relativePath}`, error);
    return fallback;
  }
}

async function readMarkdownFile(relativePath: string): Promise<string> {
  try {
    return await fs.readFile(path.join(contentDir, relativePath), "utf-8");
  } catch (error) {
    console.warn(`Markdown content missing: ${relativePath}`, error);
    return "";
  }
}

export const loadNavigation = cache(async (): Promise<NavigationItem[]> =>
  readJsonFile<NavigationItem[]>("navigation.json", [
    { label: "Home", href: "/" },
    { label: "People", href: "/people" },
    { label: "Projects", href: "/projects" },
    { label: "Courses", href: "/courses" },
    { label: "Publications", href: "/publications" },
    { label: "News", href: "/news" },
  ]),
);

export const loadHomeContent = cache(
  async (): Promise<HomeContent> =>
    readJsonFile<HomeContent>("home.json", {
      tagline: "Causality Group @ MBZUAI",
      headline: "Understanding interventions and building reliable intelligence.",
      lede:
        "Placeholder content: update /content/home.json to edit headline, CTA, and highlights.",
      cta_label: "See the latest news",
      cta_href: "/news",
      secondary_label: "Meet the team",
      secondary_href: "/people",
      highlights: [],
    }),
);

export const loadAboutContent = cache(async (): Promise<string> =>
  readMarkdownFile("about.md"),
);

export const loadPeople = cache(async (): Promise<Person[]> => {
  const people = await readJsonFile<Person[]>("people.json", []);
  return people.sort((a, b) => {
    const aIndex = a.order_index ?? Number.MAX_SAFE_INTEGER;
    const bIndex = b.order_index ?? Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) return aIndex - bIndex;
    return a.name.localeCompare(b.name);
  });
});

export const loadProjects = cache(async (): Promise<Project[]> =>
  readJsonFile<Project[]>("projects.json", []),
);

export const loadPublications = cache(async (): Promise<Publication[]> =>
  readJsonFile<Publication[]>("publications.json", []),
);

export const loadCourses = cache(async (): Promise<Course[]> =>
  readJsonFile<Course[]>("courses.json", []),
);

export const loadCourseDetail = cache(
  async (slug: string): Promise<CourseWithContent | null> => {
    const courses = await loadCourses();
    const match = courses.find((course) => course.slug === slug);
    if (!match) return null;

    const content = await readMarkdownFile(path.join("courses", `${slug}.md`));
    return { ...match, content };
  },
);
