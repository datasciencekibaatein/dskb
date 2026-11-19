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

  // Brand colors (any CSS color). Used via Tailwind classes:
  //   bg-brand, text-brand, border-brand, bg-brand-dark, bg-accent, text-accent ...
  colors: {
    brand: "#5b21b6", // primary (violet)
    brandDark: "#3b0f80", // hover / dark sections
    accent: "#f59e0b", // highlights (amber)
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
