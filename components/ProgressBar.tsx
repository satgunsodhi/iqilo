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
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-[#7b6c5c]">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`${height} w-full overflow-hidden rounded-full bg-[#e4d9c3]`}>
        <div
          className={`${height} rounded-full bg-[#75b064] transition-all duration-300`}
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-[#e4d9c3]"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-[#75b064] transition-all duration-300"
        />
      </svg>
      <span className="absolute text-xs font-black text-[#171411]">
        {clamped}%
      </span>
    </div>
  );
}
