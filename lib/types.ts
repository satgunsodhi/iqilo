export type Platform = "leetcode" | "cses" | "other" | (string & {});

export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type Resource = {
  label: string;
  url: string;
  embed?: "youtube";
  /** If true, this resource will attempt to open in the embedded panel */
  embeddable?: boolean;
};

export type PracticeProblem = {
  label: string;
  url: string;
  platform: Platform;
};

export type DailyProtocol = {
  synthesize: string;
  grind: string;
  bridge: string;
  template: string;
};

export type Day = {
  dayNumber: number;
  title: string;
  objective: string;
  resources?: Resource[];
  practice?: PracticeProblem[];
  pitfall?: string;
  tasks?: string[];
  protocol?: DailyProtocol;
  estimatedMinutes?: number;
};

export type Week = {
  weekNumber: number;
  title: string;
  days: Day[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  totalDays: number;
  weeks: Week[];
  /** New platform-level metadata */
  difficulty?: Difficulty;
  tags?: string[];
  estimatedHours?: number;
  category?: string;
  /** Short tagline shown on course cards */
  tagline?: string;
  /** Prerequisite course IDs */
  prerequisites?: string[];
};

export type CourseProgress = {
  completedDays: number[];
  lastVisitedDay: number;
  completedResources?: string[];
};

export type ProgressStore = Record<string, CourseProgress>;

// ── Task toggle state ──────────────────────────────────────────────────────
/** Maps taskIndex → completed, stored per day */
export type DayTaskState = Record<number, boolean>;
/** courseId → dayNumber → DayTaskState */
export type TaskStore = Record<string, Record<number, DayTaskState>>;

// ── User ───────────────────────────────────────────────────────────────────
export type User = {
  name: string;
  weeklyGoal: number; // days per week
  joinedAt: string;   // ISO date string
};

// ── Activity ───────────────────────────────────────────────────────────────
/** ISO date string (YYYY-MM-DD) → count of days completed that date */
export type ActivityMap = Record<string, number>;

export type ActivityStore = {
  activity: ActivityMap;
};

// ── XP & Leveling ─────────────────────────────────────────────────────────
export type XpState = {
  currentXp: number;     // total XP earned
  totalXp: number;      // all-time XP
  level: number;
};

export function getXpNeededForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level >= 1 && level <= 7) {
    return level * 1000;
  }
  if (level === 8) return 9000;
  if (level === 9) return 11000;
  if (level === 10) return 12500;
  if (level === 11) return 14000;
  if (level >= 12 && level <= 41) {
    return 14000 + (level - 11) * 400;
  }
  if (level >= 42 && level <= 50) {
    return 26000 + (level - 41) * 1200;
  }
  if (level >= 51 && level <= 65) {
    return 98700;
  }
  if (level >= 66 && level <= 80) {
    return 246750;
  }
  if (level >= 81 && level <= 90) {
    return 493500;
  }
  return 1110375;
}

export function getLevelFromXp(xp: number): number {
  const MAX_LEVEL = 200;
  let level = 1;
  let remainingXp = xp;
  while (level < MAX_LEVEL) {
    const needed = getXpNeededForLevel(level);
    if (remainingXp >= needed) {
      remainingXp -= needed;
      level++;
    } else {
      break;
    }
  }
  return level;
}

export function getXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXpNeededForLevel(i);
  }
  return total;
}

export function getXpToNextLevel(currentXp: number): { current: number; needed: number; percent: number } {
  const level = getLevelFromXp(currentXp);
  const xpAtLevel = getXpForLevel(level);
  const xpNeeded = getXpNeededForLevel(level);
  const current = currentXp - xpAtLevel;
  return {
    current,
    needed: xpNeeded,
    percent: Math.min(100, Math.round((current / xpNeeded) * 100)),
  };
}

// ── Streak ───────────────────────────────────────────────────────────────
export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // ISO date string
};

// ── Achievements ───────────────────────────────────────────────────────────
export type BadgeId =
  | "first_day"
  | "week_1"
  | "halfway"
  | "course_complete"
  | "streak_3"
  | "streak_7"
  | "all_notes"
  | "speed_learner"
  | "dedicated"
  | "master";

export type Badge = {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export type BadgeUnlock = {
  badgeId: BadgeId;
  unlockedAt: string; // ISO date
};
