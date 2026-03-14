"use client";

import { useState, useEffect, useRef } from "react";
import { easeOutCubic } from "@/lib/utils";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number; // ms
  trigger?: boolean;
}

/**
 * Animated counter hook.
 * Returns the current animated value.
 * Only starts when `trigger` becomes true (use with IntersectionObserver).
 */
export function useCounter({
  start = 0,
  end,
  duration = 2000,
  trigger = false,
}: UseCounterOptions): number {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      setValue(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, start, end, duration]);

  return value;
}
