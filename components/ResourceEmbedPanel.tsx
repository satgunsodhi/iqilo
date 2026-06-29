"use client";

import { ExternalLink, X, Maximize2, Minimize2, RefreshCw, AlertTriangle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ResourceEmbedPanelProps = {
  url: string;
  label: string;
  onClose: () => void;
};

function getHostnameSafe(url: string): string {
  try { return new URL(url).hostname; } catch { return url; }
}

export function ResourceEmbedPanel({ url, label, onClose }: ResourceEmbedPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // force iframe reload
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const reload = useCallback(() => {
    setLoadFailed(false);
    setLoading(true);
    setKey((k) => k + 1);
  }, []);

  // After 8 seconds, if still loading, assume blocked
  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) setLoadFailed(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [loading, key]);

  const panelWidth = expanded ? "w-full max-w-5xl" : "w-full max-w-2xl";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[110] flex flex-col shadow-2xl animate-slide-right transition-all duration-300 ${panelWidth}`}
        style={{
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--border-subtle)",
          maxWidth: expanded ? "min(90vw, 1200px)" : "min(60vw, 800px)",
          width: "100%",
        }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
        >
          {/* Favicon */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${getHostnameSafe(url)}&sz=16`}
            alt=""
            className="h-4 w-4 rounded"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          <p className="flex-1 truncate text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {label}
          </p>
          <p className="hidden truncate text-xs font-medium sm:block" style={{ color: "var(--text-faint)", maxWidth: "160px" }}>
            {getHostnameSafe(url)}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={reload}
              className="rounded-lg p-1.5 transition hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
              title="Reload"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="rounded-lg p-1.5 transition hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
              title={expanded ? "Shrink" : "Expand"}
            >
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 transition hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
              title="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 transition hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden">
          {loading && !loadFailed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "var(--bg-surface)" }}>
              <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
                style={{ borderTopColor: "var(--accent-purple)" }}
              />
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Loading…</p>
            </div>
          )}

          {loadFailed ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "color-mix(in srgb, var(--accent-yellow) 15%, transparent)", color: "var(--accent-yellow)" }}
              >
                <AlertTriangle className="h-7 w-7" />
              </span>
              <div>
                <p className="mb-1 text-base font-black" style={{ color: "var(--text-primary)" }}>
                  Can&apos;t embed this page
                </p>
                <p className="max-w-xs text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                  This site blocks embedding for security reasons. Open it in a new tab instead.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
              >
                Open in new tab
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <iframe
              key={key}
              src={url}
              title={label}
              className="h-full w-full border-0"
              onLoad={() => setLoading(false)}
              onError={() => { setLoadFailed(true); setLoading(false); }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}
        </div>

        {/* URL bar at bottom */}
        <div
          className="shrink-0 border-t px-4 py-2"
          style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
        >
          <p className="truncate text-[10px] font-mono" style={{ color: "var(--text-faint)" }}>{url}</p>
        </div>
      </div>
    </>
  );
}
