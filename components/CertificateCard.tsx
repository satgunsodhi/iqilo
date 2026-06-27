"use client";

import Link from "next/link";
import { Award, ChevronRight, Trophy, Sparkles } from "lucide-react";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { listCourses } from "@/lib/courses";

export function CertificateCard() {
  const { store, hydrated, getCourseStats } = useProgress();
  const { xp, badges } = useGamification();
  const courses = listCourses();
  
  // Calculate total progress across all courses
  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;

  // Check for fully completed courses
  const completedCourses = hydrated
    ? courses.filter((c) => {
        const stats = getCourseStats(c);
        return stats.completed === stats.total && stats.total > 0;
      })
    : [];

  const hasCompletedCourse = completedCourses.length > 0;

  return (
    <div className="certificate-card flex flex-col gap-5 rounded-2xl p-6 relative">
      <div className="flex items-start gap-4 relative z-10">
        <div
          className={`icon-container flex h-14 w-14 items-center justify-center rounded-xl ${hasCompletedCourse ? "animate-level-up" : ""}`}
        >
          {hasCompletedCourse ? (
            <Trophy className="award-icon h-7 w-7" />
          ) : (
            <Award className="award-icon h-7 w-7" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="title text-base font-black">
            {hasCompletedCourse ? "🎉 Course Completed!" : "Claim Your Certificate"}
          </h3>
          <p className="description mt-2 text-sm font-medium leading-relaxed">
            {hasCompletedCourse
              ? `You've conquered ${completedCourses.length} course${completedCourses.length > 1 ? "s" : ""}! View your achievements.`
              : totalCompleted > 0
              ? "Keep going! Complete courses to earn certificates."
              : "Start learning to earn certificates and showcase your achievements."}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        <div className="progress-container flex flex-col items-center gap-1 rounded-xl px-3 py-3">
          <span className="progress-label text-[10px] font-bold uppercase tracking-wider">Days</span>
          <span className="progress-value text-lg font-black">{totalCompleted}</span>
        </div>
        <div className="progress-container flex flex-col items-center gap-1 rounded-xl px-3 py-3">
          <span className="progress-label text-[10px] font-bold uppercase tracking-wider">XP</span>
          <span className="progress-value text-lg font-black gradient-text">{xp.total}</span>
        </div>
        <div className="progress-container flex flex-col items-center gap-1 rounded-xl px-3 py-3">
          <span className="progress-label text-[10px] font-bold uppercase tracking-wider">Badges</span>
          <span className="progress-value text-lg font-black">{badges.length}</span>
        </div>
      </div>

      {/* Completed courses list */}
      {hasCompletedCourse && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {completedCourses.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black"
              style={{
                background: "color-mix(in srgb, var(--accent-green) 15%, transparent)",
                color: "var(--accent-green)",
                border: "1px solid color-mix(in srgb, var(--accent-green) 25%, transparent)",
              }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              {c.title.split(":")[0].trim()}
            </span>
          ))}
        </div>
      )}

      <Link
        href="/profile"
        className="view-achievements-btn relative z-10 inline-flex items-center gap-2 self-start rounded-lg px-4 py-2.5 text-xs font-black transition hover:opacity-80 active:scale-95"
      >
        View Achievements
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
