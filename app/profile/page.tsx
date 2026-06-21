"use client";

import { Download, RefreshCw, Save, Target, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getUser, saveUser } from "@/lib/user";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/components/ToastNotification";
import { listCourses } from "@/lib/courses";
import type { User as UserType } from "@/lib/types";

export default function ProfilePage() {
  const { store, hydrated } = useProgress();
  const { toast } = useToast();
  const courses = listCourses();
  const [user, setUser] = useState<UserType>({ name: "Learner", weeklyGoal: 5, joinedAt: new Date().toISOString() });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: "", weeklyGoal: 5 });
  const [showReset, setShowReset] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setDraft({ name: u.name, weeklyGoal: u.weeklyGoal });
  }, []);

  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;
  const totalDays = courses.reduce((sum, c) => sum + c.totalDays, 0);

  const weeklyCompletions = (() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    // We can't track this accurately without timestamps, use activity store
    return 0; // placeholder
  })();

  const handleSave = () => {
    const updated = saveUser({ name: draft.name.trim() || "Learner", weeklyGoal: draft.weeklyGoal });
    setUser(updated);
    setEditing(false);
    toast("Profile saved!", "success");
  };

  const handleExport = () => {
    const data = JSON.stringify(store, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iqilo-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Progress exported!", "success");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        localStorage.setItem("dsa-learner-progress", JSON.stringify(data));
        toast("Progress imported! Refresh to apply.", "info");
      } catch {
        toast("Invalid file format.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    localStorage.removeItem("dsa-learner-progress");
    localStorage.removeItem("iqilo-activity");
    localStorage.removeItem("iqilo-tasks");
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    if (!hydrated) return "...";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "...";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", color: "var(--accent-purple)" }}
        >
          <User className="h-3 w-3" />
          Profile
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
          Your Profile
        </h1>
        <p className="mt-1.5 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Manage your name, goal, and progress data.
        </p>
      </div>

      {/* ── Identity card ───────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="mb-4 flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
              color: "white",
            }}
          >
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            {editing ? (
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                className="rounded-lg border px-3 py-1.5 text-lg font-black outline-none"
                style={{
                  borderColor: "var(--accent-purple)",
                  background: "var(--bg-sunken)",
                  color: "var(--text-primary)",
                }}
                placeholder="Your name"
                maxLength={40}
                autoFocus
              />
            ) : (
              <p className="text-xl font-black" style={{ color: "var(--text-primary)" }}>{user.name}</p>
            )}
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Member since {formatDate(user.joinedAt)}
            </p>
          </div>
        </div>

        {editing ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-white transition hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-xl px-4 py-2 text-sm font-bold transition hover:opacity-80"
              style={{ border: "1px solid var(--border-default)", color: "var(--text-muted)" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-xl px-4 py-2 text-sm font-bold transition hover:opacity-80"
            style={{ border: "1px solid var(--border-default)", background: "var(--bg-raised)", color: "var(--text-secondary)" }}
          >
            Edit name
          </button>
        )}
      </section>

      {/* ── Weekly goal ─────────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-4 w-4" style={{ color: "var(--accent-green)" }} />
          <h2 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>Weekly Goal</h2>
        </div>
        <p className="mb-4 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          How many days per week do you want to complete?
        </p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 5, 7].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                const updated = saveUser({ weeklyGoal: n });
                setUser(updated);
                setDraft((d) => ({ ...d, weeklyGoal: n }));
                toast(`Weekly goal set to ${n} days!`, "success");
              }}
              className="rounded-xl px-4 py-2 text-sm font-black transition-all active:scale-95"
              style={
                user.weeklyGoal === n
                  ? {
                      background: "var(--accent-green)",
                      color: "white",
                      boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-green) 40%, transparent)",
                    }
                  : {
                      border: "1px solid var(--border-default)",
                      background: "var(--bg-raised)",
                      color: "var(--text-secondary)",
                    }
              }
            >
              {n} day{n !== 1 ? "s" : ""}
            </button>
          ))}
        </div>
      </section>

      {/* ── Progress data ───────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <h2 className="mb-4 text-sm font-black" style={{ color: "var(--text-primary)" }}>Progress Data</h2>
        <div className="flex flex-wrap gap-3">
          {/* Export */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition hover:opacity-80 active:scale-95"
            style={{
              border: "1px solid var(--border-default)",
              background: "var(--bg-raised)",
              color: "var(--text-secondary)",
            }}
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>

          {/* Import */}
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition hover:opacity-80 active:scale-95"
            style={{
              border: "1px solid var(--border-default)",
              background: "var(--bg-raised)",
              color: "var(--text-secondary)",
            }}
          >
            <Upload className="h-4 w-4" />
            Import JSON
          </button>
          <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>
      </section>

      {/* ── Danger zone ─────────────────────────────────────────── */}
      <section
        className="rounded-2xl p-6 shadow-sm"
        style={{
          border: "1px solid color-mix(in srgb, var(--accent-red) 30%, transparent)",
          background: "color-mix(in srgb, var(--accent-red) 4%, var(--bg-surface))",
        }}
      >
        <h2 className="mb-1 text-sm font-black" style={{ color: "var(--accent-red)" }}>Danger Zone</h2>
        <p className="mb-4 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Permanently delete all progress, notes, and activity data. This cannot be undone.
        </p>

        {!showReset ? (
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition hover:opacity-80"
            style={{
              border: "1px solid color-mix(in srgb, var(--accent-red) 40%, transparent)",
              color: "var(--accent-red)",
              background: "color-mix(in srgb, var(--accent-red) 8%, transparent)",
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Reset all progress
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-sm font-black" style={{ color: "var(--accent-red)" }}>Are you sure?</p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl px-4 py-2 text-sm font-black text-white transition hover:opacity-90"
              style={{ background: "var(--accent-red)" }}
            >
              Yes, reset everything
            </button>
            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="rounded-xl px-4 py-2 text-sm font-bold transition hover:opacity-80"
              style={{ border: "1px solid var(--border-default)", color: "var(--text-muted)" }}
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
