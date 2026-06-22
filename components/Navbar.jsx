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
  ["Disponibilidad", HREF.disponibilidad],
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
  const light = isHome && !scrolled;

  // WhatsApp appears on scroll (always visible on inner pages)
  const waVisible = scrolled || !isHome;

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
      backgroundColor: light ? "transparent" : "white",
      borderBottom: light ? "none" : `0.5px solid ${C.border}`,
      boxShadow: light ? "none" : "0 1px 12px rgba(1,25,67,0.06)",
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
          <div style={{ position: "relative" }}
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
                position: "absolute", top: "calc(100% + 6px)", left: -8,
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
          <NavLink label="Disponibilidad" href={HREF.disponibilidad} />
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
          <a href={waUrl("Hola, quiero contactar a Portal de Bodegas")} target="_blank" rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="wa-pill"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              backgroundColor: C.blue, color: "white", textDecoration: "none",
              borderRadius: 999, fontFamily: F.body, fontSize: 13.5, fontWeight: 600,
              boxShadow: "0 2px 10px rgba(6,133,222,0.30)",
            }}>
            <WhatsAppIcon size={18} />
            <span className="wa-label">WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
