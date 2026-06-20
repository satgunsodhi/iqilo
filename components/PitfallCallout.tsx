import { AlertTriangle } from "lucide-react";

type PitfallCalloutProps = {
  text: string;
};

export function PitfallCallout({ text }: PitfallCalloutProps) {
  return (
    <div className="rounded-xl border border-[#efc773] bg-[#fff0cf] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-black text-[#8a5a00]">
        <AlertTriangle className="h-4 w-4" />
        Pitfall
      </div>
      <p className="text-sm font-medium leading-relaxed text-[#6f5531]">{text}</p>
    </div>
  );
}
