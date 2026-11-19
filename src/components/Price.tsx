import { type Course, formatINR, getDiscountPercent } from "@/data/courses";

export default function Price({ course, size = "md" }: { course: Course; size?: "md" | "lg" }) {
  const discount = getDiscountPercent(course);
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`font-bold text-heading ${size === "lg" ? "text-3xl" : "text-xl"}`}>
        {formatINR(course.priceINR)}
      </span>
      {discount > 0 && course.originalPriceINR && (
        <>
          <span className="text-sm text-muted line-through">{formatINR(course.originalPriceINR)}</span>
          <span className="text-sm font-semibold text-teal-text">{discount}% off</span>
        </>
      )}
    </div>
  );
}
