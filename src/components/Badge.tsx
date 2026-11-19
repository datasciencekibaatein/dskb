const styles = {
  comingSoon: "bg-accent text-gray-900",
  live: "bg-red-600 text-white",
  recorded: "bg-gray-100 text-gray-700",
  neutral: "bg-brand/10 text-brand",
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
