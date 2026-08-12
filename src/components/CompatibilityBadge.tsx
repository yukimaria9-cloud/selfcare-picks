import type { Rating } from "@/data/tsubo";

const RATING_STYLES: Record<Rating, { mark: string; label: string; className: string }> = {
  good: { mark: "○", label: "相性が良い", className: "bg-[color:var(--good)]" },
  warn: { mark: "△", label: "貼れるが、痛みが出やすい", className: "bg-[color:var(--warn)]" },
  bad: { mark: "✕", label: "剥がれやすくおすすめしにくい", className: "bg-[color:var(--bad)]" },
};

export default function CompatibilityBadge({
  rating,
  size = "md",
}: {
  rating: Rating;
  size?: "sm" | "md";
}) {
  const { mark, label, className } = RATING_STYLES[rating];
  const sizeClass = size === "sm" ? "h-5 w-5 text-xs" : "h-6 w-6 text-sm";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${className} ${sizeClass}`}
      title={label}
      aria-label={label}
    >
      {mark}
    </span>
  );
}

export { RATING_STYLES };
