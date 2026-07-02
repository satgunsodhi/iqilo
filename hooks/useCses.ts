"use client";

import { useSyncExternalStore, useState, useEffect, useCallback } from "react";

export type CsesCache = Record<string, boolean>;

export interface CsesState {
  userId: string;       // CSES username/nick
  phpSessId: string;    // CSES PHPSESSID cookie
  cache: CsesCache;
  lastSynced: string | null; // ISO string
}

const STORAGE_KEYS = {
  USER_ID: "iqilo-cses-userid",
  PHP_SESSID: "iqilo-cses-phpsessid",
  CACHE: "iqilo-cses-cache",
  LAST_SYNCED: "iqilo-cses-last-synced",
};

// Default empty state
const defaultState: CsesState = {
  userId: "",
  phpSessId: "",
  cache: {},
  lastSynced: null,
};

let clientState: CsesState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): CsesState {
  if (typeof window === "undefined") return defaultState;
  
  if (clientState === null) {
    try {
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || "";
      const phpSessId = localStorage.getItem(STORAGE_KEYS.PHP_SESSID) || "";
      const cacheStr = localStorage.getItem(STORAGE_KEYS.CACHE);
      const cache = cacheStr ? JSON.parse(cacheStr) : {};
      const lastSynced = localStorage.getItem(STORAGE_KEYS.LAST_SYNCED) || null;
      
      clientState = { userId, phpSessId, cache, lastSynced };
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

function updateState(next: Partial<CsesState>) {
  if (typeof window === "undefined") return;
  const current = getSnapshot();
  clientState = { ...current, ...next };

  try {
    if (next.userId !== undefined) {
      localStorage.setItem(STORAGE_KEYS.USER_ID, next.userId);
    }
    if (next.phpSessId !== undefined) {
      localStorage.setItem(STORAGE_KEYS.PHP_SESSID, next.phpSessId);
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
    console.error("Failed to write to localStorage for CSES status:", e);
  }

  listeners.forEach((listener) => listener());
  window.dispatchEvent(new Event("iqilo-cses-update"));
}

export function getCsesTaskId(url: string): string | null {
  if (!url) return null;
  try {
    const match = url.match(/cses\.fi\/problemset\/(?:task|view)\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function useCses() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => defaultState);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (
        e.key === STORAGE_KEYS.USER_ID ||
        e.key === STORAGE_KEYS.PHP_SESSID ||
        e.key === STORAGE_KEYS.CACHE ||
        e.key === STORAGE_KEYS.LAST_SYNCED
      ) {
        clientState = null;
        listeners.forEach((l) => l());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setUserId = useCallback((userId: string) => {
    updateState({ userId: userId.trim() });
  }, []);

  const setPhpSessId = useCallback((phpSessId: string) => {
    updateState({ phpSessId: phpSessId.trim() });
  }, []);

  const sync = useCallback(async (forcedUserId?: string, password?: string, phpSessId?: string) => {
    const targetUserId = (forcedUserId ?? state.userId).trim();
    const targetPhpSessId = (phpSessId ?? state.phpSessId).trim();

    if (!targetPhpSessId && (!targetUserId || !password)) {
      setSyncStatus("error");
      setErrorMsg("Please enter Username & Password, or PHPSESSID");
      return;
    }

    setSyncStatus("syncing");
    setErrorMsg(null);

    try {
      const response = await fetch("/api/cses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nick: targetUserId,
          pass: password,
          phpSessId: targetPhpSessId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      const solvedList: string[] = result.solved || [];
      const newCache: CsesCache = {};
      
      solvedList.forEach((taskId) => {
        if (taskId) {
          newCache[taskId] = true;
        }
      });

      // Merge visited CSES tasks (fallback since CSES profiles are public-private/non-listable)
      try {
        const visitedStr = localStorage.getItem("iqilo-cses-visited");
        if (visitedStr) {
          const visited: string[] = JSON.parse(visitedStr);
          visited.forEach((taskId) => {
            if (taskId) {
              newCache[taskId] = true;
            }
          });
        }
      } catch (err) {
        console.error("Failed to parse cses-visited storage:", err);
      }

      updateState({
        userId: result.username || targetUserId,
        phpSessId: result.phpSessId || targetPhpSessId,
        cache: newCache,
        lastSynced: new Date().toISOString(),
      });

      setSyncStatus("success");
      setTimeout(() => setSyncStatus("idle"), 3000);
    } catch (err) {
      const error = err as Error;
      console.error("CSES sync failed:", error);
      setSyncStatus("error");
      setErrorMsg(error.message || "Sync failed");
    }
  }, [state.userId, state.phpSessId]);

  const isSolved = useCallback((url: string) => {
    const taskId = getCsesTaskId(url);
    if (!taskId) return false;
    return !!state.cache[taskId];
  }, [state.cache]);

  return {
    userId: state.userId,
    phpSessId: state.phpSessId,
    cache: state.cache,
    lastSynced: state.lastSynced,
    syncStatus,
    errorMsg,
    setUserId,
    setPhpSessId,
    sync,
    isSolved,
  };
}
