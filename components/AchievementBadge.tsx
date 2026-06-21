import type { Badge } from "@/lib/types";

type AchievementBadgeProps = {
  badge: Badge;
  unlocked: boolean;
};

export function AchievementBadge({ badge, unlocked }: AchievementBadgeProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition-all duration-200"
      style={{
        border: unlocked
          ? "1px solid color-mix(in srgb, var(--accent-yellow) 35%, transparent)"
          : "1px solid var(--border-subtle)",
        background: unlocked
          ? "color-mix(in srgb, var(--accent-yellow) 8%, var(--bg-surface))"
          : "var(--bg-raised)",
        opacity: unlocked ? 1 : 0.55,
      }}
      title={unlocked ? "Unlocked!" : "Locked"}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300"
        style={{
          background: unlocked
            ? "color-mix(in srgb, var(--accent-yellow) 20%, transparent)"
            : "var(--bg-sunken)",
          filter: unlocked ? "none" : "grayscale(100%)",
          transform: unlocked ? "scale(1)" : "scale(0.9)",
        }}
      >
        {badge.icon}
      </span>
      <div>
        <p className="text-xs font-black" style={{ color: unlocked ? "var(--text-primary)" : "var(--text-faint)" }}>
          {badge.name}
        </p>
        <p className="mt-0.5 text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
          {badge.description}
        </p>
      </div>
      {unlocked && (
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
          style={{ background: "color-mix(in srgb, var(--accent-yellow) 20%, transparent)", color: "var(--accent-yellow)" }}
        >
          Unlocked
        </span>
      )}
    </div>
  );
}
