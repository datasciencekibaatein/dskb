import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlaylistBySlug, playlists, playlistUrl, realVideos } from "@/data/youtube";
import { getCourseBySlug } from "@/data/courses";
import Badge from "@/components/Badge";
import PlaylistPlayer from "@/components/PlaylistPlayer";
import SubscribeButtons from "@/components/SubscribeButtons";
import NeuralBackground from "@/components/NeuralBackground";
import { VideoPlaceholder } from "@/components/YouTubeVideo";
import { Reveal } from "@/components/motion";

// Pre-build one page per playlist.
export function generateStaticParams() {
  return playlists.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/free-learning/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const playlist = getPlaylistBySlug(slug);
  return playlist ? { title: `${playlist.title} (free)`, description: playlist.description } : {};
}

export default async function PlaylistPage(props: PageProps<"/free-learning/[slug]">) {
  const { slug } = await props.params;
  const playlist = getPlaylistBySlug(slug);
  if (!playlist) notFound();

  const comingSoon = playlist.status === "coming-soon" || playlist.videos.length === 0;
  const course = playlist.relatedCourseSlug ? getCourseBySlug(playlist.relatedCourseSlug) : undefined;
  const ytLink = playlistUrl(playlist);
  const count = realVideos(playlist).length;

  return (
    <>
      {/* Banner */}
      <section className="bg-navy-950 text-white dark:border-b dark:border-cyan/15">
        <Reveal className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/free-learning"
            className="text-sm text-white/75 transition-colors duration-200 hover:text-white"
          >
            ← All free playlists
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="onDark">{playlist.topic}</Badge>
            <Badge variant="onDark">{playlist.language}</Badge>
            {playlist.status === "in-progress" && <Badge variant="inProgress">● In progress</Badge>}
            {comingSoon && <Badge variant="comingSoon">Coming soon</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">{playlist.title}</h1>
          <p className="mt-3 max-w-3xl text-white/80">{playlist.description}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75">
            <span>
              {count > 0 ? `${count} ${count === 1 ? "video" : "videos"}` : "Videos coming soon"} ·{" "}
              {playlist.channel}
            </span>
            {ytLink && (
              <a
                href={ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan hover:underline"
              >
                Open on YouTube ↗
              </a>
            )}
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        {comingSoon ? (
          <Reveal>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-line bg-card shadow-sm">
              <VideoPlaceholder
                note="This playlist is coming soon"
                title="Subscribe to get notified when it goes live."
              />
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <p className="text-body">
                  We&apos;re recording it now. Subscribe so you don&apos;t miss the first video.
                </p>
                <SubscribeButtons />
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <PlaylistPlayer videos={playlist.videos} />
          </Reveal>
        )}

        {/* Related paid course */}
        {course && (
          <Reveal>
            <div className="bg-navy-gradient dark-glow relative overflow-hidden rounded-2xl px-6 py-10 text-white sm:px-10">
              <NeuralBackground particles={30} />
              <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Go further</p>
                  <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                    Want projects, doubt support and a certificate?
                  </h2>
                  <p className="mt-2 text-white/80">Join the full course: {course.title}</p>
                </div>
                <Link href={`/courses/${course.slug}`} className="btn-primary shrink-0">
                  Join the full course{" "}
                  <span className="btn-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
