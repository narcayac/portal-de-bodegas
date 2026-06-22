import { C, F, W, waUrl, FAQ_CONTACTO } from "../../lib/data";
import { JsonLd, FaqSection, faqSchema, SectionLabel } from "../../components/ui";
import { BtnWA } from "../../components/Buttons";
import ContactForm from "../../components/ContactForm";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Contacto y Cotización | Portal de Bodegas",
  description:
    "Conversemos sobre la bodega ideal para tu empresa. Escríbenos por WhatsApp o completa el formulario y te contactamos en menos de 24 horas.",
  path: "/contacto/",
});

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto — Portal de Bodegas",
};

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd data={faqSchema(FAQ_CONTACTO)} />

      {/* Dark page header */}
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "64px 40px 48px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 14 }}>
            Sin compromiso · Respuesta en 24 horas
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", color: "white", letterSpacing: "-0.01em", margin: 0 }}>
            Cotiza tu Bodega
          </h1>
        </div>
      </div>

      <section style={{ padding: "56px 0 64px" }}>
        <div className="contact-grid" style={{ ...W, display: "grid", gridTemplateColumns: "1.6fr 1fr", alignItems: "start" }}>

          {/* Form column */}
          <ContactForm />

          {/* Info sidebar */}
          <div style={{ padding: "0 0 0 48px", display: "flex", flexDirection: "column", gap: 0 }}>
            <h2 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 17, color: C.navy, margin: "0 0 20px", paddingBottom: 16, borderBottom: `0.5px solid ${C.border}` }}>
              ¿Prefieres WhatsApp?
            </h2>
            <div style={{ paddingBottom: 24, borderBottom: `0.5px solid ${C.border}`, marginBottom: 24 }}>
              <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>
                Si prefieres una respuesta inmediata, escríbenos directamente por WhatsApp.
              </p>
              <BtnWA msg="Hola, quiero solicitar disponibilidad de bodegas" full>Escribir por WhatsApp</BtnWA>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {["Respuesta en menos de 24 horas hábiles", "Trato directo, sin corredores", "Sin compromiso en la primera consulta", "Disponibilidad sujeta a confirmación al momento del contacto"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ color: C.blue, fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>—</div>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: 20 }}>
              <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Datos protegidos</div>
              <p style={{ fontFamily: F.body, fontSize: 12.5, color: C.slateLight, lineHeight: 1.6 }}>
                Ley 19.628 · Tus datos no serán compartidos con terceros ni utilizados con fines distintos a esta consulta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ ...W }}>
          <FaqSection items={FAQ_CONTACTO} />
        </div>
      </section>
    </>
  );
}
