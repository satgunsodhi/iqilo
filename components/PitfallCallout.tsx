import { AlertTriangle } from "lucide-react";

type PitfallCalloutProps = {
  text: string;
};

export function PitfallCallout({ text }: PitfallCalloutProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        border: "1px solid color-mix(in srgb, #f59e0b 30%, transparent)",
        background: "color-mix(in srgb, #f59e0b 8%, transparent)",
      }}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-black" style={{ color: "#d97706" }}>
        <AlertTriangle className="h-4 w-4" />
        Pitfall
      </div>
      <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {text}
      </p>
    </div>
  );
}
