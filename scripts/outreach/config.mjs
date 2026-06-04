export const OUTREACH_STATUSES = [
  "not_reviewed",
  "approved_for_contact",
  "drafted",
  "sent_manual",
  "replied",
  "follow_up_due",
  "not_interested",
  "do_not_contact",
  "won",
  "lost",
];

export const APPROVAL_STATUSES = ["not_reviewed", "approved_for_contact"];

export const SIGNATURE = `Cu respect,
Echipa ZESCORP
office@zescorp.ro
https://zescorp.ro`;

export const OPT_OUT =
  'Daca mesajul nu este relevant, raspundeti cu "nu doresc mesaje ulterioare" si nu vom mai reveni.';

const draft = ({ subject, service, value, cta }) => ({
  subject,
  service,
  value,
  cta,
});

export const OUTREACH_TEMPLATES = {
  rx_authorization: draft({
    subject: "Discutie preliminara pentru camera RX si radioprotectie",
    service: "proiectare camera RX, radioprotectie si clarificarea preliminara a documentatiei",
    value:
      "Putem structura informatiile necesare pentru discutia tehnica: tipul echipamentului, planul camerei, vecinatatile si punctele care necesita validare de specialitate.",
    cta: "Daca aveti o camera RX noua sau o modernizare in evaluare, putem stabili o discutie tehnica scurta.",
  }),
  ct_rmn_infrastructure: draft({
    subject: "Clarificare tehnica pentru infrastructura CT sau RMN",
    service: "planificare infrastructura CT/RMN, preinstalare, electric, HVAC si integrare",
    value:
      "Putem ajuta la ordonarea cerintelor de spatiu si infrastructura inainte de ofertare sau implementare, fara a inlocui validarea tehnica finala.",
    cta: "Daca aveti o extindere, relocare sau achizitie in evaluare, putem porni de la echipament, locatie si termen.",
  }),
  lead_shielding: draft({
    subject: "Evaluare preliminara pentru plumbare si protectie RX",
    service: "plumbare radiologica, usi si vitraje radioprotejate, plus coordonarea camerei RX",
    value:
      "Putem pregati contextul preliminar pentru specialist: plan, echipament, utilizare, vecinatati si elementele constructive care trebuie analizate.",
    cta: "Daca aveti planul camerei sau tipul aparatului, putem incepe cu o evaluare preliminara.",
  }),
  rf_shielding: draft({
    subject: "Discutie tehnica pentru RF shielding si camera RMN",
    service: "RF shielding, coordonarea camerei RMN si verificarea dependentelor de instalare",
    value:
      "Putem clarifica devreme traseul de instalare, spatiul, interfetele HVAC/electrice si punctele care necesita validare tehnica.",
    cta: "Daca aveti un proiect RMN in evaluare, putem incepe cu modelul echipamentului si planul spatiului.",
  }),
  service_maintenance: draft({
    subject: "Discutie punctuala pentru service si mentenanta aparatura medicala",
    service: "triere preliminara, service si mentenanta pentru aparatura medicala compatibila",
    value:
      "Putem porni de la echipament, producator, model, simptom si oras pentru a vedea daca este necesara o discutie tehnica.",
    cta: "Daca aveti un caz activ sau doriti sa discutam o nevoie recurenta de mentenanta, ne puteti transmite contextul pe scurt.",
  }),
  cbct_dental: draft({
    subject: "Clarificare preliminara pentru CBCT sau RX dentar",
    service: "evaluare preliminara CBCT/RX dentar, layout si radioprotectie",
    value:
      "Putem ajuta la structurarea datelor utile pentru spatiu, echipament si radioprotectie inaintea unei discutii de specialitate.",
    cta: "Daca aveti o instalare sau modernizare in evaluare, putem porni de la plan si tipul echipamentului.",
  }),
  medical_fitout: draft({
    subject: "Discutie tehnica pentru amenajare si infrastructura medicala",
    service: "amenajare medicala, coordonare de infrastructura si integrarea echipamentelor",
    value:
      "Putem transforma cerintele initiale intr-un brief tehnic clar pentru ofertare, etapizare si coordonare cu specialistii proiectului.",
    cta: "Daca aveti un spatiu nou, o modernizare sau un proiect finantat in evaluare, putem discuta contextul preliminar.",
  }),
};

export const OUTREACH_COMPLIANCE = [
  ["No auto-send", "Nu exista cod SMTP, Gmail API sau trimitere automata. Fiecare mesaj se trimite manual."],
  ["Human approval", "Un draft nu intra in Manual Send Queue pana cand lead-ul nu este aprobat explicit."],
  ["Public business contacts", "Drafturile folosesc numai email business public si surse oficiale."],
  ["Duplicate domains", "Un singur lead per domeniu intra intr-o coada de lucru."],
  ["Already contacted", "Lead-urile contactate sunt excluse pana cand statusul devine follow_up_due."],
  ["Do Not Contact", "Opt-out-ul exclude lead-ul din drafturi, cozi si follow-up-uri."],
  ["No invented facts", "Personalizarea foloseste compania, orasul si categoria verificate; nu inventeaza persoane sau proiecte active."],
  ["Soft cadence", "Maximum doua follow-up-uri relevante dupa primul mesaj manual."],
];

