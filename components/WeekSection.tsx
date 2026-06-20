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
    <section className="overflow-hidden rounded-2xl border border-[#dfd4bf] bg-white shadow-sm">
      <div className="border-b border-[#eadfca] bg-[#fffaf0] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-[#9d61df]">
              Week {week.weekNumber}
            </p>
            <h2 className="mt-0.5 text-lg font-black text-[#171411]">
              {week.title}
            </h2>
          </div>
          <p className="rounded-lg bg-[#e6ddff] px-3 py-1 text-sm font-black text-[#593217]">
            {stats.completed}/{stats.total} days
          </p>
        </div>
        <div className="mt-3">
          <ProgressBar percent={stats.percent} size="sm" />
        </div>
      </div>

      <ul className="divide-y divide-[#eadfca]">
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
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                    complete
                      ? "bg-[#75b064] text-white"
                      : "bg-[#f6f1dd] text-[#7b6c5c] group-hover:bg-[#f7d35f]"
                  }`}
                >
                  {complete ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    day.dayNumber
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#171411]">
                    Day {day.dayNumber}: {day.title}
                  </p>
                  <p className="truncate text-xs font-medium text-[#8d7c6a]">
                    {day.objective}
                  </p>
                </div>
                <ChevronRight className="ml-auto hidden h-4 w-4 shrink-0 text-[#b7a99a] group-hover:text-[#171411] sm:block" />
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
