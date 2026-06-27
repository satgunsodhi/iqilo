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
      <section
        className="relative mb-10 overflow-hidden rounded-[2rem] p-8 shadow-lg sm:p-12 glass-panel"
        style={{ border: "1px solid var(--border-subtle)" }}
      >
        <div className="ambient-glow-purple pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-60 dark:mix-blend-screen" />
        <div className="ambient-glow-blue pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full blur-3xl opacity-40 dark:mix-blend-screen" />
        <div className="noise-overlay"></div>

        <div className="relative z-10">
          {/* Badges row */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
              style={{ background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)", color: "var(--accent-yellow)" }}
            >
              Active quest
            </span>
            {course.difficulty && (
              <span
                className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
                style={{ background: `color-mix(in srgb, ${diffColor} 12%, transparent)`, color: diffColor }}
              >
                {course.difficulty}
              </span>
            )}
            {course.tags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-[11px] font-bold"
                style={{ background: "var(--bg-sunken)", color: "var(--text-faint)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl text-balance" style={{ color: "var(--text-primary)" }}>
                {course.title}
              </h1>
              {course.tagline && (
                <p className="mt-3 text-lg font-semibold italic" style={{ color: "var(--text-muted)" }}>
                  {course.tagline}
                </p>
              )}
              <p className="mt-4 text-base font-medium leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                {course.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold" style={{ color: "var(--text-faint)" }}>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.totalDays} days
                </span>
                {course.estimatedHours && (
                  <span className="flex items-center gap-1.5">
                    <Flame className="h-4 w-4" />
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
                className="button-primary shrink-0 text-base py-4 px-7"
              >
                {hasStarted ? `Continue Day ${nextDay}` : "Start Course"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <span
                className="shrink-0 inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-base font-black"
                style={{
                  border: "1px solid color-mix(in srgb, var(--accent-green) 40%, transparent)",
                  background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                  color: "var(--accent-green)",
                }}
              >
                <Trophy className="h-5 w-5" />
                Course complete!
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Progress summary ─────────────────────────────────────── */}
      {hasStarted && (
        <div
          className="mb-8 rounded-2xl p-5 shadow-sm glass-panel"
          style={{ border: "1px solid var(--border-subtle)" }}
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
      className="overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md relative glass-panel"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      {/* Week header (clickable) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative z-10 flex w-full items-center justify-between gap-4 border-b px-5 py-4 transition-colors hover:bg-[--bg-raised]"
        style={{ borderColor: open ? "var(--border-subtle)" : "transparent", background: open ? "var(--bg-raised)" : "transparent" }}
      >
        {/* Progress accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500" style={{ background: weekDone ? "var(--accent-green)" : stats.percent > 0 ? "var(--accent-purple)" : "transparent" }} />

        <div className="flex items-center gap-4 pl-2">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors"
            style={
              weekDone
                ? { background: "color-mix(in srgb, var(--accent-green) 15%, transparent)", color: "var(--accent-green)" }
                : { background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--accent-purple)" }
            }
          >
            {weekDone ? <Check className="h-5 w-5" strokeWidth={3} /> : week.weekNumber}
          </span>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              Week {week.weekNumber}
            </p>
            <h2 className="text-base font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              {week.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-32">
            <ProgressBar percent={stats.percent} size="sm" />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            {stats.completed}/{stats.total}
          </span>
          <div className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <ChevronDown className="h-5 w-5 shrink-0" style={{ color: "var(--text-faint)" }} />
          </div>
        </div>
      </button>

      {/* Days list with CSS Grid transition */}
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <ul className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
            {week.days.map((day) => {
              const complete = hydrated && isDayComplete(courseId, day.dayNumber);
              return (
                <li
                  key={day.dayNumber}
                  className="group relative flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-[--bg-raised]"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  {/* Subtle row hover glow */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "var(--accent-purple)" }} />
                  
                  <Link
                    href={`/courses/${courseId}/day/${day.dayNumber}`}
                    className="flex min-w-0 flex-1 items-center gap-4 pl-2"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors"
                      style={
                        complete
                          ? { background: "var(--accent-green)", color: "white", boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-green) 30%, transparent)" }
                          : { background: "var(--bg-sunken)", color: "var(--text-muted)" }
                      }
                    >
                      {complete ? <Check className="h-4 w-4" strokeWidth={3} /> : day.dayNumber}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black transition group-hover:text-[--accent-purple]" style={{ color: "var(--text-primary)" }}>
                        Day {day.dayNumber}: {day.title}
                      </p>
                      <p className="truncate text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        {day.objective}
                      </p>
                    </div>
                  </Link>
                  <div className="pl-14 sm:pl-0">
                    <CompletionToggle courseId={courseId} dayNumber={day.dayNumber} size="sm" label="Complete" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
