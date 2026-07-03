"use client";

import { useState } from "react";
import { C, F } from "../lib/data";

/**
 * Swipeable photo gallery for a project. Shows /photos/<id>/foto-0N.webp,
 * skipping any that fail to load. Scroll-snap carousel (works on touch + desktop).
 */
export function ProjectGallery({ projectId, alt = "", count = 3 }) {
  const [broken, setBroken] = useState({});
  const items = Array.from({ length: count }, (_, i) => i + 1).filter((n) => !broken[n]);

  return (
    <div>
      <div className="nav-scroll" style={{
        display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch", padding: "0 0 6px",
      }}>
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
          <div key={n} style={{
            flex: items.length > 1 ? "0 0 88%" : "0 0 100%",
            maxWidth: items.length > 1 ? 760 : "100%",
            scrollSnapAlign: "start",
            display: broken[n] ? "none" : "block",
            backgroundColor: "#e4e9f2",
          }}>
            <img
              src={`/photos/${projectId}/foto-0${n}.webp`}
              alt={`${alt} — foto ${n}`}
              loading="lazy"
              onError={() => setBroken((b) => ({ ...b, [n]: true }))}
              style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <span style={{ fontFamily: F.mono, fontSize: 10.5, color: C.slate, letterSpacing: "0.06em" }}>
          ← Desliza para ver más fotos →
        </span>
      </div>
    </div>
  );
}
