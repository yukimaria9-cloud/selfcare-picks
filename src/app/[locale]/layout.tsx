import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { AdPcHeader, AdPcSideRail, AdSpBanner, AdMaxLoader } from "@/components/Ads";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

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
    description: SITE_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description:
        "シャクティマット・円皮鍼・パワーテープの比較と、部位・症状から探せるツボ一覧。",
    },
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
  return {
    metadataBase: new URL(SITE_URL),
    ...METADATA_BY_LOCALE[locale as Locale],
    alternates: {
      canonical: `/${locale}`,
      languages: { ja: "/ja", en: "/en" },
    },
    // Search Console等の所有権確認用。Vercelの環境変数に値を設定すると
    // <meta name="google-site-verification" content="..."> が出力される(未設定時は何も出力されない)。
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : undefined,
    },
  };
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
        {/* 原因切り分けのため一時的に無効化中(下のコメント参照) */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4971438424400327"
          crossOrigin="anonymous"
        ></script> */}
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
        {locale === "ja" && (
          // サイト全体を表すOrganization構造化データ。個々のページのFAQPage/BreadcrumbList等と
          // 組み合わせて、検索エンジン・生成AIの両方にサイトの運営主体を明示する。
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: `${SITE_URL}/ja`,
              logo: `${SITE_URL}/apple-icon`,
            }}
          />
        )}
        <Header locale={locale as Locale} />
        {/* 切り分け中: PC用2枠(728x90ヘッダー・160x600サイド)は無効化のまま、
            SPバナー320x50だけ復活させて検証中。AdSense自動広告も無効化中(上のhead参照) */}
        {/* <AdPcHeader /> */}
        <AdSpBanner />
        {/* <AdPcSideRail /> */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 pb-16 md:pb-8">
          {children}
        </main>
        <Footer locale={locale as Locale} />
        <AdMaxLoader />
      </body>
    </html>
  );
}
