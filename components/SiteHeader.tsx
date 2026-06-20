import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { ExportProgressButton } from "./ExportProgressButton";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[--border-subtle] bg-[--bg-overlay] backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1410] to-[#3d2e22] shadow-md ring-1 ring-white/5 transition group-hover:scale-105 dark:from-[#e6edf3] dark:to-[#b1bac4]">
            <BrainCircuit className="h-5 w-5 text-[--accent-yellow]" />
          </span>
          <div>
            <p className="text-base font-black tracking-tight text-[--text-primary]">
              iqilo
            </p>
            <p className="text-xs font-medium text-[--text-muted]">
              Placement quest board
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ExportProgressButton />
        </div>
      </div>
    </header>
  );
}
