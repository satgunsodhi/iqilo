"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
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
          <p
            className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest"
            style={{ color: "var(--text-faint)" }}
          >
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
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-150"
                    style={
                      active
                        ? {
                            background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
                            color: "var(--text-primary)",
                            outline: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
                          }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors"
                      style={
                        complete
                          ? { background: "var(--accent-green)", color: "white" }
                          : active
                          ? { background: "var(--accent-purple)", color: "white" }
                          : { background: "var(--bg-sunken)", color: "var(--text-muted)" }
                      }
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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/10 transition hover:scale-105 active:scale-95 lg:hidden"
        style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
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
          <aside
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl p-4 shadow-xl"
            style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
                Lessons
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 transition"
                style={{ color: "var(--text-muted)" }}
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
      <aside
        className={`hidden shrink-0 lg:block transition-all duration-300 ${
          collapsed ? "w-12" : "w-64"
        }`}
      >
        <div
          className="sticky top-20 flex max-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300"
          style={{
            border: collapsed ? "transparent" : "1px solid var(--border-subtle)",
            background: collapsed ? "transparent" : "var(--bg-surface)",
          }}
        >
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition hover:opacity-80"
              style={{
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-secondary)",
              }}
              title="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <>
              <div
                className="flex items-center justify-between border-b px-4 py-3"
                style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
              >
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Curriculum
                </span>
                <button
                  onClick={() => setCollapsed(true)}
                  className="rounded p-1 transition hover:bg-[var(--bg-sunken)]"
                  style={{ color: "var(--text-muted)" }}
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <SidebarContent course={course} activeDay={activeDay} />
              </div>
              {activeDay && (
                <div className="flex items-center justify-between border-t p-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}>
                  {activeDay > 1 ? (
                    <Link
                      href={`/courses/${course.id}/day/${activeDay - 1}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                      style={{ color: "var(--text-muted)", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                    >
                      Prev
                    </Link>
                  ) : <div />}
                  {activeDay < course.totalDays ? (
                    <Link
                      href={`/courses/${course.id}/day/${activeDay + 1}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                      style={{ color: "var(--text-primary)", background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)" }}
                    >
                      Next
                    </Link>
                  ) : <div />}
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export function CourseSidebar({ course }: { course: Course }) {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div
        className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl p-3 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <SidebarContent course={course} />
      </div>
    </aside>
  );
}
