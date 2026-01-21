# Causality Group @ MBZUAI — MVP

Next.js (App Router) site for the Causality Group led by Professors Kun Zhang. Content lives in `/content` and news is powered by Supabase so updates can happen without redeploys.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site. Tailwind CSS and TypeScript are enabled by default.

## Content editing (no code changes)

- Home copy: `content/home.json` (headline, lede, CTAs, featured projects, highlights).
- Navigation labels: `content/navigation.json`.
- About page: Markdown in `content/about.md`.
- People: `content/people.json` (id/slug, name, role, status, photo_url, bio, links[], research_interests[], order_index). Placeholders use `student_name_one` style so it is obvious what to replace.
- Projects: `content/projects.json` (slug, title, summary, tags[], links[], people_ids[]).
- Publications: `content/publications.json` (slug, title, authors[], venue, year, tags[], links[], summary).
- Courses list: `content/courses.json`. Details: markdown files in `content/courses/<slug>.md` (template files already provided).
- News: Supabase `news` table — not hardcoded. Posts require `published=true`.

## Supabase setup

Create a `news` table with columns: `slug (text, pk)`, `title`, `body (markdown)`, `date (timestamptz)`, `source_url`, `tags (text[])`, `published (boolean)`. Set env vars (see `.env.example`) locally and in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

If Supabase is not configured, placeholder news appears so pages still render.

## Useful scripts

- `npm run dev` — start dev server
- `npm run lint` — lint with ESLint
- `npm run build` — production build

## Notes

- Remote images are allowed from `images.unsplash.com` and `*.supabase.co` (update `next.config.ts` if needed).
- SEO metadata is defined per route; update `metadataBase` in `app/layout.tsx` when deploying.
- MBZUAI brand assets live in `/public/brand` (`logo.png`, `icon.jpeg`, `colors.json`). The UI uses the primary brand color (`#4EC1DE`) for accents and buttons. Replace placeholders in `/content` with real copy when ready.
