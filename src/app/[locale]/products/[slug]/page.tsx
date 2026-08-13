import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import ProductSection from "@/components/ProductSection";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { categories, findCategory } from "@/data/products";
import { locales, type Locale } from "../../layout";

const SITE_URL = "https://www.selfcare-picks.com";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/ja/products/${slug}` },
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const category = findCategory(slug);
  if (!category) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {category.title}
        </h1>
        <p className="text-neutral-700">
          English translation coming soon. Please refer to the{" "}
          <a href={`/ja/products/${category.slug}`} className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "セルフケア図鑑", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: category.title, item: `${SITE_URL}/${locale}/products/${category.slug}` },
          ],
        }}
      />
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {category.title}
        </h1>
        <p className="mt-2 text-neutral-700">{category.description}</p>
      </header>

      {category.products.length > 1 && (
        <section>
          <h2 className="mb-3 text-lg font-extrabold text-[color:var(--accent)]">比較表</h2>
          <ComparisonTable products={category.products} />
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            ※「効果」「痛さ」は筆者個人の使用感による評価であり、効果・効能を保証するものではありません。感じ方には個人差があります。
          </p>
        </section>
      )}

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-extrabold text-[color:var(--accent)]">各商品の説明</h2>
        {category.products.map((product) => (
          <ProductSection key={product.slug} product={product} />
        ))}
      </section>

      {category.faq && <Faq items={category.faq} />}
    </article>
  );
}
