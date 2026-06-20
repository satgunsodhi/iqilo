import { AlertTriangle } from "lucide-react";

type PitfallCalloutProps = {
  text: string;
};

export function PitfallCallout({ text }: PitfallCalloutProps) {
  return (
    <div className="rounded-xl border border-amber-200/70 bg-amber-50/80 p-4 dark:border-amber-800/40 dark:bg-amber-950/20">
      <div className="mb-2 flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-400">
        <AlertTriangle className="h-4 w-4" />
        Pitfall
      </div>
      <p className="text-sm font-medium leading-relaxed text-amber-800 dark:text-amber-300">
        {text}
      </p>
    </div>
  );
}
