"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, courseTypes, courses, languages } from "@/data/courses";
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
    <label className="flex flex-col gap-1 text-sm font-medium text-heading">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-card px-3 py-2 text-heading transition-colors duration-200 focus:border-teal-text focus:outline-none focus:ring-2 focus:ring-cyan/40"
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
  const reduce = useReducedMotion();

  const filtered = courses.filter(
    (c) =>
      (category === ALL || c.category === category) &&
      (language === ALL || c.language === language) &&
      (type === ALL || c.type === type),
  );

  const hasFilters = category !== ALL || language !== ALL || type !== ALL;

  // Cards fade/scale in and out, and the rest slide into their new spots.
  const cardTransition = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-line bg-card p-4 sm:grid-cols-4 sm:items-end">
        <Select
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories.map((c) => ({ value: c, label: c }))}
        />
        <Select
          label="Language"
          value={language}
          onChange={setLanguage}
          options={languages.map((l) => ({ value: l, label: l }))}
        />
        <Select
          label="Type"
          value={type}
          onChange={setType}
          options={courseTypes.map((t) => ({ value: t, label: t === "live" ? "Live" : "Recorded" }))}
        />
        <button
          type="button"
          disabled={!hasFilters}
          onClick={() => {
            setCategory(ALL);
            setLanguage(ALL);
            setType(ALL);
          }}
          className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-heading transition-colors duration-200 hover:bg-subtle disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60"
        >
          Clear filters
        </button>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} of {courses.length} courses
      </p>

      <motion.div layout={!reduce} className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((course, i) => (
            <motion.div
              key={course.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ ...cardTransition, delay: reduce ? 0 : Math.min(i * 0.04, 0.2) }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={cardTransition}
            className="mt-4 rounded-xl border border-dashed border-line bg-card p-10 text-center text-body"
          >
            No courses match these filters yet.
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
