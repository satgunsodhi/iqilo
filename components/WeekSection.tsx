"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { Course, Week } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CompletionToggle } from "./CompletionToggle";
import { ProgressBar } from "./ProgressBar";

type WeekSectionProps = {
  course: Course;
  week: Week;
};

export function WeekSection({ course, week }: WeekSectionProps) {
  const { getWeekStats, isDayComplete, hydrated } = useProgress();
  const dayNumbers = week.days.map((d) => d.dayNumber);
  const stats = getWeekStats(course.id, dayNumbers);

  return (
    <section
      className="overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      {/* Week header */}
      <div
        className="border-b px-5 py-4"
        style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent-purple)" }}>
              Week {week.weekNumber}
            </p>
            <h2 className="mt-0.5 text-lg font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              {week.title}
            </h2>
          </div>
          <span
            className="rounded-full px-3 py-1 text-sm font-black ring-1"
            style={{
              background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
              color: "var(--text-secondary)",
              ringColor: "color-mix(in srgb, var(--accent-purple) 20%, transparent)",
            }}
          >
            {stats.completed}/{stats.total} days
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar percent={stats.percent} size="sm" />
        </div>
      </div>

      {/* Day list */}
      <ul className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {week.days.map((day) => {
          const complete = hydrated && isDayComplete(course.id, day.dayNumber);
          return (
            <li
              key={day.dayNumber}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <Link
                href={`/courses/${course.id}/day/${day.dayNumber}`}
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
                  {complete ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    day.dayNumber
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black transition" style={{ color: "var(--text-primary)" }}>
                    Day {day.dayNumber}: {day.title}
                  </p>
                  <p className="truncate text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {day.objective}
                  </p>
                </div>
                <ChevronRight className="ml-auto hidden h-4 w-4 shrink-0 transition sm:block" style={{ color: "var(--text-faint)" }} />
              </Link>
              <CompletionToggle
                courseId={course.id}
                dayNumber={day.dayNumber}
                size="sm"
                label="Complete"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
