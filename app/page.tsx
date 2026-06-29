"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Flame, Zap } from "lucide-react";
import { useEffect } from "react";
import { listCourses } from "@/lib/courses";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { getActivityMap } from "@/lib/activity";
import { RecommendedQuests } from "@/components/RecommendedQuests";
import { CertificateCard } from "@/components/CertificateCard";
import { LearningVelocityGraph } from "@/components/LearningVelocityGraph";
import { HelpSection } from "@/components/HelpSection";

export default function HomePage() {
  const courses = listCourses();
  const router = useRouter();
  const { store, hydrated, getNextDay } = useProgress();
  const { xp, streak } = useGamification();
  const activity = getActivityMap();

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
        router.push(`/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`);
      }
    }
  }, [hydrated, lastCourse]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="h-48 rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--border-subtle)] animate-pulse" />
            <div className="h-[400px] rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--border-subtle)] animate-pulse" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="h-[250px] rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--border-subtle)] animate-pulse" />
            <div className="h-[180px] rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--border-subtle)] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Active Mastery Hub: Single Unified Active Course Banner or Get Started Hero */}
          <div className="flex flex-col gap-4">
            {lastCourse ? (
              <section
                className="relative overflow-hidden rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md glass-panel animate-fade-in"
                style={{
                  border: "1px solid var(--border-subtle)",
                  borderLeft: "4px solid var(--text-primary)",
                  background: "color-mix(in srgb, var(--text-primary) 2%, var(--bg-surface))",
                }}
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-inner border border-[var(--border-subtle)]"
                      style={{ background: "color-mix(in srgb, var(--text-primary) 5%, transparent)" }}
                    >
                      ⚡
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
                          Active Protocol · Daily Quest
                        </p>
                        <span className="flex h-2 w-2 rounded-full bg-[var(--text-primary)] animate-pulse" />
                      </div>
                      <h3 className="mt-1.5 text-xl sm:text-2xl font-black tracking-tight truncate text-[var(--text-primary)]">
                        {lastCourse.course.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                        Day {lastCourse.lastDay} · Continue your learning journey
                      </p>

                      {/* Quick stats row */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {streak.current > 0 && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black"
                            style={{
                              background: "color-mix(in srgb, var(--accent-orange) 15%, transparent)",
                              color: "var(--accent-orange)",
                            }}
                          >
                            <Flame className="h-3 w-3" />
                            {streak.current} day streak
                          </span>
                        )}
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                          style={{
                            background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
                            color: "var(--accent-purple)",
                          }}
                        >
                          <Zap className="h-3 w-3" />
                          Level {xp.level} · {xp.total} XP
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`}
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black shadow-md transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
                    style={{ background: "var(--text-primary)", color: "var(--bg-surface)" }}
                  >
                    Initialize Quest
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            ) : (
              <section className="hero-section-start relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-lg glass-panel">
                <div className="ambient-glow-blue pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-60 dark:mix-blend-screen" />
                <div className="noise-overlay" />
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest" style={{ background: "color-mix(in srgb, var(--accent-blue) 15%, transparent)", color: "var(--accent-blue)", border: "1px solid color-mix(in srgb, var(--accent-blue) 30%, transparent)" }}>
                    <BookOpen className="h-3 w-3" />
                    Get Started
                  </span>
                  <h2 className="hero-title mt-6 text-4xl font-black leading-tight sm:text-5xl tracking-tight text-balance">
                    Start Your Gamified Tech Roadmap
                  </h2>
                  <p className="hero-subtitle mt-4 text-base sm:text-lg font-medium">
                    Choose a curated learning path, track your streaks, and earn XP today
                  </p>
                  <Link
                    href="/courses"
                    className="button-primary mt-8"
                  >
                    Browse Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* Recommended Quests */}
          <RecommendedQuests courses={courses} limit={3} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Certificate Card */}
          <CertificateCard />

          {/* Learning Velocity */}
          <div className="velocity-card flex flex-col gap-4 rounded-2xl p-6">
            <LearningVelocityGraph activity={activity} />
          </div>

          {/* Help Section */}
          <HelpSection />
        </div>
      </div>
    </div>
  );
}
