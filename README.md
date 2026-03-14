# datasciencekibaatein 🧠📊

India ka #1 Hindi Data Science platform — Next.js 14 App Router + TypeScript website.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 Full Project Structure

```
datasciencekibaatein/
│
├── app/
│   ├── globals.css          # All CSS: theme vars, Tailwind, animations
│   ├── layout.tsx           # Root layout: FOUC-prevention script + ThemeProvider
│   └── page.tsx             # Homepage (server component, composes sections)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav, mobile drawer, theme toggle
│   │   └── Footer.tsx       # Links, socials, copyright
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx      # Headline (GSAP), CTA, floating keywords
│   │   ├── StatsSection.tsx     # Animated counters (IntersectionObserver)
│   │   ├── AboutSection.tsx     # Founder card, skills (GSAP bar fill), timeline
│   │   ├── CoursesSection.tsx   # H-scroll cards + modal grid
│   │   ├── TutorialsSection.tsx # YouTube cards H-scroll + modal
│   │   └── ContactSection.tsx   # Animated form with success state
│   │
│   └── ui/
│       ├── Button.tsx           # Reusable (variants: primary/secondary/ochre/ghost)
│       ├── Card.tsx             # Glassmorphism card
│       ├── Modal.tsx            # Spring drop-from-top modal (ESC + outside click)
│       ├── ParticleCanvas.tsx   # Canvas particle system with data science glyphs
│       └── Section.tsx          # Section wrapper + SectionHeading
│
├── hooks/
│   ├── useTheme.tsx         # ✅ Theme provider + hook + THEME_SCRIPT (no FOUC)
│   ├── useCounter.ts        # Animated counter (rAF + easeOutCubic)
│   └── useInView.ts         # IntersectionObserver-based scroll trigger
│
├── data/
│   ├── courses.ts           # 7 dummy courses with full metadata
│   ├── tutorials.ts         # 8 dummy YouTube tutorials
│   └── index.ts             # Stats, skills, nav links, topics
│
├── lib/
│   └── utils.ts             # cn(), formatNumber(), scrollToSection(), etc.
│
├── types/
│   └── index.ts             # All TypeScript interfaces
│
├── tailwind.config.ts       # darkMode: "class" + custom palette
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🌓 Theme System — How It Works (No FOUC)

This is the key fix you requested. Here's the complete strategy:

### Problem
Next.js App Router renders on the server with no access to `localStorage`.
If you set dark mode via React state, the page flashes light → dark on load.

### Solution — 3-Layer Approach

**Layer 1: Inline Blocking Script** (`app/layout.tsx`)
```tsx
// Runs synchronously BEFORE paint — no React hydration involved
<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
```

The script reads `localStorage['dskb-theme']` and sets `.dark` or `.light`
on `<html>` before any CSS or React loads. Zero flash.

**Layer 2: ThemeProvider** (`hooks/useTheme.tsx`)
```tsx
// Server renders with theme="dark" (safe default)
// After mount, reads real value from localStorage → syncs state
useEffect(() => {
  const stored = localStorage.getItem('dskb-theme')
  const resolved = stored === 'light' ? 'light' : 'dark'
  setTheme(resolved)
  applyTheme(resolved)
  setMounted(true)
}, [])
```

**Layer 3: `mounted` Guard** (in Navbar)
```tsx
// Only render the sun/moon icon after mount to avoid hydration mismatch
{mounted && (
  <AnimatePresence mode="wait">
    {theme === 'dark' ? <Sun /> : <Moon />}
  </AnimatePresence>
)}
```

**Layer 4: Tailwind `darkMode: "class"`** (`tailwind.config.ts`)
```ts
const config: Config = {
  darkMode: "class",  // ← reads .dark class on <html>
  // ...
}
```

**Layer 5: CSS Variables** (`globals.css`)
```css
:root, .dark { /* dark theme variables */ }
.light        { /* light theme variable overrides */ }
```

### Theme Toggle Flow
```
User clicks toggle
  → setTheme('light')
  → localStorage.setItem('dskb-theme', 'light')
  → document.documentElement.classList.remove('dark')
  → document.documentElement.classList.add('light')
  → Tailwind updates all dark: classes instantly
  → CSS variables update → smooth transition

User refreshes page
  → THEME_SCRIPT runs synchronously
  → Reads 'light' from localStorage
  → Sets .light on <html> BEFORE paint
  → React hydrates with matching state
  → Zero flash ✅
```

---

## 🎨 Design System

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `navy-950` | `#010b18` | Base background (dark) |
| `electric-500` | `#1a6bff` | Primary accent (electric blue) |
| `ochre-400` | `#e8890c` | Warm accent (calls to action) |
| `teal-400` | `#14b8a6` | Secondary accent |

### CSS Variables (both themes)
```
--bg-base          Page background
--bg-surface       Section background
--bg-elevated      Card/input background
--bg-card          Glassmorphism card bg
--bg-nav           Navbar background (+ blur)

--text-primary     Main text
--text-secondary   Subtext
--text-muted       Placeholder / meta
--text-accent      Highlighted text

--accent-electric  Electric blue (#1a6bff dark / #1a5fd4 light)
--accent-ochre     Warm orange (#e8890c / #c97108)
--accent-teal      Teal green
--accent-glow      Blue glow rgba

--border-subtle    Very faint border
--border-dim       Visible border
--border-accent    Blue-tinted border

--shadow-card      Card rest shadow
--shadow-hover     Card hover shadow
```

### Reusable Component Classes
```css
.glass        /* Glassmorphism: backdrop-blur + semi-transparent + border */
.glass-nav    /* Stronger blur for navbar */
.btn-primary  /* Electric blue gradient CTA */
.btn-secondary/* Outlined secondary */
.btn-ochre    /* Warm orange accent button */
.input-field  /* Styled form input with focus ring */
.topic-badge  /* Rounded topic tag chip */
.h-scroll     /* Horizontal scroll with scroll-snap */
.snap-item    /* Child of h-scroll */
.section-tag  /* Eyebrow label with lines */
.underline-link /* Link with animated underline on hover */
.text-gradient-blue   /* Blue gradient text */
.text-gradient-ochre  /* Ochre gradient text */
.text-gradient-mixed  /* Blue→ochre gradient */
```

---

## ⚡ Animation Guide

### Framer Motion
```tsx
// Section fade-in
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6 }}
>

// Card hover lift
<motion.article
  whileHover={{ y: -6, scale: 1.015 }}
  transition={{ type: "spring", stiffness: 300, damping: 22 }}
  style={{ willChange: "transform" }}
>

// Modal spring from top
<motion.div
  initial={{ opacity: 0, y: -80, scale: 0.93 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -50, scale: 0.95 }}
  transition={{ type: "spring", stiffness: 260, damping: 26 }}
>

// Nav active indicator (shared layout)
<motion.span layoutId="nav-indicator" />

// Theme icon swap
<AnimatePresence mode="wait">
  <motion.span
    key={theme}
    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
    animate={{ opacity: 1, rotate: 0, scale: 1 }}
    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
  >
```

### GSAP
```tsx
// Hero text entrance (staggered words)
gsap.fromTo(words,
  { opacity: 0, y: 40, rotateX: -25, filter: "blur(8px)" },
  { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    stagger: 0.1, duration: 0.8, ease: "power3.out" }
)

// Skill bar fill on scroll
gsap.fromTo(fill, { width: "0%" }, {
  width: `${skill.level}%`,
  scrollTrigger: { trigger: el, start: "top 85%" }
})

// Parallax orbs
gsap.to(".about-orb-a", {
  y: -90,
  scrollTrigger: { scrub: 1.5 }
})

// Feature list stagger
gsap.fromTo(".timeline-item",
  { opacity: 0, x: -24 },
  { opacity: 1, x: 0, stagger: 0.14 }
)
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next ^14.2` | Framework (App Router) |
| `react ^18.3` | UI runtime |
| `typescript ^5` | Type safety |
| `tailwindcss ^3.4` | Utility CSS (`darkMode: "class"`) |
| `framer-motion ^11` | Component animations |
| `gsap ^3.12` | Scroll animations (lazy imported) |
| `lucide-react ^0.395` | Icons |
| `clsx` + `tailwind-merge` | Class merging utility |

---

## 🔧 Adding a New Course

Edit `data/courses.ts`:

```ts
{
  id: "dsk-new-course",
  title: "Your Course Title",
  description: "Short description in Hindi",
  price: 999,
  originalPrice: 2999,
  discountPercent: 67,
  iconEmoji: "🎯",
  topic: "Python",        // Must be a CourseTopic from types/index.ts
  level: "Beginner",
  duration: "20 hours",
  lectures: 90,
  students: 500,
  rating: 4.8,
  language: "Hindi",
  tags: ["Python", "Beginner"],
  highlights: ["Feature 1", "Feature 2"],
  instructor: "Aryan Sharma",
  lastUpdated: "July 2025",
}
```

---

## ♿ Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA: `role="dialog"`, `aria-modal`, `aria-label`, `aria-expanded`, `aria-labelledby`
- ESC closes modal, focus trap in mobile drawer
- `:focus-visible` ring on all interactive elements
- `prefers-reduced-motion` respected by Framer Motion automatically
- Color contrast meets WCAG AA in both themes
- All icons have `aria-hidden="true"` or `aria-label`

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout change |
|------------|---------------|
| `sm` 640px | 2-col stats, row CTAs |
| `md` 768px | Desktop navbar visible |
| `lg` 1024px | 2-col about / contact |
| `xl` 1280px | 4-col stats |

---

© 2025 datasciencekibaatein · Made with ❤️ in India
