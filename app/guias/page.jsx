import Link from "next/link";
import { C, F, W, HREF, SITE } from "../../lib/data";
import { GUIAS } from "../../lib/guias";
import { JsonLd, breadcrumbSchema, SectionLabel } from "../../components/ui";
import { BtnWA } from "../../components/Buttons";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Guías para Arrendar Bodegas Industriales | Portal de Bodegas",
  description:
    "Precios por m², checklist antes de firmar y por qué San Bernardo es el hub logístico del sur de Santiago. Guías prácticas para pymes y grandes empresas.",
  path: "/guias/",
});

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });

export default function GuiasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Guías", item: `${SITE.url}/guias/` },
      ])} />

      {/* Dark page header */}
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "72px 40px 56px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <Link href={HREF.home} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Inicio</Link>
            <span style={{ color: C.slate, fontSize: 12 }}>›</span>
            <span style={{ fontFamily: F.body, fontSize: 12, color: "white" }}>Guías</span>
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 600, fontSize: "clamp(30px,4.2vw,50px)", color: "white", letterSpacing: "-0.015em", margin: "0 0 16px", lineHeight: 1.05 }}>
            Guías para arrendar tu bodega
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 16, color: C.slateLight, maxWidth: 620, lineHeight: 1.7, margin: 0 }}>
            Lo que hay que saber antes de arrendar: precios, checklist técnica y ubicación. Ya sea que busques 180 o 14.000 m².
          </p>
        </div>
      </div>

      {/* Guide list */}
      <section style={{ padding: "56px 0 64px" }}>
        <div style={{ ...W }}>
          <SectionLabel>Todas las guías</SectionLabel>
          <div style={{ borderTop: `1px solid ${C.navy}` }}>
            {GUIAS.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}/`} style={{
                display: "block", textDecoration: "none",
                padding: "28px 0", borderBottom: `0.5px solid ${C.border}`,
              }}>
                <div style={{ fontFamily: F.mono, fontSize: 10.5, color: C.blue, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>
                  {g.eyebrow} · {g.readMin} min de lectura
                </div>
                <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: "clamp(20px,2.6vw,26px)", color: C.navy, margin: "0 0 10px", lineHeight: 1.25, maxWidth: 760 }}>
                  {g.title}
                </h2>
                <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.slate, lineHeight: 1.65, margin: "0 0 14px", maxWidth: 720 }}>
                  {g.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>
                    Leer guía →
                  </span>
                  <span style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight }}>{fmtDate(g.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 0 80px" }}>
        <div style={{ ...W }}>
          <div style={{ backgroundColor: C.bgAlt, border: `0.5px solid ${C.border}`, padding: "36px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.navy, margin: "0 0 8px" }}>
                ¿Prefieres saltarte la lectura?
              </h2>
              <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate, lineHeight: 1.6, margin: 0 }}>
                Cuéntanos qué necesita tu operación y te asesoramos directo, sin intermediarios.
              </p>
            </div>
            <BtnWA msg="Hola, quiero asesoría para arrendar una bodega en San Bernardo">Hablemos por WhatsApp</BtnWA>
          </div>
        </div>
      </section>
    </>
  );
}
