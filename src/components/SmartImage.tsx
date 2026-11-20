"use client";

// next/image with fallbacks: tries each URL in `sources` in order (e.g.
// YouTube maxresdefault → hqdefault). Fades in once loaded. If every source
// fails it renders nothing, so whatever sits underneath (our navy
// placeholder) stays visible. Place it inside a `relative` box — it fills it.

import Image from "next/image";
import { useState } from "react";

export default function SmartImage({
  sources,
  alt = "",
  sizes,
  className = "",
}: {
  sources: string[];
  alt?: string; // "" when the title is already shown next to the image
  sizes: string; // e.g. "(min-width: 1024px) 33vw, 100vw"
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  if (index >= sources.length) return null;

  return (
    <Image
      key={sources[index]}
      src={sources[index]}
      alt={alt}
      fill
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setIndex((i) => i + 1);
      }}
      className={`object-cover transition-opacity duration-300 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
