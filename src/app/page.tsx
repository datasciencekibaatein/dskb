import Link from "next/link";
import { siteConfig } from "@/config/site";
import { courses, getFeaturedCourses, spokenLanguageCount } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import NeuralBackground from "@/components/NeuralBackground";
import AmbientBlobs from "@/components/AmbientBlobs";

export default function HomePage() {
  const featured = getFeaturedCourses();
  const liveCount = courses.filter((c) => c.type === "live").length;

  const stats = [
    { label: "Courses", value: courses.length },
    { label: "Live cohorts", value: liveCount },
    { label: "Languages", value: spokenLanguageCount },
  ];

  return (
    <>
      {/* Hero — navy gradient + neural-network particles + aurora glow */}
      <section className="bg-navy-gradient relative overflow-hidden text-white">
        <NeuralBackground />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan">
              Hindi + English · Recorded + Live
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
              Learn Data Science, <span className="text-gradient">AI &amp; ML</span> with {siteConfig.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{siteConfig.tagline}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/courses" className="btn-primary">
              Browse Courses{" "}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors duration-300 ease-out hover:border-white/60 hover:bg-white/5"
            >
              Watch on YouTube{" "}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 text-center">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 px-2 py-3">
                  <dt className="text-xs text-white/75">{s.label}</dt>
                  <dd className="text-2xl font-bold">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Featured courses — faint drifting blobs behind */}
      <div className="relative overflow-hidden">
        <AmbientBlobs />
        <section className="relative mx-auto max-w-6xl px-4 py-14">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Featured courses</h2>
            <Link href="/courses" className="group text-sm font-semibold text-teal-text hover:text-navy-950">
              View all{" "}
              <span className="btn-arrow inline-block" aria-hidden>
                →
              </span>
            </Link>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((course) => (
              <StaggerItem key={course.slug}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </div>

      {/* Final CTA — same navy gradient as the hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <div className="bg-navy-gradient relative overflow-hidden rounded-2xl px-6 py-12 text-center text-white sm:px-12">
            <NeuralBackground particles={40} />
            <div className="relative">
              <h2 className="text-2xl font-bold sm:text-3xl">Start your data science journey today</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Beginner-friendly courses, real projects, and explanations in the language you think in.
              </p>
              <Link href="/courses" className="btn-primary mt-6">
                Explore all courses{" "}
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
