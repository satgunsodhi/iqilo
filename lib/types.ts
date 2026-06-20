export type Platform = "leetcode" | "cses" | "other";

export type Resource = {
  label: string;
  url: string;
  embed?: "youtube";
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
};

export type CourseProgress = {
  completedDays: number[];
  lastVisitedDay: number;
};

export type ProgressStore = Record<string, CourseProgress>;
