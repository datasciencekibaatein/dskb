"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, User, MessageSquare, Send, MapPin,
  Twitter, Github, Youtube, Linkedin,
  BookOpen, Instagram,
  CheckCircle, AlertCircle,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ContactFormData } from "@/types";
import { TOPICS } from "@/data/index";
import { supabase } from "@/lib/supabase";

const BLANK: ContactFormData = { name: "", email: "", topic: "", message: "" };

// ─── 🔗 UPDATE YOUR SOCIAL LINKS HERE ────────────────────────────────────────
const SOCIAL_LINKS = {
  youtube:   "https://www.youtube.com/@datasciencekibaatein",
  twitter:   "https://x.com/dskb01",
  github:    "https://github.com/datasciencekibaatein",
  linkedin:  "https://www.linkedin.com/in/dhruv6397",
  medium:    "https://medium.com/@datasciencekibaatein",
  instagram: "https://www.instagram.com/datasciencekibaatein",
};
// ─────────────────────────────────────────────────────────────────────────────

export function ContactSection() {
  const [form, setForm]       = useState<ContactFormData>(BLANK);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: sbError } = await supabase
      .from("contactme")
      .insert([{
        name:    form.name.trim(),
        email:   form.email.trim().toLowerCase(),
        topic:   form.topic,
        message: form.message.trim(),
      }]);

    setLoading(false);

    if (sbError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
    setForm(BLANK);
    setTimeout(() => setSent(false), 6000);
  };

  const inputStyle = (name: string) => ({
    background: "var(--bg-elevated)",
    border: `1px solid ${focused === name ? "var(--accent-electric)" : "var(--border-dim)"}`,
    color: "var(--text-primary)",
    boxShadow: focused === name ? "0 0 0 3px var(--accent-glow), 0 0 16px rgba(26,107,255,0.08)" : "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  });

  return (
    <Section id="contact">
      <SectionHeading
        tag="Contact"
        title="Get in "
        highlight="Touch"
        subtitle="Have a question, collaboration idea, or just want to say hello? We reply within 24 hours."
        center
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* LEFT — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 flex flex-col gap-5"
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-bold text-base mb-5" style={{ color: "var(--text-primary)" }}>Contact Information</h3>
            <div className="space-y-4">
              {[
                { icon: Mail,          label: "Email",         value: "datasciencekibaatein@gmail.com" },
                { icon: MapPin,        label: "Location",      value: "India (Remote Teaching Globally)" },
                { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:bg-electric-600/20"
                    style={{ background: "rgba(26,107,255,0.1)", color: "var(--accent-electric)" }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Follow Us ── */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Youtube,   label: "YouTube",   color: "hover:text-red-400",   sub: "20K+ Views", href: SOCIAL_LINKS.youtube   },
                { icon: Twitter,   label: "Twitter",   color: "hover:text-sky-400",   sub: "Updates",    href: SOCIAL_LINKS.twitter   },
                { icon: Github,    label: "GitHub",    color: "hover:text-white",     sub: "Code",       href: SOCIAL_LINKS.github    },
                { icon: Linkedin,  label: "LinkedIn",  color: "hover:text-blue-500",  sub: "Network",    href: SOCIAL_LINKS.linkedin  },
                { icon: BookOpen,  label: "Medium",    color: "hover:text-green-400", sub: "Articles",   href: SOCIAL_LINKS.medium    },
                { icon: Instagram, label: "Instagram", color: "hover:text-pink-400",  sub: "Reels",      href: SOCIAL_LINKS.instagram },
              ].map(({ icon: Icon, label, color, sub, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 ${color}`}
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                >
                  <Icon size={15} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
                    <p className="text-[10px]">{sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="glass rounded-2xl p-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  className="flex flex-col items-center justify-center py-14 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <CheckCircle size={28} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Message Received! 🎉</h3>
                  <p style={{ color: "var(--text-muted)" }}>We&apos;ll get back to you within 24 hours. Thank you!</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={onSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                        <User size={11} /> Your Name
                      </label>
                      <input id="name" type="text" name="name" value={form.name} onChange={onChange}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        placeholder="Jane Smith" required className="input-field" style={inputStyle("name")} />
                    </div>
                    <div>
                      <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                        <Mail size={11} /> Email Address
                      </label>
                      <input id="email" type="email" name="email" value={form.email} onChange={onChange}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        placeholder="jane@example.com" required className="input-field" style={inputStyle("email")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic" className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                      <MessageSquare size={11} /> Topic
                    </label>
                    <select id="topic" name="topic" value={form.topic} onChange={onChange}
                      onFocus={() => setFocused("topic")} onBlur={() => setFocused(null)}
                      required className="input-field w-full appearance-none cursor-pointer" style={inputStyle("topic")}>
                      <option value="" style={{ background: "var(--bg-elevated)" }}>Select a topic…</option>
                      {TOPICS.map((t) => (
                        <option key={t} value={t} style={{ background: "var(--bg-elevated)" }}>{t} Course / Tutorial</option>
                      ))}
                      <option value="other" style={{ background: "var(--bg-elevated)" }}>Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                      <MessageSquare size={11} /> Your Message
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={onChange}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      placeholder="Write your question or message here…" rows={5}
                      required className="input-field resize-none" style={inputStyle("message")} />
                    <p className="text-right text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{form.message.length}/500</p>
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                        <AlertCircle size={14} />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" rightIcon={<Send size={16} />}>
                    Send Message
                  </Button>
                  <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                    🔒 Your information is secure — we never share it with anyone.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}