import Link from "next/link";
import { C, F, W, HREF, SITE, PROJECTS, m2, FAQ_GENERAL } from "../../lib/data";
import { SectionLabel, JsonLd, faqSchema, breadcrumbSchema, EquipGrid } from "../../components/ui";
import { ProjectImage } from "../../components/ProjectImage";
import FaqAccordion from "../../components/Faq";
import { BtnWA } from "../../components/Buttons";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Bodegas en Arriendo | Bodegas y Galpones para Empresas",
  description:
    "Conoce nuestras bodegas y galpones en arriendo en San Bernardo: distintos tamaños, trato directo y respuesta rápida. Encuentra el espacio ideal para tu empresa.",
  path: "/bodegas/",
});

export default function BodegasHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Bodegas", item: `${SITE.url}/bodegas/` },
      ])} />
      <JsonLd data={faqSchema(FAQ_GENERAL)} />

      {/* Dark page header */}
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "72px 40px 56px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Link href={HREF.home} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Inicio</Link>
            <span style={{ color: C.slate, fontSize: 12 }}>›</span>
            <span style={{ fontFamily: F.body, fontSize: 12, color: "white" }}>Bodegas</span>
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 600, fontSize: "clamp(32px,4.2vw,52px)", color: "white", letterSpacing: "-0.015em", margin: "0 0 16px", lineHeight: 1.05 }}>
            Bodegas en Arriendo
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 16, color: C.slateLight, maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
            Cinco proyectos en San Bernardo, con espacios desde 180 m² hasta grandes superficies de 14.000 m². Elige el que mejor se adapte a tu operación y conversemos directo.
          </p>
        </div>
      </div>

      {/* Price + CTA strip — outside the navy header so it keeps its original compact look */}
      <div style={{ backgroundColor: C.bgAlt, borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, padding: "18px var(--gutter, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 19, color: C.navy, lineHeight: 1.2 }}>Desde 0,13 UF/m² al mes</div>
            <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.slate, marginTop: 2 }}>Trato directo, sin comisión de corretaje</div>
          </div>
          <BtnWA msg="Hola, quiero información sobre las bodegas disponibles">Cotiza por WhatsApp</BtnWA>
        </div>
      </div>

      {/* All projects grid */}
      <section style={{ padding: "56px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Nuestros proyectos</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: `0.5px solid ${C.border}`, marginBottom: 64 }}>
            {PROJECTS.map((p, i) => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i % 2 === 0 ? `0.5px solid ${C.border}` : "none", borderBottom: `0.5px solid ${C.border}`, display: "block" }}>
                <ProjectImage projectId={p.id} height={210} alt={p.alt} />
                <div style={{ padding: "20px 22px 22px", borderTop: `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 19, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 12 }}>San Bernardo · Región Metropolitana</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.blue }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver →</span>
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginTop: 6 }}>Arriendo desde 0,13 UF/m² al mes</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section>
        <div style={{ ...W, marginBottom: 64 }}>
          <EquipGrid />
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div style={{ ...W }}>
          <FaqAccordion items={FAQ_GENERAL} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 0 80px" }}>
        <div style={{ ...W }}>
          <div style={{ borderTop: `1px solid ${C.navy}`, paddingTop: 36, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 24, color: C.navy, margin: "0 0 6px" }}>¿Te interesa alguna bodega?</h2>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, margin: 0 }}>Escríbenos y te enviamos disponibilidad y una propuesta a tu medida.</p>
            </div>
            <BtnWA msg="Hola, quiero información sobre las bodegas disponibles">Escríbenos ahora</BtnWA>
          </div>
        </div>
      </section>
    </>
  );
}
