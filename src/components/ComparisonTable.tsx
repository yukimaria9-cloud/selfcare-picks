import type { Product } from "@/lib/loadCsv";
import AffiliateButton from "./AffiliateButton";
import ProductImage from "./ProductImage";

const ACCENT_STYLES: Record<string, { banner: string; button: string }> = {
  orange: { banner: "bg-orange-500", button: "bg-orange-500 hover:bg-orange-600" },
  blue: { banner: "bg-blue-500", button: "bg-blue-500 hover:bg-blue-600" },
  green: { banner: "bg-green-600", button: "bg-green-600 hover:bg-green-700" },
  purple: { banner: "bg-purple-500", button: "bg-purple-500 hover:bg-purple-600" },
  pink: { banner: "bg-pink-500", button: "bg-pink-500 hover:bg-pink-600" },
  teal: { banner: "bg-teal-500", button: "bg-teal-500 hover:bg-teal-600" },
};

export default function ComparisonTable({ products }: { products: Product[] }) {
  // カテゴリが混在していて商品ごとに項目が異なる場合があるため、
  // 全商品に登場した項目名を出現順にまとめて行を作る(値が無い項目は空欄になる)
  const itemLabels = Array.from(
    new Set(products.flatMap((product) => product.items.map((item) => item.label)))
  );

  if (products.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        商品データが未登録です。CSVに商品行を追加してください。
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl bg-[color:var(--panel)] shadow-[0_12px_28px_-16px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-32 shrink-0 border-b border-black/10 bg-[color:var(--panel)] p-2" />
            {products.map((product) => {
              const accent = ACCENT_STYLES[product.accentColor] ?? ACCENT_STYLES.blue;
              return (
                <th
                  key={product.slug}
                  className="min-w-[160px] border-b border-black/10 p-0 align-top font-normal"
                >
                  <div className={`${accent.banner} flex min-h-16 items-center justify-center px-2 py-2 text-center`}>
                    <p className="whitespace-pre-line text-xs font-bold text-white">
                      {product.catchBanner}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 bg-[color:var(--panel)] px-2 py-3">
                    <p className="text-sm font-bold">{product.name}</p>
                    <ProductImage
                      imageUrl={product.imageUrl}
                      name={product.name}
                      className="max-w-[120px]"
                    />
                    <AffiliateButton platform="rakuten" url={product.rakutenUrl} size="sm" />
                    <AffiliateButton platform="amazon" url={product.amazonUrl} size="sm" />
                    <AffiliateButton platform="yahoo" url={product.yahooUrl} size="sm" />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {itemLabels.map((label, rowIndex) => (
            <tr
              key={label}
              className={rowIndex % 2 === 0 ? "bg-[color:var(--panel)]" : "bg-[color:var(--accent-3)]/10"}
            >
              <td
                className={`sticky left-0 z-10 border-t border-black/10 p-2 text-xs font-bold ${
                  rowIndex % 2 === 0 ? "bg-[color:var(--panel)]" : "bg-[color:var(--accent-3)]/10"
                }`}
              >
                {label}
              </td>
              {products.map((product) => {
                const value = product.items.find((i) => i.label === label)?.value;
                return (
                  <td
                    key={product.slug}
                    className="border-t border-black/10 p-2 text-center"
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td className="sticky left-0 z-10 border-t border-black/10 bg-[color:var(--panel)] p-2" />
            {products.map((product) => (
              <td
                key={product.slug}
                className="border-t border-black/10 p-2 text-center"
              >
                <a
                  href={`#${product.slug}`}
                  className="inline-block rounded-full bg-[color:var(--accent-2)] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
                >
                  詳しく見る
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
