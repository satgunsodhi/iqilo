"use client";

import Link from "next/link";
import { ArrowRight, Clock, Star, Swords } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";

type RecommendedQuestsProps = {
  courses: Course[];
  limit?: number;
};

const QUEST_GRADIENTS = [
  "linear-gradient(135deg, var(--bg-surface), var(--accent-blue))",
  "linear-gradient(135deg, var(--bg-surface), var(--accent-green))",
  "linear-gradient(135deg, var(--accent-blue), var(--accent-green))",
  "linear-gradient(135deg, var(--bg-raised), var(--accent-blue))",
];

const QUEST_ICONS = ["⚔️", "🧠", "🎯", "🚀"];

export function RecommendedQuests({ courses, limit = 3 }: RecommendedQuestsProps) {
  const { getCourseStats, hydrated, store } = useProgress();
  
  // Sort courses by relevance (not started first, then by category)
  const sortedCourses = [...courses].sort((a, b) => {
    const aStarted = hydrated && store[a.id] !== undefined;
    const bStarted = hydrated && store[b.id] !== undefined;
    
    if (aStarted && !bStarted) return 1;
    if (!aStarted && bStarted) return -1;
    return 0;
  });

  const displayedCourses = sortedCourses.slice(0, limit);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5" style={{ color: "var(--accent-purple)" }} />
          <h2 className="quests-title text-lg font-black">
            Recommended Quests
          </h2>
        </div>
        <Link
          href="/courses"
          className="quests-link flex items-center gap-1 text-xs font-black transition hover:opacity-80"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedCourses.map((course, idx) => {
          const stats = getCourseStats(course);
          const hasStarted = hydrated && store[course.id] !== undefined;
          const gradient = QUEST_GRADIENTS[idx % QUEST_GRADIENTS.length];
          const icon = QUEST_ICONS[idx % QUEST_ICONS.length];
          
          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="quest-card card-shimmer-overlay group flex flex-col overflow-hidden rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-md glass-panel"
            >
              {/* Course image/gradient placeholder */}
              <div className="relative h-44 w-full" style={{ background: gradient }}>
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{icon}</span>
                </div>
                {/* Decorative corner orbs */}
                <div
                  className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 mix-blend-overlay"
                  style={{ background: "white" }}
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Category badge */}
                {course.category && (
                  <span className="quest-badge mb-3 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide">
                    {course.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="quest-title mb-3 text-lg font-black leading-tight group-hover:gradient-text transition-all tracking-tight">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="quest-description mb-5 line-clamp-2 text-sm font-medium leading-relaxed">
                  {course.description}
                </p>

                {/* Meta info */}
                <div className="mt-auto flex items-center gap-4 text-sm">
                  <div className="quest-meta flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">{course.totalDays} days</span>
                  </div>
                  {course.estimatedHours && (
                    <div className="quest-meta flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span className="font-semibold">~{course.estimatedHours}h</span>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                {hasStarted && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="quest-progress-label font-semibold">
                        Progress
                      </span>
                      <span className="quest-progress-value font-black">
                        {stats.percent}%
                      </span>
                    </div>
                    <div className="quest-progress-bg h-2 w-full rounded-full overflow-hidden">
                      <div
                        className={`quest-progress-bar h-full rounded-full transition-all duration-300 ${stats.percent === 100 ? "animate-progress-glow" : ""}`}
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
