"use client";

/**
 * UserMenu — Navbar profile section shown when authenticated
 *
 * Shows user avatar (initials if no photo) with animated dropdown:
 * - User info header
 * - Quick links: My Profile, My Courses, Settings
 * - Sign out with confirmation animation
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen, Settings, LogOut, ChevronDown, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import type { User as UserType } from "@/types";

/** Generate initials from name */
function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Deterministic gradient from email string */
function getAvatarGradient(email: string): string {
  const hash = email.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradients = [
    "linear-gradient(135deg,#1a6bff,#0050ff)",
    "linear-gradient(135deg,#14b8a6,#0e7a6a)",
    "linear-gradient(135deg,#e8890c,#c97108)",
    "linear-gradient(135deg,#8b5cf6,#6d28d9)",
    "linear-gradient(135deg,#ef4444,#dc2626)",
    "linear-gradient(135deg,#ec4899,#db2777)",
  ];
  return gradients[hash % gradients.length];
}

/** Small avatar circle used in navbar */
export function UserAvatar({ user, size = 32 }: { user: UserType; size?: number }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center text-white font-bold select-none shrink-0"
      style={{
        width: size, height: size,
        background: user.avatar ? undefined : getAvatarGradient(user.email),
        fontSize: size * 0.35,
        backgroundImage: user.avatar ? `url(${user.avatar})` : undefined,
        backgroundSize: "cover",
      }}
      aria-label={`${user.name}'s avatar`}
    >
      {!user.avatar && getInitials(user.name)}
    </div>
  );
}

// ─── Dropdown menu item ───────────────────────────────────────────────────────
function MenuItem({
  icon: Icon, label, sublabel, onClick, danger = false,
}: {
  icon: React.ElementType; label: string; sublabel?: string;
  onClick: () => void; danger?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
      style={{
        color: danger ? "#f87171" : "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = danger
          ? "rgba(239,68,68,0.08)"
          : "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: danger ? "rgba(239,68,68,0.1)" : "rgba(26,107,255,0.1)",
          color: danger ? "#f87171" : "var(--accent-electric)",
        }}
      >
        <Icon size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: danger ? "#f87171" : "var(--text-primary)" }}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{sublabel}</p>
        )}
      </div>
    </motion.button>
  );
}

// ─── UserMenu main component ──────────────────────────────────────────────────
export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // All hooks must be called unconditionally before any early return.
  // Moving "if (!user) return null" here (after all hooks) prevents the
  // "Rendered fewer hooks than expected" crash when user becomes null on sign-out.

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const handleSignOut = () => {
    setOpen(false);
    signOut();
  };

  // Early return AFTER all hooks
  if (!user) return null;

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-colors"
        style={{
          background: open ? "var(--bg-elevated)" : "transparent",
          border: `1px solid ${open ? "var(--border-dim)" : "transparent"}`,
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        <UserAvatar user={user} size={30} />
        <span className="hidden sm:block text-sm font-medium max-w-[90px] truncate" style={{ color: "var(--text-primary)" }}>
          {user.name.split(" ")[0]}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--text-muted)" }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="absolute right-0 top-[calc(100%+8px)] w-[260px] rounded-2xl overflow-hidden z-50"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(26,107,255,0.06)",
            }}
            role="menu"
            aria-label="User menu options"
          >
            {/* Accent bar */}
            <div className="h-[2px] bg-gradient-to-r from-electric-600 to-teal-400" />

            {/* User info */}
            <div
              className="px-4 py-4 flex items-center gap-3 border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <UserAvatar user={user} size={40} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                  {user.name}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {user.email}
                </p>
                <div
                  className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: "rgba(26,107,255,0.12)", color: "var(--accent-electric)" }}
                >
                  <BarChart3 size={9} />
                  {user.role === "admin" ? "Admin" : "Student"}
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <MenuItem
                icon={User}
                label="My Profile"
                sublabel="View and edit your profile"
                onClick={() => navigate("/profile")}
              />
              <MenuItem
                icon={BookOpen}
                label="My Courses"
                sublabel={`${user.enrolledCourses.length} enrolled`}
                onClick={() => navigate("/profile")}
              />
              <MenuItem
                icon={Settings}
                label="Settings"
                sublabel="Preferences & notifications"
                onClick={() => navigate("/profile")}
              />

              {/* Divider */}
              <div className="my-1.5 mx-2 h-px" style={{ background: "var(--border-subtle)" }} />

              <MenuItem
                icon={LogOut}
                label="Sign Out"
                onClick={handleSignOut}
                danger
              />
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 border-t text-center"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                Joined {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}