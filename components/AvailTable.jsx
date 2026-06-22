import Link from "next/link";
import { C, F, m2, HREF, PROJECTS } from "../lib/data";

/** Shared availability table — used on Home, Hub and Disponibilidad pages */
export function AvailTable() {
  return (
    <div>
      {/* Header row */}
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 110px",
        padding: "9px 0", gap: 12,
        borderTop: `1px solid ${C.navy}`, borderBottom: `0.5px solid ${C.border}`,
      }}>
        {["Proyecto", "Desde", "Hasta", ""].map((h, i) => (
          <span key={i} style={{ fontFamily: F.body, fontSize: 10, fontWeight: 600, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
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
          <Link href={HREF.proyecto(p.id)} style={{
            fontFamily: F.body, fontSize: 14, fontWeight: 600, color: C.navy,
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>{p.name}</Link>
          <span style={{ fontFamily: F.body, fontSize: 14, color: C.slate }}>{m2(p.min)}</span>
          <span style={{ fontFamily: F.body, fontSize: 14, color: C.slate }}>{m2(p.max)}</span>
          <Link href={HREF.proyecto(p.id)} style={{
            fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 500, textDecoration: "none",
            borderBottom: `1px solid ${C.blue}`, paddingBottom: 1, display: "inline-block",
          }}>Solicitar →</Link>
        </div>
      ))}
      <div style={{ borderBottom: `1px solid ${C.navy}` }} />
    </div>
  );
}

export function MobileStickyCTA() {
  return (
    <Link
      href={HREF.disponibilidad}
      className="fixed bottom-5 right-5 md:hidden"
      style={{
        backgroundColor: C.blue, color: "white", border: "none", borderRadius: 4,
        padding: "13px 20px", fontFamily: F.body, fontSize: 13, fontWeight: 600,
        boxShadow: "0 4px 20px rgba(6,133,222,0.35)", zIndex: 200, textDecoration: "none",
      }}>
      Disponibilidad →
    </Link>
  );
}
