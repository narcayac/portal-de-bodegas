import Link from "next/link";
import { C, F, W, HREF, SITE, PROJECTS, m2, FAQ_GENERAL, WHY_US } from "../../lib/data";
import { Img, SectionLabel, JsonLd, FaqSection, faqSchema, breadcrumbSchema, EquipGrid } from "../../components/ui";
import { AvailTable } from "../../components/AvailTable";
import { BtnPrimary } from "../../components/Buttons";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Bodegas en Arriendo | Arriendo de Bodegas para Empresas",
  description:
    "Explora bodegas en arriendo por ubicación, tamaño y tipo de uso. Varias alternativas disponibles, trato directo y respuesta rápida.",
  path: "/bodegas/",
});

const SIZES = [
  ["Hasta 500 m²", "Pymes y empresas en crecimiento", "Alto Las Acacias · Bosque Catemito · Inversiones Duramet"],
  ["500 – 1.000 m²", "Operaciones medianas de logística y almacenaje", "El Barrancón · Bosque Catemito · Inversiones Duramet"],
  ["Más de 1.000 m²", "Distribución y manufactura liviana de gran escala", "El Barrancón · Bosque Catemito · Acacias Seis · Inversiones Duramet"],
];

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
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Link href={HREF.home} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Inicio</Link>
            <span style={{ color: C.slate, fontSize: 12 }}>›</span>
            <span style={{ fontFamily: F.body, fontSize: 12, color: "white" }}>Bodegas</span>
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", color: "white", letterSpacing: "-0.01em", margin: 0 }}>
            Bodegas en Arriendo
          </h1>
        </div>
      </div>

      {/* Why us */}
      <section style={{ padding: "56px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Por qué Portal de Bodegas</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-4" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {WHY_US.map(([t, d], i) => (
              <div key={t} style={{ padding: "24px 24px 28px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 15, color: C.blue, marginBottom: 10 }}>0{i + 1}</div>
                <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{t}</h3>
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.6, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by location */}
      <section>
        <div style={{ ...W }}>
          <SectionLabel>Explora por ubicación</SectionLabel>
          <Link href={HREF.sanBernardo} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: `0.5px solid ${C.border}`, borderTop: `1px solid ${C.navy}`,
            padding: "24px 28px", textDecoration: "none", marginBottom: 56,
          }}>
            <div>
              <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.navy, marginBottom: 4 }}>San Bernardo</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.slate }}>Región Metropolitana · 5 proyectos disponibles</div>
            </div>
            <span style={{ fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 600 }}>Ver proyectos →</span>
          </Link>
        </div>
      </section>

      {/* All projects grid */}
      <section>
        <div style={{ ...W }}>
          <SectionLabel>Todos los proyectos</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {PROJECTS.map((p, i) => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i % 2 === 0 ? `0.5px solid ${C.border}` : "none", borderBottom: `0.5px solid ${C.border}`, display: "block" }}>
                <Img height={190} shade={i} alt={p.alt} />
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by size */}
      <section>
        <div style={{ ...W }}>
          <SectionLabel>Explora por tamaño</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {SIZES.map(([range, use, projs]) => (
              <div key={range} style={{ padding: "24px 24px 28px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 20, color: C.blue, marginBottom: 8 }}>{range}</div>
                <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.navy, fontWeight: 500, marginBottom: 10 }}>{use}</p>
                <p style={{ fontFamily: F.body, fontSize: 12, color: C.slate, lineHeight: 1.6, margin: 0 }}>{projs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section>
        <div style={{ ...W, marginBottom: 56 }}>
          <EquipGrid />
        </div>
      </section>

      {/* Availability */}
      <section>
        <div style={{ ...W }}>
          <SectionLabel>Disponibilidad actual</SectionLabel>
          <AvailTable />
          <div style={{ marginTop: 24, marginBottom: 64 }}>
            <BtnPrimary href={HREF.disponibilidad}>Ver disponibilidad detallada</BtnPrimary>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ ...W }}>
          <FaqSection items={FAQ_GENERAL} />
        </div>
      </section>
    </>
  );
}
