"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Calendar, Clock, Users, Zap, Radio, Lock,
  ChevronRight, Tag, BookOpen, Wifi,
} from "lucide-react";
import { LIVE_CLASSES, type LiveClass } from "@/data/liveClasses";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AuthModal } from "@/components/ui/AuthModal";   // see AuthModal.tsx
import { useAuth } from "@/hooks/useAuth";          // your auth hook

// ── Urgency badge colour ─────────────────────────────────────
function SeatsBadge({ seats }: { seats?: number }) {
  if (!seats) return null;
  const color =
    seats <= 5
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : seats <= 10
      ? "bg-ochre-400/20 text-ochre-300 border-ochre-400/30"
      : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
      {seats <= 5 ? `🔥 Only ${seats} seats left` : `${seats} seats left`}
    </span>
  );
}

// ── Individual live-class card ───────────────────────────────
function LiveClassCard({ lc }: { lc: LiveClass }) {
  const router = useRouter();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleClick = () => {
    if (!user) {
      setAuthOpen(true);
    } else {
      router.push(`/live/${lc.slug}`);
    }
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    router.push(`/live/${lc.slug}`);
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -5, scale: 1.012 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={handleClick}
        className="glass rounded-2xl overflow-hidden flex flex-col cursor-pointer group relative"
        style={{ willChange: "transform" }}
      >
        {/* Thumbnail */}
        <div
          className="relative h-44 flex items-center justify-center overflow-hidden"
          style={{ background: lc.thumbnailBg }}
        >
          {/* LIVE badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold animate-pulse">
            <Radio size={9} /> LIVE
          </div>

          {/* Enrollment closed ribbon */}
          {lc.enrollmentClosed && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="text-white font-bold text-sm tracking-wider">ENROLLMENT CLOSED</span>
            </div>
          )}

          {/* Level badge */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border ${
              lc.level === "Beginner"
                ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                : lc.level === "Intermediate"
                ? "bg-ochre-300/10 text-ochre-300 border-ochre-300/20"
                : "bg-red-400/10 text-red-400 border-red-400/20"
            }`}
          >
            {lc.level}
          </span>

          {/* Emoji icon */}
          <div className="text-6xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
            {lc.thumbnail}
          </div>

          {/* bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)]/80 to-transparent" />

          {/* Seats urgency */}
          <div className="absolute bottom-3 left-3">
            <SeatsBadge seats={lc.seatsLeft} />
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2"
            style={{ color: "var(--text-primary)" }}
          >
            {lc.title}
          </h3>

          <p
            className="text-xs leading-relaxed mb-3.5 line-clamp-2 flex-1"
            style={{ color: "var(--text-muted)" }}
          >
            {lc.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs mb-3.5" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1"><Calendar size={11} />{lc.startDate}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{lc.timing}</span>
            <span className="flex items-center gap-1"><BookOpen size={11} />{lc.lecturesCount} lectures</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {lc.tags.slice(0, 3).map((tag) => (
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

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                  ₹{lc.price.toLocaleString()}
                </span>
                {lc.originalPrice && (
                  <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                    ₹{lc.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {lc.discountPercent && (
                <span className="text-[10px] font-bold text-emerald-400">{lc.discountPercent}% OFF</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              disabled={lc.enrollmentClosed}
              className="btn-primary !px-4 !py-2 !text-xs !rounded-xl flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {lc.enrollmentClosed ? (
                <><Lock size={11} /> Closed</>
              ) : !user ? (
                <><Lock size={11} /> Sign in to Enroll</>
              ) : (
                <><Zap size={11} /> Enroll Now</>
              )}
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Auth gate modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        redirectMessage="Sign in to view course details and enroll"
      />
    </>
  );
}

// ── Section wrapper ──────────────────────────────────────────
export function LiveClassesSection() {
  const visibleCourses = LIVE_CLASSES; // filter / sort here if needed

  return (
    <Section id="live-classes">
      <SectionHeading
        tag="Live Classes"
        title="Learn Live with "
        highlight="Industry Experts"
        subtitle="Interactive sessions, real-time doubt solving, recorded for lifetime access. Notifications delivered straight to your Gmail."
      />

      {/* Live indicator strip */}
      <div className="flex items-center gap-3 mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <Wifi size={14} className="text-red-400" />
          <span>Classes broadcast live · All sessions recorded</span>
        </span>
      </div>

      {/* Grid of cards */}
      {visibleCourses.length === 0 ? (
        <div
          className="glass rounded-2xl p-12 text-center"
          style={{ color: "var(--text-muted)" }}
        >
          <Radio size={32} className="mx-auto mb-4 opacity-30" />
          <p className="text-sm">No live classes scheduled right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCourses.map((lc, i) => (
            <motion.div
              key={lc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <LiveClassCard lc={lc} />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}