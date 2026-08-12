import Link from "next/link";
import type { Locale } from "@/app/[locale]/layout";

const TEXT: Record<
  Locale,
  { about: string; disclaimer: string; privacy: string; contact: string; copyright: string }
> = {
  ja: {
    about: "運営者について",
    disclaimer: "免責事項・広告表記",
    privacy: "プライバシーポリシー",
    contact: "お問い合わせ",
    copyright: "セルフケア図鑑（ツボ×グッズ）",
  },
  en: {
    about: "About",
    disclaimer: "Disclaimer",
    privacy: "Privacy Policy",
    contact: "Contact",
    copyright: "Self-Care Goods Compare",
  },
};

export default function Footer({ locale }: { locale: Locale }) {
  const t = TEXT[locale];

  return (
    <footer className="mt-16 border-t-2 border-[color:var(--accent)]/20 bg-[color:var(--panel)]/70">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600">
        {/* 広告・免責の詳細は「免責事項・広告表記」「プライバシーポリシー」の両ページに記載済みのため、
            フッターでは重複させずリンクのみを置く */}
        <nav className="mb-4 flex flex-wrap gap-4">
          <Link href={`/${locale}/about`} className="hover:underline">
            {t.about}
          </Link>
          <Link href={`/${locale}/disclaimer`} className="hover:underline">
            {t.disclaimer}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:underline">
            {t.privacy}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:underline">
            {t.contact}
          </Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
      </div>
    </footer>
  );
}
