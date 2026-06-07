import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "gima-full-repair-02-report.md");
const imageRoot = path.join(root, "public", "product-images");

const allowedEnglishTerms = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "ECG",
  "EKG",
  "LED",
  "LCD",
  "USB",
  "PVC",
  "ABS",
  "RFID",
  "AAA",
  "MDR",
  "IVD",
  "ORL",
  "FFP2",
  "FFP3",
  "IIR",
  "NRD",
  "HD",
  "TFT",
  "AED",
  "SpO2",
  "NIBP",
  "EtCO2",
  "LUX",
  "Lux",
  "Storz",
  "Wolf",
  "Olympus",
  "Pentax",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "Cherokee",
  "BD",
  "3M",
  "Aura",
  "GIMA",
];

const categories = {
  diagnostic: {
    label: "Diagnostic medical",
    applications: ["cabinete medicale", "clinici multidisciplinare", "evaluare si diagnostic clinic"],
    relatedServices: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  laboratory: {
    label: "Laborator / IVD",
    applications: ["laboratoare medicale", "fluxuri IVD", "prelucrarea si analiza probelor"],
    relatedServices: ["/solutii-medicale/echipamente-laborator-ivd", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  emergency: {
    label: "Urgenta",
    applications: ["zone de urgenta", "truse de interventie", "suport pentru echipe mobile"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/instalare-punere-in-functiune"],
  },
  sterilization: {
    label: "Sterilizare",
    applications: ["sterilizare instrumentar", "fluxuri de cabinet", "zone de pregatire instrumentar"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-furniture": {
    label: "Mobilier medical",
    applications: ["amenajare clinica", "organizare spatiu medical", "mobilier pentru pacienti si personal"],
    relatedServices: ["/solutii-medicale/amenajare-clinica-medicala", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  ent: {
    label: "ORL",
    applications: ["cabinete ORL", "diagnostic ORL", "dotare specializata pentru consultatii"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  gynecology: {
    label: "Ginecologie",
    applications: ["cabinete ginecologie", "obstetrica", "monitorizare si consultatii specializate"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  consumables: {
    label: "Consumabile",
    applications: ["consumabile recurente", "dotare operationala", "cabinete si laboratoare medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  electromedical: {
    label: "Electromedicale",
    applications: ["terapie", "diagnostic si tratament", "echipamente active pentru fluxuri clinice"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "surgical-instruments": {
    label: "Instrumentar chirurgical",
    applications: ["instrumentar pentru interventii", "cabinete si clinici", "fluxuri de sterilizare"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "patient-care": {
    label: "Ingrijire pacient",
    applications: ["ingrijire pacient", "mobilizare si suport", "clinici, cabinete si unitati medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  monitoring: {
    label: "Monitorizare",
    applications: ["monitorizare clinica", "evaluare parametri", "suport pentru decizie operationala"],
    relatedServices: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  disinfection: {
    label: "Dezinfectie",
    applications: ["dezinfectie si control operational", "fluxuri medicale sigure", "necesar recurent pentru clinici"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "operator-protection": {
    label: "Protectie operator",
    applications: ["protectia personalului medical", "consumabile de protectie", "activitate clinica sigura"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-bags": {
    label: "Genti medicale",
    applications: ["truse de interventie", "echipe mobile", "transport organizat pentru materiale medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "scales-measures": {
    label: "Cantare si masurare",
    applications: ["masurare medicala", "podoscopie", "evaluare pacient in cabinet sau clinica"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  physiotherapy: {
    label: "Fizioterapie",
    applications: ["recuperare medicala", "fizioterapie", "dotare sali de terapie"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  veterinary: {
    label: "Veterinar",
    applications: ["clinici veterinare", "interventii veterinare", "dotare operationala veterinara"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "anatomy-models": {
    label: "Modele anatomice",
    applications: ["educatie medicala", "instruire clinica", "cabinete si institutii de formare"],
    relatedServices: ["/service-aparatura-medicala"],
  },
  "medical-lights": {
    label: "Lampi medicale",
    applications: ["iluminare de examinare", "iluminare chirurgicala", "cabinete si sali de interventie"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
};

const phraseReplacements = [
  [/\bMULTI[- ]PARAMETER MONITOR\b/gi, "monitor multiparametric"],
  [/\bFOETAL MONITOR\b/gi, "monitor fetal"],
  [/\bFETAL MONITOR\b/gi, "monitor fetal"],
  [/\bMEDICAL HEAT SEALER\b/gi, "aparat medical pentru termosigilare"],
  [/\bEMERGENCY TROLLEY\b/gi, "carucior de urgenta"],
  [/\bDRESSING TROLLEY\b/gi, "carucior pentru pansamente"],
  [/\bPATIENT TRANSFER CHAIR\b/gi, "scaun pentru transfer pacient"],
  [/\bPATIENT TROLLEY\b/gi, "carucior pentru pacient"],
  [/\bPATIENT MONITOR\b/gi, "monitor pacient"],
  [/\bPATIENT CABLE\b/gi, "cablu pacient"],
  [/\bPATIENT CIRCUIT\b/gi, "circuit pacient"],
  [/\bPATIENT LIFTER\b/gi, "ridicator pacient"],
  [/\bPATIENT BED\b/gi, "pat pentru pacient"],
  [/\bPATIENT AIDS\b/gi, "ajutoare pentru pacient"],
  [/\bRESCUE LIFE\b/gi, "Rescue Life"],
  [/\bDEFIBRILLATORS?\b/gi, "defibrilator"],
  [/\bOXYGEN CYLINDER\b/gi, "butelie de oxigen"],
  [/\bOXYGEN BOTTLE HOLDER\b/gi, "suport pentru butelie de oxigen"],
  [/\bOXYGEN CONCENTRATOR\b/gi, "concentrator de oxigen"],
  [/\bOXYGEN MASK\b/gi, "masca de oxigen"],
  [/\bRESUSCITATION KIT\b/gi, "kit de resuscitare"],
  [/\bLARYNGOSCOPE\b/gi, "laringoscop"],
  [/\bSAFETY BELT\b/gi, "centura de siguranta"],
  [/\bCORRUGATED TUBE\b/gi, "tub gofrat"],
  [/\bFILLED\b/gi, "echipata"],
  [/\bWITHOUT CYLINDER\b/gi, "fara butelie"],
  [/\bUNI CYLINDER\b/gi, "butelie universala"],
  [/\bNF CYLINDER\b/gi, "butelie NF"],
  [/\bCYLINDER\b/gi, "butelie"],
  [/\bPORTABLE\b/gi, "portabil"],
  [/\bCONCENTRATOR\b/gi, "concentrator"],
  [/\bDISPOSABLE PADDLES?\b/gi, "padele de unica folosinta"],
  [/\bADAPTOR CABLE\b/gi, "cablu adaptor"],
  [/\bECG CABLE\b/gi, "cablu ECG"],
  [/\b3[- ]PLY MASKS?\b/gi, "masti chirurgicale in 3 straturi"],
  [/\b4[- ]PLY SURGICAL MASK\b/gi, "masca chirurgicala in 4 straturi"],
  [/\b5[- ]LAYER REUSABLE MASK\b/gi, "masca reutilizabila in 5 straturi"],
  [/\bFILTERING MASK\b/gi, "masca filtranta"],
  [/\bSURGICAL PROTECTIVE MASKS?\b/gi, "masti chirurgicale de protectie"],
  [/\bWITH EAR LOOPS\b/gi, "cu elastice pentru urechi"],
  [/\bWITH LACETS\b/gi, "cu legaturi"],
  [/\bFLOWPACK\b/gi, "pachet"],
  [/\bPACHET OF\b/gi, "pachet cu"],
  [/\bMLBOX OF\s*(\d+)/gi, "ml, cutie cu $1"],
  [/\bBOX OF\s*(\d+)/gi, "cutie cu $1"],
  [/\bBOXES OF\s*(\d+)/gi, "cutii cu $1"],
  [/\bBOX\b/gi, "cutie"],
  [/\bCOLOURED\b/gi, "colorate"],
  [/\bCOLORED\b/gi, "colorate"],
  [/\bPATTERNED\b/gi, "cu model"],
  [/\bLIGHT BLUE\b/gi, "albastru deschis"],
  [/\bLIGHT GREEN\b/gi, "verde deschis"],
  [/\bDARK BLUE\b/gi, "albastru inchis"],
  [/\bPINK\b/gi, "roz"],
  [/\bWHITE\b/gi, "alb"],
  [/\bBLACK\b/gi, "negru"],
  [/\bGREEN\b/gi, "verde"],
  [/\bBLUE\b/gi, "albastru"],
  [/\bCARTOON\b/gi, "animat"],
  [/\bPEACE\b/gi, "pace"],
  [/\bSTARS\b/gi, "stele"],
  [/\bCOLOURS\b/gi, "culori"],
  [/\bCOLORS\b/gi, "culori"],
  [/\bMACARONES\b/gi, "macarons"],
  [/\bSKULLS\b/gi, "cranii"],
  [/\bMILITARY\b/gi, "militar"],
  [/\bRAINBOW\b/gi, "curcubeu"],
  [/\bWAVE\b/gi, "valuri"],
  [/\bCHRISTMAS\b/gi, "Craciun"],
  [/\bHALLOWEEN\b/gi, "Halloween"],
  [/\bCHEMICAL\b/gi, "chimie"],
  [/\bBIOLOGY\b/gi, "biologie"],
  [/\bVETERINARY\b/gi, "veterinar"],
  [/\bJUNIOR\/ADULT SMALL\b/gi, "marime mica pentru juniori/adulti"],
  [/\bADULT[- ]SMALL\b/gi, "adult - marime mica"],
  [/\bADULT\b/gi, "adult"],
  [/\bSMALL\b/gi, "mic"],
  [/\bFOLEY CATHETER\b/gi, "cateter Foley"],
  [/\bRECTAL CATHETER\b/gi, "cateter rectal"],
  [/\bCATHETER\b/gi, "cateter"],
  [/\b2[- ]WAY\b/gi, "cu 2 cai"],
  [/\b3[- ]WAY\b/gi, "cu 3 cai"],
  [/\bBALLOON\b/gi, "balon"],
  [/\bSTERILE\b/gi, "steril"],
  [/\bDISPOSABLE\b/gi, "de unica folosinta"],
  [/\bSINGLE USE\b/gi, "de unica folosinta"],
  [/\bSKIN STAPLE REMOVER\b/gi, "extractor pentru agrafe cutanate"],
  [/\bSCALPEL BLADES?\b/gi, "lame de bisturiu"],
  [/\bSCALPEL\b/gi, "bisturiu"],
  [/\bBLADES?\b/gi, "lame"],
  [/\bFORCEPS\b/gi, "pensa"],
  [/\bCLAMP\b/gi, "pensa"],
  [/\bSCISSORS\b/gi, "foarfeca"],
  [/\bNEEDLE HOLDER\b/gi, "portac"],
  [/\bSTEEL CHAIN\b/gi, "lant metalic"],
  [/\bSILICONE STRAPS?\b/gi, "curele din silicon"],
  [/\bKIT OF\s*(\d+)/gi, "kit cu $1"],
  [/\bSYRINGES?\b/gi, "seringi"],
  [/\bWITHOUT NEEDLES?\b/gi, "fara ace"],
  [/\bWITH NEEDLES?\b/gi, "cu ace"],
  [/\bNEEDLES?\b/gi, "ace"],
  [/\bLUER SLIP\b/gi, "Luer slip"],
  [/\bLUER LOCK\b/gi, "Luer lock"],
  [/\bCENTRIC TIP\b/gi, "varf centric"],
  [/\bCATHETER CONE\b/gi, "con pentru cateter"],
  [/\bCAPACITY\b/gi, "capacitate"],
  [/\bMODEL\b/gi, "model"],
  [/\bPLAIN SIDE\b/gi, "margine simpla"],
  [/\bGROUND EDGES\b/gi, "margini slefuite"],
  [/\bFROSTED\b/gi, "mata"],
  [/\bSANDLASTED\b/gi, "sablata"],
  [/\bSANDBLASTED\b/gi, "sablata"],
  [/\bMICROSCOPE SLIDES?\b/gi, "lame pentru microscop"],
  [/\bBOX FOR SLIDES?\b/gi, "cutie pentru lame"],
  [/\bCURETTES?\b/gi, "chiurete"],
  [/\bFLEXIBLE\b/gi, "flexibile"],
  [/\bSUCTION\b/gi, "aspiratie"],
  [/\bWHEELCHAIR\b/gi, "scaun rulant"],
  [/\bSTRETCHER\b/gi, "targa"],
  [/\bBAG\b/gi, "geanta"],
  [/\bBAGS\b/gi, "genti"],
  [/\bSCALE\b/gi, "cantar"],
  [/\bSCALES\b/gi, "cantare"],
  [/\bSTADIOMETER\b/gi, "stadiometru"],
  [/\bPODOSCOPE\b/gi, "podoscop"],
  [/\bANATOMICAL MODEL\b/gi, "model anatomic"],
  [/\bANATOMY MODEL\b/gi, "model anatomic"],
  [/\bSKELETON\b/gi, "schelet anatomic"],
  [/\bTORSO\b/gi, "tors anatomic"],
  [/\bHEADLIGHT\b/gi, "lampa frontala"],
  [/\bMEDICAL LIGHT\b/gi, "lampa medicala"],
  [/\bLIGHT SOURCE\b/gi, "sursa de lumina"],
  [/\bOTOSCOPE\b/gi, "otoscop"],
  [/\bOPHTHALMOSCOPE\b/gi, "oftalmoscop"],
  [/\bDERMATOSCOPE\b/gi, "dermatoscop"],
  [/\bRETINOSCOPE\b/gi, "retinoscop"],
  [/\bCOLPOSCOPE\b/gi, "colposcop"],
  [/\bSPECULUM\b/gi, "specul"],
  [/\bEAR SPECULUM\b/gi, "specul auricular"],
  [/\bEAR IRRIGATION TIP\b/gi, "varf pentru irigare auriculara"],
  [/\bOCCLUDER GLASSES\b/gi, "ochelari ocluzori"],
  [/\bOXYGEN RESERVOIR\b/gi, "rezervor de oxigen"],
  [/\bSINGLE PATIENT HAND SUCTION PUMP\b/gi, "pompa manuala de aspiratie pentru un singur pacient"],
  [/\bSUCTION PAD FOR PLATES\b/gi, "placuta de aspiratie pentru placi"],
  [/\bRUBBER PLATE\b/gi, "placa din cauciuc"],
  [/\bROCKER HANDLE\b/gi, "maner rocker"],
  [/\bFLEXIBLE TIP\b/gi, "varf flexibil"],
  [/\bSHARP SPOON DOUBLE END\b/gi, "lingura ascutita cu doua capete"],
  [/\bGRACEY CURETTE\b/gi, "chiureta Gracey"],
  [/\bKARMAN CURETTE\b/gi, "chiureta Karman"],
  [/\bSINGLE USE\b/gi, "de unica folosinta"],
  [/\bFLEXIBLE\b/gi, "flexibil"],
  [/\bFROSTED\b/gi, "mata"],
  [/\bGROUND EDGES\b/gi, "margini slefuite"],
  [/\bPLAIN SIDE\b/gi, "parte simpla"],
  [/\bSLIDES?\b/gi, "lame"],
  [/\bCURETTES?\b/gi, "chiurete"],
  [/\bCURETTE\b/gi, "chiureta"],
  [/\bLENGTH\b/gi, "lungime"],
  [/\bMEDIUM\b/gi, "mediu"],
  [/\bWITH VALVE\b/gi, "cu valva"],
  [/\bWITH\b/gi, "cu"],
  [/\bFOR\b/gi, "pentru"],
  [/\bAND\b/gi, "si"],
  [/\bONLY\b/gi, "doar"],
  [/\bOTHER COLOURS\b/gi, "alte culori"],
  [/\bOTHER COLORS\b/gi, "alte culori"],
  [/\bOTHER CONFIGURATION\b/gi, "alta configuratie"],
  [/\bOTHER\b/gi, "alt"],
  [/\bRED\b/gi, "rosu"],
  [/\bLACETS\b/gi, "legaturi"],
  [/\bHANDLE\b/gi, "maner"],
  [/\bHOLDER\b/gi, "suport"],
  [/\bPATIENT\b/gi, "pacient"],
  [/\bTHIN SCISSORS\b/gi, "foarfeca fina"],
  [/\bTHIN FORCEPS\b/gi, "pensa fina"],
  [/\bTHIN TIPS\b/gi, "varfuri fine"],
  [/\bTHIN\b/gi, "fin"],
  [/\bDISSECTING\b/gi, "disectie"],
  [/\bFOLDABLE\b/gi, "pliabil"],
  [/\bALUMINIUM\b/gi, "aluminiu"],
  [/\bJOINTS\b/gi, "articulatii"],
  [/\bCRANKS\b/gi, "manivele"],
  [/\bCASTORS\b/gi, "roti"],
  [/\bHEIGHT ADJUSTABLE\b/gi, "inaltime reglabila"],
  [/\bADJUSTABLE HEIGHT\b/gi, "inaltime reglabila"],
  [/\bVARIABLE HEIGHT\b/gi, "inaltime variabila"],
  [/\bCHROME PLATED STEEL\b/gi, "otel cromat"],
  [/\bHAND TOWELS?\b/gi, "prosoape pentru maini"],
  [/\bHAND\b/gi, "mana"],
  [/\bPUMP\b/gi, "pompa"],
  [/\bPAD\b/gi, "tampon"],
  [/\bPLATES?\b/gi, "placi"],
  [/\bAVAILABLE\b/gi, "disponibil"],
  [/\bAUTOCLAVABLE\b/gi, "autoclavabil"],
  [/\bSPARE\b/gi, "rezerva"],
  [/\bRECHARGEABLE\b/gi, "reincarcabil"],
  [/\bILLUMINATED\b/gi, "iluminat"],
  [/\bWOOD LAMP\b/gi, "lampa Wood"],
  [/\bBULB\b/gi, "bec"],
  [/\bRESTING PAD\b/gi, "tampon de sprijin"],
  [/\bBOOK OF\s*(\d+)/gi, "carte cu $1"],
  [/\bILLITERATES\b/gi, "persoane fara alfabetizare"],
  [/\bCONNECTOR TO\b/gi, "conector pentru"],
  [/\bEAR[- ]SPECULUM\b/gi, "specul auricular"],
  [/\bBATTERY PACK\b/gi, "pachet baterie"],
  [/\bGROUNDING PAD\b/gi, "tampon de impamantare"],
  [/\bCLEANING PAD\b/gi, "tampon de curatare"],
  [/\bWATERPROOF\b/gi, "rezistent la apa"],
  [/\bFOOT[- ]SWITCH\b/gi, "pedala"],
  [/\bSPARE\b/gi, "rezerva"],
  [/\bFILTER\b/gi, "filtru"],
  [/\bBREAST PUMP\b/gi, "pompa de san"],
  [/\bASPIRATOR\b/gi, "aspirator"],
  [/\bMAGNETOTHERAPY MAT\b/gi, "saltea pentru magnetoterapie"],
  [/\bHEATING PAD\b/gi, "perna electrica"],
  [/\bWAIST WRAP\b/gi, "centura pentru talie"],
  [/\bHAND GRIP METER\b/gi, "dinamometru pentru mana"],
  [/\bDRESSING KIT\b/gi, "kit pentru pansamente"],
  [/\bLICE COMB\b/gi, "pieptene pentru paduchi"],
  [/\bPROCTOSCOPE\b/gi, "proctoscop"],
  [/\bCONTAINER\b/gi, "recipient"],
  [/\bTRAY\b/gi, "tava"],
  [/\bGOUGE\b/gi, "dalta"],
  [/\bGRADUATED\b/gi, "gradat"],
  [/\bSTAINLESS STEEL\b/gi, "otel inoxidabil"],
  [/\bCUTTING EDGE\b/gi, "muchie taietoare"],
  [/\bRIBBED\b/gi, "striat"],
  [/\bSURE\b/gi, "sigur"],
  [/\bARTHROSCOPY\b/gi, "artroscopie"],
  [/\bSURGERY\b/gi, "chirurgie"],
  [/\bSET\b/gi, "set"],
  [/\bSTERIL\b/gi, "steril"],
  [/\bGIMA GLUCOSE MONITOR - METER ONLY\b/gi, "glucometru GIMA - numai aparat"],
  [/\bGIMA VALUE DIGITAL THERMOMETER\b/gi, "termometru digital GIMA Value"],
  [/\bDIGITAL THERMOMETER\b/gi, "termometru digital"],
  [/\bQUICK TOURNIQUET\b/gi, "garou rapid"],
  [/\bLATEX FREE\b/gi, "fara latex"],
  [/\bONE HAND USE\b/gi, "utilizare cu o singura mana"],
  [/\bQUICK RELEASE\b/gi, "eliberare rapida"],
  [/\bSPANDEx\/ELASTAN\b/gi, "spandex/elastan"],
  [/\bRIGID TIP\b/gi, "varf rigid"],
  [/\bPLAIN TIP\b/gi, "varf neted"],
  [/\bROUGH TIP\b/gi, "varf striat"],
  [/\bSTRAIGHT\b/gi, "drept"],
  [/\bCURVED\b/gi, "curbat"],
  [/\bTHERMOMETER\b/gi, "termometru"],
  [/\bSTETHOSCOPE\b/gi, "stetoscop"],
  [/\bSPHYGMOMANOMETER\b/gi, "tensiometru"],
  [/\bNEBULIZER\b/gi, "nebulizator"],
  [/\bSUCTION PUMP\b/gi, "pompa de aspiratie"],
  [/\bANALYZER\b/gi, "analizor"],
  [/\bANALYSER\b/gi, "analizor"],
  [/\bCENTRIFUGE\b/gi, "centrifuga"],
  [/\bMICROSCOPE\b/gi, "microscop"],
  [/\bPIPETTE\b/gi, "pipeta"],
  [/\bPRINTER\b/gi, "imprimanta"],
  [/\bPAPER\b/gi, "hartie"],
  [/\bCABLE\b/gi, "cablu"],
  [/\bBATTERY\b/gi, "baterie"],
  [/\bCHARGER\b/gi, "incarcator"],
  [/\bCONNECTOR\b/gi, "conector"],
  [/\bADAPTER\b/gi, "adaptor"],
  [/\bADAPTOR\b/gi, "adaptor"],
  [/\bPROBE\b/gi, "sonda"],
  [/\bSENSOR\b/gi, "senzor"],
  [/\bELECTRODES?\b/gi, "electrod"],
];

const leakPatterns = [
  /\b(power|voltage|communication|interface|record mode|host computer|large display|user[- ]friendly|fast results|sample volume)\b/i,
  /\b(description|features|package contents|applications|benefits|specifications|delivery|support|category|product code)\b/i,
  /\b(trolley|chair|table|analyzer|analyser|centrifuge|microscope|stethoscope|thermometer|sphygmomanometer)\b/i,
  /\b(sterile|drape|forceps|clamp|straight|curved|disposable|gloves|mask|bag|scale|light|headlight)\b/i,
  /\b(v-neck|woman|women|man|men|navy|teal|top|tops|tunic|pants|trousers|jacket|basket|case|cover|adapter|adaptor|children|adult|optional|suitable|only|provided|from|with|size guide|line)\b/i,
  /\b(kit of|silicone|straps?|steel chain|operator'?s protection|3-ply|ply|pink|dark|sky|other colours|boxes of|box of|colour|color)\b/i,
  /\b(respirator|reusable|safe comfort|layer|classified|according|kid|age|valve|ear loops|headband|conical|cashmere|stars|skull|rainbow|wave)\b/i,
  /\b(catheter|balloon|rectal|purple|lubricant|box|2-way|3-way|staple|blade|scalpel|foley|fabric|effective|filtering)\b/i,
  /\b(slides?|curette|flexible|single use|suction|minimum order|without needle|with needle|centric tip|ground edges|frosted)\b/i,
  /\b(single patient|hand|pump|physiotherapy|nebulizers?|pad|for|plates?|rocker|handle|fun|oxygen cylinder)\b/i,
  /\b(red|other|lacets|thin|end|configuration|defib|toy|space|dog|pet|smile|available|manual|autoclavable|spare|filter|breast|aspirator|heating|waist|grip|dressing kit|comb|container|tray|gouge|graduated|stainless|cutting edge|arthroscopy|surgery|set|polyester|hooks|stretchers)\b/i,
  /\b(pachet of|tools and|d-end|health care|patient|oxygen|cylinder|lead|safety belt|filled|resuscitation|laryngoscope|concentrator|foldable|aluminium|joints|cranks|castors|height adjustable|chrome plated|cardiorapid|plug in|vet)\b/i,
];

function clean(value) {
  return String(value || "")
    .replace(/â€™/g, "'")
    .replace(/â„¢/g, "")
    .replace(/Â®/g, "")
    .replace(/®/g, "")
    .replace(/™/g, "")
    .replace(/Â°/g, "°")
    .replace(/Ã˜/g, "diametru")
    .replace(/Ø/g, "diametru")
    .replace(/ï¬/g, "fi")
    .replace(/ﬂ/g, "fl")
    .replace(/ﬁ/g, "fi")
    .replace(/Î¼/g, "u")
    .replace(/Âµ/g, "u")
    .replace(/µ/g, "u")
    .replace(/Â/g, "")
    .replace(/â€¢/g, "")
    .replace(/•/g, " ")
    .replace(/\/g\d+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function romanianize(value) {
  let result = clean(value);
  for (const [pattern, replacement] of phraseReplacements) result = result.replace(pattern, replacement);
  return result
    .replace(/\bGb\b/g, "GB")
    .replace(/\bFr\b/g, "FR")
    .replace(/\bIt\b/g, "IT")
    .replace(/\bEs\b/g, "ES")
    .replace(/\bPt\b/g, "PT")
    .replace(/\bDe\b/g, "DE")
    .replace(/\bRo\b/g, "RO")
    .replace(/\bGima\b/g, "GIMA")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bFfp2\b/g, "FFP2")
    .replace(/\bFfp3\b/g, "FFP3")
    .replace(/\bIir\b/g, "IIR")
    .replace(/\bNrd\b/g, "NRD")
    .replace(/\bAed\b/g, "AED")
    .replace(/\bSpo2\b/g, "SpO2")
    .replace(/\bNibp\b/g, "NIBP")
    .replace(/\bEtco2\b/g, "EtCO2")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value) {
  const text = romanianize(value).toLowerCase();
  const keep = new Set(allowedEnglishTerms.map((term) => term.toLowerCase()));
  return text
    .split(" ")
    .map((word, index) => {
      const normalized = word.replace(/[^a-z0-9]/gi, "").toLowerCase();
      const allowed = allowedEnglishTerms.find((term) => term.toLowerCase() === normalized);
      if (allowed) return word.replace(new RegExp(normalized, "i"), allowed);
      if (/^[a-z]+-\d+$/i.test(word) || /\d/.test(word)) return word.toUpperCase().replace("CH/FR", "ch/fr");
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      if (keep.has(normalized)) return word.toUpperCase();
      return word;
    })
    .join(" ")
    .replace(/\bCh\/Fr\b/g, "ch/fr")
    .replace(/\bMl\b/g, "ml")
    .replace(/\bMm\b/g, "mm")
    .replace(/\bCm\b/g, "cm")
    .replace(/\s+/g, " ")
    .trim();
}

function stripAllowedTerms(value) {
  let text = String(value || "");
  for (const term of allowedEnglishTerms) {
    text = text.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  }
  return text;
}

function hasEnglishLeak(value) {
  const text = stripAllowedTerms(clean(value));
  return leakPatterns.some((pattern) => pattern.test(text));
}

function looksLikeTableArtifact(value, sku) {
  const text = clean(value);
  const withoutSku = text.replace(String(sku || ""), " ");
  const numbers = withoutSku.match(/\b\d{4,}\b/g) || [];
  const words = withoutSku.match(/[A-Za-z]{3,}/g) || [];
  const hasSpecificMedicalTerm =
    /\b(FFP2|FFP3|ophthalmoscope|otoscope|dermatoscope|retinoscope|stethoscope|sphygmomanometer|thermometer|speculum|catheter|curette|mask|needle|syringe|scalpel|clamp|forceps|electrode|sensor|probe|cable|adapter|battery|paddle|defibrillator|colposcope|microscope|centrifuge|analyzer|analyser|pipette|nebulizer|pump|tourniquet|chair|trolley|stretcher|scale|stadiometer|podoscope|light|lamp|bag)\b/i.test(text) ||
    /\b(FFP2|FFP3|oftalmoscop|otoscop|dermatoscop|retinoscop|stetoscop|tensiometru|termometru|specul|cateter|chiureta|masca|ac|seringa|bisturiu|pensa|electrod|senzor|sonda|cablu|adaptor|baterie|padela|defibrilator|colposcop|microscop|centrifuga|analizor|pipeta|nebulizator|pompa|garou|scaun|carucior|targa|cantar|stadiometru|podoscop|lampa|geanta)\b/i.test(text);
  if (!words.length || (words.length < 2 && !hasSpecificMedicalTerm)) return true;
  if (numbers.length > 2) return true;
  if (/^(xs|s|m|l|xl|xxl|xxxl)\b/i.test(text)) return true;
  if (/^(size guide|class i|needs|see the list|produs medical|operator'?s protection)\b/i.test(text)) return true;
  if (/^(tops and trousers|cherokee uniforms|physiotherapy\s*-\s*nebulizers|operator'?s protection)\b/i.test(text)) return true;
  if (/^(rosu|alb|negru|albastru|verde|gri|mov|violet|galben|portocaliu)(\s*&\s*|\s+si\s+)?(rosu|alb|negru|albastru|verde|gri|mov|violet|galben|portocaliu)?$/i.test(text)) return true;
  if (/^([a-z]{1,3}\s*)?[\d\s.,x+-]+$/i.test(text)) return true;
  return false;
}

function categorySpecificTitle(product) {
  const sku = String(product.gimaCode || "");
  const source = clean(product.sourceProductName || product.romanianTitle || "");
  if (!source || !sku) return "";
  if (/^(tops and trousers|cherokee uniforms|size guide)/i.test(source)) return "";
  if (/^produs medical/i.test(source)) return "";

  let title = source.replace(new RegExp(`\\b${escapeRegExp(sku)}\\b`, "g"), " ");
  title = title.replace(/\b\d{5}\b/g, " ");
  title = title.replace(/\*\*?available.*$/i, " ");
  title = title.replace(/\bspecify size and colour.*$/i, " ");
  title = title.replace(/\bminimum order\b/gi, " ");
  title = title.replace(/\bmanual:\s*.*$/gi, " ");
  title = title.replace(/\bGB,?\s*FR,?\s*IT,?\s*ES,?\s*PT,?\s*DE,?\s*GR,?\s*SE,?\s*RO\b/gi, " ");
  title = title.replace(/\bFrench,?\s*Spanish.*$/gi, " ");
  title = title.replace(/\s+-\s+$/g, " ");
  title = title.replace(/\s+/g, " ").trim();

  title = titleCase(title);

  if (product.category === "operator-protection" && /\bFFP2\b/i.test(source) && !/masca/i.test(title)) title = `Masca respiratorie ${title}`;
  if (product.category === "operator-protection" && /\bFFP3\b/i.test(source) && !/masca/i.test(title)) title = `Masca respiratorie ${title}`;
  if (product.category === "emergency" && /\bRescue Life\b/i.test(title) && !/defibrilator/i.test(title)) title = `Defibrilator ${title}`;
  if (product.category === "surgical-instruments" && /\bFoley\b/i.test(title) && !/cateter/i.test(title)) title = `Cateter ${title}`;
  if (product.category === "gynecology" && /\bKarman\b/i.test(title) && !/chiureta/i.test(title)) title = `Chiureta ${title}`;
  if (product.category === "diagnostic" && /\bri-scope|otoscop|oftalmoscop|dermatoscop|retinoscop/i.test(title) && !/cap|otoscop|oftalmoscop|dermatoscop|retinoscop/i.test(title)) title = `Cap diagnostic ${title}`;

  title = title
    .replace(/\bPachet de 10\b/gi, "pachet cu 10")
    .replace(/\bCutie cu\s+(\d+)\s*\*/gi, "cutie cu $1")
    .replace(/\bChiureta Karman chiurete\b/gi, "Chiureta Karman")
    .replace(/\bGracey chiurete\b/gi, "Chiureta Gracey")
    .replace(/\bChiurete lingura\b/gi, "Chiureta lingura")
    .replace(/\bRocker de unica folosinta handle\b/gi, "Maner rocker de unica folosinta")
    .replace(/\bFun mata ochelari ocluzori\b/gi, "Ochelari ocluzori mati")
    .replace(/\bFlexibile tip\b/gi, "Varf flexibil")
    .replace(/\bpachet of\b/gi, "pachet cu")
    .replace(/\blampa albastru\b/gi, "albastru deschis")
    .replace(/\bLacets\b/gi, "legaturi")
    .replace(/\bBreast pompa\b/gi, "pompa de san")
    .replace(/\bSingle pacient mana pompa\b/gi, "pompa manuala pentru un singur pacient")
    .replace(/\bSuction tampon pentru placi\b/gi, "tampon de aspiratie pentru placi")
    .replace(/\bDefib\.\s*alt configuratie\b/gi, "defibrilator - alta configuratie")
    .replace(/\bPensa fin end\b/gi, "Pensa cu varf fin")
    .replace(/\bIris thin foarfeca\b/gi, "Foarfeca Iris fina")
    .replace(/\bIris fin foarfeca\b/gi, "Foarfeca Iris fina")
    .replace(/\bAdson dissecting thin pensa\b/gi, "Pensa Adson de disectie fina")
    .replace(/\bAdson disectie fin pensa\b/gi, "Pensa Adson de disectie fina")
    .replace(/\bMayo tc durotip thin foarfeca\b/gi, "Foarfeca Mayo TC Durotip fina")
    .replace(/\bMayo tc durotip fin foarfeca\b/gi, "Foarfeca Mayo TC Durotip fina")
    .replace(/\bMetzenbaum tc durotip thin foarfeca\b/gi, "Foarfeca Metzenbaum TC Durotip fina")
    .replace(/\bMetzenbaum tc durotip fin foarfeca\b/gi, "Foarfeca Metzenbaum TC Durotip fina")
    .replace(/\bCentura de siguranta B8.*$/gi, "Centura de siguranta B8 pentru targa")
    .replace(/\bBasic\b/g, "Basic")
    .replace(/\b\*+\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (title.length < 8) return "";
  if (looksLikeTableArtifact(title, sku)) return "";
  if (hasEnglishLeak(title)) return "";
  return title;
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 108);
}

function uniqueSlug(base, sku, used, currentSlug) {
  const rootSlug = slugify(`${base} ${sku}`) || `produs-medical-${sku}`;
  if (currentSlug === rootSlug && !used.has(rootSlug)) {
    used.add(rootSlug);
    return rootSlug;
  }
  let candidate = rootSlug;
  let suffix = 2;
  while (used.has(candidate)) {
    candidate = `${rootSlug}-${suffix}`;
    suffix += 1;
  }
  used.add(candidate);
  return candidate;
}

function fileExists(publicPath) {
  if (!publicPath || !String(publicPath).startsWith("/")) return false;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
}

function sanitizeDocuments(product) {
  const documents = product.documents || {};
  const sanitized = {};
  const status = {};
  for (const [key, value] of Object.entries(documents)) {
    if (!value || !String(value).startsWith("/product-documents/")) continue;
    const exists = fileExists(value);
    status[key] = exists ? "local" : "missing";
    if (exists) sanitized[key] = value;
  }
  product.documents = sanitized;
  product.documentStatus = status;
  product.productDocuments = Object.values(sanitized).map((href) => ({ href }));
}

function cleanSpecifications(product) {
  const category = categories[product.category]?.label || "Echipamente medicale";
  const rawSpecs = Array.isArray(product.romanianSpecifications) ? product.romanianSpecifications : [];
  const repaired = [];
  for (const spec of rawSpecs) {
    const label = romanianize(spec.label || "");
    const value = romanianize(spec.value || "");
    if (!label || !value) continue;
    if (hasEnglishLeak(label) || hasEnglishLeak(value)) continue;
    if (/^stadiu$/i.test(label) || /disponibil pentru cerere/i.test(value)) continue;
    repaired.push({ label, value });
  }
  const withBasics = [
    { label: "Cod produs", value: product.gimaCode },
    { label: "Categorie", value: category },
    ...repaired.filter((spec) => !["Cod produs", "Categorie"].includes(spec.label)),
  ];
  const seen = new Set();
  return withBasics.filter((spec) => {
    const key = `${spec.label}:${spec.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

function publicContentHasEnglishLeak(product) {
  return [
    product.romanianTitle,
    product.romanianDescription,
    product.romanianShortSummary,
    ...(product.romanianFeatures || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianApplications || []),
    ...(product.romanianPackageContents || []),
    ...(product.romanianSpecifications || []).map((spec) => `${spec.label} ${spec.value}`),
    ...(product.installationConsiderations || []),
    ...(product.maintenanceConsiderations || []),
  ].some(hasEnglishLeak);
}

function hasVerifiedImage(product) {
  return Boolean(product.imageStatus === "verified_local" && product.galleryImages?.length && product.galleryImages.every((image) => fileExists(image.url)));
}

function scoreProduct(product, title) {
  const hasImage = hasVerifiedImage(product);
  const hasTitle = Boolean(title && !hasEnglishLeak(title) && !looksLikeTableArtifact(title, product.gimaCode));
  const hasDescription = Boolean(product.romanianDescription && !hasEnglishLeak(product.romanianDescription));
  const hasSlug = Boolean(product.slug && product.slug.endsWith(String(product.gimaCode || "")));
  const hasSpecs = Array.isArray(product.romanianSpecifications) && product.romanianSpecifications.length >= 2;
  const noLeaks = !publicContentHasEnglishLeak(product);
  const breakdown = {
    titleQuality: hasTitle ? 25 : 0,
    localizationQuality: hasDescription && noLeaks ? 22 : 8,
    imagePresence: hasImage ? 25 : 0,
    urlQuality: hasSlug ? 10 : 4,
    ctaCompleteness: 10,
    metadataSafety: noLeaks ? 8 : 0,
    specificationQuality: hasSpecs ? 10 : 5,
  };
  const total = Math.min(100, Object.values(breakdown).reduce((sum, value) => sum + value, 0));
  return { total, breakdown };
}

async function recoverImage(product, stats) {
  if (hasVerifiedImage(product) || !product.gimaCode) return false;
  const sku = String(product.gimaCode);
  const candidates = ["big", "medium", "thumb"].map((variant) => ({
    variant,
    url: `https://www.gimaitaly.com/images/prodotti/${variant}/${sku}.jpg`,
  }));

  for (const candidate of candidates) {
    stats.imageRequests += 1;
    try {
      const response = await fetch(candidate.url, {
        headers: { "User-Agent": "ZESCORP catalog quality audit; manual review workflow" },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) continue;
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("image")) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      const minBytes = candidate.variant === "thumb" ? 2500 : 5000;
      if (bytes.length < minBytes) continue;
      const dir = path.join(imageRoot, sku);
      fs.mkdirSync(dir, { recursive: true });
      const localFile = path.join(dir, `${sku}.jpg`);
      fs.writeFileSync(localFile, bytes);
      const publicPath = `/product-images/${sku}/${sku}.jpg`;
      const imageAlt = `${product.romanianTitle || product.sourceProductName || `Produs ${sku}`} - produs medical`;
      product.imageUrl = publicPath;
      product.galleryImages = [{ url: publicPath, alt: imageAlt, verified: true }];
      product.imageStatus = "verified_local";
      product.imageAlt = imageAlt;
      product.imageAudit = {
        originalExtractedUrl: product.sourceUrls?.[0] || product.productUrl || "",
        finalHighResolutionUrl: candidate.url.replace(sku, "[sku]"),
        localFilePath: publicPath,
        byteSize: bytes.length,
        sourceVariant: candidate.variant,
        wasThumbnail: candidate.variant === "thumb",
      };
      stats.imagesRecovered += 1;
      stats.recoveredImages.push({ sku, variant: candidate.variant, bytes: bytes.length, publicPath });
      return true;
    } catch {
      stats.imageFailures += 1;
    }
  }
  return false;
}

function applyContentRepair(product, usedSlugs, stats) {
  sanitizeDocuments(product);
  product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
  product.indexableAt = null;

  const category = categories[product.category] || categories.diagnostic;
  const title = categorySpecificTitle(product);
  const hasImage = hasVerifiedImage(product);
  if (!product.gimaCode || !hasImage || !title) {
    product.publicDisplayReady = false;
    product.catalogStatus = hasImage ? "image_verified" : "localized";
    product.qualityScore = hasImage ? 78 : 50;
    if (!title && product.gimaCode) product.romanianTitle = `${category.label} cod ${product.gimaCode}`;
    product.slug = uniqueSlug(product.romanianTitle || `produs medical ${product.gimaCode || product.id}`, product.gimaCode || product.id, usedSlugs, "");
    return { promoted: false, reason: !hasImage ? "missing_image" : "weak_title" };
  }

  const oldTitle = product.romanianTitle;
  product.romanianTitle = title;
  product.slug = uniqueSlug(title, product.gimaCode, usedSlugs, "");
  product.commercialCategory = category.label;
  product.subcategory = category.label;
  product.romanianShortSummary = `${title} pentru ${category.applications[0]}, disponibil pentru oferta personalizata prin ZESCORP.`;
  product.romanianDescription =
    `${title} este disponibil pentru cereri de oferta profesionale, cu verificarea configuratiei si a documentatiei inainte de ofertare. ` +
    `Produsul se incadreaza in categoria ${category.label.toLowerCase()} si poate fi corelat cu necesarul operational al clinicii, cabinetului sau laboratorului.`;
  product.romanianApplications = category.applications.map((item) => `Utilizare in ${item}`);
  product.romanianBenefits = [
    "Oferta personalizata in functie de aplicatie, cantitate si configuratie",
    "Clarificare tehnica inainte de achizitie",
    "Posibilitate de corelare cu service, mentenanta sau instalare",
  ];
  product.romanianFeatures = ["Configuratie verificata inainte de ofertare", "Suport comercial si tehnic ZESCORP", "Documentatie confirmata in functie de produs"];
  product.romanianPackageContents = ["Continutul pachetului se confirma in functie de configuratia solicitata"];
  product.romanianSpecifications = cleanSpecifications(product);
  product.installationConsiderations = [
    "Verificarea configuratiei si a accesoriilor necesare inainte de ofertare",
    "Corelarea produsului cu fluxul operational al spatiului medical",
    "Confirmarea termenului si a documentatiei disponibile pentru achizitie",
  ];
  product.maintenanceConsiderations = [
    "Suport pentru service si mentenanta in functie de tipul produsului",
    "Clarificarea consumabilelor sau accesoriilor recurente",
    "Recomandari pentru continuitate operationala si utilizare corecta",
  ];
  product.relatedServices = category.relatedServices;
  product.imageAlt = `${title} - produs medical pentru oferta ZESCORP`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({ ...image, alt: product.imageAlt, verified: true }));

  const score = scoreProduct(product, title);
  product.qualityScore = score.total;
  product.qualityBreakdown = score.breakdown;
  product.catalogStatus = score.total >= 90 && !publicContentHasEnglishLeak(product) ? "ready_for_publish" : "image_verified";
  product.publicDisplayReady = product.catalogStatus === "ready_for_publish";
  product.reviewStatus = product.publicDisplayReady ? "image_verified" : "translated";
  if (product.publicDisplayReady) {
    stats.repairedTitles += oldTitle !== title ? 1 : 0;
    stats.promoted += 1;
    if (stats.repairedTitleExamples.length < 35 && oldTitle !== title) {
      stats.repairedTitleExamples.push({ sku: product.gimaCode, before: oldTitle, after: title, category: category.label });
    }
  }
  return { promoted: product.publicDisplayReady, reason: product.publicDisplayReady ? "ready" : "below_score" };
}

function countWeak(products) {
  return products.filter((product) => !product.publicDisplayReady && product.imageStatus === "verified_local").length;
}

function countReady(products) {
  return products.filter((product) => product.catalogStatus === "ready_for_publish").length;
}

function countMissingImages(products) {
  return products.filter((product) => product.imageStatus !== "verified_local").length;
}

function collectCategoryCounts(products) {
  const categoryCounts = {};
  for (const product of products) {
    const category = product.category || "diagnostic";
    if (!categoryCounts[category]) categoryCounts[category] = { total: 0, ready: 0, missingImage: 0, weakTitle: 0, improved: 0 };
    categoryCounts[category].total += 1;
    if (product.catalogStatus === "ready_for_publish") categoryCounts[category].ready += 1;
    if (product.imageStatus !== "verified_local") categoryCounts[category].missingImage += 1;
    if (!product.publicDisplayReady && product.imageStatus === "verified_local") categoryCounts[category].weakTitle += 1;
  }
  return categoryCounts;
}

function buildReport({ products, before, after, stats, categoryCounts, remainingLeaks, brokenImages, brokenDocs }) {
  const rows = Object.entries(categoryCounts)
    .sort((a, b) => b[1].ready - a[1].ready)
    .map(([category, counts]) => `| ${categories[category]?.label || category} | ${counts.total} | ${counts.ready} | ${counts.missingImage} | ${counts.weakTitle} |`)
    .join("\n");
  const stillMissingImages = products.filter((product) => product.imageStatus !== "verified_local");
  const weakTitles = products.filter((product) => !product.publicDisplayReady && product.imageStatus === "verified_local");

  return `# GIMA Full Repair 02 Report

Generated: ${new Date().toISOString()}

## Summary

- Products in local catalog: ${products.length}
- ready_for_publish before repair 02: ${before.ready}
- ready_for_publish after repair 02: ${after.ready}
- Products promoted in this pass: ${after.ready - before.ready}
- Missing verified local images before: ${before.missingImages}
- Missing verified local images after: ${after.missingImages}
- Weak title/content rows before: ${before.weakTitles}
- Weak title/content rows after: ${after.weakTitles}
- Products still needs_review / below threshold: ${products.length - after.ready}
- Product pages indexable: ${products.filter((product) => product.reviewStatus === "indexable").length}
- Remaining English leakage detected by repair audit: ${remainingLeaks.length}
- Broken public images detected: ${brokenImages.length}
- Broken public documents detected: ${brokenDocs.length}

## Repair Actions

- No new products were imported.
- Alternate official GIMA image paths were checked in this order: \`/big/\`, \`/medium/\`, \`/thumb/\`.
- Products without a real verified local image remain below publish threshold.
- Weak/table-derived titles were repaired only when a specific Romanian product title could be generated from the source row.
- Generic titles such as \`Produs medical\` or category-only titles remain in review.
- The quality threshold stayed unchanged: score >= 90 and verified real image required for \`ready_for_publish\`.
- All products remain noindex; no product route is added to sitemap by this pass.

## Image Recovery

- Image requests attempted: ${stats.imageRequests}
- Real images recovered: ${stats.imagesRecovered}
- Image request failures: ${stats.imageFailures}

### Recovered Images

${stats.recoveredImages.slice(0, 120).map((item) => `- ${item.sku}: ${item.variant}, ${item.bytes} bytes, ${item.publicPath}`).join("\n") || "- No additional images recovered from alternate paths."}

## Title Repair Examples

${stats.repairedTitleExamples.map((item) => `- ${item.sku} (${item.category}): ${item.before} -> ${item.after}`).join("\n") || "- No title examples recorded."}

## Category Coverage After Repair 02

| Category | Total | Ready for publish | Missing image | Weak/title repair needed |
| --- | ---: | ---: | ---: | ---: |
${rows}

## Remaining Missing Images

${stillMissingImages
  .slice(0, 160)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.romanianTitle || product.sourceProductName}`)
  .join("\n")}

## Remaining Weak Titles / Content

${weakTitles
  .slice(0, 180)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.sourceProductName || product.romanianTitle}`)
  .join("\n")}

## Remaining Blockers

- Many missing-image rows appear to be catalog-table SKUs without a standard \`/images/prodotti/<variant>/<sku>.jpg\` asset.
- Some apparel, size-table and accessory-table rows still lack enough source context for a specific Romanian title.
- Some table-derived rows expose only size/color or related code lists; those remain in review to avoid generic or misleading product pages.
- Image recovery should next use direct product-page HTML parsing where pages return valid product detail content; this pass intentionally avoided introducing non-standard source guesses.

## Recommendation

The catalog is improved but still not ready for indexation. Continue with a source-context repair pass for table-heavy categories, especially operator protection, furniture/apparel rows, emergency accessories and surgical consumable tables.
`;
}

function auditBrokenImages(products) {
  const broken = [];
  for (const product of products) {
    if (product.imageStatus !== "verified_local") continue;
    for (const image of product.galleryImages || []) {
      if (!fileExists(image.url)) broken.push({ sku: product.gimaCode, url: image.url });
    }
  }
  return broken;
}

function auditBrokenDocs(products) {
  const broken = [];
  for (const product of products) {
    for (const href of Object.values(product.documents || {})) {
      if (!fileExists(href)) broken.push({ sku: product.gimaCode, href });
    }
  }
  return broken;
}

function auditLeaks(products) {
  return products
    .filter((product) => product.publicDisplayReady && publicContentHasEnglishLeak(product))
    .slice(0, 200)
    .map((product) => ({ sku: product.gimaCode, title: product.romanianTitle }));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const before = {
    ready: countReady(products),
    missingImages: countMissingImages(products),
    weakTitles: countWeak(products),
  };
  const stats = {
    imageRequests: 0,
    imagesRecovered: 0,
    imageFailures: 0,
    repairedTitles: 0,
    promoted: 0,
    recoveredImages: [],
    repairedTitleExamples: [],
  };

  const imageCandidates = products.filter((product) => product.catalogStatus !== "ready_for_publish" && product.imageStatus !== "verified_local");
  let cursor = 0;
  const workerCount = 12;
  async function worker() {
    while (cursor < imageCandidates.length) {
      const product = imageCandidates[cursor];
      cursor += 1;
      await recoverImage(product, stats);
    }
  }
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  const usedSlugs = new Set(
    products
      .filter((product) => product.catalogStatus === "ready_for_publish" && !publicContentHasEnglishLeak(product))
      .map((product) => product.slug)
      .filter(Boolean)
  );
  for (const product of products) {
    if (product.catalogStatus === "ready_for_publish" && !publicContentHasEnglishLeak(product)) continue;
    applyContentRepair(product, usedSlugs, stats);
  }

  products.sort((a, b) => String(a.gimaCode || "").localeCompare(String(b.gimaCode || "")));
  const after = {
    ready: countReady(products),
    missingImages: countMissingImages(products),
    weakTitles: countWeak(products),
  };
  const brokenImages = auditBrokenImages(products);
  const brokenDocs = auditBrokenDocs(products);
  const remainingLeaks = auditLeaks(products);
  const categoryCounts = collectCategoryCounts(products);

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(reportPath, buildReport({ products, before, after, stats, categoryCounts, remainingLeaks, brokenImages, brokenDocs }));
  console.log(JSON.stringify({ before, after, stats: { ...stats, recoveredImages: stats.recoveredImages.length, repairedTitleExamples: stats.repairedTitleExamples.length }, brokenImages: brokenImages.length, brokenDocs: brokenDocs.length, remainingLeaks: remainingLeaks.length }, null, 2));
}

main();
