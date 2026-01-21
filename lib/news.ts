import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import type { NewsPost } from "@/lib/types";

const newsDir = path.join(process.cwd(), "content", "news");

type NewsMeta = {
  id?: string;
  file?: string;
  title?: string;
  preview_text?: string;
  image_url?: string | null;
  date?: string;
  tags?: string[];
  source_url?: string;
  published?: boolean;
};

async function loadNewsMeta(): Promise<NewsMeta[] | null> {
  try {
    const data = await fs.readFile(path.join(newsDir, "meta.json"), "utf-8");
    return JSON.parse(data) as NewsMeta[];
  } catch {
    return null;
  }
}

async function loadAllNews(): Promise<NewsPost[]> {
  const meta = await loadNewsMeta();
  if (meta?.length) {
    const posts: NewsPost[] = [];
    for (const entry of meta) {
      if (!entry.file) continue;
      const filePath = path.join(newsDir, entry.file);
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(raw);
        const slug = entry.id || (data.id as string) || entry.file.replace(/\.md$/, "");
        const published =
          entry.published !== undefined ? entry.published : data.published !== false;
        if (!published) continue;
        posts.push({
          slug,
          title: entry.title || data.title || slug,
          date: entry.date || data.date || new Date().toISOString(),
          preview_text: entry.preview_text || data.preview_text,
          image_url: entry.image_url || data.image_url,
          body: content.trim(),
          source_url: entry.source_url || data.source_url,
          tags: entry.tags || (Array.isArray(data.tags) ? data.tags.map(String) : undefined),
          published,
        });
      } catch (err) {
        console.warn(`Failed to load news file ${entry.file}`, err);
      }
    }

    return posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  let files: string[] = [];
  try {
    files = await fs.readdir(newsDir);
  } catch {
    return [];
  }

  const posts: NewsPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const fallbackSlug = file.replace(/\.md$/, "");
    try {
      const raw = await fs.readFile(path.join(newsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const published = data.published !== false;
      const slug = (data.id as string) || fallbackSlug;
      posts.push({
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        preview_text: data.preview_text,
        image_url: data.image_url,
        body: content.trim(),
        source_url: data.source_url,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        published,
      });
    } catch (err) {
      console.warn(`Failed to parse news file ${file}`, err);
    }
  }

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsPosts(limit = 10): Promise<NewsPost[]> {
  const posts = await loadAllNews();
  return posts.slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const posts = await loadAllNews();
  return posts.find((post) => post.slug === slug) ?? null;
}
