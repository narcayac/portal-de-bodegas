import Link from "next/link";
import { C, F, W, HREF, SITE, PROJECTS, m2 } from "../../lib/data";
import { getGuia } from "../../lib/guias";
import { SectionLabel, JsonLd, breadcrumbSchema, EquipGrid } from "../../components/ui";
import { ProjectImage } from "../../components/ProjectImage";
import FaqAccordion from "../../components/Faq";
import { BtnWA } from "../../components/Buttons";
import { pageMeta } from "../../lib/seo";

// Landing for the Google Ads "Galpones" ad group. Commercial intent: show what's
// available, the price and the WhatsApp button above the fold. The long-form
// guide (/guias/galpon-en-arriendo-san-bernardo/) stays as the SEO page, so this
// one is noindex to avoid competing with it in Google.
export const metadata = pageMeta({
  title: "Galpones en Arriendo en San Bernardo",
  description:
    "Galpones industriales en arriendo en San Bernardo, de 180 a 14.000 m². Radier industrial, energía trifásica, acceso para camiones y seguridad 24/7. Trato directo, sin comisión.",
  path: "/galpones/",
  noindex: true,
});

const WA_MSG = "Hola, busco un galpón en arriendo en San Bernardo";

const FACTS = [
  ["180 a 14.000 m²", "5 proyectos en San Bernardo"],
  ["Desde 0,13 UF/m²", "al mes, galpón equipado"],
  ["Listo para operar", "Radier industrial y energía trifásica"],
  ["Sin comisión", "Trato directo con el propietario"],
];

const STEPS = [
  ["Cuéntanos qué necesitas", "Superficie aproximada, uso y plazo."],
  ["Te mostramos opciones", "Los galpones disponibles que calzan con tu operación."],
  ["Visita y arrienda", "Coordinamos la visita y el contrato directo con el propietario."],
];

const FAQS = getGuia("galpon-en-arriendo-san-bernardo")?.faq || [];

export default function GalponesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Galpones en arriendo", item: `${SITE.url}/galpones/` },
      ])} />

      {/* Hero: title + price + WhatsApp, visible without scrolling */}
      <div style={{ paddingTop: 62, backgroundColor: "white" }}>
        <div className="hero-grid" style={{ ...W, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center", padding: "44px var(--gutter, 40px) 48px" }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blue, marginBottom: 14 }}>
              San Bernardo · Región Metropolitana
            </div>
            <h1 style={{ fontFamily: F.display, fontWeight: 800, fontSize: "clamp(32px,4.4vw,52px)", color: C.navy, letterSpacing: "-0.025em", margin: "0 0 16px", lineHeight: 1.05 }}>
              Galpones industriales en arriendo en San Bernardo
            </h1>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.slate, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              Desde 180 m² para pymes hasta 14.000 m² para centros de distribución. Galpones con radier industrial, energía trifásica, acceso para camiones y seguridad 24/7, listos para operar.
            </p>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <BtnWA msg={WA_MSG}>Cotiza por WhatsApp</BtnWA>
              <div>
                <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 19, color: C.navy, lineHeight: 1.2 }}>Desde 0,13 UF/m² al mes</div>
                <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.slate, marginTop: 2 }}>Respuesta al instante · Sin comisión de corretaje</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 340, borderRadius: 6, overflow: "hidden" }}>
            <img
              src="/photos/home/hero.webp"
              alt="Vista aérea de galpones industriales en San Bernardo"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Key facts */}
      <section>
        <div style={{ ...W }}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}`, marginBottom: 56 }}>
            {FACTS.map(([t, d]) => (
              <div key={t} style={{ padding: "20px 20px 22px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 4 }}>{t}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available projects */}
      <section>
        <div style={{ ...W }}>
          <SectionLabel>Galpones disponibles</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: `0.5px solid ${C.border}`, marginBottom: 32 }}>
            {PROJECTS.map((p, i) => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i % 2 === 0 ? `0.5px solid ${C.border}` : "none", borderBottom: `0.5px solid ${C.border}`, display: "block" }}>
                <ProjectImage projectId={p.id} height={190} alt={p.alt} />
                <div style={{ padding: "20px 22px 22px", borderTop: `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.blue }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver fotos →</span>
                  </div>
                  {p.openYard && (
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.blue, fontWeight: 600, marginTop: 6 }}>+ Terreno para acopio al aire libre</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
            <BtnWA msg={WA_MSG}>Pregunta por disponibilidad</BtnWA>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div style={{ ...W, marginBottom: 56 }}>
          <SectionLabel>Cómo arrendar tu galpón</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}` }}>
            {STEPS.map(([t, d], i) => (
              <div key={t} style={{ padding: "24px 24px 28px", borderRight: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 22, color: C.blue, marginBottom: 10 }}>0{i + 1}</div>
                <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{t}</h3>
                <p style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.6, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section>
        <div style={{ ...W, marginBottom: 56 }}>
          <EquipGrid title="Equipamiento estándar en todos nuestros galpones" />
        </div>
      </section>

      {/* FAQ + link to the long-form guide */}
      {FAQS.length > 0 && (
        <section>
          <div style={{ ...W, marginBottom: 24 }}>
            <FaqAccordion items={FAQS} />
          </div>
        </section>
      )}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ ...W }}>
          <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate, margin: "0 0 20px" }}>
            ¿Quieres saber qué revisar antes de arrendar? Lee nuestra{" "}
            <Link href="/guias/galpon-en-arriendo-san-bernardo/" style={{ color: C.blue, textDecoration: "underline" }}>guía de galpones en arriendo</Link>.
          </p>
          <BtnWA msg={WA_MSG}>Escríbenos por WhatsApp</BtnWA>
        </div>
      </section>
    </>
  );
}
