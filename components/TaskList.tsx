"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getTaskState, toggleTask } from "@/lib/tasks";
import type { DayTaskState } from "@/lib/types";

type TaskListProps = {
  courseId: string;
  dayNumber: number;
  tasks: string[];
  onCompleteChange?: (allDone: boolean) => void;
};

export function TaskList({ courseId, dayNumber, tasks, onCompleteChange }: TaskListProps) {
  const [state, setState] = useState<DayTaskState>({});
  const [hydrated, setHydrated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setState(getTaskState(courseId, dayNumber));
    setHydrated(true);
  }, [courseId, dayNumber]);

  const handleToggle = (index: number) => {
    const next = toggleTask(courseId, dayNumber, index);
    setState({ ...next });
  };

  const completed = tasks.filter((_, i) => !!state[i]).length;
  const allDone = completed === tasks.length;

  useEffect(() => {
    if (hydrated && onCompleteChange) {
      onCompleteChange(allDone);
    }
  }, [allDone, hydrated, onCompleteChange]);

  return (
    <section className="mb-6">
      {/* Section header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="mb-3 flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
            Tasks
          </h2>
          {hydrated && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-black"
              style={{
                background: allDone
                  ? "color-mix(in srgb, var(--accent-green) 15%, transparent)"
                  : "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
                color: allDone ? "var(--accent-green)" : "var(--accent-purple)",
              }}
            >
              {completed}/{tasks.length}
            </span>
          )}
        </div>
        <span style={{ color: "var(--text-faint)" }}>
          {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </span>
      </button>

      {!collapsed && (
        <>
          {/* Progress strip */}
          {hydrated && (
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-sunken)" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(completed / tasks.length) * 100}%`,
                  background: allDone
                    ? "var(--accent-green)"
                    : "linear-gradient(90deg, var(--accent-purple), var(--accent-blue))",
                }}
              />
            </div>
          )}

          <ul className="space-y-2">
            {tasks.map((task, i) => {
              const done = hydrated && !!state[i];
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleToggle(i)}
                    disabled={!hydrated}
                    className="group flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] disabled:opacity-60"
                    style={{
                      border: done
                        ? "1px solid color-mix(in srgb, var(--accent-green) 35%, transparent)"
                        : "1px solid var(--border-subtle)",
                      background: done
                        ? "color-mix(in srgb, var(--accent-green) 6%, var(--bg-surface))"
                        : "var(--bg-surface)",
                      color: done ? "var(--text-muted)" : "var(--text-secondary)",
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-200"
                      style={
                        done
                          ? { background: "var(--accent-green)", color: "white" }
                          : { background: "var(--bg-sunken)", border: "1px solid var(--border-default)", color: "transparent" }
                      }
                    >
                      {done && <Check className="h-3 w-3 animate-check-pop" strokeWidth={3} />}
                    </span>
                    <span className={done ? "line-through opacity-60" : ""}>{task}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {hydrated && allDone && (
            <div
              className="mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black animate-fade-in"
              style={{
                background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)",
                color: "var(--accent-green)",
              }}
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
              All tasks complete — great work!
            </div>
          )}
        </>
      )}
    </section>
  );
}
