// Placeholder thumbnail until real images are added:
// navy gradient + faint grid + a short label (the course category) in white.
// Inside a `group` (like a course card) it zooms slightly on hover.
export default function Thumbnail({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden ${className}`}>
      <div className="bg-thumb-gradient absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
        <div className="pattern-grid absolute inset-0" />
      </div>
      <div className="relative flex h-full items-end p-4 pt-10">
        <span className="text-lg font-semibold leading-snug text-white">{label}</span>
      </div>
    </div>
  );
}
