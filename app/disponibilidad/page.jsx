import { JsonLd, faqSchema } from "../../components/ui";
import { FAQ_DISPONIBILIDAD } from "../../lib/data";
import DisponibilidadView from "../../components/DisponibilidadView";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Disponibilidad de Bodegas en Arriendo | Portal de Bodegas",
  description:
    "Revisa la disponibilidad actualizada de bodegas por proyecto y tamaño, desde 180 m² hasta 1.900 m². Solicita cotización sin compromiso.",
  path: "/disponibilidad/",
});

export default function DisponibilidadPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_DISPONIBILIDAD)} />
      <DisponibilidadView />
    </>
  );
}
