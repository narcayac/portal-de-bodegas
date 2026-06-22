import { C, F, EQUIP_LIST } from "../lib/data";

// ── WHATSAPP ICON ─────────────────────────────────────────────────────────────
export function WhatsAppIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── LOGO MARK ─────────────────────────────────────────────────────────────────
export function LogoMark({ light = false }) {
  const ink = light ? "white" : C.navy;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      {/* Hexagon emblem with warehouse glyph */}
      <svg width="38" height="40" viewBox="0 0 38 40" aria-hidden="true" focusable="false">
        <path
          d="M19 1.5 36 11v18L19 38.5 2 29V11z"
          fill={C.navy}
          stroke={light ? "rgba(255,255,255,0.25)" : "none"}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* warehouse / house outline */}
        <path d="M11 22 19 15.5 27 22v7H11z" fill="none" stroke="#f3f4f5" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="16.5" y="24.5" width="5" height="4.5" fill={C.blue} />
      </svg>
      {/* Wordmark — "portal de bodegas" */}
      <div style={{ lineHeight: 1.02 }}>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>
          portal <span style={{ color: C.blue }}>de</span>
        </div>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>
          bodegas
        </div>
      </div>
    </div>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
/** Small uppercase mono label with blue rule */
export function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: F.mono, fontSize: 10.5, color: C.slate, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
        {children}
      </div>
      <div style={{ height: 1.5, width: 32, backgroundColor: C.blue }} />
    </div>
  );
}

/** Inline eyebrow label (mono, uppercase) — for hero/page headers */
export function Eyebrow({ children, light = false }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: 11, color: light ? C.blueLight : C.slate, textTransform: "uppercase", letterSpacing: "0.14em" }}>
      {children}
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
export function Img({ height = 240, shade = 0, alt = "", status = "Disponible" }) {
  return (
    <div role="img" aria-label={alt} style={{
      height,
      background: "linear-gradient(135deg, #eef2f8 0%, #e4e9f2 100%)",
      backgroundImage: [
        "linear-gradient(135deg, #eef2f8 0%, #e4e9f2 100%)",
        "repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(1,25,67,0.035) 31px,rgba(1,25,67,0.035) 32px)",
        "repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(1,25,67,0.035) 31px,rgba(1,25,67,0.035) 32px)",
      ].join(","),
      position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      {/* Warehouse line-art */}
      <svg width="46%" viewBox="0 0 200 150" fill="none" aria-hidden="true" focusable="false"
        style={{ maxWidth: 220, opacity: 0.55 }}>
        <path d="M20 70 100 28 180 70 180 132 20 132Z" stroke="#9fb0c8" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 70 100 28 180 70" stroke="#9fb0c8" strokeWidth="2" strokeLinejoin="round" />
        <rect x="84" y="96" width="32" height="36" stroke="#9fb0c8" strokeWidth="2" />
        <path d="M20 132h160M52 96v36M148 96v36" stroke="#b9c6da" strokeWidth="1.5" />
      </svg>
      {/* Availability pill */}
      <div style={{ position: "absolute", top: 12, left: 12, display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.85)", padding: "4px 9px", borderRadius: 3 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: status === "Disponible" ? "#16a34a" : C.slate, display: "inline-block" }} />
        <span style={{ fontFamily: F.mono, fontSize: 9.5, color: status === "Disponible" ? "#15803d" : C.slate, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          {status}
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
