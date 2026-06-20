"use client";

import { Check } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

type CompletionToggleProps = {
  courseId: string;
  dayNumber: number;
  label?: string;
  size?: "sm" | "md";
};

export function CompletionToggle({
  courseId,
  dayNumber,
  label = "Mark day complete",
  size = "md",
}: CompletionToggleProps) {
  const { isDayComplete, toggleDay, hydrated } = useProgress();
  const complete = hydrated && isDayComplete(courseId, dayNumber);
  const boxSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <button
      type="button"
      id={`completion-toggle-day-${dayNumber}`}
      onClick={() => toggleDay(courseId, dayNumber)}
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
        {complete ? "Day complete ✓" : label}
      </span>
    </button>
  );
}
