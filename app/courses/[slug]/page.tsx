import { notFound } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { CourseTabsSimple } from "@/components/course-tabs-simple";
import { loadCourseDetail, loadCourses } from "@/lib/content";
import { loadCourseSections } from "@/lib/courseParsing";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const courses = await loadCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = await loadCourseDetail(slug);
  if (!course) return {};

  return {
    title: `${course.title} | Courses | Causality Group @ MBZUAI`,
    description: course.summary,
  };
}

export default async function CourseDetail({ params }: Props) {
  const { slug } = await params;
  const course = await loadCourseDetail(slug);

  if (!course) {
    notFound();
  }

  const parsed = await loadCourseSections(slug, course.content ?? "");

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Course"
        title={course.title}
        description={course.summary}
        action={
          <Link
            href="/courses"
            className="pill px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to courses
          </Link>
        }
      />

      <CourseTabsSimple content={course.content ?? ""} sections={parsed} />
    </div>
  );
}
