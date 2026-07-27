import Link from "next/link";
import { notFound } from "next/navigation";
import { C, F, W, HREF, SITE, PROJECTS, m2 } from "../../../lib/data";
import { GUIAS, getGuia } from "../../../lib/guias";
import { JsonLd, breadcrumbSchema, faqSchema, FaqSection, SectionLabel } from "../../../components/ui";
import { ProjectImage } from "../../../components/ProjectImage";
import { BtnWA } from "../../../components/Buttons";
import { pageMeta } from "../../../lib/seo";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const g = getGuia(params.slug);
  if (!g) return {};
  return pageMeta({
    title: g.metaTitle,
    description: g.metaDescription,
    path: `/guias/${g.slug}/`,
  });
}

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });

// ── Content block renderers ──────────────────────────────────────────────────
const P = ({ children }) => (
  <p style={{ fontFamily: F.body, fontSize: 15.5, color: "#3d4a5c", lineHeight: 1.75, margin: "0 0 22px" }}>{children}</p>
);

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 23, color: C.navy, margin: "38px 0 14px", lineHeight: 1.25 }}>{children}</h2>
);

function Block({ b }) {
  if (b.t === "p") return <P>{b.x}</P>;
  if (b.t === "h2") return <H2>{b.x}</H2>;
  if (b.t === "list")
    return (
      <ul style={{ margin: "0 0 22px", paddingLeft: 0, listStyle: "none" }}>
        {b.items.map((it) => (
          <li key={it} style={{ display: "flex", gap: 12, fontFamily: F.body, fontSize: 15, color: "#3d4a5c", lineHeight: 1.7, marginBottom: 10 }}>
            <span style={{ color: C.blue, flexShrink: 0, lineHeight: 1.7 }}>—</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  if (b.t === "table")
    return (
      <div style={{ overflowX: "auto", margin: "0 0 22px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr>
              {b.head.map((h) => (
                <th key={h} style={{ fontFamily: F.mono, fontSize: 10.5, color: C.slate, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "left", padding: "10px 14px", borderBottom: `1px solid ${C.navy}`, backgroundColor: C.bgAlt }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ fontFamily: F.body, fontSize: 14, color: j === 0 ? C.navy : "#3d4a5c", fontWeight: j === 0 ? 600 : 400, padding: "12px 14px", borderBottom: `0.5px solid ${C.border}`, verticalAlign: "top" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.t === "note")
    return (
      <div style={{ borderLeft: `3px solid ${C.blue}`, backgroundColor: C.bgAlt, padding: "16px 20px", margin: "0 0 22px" }}>
        <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.slate, lineHeight: 1.65, margin: 0 }}>{b.x}</p>
      </div>
    );
  if (b.t === "cta")
    return (
      <div style={{ backgroundColor: C.navy, padding: "30px 28px", margin: "36px 0 0" }}>
        <p style={{ fontFamily: F.head, fontWeight: 700, fontSize: 19, color: "white", lineHeight: 1.4, margin: "0 0 18px", maxWidth: 560 }}>{b.x}</p>
        <BtnWA msg={b.wa}>Escríbenos por WhatsApp</BtnWA>
      </div>
    );
  return null;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GuiaPage({ params }) {
  const g = getGuia(params.slug);
  if (!g) notFound();

  const related = (g.related || []).map(getGuia).filter(Boolean);
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", item: `${SITE.url}/` },
        { name: "Guías", item: `${SITE.url}/guias/` },
        { name: g.title, item: `${SITE.url}/guias/${g.slug}/` },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        description: g.metaDescription,
        datePublished: g.date,
        dateModified: g.date,
        inLanguage: "es-CL",
        mainEntityOfPage: `${SITE.url}/guias/${g.slug}/`,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      }} />
      {g.faq?.length > 0 && <JsonLd data={faqSchema(g.faq)} />}

      {/* Dark article header */}
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "72px 40px 56px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <Link href={HREF.home} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Inicio</Link>
            <span style={{ color: C.slate, fontSize: 12 }}>›</span>
            <Link href={HREF.guias} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "none" }}>Guías</Link>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.blueLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>
            {g.eyebrow} · {g.readMin} min de lectura
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 600, fontSize: "clamp(28px,3.8vw,44px)", color: "white", letterSpacing: "-0.015em", margin: "0 0 16px", lineHeight: 1.12, maxWidth: 820 }}>
            {g.title}
          </h1>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.slateLight, margin: 0 }}>
            Actualizado el {fmtDate(g.date)} · Portal de Bodegas
          </p>
        </div>
      </div>

      {/* Article body */}
      <article style={{ padding: "52px 0 0" }}>
        <div style={{ ...W }}>
          <div style={{ maxWidth: 760 }}>
            {g.blocks.map((b, i) => <Block key={i} b={b} />)}
          </div>
        </div>
      </article>

      {/* FAQ */}
      {g.faq?.length > 0 && (
        <section style={{ padding: "56px 0 0" }}>
          <div style={{ ...W }}>
            <div style={{ maxWidth: 760 }}>
              <FaqSection items={g.faq} />
            </div>
          </div>
        </section>
      )}

      {/* Related projects */}
      <section style={{ padding: "64px 0 0" }}>
        <div style={{ ...W }}>
          <SectionLabel>Proyectos en San Bernardo</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: `0.5px solid ${C.border}` }}>
            {featuredProjects.map((p) => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: `0.5px solid ${C.border}`, display: "block" }}>
                <ProjectImage projectId={p.id} height={160} alt={p.alt} showStatus={false} />
                <div style={{ padding: "16px 18px 18px", borderTop: `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 15, color: C.blue }}>
                    {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section style={{ padding: "56px 0 80px" }}>
          <div style={{ ...W }}>
            <SectionLabel>Sigue leyendo</SectionLabel>
            <div style={{ borderTop: `1px solid ${C.navy}` }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/guias/${r.slug}/`} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  textDecoration: "none", padding: "18px 0", borderBottom: `0.5px solid ${C.border}`,
                }}>
                  <span style={{ fontFamily: F.head, fontWeight: 600, fontSize: 16.5, color: C.navy, lineHeight: 1.35 }}>{r.title}</span>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: C.blue, whiteSpace: "nowrap", flexShrink: 0 }}>Leer →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
