import { loadProductsCsv, type Product } from "@/lib/loadCsv";

export type Category = {
  slug: string;
  title: string;
  description: string;
  navBlurb: string; // 目次カードに載せる一言説明
  products: Product[];
  faq?: { q: string; a: string }[]; // よくある質問(FAQPage構造化データにも使う)
};

export const categories: Category[] = [
  {
    slug: "enpishin-tape",
    title: "円皮鍼・パワーテープ",
    description:
      "肌に貼るだけの円皮鍼(セイリン パイオネックス／ファロス)と、テープ状のパワーテープ(ファイテン)。" +
      "貼るタイプのセルフケアグッズ3種をまとめて比較します。",
    navBlurb: "肌に貼るだけの円皮鍼2種と、テープ状のパワーテープ。貼るグッズ3商品を比較",
    products: [
      ...loadProductsCsv("enpishin.csv"),
      ...loadProductsCsv("power-tape.csv"),
    ],
    faq: [
      {
        q: "セイリン パイオネックスとファロス、どちらがおすすめですか？",
        a: "剥がれにくさを重視するならセイリン パイオネックス、価格を抑えたいならファロスが選ばれやすい傾向があります。効果自体は大きく変わらないため、貼り替えの手間と価格のどちらを優先するかで選ぶのがおすすめです。詳しくは上の比較表をご覧ください。",
      },
      {
        q: "円皮鍼とパワーテープはどちらがいいですか？",
        a: "ツボをピンポイントで刺激したい場合は円皮鍼、広い範囲を面でやさしく刺激したい場合や、できるだけ目立たせたくない場合はパワーテープが向いています。貼りたい部位や用途に合わせて選ぶのがおすすめです。",
      },
      {
        q: "顔まわりのツボにも使えますか？",
        a: "円皮鍼は小さく低刺激なので顔まわりにも貼りやすいですが、パワーテープはサイズが大きいため、眉間や目もとなど顔の狭いスペースには貼りづらい場合があります。詳しくは各ツボページの「相性」の目安をご覧ください。",
      },
      {
        q: "どこで購入できますか？",
        a: "各商品の説明の下に、楽天市場・Amazon・Yahoo!ショッピングへのリンクを掲載しています。価格や在庫状況は変動するため、購入前に各販売ページでご確認ください。",
      },
    ],
  },
  {
    slug: "shakti-mat",
    title: "シャクティマット",
    description: "突起で背中・首・頭を刺激し、血行促進やリラックスを目的に使う健康グッズです。",
    navBlurb: "寝るだけで背中・首・頭のツボを刺激するマット",
    products: loadProductsCsv("shakti-mat.csv"),
    faq: [
      {
        q: "シャクティマットは痛くないですか？",
        a: "使い始めは無数の突起がかなり強い刺激に感じ、痛みを感じる方が多いです。数分経つと痛みより温かさを感じるようになり、慣れてくると「痛気持ちいい」と感じる方が多いようです。感じ方には個人差があります。",
      },
      {
        q: "1回どのくらいの時間使えばいいですか？",
        a: "目安として1回5〜10分程度、仰向けに寝転がって使う方が多いです。刺激が強いと感じる場合は、時間を短くしたり薄手のTシャツを1枚挟んだりして調整するのがおすすめです。",
      },
      {
        q: "直接肌に当てて使う必要がありますか？",
        a: "直接肌に当てて使うタイプの商品が一般的で、上半身裸や薄着で使うことが想定されています。冬場は肌寒く感じることもあるため、室温にも配慮しながら使うのがおすすめです。",
      },
    ],
  },
];

export const allProducts: Product[] = categories.flatMap((c) => c.products);

export function findProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function findCategoryForProduct(productSlug: string) {
  return categories.find((c) => c.products.some((p) => p.slug === productSlug));
}
