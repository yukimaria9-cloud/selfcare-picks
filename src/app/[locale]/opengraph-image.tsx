import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "セルフケア図鑑（ツボ×グッズ）";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// このセグメント配下のページがopengraph-imageを個別に用意していない場合の既定OGP画像。
// next/og(edge runtime)でJSXから直接PNGを生成するため、画像ファイルを別途用意する必要がない。
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#fff6f8",
          backgroundImage:
            "radial-gradient(circle at 6% 0%, rgba(255,201,77,0.35), transparent 32%), radial-gradient(circle at 100% 10%, rgba(55,184,163,0.28), transparent 34%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 28px",
            borderRadius: "999px",
            backgroundColor: "#ff6f91",
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
            width: "fit-content",
          }}
        >
          MY BEST SELF CARE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            color: "#ff6f91",
            lineHeight: 1.25,
          }}
        >
          セルフケア図鑑
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#37b8a3",
            lineHeight: 1.25,
          }}
        >
          （ツボ×グッズ）
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 34,
            color: "#241a26",
          }}
        >
          通わない、頑張らない。ズボラでも続くセルフケア。
        </div>
      </div>
    ),
    { ...size }
  );
}
