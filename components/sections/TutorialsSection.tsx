"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Eye, Heart, Clock, ChevronLeft, ChevronRight,
  Youtube, List, Layers, AlertCircle, Loader2,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { YTVideo, YTPlaylist } from "@/lib/youtube";

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, compact = false }: { video: YTVideo; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`glass rounded-2xl overflow-hidden flex flex-col group ${
        compact ? "w-full" : "w-72 sm:w-80 snap-item shrink-0"
      }`}
      style={{ willChange: "transform" }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.18 }}
            className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ background: "rgba(255,0,0,0.88)", boxShadow: "0 4px 20px rgba(255,0,0,0.4)" }}
          >
            <Play size={22} className="fill-white text-white ml-1" />
          </motion.div>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold" style={{ background: "rgba(0,0,0,0.75)", color: "#fff" }}>
            {video.duration}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>
          {video.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "var(--text-muted)" }}>
          {video.description}
        </p>
        <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><Eye size={11} />{video.viewCount}</span>
          <span className="flex items-center gap-1"><Heart size={11} />{video.likeCount}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{video.publishedAt}</span>
        </div>
        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(255,0,0,0.1)", color: "#ff4444", border: "1px solid rgba(255,0,0,0.2)" }}
            role="button"
          >
            <Play size={12} className="fill-current" /> Watch on YouTube
          </motion.div>
        </a>
      </div>
    </motion.article>
  );
}

// ─── Playlist Card ────────────────────────────────────────────────────────────
function PlaylistCard({ playlist, onClick }: { playlist: YTPlaylist; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group w-72 sm:w-80 snap-item shrink-0"
      style={{ willChange: "transform" }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${playlist.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />

        {/* Play all button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ background: "rgba(26,107,255,0.88)", boxShadow: "0 4px 20px rgba(26,107,255,0.4)" }}
          >
            <List size={20} className="text-white" />
          </motion.div>
        </div>

        {/* Video count badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold" style={{ background: "rgba(0,0,0,0.75)", color: "#fff" }}>
            {playlist.videoCount} videos
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-sm leading-snug mb-1.5 line-clamp-2" style={{ color: "var(--text-primary)" }}>
          {playlist.title}
        </h3>
        <p className="text-xs line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>
          {playlist.description || `${playlist.videoCount} videos in this playlist`}
        </p>
        <motion.div
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(26,107,255,0.1)", color: "var(--accent-electric)", border: "1px solid rgba(26,107,255,0.2)" }}
        >
          <Layers size={12} /> View Playlist
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Horizontal scroll row ────────────────────────────────────────────────────
function ScrollRow({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: "left" | "right") =>
    ref.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }} />
      <div ref={ref} id={id} className="h-scroll">
        {children}
      </div>
      {/* Scroll buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scrollBy("left")}
          className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:text-red-400 transition-colors"
          style={{ color: "var(--text-muted)" }} aria-label="Scroll left">
          <ChevronLeft size={16} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scrollBy("right")}
          className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:text-red-400 transition-colors"
          style={{ color: "var(--text-muted)" }} aria-label="Scroll right">
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden w-72 sm:w-80 shrink-0 animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-3 rounded bg-white/5 w-3/4" />
        <div className="h-3 rounded bg-white/5 w-full" />
        <div className="h-3 rounded bg-white/5 w-1/2" />
      </div>
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex gap-5 overflow-hidden">
      {[1,2,3,4].map((i) => <SkeletonCard key={i} />)}
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl glass text-sm" style={{ color: "#f87171" }}>
      <AlertCircle size={16} />{message}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function RowLabel({ icon: Icon, title, subtitle, color = "var(--accent-electric)" }: {
  icon: React.ElementType; title: string; subtitle: string; color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18`, color }}>
        <Icon size={17} />
      </div>
      <div>
        <h3 className="font-display font-bold text-base" style={{ color: "var(--text-primary)" }}>{title}</h3>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function TutorialsSection() {
  const [oneshotVideos, setOneshotVideos]   = useState<YTVideo[]>([]);
  const [playlists, setPlaylists]           = useState<YTPlaylist[]>([]);
  const [oneshotLoading, setOneshotLoading] = useState(true);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [oneshotError, setOneshotError]     = useState<string | null>(null);
  const [playlistError, setPlaylistError]   = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<YTPlaylist | null>(null);
  const [modalAllOpen, setModalAllOpen]     = useState(false);

  // ── Fetch one-shot videos ──────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/youtube?type=oneshot")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setOneshotVideos(d.videos ?? []);
      })
      .catch((e) => setOneshotError(e.message))
      .finally(() => setOneshotLoading(false));
  }, []);

  // ── Fetch playlists ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/youtube?type=playlists")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setPlaylists(d.playlists ?? []);
      })
      .catch((e) => setPlaylistError(e.message))
      .finally(() => setPlaylistLoading(false));
  }, []);

  return (
    <Section id="tutorials">
      <SectionHeading
        tag="Free Tutorials"
        title="Watch & Learn — "
        highlight="Completely Free"
        subtitle="New tutorials every week covering Python, ML, SQL, Power BI and more."
        center
      />

      {/* YouTube subscribe banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#ff0000" }}>
            <Youtube size={22} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>@datasciencekibaatein</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>New videos every week · 20L+ total views</p>
          </div>
        </div>
        <motion.a
          href="https://youtube.com/@datasciencekibaatein"
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "#ff0000", boxShadow: "0 4px 16px rgba(255,0,0,0.3)" }}
        >
          <Youtube size={15} /> Subscribe Free
        </motion.a>
      </motion.div>

      {/* ── Row 1: One-Shot Videos ─────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="flex items-end justify-between mb-5">
          <RowLabel
            icon={Play}
            title="One-Shot Videos"
            subtitle="Complete topics in a single video"
            color="#ff4444"
          />
          <Button variant="secondary" size="sm" onClick={() => setModalAllOpen(true)} leftIcon={<Youtube size={13} style={{ color: "#ff4444" }} />}>
            View All
          </Button>
        </div>

        {oneshotLoading ? <LoadingRow /> :
         oneshotError   ? <ErrorState message={oneshotError} /> : (
          <ScrollRow id="oneshot-scroll">
            {oneshotVideos.map((video, i) => (
              <motion.div key={video.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <VideoCard video={video} />
              </motion.div>
            ))}
          </ScrollRow>
        )}
      </div>

      {/* ── Row 2: Topic Playlists ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <RowLabel
            icon={Layers}
            title="Topic Playlists"
            subtitle="Full course series — Python, ML, SQL, Power BI & more"
            color="var(--accent-electric)"
          />
        </div>

        {playlistLoading ? <LoadingRow /> :
         playlistError   ? <ErrorState message={playlistError} /> : (
          <ScrollRow id="playlist-scroll">
            {playlists.map((pl, i) => (
              <motion.div key={pl.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <PlaylistCard playlist={pl} onClick={() => setSelectedPlaylist(pl)} />
              </motion.div>
            ))}
          </ScrollRow>
        )}
      </div>

      {/* ── Modal: All one-shot videos ─────────────────────────────────────── */}
      <Modal
        isOpen={modalAllOpen}
        onClose={() => setModalAllOpen(false)}
        title="All One-Shot Videos"
        subtitle={`${oneshotVideos.length} complete tutorials — free on YouTube`}
        size="xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {oneshotVideos.map((video, i) => (
            <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <VideoCard video={video} compact />
            </motion.div>
          ))}
        </div>
      </Modal>

      {/* ── Modal: Playlist videos ─────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPlaylist && (
          <Modal
            isOpen={!!selectedPlaylist}
            onClose={() => setSelectedPlaylist(null)}
            title={selectedPlaylist.title}
            subtitle={`${selectedPlaylist.videoCount} videos in this playlist`}
            size="xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedPlaylist.videos.map((video, i) => (
                <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <VideoCard video={video} compact />
                </motion.div>
              ))}
            </div>
            {/* Link to full playlist on YouTube */}
            <div className="mt-6 text-center">
              <a
                href={`https://www.youtube.com/playlist?list=${selectedPlaylist.id}`}
                target="_blank" rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "#ff0000", boxShadow: "0 4px 16px rgba(255,0,0,0.3)" }}
                >
                  <Youtube size={15} /> View Full Playlist on YouTube
                </motion.button>
              </a>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
}