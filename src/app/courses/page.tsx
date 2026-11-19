import type { Metadata } from "next";
import CourseFilters from "@/components/CourseFilters";

export const metadata: Metadata = {
  title: "Courses",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">All courses</h1>
      <p className="mt-2 text-gray-600">Filter by category, language or format.</p>
      <CourseFilters />
    </div>
  );
}
