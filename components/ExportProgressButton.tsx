"use client";

import { Download } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function ExportProgressButton() {
  const { exportProgress, hydrated } = useProgress();

  function handleExport() {
    const json = exportProgress();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "dsa-learner-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={!hydrated}
      className="inline-flex items-center gap-2 rounded-lg border border-[#d6c7ad] bg-white/70 px-3 py-2 text-xs font-bold text-[#171411] shadow-sm transition hover:border-[#171411] hover:bg-white disabled:opacity-50 dark:border-[#343a46] dark:bg-[#1d222b] dark:text-[#e7edf7] dark:hover:border-[#7f8da3]"
    >
      <Download className="h-3.5 w-3.5" />
      Export progress
    </button>
  );
}
