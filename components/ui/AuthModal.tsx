"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  redirectMessage?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, redirectMessage }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
          },
        },
      });
      if (error) throw error;
    }
    onSuccess();
  } catch (err: any) {
    setError(err.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="glass rounded-3xl p-8 w-full max-w-md relative"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="text-2xl mb-1">🔐</div>
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h2>
              {redirectMessage && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{redirectMessage}</p>
              )}
            </div>

            {/* Mode toggle */}
            <div
              className="flex rounded-xl p-1 mb-6"
              style={{ background: "var(--bg-elevated)" }}
            >
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    mode === m
                      ? "bg-electric-500 text-white shadow-lg"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === "signup" && (
                <div className="flex gap-3">
                  <InputField
                    icon={<User size={14} />}
                    placeholder="First name"
                    value={form.firstName}
                    onChange={set("firstName")}
                    required
                  />
                  <InputField
                    icon={<User size={14} />}
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={set("lastName")}
                    required
                  />
                </div>
              )}

              <InputField
                icon={<Mail size={14} />}
                placeholder="Email address"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
              />

              <div className="relative">
                <InputField
                  icon={<Lock size={14} />}
                  placeholder="Password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 px-1">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3 !text-sm flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Sign In" : "Create Account"}
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Google / social – hook up to your provider */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="mt-3 w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}
              onClick={() => {/* trigger Google OAuth */}}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small reusable input
function InputField({
  icon,
  ...props
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl w-full"
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
  );
}