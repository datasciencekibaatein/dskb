"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Star, Users, Clock, ChevronLeft, ChevronRight,
  Zap, Tag, Award, TrendingUp, CalendarClock,
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Course } from "@/types";

const LEVEL_STYLE: Record<string, string> = {
  Beginner:     "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  Intermediate: "bg-ochre-300/10 text-ochre-300 border-ochre-300/20",
  Advanced:     "bg-red-400/10 text-red-400 border-red-400/20",
};

function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`glass rounded-2xl overflow-hidden flex flex-col group ${
        compact ? "w-full" : "w-72 sm:w-80 snap-item shrink-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className="relative h-44 overflow-hidden flex items-center justify-center"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,107,255,0.15) 0%, rgba(20,184,166,0.1) 100%)" }}
        />
        <div
          className="text-6xl transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          {course.iconEmoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)]/80 to-transparent" />

        {/* ── Top-left badges ── */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* UPCOMING badge – always shown for paid courses */}
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-electric-500/90 text-white">
            <CalendarClock size={9} /> Upcoming
          </span>

          {course.isBestseller && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-ochre-400/90 text-navy-950">
              <Award size={9} /> Bestseller
            </span>
          )}
          {course.isNew && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/90 text-white">
              <TrendingUp size={9} /> New
            </span>
          )}
        </div>

        <span
          className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border ${LEVEL_STYLE[course.level]}`}
        >
          {course.level}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="topic-badge self-start mb-2.5">{course.topic}</span>
        <h3
          className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2"
          style={{ color: "var(--text-primary)" }}
        >
          {course.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-3.5 line-clamp-2 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs mb-3.5" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-ochre-300 text-ochre-300" />
            <span className="text-ochre-300 font-semibold">{course.rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />{course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />{course.duration}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Tag size={8} />{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                ₹{course.price.toLocaleString()}
              </span>
              {course.originalPrice && (
                <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {course.discountPercent && (
              <span className="text-[10px] font-bold text-emerald-400">{course.discountPercent}% OFF</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="btn-primary !px-4 !py-2 !text-xs !rounded-xl flex items-center gap-1.5"
          >
            <Zap size={12} />Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function CoursesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <Section id="courses">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
        <SectionHeading
          tag="Premium Courses"
          title="Learn Data Science the "
          highlight="Right Way"
          subtitle="Project-driven, expert-led courses with lifetime access and completion certificates."
          className="mb-0"
        />
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollBy("left")}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-colors hover:text-electric-300"
              style={{ color: "var(--text-muted)" }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollBy("right")}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-colors hover:text-electric-300"
              style={{ color: "var(--text-muted)" }}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setModalOpen(true)}
            leftIcon={<TrendingUp size={13} />}
          >
            View All Courses
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
        />
        <div ref={scrollRef} className="h-scroll">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="All Paid Courses"
        subtitle={`${COURSES.length} courses — practical, project-driven learning`}
        size="xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <CourseCard course={course} compact />
            </motion.div>
          ))}
        </div>
      </Modal>
    </Section>
  );
}