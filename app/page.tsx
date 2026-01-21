import Link from "next/link";
import { NewsCard } from "@/components/news-card";
import { CourseCard } from "@/components/course-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { loadCourses, loadHomeContent, loadProjects } from "@/lib/content";
import { getNewsPosts } from "@/lib/news";

export const revalidate = 120;

export default async function Home() {
  const [homeContent, news, courses, projects] = await Promise.all([
    loadHomeContent(),
    getNewsPosts(3),
    loadCourses(),
    loadProjects(),
  ]);

  const featuredCourses = courses.slice(0, 3);
  const featuredProjectSlugs = homeContent.featured_projects ?? [];
  const featuredProjects =
    projects.length && featuredProjectSlugs.length
      ? projects.filter((project) => featuredProjectSlugs.includes(project.slug))
      : projects.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1624] via-[#0c1a2d] to-[#0b111d] px-6 py-10 md:px-10">
        <div className="absolute inset-0 opacity-60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,163,59,0.12),transparent_35%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_25%)]" />
        </div>
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              {homeContent.tagline}
            </p>
            <h1
              className="text-3xl leading-tight text-white md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {homeContent.headline}
            </h1>
            <p className="text-lg leading-relaxed text-slate-200">
              {homeContent.lede}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={homeContent.cta_href ?? "/news"}
                className="accent-pill flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-0.5"
              >
                {homeContent.cta_label ?? "Latest news"}
              </Link>
              <Link
                href={homeContent.secondary_href ?? "/people"}
                className="pill px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {homeContent.secondary_label ?? "Meet the team"}
              </Link>
            </div>
          </div>
          <div className="card-surface relative h-full rounded-2xl p-6">
            <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
            <div className="flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Focus areas
              </p>
              <div className="grid gap-3">
                {(homeContent.highlights ?? []).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-3"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(78,193,222,0.18)]" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-300">{item.value}</p>
                    </div>
                  </div>
                ))}
                {!homeContent.highlights?.length ? (
                  <p className="text-slate-400">
                    Add highlights in <code>/content/home.json</code> to populate
                    this panel.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="News"
          title="Latest updates"
          description="News posts are loaded from markdown in /content/news for quick edits."
          action={
            <Link
              href="/news"
              className="pill px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View all news
            </Link>
          }
        />
        {news.length === 0 ? (
          <p className="text-slate-400">
            No news yet — add markdown files under <code>/content/news</code> to populate this
            section.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((post) => (
              <NewsCard key={post.slug} post={post} compact />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Projects"
          title="Featured projects"
          description="Projects are loaded from /content/projects.json for quick updates."
          action={
            <Link
              href="/projects"
              className="pill px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View all projects
            </Link>
          }
        />
        {featuredProjects.length === 0 ? (
          <p className="text-slate-400">
            Add project entries in <code>/content/projects.json</code> to populate this section.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Courses"
          title="Featured courses"
          description="Courses are loaded from /content/courses.json and course detail markdown/JSON."
          action={
            <Link
              href="/courses"
              className="pill px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View all courses
            </Link>
          }
        />
        {featuredCourses.length === 0 ? (
          <p className="text-slate-400">
            Add course entries in <code>/content/courses.json</code> to populate this section.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
