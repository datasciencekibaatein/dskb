// =============================================================
// DataScience ki Baatein — FREE YouTube content
// Location in the project: src/data/youtube.ts
//
// HOW TO FILL THIS IN
// Playlist ID: open the playlist on YouTube, copy the part after "list="
//   https://www.youtube.com/playlist?list=PLxxxxxxxxxxxx  →  "PLxxxxxxxxxxxx"
// Video ID: open the video, copy the part after "v="
//   https://www.youtube.com/watch?v=abc123XYZ  →  "abc123XYZ"
// Replace every "REPLACE_..." value. Leave notesUrl/githubUrl empty if none.
// =============================================================

export type Language = "Hindi" | "English";

export interface FreeVideo {
  youtubeId: string;
  title: string;
  duration: string; // e.g. "32:15"
  notesUrl?: string;
  githubUrl?: string; // "Lecture Data" link
}

export interface Playlist {
  slug: string; // URL: /free-learning/<slug>
  title: string;
  description: string;
  topic: string; // Python, Data Handling, Visualization, Machine Learning, Deep Learning
  language: Language;
  channel: "DataScience ki Baatein" | "English Channel";
  playlistId: string; // YouTube playlist ID
  status: "available" | "in-progress" | "coming-soon";
  relatedCourseSlug?: string; // links to the paid course in courses.ts
  videos: FreeVideo[];
}

export const playlists: Playlist[] = [
  {
    slug: "python-hindi",
    title: "Python for Data Science",
    description: "Python basics se data science tak — Hindi mein, step by step.",
    topic: "Python",
    language: "Hindi",
    channel: "DataScience ki Baatein",
    playlistId: "REPLACE_PYTHON_PLAYLIST_ID",
    status: "available",
    relatedCourseSlug: "python-for-data-science-hindi",
    videos: [
      { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Video 1 title", duration: "00:00" },
      { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Video 2 title", duration: "00:00" },
    ],
  },
  {
    slug: "numpy-hindi",
    title: "NumPy",
    description: "Arrays, indexing aur vectorization — 5 videos mein NumPy.",
    topic: "Data Handling",
    language: "Hindi",
    channel: "DataScience ki Baatein",
    playlistId: "REPLACE_NUMPY_PLAYLIST_ID",
    status: "available",
    relatedCourseSlug: "numpy-pandas-masterclass-hindi",
    videos: [
      { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Video 1 title", duration: "00:00" },
    ],
  },
  {
    slug: "pandas-hindi",
    title: "Pandas",
    description: "DataFrames se EDA project tak — 7 videos, e-commerce dataset ke saath.",
    topic: "Data Handling",
    language: "Hindi",
    channel: "DataScience ki Baatein",
    playlistId: "REPLACE_PANDAS_PLAYLIST_ID",
    status: "available",
    relatedCourseSlug: "numpy-pandas-masterclass-hindi",
    videos: [
      { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Video 1 title", duration: "00:00" },
    ],
  },
  {
    slug: "visualization-hindi",
    title: "Data Visualization — Matplotlib & Seaborn",
    description: "Charts, dashboards aur insights. New videos every Tuesday & Saturday.",
    topic: "Visualization",
    language: "Hindi",
    channel: "DataScience ki Baatein",
    playlistId: "REPLACE_VISUALIZATION_PLAYLIST_ID",
    status: "in-progress",
    relatedCourseSlug: "data-visualization-hindi",
    videos: [
      { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Video 1 title", duration: "00:00" },
    ],
  },
  {
    slug: "deep-learning-english",
    title: "Deep Learning Roadmap",
    description: "From the perceptron to GANs — 48 videos, NumPy from scratch and Keras.",
    topic: "Deep Learning",
    language: "English",
    channel: "English Channel",
    playlistId: "",
    status: "coming-soon",
    relatedCourseSlug: "deep-learning-ann-to-gan",
    videos: [],
  },
];

export const getPlaylistBySlug = (slug: string) => playlists.find((p) => p.slug === slug);

// Latest videos shown on the Home page (newest first). Update when you upload.
export const latestVideos: FreeVideo[] = [
  { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: Latest video title", duration: "00:00" },
  { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: 2nd latest video", duration: "00:00" },
  { youtubeId: "REPLACE_VIDEO_ID", title: "REPLACE: 3rd latest video", duration: "00:00" },
];

export const YOUTUBE_CHANNELS = {
  hindi: "REPLACE_HINDI_CHANNEL_URL", // e.g. https://www.youtube.com/@datasciencekibaatein
  english: "REPLACE_ENGLISH_CHANNEL_URL",
};
// ---------- Helpers (used by the pages) ----------

// True while an ID / URL is still a "REPLACE_..." placeholder (or empty).
export const isPlaceholder = (value?: string) => !value || value.trim() === "" || value.startsWith("REPLACE");

// Title to show for a video: generic text while it's still a placeholder.
export const videoTitle = (v: FreeVideo) =>
  isPlaceholder(v.youtubeId) || v.title.startsWith("REPLACE") ? "New video coming soon" : v.title;

// Duration to show, or null if not filled in yet ("00:00").
export const videoDuration = (v: FreeVideo) => (!v.duration || v.duration === "00:00" ? null : v.duration);

// Videos that have a real YouTube ID.
export const realVideos = (p: Playlist) => p.videos.filter((v) => !isPlaceholder(v.youtubeId));

// Free playlists linked to a paid course (via relatedCourseSlug).
export const getPlaylistsForCourse = (courseSlug: string) =>
  playlists.filter((p) => p.relatedCourseSlug === courseSlug);

// Values for the filters on /free-learning.
export const playlistTopics = Array.from(new Set(playlists.map((p) => p.topic)));
export const playlistLanguages = Array.from(new Set(playlists.map((p) => p.language)));

// "Subscribe" link for a channel URL (null while it's still a placeholder).
export const subscribeUrl = (channelUrl: string) =>
  isPlaceholder(channelUrl) ? null : `${channelUrl.replace(/\/$/, "")}?sub_confirmation=1`;

// Link to a playlist on YouTube (null while it's still a placeholder).
export const playlistUrl = (p: Playlist) =>
  isPlaceholder(p.playlistId) ? null : `https://www.youtube.com/playlist?list=${p.playlistId}`;
