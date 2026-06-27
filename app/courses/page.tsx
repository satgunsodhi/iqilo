"use client";

import { useState, useMemo } from "react";
import { CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { useProgress } from "@/hooks/useProgress";
import { Filter, CheckCircle2, PlayCircle } from "lucide-react";

type FilterTab = "all" | "active" | "not_started" | "completed";

export default function CoursesPage() {
  const courses = listCourses();
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


      {/* ── Standalone Floating Filter Bar ── */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-3 shadow-sm glass-panel border border-[var(--border-subtle)]" style={{ background: "var(--bg-surface)" }}>
        <div className="flex items-center gap-2 px-2">
          <Filter className="h-5 w-5" style={{ color: "var(--text-primary)" }} />
          <span className="text-sm font-black tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>Filter Quests</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-[var(--border-subtle)]" style={{ background: "var(--bg-raised)" }}>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "all"
                ? "shadow-md bg-[var(--text-primary)] text-[var(--bg-base)] scale-105"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>All Quests</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${activeTab === "all" ? "bg-[var(--bg-surface)] text-[var(--text-primary)]" : "bg-[var(--bg-sunken)] text-[var(--text-secondary)]"}`}>
              {courses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "active"
                ? "shadow-md bg-[var(--text-primary)] text-[var(--bg-base)] scale-105"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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
                ? "shadow-md bg-[var(--text-primary)] text-[var(--bg-base)] scale-105"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>Not Started</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              activeTab === "completed"
                ? "shadow-md bg-[var(--text-primary)] text-[var(--bg-base)] scale-105"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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

      </div>
    </div>
  );
}

