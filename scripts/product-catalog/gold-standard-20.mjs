import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");

const relatedServicesByCategory = {
  laboratory: [
    "/solutii-medicale/echipamente-laborator-ivd",
    "/service-laborator-ivd",
    "/contracte-mentenanta/mentenanta-laborator-ivd",
  ],
  emergency: [
    "/service-aparatura-medicala",
    "/contracte-mentenanta/interventii-suport-tehnic",
    "/solutii-medicale/echipamente-imagistica-diagnostic",
  ],
  "medical-furniture": [
    "/solutii-medicale/dezvoltare-unitati-medicale",
    "/services/amenajari-medicale",
    "/contracte-mentenanta",
  ],
  monitoring: [
    "/solutii-medicale/echipamente-imagistica-diagnostic",
    "/service-aparatura-medicala",
    "/contracte-mentenanta/contracte-service-multimarca",
  ],
  sterilization: [
    "/service-aparatura-medicala",
    "/contracte-mentenanta/interventii-suport-tehnic",
    "/solutii-medicale/dezvoltare-unitati-medicale",
  ],
};

const goldProducts = [
  {
    code: "24035",
    category: "laboratory",
    title: "Centrifugă de laborator XC-2000",
    slug: "centrifuga-de-laborator-xc-2000-24035",
    summary: "Centrifugă compactă pentru laboratoare clinice și cabinete care au nevoie de separarea rapidă a probelor uzuale.",
    description:
      "XC-2000 este o centrifugă de laborator potrivită pentru fluxuri de probe de rutină, unde contează ocuparea redusă a spațiului, operarea simplă și integrarea într-un laborator clinic sau cabinet cu volum moderat. Pentru ofertare, ZESCORP verifică aplicația, tipurile de tuburi utilizate, volumul estimat de probe și documentația tehnică necesară.",
    applications: ["Laboratoare clinice cu volum moderat de probe", "Cabinete medicale cu recoltare și procesare primară", "Separare probe pentru analize uzuale"],
    benefits: ["Format compact pentru banc de lucru", "Potrivită pentru cereri de ofertă cu instalare și suport tehnic", "Documentație locală disponibilă pentru verificare înainte de achiziție"],
    features: ["Centrifugă de laborator pentru probe uzuale", "Configurare verificată în funcție de tuburi și fluxul de lucru", "Integrare în pachete de dotare laborator / IVD"],
    specs: [
      ["Cod produs", "24035"],
      ["Model", "XC-2000"],
      ["Alimentare", "220 V, 50 Hz"],
      ["Putere", "80 W"],
      ["Dimensiuni", "320 x 290 x H 320 mm"],
      ["Greutate", "6 kg"],
    ],
    related: ["23994", "24046", "23580", "24128"],
  },
  {
    code: "23994",
    category: "laboratory",
    title: "Analizor hemoglobină și hematocrit Hemo Control",
    slug: "analizor-hemoglobina-si-hematocrit-hemo-control-23994",
    summary: "Sistem compact pentru determinări rapide de hemoglobină și hematocrit în cabinete, laboratoare și puncte de testare.",
    description:
      "Hemo Control este un analizor destinat determinărilor rapide pentru hemoglobină și hematocrit, util în fluxuri clinice unde rezultatul trebuie obținut rapid și documentat corect. Pagina este pregătită pentru cereri comerciale ZESCORP, cu verificarea consumabilelor compatibile, a documentației și a necesarului de service înainte de ofertare.",
    applications: ["Laboratoare clinice și cabinete cu testări rapide", "Puncte de recoltare și evaluare preliminară", "Fluxuri de screening unde sunt necesare rezultate rapide"],
    benefits: ["Format potrivit pentru utilizare la punctul de lucru", "Poate fi ofertat împreună cu consumabile compatibile", "Include documentație locală pentru consultare tehnică"],
    features: ["Analizor pentru hemoglobină și hematocrit", "Utilizare clinică pentru rezultate rapide", "Potrivit pentru ofertare cu consumabile și suport tehnic"],
    specs: [
      ["Cod produs", "23994"],
      ["Tip produs", "Analizor hemoglobină / hematocrit"],
      ["Domeniu", "Laborator / IVD"],
      ["Documentație", "Manual în limba engleză și fișă tehnică disponibile local"],
    ],
    related: ["24035", "24046", "23932", "23580"],
  },
  {
    code: "24046",
    category: "laboratory",
    title: "Analizor de urină cu Bluetooth",
    slug: "analizor-de-urina-cu-bluetooth-24046",
    summary: "Analizor compact de urină pentru cabinete și laboratoare care urmăresc digitalizarea fluxului de testare.",
    description:
      "Analizorul de urină cu Bluetooth este potrivit pentru cabinete, laboratoare și puncte de testare care doresc o soluție compactă pentru citirea benzilor de urină și gestionarea mai ordonată a rezultatelor. ZESCORP poate pregăti oferta împreună cu consumabilele compatibile, documentația tehnică și opțiunile de service.",
    applications: ["Cabinete medicale cu testări rapide de urină", "Laboratoare mici și medii", "Programe de screening și monitorizare clinică"],
    benefits: ["Conectivitate Bluetooth menționată în sursa produsului", "Format compact pentru utilizare la punctul de lucru", "Poate fi inclus în pachete de dotare laborator / IVD"],
    features: ["Analizor de urină cu conectivitate Bluetooth", "Utilizare împreună cu benzi compatibile", "Ofertare cu documentație și suport tehnic"],
    specs: [
      ["Cod produs", "24046"],
      ["Tip produs", "Analizor de urină"],
      ["Conectivitate", "Bluetooth"],
      ["Domeniu", "Laborator / IVD"],
    ],
    related: ["23994", "24035", "23932", "24128"],
  },
  {
    code: "23580",
    category: "laboratory",
    title: "Câmp chirurgical steril netesut 50 x 50 cm",
    slug: "camp-chirurgical-steril-netesut-dublu-strat-50-x-50-cm-23580",
    summary: "Câmp steril netesut pentru proceduri medicale, disponibil pentru ofertare pe cantitate și necesar recurent.",
    description:
      "Câmpul chirurgical steril netesut 50 x 50 cm este un produs consumabil pentru protecția zonei de lucru în proceduri medicale. Pentru achiziții recurente sau dotări inițiale, ZESCORP poate verifica ambalarea, cantitatea pe cutie, documentația disponibilă și integrarea în necesarul operațional al clinicii.",
    applications: ["Proceduri medicale și activități de cabinet", "Dotări recurente pentru clinici și cabinete", "Fluxuri în care este necesară protecție sterilă a suprafeței de lucru"],
    benefits: ["Potrivit pentru achiziții pe cantitate", "Documentație locală disponibilă pentru verificare", "Se poate oferta împreună cu alte consumabile medicale"],
    features: ["Câmp steril netesut", "Dimensiune 50 x 50 cm", "Ambalare pentru utilizare profesională"],
    specs: [
      ["Cod produs", "23580"],
      ["Tip produs", "Câmp chirurgical steril"],
      ["Dimensiune", "50 x 50 cm"],
      ["Ambalare", "Cutie cu 350 bucăți"],
    ],
    related: ["23581", "23582", "23583", "23584"],
  },
  {
    code: "25748",
    category: "emergency",
    title: "Garou rapid albastru",
    slug: "garou-rapid-albastru-25748",
    summary: "Garou rapid pentru truse de urgență, cabinete și zone clinice unde timpul de aplicare contează.",
    description:
      "Garoul rapid albastru este un accesoriu pentru activități de urgență, recoltare sau intervenție, unde aplicarea simplă și identificarea rapidă sunt importante. ZESCORP îl poate oferta individual sau în pachete de dotare pentru cabinete, camere de tratament, truse mobile și puncte de prim ajutor.",
    applications: ["Truse de urgență și prim ajutor", "Cabinete medicale și camere de tratament", "Puncte de recoltare și intervenții rapide"],
    benefits: ["Produs ușor de inclus în pachete de consumabile", "Potrivit pentru necesar operațional recurent", "Documentație disponibilă local pentru verificare"],
    features: ["Garou rapid", "Culoare albastră", "Accesoriu pentru truse medicale și intervenții"],
    specs: [
      ["Cod produs", "25748"],
      ["Tip produs", "Garou rapid"],
      ["Culoare", "Albastru"],
      ["Domeniu", "Urgență / consumabile medicale"],
    ],
    related: ["45720", "34068", "34069", "43202"],
  },
  {
    code: "45720",
    category: "emergency",
    title: "Cărucior de urgență Neo Plus",
    slug: "carucior-de-urgenta-neo-plus-45720",
    summary: "Cărucior profesional pentru organizarea materialelor și accesoriilor în zone de urgență sau intervenție.",
    description:
      "Căruciorul de urgență Neo Plus este destinat organizării eficiente a materialelor în spații clinice cu cerințe ridicate de acces rapid. Pentru ofertare, ZESCORP verifică dimensiunile, configurația sertarelor, accesoriile necesare și integrarea în fluxul de intervenție al unității medicale.",
    applications: ["Camere de urgență și zone de intervenție", "Clinici cu puncte de prim ajutor", "Spații în care materialele trebuie organizate și accesate rapid"],
    benefits: ["Dimensiuni potrivite pentru organizare verticală", "Poate fi ofertat împreună cu accesorii și consumabile", "Include documentație locală disponibilă pentru consultare"],
    features: ["Cărucior profesional de urgență", "Structură pentru organizarea materialelor medicale", "Potrivit pentru integrare în fluxuri clinice critice"],
    specs: [
      ["Cod produs", "45720"],
      ["Model", "Neo Plus"],
      ["Tip produs", "Cărucior de urgență"],
      ["Dimensiuni", "930 x 600 x H 1980 mm"],
    ],
    related: ["25748", "34068", "34069", "43430"],
  },
  {
    code: "34068",
    category: "emergency",
    title: "Targă pliabilă pentru scări",
    slug: "targa-pliabila-pentru-scari-34068",
    summary: "Targă pentru evacuare și transport pe scări, cu format adaptat intervențiilor în spații dificile.",
    description:
      "Targa pliabilă pentru scări este destinată transportului pacienților în situații în care accesul pe coridoare, scări sau spații înguste trebuie gestionat controlat. ZESCORP poate verifica necesarul de intervenție, accesoriile și documentația înainte de ofertare.",
    applications: ["Evacuare și transport pacient în clădiri cu scări", "Dotare pentru echipe de intervenție", "Clinici, centre medicale și unități cu trasee dificile de acces"],
    benefits: ["Format pliabil pentru depozitare mai eficientă", "Documentație locală disponibilă pentru consultare", "Poate fi inclusă în pachete de dotare pentru urgență"],
    features: ["Targă pentru scări", "Format pliabil", "Utilizare pentru transport și evacuare pacient"],
    specs: [
      ["Cod produs", "34068"],
      ["Tip produs", "Targă pentru scări"],
      ["Dimensiuni", "131 x 50 x 155 cm"],
      ["Documentație", "Manual în limba engleză și fișă tehnică disponibile local"],
    ],
    related: ["34069", "45720", "25748", "43202"],
  },
  {
    code: "34069",
    category: "emergency",
    title: "Targă electrică pentru scări",
    slug: "targa-electrica-pentru-scari-34069",
    summary: "Targă electrică pentru transport pe scări, potrivită pentru unități cu cerințe de evacuare și mobilizare asistată.",
    description:
      "Targa electrică pentru scări este o soluție de transport asistat pentru situații în care mobilizarea pacientului pe trasee cu scări trebuie făcută controlat. Pentru ofertare, ZESCORP verifică scenariul de utilizare, spațiul de acces, documentația și opțiunile de service.",
    applications: ["Transport asistat pe scări", "Dotare pentru echipe de intervenție și ambulanță internă", "Unități medicale cu trasee de evacuare complexe"],
    benefits: ["Asistare electrică pentru utilizare pe scări", "Documentație locală disponibilă pentru consultare", "Poate fi inclusă într-un plan de dotare pentru urgență"],
    features: ["Targă electrică pentru scări", "Format pentru mobilizare pacient", "Suport ZESCORP pentru ofertare și service"],
    specs: [
      ["Cod produs", "34069"],
      ["Tip produs", "Targă electrică pentru scări"],
      ["Dimensiuni", "123 x 50 x 160 cm"],
      ["Documentație", "Manual în limba engleză și fișă tehnică disponibile local"],
    ],
    related: ["34068", "45720", "43430", "43202"],
  },
  {
    code: "27487",
    category: "medical-furniture",
    title: "Masă peste pat Elite",
    slug: "masa-peste-pat-elite-27487",
    summary: "Masă mobilă peste pat pentru saloane, zone de îngrijire și spații de recuperare.",
    description:
      "Masa peste pat Elite este o piesă de mobilier medical pentru zone de îngrijire, recuperare sau spitalizare, unde pacientul are nevoie de o suprafață stabilă și ușor accesibilă. ZESCORP poate include produsul în pachete de mobilier medical, dotări de salon sau proiecte de amenajare.",
    applications: ["Saloane și camere de îngrijire", "Centre de recuperare și îngrijire pacient", "Dotări pentru mobilier medical funcțional"],
    benefits: ["Mobilier util pentru confort și operare zilnică", "Poate fi ofertat împreună cu alte elemente de salon", "Documentație locală disponibilă pentru consultare"],
    features: ["Masă peste pat", "Utilizare în spații de îngrijire pacient", "Produs compatibil cu proiecte de amenajare medicală"],
    specs: [
      ["Cod produs", "27487"],
      ["Model", "Elite"],
      ["Tip produs", "Masă peste pat"],
      ["Domeniu", "Mobilier medical"],
    ],
    related: ["43430", "43202", "27552", "45720"],
  },
  {
    code: "27552",
    category: "medical-furniture",
    title: "Scaun ORL Otopex cu tetieră verde Toronto",
    slug: "scaun-orl-otopex-cu-tetiera-verde-toronto-27552",
    summary: "Scaun ORL pentru cabinet specializat, cu tetieră și tapițerie verde Toronto.",
    description:
      "Scaunul ORL Otopex este destinat cabinetelor ORL care au nevoie de poziționare stabilă a pacientului în timpul consultațiilor și procedurilor specifice. Pentru ofertare, ZESCORP verifică finisajul, compatibilitatea cu mobilierul cabinetului și eventualele cerințe de instalare.",
    applications: ["Cabinete ORL", "Clinici cu flux de consultații specializate", "Amenajări de cabinete medicale cu mobilier dedicat"],
    benefits: ["Design specializat pentru activitate ORL", "Tetieră pentru poziționarea pacientului", "Fișă tehnică disponibilă local pentru consultare"],
    features: ["Scaun ORL Otopex", "Tetieră inclusă", "Variantă verde Toronto"],
    specs: [
      ["Cod produs", "27552"],
      ["Model", "Otopex"],
      ["Tip produs", "Scaun ORL"],
      ["Culoare", "Verde Toronto"],
    ],
    related: ["27487", "43430", "43202", "45720"],
  },
  {
    code: "43430",
    category: "medical-furniture",
    title: "Scaun hidraulic pentru transfer pacient",
    slug: "scaun-hidraulic-pentru-transfer-pacient-43430",
    summary: "Scaun de transfer pacient cu acționare hidraulică, potrivit pentru mobilizare controlată în spații medicale.",
    description:
      "Scaunul hidraulic pentru transfer pacient este destinat unităților medicale care au nevoie de mobilizare mai sigură și mai controlată între zonele de îngrijire, examinare sau tratament. ZESCORP poate evalua utilizarea, spațiul de acces, greutatea suportată și cerințele de service înainte de ofertare.",
    applications: ["Transfer pacient între saloane, cabinete și zone de tratament", "Centre de recuperare și îngrijire", "Unități medicale cu nevoie de mobilizare asistată"],
    benefits: ["Acționare hidraulică pentru transfer controlat", "Documentație locală disponibilă pentru consultare", "Poate fi inclus în pachete de mobilier și suport pacient"],
    features: ["Scaun pentru transfer pacient", "Acționare hidraulică", "Roti frontale pivotante cu frână menționate în datele existente"],
    specs: [
      ["Cod produs", "43430"],
      ["Tip produs", "Scaun transfer pacient"],
      ["Dimensiuni", "470 x 545 mm"],
      ["Greutate produs", "42 kg"],
      ["Capacitate maximă", "125 kg"],
    ],
    related: ["43202", "27487", "27552", "34069"],
  },
  {
    code: "43202",
    category: "medical-furniture",
    title: "Scaun cu rotile pliabil cu funcție toaletă",
    slug: "scaun-cu-rotile-pliabil-cu-functie-toaleta-43202",
    summary: "Scaun mobil pliabil cu funcție toaletă pentru îngrijire pacient și suport operațional în unități medicale.",
    description:
      "Scaunul cu rotile pliabil cu funcție toaletă este util în spații de îngrijire, recuperare și asistență unde mobilitatea pacientului trebuie gestionată practic. Pentru ofertare, ZESCORP verifică dimensiunile, accesoriile, condițiile de utilizare și documentația disponibilă.",
    applications: ["Îngrijire pacient în clinici și centre de recuperare", "Mobilizare pacient în spații cu acces limitat", "Dotări pentru saloane și zone de suport pacient"],
    benefits: ["Funcție de scaun rulant și suport pentru toaletă", "Format pliabil pentru depozitare și transport", "Documentație locală disponibilă pentru consultare"],
    features: ["Scaun pliabil cu funcție toaletă", "Utilizare pentru îngrijire pacient", "Potrivit pentru dotări medicale operaționale"],
    specs: [
      ["Cod produs", "43202"],
      ["Tip produs", "Scaun rulant cu funcție toaletă"],
      ["Domeniu", "Mobilier medical / îngrijire pacient"],
      ["Documentație", "Manual în limba engleză și fișă tehnică disponibile local"],
    ],
    related: ["43430", "27487", "34068", "34069"],
  },
  {
    code: "24128",
    category: "monitoring",
    title: "Monitor multiparametric pentru 6 parametri",
    slug: "monitor-multiparametric-pentru-6-parametri-24128",
    summary: "Monitor multiparametric pentru supravegherea parametrilor vitali în spații clinice și zone de observație.",
    description:
      "Monitorul multiparametric pentru 6 parametri este destinat spațiilor clinice unde este necesară urmărirea parametrilor vitali ai pacientului. ZESCORP poate verifica configurația, accesoriile, documentația și opțiunile de service înainte de ofertare, fără a substitui validarea clinică sau protocolul intern al unității.",
    applications: ["Zone de observație și tratament", "Cabinete și clinici cu monitorizare pacient", "Dotări pentru pachete de echipamente medicale"],
    benefits: ["Monitorizare multiparametrică într-un format clinic dedicat", "Documentație locală completă disponibilă pentru consultare", "Poate fi inclus în contracte de service și mentenanță"],
    features: ["Monitor pentru 6 parametri", "Utilizare în spații clinice", "Ofertare cu accesorii și suport service"],
    specs: [
      ["Cod produs", "24128"],
      ["Tip produs", "Monitor multiparametric"],
      ["Număr parametri", "6"],
      ["Documentație", "Manual în limba engleză, certificat CE și fișă tehnică disponibile local"],
    ],
    related: ["32773", "33245", "33246", "28065"],
  },
  {
    code: "32773",
    category: "monitoring",
    title: "Tensiometru de încheietură Jolly",
    slug: "tensiometru-de-incheietura-jolly-32773",
    summary: "Tensiometru compact pentru măsurarea tensiunii arteriale la încheietură, potrivit pentru utilizare în cabinete și monitorizare rapidă.",
    description:
      "Tensiometrul de încheietură Jolly este o soluție compactă pentru măsurători rapide ale tensiunii arteriale. Pentru achiziții profesionale, ZESCORP verifică aplicația, accesoriile și necesarul de calibrare sau mentenanță în funcție de modul de utilizare.",
    applications: ["Cabinete medicale și puncte de evaluare rapidă", "Monitorizare tensiune arterială în fluxuri de triaj", "Dotări pentru pachete de echipamente de bază"],
    benefits: ["Format compact și ușor de utilizat", "Potrivit pentru achiziții pe cantitate", "Se poate oferta împreună cu alte echipamente de monitorizare"],
    features: ["Tensiometru de încheietură", "Utilizare pentru măsurarea tensiunii arteriale", "Format portabil"],
    specs: [
      ["Cod produs", "32773"],
      ["Tip produs", "Tensiometru de încheietură"],
      ["Dimensiuni menționate", "54 x 36 x 44 mm"],
      ["Greutate menționată", "45 g"],
    ],
    related: ["24128", "33245", "33246", "28065"],
  },
  {
    code: "33245",
    category: "monitoring",
    title: "ECG portabil Cardio-C cu 3 canale",
    slug: "ecg-portabil-cardio-c-cu-3-canale-33245",
    summary: "ECG portabil cu 3 canale pentru evaluare rapidă și documentare în cabinet sau în fluxuri mobile.",
    description:
      "Cardio-C este un ECG portabil cu 3 canale, potrivit pentru cabinete și situații în care este necesară înregistrarea rapidă a unui traseu ECG. ZESCORP poate verifica accesoriile, software-ul, consumabilele și opțiunile de service înainte de ofertare.",
    applications: ["Cabinete de medicină generală și cardiologie", "Evaluare ECG rapidă în fluxuri clinice", "Dotări mobile sau compacte pentru consultații"],
    benefits: ["Format portabil", "3 canale ECG", "Poate fi ofertat împreună cu consumabile și service"],
    features: ["ECG portabil", "Înregistrare pe 3 canale", "Suport pentru ofertare și integrare operațională"],
    specs: [
      ["Cod produs", "33245"],
      ["Tip produs", "ECG portabil"],
      ["Canale", "3"],
      ["Dimensiuni", "100 x 45 x H 15 mm"],
    ],
    related: ["33246", "24128", "32773", "28065"],
  },
  {
    code: "33246",
    category: "monitoring",
    title: "ECG portabil PM10 cu software și Bluetooth",
    slug: "ecg-portabil-pm10-cu-software-si-bluetooth-33246",
    summary: "ECG portabil PM10 cu software și Bluetooth pentru evaluări rapide și conectivitate în fluxuri clinice compacte.",
    description:
      "PM10 este un ECG portabil cu software și Bluetooth, potrivit pentru situații în care conectivitatea și formatul compact sunt importante. ZESCORP poate pregăti oferta cu verificarea accesoriilor, compatibilității software și cerințelor de suport tehnic.",
    applications: ["Cabinete medicale cu nevoie de ECG compact", "Evaluare rapidă în fluxuri mobile sau puncte de lucru", "Dotări pentru servicii medicale cu spațiu limitat"],
    benefits: ["Conectivitate Bluetooth menționată în sursa produsului", "Software inclus în denumirea produsului", "Format portabil pentru utilizare flexibilă"],
    features: ["ECG portabil PM10", "Software și Bluetooth", "Utilizare în monitorizare clinică rapidă"],
    specs: [
      ["Cod produs", "33246"],
      ["Model", "PM10"],
      ["Tip produs", "ECG portabil"],
      ["Conectivitate", "Bluetooth"],
      ["Dimensiuni", "100 x 45 x H 15 mm"],
    ],
    related: ["33245", "24128", "32773", "28065"],
  },
  {
    code: "35660",
    category: "sterilization",
    title: "Autoclavă Hydra Evo cu imprimantă, 15 l",
    slug: "autoclava-hydra-evo-cu-imprimanta-15-l-35660",
    summary: "Autoclavă Hydra Evo de 15 l cu imprimantă, pentru fluxuri de sterilizare în cabinete și clinici.",
    description:
      "Autoclava Hydra Evo cu imprimantă este destinată cabinetelor și clinicilor care au nevoie de un echipament dedicat pentru sterilizare și trasabilitate documentară. Pentru ofertare, ZESCORP verifică aplicația, volumul de lucru, consumabilele și cerințele de service.",
    applications: ["Cabinete medicale și stomatologice", "Clinici cu flux de instrumentar reutilizabil", "Spații de sterilizare cu nevoie de documentare"],
    benefits: ["Capacitate de 15 l menționată în sursa produsului", "Imprimantă inclusă în denumirea produsului", "Poate fi integrată în contracte de mentenanță preventivă"],
    features: ["Autoclavă Hydra Evo", "Capacitate 15 l", "Imprimantă inclusă"],
    specs: [
      ["Cod produs", "35660"],
      ["Model", "Hydra Evo"],
      ["Tip produs", "Autoclavă"],
      ["Capacitate", "15 l"],
      ["Alimentare", "230 V"],
    ],
    related: ["35712", "35640", "35900", "35617"],
  },
  {
    code: "35712",
    category: "sterilization",
    title: "Autoclavă Prestige 12 l",
    slug: "autoclava-prestige-12-l-35712",
    summary: "Autoclavă Prestige de 12 l pentru sterilizare în cabinete și spații clinice cu flux controlat.",
    description:
      "Autoclava Prestige 12 l este potrivită pentru cabinete și spații medicale unde instrumentarul trebuie procesat într-un flux de sterilizare clar. ZESCORP poate verifica volumul de utilizare, accesoriile și planul de mentenanță înainte de ofertare.",
    applications: ["Cabinete medicale și stomatologice", "Spații mici de sterilizare", "Dotări pentru instrumentar reutilizabil"],
    benefits: ["Capacitate de 12 l menționată în sursa produsului", "Format potrivit pentru cabinete", "Poate fi ofertată cu suport de service și mentenanță"],
    features: ["Autoclavă Prestige", "Capacitate 12 l", "Utilizare pentru fluxuri de sterilizare"],
    specs: [
      ["Cod produs", "35712"],
      ["Model", "Prestige"],
      ["Tip produs", "Autoclavă"],
      ["Capacitate", "12 l"],
    ],
    related: ["35660", "35640", "35900", "35621"],
  },
  {
    code: "35640",
    category: "sterilization",
    title: "Sterilizator rapid cu bile GIMA Quick",
    slug: "sterilizator-rapid-cu-bile-gima-quick-35640",
    summary: "Sterilizator rapid cu bile pentru instrumentar mic, util în cabinete cu fluxuri rapide de lucru.",
    description:
      "GIMA Quick este un sterilizator rapid cu bile, destinat instrumentarului mic și fluxurilor în care timpul de pregătire este important. Pentru ofertare, ZESCORP verifică aplicația, dimensiunea instrumentarului, consumabilele și cerințele de mentenanță.",
    applications: ["Cabinete medicale cu instrumentar mic", "Fluxuri rapide de sterilizare locală", "Spații de lucru cu necesar compact"],
    benefits: ["Format compact", "Utilizare pentru instrumentar mic", "Poate fi ofertat împreună cu bile de sticlă și accesorii compatibile"],
    features: ["Sterilizator rapid cu bile", "Model GIMA Quick", "Soluție compactă pentru cabinet"],
    specs: [
      ["Cod produs", "35640"],
      ["Model", "GIMA Quick"],
      ["Tip produs", "Sterilizator cu bile"],
      ["Domeniu", "Sterilizare"],
    ],
    related: ["35660", "35712", "35900", "35617"],
  },
  {
    code: "35900",
    category: "sterilization",
    title: "Aparat de sigilare D-351 pentru sterilizare",
    slug: "aparat-de-sigilare-d-351-pentru-sterilizare-35900",
    summary: "Aparat de sigilare pentru pungi și role de sterilizare, destinat pregătirii instrumentarului pentru procesare.",
    description:
      "D-351 este un aparat de sigilare pentru fluxuri de sterilizare, util în cabinete și clinici care folosesc pungi sau role pentru ambalarea instrumentarului. ZESCORP poate verifica tipul de consumabile, volumul de lucru și cerințele de service înainte de ofertare.",
    applications: ["Cabinete cu flux de sterilizare intern", "Pregătirea pungilor și rolelor pentru instrumentar", "Spații clinice cu necesar de ambalare sterilă"],
    benefits: ["Integrare în fluxuri de sterilizare", "Potrivit pentru ofertare împreună cu consumabile", "Suport pentru clarificarea alimentării și utilizării"],
    features: ["Aparat de sigilare D-351", "Utilizare în sterilizare", "Potrivit pentru pungi și role de sterilizare"],
    specs: [
      ["Cod produs", "35900"],
      ["Model", "D-351"],
      ["Tip produs", "Aparat de sigilare"],
      ["Alimentare", "230 V, 50/60 Hz"],
      ["Greutate", "18 kg"],
    ],
    related: ["35660", "35712", "35640", "35849"],
  },
];

const demotedGoldCodes = ["28065"];

function addRedirect(redirects, source, destination) {
  if (!source || !destination || source === destination) return;
  if (!redirects.some((redirect) => redirect.source === source)) {
    redirects.push({ source, destination });
  }
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"));
  const updated = [];

  for (const gold of goldProducts) {
    const product = products.find((item) => item.gimaCode === gold.code);
    if (!product) throw new Error(`Missing product ${gold.code}`);

    const previousPath = `/produse/${product.slug}`;
    const nextPath = `/produse/${gold.slug}`;

    product.slug = gold.slug;
    product.category = gold.category;
    product.commercialCategory = categoryLabel(gold.category);
    product.romanianTitle = gold.title;
    product.romanianShortSummary = gold.summary;
    product.romanianDescription = gold.description;
    product.commercialDescription = gold.description;
    product.romanianApplications = gold.applications;
    product.romanianBenefits = gold.benefits;
    product.romanianFeatures = gold.features;
    product.romanianPackageContents = [];
    product.romanianSpecifications = gold.specs.map(([label, value]) => ({ label, value }));
    product.imageAlt = `${gold.title} pentru ofertare ZESCORP`;
    product.relatedProductCodes = gold.related;
    product.relatedServices = relatedServicesByCategory[gold.category] ?? ["/service-aparatura-medicala", "/contracte-mentenanta"];
    product.installationConsiderations = [
      "Verificarea aplicației clinice și a condițiilor de utilizare înainte de ofertare",
      "Clarificarea accesoriilor, consumabilelor și documentației necesare",
      "Integrarea produsului în fluxul operațional al clinicii, laboratorului sau cabinetului",
    ];
    product.maintenanceConsiderations = [
      "Recomandare de service și mentenanță în funcție de frecvența de utilizare",
      "Verificarea consumabilelor și accesoriilor critice pentru continuitate operațională",
      "Suport ZESCORP pentru ofertare, instalare, mentenanță preventivă și intervenții tehnice",
    ];
    product.catalogStatus = "ready_for_publish";
    product.publicDisplayReady = true;
    product.strictQualityStatus = "pass";
    product.strictQualityScore = 100;
    product.strictQualityFailures = [];
    product.reviewStatus = "image_verified";
    product.indexableAt = null;

    addRedirect(redirects, previousPath, nextPath);
    updated.push({ code: gold.code, title: gold.title, slug: gold.slug, category: gold.category });
  }

  for (const code of demotedGoldCodes) {
    if (goldProducts.some((product) => product.code === code)) continue;
    const product = products.find((item) => item.gimaCode === code);
    if (!product) continue;
    product.reviewStatus = "image_verified";
    product.indexableAt = null;
    product.catalogStatus = "needs_review";
    product.publicDisplayReady = false;
    product.strictQualityStatus = "fail";
    product.strictQualityScore = Math.min(product.strictQualityScore || 70, 70);
    product.strictQualityFailures = ["not_in_gold_standard_set"];
  }

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);
  console.log(JSON.stringify({ updated: updated.length, products: updated }, null, 2));
}

function categoryLabel(category) {
  const labels = {
    laboratory: "Laborator / IVD",
    emergency: "Urgență",
    "medical-furniture": "Mobilier medical",
    monitoring: "Monitorizare",
    sterilization: "Sterilizare",
  };

  return labels[category] || "Echipamente medicale";
}

main();
