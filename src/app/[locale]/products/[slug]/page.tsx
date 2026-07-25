import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProducts, findProduct } from "@/data/products";
import AffiliateButton from "@/components/AffiliateButton";
import { locales, type Locale } from "../../layout";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.catchBanner,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const product = findProduct(slug);
  if (!product) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {product.name}
        </h1>
        <p className="text-neutral-700">
          English translation coming soon. Please refer to the{" "}
          <a href={`/ja/products/${product.slug}`} className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {product.name}
        </h1>
        <p className="mt-2 whitespace-pre-line text-sm font-semibold text-neutral-600">{product.catchBanner}</p>
        <p className="mt-3 whitespace-pre-line text-neutral-700">{product.description}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-black/10 bg-white p-4">
          <h2 className="mb-2 font-bold">メリット</h2>
          <ul className="list-inside list-disc text-sm text-neutral-700">
            {product.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-4">
          <h2 className="mb-2 font-bold">デメリット</h2>
          <ul className="list-inside list-disc text-sm text-neutral-700">
            {product.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-4">
        <h2 className="mb-2 font-bold">スペック</h2>
        <dl className="divide-y divide-black/5">
          {product.items.map((item) => (
            <div key={item.label} className="flex py-2 text-sm">
              <dt className="w-32 shrink-0 font-semibold text-neutral-600">
                {item.label}
              </dt>
              <dd className="flex-1">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-neutral-500">
          ※価格・仕様は変更される場合があります。購入前に必ず販売ページでご確認ください。
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <AffiliateButton platform="rakuten" url={product.rakutenUrl} />
        <AffiliateButton platform="amazon" url={product.amazonUrl} />
        <AffiliateButton platform="yahoo" url={product.yahooUrl} />
      </div>
    </article>
  );
}
