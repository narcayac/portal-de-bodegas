"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { C, F, HREF, METRAJES, PROJECTS } from "../lib/data";

const REQUIRED = ["nombre", "empresa", "telefono", "correo", "metraje"];

const inputBase = (key, errors) => ({
  border: "none",
  borderBottom: `1.5px solid ${errors[key] ? "#ef4444" : C.navy}`,
  borderRadius: 0,
  padding: "11px 0", fontFamily: F.body, fontSize: 15,
  color: C.navy, outline: "none", background: "transparent",
  transition: "border-color 0.15s", width: "100%",
});

// Hoisted so the input is not remounted on every keystroke (avoids focus loss).
function Field({ k, label, type = "text", form, errors, upd }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={k} style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
        {REQUIRED.includes(k) && <span style={{ color: C.blue }}> *</span>}
      </label>
      <input id={k} name={k} type={type} value={form[k]} onChange={(e) => upd(k, e.target.value)}
        required={REQUIRED.includes(k)}
        style={inputBase(k, errors)}
        onFocus={(e) => { e.target.style.borderBottomColor = C.blue; }}
        onBlur={(e) => { e.target.style.borderBottomColor = errors[k] ? "#ef4444" : C.navy; }} />
      {errors[k] && <span style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444" }}>{errors[k]}</span>}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "", empresa: "", telefono: "", correo: "",
    metraje: "", proyecto: "", comentarios: "", ok: false,
  });
  // Hidden UTM / tracking fields (Ley 19.628: privacy checkbox is NOT pre-checked)
  const [utm, setUtm] = useState({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", page_url: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      page_url: window.location.href,
    });
  }, []);

  const upd = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.nombre)   e.nombre   = "Requerido";
    if (!form.empresa)  e.empresa  = "Requerido";
    if (!form.telefono) e.telefono = "Requerido";
    if (!form.correo || !form.correo.includes("@")) e.correo = "Email inválido";
    if (!form.metraje)  e.metraje  = "Selecciona un rango";
    if (!form.ok)       e.ok       = "Debes aceptar la política de privacidad";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    // Web3Forms access key (public by design). Delivers leads to the configured email.
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "cd3a41fe-d3d0-424f-b18c-a7b11daf0f36";
    if (!key) { setSent(true); return; }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `Nueva consulta de ${form.empresa || form.nombre} — Portal de Bodegas`,
          from_name: "Portal de Bodegas",
          Nombre: form.nombre,
          Empresa: form.empresa,
          Teléfono: form.telefono,
          Correo: form.correo,
          "Metraje requerido": form.metraje,
          "Proyecto de interés": form.proyecto || "Sin preferencia",
          Comentarios: form.comentarios,
          ...utm,
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setSubmitError("No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.");
    } catch {
      setSubmitError("No pudimos enviar tu solicitud. Revisa tu conexión o escríbenos por WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div style={{ padding: "60px 48px 60px 0", borderRight: `0.5px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: `2px solid ${C.blue}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Check size={24} color={C.blue} />
        </div>
        <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.navy, marginBottom: 10 }}>Solicitud recibida</h3>
        <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, lineHeight: 1.7 }}>
          Te contactaremos en menos de 24 horas hábiles con la disponibilidad vigente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ padding: "0 48px 0 0", borderRight: `0.5px solid ${C.border}` }}>
      <h2 style={{ fontFamily: F.head, fontWeight: 800, fontSize: 22, color: C.navy, marginBottom: 8 }}>Completa el formulario</h2>
      <div style={{ fontFamily: F.body, fontSize: 10, color: C.slate, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 28, paddingBottom: 16, borderBottom: `0.5px solid ${C.border}` }}>
        Respuesta en menos de 24 horas hábiles
      </div>

      {/* Hidden UTM / tracking fields */}
      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} readOnly />
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Field k="nombre" label="Nombre" form={form} errors={errors} upd={upd} />
        <Field k="empresa" label="Empresa" form={form} errors={errors} upd={upd} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field k="telefono" label="Teléfono" type="tel" form={form} errors={errors} upd={upd} />
          <Field k="correo" label="Correo electrónico" type="email" form={form} errors={errors} upd={upd} />
        </div>

        {/* Metraje select */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="metraje" style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Metraje requerido <span style={{ color: C.blue }}>*</span>
          </label>
          <select id="metraje" name="metraje" value={form.metraje} onChange={(e) => upd("metraje", e.target.value)} required style={{
            border: "none", borderBottom: `1.5px solid ${errors.metraje ? "#ef4444" : C.navy}`,
            borderRadius: 0, padding: "11px 0", fontFamily: F.body, fontSize: 15,
            color: form.metraje ? C.navy : C.slate, outline: "none", background: "transparent", width: "100%",
          }}>
            <option value="" disabled>Seleccionar rango</option>
            {METRAJES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          {errors.metraje && <span style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444" }}>{errors.metraje}</span>}
        </div>

        {/* Proyecto select */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="proyecto" style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Proyecto de interés <span style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
          </label>
          <select id="proyecto" name="proyecto" value={form.proyecto} onChange={(e) => upd("proyecto", e.target.value)} style={{
            border: "none", borderBottom: `1.5px solid ${C.navy}`, borderRadius: 0,
            padding: "11px 0", fontFamily: F.body, fontSize: 15,
            color: form.proyecto ? C.navy : C.slate, outline: "none", background: "transparent", width: "100%",
          }}>
            <option value="">Sin preferencia</option>
            {PROJECTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>

        {/* Comentarios */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="comentarios" style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Comentarios <span style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
          </label>
          <textarea id="comentarios" name="comentarios" value={form.comentarios} onChange={(e) => upd("comentarios", e.target.value)} rows={3}
            placeholder="Cuéntanos sobre tu operación, plazos o requerimientos adicionales…"
            style={{ border: "none", borderBottom: `1.5px solid ${C.navy}`, borderRadius: 0, padding: "11px 0", fontFamily: F.body, fontSize: 15, color: C.navy, outline: "none", background: "transparent", resize: "vertical", width: "100%" }}
            onFocus={(e) => (e.target.style.borderBottomColor = C.blue)}
            onBlur={(e) => (e.target.style.borderBottomColor = C.navy)}
          />
        </div>

        {/* Privacy checkbox — NOT pre-checked (Ley 19.628) */}
        <div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" name="acepto_privacidad" checked={form.ok} onChange={(e) => upd("ok", e.target.checked)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
            <span aria-hidden="true" style={{
              width: 16, height: 16, flexShrink: 0, marginTop: 2,
              border: `1.5px solid ${errors.ok ? "#ef4444" : (form.ok ? C.blue : C.navy)}`,
              backgroundColor: form.ok ? C.blue : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              {form.ok && <Check size={10} color="white" />}
            </span>
            <span style={{ fontFamily: F.body, fontSize: 13, color: C.slate, lineHeight: 1.55 }}>
              Acepto la <Link href={HREF.privacidad} style={{ color: C.blue }}>política de privacidad</Link> y el tratamiento de mis datos personales
            </span>
          </label>
          {errors.ok && <p style={{ fontFamily: F.body, fontSize: 11, color: "#ef4444", marginTop: 6 }}>{errors.ok}</p>}
        </div>

        <div style={{ paddingTop: 8 }}>
          <button type="submit" disabled={sending} style={{
            backgroundColor: sending ? C.slate : C.blue, color: "white", border: "none", borderRadius: 4,
            padding: "14px 32px", fontSize: 14, fontWeight: 600, fontFamily: F.body,
            cursor: sending ? "default" : "pointer", letterSpacing: "0.01em",
          }}
            onMouseEnter={(e) => { if (!sending) e.currentTarget.style.backgroundColor = C.blueDark; }}
            onMouseLeave={(e) => { if (!sending) e.currentTarget.style.backgroundColor = C.blue; }}>
            {sending ? "Enviando…" : "Enviar solicitud"}
          </button>
          {submitError && <p style={{ fontFamily: F.body, fontSize: 13, color: "#ef4444", marginTop: 12 }}>{submitError}</p>}
        </div>
      </div>
    </form>
  );
}
