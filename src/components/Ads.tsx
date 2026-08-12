import AdMaxUnit from "./AdMaxUnit";

// 忍者Admaxで発行した4つの広告枠タグ(スラッグ部分のみ)。
const TAGS = {
  pcHeader: "https://adm.shinobi.jp/s/5ee2b209693a0be090e36e48c079ddac", // PC 728x90
  pcSideRail: "https://adm.shinobi.jp/s/0321c00c76185c9a6323516c53567341", // PC 160x600(右サイド)
  spBanner: "https://adm.shinobi.jp/s/74dbbf68a1dacc14ecd92f44423faf64", // SP 320x50
  spOverlay: "https://adm.shinobi.jp/s/4c116e6b082568972469fa7f55bd78b6", // SPオーバーレイ 320x50
};

// PCのみ、ヘッダー直下に表示する728x90バナー
export function AdPcHeader() {
  return (
    <div className="mx-auto hidden w-fit py-2 md:flex md:justify-center">
      <AdMaxUnit tagUrl={TAGS.pcHeader} width={728} height={90} />
    </div>
  );
}

// 画面幅に余裕があるPCのみ、画面右端に固定表示する160x600
// (本文は max-w-5xl の1カラムでサイドバーが無いため、本文と重ならない
//  xl(1280px)以上でのみ表示している。1280〜1366px程度の幅では数十pxだけ
//  本文の右端と近接する場合があるが、それより広い画面では余裕をもって収まる)
export function AdPcSideRail() {
  return (
    <div className="fixed top-32 right-2 z-30 hidden xl:block">
      <AdMaxUnit tagUrl={TAGS.pcSideRail} width={160} height={600} />
    </div>
  );
}

// スマホのみ、ヘッダー直下に表示する320x50バナー
export function AdSpBanner() {
  return (
    <div className="mx-auto flex w-fit justify-center py-2 md:hidden">
      <AdMaxUnit tagUrl={TAGS.spBanner} width={320} height={50} />
    </div>
  );
}

// スマホのみ、画面下部に固定表示するオーバーレイ広告
// 「オーバーレイ」形式は閉じるボタンなどでぴったり320x50より広い領域を
// 使うことがあるため、ぴったりサイズに切り詰めず(allowOverflow)、
// 横幅も画面いっぱい・縦も少し余裕を持たせている
export function AdSpOverlay() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[color:var(--panel)]/95 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.2)] md:hidden">
      <AdMaxUnit
        tagUrl={TAGS.spOverlay}
        width="100%"
        height={100}
        allowOverflow
        className="mx-auto block max-w-[420px]"
      />
    </div>
  );
}
