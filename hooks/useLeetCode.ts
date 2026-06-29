"use client";

import { useSyncExternalStore, useState, useEffect, useCallback } from "react";

export type LeetCodeCache = Record<string, boolean>;

export interface LeetCodeState {
  username: string;
  cache: LeetCodeCache;
  lastSynced: string | null; // ISO string
}

const STORAGE_KEYS = {
  USERNAME: "iqilo-leetcode-username",
  CACHE: "iqilo-leetcode-cache",
  LAST_SYNCED: "iqilo-leetcode-last-synced",
};

// Default empty state
const defaultState: LeetCodeState = {
  username: "",
  cache: {},
  lastSynced: null,
};

let clientState: LeetCodeState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): LeetCodeState {
  if (typeof window === "undefined") return defaultState;
  
  if (clientState === null) {
    try {
      const username = localStorage.getItem(STORAGE_KEYS.USERNAME) || "";
      const cacheStr = localStorage.getItem(STORAGE_KEYS.CACHE);
      const cache = cacheStr ? JSON.parse(cacheStr) : {};
      const lastSynced = localStorage.getItem(STORAGE_KEYS.LAST_SYNCED) || null;
      
      clientState = { username, cache, lastSynced };
    } catch {
      clientState = defaultState;
    }
  }
  return clientState;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function updateState(next: Partial<LeetCodeState>) {
  if (typeof window === "undefined") return;
  const current = getSnapshot();
  clientState = { ...current, ...next };

  try {
    if (next.username !== undefined) {
      localStorage.setItem(STORAGE_KEYS.USERNAME, next.username);
    }
    if (next.cache !== undefined) {
      localStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify(next.cache));
    }
    if (next.lastSynced !== undefined) {
      if (next.lastSynced === null) {
        localStorage.removeItem(STORAGE_KEYS.LAST_SYNCED);
      } else {
        localStorage.setItem(STORAGE_KEYS.LAST_SYNCED, next.lastSynced);
      }
    }
  } catch (e) {
    console.error("Failed to write to localStorage for LeetCode status:", e);
  }

  listeners.forEach((listener) => listener());
  // Dispatch custom event for cross-component re-renders
  window.dispatchEvent(new Event("iqilo-leetcode-update"));
}

// Extractor helper
export function getLeetCodeSlug(url: string): string | null {
  if (!url) return null;
  try {
    const match = url.match(/leetcode\.com\/problems\/([^/]+)/);
    return match ? match[1].toLowerCase().trim() : null;
  } catch {
    return null;
  }
}

export function useLeetCode() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => defaultState);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize across tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (
        e.key === STORAGE_KEYS.USERNAME ||
        e.key === STORAGE_KEYS.CACHE ||
        e.key === STORAGE_KEYS.LAST_SYNCED
      ) {
        clientState = null; // force reload snapshot
        listeners.forEach((l) => l());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setUsername = useCallback((username: string) => {
    updateState({ username: username.trim() });
  }, []);

  const sync = useCallback(async (forcedUsername?: string) => {
    const targetUsername = (forcedUsername ?? state.username).trim();
    if (!targetUsername) {
      setSyncStatus("error");
      setErrorMsg("Please enter a username");
      return;
    }

    setSyncStatus("syncing");
    setErrorMsg(null);

    try {
      const response = await fetch("/leetcode/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query userPublicProfile($username: String!) {
              matchedUser(username: $username) {
                username
              }
              recentAcSubmissionList(username: $username, limit: 100) {
                titleSlug
              }
            }
          `,
          variables: {
            username: targetUsername,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }

      const matchedUser = result.data?.matchedUser;
      if (!matchedUser) {
        throw new Error("LeetCode user not found");
      }

      const submissions = result.data?.recentAcSubmissionList || [];
      const newCache: LeetCodeCache = {};
      
      submissions.forEach((sub: { titleSlug: string }) => {
        if (sub.titleSlug) {
          newCache[sub.titleSlug.toLowerCase().trim()] = true;
        }
      });

      updateState({
        cache: newCache,
        lastSynced: new Date().toISOString(),
      });

      setSyncStatus("success");
      setTimeout(() => setSyncStatus("idle"), 3000);
    } catch (err) {
      const error = err as Error;
      console.error("LeetCode sync failed:", error);
      setSyncStatus("error");
      setErrorMsg(error.message || "Sync failed");
    }
  }, [state.username]);

  const isSolved = useCallback((url: string) => {
    const slug = getLeetCodeSlug(url);
    if (!slug) return false;
    return !!state.cache[slug];
  }, [state.cache]);

  return {
    username: state.username,
    cache: state.cache,
    lastSynced: state.lastSynced,
    syncStatus,
    errorMsg,
    setUsername,
    sync,
    isSolved,
  };
}
