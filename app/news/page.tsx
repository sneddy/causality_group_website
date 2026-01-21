import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { getNewsPosts } from "@/lib/news";

export const metadata = {
  title: "News | Causality Group @ MBZUAI",
  description:
    "Latest news and updates from the Causality Group at MBZUAI, powered by Supabase.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts(50);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="News"
        title="Updates & announcements"
        description="News posts are stored as markdown in /content/news so updates stay simple."
      />
      {posts.length === 0 ? (
        <p className="text-slate-400">
          No news yet. Add markdown files under <code>content/news</code> to populate this page.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
