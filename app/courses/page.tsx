import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { loadCourses } from "@/lib/content";

export const metadata = {
  title: "Courses | Causality Group @ MBZUAI",
  description:
    "Courses taught by the Causality Group at MBZUAI, with details pulled from /content.",
};

export default async function CoursesPage() {
  const courses = await loadCourses();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Courses"
        title="Teaching & coursework"
        description="Course listings and links are stored in /content/courses.json. Content files under /content/courses/ provide the detail pages."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
        {courses.length === 0 ? (
          <p className="text-slate-400">
            Add course entries to <code>/content/courses.json</code> to populate
            this page.
          </p>
        ) : null}
      </div>
    </div>
  );
}
