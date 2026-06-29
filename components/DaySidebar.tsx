"use client";

import { Check, ChevronLeft, ChevronRight, Menu, X, Activity, FileText, Code, Play } from "lucide-react";
import { useState, useEffect } from "react";
import type { Day } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { getTaskState, toggleTask } from "@/lib/tasks";

import { useToast } from "@/components/ToastNotification";
import { getResourceXp, getTaskXp } from "@/lib/progress";
import { useLeetCode } from "@/hooks/useLeetCode";

type DaySidebarProps = {
  courseId: string;
  day: Day;
  activeItemId: string | null;
  onSelectItem: (id: string, type: "resource" | "practice" | "task" | "protocol", item: unknown) => void;
  hideDesktop?: boolean;
};

function Favicon({ url, fallback: Fallback, complete }: { url: string; fallback: React.ComponentType<any>; complete: boolean }) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) return;
    try {
      const domain = new URL(url).hostname;
      setSrc(`https://www.google.com/s2/favicons?sz=64&domain=${domain}`);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [url]);

  if (failed || !src) {
    return <Fallback className="h-4 w-4 shrink-0" style={{ color: complete ? "var(--accent-green)" : "var(--text-muted)" }} />;
  }

  return (
    <img
      src={src}
      alt=""
      className={`h-4 w-4 shrink-0 rounded transition-opacity ${complete ? "opacity-60" : ""}`}
      onError={() => setFailed(true)}
    />
  );
}

type SidebarContentProps = DaySidebarProps & { collapsed?: boolean };

function SidebarContent({ courseId, day, activeItemId, onSelectItem, collapsed }: SidebarContentProps) {
  const { isResourceComplete, toggleResource, hydrated } = useProgress();
  const { isSolved: isLeetCodeSolved } = useLeetCode();
  const { toast } = useToast();
  const [taskState, setTaskState] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTaskState(getTaskState(courseId, day.dayNumber));
    }, 0);
    return () => clearTimeout(timer);
  }, [courseId, day.dayNumber]);

  const handleTaskToggle = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setTaskState(toggleTask(courseId, day.dayNumber, index));
  };

  const handleResourceToggle = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    const wasDone = isResourceComplete(courseId, url);
    toggleResource(courseId, url);
    if (!wasDone) {
      const xp = getResourceXp(courseId, url);
      if (xp > 0) {
        toast(`+${xp} XP earned!`, "success");
      }
    }
  };

  return (
    <nav className="space-y-6">
      {/* Resources */}
      {day.resources && day.resources.length > 0 && (
        <div>
          {!collapsed && (
            <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
              Resources
            </p>
          )}
          <ul className="space-y-1">
            {day.resources.map((res) => {
              const complete = hydrated && isResourceComplete(courseId, res.url);
              const active = activeItemId === res.url;
              return (
                <li key={res.url}>
                  <button
                    onClick={() => onSelectItem(res.url, "resource", res)}
                    title={collapsed ? res.label : undefined}
                    className={`flex w-full items-center rounded-lg py-2 text-sm font-semibold transition-all duration-150 text-left ${collapsed ? "justify-center px-0" : "justify-between px-2"}`}
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {!collapsed && (
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
                      )}
                      <Favicon
                        url={res.url}
                        fallback={res.url?.includes("youtube") || res.embed === "youtube" ? Play : FileText}
                        complete={complete}
                      />
                      {!collapsed && <span className={`truncate ${complete ? "line-through opacity-60" : ""}`}>{res.label}</span>}
                    </div>
                    {!collapsed && getResourceXp(courseId, res.url) > 0 && (
                      <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ml-2"
                        style={{ background: "var(--bg-sunken)", color: "var(--accent-purple)" }}
                      >
                        +{getResourceXp(courseId, res.url)}
                      </span>
                    )}
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
          {!collapsed && (
            <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
              Practice
            </p>
          )}
          <ul className="space-y-1">
            {day.practice.map((prob) => {
              const lcSolved = prob.platform === "leetcode" && isLeetCodeSolved(prob.url);
              const complete = hydrated && (isResourceComplete(courseId, prob.url) || lcSolved);
              const active = activeItemId === prob.url;
              return (
                <li key={prob.url}>
                  <button
                    onClick={() => onSelectItem(prob.url, "practice", prob)}
                    title={collapsed ? prob.label : undefined}
                    className={`flex w-full items-center rounded-lg py-2 text-sm font-semibold transition-all duration-150 text-left ${collapsed ? "justify-center px-0" : "justify-between px-2"}`}
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-blue) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {!collapsed && (
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
                      )}
                      <Favicon url={prob.url} fallback={Code} complete={complete} />
                      {!collapsed && <span className={`truncate ${complete ? "line-through opacity-60" : ""}`}>{prob.label}</span>}
                    </div>
                    {!collapsed && getResourceXp(courseId, prob.url) > 0 && (
                      <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ml-2"
                        style={{ background: "var(--bg-sunken)", color: "var(--accent-blue)" }}
                      >
                        +{getResourceXp(courseId, prob.url)}
                      </span>
                    )}
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
          {!collapsed && (
            <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
              Tasks
            </p>
          )}
          <ul className="space-y-1">
            {day.tasks.map((task, index) => {
              const complete = hydrated && !!taskState[index];
              const active = activeItemId === `task-${index}`;
              return (
                <li key={index}>
                  <button
                    onClick={() => onSelectItem(`task-${index}`, "task", { task, index })}
                    title={collapsed ? task : undefined}
                    className={`flex w-full items-start rounded-lg py-2 text-sm font-semibold transition-all duration-150 text-left ${collapsed ? "justify-center px-0 gap-0" : "gap-2.5 px-2"}`}
                    style={
                      active
                        ? { background: "color-mix(in srgb, var(--accent-green) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <div
                        onClick={(e) => handleTaskToggle(e, index)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer ${collapsed ? "mx-auto" : ""}`}
                        style={
                          complete
                            ? { background: "var(--accent-green)", color: "white" }
                            : { background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "transparent" }
                        }
                      >
                        {complete && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                      {!collapsed && <span className={`line-clamp-2 ${complete ? "line-through opacity-60" : ""}`}>{task}</span>}
                    </div>
                    {!collapsed && getTaskXp(courseId, day.dayNumber) > 0 && (
                      <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ml-2 mt-0.5"
                        style={{ background: "var(--bg-sunken)", color: "var(--accent-green)" }}
                      >
                        +{getTaskXp(courseId, day.dayNumber)}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Protocol */}
      {day.protocol && (
        <div>
          {!collapsed && (
            <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-faint" style={{ color: "var(--text-faint)" }}>
              Protocol
            </p>
          )}
          <button
            onClick={() => onSelectItem("protocol", "protocol", day.protocol)}
            title={collapsed ? "Execution Protocol" : undefined}
            className={`flex w-full items-center rounded-lg py-2 text-sm font-semibold transition-all duration-150 text-left ${collapsed ? "justify-center px-0 gap-0" : "gap-2.5 px-2"}`}
            style={
              activeItemId === "protocol"
                ? { background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--text-primary)", outline: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)" }
                : { color: "var(--text-muted)" }
            }
          >
            <Activity className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
            {!collapsed && <span className="truncate">Execution Protocol</span>}
          </button>
        </div>
      )}
    </nav>
  );
}

export function DaySidebar(props: DaySidebarProps) {
  const { hideDesktop } = props;
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

      {/* Desktop sidebar — hidden when a panel is active (hideDesktop) */}
      <div
        className={`shrink-0 transition-all duration-300 ${
          hideDesktop ? "hidden" : `hidden lg:block ${collapsed ? "w-12" : "w-64"}`
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
          <div className="overflow-y-auto px-3 py-4 transition-opacity duration-200">
            <SidebarContent {...props} collapsed={collapsed} />
          </div>
        </div>
      </div>
    </>
  );
}
