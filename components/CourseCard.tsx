"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CircularProgress } from "./ProgressBar";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseStats, getNextDay, hydrated } = useProgress();
  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);
  const allComplete = stats.completed === stats.total;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[--border-subtle] bg-[--bg-surface] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--border-default] hover:shadow-md">
      {/* top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[--accent-purple] via-[--accent-blue] to-[--accent-green]" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-full bg-gradient-to-r from-[--accent-purple]/15 to-[--accent-blue]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[--accent-purple] ring-1 ring-[--accent-purple]/20">
              {course.totalDays}-day quest
            </p>
            <h2 className="mt-3 text-xl font-black tracking-tight text-[--text-primary]">
              {course.title}
            </h2>
          </div>
          {hydrated && <CircularProgress percent={stats.percent} />}
        </div>

        <p className="mb-5 flex-1 text-sm font-medium leading-relaxed text-[--text-muted]">
          {course.description}
        </p>

        {/* Progress row */}
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-[--border-subtle] bg-[--bg-raised] px-4 py-3 text-sm">
          {hydrated ? (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[--accent-purple]" />
              <span className="font-black text-[--accent-green]">
                {stats.completed}
              </span>
              <span className="font-medium text-[--text-muted]">
                / {stats.total} days complete
              </span>
            </span>
          ) : (
            <span className="text-[--text-muted]">Loading progress…</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/courses/${course.id}`}
            id={`view-curriculum-${course.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[--border-default] bg-[--bg-raised] px-4 py-2 text-sm font-bold text-[--text-secondary] transition hover:border-[--border-strong] hover:bg-[--bg-sunken] hover:text-[--text-primary]"
          >
            View curriculum
          </Link>
          {!allComplete && (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              id={`continue-${course.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[--accent-purple] to-[--accent-blue] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ComingSoonCard() {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[--border-default] bg-[--bg-raised]/50 p-8 text-center">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[--border-subtle] bg-[--bg-surface]">
        <span className="text-lg">🚀</span>
      </div>
      <p className="text-sm font-black text-[--text-secondary]">
        More quests coming soon
      </p>
      <p className="mt-1.5 text-xs font-medium text-[--text-muted]">
        Add new courses in{" "}
        <code className="rounded bg-[--bg-sunken] px-1 py-0.5 font-mono text-[10px] text-[--text-secondary]">
          data/courses
        </code>{" "}
        and register them in{" "}
        <code className="rounded bg-[--bg-sunken] px-1 py-0.5 font-mono text-[10px] text-[--text-secondary]">
          lib/courses.ts
        </code>
      </p>
    </article>
  );
}
