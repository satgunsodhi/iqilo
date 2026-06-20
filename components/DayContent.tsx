"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, ListChecks, Target } from "lucide-react";
import { useEffect } from "react";
import type { Course, Day, Week } from "@/lib/types";
import { CompletionToggle } from "./CompletionToggle";
import { DaySidebar } from "./DaySidebar";
import { PitfallCallout } from "./PitfallCallout";
import { PracticeCard } from "./PracticeCard";
import { ResourceLink } from "./ResourceLink";
import { useProgress } from "@/hooks/useProgress";

type DayContentProps = {
  course: Course;
  week: Week;
  day: Day;
};

export function DayContent({ course, week, day }: DayContentProps) {
  const { visitDay } = useProgress();
  const prevDay = day.dayNumber > 1 ? day.dayNumber - 1 : null;
  const nextDay =
    day.dayNumber < course.totalDays ? day.dayNumber + 1 : null;

  useEffect(() => {
    visitDay(course.id, day.dayNumber);
  }, [course.id, day.dayNumber, visitDay]);

  return (
    <div className="flex gap-8">
      <DaySidebar course={course} activeDay={day.dayNumber} />

      <div className="min-w-0 flex-1">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8d7c6a] dark:text-[#8996a8]">
          <Link href="/" className="hover:text-[#171411] dark:hover:text-[#e7edf7]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-[#171411] dark:hover:text-[#e7edf7]"
          >
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-[#6f6255] dark:text-[#9aa7b8]">Week {week.weekNumber}</span>
          <span>/</span>
          <span className="text-[#171411] dark:text-[#e7edf7]">Day {day.dayNumber}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-lg bg-[#f7d35f] px-3 py-1 text-xs font-black uppercase text-[#171411]">
              Week {week.weekNumber} · Day {day.dayNumber}
            </p>
            <h1 className="mt-3 text-2xl font-black text-[#171411] dark:text-[#e7edf7] sm:text-3xl">
              {day.title}
            </h1>
          </div>
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        <section className="mb-8 rounded-2xl border border-[#dfd4bf] bg-white p-5 shadow-sm dark:border-[#2a303a] dark:bg-[#151a22]">
          <div className="mb-2 flex items-center gap-2 text-sm font-black text-[#171411] dark:text-[#e7edf7]">
            <Target className="h-4 w-4 text-[#75b064]" />
            Objective
          </div>
          <p className="text-sm font-medium leading-relaxed text-[#6f6255] dark:text-[#9aa7b8]">{day.objective}</p>
        </section>

        {day.protocol && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c] dark:text-[#9aa7b8]">
              Daily Execution Protocol
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "Synthesize", value: day.protocol.synthesize },
                { key: "Grind", value: day.protocol.grind },
                { key: "Bridge", value: day.protocol.bridge },
                { key: "Template", value: day.protocol.template },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 rounded-xl border border-[#dfd4bf] bg-white p-4 shadow-sm dark:border-[#2a303a] dark:bg-[#151a22]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#cdbfa9] bg-[#f6f1dd] text-[#75b064] dark:border-[#343a46] dark:bg-[#1d222b]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="mb-1 text-xs font-black text-[#9d61df]">
                      {item.key}
                    </p>
                    <p className="text-sm font-medium text-[#6f6255] dark:text-[#9aa7b8]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {day.resources && day.resources.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c] dark:text-[#9aa7b8]">
              Resources
            </h2>
            <div className="space-y-3">
              {day.resources.map((resource) => (
                <ResourceLink key={resource.url} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {day.practice && day.practice.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c] dark:text-[#9aa7b8]">
              Practice
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {day.practice.map((problem) => (
                <PracticeCard key={problem.url} problem={problem} />
              ))}
            </div>
          </section>
        )}

        {day.pitfall && (
          <section className="mb-8">
            <PitfallCallout text={day.pitfall} />
          </section>
        )}

        {day.tasks && day.tasks.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-[#7b6c5c] dark:text-[#9aa7b8]">
              <ListChecks className="h-4 w-4" />
              Tasks
            </h2>
            <ul className="space-y-2">
              {day.tasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 rounded-xl border border-[#dfd4bf] bg-white px-4 py-3 text-sm font-medium text-[#6f6255] dark:border-[#2a303a] dark:bg-[#151a22] dark:text-[#9aa7b8]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#cdbfa9] bg-[#f6f1dd] text-[#75b064] dark:border-[#343a46] dark:bg-[#1d222b]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mb-8">
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        <div className="flex items-center justify-between border-t border-[#dfd4bf] pt-6 dark:border-[#2a303a]">
          {prevDay ? (
            <Link
              href={`/courses/${course.id}/day/${prevDay}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#6f6255] transition hover:text-[#171411] dark:text-[#9aa7b8] dark:hover:text-[#e7edf7]"
            >
              <ChevronLeft className="h-4 w-4" />
              Day {prevDay}
            </Link>
          ) : (
            <span />
          )}
          {nextDay ? (
            <Link
              href={`/courses/${course.id}/day/${nextDay}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#593217] transition hover:text-[#171411] dark:text-[#d4b1ff] dark:hover:text-[#e7edf7]"
            >
              Day {nextDay}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/courses/${course.id}`}
              className="text-sm font-bold text-[#593217] hover:text-[#171411] dark:text-[#d4b1ff] dark:hover:text-[#e7edf7]"
            >
              Back to course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
