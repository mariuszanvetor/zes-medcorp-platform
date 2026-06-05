"use client";

import { LeadCaptureForm, type LeadFormExtraField } from "@/components/forms/LeadCaptureForm";
import type { ProductCatalogItem } from "@/lib/product-catalog";
import { getProductDisplayName } from "@/lib/product-catalog";

const productQuoteFields: LeadFormExtraField[] = [
  { id: "city", label: "Oras", required: true, placeholder: "Ex: Bucuresti" },
  {
    id: "quantity",
    label: "Cantitate estimata",
    options: ["1", "2-5", "6-10", "Peste 10", "Inca nu stim"],
    type: "select",
  },
  {
    id: "purchaseStage",
    label: "Stadiu achizitie",
    options: ["Explorare", "Bugetare", "Cerere oferta", "Achizitie apropiata", "Proiect finantare"],
    type: "select",
  },
  {
    id: "supportNeed",
    label: "Suport necesar",
    options: ["Doar oferta", "Oferta + instalare", "Oferta + service", "Pachet complet", "De clarificat"],
    type: "select",
  },
  {
    id: "notes",
    label: "Aplicatie / context",
    placeholder: "Ex: cabinet ORL, laborator, camera tratament, clinica noua",
  },
];

export function ProductQuoteForm({ product }: { product: ProductCatalogItem }) {
  const displayName = getProductDisplayName(product);

  return (
    <LeadCaptureForm
      description="Trimite contextul comercial. Echipa ZESCORP poate verifica produsul, alternativa potrivita, instalarea si suportul de service inainte de ofertare."
      extraFields={productQuoteFields}
      eyebrow="Cerere oferta produs"
      generatedSummary={`Cerere oferta pentru ${displayName}. Produs catalog medical importat, status ${product.reviewStatus}, cod GIMA ${product.gimaCode || "neconfirmat"}.`}
      inquiryType={`Oferta produs: ${displayName}`}
      sourcePage={`/produse/${product.slug}`}
      sourceTool="product-catalog"
      submitLabel="Solicita oferta pentru produs"
      successDescription="Echipa ZESCORP poate reveni cu intrebari despre disponibilitate, configuratie, instalare, service si alternative potrivite."
      successTitle="Cererea de oferta a fost transmisa."
      summary={{
        projectType: `Produs catalog: ${displayName}`,
        nextStep: "Verificare produs, disponibilitate si context comercial.",
      }}
      title={`Solicita oferta pentru ${displayName}.`}
      tone="dark"
    />
  );
}
