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
  const isComplete = clamped === 100;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold" style={{ color: "var(--text-muted)" }}>
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`${height} w-full overflow-hidden rounded-full`} style={{ background: "var(--bg-sunken)" }}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${isComplete ? "animate-progress-glow" : ""}`}
          style={{
            width: `${clamped}%`,
            background: isComplete
              ? "linear-gradient(90deg, var(--accent-green), var(--accent-teal))"
              : "var(--gradient-blue)",
          }}
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
  const gradientId = `pg-${size}`;
  const isComplete = clamped === 100;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${isComplete ? "animate-level-up" : ""}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isComplete ? "var(--accent-green)" : "var(--accent-purple)"} />
            <stop offset="100%" stopColor={isComplete ? "var(--accent-teal)" : "var(--accent-green)"} />
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
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-black" style={{ color: isComplete ? "var(--accent-green)" : "var(--text-primary)" }}>
        {isComplete ? "✓" : `${clamped}%`}
      </span>
    </div>
  );
}
