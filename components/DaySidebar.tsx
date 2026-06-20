"use client";

import Link from "next/link";
import { Check, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";

type DaySidebarProps = {
  course: Course;
  activeDay?: number;
};

function SidebarContent({ course, activeDay }: DaySidebarProps) {
  const { isDayComplete, hydrated } = useProgress();

  return (
    <nav className="space-y-5">
      {course.weeks.map((week) => (
        <div key={week.weekNumber}>
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-[--text-faint]">
            Week {week.weekNumber}
          </p>
          <ul className="space-y-0.5">
            {week.days.map((day) => {
              const complete =
                hydrated && isDayComplete(course.id, day.dayNumber);
              const active = activeDay === day.dayNumber;
              return (
                <li key={day.dayNumber}>
                  <Link
                    href={`/courses/${course.id}/day/${day.dayNumber}`}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-150 ${
                      active
                        ? "bg-gradient-to-r from-[--accent-purple]/15 to-[--accent-blue]/8 text-[--text-primary] ring-1 ring-[--accent-purple]/20"
                        : "text-[--text-muted] hover:bg-[--bg-raised] hover:text-[--text-primary]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors ${
                        complete
                          ? "bg-[--accent-green] text-white shadow-sm"
                          : active
                            ? "bg-[--accent-purple] text-white shadow-sm"
                            : "bg-[--bg-sunken] text-[--text-muted]"
                      }`}
                    >
                      {complete ? (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      ) : (
                        day.dayNumber
                      )}
                    </span>
                    <span className="truncate">{day.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DaySidebar({ course, activeDay }: DaySidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[--accent-purple] to-[--accent-blue] text-white shadow-lg ring-2 ring-white/10 transition hover:scale-105 active:scale-95 lg:hidden"
        aria-label="Open lesson list"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close lesson list"
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-[--border-subtle] bg-[--bg-surface] p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-[--text-primary]">Lessons</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-[--text-muted] hover:bg-[--bg-raised] hover:text-[--text-primary] transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent course={course} activeDay={activeDay} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-[--border-subtle] bg-[--bg-surface] p-3 shadow-sm">
          <SidebarContent course={course} activeDay={activeDay} />
        </div>
      </aside>
    </>
  );
}

export function CourseSidebar({ course }: { course: Course }) {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-[--border-subtle] bg-[--bg-surface] p-3 shadow-sm">
        <SidebarContent course={course} />
      </div>
    </aside>
  );
}
