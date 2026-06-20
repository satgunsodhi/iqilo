import { ExternalLink } from "lucide-react";
import type { PracticeProblem } from "@/lib/types";

const platformStyles: Record<
  PracticeProblem["platform"],
  { badge: string; label: string }
> = {
  leetcode: {
    badge: "bg-[#fff0cf] text-[#8a5a00] border-[#efc773]",
    label: "LeetCode",
  },
  cses: {
    badge: "bg-[#dce8ff] text-[#2d4f95] border-[#9eb9ee]",
    label: "CSES",
  },
  other: {
    badge: "bg-[#eee4d2] text-[#6f6255] border-[#d6c7ad]",
    label: "Practice",
  },
};

type PracticeCardProps = {
  problem: PracticeProblem;
};

export function PracticeCard({ problem }: PracticeCardProps) {
  const style = platformStyles[problem.platform];

  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl border border-[#dfd4bf] bg-white px-4 py-3 shadow-sm transition hover:border-[#171411]"
    >
      <div className="min-w-0">
        <span
          className={`mb-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}
        >
          {style.label}
        </span>
        <p className="truncate text-sm font-bold text-[#171411]">
          {problem.label}
        </p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-[#8d7c6a] group-hover:text-[#171411]" />
    </a>
  );
}
