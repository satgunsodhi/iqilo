"use client";

import { useMemo } from "react";
import type { ActivityMap } from "@/lib/types";

type ActivityCalendarProps = {
  activity: ActivityMap;
  weeks?: number;
};

function getColorForCount(count: number): string {
  if (count === 0) return "var(--bg-sunken)";
  if (count === 1) return "color-mix(in srgb, var(--accent-purple) 30%, var(--bg-sunken))";
  if (count === 2) return "color-mix(in srgb, var(--accent-purple) 60%, var(--bg-sunken))";
  if (count === 3) return "color-mix(in srgb, var(--accent-purple) 85%, transparent)";
  return "var(--accent-purple)";
}

export function ActivityCalendar({ activity, weeks = 16 }: ActivityCalendarProps) {

  const cells = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalDays = weeks * 7;
    const start = new Date(today);
    start.setDate(today.getDate() - totalDays + 1);

    const result: { date: Date; iso: string; count: number }[] = [];
    const cur = new Date(start);
    while (cur <= today) {
      const iso = cur.toISOString().slice(0, 10);
      result.push({ date: new Date(cur), iso, count: activity[iso] ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    return result;
  }, [activity, weeks]);

  // Group into columns of 7 (week columns)
  const columns: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }

  const months = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    columns.forEach((col, ci) => {
      const m = col[0]?.date.getMonth();
      if (m !== undefined && m !== lastMonth) {
        labels.push({
          label: col[0].date.toLocaleString("default", { month: "short" }),
          col: ci,
        });
        lastMonth = m;
      }
    });
    return labels;
  }, [columns]);

  const dayLabels = ["Mon", "Wed", "Fri"];
  const dayRows = [1, 3, 5]; // indices

  return (
    <div className="overflow-x-auto">
      {/* Month labels */}
      <div className="relative mb-1 flex pl-8">
        {months.map((m) => (
          <div
            key={`${m.label}-${m.col}`}
            className="absolute text-[10px] font-bold"
            style={{ left: `${32 + m.col * 14}px`, color: "var(--text-faint)" }}
          >
            {m.label}
          </div>
        ))}
        <div style={{ height: "12px" }} />
      </div>

      <div className="flex gap-1">
        {/* Day-of-week labels */}
        <div className="flex flex-col justify-between pr-1" style={{ width: "28px" }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="text-[9px] font-bold leading-[10px]" style={{ color: "var(--text-faint)", height: "10px" }}>
              {dayRows.includes(i) ? dayLabels[dayRows.indexOf(i)] : ""}
            </div>
          ))}
        </div>

        {/* Grid */}
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, ri) => {
              const cell = col[ri];
              if (!cell) {
                return <div key={ri} className="h-3 w-3 rounded-none" style={{ background: "transparent" }} />;
              }
              return (
                <div
                  key={ri}
                  title={`${cell.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}: ${cell.count} completion${cell.count !== 1 ? "s" : ""}`}
                  className="h-3 w-3 rounded-none transition-all duration-300 hover:scale-[1.3] hover:z-10 shadow-none border border-[var(--border-subtle)]"
                  style={{ background: getColorForCount(cell.count) }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-2 justify-end">
        <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Less</span>
        {[0, 1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-3 w-3 rounded-none border border-[var(--border-subtle)]"
            style={{ background: getColorForCount(n) }}
          />
        ))}
        <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>More</span>
      </div>
    </div>
  );
}
