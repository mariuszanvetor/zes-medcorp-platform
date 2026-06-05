export type VisualAsset = {
  src: string;
  alt: string;
  position?: string;
};

export const corporateVisuals = {
  hero: {
    src: "/visuals/medical-infrastructure-hero.webp",
    alt: "Infrastructura medicala premium cu camere CT si RMN si consultanta tehnica",
    position: "object-[52%_50%]",
  },
  ctRoom: {
    src: "/visuals/ct-room.webp",
    alt: "Camera CT moderna pregatita pentru instalare si operare clinica",
    position: "object-[52%_50%]",
  },
  mriRoom: {
    src: "/visuals/mri-room.webp",
    alt: "Camera RMN moderna cu infrastructura tehnica si acces controlat",
    position: "object-[50%_50%]",
  },
  rfShielding: {
    src: "/visuals/rf-shielding.webp",
    alt: "RF shielding pentru camera RMN cu panouri tehnice si verificare de executie",
    position: "object-[50%_48%]",
  },
  radiationProtection: {
    src: "/visuals/radiation-protection.webp",
    alt: "Radioprotectie si plumbare pentru camera RX in mediu medical modern",
    position: "object-[50%_50%]",
  },
  laboratory: {
    src: "/visuals/medical-laboratory.webp",
    alt: "Laborator medical modern cu echipamente IVD si integrare tehnica",
    position: "object-[48%_50%]",
  },
  equipment: {
    src: "/visuals/medical-equipment.webp",
    alt: "Echipamente medicale pentru imagistica, diagnostic si integrare clinica",
    position: "object-[50%_50%]",
  },
  service: {
    src: "/visuals/technical-service.webp",
    alt: "Service tehnic pentru aparatura medicala intr-un spatiu biomedical organizat",
    position: "object-[48%_50%]",
  },
  maintenance: {
    src: "/visuals/preventive-maintenance.webp",
    alt: "Mentenanta preventiva pentru echipamente medicale si continuitate operationala",
    position: "object-[50%_50%]",
  },
  construction: {
    src: "/visuals/medical-construction.webp",
    alt: "Dezvoltare si amenajare de unitati medicale cu planificare tehnica",
    position: "object-[50%_50%]",
  },
  projects: {
    src: "/visuals/project-showcase.webp",
    alt: "Proiect medical finalizat cu infrastructura imagistica si integrare echipamente",
    position: "object-[50%_50%]",
  },
} satisfies Record<string, VisualAsset>;

const revenueVisualBySlug: Record<string, VisualAsset> = {
  "camere-ct": corporateVisuals.ctRoom,
  "camere-rmn": corporateVisuals.mriRoom,
  "rf-shielding-rmn": corporateVisuals.rfShielding,
  "radioprotectie-imagistica": corporateVisuals.radiationProtection,
  "dezvoltare-unitati-medicale": corporateVisuals.construction,
  "echipamente-imagistica-diagnostic": corporateVisuals.equipment,
  "ecografe-sisteme-ultrasunete": corporateVisuals.equipment,
  "sisteme-mamografie": corporateVisuals.equipment,
  "sisteme-c-arm": corporateVisuals.equipment,
  "echipamente-laborator-ivd": corporateVisuals.laboratory,
  "solutii-pacs-ris": corporateVisuals.equipment,
  "service-echipamente-medicale": corporateVisuals.service,
  "contracte-mentenanta-preventiva": corporateVisuals.maintenance,
  "relocare-echipamente-medicale": corporateVisuals.service,
  "instalare-punere-in-functiune": corporateVisuals.construction,
  "suport-tehnic-echipamente": corporateVisuals.service,
  "service-multi-vendor": corporateVisuals.maintenance,
};

const commercialVisualBySlug: Record<string, VisualAsset> = {
  "amenajare-centre-imagistica": corporateVisuals.construction,
  "amenajare-cabinet-medical": corporateVisuals.construction,
  "proiectare-radiologie": corporateVisuals.radiationProtection,
  "autorizare-cncan-camera-rx": corporateVisuals.radiationProtection,
  "service-radiologie-romania": corporateVisuals.service,
  "service-ecografe": corporateVisuals.equipment,
  "service-laborator-ivd": corporateVisuals.laboratory,
  "plumbare-radiologica": corporateVisuals.radiationProtection,
};

export function getRevenueLandingVisual(slug: string) {
  return revenueVisualBySlug[slug] ?? corporateVisuals.hero;
}

export function getCommercialLandingVisual(slug: string) {
  return commercialVisualBySlug[slug] ?? corporateVisuals.hero;
}
