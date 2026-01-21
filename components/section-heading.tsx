type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="mt-3 font-semibold text-white" style={{ fontSize: "1.9rem" }}>
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-300">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="md:pb-2">{action}</div> : null}
    </div>
  );
}
