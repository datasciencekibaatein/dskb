"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { playlistLanguages, playlistTopics, playlists } from "@/data/youtube";
import PlaylistCard from "./PlaylistCard";
import FilterSelect, { FILTER_ALL as ALL } from "./FilterSelect";

// Topic + Language filters for /free-learning (same style/animation as CourseFilters).
export default function PlaylistFilters() {
  const [topic, setTopic] = useState(ALL);
  const [language, setLanguage] = useState(ALL);
  const reduce = useReducedMotion();

  const filtered = playlists.filter(
    (p) => (topic === ALL || p.topic === topic) && (language === ALL || p.language === language),
  );
  const hasFilters = topic !== ALL || language !== ALL;
  const cardTransition = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-line bg-card p-4 sm:grid-cols-3 sm:items-end">
        <FilterSelect
          label="Topic"
          value={topic}
          onChange={setTopic}
          options={playlistTopics.map((t) => ({ value: t, label: t }))}
        />
        <FilterSelect
          label="Language"
          value={language}
          onChange={setLanguage}
          options={playlistLanguages.map((l) => ({ value: l, label: l }))}
        />
        <button
          type="button"
          disabled={!hasFilters}
          onClick={() => {
            setTopic(ALL);
            setLanguage(ALL);
          }}
          className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-heading transition-colors duration-200 hover:bg-subtle disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60"
        >
          Clear filters
        </button>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} of {playlists.length} playlists
      </p>

      <motion.div layout={!reduce} className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ ...cardTransition, delay: reduce ? 0 : Math.min(i * 0.04, 0.2) }}
            >
              <PlaylistCard playlist={p} />
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
            No playlists match these filters yet.
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
