import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { categories } from "@/data/products";
import { locales, type Locale } from "./layout";
import { SITE_URL } from "@/lib/site";

const HOME_FAQ = [
  {
    q: "「セルフケア図鑑（ツボ×グッズ）」はどんなサイトですか？",
    a: "円皮鍼・パワーテープ・シャクティマットなど、貼ったり寝転がったりするだけで続けられるセルフケアグッズの比較と、部位・症状から探せるツボ一覧をまとめたサイトです。通院せず自宅で気軽に試せるセルフケアの参考情報を、実際に使った本音の感想とあわせて紹介しています。",
  },
  {
    q: "円皮鍼とパワーテープはどう違いますか？",
    a: "円皮鍼は米粒大の丸いシールの中心に小さな突起がついたタイプで、ツボをピンポイントに刺激します。パワーテープは突起のない伸縮性のテープで、貼った部位を面でやさしく刺激します。詳しい比較は「円皮鍼・パワーテープ」の比較ページにまとめています。",
  },
  {
    q: "使いたいツボはどうやって探せますか？",
    a: "「ツボ一覧・検索」ページで、体の部位（頭・肩・腰など）や気になる症状（肩こり・頭痛・冷え性など）からツボを絞り込んで探せます。ツボ名やキーワードでのフリーワード検索にも対応しています。",
  },
  {
    q: "紹介している効果は保証されていますか？",
    a: "掲載している情報は筆者個人の使用感や一般的な知識に基づく参考情報であり、効果・効能を保証するものではありません。感じ方には個人差があるため、体質や症状に合わない場合は使用を中止し、異常を感じた場合は医師にご相談ください。",
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          SelfCare Zukan (Acupoints × Goods)
        </h1>
        <p className="text-neutral-700">
          The English version of this site is coming soon. In the meantime, please check the{" "}
          <a href="/ja" className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </div>
    );
  }

  // 目次は「ツボ」「セルフケアグッズ」の2カテゴリに分け、カテゴリ見出し+1項目1枠で表示する。
  const tsuboNavItem = {
    href: `/${locale}/tsubo`,
    title: "ツボ一覧・検索",
    blurb: "部位・症状から、あわせて使いたいツボを探せます",
  };
  const goodsNavItems = categories.map((category) => ({
    href: `/${locale}/products/${category.slug}`,
    title: category.title,
    blurb: category.navBlurb,
  }));

  const navCardClass =
    "flex flex-col gap-1 rounded-2xl bg-[color:var(--panel)] p-4 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent-2)_45%,transparent)] transition-transform hover:-translate-y-0.5";

  return (
    <div className="flex flex-col gap-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "セルフケア図鑑（ツボ×グッズ）",
          url: `${SITE_URL}/${locale}`,
          description:
            "シャクティマット・円皮鍼・パワーテープの比較と、部位・症状から探せるツボ一覧。",
          inLanguage: "ja",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/${locale}/tsubo?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <section>
        <span className="inline-block rounded-full bg-[color:var(--accent)] px-4 py-1 text-xs font-bold text-white">
          MY BEST SELF CARE
        </span>
        <h1 className="mt-3 mb-1 text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
          セルフケア図鑑（ツボ×グッズ）
        </h1>
        <p className="mb-3 text-sm font-bold text-[color:var(--accent-2)]">
          通わない、頑張らない。ズボラでも続くセルフケアだけを、正直な感想でまとめました。
        </p>
        <p className="text-[color:var(--foreground)]">
          「貼る」「寝る」だけで続けられるセルフケアグッズと、あわせて使いたいツボを、実際に使った本音レビューで紹介します。
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-[color:var(--accent)]">目次</h2>
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-[color:var(--muted)]">ツボ</h3>
            <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link href={tsuboNavItem.href} className={navCardClass}>
                <span className="font-bold text-[color:var(--accent-2)]">{tsuboNavItem.title}</span>
                <span className="text-xs text-[color:var(--muted)]">{tsuboNavItem.blurb}</span>
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-[color:var(--muted)]">セルフケアグッズ</h3>
            <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {goodsNavItems.map((item) => (
                <Link key={item.href} href={item.href} className={navCardClass}>
                  <span className="font-bold text-[color:var(--accent-2)]">{item.title}</span>
                  <span className="text-xs text-[color:var(--muted)]">{item.blurb}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <Faq items={HOME_FAQ} />

      <p className="text-xs text-[color:var(--muted)]">
        掲載内容は記事作成時点の情報のため、購入前に必ず各販売ページで最新の価格・在庫状況をご確認ください。
      </p>
    </div>
  );
}
