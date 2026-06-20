import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { CalendarDays, Layers3, Zap } from "lucide-react";

export default function HomePage() {
  const courses = listCourses();
  const totalDays = courses.reduce((sum, course) => sum + course.totalDays, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[--border-subtle] bg-[--bg-surface] p-6 shadow-lg sm:p-8">
        {/* decorative gradient blob */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[--accent-purple]/15 to-[--accent-yellow]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-[--accent-green]/10 to-[--accent-blue]/8 blur-3xl" />

        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[--accent-yellow]/20 to-[--accent-yellow]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[--text-secondary] ring-1 ring-[--accent-yellow]/30">
              <Zap className="h-3 w-3 text-[--accent-yellow]" />
              iqilo
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-[--text-primary] sm:text-5xl">
              Focused DSA practice,{" "}
              <span className="bg-gradient-to-r from-[--accent-purple] to-[--accent-blue] bg-clip-text text-transparent">
                one day at a time.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-[--text-muted] sm:text-base">
              Pick up the next lesson, mark real progress, and keep the
              curriculum visible without extra dashboard noise.
            </p>
          </div>

          {/* Stats */}
          <div className="grid min-w-56 grid-cols-2 gap-3">
            <div className="group rounded-xl border border-[--border-subtle] bg-[--bg-raised] p-4 transition hover:border-[--border-default] hover:shadow-sm">
              <div className="flex items-center gap-1.5">
                <Layers3 className="h-4 w-4 text-[--accent-purple]" />
              </div>
              <p className="mt-3 text-2xl font-black text-[--text-primary]">
                {courses.length}
              </p>
              <p className="text-xs font-semibold text-[--text-muted]">
                Active course{courses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="group rounded-xl border border-[--border-subtle] bg-[--bg-raised] p-4 transition hover:border-[--border-default] hover:shadow-sm">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[--accent-green]" />
              </div>
              <p className="mt-3 text-2xl font-black text-[--text-primary]">
                {totalDays}
              </p>
              <p className="text-xs font-semibold text-[--text-muted]">
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
