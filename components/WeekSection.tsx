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
    <section className="overflow-hidden rounded-2xl border border-[--border-subtle] bg-[--bg-surface] shadow-sm transition hover:shadow-md">
      {/* Week header */}
      <div className="border-b border-[--border-subtle] bg-[--bg-raised] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[--accent-purple]">
              Week {week.weekNumber}
            </p>
            <h2 className="mt-0.5 text-lg font-black tracking-tight text-[--text-primary]">
              {week.title}
            </h2>
          </div>
          <span className="rounded-full bg-gradient-to-r from-[--accent-purple]/15 to-[--accent-blue]/10 px-3 py-1 text-sm font-black text-[--text-secondary] ring-1 ring-[--accent-purple]/20">
            {stats.completed}/{stats.total} days
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar percent={stats.percent} size="sm" />
        </div>
      </div>

      {/* Day list */}
      <ul className="divide-y divide-[--border-subtle]">
        {week.days.map((day) => {
          const complete = hydrated && isDayComplete(course.id, day.dayNumber);
          return (
            <li
              key={day.dayNumber}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                href={`/courses/${course.id}/day/${day.dayNumber}`}
                className="group flex min-w-0 flex-1 items-center gap-3"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors ${
                    complete
                      ? "bg-[--accent-green] text-white shadow-sm"
                      : "bg-[--bg-sunken] text-[--text-muted] group-hover:bg-gradient-to-br group-hover:from-[--accent-yellow]/30 group-hover:to-[--accent-yellow]/10 group-hover:text-[--text-primary]"
                  }`}
                >
                  {complete ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    day.dayNumber
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[--text-primary] transition group-hover:text-[--accent-purple]">
                    Day {day.dayNumber}: {day.title}
                  </p>
                  <p className="truncate text-xs font-medium text-[--text-muted]">
                    {day.objective}
                  </p>
                </div>
                <ChevronRight className="ml-auto hidden h-4 w-4 shrink-0 text-[--text-faint] transition group-hover:text-[--accent-purple] sm:block" />
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
