"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ochre" | "ghost" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  "aria-label"?: string;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ochre: "btn-ochre",
  ghost: "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/5",
  danger: "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 transition-all duration-200",
};

const sizeMap: Record<ButtonSize, string> = {
  xs: "!px-3 !py-1.5 !text-xs !rounded-lg",
  sm: "!px-4 !py-2 !text-xs",
  md: "!px-6 !py-3 !text-sm",
  lg: "!px-8 !py-4 !text-base !rounded-2xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled,
  loading,
  type = "button",
  leftIcon,
  rightIcon,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      className={cn(
        variantMap[variant],
        sizeMap[size],
        (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {loading ? (
        <>
          <span
            className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
