import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// PWAとしてのインストールを主目的にはしていないため、必要最小限の内容に留める
// (アイコンはicon.tsx/apple-icon.tsxで生成しているサイズをそのまま流用)。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "セルフケア図鑑",
    description: SITE_DESCRIPTION,
    start_url: "/ja",
    display: "standalone",
    background_color: "#fff6f8",
    theme_color: "#ff6f91",
    lang: "ja",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
