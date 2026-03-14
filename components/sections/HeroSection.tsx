"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, TrendingUp, Users } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const FLOATING_KEYWORDS = [
  { text: "Python",   x: "8%",  y: "28%", delay: 0   },
  { text: "Pandas",   x: "85%", y: "22%", delay: 0.4 },
  { text: "ML",       x: "78%", y: "68%", delay: 0.8 },
  { text: "SQL",      x: "6%",  y: "72%", delay: 1.2 },
  { text: "AI",       x: "50%", y: "14%", delay: 0.6 },
  { text: "Power BI", x: "88%", y: "46%", delay: 1.0 },
];

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        if (!headingRef.current) return;
        const words = headingRef.current.querySelectorAll(".hero-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: -25, filter: "blur(8px)" },
          { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
        );
        cleanup = () => { gsap.killTweensOf(words); };
      } catch {}
    };
    init();
    return () => cleanup?.();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden" style={{ paddingTop: "88px" }}>
      <div className="data-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />

      <div className="orb w-[700px] h-[700px] animate-float-slow" style={{ top: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(26,107,255,0.18) 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="orb w-[500px] h-[500px] animate-float-medium" style={{ bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="orb w-[350px] h-[350px]" style={{ top: "40%", left: "45%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(232,137,12,0.08) 0%, transparent 65%)" }} aria-hidden="true" />

      {FLOATING_KEYWORDS.map((kw) => (
        <motion.div
          key={kw.text}
          className="absolute hidden md:flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-semibold font-mono"
          style={{ left: kw.x, top: kw.y, color: "var(--text-accent)", borderColor: "rgba(26,107,255,0.25)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0.8], scale: [0.5, 1, 1], y: [0, -8, 0] }}
          transition={{ opacity: { delay: kw.delay + 0.5, duration: 0.4 }, scale: { delay: kw.delay + 0.5, duration: 0.4 }, y: { delay: kw.delay + 0.9, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
          {kw.text}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pb-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold mb-8"
          style={{ color: "var(--accent-ochre)", borderColor: "rgba(232,137,12,0.25)" }}
        >
          <Star size={12} className="fill-current" />
          <span>India&apos;s #1 Practical Data Science Platform</span>
          <Star size={12} className="fill-current" />
        </motion.div>

        {/* GSAP headline */}
        <h1
          ref={headingRef}
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 6.5vw, 4.5rem)", perspective: "600px" }}
        >
          {"Master Data Science with".split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0" style={{ color: "var(--text-primary)" }}>{word}</span>
          ))}
          <br className="hidden sm:block" />
          {"Practical Learning".split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0">
              <span className={i === 0 ? "text-gradient-blue" : "text-gradient-ochre"}>{word}</span>
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Python, Pandas, NumPy, Machine Learning, Power BI, SQL, Statistics and AI —
          all taught with{" "}
          <strong style={{ color: "var(--text-primary)" }}>real projects and practical depth</strong>{" "}
          so you build skills that actually get you hired.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={() => scrollToSection("courses")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary !px-8 !py-4 !text-base !rounded-2xl group w-full sm:w-auto"
          >
            <TrendingUp size={18} />
            Explore Paid Courses
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("tutorials")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary !px-8 !py-4 !text-base !rounded-2xl group w-full sm:w-auto flex items-center justify-center gap-3"
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#ff0000" }}>
              <Play size={13} className="fill-white text-white ml-0.5" />
            </span>
            Watch Free Tutorials
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {["R", "P", "S", "A", "M"].map((l, i) => (
                <div
                  key={l}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: "var(--bg-base)", zIndex: 5 - i, color: "#fff",
                    background: ["linear-gradient(135deg,#1a6bff,#0050ff)", "linear-gradient(135deg,#14b8a6,#0e7a6a)", "linear-gradient(135deg,#e8890c,#c97108)", "linear-gradient(135deg,#8b5cf6,#6d28d9)", "linear-gradient(135deg,#ef4444,#dc2626)"][i],
                  }}
                >{l}</div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-ochre-300 text-ochre-300" />)}</div>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>1,000+ students enrolled</p>
            </div>
          </div>

          <div className="h-7 w-px hidden sm:block" style={{ background: "var(--border-dim)" }} />
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <Users size={15} style={{ color: "var(--accent-electric)" }} />
            <span><strong style={{ color: "var(--text-primary)" }}>100+</strong> lectures available</span>
          </div>

          <div className="h-7 w-px hidden sm:block" style={{ background: "var(--border-dim)" }} />
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <TrendingUp size={15} style={{ color: "var(--accent-teal)" }} />
            <span><strong style={{ color: "var(--text-primary)" }}>95%</strong> success rate</span>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ color: "var(--text-muted)" }}
          aria-hidden="true"
        >
          <span className="text-[11px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: "var(--border-dim)" }}
          >
            <div className="w-1 h-2 rounded-full bg-electric-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
