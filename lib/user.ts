import type { User } from "./types";

const USER_KEY = "iqilo-user";

const DEFAULT_USER: User = {
  name: "Learner",
  weeklyGoal: 5,
  joinedAt: new Date().toISOString(),
};

export function getUser(): User {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return DEFAULT_USER;
    return { ...DEFAULT_USER, ...JSON.parse(raw) } as User;
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUser(user: Partial<User>): User {
  const current = getUser();
  const next = { ...current, ...user };
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(next));
  }
  return next;
}

export function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(USER_KEY);
}
