"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ExternalLink, Calendar, Tag,
  Search, AlertCircle,
  Code2, Brain, Sparkles, Database,
} from "lucide-react";

// ── Topic config ──────────────────────────────────────────────────────────────
const DOCS_TOPICS = [
  { slug: "python",           label: "Python",           icon: Code2,    tag: "python",           color: "#3b82f6" },
  { slug: "machine-learning", label: "Machine Learning", icon: Brain,    tag: "machine-learning", color: "#8b5cf6" },
  { slug: "generative-ai",    label: "Gen AI",           icon: Sparkles, tag: "generative-ai",    color: "#f59e0b" },
  { slug: "sql",              label: "SQL",              icon: Database, tag: "sql",              color: "#10b981" },
] as const;

type TopicSlug = typeof DOCS_TOPICS[number]["slug"];

interface MediumArticle {
  guid:        string;
  title:       string;
  link:        string;
  pubDate:     string;
  thumbnail:   string;
  description: string;
  categories:  string[]; // ← YOU control this, not Medium
  author:      string;
}

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  📋  YOUR ARTICLES — Add every article here manually                        ║
// ║                                                                              ║
// ║  `categories` controls which section(s) the article appears in.             ║
// ║  It has NOTHING to do with Medium's tags — you decide.                      ║
// ║                                                                              ║
// ║  SECTION TAGS:                                                               ║
// ║    "python"           → Python                                               ║
// ║    "machine-learning" → Machine Learning                                     ║
// ║    "generative-ai"    → Gen AI                                               ║
// ║    "sql"              → SQL                                                  ║
// ║                                                                              ║
// ║  TIP: Leave thumbnail as "" — it will be auto-filled from Medium's RSS.     ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const MY_ARTICLES: MediumArticle[] = [
  {
    guid:        "b44831b21071",
    title:       "Introduction to Machine Learning: Concepts Every Beginner Should Know",
    link:        "https://medium.com/@datasciencekibaatein/introduction-to-machine-learning-concepts-every-beginner-should-know-b44831b21071",
    pubDate:     "2026-03-14",
    author:      "Dhruv - Datasciencekibaatein",
    thumbnail:   "", // auto-filled from RSS
    description: "A beginner-friendly guide covering key ML concepts, terminologies, and the three types of machine learning: supervised, unsupervised, and reinforcement learning.",
    categories:  ["machine-learning"], // ← ONLY machine learning section
  },

  // ── Add your next article below ──────────────────────────────────────────────
  // {
  //   guid:        "ARTICLE_ID",      // last segment of the Medium URL
  //   title:       "Article Title",
  //   link:        "https://medium.com/@datasciencekibaatein/your-slug-ARTICLE_ID",
  //   pubDate:     "2026-04-01",
  //   author:      "Dhruv - Datasciencekibaatein",
  //   thumbnail:   "",               // leave "" to auto-fill from RSS
  //   description: "Short description for the card.",
  //   categories:  ["python"],       // which section(s) it appears in — your choice
  // },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return dateStr; }
}

// Extract the unique hash ID from a Medium URL.
// Medium URLs end with a slug-HASHID pattern e.g:
//   "introduction-to-machine-learning-b44831b21071"
// We extract just the last hyphen-separated segment (the hex hash)
// so both the pinned link and RSS link match correctly.
function articleId(url: string): string {
  const slug = url.split("/").filter(Boolean).pop() ?? "";
  const parts = slug.split("-");
  // The hash is the last segment and is always a hex string ~10-12 chars
  const hash = parts[parts.length - 1];
  return /^[a-f0-9]{8,}$/i.test(hash) ? hash : slug;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 animate-pulse flex gap-4">
      <div className="w-24 h-24 rounded-xl shrink-0" style={{ background: "var(--bg-elevated)" }} />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-3 w-1/4 rounded-full" style={{ background: "var(--bg-elevated)" }} />
        <div className="h-5 w-3/4 rounded-full" style={{ background: "var(--bg-elevated)" }} />
        <div className="h-3 w-full  rounded-full" style={{ background: "var(--bg-elevated)" }} />
        <div className="h-3 w-2/3  rounded-full" style={{ background: "var(--bg-elevated)" }} />
      </div>
    </div>
  );
}

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ article, index }: { article: MediumArticle; index: number }) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ x: 4 }}
      className="glass rounded-2xl p-5 flex gap-4 group cursor-pointer"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      {/* Thumbnail */}
      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0"
        style={{ background: "var(--bg-elevated)" }}>
        {article.thumbnail ? (
          <img src={article.thumbnail} alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={22} style={{ color: "var(--accent-electric)", opacity: 0.4 }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-[11px] flex items-center gap-1 mb-1.5" style={{ color: "var(--text-muted)" }}>
            <Calendar size={10} />{formatDate(article.pubDate)}
          </p>
          <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2 group-hover:text-electric-300 transition-colors"
            style={{ color: "var(--text-primary)" }}>
            {article.title}
          </h3>
          <p className="text-xs mt-1.5 line-clamp-2" style={{ color: "var(--text-muted)" }}>
            {article.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {article.categories.slice(0, 3).map((cat) => (
              <span key={cat}
                className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium"
                style={{ background: "rgba(26,107,255,0.1)", color: "var(--accent-electric)", border: "1px solid rgba(26,107,255,0.2)" }}>
                <Tag size={7} />{cat}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--accent-electric)" }}>
            Read <ExternalLink size={9} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ── Main DocsClient ───────────────────────────────────────────────────────────
export function DocsClient() {
  const [activeSlug, setActiveSlug] = useState<TopicSlug>("machine-learning");
  const [search,     setSearch]     = useState("");
  const [rssMap,     setRssMap]     = useState<Record<string, Partial<MediumArticle>>>({});
  const [loading,    setLoading]    = useState(true);

  // Fetch RSS once — only to enrich thumbnails/descriptions
  // It does NOT control which articles appear or which section they're in
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res  = await fetch("/api/medium");
        const data = await res.json();
        if (!cancelled && data.articles) {
          // Build a map of articleId → metadata for quick lookup
          const map: Record<string, Partial<MediumArticle>> = {};
          for (const a of data.articles) {
            map[articleId(a.link)] = a;
          }
          setRssMap(map);
        }
      } catch {
        // RSS enrichment failed — fall back to manual data, no problem
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Handle hash deep-linking: /docs#sql
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as TopicSlug;
    if (DOCS_TOPICS.find((t) => t.slug === hash)) setActiveSlug(hash);
  }, []);

  // Merge manual article data with RSS metadata (thumbnail enrichment)
  // YOUR categories always win — RSS categories are ignored completely
  const enrichedArticles = useMemo(() => {
    return MY_ARTICLES.map((article) => {
      const rss = rssMap[articleId(article.link)];
      return {
        ...article,
        // Only fill thumbnail/description from RSS if you left them blank
        thumbnail:   article.thumbnail   || rss?.thumbnail   || "",
        description: article.description || rss?.description || "",
        pubDate:     article.pubDate     || rss?.pubDate     || "",
        // categories always from MY_ARTICLES — never from RSS
      };
    });
  }, [rssMap]);

  const activeTopic = DOCS_TOPICS.find((t) => t.slug === activeSlug)!;

  // Filter by section + search
  const filtered = useMemo(() => {
    return enrichedArticles.filter((a) => {
      const matchesTopic  = a.categories.some((c) => c.toLowerCase() === activeTopic.tag.toLowerCase());
      const matchesSearch = search.trim() === "" ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [enrichedArticles, activeTopic, search]);

  const countFor = (slug: TopicSlug) => {
    const tag = DOCS_TOPICS.find((t) => t.slug === slug)!.tag;
    return enrichedArticles.filter((a) =>
      a.categories.some((c) => c.toLowerCase() === tag.toLowerCase())
    ).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">

      {/* Page heading */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ background: "rgba(26,107,255,0.1)", color: "var(--accent-electric)", border: "1px solid rgba(26,107,255,0.2)" }}>
          <BookOpen size={11} /> Documentation
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2" style={{ color: "var(--text-primary)" }}>
          Learn by <span className="text-gradient-blue">Topic</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Tutorials organised by topic. Add a new article to <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--bg-elevated)" }}>MY_ARTICLES</code> in DocsClient to publish it here.
        </p>
      </motion.div>

      <div className="flex gap-8 items-start">

        {/* ── Left sidebar ── */}
        <aside className="hidden lg:flex flex-col gap-2 w-56 shrink-0 sticky top-28">
          {DOCS_TOPICS.map(({ slug, label, icon: Icon, color }) => {
            const isActive = slug === activeSlug;
            return (
              <motion.button key={slug}
                onClick={() => { setActiveSlug(slug); setSearch(""); window.history.replaceState(null, "", `#${slug}`); }}
                whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-left w-full transition-all"
                style={{
                  background: isActive ? "rgba(26,107,255,0.12)" : "transparent",
                  border:     isActive ? "1px solid rgba(26,107,255,0.25)" : "1px solid transparent",
                  color:      isActive ? "var(--text-primary)" : "var(--text-secondary)",
                }}>
                <span className="flex items-center gap-2.5">
                  <Icon size={14} style={{ color: isActive ? color : undefined }} />
                  {label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{
                    background: isActive ? "rgba(26,107,255,0.2)" : "var(--bg-elevated)",
                    color:      isActive ? "var(--accent-electric)" : "var(--text-muted)",
                  }}>
                  {countFor(slug)}
                </span>
              </motion.button>
            );
          })}

          <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <a href="https://medium.com/@datasciencekibaatein" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-white/5"
              style={{ color: "var(--text-muted)" }}>
              <ExternalLink size={11} /> All on Medium
            </a>
          </div>
        </aside>

        {/* ── Right content ── */}
        <div className="flex-1 min-w-0">

          {/* Mobile topic tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {DOCS_TOPICS.map(({ slug, label, icon: Icon, color }) => {
              const isActive = slug === activeSlug;
              return (
                <button key={slug}
                  onClick={() => { setActiveSlug(slug); setSearch(""); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all"
                  style={{
                    background: isActive ? "rgba(26,107,255,0.12)" : "var(--bg-elevated)",
                    border:     isActive ? "1px solid rgba(26,107,255,0.25)" : "1px solid var(--border-subtle)",
                    color:      isActive ? "var(--text-primary)" : "var(--text-muted)",
                  }}>
                  <Icon size={12} style={{ color: isActive ? color : undefined }} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Section header + search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <activeTopic.icon size={18} style={{ color: activeTopic.color }} />
              <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                {activeTopic.label}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="text" placeholder="Search articles…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field w-full text-sm"
                style={{
                  background: "var(--bg-elevated)", border: "1px solid var(--border-dim)",
                  color: "var(--text-primary)", borderRadius: "0.75rem",
                  padding: "0.5rem 0.75rem 0.5rem 2rem",
                }} />
            </div>
          </div>

          {/* Article list */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-4">
                {Array.from({ length: 2 }).map((_, i) => <ArticleSkeleton key={i} />)}
              </motion.div>
            )}

            {!loading && filtered.length > 0 && (
              <motion.div key={`${activeSlug}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col gap-4">
                {filtered.map((article, i) => (
                  <ArticleCard key={article.guid} article={article} index={i} />
                ))}
              </motion.div>
            )}

            {!loading && filtered.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-3">
                <BookOpen size={40} style={{ color: "var(--text-muted)", opacity: 0.25 }} />
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  {search ? "No results found" : "No articles yet"}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {search
                    ? "Try a different search term."
                    : `Add an article with category "${activeTopic.tag}" to MY_ARTICLES in DocsClient.tsx`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}