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
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <Link
            href="/"
            className="transition hover:underline"
            style={{ color: "var(--text-muted)" }}
          >
            Home
          </Link>
          <span style={{ color: "var(--text-faint)" }}>/</span>
          <Link
            href={`/courses/${course.id}`}
            className="transition hover:underline"
            style={{ color: "var(--text-muted)" }}
          >
            {course.title}
          </Link>
          <span style={{ color: "var(--text-faint)" }}>/</span>
          <span style={{ color: "var(--text-secondary)" }}>Week {week.weekNumber}</span>
          <span style={{ color: "var(--text-faint)" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>Day {day.dayNumber}</span>
        </nav>

        {/* Day header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ring-1"
              style={{
                background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                color: "var(--text-secondary)",
              }}
            >
              Week {week.weekNumber} · Day {day.dayNumber}
            </p>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: "var(--text-primary)" }}>
              {day.title}
            </h1>
          </div>
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        {/* Objective */}
        <section className="mb-6 overflow-hidden rounded-2xl shadow-sm" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
          <div className="flex items-center gap-2 border-b px-5 py-3 text-sm font-black" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)", color: "var(--text-primary)" }}>
            <Target className="h-4 w-4" style={{ color: "var(--accent-green)" }} />
            Objective
          </div>
          <p className="px-5 py-4 text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {day.objective}
          </p>
        </section>

        {/* Protocol */}
        {day.protocol && (
          <section className="mb-6">
            <h2 className="mb-3 text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
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
                  className="flex gap-3 rounded-xl p-4 shadow-sm transition"
                  style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                    style={{ background: "color-mix(in srgb, var(--accent-green) 12%, transparent)", color: "var(--accent-green)" }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="mb-1 text-xs font-black" style={{ color: "var(--accent-purple)" }}>
                      {item.key}
                    </p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Resources */}
        {day.resources && day.resources.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              Resources
            </h2>
            <div className="space-y-3">
              {day.resources.map((resource) => (
                <ResourceLink key={resource.url} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {/* Practice */}
        {day.practice && day.practice.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              Practice
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {day.practice.map((problem) => (
                <PracticeCard key={problem.url} problem={problem} />
              ))}
            </div>
          </section>
        )}

        {/* Pitfall */}
        {day.pitfall && (
          <section className="mb-6">
            <PitfallCallout text={day.pitfall} />
          </section>
        )}

        {/* Tasks */}
        {day.tasks && day.tasks.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              <ListChecks className="h-3.5 w-3.5" />
              Tasks
            </h2>
            <ul className="space-y-2">
              {day.tasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-sm"
                  style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                    style={{ background: "var(--bg-sunken)", color: "var(--accent-green)" }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom toggle */}
        <div className="mb-8">
          <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
        </div>

        {/* Day navigation */}
        <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border-subtle)" }}>
          {prevDay ? (
            <Link
              href={`/courses/${course.id}/day/${prevDay}`}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold transition hover:opacity-80"
              style={{ color: "var(--text-muted)", background: "var(--bg-raised)" }}
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
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
            >
              Day {nextDay}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
            >
              Back to course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
