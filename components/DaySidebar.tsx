"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Menu, X, Play, BookOpen, ExternalLink, ListChecks, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import type { Day, Resource, PracticeProblem } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { getTaskState, toggleTask } from "@/lib/tasks";

type DaySidebarProps = {
  courseId: string;
  day: Day;
  activeItemId: string | null;
  onSelectItem: (id: string, type: "resource" | "practice" | "task" | "protocol", item: any) => void;
};

function SidebarContent({ courseId, day, activeItemId, onSelectItem }: DaySidebarProps) {
  const { isResourceComplete, toggleResource, hydrated } = useProgress();
  const [taskState, setTaskState] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setTaskState(getTaskState(courseId, day.dayNumber));
  }, [courseId, day.dayNumber]);

  const handleTaskToggle = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setTaskState(toggleTask(courseId, day.dayNumber, index));
  };

  const handleResourceToggle = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    toggleResource(courseId, url);
  };

  return (
    <nav className="space-y-6">
      {/* Resources */}
      {day.resources && day.resources.length > 0 && (
        <div>
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
            Resources
          </p>
          <ul className="space-y-1">
            {day.resources.map((res) => {
              const complete = hydrated && isResourceComplete(courseId, res.url);
              const active = activeItemId === res.url;
              return (
                <li key={res.url}>
                  <button
                    onClick={() => onSelectItem(res.url, "resource", res)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-150 text-left"
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        onClick={(e) => handleResourceToggle(e, res.url)}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer"
                        style={
                          complete
                            ? { background: "var(--accent-green)", color: "white" }
                            : { background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "transparent" }
                        }
                      >
                        {complete && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                      <span className={`truncate ${complete ? "line-through opacity-60" : ""}`}>{res.label}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Practice */}
      {day.practice && day.practice.length > 0 && (
        <div>
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
            Practice
          </p>
          <ul className="space-y-1">
            {day.practice.map((prob) => {
              const complete = hydrated && isResourceComplete(courseId, prob.url);
              const active = activeItemId === prob.url;
              return (
                <li key={prob.url}>
                  <button
                    onClick={() => onSelectItem(prob.url, "practice", prob)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-150 text-left"
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-blue) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        onClick={(e) => handleResourceToggle(e, prob.url)}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer"
                        style={
                          complete
                            ? { background: "var(--accent-green)", color: "white" }
                            : { background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "transparent" }
                        }
                      >
                        {complete && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                      <span className={`truncate ${complete ? "line-through opacity-60" : ""}`}>{prob.label}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Tasks */}
      {day.tasks && day.tasks.length > 0 && (
        <div>
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
            Tasks
          </p>
          <ul className="space-y-1">
            {day.tasks.map((task, index) => {
              const complete = hydrated && !!taskState[index];
              const active = activeItemId === `task-${index}`;
              return (
                <li key={index}>
                  <button
                    onClick={() => onSelectItem(`task-${index}`, "task", { task, index })}
                    className="flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-150 text-left"
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-green) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div
                      onClick={(e) => handleTaskToggle(e, index)}
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer"
                      style={
                        complete
                          ? { background: "var(--accent-green)", color: "white" }
                          : { background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "transparent" }
                      }
                    >
                      {complete && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <span className={`line-clamp-2 ${complete ? "line-through opacity-60" : ""}`}>{task}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Protocol */}
      {day.protocol && (
        <div className="pt-2">
          <button
            onClick={() => onSelectItem("protocol", "protocol", day.protocol)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-black transition-all duration-150"
            style={
              activeItemId === "protocol"
                ? { background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))", color: "white" }
                : { background: "var(--bg-raised)", color: "var(--text-primary)" }
            }
          >
            <Activity className="h-4 w-4" />
            Execution Protocol
          </button>
        </div>
      )}
    </nav>
  );
}

export function DaySidebar(props: DaySidebarProps) {
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
        aria-label="Open daily agenda"
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
            aria-label="Close daily agenda"
          />
          <div
            className="absolute bottom-0 left-0 top-0 w-[280px] max-w-[85vw] overflow-y-auto px-4 py-6 shadow-2xl animate-fade-in"
            style={{ background: "var(--bg-base)", borderRight: "1px solid var(--border-subtle)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-black tracking-widest text-primary uppercase">
                Daily Agenda
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 transition hover:bg-[var(--bg-sunken)]"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent {...props} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden shrink-0 transition-all duration-300 lg:block ${
          collapsed ? "w-12" : "w-64"
        }`}
      >
        <div
          className="sticky top-[73px] flex max-h-[calc(100vh-100px)] flex-col rounded-2xl shadow-sm overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          {/* Header & Toggle */}
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
            {!collapsed && (
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Agenda
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-md p-1 transition hover:bg-[var(--bg-sunken)]"
              style={{ color: "var(--text-muted)" }}
              title={collapsed ? "Expand Agenda" : "Collapse"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4 mx-auto" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Content */}
          <div className={`overflow-y-auto px-3 py-4 transition-opacity duration-200 ${collapsed ? "opacity-0 invisible" : "opacity-100"}`}>
            {!collapsed && <SidebarContent {...props} />}
          </div>
        </div>
      </div>
    </>
  );
}
