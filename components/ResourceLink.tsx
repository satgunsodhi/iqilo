"use client";

import { Check, ExternalLink, Play, BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Resource } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match?.[1] ?? null;
}

type ResourceLinkProps = {
  courseId: string;
  resource: Resource;
  onSelect?: () => void;
};

// Global callback for YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (element: HTMLIFrameElement, options: {
        events: {
          onStateChange: (event: { data: number }) => void;
        };
      }) => {
        getCurrentTime: () => number;
        getDuration: () => number;
        destroy?: () => void;
      };
      PlayerState: {
        PLAYING: number;
      };
    };
  }
}

let ytApiLoaded = false;
let ytApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (ytApiLoaded) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      ytApiLoaded = true;
      resolve();
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      ytApiLoaded = true;
      resolve();
      if (previousCallback) previousCallback();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });

  return ytApiPromise;
}

import { useToast } from "@/components/ToastNotification";
import { getResourceXp } from "@/lib/progress";
import { checkIsEmbeddable } from "@/lib/embed";

export function ResourceLink({ courseId, resource, onSelect }: ResourceLinkProps) {
  const { isResourceComplete, toggleResource, setResourceComplete, hydrated } = useProgress();
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<{ getCurrentTime: () => number; getDuration: () => number; destroy?: () => void } | null>(null);

  const done = hydrated && isResourceComplete(courseId, resource.url);
  const isEmbeddable = resource.embed === "youtube" || checkIsEmbeddable(resource.url, resource.embeddable);

  const handleToggle = () => {
    const wasDone = isResourceComplete(courseId, resource.url);
    toggleResource(courseId, resource.url);
    if (!wasDone) {
      const xp = getResourceXp(courseId, resource.url);
      if (xp > 0) {
        toast(`+${xp} XP earned!`, "success");
      }
    }
  };

  useEffect(() => {
    if (resource.embed === "youtube" && iframeRef.current && hydrated && !done) {
      let interval: NodeJS.Timeout;

      loadYouTubeApi().then(() => {
        if (!iframeRef.current) return;
        
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: { data: number }) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                interval = setInterval(() => {
                  if (playerRef.current && playerRef.current.getCurrentTime) {
                    const currentTime = playerRef.current.getCurrentTime();
                    const duration = playerRef.current.getDuration();
                    const isLongEnough = duration > 0 && (currentTime / duration) >= 0.6;
                    const isTwoMinutes = currentTime >= 120;
                    if (isLongEnough || isTwoMinutes) {
                      setResourceComplete(courseId, resource.url, true);
                      const xp = getResourceXp(courseId, resource.url);
                      if (xp > 0) {
                        toast(`+${xp} XP earned! (Watched ${isTwoMinutes ? "2 min" : "60%"})`, "success");
                      }
                      clearInterval(interval);
                    }
                  }
                }, 5000);
              } else {
                clearInterval(interval);
              }
            }
          }
        });
      });

      return () => {
        clearInterval(interval);
        if (playerRef.current && playerRef.current.destroy) {
          try {
            // Wait a tick before destroying to prevent errors
            setTimeout(() => {
              if (playerRef.current?.destroy) playerRef.current.destroy();
            }, 0);
          } catch {}
        }
      };
    }
  }, [courseId, resource.embed, resource.url, hydrated, done, setResourceComplete, toast]);

  if (resource.embed === "youtube") {
    const videoId = getYouTubeId(resource.url);
    if (videoId) {
      return (
        <div
          className="overflow-hidden rounded-xl shadow-sm transition-all duration-200"
          style={{ 
            border: done ? "1px solid color-mix(in srgb, var(--accent-green) 35%, transparent)" : "1px solid var(--border-subtle)", 
            background: done ? "color-mix(in srgb, var(--accent-green) 6%, var(--bg-surface))" : "var(--bg-surface)" 
          }}
        >
          <div
            className="flex items-center justify-between gap-2 border-b px-4 py-2.5 text-sm font-bold"
            style={{ borderColor: done ? "color-mix(in srgb, var(--accent-green) 20%, transparent)" : "var(--border-subtle)", background: "transparent", color: done ? "var(--text-muted)" : "var(--text-primary)" }}
          >
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-red-500" />
              <span className={done ? "line-through opacity-60" : ""}>{resource.label}</span>
            </div>
            {hydrated && (
              <button
                type="button"
                onClick={handleToggle}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition"
                style={{
                  background: done ? "var(--accent-green)" : "var(--bg-sunken)",
                  color: done ? "white" : "var(--text-muted)",
                }}
              >
                {done && <Check className="h-3 w-3" />}
                {done ? "Completed" : "Mark done"}
              </button>
            )}
          </div>
          <div className="aspect-video w-full">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
              title={resource.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div
        className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ 
          border: done ? "1px solid color-mix(in srgb, var(--accent-green) 35%, transparent)" : "1px solid var(--border-subtle)", 
          background: done ? "color-mix(in srgb, var(--accent-green) 6%, var(--bg-surface))" : "var(--bg-surface)" 
        }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            disabled={!hydrated}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50"
            style={
              done
                ? { background: "var(--accent-green)", color: "white" }
                : { background: "var(--bg-sunken)", border: "1px solid var(--border-default)", color: "transparent" }
            }
          >
            {done && <Check className="h-3 w-3 animate-check-pop" strokeWidth={3} />}
          </button>
          
          <span className={`truncate transition-all ${done ? "line-through opacity-60 text-muted" : "text-primary"}`} style={{ color: done ? "var(--text-muted)" : "var(--text-primary)" }}>
            {resource.label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {/* Read/Watch button */}
          {isEmbeddable ? (
            <button
              type="button"
              onClick={onSelect}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all duration-150 hover:opacity-80 active:scale-95"
              style={{
                background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)",
                color: "var(--accent-purple)",
                border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
              }}
              title="Open resource"
            >
              {resource.embed === "youtube" ? <Play className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">
                {resource.embed === "youtube" ? "Watch" : "Read"}
              </span>
            </button>
          ) : (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!done) {
                  setResourceComplete(courseId, resource.url, true);
                  const xp = getResourceXp(courseId, resource.url);
                  if (xp > 0) toast(`+${xp} XP earned!`, "success");
                }
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all duration-150 hover:opacity-80 active:scale-95"
              style={{
                background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)",
                color: "var(--accent-blue)",
                border: "1px solid color-mix(in srgb, var(--accent-blue) 20%, transparent)",
              }}
              title="Open resource in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open</span>
            </a>
          )}

          {/* External link fallback button only if embeddable */}
          {isEmbeddable && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!done) {
                  setResourceComplete(courseId, resource.url, true);
                  const xp = getResourceXp(courseId, resource.url);
                  if (xp > 0) toast(`+${xp} XP earned!`, "success");
                }
              }}
              className="rounded-lg p-1.5 transition hover:opacity-70"
              style={{ color: "var(--text-faint)" }}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
