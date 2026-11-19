import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PlaceholderPage title={`About ${siteConfig.name}`}>
      <p>
        {siteConfig.name} is a YouTube channel and learning platform that teaches data science, AI and
        machine learning in Hindi and English — practical, beginner-friendly and project-based.
      </p>
      <p>
        Watch free lessons on{" "}
        <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
          YouTube
        </a>{" "}
        or join one of our recorded or live courses.
      </p>
    </PlaceholderPage>
  );
}
