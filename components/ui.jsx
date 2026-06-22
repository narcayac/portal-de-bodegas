import { C, F, EQUIP_LIST } from "../lib/data";

// ── LOGO MARK ─────────────────────────────────────────────────────────────────
export function LogoMark({ light = false }) {
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

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
/** Small uppercase label with blue rule */
export function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 8 }}>
        {children}
      </div>
      <div style={{ height: 1.5, width: 32, backgroundColor: C.blue }} />
    </div>
  );
}

// ── PHOTO PLACEHOLDER ─────────────────────────────────────────────────────────
/**
 * Photo placeholder — architectural grid pattern on dark navy.
 * Accepts a `shade` index (0-4) for subtle color variation per project.
 * When real photos are ready: replace with
 *   <img src="/photos/<project>/fachada-01.webp" alt={...} style={{width:"100%",height,objectFit:"cover",display:"block"}} />
 */
export function Img({ height = 240, shade = 0, alt = "" }) {
  const bgs = ["#0d2444", "#091c38", "#071832", "#0b213c", "#0f2748"];
  return (
    <div role="img" aria-label={alt} style={{
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
    </div>
  );
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── FAQ SECTION ───────────────────────────────────────────────────────────────
export function FaqSection({ title = "Preguntas frecuentes", items }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div style={{ borderTop: `1px solid ${C.navy}` }}>
        {items.map((f) => (
          <div key={f.q} style={{ padding: "20px 0", borderBottom: `0.5px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// JSON-LD generator for an FAQPage from a FAQ list
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// ── EQUIPMENT GRID ────────────────────────────────────────────────────────────
export function EquipGrid({ title = "Equipamiento estándar en todos nuestros proyectos" }) {
  return (
    <div>
      <SectionLabel>Equipamiento</SectionLabel>
      <h2 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 24, color: C.navy, marginBottom: 24, lineHeight: 1.2, maxWidth: 620 }}>
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}` }}>
        {EQUIP_LIST.map((t) => (
          <div key={t} style={{ padding: "18px 20px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: C.blue, fontSize: 15, lineHeight: 1, flexShrink: 0 }}>—</span>
            <span style={{ fontFamily: F.body, fontSize: 14, color: C.navy, fontWeight: 500 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// JSON-LD generator for a BreadcrumbList
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}
