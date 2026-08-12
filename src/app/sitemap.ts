import type { MetadataRoute } from "next";
import { categories } from "@/data/products";
import { tsuboList } from "@/data/tsubo";

const SITE_URL = "https://selfcare-picks.com";

// 英語版はプレースホルダーのみのため、翻訳が入るまでサイトマップには含めない(noindex設定はlayout.tsx側で対応)
const LOCALES_IN_SITEMAP = ["ja"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES_IN_SITEMAP) {
    for (const path of ["", "/about", "/disclaimer", "/privacy", "/contact", "/tsubo"]) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const category of categories) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${category.slug}`,
        lastModified: new Date(),
      });
    }
    for (const tsubo of tsuboList) {
      entries.push({
        url: `${SITE_URL}/${locale}/tsubo/${tsubo.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
