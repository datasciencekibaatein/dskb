"use client";

// Labelled dropdown used by the filters on /courses and /free-learning.
// The first option is always "All" (value FILTER_ALL).
export const FILTER_ALL = "all";

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-heading">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-card px-3 py-2 text-heading transition-colors duration-200 focus:border-teal-text focus:outline-none focus:ring-2 focus:ring-cyan/40"
      >
        <option value={FILTER_ALL}>All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
