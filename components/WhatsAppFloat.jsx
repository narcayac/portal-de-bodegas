"use client";

import { useEffect, useState } from "react";
import { waUrl } from "../lib/data";
import { WhatsAppIcon } from "./ui";

/**
 * Floating WhatsApp button, mobile only — appears after scrolling down, so it
 * never shows at the same time as the hero's WhatsApp button. On desktop the
 * navbar pill (also scroll-triggered) plays this role instead; the .wa-float
 * class (globals.css) keeps this hidden above the mobile breakpoint.
 * Conversion tracking is automatic: TrackingEvents captures every wa.me link.
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 320);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <a
      href={waUrl("Hola, quisiera más información sobre una bodega")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="wa-float"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 90,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .25s ease, transform .25s ease",
      }}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
