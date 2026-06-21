"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Layers3, Sparkles, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { useProgress } from "@/hooks/useProgress";

const CATEGORIES = ["All", "Algorithms", "Quant Finance"] as const;
type Category = (typeof CATEGORIES)[number];

export default function HomePage() {
  const courses = listCourses();
  const { store, hydrated } = useProgress();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;

  // Find "continue where you left off" course
  const lastCourse = hydrated
    ? courses
        .map((c) => ({ course: c, lastDay: store[c.id]?.lastVisitedDay ?? 0 }))
        .filter((x) => x.lastDay > 0)
        .sort((a, b) => b.lastDay - a.lastDay)[0]
    : null;

  // Auto-redirect on first visit in the session
  useEffect(() => {
    if (hydrated && lastCourse) {
      const hasRedirected = sessionStorage.getItem("iqilo_auto_redirected");
      if (!hasRedirected) {
        sessionStorage.setItem("iqilo_auto_redirected", "true");
        window.location.href = `/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`;
      }
    }
  }, [hydrated, lastCourse]);

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative mb-8 overflow-hidden rounded-2xl border p-6 shadow-lg sm:p-10"
        style={{ borderColor: "var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)" }} />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-green) 8%, transparent)" }} />

        <div className="relative flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest ring-1"
              style={{
                background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                color: "var(--text-secondary)",
              }}
            >
              <Zap className="h-3 w-3" style={{ color: "var(--accent-yellow)" }} />
              iqilo · Learning Platform
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
              Master the skills{" "}
              <span className="gradient-text">
                that matter most.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
              Structured roadmaps for competitive programming and quantitative finance.
              Day-by-day progression with resources, practice problems, notes, and progress tracking — all local, all private.
            </p>

            {/* Continue banner */}
            {lastCourse && hydrated && (
              <Link
                href={`/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`}
                className="mt-5 inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
              >
                <Sparkles className="h-4 w-4" />
                Continue Day {lastCourse.lastDay} — {lastCourse.course.title.split(":")[0].trim()}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:min-w-64">
            {[
              { icon: Layers3, value: courses.length, label: "Roadmaps", color: "var(--accent-purple)" },
              { icon: Target, value: "Daily", label: "Focus", color: "var(--accent-green)" },
              { icon: Clock, value: "Flexible", label: "Pacing", color: "var(--accent-blue)" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl p-3 text-center"
                style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
              >
                <Icon className="h-4 w-4 mb-2" style={{ color }} />
                <p className={`font-black ${typeof value === 'number' ? 'text-xl' : 'text-lg'}`} style={{ color: "var(--text-primary)" }}>{value}</p>
                <p className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal progress strip */}
        {hydrated && totalCompleted > 0 && (
          <div
            className="relative mt-6 flex items-center justify-between rounded-xl px-4 py-3"
            style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
          >
            <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Your progress:&nbsp;
              <span style={{ color: "var(--accent-purple)" }}>{totalCompleted}</span>
              <span style={{ color: "var(--text-muted)" }}> days completed</span>
            </span>
            <Link
              href="/my-learning"
              className="text-xs font-black transition hover:opacity-80"
              style={{ color: "var(--accent-purple)" }}
            >
              View dashboard →
            </Link>
          </div>
        )}
      </section>

      {/* ── Category filter ───────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 active:scale-95"
            style={
              activeCategory === cat
                ? {
                    background: "var(--accent-purple)",
                    color: "white",
                    boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-purple) 40%, transparent)",
                  }
                : {
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-default)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Course grid ───────────────────────────────────────────── */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <ComingSoonCard />
      </div>
    </div>
  );
}
