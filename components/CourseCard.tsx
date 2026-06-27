"use client";

import Link from "next/link";
import { Clock, Star, Trophy } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CircularProgress } from "./ProgressBar";

import { CourseIcon } from "./CourseIcons";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseStats, hydrated, store } = useProgress();
  const hasStarted = hydrated && store[course.id] !== undefined;
  const stats = getCourseStats(course);
  const allComplete = stats.completed === stats.total;

  return (
    <Link
      href={`/courses/${course.id}`}
      className={`group card-shimmer-overlay relative flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md glass-panel border ${
        allComplete
          ? "border-[var(--text-primary)]"
          : "border-[var(--border-subtle)] hover:border-[var(--text-secondary)]"
      }`}
      style={{ background: "color-mix(in srgb, var(--bg-surface) 95%, var(--bg-raised))" }}
    >
      {/* SVG / Photo Canvas (~30% width) */}
      <div className="relative h-40 lg:h-auto lg:w-[30%] shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-[var(--bg-sunken)]">
        <div className="absolute inset-0">
          <CourseIcon courseId={course.id} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      </div>

      {/* Content Side (~70% width) */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Header Row: Badges & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {course.difficulty && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-sm"
                  style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }}
                >
                  {course.difficulty}
                </span>
              )}
              {course.category && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-bold shadow-sm"
                  style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
                >
                  {course.category}
                </span>
              )}
            </div>

            {/* Status Display */}
            <div className="flex items-center gap-2">
              {allComplete ? (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide shadow-sm"
                  style={{
                    background: "var(--text-primary)",
                    color: "var(--bg-base)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Trophy className="h-3 w-3" />
                  Complete
                </span>
              ) : hasStarted ? (
                <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-2 py-0.5 shadow-sm">
                  <CircularProgress percent={stats.percent} size={14} />
                  <span className="text-[9px] font-black text-[var(--text-primary)]">{stats.completed}/{stats.total} days</span>
                </div>
              ) : hydrated ? (
                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[var(--text-faint)]">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[var(--text-faint)]" />
                  Not started
                </span>
              ) : null}
            </div>
          </div>

          {/* Titles & Description */}
          <h2 className="text-lg font-black leading-snug tracking-tight group-hover:opacity-90 transition-opacity" style={{ color: "var(--text-primary)" }}>
            {course.title}
          </h2>
          
          <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {course.description}
          </p>
        </div>

        {/* Footer Meta Row */}
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold mt-4" style={{ color: "var(--text-secondary)" }}>
          <span className="flex items-center gap-1 bg-[var(--bg-raised)] border border-[var(--border-subtle)] rounded-md px-2 py-1 shadow-sm transition-colors group-hover:bg-[var(--bg-surface)]">
            <Clock className="h-3.5 w-3.5" />
            {course.totalDays} days
          </span>
          {course.estimatedHours && (
            <span className="flex items-center gap-1 bg-[var(--bg-raised)] border border-[var(--border-subtle)] rounded-md px-2 py-1 shadow-sm transition-colors group-hover:bg-[var(--bg-surface)]">
              <Star className="h-3.5 w-3.5" />
              ~{course.estimatedHours}h
            </span>
          )}
          {course.tags && course.tags.length > 0 && (
            <span className="bg-[var(--bg-sunken)] border border-[var(--border-subtle)] rounded-md px-2 py-1 text-[10px] font-bold text-[var(--text-secondary)] shadow-sm">
              #{course.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

