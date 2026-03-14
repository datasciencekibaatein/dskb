"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, BarChart3, ChevronRight, LogIn, UserPlus, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu, UserAvatar } from "@/components/auth/UserMenu";
import { NAV_LINKS } from "@/data/index";
import { scrollToSection } from "@/lib/utils";

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { isAuthenticated, openAuthModal, signOut, user } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Only track scroll-based active section on the home page
      if (pathname !== "/") return;
      const ids = NAV_LINKS
        .filter((l) => l.href.startsWith("#"))
        .map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 110) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Mark /about or /docs as active when on those pages
  useEffect(() => {
    if (pathname === "/about") setActiveSection("about");
    else if (pathname === "/docs") setActiveSection("docs");
    else if (pathname === "/")  setActiveSection("home");
  }, [pathname]);

  // When navigating from another page to /#section, scroll after mount
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    // Small delay to let the page render before scrolling
    const t = setTimeout(() => scrollToSection(hash), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      // Real route (e.g. /about, /docs)
      router.push(href);
    } else {
      // Anchor link (e.g. #courses, #contact)
      const sectionId = href.replace("#", "");
      if (pathname === "/") {
        // Already on home page — just scroll
        scrollToSection(sectionId);
      } else {
        // On another page — go home first, then scroll to section
        router.push(`/#${sectionId}`);
      }
    }
  }, [router, pathname]);

  const handleSignIn  = useCallback(() => { setMobileOpen(false); openAuthModal("signin"); }, [openAuthModal]);
  const handleSignUp  = useCallback(() => { setMobileOpen(false); openAuthModal("signup"); }, [openAuthModal]);
  const handleSignOut = useCallback(() => { setMobileOpen(false); signOut(); }, [signOut]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 glass-nav" : "py-5 bg-transparent"}`}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" aria-label="Main navigation">

          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); pathname === "/" ? scrollToSection("home") : router.push("/"); }}
            className="flex items-center gap-2.5 group shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="datasciencekibaatein — home"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a6bff, #0050ff)" }}>
              <BarChart3 size={18} className="text-white relative z-10" />
              <div className="absolute inset-0 animate-pulse-blue" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-display font-bold text-[15px] leading-tight text-gradient-blue">datascienceki</span>
              <span className="font-display font-bold text-[15px] leading-tight text-gradient-ochre">baatein</span>
            </div>
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "").replace("/", "");
              const isActive = activeSection === id;
              return (
                <li key={link.label} role="none">
                  <motion.a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    role="menuitem"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive ? "text-electric-300" : "hover:text-white"}`}
                    style={{ color: isActive ? undefined : "var(--text-secondary)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(26,107,255,0.12)", border: "1px solid rgba(26,107,255,0.25)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/6"
              style={{ color: "var(--text-secondary)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {mounted && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.2 }}>
                    {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.button>

            <AnimatePresence mode="wait">
              {isAuthenticated && user ? (
                <motion.div key="user-menu"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                  <UserMenu />
                </motion.div>
              ) : (
                <motion.div key="auth-btns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="hidden sm:flex items-center gap-2">
                  <motion.button onClick={handleSignIn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all hover:bg-white/5"
                    style={{ color: "var(--text-secondary)" }}>
                    <LogIn size={14} />Sign In
                  </motion.button>
                  <motion.button onClick={handleSignUp} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary !px-5 !py-2.5 !text-xs !rounded-xl flex items-center gap-1.5">
                    <UserPlus size={13} />Sign Up Free
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/6"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-menu">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={mobileOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}>
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(1,11,24,0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)} />

            <motion.div id="mobile-menu"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[290px] flex flex-col"
              style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border-subtle)" }}
              role="dialog" aria-modal="true" aria-label="Navigation menu">

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="font-display font-bold text-base text-gradient-blue">datasciencekibaatein</span>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-white/6"
                  style={{ color: "var(--text-muted)" }} aria-label="Close menu">
                  <X size={18} />
                </motion.button>
              </div>

              {/* Authenticated user strip */}
              {isAuthenticated && user && (
                <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border-subtle)" }}>
                  <UserAvatar user={user} size={38} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>{user.name}</p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{user.email}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex-1 p-5 flex flex-col gap-2 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const id = link.href.replace("#", "").replace("/", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "" : "hover:bg-white/5"}`}
                      style={{
                        background: isActive ? "rgba(26,107,255,0.12)" : undefined,
                        border: isActive ? "1px solid rgba(26,107,255,0.25)" : "1px solid transparent",
                        color: isActive ? "var(--text-accent)" : "var(--text-secondary)",
                      }}>
                      {link.label}
                      <ChevronRight size={14} style={{ opacity: 0.5 }} />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom auth */}
              <div className="p-5 border-t flex flex-col gap-3" style={{ borderColor: "var(--border-subtle)" }}>
                {isAuthenticated ? (
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-red-400/5"
                    style={{ borderColor: "rgba(239,68,68,0.25)", color: "#f87171" }}>
                    <LogOut size={14} />Sign Out
                  </motion.button>
                ) : (
                  <>
                    <button onClick={handleSignIn}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
                      style={{ borderColor: "var(--border-dim)", color: "var(--text-secondary)" }}>
                      <LogIn size={14} />Sign In
                    </button>
                    <button onClick={handleSignUp} className="w-full btn-primary flex items-center justify-center gap-2">
                      <UserPlus size={14} />Sign Up Free
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}