export const leadStatuses = [
  "Nou",
  "De analizat",
  "Prioritar",
  "Contactat",
  "\u00cen lucru",
  "\u00cenchis",
] as const;

export const leadRiskLevels = ["Redus", "Mediu", "Ridicat", "Critic"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadRiskLevel = (typeof leadRiskLevels)[number];

export type DemoLead = {
  id: string;
  sourceTool: string;
  inquiryType: string;
  projectType: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  urgency: string;
  estimatedBudgetRange: string;
  complexity: string;
  riskLevel: LeadRiskLevel;
  confidence: string;
  status: LeadStatus;
  recommendedNextStep: string;
  generatedSummary: string;
  assumptions: string[];
  recommendedServices: string[];
  missingInformation: string[];
  createdAt: string;
};

export const demoLeads: DemoLead[] = [
  {
    id: "ZES-LEAD-1001",
    sourceTool: "Proposal Builder",
    inquiryType: "Proiect medical turnkey",
    projectType: "Clinica medicala cu imagistica si IVD",
    company: "Demo Healthcare Group",
    contactName: "Andrei Popescu",
    email: "andrei.popescu@example.com",
    phone: "+40 722 111 222",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 550k+",
    complexity: "High-complexity medical infrastructure",
    riskLevel: "Critic",
    confidence: "Medium 64%",
    status: "Prioritar",
    recommendedNextStep:
      "Programare analiza tehnica cu validare radiologie, IVD, echipamente si autorizari.",
    generatedSummary:
      "Proiect complex de clinica medicala cu zone de imagistica, laborator IVD si integrare aparatura. Necesita coordonare DSP, CNCAN unde este cazul, buget pe faze si plan de service.",
    assumptions: [
      "Spatiul este existent si necesita audit tehnic.",
      "Lista echipamentelor nu este finala.",
      "Radiologia poate activa atat cerinte CNCAN, cat si cerinte RF pentru RMN.",
    ],
    recommendedServices: [
      "Constructii si amenajari medicale",
      "Radiologie si camere imagistica",
      "Aparatura medicala",
      "IVD / laborator",
      "Service si mentenanta",
    ],
    missingInformation: [
      "Planuri si releveu",
      "Lista echipamente imagistica / IVD",
      "Status DSP / CNCAN",
      "Buget tinta si termen real",
    ],
    createdAt: "2026-05-19T08:25:00.000Z",
  },
  {
    id: "ZES-LEAD-1002",
    sourceTool: "Calculator cost camera RMN",
    inquiryType: "Camera RMN",
    projectType: "Camera RMN cu RF shielding",
    company: "Imaging Demo Center",
    contactName: "Ioana Marin",
    email: "ioana.marin@example.com",
    phone: "+40 733 222 333",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Enterprise",
    riskLevel: "Ridicat",
    confidence: "High 78%",
    status: "De analizat",
    recommendedNextStep:
      "Solicitare fisa echipament RMN si verificare amplasament pentru RF shielding.",
    generatedSummary:
      "Camera RMN necesita RF shielding, cusca Faraday, usa RF, filtre, waveguides, HVAC si verificarea accesului magnetului. Nu este proiect de ecranare cu plumb.",
    assumptions: [
      "Echipamentul RMN este in selectie finala.",
      "Camera este intr-o cladire medicala existenta.",
      "HVAC-ul trebuie confirmat cu furnizorul echipamentului.",
    ],
    recommendedServices: [
      "RF shielding pentru RMN",
      "Imagistica medicala",
      "Integrare aparatura",
      "Consultanta tehnica",
    ],
    missingInformation: [
      "Fisa tehnica RMN",
      "Dimensiuni camera",
      "Nivel RF attenuation cerut",
      "Trasee HVAC si penetrari",
    ],
    createdAt: "2026-05-19T09:10:00.000Z",
  },
  {
    id: "ZES-LEAD-1003",
    sourceTool: "Radiology Room Planner",
    inquiryType: "Camera CT",
    projectType: "Camera CT / radiologie",
    company: "Clinica Demo Nord",
    contactName: "Mihai Ionescu",
    email: "mihai.ionescu@example.com",
    phone: "+40 744 333 444",
    urgency: "Imediat",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Advanced",
    riskLevel: "Critic",
    confidence: "Medium 58%",
    status: "Prioritar",
    recommendedNextStep:
      "Analiza rapida CNCAN, vecinatati si protectie radiologica inainte de executie.",
    generatedSummary:
      "Camera CT activeaza protectie radiologica, ecranare cu plumb, zone controlate si coordonare CNCAN. RF shielding nu este cerinta principala.",
    assumptions: [
      "Spatiul este deja in executie.",
      "Echipamentul CT a fost selectat.",
      "Documentatia CNCAN nu este finalizata.",
    ],
    recommendedServices: [
      "Protectie radiologica / plumb",
      "Radiologie",
      "Consultanta CNCAN",
      "Integrare aparatura CT",
    ],
    missingInformation: [
      "Calcul radioprotectie",
      "Vecinatati si zone controlate",
      "Status documentatie CNCAN",
      "Plan final camera",
    ],
    createdAt: "2026-05-19T10:45:00.000Z",
  },
  {
    id: "ZES-LEAD-1004",
    sourceTool: "Calculator cost laborator IVD",
    inquiryType: "Laborator / IVD",
    projectType: "Laborator IVD cu integrare LIS",
    company: "Lab Demo Solutions",
    contactName: "Elena Dobre",
    email: "elena.dobre@example.com",
    phone: "+40 755 444 555",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 60k-180k",
    complexity: "Advanced",
    riskLevel: "Mediu",
    confidence: "High 82%",
    status: "Nou",
    recommendedNextStep:
      "Clarificare flux probe, echipamente IVD, integrare LIS si plan service.",
    generatedSummary:
      "Laboratorul necesita structurare pe flux probe, utilitati, echipamente IVD, calibrare, validare, QC si mentenanta.",
    assumptions: [
      "Volumul de probe este mediu.",
      "Integrarea LIS este necesara.",
      "Contractul service nu este definit.",
    ],
    recommendedServices: [
      "IVD / laborator",
      "Aparatura medicala",
      "Integrare echipamente",
      "Service si mentenanta",
    ],
    missingInformation: [
      "Lista analizelor",
      "Volum probe estimat",
      "Cerinte LIS",
      "Consumabile si calibrare",
    ],
    createdAt: "2026-05-18T15:30:00.000Z",
  },
  {
    id: "ZES-LEAD-1005",
    sourceTool: "Service Diagnostic",
    inquiryType: "Service aparatura",
    projectType: "RMN cu eroare sistem",
    company: "Diagnostic Demo Clinic",
    contactName: "Radu Enache",
    email: "radu.enache@example.com",
    phone: "+40 766 555 666",
    urgency: "24-48 ore",
    estimatedBudgetRange: "Evaluare service",
    complexity: "Scor urgenta 86/100",
    riskLevel: "Critic",
    confidence: "Medium 61%",
    status: "Contactat",
    recommendedNextStep:
      "Colectare coduri eroare, istoric service si programare evaluare tehnica.",
    generatedSummary:
      "Echipament RMN cu eroare sistem si impact operational ridicat. Posibil downtime, necesitand triere tehnica si verificare service.",
    assumptions: [
      "Echipamentul afecteaza programarile.",
      "Nu exista istoric complet de service in formular.",
      "Codurile de eroare trebuie validate.",
    ],
    recommendedServices: [
      "Service aparatura medicala",
      "Service imagistica",
      "Mentenanta preventiva",
      "Evaluare tehnica ZES",
    ],
    missingInformation: [
      "Model si serie",
      "Coduri de eroare",
      "Data ultimei mentenante",
      "Contract service existent",
    ],
    createdAt: "2026-05-18T12:15:00.000Z",
  },
  {
    id: "ZES-LEAD-1006",
    sourceTool: "Contact page",
    inquiryType: "Aparatura medicala",
    projectType: "Achizitie ecograf si service",
    company: "Cabinet Demo Medical",
    contactName: "Cristina Pavel",
    email: "cristina.pavel@example.com",
    phone: "+40 777 666 777",
    urgency: "Exploratoriu",
    estimatedBudgetRange: "EUR 15k-60k",
    complexity: "Moderate",
    riskLevel: "Redus",
    confidence: "Low 44%",
    status: "Nou",
    recommendedNextStep:
      "Clarificare model echipament, cerinte service si termen de achizitie.",
    generatedSummary:
      "Solicitare initiala pentru aparatura medicala si service. Necesita discutie comerciala si tehnica pentru selectie echipament.",
    assumptions: [
      "Proiectul este in faza exploratorie.",
      "Nu exista cerinte speciale de shielding.",
      "Service-ul este relevant dupa achizitie.",
    ],
    recommendedServices: [
      "Aparatura medicala",
      "Imagistica medicala",
      "Service aparatura",
    ],
    missingInformation: [
      "Tip exact echipament",
      "Buget tinta",
      "Garantie si service dorit",
    ],
    createdAt: "2026-05-17T11:20:00.000Z",
  },
  {
    id: "ZES-LEAD-1007",
    sourceTool: "AI Project Advisor",
    inquiryType: "Modernizare spatiu existent",
    projectType: "Modernizare clinica cu RX",
    company: "Demo Medical Vest",
    contactName: "Sorin Matei",
    email: "sorin.matei@example.com",
    phone: "+40 788 777 888",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Enterprise",
    riskLevel: "Ridicat",
    confidence: "Medium 67%",
    status: "\u00cen lucru",
    recommendedNextStep:
      "Audit spatiu existent si verificare protectie radiologica pentru zona RX.",
    generatedSummary:
      "Modernizarea unui spatiu existent cu RX necesita corelarea DSP, protectiei radiologice, instalatiilor, aparaturii si fluxurilor.",
    assumptions: [
      "Spatiul functioneaza partial.",
      "RX activeaza protectie radiologica.",
      "Termenul este comprimat.",
    ],
    recommendedServices: [
      "Amenajari medicale",
      "Protectie radiologica",
      "Radiologie",
      "Integrare aparatura",
    ],
    missingInformation: [
      "Plan existent",
      "Fisa echipament RX",
      "Status DSP",
      "Calcul radioprotectie",
    ],
    createdAt: "2026-05-16T14:50:00.000Z",
  },
  {
    id: "ZES-LEAD-1008",
    sourceTool: "Calculator echipamente imagistica",
    inquiryType: "Imagistica medicala",
    projectType: "Inlocuire RX si service",
    company: "Radiology Demo Practice",
    contactName: "Laura Tudor",
    email: "laura.tudor@example.com",
    phone: "+40 799 888 999",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 60k-180k",
    complexity: "Advanced",
    riskLevel: "Mediu",
    confidence: "High 74%",
    status: "De analizat",
    recommendedNextStep:
      "Comparare echipament nou cu infrastructura existenta si cerintele de service.",
    generatedSummary:
      "Inlocuirea echipamentului RX necesita verificare infrastructura, protectie radiologica existenta, integrare si service.",
    assumptions: [
      "Camera existenta poate fi reutilizata partial.",
      "Protectia radiologica trebuie verificata.",
      "Service-ul este necesar post-instalare.",
    ],
    recommendedServices: [
      "Imagistica medicala",
      "Aparatura medicala",
      "Protectie radiologica",
      "Service aparatura",
    ],
    missingInformation: [
      "Model RX actual",
      "Model RX dorit",
      "Documentatie radioprotectie existenta",
      "Contract service",
    ],
    createdAt: "2026-05-15T09:40:00.000Z",
  },
];
