"use client";

/**
 * /profile — User profile dashboard
 *
 * - Protected route: redirects to / if not authenticated
 * - Shows user info, enrolled courses, account settings
 * - "Sign Out" with confirmation
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, ArrowLeft, BookOpen, Settings, LogOut,
  CheckCircle, Clock, Award, TrendingUp, Edit3, Mail,
  Calendar, Shield,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/auth/UserMenu";
import { COURSES } from "@/data/courses";

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string | number; color: string;
}) {
  return (
    <motion.div whileHover={{ y: -3 }} className="glass rounded-2xl p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18`, color }}>
        <Icon size={20} />
      </div>
      <div>
        <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>{value}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Tab content ──────────────────────────────────────────────────────────────
type ProfileTab = "overview" | "courses" | "settings";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Auth guard — wait for hydration then redirect if needed
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, router]);

  // Always wrap signOut in startTransition so the Supabase onAuthStateChange
  // callback never fires mid-render (causes finishRenderingHooks crash).
  const handleSignOut = () => {
    setShowSignOutConfirm(false);
    signOut();
    // Delay redirect by one tick so Supabase auth state settles before
    // React tries to re-render this protected page as unauthenticated.
    setTimeout(() => router.push("/"), 50);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-bg">
        <div className="data-grid" aria-hidden="true" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-t-transparent"
          style={{ borderColor: "var(--accent-electric)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const enrolledCourses = COURSES.filter((c) => user.enrolledCourses.includes(c.id));

  const TABS: { id: ProfileTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview",   icon: TrendingUp },
    { id: "courses",  label: "My Courses", icon: BookOpen   },
    { id: "settings", label: "Settings",   icon: Settings   },
  ];

  return (
    <div className="min-h-screen hero-bg relative overflow-hidden" style={{ paddingTop: "88px" }}>
      <div className="data-grid" aria-hidden="true" />

      {/* Ambient */}
      <div
        className="orb w-[500px] h-[500px]"
        style={{ top: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(26,107,255,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={14} />Back to home
          </Link>
        </div>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-electric-600 via-electric-400 to-teal-400" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <UserAvatar user={user} size={72} />
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-electric)", border: "2px solid var(--bg-base)" }}
                aria-label="Edit avatar"
              >
                <Edit3 size={10} className="text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-display font-bold text-2xl sm:text-3xl mb-1" style={{ color: "var(--text-primary)" }}>
                    {user.name}
                  </h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
                      <Mail size={13} />{user.email}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(26,107,255,0.12)", color: "var(--accent-electric)" }}>
                      <Shield size={9} className="inline mr-1" />
                      {user.role === "admin" ? "Admin" : "Student"}
                    </span>
                  </div>
                  <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    <Calendar size={11} />
                    Member since{" "}
                    {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                {/* Sign out button */}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSignOutConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                  style={{ borderColor: "rgba(239,68,68,0.25)", color: "#f87171" }}
                >
                  <LogOut size={14} />Sign Out
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <StatCard icon={BookOpen}    label="Courses Enrolled" value={user.enrolledCourses.length} color="var(--accent-electric)" />
            <StatCard icon={CheckCircle} label="Completed"        value={0}                           color="#22c55e" />
            <StatCard icon={Clock}       label="Hours Learned"    value="12h"                         color="var(--accent-ochre)" />
            <StatCard icon={Award}       label="Certificates"     value={0}                           color="var(--accent-teal)" />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-2xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ color: activeTab === tab.id ? "#fff" : "var(--text-muted)" }}>
              {activeTab === tab.id && (
                <motion.div layoutId="profile-tab" className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--accent-electric)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}>

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h2 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
                    Welcome back, {user.name.split(" ")[0]}! 👋
                  </h2>
                  <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
                    You're on your way to mastering Data Science. Keep learning and building skills
                    that will accelerate your career. Your enrolled courses are ready whenever you are.
                  </p>
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
                  {user.enrolledCourses.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-4xl mb-3">📚</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        No courses yet.{" "}
                        <Link href="/#courses" className="font-semibold hover:opacity-80" style={{ color: "var(--accent-electric)" }}>
                          Browse courses
                        </Link>{" "}
                        to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enrolledCourses.map((c) => (
                        <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                          <span className="text-2xl">{c.iconEmoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{c.title}</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>0% complete · {c.lectures} lectures</p>
                          </div>
                          <button className="btn-primary !px-3 !py-1.5 !text-xs !rounded-lg shrink-0">Continue</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-5" style={{ color: "var(--text-primary)" }}>My Enrolled Courses</h2>
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-5xl mb-4">🎓</p>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>No courses yet</h3>
                    <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Enroll in your first course to start learning</p>
                    <Link href="/#courses"><button className="btn-primary">Browse Courses</button></Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {enrolledCourses.map((c, i) => (
                      <motion.div key={c.id}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="rounded-2xl p-4 flex items-start gap-3"
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                        <span className="text-3xl">{c.iconEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-2 mb-1" style={{ color: "var(--text-primary)" }}>{c.title}</p>
                          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{c.duration} · {c.lectures} lectures</p>
                          <div className="h-1.5 rounded-full" style={{ background: "var(--border-dim)" }}>
                            <div className="h-full w-0 rounded-full" style={{ background: "var(--accent-electric)" }} />
                          </div>
                          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>0% complete</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-5">
                <div className="glass rounded-2xl p-6">
                  <h2 className="font-semibold text-lg mb-5" style={{ color: "var(--text-primary)" }}>Account Information</h2>
                  <div className="space-y-4">
                    {[
                      { label: "Full Name",      value: user.name,                                  editable: true  },
                      { label: "Email Address",  value: user.email,                                 editable: false },
                      { label: "Account ID",     value: user.id,                                    editable: false },
                      { label: "Role",           value: user.role === "admin" ? "Administrator" : "Student", editable: false },
                    ].map(({ label, value, editable }) => (
                      <div key={label} className="flex items-center justify-between gap-4 p-4 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                          <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{value}</p>
                        </div>
                        {editable && (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-white/5"
                            style={{ borderColor: "var(--border-dim)", color: "var(--text-muted)" }}>
                            <Edit3 size={12} />Edit
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="glass rounded-2xl p-6" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                  <h3 className="font-semibold mb-1 text-red-400">Danger Zone</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>These actions cannot be undone.</p>
                  <button
                    onClick={() => setShowSignOutConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-red-400/5"
                    style={{ borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }}
                  >
                    <LogOut size={14} />Sign Out of All Devices
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sign Out confirmation dialog */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(1,11,24,0.8)", backdropFilter: "blur(8px)" }}
              onClick={() => setShowSignOutConfirm(false)}
            />
            <div className="fixed inset-0 z-[51] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-3xl p-7 max-w-sm w-full text-center"
              >
                <div className="text-4xl mb-3">👋</div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Sign out?</h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  You'll need to sign in again to access your courses and profile.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSignOutConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
                    style={{ borderColor: "var(--border-dim)", color: "var(--text-secondary)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}