import { notFound } from "next/navigation";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateButton from "@/components/AffiliateButton";
import ProductImage from "@/components/ProductImage";
import { allProducts, categories } from "@/data/products";
import { locales, type Locale } from "./layout";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Self-Care Goods Comparison
        </h1>
        <p className="text-neutral-700">
          The English version of this site is coming soon. In the meantime, please check the{" "}
          <a href="/ja" className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <section>
        <span className="inline-block rounded-full bg-[color:var(--accent)] px-4 py-1 text-xs font-bold text-white">
          MY BEST SELF CARE
        </span>
        <h1 className="mt-3 mb-3 text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
          使ってよかったセルフケアグッズ比較
        </h1>
        <p className="text-[color:var(--foreground)]">
          シャクティマット・円皮鍼・パワーテープを中心に、筆者が実際に使ってみて良かったセルフケアグッズを
          紹介しています。使用感は個人の感想であり、効果には個人差があります。
        </p>
        <p className="mt-3 text-[color:var(--foreground)]">
          いろいろな健康グッズを試してきましたが、行き着いた結論は
          <strong className="text-lg font-bold text-red-600">「何もしないこと」</strong>
          が一番続けやすいということです。
          ストレッチやマッサージガンのように自分で動く必要があるケアは、正直なところなかなか続きません。
          ここで紹介しているのは、貼る・寝るだけで完結するセルフケアグッズだけです。
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          掲載内容は記事作成時点の情報のため、購入前に必ず各販売ページで最新の価格・在庫状況をご確認ください。
        </p>
      </section>

      <section className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
        <h2 className="mb-2 text-lg font-extrabold text-[color:var(--accent)]">運営者について</h2>
        <p className="text-sm text-[color:var(--foreground)]">
          デスクワーク中心の生活で、気づけば肩や首がガチガチに凝っている一人の生活者です。
          マッサージや整体にも通ってみましたが、通う時間と費用を継続するのが難しく、結局続かないという経験を
          何度もしてきました。
        </p>
        <p className="mt-2 text-sm text-[color:var(--foreground)]">
          そんな中で出会ったのが、家で寝転がったり貼ったりするだけで完結するセルフケアグッズでした。効果を
          大げさに謳うつもりはありませんが、自分が実際に使ってみて「これは続けられる」「使ってよかった」と
          感じたものだけを、正直な使用感とともにこのサイトで紹介しています。
        </p>
        <p className="mt-2 text-sm text-[color:var(--foreground)]">
          商品はすべて自分のお金で購入し、良かったものだけを掲載する方針です。
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-[color:var(--accent)]">目次</h2>
        <nav className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent-2)_45%,transparent)]">
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a href="#comparison-table" className="font-semibold text-[color:var(--accent-2)] hover:underline">
                比較表
              </a>
            </li>
            <li>
              各商品の説明
              <ul className="ml-4 mt-1 flex flex-col gap-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <a
                      href={`#${category.slug}`}
                      className="font-semibold text-[color:var(--accent-2)] hover:underline"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </section>

      <section id="comparison-table">
        <h2 className="mb-3 text-xl font-extrabold text-[color:var(--accent)]">
          筆者おすすめセルフケアグッズ比較表
        </h2>
        <ComparisonTable products={allProducts} />
      </section>

      {categories.map((category) => (
        <section key={category.slug} id={category.slug} className="flex flex-col gap-6">
          <h2 className="text-xl font-extrabold text-[color:var(--accent)]">{category.title}</h2>

          {category.products.map((product) => (
            <div
              key={product.slug}
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
            </div>
          ))}
        </section>
      ))}

      <section className="rounded-3xl bg-[color:var(--panel)] p-5 text-sm text-[color:var(--muted)]">
        <p>
          使用感・レビューは筆者個人の感想であり、効果・効能を保証するものではありません。
          体質や体調に合わない場合は使用を中止し、異常を感じた場合は医師にご相談ください。
        </p>
      </section>
    </div>
  );
}
