import Link from "next/link";
import { C, F, W, waUrl, HREF, SITE, PROJECTS } from "../lib/data";
import { LogoMark } from "./ui";

export default function Footer() {
  const navItems = [["Inicio", HREF.home], ["Bodegas", HREF.bodegas], ["Bodegas en San Bernardo", HREF.sanBernardo], ["Guías", HREF.guias], ["Contacto", HREF.contacto]];
  return (
    <footer style={{ borderTop: `1px solid ${C.navy}`, backgroundColor: "white" }}>
      <div style={{ ...W, padding: "40px 40px 28px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 40, marginBottom: 40 }}>
          <div>
            <LogoMark />
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.slate, marginTop: 16, lineHeight: 1.7 }}>
              Plataforma especializada en arriendo de bodegas y galpones industriales para empresas en el sector sur de Santiago.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Navegación</p>
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontFamily: F.body, fontSize: 13.5, color: C.slate, textDecoration: "none", padding: "4px 0" }}>{label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Proyectos</p>
            {PROJECTS.map(p => (
              <Link key={p.id} href={HREF.proyecto(p.id)} style={{ display: "block", fontFamily: F.body, fontSize: 13.5, color: C.slate, textDecoration: "none", padding: "4px 0" }}>{p.name}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Contacto</p>
            <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.slate, marginBottom: 10, lineHeight: 1.6 }}>
              portaldebodegas.cl<br />
              San Bernardo · Región Metropolitana
            </p>
            <a href={waUrl("Hola, quiero cotizar una bodega")} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: F.body, fontSize: 13.5, color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blue}`, paddingBottom: 1 }}>
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
        <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight }}>© 2026 Portal de Bodegas · portaldebodegas.cl</p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href={HREF.privacidad} style={{ fontFamily: F.body, fontSize: 12, color: C.slateLight, textDecoration: "underline" }}>Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
