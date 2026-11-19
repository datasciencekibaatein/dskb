const styles = {
  comingSoon: "bg-white text-navy-950 ring-1 ring-black/5", // sits on navy thumbnails/banners in both modes
  live: "bg-cyan text-navy-950",
  recorded: "bg-subtle text-body",
  neutral: "bg-cyan/10 text-teal-text ring-1 ring-cyan/20",
  onDark: "bg-white/10 text-white ring-1 ring-white/15", // for badges on navy backgrounds
};

export default function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}
