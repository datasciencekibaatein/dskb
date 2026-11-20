import SmartImage from "./SmartImage";

// 16:9 thumbnail with rounded top corners.
// - `sources`: image URLs to try in order (course image, YouTube thumbnail...).
// - Until an image loads — or if none exists yet — the navy gradient + grid
//   placeholder with `label` shows instead, so nothing ever looks broken.
// Inside a `group` (like a card) it zooms slightly (1.03) on hover.
export default function Thumbnail({
  label,
  sources,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  label: string;
  sources?: string[];
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-t-xl ${className}`}>
      <div className="absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
        {/* Placeholder (always underneath) */}
        <div className="bg-thumb-gradient absolute inset-0">
          <div className="pattern-grid absolute inset-0" />
        </div>
        <div className="absolute inset-0 flex items-end p-4 pt-10">
          <span className="line-clamp-2 text-lg font-semibold leading-snug text-white">{label}</span>
        </div>
        {/* Real image on top, once it loads */}
        {sources && sources.length > 0 && <SmartImage sources={sources} sizes={sizes} />}
      </div>
    </div>
  );
}
