import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { CalendarDays, Layers3, Zap } from "lucide-react";

export default function HomePage() {
  const courses = listCourses();
  const totalDays = courses.reduce((sum, course) => sum + course.totalDays, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero banner */}
      <section
        className="relative overflow-hidden rounded-2xl border p-6 shadow-lg sm:p-8"
        style={{
          borderColor: "var(--border-subtle)",
          background: "var(--bg-surface)",
        }}
      >
        {/* decorative gradient blob */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent-green) 8%, transparent)" }}
        />

        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest ring-1"
              style={{
                background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                color: "var(--text-secondary)",
                ringColor: "color-mix(in srgb, var(--accent-yellow) 25%, transparent)",
              }}
            >
              <Zap className="h-3 w-3" style={{ color: "var(--accent-yellow)" }} />
              iqilo
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
              Focused DSA practice,{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                one day at a time.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
              Pick up the next lesson, mark real progress, and keep the
              curriculum visible without extra dashboard noise.
            </p>
          </div>

          {/* Stats */}
          <div className="grid min-w-56 grid-cols-2 gap-3">
            <div
              className="rounded-xl p-4 transition"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
            >
              <Layers3 className="h-4 w-4" style={{ color: "var(--accent-purple)" }} />
              <p className="mt-3 text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                {courses.length}
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                Active course{courses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div
              className="rounded-xl p-4 transition"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-raised)" }}
            >
              <CalendarDays className="h-4 w-4" style={{ color: "var(--accent-green)" }} />
              <p className="mt-3 text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                {totalDays}
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                Planned days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course cards */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <ComingSoonCard />
      </div>
    </div>
  );
}
