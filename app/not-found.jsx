import Link from "next/link";
import { C, F, W, HREF } from "../lib/data";
import { BtnPrimary } from "../components/Buttons";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section style={{ paddingTop: 62 }}>
      <div style={{ ...W, padding: "120px 40px 140px", textAlign: "center" }}>
        <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 64, color: C.blue, lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 30, color: C.navy, marginBottom: 14 }}>
          No encontramos esta página
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: C.slate, maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Puede que el enlace haya cambiado. Revisa los proyectos disponibles o vuelve al inicio.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary href={HREF.home}>Volver al inicio</BtnPrimary>
          <Link href={HREF.bodegas} style={{ fontFamily: F.body, fontSize: 14, color: C.blue, fontWeight: 600, textDecoration: "none", borderBottom: `1.5px solid ${C.blue}`, paddingBottom: 2, alignSelf: "center" }}>
            Ver bodegas →
          </Link>
        </div>
      </div>
    </section>
  );
}
