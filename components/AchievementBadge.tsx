import type { Badge } from "@/lib/types";

type AchievementBadgeProps = {
  badge: Badge;
  unlocked: boolean;
  showRarity?: boolean;
  animate?: boolean;
};

const RARITY_LABELS: Record<Badge["rarity"], string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

export function AchievementBadge({ badge, unlocked, showRarity = true, animate = false }: AchievementBadgeProps) {
  return (
    <div
      className={`badge-card rarity-${badge.rarity} flex flex-col items-center gap-2.5 p-4 text-center glass-panel ${
        unlocked ? "unlocked" : "locked"
      } ${animate && unlocked ? "animate-badge-unlock" : ""}`}
      style={{
        opacity: unlocked ? 1 : 0.6,
      }}
      title={unlocked ? `Unlocked! +${badge.xpReward} XP` : `Locked — ${badge.description}`}
    >
      {/* Icon */}
      <div className="relative">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition-all duration-200"
          style={{
            background: unlocked
              ? "color-mix(in srgb, var(--rarity-color) 18%, transparent)"
              : "var(--bg-sunken)",
            filter: unlocked ? "none" : "grayscale(100%)",
            transform: unlocked ? "scale(1)" : "scale(0.85)",
          }}
        >
          {badge.icon}
        </span>
        {/* Glow ring for legendary */}
        {unlocked && badge.rarity === "legendary" && (
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              animation: "pulse-ring 2s ease infinite",
              border: "2px solid color-mix(in srgb, var(--accent-yellow) 40%, transparent)",
            }}
          />
        )}
      </div>

      {/* Name */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-black" style={{ color: "var(--text-primary)" }}>
          {badge.name}
        </p>
        <p className="mt-0.5 text-[10px] font-medium leading-snug" style={{ color: "var(--text-muted)" }}>
          {badge.description}
        </p>
      </div>

      {/* Rarity & Status */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto">
        {showRarity && (
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
            style={{
              background: "color-mix(in srgb, var(--rarity-color) 15%, transparent)",
              color: "var(--rarity-color)",
            }}
          >
            {RARITY_LABELS[badge.rarity]}
          </span>
        )}
        {unlocked && (
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
            style={{ background: "color-mix(in srgb, var(--accent-green) 15%, transparent)", color: "var(--accent-green)" }}
          >
            ✓ Unlocked
          </span>
        )}
      </div>

      {/* XP reward */}
      {unlocked && (
        <span className="text-[10px] font-bold" style={{ color: "var(--accent-purple)" }}>
          +{badge.xpReward} XP
        </span>
      )}
    </div>
  );
}
