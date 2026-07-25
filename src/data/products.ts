import { loadProductsCsv, type Product } from "@/lib/loadCsv";

export type Category = {
  slug: string;
  title: string;
  description: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    slug: "shakti-mat",
    title: "シャクティマット",
    description: "突起で背中を刺激し、血行促進やリラックスを目的に使う健康グッズです。",
    products: loadProductsCsv("shakti-mat.csv"),
  },
  {
    slug: "enpishin",
    title: "円皮鍼",
    description: "肌に貼るだけの小さな鍼(はり)。肩こり・腰の張りが気になる部位に使われます。",
    products: loadProductsCsv("enpishin.csv"),
  },
  {
    slug: "power-tape",
    title: "パワーテープ",
    description: "関節や筋肉に貼るテープ状のセルフケアグッズです。",
    products: loadProductsCsv("power-tape.csv"),
  },
];

export const allProducts: Product[] = categories.flatMap((c) => c.products);

export function findProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}
