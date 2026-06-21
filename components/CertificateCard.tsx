"use client";

import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function CertificateCard() {
  const { store, hydrated } = useProgress();
  
  // Calculate total progress across all courses
  const totalCompleted = hydrated
    ? Object.values(store).reduce((sum, p) => sum + (p?.completedDays?.length ?? 0), 0)
    : 0;

  // Check if user has any completed courses
  const hasCompletedCourse = hydrated && Object.values(store).some(
    (p) => p?.completedDays?.length > 0
  );

  return (
    <div className="certificate-card flex flex-col gap-5 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="icon-container flex h-14 w-14 items-center justify-center rounded-xl">
          <Award className="award-icon h-7 w-7" />
        </div>
        <div className="flex-1">
          <h3 className="title text-base font-black">
            Claim Your Certificate
          </h3>
          <p className="description mt-2 text-sm font-medium leading-relaxed">
            {hasCompletedCourse
              ? "You've made progress! Complete courses to earn certificates."
              : "Start learning to earn certificates and showcase your achievements."}
          </p>
        </div>
      </div>

      <div className="progress-container flex items-center justify-between rounded-xl px-5 py-4">
        <div className="flex flex-col gap-1.5">
          <span className="progress-label text-[11px] font-bold uppercase tracking-wider">
            Total Progress
          </span>
          <span className="progress-value text-xl font-black">
            {totalCompleted} <span className="progress-unit text-sm font-medium">days</span>
          </span>
        </div>
        <Link
          href="/profile"
          className="view-achievements-btn inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-black transition hover:opacity-80 active:scale-95"
        >
          View Achievements
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
