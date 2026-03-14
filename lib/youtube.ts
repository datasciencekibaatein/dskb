// lib/youtube.ts
// YouTube Data API v3 helpers — all fetches go through here.

export const YT_API = "https://www.googleapis.com/youtube/v3";

export const PLAYLIST_IDS = {
  oneshot: "PL1K1yhaDyRQA6twlHkmtMloRIFn9dGnWt",
  playlists: [
    "PL1K1yhaDyRQDNylOfB5MXq6Ap1jOmTus3",
    "PL1K1yhaDyRQDeDbZ-zr4jtS6111VKTCno",
    "PL1K1yhaDyRQAfr86mKEV32G6wfRayAZwD",
    "PL1K1yhaDyRQDDWcxapPeLm4SiZcnF02vT",
    "PL1K1yhaDyRQAAb_Gyh6p5lMnR0xbrPWEc",
    "PL1K1yhaDyRQCGtC6V7qLi8fUhZoL9jTKA",
  ],
};

export interface YTVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;       // formatted e.g. "1:23:45"
  publishedAt: string;    // relative e.g. "2 days ago"
  viewCount: string;      // formatted e.g. "210K"
  likeCount: string;
  videoUrl: string;
}

export interface YTPlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  videos: YTVideo[];
}

// ─── Format helpers ───────────────────────────────────────────────────────────

/** ISO 8601 duration (PT1H2M3S) → "1:02:03" */
export function formatDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "0:00";
  const h = parseInt(m[1] ?? "0");
  const min = parseInt(m[2] ?? "0");
  const sec = parseInt(m[3] ?? "0");
  if (h > 0) return `${h}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

/** Number → "210K", "1.2M" */
export function formatCount(n: string): string {
  const num = parseInt(n ?? "0");
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${Math.round(num / 1_000)}K`;
  return String(num);
}

/** ISO date → relative string */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1)   return "Today";
  if (days < 7)   return `${days} day${days > 1 ? "s" : ""} ago`;
  if (days < 30)  return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
}