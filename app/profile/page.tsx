"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Edit3, Save, X, Camera,
  BookOpen, CreditCard, CheckCircle2, Clock, AlertCircle,
  LogOut, Shield, Calendar, Award, TrendingUp, ChevronRight,
  Loader2, Upload,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Types ─────────────────────────────────────────────────────
interface Enrollment {
  id: string;
  created_at: string;
  course_name: string;
  course_slug: string;
  amount: number;
  payment_status: "PENDING" | "PAID" | "FAILED";
  order_id: string;
  paid_at: string | null;
}

interface ProfileForm {
  full_name: string;
  phone: string;
  city: string;
  state: string;
  country: string;
}

// ── Helpers ───────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
    PAID:    { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   icon: <CheckCircle2 size={11} />, label: "Paid" },
    PENDING: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  icon: <Clock size={11} />,        label: "Pending" },
    FAILED:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   icon: <AlertCircle size={11} />,  label: "Failed" },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}30` }}>
      {s.icon}{s.label}
    </span>
  );
}

function Avatar({ name, size = 80 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center font-display font-bold select-none"
      style={{
        width: size, height: size, fontSize: size * 0.36,
        background: "linear-gradient(135deg, #1a6bff, #0050ff)",
        color: "#fff", flexShrink: 0,
      }}>
      {initials}
    </div>
  );
}

// ── Tab definitions ───────────────────────────────────────────
const TABS = [
  { id: "overview",  label: "Overview",        icon: User },
  { id: "courses",   label: "My Courses",       icon: BookOpen },
  { id: "payments",  label: "Payment History",  icon: CreditCard },
  { id: "settings",  label: "Edit Profile",     icon: Edit3 },
] as const;
type Tab = typeof TABS[number]["id"];

// ── Main Page ─────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab]       = useState<Tab>("overview");
  const [enrollments, setEnrollments]   = useState<Enrollment[]>([]);
  const [loadingData, setLoadingData]   = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch enrollments
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoadingData(true);
      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setEnrollments(data ?? []);
      setLoadingData(false);
    };
    fetch();
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-electric-400" />
      </div>
    );
  }

  const paidCourses   = enrollments.filter((e) => e.payment_status === "PAID");
  const totalSpent    = enrollments.filter((e) => e.payment_status === "PAID").reduce((s, e) => s + Number(e.amount), 0);
  const joinDate      = new Date(user.joinedAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Hero card ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #1a6bff, transparent)", transform: "translate(-30%, -30%)" }} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative">
            <div className="relative">
              <Avatar name={user.name} size={80} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 flex items-center justify-center"
                style={{ borderColor: "var(--bg-surface)" }}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl mb-1" style={{ color: "var(--text-primary)" }}>
                {user.name}
              </h1>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{user.email}</p>
              <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1.5"><Calendar size={12} />Joined {joinDate}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={12} />{paidCourses.length} course{paidCourses.length !== 1 ? "s" : ""} enrolled</span>
                <span className="flex items-center gap-1.5"><Award size={12} />Student</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 shrink-0">
              {[
                { label: "Enrolled",   value: paidCourses.length },
                { label: "Spent",      value: `₹${totalSpent.toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-xl sm:text-2xl" style={{ color: "var(--text-primary)" }}>{value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Tab bar ───────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 p-1 glass rounded-2xl w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ color: activeTab === id ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {activeTab === id && (
                <motion.div layoutId="profile-tab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={14} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab content ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview"  && <OverviewTab user={user} paidCourses={paidCourses} totalSpent={totalSpent} joinDate={joinDate} onTabChange={setActiveTab} />}
            {activeTab === "courses"   && <CoursesTab enrollments={enrollments} loading={loadingData} />}
            {activeTab === "payments"  && <PaymentsTab enrollments={enrollments} loading={loadingData} />}
            {activeTab === "settings"  && <SettingsTab user={user} onSignOut={signOut} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

// ── Overview Tab ──────────────────────────────────────────────
function OverviewTab({ user, paidCourses, totalSpent, joinDate, onTabChange }: {
  user: any; paidCourses: Enrollment[]; totalSpent: number; joinDate: string;
  onTabChange: (t: Tab) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: quick info */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Account Info</h3>
          <ul className="flex flex-col gap-3">
            {[
              { icon: User,    label: "Name",    value: user.name },
              { icon: Mail,    label: "Email",   value: user.email },
              { icon: Calendar,label: "Joined",  value: joinDate },
              { icon: Shield,  label: "Role",    value: "Student" },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                  <Icon size={13} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm font-medium truncate max-w-[180px]" style={{ color: "var(--text-primary)" }}>{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>Quick Actions</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "View My Courses",   tab: "courses"  as Tab, icon: BookOpen },
              { label: "Payment History",   tab: "payments" as Tab, icon: CreditCard },
              { label: "Edit Profile",      tab: "settings" as Tab, icon: Edit3 },
            ].map(({ label, tab, icon: Icon }) => (
              <button key={tab} onClick={() => onTabChange(tab)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                <span className="flex items-center gap-2"><Icon size={13} />{label}</span>
                <ChevronRight size={13} style={{ color: "var(--text-muted)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: recent enrollments */}
      <div className="lg:col-span-2 glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Recent Enrollments</h3>
          <button onClick={() => onTabChange("courses")}
            className="text-xs font-medium hover:opacity-70" style={{ color: "var(--accent-electric)" }}>
            View all
          </button>
        </div>

        {paidCourses.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <BookOpen size={32} className="mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No enrollments yet</p>
            <a href="/#live-classes" className="mt-3 text-xs font-semibold text-electric-400 hover:opacity-80">Browse Live Classes →</a>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {paidCourses.slice(0, 4).map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(26,107,255,0.1)", color: "#1a6bff" }}>
                    <BookOpen size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{e.course_name}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      {new Date(e.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>₹{Number(e.amount).toLocaleString()}</span>
                  <StatusBadge status={e.payment_status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Courses Tab ───────────────────────────────────────────────
function CoursesTab({ enrollments, loading }: { enrollments: Enrollment[]; loading: boolean }) {
  const paid = enrollments.filter((e) => e.payment_status === "PAID");

  if (loading) return <LoadingSkeleton />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
          My Courses <span className="text-sm font-normal ml-2" style={{ color: "var(--text-muted)" }}>({paid.length})</span>
        </h2>
      </div>

      {paid.length === 0 ? (
        <EmptyState icon={BookOpen} title="No courses yet" subtitle="Enroll in a live class to get started" link="/#live-classes" linkLabel="Browse Live Classes" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paid.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <a href={`/live/${e.course_slug}`}
                className="glass rounded-2xl p-5 flex flex-col gap-3 hover:border-electric-500/40 transition-colors block"
                style={{ border: "1px solid var(--border-subtle)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(26,107,255,0.1)", color: "#1a6bff" }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-snug mb-1" style={{ color: "var(--text-primary)" }}>{e.course_name}</h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Enrolled {new Date(e.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2"
                  style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>₹{Number(e.amount).toLocaleString()}</span>
                  <StatusBadge status={e.payment_status} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Payments Tab ──────────────────────────────────────────────
function PaymentsTab({ enrollments, loading }: { enrollments: Enrollment[]; loading: boolean }) {
  if (loading) return <LoadingSkeleton />;

  const total = enrollments.filter((e) => e.payment_status === "PAID").reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>Payment History</h2>
        {enrollments.length > 0 && (
          <div className="text-right">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total spent</p>
            <p className="font-bold text-lg text-emerald-400">₹{total.toLocaleString()}</p>
          </div>
        )}
      </div>

      {enrollments.length === 0 ? (
        <EmptyState icon={CreditCard} title="No transactions yet" subtitle="Your payment history will appear here" link="/#live-classes" linkLabel="Browse Live Classes" />
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-4 gap-4 px-5 py-3 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)" }}>
            <span>Course</span><span>Order ID</span><span>Amount</span><span>Status</span>
          </div>
          <ul>
            {enrollments.map((e, i) => (
              <li key={e.id}
                className={`px-5 py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-center ${i !== enrollments.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{e.course_name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {new Date(e.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <p className="text-xs font-mono truncate" style={{ color: "var(--text-muted)" }}>{e.order_id}</p>
                <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>₹{Number(e.amount).toLocaleString()}</p>
                <StatusBadge status={e.payment_status} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────
function SettingsTab({ user, onSignOut }: { user: any; onSignOut: () => void }) {
  const [form, setForm] = useState<ProfileForm>({
    full_name: user.name ?? "",
    phone:     user.phone ?? "",
    city:      user.city ?? "",
    state:     user.state ?? "",
    country:   user.country ?? "India",
  });
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");

  const set = (k: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error: err } = await supabase.auth.updateUser({
      data: {
        full_name: form.full_name,
        phone:     form.phone,
        city:      form.city,
        state:     form.state,
        country:   form.country,
      },
    });

    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display font-bold text-lg mb-6" style={{ color: "var(--text-primary)" }}>Edit Profile</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Personal Information</h3>

          <SettingsInput label="Full Name"    icon={User}    value={form.full_name} onChange={set("full_name")} placeholder="Your full name" />
          <SettingsInput label="Phone Number" icon={Phone}   value={form.phone}     onChange={set("phone")}     placeholder="+91 98765 43210" type="tel" />
          <SettingsInput label="Email"        icon={Mail}    value={user.email}     onChange={() => {}}         placeholder="" readOnly />

          <div className="grid grid-cols-2 gap-4">
            <SettingsInput label="City"    icon={MapPin} value={form.city}    onChange={set("city")}    placeholder="Your city" />
            <SettingsInput label="State"   icon={MapPin} value={form.state}   onChange={set("state")}   placeholder="Your state" />
          </div>
          <SettingsInput label="Country" icon={MapPin} value={form.country} onChange={set("country")} placeholder="India" />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 px-1">
            <AlertCircle size={14} />{error}
          </div>
        )}

        <motion.button
          type="submit" disabled={saving}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="btn-primary !py-3 flex items-center justify-center gap-2 w-fit !px-8">
          {saving
            ? <><Loader2 size={15} className="animate-spin" />Saving…</>
            : saved
            ? <><CheckCircle2 size={15} />Saved!</>
            : <><Save size={15} />Save Changes</>}
        </motion.button>
      </form>

      {/* Danger zone */}
      <div className="mt-8 glass rounded-2xl p-5"
        style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
        <h3 className="font-semibold text-sm mb-1" style={{ color: "#f87171" }}>Sign Out</h3>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>You will be signed out from your account on this device.</p>
        <motion.button
          onClick={onSignOut}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-red-400/10"
          style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
          <LogOut size={14} />Sign Out
        </motion.button>
      </div>
    </div>
  );
}

// ── Reusable sub-components ───────────────────────────────────
function SettingsInput({ label, icon: Icon, readOnly, ...props }:
  { label: string; icon: React.ElementType; readOnly?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</span>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{
          background: readOnly ? "var(--bg-base)" : "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
          opacity: readOnly ? 0.6 : 1,
        }}>
        <Icon size={14} />
        <input {...props} readOnly={readOnly}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "var(--text-primary)" }} />
      </div>
    </label>
  );
}

function EmptyState({ icon: Icon, title, subtitle, link, linkLabel }:
  { icon: React.ElementType; title: string; subtitle: string; link: string; linkLabel: string }) {
  return (
    <div className="glass rounded-2xl p-12 text-center flex flex-col items-center">
      <Icon size={36} className="mb-4 opacity-20" style={{ color: "var(--text-muted)" }} />
      <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
      <a href={link} className="text-xs font-semibold text-electric-400 hover:opacity-80">{linkLabel} →</a>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass rounded-2xl p-5 animate-pulse">
          <div className="h-4 rounded w-1/3 mb-3" style={{ background: "var(--bg-elevated)" }} />
          <div className="h-3 rounded w-2/3" style={{ background: "var(--bg-elevated)" }} />
        </div>
      ))}
    </div>
  );
}