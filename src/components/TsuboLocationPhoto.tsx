// ツボのだいたいの位置を、部位ごとのクローズアップ画像に赤い点を重ねて示す。
// 点はCSSで画像の上に絶対配置しているだけなので、画像を差し替えても
// 座標(x/y)はそのまま使い回せる。zoomを上げると、その点を中心にさらに拡大表示する。
export type LocationView =
  | "face-front"
  | "face-side"
  | "head-back"
  | "neck-shoulder-front"
  | "neck-shoulder-back"
  | "arm-wrist-inner"
  | "hand-back"
  | "palm"
  | "abdomen"
  | "back-waist" // 専用クローズアップ未生成のため、全身シルエット(背面)で代用中
  | "thigh-shin-outer"
  | "knee-front"
  | "knee-back"
  | "ankle-inner"
  | "foot-sole"
  | "foot-top";

const BASE_IMAGES: Record<LocationView, string> = {
  "face-front": "/images/tsubo-base/face-front.png",
  "face-side": "/images/tsubo-base/face-side.png",
  "head-back": "/images/tsubo-base/head-back.png",
  "neck-shoulder-front": "/images/tsubo-base/neck-shoulder-front.png",
  "neck-shoulder-back": "/images/tsubo-base/neck-shoulder-back.png",
  "arm-wrist-inner": "/images/tsubo-base/arm-wrist-inner.png",
  "hand-back": "/images/tsubo-base/hand-back.png",
  palm: "/images/tsubo-base/palm.png",
  abdomen: "/images/tsubo-base/abdomen.png",
  "back-waist": "/images/tsubo-base/back-waist.png",
  "thigh-shin-outer": "/images/tsubo-base/thigh-shin-outer.png",
  "knee-front": "/images/tsubo-base/knee-front.png",
  "knee-back": "/images/tsubo-base/knee-back.png",
  "ankle-inner": "/images/tsubo-base/ankle-inner.png",
  "foot-sole": "/images/tsubo-base/foot-sole.png",
  "foot-top": "/images/tsubo-base/foot-top.png",
};

const VIEW_LABELS: Record<LocationView, string> = {
  "face-front": "顔（正面）",
  "face-side": "顔（側面）",
  "head-back": "後頭部",
  "neck-shoulder-front": "首・肩（正面）",
  "neck-shoulder-back": "首・肩（背面）",
  "arm-wrist-inner": "腕・手首内側",
  "hand-back": "手の甲",
  palm: "手のひら",
  abdomen: "お腹",
  "back-waist": "背中・腰",
  "thigh-shin-outer": "太もも〜すね外側",
  "knee-front": "膝（正面）",
  "knee-back": "膝（背面）",
  "ankle-inner": "足首内側",
  "foot-sole": "足の裏",
  "foot-top": "足の甲",
};

export default function TsuboLocationPhoto({
  view,
  point,
  zoom = 1,
  label,
  className = "",
}: {
  view: LocationView;
  point: { x: number; y: number }; // ベース画像に対する%座標(左上が0,0)
  zoom?: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${VIEW_LABELS[view]}の画像上で${label}のだいたいの位置を示す赤い点`}
      className={`relative overflow-hidden rounded-2xl bg-[color:var(--panel)] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${zoom})`, transformOrigin: `${point.x}% ${point.y}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BASE_IMAGES[view]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <span
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 ring-2 ring-white"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        />
      </div>
    </div>
  );
}
