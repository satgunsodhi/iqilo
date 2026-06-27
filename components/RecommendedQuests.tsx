"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Star, Swords, ChevronRight, BookOpen, Target, Sparkles } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CourseIcon } from "./CourseIcons";

type RecommendedQuestsProps = {
  courses: Course[];
  limit?: number;
};

const QUEST_ICONS = ["⚔️", "🧠", "🎯", "🚀"];

export function RecommendedQuests({ courses, limit = 4 }: RecommendedQuestsProps) {
  const { getCourseStats, getNextDay, hydrated, store } = useProgress();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Helper to recursively collect all prerequisites of a course
  const getRecursivePrerequisites = (courseId: string): string[] => {
    const prereqs: string[] = [];
    const queue = [courseId];
    while (queue.length > 0) {
      const currentId = queue.shift();
      const currentCourse = courses.find(c => c.id === currentId);
      if (currentCourse && currentCourse.prerequisites) {
        currentCourse.prerequisites.forEach(pId => {
          if (!prereqs.includes(pId)) {
            prereqs.push(pId);
            queue.push(pId);
          }
        });
      }
    }
    return prereqs;
  };

  // Identify completed courses and prerequisites of started/completed courses
  const completedCourses = new Set<string>();
  const prerequisitesToHide = new Set<string>();

  for (const course of courses) {
    const stats = getCourseStats(course);
    const hasStarted = hydrated && store[course.id] !== undefined;
    const isCompleted = stats.completed === stats.total;

    if (isCompleted) {
      completedCourses.add(course.id);
    }
    
    if (hasStarted || isCompleted) {
      getRecursivePrerequisites(course.id).forEach(prereqId => {
        prerequisitesToHide.add(prereqId);
      });
    }
  }

  // Filter courses to hide completed ones and their prerequisites
  let eligibleCourses = courses.filter(course => {
    return !completedCourses.has(course.id) && !prerequisitesToHide.has(course.id);
  });

  // Fallback: If all courses are completed/filtered, just show all courses
  if (eligibleCourses.length === 0) {
    eligibleCourses = courses;
  }

  // Sort remaining eligible courses: started first, then unstarted
  const sortedCourses = [...eligibleCourses].sort((a, b) => {
    const aStarted = hydrated && store[a.id] !== undefined;
    const bStarted = hydrated && store[b.id] !== undefined;
    if (aStarted && !bStarted) return -1;
    if (!aStarted && bStarted) return 1;
    return 0;
  });

  const displayedCourses = sortedCourses.slice(0, limit);
  const activeCourse = displayedCourses[selectedIndex] ?? displayedCourses[0];

  if (!activeCourse) return null;

  const activeStats = getCourseStats(activeCourse);
  const activeHasStarted = hydrated && store[activeCourse.id] !== undefined;
  const activeNextDay = getNextDay(activeCourse);

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

      {/* Split Master-Detail Layout */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Master List (Left Column - 5 cols) */}
        <div className="flex flex-col gap-2 lg:col-span-5">
          {displayedCourses.map((course, idx) => {
            const isSelected = selectedIndex === idx;
            const stats = getCourseStats(course);
            const hasStarted = hydrated && store[course.id] !== undefined;
            
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group relative flex items-center gap-3 text-left transition-all duration-200 rounded-2xl overflow-hidden border pl-5 pr-4 py-3.5 ${
                  isSelected
                    ? "border-[var(--text-primary)] bg-[var(--bg-raised)] shadow-md"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-default)] hover:bg-[var(--bg-raised)] shadow-sm"
                }`}
              >
                {/* Accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 ${
                  isSelected ? "bg-[var(--text-primary)]" : "bg-transparent"
                }`} />

                {/* Index number */}
                <span className={`text-lg font-black leading-none tabular-nums shrink-0 w-6 text-center transition-colors ${
                  isSelected ? "text-[var(--text-primary)]" : "text-[var(--border-default)] group-hover:text-[var(--text-muted)]"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {course.category && (
                      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                        isSelected ? "text-[var(--text-secondary)]" : "text-[var(--text-faint)] group-hover:text-[var(--text-muted)]"
                      }`}>
                        {course.category}
                      </span>
                    )}
                    {hasStarted && (
                      <span className="text-[9px] font-bold text-[var(--text-faint)]">· {stats.percent}%</span>
                    )}
                  </div>
                  <h3 className={`text-sm font-black leading-snug tracking-tight line-clamp-2 transition-colors ${
                    isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                  }`}>
                    {course.title}
                  </h3>
                </div>

                {/* Chevron */}
                <ChevronRight className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                  isSelected ? "text-[var(--text-primary)] translate-x-0.5" : "text-[var(--text-faint)] group-hover:text-[var(--text-secondary)]"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Detail Panel (Right Column - 7 cols) */}
        <div className="flex flex-col overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] shadow-lg glass-panel animate-fade-in lg:col-span-7">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 pb-5 border-b border-[var(--border-subtle)] glass-raised">
            <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-2xl shadow-inner border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
              <CourseIcon courseId={activeCourse.id} className="w-full h-full p-1.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {activeCourse.category && (
                  <span className="rounded-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm">
                    {activeCourse.category}
                  </span>
                )}
                {activeCourse.difficulty && (
                  <span className="rounded-md px-2.5 py-0.5 text-[10px] font-bold border border-[var(--border-subtle)] bg-[var(--bg-sunken)] text-[var(--text-secondary)] shadow-sm">
                    {activeCourse.difficulty}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black leading-tight tracking-tight text-[var(--text-primary)] truncate">
                {activeCourse.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6 gap-6">
            <p className="text-xs font-medium leading-relaxed text-[var(--text-secondary)]">
              {activeCourse.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="flex flex-col p-3.5 rounded-xl border border-[var(--border-subtle)] glass-inset shadow-sm">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-secondary)]">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Curriculum Pace</span>
                </div>
                <span className="text-sm font-black text-[var(--text-primary)]">{activeCourse.totalDays} Daily Protocols</span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">Bite-sized active practice</span>
              </div>

              <div className="flex flex-col p-3.5 rounded-xl border border-[var(--border-subtle)] glass-inset shadow-sm">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-secondary)]">
                  <Star className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Time Commitment</span>
                </div>
                <span className="text-sm font-black text-[var(--text-primary)]">{activeCourse.estimatedHours ? `~${activeCourse.estimatedHours} Hours` : "Self-paced"}</span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">Intense deep work</span>
              </div>

              <div className="flex flex-col p-3.5 rounded-xl border border-[var(--border-subtle)] glass-inset shadow-sm">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-secondary)]">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Learning Design</span>
                </div>
                <span className="text-sm font-black text-[var(--text-primary)]">Concept & Code</span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">Interactive cheat sheets</span>
              </div>

              <div className="flex flex-col p-3.5 rounded-xl border border-[var(--border-subtle)] glass-inset shadow-sm">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-secondary)]">
                  <Target className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Your Progress</span>
                </div>
                {activeHasStarted ? (
                  <>
                    <span className="text-sm font-black text-[var(--text-primary)]">{activeStats.percent}% Complete</span>
                    <span className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">{activeStats.completed} of {activeStats.total} days finished</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-black text-[var(--text-primary)]">Ready to Initialize</span>
                    <span className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">Start Day 1 today</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 p-6 pt-4 border-t border-[var(--border-subtle)] glass-raised">
            <Link
              href={`/courses/${activeCourse.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-xs font-bold transition-all hover:bg-[var(--bg-surface)] hover:shadow-sm border border-[var(--border-default)] text-[var(--text-primary)]"
            >
              <span>Explore Curriculum</span>
            </Link>
            <Link
              href={`/courses/${activeCourse.id}/day/${activeNextDay}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-3 px-5 text-xs font-black shadow-md transition-all hover:opacity-90 active:scale-95 bg-[var(--text-primary)] text-[var(--bg-base)] border border-[var(--border-subtle)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{activeHasStarted ? "Continue Protocol" : "Initialize Quest"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
