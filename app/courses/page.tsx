"use client";

import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";

export default function CoursesPage() {
  const courses = listCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="courses-title text-3xl font-black tracking-tight sm:text-4xl">
          All Courses
        </h1>
        <p className="courses-subtitle mt-2 text-sm font-medium sm:text-base">
          Explore our structured learning paths and master new skills
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <ComingSoonCard />
      </div>
    </div>
  );
}
