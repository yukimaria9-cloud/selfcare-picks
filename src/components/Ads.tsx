"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    admaxads?: { admax_id: string; type: string }[];
  }
}

// 忍者Admaxで発行した4つの広告枠のID(非同期タグ形式: data-admax-id / admax_id)。
const IDS = {
  pcHeader: "5ee2b209693a0be090e36e48c079ddac", // PC 728x90 / type: banner
  pcSideRail: "0321c00c76185c9a6323516c53567341", // PC 160x600(右サイド) / type: action
  spBanner: "74dbbf68a1dacc14ecd92f44423faf64", // SP 320x50 / type: banner
  spOverlay: "4c116e6b082568972469fa7f55bd78b6", // SPオーバーレイ 320x50 / type: overlay
} as const;

// 広告スクリプト(t.js)は data-admax-id を持つdivを見つけて中身を直接書き換える。
// このdivをJSXで(=Reactの管理下に)描画すると、Reactが後から同じノードを
// 差分更新しようとして「removeChild: The node to be removed is not a child of
// this node」で衝突し、最悪ページ全体の操作が効かなくなる(実際に発生した不具合)。
// そこで、広告の入れ物となるdivはuseEffect内でdocument.createElementを使って
// Reactの外側で直接生成・破棄する。Reactが描画するのは中身の無い空のホストdivだけなので、
// 広告スクリプトがその中を自由に書き換えてもReactの差分検出とは衝突しない。
function AdSlot({
  admaxId,
  type,
  width,
  height,
  className = "",
}: {
  admaxId: string;
  type: string;
  width: number;
  height: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const adDiv = document.createElement("div");
    adDiv.className = "admax-ads";
    adDiv.setAttribute("data-admax-id", admaxId);
    adDiv.style.display = "inline-block";
    adDiv.style.width = `${width}px`;
    adDiv.style.height = `${height}px`;
    host.appendChild(adDiv);

    window.admaxads = window.admaxads || [];
    window.admaxads.push({ admax_id: admaxId, type });

    return () => {
      if (host.contains(adDiv)) host.removeChild(adDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admaxId, type, width, height]);

  return (
    <div ref={hostRef} className={className} style={{ width, height }} />
  );
}

// PCのみ、ヘッダー直下に表示する728x90バナー
export function AdPcHeader() {
  return (
    <div className="mx-auto hidden w-fit py-2 md:flex md:justify-center">
      <AdSlot admaxId={IDS.pcHeader} type="banner" width={728} height={90} />
    </div>
  );
}

// 画面幅に余裕があるPCのみ、画面右端に固定表示する160x600
// (本文は max-w-5xl の1カラムでサイドバーが無いため、本文と重ならない
//  lg(1024px)以上でのみ表示している)
export function AdPcSideRail() {
  return (
    <div className="fixed top-32 right-2 z-30 hidden lg:block">
      <AdSlot admaxId={IDS.pcSideRail} type="action" width={160} height={600} />
    </div>
  );
}

// スマホのみ、ヘッダー直下に表示する320x50バナー
export function AdSpBanner() {
  return (
    <div className="mx-auto flex w-fit justify-center py-2 md:hidden">
      <AdSlot admaxId={IDS.spBanner} type="banner" width={320} height={50} />
    </div>
  );
}

// 共通ローダー t.js の読み込みだけを行う。
// (オーバーレイ広告は専用divを必要とせず、window.admaxadsへのpushだけで
//  ローダー自身が画面下部に固定表示のUIを作るため、AdSlotは使わずここでpushする)
export function AdMaxLoader() {
  return (
    <>
      <Script id="admax-overlay-queue" strategy="afterInteractive">
        {`window.admaxads = window.admaxads || [];\nwindow.admaxads.push(${JSON.stringify(
          { admax_id: IDS.spOverlay, type: "overlay" }
        )});`}
      </Script>
      <Script src="https://adm.shinobi.jp/st/t.js" strategy="afterInteractive" />
    </>
  );
}
