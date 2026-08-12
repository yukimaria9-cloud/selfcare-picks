import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import TsuboLocationPhoto from "@/components/TsuboLocationPhoto";
import CompatibilityBadge from "@/components/CompatibilityBadge";
import AffiliateButton from "@/components/AffiliateButton";
import JsonLd from "@/components/JsonLd";
import { tsuboList, findTsubo } from "@/data/tsubo";
import { findBodyPart, findSymptom } from "@/data/tsuboCategories";
import { findProduct, findCategoryForProduct } from "@/data/products";
import { locales, type Locale } from "../../layout";

const SITE_URL = "https://www.selfcare-picks.com";

export function generateStaticParams() {
  return tsuboList.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tsubo = findTsubo(slug);
  if (!tsubo) return {};
  return {
    title: `${tsubo.name}（${tsubo.reading}）`,
    description: tsubo.description,
    alternates: { canonical: `/ja/tsubo/${slug}` },
  };
}

export default async function TsuboDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const tsubo = findTsubo(slug);
  if (!tsubo) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tsubo.name}</h1>
        <p className="text-neutral-700">
          English translation coming soon. Please refer to the{" "}
          <a href={`/ja/tsubo/${tsubo.slug}`} className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </article>
    );
  }

  const part = findBodyPart(tsubo.bodyPart);

  return (
    <article className="flex flex-col gap-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "セルフケア図鑑", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "ツボ一覧・検索", item: `${SITE_URL}/${locale}/tsubo` },
            { "@type": "ListItem", position: 3, name: tsubo.name, item: `${SITE_URL}/${locale}/tsubo/${tsubo.slug}` },
          ],
        }}
      />
      <p className="text-xs text-[color:var(--muted)]">
        <Link href={`/${locale}/tsubo`} className="underline underline-offset-2 hover:no-underline">
          ツボ一覧・検索
        </Link>
        {" > "}
        {tsubo.name}
      </p>

      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
          {tsubo.name}
          <span className="ml-2 text-base font-normal text-[color:var(--muted)]">
            （{tsubo.reading}）
          </span>
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {part && (
            <Link
              href={`/${locale}/tsubo?part=${part.id}`}
              className="rounded-full bg-[color:var(--accent-2)]/15 px-3 py-1 text-xs font-bold text-[color:var(--accent-2)]"
            >
              部位：{part.label}
            </Link>
          )}
          {tsubo.symptoms.map((symptomId) => {
            const symptom = findSymptom(symptomId);
            if (!symptom) return null;
            return (
              <Link
                key={symptomId}
                href={`/${locale}/tsubo?symptom=${symptomId}`}
                className="rounded-full bg-[color:var(--accent)]/15 px-3 py-1 text-xs font-bold text-[color:var(--accent)]"
              >
                症状：{symptom.label}
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-[color:var(--foreground)]">{tsubo.description}</p>
      </header>

      <section className="flex flex-col gap-4 rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)] sm:flex-row sm:items-center">
        <TsuboLocationPhoto
          view={tsubo.view}
          point={tsubo.point}
          zoom={tsubo.zoom}
          label={`${tsubo.name}（${tsubo.reading}）`}
          className="h-56 w-56 shrink-0 self-center"
        />
        <div>
          <h2 className="mb-1 text-sm font-extrabold text-[color:var(--accent)]">だいたいの位置</h2>
          <p className="text-sm text-[color:var(--foreground)]">{tsubo.locationText}</p>
          {tsubo.bilateral && (
            <p className="mt-1 text-xs text-[color:var(--muted)]">※体の左右対称の位置にあります。</p>
          )}
          <p className="mt-2 text-xs text-[color:var(--muted)]">※赤い点はだいたいの位置の目安です。</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-[color:var(--accent)]">
          円皮鍼・パワーテープとの相性
        </h2>
        <div className="flex flex-wrap gap-4 text-xs text-[color:var(--muted)]">
          <span><CompatibilityBadge rating="good" size="sm" /> 相性が良い</span>
          <span><CompatibilityBadge rating="warn" size="sm" /> 貼れるが、痛みが出やすい・サイズが大きく貼りづらい</span>
          <span><CompatibilityBadge rating="bad" size="sm" /> 剥がれやすくおすすめしにくい</span>
        </div>

        <div className="flex flex-col gap-3">
          {tsubo.compatibility.map((c) => {
            const product = findProduct(c.productSlug);
            if (!product) return null;
            const category = findCategoryForProduct(c.productSlug);
            return (
              <div
                key={c.productSlug}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[color:var(--panel)] p-4 shadow-[0_8px_20px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
              >
                <div className="flex flex-col gap-1">
                  <p className="flex flex-wrap items-center gap-2 font-bold text-[color:var(--foreground)]">
                    <CompatibilityBadge rating={c.rating} />
                    {product.name}
                    {category && (
                      <Link
                        href={`/${locale}/products/${category.slug}#${product.slug}`}
                        className="rounded-full border border-black/10 px-2 py-0.5 text-xs font-semibold text-[color:var(--accent)] hover:bg-[color:var(--accent)]/10"
                      >
                        商品説明
                      </Link>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AffiliateButton platform="rakuten" url={product.rakutenUrl} size="sm" />
                  <AffiliateButton platform="amazon" url={product.amazonUrl} size="sm" />
                  <AffiliateButton platform="yahoo" url={product.yahooUrl} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-[color:var(--muted)]">
          ※相性の目安はサンプルです。実際の使用感をもとに順次更新します。
        </p>
      </section>

      <section className="rounded-3xl bg-[color:var(--panel)] p-5 text-sm text-[color:var(--muted)]">
        <p>
          ツボの情報は一般的なセルフケアの目安であり、効果・効能を保証するものではありません。
          体質や体調に合わない場合は使用を中止し、異常を感じた場合は医師にご相談ください。
        </p>
      </section>
    </article>
  );
}
