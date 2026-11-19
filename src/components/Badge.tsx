const styles = {
  comingSoon: "bg-white text-navy-950 ring-1 ring-line", // readable on dark & light
  live: "bg-cyan text-navy-950",
  recorded: "bg-slate-100 text-slate-700",
  neutral: "bg-navy-950/[0.06] text-navy-800",
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
