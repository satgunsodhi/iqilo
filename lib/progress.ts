import type { Course, CourseProgress, ProgressStore } from "./types";
import { recordActivity, removeActivity } from "./activity";
import { updateStreakOnCompletion, addXp, XP_DAILY_COMPLETION } from "./achievements";

import { getCourseById } from "./courses";

export const STORAGE_KEY = "dsa-learner-progress";

export function createEmptyProgress(): CourseProgress {
  return { completedDays: [], lastVisitedDay: 1, completedResources: [] };
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
  dayNumber: number,
  forceState?: boolean
): ProgressStore {
  const current = getCourseProgress(store, courseId);
  const completed = new Set(current.completedDays);
  if (forceState === true || (!forceState && !completed.has(dayNumber))) {
    if (!completed.has(dayNumber)) {
      completed.add(dayNumber);
      recordActivity();
      updateStreakOnCompletion();
      
      const course = getCourseById(courseId);
      const day = course?.weeks.flatMap(w => w.days).find(d => d.dayNumber === dayNumber);
      let dayMinutes = day?.estimatedMinutes;
      if (!dayMinutes && course) {
        dayMinutes = Math.round((course.estimatedHours ?? 45) * 60 / course.totalDays);
      }
      const dailyXp = (dayMinutes ?? 180) * 10;
      addXp(dailyXp);
    }
  } else if (forceState === false || (!forceState && completed.has(dayNumber))) {
    if (completed.has(dayNumber)) {
      completed.delete(dayNumber);
      removeActivity();
    }
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

export function getResourceXp(courseId: string, resourceId: string): number {
  const course = getCourseById(courseId);
  if (!course) return 0;
  
  const day = course.weeks.flatMap(w => w.days).find(d => {
    return d.resources?.some(r => r.url === resourceId) || d.practice?.some(p => p.url === resourceId);
  });
  if (!day) return 0;

  const totalDays = course.totalDays || 30;
  const dayMinutes = day.estimatedMinutes || Math.round((course.estimatedHours ?? 45) * 60 / totalDays);
  const dailyTotalXp = dayMinutes * 10;

  const numResources = day.resources?.length || 0;
  const numPractice = day.practice?.length || 0;

  let resourceWeight = 0.15;
  let practiceWeight = 0.60;

  if (numResources === 0 && numPractice > 0) {
    practiceWeight = 0.75;
  } else if (numPractice === 0 && numResources > 0) {
    resourceWeight = 0.75;
  }

  const isResource = day.resources?.some(r => r.url === resourceId);
  const isPractice = day.practice?.some(p => p.url === resourceId);

  if (isResource && numResources > 0) {
    return Math.round((resourceWeight * dailyTotalXp) / numResources);
  } else if (isPractice && numPractice > 0) {
    return Math.round((practiceWeight * dailyTotalXp) / numPractice);
  }

  return 0;
}

export function isResourceComplete(
  store: ProgressStore,
  courseId: string,
  resourceId: string
): boolean {
  return getCourseProgress(store, courseId).completedResources?.includes(resourceId) ?? false;
}

export function toggleResource(
  store: ProgressStore,
  courseId: string,
  resourceId: string
): ProgressStore {
  const current = getCourseProgress(store, courseId);
  const resources = new Set(current.completedResources || []);
  const itemXp = getResourceXp(courseId, resourceId);
  const isAdding = !resources.has(resourceId);

  if (isAdding) {
    resources.add(resourceId);
    if (itemXp > 0) addXp(itemXp);
  } else {
    resources.delete(resourceId);
    if (itemXp > 0) addXp(-itemXp);
  }

  return {
    ...store,
    [courseId]: { ...current, completedResources: Array.from(resources) },
  };
}

export function setResourceComplete(
  store: ProgressStore,
  courseId: string,
  resourceId: string,
  complete: boolean
): ProgressStore {
  const current = getCourseProgress(store, courseId);
  const resources = new Set(current.completedResources || []);
  const currentlyComplete = resources.has(resourceId);
  if (currentlyComplete === complete) return store;

  const itemXp = getResourceXp(courseId, resourceId);

  if (complete) {
    resources.add(resourceId);
    if (itemXp > 0) addXp(itemXp);
  } else {
    resources.delete(resourceId);
    if (itemXp > 0) addXp(-itemXp);
  }

  return {
    ...store,
    [courseId]: { ...current, completedResources: Array.from(resources) },
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
