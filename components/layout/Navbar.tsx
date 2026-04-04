"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Menu, X, BarChart3, ChevronRight,
  LogIn, UserPlus, LogOut, ChevronDown,
} from "lucide-react";
import { useTheme }  from "@/hooks/useTheme";
import { useAuth }   from "@/contexts/AuthContext";
import { UserMenu, UserAvatar } from "@/components/auth/UserMenu";
import { NAV_LINKS } from "@/data/index";
import { scrollToSection } from "@/lib/utils";
import type { NavLink } from "@/types";

// ─── Desktop dropdown panel ───────────────────────────────────────────────────
function NavDropdown({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <li ref={ref} role="none" className="relative">
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={open}
        className="relative flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
        style={{ color: "var(--text-secondary)" }}
      >
        {link.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--text-muted)" }}
        >
          <ChevronDown size={13} />
        </motion.span>
        {open && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute inset-0 rounded-lg"
            style={{ background: "rgba(26,107,255,0.12)", border: "1px solid rgba(26,107,255,0.25)" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10" />
      </motion.button>

      <AnimatePresence>
        {open && link.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{   opacity: 0, y: -8,   scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[300px] rounded-2xl overflow-hidden z-50"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35), 0 0 30px rgba(26,107,255,0.06)",
            }}
            role="menu"
          >
            <div className="h-[2px] bg-gradient-to-r from-electric-600 via-electric-400 to-teal-400" />
            <div className="p-2">
              {link.dropdown.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1,  x: 0   }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setOpen(false); onNavigate(item.href); }}
                  role="menuitem"
                  className="w-full flex items-start gap-3.5 px-4 py-3.5 rounded-xl text-left transition-colors group"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm group-hover:text-electric-300 transition-colors" style={{ color: "var(--text-primary)" }}>
                        {item.label}
                      </p>
                      <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "var(--accent-electric)" }} />
                    </div>
                    {item.description && (
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                Click an option to jump to that section
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// ─── Plain nav link ───────────────────────────────────────────────────────────
function NavItem({
  link,
  isActive,
  onNavigate,
}: {
  link: NavLink;
  isActive: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <li role="none">
      <motion.a
        href={link.href}
        onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
        role="menuitem"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 block ${isActive ? "text-electric-300" : "hover:text-white"}`}
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
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { isAuthenticated, openAuthModal, signOut, user } = useAuth();
  const [scrolled,        setScrolled]        = useState(false);
  const [activeSection,   setActive]          = useState("home");
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV_LINKS.flatMap((l) =>
        l.dropdown
          ? l.dropdown.map((d) => d.href.replace("#", ""))
          : [l.href.replace("#", "")]
      );
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    setMobileOpen(false);
    setMobileAccordion(null);
    scrollToSection(href.replace("#", ""));
  }, []);

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

          {/* ── LOGO — change the text and icon here ── */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavigate("#home"); }}
            className="flex items-center gap-2.5 shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1a6bff,#0050ff)" }}
            >
              <BarChart3 size={18} className="text-white relative z-10" />
              <div className="absolute inset-0 animate-pulse-blue" />
            </div>
            <div className="flex flex-col -space-y-1">
              {/* Split your brand name across these two lines however you like */}
              <span className="font-display font-bold text-[15px] leading-tight text-gradient-blue">
                datascienceki
              </span>
              <span className="font-display font-bold text-[15px] leading-tight text-gradient-ochre">
                baatein
              </span>
            </div>
          </motion.a>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => {
              const isActive =
                activeSection === link.href.replace("#", "") ||
                (link.dropdown?.some((d) => d.href.replace("#", "") === activeSection) ?? false);

              return link.dropdown?.length ? (
                <NavDropdown key={link.label} link={link} onNavigate={handleNavigate} />
              ) : (
                <NavItem key={link.label} link={link} isActive={isActive} onNavigate={handleNavigate} />
              );
            })}
          </ul>

          {/* ── Right side ── */}
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
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{   opacity: 0, rotate: 90,   scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.button>

            {/* Auth — swaps between UserMenu and Sign In/Up buttons */}
            <AnimatePresence mode="wait">
              {isAuthenticated && user ? (
                <motion.div key="user-menu" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                  <UserMenu />
                </motion.div>
              ) : (
                <motion.div key="auth-btns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hidden sm:flex items-center gap-2">
                  <motion.button onClick={handleSignIn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all hover:bg-white/5"
                    style={{ color: "var(--text-secondary)" }}>
                    <LogIn size={14} /> Sign In
                  </motion.button>
                  <motion.button onClick={handleSignUp} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary !px-5 !py-2.5 !text-xs !rounded-xl flex items-center gap-1.5">
                    <UserPlus size={13} /> Sign Up Free
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/6"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle menu" aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={mobileOpen ? "x" : "menu"} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(1,11,24,0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)} />

            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[290px] flex flex-col"
              style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border-subtle)" }}
              role="dialog" aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="font-display font-bold text-base text-gradient-blue">datasciencekibaatein</span>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/6" style={{ color: "var(--text-muted)" }}>
                  <X size={18} />
                </motion.button>
              </div>

              {/* User strip (when logged in) */}
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
              <nav className="flex-1 p-5 flex flex-col gap-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const hasDropdown = !!link.dropdown?.length;
                  const isAccOpen   = mobileAccordion === link.label;

                  if (hasDropdown) {
                    return (
                      <div key={link.label}>
                        <motion.button
                          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                          onClick={() => setMobileAccordion(isAccOpen ? null : link.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                          style={{
                            color: "var(--text-secondary)",
                            background: isAccOpen ? "rgba(26,107,255,0.08)" : undefined,
                            border: isAccOpen ? "1px solid rgba(26,107,255,0.2)" : "1px solid transparent",
                          }}
                        >
                          {link.label}
                          <motion.span animate={{ rotate: isAccOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={14} style={{ opacity: 0.6 }} />
                          </motion.span>
                        </motion.button>

                        <AnimatePresence>
                          {isAccOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22 }} className="overflow-hidden"
                            >
                              <div className="pl-4 pt-1 pb-1 flex flex-col gap-1">
                                {link.dropdown!.map((item) => (
                                  <button key={item.href} onClick={() => handleNavigate(item.href)}
                                    className="flex items-start gap-3 px-4 py-3 rounded-xl text-left hover:bg-white/5 transition-colors"
                                    style={{ border: "1px solid var(--border-subtle)" }}>
                                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                                    <div>
                                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                                      {item.description && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.description}</p>}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a key={link.label} href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavigate(link.href); }}
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
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
                  <button onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border hover:bg-red-400/5 transition-all"
                    style={{ borderColor: "rgba(239,68,68,0.25)", color: "#f87171" }}>
                    <LogOut size={14} /> Sign Out
                  </button>
                ) : (
                  <>
                    <button onClick={handleSignIn}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border hover:bg-white/5 transition-all"
                      style={{ borderColor: "var(--border-dim)", color: "var(--text-secondary)" }}>
                      <LogIn size={14} /> Sign In
                    </button>
                    <button onClick={handleSignUp} className="w-full btn-primary flex items-center justify-center gap-2">
                      <UserPlus size={14} /> Sign Up Free
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