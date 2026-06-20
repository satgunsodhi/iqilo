"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Course, ProgressStore } from "@/lib/types";
import {
  exportProgressJson,
  getCompletionStats,
  getCourseProgress,
  getNextIncompleteDay,
  getWeekProgress,
  isDayComplete,
  loadProgress,
  saveProgress,
  setLastVisitedDay,
  toggleDay as toggleDayInStore,
} from "@/lib/progress";

type ProgressContextValue = {
  hydrated: boolean;
  store: ProgressStore;
  isDayComplete: (courseId: string, dayNumber: number) => boolean;
  toggleDay: (courseId: string, dayNumber: number) => void;
  visitDay: (courseId: string, dayNumber: number) => void;
  getCourseStats: (course: Course) => {
    completed: number;
    total: number;
    percent: number;
  };
  getWeekStats: (
    courseId: string,
    dayNumbers: number[]
  ) => { completed: number; total: number; percent: number };
  getNextDay: (course: Course) => number;
  exportProgress: () => string;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

let clientStore: ProgressStore | null = null;
const listeners = new Set<() => void>();
const emptyStore: ProgressStore = {};

function getClientSnapshot(): ProgressStore {
  if (clientStore === null) {
    clientStore = loadProgress();
  }
  return clientStore;
}

function getServerSnapshot(): ProgressStore {
  return emptyStore;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function commitStore(next: ProgressStore) {
  clientStore = next;
  saveProgress(next);
  listeners.forEach((listener) => listener());
}

const getTrue = () => true;
const getFalse = () => false;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const store = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    getTrue,
    getFalse
  );

  const toggleDay = useCallback((courseId: string, dayNumber: number) => {
    commitStore(toggleDayInStore(getClientSnapshot(), courseId, dayNumber));
  }, []);

  const visitDay = useCallback((courseId: string, dayNumber: number) => {
    commitStore(setLastVisitedDay(getClientSnapshot(), courseId, dayNumber));
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      hydrated,
      store,
      isDayComplete: (courseId, dayNumber) =>
        isDayComplete(store, courseId, dayNumber),
      toggleDay,
      visitDay,
      getCourseStats: (course) => getCompletionStats(store, course),
      getWeekStats: (courseId, dayNumbers) =>
        getWeekProgress(store, courseId, dayNumbers),
      getNextDay: (course) => getNextIncompleteDay(store, course),
      exportProgress: () => exportProgressJson(store),
    }),
    [hydrated, store, toggleDay, visitDay]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}

export function useCourseProgress(courseId: string) {
  const { store, hydrated } = useProgress();
  return { progress: getCourseProgress(store, courseId), hydrated };
}
