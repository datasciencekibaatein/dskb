"use client";

import { motion } from "framer-motion";
import { BarChart3, Youtube, Twitter, Github, Linkedin, ArrowUp, Heart, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { NAV_LINKS, TOPICS } from "@/data/index";

// ── Docs topics shown in footer ──────────────────────────────────────────────
const DOCS_TOPICS = [
  { label: "Python",           slug: "python" },
  { label: "Machine Learning", slug: "machine-learning" },
  { label: "Gen AI",           slug: "generative-ai" },
  { label: "SQL",              slug: "sql" },
];

// ── Social links — update hrefs with your real URLs ──────────────────────────
const SOCIAL_LINKS = [
  { icon: Youtube,  label: "YouTube",  color: "hover:text-red-400",  href: "https://www.youtube.com/@datasciencekibaatein" },
  { icon: Twitter,  label: "Twitter",  color: "hover:text-blue-400", href: "https://twitter.com/datasciencekib" },
  { icon: Github,   label: "GitHub",   color: "hover:text-white",    href: "https://github.com/datasciencekibaatein" },
  { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500", href: "https://www.linkedin.com/in/datasciencekibaatein" },
];

export function Footer() {
  const router    = useRouter();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 mt-16 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent-electric), var(--accent-teal), transparent)", opacity: 0.4 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a6bff,#0050ff)" }}>
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-gradient-blue block -mb-0.5">datascienceki</span>
                <span className="font-display font-bold text-sm text-gradient-ochre block">baatein</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              Practical data science education for a global audience. Build real skills, real projects, real careers.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, color, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-xl glass flex items-center justify-center transition-colors ${color}`}
                  style={{ color: "var(--text-muted)" }}
                  aria-label={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Navigate</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors underline-link"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Topics</h4>
            <ul className="space-y-2.5">
              {TOPICS.map((topic) => (
                <li key={topic}>
                  <a href="#courses" className="text-sm transition-colors underline-link" style={{ color: "var(--text-muted)" }}>
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Docs (new) ── */}
          <div>
            <h4
              className="font-semibold text-sm mb-4 flex items-center gap-1.5 cursor-pointer group w-fit"
              style={{ color: "var(--text-primary)" }}
              onClick={() => router.push("/docs")}
            >
              <BookOpen size={13} style={{ color: "var(--accent-electric)" }} />
              <span className="group-hover:text-electric-300 transition-colors">Docs</span>
            </h4>
            <ul className="space-y-2.5">
              {DOCS_TOPICS.map(({ label, slug }) => (
                <li key={slug}>
                  <a
                    href={`/docs#${slug}`}
                    className="text-sm transition-colors underline-link"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors underline-link" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} datasciencekibaatein — Made with <Heart size={11} className="text-red-400 fill-red-400" /> in India
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Built with Next.js 14 · TypeScript · Tailwind</p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-colors hover:text-electric-300"
            style={{ color: "var(--text-muted)" }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}