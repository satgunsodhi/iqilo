"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CircularProgress } from "./ProgressBar";

const COURSE_VISUALS: Record<string, { icon: string }> = {
  "competitive-programming-roadmap": { icon: "⚡" },
  "advanced-bridge-roadmap": { icon: "🌳" },
  "python-for-quants-data-wrangling": { icon: "📊" },
  "python-for-quants-predictive-modeling": { icon: "🤖" },
  "python-for-quants-derivatives-risk": { icon: "📈" },
  "python-for-quants-deep-learning-portfolio": { icon: "🧠" },
};

const DEFAULT_VISUAL = { icon: "🎯" };

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseStats, getNextDay, hydrated, store } = useProgress();
  const hasStarted = hydrated && store[course.id] !== undefined;
  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);
  const allComplete = stats.completed === stats.total;
  const visual = COURSE_VISUALS[course.id] ?? DEFAULT_VISUAL;

  return (
    <article
      className={`group card-shimmer-overlay relative flex flex-col overflow-hidden rounded-[2rem] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl glass-panel`}
      style={{
        border: allComplete
          ? "1px solid var(--text-primary)"
          : "1px solid var(--border-subtle)",
      }}
    >
      {/* Top Ink Wash Gallery Header */}
      <div className="relative h-44 w-full overflow-hidden" style={{ background: "linear-gradient(135deg, var(--bg-sunken) 0%, var(--bg-raised) 100%)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="noise-overlay" />

        {/* Floating Centerpiece Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
            <span className="text-3xl drop-shadow-sm">{visual.icon}</span>
          </div>
        </div>

        {/* Floating Glass Badges Top Row */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2 z-10">
          {course.difficulty && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider shadow-sm"
              style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }}
            >
              {course.difficulty}
            </span>
          )}
          {course.category && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold shadow-sm"
              style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
            >
              {course.category}
            </span>
          )}
        </div>

        {/* Completion status floating badge */}
        {allComplete && (
          <div className="absolute bottom-4 left-4 z-10">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide shadow-md"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-base)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Trophy className="h-3.5 w-3.5" />
              Complete
            </span>
          </div>
        )}

        {/* Circular progress floating bottom right if started */}
        {hasStarted && !allComplete && (
          <div className="absolute bottom-3 right-4 z-10 rounded-full p-1 shadow-md" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
            <CircularProgress percent={stats.percent} size={42} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h2 className="mb-1.5 text-xl font-black leading-snug tracking-tight transition-opacity group-hover:opacity-80" style={{ color: "var(--text-primary)" }}>
          {course.title}
        </h2>
        {course.tagline && (
          <p className="mb-4 text-sm font-semibold italic" style={{ color: "var(--text-muted)" }}>
            {course.tagline}
          </p>
        )}

        {/* Description */}
        <p className="mb-6 flex-1 line-clamp-3 text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1.5">
            {course.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-lg px-2.5 py-1 text-[11px] font-bold shadow-sm"
                style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div
          className="mb-6 flex items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-sm shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
        >
          {hasStarted ? (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
              <span className="font-black" style={{ color: "var(--text-primary)" }}>{stats.completed}</span>
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
          <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
            {course.totalDays} days {course.estimatedHours && `· ~${course.estimatedHours}h`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          <Link
            href={`/courses/${course.id}`}
            id={`view-curriculum-${course.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:bg-[--bg-raised] hover:shadow-sm"
            style={{
              border: "1px solid var(--border-default)",
              background: "transparent",
              color: "var(--text-primary)",
            }}
          >
            View curriculum
          </Link>
          {!allComplete && (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              id={`continue-${course.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-black shadow-md transition-all hover:opacity-90 active:scale-95 group/btn"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-base)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <span>{hasStarted ? "Continue" : "Start Course"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
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
      className="flex flex-col items-center justify-center rounded-[2rem] p-8 text-center shadow-sm glass-panel"
      style={{ border: "1px dashed var(--border-default)" }}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
      >
        <span className="text-2xl">🚀</span>
      </div>
      <p className="text-base font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
        More quests coming soon
      </p>
      <p className="mt-2 text-xs font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Add new courses in{" "}
        <code className="rounded-md px-1.5 py-0.5 font-mono text-[10px] shadow-sm" style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}>
          data/courses
        </code>{" "}
        and register them in{" "}
        <code className="rounded-md px-1.5 py-0.5 font-mono text-[10px] shadow-sm" style={{ background: "var(--bg-sunken)", color: "var(--text-secondary)" }}>
          lib/courses.ts
        </code>
      </p>
    </article>
  );
}

