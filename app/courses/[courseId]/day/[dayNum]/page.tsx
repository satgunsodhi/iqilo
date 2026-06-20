import { notFound } from "next/navigation";
import { DayContent } from "@/components/DayContent";
import { getCourseById, getDayByNumber } from "@/lib/courses";

type PageProps = {
  params: Promise<{ courseId: string; dayNum: string }>;
};

export default async function DayPage({ params }: PageProps) {
  const { courseId, dayNum } = await params;
  const dayNumber = Number(dayNum);
  const course = getCourseById(courseId);

  if (!course || Number.isNaN(dayNumber)) notFound();

  const result = getDayByNumber(course, dayNumber);
  if (!result) notFound();

  const { day, week } = result;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <DayContent course={course} week={week} day={day} />
    </div>
  );
}

export async function generateStaticParams() {
  const { listCourses } = await import("@/lib/courses");
  const courses = listCourses();
  const params: { courseId: string; dayNum: string }[] = [];

  for (const course of courses) {
    for (let day = 1; day <= course.totalDays; day++) {
      params.push({ courseId: course.id, dayNum: String(day) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { courseId, dayNum } = await params;
  const course = getCourseById(courseId);
  const dayNumber = Number(dayNum);
  const result = course ? getDayByNumber(course, dayNumber) : undefined;

  if (!result) return { title: "Day not found" };

  return {
    title: `Day ${dayNumber}: ${result.day.title} | iqilo`,
    description: result.day.objective,
  };
}
