"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { C, F, waUrl, HREF, PROJECTS } from "../lib/data";
import { LogoMark, WhatsAppIcon } from "./ui";

const W = { maxWidth: 1280, margin: "0 auto", padding: "0 40px" };
const NAV = [
  ["Inicio", HREF.home],
  ["Bodegas", HREF.bodegas],
  ["Guías", HREF.guias],
  ["Contacto", HREF.contacto],
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "") + "/";
  const isHome = path === "/";
  const isBodegas = path.startsWith("/bodegas");
  // Navy navbar with white text/logo (contrasts with the white page).
  const light = true;

  // WhatsApp pill appears only on scroll — at the top of every page the hero
  // already shows a WhatsApp button, so this avoids showing two at once.
  const waVisible = scrolled;

  const linkColor = (active) =>
    light ? (active ? "white" : "rgba(255,255,255,0.7)") : (active ? C.navy : C.slate);

  const NavLink = ({ label, href }) => {
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return (
      <Link href={href} onClick={() => setDropOpen(false)} style={{
        fontFamily: F.body, fontSize: 13.5, fontWeight: active ? 600 : 400,
        textDecoration: "none", color: linkColor(active),
        padding: "8px 14px", letterSpacing: "0.01em", whiteSpace: "nowrap",
      }}>{label}</Link>
    );
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: C.navy,
      borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      boxShadow: "0 1px 14px rgba(1,25,67,0.25)",
      transition: "background 0.28s, box-shadow 0.28s",
    }}>
      <div style={{ ...W, display: "flex", alignItems: "center", height: 64, gap: 10 }}>
        {/* Logo */}
        <Link href={HREF.home} onClick={() => setDropOpen(false)} style={{ flexShrink: 0, textDecoration: "none" }}>
          <LogoMark light={light} />
        </Link>

        {/* Desktop nav (centered) */}
        <div className="hidden md:flex" style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 2 }}>
          <NavLink label="Inicio" href={HREF.home} />
          <div style={{ position: "relative", paddingBottom: 10, marginBottom: -10 }}
            onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
            <Link href={HREF.bodegas} style={{
              fontFamily: F.body, fontSize: 13.5, fontWeight: isBodegas ? 600 : 400, textDecoration: "none",
              color: linkColor(isBodegas), padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Bodegas <ChevronDown size={12} />
            </Link>
            {dropOpen && (
              <div style={{
                position: "absolute", top: "100%", left: -8,
                backgroundColor: "white", border: `0.5px solid ${C.border}`,
                boxShadow: "0 8px 28px rgba(1,25,67,0.12)", minWidth: 224, padding: "6px 0", zIndex: 300,
              }}>
                {PROJECTS.map((p) => (
                  <Link key={p.id} href={HREF.proyecto(p.id)} onClick={() => setDropOpen(false)} style={{
                    display: "block", padding: "11px 20px", textDecoration: "none",
                    fontFamily: F.body, fontSize: 13, color: C.navy,
                  }}>{p.name}</Link>
                ))}
                <div style={{ height: "0.5px", backgroundColor: C.border, margin: "4px 12px" }} />
                <Link href={HREF.bodegas} onClick={() => setDropOpen(false)} style={{
                  display: "block", padding: "11px 20px", textDecoration: "none",
                  fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 600,
                }}>Ver todos los proyectos →</Link>
              </div>
            )}
          </div>
          <NavLink label="Guías" href={HREF.guias} />
          <NavLink label="Contacto" href={HREF.contacto} />
        </div>

        {/* Mobile nav — horizontally scrollable, no hamburger */}
        <div className="md:hidden nav-scroll" style={{ flex: 1, minWidth: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, whiteSpace: "nowrap", width: "max-content" }}>
            {NAV.map(([label, href]) => {
              const active = href === "/" ? path === "/" : path.startsWith(href);
              return (
                <Link key={href} href={href} style={{
                  fontFamily: F.body, fontSize: 13, fontWeight: active ? 600 : 400,
                  textDecoration: "none", color: linkColor(active),
                  padding: "8px 10px", whiteSpace: "nowrap",
                }}>{label}</Link>
              );
            })}
          </div>
        </div>

        {/* WhatsApp — appears on scroll */}
        <div style={{ flexShrink: 0, opacity: waVisible ? 1 : 0, transform: waVisible ? "translateY(0)" : "translateY(-6px)", pointerEvents: waVisible ? "auto" : "none", transition: "opacity .25s ease, transform .25s ease" }}>
          <a href={waUrl("Hola, quisiera más información sobre una bodega")} target="_blank" rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="wa-pill"
            style={{
              alignItems: "center", gap: 8,
              backgroundColor: C.wa, color: "white", textDecoration: "none",
              borderRadius: 999, fontFamily: F.body, fontSize: 13.5, fontWeight: 600,
              boxShadow: "0 2px 10px rgba(37,211,102,0.32)",
            }}>
            <WhatsAppIcon size={18} />
            <span className="wa-label">WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
