import { ExternalLink } from "lucide-react";
import type { PracticeProblem } from "@/lib/types";

type PracticeCardProps = {
  problem: PracticeProblem;
};

const platformLabel = {
  leetcode: "LeetCode",
  cses: "CSES",
  other: "Practice",
} as const;

type ConfiguredPlatform = keyof typeof platformLabel;

const platformAccent: Record<ConfiguredPlatform, string> = {
  leetcode: "#f59e0b", // amber
  cses: "#3b82f6",    // blue
  other: "var(--text-muted)",
};

export function PracticeCard({ problem }: PracticeCardProps) {
  const platform = (problem.platform && Object.keys(platformLabel).includes(problem.platform))
    ? (problem.platform as ConfiguredPlatform)
    : "other";

  const label = platformLabel[platform];
  const accent = platformAccent[platform];

  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      <div className="min-w-0">
        <span
          className="mb-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
            color: accent,
          }}
        >
          {label}
        </span>
        <p className="truncate text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          {problem.label}
        </p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 transition" style={{ color: "var(--text-faint)" }} />
    </a>
  );
}
