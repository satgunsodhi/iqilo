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

// ── Achievements ───────────────────────────────────────────────────────────
export type BadgeId =
  | "first_day"
  | "week_1"
  | "halfway"
  | "course_complete"
  | "streak_3"
  | "streak_7"
  | "all_notes"
  | "speed_learner";

export type Badge = {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
};
