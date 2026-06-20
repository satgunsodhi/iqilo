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
      <div
        className="relative mb-6 overflow-hidden rounded-2xl p-6 shadow-sm sm:p-8"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        {/* decorative gradient */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)" }}
        />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest ring-1"
              style={{
                background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                color: "var(--text-secondary)",
              }}
            >
              Active quest
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {course.description}
            </p>
          </div>

          {!hydrated ? null : stats.completed < stats.total ? (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              id={`continue-day-${nextDay}`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
            >
              Continue Day {nextDay}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black ring-1"
              style={{
                border: "1px solid color-mix(in srgb, var(--accent-green) 40%, transparent)",
                background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                color: "var(--accent-green)",
              }}
            >
              <Trophy className="h-4 w-4" />
              Course complete!
            </span>
          )}
        </div>
      </div>

      {/* Progress summary */}
      <div
        className="mb-6 rounded-2xl p-5 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="mb-2.5 flex items-center justify-between text-sm">
          <span className="font-black" style={{ color: "var(--text-primary)" }}>Overall progress</span>
          <span className="font-black" style={{ color: "var(--accent-purple)" }}>
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
