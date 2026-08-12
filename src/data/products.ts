import { loadProductsCsv, type Product } from "@/lib/loadCsv";

export type Category = {
  slug: string;
  title: string;
  description: string;
  navBlurb: string; // 目次カードに載せる一言説明
  products: Product[];
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
  },
  {
    slug: "shakti-mat",
    title: "シャクティマット",
    description: "突起で背中・首・頭を刺激し、血行促進やリラックスを目的に使う健康グッズです。",
    navBlurb: "寝るだけで背中・首・頭のツボを刺激するマット",
    products: loadProductsCsv("shakti-mat.csv"),
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
