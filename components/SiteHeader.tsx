"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrainCircuit, Search, LayoutDashboard, User, X, Code2, RefreshCw, Check, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { StreakBadge } from "./StreakDisplay";
import { listCourses } from "@/lib/courses";
import { useGamification, useProgress } from "@/hooks/useProgress";
import { useLeetCode } from "@/hooks/useLeetCode";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const courses = listCourses();
  const { hydrated } = useProgress();
  const { xp, streak, xpToNextLevel } = useGamification();

  const {
    username: ltUsername,
    syncStatus,
    errorMsg,
    lastSynced,
    setUsername: setLtUsername,
    sync: syncLeetCode,
  } = useLeetCode();
  const [leetcodeOpen, setLeetcodeOpen] = useState(false);
  const [localUsername, setLocalUsername] = useState(ltUsername);
  const [prevUsername, setPrevUsername] = useState(ltUsername);
  const leetcodeRef = useRef<HTMLDivElement>(null);

  // Sync state input initialization
  if (ltUsername !== prevUsername) {
    setLocalUsername(ltUsername);
    setPrevUsername(ltUsername);
  }

  // Auto-sync on window focus & load
  useEffect(() => {
    if (!ltUsername) return;

    function handleFocus() {
      // Throttle syncs to once every 30 seconds
      const now = Date.now();
      const lastSyncedTime = lastSynced ? new Date(lastSynced).getTime() : 0;
      if (now - lastSyncedTime > 30000 && syncStatus !== "syncing") {
        syncLeetCode(ltUsername);
      }
    }

    window.addEventListener("focus", handleFocus);
    // Trigger on initial mount as well
    handleFocus();

    return () => window.removeEventListener("focus", handleFocus);
  }, [ltUsername, lastSynced, syncStatus, syncLeetCode]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (leetcodeRef.current && !leetcodeRef.current.contains(e.target as Node)) {
        setLeetcodeOpen(false);
      }
    }
    if (leetcodeOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [leetcodeOpen]);

  // Open search on Cmd+K / Ctrl+K
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  // Quick search results
  const results = query.trim().length < 2
    ? []
    : (() => {
        const q = query.toLowerCase();
        const hits: { type: "course" | "day"; label: string; sub: string; href: string }[] = [];
        for (const course of courses) {
          if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
            hits.push({ type: "course", label: course.title, sub: `${course.totalDays} days`, href: `/courses/${course.id}` });
          }
          for (const week of course.weeks) {
            for (const day of week.days) {
              if (day.title.toLowerCase().includes(q) || day.objective.toLowerCase().includes(q)) {
                hits.push({
                  type: "day",
                  label: `Day ${day.dayNumber}: ${day.title}`,
                  sub: course.title,
                  href: `/courses/${course.id}/day/${day.dayNumber}`,
                });
              }
            }
          }
          if (hits.length >= 8) break;
        }
        return hits.slice(0, 8);
      })();

  const navLinks = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/my-learning", label: "My Learning", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b glass-panel transition-all"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "color-mix(in srgb, var(--bg-surface) 60%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <svg viewBox="-5 -10 95 60" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" aria-label="iqilo logo">
              <g fill="var(--text-primary)">
                {/* i */}
                <rect x="0" y="2" width="6" height="6" />
                <rect x="0" y="12" width="6" height="20" />
                
                {/* q */}
                <circle cx="22" cy="22" r="7" stroke="currentColor" strokeWidth="6" fill="none" />
                <rect x="26" y="12" width="6" height="28" />

                {/* i */}
                <rect x="38" y="2" width="6" height="6" />
                <rect x="38" y="12" width="6" height="20" />
                <rect x="36" y="36" width="10" height="1" fill="var(--accent-blue, #3B82F6)" />

                {/* l */}
                <rect x="50" y="0" width="6" height="32" />
                
                {/* Flag Cap */}
                <defs>
                  <linearGradient id="flag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-blue, #3B82F6)" />
                    <stop offset="100%" stopColor="color-mix(in srgb, var(--accent-blue, #3B82F6) 50%, black)" />
                  </linearGradient>
                </defs>
                <polygon points="56,0 70,4 56,10" fill="url(#flag-gradient)" />

                {/* o */}
                <circle cx="72" cy="22" r="7" stroke="currentColor" strokeWidth="6" fill="none" />
              </g>
            </svg>
            <div className="hidden sm:block border-l-2 pl-3 ml-1 transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-sm font-bold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>
                Learning
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Platform
              </p>
            </div>
          </Link>

          {/* Nav links (desktop) */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-bold transition"
                  style={{
                    background: active ? "color-mix(in srgb, var(--accent-purple) 12%, transparent)" : "transparent",
                    color: active ? "var(--accent-purple)" : "var(--text-muted)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* XP Level indicator */}
            {hydrated ? (
              <Link
                href="/profile"
                className="group/xp hidden items-center gap-2 rounded-lg px-2.5 py-1.5 transition-all hover:scale-105 sm:flex"
                style={{
                  background: "color-mix(in srgb, var(--accent-purple) 8%, var(--bg-raised))",
                  border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
                }}
                title={`Level ${xp.level} · ${xpToNextLevel.current}/${xpToNextLevel.needed} XP to next level`}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))",
                    color: "white",
                    boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-purple) 30%, transparent)",
                  }}
                >
                  {xp.level}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black leading-none" style={{ color: "var(--text-primary)" }}>
                    Lv {xp.level}
                  </span>
                  <div className="xp-bar-track h-1 w-12">
                    <div className="xp-bar-fill" style={{ width: `${xpToNextLevel.percent}%` }} />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="h-9 w-20 rounded-lg bg-[var(--bg-raised)] border border-[var(--border-subtle)] animate-pulse hidden sm:block" />
            )}

            {/* Streak */}
            {hydrated ? (
              <StreakBadge current={streak.current} />
            ) : (
              <div className="h-9 w-12 rounded-lg bg-[var(--bg-raised)] border border-[var(--border-subtle)] animate-pulse" />
            )}

            {/* LeetCode Sync */}
            {hydrated ? (
              <div className="relative" ref={leetcodeRef}>
                <button
                  type="button"
                  onClick={() => setLeetcodeOpen(!leetcodeOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: leetcodeOpen
                      ? "var(--accent-yellow)"
                      : "var(--border-default)",
                    background: leetcodeOpen
                      ? "color-mix(in srgb, var(--accent-yellow) 8%, var(--bg-surface))"
                      : "var(--bg-surface)",
                    color: leetcodeOpen ? "var(--accent-yellow)" : "var(--text-muted)",
                  }}
                  title="LeetCode Integration"
                >
                  <Code2 className="h-4 w-4" />
                </button>

                {leetcodeOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border p-4 shadow-xl transition-all duration-200 animate-scale-in"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="mb-2 text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                      LeetCode Sync
                    </h3>
                    <p className="mb-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      Automatically pull your latest accepted runs to mark practice questions as solved.
                    </p>

                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="mb-1 block text-[10px] font-bold" style={{ color: "var(--text-faint)" }}>
                          Username
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="LeetCode Username"
                            value={localUsername}
                            onChange={(e) => setLocalUsername(e.target.value)}
                            className="flex-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none transition"
                            style={{
                              borderColor: "var(--border-default)",
                              background: "var(--bg-sunken)",
                              color: "var(--text-primary)",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setLtUsername(localUsername);
                              syncLeetCode(localUsername);
                            }}
                            disabled={syncStatus === "syncing"}
                            className="flex items-center justify-center rounded-lg px-3 text-xs font-bold text-white transition-all disabled:opacity-50"
                            style={{
                              background: "linear-gradient(135deg, #f59e0b, #d97706)",
                              boxShadow: "0 2px 4px color-mix(in srgb, #f59e0b 20%, transparent)",
                            }}
                          >
                            {syncStatus === "syncing" ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              "Sync"
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Feedback message */}
                      {syncStatus === "success" && (
                        <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-green) 10%, transparent)", color: "var(--accent-green)" }}>
                          <Check className="h-3 w-3 shrink-0" />
                          <span>Synced successfully!</span>
                        </div>
                      )}

                      {syncStatus === "error" && errorMsg && (
                        <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", color: "var(--accent-red)" }}>
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span className="truncate text-xs">{errorMsg}</span>
                        </div>
                      )}

                      {/* Last synced timestamp */}
                      {lastSynced && (() => {
                        const syncDate = new Date(lastSynced);
                        const isToday = syncDate.toDateString() === new Date().toDateString();
                        const timeStr = syncDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const label = isToday
                          ? timeStr
                          : `${syncDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${timeStr}`;
                        return (
                          <div className="text-[10px] font-medium mt-1 text-right" style={{ color: "var(--text-faint)" }}>
                            Last synced: {label}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Search trigger */}
            <button
              type="button"
              id="search-trigger"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:opacity-80"
              style={{ border: "1px solid var(--border-default)", background: "var(--bg-surface)", color: "var(--text-muted)" }}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd
                className="hidden rounded px-1.5 py-0.5 text-[10px] font-bold sm:inline"
                style={{ background: "var(--bg-sunken)", color: "var(--text-faint)" }}
              >
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Search modal ──────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-20">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl animate-scale-in"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: "var(--border-subtle)" }}>
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-faint)" }} />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses and days…"
                className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:italic"
                style={{ color: "var(--text-primary)" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results.length > 0) {
                    router.push(results[0].href);
                    setSearchOpen(false);
                    setQuery("");
                  }
                }}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }}>
                <X className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => { setSearchOpen(false); setQuery(""); }}
                      className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-[var(--bg-raised)]"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black"
                        style={{
                          background: r.type === "course"
                            ? "color-mix(in srgb, var(--accent-purple) 15%, transparent)"
                            : "color-mix(in srgb, var(--accent-blue) 12%, transparent)",
                          color: r.type === "course" ? "var(--accent-purple)" : "var(--accent-blue)",
                        }}
                      >
                        {r.type === "course" ? "C" : "D"}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold" style={{ color: "var(--text-primary)" }}>{r.label}</p>
                        <p className="truncate text-xs font-medium" style={{ color: "var(--text-muted)" }}>{r.sub}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                No results for &quot;<strong>{query}</strong>&quot;
              </div>
            )}

            {query.trim().length < 2 && (
              <div className="px-4 py-5">
                <p className="mb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                  Quick links
                </p>
                <div className="flex flex-wrap gap-2">
                  {courses.map((c) => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                      style={{
                        background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)",
                        color: "var(--accent-purple)",
                        border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
                      }}
                    >
                      {c.title.split(":")[0].trim()}
                    </Link>
                  ))}
                  <Link
                    href="/my-learning"
                    onClick={() => setSearchOpen(false)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                    style={{
                      background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                      color: "var(--accent-green)",
                      border: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)",
                    }}
                  >
                    My Learning
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
