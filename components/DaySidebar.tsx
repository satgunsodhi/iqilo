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
          <p className="mb-2 px-2 text-[11px] font-black uppercase text-[#8d7c6a]">
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
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#e6ddff] text-[#171411]"
                        : "text-[#6f6255] hover:bg-[#fff7df] hover:text-[#171411]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                        complete
                          ? "bg-[#75b064] text-white"
                          : active
                            ? "bg-[#9d61df] text-white"
                            : "bg-[#eee4d2] text-[#7b6c5c]"
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#171411] text-white shadow-lg lg:hidden"
        aria-label="Open lesson list"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#171411]/55"
            onClick={() => setOpen(false)}
            aria-label="Close lesson list"
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-[#dfd4bf] bg-[#fffaf0] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-[#171411]">Lessons</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-[#6f6255] hover:bg-[#f6f1dd]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent course={course} activeDay={activeDay} />
          </aside>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-[#dfd4bf] bg-white p-3 shadow-sm">
          <SidebarContent course={course} activeDay={activeDay} />
        </div>
      </aside>
    </>
  );
}

export function CourseSidebar({ course }: { course: Course }) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-[#dfd4bf] bg-white p-3 shadow-sm">
        <SidebarContent course={course} />
      </div>
    </aside>
  );
}
