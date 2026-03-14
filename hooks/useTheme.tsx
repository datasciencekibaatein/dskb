"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Theme, ThemeContextValue } from "@/types";

// ─── Context ─────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  mounted: false,
});

// ─── Provider ────────────────────────────────────────────────────────────────
/**
 * ThemeProvider must wrap the app in layout.tsx.
 *
 * Strategy:
 * 1. Inline <script> in <head> reads localStorage BEFORE React hydrates
 *    → prevents flash of wrong theme (FOUC)
 * 2. State is initialised to "dark" on server, then synced to real value
 *    after mount to avoid hydration mismatch
 * 3. Theme is persisted in localStorage under key "dskb-theme"
 * 4. Tailwind `darkMode: "class"` reads the `.dark` class on <html>
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // After mount: read real preference from localStorage / DOM
  useEffect(() => {
    const stored = localStorage.getItem("dskb-theme") as Theme | null;
    const resolved: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : "dark"; // default dark

    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("dskb-theme", next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ─── DOM helper ───────────────────────────────────────────────────────────────
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
}

// ─── Inline script (exported for use in layout.tsx <head>) ───────────────────
/**
 * This script string runs SYNCHRONOUSLY before the page paints.
 * It prevents the flash of wrong theme on refresh.
 * Inject as: <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
 */
export const THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('dskb-theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
    document.documentElement.classList.add(theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();
