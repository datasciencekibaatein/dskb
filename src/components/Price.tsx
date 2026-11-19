import { type Course, formatINR, getDiscountPercent } from "@/data/courses";

export default function Price({ course, size = "md" }: { course: Course; size?: "md" | "lg" }) {
  const discount = getDiscountPercent(course);
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`font-bold text-gray-900 ${size === "lg" ? "text-3xl" : "text-xl"}`}>
        {formatINR(course.price)}
      </span>
      {discount > 0 && (
        <>
          <span className="text-sm text-gray-400 line-through">{formatINR(course.originalPrice)}</span>
          <span className="text-sm font-semibold text-green-600">{discount}% off</span>
        </>
      )}
    </div>
  );
}
