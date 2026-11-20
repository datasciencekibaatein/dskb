"use client";

// Fast YouTube embed. Shows the video's thumbnail (HD, falling back to
// standard) with a play button; the real YouTube player only loads when the
// viewer clicks (react-lite-youtube-embed, privacy mode).
// If the ID is still a "REPLACE_..." placeholder, shows a friendly card instead.

import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { isPlaceholder, youtubeThumbs } from "@/data/youtube";
import SmartImage from "./SmartImage";

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
  sizes = "(min-width: 1024px) 66vw, 100vw",
}: {
  id: string;
  title: string;
  autoplay?: boolean; // load + play immediately (used when picked from a list)
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(autoplay);

  if (isPlaceholder(id)) return <VideoPlaceholder />;

  if (playing) {
    return (
      <LiteYouTubeEmbed
        id={id}
        title={title}
        // Load the player straight away and start playing (the viewer already clicked).
        alwaysLoadIframe
        params={{ autoplay: 1 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group/play relative block aspect-video w-full overflow-hidden bg-navy-950 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-cyan"
    >
      <div className="bg-thumb-gradient absolute inset-0" aria-hidden />
      <SmartImage sources={youtubeThumbs(id)} sizes={sizes} />
      <span className="absolute inset-0 bg-navy-950/10 transition-colors duration-300 group-hover/play:bg-navy-950/25" />
      <span
        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r from-cyan to-blue shadow-lg transition-transform duration-300 ease-out group-hover/play:scale-110"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-navy-950">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
