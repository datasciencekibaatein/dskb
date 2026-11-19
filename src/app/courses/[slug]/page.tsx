import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug, getLessonCount } from "@/data/courses";
import Thumbnail from "@/components/Thumbnail";
import Badge from "@/components/Badge";
import Price from "@/components/Price";

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

  return (
    <>
      {/* Top banner */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link href="/courses" className="text-sm text-white/60 hover:text-white">
            ← All courses
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{course.category}</Badge>
            <Badge variant="recorded">{course.language}</Badge>
            <Badge variant={course.type === "live" ? "live" : "recorded"}>
              {course.type === "live" ? "● Live" : "Recorded"}
            </Badge>
            {comingSoon && <Badge variant="comingSoon">Coming soon</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-3xl text-white/75">{course.subtitle}</p>
          <p className="mt-4 text-sm text-white/60">
            {course.level} · {course.duration} · {lessonCount} lessons
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-3">
        {/* Purchase box — shows first on mobile, sticky sidebar on desktop */}
        <aside className="lg:order-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
            <Thumbnail label={course.category} />
            <div className="space-y-4 p-5">
              <Price course={course} size="lg" />
              <button
                type="button"
                disabled
                title="Payments coming soon"
                className="w-full cursor-not-allowed rounded-lg bg-brand px-4 py-3 font-semibold text-white opacity-50"
              >
                Buy Now
              </button>
              <p className="text-center text-xs text-gray-500">
                {comingSoon ? "This course is coming soon." : "Enrolment opens soon."}
              </p>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">This course includes</h3>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {course.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-8 lg:order-1 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">What you&apos;ll learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.whatYouWillLearn.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-green-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {course.type === "live" && course.liveSchedule && (
            <section className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h2 className="text-xl font-bold text-gray-900">Live schedule</h2>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Starts</dt>
                  <dd className="font-semibold text-gray-900">{formatDate(course.liveSchedule.startDate)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Days</dt>
                  <dd className="font-semibold text-gray-900">{course.liveSchedule.days}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Time</dt>
                  <dd className="font-semibold text-gray-900">
                    {course.liveSchedule.time} {course.liveSchedule.timezone}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Sessions</dt>
                  <dd className="font-semibold text-gray-900">{course.liveSchedule.totalSessions}</dd>
                </div>
              </dl>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-gray-900">Curriculum</h2>
            <p className="mt-1 text-sm text-gray-500">
              {course.curriculum.length} sections · {lessonCount} lessons
            </p>
            <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
              {course.curriculum.map((section, i) => (
                // <details> is a built-in collapsible element — no JavaScript needed.
                <details key={section.title} open={i === 0} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50">
                    <span className="font-semibold text-gray-900">{section.title}</span>
                    <span className="flex shrink-0 items-center gap-3 text-sm text-gray-500">
                      {section.lessons.length} lessons
                      <span className="transition-transform group-open:rotate-180">▾</span>
                    </span>
                  </summary>
                  <ul className="border-t border-gray-100 bg-gray-50/50">
                    {section.lessons.map((lesson) => (
                      <li
                        key={lesson.title}
                        className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-gray-700"
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-gray-400">▶</span>
                          {lesson.title}
                          {lesson.isFreePreview && (
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                              Free preview
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-gray-500">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
