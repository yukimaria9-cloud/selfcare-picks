import type { MetadataRoute } from "next";
import { allProducts } from "@/data/products";

const SITE_URL = "https://selfcare-picks.com";

// 英語版はプレースホルダーのみのため、翻訳が入るまでサイトマップには含めない(noindex設定はlayout.tsx側で対応)
const LOCALES_IN_SITEMAP = ["ja"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES_IN_SITEMAP) {
    for (const path of ["", "/disclaimer", "/privacy"]) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const product of allProducts) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
