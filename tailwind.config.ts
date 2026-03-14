import type { Config } from "tailwindcss";

const config: Config = {
  // ✅ CRITICAL: "class" strategy enables manual dark mode toggling
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./sections/**/*.{ts,tsx,js,jsx,mdx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Syne for display — geometric, futuristic feel
        display: ["'Syne'", "Georgia", "serif"],
        // Outfit for body — clean, modern, readable
        body: ["'Outfit'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        // Deep navy blues
        navy: {
          950: "#010b18",
          900: "#020f22",
          800: "#03162e",
          700: "#051e3e",
          600: "#082850",
          500: "#0d3464",
          400: "#1a4f8a",
          300: "#2b6cb0",
          200: "#4299e1",
          100: "#bee3f8",
        },
        // Electric blue accents
        electric: {
          600: "#0050ff",
          500: "#1a6bff",
          400: "#3d87ff",
          300: "#60a5fa",
          200: "#93c5fd",
          100: "#dbeafe",
        },
        // Warm brown / ochre accents
        ochre: {
          700: "#7c4a03",
          600: "#a05c04",
          500: "#c97108",
          400: "#e8890c",
          300: "#f5a623",
          200: "#fbbf60",
          100: "#fde8b5",
        },
        // Data science brand teal
        teal: {
          600: "#0d7a6a",
          500: "#0e9e87",
          400: "#14b8a6",
          300: "#2dd4bf",
          200: "#99f6e4",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #010b18 0%, #03162e 40%, #051e3e 70%, #020f22 100%)",
        "card-glass": "linear-gradient(135deg, rgba(5,30,62,0.7) 0%, rgba(2,15,34,0.85) 100%)",
        "blue-glow": "radial-gradient(ellipse at 50% 0%, rgba(26,107,255,0.2) 0%, transparent 60%)",
        "electric-shimmer": "linear-gradient(90deg, transparent, rgba(60,135,255,0.15), transparent)",
        "grid-pattern": "linear-gradient(rgba(26,107,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,255,0.06) 1px, transparent 1px)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-blue": "pulseBlue 3s ease-in-out infinite",
        "grid-move": "gridMove 20s linear infinite",
        "counter-up": "counterUp 1s ease-out forwards",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite alternate",
        "scan-line": "scanLine 4s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.6" },
          "33%": { transform: "translateY(-24px) rotate(2deg)", opacity: "0.8" },
          "66%": { transform: "translateY(-10px) rotate(-1deg)", opacity: "0.5" },
        },
        floatMedium: {
          "0%,100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-16px) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseBlue: {
          "0%,100%": { boxShadow: "0 0 20px rgba(26,107,255,0.3), 0 0 40px rgba(26,107,255,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(26,107,255,0.6), 0 0 80px rgba(26,107,255,0.2)" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        glowPulse: {
          from: { opacity: "0.4", transform: "scale(0.98)" },
          to: { opacity: "0.8", transform: "scale(1.02)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(2000%)", opacity: "0" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-hover": "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(26,107,255,0.15)",
        "electric": "0 0 30px rgba(26,107,255,0.4), 0 0 60px rgba(26,107,255,0.15)",
        "card-lift": "0 25px 50px rgba(1,11,24,0.8), 0 0 30px rgba(26,107,255,0.1)",
        "inset-glow": "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
        "ochre-glow": "0 0 25px rgba(232,137,12,0.35)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
    },
  },
  plugins: [],
};

export default config;
