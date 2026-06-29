import type { ActivityMap, ActivityStore } from "./types";

const ACTIVITY_KEY = "iqilo-activity";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadStore(): ActivityStore {
  if (typeof window === "undefined") return { activity: {} };
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return { activity: {} };
    return JSON.parse(raw) as ActivityStore;
  } catch {
    return { activity: {} };
  }
}

function saveStore(store: ActivityStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(store));
}

/** Call this when a day is marked complete */
export function recordActivity(): void {
  const store = loadStore();
  const today = todayISO();
  store.activity[today] = (store.activity[today] ?? 0) + 1;
  saveStore(store);
}

/** Call this when a day is un-marked */
export function removeActivity(): void {
  const store = loadStore();
  const today = todayISO();
  if (store.activity[today] && store.activity[today] > 0) {
    store.activity[today] -= 1;
    if (store.activity[today] === 0) delete store.activity[today];
  }
  saveStore(store);
}

export function getActivityMap(): ActivityMap {
  return loadStore().activity;
}

/** Returns the number of consecutive days ending today that have at least 1 activity */
export function getCurrentStreak(): number {
  const activity = getActivityMap();
  let streak = 0;
  const cur = new Date();
  while (true) {
    const iso = cur.toISOString().slice(0, 10);
    if (activity[iso] && activity[iso] > 0) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

/** Total number of distinct days with any activity */
export function getTotalActiveDays(): number {
  const activity = getActivityMap();
  return Object.keys(activity).length;
}
