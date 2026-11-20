import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, formatMinutes, getCourseBySlug, getLessonCount, getTotalMinutes } from "@/data/courses";
import Thumbnail from "@/components/Thumbnail";
import Badge from "@/components/Badge";
import Price from "@/components/Price";
import { Reveal } from "@/components/motion";
import { getPlaylistsForCourse } from "@/data/youtube";

// Pre-build one page per course at build time.
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);
  return course ? { title: course.title, description: course.subtitle } : {};
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function CourseDetailPage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const comingSoon = course.status === "coming-soon";
  const lessonCount = getLessonCount(course);
  const freePlaylists = getPlaylistsForCourse(course.slug);

  return (
    <>
      {/* Top banner */}
      <section className="bg-navy-950 text-white dark:border-b dark:border-cyan/15">
        <Reveal className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/courses"
            className="text-sm text-white/75 transition-colors duration-200 hover:text-white"
          >
            ← All courses
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="onDark">{course.category}</Badge>
            <Badge variant="onDark">{course.language}</Badge>
            <Badge variant={course.type === "live" ? "live" : "onDark"}>
              {course.type === "live" ? "● Live" : "Recorded"}
            </Badge>
            {comingSoon && <Badge variant="comingSoon">Coming soon</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-3xl text-white/80">{course.subtitle}</p>
          <p className="mt-4 text-sm text-white/75">
            {course.level} · {formatMinutes(getTotalMinutes(course))} · {lessonCount}{" "}
            {lessonCount === 1 ? "lesson" : "lessons"} · by {course.instructor}
          </p>
        </Reveal>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-3">
        {/* Purchase box — shows first on mobile, sticky sidebar on desktop */}
        <Reveal className="lg:order-2">
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
              <Thumbnail label={course.thumbnailLabel} />
              <div className="space-y-4 p-5">
                <Price course={course} size="lg" />
                <button type="button" disabled title="Payments coming soon" className="btn-primary w-full">
                  Buy Now{" "}
                  <span className="btn-arrow" aria-hidden>
                    →
                  </span>
                </button>
                <p className="text-center text-xs text-muted">
                  {comingSoon ? "This course is coming soon." : "Enrolment opens soon."}
                </p>
                {freePlaylists.length > 0 && (
                  <div className="rounded-lg border border-line bg-subtle p-3 text-sm">
                    <p className="text-body">Not sure yet?</p>
                    <ul className="mt-1 space-y-1">
                      {freePlaylists.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/free-learning/${p.slug}`}
                            className="group font-semibold text-teal-text hover:text-heading"
                          >
                            Watch the free {freePlaylists.length > 1 ? `${p.title} ` : ""}playlist on YouTube{" "}
                            <span className="btn-arrow inline-block" aria-hidden>
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-heading">This course includes</h3>
                  <ul className="space-y-1.5 text-sm text-body">
                    {course.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-teal-text" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </Reveal>

        {/* Main content */}
        <div className="space-y-8 lg:order-1 lg:col-span-2">
          <Reveal>
            <section className="rounded-xl border border-line bg-card p-6">
              <h2 className="text-xl font-bold text-heading">What you&apos;ll learn</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-body">
                    <span className="text-teal-text" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {course.type === "live" && course.liveSchedule && (
            <Reveal>
              <section className="rounded-xl border border-line border-l-4 border-l-cyan bg-card p-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-heading">Live schedule</h2>
                  <Badge variant="live">● Live</Badge>
                </div>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted">Starts</dt>
                    <dd className="font-semibold text-heading">
                      {formatDate(course.liveSchedule.startDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Days</dt>
                    <dd className="font-semibold text-heading">{course.liveSchedule.days}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Time</dt>
                    <dd className="font-semibold text-heading">{course.liveSchedule.time}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Seats</dt>
                    <dd className="font-semibold text-heading">{course.liveSchedule.seats}</dd>
                  </div>
                </dl>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section>
              <h2 className="text-xl font-bold text-heading">Curriculum</h2>
              <p className="mt-1 text-sm text-muted">
                {course.curriculum.length} sections · {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
              </p>
              <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                {course.curriculum.map((section, i) => (
                  // <details> is a built-in collapsible element — no JavaScript needed.
                  <details key={section.title} open={i === 0} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 hover:bg-subtle">
                      <span className="font-semibold text-heading">{section.title}</span>
                      <span className="flex shrink-0 items-center gap-3 text-sm text-muted">
                        {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                        <span className="transition-transform duration-300 ease-out group-open:rotate-180">
                          ▾
                        </span>
                      </span>
                    </summary>
                    <ul className="border-t border-line bg-page/60">
                      {section.lessons.map((lesson) => (
                        <li
                          key={lesson.title}
                          className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-body"
                        >
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-muted" aria-hidden>
                              ▶
                            </span>
                            {lesson.title}
                            {lesson.isFreePreview && (
                              <span className="rounded bg-cyan/15 px-1.5 py-0.5 text-xs font-semibold text-teal-text">
                                Free preview
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 text-muted">{formatMinutes(lesson.durationMin)}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
