"use client";

import { Flame, TrendingUp } from "lucide-react";

interface StreakDisplayProps {
  current: number;
  longest: number;
  size?: "sm" | "md" | "lg";
}

export function StreakDisplay({ current, longest, size = "md" }: StreakDisplayProps) {
  const fireColor = current >= 7 ? "var(--accent-orange)" : current >= 3 ? "var(--accent-teal)" : "var(--text-muted)";
  const fireGlow = current >= 7 ? "0 0 12px var(--accent-orange)" : "none";

  const sizeConfig = {
    sm: { icon: 16, text: "text-xs" },
    md: { icon: 20, text: "text-sm" },
    lg: { icon: 24, text: "text-base" },
  };

  const { icon, text } = sizeConfig[size];

  return (
      <div className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all ${current >= 7 ? "shadow-[4px_4px_0_var(--text-primary)]" : ""}`} style={{ background: "var(--bg-raised)", border: current >= 7 ? "2px solid var(--text-primary)" : "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)" }}>
      <div className="relative">
        <Flame
          size={icon}
          style={{ color: fireColor, filter: `drop-shadow(${fireGlow})` }}
          className={current > 0 ? "animate-streak-fire" : ""}
        />
        {current >= 7 && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ background: "var(--text-primary)" }} />
        )}
      </div>
      <div className="flex flex-col">
        <span className={`font-black ${text}`} style={{ color: "var(--text-primary)" }}>
          {current} day{current !== 1 ? "s" : ""} streak
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>
          Best: {longest} days
        </span>
      </div>
    </div>
  );
}

// ── Compact streak badge for header ───────────────────────────────────────
export function StreakBadge({ current }: { current: number }) {
  const fireColor = current >= 7 ? "var(--accent-orange)" : current >= 3 ? "var(--accent-teal)" : "var(--text-muted)";

  return (
    <div
      className="interactive flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all relative overflow-hidden"
      style={{
        background: `var(--bg-raised)`,
        color: fireColor,
        border: `1px solid var(--border-subtle)`,
        borderRadius: "var(--radius-lg)"
      }}
    >
      <Flame size={14} className={current > 0 ? "animate-streak-fire" : ""} />
      <span>{current}</span>
      {current > 0 && (
        <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: fireColor, boxShadow: "0 0 8px currentColor" }}></span>
        </span>
      )}
    </div>
  );
}
