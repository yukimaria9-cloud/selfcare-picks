import Link from "next/link";
import type { Locale } from "@/app/[locale]/layout";

const TEXT: Record<
  Locale,
  { disclosure: string; disclaimer: string; privacy: string; copyright: string }
> = {
  ja: {
    disclosure:
      "当サイトは楽天アフィリエイトプログラム等の広告を利用しています。掲載している情報は記事作成時点のものであり、" +
      "最新の価格・在庫状況は必ず各販売ページでご確認ください。当サイトの情報によって生じたいかなる損害についても" +
      "責任を負いかねます。",
    disclaimer: "免責事項・広告表記",
    privacy: "プライバシーポリシー",
    copyright: "セルフケアグッズ比較",
  },
  en: {
    disclosure:
      "This site participates in affiliate programs including Rakuten Affiliate. Information is accurate as of the " +
      "time of writing; please check the seller's page for the latest price and availability.",
    disclaimer: "Disclaimer",
    privacy: "Privacy Policy",
    copyright: "Self-Care Goods Compare",
  },
};

export default function Footer({ locale }: { locale: Locale }) {
  const t = TEXT[locale];

  return (
    <footer className="mt-16 border-t-2 border-[color:var(--accent)]/20 bg-[color:var(--panel)]/70">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600">
        <p className="mb-4">{t.disclosure}</p>
        <nav className="mb-4 flex flex-wrap gap-4">
          <Link href={`/${locale}/disclaimer`} className="hover:underline">
            {t.disclaimer}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:underline">
            {t.privacy}
          </Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
      </div>
    </footer>
  );
}
