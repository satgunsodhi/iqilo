"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
  useRef,
  useEffect,
  useState,
} from "react";
import type { Course, ProgressStore } from "@/lib/types";
import {
  createEmptyProgress,
  exportProgressJson,
  getCompletionStats,
  getCourseProgress,
  getNextIncompleteDay,
  getWeekProgress,
  isDayComplete,
  isResourceComplete,
  loadProgress,
  saveProgress,
  setLastVisitedDay,
  toggleDay as toggleDayInStore,
  toggleResource as toggleResourceInStore,
  setResourceComplete as setResourceCompleteInStore,
} from "@/lib/progress";
import {
  getCurrentStreak,
  getLongestStreak,
  loadXp,
  loadUnlockedBadges,
  BADGES,
  checkAchievements as checkAchievementsFn,
} from "@/lib/achievements";
import { getLevelFromXp, getXpToNextLevel } from "@/lib/types";
import { listCourses } from "@/lib/courses";

// ── Gamification Snapshot ─────────────────────────────────────────────────
type GamificationSnapshot = {
  xp: { current: number; total: number; level: number };
  streak: { current: number; longest: number };
  badges: string[]; // unlocked badge IDs
};

// ── XP/Streak Store (external, for useSyncExternalStore) ─────────────────
let xpStore: GamificationSnapshot | null = null;
const xpListeners = new Set<() => void>();

function getXpSnapshot(): GamificationSnapshot {
  if (xpStore === null) {
    const xpData = loadXp();
    xpStore = {
      xp: {
        current: xpData.currentXp,
        total: xpData.totalXp,
        level: getLevelFromXp(xpData.currentXp),
      },
      streak: {
        current: getCurrentStreak(),
        longest: getLongestStreak(),
      },
      badges: loadUnlockedBadges().map((b) => b.badgeId),
    };
  }
  return xpStore;
}

function subscribeXp(listener: () => void) {
  xpListeners.add(listener);
  return () => xpListeners.delete(listener);
}

function notifyXpListeners() {
  xpStore = null; // invalidate cache
  xpListeners.forEach((l) => l());
}

// ── Context Type ───────────────────────────────────────────────────────────
type ProgressContextValue = {
  hydrated: boolean;
  store: ProgressStore;
  isDayComplete: (courseId: string, dayNumber: number) => boolean;
  toggleDay: (courseId: string, dayNumber: number, forceState?: boolean) => void;
  isResourceComplete: (courseId: string, resourceId: string) => boolean;
  toggleResource: (courseId: string, resourceId: string) => void;
  setResourceComplete: (courseId: string, resourceId: string, complete: boolean) => void;
  visitDay: (courseId: string, dayNumber: number) => void;
  getCourseStats: (course: Course) => { completed: number; total: number; percent: number };
  getWeekStats: (courseId: string, dayNumbers: number[]) => { completed: number; total: number; percent: number };
  getNextDay: (course: Course) => number;
  exportProgress: () => string;
  // ── Gamification ─────────────────────────
  xp: { current: number; total: number; level: number };
  xpToNextLevel: { current: number; needed: number; percent: number };
  streak: { current: number; longest: number };
  badges: string[];
  checkAchievements: () => { newBadges: string[]; xpGained: number };
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

// ── Progress Store ────────────────────────────────────────────────────────
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

// ── Provider ───────────────────────────────────────────────────────────────
export function ProgressProvider({ children }: { children: ReactNode }) {
  const store = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribe, getTrue, getFalse);

  // XP/Streak sync
  const gamification = useSyncExternalStore(subscribeXp, getXpSnapshot, getXpSnapshot);

  // Trigger re-render on localStorage events (cross-tab sync)
  const [, setTick] = useState(0);
  const reRender = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "iqilo-xp" || e.key === "iqilo-streak" || e.key === "iqilo-badges") {
        notifyXpListeners();
        reRender();
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [reRender]);

  const toggleDay = useCallback((courseId: string, dayNumber: number, forceState?: boolean) => {
    commitStore(toggleDayInStore(getClientSnapshot(), courseId, dayNumber, forceState));
    // Gamification data may have changed
    notifyXpListeners();
    reRender();
  }, [reRender]);

  const visitDay = useCallback((courseId: string, dayNumber: number) => {
    commitStore(setLastVisitedDay(getClientSnapshot(), courseId, dayNumber));
  }, []);

  const checkAchievements = useCallback(() => {
    const result = checkAchievementsFn(getClientSnapshot(), listCourses());
    notifyXpListeners();
    reRender();
    return result;
  }, [reRender]);

  const xpInfo = useMemo(() => {
    return {
      current: gamification.xp.current,
      total: gamification.xp.total,
      level: gamification.xp.level,
    };
  }, [gamification.xp.current, gamification.xp.total, gamification.xp.level]);

  const xpToNextLevel = useMemo(() => {
    return getXpToNextLevel(gamification.xp.current);
  }, [gamification.xp.current]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      hydrated,
      store,
      isDayComplete: (courseId, dayNumber) => isDayComplete(store, courseId, dayNumber),
      toggleDay,
      isResourceComplete: (courseId, resourceId) => isResourceComplete(store, courseId, resourceId),
      toggleResource: (courseId, resourceId) => {
        commitStore(toggleResourceInStore(getClientSnapshot(), courseId, resourceId));
      },
      setResourceComplete: (courseId, resourceId, complete) => {
        commitStore(setResourceCompleteInStore(getClientSnapshot(), courseId, resourceId, complete));
      },
      visitDay,
      getCourseStats: (course) => getCompletionStats(store, course),
      getWeekStats: (courseId, dayNumbers) => getWeekProgress(store, courseId, dayNumbers),
      getNextDay: (course) => getNextIncompleteDay(store, course),
      exportProgress: () => exportProgressJson(store),
      xp: xpInfo,
      xpToNextLevel,
      streak: { current: gamification.streak.current, longest: gamification.streak.longest },
      badges: gamification.badges,
      checkAchievements,
    }),
    [hydrated, store, toggleDay, visitDay, gamification, xpInfo, xpToNextLevel, checkAchievements]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// ── Hooks ──────────────────────────────────────────────────────────────────
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

export function useGamification() {
  const { xp, streak, badges, xpToNextLevel } = useProgress();
  return { xp, streak, badges, xpToNextLevel };
}
