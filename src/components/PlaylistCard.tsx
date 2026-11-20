import Link from "next/link";
import { type Playlist, realVideos } from "@/data/youtube";
import Thumbnail from "./Thumbnail";
import Badge from "./Badge";

// Same look + hover as CourseCard: lifts 6px, cyan-tinted shadow, thumbnail zoom.
export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const count = realVideos(playlist).length;
  const comingSoon = playlist.status === "coming-soon";

  return (
    <Link
      href={`/free-learning/${playlist.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cyan/50 hover:shadow-[0_14px_32px_-12px_rgba(34,211,238,0.45)] motion-safe:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-text"
    >
      <div className="relative">
        <Thumbnail label={playlist.topic} />
        <div className="absolute left-3 top-3 flex gap-2">
          {playlist.status === "in-progress" && <Badge variant="inProgress">● In progress</Badge>}
          {comingSoon && <Badge variant="comingSoon">Coming soon</Badge>}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white ring-1 ring-white/20">
          Free
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{playlist.language}</Badge>
          <Badge variant="recorded">{playlist.topic}</Badge>
        </div>
        <h3 className="font-semibold leading-snug text-heading">{playlist.title}</h3>
        <p className="line-clamp-2 text-sm text-body">{playlist.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-sm">
          <span className="text-muted">
            {comingSoon
              ? "Coming soon"
              : count > 0
                ? `${count} ${count === 1 ? "video" : "videos"}`
                : "Videos coming soon"}
          </span>
          <span className="font-semibold text-teal-text">
            Watch free{" "}
            <span className="btn-arrow inline-block" aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
