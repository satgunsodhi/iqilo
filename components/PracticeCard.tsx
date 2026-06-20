import { ExternalLink } from "lucide-react";
import type { PracticeProblem } from "@/lib/types";

const platformStyles: Record<
  PracticeProblem["platform"],
  { badge: string; label: string }
> = {
  leetcode: {
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50",
    label: "LeetCode",
  },
  cses: {
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/50",
    label: "CSES",
  },
  other: {
    badge: "bg-[--bg-sunken] text-[--text-secondary] border-[--border-default]",
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
      className="group flex items-center justify-between gap-3 rounded-xl border border-[--border-subtle] bg-[--bg-surface] px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[--border-default] hover:shadow-md"
    >
      <div className="min-w-0">
        <span
          className={`mb-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}
        >
          {style.label}
        </span>
        <p className="truncate text-sm font-bold text-[--text-primary]">
          {problem.label}
        </p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-[--text-faint] transition group-hover:text-[--accent-purple]" />
    </a>
  );
}
