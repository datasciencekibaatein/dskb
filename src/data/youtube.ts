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
    playlistId: "PL1K1yhaDyRQAeJ3SA8AsGnz6zV1rMSO9q",
    status: "available",
    relatedCourseSlug: "python-for-data-science-hindi",
    videos: [
      { youtubeId: "LNtWVP7zcOs", title: "Python Variables & Data Types in Hindi | Numeric, String, Boolean, None | Complete Beginner Tutorial", duration: "22:30" },
      { youtubeId: "5c7SEGvqZpE", title: "Python Operators Explained in Hindi | Arithmetic, Comparison, Logical, Assignment", duration: "23:54" },
      { youtubeId: "3FACYVI7FhU", title: "Python If-Else Statements Explained in Hindi | Conditional Statements | Beginner Tutorial", duration: "29:36" },
      { youtubeId: "T739dQIBrrY", title: "Python Data Structures Explained in Hindi | Lists, Tuples, Sets, Dictionaries | Complete Tutorial", duration: "31:31" },
      { youtubeId: "rR0Hi0iecb0", title: "Python Loops Complete Tutorial in Hindi | For, While, Range, Zip, Enumerate, Break, Continue", duration: "30:43" },
      { youtubeId: "lb6Q8N0AqA8", title: "Python Strings Complete Tutorial in Hindi", duration: "35:02" },
      { youtubeId: "XJwflc1tjQ4", title: "Python Functions Complete Tutorial in Hindi | def, return, *args, **kwargs, lambda, recursion", duration: "42:04" },
      { youtubeId: "X_r2_h3cz0c", title: "Python File Handling Complete Tutorial in Hindi | Text Files, CSV, JSON | Beginner to Pro", duration: "46:35" },
      { youtubeId: "s7mca5A3uoI", title: "Python Exception Handling Complete Tutorial in Hindi | try, except, else, finally, raise", duration: "48:42" },
      { youtubeId: "Fs26rXPAp9I", title: "Python Modules and Packages in Hindi | import, math, datetime, User-Defined Module", duration: "58:58" },
      { youtubeId: "eprheBGqRdA", title: "Student Management System in Python | Final Project – Python for Data Science Series", duration: "1:51:23" },

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
  { youtubeId: "T6HqelCNohE", title: "Choosing the Right Chart in Hindi | Retail Sales Dashboard Project | Data Visualization", duration: "1:28:42" },
  { youtubeId: "Qy_Clu3hEec", title: "Pandas EDA Project in Hindi | E-Commerce Dataset Analysis | Complete Data Science Project", duration: "52:47" },
  { youtubeId: "aN37MZfbe1M", title: "Numpy Series Finale in Hindi | Reshaping + Complete Mini Project + Pandas Bridge Tutorial", duration: "41:48" },
];

export const YOUTUBE_CHANNELS = {
  hindi: "https://www.youtube.com/@datasciencekibaatein", // e.g. https://www.youtube.com/@datasciencekibaatein
  english: "https://www.youtube.com/@DSWithDhruv",
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

// YouTube thumbnail URLs to try in order: HD first, then the always-available hqdefault.
export const youtubeThumbs = (youtubeId: string) => [
  `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
];

// Thumbnail URLs for a playlist card: its first real video (empty while all are placeholders).
export const playlistThumbs = (p: Playlist) => {
  const first = realVideos(p)[0];
  return first ? youtubeThumbs(first.youtubeId) : [];
};
