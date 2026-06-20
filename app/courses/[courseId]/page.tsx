"use client";

import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Course hero */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-[--border-subtle] bg-[--bg-surface] p-6 shadow-sm sm:p-8">
        {/* decorative gradient */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[--accent-purple]/12 to-[--accent-blue]/8 blur-3xl" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-gradient-to-r from-[--accent-yellow]/20 to-[--accent-yellow]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[--text-secondary] ring-1 ring-[--accent-yellow]/30">
              Active quest
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[--text-primary] sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[--text-muted]">
              {course.description}
            </p>
          </div>

          {!hydrated ? null : stats.completed < stats.total ? (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              id={`continue-day-${nextDay}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[--accent-purple] to-[--accent-blue] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
            >
              Continue Day {nextDay}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-xl border border-[--accent-green]/40 bg-gradient-to-r from-[--accent-green]/10 to-[--accent-green]/5 px-4 py-2.5 text-sm font-black text-[--accent-green]">
              <Trophy className="h-4 w-4" />
              Course complete!
            </span>
          )}
        </div>
      </div>

      {/* Progress summary */}
      <div className="mb-6 rounded-2xl border border-[--border-subtle] bg-[--bg-surface] p-5 shadow-sm">
        <div className="mb-2.5 flex items-center justify-between text-sm">
          <span className="font-black text-[--text-primary]">Overall progress</span>
          <span className="font-black text-[--accent-purple]">
            {hydrated ? (
              <>
                {stats.completed}/{stats.total} days · {stats.percent}%
              </>
            ) : (
              "Loading…"
            )}
          </span>
        </div>
        <ProgressBar percent={stats.percent} />
      </div>

      {/* Week sections */}
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
