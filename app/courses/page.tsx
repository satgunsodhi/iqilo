"use client";

import { useState, useMemo } from "react";
import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { BookOpen, Filter, Flame, Zap, Sparkles, CheckCircle2, PlayCircle } from "lucide-react";

type FilterTab = "all" | "active" | "not_started" | "completed";

export default function CoursesPage() {
  const courses = listCourses();
  const { xp, streak } = useGamification();
  const { hydrated, store, getCourseStats } = useProgress();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (activeTab === "all") return true;
      if (!hydrated) return true; // Show all while hydrating

      const hasStarted = store[course.id] !== undefined;
      const stats = getCourseStats(course);
      const isComplete = stats.completed === stats.total;

      if (activeTab === "active") return hasStarted && !isComplete;
      if (activeTab === "not_started") return !hasStarted;
      if (activeTab === "completed") return hasStarted && isComplete;
      return true;
    });
  }, [courses, activeTab, hydrated, store, getCourseStats]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      
      {/* ── Top Stats Strip ── */}
      {hydrated && (
        <div className="mb-6 flex items-center justify-end gap-3 text-sm animate-fade-in">
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-subtle)" }}>
            <Flame className="h-4 w-4" style={{ color: streak.current > 0 ? "var(--accent-orange)" : "var(--text-faint)" }} />
            <span className="font-black" style={{ color: streak.current > 0 ? "var(--accent-orange)" : "var(--text-faint)" }}>
              {streak.current} day streak
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm" style={{ background: "color-mix(in srgb, var(--accent-indigo) 12%, var(--bg-raised))", border: "1px solid color-mix(in srgb, var(--accent-indigo) 30%, transparent)" }}>
            <Zap className="h-4 w-4" style={{ color: "var(--accent-indigo)" }} />
            <span className="font-black" style={{ color: "var(--accent-indigo)" }}>Level {xp.level}</span>
          </div>
        </div>
      )}

      {/* ── Breathtaking High-Contrast Hero Header ── */}
      <div className="relative mb-10 overflow-hidden rounded-[2.5rem] p-8 sm:p-14 shadow-sm border border-[--border-subtle]" style={{ background: "var(--bg-surface)" }}>
        <div className="noise-overlay"></div>
        
        <div className="relative z-10 flex flex-col max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-sm backdrop-blur-md transition-transform hover:scale-105" style={{ background: "var(--bg-raised)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }}>
              <Sparkles className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
              Premium Curriculum
            </span>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-sm backdrop-blur-md" style={{ background: "var(--bg-raised)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
              <BookOpen className="h-3.5 w-3.5" style={{ color: "var(--text-secondary)" }} />
              {courses.length} Deep Paths
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
            Level Up Your Expertise
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Explore our rigorously structured learning paths. Designed with bite-sized daily protocols, intense active practice, and comprehensive cheat sheets.
          </p>
        </div>
      </div>

      {/* ── Standalone Floating Filter Bar ── */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-3 shadow-sm glass-panel border border-[--border-subtle]" style={{ background: "var(--bg-surface)" }}>
        <div className="flex items-center gap-2 px-2">
          <Filter className="h-5 w-5" style={{ color: "var(--text-primary)" }} />
          <span className="text-sm font-black tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>Filter Quests</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-[--border-subtle]" style={{ background: "var(--bg-raised)" }}>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "all"
                ? "shadow-md bg-[--text-primary] text-[--bg-base] scale-105"
                : "text-[--text-muted] hover:text-[--text-primary]"
            }`}
          >
            <span>All Quests</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${activeTab === "all" ? "bg-[--bg-surface] text-[--text-primary]" : "bg-[--bg-sunken] text-[--text-secondary]"}`}>
              {courses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "active"
                ? "shadow-md bg-[--text-primary] text-[--bg-base] scale-105"
                : "text-[--text-muted] hover:text-[--text-primary]"
            }`}
          >
            <PlayCircle className="h-4 w-4" />
            <span>Active</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("not_started")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "not_started"
                ? "shadow-md bg-[--text-primary] text-[--bg-base] scale-105"
                : "text-[--text-muted] hover:text-[--text-primary]"
            }`}
          >
            <span>Not Started</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "completed"
                ? "shadow-md bg-[--text-primary] text-[--bg-base] scale-105"
                : "text-[--text-muted] hover:text-[--text-primary]"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </button>
        </div>
      </div>

      {/* ── Course Grid ── */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {activeTab === "all" && <ComingSoonCard />}
      </div>
    </div>
  );
}

