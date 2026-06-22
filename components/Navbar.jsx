"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { C, F, waUrl, HREF, SITE, PROJECTS } from "../lib/data";
import { LogoMark } from "./ui";
import { BtnPrimary } from "./Buttons";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Normalize path (with/without trailing slash)
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "") + "/";
  const isHome = path === "/";
  const isBodegas = path.startsWith("/bodegas");

  // Transparent nav only over the hero on the home page
  const light = isHome && !scrolled && !mobileOpen;

  const closeAll = () => { setMobileOpen(false); setDropOpen(false); };

  const NavLink = ({ label, href }) => {
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return (
      <Link href={href} onClick={closeAll} style={{
        background: "none", border: "none", fontFamily: F.body, fontSize: 13,
        fontWeight: active ? 600 : 400, textDecoration: "none",
        color: light
          ? (active ? "white" : "rgba(255,255,255,0.65)")
          : (active ? C.navy : C.slate),
        cursor: "pointer", padding: "8px 14px", letterSpacing: "0.01em",
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
      <div style={{ ...W, display: "flex", alignItems: "center", height: 62, justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href={HREF.home} onClick={closeAll} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "none" }}>
          <LogoMark light={light} />
        </Link>

        {/* Desktop nav — hidden on mobile via Tailwind */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 4 }}>
          <NavLink label="Inicio" href={HREF.home} />

          {/* Bodegas dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}>
            <Link href={HREF.bodegas} style={{
              background: "none", border: "none", fontFamily: F.body, fontSize: 13,
              fontWeight: isBodegas ? 600 : 400, textDecoration: "none",
              color: light ? (isBodegas ? "white" : "rgba(255,255,255,0.65)") : (isBodegas ? C.navy : C.slate),
              cursor: "pointer", padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Bodegas <ChevronDown size={12} />
            </Link>
            {dropOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", left: -8,
                backgroundColor: "white", border: `0.5px solid ${C.border}`,
                boxShadow: "0 8px 28px rgba(1,25,67,0.12)",
                minWidth: 224, padding: "6px 0", zIndex: 300,
              }}>
                {PROJECTS.map(p => (
                  <Link key={p.id} href={HREF.proyecto(p.id)} onClick={closeAll} style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "11px 20px", background: "none", border: "none", textDecoration: "none",
                    fontFamily: F.body, fontSize: 13, color: C.navy, cursor: "pointer",
                  }}>{p.name}</Link>
                ))}
                <div style={{ height: "0.5px", backgroundColor: C.border, margin: "4px 12px" }} />
                <Link href={HREF.bodegas} onClick={closeAll} style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "11px 20px", background: "none", border: "none", textDecoration: "none",
                  fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 600, cursor: "pointer",
                }}>Ver todos los proyectos →</Link>
              </div>
            )}
          </div>

          <NavLink label="Disponibilidad" href={HREF.disponibilidad} />
          <NavLink label="Contacto" href={HREF.contacto} />
        </div>

        {/* Phone link (desktop) + hamburger (mobile) + sticky CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={waUrl("Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
            className="hidden md:block"
            style={{
              fontFamily: F.body, fontSize: 13, fontWeight: 500, textDecoration: "none",
              color: light ? C.blueLight : C.blue,
              borderBottom: `1px solid ${light ? C.blueLight : C.blue}`, paddingBottom: 1,
            }}>
            {SITE.phoneDisplay}
          </a>
          <div className="hidden md:block">
            <BtnPrimary href={HREF.disponibilidad}>Solicitar disponibilidad</BtnPrimary>
          </div>
          <button className="md:hidden" aria-label="Abrir menú" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
            {mobileOpen
              ? <X size={22} color={light ? "white" : C.navy} />
              : <Menu size={22} color={light ? "white" : C.navy} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div style={{ backgroundColor: "white", borderTop: `0.5px solid ${C.border}`, padding: "8px 24px 24px" }}>
          {[["Inicio", HREF.home], ["Bodegas", HREF.bodegas], ["Disponibilidad", HREF.disponibilidad], ["Contacto", HREF.contacto]].map(([label, href]) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return (
              <Link key={href} href={href} onClick={closeAll} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "14px 0", background: "none", border: "none", textDecoration: "none",
                borderBottom: `0.5px solid ${C.border}`,
                fontFamily: F.body, fontSize: 16, cursor: "pointer",
                fontWeight: active ? 600 : 400,
                color: active ? C.blue : C.navy,
              }}>{label}</Link>
            );
          })}
          <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", margin: "16px 0 8px" }}>Proyectos</p>
          {PROJECTS.map(p => (
            <Link key={p.id} href={HREF.proyecto(p.id)} onClick={closeAll} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 0", background: "none", border: "none", textDecoration: "none",
              borderBottom: `0.5px solid ${C.border}`,
              fontFamily: F.body, fontSize: 14, color: C.navy, cursor: "pointer",
            }}>{p.name}</Link>
          ))}
          <div style={{ marginTop: 20 }}>
            <BtnPrimary href={HREF.disponibilidad} full>Solicitar disponibilidad</BtnPrimary>
          </div>
        </div>
      )}
    </nav>
  );
}

const W = { maxWidth: 1280, margin: "0 auto", padding: "0 40px" };
