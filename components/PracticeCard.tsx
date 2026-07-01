import { ExternalLink } from "lucide-react";
import type { PracticeProblem } from "@/lib/types";
import { useLeetCode } from "@/hooks/useLeetCode";
import { useCses } from "@/hooks/useCses";
import { useProgress } from "@/hooks/useProgress";
import { PlatformIcon } from "./PlatformIcon";

type PracticeCardProps = {
  problem: PracticeProblem;
  courseId?: string;
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

export function PracticeCard({ problem, courseId }: PracticeCardProps) {
  const platform = (problem.platform && Object.keys(platformLabel).includes(problem.platform))
    ? (problem.platform as ConfiguredPlatform)
    : "other";

  const label = platformLabel[platform];
  const accent = platformAccent[platform];

  const { isSolved: isLeetCodeSolved } = useLeetCode();
  const { isSolved: isCsesSolved } = useCses();
  const { isResourceComplete, setResourceComplete } = useProgress();

  const solved = 
    (platform === "leetcode" && isLeetCodeSolved(problem.url)) ||
    (platform === "cses" && isCsesSolved(problem.url)) ||
    (platform === "other" && courseId && isResourceComplete(courseId, problem.url));

  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (platform === "other" && courseId && !solved) {
          setResourceComplete(courseId, problem.url, true);
        }
      }}
      className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        border: solved ? "1px solid color-mix(in srgb, var(--accent-green) 35%, transparent)" : "1px solid var(--border-subtle)",
        background: solved ? "color-mix(in srgb, var(--accent-green) 6%, var(--bg-surface))" : "var(--bg-surface)"
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--bg-sunken)" }}>
          <PlatformIcon platform={problem.platform} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                color: accent,
              }}
            >
              {label}
            </span>
            {solved && (
              <span
                className="inline-flex items-center gap-0.5 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide animate-fade-in"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent-green) 30%, transparent)",
                  background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                  color: "var(--accent-green)",
                }}
              >
                Solved
              </span>
            )}
          </div>
          <p className="truncate text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {problem.label}
          </p>
        </div>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 transition" style={{ color: "var(--text-faint)" }} />
    </a>
  );
}
