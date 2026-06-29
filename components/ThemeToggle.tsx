"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const saved = window.localStorage.getItem("iqilo-theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("iqilo-theme", theme);
  }, [theme, mounted]);

  const dark = mounted && theme === "dark";

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
      <div className="relative flex h-full w-full items-center justify-center transition-transform duration-500" style={{ transform: dark ? 'rotate(0deg)' : 'rotate(-180deg)' }}>
        {dark ? (
          <Moon className="absolute h-4 w-4 transition-opacity duration-300 opacity-100" />
        ) : (
          <Sun className="absolute h-4 w-4 transition-opacity duration-300 opacity-100" />
        )}
      </div>
    </button>
  );
}
