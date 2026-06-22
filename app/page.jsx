import Link from "next/link";
import { C, F, W, waUrl, HREF, SITE, PROJECTS, m2, FAQ_GENERAL, WHY_US } from "../lib/data";
import { Img, SectionLabel, JsonLd, FaqSection, faqSchema } from "../components/ui";
import { AvailTable } from "../components/AvailTable";
import { BtnPrimary, BtnOutline } from "../components/Buttons";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "Portal de Bodegas | Arriendo de Bodegas para Empresas",
  description:
    "Encuentra la bodega ideal para tu empresa. Varias alternativas disponibles en el sector sur de Santiago, distintos tamaños y trato directo, sin intermediarios.",
  path: "/",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
  "@id": `${SITE.url}/#organization`,
  name: "Portal de Bodegas",
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  image: `${SITE.url}/opengraph-image`,
  description:
    "Plataforma especializada en arriendo de bodegas industriales para empresas en el sector sur de Santiago.",
  areaServed: { "@type": "City", name: "San Bernardo", containedInPlace: { "@type": "AdministrativeArea", name: "Región Metropolitana, Chile" } },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  telephone: SITE.phone,
  priceRange: "$$",
  knowsLanguage: "es-CL",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    contactType: "sales",
    areaServed: "CL",
    availableLanguage: "Spanish",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: "Portal de Bodegas",
  inLanguage: "es-CL",
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema(FAQ_GENERAL)} />

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
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 28 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: C.blue }} />
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.slateLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Sector Sur · Región Metropolitana · San Bernardo
            </span>
          </div>
          <h1 style={{
            fontFamily: F.head, fontWeight: 800,
            fontSize: "clamp(36px, 4.8vw, 60px)",
            lineHeight: 1.05, color: "white",
            maxWidth: 680, marginBottom: 22, letterSpacing: "-0.01em",
          }}>
            Encuentra la bodega ideal para tu empresa
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 17, color: C.slateLight, maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
            Distintas alternativas de tamaño disponibles en el sector sur de Santiago. Trato directo y sin intermediarios.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <BtnPrimary href={HREF.disponibilidad}>Solicitar disponibilidad</BtnPrimary>
            <BtnOutline href={HREF.contacto} light>Contactar por WhatsApp</BtnOutline>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, display: "flex", flexWrap: "wrap" }}>
          {[
            ["5 proyectos", "Disponibles en San Bernardo"],
            ["180 – 1.900 m²", "Superficie por proyecto"],
            ["Trato directo", "Sin intermediarios ni comisiones"],
            ["< 24 horas", "Tiempo de respuesta"],
          ].map(([val, lab], i) => (
            <div key={lab} style={{ flex: 1, minWidth: 150, padding: "28px 32px", borderLeft: i > 0 ? `0.5px solid ${C.border}` : "none" }}>
              <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 22, color: C.navy, lineHeight: 1, marginBottom: 6 }}>{val}</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em" }}>{lab}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Por qué elegirnos</SectionLabel>
          <h2 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 28, color: C.navy, marginBottom: 32, lineHeight: 1.15, maxWidth: 560 }}>
            Una plataforma directa para arrendar bodegas industriales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4" style={{ borderTop: `1px solid ${C.navy}`, borderLeft: `0.5px solid ${C.border}` }}>
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

      {/* ── PROJECTS (editorial: featured left + list right) ── */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <SectionLabel>Proyectos disponibles</SectionLabel>
            <Link href={HREF.bodegas} style={{ fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 500, textDecoration: "none" }}>
              Ver todos →
            </Link>
          </div>
        </div>
        <div style={{ ...W }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", border: `0.5px solid ${C.border}` }}>
            {/* Featured project */}
            <Link href={HREF.proyecto(PROJECTS[0].id)} style={{ borderRight: `0.5px solid ${C.border}`, textDecoration: "none", display: "block" }}>
              <Img height={260} shade={0} alt={PROJECTS[0].alt} />
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
            </Link>
            {/* Project list */}
            <div>
              {PROJECTS.slice(1).map((p, i) => (
                <Link key={p.id} href={HREF.proyecto(p.id)}
                  style={{ display: "flex", borderBottom: i < 3 ? `0.5px solid ${C.border}` : "none", textDecoration: "none" }}>
                  <div style={{ flexShrink: 0, width: 88 }}>
                    <Img height={88} shade={i + 1} alt={p.alt} />
                  </div>
                  <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, marginBottom: 5 }}>San Bernardo, RM</div>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.blue }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                  </div>
                </Link>
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
          <AvailTable />
          <div style={{ marginTop: 24 }}>
            <BtnPrimary href={HREF.disponibilidad}>Ver disponibilidad completa</BtnPrimary>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W }}>
          <FaqSection items={FAQ_GENERAL} />
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: "80px 0 72px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
            Disponibilidad · Trato directo · San Bernardo
          </div>
          <h2 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 32, color: C.navy, marginBottom: 28, lineHeight: 1.1 }}>
            ¿Necesitas una bodega para tu empresa?
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <BtnPrimary href={HREF.disponibilidad}>Solicitar disponibilidad</BtnPrimary>
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
