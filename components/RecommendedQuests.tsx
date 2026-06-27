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
  "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-raised) 100%)",
  "linear-gradient(135deg, var(--bg-raised) 0%, var(--bg-surface) 100%)",
  "linear-gradient(135deg, color-mix(in srgb, var(--text-primary) 5%, var(--bg-surface)), var(--bg-raised))",
  "linear-gradient(135deg, var(--bg-surface), color-mix(in srgb, var(--text-primary) 8%, var(--bg-surface)))",
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5" style={{ color: "var(--text-primary)" }} />
          <h2 className="quests-title text-xl font-black tracking-tight text-[var(--text-primary)]">
            Recommended Quests
          </h2>
        </div>
        <Link
          href="/courses"
          className="quests-link flex items-center gap-1 text-xs font-black transition hover:opacity-80 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
              className="quest-card card-shimmer-overlay group flex flex-col overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] hover:border-[var(--text-secondary)] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-sm glass-panel"
            >
              {/* Course image/gradient header */}
              <div className="relative h-44 w-full overflow-hidden border-b border-[var(--border-subtle)]" style={{ background: gradient }}>
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{icon}</span>
                </div>
                {/* Decorative corner orbs */}
                <div
                  className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-10 mix-blend-overlay"
                  style={{ background: "var(--text-primary)" }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Category badge */}
                {course.category && (
                  <span className="quest-badge mb-3 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm">
                    {course.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="quest-title mb-3 text-lg font-black leading-tight group-hover:opacity-80 transition-opacity tracking-tight text-[var(--text-primary)]">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="quest-description mb-5 line-clamp-2 text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
                  {course.description}
                </p>

                {/* Meta info */}
                <div className="mt-auto flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
                  <div className="quest-meta flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.totalDays} days</span>
                  </div>
                  {course.estimatedHours && (
                    <div className="quest-meta flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" />
                      <span>~{course.estimatedHours}h</span>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                {hasStarted && (
                  <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="quest-progress-label font-bold text-[var(--text-secondary)]">
                        Progress
                      </span>
                      <span className="quest-progress-value font-black text-[var(--text-primary)]">
                        {stats.percent}%
                      </span>
                    </div>
                    <div className="quest-progress-bg h-2 w-full rounded-full overflow-hidden bg-[var(--bg-raised)] border border-[var(--border-subtle)]">
                      <div
                        className={`quest-progress-bar h-full rounded-full transition-all duration-300 ${stats.percent === 100 ? "animate-progress-glow" : ""}`}
                        style={{ width: `${stats.percent}%`, background: "var(--text-primary)" }}
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
