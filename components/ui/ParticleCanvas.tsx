"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  life: number; maxLife: number;
  color: string;
  type: "dot" | "glyph";
  glyph?: string;
}

const DATA_GLYPHS = [
  "df", "pd", "np", "SQL", "ML", "AI",
  "X[0]", "λ", "∑", "μ", "σ²", "∂",
  "sklearn", "→", "0.95", "plt",
];

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const isDark = theme !== "light";
    const baseColors = isDark
      ? ["rgba(26,107,255,", "rgba(61,135,255,", "rgba(20,184,166,", "rgba(232,137,12,"]
      : ["rgba(26,95,212,", "rgba(14,122,102,", "rgba(201,113,8,"];

    const spawn = (): Particle => {
      const maxLife = 240 + Math.random() * 360;
      const isGlyph = Math.random() < 0.25;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.25 + Math.random() * 0.55),
        size: isGlyph ? 0 : 1 + Math.random() * 2.2,
        opacity: 0,
        life: 0,
        maxLife,
        color: baseColors[Math.floor(Math.random() * baseColors.length)],
        type: isGlyph ? "glyph" : "dot",
        glyph: isGlyph
          ? DATA_GLYPHS[Math.floor(Math.random() * DATA_GLYPHS.length)]
          : undefined,
      };
    };

    // Seed initial particles
    for (let i = 0; i < 70; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      if (particlesRef.current.length < 100 && Math.random() < 0.4) {
        particlesRef.current.push(spawn());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const half = p.maxLife / 2;
        p.opacity = p.life < half
          ? (p.life / half) * 0.65
          : ((p.maxLife - p.life) / half) * 0.65;

        if (p.life >= p.maxLife || p.y < -40) return false;

        if (p.type === "glyph" && p.glyph) {
          ctx.font = `400 10px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `${p.color}${(p.opacity * 0.7).toFixed(2)})`;
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
          ctx.fill();

          // Halo for bigger dots
          if (p.size > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${(p.opacity * 0.1).toFixed(2)})`;
            ctx.fill();
          }
        }

        return true;
      });

      // Connection lines between close particles
      const pts = particlesRef.current.filter((p) => p.type === "dot");
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const alpha = (1 - d / 100) * 0.07 * Math.min(pts[i].opacity, pts[j].opacity);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(26,107,255,${alpha.toFixed(3)})`
              : `rgba(26,95,212,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.45 }}
      aria-hidden="true"
    />
  );
}
