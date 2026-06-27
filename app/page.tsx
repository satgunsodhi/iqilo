"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play, BookOpen, Flame, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { listCourses } from "@/lib/courses";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { getActivityMap } from "@/lib/activity";
import { RecommendedQuests } from "@/components/RecommendedQuests";
import { CertificateCard } from "@/components/CertificateCard";
import { LearningVelocityGraph } from "@/components/LearningVelocityGraph";
import { HelpSection } from "@/components/HelpSection";

export default function HomePage() {
  const courses = listCourses();
  const { store, hydrated, getNextDay } = useProgress();
  const { xp, streak, xpToNextLevel } = useGamification();
  const activity = getActivityMap();

  // Find "continue where you left off" course
  const lastCourse = hydrated
    ? courses
        .map((c) => ({ course: c, lastDay: store[c.id]?.lastVisitedDay ?? 0 }))
        .filter((x) => x.lastDay > 0)
        .sort((a, b) => b.lastDay - a.lastDay)[0]
    : null;

  // Find suggested next step (daily quest)
  const dailyQuest = hydrated
    ? courses
        .map((c) => ({ course: c, nextDay: getNextDay(c), started: !!store[c.id] }))
        .filter((x) => x.started && x.nextDay <= x.course.totalDays)
        .sort((a, b) => a.nextDay - b.nextDay)[0]
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Active Mastery Hub: Hero Section + Integrated Daily Quest */}
          <div className="flex flex-col gap-4">
            {/* Current course / Resume lesson section */}
            {lastCourse ? (
              <section className="hero-section relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-lg glass-panel">
                {/* Decorative gradient */}
                <div className="ambient-glow-blue pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-60 dark:mix-blend-screen" />
                <div className="noise-overlay" />
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest" style={{ background: "color-mix(in srgb, var(--accent-blue) 15%, transparent)", color: "var(--accent-blue)", border: "1px solid color-mix(in srgb, var(--accent-blue) 30%, transparent)" }}>
                    <Play className="h-3 w-3" />
                    In Progress
                  </span>
                  <h2 className="hero-title mt-6 text-4xl font-black leading-tight sm:text-5xl tracking-tight text-balance">
                    {lastCourse.course.title}
                  </h2>
                  <p className="hero-subtitle mt-4 text-base sm:text-lg font-medium">
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

                  <Link
                    href={`/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`}
                    className="button-primary mt-8"
                  >
                    <Sparkles className="h-4 w-4" />
                    Resume Lesson
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
                    Start Your Learning Journey
                  </h2>
                  <p className="hero-subtitle mt-4 text-base sm:text-lg font-medium">
                    Choose a course and begin mastering new skills today
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

            {/* Daily Quest */}
            {dailyQuest && dailyQuest !== undefined && (
              <section
                className="relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md glass-panel animate-fade-in"
                style={{
                  border: "1px solid var(--border-subtle)",
                  borderLeft: "4px solid var(--text-primary)",
                  background: "color-mix(in srgb, var(--text-primary) 2%, var(--bg-surface))",
                }}
              >
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl shadow-inner border border-[var(--border-subtle)]"
                      style={{ background: "color-mix(in srgb, var(--text-primary) 5%, transparent)" }}
                    >
                      ⚡
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                          Active Protocol · Daily Quest
                        </p>
                        <span className="flex h-2 w-2 rounded-full bg-[var(--text-primary)] animate-pulse" />
                      </div>
                      <p className="mt-1 text-base font-bold tracking-tight truncate text-[var(--text-primary)]">
                        Continue Day {dailyQuest.nextDay} of {dailyQuest.course.title.split(":")[0].trim()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${dailyQuest.course.id}/day/${dailyQuest.nextDay}`}
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black shadow-md transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
                    style={{ background: "var(--text-primary)", color: "var(--bg-surface)" }}
                  >
                    Initialize Quest
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
