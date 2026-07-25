export default function ProductImage({
  imageUrl,
  name,
  className = "",
}: {
  imageUrl: string;
  name: string;
  className?: string;
}) {
  if (!imageUrl) {
    return (
      <div
        className={`flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-black/20 bg-neutral-100 text-xs text-neutral-400 ${className}`}
      >
        画像未設定
      </div>
    );
  }

  // 画像の縦横比によってトリミングされないよう、全体表示(contain)で縮小する
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={imageUrl}
      alt={name}
      className={`h-40 w-full rounded-2xl bg-[color:var(--panel)] object-contain ${className}`}
    />
  );
}
