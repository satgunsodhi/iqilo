import { getLevelFromXp } from "./types";
import type { Badge, BadgeId, Course, ProgressStore, StreakData, XpState, BadgeUnlock } from "./types";

// ── Achievement Definitions ─────────────────────────────────────────────────
export const BADGES: Badge[] = [
  {
    id: "first_day",
    name: "First Steps",
    description: "Complete your first day of learning",
    icon: "🎯",
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "week_1",
    name: "Week Warrior",
    description: "Complete 7 days of learning",
    icon: "📅",
    xpReward: 150,
    rarity: "common",
  },
  {
    id: "halfway",
    name: "Halfway Hero",
    description: "Complete 50% of any course",
    icon: "⚡",
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "course_complete",
    name: "Course Conqueror",
    description: "Complete an entire course",
    icon: "🏆",
    xpReward: 500,
    rarity: "rare",
  },
  {
    id: "streak_3",
    name: "On Fire",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "streak_7",
    name: "Unstoppable",
    description: "Maintain a 7-day streak",
    icon: "🌟",
    xpReward: 500,
    rarity: "epic",
  },
  {
    id: "all_notes",
    name: "Scholar",
    description: "Take notes for 10 different days",
    icon: "📝",
    xpReward: 250,
    rarity: "rare",
  },
  {
    id: "speed_learner",
    name: "Speed Learner",
    description: "Complete 5 days in a single week",
    icon: "🚀",
    xpReward: 350,
    rarity: "rare",
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Complete 30 days total across all courses",
    icon: "💎",
    xpReward: 400,
    rarity: "epic",
  },
  {
    id: "master",
    name: "Grand Master",
    description: "Complete all courses",
    icon: "👑",
    xpReward: 1000,
    rarity: "legendary",
  },
];

// ── XP Rewards ─────────────────────────────────────────────────────────────
export const XP_DAILY_COMPLETION = 10;
export const XP_WEEKLY_GOAL = 50;
export const XP_COURSE_COMPLETE = 100;

// ── Streak Management ──────────────────────────────────────────────────────
const STREAK_KEY = "iqilo-streak";
const XP_KEY = "iqilo-xp";
const BADGES_KEY = "iqilo-badges";

export function loadStreak(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" };
  }
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" };
  }
}

function saveStreak(data: StreakData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function updateStreakOnCompletion(): { newStreak: number; streakBroken: boolean } {
  const data = loadStreak();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let newStreak = data.currentStreak;
  let streakBroken = false;

  if (data.lastStudyDate === today) {
    // Already completed today, streak unchanged
  } else if (data.lastStudyDate === yesterdayStr || data.lastStudyDate === "" || data.currentStreak === 0) {
    newStreak++;
  } else {
    // Streak broken
    streakBroken = true;
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, data.longestStreak);

  saveStreak({
    currentStreak: newStreak,
    longestStreak,
    lastStudyDate: today,
  });

  return { newStreak, streakBroken };
}

export function getCurrentStreak(): number {
  return loadStreak().currentStreak;
}

export function getLongestStreak(): number {
  return loadStreak().longestStreak;
}

// ── XP Management ──────────────────────────────────────────────────────────
export function loadXp(): XpState {
  if (typeof window === "undefined") {
    return { currentXp: 0, totalXp: 0, level: 1 };
  }
  try {
    const raw = localStorage.getItem(XP_KEY);
    if (!raw) return { currentXp: 0, totalXp: 0, level: 1 };
    return JSON.parse(raw) as XpState;
  } catch {
    return { currentXp: 0, totalXp: 0, level: 1 };
  }
}

export function saveXp(xp: XpState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(XP_KEY, JSON.stringify(xp));
}

export function addXp(amount: number): XpState {
  const current = loadXp();
  const newCurrentXp = current.currentXp + amount;
  const newTotalXp = current.totalXp + amount;
  const newXp: XpState = {
    currentXp: newCurrentXp,
    totalXp: newTotalXp,
    level: getLevelFromXp(newCurrentXp),
  };
  saveXp(newXp);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("iqilo-xp-update"));
  }
  return newXp;
}

// ── Badge Management ───────────────────────────────────────────────────────
export function loadUnlockedBadges(): BadgeUnlock[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BadgeUnlock[];
  } catch {
    return [];
  }
}

function saveUnlockedBadges(badges: BadgeUnlock[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
}

export function unlockBadge(badgeId: BadgeId): { wasNew: boolean; xpReward: number } {
  const badges = loadUnlockedBadges();
  if (badges.some((b) => b.badgeId === badgeId)) {
    return { wasNew: false, xpReward: 0 };
  }
  const badge = BADGES.find((b) => b.id === badgeId);
  const xpReward = badge?.xpReward ?? 0;

  badges.push({
    badgeId,
    unlockedAt: new Date().toISOString(),
  });
  saveUnlockedBadges(badges);

  return { wasNew: true, xpReward };
}

export function isBadgeUnlocked(badgeId: BadgeId): boolean {
  return loadUnlockedBadges().some((b) => b.badgeId === badgeId);
}

// ── Progress Checkers ─────────────────────────────────────────────────────
export type UnlockResult = {
  newBadges: BadgeId[];
  xpGained: number;
};

export function checkAchievements(
  progress: ProgressStore,
  courses: Course[]
): UnlockResult {
  const result: UnlockResult = {
    newBadges: [],
    xpGained: 0,
  };

  const totalCompletedDays = Object.values(progress).reduce(
    (sum, p) => sum + (p?.completedDays?.length ?? 0),
    0
  );
  // Check first day
  if (totalCompletedDays >= 1 && !isBadgeUnlocked("first_day")) {
    const { xpReward } = unlockBadge("first_day");
    result.newBadges.push("first_day");
    result.xpGained += xpReward;
  }

  // Check week warrior (7 days)
  if (totalCompletedDays >= 7 && !isBadgeUnlocked("week_1")) {
    const { xpReward } = unlockBadge("week_1");
    result.newBadges.push("week_1");
    result.xpGained += xpReward;
  }

  // Check dedicated (30 days)
  if (totalCompletedDays >= 30 && !isBadgeUnlocked("dedicated")) {
    const { xpReward } = unlockBadge("dedicated");
    result.newBadges.push("dedicated");
    result.xpGained += xpReward;
  }

  // Check streaks
  const streak = getCurrentStreak();
  if (streak >= 3 && !isBadgeUnlocked("streak_3")) {
    const { xpReward } = unlockBadge("streak_3");
    result.newBadges.push("streak_3");
    result.xpGained += xpReward;
  }
  if (streak >= 7 && !isBadgeUnlocked("streak_7")) {
    const { xpReward } = unlockBadge("streak_7");
    result.newBadges.push("streak_7");
    result.xpGained += xpReward;
  }

  // Check per-course achievements
  let allCoursesComplete = true;
  for (const course of courses) {
    const courseProgress = progress[course.id];
    if (!courseProgress) {
      allCoursesComplete = false;
      continue;
    }
    const completed = courseProgress.completedDays.length;

    // Halfway hero
    if (completed >= Math.floor(course.totalDays / 2) && !isBadgeUnlocked("halfway")) {
      const { xpReward } = unlockBadge("halfway");
      result.newBadges.push("halfway");
      result.xpGained += xpReward;
    }

    // Course complete
    if (completed >= course.totalDays) {
      if (!isBadgeUnlocked("course_complete")) {
        const { xpReward } = unlockBadge("course_complete");
        result.newBadges.push("course_complete");
        result.xpGained += xpReward;
      }
    } else {
      allCoursesComplete = false;
    }
  }

  // Grand Master
  if (allCoursesComplete && courses.length > 0 && !isBadgeUnlocked("master")) {
    const { xpReward } = unlockBadge("master");
    result.newBadges.push("master");
    result.xpGained += xpReward;
  }

  // Add XP for unlocked badges
  if (result.xpGained > 0) {
    addXp(result.xpGained);
  }
  
  return result;
}

// ── Rarity Styles ──────────────────────────────────────────────────────────
export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common": return "var(--text-muted)";
    case "rare": return "var(--accent-blue)";
    case "epic": return "var(--accent-purple)";
    case "legendary": return "var(--accent-yellow)";
    default: return "var(--text-muted)";
  }
}

export function getRarityGlow(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common": return "0 0 10px rgba(0,0,0,0.05)";
    case "rare": return "0 0 15px color-mix(in srgb, var(--accent-blue) 30%, transparent)";
    case "epic": return "0 0 20px color-mix(in srgb, var(--accent-purple) 35%, transparent)";
    case "legendary": return "0 0 25px color-mix(in srgb, var(--accent-yellow) 40%, transparent)";
    default: return "none";
  }
}
