"use client";

// Small animation helpers built on Framer Motion.
// They all respect the user's "reduce motion" OS setting: when it's on,
// content is shown immediately with no animation.

import { useEffect, useRef } from "react";
import { animate, motion, MotionConfig, useInView, useReducedMotion, type Variants } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const; // smooth ease-out, no bounce

// Wrap the app once (in layout.tsx). `reducedMotion="user"` tells Framer Motion
// to follow the OS setting everywhere.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Fades + slides a block up when it scrolls into view.
// Server and browser always render the same element (avoids hydration
// mismatches). With "reduce motion" on, the [data-reveal] CSS rule in
// globals.css forces these blocks fully visible with no movement.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

// Parent + child pair: children fade up one after another.
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div data-reveal className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

// Counts from 0 up to `value` the first time it becomes visible.
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = String(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.6,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={String(value)}>
      0
    </span>
  );
}
