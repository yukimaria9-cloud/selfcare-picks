import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "../layout";

export const metadata: Metadata = {
  title: "免責事項",
};

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
        <h1 className="text-2xl font-bold">Disclaimer</h1>
        <p>English translation coming soon. Please refer to the Japanese version for now.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
      <h1 className="text-2xl font-bold">免責事項・広告表記</h1>

      <h2 className="mt-6 text-lg font-bold">アフィリエイトプログラムについて</h2>
      <p>
        当サイトは、楽天アフィリエイト等のアフィリエイトプログラムに参加しており、紹介する商品へのリンクには
        広告(アフィリエイトリンク)が含まれます。リンク経由で購入が成立した場合、当サイトが紹介料を受け取ることがあります。
      </p>

      <h2 className="mt-6 text-lg font-bold">使用感・レビューについて</h2>
      <p>
        当サイトに掲載する「使用感」「筆者コメント」は、運営者個人が実際に使用した際の主観的な感想です。
        効果の現れ方には個人差があり、同じ結果を保証するものではありません(薬機法上、医薬品的な効能効果を
        標榜することはできません)。体質や体調に合わない場合は使用を中止し、異常を感じた場合は医師にご相談ください。
      </p>
      <p>
        価格・仕様・在庫状況は変更される場合があります。最新情報は必ず各販売ページでご確認ください。
      </p>

      <h2 className="mt-6 text-lg font-bold">免責</h2>
      <p>
        当サイトの情報を利用したことにより生じた損害について、運営者は一切の責任を負いません。
      </p>
    </article>
  );
}
