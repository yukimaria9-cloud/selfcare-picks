// 構造化データ(JSON-LD)をそのまま<script>として出力するだけの小さなヘルパー。
// dangerouslySetInnerHTMLを使うのは、Reactに文字列としてエスケープさせず
// 有効なJSONのまま<script type="application/ld+json">の中身にするため。
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
