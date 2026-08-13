// サイト全体で共有する定数。
// SITE_URLは実際に本番で使われている正規ドメイン(www付き)と必ず一致させること。
// apex(www無し)でアクセスすると308でwwwへリダイレクトされるため、
// sitemap/JSON-LD/canonicalなどに非wwwのURLを書くと不要なリダイレクトを挟んでしまう。
export const SITE_URL = "https://www.selfcare-picks.com";
export const SITE_NAME = "セルフケア図鑑（ツボ×グッズ）";
export const SITE_DESCRIPTION =
  "シャクティマット・円皮鍼・パワーテープの比較と、部位・症状から探せるツボ一覧。通わない、頑張らない、ズボラでも続くセルフケアの参考情報をまとめています。";
