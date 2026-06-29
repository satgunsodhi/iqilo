"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, Save } from "lucide-react";

type DayNotesProps = {
  courseId: string;
  dayNumber: number;
};

function storageKey(courseId: string, dayNumber: number): string {
  return `iqilo-notes-${courseId}-${dayNumber}`;
}

function savedAtKey(courseId: string, dayNumber: number): string {
  return `iqilo-notes-time-${courseId}-${dayNumber}`;
}

export function DayNotes({ courseId, dayNumber }: DayNotesProps) {
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem(storageKey(courseId, dayNumber));
      const time = localStorage.getItem(savedAtKey(courseId, dayNumber));
      if (stored !== null) setText(stored);
      setSavedAt(time);
      setLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [courseId, dayNumber]);

  const save = useCallback(() => {
    localStorage.setItem(storageKey(courseId, dayNumber), text);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    localStorage.setItem(savedAtKey(courseId, dayNumber), now);
    setSavedAt(now);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }, [courseId, dayNumber, text]);

  // Auto-save on change (debounced 1.5s)
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      localStorage.setItem(storageKey(courseId, dayNumber), text);
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      localStorage.setItem(savedAtKey(courseId, dayNumber), now);
      setSavedAt(now);
    }, 1500);
    return () => clearTimeout(t);
  }, [text, courseId, dayNumber]);

  return (
    <section
      className="mb-6 overflow-hidden rounded-2xl shadow-sm"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-xs"
            style={{ background: "color-mix(in srgb, var(--accent-purple) 15%, transparent)", color: "var(--accent-purple)" }}
          >
            ✏️
          </span>
          <p className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
            My Notes
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--text-faint)" }}>
              <Clock className="h-3 w-3" />
              Saved {savedAt}
            </span>
          )}
          <button
            type="button"
            onClick={save}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              background: saved
                ? "color-mix(in srgb, var(--accent-green) 15%, transparent)"
                : "color-mix(in srgb, var(--accent-purple) 12%, transparent)",
              color: saved ? "var(--accent-green)" : "var(--accent-purple)",
              border: `1px solid ${saved ? "color-mix(in srgb, var(--accent-green) 30%, transparent)" : "color-mix(in srgb, var(--accent-purple) 25%, transparent)"}`,
            }}
          >
            <Save className="h-3 w-3" />
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Jot down key insights, approaches, things to remember…"
          rows={5}
          className="w-full resize-y rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 placeholder:italic"
          style={{
            background: "var(--bg-sunken)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            fontFamily: "inherit",
            lineHeight: "1.6",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "color-mix(in srgb, var(--accent-purple) 50%, transparent)";
            e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--accent-purple) 10%, transparent)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border-subtle)";
            e.target.style.boxShadow = "none";
          }}
        />
        <p className="mt-1.5 text-right text-[10px] font-medium" style={{ color: "var(--text-faint)" }}>
          {text.length} chars · auto-saved
        </p>
      </div>
    </section>
  );
}
