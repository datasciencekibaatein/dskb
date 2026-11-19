import Link from "next/link";
import { type Course } from "@/data/courses";
import Thumbnail from "./Thumbnail";
import Badge from "./Badge";
import Price from "./Price";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
        <h3 className="font-semibold leading-snug text-gray-900 group-hover:text-brand">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{course.subtitle}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Price course={course} />
          <span className="text-xs text-gray-500">{course.duration}</span>
        </div>
      </div>
    </Link>
  );
}
