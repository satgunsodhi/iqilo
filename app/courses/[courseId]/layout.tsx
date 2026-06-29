import type { Metadata } from "next";
import { getCourseById } from "@/lib/courses";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  const title = `${course.title} Roadmap`;
  const description = course.tagline 
    ? `${course.tagline} Track your progress and earn XP while mastering ${course.title} on Iqilo.`
    : `Master ${course.title} with our gamified tech skill roadmap on Iqilo.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
