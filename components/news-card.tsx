import Link from "next/link";
import type { NewsPost } from "@/lib/types";
import { formatDate, truncate } from "@/lib/utils";

type Props = {
  post: NewsPost;
  compact?: boolean;
};

export function NewsCard({ post, compact }: Props) {
  const summary = post.preview_text || post.body;
  return (
    <article className="card-surface flex h-full flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">
        <span>{formatDate(post.date)}</span>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="pill px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
      {post.image_url ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      ) : null}
      {summary ? (
        <p className="mt-2 text-slate-300">
          {compact ? truncate(summary, 140) : truncate(summary, 220)}
        </p>
      ) : null}
      <div className="mt-auto flex items-center gap-3 pt-4">
        <Link
          href={`/news/${encodeURIComponent(post.slug)}`}
          className="pill px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Read detail
        </Link>
        {post.source_url ? (
          <Link
            href={post.source_url}
            className="text-sm font-semibold text-[var(--accent-strong)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </Link>
        ) : null}
      </div>
    </article>
  );
}
