"use client";

import { useEffect, useRef } from "react";

// 忍者Admaxの広告タグは<script>が自分自身の直後にdocument.writeで広告を挿入する
// 昔ながらの方式のため、Reactが管理するページに直接埋め込むと
// (1) 非同期読み込み後のdocument.writeがブラウザにブロックされる
// (2) Reactの想定外にDOMが書き換えられてハイドレーションが壊れる
// といった問題が起きやすい。そこで専用のiframeを1枚用意し、その中だけで
// タグを実行することで本体のページから安全に隔離する。
export default function AdMaxUnit({
  tagUrl,
  width,
  height,
  className = "",
  // 「オーバーレイ」タイプ等、広告自体が閉じるボタンなどでぴったりのサイズより
  // はみ出す可能性がある広告枠向け。true にすると内部のoverflow:hiddenをやめ、
  // スクロールも許可して広告の中身が切れないようにする。
  allowOverflow = false,
}: {
  tagUrl: string;
  width: number | string;
  height: number | string;
  className?: string;
  allowOverflow?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(
      `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;${
        allowOverflow ? "" : "overflow:hidden;"
      }background:transparent;}</style></head>` +
        `<body><script src="${tagUrl}"><\/script></body></html>`
    );
    doc.close();
  }, [tagUrl, allowOverflow]);

  return (
    <iframe
      ref={iframeRef}
      title="広告"
      className={className}
      style={{ width, height, border: "none", display: "block" }}
      scrolling={allowOverflow ? "auto" : "no"}
    />
  );
}
