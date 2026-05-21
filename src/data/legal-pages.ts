import { companyContact } from "@/lib/brand";

export type LegalPageSlug =
  | "privacy-policy"
  | "terms"
  | "cookie-policy"
  | "gdpr"
  | "disclaimer";

export type LegalSection = {
  title: string;
  body: string[];
};

export type LegalPage = {
  slug: LegalPageSlug;
  title: string;
  description: string;
  eyebrow: string;
  updatedAt: string;
  sections: LegalSection[];
};

const companyLine = `${companyContact.legalName}, CUI ${companyContact.cui}, Nr. Reg. Com. ${companyContact.tradeRegister}, cu sediul in ${companyContact.address.full}.`;
const contactLine = `Pentru solicitari legate de date personale, documente, formulare sau utilizarea platformei, ne puteti contacta la ${companyContact.email} sau la ${companyContact.phone}.`;

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Politica de confidențialitate",
    description:
      "Informații despre modul în care ZES MEDCORP colectează și utilizează datele transmise prin formulare, instrumente digitale și solicitări de consultanță.",
    eyebrow: "Confidențialitate",
    updatedAt: "2026-05-21",
    sections: [
      {
        title: "Operatorul datelor",
        body: [
          companyLine,
          "Această politică explică modul în care tratăm informațiile furnizate prin website, formulare de contact, instrumente de planificare, calculatoare orientative, Proposal Builder, Project Intake și solicitări de service.",
          contactLine,
        ],
      },
      {
        title: "Ce date putem colecta",
        body: [
          "Putem colecta nume, companie, adresă de email, număr de telefon, tip de proiect, urgență, mesajul transmis și informații tehnice despre proiect, spațiu, aparatură, radiologie, IVD, service sau documentație.",
          "Nu solicităm și nu trebuie să introduceți date medicale despre pacienți, diagnostice, informații clinice sensibile sau documente care nu sunt necesare pentru trierea tehnică inițială.",
        ],
      },
      {
        title: "Scopul utilizării",
        body: [
          "Datele sunt folosite pentru a răspunde solicitărilor, pentru triere tehnică, pentru pregătirea unei discuții de consultanță, pentru estimări preliminare și pentru organizarea pașilor următori ai proiectului.",
          "Instrumentele digitale de pe platformă oferă orientare preliminară. Ele nu înlocuiesc validarea tehnică, proiectarea, verificarea documentației, calculul specializat sau autorizările aplicabile.",
        ],
      },
      {
        title: "Temeiuri și durată",
        body: [
          "Prelucrarea se poate baza pe solicitarea dumneavoastră, interesul legitim de a răspunde unei cereri comerciale sau tehnice și, unde este cazul, pe obligații legale.",
          "Datele sunt păstrate doar atât cât este necesar pentru analiza solicitării, comunicarea comercială rezonabilă, obligații legale sau apărarea unor drepturi. La activarea unor integrări reale, perioadele concrete de păstrare vor fi documentate în procedurile interne.",
        ],
      },
      {
        title: "Destinatari și servicii viitoare",
        body: [
          "În prezent, platforma este pregătită pentru integrări, dar nu activează implicit trimiterea reală de email, CRM, baze de date sau Google Sheets fără configurare explicită de mediu.",
          "În viitor, datele pot fi procesate prin furnizori tehnici precum servicii de email, găzduire, analytics, CRM sau instrumente de evidență a leadurilor, cu măsuri adecvate de securitate și confidențialitate.",
        ],
      },
      {
        title: "Drepturile persoanelor vizate",
        body: [
          "Aveți dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate, în condițiile legislației aplicabile.",
          "Pentru exercitarea drepturilor, transmiteți o cerere la datele de contact de mai sus. Este posibil să solicităm informații suplimentare pentru verificarea identității și a contextului solicitării.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Termeni și condiții",
    description:
      "Reguli de utilizare pentru website-ul ZES MEDCORP, instrumentele de planificare și comunicarea preliminară generată pe platformă.",
    eyebrow: "Termeni platformă",
    updatedAt: "2026-05-21",
    sections: [
      {
        title: "Identificare",
        body: [
          companyLine,
          "Prin utilizarea website-ului și a instrumentelor digitale ZES MEDCORP, acceptați acești termeni în măsura permisă de lege. Dacă nu sunteți de acord, vă rugăm să nu utilizați platforma pentru trimiterea de solicitări.",
        ],
      },
      {
        title: "Rolul platformei",
        body: [
          "Platforma prezintă servicii, ghiduri, calculatoare orientative, instrumente de triere și formulare de contact pentru proiecte de infrastructură medicală, radiologie, RF shielding, protecție radiologică, aparatură, IVD și service.",
          "Informațiile publicate au caracter informativ și comercial. Nu reprezintă proiect tehnic final, aviz, autorizare, consultanță juridică sau ofertă comercială definitivă.",
        ],
      },
      {
        title: "Instrumente și estimări",
        body: [
          "Calculatorul de proiect, Proposal Builder, Project Intake, Radiology Room Planner și alte instrumente sunt deterministe și oferă o orientare pe baza datelor introduse.",
          "Estimările de buget, timeline, risc, complexitate sau servicii recomandate sunt preliminare și necesită validare cu planuri, dimensiuni, specificații de echipament, condiții de amplasament și cerințe de autorizare.",
        ],
      },
      {
        title: "Responsabilitatea utilizatorului",
        body: [
          "Utilizatorul este responsabil să furnizeze informații corecte, relevante și nesensibile. Nu introduceți date medicale despre pacienți sau informații confidențiale care nu sunt necesare pentru analiza tehnică inițială.",
          "Deciziile de achiziție, execuție, autorizare sau operare nu trebuie luate exclusiv pe baza conținutului generat de platformă.",
        ],
      },
      {
        title: "Comunicare și consultanță",
        body: [
          "Trimiterea unui formular nu garantează acceptarea proiectului, disponibilitatea imediată, un anumit cost, un anumit termen sau o soluție finală.",
          "ZES poate solicita informații suplimentare înainte de a formula o recomandare aplicată sau o propunere comercială.",
        ],
      },
      {
        title: "Modificări",
        body: [
          "Putem actualiza acești termeni pentru a reflecta evoluția platformei, a serviciilor, a integrărilor tehnice sau a obligațiilor legale.",
          "Versiunea publicată pe website este versiunea aplicabilă la momentul accesării.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Politica de cookies",
    description:
      "Explicații despre cookie-uri, analytics și tehnologii similare utilizate sau pregătite pentru website-ul ZES MEDCORP.",
    eyebrow: "Cookies",
    updatedAt: "2026-05-21",
    sections: [
      {
        title: "Ce sunt cookie-urile",
        body: [
          "Cookie-urile sunt fișiere mici sau tehnologii similare folosite de website-uri pentru funcționare, preferințe, securitate, măsurare sau analiză.",
          "Platforma ZES MEDCORP este construită pentru a permite activarea ulterioară a instrumentelor de analytics, fără a transmite date personale în evenimentele de tracking.",
        ],
      },
      {
        title: "Categorii posibile",
        body: [
          "Cookie-uri necesare: pot fi folosite pentru funcționarea website-ului, navigare, securitate și formulare.",
          "Cookie-uri de analiză: pot fi activate în viitor prin Google Analytics sau Google Tag Manager, doar cu identificatori configurați explicit. Evenimentele sunt concepute să evite nume, emailuri, telefoane, companii și mesaje libere.",
          "Cookie-uri de marketing: nu sunt active implicit și nu trebuie activate fără o revizuire separată a consimțământului și confidențialității.",
        ],
      },
      {
        title: "Analytics",
        body: [
          "Platforma include o arhitectură de tracking pregătită pentru evenimente precum click pe CTA, finalizare instrument, trimitere formular sau export PDF.",
          "Aceste evenimente trebuie să rămână non-PII: categorie de proiect, sursă, risc, complexitate sau destinație, fără date personale sau conținut liber transmis de utilizator.",
        ],
      },
      {
        title: "Controlul cookie-urilor",
        body: [
          "Puteți controla cookie-urile din setările browserului. Blocarea unor cookie-uri poate afecta funcționalitatea anumitor pagini sau măsurarea performanței.",
          "Dacă va fi activat un sistem complex de consimțământ, acesta va fi documentat și integrat înainte de utilizarea cookie-urilor care necesită acord explicit.",
        ],
      },
      {
        title: "Contact",
        body: [contactLine],
      },
    ],
  },
  {
    slug: "gdpr",
    title: "GDPR și drepturile privind datele personale",
    description:
      "Informații despre drepturile GDPR, solicitări de acces/ștergere și modul în care ZES MEDCORP tratează datele trimise prin platformă.",
    eyebrow: "GDPR",
    updatedAt: "2026-05-21",
    sections: [
      {
        title: "Context",
        body: [
          companyLine,
          "Această pagină explică, într-un limbaj practic, cum puteți solicita informații despre datele personale transmise către ZES prin formulare, email, telefon sau instrumentele digitale ale platformei.",
        ],
      },
      {
        title: "Drepturi",
        body: [
          "În condițiile Regulamentului (UE) 2016/679, puteți solicita acces, rectificare, ștergere, restricționare, portabilitate sau opoziție la prelucrare.",
          "Dacă prelucrarea se bazează pe consimțământ, puteți retrage consimțământul pentru viitor. Retragerea nu afectează prelucrările realizate anterior în mod legal.",
        ],
      },
      {
        title: "Cum trimiteți o cerere",
        body: [
          `Trimiteți solicitarea la ${companyContact.email}, cu suficiente detalii pentru identificarea contextului: formular utilizat, data aproximativă, adresa de email folosită și tipul solicitării.`,
          "Nu trimiteți documente medicale, date despre pacienți sau informații sensibile care nu sunt necesare pentru verificarea cererii.",
        ],
      },
      {
        title: "Verificare și răspuns",
        body: [
          "Pentru protecția datelor, putem solicita clarificări înainte de a răspunde unei cereri. Răspunsul va fi transmis într-un termen rezonabil, conform legislației aplicabile.",
          "Dacă solicitarea este complexă sau include mai multe sisteme viitoare de lead management, perioada de analiză poate necesita clarificări suplimentare.",
        ],
      },
      {
        title: "Siguranță operațională",
        body: [
          "Înainte de activarea stocării reale, CRM-ului sau a integrărilor externe, platforma trebuie să păstreze arhitectura mock-safe documentată și să evite expunerea datelor personale în analytics.",
          "Admin-ul intern nu trebuie folosit cu date reale până când nu există autentificare, control de acces și proceduri de securitate adecvate.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer tehnic și comercial",
    description:
      "Clarificări privind caracterul orientativ al ghidurilor, calculatoarelor, instrumentelor de planificare și propunerilor PDF generate de platformă.",
    eyebrow: "Disclaimer",
    updatedAt: "2026-05-21",
    sections: [
      {
        title: "Caracter informativ",
        body: [
          "Conținutul de pe website, inclusiv ghidurile, articolele, calculatoarele, instrumentele de planificare și Proposal Builder, are caracter informativ, orientativ și preliminar.",
          "Platforma nu emite avize, autorizații, proiecte tehnice finale, expertize de radioprotecție, aprobări CNCAN/DSP sau garanții de conformitate.",
        ],
      },
      {
        title: "Estimări orientative",
        body: [
          "Bugetele, timeline-urile, nivelurile de risc, nivelurile de complexitate și recomandările de servicii sunt generate pe baza unor reguli deterministe și a informațiilor introduse.",
          "Orice estimare necesită validare prin documentație, planuri, măsurători, specificații de echipament, condiții de amplasament, furnizori, autorizări și discuții tehnice aplicate.",
        ],
      },
      {
        title: "PDF-uri și propuneri preliminare",
        body: [
          "PDF-urile generate de Proposal Builder sunt documente de lucru pentru discuții tehnice. Ele nu reprezintă ofertă comercială finală, aprobare de proiectare, aviz legal, autorizație sau garanție de implementare.",
          "Versiunile PDF generate local nu sunt salvate permanent de platformă în această etapă.",
        ],
      },
      {
        title: "Radiologie, RF și protecție radiologică",
        body: [
          "RF shielding-ul pentru RMN/MRI și protecția radiologică pe bază de plumb pentru CT/RX/fluoroscopie sunt domenii diferite și trebuie tratate separat.",
          "CNCAN se referă la zona radiațiilor ionizante și a activităților radiologice unde este aplicabil, nu la RF shielding în sine.",
        ],
      },
      {
        title: "Decizii finale",
        body: [
          "Nu luați decizii finale de achiziție, execuție, autorizare sau operare exclusiv pe baza conținutului generat de platformă.",
          "Pentru proiecte reale, solicitați analiză tehnică, documentație, verificări de specialitate și confirmări din partea autorităților sau specialiștilor relevanți, după caz.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: LegalPageSlug) {
  return legalPages.find((page) => page.slug === slug);
}
