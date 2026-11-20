"use client";

// Fast YouTube embed: shows the thumbnail first and only loads the real
// YouTube player when the viewer clicks (react-lite-youtube-embed).
// If the ID is still a "REPLACE_..." placeholder, shows a friendly card instead.

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { isPlaceholder } from "@/data/youtube";

export function VideoPlaceholder({ title, note = "Video coming soon" }: { title?: string; note?: string }) {
  return (
    <div className="bg-thumb-gradient relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center text-white">
      <div className="pattern-grid absolute inset-0" aria-hidden />
      <span
        className="relative grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-cyan">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <div className="relative">
        <p className="font-semibold">{note}</p>
        {title && <p className="mt-1 text-sm text-white/75">{title}</p>}
      </div>
    </div>
  );
}

export default function YouTubeVideo({
  id,
  title,
  autoplay = false,
}: {
  id: string;
  title: string;
  autoplay?: boolean; // load + play immediately (used when picked from a list)
}) {
  if (isPlaceholder(id)) return <VideoPlaceholder />;
  return (
    <LiteYouTubeEmbed
      key={id}
      id={id}
      title={title}
      poster="hqdefault"
      // Privacy mode (youtube-nocookie.com) is the library default.
      // When picked from a list, load the player right away and start playing.
      alwaysLoadIframe={autoplay}
      params={autoplay ? { autoplay: 1 } : undefined}
    />
  );
}
