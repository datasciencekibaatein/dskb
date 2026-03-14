// app/api/youtube/route.ts
//
// Single API route that returns all YouTube data:
//   GET /api/youtube?type=oneshot   → videos from one-shot playlist
//   GET /api/youtube?type=playlists → all topic playlists with their videos
//
// Uses server-side API key (never exposed to client).
// Results are cached for 1 hour via Next.js fetch cache.

import { NextResponse } from "next/server";
import {
  YT_API, PLAYLIST_IDS,
  formatDuration, formatCount, timeAgo,
  type YTVideo, type YTPlaylist,
} from "@/lib/youtube";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
const CACHE = { next: { revalidate: 3600 } }; // cache 1 hour

// ─── Fetch all video IDs from a playlist ─────────────────────────────────────
async function fetchPlaylistVideoIds(playlistId: string, maxResults = 20): Promise<string[]> {
  const url = `${YT_API}/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`;
  const res = await fetch(url, CACHE);
  const data = await res.json();
  return (data.items ?? [])
    .map((item: any) => item.contentDetails?.videoId)
    .filter(Boolean);
}

// ─── Fetch full video details (duration, views, likes) by IDs ────────────────
async function fetchVideoDetails(videoIds: string[]): Promise<YTVideo[]> {
  if (!videoIds.length) return [];
  const ids = videoIds.join(",");
  const url = `${YT_API}/videos?part=snippet,contentDetails,statistics&id=${ids}&key=${API_KEY}`;
  const res = await fetch(url, CACHE);
  const data = await res.json();

  return (data.items ?? []).map((v: any): YTVideo => ({
    id: v.id,
    title: v.snippet.title,
    description: v.snippet.description ?? "",
    thumbnail:
      v.snippet.thumbnails?.maxres?.url ??
      v.snippet.thumbnails?.high?.url ??
      v.snippet.thumbnails?.medium?.url ?? "",
    duration: formatDuration(v.contentDetails?.duration ?? ""),
    publishedAt: timeAgo(v.snippet.publishedAt),
    viewCount: formatCount(v.statistics?.viewCount ?? "0"),
    likeCount: formatCount(v.statistics?.likeCount ?? "0"),
    videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
  }));
}

// ─── Fetch playlist metadata (title, description, thumbnail, videoCount) ─────
async function fetchPlaylistMeta(playlistIds: string[]): Promise<Record<string, { title: string; description: string; thumbnail: string; videoCount: number }>> {
  const ids = playlistIds.join(",");
  const url = `${YT_API}/playlists?part=snippet,contentDetails&id=${ids}&key=${API_KEY}`;
  const res = await fetch(url, CACHE);
  const data = await res.json();

  const map: Record<string, any> = {};
  for (const p of data.items ?? []) {
    map[p.id] = {
      title: p.snippet.title,
      description: p.snippet.description ?? "",
      thumbnail:
        p.snippet.thumbnails?.maxres?.url ??
        p.snippet.thumbnails?.high?.url ??
        p.snippet.thumbnails?.medium?.url ?? "",
      videoCount: p.contentDetails?.itemCount ?? 0,
    };
  }
  return map;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    // ── One-shot videos ──────────────────────────────────────────────────────
    if (type === "oneshot") {
      const videoIds = await fetchPlaylistVideoIds(PLAYLIST_IDS.oneshot, 20);
      const videos   = await fetchVideoDetails(videoIds);
      return NextResponse.json({ videos });
    }

    // ── Topic playlists ──────────────────────────────────────────────────────
    if (type === "playlists") {
      const meta = await fetchPlaylistMeta(PLAYLIST_IDS.playlists);

      const playlists: YTPlaylist[] = await Promise.all(
        PLAYLIST_IDS.playlists.map(async (id) => {
          const videoIds = await fetchPlaylistVideoIds(id, 6); // first 6 per playlist
          const videos   = await fetchVideoDetails(videoIds);
          return {
            id,
            title:       meta[id]?.title       ?? "Playlist",
            description: meta[id]?.description ?? "",
            thumbnail:   meta[id]?.thumbnail   ?? "",
            videoCount:  meta[id]?.videoCount  ?? 0,
            videos,
          };
        })
      );

      return NextResponse.json({ playlists });
    }

    return NextResponse.json({ error: "Invalid type. Use ?type=oneshot or ?type=playlists" }, { status: 400 });

  } catch (err) {
    console.error("[YouTube API]", err);
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
  }
}