"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { listCourses } from "@/lib/courses";
import { useProgress } from "@/hooks/useProgress";
import { getActivityMap } from "@/lib/activity";
import { RecommendedQuests } from "@/components/RecommendedQuests";
import { CertificateCard } from "@/components/CertificateCard";
import { LearningVelocityGraph } from "@/components/LearningVelocityGraph";
import { HelpSection } from "@/components/HelpSection";

export default function HomePage() {
  const courses = listCourses();
  const { store, hydrated } = useProgress();
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
        window.location.href = `/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`;
      }
    }
  }, [hydrated, lastCourse]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Current course / Resume lesson section */}
          {lastCourse ? (
            <section className="hero-section relative overflow-hidden rounded-2xl border p-8 shadow-lg">
              {/* Decorative gradient */}
              <div className="hero-gradient pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" />
              
              <div className="relative">
                <span className="hero-badge inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest">
                  <Play className="h-3 w-3" />
                  In Progress
                </span>
                <h2 className="hero-title mt-5 text-3xl font-black leading-tight sm:text-4xl">
                  {lastCourse.course.title}
                </h2>
                <p className="hero-subtitle mt-3 text-base font-medium">
                  Day {lastCourse.lastDay} · Continue your learning journey
                </p>
                <Link
                  href={`/courses/${lastCourse.course.id}/day/${lastCourse.lastDay}`}
                  className="hero-button mt-6 inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg active:scale-95"
                >
                  <Sparkles className="h-4 w-4" />
                  Resume Lesson
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          ) : (
            <section className="hero-section-start relative overflow-hidden rounded-2xl border p-8 shadow-lg">
              <div className="hero-gradient-start pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" />
              
              <div className="relative">
                <span className="hero-badge-start inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest">
                  <BookOpen className="h-3 w-3" />
                  Get Started
                </span>
                <h2 className="hero-title mt-5 text-3xl font-black leading-tight sm:text-4xl">
                  Start Your Learning Journey
                </h2>
                <p className="hero-subtitle mt-3 text-base font-medium">
                  Choose a course and begin mastering new skills today
                </p>
                <Link
                  href="/courses"
                  className="hero-button-start mt-6 inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black text-white shadow-md transition hover:opacity-90 hover:shadow-lg active:scale-95"
                >
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          )}

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
