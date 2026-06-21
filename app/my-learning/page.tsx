"use client";

import Link from "next/link";
import { ArrowRight, Flame, Star, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ActivityCalendar } from "@/components/ActivityCalendar";
import { ProgressBar } from "@/components/ProgressBar";
import { listCourses } from "@/lib/courses";
import { getActivityMap, getCurrentStreak, getTotalActiveDays } from "@/lib/activity";
import { useProgress } from "@/hooks/useProgress";
import type { ActivityMap, Badge, BadgeId } from "@/lib/types";

const ALL_BADGES: Badge[] = [
  { id: "first_day",       name: "First Step",       description: "Complete your first day",        icon: "🌱" },
  { id: "streak_3",        name: "On a Roll",         description: "3-day streak",                   icon: "🔥" },
  { id: "streak_7",        name: "Weekly Warrior",    description: "7-day streak",                   icon: "⚡" },
  { id: "week_1",          name: "Week 1 Done",       description: "Complete an entire week",        icon: "🗓️" },
  { id: "halfway",         name: "Halfway There",     description: "50% through any course",         icon: "🎯" },
  { id: "course_complete", name: "Course Master",     description: "Finish an entire course",        icon: "🏆" },
  { id: "all_notes",       name: "Note Taker",        description: "Write notes for 5 days",         icon: "📝" },
  { id: "speed_learner",   name: "Speed Learner",     description: "Complete 3 days in one day",     icon: "🚀" },
];

export default function MyLearningPage() {
  const { store, hydrated, getCourseStats, getNextDay } = useProgress();
  const courses = listCourses();
  const [activityMap, setActivityMap] = useState<ActivityMap>({});
  const [streak, setStreak] = useState(0);
  const [totalActive, setTotalActive] = useState(0);

  useEffect(() => {
    setActivityMap(getActivityMap());
    setStreak(getCurrentStreak());
    setTotalActive(getTotalActiveDays());
  }, []);

  // Compute total completed across all courses
  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;
  const totalDays = courses.reduce((sum, c) => sum + c.totalDays, 0);

  const startedCourses = hydrated ? courses.filter((c) => store[c.id] !== undefined) : [];

  // Evaluate badges
  function isUnlocked(id: BadgeId): boolean {
    if (!hydrated) return false;
    const allProgress = courses.map((c) => getCourseStats(c));

    switch (id) {
      case "first_day":       return totalCompleted >= 1;
      case "streak_3":        return streak >= 3;
      case "streak_7":        return streak >= 7;
      case "week_1":          return allProgress.some((p) => p.completed >= 7);
      case "halfway":         return allProgress.some((p) => p.percent >= 50);
      case "course_complete": return allProgress.some((p) => p.completed >= p.total && p.total > 0);
      case "all_notes": {
        let noteCount = 0;
        for (const c of courses) {
          for (const w of c.weeks) {
            for (const d of w.days) {
              if (typeof localStorage !== "undefined" &&
                  localStorage.getItem(`iqilo-notes-${c.id}-${d.dayNumber}`)?.trim()) {
                noteCount++;
              }
            }
          }
        }
        return noteCount >= 5;
      }
      case "speed_learner": {
        const today = new Date().toISOString().slice(0, 10);
        return (activityMap[today] ?? 0) >= 3;
      }
      default: return false;
    }
  }

  const unlockedCount = ALL_BADGES.filter((b) => isUnlocked(b.id)).length;

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
          { icon: Flame,  label: "Day Streak",  value: `${streak}🔥`,            color: "var(--accent-red)"    },
          { icon: Trophy, label: "Badges",      value: `${unlockedCount}/${ALL_BADGES.length}`, color: "var(--accent-yellow)" },
          { icon: Star,   label: "Active Days", value: totalActive,               color: "var(--accent-green)"  },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-2xl p-5 text-center shadow-sm"
            style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
          >
            <Icon className="h-5 w-5 mb-3" style={{ color }} />
            <p className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{value}</p>
            <p className="mt-1 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</p>
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
            className="rounded-2xl p-8 text-center"
            style={{ border: "1px dashed var(--border-default)", background: "var(--bg-surface)" }}
          >
            <div
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
            >
              <span className="text-xl">📚</span>
            </div>
            <h3 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
              No active courses yet
            </h3>
            <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Pick a roadmap from the homepage to start tracking your learning.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black text-white transition hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
            >
              Browse Roadmaps
            </Link>
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
            {unlockedCount}/{ALL_BADGES.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ALL_BADGES.map((badge) => (
            <AchievementBadge key={badge.id} badge={badge} unlocked={isUnlocked(badge.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
