"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronRight, ChevronUp, Clock, Flame, Trophy } from "lucide-react";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { CompletionToggle } from "@/components/CompletionToggle";
import { useProgress } from "@/hooks/useProgress";
import { getCourseById } from "@/lib/courses";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     "var(--accent-green)",
  Intermediate: "var(--accent-blue)",
  Advanced:     "var(--accent-red)",
};

export default function CoursePage({ params }: PageProps) {
  const { courseId } = use(params);
  const course = getCourseById(courseId);
  const { getCourseStats, getNextDay, getWeekStats, isDayComplete, hydrated, store } = useProgress();

  if (!course) notFound();

  const hasStarted = hydrated && store[course.id] !== undefined;

  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);
  const diffColor = DIFFICULTY_COLORS[course.difficulty ?? "Intermediate"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

      {/* ── Course hero ─────────────────────────────────────────── */}
      <div
        className="relative mb-6 overflow-hidden rounded-2xl p-6 shadow-sm sm:p-10"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        {/* Decorative gradient */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-20 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-blue) 6%, transparent)" }}
        />

        <div className="relative">
          {/* Badges row */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
              style={{ background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)", color: "var(--text-secondary)" }}
            >
              Active quest
            </span>
            {course.difficulty && (
              <span
                className="rounded-full px-3 py-1 text-[11px] font-black uppercase"
                style={{ background: `color-mix(in srgb, ${diffColor} 12%, transparent)`, color: diffColor }}
              >
                {course.difficulty}
              </span>
            )}
            {course.tags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                style={{ background: "var(--bg-sunken)", color: "var(--text-faint)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                {course.title}
              </h1>
              {course.tagline && (
                <p className="mt-2 text-base font-semibold italic" style={{ color: "var(--text-muted)" }}>
                  {course.tagline}
                </p>
              )}
              <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {course.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold" style={{ color: "var(--text-faint)" }}>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.totalDays} days
                </span>
                {course.estimatedHours && (
                  <span className="flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    ~{course.estimatedHours}h total
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            {!hydrated ? null : stats.completed < stats.total ? (
              <Link
                href={`/courses/${course.id}/day/${nextDay}`}
                id={`continue-day-${nextDay}`}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
              >
                {hasStarted ? `Continue Day ${nextDay}` : "Start Course"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
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
      </div>

      {/* ── Progress summary ─────────────────────────────────────── */}
      {hasStarted && (
        <div
          className="mb-8 rounded-2xl p-5 shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="mb-2.5 flex items-center justify-between text-sm">
            <span className="font-black" style={{ color: "var(--text-primary)" }}>Overall progress</span>
            <span className="font-black" style={{ color: "var(--accent-purple)" }}>
              {hydrated ? <>{stats.completed}/{stats.total} days · {stats.percent}%</> : "Loading…"}
            </span>
          </div>
          <ProgressBar percent={stats.percent} />
        </div>
      )}

      {/* ── Week accordion ───────────────────────────────────────── */}
      <div className="space-y-4">
        {course.weeks.map((week) => (
          <WeekAccordion
            key={week.weekNumber}
            courseId={course.id}
            week={week}
            getWeekStats={getWeekStats}
            isDayComplete={isDayComplete}
            hydrated={hydrated}
          />
        ))}
      </div>
    </div>
  );
}

// ── Inline WeekAccordion ───────────────────────────────────────────────────
import type { Week } from "@/lib/types";

function WeekAccordion({
  courseId,
  week,
  getWeekStats,
  isDayComplete,
  hydrated,
}: {
  courseId: string;
  week: Week;
  getWeekStats: (courseId: string, dayNumbers: number[]) => { completed: number; total: number; percent: number };
  isDayComplete: (courseId: string, dayNumber: number) => boolean;
  hydrated: boolean;
}) {
  const [open, setOpen] = useState(week.weekNumber === 1);
  const dayNumbers = week.days.map((d) => d.dayNumber);
  const stats = getWeekStats(courseId, dayNumbers);
  const weekDone = hydrated && stats.completed === stats.total;

  return (
    <section
      className="overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      {/* Week header (clickable) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 border-b px-5 py-4"
        style={{ borderColor: open ? "var(--border-subtle)" : "transparent", background: "var(--bg-raised)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black"
            style={
              weekDone
                ? { background: "var(--accent-green)", color: "white" }
                : { background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--accent-purple)" }
            }
          >
            {weekDone ? <Check className="h-4 w-4" strokeWidth={3} /> : week.weekNumber}
          </span>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent-purple)" }}>
              Week {week.weekNumber}
            </p>
            <h2 className="text-base font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              {week.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block" style={{ width: "120px" }}>
            <ProgressBar percent={stats.percent} size="sm" />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            {stats.completed}/{stats.total}
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 shrink-0" style={{ color: "var(--text-faint)" }} />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0" style={{ color: "var(--text-faint)" }} />
          )}
        </div>
      </button>

      {/* Days list */}
      {open && (
        <ul className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
          {week.days.map((day) => {
            const complete = hydrated && isDayComplete(courseId, day.dayNumber);
            return (
              <li
                key={day.dayNumber}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <Link
                  href={`/courses/${courseId}/day/${day.dayNumber}`}
                  className="group flex min-w-0 flex-1 items-center gap-3"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors"
                    style={
                      complete
                        ? { background: "var(--accent-green)", color: "white" }
                        : { background: "var(--bg-sunken)", color: "var(--text-muted)" }
                    }
                  >
                    {complete ? <Check className="h-4 w-4" strokeWidth={3} /> : day.dayNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black transition group-hover:underline" style={{ color: "var(--text-primary)" }}>
                      Day {day.dayNumber}: {day.title}
                    </p>
                    <p className="truncate text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      {day.objective}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto hidden h-4 w-4 shrink-0 sm:block" style={{ color: "var(--text-faint)" }} />
                </Link>
                <CompletionToggle courseId={courseId} dayNumber={day.dayNumber} size="sm" label="Complete" />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
