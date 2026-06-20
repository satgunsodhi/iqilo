import { ExternalLink, Play } from "lucide-react";
import type { Resource } from "@/lib/types";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match?.[1] ?? null;
}

type ResourceLinkProps = {
  resource: Resource;
};

export function ResourceLink({ resource }: ResourceLinkProps) {
  if (resource.embed === "youtube") {
    const videoId = getYouTubeId(resource.url);
    if (videoId) {
      return (
        <div
          className="overflow-hidden rounded-xl shadow-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5 text-sm font-bold"
            style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)", color: "var(--text-primary)" }}
          >
            <Play className="h-4 w-4 text-red-500" />
            {resource.label}
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
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
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
    >
      <span>{resource.label}</span>
      <ExternalLink className="h-4 w-4 shrink-0 transition" style={{ color: "var(--text-faint)" }} />
    </a>
  );
}
