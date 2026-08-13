import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// ブラウザタブ用favicon。ツボの位置を示す赤い点(TsuboLocationPhotoの目印)を
// モチーフに、ブランドカラーの円の中心にツボ印を置いたシンプルなマーク。
export default function Icon() {
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
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
