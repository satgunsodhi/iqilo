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
      onClick={() => toggleDay(courseId, dayNumber)}
      disabled={!hydrated}
      className={`group inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 transition disabled:opacity-50 ${
        complete
          ? "border-[#75b064] bg-[#e4f4de] text-[#345f2b]"
          : "border-[#d6c7ad] bg-white text-[#171411] hover:border-[#171411]"
      }`}
      aria-pressed={complete}
    >
      <span
        className={`flex ${boxSize} shrink-0 items-center justify-center rounded-md border transition ${
          complete
            ? "border-[#75b064] bg-[#75b064] text-white"
            : "border-[#cdbfa9] bg-[#f6f1dd] group-hover:border-[#171411]"
        }`}
      >
        {complete && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className={`${textSize} font-medium`}>
        {complete ? "Day complete" : label}
      </span>
    </button>
  );
}
