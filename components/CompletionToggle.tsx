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
      className={`group inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 font-medium transition-all duration-200 disabled:opacity-50 active:scale-95 ${
        complete
          ? "border-[--accent-green]/40 bg-gradient-to-r from-[--accent-green]/10 to-[--accent-green]/5 text-[--accent-green] shadow-sm"
          : "border-[--border-default] bg-[--bg-surface] text-[--text-secondary] hover:border-[--border-strong] hover:bg-[--bg-raised] hover:text-[--text-primary]"
      }`}
      aria-pressed={complete}
    >
      <span
        className={`flex ${boxSize} shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
          complete
            ? "border-[--accent-green] bg-[--accent-green] text-white shadow-sm shadow-[--accent-green]/30"
            : "border-[--border-default] bg-[--bg-raised] group-hover:border-[--border-strong]"
        }`}
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
