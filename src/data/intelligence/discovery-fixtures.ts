import type { IntelligenceInput } from "@/lib/ai-intelligence/types";

export type DiscoveryFixture = {
  id: string;
  label: string;
  context: IntelligenceInput;
  expectedSignals: string[];
};

export const adaptiveDiscoveryFixtures: DiscoveryFixture[] = [
  {
    id: "mri-room",
    label: "MRI/RMN project",
    context: {
      freeText:
        "Clinica vrea sa amenajeze o camera RMN 1.5T intr-o cladire existenta. Echipamentul este aproape ales, dar nu exista inca plan final pentru RF shielding, HVAC si acces magnet.",
      intent: "new-project",
      projectStage: "feasibility",
      domains: ["mri"],
      equipmentTypes: ["RMN 1.5T"],
      existingBuilding: true,
      equipmentSpecsAvailable: false,
      plansAvailable: false,
      locationKnown: true,
      surfaceKnown: false,
      budgetKnown: true,
      timelineKnown: false,
      urgency: "3-6 luni",
    },
    expectedSignals: ["mri", "rf-shielding", "hvac", "equipment-specs", "room-plan"],
  },
  {
    id: "ivd-lab",
    label: "IVD laboratory",
    context: {
      freeText:
        "Laborator IVD nou pentru analize uzuale, cu analizatoare de biochimie si hematologie in evaluare. Trebuie clarificat fluxul probelor, utilitatile si integrarea LIS.",
      intent: "new-project",
      projectStage: "budgeting",
      domains: ["ivd-laboratory"],
      equipmentTypes: ["analizoare biochimie", "analizoare hematologie"],
      existingBuilding: false,
      equipmentSpecsAvailable: false,
      plansAvailable: true,
      locationKnown: true,
      surfaceKnown: true,
      budgetKnown: false,
      timelineKnown: false,
    },
    expectedSignals: ["ivd-laboratory", "workflow", "equipment-specs", "lis", "service-access"],
  },
  {
    id: "dental-cbct",
    label: "Dental clinic CBCT",
    context: {
      freeText:
        "Cabinet stomatologic existent care vrea sa instaleze CBCT. Spatiul este mic si trebuie verificata radioprotectia si pozitionarea echipamentului.",
      intent: "equipment-acquisition",
      projectStage: "procurement",
      domains: ["dental"],
      equipmentTypes: ["CBCT"],
      existingBuilding: true,
      equipmentSpecsAvailable: true,
      plansAvailable: false,
      locationKnown: true,
      surfaceKnown: false,
      budgetKnown: true,
      timelineKnown: true,
      urgency: "1-3 luni",
    },
    expectedSignals: ["dental", "radiation-protection", "room-layout", "equipment-specs"],
  },
  {
    id: "surgery-room",
    label: "Surgery/OR room",
    context: {
      freeText:
        "Clinica planifica o sala de interventii si are nevoie de clarificari pentru HVAC, gaze medicale, electric, circuite si echipamente.",
      intent: "new-project",
      projectStage: "design",
      domains: ["surgery-or", "medical-electrical", "hvac"],
      existingBuilding: false,
      equipmentSpecsAvailable: false,
      plansAvailable: true,
      locationKnown: true,
      surfaceKnown: true,
      budgetKnown: true,
      timelineKnown: false,
    },
    expectedSignals: ["surgery-or", "hvac", "medical-gases", "electrical", "specialist-review"],
  },
  {
    id: "clinic-modernization",
    label: "Clinic modernization",
    context: {
      freeText:
        "Clinica functionala vrea modernizare etapizata fara oprirea completa a activitatii. Sunt implicate radiologie, receptie si cateva cabinete.",
      intent: "modernization",
      projectStage: "feasibility",
      domains: ["clinic-modernization", "radiology", "operational-workflow"],
      modernization: true,
      existingBuilding: true,
      equipmentSpecsAvailable: false,
      plansAvailable: false,
      locationKnown: true,
      surfaceKnown: true,
      budgetKnown: false,
      timelineKnown: false,
      urgency: "fara downtime major",
    },
    expectedSignals: ["clinic-modernization", "downtime", "phasing", "radiology", "room-plan"],
  },
  {
    id: "general-clinic",
    label: "General clinic setup",
    context: {
      freeText:
        "Investitorul evalueaza deschiderea unei clinici medicale cu specialitati mixte, imagistica usoara si laborator extern sau intern in etapa ulterioara.",
      intent: "new-project",
      projectStage: "idea",
      domains: ["healthcare-infrastructure"],
      existingBuilding: false,
      equipmentSpecsAvailable: false,
      plansAvailable: false,
      locationKnown: false,
      surfaceKnown: false,
      budgetKnown: false,
      timelineKnown: false,
    },
    expectedSignals: ["healthcare-infrastructure", "service-mix", "budgeting", "project-intake"],
  },
  {
    id: "ultrasound-cardiology",
    label: "Ultrasound/cardiology cabinet",
    context: {
      freeText:
        "Cabinet de cardiologie cu ecografie, ECG, holter si test de efort. Trebuie gandit fluxul pacientilor si integrarea datelor.",
      intent: "new-project",
      projectStage: "budgeting",
      domains: ["cardiology", "ultrasound", "operational-workflow"],
      equipmentTypes: ["ecograf", "ECG", "holter"],
      existingBuilding: true,
      equipmentSpecsAvailable: true,
      plansAvailable: true,
      locationKnown: true,
      surfaceKnown: true,
      budgetKnown: true,
      timelineKnown: true,
    },
    expectedSignals: ["cardiology", "ultrasound", "workflow", "data-it"],
  },
];
