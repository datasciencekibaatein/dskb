"use client";

/**
 * AuthModal — Supabase edition
 * ────────────────────────────
 * Sign In + Sign Up unified popup.
 *
 * Changes from mock version:
 *  - Social buttons call signInWithOAuth("google" | "github") — real OAuth redirect
 *  - Sign Up handles the "email confirmation required" state from Supabase
 *  - Demo hint removed (no mock users)
 *  - Everything else (animations, tab pill, password strength, a11y) unchanged
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Eye, EyeOff, Mail, Lock, User,
  BarChart3, CheckCircle, AlertCircle, ArrowRight, Github, Chrome,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { SignInFormData, SignUpFormData, AuthTab } from "@/types";

// ─── Password strength ────────────────────────────────────────────────────────
function pwStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8)           s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  const map = [
    { label: "",        color: "transparent" },
    { label: "Weak",    color: "#ef4444" },
    { label: "Fair",    color: "#f59e0b" },
    { label: "Good",    color: "#3b82f6" },
    { label: "Strong",  color: "#22c55e" },
  ];
  return { score: s, ...map[s] };
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-xs mt-1.5 text-red-400"
        >
          <AlertCircle size={11} />{msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function AuthInput({
  id, label, icon: Icon, type = "text", value, onChange, placeholder, error, rightSlot,
}: {
  id: string; label: string; icon: React.ElementType; type?: string;
  value: string; onChange: (v: string) => void; placeholder: string;
  error?: string; rightSlot?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
      <div
        className="relative flex items-center rounded-xl overflow-hidden transition-all duration-200"
        style={{
          background: "var(--bg-elevated)",
          border: `1px solid ${error ? "#ef4444" : focused ? "var(--accent-electric)" : "var(--border-dim)"}`,
          boxShadow: focused ? (error ? "0 0 0 3px rgba(239,68,68,0.15)" : "0 0 0 3px var(--accent-glow)") : "none",
        }}
      >
        <span className="pl-3.5 shrink-0" style={{ color: error ? "#ef4444" : focused ? "var(--accent-electric)" : "var(--text-muted)" }}>
          <Icon size={15} />
        </span>
        <input
          id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={
            type === "password"
              ? id.includes("confirm") || id.includes("signup") ? "new-password" : "current-password"
              : "off"
          }
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
          style={{ color: "var(--text-primary)" }}
        />
        {rightSlot}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function SocialBtn({
  icon: Icon, label, color, onClick,
}: { icon: React.ElementType; label: string; color?: string; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-dim)", color: color || "var(--text-secondary)" }}
    >
      <Icon size={15} />{label}
    </motion.button>
  );
}

// ─── Sign In ──────────────────────────────────────────────────────────────────
const BLANK_IN: SignInFormData = { email: "", password: "", rememberMe: false };

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const { signIn, signInWithOAuth, closeAuthModal } = useAuth();
  const [form, setForm] = useState<SignInFormData>(BLANK_IN);
  const [errors, setErrors] = useState<Partial<Record<keyof SignInFormData, string>>>({});
  const [globalErr, setGlobalErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const set = (k: keyof SignInFormData) => (v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalErr("");
    if (!validate()) return;
    setLoading(true);
    const res = await signIn(form);
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => closeAuthModal(), 1200);
    } else {
      setGlobalErr(res.error ?? "Sign in failed.");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    const res = await signInWithOAuth!(provider);
    if (!res.success) {
      setGlobalErr(res.error ?? "OAuth sign-in failed.");
      setOauthLoading(null);
    }
    // On success the browser redirects — no need to reset state.
  };

  if (success) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
        <CheckCircle size={30} className="text-emerald-400" />
      </motion.div>
      <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Welcome back! 🎉</h3>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>Signing you in…</p>
    </motion.div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <AnimatePresence>
        {globalErr && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl text-sm"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
            <AlertCircle size={15} />{globalErr}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthInput id="si-email" label="Email Address" icon={Mail} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={errors.email} />

      <AuthInput
        id="si-password" label="Password" icon={Lock}
        type={showPw ? "text" : "password"} value={form.password} onChange={set("password")}
        placeholder="Your password" error={errors.password}
        rightSlot={
          <button type="button" onClick={() => setShowPw(!showPw)} className="pr-3.5 transition-colors" style={{ color: "var(--text-muted)" }} aria-label={showPw ? "Hide" : "Show"}>
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => set("rememberMe")(!form.rememberMe)}
            tabIndex={0} role="checkbox" aria-checked={form.rememberMe}
            className="w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: form.rememberMe ? "var(--accent-electric)" : "var(--bg-elevated)", border: `1px solid ${form.rememberMe ? "var(--accent-electric)" : "var(--border-dim)"}` }}>
            {form.rememberMe && <CheckCircle size={10} className="text-white fill-white" />}
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Remember me</span>
        </label>
        <button type="button" className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--accent-electric)" }}>Forgot password?</button>
      </div>

      <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }} whileTap={{ scale: 0.98 }}
        className="w-full btn-primary !py-3.5 !rounded-xl flex items-center justify-center gap-2">
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in…</>
          : <>Sign In <ArrowRight size={16} /></>}
      </motion.button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>or continue with</span>
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      <div className="flex gap-3">
        <SocialBtn icon={Chrome} label={oauthLoading === "google" ? "Redirecting…" : "Google"} color="#ef4444" onClick={() => handleOAuth("google")} />
        <SocialBtn icon={Github} label={oauthLoading === "github" ? "Redirecting…" : "GitHub"} onClick={() => handleOAuth("github")} />
      </div>

      <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
        New here?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold hover:opacity-80 transition-opacity" style={{ color: "var(--accent-electric)" }}>Create an account</button>
      </p>
    </form>
  );
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────
const BLANK_UP: SignUpFormData = { name: "", email: "", password: "", confirmPassword: "", agreeToTerms: false };

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const { signUp, signInWithOAuth, closeAuthModal } = useAuth();
  const [form, setForm] = useState<SignUpFormData>(BLANK_UP);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
  const [globalErr, setGlobalErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);
  const [success, setSuccess] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false); // Supabase email confirmation required
  const [showPw, setShowPw] = useState(false);
  const [showCo, setShowCo] = useState(false);

  const set = (k: keyof SignUpFormData) => (v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));
  const strength = pwStrength(form.password);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter your full name (min 2 chars)";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.agreeToTerms) e.agreeToTerms = "You must agree to the terms";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalErr("");
    if (!validate()) return;
    setLoading(true);
    const res = await signUp(form);
    setLoading(false);
    if (res.success) {
      if (!res.user) {
        // Supabase email confirmation is ON — no session yet
        setConfirmEmail(true);
      } else {
        setSuccess(true);
        setTimeout(() => closeAuthModal(), 1400);
      }
    } else {
      setGlobalErr(res.error ?? "Sign up failed.");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    const res = await signInWithOAuth!(provider);
    if (!res.success) {
      setGlobalErr(res.error ?? "OAuth sign-in failed.");
      setOauthLoading(null);
    }
  };

  // ── Email confirmation pending ───────────────────────────────────────────
  if (confirmEmail) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center gap-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(26,107,255,0.12)", border: "1px solid rgba(26,107,255,0.3)" }}>
        <Mail size={30} className="text-blue-400" />
      </motion.div>
      <div>
        <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Check your inbox 📬</h3>
        <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--text-muted)" }}>
          We sent a confirmation link to <strong style={{ color: "var(--text-primary)" }}>{form.email}</strong>. Click it to activate your account.
        </p>
      </div>
      <button onClick={closeAuthModal} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--accent-electric)" }}>Got it, close</button>
    </motion.div>
  );

  // ── Instant sign-in success (email confirmation OFF) ─────────────────────
  if (success) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
        <CheckCircle size={30} className="text-emerald-400" />
      </motion.div>
      <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Account created! 🚀</h3>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>Welcome to datasciencekibaatein!</p>
    </motion.div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <AnimatePresence>
        {globalErr && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl text-sm"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
            <AlertCircle size={15} />{globalErr}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthInput id="su-name" label="Full Name" icon={User} value={form.name} onChange={set("name")} placeholder="Your full name" error={errors.name} />
      <AuthInput id="su-email" label="Email Address" icon={Mail} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={errors.email} />

      <div>
        <AuthInput
          id="su-password" label="Password" icon={Lock}
          type={showPw ? "text" : "password"} value={form.password} onChange={set("password")}
          placeholder="Min 8 characters" error={errors.password}
          rightSlot={
            <button type="button" onClick={() => setShowPw(!showPw)} className="pr-3.5" style={{ color: "var(--text-muted)" }}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />
        {form.password && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1,2,3,4].map((i) => (
                <motion.div key={i} className="flex-1 h-1 rounded-full"
                  animate={{ background: i <= strength.score ? strength.color : "var(--border-dim)" }}
                  transition={{ duration: 0.3 }} />
              ))}
            </div>
            {strength.label && <p className="text-[11px]" style={{ color: strength.color }}>{strength.label} password</p>}
          </motion.div>
        )}
      </div>

      <AuthInput
        id="su-confirm" label="Confirm Password" icon={Lock}
        type={showCo ? "text" : "password"} value={form.confirmPassword} onChange={set("confirmPassword")}
        placeholder="Re-enter password" error={errors.confirmPassword}
        rightSlot={
          <button type="button" onClick={() => setShowCo(!showCo)} className="pr-3.5" style={{ color: "var(--text-muted)" }}>
            {showCo ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <div
            onClick={() => set("agreeToTerms")(!form.agreeToTerms)}
            tabIndex={0} role="checkbox" aria-checked={form.agreeToTerms}
            className="w-4 h-4 rounded flex items-center justify-center mt-0.5 shrink-0 cursor-pointer transition-all duration-200"
            style={{ background: form.agreeToTerms ? "var(--accent-electric)" : "var(--bg-elevated)", border: `1px solid ${errors.agreeToTerms ? "#ef4444" : form.agreeToTerms ? "var(--accent-electric)" : "var(--border-dim)"}` }}>
            {form.agreeToTerms && <CheckCircle size={10} className="text-white fill-white" />}
          </div>
          <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            I agree to the{" "}
            <a href="#" className="font-semibold hover:opacity-80" style={{ color: "var(--accent-electric)" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="font-semibold hover:opacity-80" style={{ color: "var(--accent-electric)" }}>Privacy Policy</a>
          </span>
        </label>
        <FieldError msg={errors.agreeToTerms} />
      </div>

      <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }} whileTap={{ scale: 0.98 }}
        className="w-full btn-primary !py-3.5 !rounded-xl flex items-center justify-center gap-2">
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating account…</>
          : <>Create Free Account <ArrowRight size={16} /></>}
      </motion.button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>or sign up with</span>
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      <div className="flex gap-3">
        <SocialBtn icon={Chrome} label={oauthLoading === "google" ? "Redirecting…" : "Google"} color="#ef4444" onClick={() => handleOAuth("google")} />
        <SocialBtn icon={Github} label={oauthLoading === "github" ? "Redirecting…" : "GitHub"} onClick={() => handleOAuth("github")} />
      </div>

      <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold hover:opacity-80 transition-opacity" style={{ color: "var(--accent-electric)" }}>Sign in</button>
      </p>
    </form>
  );
}

// ─── AuthModal ────────────────────────────────────────────────────────────────
export function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal } = useAuth();

  useEffect(() => {
    if (!authModalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeAuthModal(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [authModalOpen, closeAuthModal]);

  const switchTo = useCallback((tab: AuthTab) => openAuthModal(tab), [openAuthModal]);

  return (
    <AnimatePresence>
      {authModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div key="auth-bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[90]"
            style={{ background: "rgba(1,11,24,0.88)", backdropFilter: "blur(12px)" }}
            onClick={closeAuthModal}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[91] overflow-y-auto flex items-start justify-center px-4 pt-14 pb-10">
            <motion.div key="auth-panel"
              initial={{ opacity: 0, y: -70, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 270, damping: 28, mass: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog" aria-modal="true" aria-label="Authentication"
              className="w-full max-w-md rounded-3xl overflow-hidden"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(26,107,255,0.08)" }}>

              {/* Accent bar */}
              <div className="h-[3px] bg-gradient-to-r from-electric-600 via-electric-400 to-teal-400" />

              {/* Header row */}
              <div className="px-7 pt-6 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a6bff,#0050ff)" }}>
                    <BarChart3 size={15} className="text-white" />
                  </div>
                  <span className="font-display font-bold text-sm text-gradient-blue">datasciencekibaatein</span>
                </div>
                <motion.button whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={closeAuthModal}
                  className="p-2 rounded-xl hover:bg-white/6" style={{ color: "var(--text-muted)" }} aria-label="Close">
                  <X size={18} />
                </motion.button>
              </div>

              {/* Tab switcher */}
              <div className="px-7 pt-5 pb-0">
                <div className="relative flex rounded-xl p-1" style={{ background: "var(--bg-elevated)" }} role="tablist">
                  <motion.div layout layoutId="auth-tab-pill" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-y-1 rounded-lg"
                    style={{ left: authModalTab === "signin" ? "4px" : "50%", right: authModalTab === "signin" ? "50%" : "4px", background: "var(--accent-electric)", boxShadow: "0 2px 10px rgba(26,107,255,0.4)" }} />
                  {(["signin", "signup"] as AuthTab[]).map((tab) => (
                    <button key={tab} onClick={() => switchTo(tab)} role="tab" aria-selected={authModalTab === tab}
                      className="relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200"
                      style={{ color: authModalTab === tab ? "#fff" : "var(--text-muted)" }}>
                      {tab === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form body */}
              <div className="px-7 pt-5 pb-7">
                <AnimatePresence mode="wait">
                  <motion.div key={authModalTab}
                    initial={{ opacity: 0, x: authModalTab === "signin" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: authModalTab === "signin" ? 20 : -20 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}>
                    {authModalTab === "signin"
                      ? <SignInForm onSwitch={() => switchTo("signup")} />
                      : <SignUpForm onSwitch={() => switchTo("signin")} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}