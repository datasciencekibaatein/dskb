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
  // Tailwind class, e.g. navy950 → bg-navy-950 / text-navy-950,
  // tealText → text-teal-text, border → border-line, bg → bg-page.
  // Gradients in globals.css read these same variables.
  colors: {
    navy950: "#0A1931", // primary dark, headings
    navy800: "#12305A",
    ocean: "#0E4A6E",
    cyan: "#22D3EE", // accent — use on dark backgrounds or behind navy text
    blue: "#3B82F6", // gradient partner
    bg: "#F5F8FA", // page background
    card: "#FFFFFF",
    border: "#DDE5EB",
    tealText: "#0E7490", // discount %, small accents on light backgrounds
  },

  copyrightYear: 2026, // shown in the footer

  youtubeUrl: "https://www.youtube.com/@datasciencekibaatein",

  nav: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
  ],

  footerLinks: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Contact", href: "/contact" },
  ],
};
