import { ImageResponse } from "next/og";

export const alt = "Portal de Bodegas — Arriendo de bodegas para empresas en San Bernardo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide social share image (Open Graph + Twitter). Branded navy card.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#011943",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 72,
              backgroundColor: "#02214f",
              border: "2px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 800, color: "#f3f4f5", marginTop: -8 }}>P</div>
            <div style={{ position: "absolute", bottom: 16, width: 40, height: 8, borderRadius: 2, backgroundColor: "#0685de" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>Portal de</div>
            <div style={{ fontSize: 24, letterSpacing: 3, color: "white", fontWeight: 800, textTransform: "uppercase" }}>Bodegas</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: "white", lineHeight: 1.05, maxWidth: 920 }}>
            Arriendo de bodegas para empresas
          </div>
          <div style={{ fontSize: 30, color: "#89c7f6", marginTop: 24 }}>
            San Bernardo · Región Metropolitana · Trato directo
          </div>
        </div>

        {/* Footer rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 4, backgroundColor: "#0685de" }} />
          <div style={{ fontSize: 24, color: "#adb2c0" }}>www.portaldebodegas.cl</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
