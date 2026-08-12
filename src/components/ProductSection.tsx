import type { Product } from "@/lib/loadCsv";
import AffiliateButton from "./AffiliateButton";
import ProductImage from "./ProductImage";

// 商品1件分の詳細カード。トップページの各カテゴリー内と、
// /products/[slug] のカテゴリー詳細ページの両方から使い回す。
export default function ProductSection({ product }: { product: Product }) {
  return (
    <div
      id={product.slug}
      className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_12px_28px_-16px_color-mix(in_srgb,var(--accent)_50%,transparent)]"
    >
      <h3 className="text-lg font-extrabold">{product.name}</h3>
      <p className="mt-1 text-sm font-semibold text-[color:var(--muted)]">
        {product.catchBanner}
      </p>
      <div className="mt-3 flex flex-wrap items-start gap-4">
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          className="max-w-[240px] rounded-2xl"
        />
        <div className="flex flex-col gap-2">
          <AffiliateButton platform="rakuten" url={product.rakutenUrl} />
          <AffiliateButton platform="amazon" url={product.amazonUrl} />
          <AffiliateButton platform="yahoo" url={product.yahooUrl} />
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[color:var(--accent-3)]/15 p-3 text-sm text-[color:var(--foreground)]">
        <p className="whitespace-pre-line">{product.description}</p>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-sm font-bold text-[color:var(--accent)]">メリット</p>
        <ul className="list-inside list-disc text-sm text-[color:var(--foreground)]">
          {product.pros.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-sm font-bold text-[color:var(--accent-2)]">デメリット</p>
        <ul className="list-inside list-disc text-sm text-[color:var(--foreground)]">
          {product.cons.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <p className="mt-2 text-xs text-[color:var(--muted)]">
        ※メリット・デメリットは筆者個人の感想です。感じ方には個人差があります。
      </p>
    </div>
  );
}
