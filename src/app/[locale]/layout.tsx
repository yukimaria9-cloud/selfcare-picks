import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      default: "セルフケア図鑑（ツボ×グッズ）【シャクティマット・円皮鍼・パワーテープ・ツボ】",
      template: "%s | セルフケア図鑑",
    },
    description:
      "シャクティマット・円皮鍼・パワーテープの比較と、部位・症状から探せるツボ一覧。通わない、頑張らない、ズボラでも続くセルフケアの参考情報をまとめています。",
  },
  en: {
    title: {
      default: "SelfCare Zukan (Acupoints × Goods)",
      template: "%s | SelfCare Zukan",
    },
    description:
      "English version coming soon. Comparison of self-care goods such as shakti mats, acupressure patches, and power tape, plus an acupoint (tsubo) directory.",
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N7KPW5J1N0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N7KPW5J1N0');
          `}
        </Script>
        <Header locale={locale as Locale} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
