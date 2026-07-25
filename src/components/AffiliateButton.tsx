type Platform = "rakuten" | "amazon" | "yahoo";

// 各社の公式ロゴは商標のため使用せず、汎用アイコン+ブランドカラーで表現しています。
const PLATFORM_STYLES: Record<Platform, { label: string; className: string }> = {
  rakuten: { label: "楽天市場", className: "bg-[#BF0000] hover:bg-[#9c0000]" },
  amazon: { label: "Amazon", className: "bg-[#232F3E] hover:bg-[#374357]" },
  yahoo: { label: "Yahoo!ショッピング", className: "bg-[#FF0033] hover:bg-[#d40029]" },
};

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function AffiliateButton({
  platform,
  url,
  size = "md",
}: {
  platform: Platform;
  url: string;
  size?: "sm" | "md";
}) {
  // リンク未設定(空欄・#)の商品はボタンごと非表示にする
  if (!url || url === "#") return null;

  const { label, className } = PLATFORM_STYLES[platform];
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center gap-1.5 rounded-full ${className} ${sizeClass} font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5`}
    >
      <CartIcon />
      {label}
    </a>
  );
}
