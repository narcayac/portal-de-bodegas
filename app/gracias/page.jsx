import Link from "next/link";
import { Check } from "lucide-react";
import { C, F, W, HREF } from "../../lib/data";
import { BtnWA } from "../../components/Buttons";
import GraciasConversion from "../../components/GraciasConversion";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Solicitud recibida",
  description: "Recibimos tu solicitud. Te contactaremos muy pronto con la disponibilidad vigente.",
  path: "/gracias/",
  noindex: true,
});

export default function GraciasPage() {
  return (
    <>
      <GraciasConversion />
      <div style={{ paddingTop: 64, minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div style={{ ...W, width: "100%" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "64px 0" }}>
            <div style={{ width: 56, height: 56, border: `2px solid ${C.blue}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Check size={28} color={C.blue} />
            </div>
            <h1 style={{ fontFamily: F.head, fontWeight: 700, fontSize: "clamp(26px,3.5vw,36px)", color: C.navy, margin: "0 0 14px", lineHeight: 1.15 }}>
              ¡Recibimos tu solicitud!
            </h1>
            <p style={{ fontFamily: F.body, fontSize: 15.5, color: C.slate, lineHeight: 1.7, margin: "0 0 28px" }}>
              Te contactaremos muy pronto con la disponibilidad vigente y una propuesta a tu medida.
              Si prefieres respuesta al instante, escríbenos directo por WhatsApp.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
              <BtnWA msg="Hola, acabo de enviar el formulario y quiero avanzar más rápido">Escríbenos por WhatsApp</BtnWA>
            </div>
            <Link href={HREF.bodegas} style={{ fontFamily: F.body, fontSize: 14, color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blue}`, paddingBottom: 1 }}>
              Mientras tanto, mira nuestros proyectos →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
