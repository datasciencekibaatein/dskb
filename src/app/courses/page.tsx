import type { Metadata } from "next";
import CourseFilters from "@/components/CourseFilters";
import AmbientBlobs from "@/components/AmbientBlobs";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Courses",
};

export default function CoursesPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientBlobs />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <Reveal>
          <h1 className="text-3xl font-bold text-heading">All courses</h1>
          <p className="mt-2 text-body">Filter by category, language or format.</p>
        </Reveal>
        <CourseFilters />
      </div>
    </div>
  );
}
