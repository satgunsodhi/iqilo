import { ComingSoonCard, CourseCard } from "@/components/CourseCard";
import { listCourses } from "@/lib/courses";
import { CheckCircle2, Flame, Target, Zap } from "lucide-react";

export default function HomePage() {
  const courses = listCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid gap-5 lg:grid-cols-[1.55fr_0.45fr]">
        <section className="overflow-hidden rounded-2xl border border-[#dfd4bf] bg-[#fffaf0] p-5 shadow-[0_16px_45px_rgba(89,50,23,0.08)] dark:border-[#2a303a] dark:bg-[#151a22] dark:shadow-none sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-lg bg-[#f7d35f] px-3 py-1 text-xs font-black uppercase text-[#171411]">
                Today&apos;s quest
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-[#171411] dark:text-[#e7edf7] sm:text-5xl">
                Train your DSA streak on iqilo.
              </h1>
              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-[#6f6255] dark:text-[#9aa7b8] sm:text-base">
                A focused board for the next lesson, the current streak, and
                the course path. Enough game feel to keep momentum, not enough
                to get in your way.
              </p>
            </div>
            <div className="min-w-52 rounded-xl border border-[#eadfca] bg-white p-4 shadow-sm dark:border-[#2a303a] dark:bg-[#10151d]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#75b064]">
                  <Flame className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="text-2xl font-black text-[#171411] dark:text-[#e7edf7]">14 days</p>
                  <p className="text-xs font-bold text-[#7b6c5c] dark:text-[#9aa7b8]">Current streak</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold">
                <span className="rounded-lg bg-[#f6f1dd] px-3 py-2 text-[#593217] dark:bg-[#1d222b] dark:text-[#c5d0df]">
                  30 quests
                </span>
                <span className="rounded-lg bg-[#f6f1dd] px-3 py-2 text-[#593217] dark:bg-[#1d222b] dark:text-[#c5d0df]">
                  +80 XP/day
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              [Target, "Graph mastery"],
              [CheckCircle2, "Daily checkpoints"],
              [Zap, "Timed practice"],
            ].map(([Icon, label]) => (
              <span
                key={label as string}
                className="inline-flex items-center gap-2 rounded-lg border border-[#eadfca] bg-white px-3 py-2 text-xs font-bold text-[#593217] dark:border-[#2a303a] dark:bg-[#10151d] dark:text-[#c5d0df]"
              >
                <Icon className="h-3.5 w-3.5 text-[#75b064]" />
                {label as string}
              </span>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-[#dfd4bf] bg-[#171411] p-5 text-white shadow-[0_16px_45px_rgba(23,20,17,0.14)] dark:border-[#2a303a] dark:bg-[#151a22] dark:shadow-none">
          <p className="text-xs font-black uppercase text-[#f7d35f]">Sprint focus</p>
          <h2 className="mt-3 text-2xl font-black">Keep it narrow</h2>
          <div className="mt-5 space-y-2">
            {[
              "One topic block",
              "One practice set",
              "One completion mark",
            ].map((label) => (
              <div key={label} className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-[#75b064]" />
                <p className="text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <ComingSoonCard />
      </div>
    </div>
  );
}
