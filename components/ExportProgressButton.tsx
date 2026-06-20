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
    anchor.download = "iqilo-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      id="export-progress-btn"
      onClick={handleExport}
      disabled={!hydrated}
      className="inline-flex items-center gap-2 rounded-lg border border-[--border-default] bg-[--bg-surface] px-3 py-2 text-xs font-bold text-[--text-secondary] shadow-sm transition-all duration-200 hover:border-[--border-strong] hover:bg-[--bg-raised] hover:text-[--text-primary] hover:scale-105 active:scale-95 disabled:opacity-50"
    >
      <Download className="h-3.5 w-3.5" />
      Export
    </button>
  );
}
