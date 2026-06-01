export const SENDER_IDENTITY =
  "SC ZES MEDCORP S.R.L. | https://zescorp.ro | office@zescorp.ro | 0725 514 782";
export const OPT_OUT_LINE =
  'Daca mesajul nu este relevant, raspundeti cu "nu doresc mesaje ulterioare" si nu vom mai reveni.';

const clinicEmail = (angle) => `Buna ziua,

Va contactez din partea ZESCORP. Lucram cu proiecte medicale unde ${angle}. Daca aveti o modernizare, o extindere sau o nevoie tehnica in evaluare, putem porni cu o discutie scurta si relevanta.

Optional, puteti folosi ZES pe https://zescorp.ro pentru a structura contextul initial.

${SENDER_IDENTITY}
${OPT_OUT_LINE}`;

const partnerEmail = (angle) => `Buna ziua,

Va contactez din partea ZESCORP pentru a explora o posibila colaborare punctuala. Putem contribui cu ${angle}. Daca exista complementaritate, propun o discutie tehnica scurta.

Mai multe informatii: https://zescorp.ro

${SENDER_IDENTITY}
${OPT_OUT_LINE}`;

export const templateGroups = {
  "clinic-imaging-radiology": {
    label: "Clinica imagistica / radiologie",
    subject: "Discutie tehnica pentru infrastructura de imagistica",
    emailBody: clinicEmail(
      "infrastructura, radioprotectia, preinstalarea si planificarea echipamentelor trebuie corelate",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP si lucrez cu proiecte de infrastructura pentru imagistica medicala. Daca aveti o extindere sau modernizare in evaluare, putem ramane conectati.",
    followUp1:
      "Revin scurt: daca exista un proiect RX, CT sau RMN in evaluare, putem incepe cu planul spatiului si tipul echipamentului.",
    followUp2:
      "Inchid aici mesajele ca sa nu insist. Ramanem disponibili pentru o discutie tehnica atunci cand apare un proiect relevant.",
    cta: "Solicita evaluare preliminara",
  },
  "service-equipment": {
    label: "Service aparatura",
    subject: "Discutie punctuala pentru service aparatura medicala",
    emailBody: partnerEmail(
      "triere tehnica, continuitate operationala si colaborare pentru cazuri de service compatibile",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP. Ne intereseaza discutii punctuale pentru service si mentenanta aparatura medicala, atunci cand competentele sunt complementare.",
    followUp1:
      "Revin punctual privind o posibila colaborare pentru service. Daca nu este relevant, inchid aici discutia.",
    followUp2:
      "Ultimul mesaj din partea mea. Ramanem disponibili pentru cazuri tehnice compatibile.",
    cta: "Discuta o colaborare tehnica",
  },
  "radioprotection-rx": {
    label: "Radioprotectie / camera RX",
    subject: "Evaluare preliminara pentru radioprotectie si camera RX",
    emailBody: clinicEmail(
      "camera RX, planul spatiului si radioprotectia necesita clarificare tehnica si validare de specialitate",
    ),
    linkedIn:
      "Buna ziua. Lucrez cu ZESCORP pe proiecte RX si radioprotectie. Daca aveti o camera noua sau o modernizare, putem ramane conectati.",
    followUp1:
      "Revin scurt: pentru o evaluare preliminara sunt utile planul camerei, tipul echipamentului si orasul.",
    followUp2:
      "Inchid aici mesajele. Ramanem disponibili cand apare un proiect RX relevant.",
    cta: "Pregateste contextul camerei RX",
  },
  "distributor-partnership": {
    label: "Parteneriat distribuitor",
    subject: "Posibila colaborare pentru proiecte medicale integrate",
    emailBody: partnerEmail(
      "infrastructura, preinstalare, radioprotectie, RF shielding si suport pentru implementare",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP. Lucram pe infrastructura si preinstalare pentru proiecte medicale si cautam colaborari punctuale cu distribuitori.",
    followUp1:
      "Revin scurt privind posibila colaborare pentru proiecte unde echipamentul depinde de infrastructura si preinstalare.",
    followUp2:
      "Inchid aici mesajele. Ramanem disponibili pentru oportunitati concrete si relevante.",
    cta: "Discuta o colaborare",
  },
  "dental-cbct": {
    label: "Cabinet dentar CBCT/RX",
    subject: "Clarificare tehnica pentru CBCT sau RX dentar",
    emailBody: clinicEmail(
      "spatiul CBCT/RX, layout-ul si radioprotectia trebuie clarificate inainte de implementare",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP. Pentru proiecte CBCT/RX dentar putem ajuta cu structurarea preliminara a spatiului si informatiilor tehnice.",
    followUp1:
      "Revin doar cu o clarificare: pentru discutia initiala sunt utile planul, echipamentul si termenul proiectului.",
    followUp2:
      "Inchid aici mesajele. Ramanem disponibili pentru un proiect CBCT/RX relevant.",
    cta: "Clarifica proiectul CBCT/RX",
  },
  "veterinary-imaging": {
    label: "Imagistica veterinara",
    subject: "Suport preliminar pentru imagistica veterinara",
    emailBody: clinicEmail(
      "spatiul RX sau imagistic, documentatia si suportul tehnic trebuie corelate",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP. Daca aveti imagistica veterinara, putem ramane conectati pentru clarificari de infrastructura si service.",
    followUp1:
      "Revin scurt: daca exista o camera RX veterinara sau o problema de aparatura, putem porni de la plan si model.",
    followUp2:
      "Inchid aici mesajele. Ramanem disponibili cand apare un context tehnic relevant.",
    cta: "Solicita discutie tehnica",
  },
  "funding-modernization": {
    label: "Fonduri / modernizare",
    subject: "Suport tehnic pentru proiect medical finantat",
    emailBody: partnerEmail(
      "structurarea preliminara a infrastructurii, listelor de echipamente si contextului de ofertare",
    ),
    linkedIn:
      "Buna ziua. Reprezint ZESCORP. Pentru proiecte medicale finantate putem sustine partea preliminara de infrastructura si context tehnic pentru ofertare.",
    followUp1:
      "Revin scurt privind proiectele medicale finantate. Putem ajuta cu brief-ul tehnic preliminar pentru beneficiar.",
    followUp2:
      "Inchid aici mesajele. Ramanem disponibili pentru proiecte medicale cu nevoie tehnica reala.",
    cta: "Pregateste brief tehnic",
  },
};

export const categories = [
  {
    id: "clinici-imagistica",
    label: "Clinici imagistica medicala",
    templateGroup: "clinic-imaging-radiology",
    baseRelevance: 27,
    baseProjectPotential: 24,
    basePartnershipPotential: 4,
    queries: ['"clinica imagistica" {city} contact', '"centru imagistica medicala" {city}', '"RMN" "CT" clinica {city}'],
    inclusion: "Centru sau clinica ce publica servicii RX, CT, RMN, mamografie ori radiologie.",
    exclusion: "Directoare fara site oficial, pagini de continut si furnizori fara activitate clinica.",
    service: "Planificare infrastructura imagistica, radioprotectie, preinstalare si service.",
  },
  {
    id: "centre-radiologie-rx",
    label: "Centre radiologie RX",
    templateGroup: "radioprotection-rx",
    baseRelevance: 30,
    baseProjectPotential: 24,
    basePartnershipPotential: 4,
    queries: ['"centru radiologie" {city} contact', '"radiologie RX" {city} contact', '"camera RX" clinica {city}'],
    inclusion: "Centru cu radiologie conventionala, mamografie sau fluoroscopie publicata.",
    exclusion: "Cabinete fara serviciu RX confirmabil si articole generale despre radiologie.",
    service: "Camera RX, radioprotectie, plumbare, suport preliminar CNCAN si service.",
  },
  {
    id: "centre-ct-rmn",
    label: "Centre CT/RMN",
    templateGroup: "clinic-imaging-radiology",
    baseRelevance: 32,
    baseProjectPotential: 27,
    basePartnershipPotential: 5,
    queries: ['"CT RMN" {city} contact', '"centru RMN" {city}', '"tomografie computerizata" "RMN" {city}'],
    inclusion: "Centru care publica servicii CT, RMN sau extinderi imagistice.",
    exclusion: "Pagini agregatoare fara site oficial si cabinete fara echipamente imagistice publicate.",
    service: "Amenajare, extindere, HVAC/electric, RF shielding si preinstalare CT/RMN.",
  },
  {
    id: "stomatologie-cbct-rx",
    label: "Clinici stomatologice CBCT/RX",
    templateGroup: "dental-cbct",
    baseRelevance: 20,
    baseProjectPotential: 15,
    basePartnershipPotential: 2,
    queries: ['"CBCT" stomatologie {city} contact', '"radiologie dentara" {city}', '"RX dentar" {city} contact'],
    inclusion: "Cabinet sau centru stomatologic care publica CBCT ori RX dentar.",
    exclusion: "Cabinete fara radiologie publicata.",
    service: "Evaluare preliminara CBCT/RX, layout si radioprotectie.",
  },
  {
    id: "veterinare-radiologie",
    label: "Clinici veterinare cu radiologie",
    templateGroup: "veterinary-imaging",
    baseRelevance: 16,
    baseProjectPotential: 12,
    basePartnershipPotential: 2,
    queries: ['"clinica veterinara" radiologie {city}', '"cabinet veterinar" RX {city}', '"CT veterinar" {city}'],
    inclusion: "Clinica veterinara care publica RX, ecografie, CT sau alte servicii imagistice.",
    exclusion: "Cabinete fara imagistica publicata.",
    service: "Radioprotectie RX veterinara, infrastructura si suport aparatura.",
  },
  {
    id: "distribuitori-aparatura",
    label: "Distribuitori aparatura medicala",
    templateGroup: "distributor-partnership",
    baseRelevance: 24,
    baseProjectPotential: 12,
    basePartnershipPotential: 26,
    queries: ['"distribuitor aparatura medicala" Romania contact', '"echipamente medicale" distribuitor Romania', '"aparatura imagistica" distribuitor Romania'],
    inclusion: "Distribuitor cu produse sau servicii medicale publicate si date business oficiale.",
    exclusion: "Magazine generaliste fara relevanta medicala sau pagini fara companie identificabila.",
    service: "Parteneriat pentru infrastructura, preinstalare, radioprotectie si service.",
  },
  {
    id: "service-aparatura",
    label: "Service aparatura medicala",
    templateGroup: "service-equipment",
    baseRelevance: 22,
    baseProjectPotential: 10,
    basePartnershipPotential: 25,
    queries: ['"service aparatura medicala" Romania contact', '"mentenanta echipamente medicale" {city}', '"service biomedical" {city}'],
    inclusion: "Companie care publica service, mentenanta, reparatii sau verificari pentru aparatura medicala.",
    exclusion: "Service-uri fara relevanta medicala.",
    service: "Parteneriat regional, triere si complementaritate tehnica.",
  },
  {
    id: "radioprotectie-plumbare",
    label: "Firme radioprotectie / plumbare",
    templateGroup: "radioprotection-rx",
    baseRelevance: 27,
    baseProjectPotential: 16,
    basePartnershipPotential: 20,
    queries: ['"radioprotectie" plumbare Romania contact', '"plumbare camera RX" Romania', '"protectie radiologica" firma Romania'],
    inclusion: "Companie care publica servicii de radioprotectie, plumbare sau ecranare.",
    exclusion: "Continuit medical fara oferta comerciala identificabila.",
    service: "Colaborare tehnica pentru radioprotectie si proiecte RX.",
  },
  {
    id: "proiectare-medicala",
    label: "Firme proiectare medicala",
    templateGroup: "distributor-partnership",
    baseRelevance: 23,
    baseProjectPotential: 14,
    basePartnershipPotential: 24,
    queries: ['"proiectare medicala" Romania contact', '"proiectare clinica" Romania', '"arhitectura medicala" Romania contact'],
    inclusion: "Firma ce publica proiectare pentru clinici, spitale sau spatii medicale.",
    exclusion: "Arhitectura rezidentiala fara portofoliu medical public.",
    service: "Parteneriat pentru cerinte medicale speciale si integrare infrastructura.",
  },
  {
    id: "hvac-electric-medical",
    label: "HVAC/electric medical",
    templateGroup: "distributor-partnership",
    baseRelevance: 18,
    baseProjectPotential: 10,
    basePartnershipPotential: 22,
    queries: ['"HVAC medical" Romania contact', '"instalatii electrice clinici" Romania', '"UPS echipamente medicale" Romania'],
    inclusion: "Firma cu experienta publica in spatii medicale, HVAC, electric, UPS sau racire tehnica.",
    exclusion: "Instalatori generalisti fara context medical ori tehnic relevant.",
    service: "Parteneriat HVAC, electric, UPS si racire pentru proiecte medicale.",
  },
  {
    id: "fonduri-europene-medicale",
    label: "Consultanti fonduri europene medicale",
    templateGroup: "funding-modernization",
    baseRelevance: 18,
    baseProjectPotential: 13,
    basePartnershipPotential: 23,
    queries: ['"fonduri europene" clinica medicala consultant', '"consultanta fonduri europene" medical Romania', '"proiect medical" fonduri europene consultant'],
    inclusion: "Consultant care publica proiecte medicale sau finantari pentru clinici si echipamente.",
    exclusion: "Consultanta generala fara relevanta medicala publicata.",
    service: "Brief tehnic, infrastructura si context pentru ofertare.",
  },
  {
    id: "spitale-private",
    label: "Spitale private",
    templateGroup: "clinic-imaging-radiology",
    baseRelevance: 24,
    baseProjectPotential: 20,
    basePartnershipPotential: 3,
    queries: ['"spital privat" {city} radiologie contact', '"spital privat" {city} CT RMN', '"spital privat" imagistica Romania'],
    inclusion: "Spital privat cu imagistica, radiologie, laborator sau modernizare publicata.",
    exclusion: "Unitati fara date business publice ori fara relevanta tehnica.",
    service: "Modernizare infrastructura, service, radioprotectie si planificare echipamente.",
  },
  {
    id: "ortopedie-chirurgie-recuperare",
    label: "Centre ortopedie/chirurgie/recuperare",
    templateGroup: "clinic-imaging-radiology",
    baseRelevance: 14,
    baseProjectPotential: 10,
    basePartnershipPotential: 2,
    queries: ['"clinica ortopedie" radiologie {city}', '"centru recuperare" RX {city}', '"clinica chirurgie" imagistica {city}'],
    inclusion: "Centru care publica imagistica proprie, RX sau proiect de extindere.",
    exclusion: "Clinici fara echipamente ori infrastructura relevanta publicata.",
    service: "Evaluare infrastructura si service pentru echipamente relevante.",
  },
  {
    id: "laboratoare-ivd",
    label: "Laboratoare / IVD",
    templateGroup: "distributor-partnership",
    baseRelevance: 18,
    baseProjectPotential: 15,
    basePartnershipPotential: 10,
    queries: ['"laborator IVD" Romania contact', '"aparatura laborator clinic" distribuitor Romania', '"laborator analize" echipamente Romania'],
    inclusion: "Laborator sau furnizor IVD cu aparatura, consumabile ori service publicate.",
    exclusion: "Continuit educational fara companie identificabila.",
    service: "Planificare laborator, electric/HVAC, integrare si service aparatura.",
  },
];

export const scoringRules = [
  ["Relevance", "Fit de categorie si servicii tehnice publicate", "0-35"],
  ["Contactability", "Website, Source URL, contact page, email business public si telefon public", "0-35"],
  ["Project potential", "RX/CT/RMN, modernizare, achizitie, service ori proiect activ public", "0-30"],
  ["Partnership potential", "Distribuitor, service, proiectare, HVAC/electric ori consultant", "0-30"],
  ["Geographic fit", "Bucuresti/Ilfov/Arges sau oras major", "0-12"],
  ["Priority High", "Total >= 80", "High"],
  ["Priority Medium", "Total 55-79", "Medium"],
  ["Priority Low", "Total < 55", "Low"],
  ["Do not contact", "Blocare absoluta din orice coada", "-100 / exclude"],
];

export const complianceNotes = [
  ["No auto-send", "Sistemul pregateste research si task-uri. Nu trimite email, LinkedIn sau WhatsApp automat."],
  ["Public business data only", "Pastreaza numai date publicate de companie pentru contact business."],
  ["Source-backed", "Fiecare lead verificat trebuie sa aiba Source URL si fieldSources pentru datele cheie."],
  ["No patient data", "Nu colecta date despre pacienti, diagnostice, dosare sau documente clinice."],
  ["Opt-out first", "Un opt-out muta lead-ul in Do Not Contact si il exclude din toate cozile."],
  ["Manual review", "Orice mesaj se verifica si personalizeaza manual inainte de trimitere."],
  ["No aggressive scraping", "Research-ul web ramane manual, proportional si bazat pe pagini publice oficiale."],
  ["Cadence cap", "Maximum doua follow-up-uri relevante dupa primul mesaj manual."],
  ["No legal promises", "Nu promite autorizare CNCAN, conformitate finala sau rezultate garantate."],
];

export function categoryById(categoryId) {
  return categories.find((category) => category.id === categoryId) || categories[0];
}

export function templateForCategory(categoryId) {
  return templateGroups[categoryById(categoryId).templateGroup];
}
