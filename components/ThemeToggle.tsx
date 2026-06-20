"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("iqilo-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("iqilo-theme", theme);
  }, [theme]);

  const dark = theme === "dark";

  return (
    <button
      type="button"
      id="theme-toggle"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
        color: "var(--text-secondary)",
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
