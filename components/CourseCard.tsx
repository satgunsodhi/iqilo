"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CircularProgress } from "./ProgressBar";

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner:     { bg: "color-mix(in srgb, var(--accent-green) 12%, transparent)",  text: "var(--accent-green)"  },
  Intermediate: { bg: "color-mix(in srgb, var(--accent-blue) 12%, transparent)",   text: "var(--accent-blue)"   },
  Advanced:     { bg: "color-mix(in srgb, var(--accent-red) 12%, transparent)",    text: "var(--accent-red)"    },
  Expert:       { bg: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", text: "var(--accent-purple)" },
};

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseStats, getNextDay, hydrated, store } = useProgress();
  const hasStarted = hydrated && store[course.id] !== undefined;
  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);
  const allComplete = stats.completed === stats.total;
  const diffColors = DIFFICULTY_COLORS[course.difficulty ?? "Intermediate"];

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      {/* Gradient accent line */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-green))" }}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Top row — badges + circular progress */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {/* Difficulty */}
            {course.difficulty && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide"
                style={{ background: diffColors.bg, color: diffColors.text }}
              >
                {course.difficulty}
              </span>
            )}
            {/* Category */}
            {course.category && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{
                  background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)",
                  color: "var(--accent-purple)",
                }}
              >
                {course.category}
              </span>
            )}
          </div>
          {hasStarted && <CircularProgress percent={stats.percent} size={52} />}
        </div>

        {/* Title */}
        <h2 className="mb-1 text-lg font-black leading-snug tracking-tight" style={{ color: "var(--text-primary)" }}>
          {course.title}
        </h2>
        {course.tagline && (
          <p className="mb-3 text-sm font-semibold italic" style={{ color: "var(--text-muted)" }}>
            {course.tagline}
          </p>
        )}

        {/* Description */}
        <p className="mb-4 flex-1 line-clamp-3 text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {course.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md px-2 py-0.5 text-[10px] font-bold"
                style={{ background: "var(--bg-sunken)", color: "var(--text-faint)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div
          className="mb-4 flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
        >
          {hasStarted ? (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--accent-purple)" }} />
              <span className="font-black" style={{ color: "var(--accent-green)" }}>{stats.completed}</span>
              <span className="font-medium" style={{ color: "var(--text-muted)" }}>/ {stats.total} days</span>
            </span>
          ) : hydrated ? (
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--text-faint)" }} />
              Not started
            </span>
          ) : (
            <span className="skeleton h-4 w-24" />
          )}
          <span className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
            {course.totalDays} days {course.estimatedHours && `· ~${course.estimatedHours}h`}
          </span>
        </div>

        {/* Actions */}
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
              {hasStarted ? "Continue" : "Start Course"}
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
        <code className="rounded px-1 py-0.5 font-mono text-[10px]" style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}>
          data/courses
        </code>{" "}
        and register them in{" "}
        <code className="rounded px-1 py-0.5 font-mono text-[10px]" style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}>
          lib/courses.ts
        </code>
      </p>
    </article>
  );
}
