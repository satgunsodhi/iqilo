"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ListChecks, Target } from "lucide-react";
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
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8d7c6a]">
          <Link href="/" className="hover:text-[#171411]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-[#171411]"
          >
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-[#6f6255]">Week {week.weekNumber}</span>
          <span>/</span>
          <span className="text-[#171411]">Day {day.dayNumber}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-lg bg-[#f7d35f] px-3 py-1 text-xs font-black uppercase text-[#171411]">
              Week {week.weekNumber} · Day {day.dayNumber}
            </p>
            <h1 className="mt-3 text-2xl font-black text-[#171411] sm:text-3xl">
              {day.title}
            </h1>
          </div>
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        <section className="mb-8 rounded-2xl border border-[#dfd4bf] bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-black text-[#171411]">
            <Target className="h-4 w-4 text-[#75b064]" />
            Objective
          </div>
          <p className="text-sm font-medium leading-relaxed text-[#6f6255]">{day.objective}</p>
        </section>

        {day.protocol && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c]">
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
                  className="rounded-xl border border-[#dfd4bf] bg-white p-4 shadow-sm"
                >
                  <p className="mb-1 text-xs font-black text-[#9d61df]">
                    {item.key}
                  </p>
                  <p className="text-sm font-medium text-[#6f6255]">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {day.resources && day.resources.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c]">
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
            <h2 className="mb-3 text-sm font-black uppercase text-[#7b6c5c]">
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
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-[#7b6c5c]">
              <ListChecks className="h-4 w-4" />
              Tasks
            </h2>
            <ul className="space-y-2">
              {day.tasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 rounded-xl border border-[#dfd4bf] bg-white px-4 py-3 text-sm font-medium text-[#6f6255]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#75b064]" />
                  {task}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mb-8">
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        <div className="flex items-center justify-between border-t border-[#dfd4bf] pt-6">
          {prevDay ? (
            <Link
              href={`/courses/${course.id}/day/${prevDay}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#6f6255] transition hover:text-[#171411]"
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
              className="inline-flex items-center gap-1 text-sm font-bold text-[#593217] transition hover:text-[#171411]"
            >
              Day {nextDay}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/courses/${course.id}`}
              className="text-sm font-bold text-[#593217] hover:text-[#171411]"
            >
              Back to course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
