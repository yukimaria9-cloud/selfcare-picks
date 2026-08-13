import Image from "next/image";

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

  // 画像の縦横比によってトリミングされないよう、全体表示(contain)で縮小する。
  // next/imageのfillで表示することで、レスポンシブなsrcset・遅延読み込み・
  // 明示的なアスペクト比確保(CLS対策)を自動で得られる。
  return (
    <div className={`relative h-40 w-full rounded-2xl bg-[color:var(--panel)] ${className}`}>
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 640px) 240px, 50vw"
        className="object-contain"
      />
    </div>
  );
}
