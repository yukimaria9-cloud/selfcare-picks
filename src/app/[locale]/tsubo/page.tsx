import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TsuboSearchClient from "@/components/TsuboSearchClient";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { tsuboList } from "@/data/tsubo";
import { findBodyPart, findSymptom, SYMPTOM_SYNONYMS, BODY_PART_SYNONYMS } from "@/data/tsuboCategories";
import { findProduct } from "@/data/products";
import { locales, type Locale } from "../layout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ツボ一覧・検索",
  description: "体の部位・症状から、円皮鍼やパワーテープと合わせて使いたいツボを探せます。",
  // 絞り込み条件のクエリパラメータ違いを別ページとして重複インデックスさせないよう、
  // 常にクエリ無しの基本URLを正規URLとして指定する
  alternates: { canonical: "/ja/tsubo" },
};

// ツボ詳細ページに載っている単語なら何でも検索できるように、名前・読みだけでなく位置の説明文・
// 症状・部位・円皮鍼&パワーテープとの相性理由まで含めた検索用テキストをまとめる。
// findProduct はCSV読み込み(node:fs)を含むためサーバー側でのみ計算し、クライアントには結果の文字列だけを渡す。
function buildSearchIndex(): Record<string, string> {
  return Object.fromEntries(
    tsuboList.map((t) => {
      const partLabel = findBodyPart(t.bodyPart)?.label ?? "";
      const partSynonyms = (BODY_PART_SYNONYMS[t.bodyPart] ?? []).join(" ");
      const symptomLabels = t.symptoms.map((s) => findSymptom(s)?.label ?? "").join(" ");
      // カテゴリー名("肩こり"など)だけでなく、「肩が重い」「頭が痛い」のような
      // 日常的な言い回しでも検索でヒットするように同義語も検索対象に含める
      const symptomSynonyms = t.symptoms.flatMap((s) => SYMPTOM_SYNONYMS[s] ?? []).join(" ");
      const compatText = t.compatibility
        .map((c) => `${findProduct(c.productSlug)?.name ?? ""} ${c.reason}`)
        .join(" ");
      const corpus = [
        t.name,
        t.reading,
        t.locationText,
        t.description,
        partLabel,
        partSynonyms,
        symptomLabels,
        symptomSynonyms,
        compatText,
      ].join(" ");
      return [t.slug, corpus];
    })
  );
}

export default async function TsuboIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ part?: string; symptom?: string; q?: string; product?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  if (!locales.includes(locale as Locale)) notFound();

  if (locale === "en") {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Acupoint Search</h1>
        <p className="text-neutral-700">
          The English version of this site is coming soon. In the meantime, please check the{" "}
          <a href="/ja/tsubo" className="text-blue-600 hover:underline">
            Japanese version
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "セルフケア図鑑", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "ツボ一覧・検索", item: `${SITE_URL}/${locale}/tsubo` },
          ],
        }}
      />
      <header>
        <span className="inline-block rounded-full bg-[color:var(--accent-2)] px-4 py-1 text-xs font-bold text-white">
          TSUBO SEARCH
        </span>
        <h1 className="mt-3 mb-3 text-2xl font-extrabold tracking-tight text-[color:var(--accent)] sm:text-3xl">
          ツボ一覧・検索
        </h1>
        <p className="text-[color:var(--foreground)]">
          気になる体の部位、または症状を選ぶと、あわせて使いたいツボが絞り込まれます。各ツボのページでは、
          だいたいの位置と、円皮鍼・パワーテープとの相性の目安を紹介しています。
        </p>
      </header>

      <TsuboSearchClient
        locale={locale}
        initialPart={sp.part ?? ""}
        initialSymptom={sp.symptom ?? ""}
        initialQuery={sp.q ?? ""}
        initialProduct={sp.product ?? ""}
        searchIndex={buildSearchIndex()}
      />

      <p className="text-xs text-[color:var(--muted)]">
        掲載しているツボと相性の目安はサンプルです。体質や症状によって感じ方は異なるため、参考程度にご覧ください。
      </p>

      <Faq
        items={[
          {
            q: "気になる症状に近いツボが複数見つかった場合はどうすればいいですか？",
            a: "まずは気になるツボを軽く押してみて、心地よく感じる、または少し重だるく感じるツボから試してみるのがおすすめです。無理に強く押しすぎないようにしてください。",
          },
          {
            q: "円皮鍼・パワーテープはどのツボにも貼れますか？",
            a: "髪が生えている部分は粘着面が浮きやすく貼りづらいため、各ツボページの「相性」の目安を確認してから使うのがおすすめです。手のひらや足の裏など圧がかかりやすい部位は、円皮鍼だと歩行時や動作時に痛みを感じやすい場合があります。",
          },
          {
            q: "ツボの位置は自分で正確に見つけられますか？",
            a: "各ツボページに「だいたいの位置」の目安と写真を載せています。正確な位置は体格や体質によって多少前後するため、押して心地よく感じる、または少し重だるく感じる場所を目安に探すのがおすすめです。",
          },
        ]}
      />
    </div>
  );
}
