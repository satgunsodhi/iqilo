"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import type { Course, ProgressStore } from "@/lib/types";
import {
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

const defaultGamificationSnapshot: GamificationSnapshot = {
  xp: { current: 0, total: 0, level: 1 },
  streak: { current: 0, longest: 0 },
  badges: [],
};

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
  const gamification = useSyncExternalStore(subscribeXp, getXpSnapshot, () => defaultGamificationSnapshot);

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
    function handleLocalUpdate() {
      notifyXpListeners();
      reRender();
    }
    window.addEventListener("storage", handleStorage);
    window.addEventListener("iqilo-xp-update", handleLocalUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("iqilo-xp-update", handleLocalUpdate);
    };
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

  const xpCurrent = gamification.xp.current;
  const xpTotal = gamification.xp.total;
  const xpLevel = gamification.xp.level;
  const streakCurrent = gamification.streak.current;
  const streakLongest = gamification.streak.longest;
  const badgesList = gamification.badges;

  const xpInfo = useMemo(() => {
    return {
      current: xpCurrent,
      total: xpTotal,
      level: xpLevel,
    };
  }, [xpCurrent, xpTotal, xpLevel]);

  const xpToNextLevel = useMemo(() => {
    return getXpToNextLevel(xpCurrent);
  }, [xpCurrent]);

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
      streak: { current: streakCurrent, longest: streakLongest },
      badges: badgesList,
      checkAchievements,
    }),
    [hydrated, store, toggleDay, visitDay, xpInfo, xpToNextLevel, streakCurrent, streakLongest, badgesList, checkAchievements]
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
