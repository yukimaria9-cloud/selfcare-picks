import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "../layout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p>English translation coming soon. Please refer to the Japanese version for now.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>

      <h2 className="mt-6 text-lg font-bold">アクセス解析ツールについて</h2>
      <p>
        当サイトは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
        このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
        このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>

      <h2 className="mt-6 text-lg font-bold">広告について</h2>
      <p>
        当サイトは楽天アフィリエイト等のアフィリエイトプログラムを利用し、第三者配信の広告サービスを利用する場合が
        あります。広告配信事業者はユーザーの興味に応じた広告を表示するため、Cookieを使用することがあります。
      </p>

      <h2 className="mt-6 text-lg font-bold">お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは、お問い合わせフォームよりご連絡ください。</p>

      <p className="mt-6 text-sm text-neutral-500">制定日:2026年7月26日</p>
    </article>
  );
}
