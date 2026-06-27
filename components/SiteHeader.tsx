"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrainCircuit, Search, LayoutDashboard, User, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { StreakBadge } from "./StreakDisplay";
import { listCourses } from "@/lib/courses";
import { useGamification } from "@/hooks/useProgress";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const courses = listCourses();
  const { xp, streak, xpToNextLevel } = useGamification();

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
    { href: "/", label: "Courses", icon: LayoutDashboard },
    { href: "/my-learning", label: "My Learning", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b glass-panel transition-all"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-xl shadow-md ring-1 ring-white/5 transition group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--text-primary), color-mix(in srgb, var(--text-primary) 70%, transparent))" }}
            >
              <BrainCircuit className="h-5 w-5" style={{ color: "var(--accent-yellow)" }} />
            </span>
            <div className="hidden sm:block">
              <p className="text-base font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                iqilo
              </p>
              <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                Learning Platform
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

            {/* Streak */}
            <StreakBadge current={streak.current} />

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
                {results.map((r, i) => (
                  <li key={i}>
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
                No results for "<strong>{query}</strong>"
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
