import Link from "next/link";
import { C, F, W, HREF, SITE, PROJECTS, m2 } from "../../../lib/data";
import { SectionLabel, JsonLd, breadcrumbSchema, EquipGrid } from "../../../components/ui";
import { ProjectImage } from "../../../components/ProjectImage";
import { BtnWA } from "../../../components/Buttons";
import { pageMeta } from "../../../lib/seo";

export const metadata = pageMeta({
  title: "Bodegas en Arriendo en San Bernardo | 5 Proyectos Disponibles",
  description:
    "Arrienda bodegas y galpones en San Bernardo desde 180 m² hasta grandes superficies de 14.000 m². Seguridad 24/7, energía trifásica y acceso para camiones. Trato directo.",
  path: "/bodegas/san-bernardo/",
});

const STEPS = [
  ["Elige un proyecto", "Revisa los cinco proyectos disponibles y su superficie."],
  ["Indica tu metraje", "Cuéntanos cuánto espacio necesitas y para qué uso."],
  ["Recibe tu propuesta", "Te respondemos casi al instante por WhatsApp con una cotización a tu medida."],
];

export default function SanBernardoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Bodegas", item: `${SITE.url}/bodegas/` },
        { name: "San Bernardo", item: `${SITE.url}/bodegas/san-bernardo/` },
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
            <Link href={HREF.bodegas} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Bodegas</Link>
            <span style={{ color: C.slate, fontSize: 12 }}>›</span>
            <span style={{ fontFamily: F.body, fontSize: 12, color: "white" }}>San Bernardo</span>
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 600, fontSize: "clamp(30px,4.2vw,50px)", color: "white", letterSpacing: "-0.015em", margin: "0 0 16px", lineHeight: 1.05 }}>
            Bodegas en Arriendo en San Bernardo
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 16, color: C.slateLight, maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
            Cinco proyectos con espacios desde 180 m² hasta grandes superficies de 14.000 m², equipados y con trato directo.
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
          <BtnWA msg="Hola, quiero cotizar una bodega en San Bernardo">Cotiza por WhatsApp</BtnWA>
        </div>
      </div>

      {/* Projects */}
      <section style={{ padding: "56px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Proyectos disponibles en San Bernardo</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {PROJECTS.map((p, i) => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i % 2 === 0 ? `0.5px solid ${C.border}` : "none", borderBottom: `0.5px solid ${C.border}`, display: "block" }}>
                <ProjectImage projectId={p.id} height={190} alt={p.alt} />
                <div style={{ padding: "20px 22px 22px", borderTop: `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 3 }}>{p.name}</div>
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
        <div style={{ ...W, marginBottom: 56 }}>
          <EquipGrid title="Equipamiento estándar" />
        </div>
      </section>

      {/* How to quote */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ ...W }}>
          <SectionLabel>Cómo cotizar tu bodega</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}`, marginBottom: 32 }}>
            {STEPS.map(([t, d], i) => (
              <div key={t} style={{ padding: "24px 24px 28px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 22, color: C.blue, marginBottom: 10 }}>0{i + 1}</div>
                <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{t}</h3>
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.6, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <BtnWA msg="Hola, quiero cotizar una bodega en San Bernardo">Escríbenos ahora</BtnWA>
          </div>
        </div>
      </section>
    </>
  );
}
