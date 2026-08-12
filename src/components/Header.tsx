import Link from "next/link";
import type { Locale } from "@/app/[locale]/layout";

const LABELS: Record<Locale, { title: string; tagline: string; navTsubo: string }> = {
  ja: {
    title: "セルフケア図鑑",
    tagline: "ツボ×グッズ｜通わない、頑張らない。ズボラでも続くセルフケア。",
    navTsubo: "ツボを探す",
  },
  en: {
    title: "SelfCare Zukan",
    tagline: "Acupoints × Goods",
    navTsubo: "Find Acupoints",
  },
};

export default function Header({ locale }: { locale: Locale }) {
  const t = LABELS[locale];

  return (
    <header className="border-b-2 border-[color:var(--accent)]/30 bg-[color:var(--panel)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4">
        <Link href={`/${locale}`} className="flex flex-col leading-tight">
          <span className="text-lg font-extrabold tracking-tight text-[color:var(--accent)]">
            {t.title}
          </span>
          <span className="text-[11px] font-semibold text-[color:var(--muted)]">{t.tagline}</span>
        </Link>
        <nav>
          <Link
            href={`/${locale}/tsubo`}
            className="rounded-full bg-[color:var(--accent-2)] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"
          >
            {t.navTsubo}
          </Link>
        </nav>
      </div>
    </header>
  );
}
