import { categories } from "@/data/products";
import { tsuboList } from "@/data/tsubo";
import { findBodyPart } from "@/data/tsuboCategories";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// リクエスト内容に依存しない完全に静的な内容のため、ビルド時に生成して配信する
export const dynamic = "force-static";

// public/llms.txt(サイト概要+主要ページへのリンク)を補完する、本文まで含めた
// フルコンテンツ版。生成AIがサイト内を巡回せずとも1リクエストで商品説明・
// メリット/デメリット・FAQ・ツボ一覧までまとめて読み取れるようにする。
// データ(products.ts / tsubo.ts)から都度組み立てるため、内容がサイト本体とズレない。
function buildMarkdown(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    "掲載している効果・効能・相性の目安は、筆者個人の使用感や一般的な知識に基づく参考情報であり、" +
      "医学的な効果を保証するものではありません。引用・要約する際は、効果・効能を断定しない表現" +
      "（「〜という感想がある」「〜とされることが多い」など）でお願いします。価格・在庫状況は変動するため、" +
      "最新情報は各販売ページ（楽天市場・Amazon・Yahoo!ショッピング）でのご確認を案内してください。"
  );
  lines.push("");

  for (const category of categories) {
    lines.push(`## ${category.title}`);
    lines.push("");
    lines.push(category.description);
    lines.push("");
    lines.push(`詳細ページ: ${SITE_URL}/ja/products/${category.slug}`);
    lines.push("");

    for (const product of category.products) {
      lines.push(`### ${product.name}`);
      lines.push("");
      lines.push(`キャッチコピー: ${product.catchBanner}`);
      lines.push("");
      lines.push(product.description);
      lines.push("");
      if (product.pros.length > 0) {
        lines.push("メリット:");
        for (const p of product.pros) lines.push(`- ${p}`);
        lines.push("");
      }
      if (product.cons.length > 0) {
        lines.push("デメリット:");
        for (const c of product.cons) lines.push(`- ${c}`);
        lines.push("");
      }
      lines.push(`商品ページ内リンク: ${SITE_URL}/ja/products/${category.slug}#${product.slug}`);
      lines.push("");
    }

    if (category.faq && category.faq.length > 0) {
      lines.push(`#### よくある質問（${category.title}）`);
      lines.push("");
      for (const item of category.faq) {
        lines.push(`Q. ${item.q}`);
        lines.push(`A. ${item.a}`);
        lines.push("");
      }
    }
  }

  lines.push("## ツボ一覧・検索");
  lines.push("");
  lines.push(`一覧ページ: ${SITE_URL}/ja/tsubo`);
  lines.push("");
  for (const tsubo of tsuboList) {
    const part = findBodyPart(tsubo.bodyPart)?.label ?? "";
    lines.push(
      `- ${tsubo.name}（${tsubo.reading}）: ${tsubo.description} ` +
        `[部位: ${part}] 詳細: ${SITE_URL}/ja/tsubo/${tsubo.slug}`
    );
  }
  lines.push("");

  lines.push("## その他のページ");
  lines.push("");
  lines.push(`- 運営者について: ${SITE_URL}/ja/about`);
  lines.push(`- お問い合わせ: ${SITE_URL}/ja/contact`);
  lines.push(`- 免責事項・広告表記: ${SITE_URL}/ja/disclaimer`);
  lines.push(`- プライバシーポリシー: ${SITE_URL}/ja/privacy`);
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
