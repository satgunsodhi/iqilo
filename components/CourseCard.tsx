"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Course } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { CircularProgress } from "./ProgressBar";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseStats, getNextDay, hydrated } = useProgress();
  const stats = getCourseStats(course);
  const nextDay = getNextDay(course);
  const allComplete = stats.completed === stats.total;

  return (
    <article className="flex flex-col rounded-2xl border border-[#dfd4bf] bg-white p-5 shadow-[0_12px_34px_rgba(89,50,23,0.07)] transition hover:border-[#171411]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex rounded-full bg-[#e6ddff] px-3 py-1 text-xs font-black uppercase text-[#593217]">
            {course.totalDays}-day quest
          </p>
          <h2 className="mt-3 text-xl font-black text-[#171411]">
            {course.title}
          </h2>
        </div>
        {hydrated && <CircularProgress percent={stats.percent} />}
      </div>

      <p className="mb-6 flex-1 text-sm font-medium leading-relaxed text-[#6f6255]">
        {course.description}
      </p>

      <div className="mb-5 rounded-xl bg-[#f6f1dd] p-4 text-sm text-[#171411]">
        {hydrated ? (
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#9d61df]" />
            <span className="font-black text-[#75b064]">
              {stats.completed}
            </span>
            {" / "}
            {stats.total} days complete
          </span>
        ) : (
          <span className="text-[#7b6c5c]">Loading progress...</span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[#d6c7ad] px-4 py-2 text-sm font-black text-[#171411] transition hover:border-[#171411] hover:bg-[#fff7df]"
        >
          View curriculum
        </Link>
        {!allComplete && (
          <Link
            href={`/courses/${course.id}/day/${nextDay}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#171411] px-4 py-2 text-sm font-black text-white transition hover:bg-[#593217]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

export function ComingSoonCard() {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cdbfa9] bg-[#fffaf0]/70 p-6 text-center">
      <p className="text-sm font-black text-[#7b6c5c]">More quests coming soon</p>
      <p className="mt-2 text-xs font-medium text-[#9b8b78]">
        Add new courses in data/courses and register them in lib/courses.ts
      </p>
    </article>
  );
}
