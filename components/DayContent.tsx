"use client";

import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Link2,
  Target,
  X,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Course, Day, Week, Resource } from "@/lib/types";
import { CompletionToggle } from "./CompletionToggle";
import { DayNotes } from "./DayNotes";
import { DaySidebar } from "./DaySidebar";
import { PitfallCallout } from "./PitfallCallout";
import { PracticeCard } from "./PracticeCard";
import { ResourceLink } from "./ResourceLink";
import { TaskList } from "./TaskList";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "./ToastNotification";

type DayContentProps = {
  course: Course;
  week: Week;
  day: Day;
};

const PROTOCOL_META = [
  { key: "synthesize", label: "Synthesize", time: "~45 min", color: "var(--accent-purple)" },
  { key: "grind",      label: "Grind",      time: "~75 min", color: "var(--accent-red)"    },
  { key: "bridge",     label: "Bridge",     time: "~30 min", color: "var(--accent-blue)"   },
  { key: "template",   label: "Template",   time: "~15 min", color: "var(--accent-green)"  },
] as const;

export function DayContent({ course, week, day }: DayContentProps) {
  const { visitDay, getCourseStats, isDayComplete, toggleDay, isResourceComplete, toggleResource, hydrated } = useProgress();
  const { toast } = useToast();
  const [tasksDone, setTasksDone] = useState(day.tasks ? day.tasks.length === 0 : true);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeItemType, setActiveItemType] = useState<"resource" | "practice" | "task" | "protocol" | null>(null);
  const [activeItemData, setActiveItemData] = useState<any>(null);

  const handleSelectItem = (id: string, type: "resource" | "practice" | "task" | "protocol", item: any) => {
    setActiveItemId(id);
    setActiveItemType(type);
    setActiveItemData(item);
  };

  const prevDay = day.dayNumber > 1 ? day.dayNumber - 1 : null;
  const nextDay = day.dayNumber < course.totalDays ? day.dayNumber + 1 : null;
  const stats = getCourseStats(course);
  const percent = hydrated ? stats.percent : 0;
  const complete = hydrated && isDayComplete(course.id, day.dayNumber);

  useEffect(() => {
    visitDay(course.id, day.dayNumber);
  }, [course.id, day.dayNumber, visitDay]);

  // Auto-complete logic
  useEffect(() => {
    if (!hydrated || complete) return;

    const resourcesDone = day.resources
      ? day.resources.every((r) => isResourceComplete(course.id, r.url))
      : true;

    if (resourcesDone && tasksDone) {
      toggleDay(course.id, day.dayNumber, true);
      toast("Completed! Great job.", "success");
    }
  }, [hydrated, complete, day.resources, tasksDone, isResourceComplete, course.id, day.dayNumber, toggleDay, toast]);

  // Item active timer for auto-completion
  useEffect(() => {
    if (!hydrated || !activeItemId || activeItemType !== "resource") return;
    
    // Only auto-tick resources that aren't already complete
    if (isResourceComplete(course.id, activeItemId)) return;

    const timer = setTimeout(() => {
      toggleResource(course.id, activeItemId);
      toast("Marked as read!", "success");
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [hydrated, activeItemId, activeItemType, course.id, isResourceComplete, toggleResource, toast]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!", "success");
    } catch {
      toast("Couldn't copy — try manually.", "warning");
    }
  };

  return (
    <div className="flex gap-8">
      {!activeItemType && (
        <DaySidebar courseId={course.id} day={day} activeItemId={activeItemId} onSelectItem={handleSelectItem} />
      )}

      <div className="min-w-0 flex-1">
        {/* ── Sticky progress bar ─────────────────────────────────── */}
        {!activeItemType && (
          <>
            <div
              className="sticky top-[57px] z-20 -mx-4 mb-6 px-4 pb-2 pt-3 sm:-mx-6 sm:px-6"
              style={{ background: "var(--bg-base)" }}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span style={{ color: "var(--text-muted)" }}>
                  Week {week.weekNumber} · Day {day.dayNumber} of {course.totalDays}
                </span>
                <span style={{ color: "var(--accent-purple)" }}>{percent}% course complete</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-sunken)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percent}%`,
                    background: "linear-gradient(90deg, var(--accent-purple), var(--accent-green))",
                  }}
                />
              </div>
            </div>

            {/* ── Breadcrumb ───────────────────────────────────────────── */}
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <Link href="/" className="transition hover:underline" style={{ color: "var(--text-muted)" }}>
                Home
              </Link>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <Link href={`/courses/${course.id}`} className="transition hover:underline" style={{ color: "var(--text-muted)" }}>
                {course.title}
              </Link>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <Link href={`/courses/${course.id}#week-${week.weekNumber}`} className="transition hover:underline" style={{ color: "var(--text-secondary)" }}>
                Week {week.weekNumber}
              </Link>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <span style={{ color: "var(--text-primary)" }}>Day {day.dayNumber}</span>
            </nav>
          </>
        )}

        {activeItemType ? (
          <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden animate-fade-in" style={{ height: "calc(100vh - 6rem)", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSelectItem(null as any, null as any, null)}
                  className="rounded-lg p-1.5 transition hover:bg-[var(--bg-sunken)]"
                  style={{ color: "var(--text-primary)" }}
                  title="Back to Day"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-bold truncate max-w-sm sm:max-w-md" style={{ color: "var(--text-primary)" }}>
                  {activeItemType === "protocol" ? "Execution Protocol" : activeItemData?.label || activeItemData?.task}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {(activeItemType === "resource" || activeItemType === "practice") && activeItemData?.url && (
                  <a
                    href={activeItemData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                    style={{ background: "var(--bg-sunken)", color: "var(--text-primary)" }}
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Open in new tab</span>
                  </a>
                )}
                <button
                  onClick={() => handleSelectItem(null as any, null as any, null)}
                  className="rounded-lg p-1.5 transition hover:bg-[var(--bg-sunken)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full overflow-y-auto" style={{ background: "var(--bg-sunken)" }}>
              {activeItemType === "resource" && (
                activeItemData.embed === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      activeItemData.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)?.[1] || ""
                    }`}
                    title={activeItemData.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <iframe
                    src={activeItemData.url}
                    title={activeItemData.label}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    className="h-full w-full border-0 bg-white"
                  />
                )
              )}

              {activeItemType === "practice" && (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <Target className="mb-4 h-16 w-16" style={{ color: "var(--accent-blue)" }} />
                  <h2 className="mb-6 text-2xl font-black" style={{ color: "var(--text-primary)" }}>{activeItemData.label}</h2>
                  <a
                    href={activeItemData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" }}
                  >
                    Open Problem on {activeItemData.platform || "Platform"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              {activeItemType === "task" && (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <Check className="mb-4 h-16 w-16" style={{ color: "var(--accent-green)" }} />
                  <h2 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{activeItemData.task}</h2>
                  <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                    You can mark this task complete in the sidebar checklist.
                  </p>
                </div>
              )}

              {activeItemType === "protocol" && (
                <div className="mx-auto max-w-3xl p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {PROTOCOL_META.map((meta) => {
                      const value = activeItemData[meta.key];
                      if (!value) return null;
                      return (
                        <div
                          key={meta.key}
                          className="flex gap-3 rounded-xl p-5 shadow-sm"
                          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
                        >
                          <span
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                            style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}
                          >
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <p className="text-sm font-black" style={{ color: meta.color }}>
                                {meta.label}
                              </p>
                              <span
                                className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                style={{ background: `color-mix(in srgb, ${meta.color} 8%, transparent)`, color: "var(--text-faint)" }}
                              >
                                <Clock className="h-3 w-3" />
                                {meta.time}
                              </span>
                            </div>
                            <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                              {value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ── Day header ──────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ring-1"
              style={{
                background: complete
                  ? "color-mix(in srgb, var(--accent-green) 12%, transparent)"
                  : "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                color: complete ? "var(--accent-green)" : "var(--text-secondary)",
              }}
            >
              {complete ? "✓ Completed" : `Week ${week.weekNumber} · Day ${day.dayNumber}`}
            </p>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: "var(--text-primary)" }}>
              {day.title}
            </h1>
            {day.estimatedMinutes && (
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
                <Clock className="h-3 w-3" />
                ~{day.estimatedMinutes} min estimated
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Share button */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition hover:opacity-80 active:scale-95"
              style={{
                border: "1px solid var(--border-default)",
                background: "var(--bg-surface)",
                color: "var(--text-muted)",
              }}
            >
              <Link2 className="h-4 w-4" />
              Share
            </button>
            <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
          </div>
        </div>

        {/* ── Objective ───────────────────────────────────────────── */}
        <section
          className="mb-6 overflow-hidden rounded-2xl shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div
            className="flex items-center gap-2 border-b px-5 py-3 text-sm font-black"
            style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)", color: "var(--text-primary)" }}
          >
            <Target className="h-4 w-4" style={{ color: "var(--accent-green)" }} />
            Objective
          </div>
          <p className="px-5 py-4 text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {day.objective}
          </p>
        </section>



            {/* ── Pitfall ─────────────────────────────────────────────── */}
            {day.pitfall && (
              <section className="mb-6">
                <PitfallCallout text={day.pitfall} />
              </section>
            )}

            {/* ── Notes ───────────────────────────────────────────────── */}
            <DayNotes courseId={course.id} dayNumber={day.dayNumber} />

            {/* ── Bottom toggle ───────────────────────────────────────── */}
            <div className="mb-8">
              <CompletionToggle courseId={course.id} dayNumber={day.dayNumber} />
            </div>

            {/* ── Day navigation ──────────────────────────────────────── */}
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
          </>
        )}
      </div>
    </div>
  );
}
