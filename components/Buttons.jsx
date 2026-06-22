"use client";

import { useState } from "react";
import Link from "next/link";
import { C, F, waUrl } from "../lib/data";
import { WhatsAppIcon } from "./ui";

/** Primary action: "Solicitar disponibilidad" — brand blue. Renders a Next Link when `href` is set. */
export function BtnPrimary({ children, href, onClick, full = false }) {
  const [h, sH] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 6,
    backgroundColor: h ? C.blueDark : C.blue,
    color: "white", border: "none", borderRadius: 4,
    padding: "13px 26px", fontSize: 14, fontWeight: 600,
    fontFamily: F.body, cursor: "pointer", textDecoration: "none",
    letterSpacing: "0.01em", transition: "background-color 0.15s",
    width: full ? "100%" : undefined,
    justifyContent: full ? "center" : undefined,
  };
  const handlers = { onMouseEnter: () => sH(true), onMouseLeave: () => sH(false) };
  if (href) return <Link href={href} style={style} {...handlers}>{children}</Link>;
  return <button type="button" style={style} onClick={onClick} {...handlers}>{children}</button>;
}

/** WhatsApp button — brand blue with WhatsApp glyph (matches design system) */
export function BtnWA({ children, msg, full = false, outline = false }) {
  const [h, sH] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 8,
    backgroundColor: outline ? "transparent" : (h ? C.blueDark : C.blue),
    color: outline ? C.blue : "white",
    border: outline ? `1px solid ${C.blue}` : "none",
    borderRadius: 4, padding: "13px 22px", fontSize: 14, fontWeight: 600,
    fontFamily: F.body, textDecoration: "none",
    transition: "background-color 0.15s",
    width: full ? "100%" : undefined,
    justifyContent: full ? "center" : undefined,
  };
  return (
    <a href={waUrl(msg || "Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
      style={style} onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)}>
      <WhatsAppIcon size={17} />
      {children}
    </a>
  );
}

/** Ghost/outline button. Renders a Next Link when `href` is set. */
export function BtnOutline({ children, href, onClick, light = false }) {
  const [h, sH] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 6,
    backgroundColor: h ? (light ? "rgba(255,255,255,0.08)" : "rgba(1,25,67,0.04)") : "transparent",
    color: light ? "white" : C.navy,
    border: `1px solid ${light ? "rgba(255,255,255,0.30)" : C.navy}`,
    borderRadius: 4, padding: "12px 22px", fontSize: 14, fontWeight: 500,
    fontFamily: F.body, cursor: "pointer", textDecoration: "none", transition: "background-color 0.15s",
  };
  const handlers = { onMouseEnter: () => sH(true), onMouseLeave: () => sH(false) };
  if (href) return <Link href={href} style={style} {...handlers}>{children}</Link>;
  return <button type="button" onClick={onClick} style={style} {...handlers}>{children}</button>;
}
