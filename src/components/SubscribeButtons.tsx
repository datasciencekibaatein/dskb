import { YOUTUBE_CHANNELS, subscribeUrl } from "@/data/youtube";

const channels = [
  { label: "Subscribe — Hindi channel", url: subscribeUrl(YOUTUBE_CHANNELS.hindi) },
  { label: "Subscribe — English channel", url: subscribeUrl(YOUTUBE_CHANNELS.english) },
];

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"
      />
    </svg>
  );
}

// Subscribe buttons for both channels. While a channel URL in
// src/data/youtube.ts is still "REPLACE_...", the button shows as "coming soon".
export default function SubscribeButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {channels.map((c, i) =>
        c.url ? (
          <a
            key={c.label}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              i === 0
                ? "btn-primary"
                : "group inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card px-6 py-3 font-semibold text-heading transition-colors duration-300 ease-out hover:border-cyan/60"
            }
          >
            <YouTubeIcon /> {c.label}
          </a>
        ) : (
          <span
            key={c.label}
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dashed border-line px-6 py-3 font-semibold text-muted"
            title="Channel link coming soon"
          >
            <YouTubeIcon /> {c.label.replace("Subscribe — ", "")} — link coming soon
          </span>
        ),
      )}
    </div>
  );
}
