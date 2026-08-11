import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  C, F, W, HREF, SITE, PROJECTS, getProject, m2, PROJECT_SPECS, ADDRESSES, mapEmbed,
} from "../../../lib/data";
import { SectionLabel, JsonLd, breadcrumbSchema } from "../../../components/ui";
import { ProjectImage } from "../../../components/ProjectImage";
import { ProjectGallery } from "../../../components/ProjectGallery";
import { BtnWA } from "../../../components/Buttons";
import { pageMeta } from "../../../lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ proyecto: p.id }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.proyecto);
  if (!project) return {};
  return pageMeta({
    title: project.title,
    description: project.description,
    path: `/bodegas/${project.id}/`,
  });
}

export default function ProjectPage({ params }) {
  const project = getProject(params.proyecto);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.id === project.id);
  const related = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);
  const surface = project.min === project.max ? m2(project.min) : `${m2(project.min)} – ${m2(project.max)}`;
  const address = ADDRESSES[project.id];

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: project.name,
    url: `${SITE.url}/bodegas/${project.id}/`,
    description: project.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESSES[project.id],
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    parentOrganization: {
      "@type": "Organization",
      name: "Portal de Bodegas",
      url: SITE.url,
    },
  };

  return (
    <div style={{ paddingTop: 62 }}>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Bodegas", item: `${SITE.url}/bodegas/` },
        { name: "San Bernardo", item: `${SITE.url}/bodegas/san-bernardo/` },
        { name: project.name, item: `${SITE.url}/bodegas/${project.id}/` },
      ])} />
      <JsonLd data={placeSchema} />

      {/* Breadcrumb */}
      <div style={{ padding: "12px 40px", borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, padding: 0, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Link href={HREF.bodegas} style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textDecoration: "none" }}>Bodegas</Link>
          <ChevronRight size={11} color={C.slateLight} />
          <Link href={HREF.sanBernardo} style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textDecoration: "none" }}>San Bernardo</Link>
          <ChevronRight size={11} color={C.slateLight} />
          <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, fontWeight: 500 }}>{project.name}</span>
        </div>
      </div>

      {/* Photo gallery (interiors + exteriors) */}
      <div style={{ ...W, paddingTop: 24, paddingBottom: 8 }}>
        <ProjectGallery projectId={project.id} alt={project.alt} count={project.photos || 3} />
      </div>

      {/* Project header: H1 left, m² right */}
      <div style={{ borderBottom: `0.5px solid ${C.border}`, borderTop: `0.5px solid ${C.border}` }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, padding: "28px 40px" }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
              San Bernardo · Región Metropolitana
            </div>
            <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>
              {project.name} – Bodegas en Arriendo en San Bernardo
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>Superficie disponible</div>
            <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(24px,3vw,38px)", color: C.blue, lineHeight: 1 }}>
              {surface}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: spec sheet | CTA sidebar */}
      <div className="pdp-grid" style={{ ...W, display: "grid", gridTemplateColumns: "1fr 300px", alignItems: "start", padding: "0 40px" }}>
        {/* Left: data sheet */}
        <div style={{ padding: "40px 40px 40px 0", borderRight: `0.5px solid ${C.border}` }}>
          {project.about && (
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, lineHeight: 1.75, margin: "0 0 36px", maxWidth: 680 }}>
              {project.about}
            </p>
          )}
          <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 24, color: C.navy, margin: "0 0 4px", letterSpacing: "-0.01em" }}>Equipamiento del proyecto</h2>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.slate, marginBottom: 24 }}>Ficha técnica y superficie disponible.</div>

          {PROJECT_SPECS.map(([key, val]) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: `0.5px solid ${C.border}` }}>
              <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>{key}</span>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.navy, fontWeight: 500 }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: (project.flexible || project.expandM2) ? `0.5px solid ${C.border}` : `1px solid ${C.navy}` }}>
            <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>Disponible</span>
            <span style={{ fontFamily: F.head, fontSize: 15, color: C.blue, fontWeight: 700 }}>{surface}</span>
          </div>
          {project.flexible && (
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: project.expandM2 ? `0.5px solid ${C.border}` : `1px solid ${C.navy}` }}>
              <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>Modalidad</span>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.navy, fontWeight: 500 }}>En módulos o como gran superficie</span>
            </div>
          )}
          {project.expandM2 && (
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "13px 0", borderBottom: `1px solid ${C.navy}` }}>
              <span style={{ fontFamily: F.body, fontSize: 12, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>Ampliable</span>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.navy, fontWeight: 500 }}>hasta {m2(project.expandM2)} construibles</span>
            </div>
          )}

          {/* Open-air storage yard (projects with openYard, e.g. Bosque Catemito) */}
          {project.openYard && (
            <div style={{ marginTop: 36, padding: "22px 24px", backgroundColor: C.bgAlt, borderLeft: `3px solid ${C.blue}` }}>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>
                También disponible en este proyecto
              </div>
              <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                {project.openYard.title}
              </h2>
              <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate, lineHeight: 1.65, margin: "0 0 16px", maxWidth: 620 }}>
                {project.openYard.desc}
              </p>
              <BtnWA msg={project.openYard.wa}>Consultar por terreno</BtnWA>
            </div>
          )}

          {/* Location + map */}
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 24, color: C.navy, margin: "0 0 14px", letterSpacing: "-0.01em" }}>Ubicación y accesos</h2>
            <div style={{ fontFamily: F.body, fontSize: 15, color: C.navy, fontWeight: 500 }}>{address}</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.slate, marginBottom: 16 }}>San Bernardo · Región Metropolitana</div>
            <div style={{ border: `0.5px solid ${C.border}`, overflow: "hidden" }}>
              <iframe
                title={`Mapa de ${project.name}`}
                src={mapEmbed(address)}
                width="100%" height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, San Bernardo, Región Metropolitana, Chile`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: 12, fontFamily: F.body, fontSize: 13, color: C.blue, fontWeight: 600, textDecoration: "none" }}>
              Ver en Google Maps →
            </a>
          </div>
        </div>

        {/* Right: CTA panel */}
        <div style={{ padding: "40px 0 40px 36px", position: "sticky", top: 70 }}>
          <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 17, color: C.navy, margin: "0 0 20px" }}>Cotiza tu espacio en {project.name}</h2>
          <div style={{ padding: "16px 0", borderTop: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}`, marginBottom: 20 }}>
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Superficie disponible</div>
            <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.blue }}>{surface}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            <BtnWA msg={project.wa} full>Contáctanos ahora</BtnWA>
          </div>
          <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20 }}>
            {["Trato directo · sin intermediarios", "Respuesta casi al instante por WhatsApp", "Consulta sin compromiso"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ color: C.blue, fontSize: 15, lineHeight: 1 }}>—</div>
                <span style={{ fontFamily: F.body, fontSize: 12.5, color: C.slate, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related projects */}
      <section style={{ padding: "0 40px 64px" }}>
        <div style={{ ...W, padding: 0, paddingTop: 48 }}>
          <SectionLabel>Otros proyectos disponibles</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: `0.5px solid ${C.border}` }}>
            {related.map((p, i) => {
              const shade = PROJECTS.findIndex((x) => x.id === p.id);
              return (
                <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i < 2 ? `0.5px solid ${C.border}` : "none", display: "block" }}>
                  <ProjectImage projectId={p.id} height={100} alt={p.alt} showStatus={false} />
                  <div style={{ padding: "14px 16px", borderTop: `0.5px solid ${C.border}` }}>
                    <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontFamily: F.head, fontWeight: 600, fontSize: 13, color: C.blue, marginBottom: 8 }}>
                      {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 11.5, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>Ver proyecto →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
