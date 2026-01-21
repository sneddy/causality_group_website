"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type CardProps = {
  title: string;
  body?: string;
  tag?: string;
  subtitle?: string;
};

export function InfoCard({ title, body, tag, subtitle }: CardProps) {
  const safeBody = body ?? "";
  return (
    <div className="card-surface rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <span className="text-sm text-slate-300">{subtitle}</span> : null}
          {tag ? (
            <span className="pill px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              {tag}
            </span>
          ) : null}
        </div>
      </div>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{safeBody}</ReactMarkdown>
      </div>
    </div>
  );
}
