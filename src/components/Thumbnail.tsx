// Placeholder box until real thumbnails are added.
export default function Thumbnail({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex aspect-video w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark p-4 text-center ${className}`}
    >
      <span className="text-lg font-semibold text-white/90">{label}</span>
    </div>
  );
}
