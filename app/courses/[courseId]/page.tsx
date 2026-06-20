"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";
import { CourseSidebar } from "@/components/DaySidebar";
import { ProgressBar } from "@/components/ProgressBar";
import { WeekSection } from "@/components/WeekSection";
import { useProgress } from "@/hooks/useProgress";
import { getCourseById } from "@/lib/courses";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

export default function CoursePage({ params }: PageProps) {
  const { courseId } = use(params);
  const course = getCourseById(courseId);
  const { getCourseStats, getNextDay, hydrated } = useProgress();

  if (!course) notFound();

  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 rounded-2xl border border-[#dfd4bf] bg-[#fffaf0] p-5 shadow-[0_12px_34px_rgba(89,50,23,0.07)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex rounded-full bg-[#f7d35f] px-3 py-1 text-xs font-black uppercase text-[#171411]">
            Active quest
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-[#171411] sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#6f6255]">
            {course.description}
          </p>
        </div>
        {!hydrated ? null : stats.completed < stats.total ? (
          <Link
            href={`/courses/${course.id}/day/${nextDay}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#171411] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#593217]"
          >
            Continue Day {nextDay}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="rounded-xl border border-[#75b064] bg-[#e4f4de] px-4 py-2.5 text-sm font-black text-[#345f2b]">
            Course complete
          </span>
        )}
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-[#dfd4bf] bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-black text-[#171411]">Overall progress</span>
          <span className="font-black text-[#593217]">
            {hydrated ? (
              <>
                {stats.completed}/{stats.total} days · {stats.percent}%
              </>
            ) : (
              "Loading..."
            )}
          </span>
        </div>
        <ProgressBar percent={stats.percent} />
      </div>

      <div className="flex gap-6">
        <CourseSidebar course={course} />
        <div className="min-w-0 flex-1 space-y-6">
          {course.weeks.map((week) => (
            <WeekSection key={week.weekNumber} course={course} week={week} />
          ))}
        </div>
      </div>
    </div>
  );
}
