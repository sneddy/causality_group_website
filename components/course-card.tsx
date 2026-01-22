import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types";

type Props = {
  course: Course;
};

export function CourseCard({ course }: Props) {
  return (
    <div className="card-surface flex h-full flex-col gap-3 rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white shadow-md">
          <Image
            src="/course_logo.png"
            alt="Course logo"
            fill
            className="object-contain p-1.5"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            {course.term}
          </span>
          <h3 className="text-xl font-semibold text-white leading-tight">{course.title}</h3>
        </div>
      </div>
      <p className="text-slate-300">{course.summary}</p>
      <div className="text-sm text-slate-400">
        <p>Location: {course.location ?? "TBA"}</p>
        {course.instructors?.length ? (
          <p className="mt-1">
            Instructors:{" "}
            <span className="text-slate-200">
              {course.instructors.join(", ")}
            </span>
          </p>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href={`/courses/${course.slug}`}
          className="pill px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          View details
        </Link>
        {course.links?.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="text-sm font-semibold text-[var(--accent-strong)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
