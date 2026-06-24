import { C, F, W, waUrl, SITE, FAQ_CONTACTO } from "../../lib/data";
import { JsonLd, faqSchema } from "../../components/ui";
import FaqAccordion from "../../components/Faq";
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
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>
            Contacto · Respuesta en 24 horas
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 600, fontSize: "clamp(30px,4.4vw,50px)", color: "white", letterSpacing: "-0.015em", margin: 0, lineHeight: 1.05 }}>
            Hablemos de tu próxima bodega
          </h1>
        </div>
      </div>

      <section style={{ padding: "56px 0 64px" }}>
        <div className="contact-grid" style={{ ...W, display: "grid", gridTemplateColumns: "1.6fr 1fr", alignItems: "start" }}>

          {/* Form column */}
          <ContactForm />

          {/* Info sidebar */}
          <div style={{ padding: "0 0 0 48px", display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Contact card */}
            <div style={{ border: `0.5px solid ${C.border}`, borderTop: `2px solid ${C.navy}`, padding: "22px 24px", marginBottom: 28 }}>
              {[
                ["Teléfono", SITE.phoneDisplay, waUrl("Hola, quiero contactar a Portal de Bodegas")],
                ["Email", SITE.email, `mailto:${SITE.email}`],
                ["Ubicación", "San Bernardo, Región Metropolitana", null],
              ].map(([label, value, href], i) => (
                <div key={label} style={{ paddingTop: i === 0 ? 0 : 14, marginTop: i === 0 ? 0 : 14, borderTop: i === 0 ? "none" : `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: 15, color: C.navy, fontWeight: 600, textDecoration: "none" }}>{value}</a>
                  ) : (
                    <div style={{ fontFamily: F.body, fontSize: 15, color: C.navy, fontWeight: 600 }}>{value}</div>
                  )}
                </div>
              ))}
            </div>
            <h2 style={{ fontFamily: F.head, fontWeight: 600, fontSize: 20, color: C.navy, margin: "0 0 16px", paddingBottom: 16, borderBottom: `0.5px solid ${C.border}` }}>
              ¿Prefieres WhatsApp?
            </h2>
            <div style={{ paddingBottom: 24, borderBottom: `0.5px solid ${C.border}`, marginBottom: 24 }}>
              <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>
                Si prefieres una respuesta inmediata, escríbenos directamente por WhatsApp.
              </p>
              <BtnWA msg="Hola, quiero contactar a Portal de Bodegas" full>Escribir por WhatsApp</BtnWA>
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
          <FaqAccordion items={FAQ_CONTACTO} />
        </div>
      </section>
    </>
  );
}
