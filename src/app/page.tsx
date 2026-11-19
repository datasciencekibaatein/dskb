import Link from "next/link";
import { siteConfig } from "@/config/site";
import { courses, getFeaturedCourses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function HomePage() {
  const featured = getFeaturedCourses();
  const liveCount = courses.filter((c) => c.type === "live").length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Hindi + English · Recorded + Live
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Learn Data Science, AI & ML with {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="rounded-lg bg-accent px-6 py-3 text-center font-semibold text-gray-900 hover:opacity-90"
            >
              Browse Courses
            </Link>
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/40 px-6 py-3 text-center font-semibold hover:bg-white/10"
            >
              Watch on YouTube
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 text-center">
            <div>
              <dt className="text-xs text-white/70">Courses</dt>
              <dd className="text-2xl font-bold">{courses.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/70">Live cohorts</dt>
              <dd className="text-2xl font-bold">{liveCount}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/70">Languages</dt>
              <dd className="text-2xl font-bold">2</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured courses</h2>
          <Link href="/courses" className="text-sm font-semibold text-brand hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Start your data science journey today</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Beginner-friendly courses, real projects, and explanations in the language you think in.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 font-semibold hover:bg-brand-dark"
          >
            Explore all courses
          </Link>
        </div>
      </section>
    </>
  );
}
