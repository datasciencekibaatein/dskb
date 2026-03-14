"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award, BookOpen, Youtube } from "lucide-react";
import { SKILLS } from "@/data/index";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Skill } from "@/types";

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!barRef.current) return;
        const fill = barRef.current.querySelector<HTMLElement>(".bar-fill");
        if (!fill) return;
        gsap.fromTo(fill, { width: "0%" }, {
          width: `${skill.level}%`,
          duration: 1.2,
          ease: "power2.out",
          delay: index * 0.06,
          scrollTrigger: { trigger: barRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      } catch {}
    };
    init();
  }, [skill.level, index]);

  const colorMap: Record<string, string> = {
    electric: "linear-gradient(90deg, #1a6bff, #3d87ff)",
    teal: "linear-gradient(90deg, #0e7a6a, #14b8a6)",
    ochre: "linear-gradient(90deg, #c97108, #e8890c)",
  };

  return (
    <div ref={barRef} className="glass rounded-xl p-4 hover:border-[var(--border-accent)] transition-all duration-300">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{skill.emoji}</span>
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{skill.name}</span>
        </div>
        <span className="text-xs font-mono font-bold" style={{ color: "var(--text-accent)" }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        <div className="bar-fill h-full rounded-full" style={{ background: colorMap[skill.color] ?? colorMap.electric, width: 0 }} />
      </div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".about-orb-a", { y: -90, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        gsap.to(".about-orb-b", { y: 60, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 } });
        const items = timelineRef.current?.querySelectorAll(".timeline-item");
        if (items?.length) {
          gsap.fromTo(items, { opacity: 0, x: -24 }, { opacity: 1, x: 0, stagger: 0.14, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: timelineRef.current, start: "top 80%" } });
        }
      } catch {}
    };
    init();
  }, []);

  const achievements = [
    "1,000+ students trained globally",
    "7 comprehensive data science courses published",
    "20L+ YouTube views and growing",
    "Industry practitioner with 8+ years of experience",
    "95% course completion rate across all courses",
  ];

  return (
    <Section id="about" ref={sectionRef}>
      <div className="about-orb-a orb w-96 h-96" style={{ top: 0, right: "-5%", background: "radial-gradient(circle, rgba(26,107,255,0.12) 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="about-orb-b orb w-80 h-80" style={{ bottom: 0, left: "-5%", background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)" }} aria-hidden="true" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT — Founder card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1a6bff, #14b8a6)" }} />

            <div className="relative inline-block mb-5">
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl font-display font-black mx-auto animate-glow-pulse"
                style={{ background: "linear-gradient(135deg, #1a6bff 0%, #14b8a6 50%, #e8890c 100%)", boxShadow: "0 0 40px rgba(26,107,255,0.4)", color: "#fff" }}
              >D</div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "var(--bg-base)", background: "#22c55e" }}>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </span>
            </div>

            <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Dhruv Verma</h3>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--text-accent)" }}>Data Scientist & Educator</p>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>5+ Years Industry Experience</p>

            <div className="flex justify-around gap-4 py-4 border-y mb-5" style={{ borderColor: "var(--border-subtle)" }}>
              {[{ v: "8+", l: "Years" }, { v: "1K+", l: "Students" }, { v: "7", l: "Courses" }].map((s) => (
                <div key={s.l}>
                  <p className="font-bold text-lg text-gradient-blue">{s.v}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.l}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Python", "ML", "SQL", "Power BI", "AI"].map((t) => (
                <span key={t} className="topic-badge">{t}</span>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 glass rounded-2xl px-3 py-2 hidden sm:flex items-center gap-2 text-xs font-medium"
              style={{ color: "var(--accent-teal)" }}
              aria-hidden="true"
            >
              <BookOpen size={13} />
              Project-Based
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -right-4 glass rounded-2xl px-3 py-2 hidden sm:flex items-center gap-2 text-xs font-medium"
              style={{ color: "var(--accent-ochre)" }}
              aria-hidden="true"
            >
              <Award size={13} />
              Globally Accessible
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — Content */}
        <div>
          <SectionHeading
            tag="About the Founder"
            title="Making Data Science "
            highlight="Accessible"
            subtitle="My goal is to demystify data science — teaching it with real examples, practical projects, and depth that actually prepares you for the industry."
          />

          {/* Mission box */}
          <div className="glass rounded-2xl p-5 mb-7" style={{ borderLeft: "3px solid var(--accent-electric)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              🎯 <strong style={{ color: "var(--text-primary)" }}>Mission:</strong>{" "}
              Make world-class data science education accessible to everyone — regardless of their background.
              Every learner deserves practical, project-driven content that actually leads to real career outcomes.
            </p>
          </div>

          {/* Achievements */}
          <div ref={timelineRef} className="space-y-3 mb-10">
            {achievements.map((item, i) => (
              <div key={i} className="timeline-item flex items-center gap-3 opacity-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(26,107,255,0.12)", color: "var(--accent-electric)" }}>
                  <CheckCircle size={15} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>Expertise</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
