"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import {
  Calendar, Clock, BookOpen, ChevronDown, ChevronUp,
  CheckCircle2, Mail, Zap, Shield, Radio, Lock,
  User, Phone, MapPin, Globe, Loader2, ArrowRight,
  AlertCircle, Info,
} from "lucide-react";
import { LIVE_CLASSES } from "@/data/liveClasses";
import { useAuth } from "@/hooks/useAuth";

// ── helpers ──────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-8 ${className}`}>{children}</div>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>
      {children}
    </h2>
  );
}

// ── Collapsible module row ───────────────────────────────────
function ModuleRow({ title, lessons, index }: { title: string; lessons: string[]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
          >
            {index + 1}
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
          <span className="text-[10px] ml-1" style={{ color: "var(--text-muted)" }}>
            {lessons.length} lessons
          </span>
        </div>
        {open ? <ChevronUp size={15} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={15} style={{ color: "var(--text-muted)" }} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-4 flex flex-col gap-2">
              {lessons.map((lesson, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  <BookOpen size={12} className="mt-0.5 shrink-0 text-electric-400" />
                  {lesson}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Enrollment modal ─────────────────────────────────────────
interface EnrollmentFormData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  mobile: string;
  email: string; // pre-filled from auth
}

function EnrollmentModal({
  isOpen,
  onClose,
  course,
  userEmail,
  userId
}: {
  isOpen: boolean;
  onClose: () => void;
  course: { id: string; title: string; price: number; slug: string };
  userEmail: string;
  userId: string;  
}) {
  const [step, setStep] = useState<"form" | "paying">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<EnrollmentFormData>({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "India",
    mobile: "",
    email: userEmail,
  });

  const set = (k: keyof EnrollmentFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  // ── Cashfree payment ──
  const handlePayment = async () => {
  
    console.log("🔴 handlePayment triggered");
    console.log("🔴 course:", course);
    console.log("🔴 form:", form);
    console.log("🔴 userId:", userId);

  setError("");
  setLoading(true);
  setStep("paying");

  try {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.id,
        courseName: course.title,
        courseSlug: course.slug,
        amount: course.price,
        customerEmail: form.email,
        customerPhone: form.mobile,
        customerName: `${form.firstName} ${form.lastName}`,
        firstName: form.firstName,
        lastName: form.lastName,
        city: form.city,
        state: form.state,
        country: form.country,
        userId: userId,
      }),
    });
    console.log("🔴 handlePayment triggered");
    console.log("🔴 course:", course);
    console.log("🔴 form:", form);
    console.log("🔴 userId:", userId);
    const data = await res.json();
    console.log("💳 session id:", data.payment_session_id);

    if (!data.payment_session_id) {
      throw new Error("No payment session received");
    }

    // Redirect to Cashfree hosted payment page
    window.location.href = `https://payments.cashfree.com/order/#${data.payment_session_id}`;
  } catch (err: any) {
    setError(err.message || "Payment initiation failed. Please try again.");
    setStep("form");
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
          style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div>
            <h3 className="font-display font-bold text-base" style={{ color: "var(--text-primary)" }}>
              Enrollment Form
            </h3>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{course.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-xs px-3 py-1 rounded-lg"
            style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
          >
            Cancel
          </button>
        </div>

        {/* Gmail notice */}
        <div
          className="mx-6 mt-5 px-4 py-3 rounded-xl flex items-start gap-3 text-xs"
          style={{ background: "rgba(26,107,255,0.08)", border: "1px solid rgba(26,107,255,0.2)", color: "var(--text-muted)" }}
        >
          <Mail size={14} className="shrink-0 mt-0.5 text-electric-400" />
          <span>
            After successful payment, your lecture links and class updates will be sent to{" "}
            <strong style={{ color: "var(--text-primary)" }}>{userEmail}</strong> via Gmail only.
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handlePayment(); }}
          className="p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <EnrollInput icon={<User size={13} />} label="First Name" value={form.firstName} onChange={set("firstName")} required />
            <EnrollInput icon={<User size={13} />} label="Last Name" value={form.lastName} onChange={set("lastName")} required />
          </div>

          <EnrollInput
            icon={<Phone size={13} />}
            label="Mobile Number"
            type="tel"
            value={form.mobile}
            onChange={set("mobile")}
            pattern="[6-9][0-9]{9}"
            placeholder="+91 98765 43210"
            required
          />

          <EnrollInput
            icon={<Mail size={13} />}
            label="Gmail (pre-filled)"
            type="email"
            value={form.email}
            onChange={set("email")}
            readOnly
            className="opacity-70"
          />

          <div className="grid grid-cols-2 gap-3">
            <EnrollInput icon={<MapPin size={13} />} label="City" value={form.city} onChange={set("city")} required />
            <EnrollInput icon={<MapPin size={13} />} label="State" value={form.state} onChange={set("state")} required />
          </div>

          <EnrollInput icon={<Globe size={13} />} label="Country" value={form.country} onChange={set("country")} required />

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 px-1">
              <AlertCircle size={13} /> {error}
            </div>
          )}

          {/* Price summary */}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Total Amount</span>
            <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              ₹{course.price.toLocaleString()}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3 !text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <>
                <Shield size={14} /> Proceed to Secure Payment <ArrowRight size={14} />
              </>
            )}
          </motion.button>

          <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
            🔒 Secured by Cashfree Payments · UPI · Cards · Net Banking
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

function EnrollInput({
  icon,
  label,
  className = "",
  ...props
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <div
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${className}`}
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        {icon}
        <input
          {...props}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
          style={{ color: "var(--text-primary)" }}
        />
      </div>
    </label>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function LiveCoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = LIVE_CLASSES.find((c) => c.slug === slug);
  const { user } = useAuth();
  const [enrollOpen, setEnrollOpen] = useState(false);

  if (!course) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── LEFT: course content ────────────────────────── */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            Home / Live Classes /{" "}
            <span style={{ color: "var(--text-primary)" }}>{course.title}</span>
          </p>

          {/* Title + meta */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold animate-pulse">
              <Radio size={9} /> LIVE CLASS
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border ${
                course.level === "Beginner"
                  ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                  : course.level === "Intermediate"
                  ? "bg-ochre-300/10 text-ochre-300 border-ochre-300/20"
                  : "bg-red-400/10 text-red-400 border-red-400/20"
              }`}
            >
              {course.level}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl mb-4" style={{ color: "var(--text-primary)" }}>
            {course.title}
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            {course.fullDescription}
          </p>

          {/* Why this course */}
          <Section>
            <H2>🎯 Why This Course?</H2>
            <div
              className="glass rounded-2xl p-5 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)", borderLeft: "3px solid var(--electric-500)" }}
            >
              {course.whyThisCourse}
            </div>
          </Section>

          {/* What you'll learn */}
          <Section>
            <H2>✅ What You Will Learn</H2>
            <ul className="flex flex-col gap-3">
              {course.whatYouWillLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Prerequisites */}
          <Section>
            <H2>📋 Prerequisites</H2>
            <ul className="flex flex-col gap-2">
              {course.prerequisites.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <Info size={13} className="text-electric-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          {/* Course curriculum (collapsible) */}
          <Section>
            <H2>📚 Course Curriculum</H2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              {course.modules.length} modules · {course.lecturesCount} live lectures
            </p>
            <div className="flex flex-col gap-2">
              {course.modules.map((mod, i) => (
                <ModuleRow key={i} index={i} title={mod.title} lessons={mod.lessons} />
              ))}
            </div>
          </Section>

          {/* Gmail notification note */}
          <div
            className="rounded-2xl px-5 py-4 flex items-start gap-4 text-sm"
            style={{ background: "rgba(26,107,255,0.07)", border: "1px solid rgba(26,107,255,0.2)" }}
          >
            <Mail size={18} className="text-electric-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                All updates delivered to your Gmail
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                After payment confirmation, lecture links, Zoom/Meet details, schedule changes, and recordings will be sent
                exclusively to your registered Gmail. Make sure to check it before each session.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: sticky course info card ──────────────── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="glass rounded-3xl overflow-hidden">
              {/* Thumbnail */}
              <div
                className="relative h-48 flex items-center justify-center text-7xl"
                style={{ background: course.thumbnailBg }}
              >
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold animate-pulse">
                  <Radio size={9} /> LIVE
                </div>
                {course.thumbnail}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)]/60 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-3xl" style={{ color: "var(--text-primary)" }}>
                    ₹{course.price.toLocaleString()}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm line-through" style={{ color: "var(--text-muted)" }}>
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {course.discountPercent && (
                  <span className="text-xs font-bold text-emerald-400 mb-4 block">
                    🎉 {course.discountPercent}% OFF — Limited Time
                  </span>
                )}

                {/* Details list */}
                <ul className="flex flex-col gap-3 my-5">
                  {[
                    { icon: <Calendar size={14} />, label: "Start Date", value: course.startDate },
                    { icon: <Clock size={14} />, label: "Timing", value: course.timing },
                    { icon: <BookOpen size={14} />, label: "Lectures", value: `${course.lecturesCount} live sessions` },
                    { icon: <Clock size={14} />, label: "Duration", value: course.duration },
                    {
                      icon: <Lock size={14} />,
                      label: "Enrollment Deadline",
                      value: course.enrollmentDeadline,
                    },
                  ].map(({ icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 text-electric-400">{icon}</span>
                      <div>
                        <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                          {label}
                        </p>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Seats */}
                {course.seatsLeft !== undefined && (
                  <div
                    className={`text-center text-xs font-bold py-2 rounded-xl mb-4 ${
                      course.seatsLeft <= 5
                        ? "bg-red-500/20 text-red-400"
                        : "bg-ochre-400/10 text-ochre-300"
                    }`}
                  >
                    {course.seatsLeft <= 5
                      ? `🔥 Only ${course.seatsLeft} seats left!`
                      : `${course.seatsLeft} seats available`}
                  </div>
                )}

                {/* Enroll button */}
                {course.enrollmentClosed ? (
                  <div
                    className="w-full py-3 rounded-xl text-center text-sm font-bold"
                    style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
                  >
                    🚫 Enrollment Closed
                  </div>
                ) : !user ? (
                  <a href="/sign-in" className="btn-primary w-full !py-3 !text-sm flex items-center justify-center gap-2">
                    <Lock size={14} /> Sign In to Enroll
                  </a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setEnrollOpen(true)}
                    className="btn-primary w-full !py-3 !text-sm flex items-center justify-center gap-2"
                  >
                    <Zap size={14} /> Enroll Now
                  </motion.button>
                )}

                <p className="text-[10px] text-center mt-3" style={{ color: "var(--text-muted)" }}>
                  🔒 Secure payment via Cashfree · Instant Gmail confirmation
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Enrollment modal */}
      <AnimatePresence>
        {enrollOpen && user && (
          <EnrollmentModal
            isOpen={enrollOpen}
            onClose={() => setEnrollOpen(false)}
            course={{ id: course.id, title: course.title, price: course.price, slug: course.slug }}
            userEmail={user.email ?? ""}
            userId={user.id ?? ""}
          />
        )}
      </AnimatePresence>
    </main>
  );
}