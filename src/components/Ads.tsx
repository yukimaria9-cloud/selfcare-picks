import Script from "next/script";

// 忍者Admaxで発行した4つの広告枠のID(非同期タグ形式: data-admax-id / admax_id)。
// 非同期タグは document.write を使わない安全な方式(window.admaxadsにpushし、
// 共通ローダー https://adm.shinobi.jp/st/t.js が読み取って各divに広告を差し込む)
// なので、Reactのページにも直接置ける。
const IDS = {
  pcHeader: "5ee2b209693a0be090e36e48c079ddac", // PC 728x90 / type: banner
  pcSideRail: "0321c00c76185c9a6323516c53567341", // PC 160x600(右サイド) / type: action
  spBanner: "74dbbf68a1dacc14ecd92f44423faf64", // SP 320x50 / type: banner
  spOverlay: "4c116e6b082568972469fa7f55bd78b6", // SPオーバーレイ 320x50 / type: overlay
} as const;

// PCのみ、ヘッダー直下に表示する728x90バナー
export function AdPcHeader() {
  return (
    <div className="mx-auto hidden w-fit py-2 md:flex md:justify-center">
      <div
        className="admax-ads"
        data-admax-id={IDS.pcHeader}
        style={{ display: "inline-block", width: 728, height: 90 }}
      />
    </div>
  );
}

// 画面幅に余裕があるPCのみ、画面右端に固定表示する160x600
// (本文は max-w-5xl の1カラムでサイドバーが無いため、本文と重ならない
//  lg(1024px)以上でのみ表示している)
export function AdPcSideRail() {
  return (
    <div className="fixed top-32 right-2 z-30 hidden lg:block">
      <div
        className="admax-ads"
        data-admax-id={IDS.pcSideRail}
        style={{ display: "inline-block", width: 160, height: 600 }}
      />
    </div>
  );
}

// スマホのみ、ヘッダー直下に表示する320x50バナー
export function AdSpBanner() {
  return (
    <div className="mx-auto flex w-fit justify-center py-2 md:hidden">
      <div
        className="admax-ads"
        data-admax-id={IDS.spBanner}
        style={{ display: "inline-block", width: 320, height: 50 }}
      />
    </div>
  );
}

// 4つ分の window.admaxads.push(...) と、共通ローダー t.js の読み込みをまとめて行う。
// (オーバーレイ広告はページ内に置く専用divを必要とせず、ローダーが自分で
//  画面下部に固定表示のUIを作るため、対応するAd*コンポーネントは無い)
export function AdMaxLoader() {
  const units = [
    { admax_id: IDS.pcHeader, type: "banner" },
    { admax_id: IDS.pcSideRail, type: "action" },
    { admax_id: IDS.spBanner, type: "banner" },
    { admax_id: IDS.spOverlay, type: "overlay" },
  ];

  return (
    <>
      <Script id="admax-queue" strategy="afterInteractive">
        {`window.admaxads = window.admaxads || [];\n${units
          .map((u) => `window.admaxads.push(${JSON.stringify(u)});`)
          .join("\n")}`}
      </Script>
      <Script
        src="https://adm.shinobi.jp/st/t.js"
        strategy="afterInteractive"
      />
    </>
  );
}
