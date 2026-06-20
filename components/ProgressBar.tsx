type ProgressBarProps = {
  percent: number;
  label?: string;
  size?: "sm" | "md";
};

export function ProgressBar({
  percent,
  label,
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const height = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-[--text-muted]">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`${height} w-full overflow-hidden rounded-full bg-[--bg-sunken]`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r from-[--accent-purple] to-[--accent-green] transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

type CircularProgressProps = {
  percent: number;
  size?: number;
};

export function CircularProgress({ percent, size = 56 }: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-purple)" />
            <stop offset="100%" stopColor="var(--accent-green)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-sunken)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progress-grad)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-black text-[--text-primary]">
        {clamped}%
      </span>
    </div>
  );
}
