import Link from "next/link";
import { C, F, W, HREF, SITE, PROJECTS, m2, FAQ_GENERAL, WHY_US } from "../lib/data";
import { SectionLabel, JsonLd, faqSchema } from "../components/ui";
import { ProjectImage } from "../components/ProjectImage";
import FaqAccordion from "../components/Faq";
import { BtnWA } from "../components/Buttons";
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

      {/* ── HERO ── white, two-column with illustration ── */}
      <section style={{ backgroundColor: "white", paddingTop: 64 }}>
        <div className="hero-grid" style={{ ...W, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center", padding: "56px 40px 64px" }}>
          {/* Left: copy + CTA */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.blue, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 22 }}>
              Arriendo directo, sin intermediarios
            </div>
            <h1 style={{
              fontFamily: F.display, fontWeight: 800,
              fontSize: "clamp(38px, 4.6vw, 60px)",
              lineHeight: 1.02, color: C.navy,
              maxWidth: 560, marginBottom: 22, letterSpacing: "-0.025em",
            }}>
              Encuentra la bodega ideal para tu empresa
            </h1>
            <p style={{ fontFamily: F.body, fontSize: 17, color: C.slate, maxWidth: 480, lineHeight: 1.7, marginBottom: 34 }}>
              Distintas alternativas de tamaño disponibles en el sector sur de Santiago. Trato directo y sin intermediarios.
            </p>
            <BtnWA msg="Hola, quiero contactar a Portal de Bodegas">Contactar por WhatsApp</BtnWA>
          </div>

          {/* Right: facility photo */}
          <div style={{
            position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 440,
            backgroundColor: "#e4e9f2",
          }}>
            <img
              src="/photos/home/hero.webp"
              alt="Bodegas industriales en arriendo en San Bernardo"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", top: 18, left: 18, display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: "white", padding: "7px 13px", borderRadius: 999, boxShadow: "0 2px 10px rgba(1,25,67,0.12)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
              <span style={{ fontFamily: F.body, fontSize: 13, color: C.navy, fontWeight: 600 }}>5 proyectos disponibles</span>
            </div>
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
          <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 30, color: C.navy, marginBottom: 32, lineHeight: 1.15, maxWidth: 600, letterSpacing: "-0.01em" }}>
            Bodegas para empresas de todos los tamaños
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
        {/* Desktop: editorial featured + list */}
        <div className="hidden md:block" style={{ ...W }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", border: `0.5px solid ${C.border}` }}>
            {/* Featured project */}
            <Link href={HREF.proyecto(PROJECTS[0].id)} style={{ borderRight: `0.5px solid ${C.border}`, textDecoration: "none", display: "block" }}>
              <ProjectImage projectId={PROJECTS[0].id} height={260} alt={PROJECTS[0].alt} />
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
                    <ProjectImage projectId={p.id} height={88} alt={p.alt} showStatus={false} />
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

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden nav-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 20px 6px", WebkitOverflowScrolling: "touch" }}>
          {PROJECTS.map((p) => (
            <Link key={p.id} href={HREF.proyecto(p.id)} style={{ flex: "0 0 80%", scrollSnapAlign: "start", border: `0.5px solid ${C.border}`, textDecoration: "none", display: "block", backgroundColor: "white" }}>
              <ProjectImage projectId={p.id} height={180} alt={p.alt} />
              <div style={{ padding: "16px 18px 18px", borderTop: `0.5px solid ${C.border}` }}>
                <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 10 }}>San Bernardo, RM</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 17, color: C.blue }}>
                    {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                  </div>
                  <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="md:hidden" style={{ ...W, marginTop: 14 }}>
          <span style={{ fontFamily: F.mono, fontSize: 10.5, color: C.slate, letterSpacing: "0.06em" }}>← Desliza para ver los 5 proyectos →</span>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 0 0" }}>
        <div style={{ ...W }}>
          <FaqAccordion items={FAQ_GENERAL} />
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: "80px 0 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16 }}>
            Trato directo · San Bernardo
          </div>
          <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 34, color: C.navy, marginBottom: 28, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            ¿Necesitas una bodega para tu empresa?
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BtnWA msg="Hola, quiero arrendar una bodega para mi empresa">Escríbenos ahora</BtnWA>
          </div>
        </div>
      </section>
    </>
  );
}
