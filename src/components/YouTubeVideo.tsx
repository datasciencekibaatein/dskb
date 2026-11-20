"use client";

// Fast YouTube embed. Shows the video's thumbnail (HD, falling back to
// standard) with a play button; the real YouTube player only loads when the
// viewer clicks (react-lite-youtube-embed, privacy mode).
// If the ID is still a "REPLACE_..." placeholder, shows a friendly card instead.
//
// IMPORTANT — background playback:
// With `cacheComponents`, Next.js keeps recently visited pages mounted but
// hidden (React <Activity>, display:none) instead of unmounting them. An
// iframe left in a hidden page keeps playing, and if it reloads it starts
// again (autoplay=1). So the player is reset to the thumbnail — and the
// iframe blanked immediately — whenever:
//   • the page is hidden or unmounted (useLayoutEffect cleanup)
//   • the route changes (the player only shows on the path it started on)
//   • the browser tab is hidden (visibilitychange)
// The iframe (with autoplay=1) is only ever created from a user click.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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

// Stop any iframe inside `el` right now (silences audio even before React re-renders).
// location.replace() swaps the page without adding a browser-history entry
// (setting iframe.src would, and the Back button would then get "stuck").
function blankIframes(el: HTMLElement | null) {
  el?.querySelectorAll("iframe").forEach((f) => {
    try {
      f.contentWindow?.location.replace("about:blank");
    } catch {
      f.src = "about:blank";
    }
  });
}

// True when the element is no longer on screen: removed from the page, or
// inside a display:none ancestor (how <Activity> hides a page).
const isGone = (el: HTMLElement | null) => !el || !el.isConnected || el.getClientRects().length === 0;

export default function YouTubeVideo({
  id,
  title,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  playRequest = 0,
}: {
  id: string;
  title: string;
  sizes?: string;
  // Increase this number from a click handler (e.g. picking a video in a
  // playlist) to start playing. Mounting / re-showing never starts playback.
  playRequest?: number;
}) {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);

  // The path the video was started on; null = show the thumbnail.
  const [playingOn, setPlayingOn] = useState<string | null>(null);
  // Last play request we've acted on (starts at the current value, so a
  // freshly mounted or re-shown player never auto-plays).
  const [handledRequest, setHandledRequest] = useState(playRequest);
  if (playRequest !== handledRequest) {
    setHandledRequest(playRequest);
    setPlayingOn(pathname);
  }

  // Only "playing" while still on the page where play was clicked.
  const playing = playingOn !== null && playingOn === pathname;

  // Page hidden by <Activity> or unmounted → stop and reset to the thumbnail.
  // React can also run this cleanup while the player stays visible (e.g. in
  // development), so once React has finished updating the page (microtask)
  // we check that the player really is gone/hidden before stopping it.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    return () => {
      queueMicrotask(() => {
        if (isGone(el)) {
          blankIframes(el);
          setPlayingOn(null);
        }
      });
    };
  }, []);

  // Browser tab hidden → stop and reset.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        blankIframes(wrapRef.current);
        setPlayingOn(null);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (isPlaceholder(id)) return <VideoPlaceholder />;

  return (
    <div ref={wrapRef}>
      {playing ? (
        <LiteYouTubeEmbed
          key={id}
          id={id}
          title={title}
          // Created only after a click: load the player and start playing.
          alwaysLoadIframe
          params={{ autoplay: 1 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlayingOn(pathname)}
          aria-label={`Play video: ${title}`}
          className="group/play relative block aspect-video w-full overflow-hidden bg-navy-950 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-cyan"
        >
          <div className="bg-thumb-gradient absolute inset-0" aria-hidden />
          <SmartImage key={id} sources={youtubeThumbs(id)} sizes={sizes} />
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
      )}
    </div>
  );
}
