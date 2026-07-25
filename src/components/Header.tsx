import Link from "next/link";
import type { Locale } from "@/app/[locale]/layout";

const LABELS: Record<Locale, { title: string }> = {
  ja: { title: "セルフケアグッズ比較" },
  en: { title: "Self-Care Goods Compare" },
};

export default function Header({ locale }: { locale: Locale }) {
  const t = LABELS[locale];

  return (
    <header className="border-b-2 border-[color:var(--accent)]/30 bg-[color:var(--panel)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
        <Link
          href={`/${locale}`}
          className="text-lg font-extrabold tracking-tight text-[color:var(--accent)]"
        >
          {t.title}
        </Link>
      </div>
    </header>
  );
}
