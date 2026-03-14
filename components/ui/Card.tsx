"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  className,
  hoverLift = true,
  glowOnHover = false,
  onClick,
  as: Tag = "div",
}: CardProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      onClick={onClick}
      whileHover={
        hoverLift
          ? { y: -6, scale: 1.015 }
          : undefined
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "glass rounded-2xl overflow-hidden",
        glowOnHover && "hover:shadow-electric",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </MotionTag>
  );
}
