import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { ExportProgressButton } from "./ExportProgressButton";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfd4bf] bg-[#f8f4e6]/90 backdrop-blur dark:border-[#2a303a] dark:bg-[#11151c]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171411] shadow-sm dark:bg-[#e7edf7]">
            <BrainCircuit className="h-5 w-5 text-[#f7d35f]" />
          </span>
          <div>
            <p className="text-base font-black text-[#171411] dark:text-[#e7edf7]">iqilo</p>
            <p className="text-xs font-medium text-[#7b6c5c] dark:text-[#9aa7b8]">Placement quest board</p>
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
