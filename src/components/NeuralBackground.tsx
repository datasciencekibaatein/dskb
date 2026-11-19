"use client";

// Faded "neural network" background for dark sections (hero, final CTA):
//   - small cyan dots drifting slowly, joined by faint lines when close
//   - dots gently move away from the mouse
//   - a soft aurora glow drifting on the right side
//
// Performance / accessibility:
//   - animation pauses when the section is off-screen or the tab is hidden
//   - about half the dots on small screens
//   - prefers-reduced-motion → one static frame, no movement
//
// Usage: put it as the first child of a `relative overflow-hidden` section,
// and give the content after it `relative` so it sits on top.

import { useEffect, useRef } from "react";

const DOT_COLOR = "rgba(125, 211, 252, 0.45)";
const LINE_RGB = "34, 211, 238"; // cyan
const MAX_LINE_ALPHA = 0.2;
const MOUSE_RADIUS = 120; // px — dots inside this radius are pushed away

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function NeuralBackground({
  particles = 56, // desktop count; mobile uses half
  className = "",
}: {
  particles?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let width = 0;
    let height = 0;
    let linkDistance = 130;
    let dots: Particle[] = [];
    let frame = 0;
    let onScreen = true;
    const mouse = { x: -9999, y: -9999 };

    const createDots = () => {
      const isMobile = width < 640;
      const count = isMobile ? Math.round(particles / 2) : particles;
      linkDistance = isMobile ? 100 : 130;
      dots = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.22; // px per frame — slow drift
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1 + Math.random() * 1.2,
        };
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sizeChanged = Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (sizeChanged || dots.length === 0) createDots();
      draw();
    };

    const step = () => {
      for (const p of dots) {
        p.x += p.vx;
        p.y += p.vy;

        // Gently push away from the mouse.
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Wrap around the edges.
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Lines between nearby dots; fainter the further apart they are.
      ctx.lineWidth = 0.8;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            ctx.strokeStyle = `rgba(${LINE_RGB}, ${(1 - dist / linkDistance) * MAX_LINE_ALPHA})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = DOT_COLOR;
      for (const p of dots) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    };

    // Run only when visible, tab is active, and motion is allowed.
    const update = () => {
      const shouldRun = onScreen && !document.hidden && !reduced;
      wrap.dataset.paused = String(!shouldRun); // also pauses the CSS aurora
      if (shouldRun && !frame) {
        frame = requestAnimationFrame(loop);
      } else if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onMotionChange = () => {
      reduced = motionQuery.matches;
      update();
      draw();
    };

    // The canvas ignores the mouse (so buttons stay clickable);
    // we listen on the parent section instead.
    const section = wrap.parentElement ?? wrap;
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", update);
    motionQuery.addEventListener("change", onMotionChange);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(wrap);

    resize();
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", update);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [particles]);

  return (
    <div ref={wrapRef} aria-hidden className={`neural-bg pointer-events-none absolute inset-0 ${className}`}>
      <div className="aurora" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
