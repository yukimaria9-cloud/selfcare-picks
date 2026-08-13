import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// GEO(生成AI検索対策)の方針として、AI検索・AIアシスタント系クローラーも含めて
// 全クローラーを明示的に許可する。llms.txtで引用時のお願い(断定表現を避ける等)を
// 案内しているため、学習・回答生成のどちらの用途でも読み取ってもらって構わない。
const AI_USER_AGENTS = [
  "GPTBot", // OpenAI: 学習データ収集
  "ChatGPT-User", // OpenAI: ChatGPTの回答生成時の閲覧
  "OAI-SearchBot", // OpenAI: ChatGPT検索
  "ClaudeBot", // Anthropic: 学習データ収集
  "Claude-User", // Anthropic: Claudeの回答生成時の閲覧
  "Claude-SearchBot", // Anthropic: Claude検索
  "PerplexityBot", // Perplexity: 検索インデックス
  "Perplexity-User", // Perplexity: 回答生成時の閲覧
  "Google-Extended", // Google: Geminiなど生成AIの学習データ収集
  "Applebot-Extended", // Apple: Apple Intelligenceの学習データ収集
  "CCBot", // Common Crawl: 各社AIの学習データセットの元になることが多い
  "Amazonbot", // Amazon: Alexa等
  "Bytespider", // ByteDance
  "meta-externalagent", // Meta: 学習・検索データ収集
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_USER_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
