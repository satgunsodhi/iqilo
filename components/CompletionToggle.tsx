"use client";

import { Check, Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/components/ToastNotification";
import { BADGES } from "@/lib/achievements";
import { listCourses } from "@/lib/courses";

type CompletionToggleProps = {
  courseId: string;
  dayNumber: number;
  label?: string;
  size?: "sm" | "md";
};

export function CompletionToggle({
  courseId,
  dayNumber,
  label = "Mark complete",
  size = "md",
}: CompletionToggleProps) {
  const { isDayComplete, toggleDay, checkAchievements, hydrated } = useProgress();
  const { toast } = useToast();
  const complete = hydrated && isDayComplete(courseId, dayNumber);
  const boxSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  const handleToggle = () => {
    const wasComplete = isDayComplete(courseId, dayNumber);
    
    // Calculate dynamic completion XP: 10 XP per estimated minute
    const courses = listCourses();
    const course = courses.find((c) => c.id === courseId);
    const day = course?.weeks.flatMap((w) => w.days).find((d) => d.dayNumber === dayNumber);
    let dayMinutes = day?.estimatedMinutes;
    if (!dayMinutes && course) {
      dayMinutes = Math.round((course.estimatedHours ?? 45) * 60 / course.totalDays);
    }
    const dailyXp = (dayMinutes ?? 180) * 10;
    
    toggleDay(courseId, dayNumber);

    // Only fire gamification on completion, not un-completion
    if (!wasComplete) {
      const result = checkAchievements();
      const totalXp = dailyXp + result.xpGained;

      // Show XP toast
      if (totalXp > 0) {
        toast(`+${totalXp} XP earned!`, "success");
      }

      // Show badge unlock toasts
      for (const badgeId of result.newBadges) {
        const badge = BADGES.find((b) => b.id === badgeId);
        if (badge) {
          setTimeout(() => {
            toast(`🏆 Badge Unlocked: ${badge.name}!`, "info");
          }, 600);
        }
      }
    }
  };

  return (
    <button
      type="button"
      id={`completion-toggle-day-${dayNumber}`}
      onClick={handleToggle}
      disabled={!hydrated}
      className={`group inline-flex items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all duration-200 disabled:opacity-50 active:scale-95`}
      style={
        complete
          ? {
              border: "1px solid color-mix(in srgb, var(--accent-green) 40%, transparent)",
              background: "color-mix(in srgb, var(--accent-green) 12%, transparent)",
              color: "var(--accent-green)",
            }
          : {
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }
      }
      aria-pressed={complete}
    >
      <span
        className={`flex ${boxSize} shrink-0 items-center justify-center rounded-md transition-all duration-200`}
        style={
          complete
            ? {
                border: "1px solid var(--accent-green)",
                background: "var(--accent-green)",
                color: "white",
                boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-green) 30%, transparent)",
              }
            : {
                border: "1px solid var(--border-default)",
                background: "var(--bg-raised)",
              }
        }
      >
        {complete && (
          <Check className="h-3.5 w-3.5 animate-check-pop" strokeWidth={3} />
        )}
      </span>
      <span className={textSize}>
        {complete ? "Completed ✓" : label}
      </span>
      {!complete && (
        <Sparkles className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" style={{ color: "var(--accent-purple)" }} />
      )}
    </button>
  );
}
