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
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      {/* top accent gradient line */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-green))" }}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p
              className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ring-1"
              style={{
                background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
                color: "var(--accent-purple)",
                "--tw-ring-color": "color-mix(in srgb, var(--accent-purple) 20%, transparent)",
              } as React.CSSProperties}
            >
              {course.totalDays}-day quest
            </p>
            <h2 className="mt-3 text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              {course.title}
            </h2>
          </div>
          {hydrated && <CircularProgress percent={stats.percent} />}
        </div>

        <p className="mb-5 flex-1 text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>

        {/* Progress row */}
        <div
          className="mb-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
        >
          {hydrated ? (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--accent-purple)" }} />
              <span className="font-black" style={{ color: "var(--accent-green)" }}>
                {stats.completed}
              </span>
              <span className="font-medium" style={{ color: "var(--text-muted)" }}>
                / {stats.total} days complete
              </span>
            </span>
          ) : (
            <span style={{ color: "var(--text-muted)" }}>Loading progress…</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/courses/${course.id}`}
            id={`view-curriculum-${course.id}`}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition hover:opacity-80"
            style={{
              border: "1px solid var(--border-default)",
              background: "var(--bg-raised)",
              color: "var(--text-secondary)",
            }}
          >
            View curriculum
          </Link>
          {!allComplete && (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              id={`continue-${course.id}`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
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
    <article
      className="flex flex-col items-center justify-center rounded-2xl p-8 text-center"
      style={{ border: "1px dashed var(--border-default)", background: "var(--bg-raised)" }}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <span className="text-lg">🚀</span>
      </div>
      <p className="text-sm font-black" style={{ color: "var(--text-secondary)" }}>
        More quests coming soon
      </p>
      <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        Add new courses in{" "}
        <code
          className="rounded px-1 py-0.5 font-mono text-[10px]"
          style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}
        >
          data/courses
        </code>{" "}
        and register them in{" "}
        <code
          className="rounded px-1 py-0.5 font-mono text-[10px]"
          style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}
        >
          lib/courses.ts
        </code>
      </p>
    </article>
  );
}
