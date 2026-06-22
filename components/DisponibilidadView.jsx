"use client";

import { useState } from "react";
import Link from "next/link";
import { C, F, W, HREF, PROJECTS, m2 } from "../lib/data";
import { Img, SectionLabel } from "./ui";
import { AvailTable } from "./AvailTable";
import { BtnPrimary, BtnWA } from "./Buttons";

export default function DisponibilidadView() {
  const [filter, setFilter] = useState("todos");
  const filters = [["todos", "Todos"], ["chica", "Hasta 500 m²"], ["mediana", "500–1.000 m²"], ["grande", "Más de 1.000 m²"]];
  const match = (p) => {
    if (filter === "todos")   return true;
    if (filter === "chica")   return p.min <= 500;
    if (filter === "mediana") return p.min <= 1000 && p.max >= 500;
    if (filter === "grande")  return p.max >= 1000;
    return true;
  };
  const shown = PROJECTS.filter(match);

  return (
    <>
      <div style={{
        paddingTop: 62, backgroundColor: C.navy,
        backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.022) 79px,rgba(255,255,255,0.022) 80px)",
        padding: "64px 40px 48px",
      }}>
        <div style={{ ...W, padding: 0 }}>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.slateLight, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 14 }}>
            Actualizado regularmente · San Bernardo
          </div>
          <h1 style={{ fontFamily: F.head, fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "white", letterSpacing: "-0.01em", margin: 0 }}>
            Disponibilidad Actual de Bodegas
          </h1>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div style={{ borderBottom: `0.5px solid ${C.border}`, backgroundColor: "white", position: "sticky", top: 62, zIndex: 50 }}>
        <div style={{ ...W, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", padding: "12px 40px" }}>
          <span id="filtra" style={{ fontFamily: F.body, fontSize: 11, color: C.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 12 }}>Filtra por metraje</span>
          {filters.map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{
              padding: "7px 16px", background: "none", border: "none",
              fontFamily: F.body, fontSize: 13, cursor: "pointer",
              fontWeight: filter === val ? 600 : 400,
              color: filter === val ? C.navy : C.slate,
              borderBottom: filter === val ? `2px solid ${C.navy}` : "2px solid transparent",
              transition: "border-color 0.15s",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <section style={{ padding: "48px 0 80px" }}>
        <div style={{ ...W }}>
          <SectionLabel>Disponibilidad por proyecto</SectionLabel>
          {shown.length === 0 ? (
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.slate, padding: "32px 0" }}>No hay proyectos que coincidan con ese filtro actualmente.</p>
          ) : (
            <>
              <AvailTable />

              {/* Project detail cards below table */}
              <div style={{ marginTop: 48 }}>
                <SectionLabel>Detalle de proyectos</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: `0.5px solid ${C.border}` }}>
                  {shown.map((p, i) => {
                    const shade = PROJECTS.findIndex((x) => x.id === p.id);
                    return (
                      <Link key={p.id} href={HREF.proyecto(p.id)} style={{ textDecoration: "none", borderRight: i < shown.length - 1 ? `0.5px solid ${C.border}` : "none", borderBottom: `0.5px solid ${C.border}`, display: "block" }}>
                        <Img height={160} shade={shade} alt={p.alt} />
                        <div style={{ padding: "18px 20px", borderTop: `0.5px solid ${C.border}` }}>
                          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 3 }}>{p.name}</div>
                          <div style={{ fontFamily: F.body, fontSize: 12, color: C.slate, marginBottom: 10 }}>San Bernardo, RM</div>
                          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 16, color: C.blue, marginBottom: 14 }}>
                            {p.min === p.max ? m2(p.min) : `${m2(p.min)} – ${m2(p.max)}`}
                          </div>
                          <span style={{ fontFamily: F.body, fontSize: 12, color: C.navy, borderBottom: `1px solid ${C.navy}`, paddingBottom: 1 }}>
                            Ver proyecto →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: 48, paddingTop: 36, borderTop: `0.5px solid ${C.border}` }}>
            <SectionLabel>Solicita una cotización</SectionLabel>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h3 style={{ fontFamily: F.head, fontWeight: 700, fontSize: 20, color: C.navy, marginBottom: 4 }}>¿No encuentras lo que buscas?</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: C.slate, margin: 0 }}>Cuéntanos tus requerimientos y te proponemos alternativas.</p>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <BtnPrimary href={HREF.contacto}>Solicitar disponibilidad</BtnPrimary>
                <BtnWA msg="Hola, quiero revisar disponibilidad de bodegas">WhatsApp</BtnWA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
