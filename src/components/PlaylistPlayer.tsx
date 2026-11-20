"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { type FreeVideo, isPlaceholder, videoDuration, videoTitle } from "@/data/youtube";
import YouTubeVideo from "./YouTubeVideo";

// Main player + ordered video list. Clicking a video in the list loads it in
// the player and starts playing. Notes / GitHub buttons appear only when the
// video has those links.
export default function PlaylistPlayer({ videos }: { videos: FreeVideo[] }) {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false); // true after the viewer chooses a video
  const playerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const video = videos[active];
  const duration = videoDuration(video);
  const notes = isPlaceholder(video.notesUrl) ? null : video.notesUrl;
  const github = isPlaceholder(video.githubUrl) ? null : video.githubUrl;

  const play = (i: number) => {
    setActive(i);
    setPicked(true);
    // On small screens the list is below the player — bring the player into view.
    const top = playerRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.5) {
      playerRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const linkBtn =
    "inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold text-heading transition-colors duration-200 hover:border-cyan/60 hover:bg-subtle";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Player */}
      <div ref={playerRef} className="scroll-mt-24 lg:col-span-2">
        <div className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          <YouTubeVideo
            key={`${active}-${video.youtubeId}`}
            id={video.youtubeId}
            title={videoTitle(video)}
            autoplay={picked}
          />
          <div className="space-y-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-text">
              Video {active + 1} of {videos.length}
            </p>
            <h2 className="text-xl font-bold text-heading">{videoTitle(video)}</h2>
            {duration && <p className="text-sm text-muted">Duration: {duration}</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              {notes && (
                <a href={notes} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                  📄 Notes
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                  {"</>"} GitHub
                </a>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => play(active - 1)}
                  disabled={active === 0}
                  className={`${linkBtn} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => play(active + 1)}
                  disabled={active === videos.length - 1}
                  className={`${linkBtn} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video list */}
      <div className="lg:col-span-1">
        <div className="overflow-hidden rounded-xl border border-line bg-card lg:sticky lg:top-24">
          <h3 className="border-b border-line px-5 py-4 font-semibold text-heading">
            {videos.length} {videos.length === 1 ? "video" : "videos"}
          </h3>
          <ol className="max-h-[32rem] divide-y divide-line overflow-y-auto">
            {videos.map((v, i) => {
              const isActive = i === active;
              const d = videoDuration(v);
              return (
                <li key={`${i}-${v.youtubeId}`}>
                  <button
                    type="button"
                    onClick={() => play(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-start gap-3 border-l-2 px-5 py-3 text-left text-sm transition-colors duration-200 ${
                      isActive ? "border-cyan bg-subtle" : "border-transparent hover:bg-subtle"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                        isActive ? "bg-cyan text-navy-950" : "bg-subtle text-body ring-1 ring-line"
                      }`}
                    >
                      {isActive ? "▶" : i + 1}
                    </span>
                    <span className="flex-1">
                      <span className={`block ${isActive ? "font-semibold text-heading" : "text-body"}`}>
                        {videoTitle(v)}
                      </span>
                      {d && <span className="mt-0.5 block text-xs text-muted">{d}</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
