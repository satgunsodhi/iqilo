import type { DayTaskState, TaskStore } from "./types";

const TASK_KEY = "iqilo-tasks";

function loadStore(): TaskStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(TASK_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TaskStore;
  } catch {
    return {};
  }
}

function saveStore(store: TaskStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASK_KEY, JSON.stringify(store));
}

export function getTaskState(courseId: string, dayNumber: number): DayTaskState {
  const store = loadStore();
  return store[courseId]?.[dayNumber] ?? {};
}

export function isTaskComplete(
  courseId: string,
  dayNumber: number,
  taskIndex: number
): boolean {
  return !!getTaskState(courseId, dayNumber)[taskIndex];
}

export function toggleTask(
  courseId: string,
  dayNumber: number,
  taskIndex: number
): DayTaskState {
  const store = loadStore();
  if (!store[courseId]) store[courseId] = {};
  if (!store[courseId][dayNumber]) store[courseId][dayNumber] = {};

  const current = !!store[courseId][dayNumber][taskIndex];
  store[courseId][dayNumber][taskIndex] = !current;
  saveStore(store);
  return store[courseId][dayNumber];
}

export function getCompletedTaskCount(
  courseId: string,
  dayNumber: number,
  totalTasks: number
): number {
  const state = getTaskState(courseId, dayNumber);
  return Array.from({ length: totalTasks }, (_, i) => i).filter(
    (i) => state[i]
  ).length;
}
