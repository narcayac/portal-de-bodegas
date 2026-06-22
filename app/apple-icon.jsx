import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (home-screen bookmark).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#011943",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 104, fontWeight: 800, color: "#f3f4f5", marginTop: -14 }}>P</div>
        <div style={{ position: "absolute", bottom: 44, width: 92, height: 16, borderRadius: 3, backgroundColor: "#0685de" }} />
      </div>
    ),
    { ...size }
  );
}
