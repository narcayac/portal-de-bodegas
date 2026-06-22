import { useState, useEffect } from "react";
import { MapPin, ChevronDown, Menu, X, ChevronRight, Check } from "lucide-react";

// ── BRAND TOKENS ──────────────────────────────────────────────────────────────
const C = {
  navy:       "#011943",
  navyMid:    "#0d2444",
  blue:       "#0685de",
  blueDark:   "#035caa",
  blueLight:  "#89c7f6",
  slate:      "#6c7b92",
  slateLight: "#adb2c0",
  border:     "#e2e8f0",
  bgAlt:      "#f8f9fb",
  wa:         "#25D366",
  waDark:     "#1da851",
};

const F = {
  head: "'Plus Jakarta Sans', sans-serif",
  body: "'Inter', sans-serif",
};

// Max-width container (applied via inline style spread)
const W = { maxWidth: 1280, margin: "0 auto", padding: "0 40px" };

// Helpers
const m2    = (n) => n.toLocaleString("es-CL") + " m²";
const waUrl = (msg) => `https://wa.me/56992259272?text=${encodeURIComponent(msg)}`;

const METRAJES = [
  "Menos de 300 m²",
  "300–600 m²",
  "600–1.000 m²",
  "Más de 1.000 m²",
  "No sé aún",
];

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "el-barrancon",         name: "El Barrancón",        min: 623,  max: 1266 },
  { id: "bosque-catemito",      name: "Bosque Catemito",      min: 360,  max: 1440 },
  { id: "alto-las-acacias",     name: "Alto Las Acacias",     min: 180,  max: 720  },
  { id: "acacias-seis",         name: "Acacias Seis",         min: 1551, max: 1551 },
  { id: "inversiones-duramet",  name: "Inversiones Duramet",  min: 450,  max: 1900 },
];

const PROJECT_SPECS = [
  ["Seguridad",    "24/7 · CCTV"],
  ["Energía",      "Trifásica instalada"],
  ["Pavimento",    "Radier industrial"],
  ["Acceso",       "Camiones · Patio de maniobras"],
  ["Control",      "Acceso controlado"],
];

const EQUIP_LIST = [
  "Seguridad 24/7",
  "CCTV",
  "Energía trifásica",
  "Control de acceso",
  "Radieres industriales",
  "Patio de maniobras",
  "Acceso para camiones",
];

// ── LOGO MARK ─────────────────────────────────────────────────────────────────
function LogoMark({ light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Circular emblem — mirrors logo structure: navy circle, P letterform, blue bar */}
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        backgroundColor: C.navy,
        border: light ? "1.5px solid rgba(255,255,255,0.22)" : "none",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <span style={{ fontFamily: F.head, fontWeight: 800, fontSize: 18, color: "#f3f4f5", lineHeight: 1, position: "relative", zIndex: 2, marginBottom: 5 }}>P</span>
        <div style={{ position: "absolute", bottom: 6, left: 7, right: 7, height: 7, backgroundColor: C.blue, borderRadius: 1.5, zIndex: 1 }} />
      </div>
      {/* Wordmark */}
      <div>
        <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 10.5, letterSpacing: "0.10em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.6)" : C.slate, lineHeight: 1.3 }}>
          Portal de
        </div>
        <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: light ? "white" : C.navy, lineHeight: 1.3 }}>
          Bodegas
        </div>
      </div>
    </div>
  );
}

// ── BUTTONS ───────────────────────────────────────────────────────────────────

/** Primary action: "Solicitar disponibilidad" — brand blue */
function BtnPrimary({ children, onClick, href, full = false }) {
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
  return href
    ? <a href={href} style={style} {...handlers}>{children}</a>
    : <button style={style} onClick={onClick} {...handlers}>{children}</button>;
}

/** WhatsApp button — green, strategic use only */
function BtnWA({ children, msg, full = false, outline = false }) {
  const [h, sH] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 6,
    backgroundColor: outline ? "transparent" : (h ? C.waDark : C.wa),
    color: outline ? C.wa : "white",
    border: outline ? `1px solid ${C.wa}` : "none",
    borderRadius: 4, padding: "13px 22px", fontSize: 14, fontWeight: 600,
    fontFamily: F.body, textDecoration: "none",
    transition: "background-color 0.15s",
    width: full ? "100%" : undefined,
    justifyContent: full ? "center" : undefined,
  };
  return (
    <a href={waUrl(msg || "Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
      style={style} onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)}>
      {children}
    </a>
  );
}

/** Ghost/outline button */
function BtnOutline({ children, onClick, light = false }) {
  const [h, sH] = useState(false);
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      backgroundColor: h ? (light ? "rgba(255,255,255,0.08)" : "rgba(1,25,67,0.04)") : "transparent",
      color: light ? "white" : C.navy,
      border: `1px solid ${light ? "rgba(255,255,255,0.30)" : C.navy}`,
      borderRadius: 4, padding: "12px 22px", fontSize: 14, fontWeight: 500,
      fontFamily: F.body, cursor: "pointer", transition: "background-color 0.15s",
    }} onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)}>
      {children}
    </button>
  );
}

// ── SHARED UI ─────────────────────────────────────────────────────────────────

/** Small uppercase label with blue rule */
function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 8 }}>
        {children}
      </div>
      <div style={{ height: 1.5, width: 32, backgroundColor: C.blue }} />
    </div>
  );
}

/**
 * Photo placeholder — architectural grid pattern on dark navy.
 * Accepts a `shade` index (0-4) for subtle color variation per project.
 * When real photos are ready: replace <Img> with <img src="..." alt="..." style={{width:"100%",height,objectFit:"cover"}} />
 */
function Img({ height = 240, shade = 0 }) {
  const bgs = ["#0d2444", "#091c38", "#071832", "#0b213c", "#0f2748"];
  return (
    <div style={{
      height,
      backgroundColor: bgs[shade % 5],
      backgroundImage: [
        "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)",
        "repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)",
      ].join(","),
      position: "relative", display: "flex", alignItems: "flex-end", padding: "12px 14px",
    }}>
      {/* Availability indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.blue }} />
        <span style={{ fontFamily: F.body, fontSize: 9.5, color: C.blueLight, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Disponible
        </span>
      </div>
      {/* Placeholder label */}
      <div style={{ position: "absolute", top: 10, right: 12, opacity: 0.22 }}>
        <span style={{ fontFamily: F.body, fontSize: 9, color: "white", letterSpacing: "0.09em", textTransform: "uppercase" }}>
          Foto próximamente
        </span>
      </div>
    </div>
  );
}

/** Shared availability table — used on Home and Disponibilidad pages */
function AvailTable({ goProj }) {
  return (
    <div>
      {/* Header row */}
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 110px",
        padding: "9px 0", gap: 12,
        borderTop: `1px solid ${C.navy}`, borderBottom: `0.5px solid ${C.border}`,
      }}>
        {["Proyecto", "Desde", "Hasta", ""].map(h => (
          <span key={h} style={{ fontFamily: F.body, fontSize: 10, fontWeight: 600, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
        ))}
      </div>
      {/* Data rows */}
      {PROJECTS.map((p, i) => (
        <div key={p.id} style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 110px",
          padding: "15px 0", gap: 12, alignItems: "center",
          borderBottom: `0.5px solid ${C.border}`,
          backgroundColor: i % 2 === 0 ? "white" : C.bgAlt,
        }}>
          <button onClick={() => goProj(p)} style={{
            background: "none", border: "none", fontFamily: F.body, fontSize: 14,
            fontWeight: 600, color: C.navy, cursor: "pointer", textAlign: "left",
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>{p.name}</button>
          <span style={{ fontFamily: F.body, fontSize: 14, color: C.slate }}>{m2(p.min)}</span>
          <span style={{ fontFamily: F.body, fontSize: 14, color: C.slate }}>{m2(p.max)}</span>
          <button onClick={() => goProj(p)} style={{
            background: "none", border: "none", fontFamily: F.body, fontSize: 13,
            color: C.blue, fontWeight: 500, cursor: "pointer", textAlign: "left",
            borderBottom: `1px solid ${C.blue}`, paddingBottom: 1, display: "inline-block",
          }}>Solicitar →</button>
        </div>
      ))}
      <div style={{ borderBottom: `1px solid ${C.navy}` }} />
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Transparent nav only over the hero on the home page
  const light = page === "home" && !scrolled && !mobileOpen;

  const navGo = (p, proj = null) => {
    go(p, proj);
    setMobileOpen(false);
    setDropOpen(false);
  };

  const NavLink = ({ label, target }) => (
    <button onClick={() => navGo(target)} style={{
      background: "none", border: "none", fontFamily: F.body, fontSize: 13,
      fontWeight: page === target ? 600 : 400,
      color: light
        ? (page === target ? "white" : "rgba(255,255,255,0.65)")
        : (page === target ? C.navy : C.slate),
      cursor: "pointer", padding: "8px 14px", letterSpacing: "0.01em",
    }}>{label}</button>
  );

  const isBodegas = page === "bodegas" || page === "proyecto";

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
        <button onClick={() => navGo("home")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <LogoMark light={light} />
        </button>

        {/* Desktop nav — hidden on mobile via Tailwind */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 4 }}>
          <NavLink label="Inicio" target="home" />

          {/* Bodegas dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}>
            <button style={{
              background: "none", border: "none", fontFamily: F.body, fontSize: 13,
              fontWeight: isBodegas ? 600 : 400,
              color: light ? (isBodegas ? "white" : "rgba(255,255,255,0.65)") : (isBodegas ? C.navy : C.slate),
              cursor: "pointer", padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Bodegas <ChevronDown size={12} />
            </button>
            {dropOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", left: -8,
                backgroundColor: "white", border: `0.5px solid ${C.border}`,
                boxShadow: "0 8px 28px rgba(1,25,67,0.12)",
                minWidth: 224, padding: "6px 0", zIndex: 300,
              }}>
                {PROJECTS.map(p => (
                  <button key={p.id} onClick={() => navGo("proyecto", p)} style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "11px 20px", background: "none", border: "none",
                    fontFamily: F.body, fontSize: 13, color: C.navy, cursor: "pointer",
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >{p.name}</button>
                ))}
                <div style={{ height: "0.5px", backgroundColor: C.border, margin: "4px 12px" }} />
                <button onClick={() => navGo("bodegas")} style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "11px 20px", background: "none", border: "none",
                  fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 600, cursor: "pointer",
                }}>Ver todos los proyectos →</button>
              </div>
            )}
          </div>

          <NavLink label="Disponibilidad" target="disponibilidad" />
          <NavLink label="Contacto" target="contacto" />
        </div>

        {/* Phone link (desktop) + hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={waUrl("Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
            className="hidden md:block"
            style={{
              fontFamily: F.body, fontSize: 13, fontWeight: 500, textDecoration: "none",
              color: light ? C.blueLight : C.blue,
              borderBottom: `1px solid ${light ? C.blueLight : C.blue}`, paddingBottom: 1,
            }}>
            +56 9 9225 9272
          </a>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
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
          {[["Inicio", "home"], ["Bodegas", "bodegas"], ["Disponibilidad", "disponibilidad"], ["Contacto", "contacto"]].map(([label, target]) => (
            <button key={target} onClick={() => navGo(target)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "14px 0", background: "none", border: "none",
              borderBottom: `0.5px solid ${C.border}`,
              fontFamily: F.body, fontSize: 16, cursor: "pointer",
              fontWeight: page === target ? 600 : 400,
              color: page === target ? C.blue : C.navy,
            }}>{label}</button>
          ))}
          <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", margin: "16px 0 8px" }}>Proyectos</p>
          {PROJECTS.map(p => (
            <button key={p.id} onClick={() => navGo("proyecto", p)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 0", background: "none", border: "none",
              borderBottom: `0.5px solid ${C.border}`,
              fontFamily: F.body, fontSize: 14, color: C.navy, cursor: "pointer",
            }}>{p.name}</button>
          ))}
          <div style={{ marginTop: 20 }}>
            <BtnPrimary onClick={() => navGo("disponibilidad")} full>Solicitar disponibilidad</BtnPrimary>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ go }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.navy}`, backgroundColor: "white" }}>
      <div style={{ ...W, padding: "40px 40px 28px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 40, marginBottom: 40 }}>
          <div>
            <LogoMark />
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.slate, marginTop: 16, lineHeight: 1.7 }}>
              Plataforma especializada en arriendo de bodegas para empresas en el sector sur de Santiago.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Navegación</p>
            {[["Inicio", "home"], ["Bodegas", "bodegas"], ["Disponibilidad", "disponibilidad"], ["Contacto", "contacto"]].map(([label, target]) => (
              <button key={target} onClick={() => go(target)} style={{ display: "block", background: "none", border: "none", fontFamily: F.body, fontSize: 13.5, color: C.slate, cursor: "pointer", padding: "4px 0" }}>{label}</button>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Proyectos</p>
            {PROJECTS.map(p => (
              <button key={p.id} onClick={() => go("proyecto", p)} style={{ display: "block", background: "none", border: "none", fontFamily: F.body, fontSize: 13.5, color: C.slate, cursor: "pointer", padding: "4px 0" }}>{p.name}</button>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Contacto</p>
            <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.slate, marginBottom: 10, lineHeight: 1.6 }}>
              portaldebodegas.cl<br />
              San Bernardo · Región Metropolitana
            </p>
            <a href={waUrl("Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: F.body, fontSize: 13.5, color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blue}`, paddingBottom: 1 }}>
              +56 9 9225 9272
            </a>
          </div>
        </div>
        <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight }}>© 2025 Portal de Bodegas · portaldebodegas.cl</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Política de Privacidad", "Términos y Condiciones"].map(l => (
              <span key={l} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, cursor: "pointer", textDecoration: "underline" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ go, goProj }) {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "92vh", paddingTop: 62, display: "flex", alignItems: "center",
        backgroundColor: C.navy,
        backgroundImage: [
          "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)",
          "repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)",
        ].join(","),
      }}>
        <div style={{ ...W, padding: "72px 40px" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 28 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: C.blue }} />
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.slateLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Sector Sur · Región Metropolitana · San Bernardo
            </span>
          </div>
          {/* H1 */}
          <h1 style={{
            fontFamily: F.head, fontWeight: 800,
            fontSize: "clamp(36px, 4.8vw, 60px)",
            lineHeight: 1.05, color: "white",
            maxWidth: 680, marginBottom: 22, letterSpacing: "-0.01em",
          }}>
            Encuentra la bodega ideal<br />para tu empresa
          </h1>
          {/* Subtitle — no specific project count, communicates value */}
          <p style={{ fontFamily: F.body, fontSize: 17, color: C.slateLight, maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
            Distintas alternativas de tamaño disponibles en el sector sur de Santiago. Trato directo y sin intermediarios.
          </p>
          {/* CTAs: primary blue + ghost outline */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <BtnPrimary onClick={() => go("disponibilidad")}>Solicitar disponibilidad</BtnPrimary>
            <BtnOutline onClick={() => go("contacto")} light>Contactar por WhatsApp</BtnOutline>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, display: "flex", flexWrap: "wrap" }}>
          {[
            ["5 proyectos",    "Disponibles en San Bernardo"],
            ["180 – 1.900 m²", "Superficie por proyecto"],
            ["Trato directo",  "Sin intermediarios ni comisiones"],
            ["< 24 horas",     "Tiempo de respuesta"],
          ].map(([val, lab], i) => (
            <div key={lab} style={{ flex: 1, minWidth: 150, padding: "28px 32px", borderLeft: i > 0 ? `0.5px solid ${C.border}` : "none" }}>
              <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 22, color: C.navy, lineHeight: 1, marginBottom: 6 }}>{val}</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em" }}>{lab}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS (editorial: featured left + list right) ── */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <SectionLabel>Proyectos disponibles</SectionLabel>
            <button onClick={() => go("bodegas")} style={{ background: "none", border: "none", fontFamily: F.body, fontSize: 13, color: C.blue, cursor: "pointer", fontWeight: 500 }}>
              Ver todos →
            </button>
          </div>
        </div>
        <div style={{ ...W }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", border: `0.5px solid ${C.border}` }}>
            {/* Featured project */}
            <div style={{ borderRight: `0.5px solid ${C.border}`, cursor: "pointer" }}
              onClick={() => goProj(PROJECTS[0])}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
              <Img height={260} shade={0} />
              <div style={{ padding: "20px 24px 24px", borderTop: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.navy, marginBottom: 4 }}>{PROJECTS[0].name}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 14 }}>San Bernardo · Región Metropolitana</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Superficie</div>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.blue }}>
                      {m2(PROJECTS[0].min)} – {m2(PROJECTS[0].max)}
                    </div>
                  </div>
                  <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver proyecto →</span>
                </div>
              </div>
            </div>
            {/* Project list */}
            <div>
              {PROJECTS.slice(1).map((p, i) => (
                <div key={p.id} onClick={() => goProj(p)}
                  style={{ display: "flex", borderBottom: i < 3 ? `0.5px solid ${C.border}` : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  <div style={{ flexShrink: 0, width: 88 }}>
                    <Img height={88} shade={i + 1} />
                  </div>
                  <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, marginBottom: 5 }}>San Bernardo, RM</div>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.blue }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY TABLE ── */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
            <SectionLabel>Disponibilidad actual</SectionLabel>
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.slate }}>Actualizado regularmente</span>
          </div>
          <AvailTable goProj={goProj} />
          <div style={{ marginTop: 24 }}>
            <BtnPrimary onClick={() => go("disponibilidad")}>Ver disponibilidad completa</BtnPrimary>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: "80px 0 72px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
            Disponibilidad · Trato directo · San Bernardo
          </div>
          <h2 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 32, color: C.navy, marginBottom: 28, lineHeight: 1.1 }}>
            ¿Necesitas una bodega<br />para tu empresa?
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => go("disponibilidad")}>Solicitar disponibilidad</BtnPrimary>
            <a href={waUrl("Hola, quiero cotizar una bodega para mi empresa")} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: F.body, fontSize: 14, color: C.wa, fontWeight: 600, textDecoration: "none", borderBottom: `1.5px solid ${C.wa}`, paddingBottom: 2 }}>
              WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ── BODEGAS HUB ───────────────────────────────────────────────────────────────
function BodegasPage({ go, goProj }) {
  return (
    <>
      {/* Dark page header */}
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "72px 40px 56px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 16 }}>
            Proyectos · San Bernardo · Región Metropolitana
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", color: "white", letterSpacing: "-0.01em" }}>
            Bodegas en Arriendo
          </h1>
        </div>
      </div>

      <section style={{ padding: "56px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Todos los proyectos</SectionLabel>

          {/* 2-column editorial grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {PROJECTS.map((p, i) => {
              const isLast = i === PROJECTS.length - 1 && PROJECTS.length % 2 !== 0;
              return (
                <div key={p.id} onClick={() => goProj(p)}
                  style={{
                    borderRight: (i % 2 === 0 && !isLast) ? `0.5px solid ${C.border}` : "none",
                    borderBottom: (i < PROJECTS.length - 2 || (!isLast && i < PROJECTS.length - 1)) ? `0.5px solid ${C.border}` : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
                  <Img height={190} shade={i} />
                  <div style={{ padding: "20px 22px 22px", borderTop: `0.5px solid ${C.border}` }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 12 }}>San Bernardo · Región Metropolitana</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.blue }}>
                        {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                      </div>
                      <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <SectionLabel>Disponibilidad actual</SectionLabel>
          <AvailTable goProj={goProj} />
          <div style={{ marginTop: 24, marginBottom: 64 }}>
            <BtnPrimary onClick={() => go("disponibilidad")}>Ver disponibilidad detallada</BtnPrimary>
          </div>
        </div>
      </section>
    </>
  );
}

// ── PROJECT PAGE ──────────────────────────────────────────────────────────────
function ProjectPage({ project, go, goProj }) {
  if (!project) return null;
  const idx = PROJECTS.findIndex(p => p.id === project.id);
  const related = PROJECTS.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div style={{ paddingTop: 62 }}>
      {/* Breadcrumb */}
      <div style={{ padding: "12px 40px", borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, padding: 0, display: "flex", alignItems: "center", gap: 8 }}>
          {[["Bodegas", "bodegas"], ["San Bernardo", "bodegas"]].map(([label, target], i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => go(target)} style={{ background: "none", border: "none", fontFamily: F.body, fontSize: 12, color: C.slate, cursor: "pointer", padding: 0 }}>{label}</button>
              <ChevronRight size={11} color={C.slateLight} />
            </span>
          ))}
          <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, fontWeight: 500 }}>{project.name}</span>
        </div>
      </div>

      {/* Hero photo — full bleed, no border-radius */}
      <Img height={360} shade={idx} />

      {/* Project header: H1 left, m² right */}
      <div style={{ borderBottom: `0.5px solid ${C.border}`, borderTop: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, padding: "28px 40px" }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
              San Bernardo · Región Metropolitana
            </div>
            <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>
              {project.name}
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>Superficie disponible</div>
            <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(24px,3vw,38px)", color: C.blue, lineHeight: 1 }}>
              {project.min === project.max ? m2(project.min) : `${m2(project.min)} – ${m2(project.max)}`}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: spec sheet | CTA sidebar */}
      <div style={{ ...W, display: "grid", gridTemplateColumns: "1fr 300px", alignItems: "start", padding: "0 40px" }}>
        {/* Left: data sheet */}
        <div style={{ padding: "40px 40px 40px 0", borderRight: `0.5px solid ${C.border}` }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 16 }}>Ficha del proyecto</div>

          {PROJECT_SPECS.map(([key, val]) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: `0.5px solid ${C.border}` }}>
              <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>{key}</span>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.navy, fontWeight: 500 }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: `1px solid ${C.navy}` }}>
            <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>Disponibilidad</span>
            <span style={{ fontFamily: F.head, fontSize: 15, color: C.blue, fontWeight: 700 }}>
              {project.min === project.max ? m2(project.min) : `${m2(project.min)} – ${m2(project.max)}`}
            </span>
          </div>

          {/* Equipment as text list */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 16 }}>Equipamiento incluido</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
              {EQUIP_LIST.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ color: C.blue, fontSize: 15, lineHeight: 1, flexShrink: 0 }}>—</div>
                  <span style={{ fontFamily: F.body, fontSize: 13.5, color: C.slate }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location strip */}
          <div style={{ marginTop: 36, padding: "20px", backgroundColor: C.bgAlt, borderTop: `1px solid ${C.navy}` }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Ubicación y accesos</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
              {["Acceso a Ruta 5 Sur", "Acceso a Ruta 78", "San Bernardo · Sector sur de Santiago"].map(t => (
                <span key={t} style={{ fontFamily: F.body, fontSize: 13, color: C.slate, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.blue }}>→</span>{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: CTA panel */}
        <div style={{ padding: "40px 0 40px 36px", position: "sticky", top: 70 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 20 }}>Cotiza este proyecto</div>
          <div style={{ padding: "16px 0", borderTop: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}`, marginBottom: 20 }}>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Superficie disponible</div>
            <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.blue }}>
              {project.min === project.max ? m2(project.min) : `${m2(project.min)} – ${m2(project.max)}`}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            <BtnPrimary onClick={() => go("contacto")} full>Solicitar disponibilidad</BtnPrimary>
            <BtnWA msg={`Hola, quiero cotizar disponibilidad en ${project.name}`} full>WhatsApp</BtnWA>
          </div>
          <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20 }}>
            {["Trato directo · sin intermediarios", "Respuesta en menos de 24 horas", "Sin compromiso en la primera consulta"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ color: C.blue, fontSize: 15, lineHeight: 1 }}>—</div>
                <span style={{ fontFamily: F.body, fontSize: 12.5, color: C.slate, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related projects */}
      <section style={{ padding: "0 40px 64px" }}>
        <div style={{ ...W, padding: 0, paddingTop: 48 }}>
          <SectionLabel>Otros proyectos disponibles</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: `0.5px solid ${C.border}` }}>
            {related.map((p, i) => {
              const shade = PROJECTS.findIndex(x => x.id === p.id);
              return (
                <div key={p.id} onClick={() => goProj(p)}
                  style={{ borderRight: i < 2 ? `0.5px solid ${C.border}` : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
                  <Img height={100} shade={shade} />
                  <div style={{ padding: "14px 16px", borderTop: `0.5px solid ${C.border}` }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontFamily: F.head, fontWeight: 600, fontSize: 13, color: C.blue, marginBottom: 8 }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 11.5, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver proyecto →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── DISPONIBILIDAD PAGE ────────────────────────────────────────────────────────
function DisponibilidadPage({ go, goProj }) {
  const [filter, setFilter] = useState("todos");
  const filters = [["todos", "Todos"], ["chica", "Hasta 500 m²"], ["mediana", "500–1.000 m²"], ["grande", "Más de 1.000 m²"]];
  const match = p => {
    if (filter === "todos")   return true;
    if (filter === "chica")   return p.min <= 500;
    if (filter === "mediana") return p.min <= 1000 && p.max >= 500;
    if (filter === "grande")  return p.max >= 1000;
    return true;
  };
  const shown = PROJECTS.filter(match);

  return (
    <>
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "64px 40px 48px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 14 }}>
            Actualizado regularmente · San Bernardo
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "white", letterSpacing: "-0.01em" }}>
            Disponibilidad de Bodegas
          </h1>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div style={{ borderBottom: `0.5px solid ${C.border}`, backgroundColor: "white", position: "sticky", top: 62, zIndex: 50 }}>
        <div style={{ ...W, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", padding: "12px 40px" }}>
          <span style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 12 }}>Filtrar</span>
          {filters.map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{
              padding: "7px 16px", background: "none", border: "none",
              fontFamily: F.body, fontSize: 13, cursor: "pointer",
              fontWeight: filter === val ? 600 : 400,
              color: filter === val ? C.navy : C.slate,
              borderBottom: filter === val ? `2px solid ${C.navy}` : "2px solid transparent",
              transition: "border-color 0.15s",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <section style={{ padding: "48px 0 80px" }}>
        <div style={{ ...W }}>
          {shown.length === 0 && (
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, padding: "32px 0" }}>No hay proyectos que coincidan con ese filtro actualmente.</p>
          )}
          {shown.length > 0 && (
            <>
              <AvailTable goProj={goProj} />

              {/* Project detail cards below table */}
              <div style={{ marginTop: 48 }}>
                <SectionLabel>Detalle de proyectos</SectionLabel>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(shown.length, 3)}, 1fr)`,
                  border: `0.5px solid ${C.border}`,
                }}>
                  {shown.map((p, i) => {
                    const shade = PROJECTS.findIndex(x => x.id === p.id);
                    return (
                      <div key={p.id} onClick={() => goProj(p)}
                        style={{ borderRight: i < shown.length - 1 ? `0.5px solid ${C.border}` : "none", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.bgAlt}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
                        <Img height={160} shade={shade} />
                        <div style={{ padding: "18px 20px", borderTop: `0.5px solid ${C.border}` }}>
                          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                          <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 10 }}>San Bernardo, RM</div>
                          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.blue, marginBottom: 14 }}>
                            {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                          </div>
                          <button onClick={e => { e.stopPropagation(); goProj(p); }} style={{ background: "none", border: "none", fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1, cursor: "pointer" }}>
                            Ver proyecto →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: 48, paddingTop: 36, borderTop: `0.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.navy, marginBottom: 4 }}>¿No encuentras lo que buscas?</h3>
              <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate }}>Cuéntanos tus requerimientos y te proponemos alternativas.</p>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <BtnPrimary onClick={() => go("contacto")}>Solicitar disponibilidad</BtnPrimary>
              <BtnWA msg="Hola, quiero revisar disponibilidad de bodegas">WhatsApp</BtnWA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", empresa: "", telefono: "", correo: "", metraje: "", proyecto: "", comentarios: "", ok: false });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const upd = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.nombre)   e.nombre   = "Requerido";
    if (!form.empresa)  e.empresa  = "Requerido";
    if (!form.telefono) e.telefono = "Requerido";
    if (!form.correo || !form.correo.includes("@")) e.correo = "Email inválido";
    if (!form.metraje)  e.metraje  = "Selecciona un rango";
    if (!form.ok)       e.ok       = "Debes aceptar la política de privacidad";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSent(true);
  };

  const inputStyle = (key) => ({
    border: "none",
    borderBottom: `1.5px solid ${errors[key] ? "#ef4444" : C.navy}`,
    borderRadius: 0,
    padding: "11px 0", fontFamily: F.body, fontSize: 15,
    color: C.navy, outline: "none", background: "transparent",
    transition: "border-color 0.15s", width: "100%",
  });

  const Field = ({ k, label, type = "text" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
        {["nombre", "empresa", "telefono", "correo", "metraje"].includes(k) && <span style={{ color: C.blue }}> *</span>}
      </label>
      <input type={type} value={form[k]} onChange={e => upd(k, e.target.value)}
        style={inputStyle(k)}
        onFocus={e => { e.target.style.borderBottomColor = C.blue; }}
        onBlur={e => { e.target.style.borderBottomColor = errors[k] ? "#ef4444" : C.navy; }} />
      {errors[k] && <span style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444" }}>{errors[k]}</span>}
    </div>
  );

  return (
    <>
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "64px 40px 48px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 14 }}>
            Sin compromiso · Respuesta en 24 horas
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", color: "white", letterSpacing: "-0.01em" }}>
            Solicitar Disponibilidad
          </h1>
        </div>
      </div>

      <section style={{ padding: "56px 0 80px" }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "1.6fr 1fr", alignItems: "start" }}>

          {/* Form column */}
          {sent ? (
            <div style={{ padding: "0 48px 0 0", borderRight: `0.5px solid ${C.border}`, textAlign: "center", paddingTop: 60, paddingBottom: 60 }}>
              <div style={{ width: 48, height: 48, border: `2px solid ${C.blue}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Check size={24} color={C.blue} />
              </div>
              <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.navy, marginBottom: 10 }}>Solicitud recibida</h3>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, lineHeight: 1.7 }}>
                Te contactaremos en menos de 24 horas hábiles con la disponibilidad vigente.
              </p>
            </div>
          ) : (
            <div style={{ padding: "0 48px 0 0", borderRight: `0.5px solid ${C.border}` }}>
              <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 28, paddingBottom: 16, borderBottom: `0.5px solid ${C.border}` }}>
                Complete el formulario
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <Field k="nombre" label="Nombre" />
                <Field k="empresa" label="Empresa" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <Field k="telefono" label="Teléfono" type="tel" />
                  <Field k="correo" label="Correo" type="email" />
                </div>

                {/* Metraje select */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Metraje requerido <span style={{ color: C.blue }}>*</span>
                  </label>
                  <select value={form.metraje} onChange={e => upd("metraje", e.target.value)} style={{
                    border: "none", borderBottom: `1.5px solid ${errors.metraje ? "#ef4444" : C.navy}`,
                    borderRadius: 0, padding: "11px 0", fontFamily: F.body, fontSize: 15,
                    color: form.metraje ? C.navy : C.slate, outline: "none", background: "transparent", width: "100%",
                  }}>
                    <option value="" disabled>Seleccionar rango</option>
                    {METRAJES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.metraje && <span style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444" }}>{errors.metraje}</span>}
                </div>

                {/* Proyecto select */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Proyecto de interés <span style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
                  </label>
                  <select value={form.proyecto} onChange={e => upd("proyecto", e.target.value)} style={{
                    border: "none", borderBottom: `1.5px solid ${C.navy}`, borderRadius: 0,
                    padding: "11px 0", fontFamily: F.body, fontSize: 15,
                    color: form.proyecto ? C.navy : C.slate, outline: "none", background: "transparent", width: "100%",
                  }}>
                    <option value="">Sin preferencia</option>
                    {PROJECTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>

                {/* Comentarios */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Comentarios <span style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
                  </label>
                  <textarea value={form.comentarios} onChange={e => upd("comentarios", e.target.value)} rows={3}
                    placeholder="Cuéntanos sobre tu operación, plazos o requerimientos adicionales…"
                    style={{ border: "none", borderBottom: `1.5px solid ${C.navy}`, borderRadius: 0, padding: "11px 0", fontFamily: F.body, fontSize: 15, color: C.navy, outline: "none", background: "transparent", resize: "vertical", width: "100%" }}
                    onFocus={e => e.target.style.borderBottomColor = C.blue}
                    onBlur={e => e.target.style.borderBottomColor = C.navy}
                  />
                </div>

                {/* Privacy checkbox */}
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }} onClick={() => upd("ok", !form.ok)}>
                    <div style={{
                      width: 16, height: 16, flexShrink: 0, marginTop: 2,
                      border: `1.5px solid ${errors.ok ? "#ef4444" : (form.ok ? C.blue : C.navy)}`,
                      backgroundColor: form.ok ? C.blue : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {form.ok && <Check size={10} color="white" />}
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.55 }}>
                      Acepto la <span style={{ color: C.blue, cursor: "pointer" }}>política de privacidad</span> y el tratamiento de mis datos personales
                    </span>
                  </div>
                  {errors.ok && <p style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444", marginTop: 6 }}>{errors.ok}</p>}
                </div>

                <div style={{ paddingTop: 8 }}>
                  <button onClick={handleSubmit} style={{
                    backgroundColor: C.blue, color: "white", border: "none", borderRadius: 4,
                    padding: "14px 32px", fontSize: 14, fontWeight: 600, fontFamily: F.body,
                    cursor: "pointer", letterSpacing: "0.01em",
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.blueDark}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = C.blue}>
                    Enviar solicitud
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info sidebar */}
          <div style={{ padding: "0 0 0 48px", display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 20, paddingBottom: 16, borderBottom: `0.5px solid ${C.border}` }}>
              Otras vías de contacto
            </div>
            <div style={{ paddingBottom: 24, borderBottom: `0.5px solid ${C.border}`, marginBottom: 24 }}>
              <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>
                Si prefieres una respuesta inmediata, escríbenos directamente por WhatsApp.
              </p>
              <BtnWA msg="Hola, quiero solicitar disponibilidad de bodegas" full>Escribir por WhatsApp</BtnWA>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {["Respuesta en menos de 24 horas hábiles", "Trato directo, sin corredores", "Sin compromiso en la primera consulta", "Disponibilidad sujeta a confirmación al momento del contacto"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ color: C.blue, fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>—</div>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20 }}>
              <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Datos protegidos</div>
              <p style={{ fontFamily: F.body, fontSize: 12.5, color: C.slateLight, lineHeight: 1.6 }}>
                Ley 19.628 · Tus datos no serán compartidos con terceros ni utilizados con fines distintos a esta consulta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [project, setProject] = useState(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = (p, proj = null) => {
    setPage(p);
    if (proj) setProject(proj);
  };
  const goProj = (p) => go("proyecto", p);

  return (
    <div style={{ fontFamily: F.body, backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar page={page} go={go} />

      {page === "home"           && <HomePage go={go} goProj={goProj} />}
      {page === "bodegas"        && <BodegasPage go={go} goProj={goProj} />}
      {page === "proyecto"       && <ProjectPage project={project} go={go} goProj={goProj} />}
      {page === "disponibilidad" && <DisponibilidadPage go={go} goProj={goProj} />}
      {page === "contacto"       && <ContactoPage go={go} />}

      <Footer go={go} />

      {/* Mobile sticky CTA — primary action (not WhatsApp) */}
      <button
        className="fixed bottom-5 right-5 md:hidden"
        onClick={() => go("disponibilidad")}
        style={{
          backgroundColor: C.blue, color: "white", border: "none", borderRadius: 4,
          padding: "13px 20px", fontFamily: F.body, fontSize: 13, fontWeight: 600,
          boxShadow: "0 4px 20px rgba(6,133,222,0.35)", zIndex: 200, cursor: "pointer",
        }}>
        Disponibilidad →
      </button>
    </div>
  );
}
