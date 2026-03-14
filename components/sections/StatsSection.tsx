"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";
import { STATS } from "@/data/index";
import type { Stat } from "@/types";

function StatCard({ stat, index, triggered }: { stat: Stat; index: number; triggered: boolean }) {
  const count = useCounter({ end: stat.value, duration: 2200, trigger: triggered });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 sm:p-7 text-center group hover:-translate-y-1 transition-transform duration-300"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Icon */}
      <div
        className="text-3xl mb-3 transition-transform group-hover:scale-110 duration-300 inline-block"
        aria-hidden="true"
      >
        {stat.icon}
      </div>

      {/* Animated number */}
      <div
        className="font-display font-extrabold mb-1.5 tabular-nums"
        style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text-primary)" }}
      >
        {stat.prefix && (
          <span className="text-gradient-ochre">{stat.prefix}</span>
        )}
        <span className="text-gradient-blue">
          {triggered ? count.toLocaleString() : "0"}
        </span>
        <span className="text-gradient-ochre">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p
        className="font-semibold text-base mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        {stat.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="mt-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-electric), transparent)" }}
      />
    </motion.div>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative z-10 py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-dim), transparent)" }}
        />

        <div ref={ref} className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} triggered={inView} />
          ))}
        </div>

        <div
          className="h-px mt-12"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-dim), transparent)" }}
        />
      </div>
    </section>
  );
}
