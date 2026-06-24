"use client";

import { useState } from "react";
import { C, F } from "../lib/data";
import { SectionLabel } from "./ui";

export default function FaqAccordion({ title = "Preguntas frecuentes", items }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div style={{ borderTop: `1px solid ${C.navy}`, maxWidth: 820 }}>
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderBottom: `0.5px solid ${C.border}` }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  padding: "18px 0", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "space-between", gap: 16,
                }}
              >
                <span style={{ fontFamily: F.head, fontWeight: 600, fontSize: 17, color: C.navy, lineHeight: 1.3 }}>{f.q}</span>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, position: "relative",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ position: "absolute", width: 13, height: 1.5, backgroundColor: C.blue }} />
                  <span style={{
                    position: "absolute", width: 13, height: 1.5, backgroundColor: C.blue,
                    transform: isOpen ? "rotate(0deg)" : "rotate(90deg)", transition: "transform 0.2s",
                  }} />
                </span>
              </button>
              <div style={{
                maxHeight: isOpen ? 260 : 0, overflow: "hidden",
                transition: "max-height 0.28s ease, opacity 0.28s ease",
                opacity: isOpen ? 1 : 0,
              }}>
                <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, lineHeight: 1.7, margin: "0 0 20px", maxWidth: 720 }}>
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
