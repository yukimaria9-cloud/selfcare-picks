import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

// META_COLUMNS 以外の列はすべて「比較項目」として扱われ、CSVの列見出しがそのまま
// 表示ラベルになる。項目を増やす・減らす・名前を変えるのは全てCSVの編集だけで完結する。
export type ProductItem = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  accentColor: string;
  catchBanner: string;
  description: string;
  imageUrl: string;
  rakutenUrl: string;
  amazonUrl: string;
  yahooUrl: string;
  officialUrl: string;
  pros: string[];
  cons: string[];
  notes: string;
  items: ProductItem[];
};

const META_COLUMNS = [
  "slug",
  "name",
  "accentColor",
  "catchBanner",
  "description",
  "imageUrl",
  "rakutenUrl",
  "amazonUrl",
  "yahooUrl",
  "officialUrl",
  "pros",
  "cons",
  "notes",
] as const;

type MetaColumn = (typeof META_COLUMNS)[number];

export function loadProductsCsv(csvFileName: string): Product[] {
  const csvPath = path.join(process.cwd(), "src/data", csvFileName);
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  }) as Record<string, string>[];

  return rows.map((row) => {
    const items: ProductItem[] = Object.entries(row)
      .filter(([key]) => !META_COLUMNS.includes(key as MetaColumn))
      .map(([label, value]) => ({ label, value }));

    return {
      slug: row.slug,
      name: row.name,
      accentColor: row.accentColor,
      catchBanner: row.catchBanner,
      description: row.description,
      imageUrl: row.imageUrl,
      rakutenUrl: row.rakutenUrl,
      amazonUrl: row.amazonUrl,
      yahooUrl: row.yahooUrl,
      officialUrl: row.officialUrl,
      pros: row.pros ? row.pros.split("|") : [],
      cons: row.cons ? row.cons.split("|") : [],
      notes: row.notes,
      items,
    };
  });
}
