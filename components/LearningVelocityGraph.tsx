"use client";

import { useMemo } from "react";
import type { ActivityMap } from "@/lib/types";

type LearningVelocityGraphProps = {
  activity: ActivityMap;
};

export function LearningVelocityGraph({ activity }: LearningVelocityGraphProps) {
  const isDark = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark")
    : false;

  const data = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const result: { date: Date; label: string; count: number }[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const iso = date.toISOString().slice(0, 10);
      result.push({
        date,
        label: i === 0 ? "Today" : dayNames[date.getDay()],
        count: activity?.[iso] ?? 0,
      });
    }
    return result;
  }, [activity]);

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="velocity-graph flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="velocity-title text-base font-black">
          Learning Velocity
        </h3>
        <span className="velocity-subtitle text-xs font-bold">
          Last 7 days
        </span>
      </div>
      
      <div className="relative flex items-end gap-2 h-36">
        {data.map((item, index) => {
          const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          const isToday = index === data.length - 1;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end justify-center">
                <div
                  className={`velocity-bar w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${isToday ? 'velocity-bar-today' : 'velocity-bar-default'}`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`${item.label}: ${item.count} day${item.count !== 1 ? "s" : ""}`}
                />
              </div>
              <span
                className={`velocity-label text-[11px] font-bold ${isToday ? 'velocity-label-today' : 'velocity-label-default'}`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="velocity-stat font-medium">
          Total: <span className="velocity-stat-value font-black">
            {data.reduce((sum, d) => sum + d.count, 0)}
          </span> days
        </span>
        <span className="velocity-stat font-medium">
          Avg: <span className="velocity-stat-value font-black">
            {(data.reduce((sum, d) => sum + d.count, 0) / 7).toFixed(1)}
          </span> days/week
        </span>
      </div>
    </div>
  );
}
