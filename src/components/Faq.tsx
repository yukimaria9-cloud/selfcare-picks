import JsonLd from "./JsonLd";

export type FaqItem = { q: string; a: string };

// よくある質問セクション。表示用の<details>アコーディオンに加えて、
// FAQPage構造化データ(JSON-LD)も一緒に出力する。検索エンジンのAI Overviewsや
// ChatGPT/Perplexityなどの生成AIが、質問に対する直接的な回答としてこのページを
// 引用しやすくすることを狙っている。
export default function Faq({
  items,
  heading = "よくある質問",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-extrabold text-[color:var(--accent)]">{heading}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl bg-[color:var(--panel)] p-4 shadow-[0_8px_20px_-14px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
          >
            <summary className="cursor-pointer list-none font-bold text-[color:var(--foreground)] marker:content-none">
              <span className="mr-2 text-[color:var(--accent)]">Q.</span>
              {item.q}
              <span className="float-right text-[color:var(--muted)] transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
              <span className="mr-1 font-bold text-[color:var(--accent-2)]">A.</span>
              {item.a}
            </p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </section>
  );
}
