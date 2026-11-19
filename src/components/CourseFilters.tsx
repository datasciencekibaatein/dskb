"use client";

import { useState } from "react";
import { allCategories, allLanguages, allTypes, courses } from "@/data/courses";
import CourseCard from "./CourseCard";

const ALL = "all";

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-brand focus:outline-none"
      >
        <option value={ALL}>All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CourseFilters() {
  const [category, setCategory] = useState(ALL);
  const [language, setLanguage] = useState(ALL);
  const [type, setType] = useState(ALL);

  const filtered = courses.filter(
    (c) =>
      (category === ALL || c.category === category) &&
      (language === ALL || c.language === language) &&
      (type === ALL || c.type === type),
  );

  const hasFilters = category !== ALL || language !== ALL || type !== ALL;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-4 sm:items-end">
        <Select
          label="Category"
          value={category}
          onChange={setCategory}
          options={allCategories.map((c) => ({ value: c, label: c }))}
        />
        <Select
          label="Language"
          value={language}
          onChange={setLanguage}
          options={allLanguages.map((l) => ({ value: l, label: l }))}
        />
        <Select
          label="Type"
          value={type}
          onChange={setType}
          options={allTypes.map((t) => ({ value: t, label: t === "live" ? "Live" : "Recorded" }))}
        />
        <button
          type="button"
          disabled={!hasFilters}
          onClick={() => {
            setCategory(ALL);
            setLanguage(ALL);
            setType(ALL);
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} of {courses.length} courses
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          No courses match these filters yet.
        </p>
      )}
    </>
  );
}
