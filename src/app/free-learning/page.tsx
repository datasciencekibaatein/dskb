import type { Metadata } from "next";
import AmbientBlobs from "@/components/AmbientBlobs";
import PlaylistFilters from "@/components/PlaylistFilters";
import SubscribeButtons from "@/components/SubscribeButtons";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Free Learning",
  description: "Free data science, AI and ML videos on YouTube — in Hindi and English.",
};

export default function FreeLearningPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientBlobs />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-text">Free Learning</p>
          <h1 className="mt-2 text-3xl font-bold text-heading">Free videos on YouTube — Hindi and English</h1>
          <p className="mt-2 max-w-2xl text-body">
            Full playlists, in order, with notes and code where available. Pick a topic and start watching —
            no sign-up needed.
          </p>
          <div className="mt-6">
            <SubscribeButtons />
          </div>
        </Reveal>
        <PlaylistFilters />
      </div>
    </div>
  );
}
