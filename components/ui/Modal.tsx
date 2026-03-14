"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: ModalSize;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm:   "max-w-md",
  md:   "max-w-2xl",
  lg:   "max-w-4xl",
  xl:   "max-w-6xl",
  full: "max-w-[95vw]",
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "xl",
  className,
}: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="modal-overlay"
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Scroll wrapper */}
          <div
            className="fixed inset-0 z-[101] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            <div className="flex min-h-full items-start justify-center px-4 pt-12 pb-10">
              <motion.div
                key="modal-panel"
                initial={{ opacity: 0, y: -80, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.9,
                }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative w-full rounded-3xl overflow-hidden border",
                  sizeClasses[size],
                  className
                )}
                style={{
                  // Uses CSS variables so theme toggle works correctly
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(26,107,255,0.1)",
                }}
              >
                {/* Accent top bar */}
                <div className="h-[3px] bg-gradient-to-r from-electric-600 via-electric-400 to-teal-400" />

                {/* Header */}
                {(title || true) && (
                  <div
                    className="flex items-start justify-between px-7 py-5 border-b"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <div>
                      {title && (
                        <h2
                          id="modal-title"
                          className="font-display font-bold text-xl"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {title}
                        </h2>
                      )}
                      {subtitle && (
                        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.12, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 rounded-xl transition-colors hover:bg-white/8 ml-4 shrink-0"
                      style={{ color: "var(--text-muted)" }}
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                )}

                {/* Body */}
                <div className="p-7 max-h-[76vh] overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}