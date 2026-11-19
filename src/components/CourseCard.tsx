import Link from "next/link";
import { type Course, formatMinutes, getTotalMinutes } from "@/data/courses";
import Thumbnail from "./Thumbnail";
import Badge from "./Badge";
import Price from "./Price";

// Hover: card lifts 6px with a soft cyan-tinted shadow; thumbnail zooms to 1.03.
export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cyan/50 hover:shadow-[0_14px_32px_-12px_rgba(34,211,238,0.45)] motion-safe:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
    >
      <div className="relative">
        <Thumbnail label={course.category} />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.status === "coming-soon" && <Badge variant="comingSoon">Coming soon</Badge>}
          {course.type === "live" && <Badge variant="live">● Live</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{course.language}</Badge>
          <Badge variant="recorded">{course.level}</Badge>
        </div>
        <h3 className="font-semibold leading-snug text-navy-950">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{course.subtitle}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Price course={course} />
          <span className="text-xs text-gray-600">{formatMinutes(getTotalMinutes(course))}</span>
        </div>
      </div>
    </Link>
  );
}
