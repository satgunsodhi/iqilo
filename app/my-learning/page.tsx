"use client";

import Link from "next/link";
import { ArrowRight, Flame, Star, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ActivityCalendar } from "@/components/ActivityCalendar";
import { ProgressBar } from "@/components/ProgressBar";
import { listCourses } from "@/lib/courses";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { getActivityMap, getTotalActiveDays } from "@/lib/activity";
import { BADGES } from "@/lib/achievements";
import type { ActivityMap, BadgeId } from "@/lib/types";



export default function MyLearningPage() {
  const { store, hydrated, getCourseStats, getNextDay, badges } = useProgress();
  const { streak: gamStreak } = useGamification();
  const courses = listCourses();
  const [activityMap, setActivityMap] = useState<ActivityMap>({});
  const [totalActive, setTotalActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivityMap(getActivityMap());
      setTotalActive(getTotalActiveDays());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Compute total completed across all courses
  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;

  const startedCourses = hydrated ? courses.filter((c) => store[c.id] !== undefined) : [];

  const unlockedCount = hydrated ? badges.length : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-8">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--accent-purple)" }}
        >
          <Star className="h-3 w-3" />
          My Learning
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
          Your Learning Journey
        </h1>
        <p className="mt-2 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Track your progress, activity, and achievements across all courses.
        </p>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: Zap,    label: "Days Done",   value: totalCompleted,            color: "var(--accent-purple)" },
          { icon: Flame,  label: "Day Streak",  value: `${gamStreak.current}🔥`,            color: "var(--accent-red)"    },
          { icon: Trophy, label: "Badges",      value: `${unlockedCount}/${BADGES.length}`, color: "var(--accent-yellow)" },
          { icon: Star,   label: "Active Days", value: totalActive,               color: "var(--accent-green)"  },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${color} 10%, transparent) 0%, transparent 70%)` }} />
            
            <Icon className="relative z-10 h-6 w-6 mb-3 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
            <p className="relative z-10 text-3xl font-black" style={{ color: "var(--text-primary)" }}>{value}</p>
            <p className="relative z-10 mt-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Activity heatmap ─────────────────────────────────────── */}
      <section
        className="mb-8 rounded-2xl p-5 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <h2 className="mb-4 text-sm font-black" style={{ color: "var(--text-primary)" }}>
          Activity — Last 16 Weeks
        </h2>
        <ActivityCalendar activity={activityMap} weeks={16} />
      </section>

      {/* ── Per-course progress ──────────────────────────────────── */}
      <section className="mb-8 space-y-4">
        <h2 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>Course Progress</h2>
        {hydrated && startedCourses.length === 0 ? (
          <div
            className="relative overflow-hidden rounded-[2rem] p-10 text-center surface-gradient"
            style={{ border: "1px dashed var(--border-default)" }}
          >
            <div className="ambient-glow-purple h-40 w-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm"
                style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
              >
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-black text-balance" style={{ color: "var(--text-primary)" }}>
                Your learning journey awaits
              </h3>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Pick a roadmap from the homepage to start tracking your progress.
              </p>
              <Link
                href="/courses"
                className="interactive mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-md"
                style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
              >
                Browse Roadmaps
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          startedCourses.map((course) => {
            const stats = getCourseStats(course);
            const nextDay = getNextDay(course);
            return (
              <div
                key={course.id}
                className="rounded-2xl p-5 shadow-sm"
                style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-black" style={{ color: "var(--text-primary)" }}>{course.title}</p>
                    {course.difficulty && (
                      <p className="mt-0.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                        {course.difficulty} · {course.category}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/courses/${course.id}/day/${nextDay}`}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black text-white transition hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
                  >
                    Continue <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                  <span style={{ color: "var(--text-muted)" }}>{stats.completed}/{stats.total} days</span>
                  <span style={{ color: "var(--accent-purple)" }}>{stats.percent}%</span>
                </div>
                <ProgressBar percent={stats.percent} />
              </div>
            );
          })
        )}
      </section>

      {/* ── Achievements ─────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
            Achievements
          </h2>
          <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
            {unlockedCount}/{BADGES.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {BADGES.map((badge) => (
            <AchievementBadge key={badge.id} badge={badge} unlocked={hydrated && badges.includes(badge.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
