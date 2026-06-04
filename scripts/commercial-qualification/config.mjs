export const QUALIFICATION_OUTPUT_DIR = "outputs/phase-83b";
export const QUALIFICATION_WORKBOOK = "ZESCORP-Qualified-Outreach.xlsx";

export const CLASSIFICATIONS = {
  idealClient: "Ideal Client",
  goodProspect: "Good Prospect",
  lowFit: "Low Fit Prospect",
  competitor: "Competitor",
  distributor: "Distributor",
  manufacturer: "Manufacturer",
  serviceProvider: "Service Provider",
  doNotContact: "Do Not Contact",
};

export const OUTREACH_STYLES = {
  executive: "A. Executive / Management",
  technical: "B. Technical / Engineering",
  operations: "C. Operations / Clinic Administration",
};

export const EXCLUDED_CLASSIFICATIONS = new Set([
  CLASSIFICATIONS.competitor,
  CLASSIFICATIONS.distributor,
  CLASSIFICATIONS.manufacturer,
  CLASSIFICATIONS.serviceProvider,
  CLASSIFICATIONS.doNotContact,
  CLASSIFICATIONS.lowFit,
]);

export const MAJOR_CITIES = new Set([
  "bucuresti",
  "ilfov",
  "cluj",
  "cluj-napoca",
  "iasi",
  "timisoara",
  "constanta",
  "brasov",
  "craiova",
  "pitesti",
  "sibiu",
  "oradea",
  "ploiesti",
  "galati",
  "targu mures",
]);

export const VALUE_MODELS = {
  "CT/RMN infrastructure": {
    minimum: 20000,
    maximum: 180000,
    midpoint: 70000,
  },
  "CT infrastructure": {
    minimum: 15000,
    maximum: 100000,
    midpoint: 50000,
  },
  "RMN infrastructure": {
    minimum: 30000,
    maximum: 160000,
    midpoint: 80000,
  },
  "Radiology room / RX authorization": {
    minimum: 5000,
    maximum: 45000,
    midpoint: 18000,
  },
  "Lead shielding / plumbare": {
    minimum: 5000,
    maximum: 45000,
    midpoint: 18000,
  },
  "RF shielding": {
    minimum: 25000,
    maximum: 140000,
    midpoint: 65000,
  },
  "Medical fit-out / amenajare medicala": {
    minimum: 15000,
    maximum: 200000,
    midpoint: 75000,
  },
  "Maintenance contract": {
    minimum: 2000,
    maximum: 25000,
    midpoint: 8000,
  },
  "CBCT dental clinic": {
    minimum: 3000,
    maximum: 25000,
    midpoint: 10000,
  },
  "Equipment relocation": {
    minimum: 8000,
    maximum: 90000,
    midpoint: 35000,
  },
};

export const COMPLIANCE_NOTE =
  "Valorile sunt modele interne orientative pentru prioritizarea outreach-ului, nu oferte. Eligibilitatea tehnica, radioprotectia si pasii CNCAN se valideaza de specialisti competenti.";
