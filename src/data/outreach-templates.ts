export type OutreachTemplate = {
  slug: string;
  title: string;
  audience: string;
  purpose: string;
  body: string;
  followUp?: string;
};

export const outreachTemplates: OutreachTemplate[] = [
  {
    slug: "linkedin-connection",
    title: "First LinkedIn connection",
    audience: "Clinics, imaging centers, consultants",
    purpose: "Short, respectful connection request.",
    body:
      "Bună, [Name]. Lucrez la ZES MEDCORP pe proiecte de infrastructură medicală, imagistică și planificare tehnică. Aș fi bucuros să ne conectăm și să schimbăm câteva resurse utile.",
    followUp:
      "Dacă este relevant, pot trimite și un ghid sau un calculator care se potrivește cu tipul vostru de proiect.",
  },
  {
    slug: "first-outreach",
    title: "First outreach message",
    audience: "Warm prospects",
    purpose: "Open a conversation with technical context.",
    body:
      "Bună, [Name]. Am văzut că lucrați la [project type]. Avem câteva resurse utile despre planificare, room readiness și pașii tehnici care pot ajuta înainte de ofertă. Dacă vreți, pot trimite exact pagina cea mai relevantă.",
    followUp:
      "Dacă proiectul e într-un stadiu mai clar, putem continua și cu Project Intake.",
  },
  {
    slug: "follow-up",
    title: "Follow-up message",
    audience: "Prospects who have not replied",
    purpose: "Polite reminder without pressure.",
    body:
      "Bună, [Name]. Revin scurt în caz că tema rămâne relevantă. Dacă proiectul se mișcă înainte, vă pot trimite un calculator sau un ghid care clarifică următorul pas.",
    followUp:
      "Pot ajusta mesajul dacă aveți deja o cameră, un echipament sau un calendar estimativ.",
  },
  {
    slug: "proposal-builder-intro",
    title: "Proposal Builder introduction",
    audience: "Projects close to decision",
    purpose: "Introduce preliminary proposal structure.",
    body:
      "Dacă proiectul este deja conturat, Proposal Builder poate organiza ipotezele, riscurile, serviciile și pașii următori înainte de discuția finală.",
    followUp:
      "Nu este ofertă finală, ci o structură preliminară care ajută conversația tehnică.",
  },
  {
    slug: "project-intake-intro",
    title: "Project Intake introduction",
    audience: "Early-stage projects",
    purpose: "Collect structured project data.",
    body:
      "Dacă proiectul este încă în faza de orientare, Project Intake poate colecta informațiile esențiale despre tipul proiectului, spațiu, documente și urgență.",
    followUp:
      "Cu cât datele sunt mai clare, cu atât analiza tehnică devine mai utilă.",
  },
  {
    slug: "calculator-recommendation",
    title: "Calculator recommendation",
    audience: "Prospects who need a directional estimate",
    purpose: "Route people to the right calculator.",
    body:
      "Dacă vreți o estimare orientativă înainte de o discuție comercială, pot recomanda calculatorul care se potrivește cel mai bine cu proiectul vostru. Este util pentru orientare, nu ca ofertă finală.",
    followUp:
      "Pot trimite și pagina de comparație sau ghidul care explică diferențele tehnice relevante.",
  },
];
