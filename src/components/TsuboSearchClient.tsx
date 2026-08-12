"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { tsuboList } from "@/data/tsubo";
import { bodyParts, symptoms, findBodyPart, findSymptom } from "@/data/tsuboCategories";

// 円皮鍼(パイオネックス・ファロス)・パワーテープの3商品。products.tsのproduct.slugと対応。
const PRODUCT_FILTERS = [
  { id: "enpishin-1", label: "円皮鍼（パイオネックス）" },
  { id: "enpishin-2", label: "円皮鍼（ファロス）" },
  { id: "power-tape-1", label: "パワーテープ" },
];

function parseIds(value: string | null): Set<string> {
  if (!value) return new Set();
  return new Set(value.split(",").filter(Boolean));
}

function toggleId(current: Set<string>, id: string): Set<string> {
  const next = new Set(current);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function chipClass(active: boolean, tone: "part" | "symptom" | "product") {
  const activeBg =
    tone === "part"
      ? "bg-[color:var(--accent-2)]"
      : tone === "symptom"
        ? "bg-[color:var(--accent)]"
        : "bg-[color:var(--accent-3)]";
  return [
    "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
    active
      ? `${activeBg} border-transparent text-white`
      : "border-black/10 bg-[color:var(--panel)] text-[color:var(--foreground)] hover:border-black/20",
  ].join(" ");
}

// 部位・症状のチップは2行までに収め、はみ出す分は「もっと見る」ボタンで開閉する。
// 実際に何個で2行になるかはコンテナ幅(=画面幅)次第なので、見た目には出さない計測用の
// 複製を同じ幅で描画し、その折り返し位置(offsetTop)から2行に収まる個数を割り出す。
function ExpandableChipGroup({
  items,
  selected,
  onToggle,
  tone,
}: {
  items: { id: string; label: string }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  tone: "part" | "symptom";
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const measureEl = measureRef.current;
    if (!measureEl) return;

    function recalc() {
      const chipEls = Array.from(measureEl!.children) as HTMLElement[];
      if (chipEls.length === 0) return;
      const rowTops = Array.from(new Set(chipEls.map((el) => el.offsetTop)));
      if (rowTops.length <= 2) {
        setVisibleCount(items.length);
        return;
      }
      const secondRowTop = rowTops[1];
      let count = 0;
      for (const el of chipEls) {
        if (el.offsetTop <= secondRowTop) count += 1;
        else break;
      }
      // 「もっと見る」ボタン自体の幅の分、1個分の余裕を残しておく
      if (count < items.length) count = Math.max(count - 1, 1);
      setVisibleCount(count);
    }

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(measureEl);
    return () => ro.disconnect();
  }, [items]);

  const needsToggle = visibleCount < items.length;
  const shownItems = expanded ? items : items.slice(0, visibleCount);

  return (
    <div className="relative mt-3">
      {/* 計測専用の複製。画面には表示しないが、折り返し位置を調べるために同じ幅でレイアウトする */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute inset-x-0 top-0 -z-10 flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <span key={item.id} className={chipClass(false, tone)}>
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {shownItems.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected.has(item.id)}
            onClick={() => onToggle(item.id)}
            className={chipClass(selected.has(item.id), tone)}
          >
            {item.label}
          </button>
        ))}
        {needsToggle && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-dashed border-black/20 px-3 py-1.5 text-xs font-bold text-[color:var(--muted)] hover:border-black/40"
          >
            {expanded ? "閉じる" : "もっと見る"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TsuboSearchClient({
  locale,
  initialPart = "",
  initialSymptom = "",
  initialQuery = "",
  initialProduct = "",
  searchIndex,
}: {
  locale: string;
  initialPart?: string;
  initialSymptom?: string;
  initialQuery?: string;
  initialProduct?: string;
  // ツボ詳細ページに載っている単語なら何でも検索できるように、名前・読みだけでなく位置の説明文・
  // 症状・部位・円皮鍼&パワーテープとの相性理由まで含めた検索用テキスト(slug -> 全文)。
  // CSV読み込み(node:fs)を含むデータ参照はサーバー側であらかじめ計算し、props で渡す。
  searchIndex: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 初期状態はサーバー側でURLのクエリ(searchParams)から解決済みの値を props で受け取る。
  // クライアント側で useSearchParams を使わないことで、一覧全体を静的にプリレンダーできる。
  const [selectedParts, setSelectedParts] = useState<Set<string>>(() => parseIds(initialPart));
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(() =>
    parseIds(initialSymptom)
  );
  const [query, setQuery] = useState(initialQuery);
  // 商品との相性フィルターは1つだけ選べる("" = 未選択)
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  // 選択状態をURLに反映し、絞り込み結果をブックマーク・共有できるようにする
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedParts.size > 0) params.set("part", Array.from(selectedParts).join(","));
    if (selectedSymptoms.size > 0) params.set("symptom", Array.from(selectedSymptoms).join(","));
    if (query.trim()) params.set("q", query.trim());
    if (selectedProduct) params.set("product", selectedProduct);
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParts, selectedSymptoms, query, selectedProduct]);

  const results = useMemo(() => {
    const q = query.trim();
    return tsuboList.filter((t) => {
      const partOk = selectedParts.size === 0 || selectedParts.has(t.bodyPart);
      const symptomOk =
        selectedSymptoms.size === 0 || t.symptoms.some((s) => selectedSymptoms.has(s));
      const queryOk = !q || (searchIndex[t.slug] ?? "").includes(q);
      const productOk =
        !selectedProduct ||
        t.compatibility.some((c) => c.productSlug === selectedProduct && c.rating === "good");
      return partOk && symptomOk && queryOk && productOk;
    });
  }, [selectedParts, selectedSymptoms, query, selectedProduct, searchIndex]);

  const hasFilter =
    selectedParts.size > 0 ||
    selectedSymptoms.size > 0 ||
    query.trim().length > 0 ||
    selectedProduct.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent-2)_45%,transparent)]">
        <h2 className="text-sm font-extrabold text-[color:var(--accent-2)]">部位から探す</h2>
        <ExpandableChipGroup
          items={bodyParts}
          selected={selectedParts}
          onToggle={(id) => setSelectedParts((prev) => toggleId(prev, id))}
          tone="part"
        />
      </div>

      <div className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
        <h2 className="text-sm font-extrabold text-[color:var(--accent)]">症状から探す</h2>
        <ExpandableChipGroup
          items={symptoms}
          selected={selectedSymptoms}
          onToggle={(id) => setSelectedSymptoms((prev) => toggleId(prev, id))}
          tone="symptom"
        />
      </div>

      <div className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
        <label htmlFor="tsubo-query" className="text-sm font-extrabold text-[color:var(--accent)]">
          ツボ名で検索
        </label>
        <input
          id="tsubo-query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例：肩井、頭痛、こめかみ"
          className="mt-3 w-full rounded-full border border-black/10 bg-transparent px-4 py-2 text-sm text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
        />
      </div>

      <div
        role="radiogroup"
        aria-label="商品との相性がいいツボ"
        className="rounded-3xl bg-[color:var(--panel)] p-5 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--accent-3)_45%,transparent)]"
      >
        <h2 className="text-sm font-extrabold text-[color:var(--accent-3)]">
          商品との相性がいいツボ
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_FILTERS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={selectedProduct === p.id}
              onClick={() =>
                setSelectedProduct((prev) => (prev === p.id ? "" : p.id))
              }
              className={chipClass(selectedProduct === p.id, "product")}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-bold text-[color:var(--foreground)]">
          {results.length}件のツボが見つかりました
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setSelectedParts(new Set());
              setSelectedSymptoms(new Set());
              setQuery("");
              setSelectedProduct("");
            }}
            className="text-xs font-semibold text-[color:var(--muted)] underline underline-offset-2"
          >
            絞り込みをクリア
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {results.map((t) => {
          const part = findBodyPart(t.bodyPart);
          return (
            <Link
              key={t.slug}
              href={`/${locale}/tsubo/${t.slug}`}
              className="rounded-2xl border border-black/10 bg-[color:var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-extrabold text-[color:var(--foreground)]">
                {t.name}
                <span className="ml-1 text-xs font-normal text-[color:var(--muted)]">
                  （{t.reading}）
                </span>
              </p>
              <p className="mt-1 text-xs text-[color:var(--muted)]">
                {part?.label}
                {" ／ "}
                {t.symptoms.map((s) => findSymptom(s)?.label).join("・")}
              </p>
            </Link>
          );
        })}
        {results.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/20 p-6 text-center text-sm text-[color:var(--muted)]">
            条件に合うツボが見つかりませんでした。絞り込みを減らしてみてください。
          </p>
        )}
      </div>
    </div>
  );
}
