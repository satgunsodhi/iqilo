import type { Course, CourseProgress, ProgressStore } from "./types";

export const STORAGE_KEY = "dsa-learner-progress";

export function createEmptyProgress(): CourseProgress {
  return { completedDays: [], lastVisitedDay: 1 };
}

export function loadProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressStore;
  } catch {
    return {};
  }
}

export function saveProgress(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getCourseProgress(
  store: ProgressStore,
  courseId: string
): CourseProgress {
  return store[courseId] ?? createEmptyProgress();
}

export function isDayComplete(
  store: ProgressStore,
  courseId: string,
  dayNumber: number
): boolean {
  return getCourseProgress(store, courseId).completedDays.includes(dayNumber);
}

export function toggleDay(
  store: ProgressStore,
  courseId: string,
  dayNumber: number
): ProgressStore {
  const current = getCourseProgress(store, courseId);
  const completed = new Set(current.completedDays);
  if (completed.has(dayNumber)) {
    completed.delete(dayNumber);
  } else {
    completed.add(dayNumber);
  }
  return {
    ...store,
    [courseId]: {
      ...current,
      completedDays: Array.from(completed).sort((a, b) => a - b),
      lastVisitedDay: dayNumber,
    },
  };
}

export function setLastVisitedDay(
  store: ProgressStore,
  courseId: string,
  dayNumber: number
): ProgressStore {
  const current = getCourseProgress(store, courseId);
  return {
    ...store,
    [courseId]: { ...current, lastVisitedDay: dayNumber },
  };
}

export function getCompletionStats(
  store: ProgressStore,
  course: Course
): { completed: number; total: number; percent: number } {
  const { completedDays } = getCourseProgress(store, course.id);
  const total = course.totalDays;
  const completed = completedDays.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

export function getWeekProgress(
  store: ProgressStore,
  courseId: string,
  dayNumbers: number[]
): { completed: number; total: number; percent: number } {
  const { completedDays } = getCourseProgress(store, courseId);
  const completedSet = new Set(completedDays);
  const completed = dayNumbers.filter((d) => completedSet.has(d)).length;
  const total = dayNumbers.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

export function getNextIncompleteDay(
  store: ProgressStore,
  course: Course
): number {
  const { completedDays } = getCourseProgress(store, course.id);
  const completedSet = new Set(completedDays);
  for (let day = 1; day <= course.totalDays; day++) {
    if (!completedSet.has(day)) return day;
  }
  return course.totalDays;
}

export function exportProgressJson(store: ProgressStore): string {
  return JSON.stringify(store, null, 2);
}
