// Very faint blurred cyan/blue blobs drifting behind light sections.
// Pure CSS (see .ambient-blob in globals.css) — cheap, and frozen when
// prefers-reduced-motion is set.
// Usage: inside a `relative overflow-hidden` wrapper, before the content
// (content should be `relative`).
export default function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="ambient-blob ambient-blob-cyan" />
      <div className="ambient-blob ambient-blob-blue" />
    </div>
  );
}
