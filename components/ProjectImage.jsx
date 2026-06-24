"use client";

import { useState } from "react";
import { F } from "../lib/data";
import { Img } from "./ui";

/**
 * Shows the real project photo at /photos/<projectId>/fachada-01.webp.
 * If the file isn't uploaded yet (or fails to load), it falls back to the
 * line-art placeholder automatically — no code change needed when photos arrive.
 */
export function ProjectImage({ projectId, height = 240, alt = "", status = "Disponible" }) {
  const [err, setErr] = useState(false);

  if (err || !projectId) {
    return <Img height={height} alt={alt} status={status} />;
  }

  return (
    <div style={{ height, position: "relative", overflow: "hidden" }}>
      <img
        src={`/photos/${projectId}/fachada-01.webp`}
        alt={alt}
        loading="lazy"
        onError={() => setErr(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{ position: "absolute", top: 12, left: 12, display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.92)", padding: "4px 9px", borderRadius: 3 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
        <span style={{ fontFamily: F.mono, fontSize: 9.5, color: "#15803d", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>{status}</span>
      </div>
    </div>
  );
}
