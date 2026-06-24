import { C, F, W, SITE } from "../../lib/data";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Política de Privacidad | Portal de Bodegas",
  description:
    "Cómo Portal de Bodegas trata y protege tus datos personales conforme a la Ley N° 19.628.",
  path: "/politica-de-privacidad/",
  noindex: true,
});

const SECTIONS = [
  ["1. Responsable del tratamiento", "Portal de Bodegas (portaldebodegas.cl) es responsable del tratamiento de los datos personales recopilados a través de este sitio, conforme a la Ley N° 19.628 sobre Protección de la Vida Privada."],
  ["2. Datos que recopilamos", "Recopilamos los datos que entregas voluntariamente en nuestro formulario de contacto: nombre, empresa, teléfono, correo electrónico, metraje requerido, proyecto de interés y comentarios. También podemos registrar parámetros de origen de la visita (UTM) y la URL de la página."],
  ["3. Finalidad del tratamiento", "Utilizamos tus datos únicamente para responder tu consulta, elaborar una cotización a medida y coordinar el arriendo de bodegas. No los usamos con fines distintos a esta gestión comercial."],
  ["4. Conservación", "Conservamos tus datos por el tiempo necesario para atender tu solicitud y cumplir obligaciones legales aplicables."],
  ["5. No compartimos tus datos", "Tus datos no serán vendidos ni compartidos con terceros ajenos a esta gestión, salvo obligación legal."],
  ["6. Tus derechos", "Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiéndonos por los canales de contacto publicados en este sitio."],
  ["7. Cambios a esta política", "Podremos actualizar esta política para reflejar cambios legales u operativos. La versión vigente estará siempre disponible en esta página."],
];

export default function PrivacidadPage() {
  return (
    <>
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "64px 40px 48px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 14 }}>
            Ley 19.628 · {SITE.name}
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "white", letterSpacing: "-0.01em", margin: 0 }}>
            Política de Privacidad
          </h1>
        </div>
      </div>

      <section style={{ padding: "56px 0 80px" }}>
        <div style={{ ...W, maxWidth: 820 }}>
          {SECTIONS.map(([title, body]) => (
            <div key={title} style={{ padding: "22px 0", borderBottom: `0.5px solid ${C.border}` }}>
              <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 10 }}>{title}</h2>
              <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.slate, lineHeight: 1.75, margin: 0 }}>{body}</p>
            </div>
          ))}
          <p style={{ fontFamily: F.body, fontSize: 12.5, color: C.slateLight, marginTop: 24 }}>
            Última actualización: 2026.
          </p>
        </div>
      </section>
    </>
  );
}
