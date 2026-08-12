import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TsuboSearchClient from "@/components/TsuboSearchClient";
import { tsuboList } from "@/data/tsubo";
import { findBodyPart, findSymptom } from "@/data/tsuboCategories";
import { findProduct } from "@/data/products";
import { locales, type Locale } from "../layout";

export const metadata: Metadata = {
  title: "ツボ一覧・検索",
  description: "体の部位・症状から、円皮鍼やパワーテープと合わせて使いたいツボを探せます。",
};

// ツボ詳細ページに載っている単語なら何でも検索できるように、名前・読みだけでなく位置の説明文・
// 症状・部位・円皮鍼&パワーテープとの相性理由まで含めた検索用テキストをまとめる。
// findProduct はCSV読み込み(node:fs)を含むためサーバー側でのみ計算し、クライアントには結果の文字列だけを渡す。
function buildSearchIndex(): Record<string, string> {
  return Object.fromEntries(
    tsuboList.map((t) => {
      const partLabel = findBodyPart(t.bodyPart)?.label ?? "";
      const symptomLabels = t.symptoms.map((s) => findSymptom(s)?.label ?? "").join(" ");
      const compatText = t.compatibility
        .map((c) => `${findProduct(c.productSlug)?.name ?? ""} ${c.reason}`)
        .join(" ");
      const corpus = [
        t.name,
        t.reading,
        t.locationText,
        t.description,
        partLabel,
        symptomLabels,
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
    </div>
  );
}
