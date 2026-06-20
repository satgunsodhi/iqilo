import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { ExportProgressButton } from "./ExportProgressButton";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md backdrop-saturate-150"
      style={{ borderColor: "var(--border-subtle)", background: "var(--bg-overlay)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="relative flex h-10 w-10 items-center justify-center rounded-xl shadow-md ring-1 ring-white/5 transition group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--text-primary), color-mix(in srgb, var(--text-primary) 70%, transparent))" }}
          >
            <BrainCircuit className="h-5 w-5" style={{ color: "var(--accent-yellow)" }} />
          </span>
          <div>
            <p className="text-base font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              iqilo
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
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
