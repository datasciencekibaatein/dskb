"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Section Wrapper ─────────────────────────────────────────────────────────
interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn("relative z-10 py-20 md:py-28 px-4 sm:px-6", className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
);
Section.displayName = "Section";

// ─── Section Heading ──────────────────────────────────────────────────────────
interface SectionHeadingProps {
  tag?: string;       // Eyebrow tag text
  title: string;      // Main title (plain part)
  highlight?: string; // Part to highlight with gradient
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  highlight,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  // Split title around highlight string
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={cn("mb-12 md:mb-16", center && "text-center", className)}>
      {tag && (
        <p className="section-tag">
          <span>{tag}</span>
        </p>
      )}

      <h2
        className="font-display font-bold leading-tight mb-4"
        style={{
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          color: "var(--text-primary)",
        }}
      >
        {highlight
          ? parts.map((part, i) => (
              <span key={i}>
                {part}
                {i < parts.length - 1 && (
                  <span className="text-gradient-blue">{highlight}</span>
                )}
              </span>
            ))
          : title}
      </h2>

      {subtitle && (
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl"
          style={{
            color: "var(--text-secondary)",
            ...(center ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
