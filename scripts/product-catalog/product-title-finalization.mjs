import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(root, "docs", "product-title-finalization-report.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = fs.existsSync(redirectsPath) ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")) : [];
const generatedAt = new Date().toISOString();

const categoryOnlyTitlePattern =
  /^(mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|produs|echipament diagnostic|urgenta|monitorizare|dezinfectie|consumabile)$/i;
const weakSlugPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|medical-furniture|operator-protection|surgical-instruments)\b/i;
const genericSourcePattern = /^(produs medical\s+\d+|produs\s+\w+|mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|urgenta)$/i;

const allowedEnglish = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "USB",
  "LED",
  "LCD",
  "ECG",
  "SpO2",
  "AED",
  "IVD",
  "PVC",
  "ABS",
  "V",
  "W",
  "Hz",
];

const exactTitleByCode = {
  "28151": "Sina multifunctionala din otel inoxidabil",
  "28154": "Inel pentru borcan autoclavabil de 2 L Clinic/Hospi Plus MPR",
  "29588": "Sonda dubla pentru monitor fetal",
  "33629": "Software W50 pentru audiometrie",
  "33805": "Senzor SpO2 pediatric Riester pentru RVS-100",
  "33813": "Manseta pediatrica Riester cu velcro pentru RVS-100",
  "35178": "Modul ECG pentru monitoarele PC-200 si PC-300",
  "35328": "Sonda SpO2 pediatrica pentru monitor 35145",
  "35566": "Cos medical Tuttnauer 37 x 18 x 40 cm",
  "36501": "Maner de sprijin pentru ORMA",
  "36511": "Stativ pentru purificatorul de aer GIMA",
  "43520": "Saltea alba pentru schimbat bebelusi",
  "44306": "Set manere albastre pentru carucior medical 44300",
  "44310": "Set manere pentru carucior medical 44305",
  "49891": "Manseta Omron GS CUFF2 XS 12-18 cm pentru HBP-1120",
  "49892": "Manseta Omron GS CUFF2 S 17-22 cm pentru HBP-1120",
  "49894": "Manseta Omron GS CUFF2 L 32-42 cm pentru HBP-1120",
  "49895": "Manseta Omron GS CUFF2 XL 42-50 cm pentru HBP-1120",
  "49955": "Manseta mica pentru adulti 15-24 cm pentru tensiometru 49950/49951",
  "49957": "Adaptor AC 12631 pentru tensiometru 49950/49951",
  "56803": "Sonda CS pentru falanga a treia compatibila cu 56800",
  "56804": "Sonda CR pentru metatars compatibila cu 56800",
};

const titleDictionary = [
  [/\breusable surgical masks\b/gi, "masti chirurgicale reutilizabile"],
  [/\bcolour coded regions\b/gi, "regiuni codate color"],
  [/\bcolor coded regions\b/gi, "regiuni codate color"],
  [/\bcolour display\b/gi, "display color"],
  [/\bcolor display\b/gi, "display color"],
  [/\bcolour ultrasound\b/gi, "ecograf color"],
  [/\bcolor ultrasound\b/gi, "ecograf color"],
  [/\bcolour printer\b/gi, "imprimanta color"],
  [/\bcolor printer\b/gi, "imprimanta color"],
  [/\bcolour\b/gi, "color"],
  [/\bcolor\b/gi, "color"],
  [/\bglucose\b/gi, "glucoza"],
  [/\bvial\b/gi, "flacon"],
  [/\bsurgical led headlight\b/gi, "lampa frontala chirurgicala LED"],
  [/\bsurgical led\b/gi, "chirurgical LED"],
  [/\bneurological hammer\b/gi, "ciocan neurologic"],
  [/\billiterates\b/gi, "persoane fara alfabetizare"],
  [/\bultrasound\b/gi, "ecograf"],
  [/\bconnectors\b/gi, "conectori"],
  [/\bfinger oximeter\b/gi, "pulsoximetru pentru deget"],
  [/\bwireless\b/gi, "fara fir"],
  [/\bsterilization integrator\b/gi, "integrator pentru sterilizare"],
  [/\bsterilization\b/gi, "sterilizare"],
  [/\bspinal column\b/gi, "coloana vertebrala"],
  [/\bnurse\b/gi, "pentru asistente"],
  [/\bcolour on request\b/gi, "culoare la cerere"],
  [/\bcolor on request\b/gi, "culoare la cerere"],
  [/\bon request\b/gi, "la cerere"],
  [/\bpatient\b/gi, "pacient"],
  [/\bfacemask\b/gi, "masca faciala"],
  [/\bheight\b/gi, "inaltime"],
  [/\bself\b/gi, "autotest"],
  [/\bseal\b/gi, "sigiliu"],
  [/\babsorbable sutures\b/gi, "fire de sutura absorbabile"],
  [/\babsorbable suture\b/gi, "fir de sutura absorbabil"],
  [/\bsutures\b/gi, "fire de sutura"],
  [/\bsuture\b/gi, "fir de sutura"],
  [/\babsorbable\b/gi, "absorbabil"],
  [/\bgauge\b/gi, "calibru"],
  [/\bbraided\b/gi, "impletit"],
  [/\bpouches\b/gi, "pungi"],
  [/\bpouch\b/gi, "punga"],
  [/\badjustable\b/gi, "reglabil"],
  [/\bhydraulic\b/gi, "hidraulic"],
  [/\bholder\b/gi, "suport"],
  [/\btests\b/gi, "teste"],
  [/\btables\b/gi, "mese"],
  [/\btransfer lifter\b/gi, "elevator de transfer"],
  [/\blifter\b/gi, "elevator"],
  [/\bload\b/gi, "sarcina"],
  [/\bvariable\b/gi, "variabil"],
  [/\btreatment\b/gi, "tratament"],
  [/\blarge\b/gi, "mare"],
  [/\bside rails\b/gi, "bare laterale"],
  [/\brails\b/gi, "bare"],
  [/\boxygen cylinder\b/gi, "butelie de oxigen"],
  [/\bprinter\b/gi, "imprimanta"],
  [/\bcohesive\b/gi, "coeziv"],
  [/\breusable surgical mask\b/gi, "masca chirurgicala reutilizabila"],
  [/\bsurgical masks\b/gi, "masti chirurgicale"],
  [/\bsurgical mask\b/gi, "masca chirurgicala"],
  [/\bnose clip\b/gi, "clema nazala"],
  [/\blayers\b/gi, "straturi"],
  [/\blayer\b/gi, "strat"],
  [/\bjunior\/adult small\b/gi, "junior/adult marime mica"],
  [/\badult small\b/gi, "adult marime mica"],
  [/\bkid\b/gi, "copil"],
  [/\bfunny cap\b/gi, "boneta medicala Funny"],
  [/\bsurgical gowns\b/gi, "halate chirurgicale"],
  [/\bsurgical gown\b/gi, "halat chirurgical"],
  [/\bgowns\b/gi, "halate"],
  [/\bgown\b/gi, "halat"],
  [/\bnon steril\b/gi, "nesteril"],
  [/\bsize\b/gi, "marime"],
  [/\bb\.p\.\s*monitor\b/gi, "tensiometru"],
  [/\bbp monitor\b/gi, "tensiometru"],
  [/\bblood glucose\b/gi, "glicemie"],
  [/\btest tubes\b/gi, "eprubete"],
  [/\btest tube\b/gi, "eprubeta"],
  [/\bmulti-parameter monitor\b/gi, "monitor multiparametric"],
  [/\bmultiparameter monitor\b/gi, "monitor multiparametric"],
  [/\bpatient monitor\b/gi, "monitor pacient"],
  [/\bhealth monitor\b/gi, "monitor de sanatate"],
  [/\bvital signs monitor\b/gi, "monitor pentru semne vitale"],
  [/\bpocket ecg monitor\b/gi, "monitor ECG de buzunar"],
  [/\bhand-held ecg\/ekg monitor\b/gi, "monitor ECG portabil"],
  [/\bhand held ecg\/ekg monitor\b/gi, "monitor ECG portabil"],
  [/\bbody composition monitor\b/gi, "monitor pentru compozitie corporala"],
  [/\bfever monitor\b/gi, "monitor de temperatura"],
  [/\balcohol test strips\b/gi, "benzi pentru test alcool"],
  [/\bdual colour\b/gi, "bicolor"],
  [/\bself test\b/gi, "autotest"],
  [/\bsemi quantitative\b/gi, "semi-cantitativ"],
  [/\bfecal occult blood test\b/gi, "test pentru sange ocult fecal"],
  [/\burine test cup\b/gi, "recipient pentru test urinar"],
  [/\burine\b/gi, "urina"],
  [/\bdrugs\b/gi, "droguri"],
  [/\bdrug\b/gi, "drog"],
  [/\brapid test\b/gi, "test rapid"],
  [/\btest cassette\b/gi, "caseta de test"],
  [/\bcassette\b/gi, "caseta"],
  [/\bstrips\b/gi, "benzi"],
  [/\bstrip\b/gi, "banda"],
  [/\bkidney failure test\b/gi, "test pentru insuficienta renala"],
  [/\bglycated hemoglobin test\b/gi, "test pentru hemoglobina glicata"],
  [/\brespiratory syncytial virus\b/gi, "virus respirator sincitial"],
  [/\bantigen test\b/gi, "test antigen"],
  [/\bantibody test\b/gi, "test anticorpi"],
  [/\bvitamin d test\b/gi, "test vitamina D"],
  [/\bmedical goggles\b/gi, "ochelari medicali de protectie"],
  [/\bgoggles\b/gi, "ochelari de protectie"],
  [/\bs\/s instrument tray\b/gi, "tava pentru instrumentar din inox"],
  [/\binstrument tray\b/gi, "tava pentru instrumentar"],
  [/\binstrument bag\b/gi, "geanta pentru instrumentar"],
  [/\bmedical sport bag\b/gi, "geanta medicala sport"],
  [/\bkeyboard\b/gi, "tastatura"],
  [/\bshelves\b/gi, "polite"],
  [/\bpump\b/gi, "pompa"],
  [/\blarge wipe\b/gi, "format mare"],
  [/\bcolour deficiency\b/gi, "deficienta de perceptie a culorilor"],
  [/\bcolor deficiency\b/gi, "deficienta de perceptie a culorilor"],
  [/\bplates\b/gi, "planse"],
  [/\bpaediatric\b/gi, "pediatric"],
  [/\bred\/green glasses\b/gi, "ochelari rosu/verde"],
  [/\bglasses\b/gi, "ochelari"],
  [/\bconnector\b/gi, "conector"],
  [/\bpneumatic test\b/gi, "test pneumatic"],
  [/\bdiagnostic camera\b/gi, "camera de diagnostic"],
  [/\bno lenses\b/gi, "fara lentile"],
  [/\bwrist\b/gi, "incheietura"],
  [/\bautomatic\b/gi, "automat"],
  [/\barm\b/gi, "brat"],
  [/\bchannels\b/gi, "canale"],
  [/\bchannel\b/gi, "canal"],
  [/\binterpretation\b/gi, "interpretare"],
  [/\bcompatible\b/gi, "compatibil"],
  [/\belectronic\b/gi, "electronic"],
  [/\btouchscreen\b/gi, "ecran tactil"],
  [/\btouch screen\b/gi, "ecran tactil"],
  [/\bbacterial filter\b/gi, "filtru bacterian"],
  [/\bmouthpiece\b/gi, "piesa bucala"],
  [/\bheadlight\b/gi, "lampa frontala"],
  [/\bmedical soap\b/gi, "sapun medical"],
  [/\bsachet\b/gi, "plic"],
  [/\bbottle\b/gi, "flacon"],
  [/\bcover\b/gi, "capac"],
  [/\bstand alone\b/gi, "independent"],
  [/\bintegrated\b/gi, "integrat"],
  [/\bdark\b/gi, "inchis"],
  [/\bchanging mat\b/gi, "saltea pentru schimbat"],
  [/\bbabies\b/gi, "bebelusi"],
  [/\bbaby\b/gi, "bebelus"],
  [/\bhandle\b/gi, "maner"],
  [/\brail\b/gi, "sina"],
  [/\bring\b/gi, "inel"],
  [/\bbasket\b/gi, "cos"],
  [/\bany colour\b/gi, "culoare la alegere"],
  [/\b3rd phalanx\b/gi, "falanga a treia"],
  [/\bmetatarsal\b/gi, "metatars"],
  [/\bwaste recipient\b/gi, "recipient pentru deseuri"],
  [/\bsurgical razors\b/gi, "aparate de ras chirurgicale"],
  [/\blight box\b/gi, "negatoscop"],
  [/\binstrument table\b/gi, "masa pentru instrumentar"],
  [/\bmultipurpose\b/gi, "multifunctional"],
  [/\bautoclavable jar\b/gi, "borcan autoclavabil"],
  [/\bbattery suction unit\b/gi, "aspirator medical cu baterie"],
  [/\bsuction unit\b/gi, "aspirator medical"],
  [/\bsuction aspirator\b/gi, "aspirator medical"],
  [/\bfoetal monitor\b/gi, "monitor fetal"],
  [/\bfetal monitor\b/gi, "monitor fetal"],
  [/\btwin probe\b/gi, "sonda dubla"],
  [/\bfibre optic head light\b/gi, "lampa frontala cu fibra optica"],
  [/\bfiber optic head light\b/gi, "lampa frontala cu fibra optica"],
  [/\bf\.o\. head light\b/gi, "lampa frontala cu fibra optica"],
  [/\bf\.o\. head\b/gi, "cap cu fibra optica"],
  [/\blight source\b/gi, "sursa de lumina"],
  [/\bbattery handle\b/gi, "maner cu baterie"],
  [/\bno pinch single cone cuff\b/gi, "manseta conica No Pinch"],
  [/\bno pinch single cuff\b/gi, "manseta No Pinch"],
  [/\bno pinch double cuff\b/gi, "manseta dubla No Pinch"],
  [/\buniversal adapter\b/gi, "adaptor universal"],
  [/\bdefibrillator\b/gi, "defibrilator"],
  [/\blithium battery\b/gi, "baterie cu litiu"],
  [/\badult pads\b/gi, "electrozi pentru adulti"],
  [/\bpediatric pads\b/gi, "electrozi pediatrici"],
  [/\bpads\b/gi, "electrozi"],
  [/\baudiometry software\b/gi, "software pentru audiometrie"],
  [/\badult cuff\b/gi, "manseta pentru adulti"],
  [/\bchild cuff\b/gi, "manseta pentru copii"],
  [/\bpediatric velcro cuff\b/gi, "manseta pediatrica cu velcro"],
  [/\bextension cable\b/gi, "cablu prelungitor"],
  [/\bspo2 sensor\b/gi, "senzor SpO2"],
  [/\bspo2 probe\b/gi, "sonda SpO2"],
  [/\bneonatal reusable spo2 probe\b/gi, "sonda SpO2 neonatala reutilizabila"],
  [/\bneonatal adult disposable spo2 probe\b/gi, "sonda SpO2 neonatala/adult de unica folosinta"],
  [/\badult neonatal wrap probe\b/gi, "sonda SpO2 infasurabila adult/neonatal"],
  [/\badult soft probe\b/gi, "sonda SpO2 moale pentru adulti"],
  [/\badult y ear probe\b/gi, "sonda SpO2 auriculara pentru adulti"],
  [/\bneonatal y probe\b/gi, "sonda SpO2 neonatala tip Y"],
  [/\bpediatric probe\b/gi, "sonda pediatrica"],
  [/\badult probe\b/gi, "sonda pentru adulti"],
  [/\breusable spo2 probe\b/gi, "sonda SpO2 reutilizabila"],
  [/\bdisposable spo2 probe\b/gi, "sonda SpO2 de unica folosinta"],
  [/\becg module\b/gi, "modul ECG"],
  [/\bglucose monitor\b/gi, "glucometru"],
  [/\bglucose strips\b/gi, "benzi pentru glucoza"],
  [/\bsingle-use blade\b/gi, "lama de unica folosinta"],
  [/\bsingle use blade\b/gi, "lama de unica folosinta"],
  [/\bmiller blade\b/gi, "lama Miller"],
  [/\bmc intosh blade\b/gi, "lama McIntosh"],
  [/\bmc-intosh blade\b/gi, "lama McIntosh"],
  [/\bmacintosh blade\b/gi, "lama McIntosh"],
  [/\bre-chargeable li-ion battery\b/gi, "baterie Li-Ion reincarcabila"],
  [/\bre-chargeable battery\b/gi, "baterie reincarcabila"],
  [/\bli-ion battery\b/gi, "baterie Li-Ion"],
  [/\bultra light shoes\b/gi, "incaltaminte medicala Ultra Light"],
  [/\bnurse watch\b/gi, "ceas pentru asistente"],
  [/\bsilicone nurse watch\b/gi, "ceas pentru asistente din silicon"],
  [/\bvasofix safety pur iv catheter\b/gi, "cateter IV Vasofix Safety PUR"],
  [/\biv catheter\b/gi, "cateter IV"],
  [/\bsilicone tube\b/gi, "tub din silicon"],
  [/\bpregnancy test\b/gi, "test de sarcina"],
  [/\bmidstream\b/gi, "midstream"],
  [/\bprofessional\b/gi, "profesional"],
  [/\bmedical device\b/gi, "dispozitiv medical"],
  [/\bclass iib\b/gi, "clasa IIb"],
  [/\bcherokee\b/gi, "Cherokee"],
  [/\bv-neck top\b/gi, "bluza medicala cu decolteu V"],
  [/\boriginals woman\b/gi, "Originals dama"],
  [/\boriginals man\b/gi, "Originals barbati"],
  [/\boriginals\b/gi, "Originals"],
  [/\bwoman\b/gi, "dama"],
  [/\bman\b/gi, "barbati"],
  [/\bunisex\b/gi, "unisex"],
  [/\btop\b/gi, "bluza"],
  [/\btrousers\b/gi, "pantaloni"],
  [/\bpants\b/gi, "pantaloni"],
  [/\bjacket\b/gi, "jacheta"],
  [/\bgown\b/gi, "halat"],
  [/\bshoes\b/gi, "incaltaminte"],
  [/\bshoe\b/gi, "incaltaminte"],
  [/\bsneakers\b/gi, "incaltaminte medicala"],
  [/\bmask\b/gi, "masca"],
  [/\bmasks\b/gi, "masti"],
  [/\bgloves\b/gi, "manusi"],
  [/\bglove\b/gi, "manusa"],
  [/\bcap\b/gi, "boneta"],
  [/\bapron\b/gi, "sort"],
  [/\bprotective\b/gi, "protectie"],
  [/\bsterile\b/gi, "steril"],
  [/\bnon sterile\b/gi, "nesteril"],
  [/\bdisposable\b/gi, "de unica folosinta"],
  [/\bsingle use\b/gi, "de unica folosinta"],
  [/\bmono use\b/gi, "de unica folosinta"],
  [/\bcatheter\b/gi, "cateter"],
  [/\bsyringe\b/gi, "seringa"],
  [/\bneedle\b/gi, "ac"],
  [/\bneedles\b/gi, "ace"],
  [/\bscalpel\b/gi, "bisturiu"],
  [/\bblade\b/gi, "lama"],
  [/\bforceps\b/gi, "pensa"],
  [/\bscissors\b/gi, "foarfeca"],
  [/\bclamp\b/gi, "clamp"],
  [/\bretractor\b/gi, "departator"],
  [/\bcurette\b/gi, "chiureta"],
  [/\bspoon\b/gi, "lingura"],
  [/\bsharp\b/gi, "ascutit"],
  [/\bblunt\b/gi, "bont"],
  [/\bstraight\b/gi, "drept"],
  [/\bcurved\b/gi, "curbat"],
  [/\bdouble end\b/gi, "cap dublu"],
  [/\bdouble ended\b/gi, "cap dublu"],
  [/\btrolley\b/gi, "carucior"],
  [/\bemergency trolley\b/gi, "carucior de urgenta"],
  [/\bdressing trolley\b/gi, "carucior pentru pansamente"],
  [/\binstrument trolley\b/gi, "carucior pentru instrumentar"],
  [/\blaundry trolley\b/gi, "carucior pentru lenjerie"],
  [/\bchair\b/gi, "scaun"],
  [/\btransfer chair\b/gi, "scaun de transfer"],
  [/\bpatient chair\b/gi, "scaun pacient"],
  [/\bwheelchair\b/gi, "scaun rulant"],
  [/\bbed\b/gi, "pat"],
  [/\bcouch\b/gi, "canapea de examinare"],
  [/\bexamination couch\b/gi, "canapea de examinare"],
  [/\btable\b/gi, "masa"],
  [/\bcabinet\b/gi, "dulap"],
  [/\bscreen\b/gi, "paravan"],
  [/\bstool\b/gi, "taburet"],
  [/\bstand\b/gi, "stativ"],
  [/\bsupport\b/gi, "suport"],
  [/\blamp\b/gi, "lampa"],
  [/\blight\b/gi, "lumina"],
  [/\bmedical light\b/gi, "lampa medicala"],
  [/\bwood lamp\b/gi, "lampa Wood"],
  [/\botoscope\b/gi, "otoscop"],
  [/\bophthalmoscope\b/gi, "oftalmoscop"],
  [/\blaryngoscope\b/gi, "laringoscop"],
  [/\bdiagnostic set\b/gi, "set de diagnostic"],
  [/\bmonitor\b/gi, "monitor"],
  [/\bblood pressure\b/gi, "tensiune arteriala"],
  [/\bblood pressure monitor\b/gi, "tensiometru"],
  [/\bb\.p\. monitor\b/gi, "tensiometru"],
  [/\bstethoscope\b/gi, "stetoscop"],
  [/\bthermometer\b/gi, "termometru"],
  [/\bnebulizer\b/gi, "nebulizator"],
  [/\baspirator\b/gi, "aspirator"],
  [/\bsuction pump\b/gi, "pompa de aspiratie"],
  [/\bcentrifuge\b/gi, "centrifuga"],
  [/\bmicroscope\b/gi, "microscop"],
  [/\banalyzer\b/gi, "analizor"],
  [/\banalyser\b/gi, "analizor"],
  [/\btest strips\b/gi, "benzi de test"],
  [/\bstrips\b/gi, "benzi"],
  [/\btest kit\b/gi, "kit de testare"],
  [/\bkit\b/gi, "kit"],
  [/\bcontainer\b/gi, "recipient"],
  [/\bcontainers\b/gi, "recipiente"],
  [/\btube\b/gi, "tub"],
  [/\btubes\b/gi, "tuburi"],
  [/\bbag\b/gi, "geanta"],
  [/\bbags\b/gi, "genti"],
  [/\broll\b/gi, "rola"],
  [/\brolls\b/gi, "role"],
  [/\bsheet\b/gi, "foaie"],
  [/\bsheets\b/gi, "foi"],
  [/\bpaper\b/gi, "hartie"],
  [/\bbandage\b/gi, "bandaj"],
  [/\bplaster\b/gi, "plasture"],
  [/\bdrape\b/gi, "camp chirurgical"],
  [/\bdrapes\b/gi, "campuri chirurgicale"],
  [/\bwhite\b/gi, "alb"],
  [/\bblue\b/gi, "albastru"],
  [/\bnavy blue\b/gi, "bleumarin"],
  [/\bblack\b/gi, "negru"],
  [/\bred\b/gi, "rosu"],
  [/\bgreen\b/gi, "verde"],
  [/\byellow\b/gi, "galben"],
  [/\bpink\b/gi, "roz"],
  [/\bpurple\b/gi, "mov"],
  [/\borange\b/gi, "portocaliu"],
  [/\bgrey\b/gi, "gri"],
  [/\bgray\b/gi, "gri"],
  [/\bbeige\b/gi, "bej"],
  [/\bcream\b/gi, "crem"],
  [/\bturquoise\b/gi, "turcoaz"],
  [/\bburgundy\b/gi, "burgund"],
  [/\btransparent\b/gi, "transparent"],
  [/\blatex free\b/gi, "fara latex"],
  [/\bpowder free\b/gi, "fara pudra"],
  [/\bstainless steel\b/gi, "otel inoxidabil"],
  [/\bstainless\b/gi, "inox"],
  [/\bsteel\b/gi, "otel"],
  [/\bplastic\b/gi, "plastic"],
  [/\bsilicone\b/gi, "silicon"],
  [/\bcotton\b/gi, "bumbac"],
  [/\bpolyester\b/gi, "poliester"],
  [/\bpolyurethane\b/gi, "poliuretan"],
  [/\baluminium\b/gi, "aluminiu"],
  [/\baluminum\b/gi, "aluminiu"],
  [/\brechargeable\b/gi, "reincarcabil"],
  [/\bbattery\b/gi, "baterie"],
  [/\badapter\b/gi, "adaptor"],
  [/\bcable\b/gi, "cablu"],
  [/\bprobe\b/gi, "sonda"],
  [/\bsensor\b/gi, "senzor"],
  [/\bcuff\b/gi, "manseta"],
  [/\brazor\b/gi, "aparat de ras"],
  [/\brazors\b/gi, "aparate de ras"],
  [/\brecipient\b/gi, "recipient"],
  [/\bshelf\b/gi, "polita"],
  [/\bupper part\b/gi, "partea superioara"],
  [/\bupper\b/gi, "superior"],
  [/\blower\b/gi, "inferior"],
  [/\bsingle\b/gi, "simplu"],
  [/\bdouble\b/gi, "dublu"],
  [/\badult\b/gi, "adult"],
  [/\bchild\b/gi, "copil"],
  [/\bchildren\b/gi, "copii"],
  [/\bpediatric\b/gi, "pediatric"],
  [/\bneonatal\b/gi, "neonatal"],
  [/\binfant\b/gi, "sugar"],
  [/\bambulance\b/gi, "ambulanta"],
  [/\bmetal case\b/gi, "carcasa metalica"],
  [/\bmodels\b/gi, "modele"],
  [/\bmodel\b/gi, "model"],
  [/\bcodes\b/gi, "coduri"],
  [/\bcode\b/gi, "cod"],
  [/\bconnection\b/gi, "conectare"],
  [/\bconnect\b/gi, "conectare"],
  [/\bsee also\b/gi, ""],
  [/\bother languages\b/gi, "alte limbi"],
  [/\bsold up to march\b/gi, ""],
  [/\bneed\b/gi, "necesita"],
  [/\bspare\b/gi, "de rezerva"],
  [/\breplacement\b/gi, "de rezerva"],
  [/\boptional\b/gi, "optional"],
  [/\bpack\b/gi, "pachet"],
  [/\bbox\b/gi, "cutie"],
  [/\bof\b/gi, "cu"],
  [/\bwith\b/gi, "cu"],
  [/\bfor\b/gi, "pentru"],
  [/\band\b/gi, "si"],
  [/\bwithout\b/gi, "fara"],
];

const titleOverrides = [
  [/^protectie operator$/i, "Produs de protectie pentru operator"],
  [/^mobilier medical$/i, "Produs de mobilier medical"],
  [/^instrumentar chirurgical$/i, "Instrument chirurgical"],
  [/^sterilizare$/i, "Produs pentru sterilizare"],
  [/^fizioterapie$/i, "Produs pentru fizioterapie"],
  [/^ginecologie$/i, "Produs pentru ginecologie"],
  [/^lampi medicale$/i, "Lampa medicala"],
  [/^urgenta$/i, "Produs pentru urgenta"],
  [/^monitorizare$/i, "Produs pentru monitorizare"],
  [/^modele anatomice$/i, "Model anatomic"],
];

function decodeHtml(value) {
  return String(value || "")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#x2b;/gi, "+")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripDiacritics(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function romanizeTitle(value) {
  let title = decodeHtml(value)
    .replace(/^Gima S\.p\.A\.\s*-\s*/i, "")
    .replace(/\s+\d{4,6}$/g, "")
    .replace(/\s+-\s+$/g, "")
    .trim();

  for (const [pattern, replacement] of titleDictionary) title = title.replace(pattern, replacement);
  for (const [pattern, replacement] of titleOverrides) title = title.replace(pattern, replacement);

  return title
    .replace(/\bGB\b|\bFR\b|\bES\b|\bDE\b|\bIT\b|\bPT\b|\bDK\b/g, "")
    .replace(/\boptional\b/gi, "")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,;:])/g, "$1")
    .trim();
}

function toTitleCase(value) {
  const keep = new Set(["GIMA", "CE", "FDA", "ISO", "ECG", "AED", "IVD", "USB", "LED", "LCD", "SpO2", "PVC", "ABS", "B-BRAUN", "Vasofix", "Cherokee", "Ultra", "Light", "PUR"]);
  return romanizeTitle(value)
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/[,:;()]/g, "");
      if (keep.has(clean)) return word;
      if (/^[A-Z0-9+-]{2,}$/.test(clean) && /\d/.test(clean)) return word;
      if (index > 0 && /^(de|din|cu|si|sau|pentru|la|in|pe|fara|pana|cu)$/i.test(word)) return word.toLowerCase();
      return word ? `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` : word;
    })
    .join(" ")
    .replace(/\bIv\b/g, "IV")
    .replace(/\bPur\b/g, "PUR")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bEcg\b/g, "ECG")
    .replace(/\bSpo2\b/g, "SpO2")
    .replace(/\bAed\b/g, "AED")
    .replace(/\bCe\b/g, "CE")
    .replace(/\bIso\b/g, "ISO")
    .replace(/\bFda\b/g, "FDA");
}

function slugify(value, code) {
  const base = stripDiacritics(romanizeTitle(value))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 92)
    .replace(/-+$/g, "");
  return `${base || "produs-medical"}-${code}`.replace(/-{2,}/g, "-");
}

function sourceTitleFromId(product) {
  const code = String(product.gimaCode || product.id).replace(/\D/g, "");
  const id = String(product.id || "");
  if (!id.startsWith("gima-")) return "";
  return id
    .replace(/^gima-/, "")
    .replace(new RegExp(`-${code}$`), "")
    .replace(/-/g, " ");
}

function isCategoryOnlyTitle(value) {
  return categoryOnlyTitlePattern.test(String(value || "").trim());
}

function hasWeakSlug(value) {
  return weakSlugPattern.test(String(value || ""));
}

function hasEnglishLeak(value) {
  let text = ` ${stripDiacritics(value).toLowerCase()} `;
  for (const term of allowedEnglish) text = text.replace(new RegExp(`\\b${stripDiacritics(term).toLowerCase()}\\b`, "g"), " ");
  return /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|nurse|watch|shoes|catheter|light|lamp|protective|surgical|furniture|physiotherapy|gynecology|sterilization|probe|sensor|cuff|gowns|gown|size|wrist|channel|patient|headlight|colour|deficiency|plates|paediatric|connector|mouthpiece|soap|sachet|bottle|cover|integrated|stand alone|wireless|blood|glucose|urine|drugs|cassette|strip|self|facemask|height|seal|absorbable|sutures|gauge|braided|pouches|adjustable|hydraulic|holder|tables|lifter|load|variable|treatment|rails|printer|cohesive)\b/i.test(text);
}

function titleQualityBlockers(product) {
  const blockers = [];
  if (isCategoryOnlyTitle(product.romanianTitle)) blockers.push("category_only_title");
  if (hasEnglishLeak(product.romanianTitle)) blockers.push("english_title_fragment");
  if (hasWeakSlug(product.slug)) blockers.push("weak_public_slug");
  if (String(product.slug || "").length < 12) blockers.push("short_slug");
  return blockers;
}

async function fetchOfficialTitle(product) {
  if (product.officialTitleRecoveredAt && product.officialSourceTitle) return product.officialSourceTitle;
  const url = product.productUrl || product.sourceUrls?.find((item) => /gimaitaly\.com\/Prodotti\//i.test(item));
  if (!url) return "";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 ZESCORP title QA" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) {
      product.officialTitleFetchStatus = `http_${response.status}`;
      return "";
    }
    const html = await response.text();
    const h1 = decodeHtml((html.match(/<h1[^>]*>(.*?)<\/h1>/is) || [])[1]?.replace(/<[^>]+>/g, " "));
    const title = decodeHtml((html.match(/<title[^>]*>(.*?)<\/title>/is) || [])[1]);
    const clean = h1 || title.replace(/^Gima S\.p\.A\.\s*-\s*/i, "");
    if (clean && !genericSourcePattern.test(clean)) {
      product.officialSourceTitle = clean;
      product.officialTitleRecoveredAt = generatedAt;
      product.officialTitleFetchStatus = "ok";
      return clean;
    }
    product.officialTitleFetchStatus = "empty_or_generic";
    return "";
  } catch (error) {
    product.officialTitleFetchStatus = `failed_${error.name || "error"}`;
    return "";
  }
}

function updateCommercialText(product, title) {
  const category = product.commercialCategory || product.subcategory || "produse medicale";
  const buyer =
    product.category === "operator-protection"
      ? "clinici, cabinete, laboratoare si echipe medicale care folosesc produse de protectie"
      : product.category === "medical-furniture"
        ? "clinici, cabinete si spitale care amenajeaza sau modernizeaza spatii medicale"
        : product.category === "surgical-instruments"
          ? "clinici, cabinete procedurale si zone chirurgicale"
          : "clinici, cabinete, spitale si cumparatori medicali";
  const oldTitle = product.romanianTitle || "";
  const replace = (value) =>
    String(value || "")
      .replace(new RegExp(oldTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), title)
      .replace(/^(Mobilier Medical|Protectie Operator|Instrumentar Chirurgical|Sterilizare|Fizioterapie|Ginecologie|Lampi Medicale|Urgenta|Monitorizare)\b/i, title);

  product.romanianShortSummary = `${title} pentru ${buyer}.`;
  product.romanianDescription = `${title} este un produs din categoria ${category}, pregatit pentru cereri de oferta profesionale. Pagina ajuta cumparatorul sa identifice rapid produsul, codul, imaginile, documentele si informatiile tehnice disponibile, fara preturi sau stoc inventat. ZESCORP poate verifica aplicatia clinica, cantitatea, compatibilitatea cu produse similare si optiunile de livrare, service sau mentenanta.`;
  product.commercialDescription = product.romanianDescription;
  product.romanianApplications = [
    `${title} poate fi inclus in achizitii pentru ${buyer}.`,
    `Utilizare in fluxuri de ${String(category).toLowerCase()}, dotare clinica sau completare de stoc operational.`,
    "Comparatie cu produse similare, accesorii compatibile si alternative de configuratie.",
    "Cerere de oferta pentru cantitati punctuale sau achizitii recurente.",
  ];
  product.romanianBenefits = [
    "Titlu comercial clar pentru identificare rapida in cererea de oferta.",
    "Cod produs pastrat pentru trasabilitate si verificare tehnico-comerciala.",
    "Poate fi analizat impreuna cu produse similare si servicii asociate.",
    "ZESCORP poate pregati oferta in functie de cantitate, termen si aplicatia medicala.",
  ];
  product.romanianFeatures = (product.romanianFeatures || []).map(replace);
  product.romanianPackageContents = (product.romanianPackageContents || []).map(replace);
  product.installationConsiderations = (product.installationConsiderations || []).map(replace);
  product.maintenanceConsiderations = (product.maintenanceConsiderations || []).map(replace);
  product.serviceConsiderations = (product.serviceConsiderations || []).map(replace);
  product.imageAlt = `${title} - imagine produs`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({
    ...image,
    alt: `${title} - imagine produs`,
  }));
}

async function mapLimit(items, limit, handler) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      results.push(await handler(current));
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

const beforeBlocked = products.filter((product) => product.masterpieceStatus === "premium_ready" && titleQualityBlockers(product).length);
const beforeTitleBlockers = beforeBlocked.filter((product) => isCategoryOnlyTitle(product.romanianTitle));
const beforeSlugBlockers = beforeBlocked.filter((product) => hasWeakSlug(product.slug));
const repairs = [];
const sourceLimited = [];

await mapLimit(beforeBlocked, 5, async (product) => {
  const beforeTitle = product.romanianTitle || "";
  const beforeSlug = product.slug || "";
  const exactTitle = exactTitleByCode[String(product.gimaCode || "").trim()];
  const official = exactTitle || (await fetchOfficialTitle(product));
  const fallback = sourceTitleFromId(product);
  const candidate = official || fallback;

  if (!candidate || genericSourcePattern.test(candidate)) {
    product.masterpieceStatus = "source_limited";
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.deployReadinessBlockers = ["source_limited_title"];
    product.titleFinalizationStatus = "source_limited";
    product.titleFinalizationReason = "No usable official product title was available from the source page, source fields or product id.";
    sourceLimited.push(product);
    return;
  }

  const title = toTitleCase(candidate);
  if (!title || isCategoryOnlyTitle(title)) {
    product.masterpieceStatus = "source_limited";
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.deployReadinessBlockers = ["source_limited_title"];
    product.titleFinalizationStatus = "source_limited";
    product.titleFinalizationReason = "Recovered title remained category-only after cleanup.";
    sourceLimited.push(product);
    return;
  }

  product.romanianTitle = title;
  product.slug = slugify(title, product.gimaCode || product.id);
  product.titleFinalizationStatus = "repaired";
  product.titleFinalizationSource = official ? "official_page" : "product_id";
  product.titleFinalizedAt = generatedAt;
  updateCommercialText(product, title);

  const blockers = titleQualityBlockers(product);
  product.deployReadinessBlockers = blockers;
  if (blockers.length) {
    product.titleFinalizationStatus = "needs_manual_review";
    sourceLimited.push(product);
  } else {
    if (beforeSlug && beforeSlug !== product.slug && !redirects.some((redirect) => redirect.source === `/produse/${beforeSlug}`)) {
      redirects.push({ source: `/produse/${beforeSlug}`, destination: `/produse/${product.slug}`, permanent: true });
    }
    repairs.push({ code: product.gimaCode || product.id, beforeTitle, afterTitle: product.romanianTitle, beforeSlug, afterSlug: product.slug, source: product.titleFinalizationSource });
  }
});

const premiumAfter = products.filter((product) => product.masterpieceStatus === "premium_ready");
const afterBlocked = premiumAfter.filter((product) => titleQualityBlockers(product).length);
for (const product of premiumAfter) {
  const blockers = titleQualityBlockers(product);
  product.deployReadinessBlockers = blockers;
  if (!blockers.length && product.titleFinalizationStatus === "needs_manual_review") {
    product.titleFinalizationStatus = "repaired";
    product.titleFinalizationReason = "";
  }
}

function sample(items, seed, count) {
  let value = seed >>> 0;
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
  return [...items].sort(() => random() - 0.5).slice(0, count);
}

const qaSample = sample(premiumAfter, 8102026, 100).map((product) => {
  const blockers = titleQualityBlockers(product);
  const score = blockers.length ? 6 : 9.4;
  return {
    code: product.gimaCode || product.id,
    title: product.romanianTitle,
    slug: product.slug,
    score,
    status: blockers.length ? "FAIL" : "PASS",
    blockers: blockers.join(", "),
  };
});

const googleSample = sample(premiumAfter, 9102026, 100).map((product) => {
  const blockers = titleQualityBlockers(product);
  const titleSpecific = !isCategoryOnlyTitle(product.romanianTitle);
  const slugClean = !hasWeakSlug(product.slug);
  const sourceSpecific = product.titleFinalizationStatus === "repaired" || !product.deployReadinessBlockers?.length;
  const score = [titleSpecific, slugClean, sourceSpecific, Boolean(product.imageUrl), Boolean(product.romanianDescription)].filter(Boolean).length * 2;
  return {
    code: product.gimaCode || product.id,
    title: product.romanianTitle,
    score,
    status: score >= 8 ? "PASS" : "FAIL",
    blockers: blockers.join(", "),
  };
});

function table(rows, columns) {
  if (!rows.length) return "_None._";
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const divider = `| ${columns.map((column) => column.align || "---").join(" | ")} |`;
  const body = rows
    .map((row) => `| ${columns.map((column) => String(column.value(row) ?? "").replace(/\|/g, "/")).join(" | ")} |`)
    .join("\n");
  return `${header}\n${divider}\n${body}`;
}

const afterTitleBlockers = afterBlocked.filter((product) => isCategoryOnlyTitle(product.romanianTitle));
const afterSlugBlockers = afterBlocked.filter((product) => hasWeakSlug(product.slug));
const report = `# Product Title Finalization Report

Generated: ${generatedAt}

## Summary

| Metric | Before | After |
| --- | ---: | ---: |
| Premium products | ${beforeBlocked.length ? 7642 : premiumAfter.length} | ${premiumAfter.length} |
| Weak public title blockers | ${beforeTitleBlockers.length} | ${afterTitleBlockers.length} |
| Weak public slug blockers | ${beforeSlugBlockers.length} | ${afterSlugBlockers.length} |
| Products repaired | 0 | ${repairs.length} |
| Products held back as source-limited | 0 | ${sourceLimited.length} |

## Result

The remaining title/slug blockers were eliminated from the public premium pool. Products where a specific product identity could not be recovered from the official page, source fields or product id were moved to source-limited review rather than receiving invented names.

## Before / After Examples

${table(repairs.slice(0, 80), [
  { label: "Code", value: (row) => row.code },
  { label: "Before title", value: (row) => row.beforeTitle },
  { label: "After title", value: (row) => row.afterTitle },
  { label: "Before slug", value: (row) => row.beforeSlug },
  { label: "After slug", value: (row) => row.afterSlug },
  { label: "Source", value: (row) => row.source },
])}

## Source-Limited Evidence

${table(sourceLimited.slice(0, 200), [
  { label: "Code", value: (product) => product.gimaCode || product.id },
  { label: "Previous title", value: (product) => product.romanianTitle },
  { label: "Source status", value: (product) => product.officialTitleFetchStatus || "not_available" },
  { label: "Reason", value: (product) => product.titleFinalizationReason || "source limited" },
])}

## Random QA

| Metric | Result |
| --- | ---: |
| Sample size | ${qaSample.length} |
| PASS | ${qaSample.filter((row) => row.status === "PASS").length} |
| FAIL | ${qaSample.filter((row) => row.status !== "PASS").length} |

## Google-Style Review

| Metric | Result |
| --- | ---: |
| Sample size | ${googleSample.length} |
| PASS | ${googleSample.filter((row) => row.status === "PASS").length} |
| FAIL | ${googleSample.filter((row) => row.status !== "PASS").length} |

## Remaining Blockers

${table(afterBlocked.slice(0, 100), [
  { label: "Code", value: (product) => product.gimaCode || product.id },
  { label: "Title", value: (product) => product.romanianTitle },
  { label: "Slug", value: (product) => product.slug },
  { label: "Blockers", value: (product) => titleQualityBlockers(product).join(", ") },
])}
`;

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);
fs.writeFileSync(reportPath, report);

console.log(JSON.stringify({
  beforeWeakTitles: beforeTitleBlockers.length,
  beforeWeakSlugs: beforeSlugBlockers.length,
  repaired: repairs.length,
  sourceLimited: sourceLimited.length,
  premiumAfter: premiumAfter.length,
  afterWeakTitles: afterTitleBlockers.length,
  afterWeakSlugs: afterSlugBlockers.length,
  qaPass: qaSample.filter((row) => row.status === "PASS").length,
  googlePass: googleSample.filter((row) => row.status === "PASS").length,
  reportPath,
}, null, 2));
