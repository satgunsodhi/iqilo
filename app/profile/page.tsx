"use client";

import { Download, RefreshCw, Save, Target, Upload, User, Award, Flame, Zap, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getUser, saveUser } from "@/lib/user";
import { useProgress, useGamification } from "@/hooks/useProgress";
import { useToast } from "@/components/ToastNotification";
import { listCourses } from "@/lib/courses";
import { BADGES } from "@/lib/achievements";
import { AchievementBadge } from "@/components/AchievementBadge";
import { StreakDisplay } from "@/components/StreakDisplay";
import type { User as UserType } from "@/lib/types";

// ── Weekly Goal Progress Ring ──────────────────────────────────────────
function WeeklyGoalRing({ completed, goal }: { completed: number; goal: number }) {
  const size = 120;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(100, Math.round((completed / Math.max(goal, 1)) * 100));
  const offset = circumference - (percent / 100) * circumference;
  const achieved = completed >= goal;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative inline-flex items-center justify-center ${achieved ? "animate-level-up" : ""}`}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="goal-ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--text-primary)" />
              <stop offset="100%" stopColor="var(--text-secondary)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bg-sunken)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#goal-ring-gradient)"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              "--ring-circumference": `${circumference}`,
              "--ring-offset": `${offset}`,
            } as React.CSSProperties}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-black" style={{ color: achieved ? "var(--text-primary)" : "var(--text-primary)" }}>
            {completed}/{goal}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
            days
          </span>
        </div>
      </div>
      <p className="text-sm font-bold" style={{ color: achieved ? "var(--text-primary)" : "var(--text-muted)" }}>
        {achieved ? "Goal achieved!" : `${goal - completed} more to go`}
      </p>
    </div>
  );
}

export default function ProfilePage() {
  const { store, hydrated, checkAchievements } = useProgress();
  const { xp, streak, badges, xpToNextLevel } = useGamification();
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

  // Calculate weekly completions from activity store
  const weeklyCompletions = (() => {
    if (typeof window === "undefined" || !hydrated) return 0;
    try {
      const raw = localStorage.getItem("iqilo-activity");
      if (!raw) return 0;
      const activityStore = JSON.parse(raw);
      const activity = activityStore?.activity ?? {};
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      let count = 0;
      for (const [dateStr, val] of Object.entries(activity)) {
        const d = new Date(dateStr + "T00:00:00");
        if (d >= weekStart && (val as number) > 0) count++;
      }
      return count;
    } catch {
      return 0;
    }
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
    localStorage.removeItem("iqilo-xp");
    localStorage.removeItem("iqilo-streak");
    localStorage.removeItem("iqilo-badges");
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
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
          Manage your stats, goals, and achievements.
        </p>
      </div>

      {/* ── Identity card ───────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="mb-4 flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-none border-2 text-xl font-black"
            style={{
              borderColor: "var(--text-primary)",
              background: "var(--bg-sunken)",
              color: "var(--text-primary)",
            }}
          >
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex-1">
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
          {/* Level badge */}
          <div
            className="flex flex-col items-center gap-1 rounded-xl px-4 py-2"
            style={{
              background: "var(--bg-sunken)",
              border: "1px solid var(--border-default)",
            }}
          >
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{xp.level}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Level</span>
          </div>
        </div>

        {editing ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition hover:opacity-90 active:scale-95 border"
              style={{ background: "var(--text-primary)", color: "var(--bg-base)", borderColor: "var(--text-primary)" }}
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

      {/* ── XP & Stats Row ──────────────────────────────────────── */}
      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        {/* XP Card */}
        <div
          className="rounded-2xl p-5 shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Experience</span>
          </div>
          <p className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>{xp.total}</p>
          <p className="mt-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Total XP earned</p>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[10px] font-bold" style={{ color: "var(--text-faint)" }}>
              <span>Level {xp.level}</span>
              <span>{xpToNextLevel.current}/{xpToNextLevel.needed} XP</span>
            </div>
            <div className="xp-bar-track h-2">
              <div className="xp-bar-fill" style={{ width: `${xpToNextLevel.percent}%` }} />
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div
          className="rounded-2xl p-5 shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Streak</span>
          </div>
          <StreakDisplay current={streak.current} longest={streak.longest} size="lg" />
        </div>

        {/* Days Completed Card */}
        <div
          className="rounded-2xl p-5 shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Progress</span>
          </div>
          <p className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>
            {totalCompleted}<span className="text-base font-medium" style={{ color: "var(--text-muted)" }}>/{totalDays}</span>
          </p>
          <p className="mt-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>Days completed</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "var(--bg-sunken)" }}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${totalCompleted === totalDays && totalDays > 0 ? "animate-progress-glow" : ""}`}
              style={{
                width: `${totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0}%`,
                background: "var(--text-primary)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Weekly Goal ──────────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Progress ring */}
          <WeeklyGoalRing completed={weeklyCompletions} goal={user.weeklyGoal} />

          {/* Goal settings */}
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
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
                          background: "var(--text-primary)",
                          color: "var(--bg-base)",
                          boxShadow: "none",
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
          </div>
        </div>
      </section>

      {/* ── Badge Gallery ────────────────────────────────────────── */}
      <section
        className="mb-6 rounded-2xl p-6 shadow-sm"
        style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
      >
        <div className="mb-5 flex items-center gap-2">
          <Award className="h-4 w-4" style={{ color: "var(--text-primary)" }} />
          <h2 className="text-sm font-black" style={{ color: "var(--text-primary)" }}>Achievement Gallery</h2>
          <span
            className="ml-auto rounded-none border px-2.5 py-0.5 text-[10px] font-black"
            style={{
              background: "var(--bg-sunken)",
              color: "var(--text-primary)",
              borderColor: "var(--border-subtle)"
            }}
          >
            {badges.length}/{BADGES.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {BADGES.map((badge) => (
            <AchievementBadge
              key={badge.id}
              badge={badge}
              unlocked={badges.includes(badge.id)}
              showRarity
            />
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
          Permanently delete all progress, notes, activity, XP, and badge data. This cannot be undone.
        </p>

        {!showReset ? (
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition hover:opacity-80"
            style={{
              border: "1px solid var(--text-primary)",
              color: "var(--bg-base)",
              background: "var(--text-primary)",
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
