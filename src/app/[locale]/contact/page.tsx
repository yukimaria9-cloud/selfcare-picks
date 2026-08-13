import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { locales, type Locale } from "../layout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "セルフケア図鑑（ツボ×グッズ）へのご質問・ご指摘はこちらからお送りください。",
  alternates: { canonical: "/ja/contact" },
};

// Googleフォームを作成後、共有 →「<> 埋め込む」で取得した src の URL をここに設定してください。
// 空のままだと、フォームの代わりに準備中メッセージが表示されます。
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc5NhdQvG7Npqy-LBPzWB9X9Hw5Q7krOVcejyf3ZMaMBp6eHQ/viewform?embedded=true";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <article className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 text-neutral-800 sm:p-6">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p>English translation coming soon. Please refer to the Japanese version for now.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "セルフケア図鑑", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "お問い合わせ", item: `${SITE_URL}/${locale}/contact` },
          ],
        }}
      />
      <h1 className="text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
        お問い合わせ
      </h1>
      <p className="text-sm text-[color:var(--foreground)]">
        当サイトの内容や掲載商品についてのご質問・ご指摘は、以下のフォームからお送りください。
        内容を確認のうえ、返信が必要な場合は個別にご連絡いたします。
      </p>

      {GOOGLE_FORM_EMBED_URL ? (
        <div className="overflow-hidden rounded-3xl bg-[color:var(--panel)] p-2 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            title="お問い合わせフォーム"
            className="h-[900px] w-full rounded-2xl"
            loading="lazy"
          >
            読み込んでいます…
          </iframe>
        </div>
      ) : (
        <p className="rounded-3xl bg-[color:var(--panel)] p-5 text-sm text-[color:var(--muted)]">
          フォームを準備中です。しばらくお待ちください。
        </p>
      )}
    </article>
  );
}
