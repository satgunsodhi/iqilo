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
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
      style={{
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
        color: "var(--text-secondary)",
      }}
    >
      <Download className="h-3.5 w-3.5" />
      Export
    </button>
  );
}
