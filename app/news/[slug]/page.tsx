import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionHeading } from "@/components/section-heading";
import { getNewsBySlug, getNewsPosts } from "@/lib/news";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getNewsPosts(20);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | News | Causality Group @ MBZUAI`,
    description: post.body?.slice(0, 140),
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="News"
        title={post.title}
        description="News content is stored as markdown for quick updates."
        action={
          <Link
            href="/news"
            className="pill px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to news
          </Link>
        }
      />
      <div className="card-surface rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            {formatDate(post.date)}
          </span>
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="pill px-3 py-1 text-xs uppercase">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {post.source_url ? (
            <Link
              href={post.source_url}
              className="text-sm font-semibold text-[var(--accent-strong)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Source link
            </Link>
          ) : null}
        </div>
        <div className="mt-4 markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body || "This post has no content yet."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
