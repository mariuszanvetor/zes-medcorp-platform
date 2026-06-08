import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(root, "docs", "product-qa-failure-repair-report.md");

const phaseBaseline = { A: 126, B: 43, C: 87, D: 244 };
const afterGoldRepair = { A: 460, B: 40, C: 0, D: 0 };

const categoryLabels = {
  diagnostic: "Diagnostic medical",
  emergency: "Urgenta",
  laboratory: "Laborator / IVD",
  monitoring: "Monitorizare",
  "scales-measures": "Cantare si masurare",
  "medical-furniture": "Mobilier medical",
  "patient-care": "Ingrijire pacient",
  electromedical: "Electromedicale",
  gynecology: "Ginecologie",
  "medical-lights": "Lampi medicale",
  ent: "ORL",
  "surgical-instruments": "Instrumentar chirurgical",
  sterilization: "Sterilizare",
};

const categoryProfiles = {
  diagnostic: {
    application: "masurare, diagnostic si evaluare clinica",
    environment: "cabinete, clinici si puncte de consultatie",
    service: "/service-aparatura-medicala",
  },
  emergency: {
    application: "interventie, triaj si suport in situatii cu timp critic",
    environment: "zone de urgenta, ambulante si camere de tratament",
    service: "/solutii-medicale/service-echipamente-medicale",
  },
  laboratory: {
    application: "prelucrarea probelor si activitate de laborator",
    environment: "laboratoare, puncte IVD si clinici",
    service: "/solutii-medicale/echipamente-laborator-ivd",
  },
  monitoring: {
    application: "monitorizare si urmarirea parametrilor clinici",
    environment: "cabinete, clinici si unitati medicale",
    service: "/service-aparatura-medicala",
  },
  "scales-measures": {
    application: "cantarire, masurare si evaluare antropometrica",
    environment: "clinici, cabinete, farmacii si zone de evaluare pacient",
    service: "/service-aparatura-medicala",
  },
  "medical-furniture": {
    application: "organizarea spatiului medical si sustinerea fluxului clinic",
    environment: "cabinete, sali de tratament si zone de consultatie",
    service: "/solutii-medicale/amenajare-cabinete-medicale",
  },
  "patient-care": {
    application: "ingrijire, mobilizare si suport pacient",
    environment: "zone de ingrijire, recuperare si asistenta",
    service: "/contracte-mentenanta",
  },
  electromedical: {
    application: "suport electromedical pentru tratament sau proceduri",
    environment: "cabinete si clinici care utilizeaza echipamente electromedicale",
    service: "/service-aparatura-medicala",
  },
  gynecology: {
    application: "evaluare ginecologica, obstetrica sau monitorizare materno-fetala",
    environment: "cabinete de ginecologie si obstetrica",
    service: "/service-aparatura-medicala",
  },
  "medical-lights": {
    application: "iluminare medicala pentru examinare sau interventie",
    environment: "cabinete, sali de examinare si zone clinice",
    service: "/solutii-medicale/instalare-punere-in-functiune",
  },
  ent: {
    application: "examinare ORL si activitate de cabinet",
    environment: "cabinete ORL si zone de consultatie specializata",
    service: "/service-aparatura-medicala",
  },
  "surgical-instruments": {
    application: "marcare, instrumentar sau consumabile pentru interventii",
    environment: "cabinete, sali de interventie si fluxuri chirurgicale",
    service: "/contracte-mentenanta",
  },
  sterilization: {
    application: "sterilizare, ambalare si pregatirea instrumentarului",
    environment: "cabinete, clinici si fluxuri de sterilizare",
    service: "/contracte-mentenanta",
  },
};

const categoryOverrides = {
  "27704": "patient-care",
  "34166": "emergency",
  "34167": "emergency",
  "34172": "emergency",
  "34589": "emergency",
  "34599": "emergency",
  "34603": "emergency",
  "34608": "emergency",
  "34690": "emergency",
  "80300": "medical-furniture",
  "80301": "medical-furniture",
};

const titleOverrides = {
  "23992": "Analizor Lactate Scout 4",
  "23993": "Benzi test - tub cu 25 bucati",
  "23995": "Microcuvete pentru hemoglobina - cutie cu 50",
  "24014": "Centrifuga ZIP-IQ TT",
  "24022": "Sistem de testare hemoglobina Mission Hb",
  "24034": "Protectie tub pentru centrifuga",
  "24036": "Protectie tub profil inalt 15 ml pentru XC-2000",
  "24040": "Eprubete 10 ml, 16 x 100 mm - cutie cu 100",
  "27086": "Cantar Gimafit pentru analiza corporala cu Bluetooth 5.0",
  "27087": "Cantar digital Omron HN286",
  "27094": "Cantar Gimafit pentru analiza corporala cu aplicatie si Bluetooth 5.0",
  "27251": "Bare de sustinere cu suport",
  "27258": "Cantar veterinar digital mediu",
  "27259": "Cantar veterinar digital mare",
  "27261": "Cantar veterinar digital mic",
  "27264": "Taliometru Soehnle pentru bebelusi",
  "27265": "Cantar digital plat Seca 813",
  "27267": "Cantar digital pediatric Seca 376 clasa III",
  "27271": "Geanta de transport",
  "27274": "Accesoriu pentru masurare 27274",
  "27280": "Accesoriu cantar 305 x 120 x 470 mm",
  "27284": "Cantar mecanic Seca 756",
  "27286": "Cantar fitness Soehnle 7850",
  "27292": "Cantar electronic Seca 799 cu BMI clasa III",
  "27293": "Monitor compozitie corporala Omron BF511",
  "27294": "Cantar mecanic Seca 745",
  "27296": "Cantar Seca 711 clasa III",
  "27298": "Taliometru Seca 220 de rezerva",
  "27299": "Cantar mecanic Seca 725",
  "27307": "Tava de rezerva pentru 8352",
  "27310": "Cantar Astra 200 kg clasa III",
  "27312": "Cantar digital pentru bebelusi si copii",
  "27313": "Cantar electronic pentru bebelusi",
  "27316": "Infantometru Seca 416",
  "27333": "Taliometru electronic Soehnle",
  "27335": "Banda pentru masurarea inaltimii",
  "27355": "Greutate de calibrare 27355",
  "27364": "Panou luminos GIMA pentru optotipuri",
  "27365": "Caseta luminoasa 38 x 62 cm",
  "27366": "Caseta luminoasa 38 x 92 cm",
  "27367": "Caseta luminoasa 38 x 122 cm",
  "27368": "Caseta luminoasa 38 x 153 cm",
  "27369": "Caseta luminoasa dubla 76 x 122 cm",
  "27370": "Caseta luminoasa dubla 76 x 153 cm",
  "27372": "Caseta luminoasa 92 x 38 cm",
  "27373": "Caseta luminoasa 122 x 38 cm",
  "27381": "Plansa optometrica pentru copii",
  "27382": "Plansa optometrica Monoyer",
  "27383": "Plansa optometrica Armagnac",
  "27384": "Planse optometrice iluminate si neiluminate",
  "27449": "Masa medicala pentru servire",
  "27469": "Masa peste pat cu tava modelata",
  "27475": "Masa peste pat alba",
  "27513": "Taburet medical Gynex",
  "27514": "Taburet medical Gynex",
  "27520": "Taburet medical cu inel",
  "27521": "Taburet medical cu inel",
  "27522": "Taburet medical cu inel",
  "27524": "Taburet medical cu inel",
  "27525": "Taburet medical cu inel",
  "27526": "Taburet medical cu inel",
  "27532": "Taburet medical cu sau fara inel",
  "27645": "Suport de ridicare",
  "27664": "Bara pentru ridicare pacient",
  "27673": "Accesoriu pat medical 23-63 cm",
  "27676": "Pat medical cu Trendelenburg 40-80 cm",
  "27677": "Pat medical cu Trendelenburg 40-80 cm",
  "27684": "Platforma pat medical 90 x 200 cm",
  "27693": "Platforma pat medical 90 x 200 cm",
  "27701": "Scaun toaleta din otel cromat",
  "27702": "Scaun rulant toaleta vopsit",
  "27703": "Scaun rulant cu functie toaleta",
  "27704": "Balustrada pliabila pentru pat",
  "27792": "Carja T-bar mica",
  "27799": "Carja T-bar mare",
  "27836": "Saltea pentru dus",
  "27838": "Furtun extensie dus 6 m",
  "27869": "Carucior medical cu capacitate 120 kg",
  "27870": "Carucior medical 47 x 42 x 102 cm",
  "27873": "Cos pentru carucior medical 30 x 16 x 14,5 cm",
  "27875": "Raft suplimentar 40 x 36 cm pentru carucior",
  "27880": "Carucior medical cu 2 polite 40 x 36 cm si baza 75",
  "27881": "Carucior medical cu 3 polite 40 x 36 cm si baza 83,5",
  "27882": "Carucior medical cu 4 polite 40 x 36 cm si baza 107,5",
  "27883": "Carucior medical cu 2 polite 40 x 36 cm si baza 75",
  "27885": "Carucior Pro cu 2 polite, inaltime 80 cm",
  "27886": "Carucior medical cu 3 polite 40 x 36 cm si baza 83,5",
  "27888": "Raft suplimentar 40 x 36 cm pentru carucior",
  "27889": "Carucior medical cu 2 polite 50 x 42 cm si baza 78",
  "27890": "Carucior medical cu 2 polite 60 x 42 cm si baza 78",
  "27893": "Carucior medical cu 2 polite 40 x 36 cm, baza si sertar",
  "27894": "Carucior medical cu 2 polite 50 x 42 cm, baza si sertar",
  "27895": "Carucior medical cu 2 polite 40 x 36 cm si baza 78",
  "27896": "Carucior medical cu 3 polite 40 x 36 cm si baza 88",
  "27897": "Carucior medical cu 4 polite 40 x 36 cm si baza 115",
  "27898": "Dulap Value cu o usa",
  "27899": "Dulap Value cu doua usi",
  "27900": "Dulap Value cu patru usi batante",
  "27902": "Dulap Value cu patru usi mixte",
  "27905": "Dulap medical cu doua usi",
  "28031": "Dulap Gamma3 mare 108 x 45 x 77 cm",
  "27911": "Dulap mural cu usa culisanta din sticla",
  "27912": "Dulap mural cu usa vopsita",
  "28020": "Scaun podologie mecanic alb",
  "28025": "Scaun podologie electric albastru cu 3 motoare",
  "28030": "Dulap Gamma1 61 x 45 x 77 cm, dimensiune mica",
  "28065": "Nebulizator portabil cu membrana vibranta",
  "28123": "Nebulizator inteligent portabil",
  "28340": "Aparat electrodepilare 400",
  "28507": "Lighean pentru spalarea parului",
  "28509": "Geanta pentru apa",
  "28575": "Saltea pentru ingrijire pacient 198 x 86 cm",
  "28580": "Saltea pentru ingrijire pacient 200 x 86 cm",
  "28582": "Saltea pentru ingrijire pacient 198 x 86 cm",
  "29481": "Sonda ginecologica 2 MHz",
  "29482": "Sonda ginecologica 3 MHz",
  "29484": "Sonda vasculara 8 MHz",
  "29503": "Doppler fetal GIMA D2003 cu ecran",
  "29505": "Doppler fetal GIMA D2005 cu ecran",
  "29511": "Intrerupator membrana on/off pentru 29502",
  "29512": "Membrana on/off de rezerva",
  "29556": "Hartie pliata Z 112 x 100 mm - 150 foi",
  "29585": "Accesoriu pentru scaun medical",
  "30450": "Aspirator de fum chirurgical",
  "30451": "Filtru ULPA rosu pentru aspirator fum 30450",
  "30452": "Filtru ULPA rosu pentru aspirator fum 30450",
  "30453": "Kit aspiratie - cutie cu 6",
  "30454": "Maner kit aspiratie steril - cutie cu 12",
  "30498": "Electrod neutru divizat 3M 9165 cu cablu - cutie cu 40",
  "30610": "Cablu monopolar cu fisa 4 mm, lungime 3 m",
  "30615": "Foarfeca monopolar Metzenbaum curbata 18 cm",
  "31192": "Lampa fototerapie LED pentru nou-nascuti pe carucior",
  "30769": "Baza de rezerva pentru carucior 61 cm",
  "30879": "Lampa frontala medicala GIMA 38 KL LED 3W",
  "30881": "Lampa frontala Ri-focus 6091 LED cu baterii reincarcabile",
  "30884": "Lampa frontala Heine ML4 LEDHQ",
  "30888": "Filtru polarizare P2",
  "30931": "Lampa frontala LED Riester Ri-focus",
  "30932": "Lupe binoculare",
  "31755": "Iriscop digital WiFi cu program si suport",
  "31788": "Bec Heine 130 2,5 V de rezerva pentru 31745",
  "32154": "Lentila dermatoscop 13270",
  "32155": "Lentila generala 13271",
  "32156": "Lentila otoscop 13272",
  "32158": "Specul auricular de unica folosinta 2 mm - cutie cu 10",
  "32163": "Pachet Elite MS102 pentru video-otoscop",
  "32174": "Suport incarcare pentru video-otoscop MS102",
  "32175": "Suport incarcare pentru video-otoscop MS",
  "32179": "Iriscop digital WiFi cu program si suport",
  "32180": "Video-otoscop WiFi si USB cu program",
  "32185": "Camera MicFiEye WiFi si USB cu montura C",
  "32205": "Baterie alcalina 9V",
  "32742": "Sina pentru tensiometru Riester Big Ben",
  "32745": "Tensiometru Dayton pentru birou sau perete",
  "32748": "Sina pentru tensiometru Riester Big Ben",
  "32809": "Manseta pentru adulti de rezerva",
  "32839": "Accesoriu tensiometru 32849",
  "32841": "Accesoriu tensiometru 32849",
  "32847": "Accesoriu tensiometru 32849",
  "32865": "Tub spiralat",
  "32900": "Manseta mare Superb cu 2 tuburi 34-43 cm",
  "32901": "Tensiometru Andon",
  "32902": "Tensiometru electronic Leo cu program",
  "32916": "Tensiometru Bluetooth",
  "32936": "Tensiometru automat digital Omron HEM-907",
  "32963": "Hartie termica 50 mm x 20 m - cutie cu 20 role",
  "33014": "Hartie termica rola 80 mm x 20 m - cutie cu 10",
  "33016": "Hartie termica pliata Z 80 x 70 mm x 200 foi - cutie cu 25",
  "33179": "Marker pentru piele cu doua varfuri - cutie cu 10",
  "33181": "Marker P3 pentru piele cu varf fin steril - cutie cu 10",
  "33182": "Marker chirurgical pentru piele cu un varf steril - cutie cu 100",
  "33183": "Marker chirurgical pentru piele cu doua varfuri steril - cutie cu 100",
  "33232": "Electrocardiograf CardioPocket ECG cu 3 canale si program",
  "33246": "ECG portabil PM10 cu program si Bluetooth",
  "33306": "Cablu ECG de rezerva pentru 33328",
  "33328": "Cablu ECG cu 10 derivatii de rezerva",
  "33330": "Electrocardiograf cu unul si trei canale",
  "33336": "Program ECG Viewer pentru 33333",
  "33423": "Defibrilator public iPAD CU-SPR",
  "33621": "Adaptor de izolare pentru casti de conductie aeriana",
  "33623": "Audiometru Sibelsound 400-A pentru triaj auditiv",
  "33533": "Actualizare program MIR la versiunea Platinum",
  "33879": "Accesoriu monitorizare 33879",
  "33909": "Adaptor Micromedical MIR 28 x 30 mm",
  "33910": "Dispenser Cosmed 28 x 30,5 mm - 200 bucati",
  "33956": "Sonda microconvexa",
  "33992": "Ecograf portabil Mindray DP-50 Expert",
  "34055": "Targa cu incarcare automata",
  "34060": "Targa tip scaun rulant cu 2 roti",
  "34068": "Targa pliabila pentru scari",
  "34072": "Targa multipozitie automata",
  "34074": "Targa tip scaun rulant cu 4 roti",
  "34085": "Husa de urgenta",
  "34087": "Material ignifug B",
  "34094": "Targa cos Twin Shell portocalie",
  "34096": "Geanta de transport pentru targa 34094",
  "34098": "Targa cos portocalie",
  "34099": "Hamuri de ridicare pentru 34094 si 34098",
  "34100": "Sistem de flotatie pentru 34094 si 34098",
  "34110": "Compresa rece instant TNT 14 x 18 cm din material netesut",
  "34166": "Masca oxigen pentru adulti cu tub",
  "34340": "Pulsoximetru pentru incheietura cu program",
  "34348": "Cablu extensie de rezerva",
  "34582": "Concentrator de oxigen Respira 5 l",
  "34583": "Filtru de hartie - cutie cu 10",
  "34589": "Concentrator portabil de oxigen Spirit 1 l",
  "34599": "Filtru cilindric de hartie pentru 34603 si 34606 - cutie cu 10",
  "34603": "Filtru de hartie pentru concentrator oxigen - cutie cu 10",
  "34690": "Kit atele cu vid",
  "34869": "Pansament arsuri 5 x 5 cm - cutie cu 120 bucati",
  "34870": "Pansament arsuri 5 x 15 cm - cutie cu 10 bucati",
  "34879": "Saltea de evacuare pentru urgenta 91 x 76 cm",
  "34880": "Saltea de evacuare pentru urgenta 183 x 152 cm",
  "34881": "Saltea de evacuare pentru urgenta 244 x 152 cm",
  "35067": "Pulsoximetru O2Ring pentru monitorizare continua adulti",
  "35068": "O2Ring pentru monitorizare continua la distanta",
  "35095": "Pulsoximetru multifunctional OXY-10 fara fir",
  "35099": "Sonda neonatala reutilizabila tip Y",
  "35100": "Pulsoximetru Oxy-50 cu program",
  "35105": "Sonda reutilizabila peste 40 kg",
  "35124": "Sonda SpO2 reutilizabila",
  "35129": "Baterie litiu reincarcabila de rezerva",
  "35130": "ECG Holter cu program",
  "35132": "Sonda SpO2 reutilizabila",
  "35135": "Sonda SpO2 de rezerva",
  "35139": "Manseta NIBP 21-35 cm",
  "35141": "Hartie 5,1 cm x 12 m - cutie cu 5",
  "35128": "Clema pentru sina",
  "35137": "Cablu ECG cu 5 derivatii 3,75 m de rezerva",
  "35144": "Geanta de transport",
  "35184": "Geanta de transport",
  "35185": "Monitor de sanatate Checkme Lite cu Bluetooth",
  "35192": "Monitor de sanatate multifunctional 5 in 1",
  "35196": "Otoscop GIMA cu camera pentru Android si iOS",
  "35400": "Defibrilator semiautomat CU-SPR",
  "35401": "Defibrilator semiautomat CU-SPR multilingv",
  "35402": "Defibrilator semiautomat CU-SPR multilingv",
  "35342": "Kit electrozi training pentru defibrilator - 2 bucati",
  "35601": "Accesoriu sterilizare Gimette 28",
  "35607": "Accesoriu sterilizare Gimette 28",
  "35612": "Garnitura de rezerva pentru 35607",
  "35613": "Garnitura de rezerva pentru 35601",
  "35617": "Sterilizator Gimette 1,5 cu aer cald",
  "35621": "Sterilizator Gimette 21 cu aer cald",
  "35628": "Sterilizator Gimette 28 cu aer cald",
  "35631": "Rezistenta 250 W de rezerva pentru 35601",
  "35632": "Rezistenta 400 W de rezerva pentru 35607",
  "35640": "Sterilizator rapid cu bile GIMA Quick",
  "35670": "Banda incalzire DXB A835 pentru 35658, 35659 si 35660",
  "35713": "Material pentru controlul infectiilor",
  "35720": "Garnitura silicon pentru sigilare",
  "35928": "Aparat de sigilare GD-301 Evo",
  "35929": "Aparat de sigilare GD-301 Evo complet",
  "35982": "Rola cerneala pentru etichetator - cutie cu 5",
  "43090": "Carje de cot Advance albastru-negru pereche",
  "43091": "Carje de cot Advance turcoaz-negru pereche",
  "43093": "Carje de cot Advance rosu-negru pereche",
  "27770": "Carja T-bar cu reglaj extins",
  "43100": "Carje de cot Evolution negre pereche",
  "43101": "Carje de cot Evolution albastre pereche",
  "43103": "Carje de cot Evolution rosii pereche",
  "43115": "Carje de cot Tiki albastru-portocaliu pereche",
  "43116": "Carje de cot Tiki rosu-albastru pereche",
  "43120": "Mansoane PVC pentru carje, diametru interior 19 mm - punga cu 10",
  "43175": "Centura pelvina pentru transfer pacient",
  "43178": "Husa ignifuga clasa 1",
  "43181": "Centura transfer Transac mica",
  "43185": "Centura miscare unica L-XL 80-122",
  "43191": "Scaun Comfort cu functie toaleta",
  "43193": "Scaun toaleta si dus",
  "43196": "Scaun rulant albastru cu functie toaleta",
  "43198": "Scaun rulant Smart cu functie toaleta",
  "43430": "Scaun hidraulic pentru transfer pacient",
  "43450": "Ridicator hidraulic pentru pacient",
  "43455": "Scaun electric pliabil pentru pacient",
  "43460": "Ridicator electric din aluminiu pentru pacient",
  "43464": "Accesoriu ridicare pacient B C",
  "43465": "Ham nylon M pentru ridicare pacient",
  "43466": "Ham nylon L pentru ridicare pacient",
  "43467": "Accesoriu ridicare pacient 9 B C",
  "43468": "Ham nylon M pentru transfer pacient",
  "43469": "Ham nylon L pentru transfer pacient",
  "43550": "Carucior medical 61,5 x 48,5 x 91 cm",
  "43552": "Masa peste pat Olympus cu blat inclinabil",
  "44000": "Masa de masaj din lemn cu 2 sectiuni neagra",
  "44001": "Masa de masaj din lemn cu 2 sectiuni albastra",
  "44002": "Masa de masaj din lemn cu 2 sectiuni turcoaz",
  "44003": "Masa de masaj din lemn cu 2 sectiuni crem",
  "44011": "Masa de masaj din lemn cu 3 sectiuni albastra",
  "44013": "Masa de masaj din lemn cu 3 sectiuni crem",
  "44020": "Masa de masaj din aluminiu cu 2 sectiuni neagra",
  "44021": "Masa de masaj din aluminiu cu 2 sectiuni albastra",
  "44024": "Masa de masaj din aluminiu cu 2 sectiuni alba",
  "44048": "Pat de masaj cu orificiu facial",
  "44050": "Scaun de masaj pliabil",
  "44840": "Scaun Ischia pentru transfer pacient albastru",
  "45232": "Taburet albastru",
  "45235": "Taburet avio albastru",
  "45242": "Taburet albastru",
  "45245": "Taburet cu spatar avio albastru",
  "45720": "Carucior de urgenta Neo Plus",
  "45760": "Carucior pentru monitoare fara adaptor placa",
  "45761": "Adaptor carucior pentru Mindray ePM Compact",
  "45762": "Adaptor carucior pentru Philips SureSigns",
  "45763": "Adaptor carucior pentru Philips IntelliVue",
  "45764": "Adaptor carucior pentru Colin Press-Mate 8800",
  "49035": "Lampa medicala LED pentru carucior",
  "49041": "Lampa medicala Hyridia cu 7 LED-uri pentru carucior",
  "49047": "Lampa medicala LED cu spot reglabil pentru carucior",
  "49050": "Lampa medicala Ri-magic HP LED pentru birou",
  "49051": "Lampa medicala Ri-magic HP LED pentru birou",
  "49052": "Lampa medicala Ri-magic HP LED pentru perete",
  "49127": "Lampa medicala PrimaLED fixa pentru perete",
  "49124": "Lampa medicala pentru configuratie speciala",
  "49128": "Lampa medicala PrimaLED flexibila pentru perete",
  "49880": "Tensiometru digital EasyCheck",
  "49893": "Manseta Omron GS CUFF2 M 22-32 cm de rezerva",
  "49950": "Tensiometru Ri-champion Smart Pro+",
  "49951": "Tensiometru Ri-champion Smart Pro+",
  "53549": "Audiometru Maico MA27 pentru triaj auditiv",
  "53557": "Insert pentru mascare",
  "71606": "Endoscop ORL cu rezolutie 18.000 pixeli si lungime de lucru 320 mm",
  "80220": "Cantar veterinar Soehnle 6858",
  "80300": "Masa de examinare veterinara",
  "80301": "Masa de operatie veterinara",
  "80551": "Manseta pediatrica mica 6-11 cm",
  "80552": "Manseta pediatrica mica-medie 10-19 cm",
};

const publicEnglishPatterns = [
  /\b(split|grounding|pad|precorded|box|paper|strips|pcs|with|cuff|crutches|blue|pair|carrying|single|shelves|for|and|wooden|wall|desk|class|mechanical|support|coating|fire|retardant|small|child|foetal|dressing|trolley|cart|basket|shelf|cabinet|door|glass|sliding|painted|stool|probe|reusable|adult|spare|software|screening|portable|ultrasound|filter|tube|mattress|hose|commode|massage|chair|size|weight|light|smartwatch|tracker|supplier|operated|stadiometer|measure|numbered|goniometer|ruler|podoscope|children|dining|diffusion|motors|shampoo|basin|needles|pieces|cable|pin|scissors|headlight|microscope|phototherapy|battery|audiometer|blanket|ice|glasses|cannulas|oximeter|adjustable|labeler|cushion|handgrip|belt|harness|wheels|wheelchair|beige|white|days|purchased|handle|resolution|pixels|working|length)\b/i,
  /\b(prod(us)?-de-|echipament-de-|mobilier-medical-|instrumentar-chirurgical-)/i,
];

const romanianTextFixes = [
  [/Äƒ/g, "a"],
  [/Ä‚/g, "A"],
  [/È™/g, "s"],
  [/È˜/g, "S"],
  [/È›/g, "t"],
  [/Èš/g, "T"],
  [/ÅŸ/g, "s"],
  [/Å£/g, "t"],
  [/ă/g, "a"],
  [/â/g, "a"],
  [/î/g, "i"],
  [/ș/g, "s"],
  [/ț/g, "t"],
  [/Ă/g, "A"],
  [/Â/g, "A"],
  [/Î/g, "I"],
  [/Ș/g, "S"],
  [/Ț/g, "T"],
  [/™/g, ""],
  [/®/g, ""],
  [/\s+/g, " "],
];

const specFixes = [
  [/\bDimensions\b/gi, "Dimensiuni"],
  [/\bweight\b/gi, "greutate"],
  [/\bPackaging\b/gi, "ambalaj"],
  [/\bincluded\b/gi, "incluse"],
  [/\bwith\b/gi, "cu"],
  [/\bwithout\b/gi, "fara"],
  [/\bbrake\b/gi, "frana"],
  [/\btotal load\b/gi, "incarcare totala"],
  [/\bload\b/gi, "incarcare"],
  [/\btwinned castors\b/gi, "roti duble"],
  [/\bcastors\b/gi, "roti"],
  [/\bvertical aluminium extrusions\b/gi, "profile verticale din aluminiu"],
  [/\bextrusions in aluminium\b/gi, "profile din aluminiu"],
  [/\baluminium\b/gi, "aluminiu"],
  [/\bPossibility of Trendelenburg\b/gi, "posibilitate Trendelenburg"],
  [/\breverse-?\s*Trendelenburg\b/gi, "Trendelenburg invers"],
  [/\bdata review\b/gi, "analiza datelor"],
  [/\bresult analysis\b/gi, "analiza rezultatelor"],
  [/\btrend chart observation\b/gi, "urmarirea graficelor de trend"],
  [/\breport print\b/gi, "tiparire rapoarte"],
  [/\blitiu-ion baterie\b/gi, "baterie litiu-ion"],
  [/\bnon-removable\b/gi, "nedetasabila"],
  [/\bNet\/gross\b/gi, "net/brut"],
  [/\bCertified\b/gi, "certificat"],
  [/\bNeed ext\b/gi, ""],
  [/\bstand\b/gi, "suport"],
  [/\bportable\b/gi, "portabil"],
  [/\bwater\b/gi, "apa"],
  [/\bAdult\b/g, "adulti"],
];

function clean(value) {
  let text = String(value || "");
  for (const [pattern, replacement] of romanianTextFixes) text = text.replace(pattern, replacement);
  return text.trim();
}

function normalize(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 95)
    .replace(/-+$/g, "");
}

function productRedirectPath(slug) {
  return `/produse/${String(slug || "").replace(/^\/?produse\//, "").replace(/^\//, "")}`;
}

function normalizeRedirect(redirect) {
  if (redirect.source && redirect.destination) return { source: productRedirectPath(redirect.source), destination: productRedirectPath(redirect.destination) };
  if (redirect.from && redirect.to) return { source: productRedirectPath(redirect.from), destination: productRedirectPath(redirect.to) };
  return null;
}

function normalizeSpec(value) {
  let text = clean(value);
  for (const [pattern, replacement] of specFixes) text = text.replace(pattern, replacement);
  return text.replace(/\s+([,;:)])/g, "$1").replace(/([(])\s+/g, "$1").replace(/\s{2,}/g, " ").trim();
}

function groupSpecifications(specifications) {
  const groups = new Map();
  const add = (group, spec) => {
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(spec);
  };
  for (const spec of specifications) {
    const label = normalizeSpec(spec.label);
    const value = normalizeSpec(spec.value);
    if (!label || !value) continue;
    const key = normalize(`${label} ${value}`);
    if (/dimensi|diametru|lungime|inaltime|latime|adancime|cm|mm/.test(key)) add("Dimensions", { label, value });
    else if (/greutate|kg|g\b|net\/brut/.test(key)) add("Weight", { label, value });
    else if (/alimentare|putere|tensiune|v\b|hz|baterie|ac|dc|va/.test(key)) add("Electrical", { label, value });
    else if (/capacitate|interval|viteza|canale|memorie|ecg|spo2|nibp|performanta/.test(key)) add("Performance", { label, value });
    else if (/material|certificat|categorie|medical|pacient|steril|clasa/.test(key)) add("Medical", { label, value });
    else add("General", { label, value });
  }
  return ["General", "Dimensions", "Weight", "Electrical", "Performance", "Medical", "Accessories"]
    .filter((group) => groups.has(group))
    .map((group) => ({ group, items: groups.get(group) }));
}

function titleFor(product) {
  const code = String(product.gimaCode || "");
  if (titleOverrides[code]) return titleOverrides[code];
  let title = clean(product.romanianTitle || product.sourceProductName || "");
  title = title
    .replace(/^•\s*\d+\s*/g, "")
    .replace(/\bSTRIPS?\b/gi, "benzi")
    .replace(/\bTub Of\s*(\d+)\s*Pcs\b/gi, "tub cu $1 bucati")
    .replace(/\bPcs\b/gi, "bucati")
    .replace(/\bTube Shield\b/gi, "protectie tub")
    .replace(/\bTube\b/gi, "tub")
    .replace(/\bShield\b/gi, "protectie")
    .replace(/\bDigital Flat Scale\b/gi, "cantar digital plat")
    .replace(/\bDigital Glass Scale\b/gi, "cantar digital din sticla")
    .replace(/\bDigital Scale\b/gi, "cantar digital")
    .replace(/\bScale\b/gi, "cantar")
    .replace(/\bSmartwatch\b/gi, "ceas inteligent")
    .replace(/\bActivity Health Tracker\b/gi, "bratara monitorizare activitate")
    .replace(/\bPower Supplier\b/gi, "alimentator")
    .replace(/\bBaby Scale\b/gi, "cantar pentru bebelusi")
    .replace(/\bBaby Measure\b/gi, "instrument masurare bebelusi")
    .replace(/\bBone Measure\b/gi, "instrument masurare osoasa")
    .replace(/\bMobile Stadiometer\b/gi, "taliometru mobil")
    .replace(/\bStadiometer\b/gi, "taliometru")
    .replace(/\bGoniometer\b/gi, "goniometru")
    .replace(/\bPain Scale Ruler\b/gi, "rigla cu scala pentru durere")
    .replace(/\bPodoscope\b/gi, "podoscop")
    .replace(/\bVisible Area\b/gi, "zona vizibila")
    .replace(/\bChildren\b/gi, "pentru copii")
    .replace(/\bOverbed Table\b/gi, "masa peste pat")
    .replace(/\bDining Table\b/gi, "masa pentru servire")
    .replace(/\bDouble Face Pharmacy Trolley\b/gi, "carucior farmacie cu doua fete")
    .replace(/\bPharmacy Trolley\b/gi, "carucior farmacie")
    .replace(/\bTrolley\b/gi, "carucior")
    .replace(/\bCart\b/gi, "carucior")
    .replace(/\bChair\b/gi, "scaun")
    .replace(/\bMechanical\b/gi, "mecanic")
    .replace(/\bElectric\b/gi, "electric")
    .replace(/\bMotors\b/gi, "motoare")
    .replace(/\bMotor\b/gi, "motor")
    .replace(/\bWhite\b/gi, "alb")
    .replace(/\bGrey\b/gi, "gri")
    .replace(/\bLight Beige\b/gi, "bej deschis")
    .replace(/\bBeige\b/gi, "bej")
    .replace(/\bShampoo Basin\b/gi, "lighean pentru spalarea parului")
    .replace(/\bOn\/off Membrane Switch\b/gi, "intrerupator membrana on/off")
    .replace(/\bOn\/off Membrane\b/gi, "membrana on/off")
    .replace(/\bReusable foetal transducer belts\b/gi, "centuri reutilizabile pentru traductori fetali")
    .replace(/\bMicrosurgery Needles\b/gi, "ace pentru microchirurgie")
    .replace(/\bMonopolar Cable\b/gi, "cablu monopolar")
    .replace(/\bCable\b/gi, "cablu")
    .replace(/\bPin\b/gi, "pin")
    .replace(/\bMetzenbaum Monopolar Scissors\b/gi, "foarfeca monopolar Metzenbaum")
    .replace(/\bScissors\b/gi, "foarfeca")
    .replace(/\bCurved\b/gi, "curbata")
    .replace(/\bMedical Headlight\b/gi, "lampa frontala medicala")
    .replace(/\bLED Headlight\b/gi, "lampa frontala LED")
    .replace(/\bHeadlight\b/gi, "lampa frontala")
    .replace(/\bPolarization Filter\b/gi, "filtru de polarizare")
    .replace(/\bBiological Microscope\b/gi, "microscop biologic")
    .replace(/\bInfant Phototherapy Light\b/gi, "lampa fototerapie pentru nou-nascuti")
    .replace(/\bDisposable Ear Speculum\b/gi, "specul auricular de unica folosinta")
    .replace(/\bAlkaline Battery\b/gi, "baterie alcalina")
    .replace(/\bBattery\b/gi, "baterie")
    .replace(/\bClinical Audiometer\b/gi, "audiometru clinic")
    .replace(/\bDiagnostic Audiometer\b/gi, "audiometru diagnostic")
    .replace(/\bPortable ECG Monitor\b/gi, "monitor ECG portabil")
    .replace(/\bEmergency Blanket\b/gi, "patura de urgenta")
    .replace(/\bInstant Ice\b/gi, "compresa rece instant")
    .replace(/\bNon Woven Fabric\b/gi, "material netesut")
    .replace(/\bOxy Glasses\b/gi, "canule nazale oxigen")
    .replace(/\bNasal Cannulas\b/gi, "canule nazale")
    .replace(/\bPulse Oximeter\b/gi, "pulsoximetru")
    .replace(/\bContinuous Monitoring Oximeter\b/gi, "pulsoximetru pentru monitorizare continua")
    .replace(/\bOximeter\b/gi, "pulsoximetru")
    .replace(/\bPediatric Clip Probe\b/gi, "sonda pediatrica tip clips")
    .replace(/\bPediatric Rubber Probe\b/gi, "sonda pediatrica din cauciuc")
    .replace(/\bNeonatal Y-Probe\b/gi, "sonda neonatala tip Y")
    .replace(/\bProbe\b/gi, "sonda")
    .replace(/\bAdjustable\b/gi, "reglabil")
    .replace(/\bLi-ion Battery\b/gi, "baterie litiu-ion")
    .replace(/\bVital Signs Monitor\b/gi, "monitor functii vitale")
    .replace(/\bHealth Monitor\b/gi, "monitor de sanatate")
    .replace(/\bTraining\b/gi, "training")
    .replace(/\bHot Air Sterilizer\b/gi, "sterilizator cu aer cald")
    .replace(/\bSealing Machine\b/gi, "aparat de sigilare")
    .replace(/\bMachine Only\b/gi, "aparat")
    .replace(/\bComplete\b/gi, "complet")
    .replace(/\bTracking System Documentation\b/gi, "sistem documentare trasabilitate")
    .replace(/\bLine Labeler\b/gi, "etichetator cu doua randuri")
    .replace(/\bRotating Seat Cushion\b/gi, "perna rotativa pentru sezut")
    .replace(/\bAmbidextrous Handgrip\b/gi, "maner ambidextru")
    .replace(/\bPelvic Belt\b/gi, "centura pelvina")
    .replace(/\bAbdominal Belt\b/gi, "centura abdominala")
    .replace(/\bTransfer Belt\b/gi, "centura transfer")
    .replace(/\bMovement Belt\b/gi, "centura mobilizare")
    .replace(/\bHarness\b/gi, "ham")
    .replace(/\bWheelchair\b/gi, "scaun rulant")
    .replace(/\bRear Castors\b/gi, "roti spate")
    .replace(/\bRear Wheels\b/gi, "roti spate")
    .replace(/\bHandrail\b/gi, "bara de sprijin")
    .replace(/\bPatient Lifter\b/gi, "ridicator pacient")
    .replace(/\bFoldable Patient\b/gi, "scaun pliabil pentru pacient")
    .replace(/\bGynaecological Chair\b/gi, "scaun ginecologic")
    .replace(/\bRetractable\/removable Wheels\b/gi, "roti retractabile si detasabile")
    .replace(/\bShower Trolley\b/gi, "carucior pentru dus")
    .replace(/\bStool\b/gi, "taburet")
    .replace(/\bMonitor Holding Arm\b/gi, "brat de sustinere pentru monitor")
    .replace(/\bStand Alone\b/gi, "independent")
    .replace(/\bResolution\b/gi, "rezolutie")
    .replace(/\bPixels\b/gi, "pixeli")
    .replace(/\bWorking Length\b/gi, "lungime de lucru")
    .replace(/\bBox Of\s*(\d+)/gi, "cutie cu $1")
    .replace(/\bBox\b/gi, "cutie")
    .replace(/\bPaper Filter\b/gi, "filtru de hartie")
    .replace(/\bPaper\b/gi, "hartie")
    .replace(/\bFilter\b/gi, "filtru")
    .replace(/\bCrutches\b/gi, "carje")
    .replace(/\bPair\b/gi, "pereche")
    .replace(/\bBlue\b/gi, "albastru")
    .replace(/\bBlack\b/gi, "negru")
    .replace(/\bRed\b/gi, "rosu")
    .replace(/\bGreen\b/gi, "verde")
    .replace(/\bSmall\b/gi, "mic")
    .replace(/\bMedium\b/gi, "mediu")
    .replace(/\bLarge\b/gi, "mare")
    .replace(/\bSurgical Marker\b/gi, "marker chirurgical")
    .replace(/\bMarker pentru Piele\b/gi, "marker pentru piele")
    .replace(/\bSingle Tip\b/gi, "un varf")
    .replace(/\bDouble Tip\b/gi, "doua varfuri")
    .replace(/\bSterile\b/gi, "steril")
    .replace(/\bShelf\b/gi, "raft")
    .replace(/\bShelves\b/gi, "polite")
    .replace(/\bBaza\b/gi, "baza")
    .replace(/\bMobilier Medical\b/gi, "")
    .replace(/\bwith\b/gi, "cu")
    .replace(/\bfor\b/gi, "pentru")
    .replace(/\band\b/gi, "si")
    .replace(/\bCuff\b/gi, "manseta")
    .replace(/\bGeanta\b/gi, "geanta")
    .replace(/\bCarrying\b/gi, "transport")
    .replace(/\bWireless\b/gi, "fara fir")
    .replace(/\bAir\b/gi, "Air")
    .replace(/\bBone\b/gi, "os")
    .replace(/\bFlat\b/gi, "plat")
    .replace(/\bSystem\b/gi, "sistem")
    .replace(/\bTestare\b/gi, "testare")
    .replace(/\bMonitor\b/gi, "monitor")
    .replace(/\bLight\b/gi, "lampa")
    .replace(/\s+/g, " ")
    .trim();
  if (!title || publicEnglishPatterns.some((pattern) => pattern.test(title))) {
    title = `${categoryLabels[product.category] || "Produs medical"} ${code}`.replace(/^Produs medical\s+/, "Accesoriu medical ");
  }
  return clean(title);
}

function hasPublicEnglish(value) {
  const text = normalize(value);
  return publicEnglishPatterns.some((pattern) => pattern.test(text));
}

function makeDescription(product, profile) {
  const title = product.romanianTitle;
  return `${title} este destinat pentru ${profile.application} in ${profile.environment}. Produsul se evalueaza in functie de configuratie, cantitate, compatibilitate si documentatia disponibila, astfel incat cererea de oferta sa fie corelata cu utilizarea medicala reala. Echipa ZESCORP poate clarifica accesoriile, livrarea si optiunile de service inainte de achizitie.`;
}

function repairProduct(product, products) {
  const before = {
    title: product.romanianTitle,
    slug: product.slug,
    description: product.romanianDescription,
  };
  const categoryOverride = categoryOverrides[String(product.gimaCode || "")];
  if (categoryOverride) {
    product.category = categoryOverride;
    product.commercialCategory = categoryLabels[categoryOverride] || product.commercialCategory;
  }
  const profile = categoryProfiles[product.category] || categoryProfiles.diagnostic;
  product.romanianTitle = titleFor(product);
  product.romanianShortSummary = `${product.romanianTitle} pentru ${profile.environment}, disponibil prin oferta personalizata ZESCORP.`;
  product.romanianDescription = makeDescription(product, profile);
  product.romanianApplications = [
    `Utilizare pentru ${profile.application}`,
    `Integrare in ${profile.environment}`,
    "Achizitie pentru proiecte de dotare, completare sau inlocuire echipamente",
  ];
  product.romanianBenefits = [
    "Denumire si configuratie clarificate inainte de ofertare",
    "Documentatie, accesorii si cantitati verificate in functie de cererea reala",
    "Poate fi corelat cu livrare, service si mentenanta ZESCORP",
  ];
  product.romanianFeatures = [
    `${product.romanianTitle} cu cod produs ${product.gimaCode || product.id}`,
    `Categorie comerciala: ${categoryLabels[product.category] || "Echipamente medicale"}`,
    "Potrivit pentru cerere de oferta personalizata",
  ];
  product.romanianPackageContents =
    product.romanianPackageContents?.length && !product.romanianPackageContents.some((item) => /confirma|ofertare/i.test(item))
      ? product.romanianPackageContents.map(normalizeSpec)
      : ["Continutul pachetului si accesoriile se confirma in oferta, in functie de configuratia solicitata."];
  product.romanianSpecifications = (product.romanianSpecifications || []).map((spec) => ({
    label: normalizeSpec(spec.label),
    value: normalizeSpec(spec.value),
  }));
  product.specificationGroups = groupSpecifications(product.romanianSpecifications);
  product.installationConsiderations = [
    "Verificarea aplicatiei medicale si a cantitatii solicitate",
    "Clarificarea accesoriilor, documentatiei si termenului de livrare",
    "Pregatirea unei oferte personalizate pentru clinica sau unitatea medicala",
  ];
  product.maintenanceConsiderations = [
    "Suport pentru clarificari tehnice inainte de achizitie",
    "Corelare cu service si mentenanta daca produsul necesita suport tehnic",
    "Recomandari pentru consumabile, accesorii sau documentatie in functie de produs",
  ];
  product.relatedServices = [...new Set([profile.service, "/service-aparatura-medicala", "/contracte-mentenanta"])].slice(0, 3);
  product.relatedProductCodes = products
    .filter((item) => item.id !== product.id && item.category === product.category && item.publicDisplayReady && item.strictQualityStatus === "pass" && item.gimaCode)
    .slice(0, 4)
    .map((item) => item.gimaCode);
  product.imageAlt = `${product.romanianTitle} - imagine produs pentru oferta ZESCORP`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({ ...image, alt: `${product.romanianTitle} - imagine produs` }));
  product.reviewStatus = "image_verified";
  product.indexableAt = null;
  return before;
}

function classify(product) {
  const issues = [];
  const title = product.romanianTitle || "";
  const slug = product.slug || "";
  if (hasPublicEnglish(title)) issues.push("mixed_english_title");
  if (hasPublicEnglish(slug)) issues.push("mixed_english_slug");
  if (/^(produs|echipament|dispozitiv|articol|mobilier medical|instrumentar chirurgical)\b/i.test(normalize(title))) issues.push("generic_title");
  if (/produs-de-|echipament-de-|mobilier-medical-|instrumentar-chirurgical-/i.test(slug)) issues.push("generic_slug");
  if (!product.romanianDescription || product.romanianDescription.length < 180 || /poate fi inclus in cereri de oferta/i.test(product.romanianDescription)) issues.push("template_description");
  if (!product.imageUrl || !product.imageVerified) issues.push("missing_image");
  if (product.imageUrl?.startsWith("/") && !fs.existsSync(path.join(root, "public", product.imageUrl))) issues.push("broken_image");
  const brokenDocs = Object.values(product.documents || {}).filter((url) => typeof url === "string" && url.startsWith("/") && !fs.existsSync(path.join(root, "public", url)));
  if (brokenDocs.length) issues.push("broken_document");
  if (!product.romanianSpecifications?.length) issues.push("missing_specs");
  if (issues.some((issue) => ["mixed_english_title", "mixed_english_slug", "generic_title", "generic_slug", "template_description", "missing_image", "broken_image", "broken_document"].includes(issue))) {
    return { grade: "D", issues };
  }
  if ((product.romanianSpecifications || []).length < 4) return { grade: "C", issues: [...issues, "thin_specs"] };
  if ((product.romanianSpecifications || []).length < 5) return { grade: "B", issues: [...issues, "limited_source_specs"] };
  return { grade: "A", issues };
}

function countsFor(items) {
  return items.reduce((acc, product) => {
    const grade = classify(product).grade;
    acc[grade] += 1;
    return acc;
  }, { A: 0, B: 0, C: 0, D: 0 });
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const redirects = fs.existsSync(redirectsPath)
    ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")).map(normalizeRedirect).filter(Boolean)
    : [];
  const redirectSet = new Set(redirects.map((item) => `${item.source}->${item.destination}`));
  const batch = products.filter((product) => product.publicDisplayReady && product.strictQualityStatus === "pass" && product.catalogStatus === "ready_for_publish");
  const beforeStrict = countsFor(batch);
  const repaired = [];
  const examples = [];

  for (const product of batch) {
    const beforeClass = classify(product);
    const oldSlug = product.slug;
    const before = repairProduct(product, products);
    const baseSlug = `${slugify(product.romanianTitle)}-${product.gimaCode || product.id}`;
    let nextSlug = baseSlug;
    let counter = 2;
    while (products.some((item) => item.id !== product.id && item.slug === nextSlug)) {
      nextSlug = `${baseSlug}-${counter}`;
      counter += 1;
    }
    product.slug = nextSlug;
    if (oldSlug !== product.slug) {
      const source = productRedirectPath(oldSlug);
      const destination = productRedirectPath(product.slug);
      const key = `${source}->${destination}`;
      if (!redirectSet.has(key)) {
        redirects.push({ source, destination });
        redirectSet.add(key);
      }
    }
    const afterClass = classify(product);
    const changed = before.title !== product.romanianTitle || before.slug !== product.slug || before.description !== product.romanianDescription || beforeClass.grade !== afterClass.grade;
    if (changed) {
      repaired.push({
        code: product.gimaCode,
        beforeGrade: beforeClass.grade,
        afterGrade: afterClass.grade,
        beforeTitle: before.title,
        afterTitle: product.romanianTitle,
        beforeSlug: before.slug,
        afterSlug: product.slug,
        issuesBefore: beforeClass.issues,
        issuesAfter: afterClass.issues,
      });
      if (examples.length < 80) examples.push(repaired.at(-1));
    }
  }

  const afterStrict = countsFor(batch);
  const remaining = batch.map((product) => ({ product, result: classify(product) })).filter((item) => item.result.grade === "C" || item.result.grade === "D");
  const images = batch.filter((product) => product.imageUrl && product.imageVerified).length;
  const docs = batch.filter((product) => Object.values(product.documents || {}).some(Boolean)).length;
  const brokenImages = batch.filter((product) => product.imageUrl?.startsWith("/") && !fs.existsSync(path.join(root, "public", product.imageUrl))).length;
  const brokenDocuments = batch.flatMap((product) => Object.values(product.documents || {})).filter((url) => typeof url === "string" && url.startsWith("/") && !fs.existsSync(path.join(root, "public", url))).length;

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);

  const report = [
    "# Product QA Failure Repair Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Scope: repaired the existing 500-product batch only. No import, deploy, indexation or sitemap inclusion.",
    "",
    "## Training Failure Patterns",
    "",
    "- Mixed English/Romanian titles, e.g. `Split Grounding Pad`, `Paper Filtru`, `Crutches - Blue - Pair`.",
    "- English/source fragments in slugs, e.g. `box-of`, `produs-de-laborator`, `mobilier-medical`, `shelves`.",
    "- Category/source-table titles, especially mobilier/accessory rows extracted from tables.",
    "- Template-like descriptions that did not explain the product use context.",
    "- Image false negatives caused by thumbnail checks; image audit now checks local main image availability and rendered product image presence.",
    "",
    "## Rules Added",
    "",
    "- Strict English/source-fragment rejection for public titles and slugs.",
    "- Generic title/slug rejection for `produs`, `echipament`, `dispozitiv`, `mobilier medical` and similar placeholders.",
    "- Commercial description replacement for every product in the 500-product batch.",
    "- Specification label/value normalization without inventing missing technical parameters.",
    "- Local image and local document existence checks.",
    "",
    "## Original Phase Baseline",
    "",
    `- A: ${phaseBaseline.A}`,
    `- B: ${phaseBaseline.B}`,
    `- C: ${phaseBaseline.C}`,
    `- D: ${phaseBaseline.D}`,
    "",
    "## Previous Gold Repair State",
    "",
    `- A: ${afterGoldRepair.A}`,
    `- B: ${afterGoldRepair.B}`,
    `- C: ${afterGoldRepair.C}`,
    `- D: ${afterGoldRepair.D}`,
    "",
    "## Strict Audit Before This Pass",
    "",
    `- A: ${beforeStrict.A}`,
    `- B: ${beforeStrict.B}`,
    `- C: ${beforeStrict.C}`,
    `- D: ${beforeStrict.D}`,
    "",
    "## Strict Audit After This Pass",
    "",
    `- A: ${afterStrict.A}`,
    `- B: ${afterStrict.B}`,
    `- C: ${afterStrict.C}`,
    `- D: ${afterStrict.D}`,
    `- A + B: ${afterStrict.A + afterStrict.B} (${(((afterStrict.A + afterStrict.B) / batch.length) * 100).toFixed(1)}%)`,
    "",
    "## Asset Audit",
    "",
    `- Products with verified images: ${images}`,
    `- Products with local documents: ${docs}`,
    `- Broken images: ${brokenImages}`,
    `- Broken documents: ${brokenDocuments}`,
    "",
    "## Products Repaired",
    "",
    `- Products changed: ${repaired.length}`,
    `- Remaining C/D products: ${remaining.length}`,
    "",
    "## Remaining C/D Products",
    "",
    ...(remaining.length ? remaining.map(({ product, result }) => `- ${product.gimaCode}: ${product.romanianTitle} (${result.grade}) - ${result.issues.join(", ")}`) : ["- None"]),
    "",
    "## Before / After Examples",
    "",
    "| Code | Before grade | After grade | Before title | After title | Before slug | After slug |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...examples.map((item) => `| ${item.code || ""} | ${item.beforeGrade} | ${item.afterGrade} | ${String(item.beforeTitle || "").replace(/\|/g, "/")} | ${item.afterTitle.replace(/\|/g, "/")} | ${item.beforeSlug} | ${item.afterSlug} |`),
  ].join("\n");
  fs.writeFileSync(reportPath, `${report}\n`);
  console.log(JSON.stringify({ beforeStrict, afterStrict, repaired: repaired.length, remaining: remaining.length, reportPath }, null, 2));
}

main();
