import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "../layout";

export const metadata: Metadata = {
  title: "運営者について",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
        <h1 className="text-2xl font-bold">About</h1>
        <p>English translation coming soon. Please refer to the Japanese version for now.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
        運営者について
      </h1>
      <section className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
        <p className="text-sm text-[color:var(--foreground)]">
          デスクワーク中心の生活で、気づけば肩や首がガチガチに凝っている一人の生活者です。
          マッサージや整体にも通ってみましたが、通う時間と費用を継続するのが難しく、結局続かないという経験を
          何度もしてきました。
        </p>
        <p className="mt-2 text-sm text-[color:var(--foreground)]">
          そんな中で出会ったのが、家で寝転がったり貼ったりするだけで完結するセルフケアグッズと、指一本で
          刺激できるツボでした。効果を大げさに謳うつもりはありませんが、自分が実際に使ってみて
          「これは続けられる」「使ってよかった」と感じたものだけを、正直な使用感とともにこのサイトで
          紹介しています。ズボラな自分でも続けられた、というのが一番の判断基準です。
        </p>
        <p className="mt-2 text-sm text-[color:var(--foreground)]">
          商品はすべて自分のお金で購入し、良かったものだけを掲載する方針です。
        </p>
      </section>
    </article>
  );
}
