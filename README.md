# datasciencekibaatein 🧠📊

India ka #1 Hindi Data Science platform — Next.js 14 App Router + TypeScript website with live class enrollment, Cashfree payments, and Supabase backend.

🌐 **Live:** [datasciencekibaatein.com](https://datasciencekibaatein.com) · [dskb-dhruv.netlify.app](https://dskb-dhruv.netlify.app)

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
│   ├── globals.css               # All CSS: theme vars, Tailwind, animations
│   ├── layout.tsx                # Root layout: FOUC-prevention + ThemeProvider + Cashfree SDK
│   ├── page.tsx                  # Homepage (server component, composes sections)
│   ├── payment-status/
│   │   └── page.tsx              # Payment result page (success / failed / pending)
│   └── live/
│       └── [slug]/
│           └── page.tsx          # Live course detail page + enrollment modal + Cashfree payment
│
├── app/api/
│   ├── create-order/
│   │   └── route.ts              # Creates Cashfree order + saves PENDING enrollment to Supabase
│   ├── order-status/
│   │   └── route.ts              # Checks Cashfree order status + updates Supabase if PAID
│   ├── cashfree-webhook/
│   │   └── route.ts              # Receives Cashfree payment notifications + marks PAID in Supabase
│   └── youtube/
│       └── route.ts              # YouTube API proxy
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky nav, mobile drawer, theme toggle
│   │   └── Footer.tsx            # Links, socials, copyright
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       # Headline (GSAP), CTA, floating keywords
│   │   ├── StatsSection.tsx      # Animated counters (IntersectionObserver)
│   │   ├── AboutSection.tsx      # Founder card, skills (GSAP bar fill), timeline
│   │   ├── CoursesSection.tsx    # H-scroll paid courses (Upcoming badge) + modal grid
│   │   ├── LiveClassesSection.tsx# Live class cards grid + auth gate
│   │   ├── TutorialsSection.tsx  # YouTube cards H-scroll + modal
│   │   └── ContactSection.tsx    # Animated form with success state
│   │
│   └── ui/
│       ├── AuthModal.tsx         # Sign-in / Sign-up modal (Supabase auth)
│       ├── Button.tsx            # Reusable (variants: primary/secondary/ochre/ghost)
│       ├── Card.tsx              # Glassmorphism card
│       ├── Modal.tsx             # Spring drop-from-top modal (ESC + outside click)
│       ├── ParticleCanvas.tsx    # Canvas particle system with data science glyphs
│       └── Section.tsx           # Section wrapper + SectionHeading
│
├── hooks/
│   ├── useTheme.tsx              # Theme provider + hook + THEME_SCRIPT (no FOUC)
│   ├── useAuth.ts                # Supabase auth hook → returns { user, loading, logout }
│   ├── useCounter.ts             # Animated counter (rAF + easeOutCubic)
│   └── useInView.ts              # IntersectionObserver-based scroll trigger
│
├── data/
│   ├── courses.ts                # Paid courses with full metadata
│   ├── liveClasses.ts            # Live classes data — add/remove courses here
│   ├── tutorials.ts              # YouTube tutorials
│   └── index.ts                  # Stats, skills, nav links, topics
│
├── lib/
│   └── utils.ts                  # cn(), formatNumber(), scrollToSection(), etc.
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── middleware.ts                  # Bypasses localtunnel password screen for API routes
├── netlify.toml                   # Netlify build config + Next.js plugin
├── tailwind.config.ts             # darkMode: "class" + custom palette
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🔐 Environment Variables

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cashfree
CASHFREE_APP_ID=your_app_id
CASHFREE_SECRET_KEY=your_secret_key
CASHFREE_ENV=production   # or sandbox

# App
NEXT_PUBLIC_BASE_URL=https://datasciencekibaatein.com
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

---

## 💳 Payment Flow

```
User clicks Enroll
       ↓
AuthModal (if not logged in) → Supabase sign-in/sign-up
       ↓
EnrollmentModal opens → user fills details
       ↓
POST /api/create-order
  → Calls Cashfree API → gets payment_session_id
  → Saves PENDING enrollment to Supabase enrollments table
  → Returns { order_id, payment_session_id }
       ↓
Browser redirects to payments.cashfree.com/#session_id
       ↓
User pays (UPI / Card / Net Banking)
       ↓
Cashfree redirects to /payment-status?order_id=...&slug=...
       ↓
GET /api/order-status → checks Cashfree → updates Supabase if PAID
       ↓
Cashfree also POSTs to /api/cashfree-webhook → marks PAID in Supabase
       ↓
Student receives Gmail notification with lecture links
```

---

## 🗄️ Supabase Database

### enrollments table
```sql
create table enrollments (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz default now(),
  user_id          uuid references auth.users(id),
  first_name       text not null,
  last_name        text not null,
  email            text not null,
  mobile           text not null,
  city             text,
  state            text,
  country          text default 'India',
  course_id        text not null,
  course_name      text not null,
  course_slug      text not null,
  order_id         text unique not null,
  payment_session_id text,
  amount           numeric not null,
  currency         text default 'INR',
  payment_status   text default 'PENDING',  -- PENDING | PAID | FAILED
  paid_at          timestamptz
);
```

---

## 📚 Adding a New Live Class

Edit `data/liveClasses.ts` — copy the template at the bottom:

```ts
{
  id: "lc-004",
  slug: "your-course-slug",          // used in URL /live/your-course-slug
  title: "Your Course Title",
  description: "Short card description",
  fullDescription: "Full detail page description",
  thumbnail: "🎯",                   // emoji shown on card
  thumbnailBg: "linear-gradient(135deg,#000,#111,#222)",
  instructor: "Instructor Name",
  instructorTitle: "Role · Company",
  duration: "6 Weeks",
  lecturesCount: 18,
  timing: "Sat · 7:00 PM – 9:00 PM IST",
  startDate: "September 1, 2025",
  enrollmentDeadline: "August 28, 2025",
  enrollmentClosed: false,           // set true to close enrollment
  price: 3999,
  originalPrice: 6999,
  discountPercent: 43,
  level: "Intermediate",
  tags: ["Tag1", "Tag2", "Tag3"],
  prerequisites: ["Prerequisite 1"],
  whatYouWillLearn: ["Outcome 1", "Outcome 2"],
  whyThisCourse: "Why this course matters.",
  modules: [
    { title: "Module 1 – Title", lessons: ["Lesson A", "Lesson B"] },
  ],
  seatsLeft: 15,
}
```

---

## 🔧 Adding a New Paid Course

Edit `data/courses.ts`:

```ts
{
  id: "dsk-new-course",
  title: "Your Course Title",
  description: "Short description",
  price: 999,
  originalPrice: 2999,
  discountPercent: 67,
  iconEmoji: "🎯",
  topic: "Python",
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

## 🌓 Theme System — No FOUC

5-layer approach to prevent flash of unstyled content:

1. **Inline blocking script** in `layout.tsx` — reads localStorage before paint
2. **ThemeProvider** — syncs React state after mount
3. **`mounted` guard** — prevents hydration mismatch on icons
4. **Tailwind `darkMode: "class"`** — reads `.dark` on `<html>`
5. **CSS Variables** — instant theme switching via variable overrides

---

## 🌐 Deployment

### Netlify (Production)
- Connected to GitHub — auto deploys on every push to `main`
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

### Environment Variables
Set all variables from `.env.local` in Netlify → Site Settings → Environment Variables. Trigger redeploy after any change.

### Cashfree Webhook
```
https://datasciencekibaatein.com/api/cashfree-webhook
```
Events: `PAYMENT_SUCCESS_WEBHOOK`, `PAYMENT_FAILED_WEBHOOK`, `PAYMENT_USER_DROPPED_WEBHOOK`

---

## 🧪 Local Development with Tunnel

```bash
# Terminal 1
npm run dev

# Terminal 2
npx localtunnel --port 3000 --subdomain your-name

# Get your IP for tunnel password
curl https://ipv4.icanhazip.com
```

Update `.env.local`:
```env
NEXT_PUBLIC_BASE_URL=https://your-name.loca.lt
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next ^14.2` | Framework (App Router) |
| `react ^18.3` | UI runtime |
| `typescript ^5` | Type safety |
| `tailwindcss ^3.4` | Utility CSS |
| `framer-motion ^11` | Component animations |
| `gsap ^3.12` | Scroll animations |
| `lucide-react ^0.395` | Icons |
| `@supabase/supabase-js` | Auth + Database |
| `clsx` + `tailwind-merge` | Class merging |

---

## ♿ Accessibility

- Semantic HTML throughout
- ARIA roles, labels, and modal attributes
- ESC closes modals, focus trap in mobile drawer
- `:focus-visible` ring on all interactive elements
- `prefers-reduced-motion` respected by Framer Motion
- WCAG AA color contrast in both themes

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout change |
|------------|---------------|
| `sm` 640px | 2-col stats, row CTAs |
| `md` 768px | Desktop navbar visible |
| `lg` 1024px | 2-col about / contact / course detail |
| `xl` 1280px | 4-col stats |

---

© 2025 datasciencekibaatein · Made with ❤️ in India