import React from "react";
import { Code, Terminal, Code2 } from "lucide-react";

export function PlatformIcon({ platform, className, style }: { platform: string; className?: string; style?: React.CSSProperties }) {
  const normPlatform = platform?.toLowerCase().trim();
  if (normPlatform === "leetcode") {
    return <Code className={className} style={{ color: "#f59e0b", ...style }} />;
  }
  if (normPlatform === "cses") {
    return <Terminal className={className} style={{ color: "#3b82f6", ...style }} />;
  }
  return <Code2 className={className} style={{ color: "var(--text-muted)", ...style }} />;
}
