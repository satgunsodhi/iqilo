"use client";

import { useMemo } from "react";
import type { ActivityMap } from "@/lib/types";

type LearningVelocityGraphProps = {
  activity: ActivityMap;
};

export function LearningVelocityGraph({ activity }: LearningVelocityGraphProps) {

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
      
      <div className="relative flex items-end gap-2 h-36 mt-4">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          {[100, 75, 50, 25, 0].map((percent) => (
            <div key={percent} className="w-full border-t border-dashed opacity-10" style={{ borderColor: "var(--text-faint)" }} />
          ))}
        </div>
        
        {data.map((item, index) => {
          const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          const isToday = index === data.length - 1;
          
          return (
            <div key={index} className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="w-full flex items-end justify-center h-full pb-6">
                <div
                  className={`w-full transition-all duration-500 ease-out group-hover:opacity-80 border-t-2`}
                  style={{ 
                    height: `${Math.max(height, 8)}%`,
                    background: isToday ? "var(--text-primary)" : "var(--bg-sunken)",
                    borderColor: isToday ? "var(--text-primary)" : "var(--border-subtle)",
                    boxShadow: isToday && item.count > 0 ? "none" : "none"
                  }}
                  title={`${item.label}: ${item.count} day${item.count !== 1 ? "s" : ""}`}
                />
              </div>
              <span
                className={`absolute bottom-0 text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${isToday ? 'text-[--text-primary]' : 'text-[--text-faint] group-hover:text-[--text-secondary]'}`}
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
