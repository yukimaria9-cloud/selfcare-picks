import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const METADATA_BY_LOCALE: Record<Locale, Metadata> = {
  ja: {
    title: {
      default: "セルフケアグッズ比較【シャクティマット・円皮鍼・パワーテープ】",
      template: "%s | セルフケアグッズ比較",
    },
    description:
      "シャクティマット・円皮鍼・パワーテープを比較。疲れやコリのセルフケアグッズ選びの参考情報をまとめています。",
  },
  en: {
    title: {
      default: "Self-Care Goods Comparison",
      template: "%s | Self-Care Goods Comparison",
    },
    description:
      "English version coming soon. Comparison of self-care goods such as shakti mats, acupressure patches, and power tape.",
    // 英語版はプレースホルダーのみのため、翻訳が入るまで検索エンジンにインデックスさせない
    robots: { index: false, follow: false },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return METADATA_BY_LOCALE[locale as Locale];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4971438424400327"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col">
        <Header locale={locale as Locale} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
