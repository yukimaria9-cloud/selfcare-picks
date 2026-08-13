import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOSホーム画面用アイコン。icon.tsxと同じデザインを大きいサイズで生成する
// (iOS側で自動的に角丸がつくため、こちらは正方形のまま作る)。
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff6f91",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
