// ============================================================
//  BRAND CONFIG — change things here to rebrand the whole site.
// ============================================================

export const siteConfig = {
  name: "DataScience ki Baatein",
  tagline: "Data Science, AI & ML — Hindi aur English mein, simple tareeke se.",
  description:
    "Practical data science, AI and machine learning courses in Hindi and English — recorded and live.",

  // Logo: text is always shown. Set `imageSrc` (e.g. "/logo.png" in /public)
  // to show an image next to it.
  logo: {
    text: "DataScience ki Baatein",
    shortText: "DSkB", // used inside the round badge
    imageSrc: null as string | null,
  },

  // Brand colors — "Deep Navy & Cyan". Each becomes a CSS variable and a
  // Tailwind class (see globals.css), e.g. navy950 → bg-navy-950.
  colors: {
    // Same in light and dark mode
    navy950: "#0A1931", // hero/CTA gradient, button text
    navy800: "#12305A",
    ocean: "#0E4A6E",
    cyan: "#22D3EE", // accent — use on dark backgrounds or behind navy text
    blue: "#3B82F6", // gradient partner

    // Theme tokens — switch with light/dark mode.
    // Tailwind classes: bg-page, bg-card, border-line, text-heading,
    // text-body, text-muted, text-teal-text, bg-subtle
    // Inputs/selects use bg-card + text-heading.
    light: {
      bg: "#F5F8FA", // page background
      card: "#FFFFFF", // cards, inputs, dropdowns
      border: "#DDE5EB",
      heading: "#0A1931", // titles, prices, labels
      body: "#334155", // paragraphs, descriptions, list items
      muted: "#5F6F86", // meta: durations, struck-through price, captions (#64748B nudged darker to pass AA on the page bg)
      tealText: "#0E7490", // discount %, small accents
      subtle: "#EEF3F7", // badge / hover backgrounds
    },
    dark: {
      bg: "#071226",
      card: "#0D1E38",
      border: "#1C3254",
      heading: "#E6EEF6",
      body: "#C3D1DF",
      muted: "#9FB3C8",
      tealText: "#5EEAD4",
      subtle: "#132A4A",
    },
  },

  copyrightYear: 2026, // shown in the footer

  youtubeUrl: "https://www.youtube.com/@datasciencekibaatein",

  nav: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Free Learning", href: "/free-learning" },
    { label: "About", href: "/about" },
  ],

  footerLinks: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Contact", href: "/contact" },
  ],
};
