import type { MedicalDomainProfile } from "@/lib/ai-intelligence/types";

const imagingTools = [
  { label: "Radiology Room Planner", href: "/radiology-room-planner" },
  { label: "Project Intake", href: "/project-intake" },
  { label: "Proposal Builder", href: "/proposal-builder" },
];

export const medicalDomainProfiles: MedicalDomainProfile[] = [
  {
    id: "mri",
    label: "MRI / RMN",
    description:
      "MRI planning with RF shielding, controlled environment, equipment integration and service access.",
    typicalEquipment: [
      {
        id: "mri-15t",
        label: "MRI 1.5T",
        commonRoomTypes: ["MRI room", "equipment room", "control room", "patient prep"],
        planningNotes: ["RF shielding is central.", "Do not treat MRI as a lead-shielding project."],
      },
      {
        id: "mri-3t",
        label: "MRI 3T",
        commonRoomTypes: ["MRI room", "equipment room", "control room", "technical support"],
        planningNotes: ["Higher sensitivity to site conditions.", "Validate space, HVAC and access early."],
      },
    ],
    roomTypes: ["MRI room", "control room", "equipment room", "patient preparation", "service access"],
    requirements: [
      requirement("mri-rf", "shielding", "RF shielding / Faraday cage", "Is RF shielding designed around the selected MRI model?", "MRI requires electromagnetic isolation, not radiation shielding.", "critical", true),
      requirement("mri-hvac", "hvac", "Stable HVAC for MRI", "Are temperature, humidity and service access known?", "Environmental stability affects equipment operation and downtime risk.", "critical", true),
      requirement("mri-electrical", "electrical", "Electrical capacity and protection", "Are power requirements and protection strategy confirmed?", "Electrical assumptions influence commissioning and uptime.", "critical", true),
      requirement("mri-structural", "structural", "Structural and vibration review", "Can the building support delivery, load and vibration expectations?", "Existing buildings often create hidden implementation constraints.", "important", true),
      requirement("mri-service", "service-access", "Service and delivery access", "Can the magnet and service teams access the room safely?", "Poor access can delay delivery and increase lifecycle cost.", "important", true),
    ],
    operationalConsiderations: [
      "Plan downtime and service access before commissioning.",
      "Confirm emergency and safety procedures with the equipment supplier.",
      "Coordinate RF penetrations, HVAC, electrical and data before construction closure.",
    ],
    likelyValidationAreas: ["RF shielding test", "equipment supplier requirements", "HVAC and electrical verification"],
    commonDependencies: ["hvac", "medical-electrical", "ups-power", "operational-workflow"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala", "/servicii/proiectare-camera-rmn"],
    relatedTools: [
      ...imagingTools,
      { label: "Estimare cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Estimare RF shielding", href: "/calculatoare/rf-shielding-estimare" },
    ],
    relatedResources: [
      { label: "RMN 1.5T vs 3T", href: "/knowledge-hub/rmn-1-5t-vs-3t-infrastructura", type: "article" },
      { label: "RF shielding vs radioprotectie", href: "/comparatii/rf-shielding-vs-radioprotectie", type: "comparison" },
      { label: "Faraday cage", href: "/glosar/faraday-cage-explicatie", type: "glossary" },
    ],
  },
  {
    id: "ct",
    label: "CT",
    description:
      "CT room planning with radiation protection, controlled areas, electrical/HVAC capacity and authorization awareness.",
    typicalEquipment: [
      {
        id: "ct-scanner",
        label: "CT scanner",
        commonRoomTypes: ["CT room", "control room", "equipment room", "patient prep"],
        planningNotes: ["Radiation protection must be assessed.", "CNCAN-related planning may be relevant."],
      },
    ],
    roomTypes: ["CT room", "control room", "patient preparation", "technical support"],
    requirements: [
      requirement("ct-radiation", "radiation-protection", "Radiation protection concept", "Are room layout, neighbors and equipment configuration known?", "CT uses ionizing radiation and needs radioprotection planning.", "critical", true),
      requirement("ct-cncan", "documentation", "CNCAN-aware documentation path", "Has the project identified authorization documentation needs?", "Authorization planning must be verified by qualified specialists.", "critical", true),
      requirement("ct-hvac", "hvac", "HVAC and cooling capacity", "Are heat load and equipment support requirements known?", "CT operation can create HVAC and cooling implications.", "important", true),
      requirement("ct-electrical", "electrical", "Electrical supply and protection", "Are power and protection needs aligned with supplier specs?", "Electrical assumptions can delay installation.", "important", true),
    ],
    operationalConsiderations: [
      "Separate patient flow from technical and service access.",
      "Keep radiation protection separate from MRI RF shielding terminology.",
      "Validate final layout before construction and authorization steps.",
    ],
    likelyValidationAreas: ["radiation protection assessment", "equipment supplier requirements", "authorization documentation"],
    commonDependencies: ["radiology", "medical-electrical", "hvac", "operational-workflow"],
    relatedServices: ["/services/protectie-radiologica", "/services/radiologie", "/servicii/proiectare-camera-ct"],
    relatedTools: [
      ...imagingTools,
      { label: "Estimare cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Estimare radioprotectie CT", href: "/calculatoare/radioprotectie-ct-estimare" },
    ],
    relatedResources: [
      { label: "CT vs CBCT", href: "/comparatii/ct-vs-cbct", type: "comparison" },
      { label: "Erori proiectare camere CT", href: "/knowledge-hub/erori-proiectare-camera-ct", type: "article" },
      { label: "CT shielding estimation", href: "/glosar/ct-shielding-estimation-guide", type: "glossary" },
    ],
  },
  {
    id: "radiology",
    label: "Radiology / RX",
    description:
      "Radiology planning for RX, fluoroscopy or imaging areas with layout, radioprotection and workflow requirements.",
    typicalEquipment: [
      {
        id: "digital-rx",
        label: "Digital RX",
        commonRoomTypes: ["RX room", "control zone", "patient changing"],
        planningNotes: ["Radiation protection and workflow should be validated together."],
      },
    ],
    roomTypes: ["RX room", "control area", "patient changing", "waiting area"],
    requirements: [
      requirement("rx-radiation", "radiation-protection", "Radioprotection and layout", "Are adjacent spaces and exposure scenarios known?", "RX planning depends on use, equipment and neighboring occupancy.", "critical", true),
      requirement("rx-workflow", "workflow", "Patient and staff workflow", "Is the room sequence clear for patients and staff?", "Workflow influences safety, throughput and usability.", "important", false),
      requirement("rx-docs", "documentation", "Planning documentation", "Are drawings and supplier specs available?", "Missing documentation slows validation and authorization planning.", "important", true),
    ],
    operationalConsiderations: [
      "Plan patient flow before final room placement.",
      "Avoid mixing RF shielding and radioprotection concepts.",
      "Confirm operational throughput assumptions early.",
    ],
    likelyValidationAreas: ["radiation protection", "room layout", "documentation completeness"],
    commonDependencies: ["ct", "operational-workflow", "medical-electrical"],
    relatedServices: ["/services/radiologie", "/services/protectie-radiologica", "/servicii/amenajare-spatii-radiologie"],
    relatedTools: [
      ...imagingTools,
      { label: "Infrastructura radiologie", href: "/calculatoare/infrastructura-radiologie-estimare" },
    ],
    relatedResources: [
      { label: "RMN vs CT", href: "/comparatii/rmn-vs-ct", type: "comparison" },
      { label: "Flux pacienti imagistica", href: "/knowledge-hub/flux-pacienti-imagistica", type: "article" },
    ],
  },
  {
    id: "dental",
    label: "Dental imaging",
    description:
      "Dental imaging planning for CBCT, panoramic systems and clinic workflow, with radiation protection awareness.",
    typicalEquipment: [
      {
        id: "cbct",
        label: "CBCT",
        commonRoomTypes: ["dental imaging room", "control area"],
        planningNotes: ["Compare CT and CBCT requirements carefully.", "Validate radiation protection locally."],
      },
    ],
    roomTypes: ["dental imaging room", "control area", "patient prep"],
    requirements: [
      requirement("dental-radiation", "radiation-protection", "Radiation protection review", "Is the equipment type and room context known?", "CBCT and dental RX still need radiation protection awareness.", "critical", true),
      requirement("dental-workflow", "workflow", "Clinic workflow integration", "Will imaging interfere with dental patient flow?", "Small rooms can create operational bottlenecks.", "important", false),
    ],
    operationalConsiderations: [
      "Confirm equipment type before assuming shielding scope.",
      "Plan patient movement and operator location.",
    ],
    likelyValidationAreas: ["radiation protection", "equipment supplier specs", "room layout"],
    commonDependencies: ["radiology", "medical-electrical", "operational-workflow"],
    relatedServices: ["/services/protectie-radiologica", "/services/aparatura-medicala"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [
      { label: "CT vs CBCT", href: "/comparatii/ct-vs-cbct", type: "comparison" },
    ],
  },
  {
    id: "ivd-laboratory",
    label: "IVD / laboratory",
    description:
      "Laboratory planning with analyzer integration, workflow, HVAC/electrical readiness and service continuity.",
    typicalEquipment: [
      {
        id: "ivd-analyzers",
        label: "IVD analyzers",
        commonRoomTypes: ["sample reception", "analysis room", "technical area", "storage"],
        planningNotes: ["Workflow and equipment integration are inseparable.", "Validate utilities before acquisition."],
      },
    ],
    roomTypes: ["sample reception", "analysis area", "storage", "technical support", "waste handling"],
    requirements: [
      requirement("ivd-workflow", "workflow", "Laboratory workflow", "Are sample flow and equipment sequence clear?", "Workflow drives room layout and operational efficiency.", "critical", false),
      requirement("ivd-electrical", "electrical", "Analyzer electrical readiness", "Are analyzer power needs known?", "Power and protection affect reliability and installation.", "important", true),
      requirement("ivd-hvac", "hvac", "HVAC and environmental control", "Are environmental requirements known for analyzer operation?", "Lab stability affects equipment and staff operations.", "important", true),
      requirement("ivd-service", "service-access", "Service and calibration access", "Can equipment be maintained without disrupting the lab?", "Poor access increases downtime and support friction.", "important", false),
    ],
    operationalConsiderations: [
      "Plan analyzer layout around workflow, not just available space.",
      "Clarify validation, calibration and service responsibilities.",
      "Consider growth and additional equipment from the beginning.",
    ],
    likelyValidationAreas: ["equipment specs", "workflow validation", "service access", "environmental requirements"],
    commonDependencies: ["hvac", "medical-electrical", "operational-workflow"],
    relatedServices: ["/services/ivd-laborator", "/services/service-aparatura-medicala"],
    relatedTools: [
      { label: "Estimare laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Project Intake", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedResources: [
      { label: "Cerinte infrastructura laborator IVD", href: "/knowledge-hub/cerinte-infrastructura-laborator-ivd", type: "article" },
      { label: "Flux operational laborator IVD", href: "/knowledge-hub/flux-operational-laborator-ivd", type: "article" },
    ],
  },
  {
    id: "surgery-or",
    label: "Surgery / operating room",
    description:
      "Operating room planning with HVAC, electrical safety, medical gases, workflow and infection-control dependencies.",
    typicalEquipment: [
      {
        id: "or-core",
        label: "Operating room equipment",
        commonRoomTypes: ["operating room", "scrub area", "pre-op", "post-op", "sterile storage"],
        planningNotes: ["Requires multidisciplinary validation.", "Never treat as a generic treatment room."],
      },
    ],
    roomTypes: ["operating room", "scrub", "pre-op", "post-op", "sterile support"],
    requirements: [
      requirement("or-hvac", "hvac", "OR HVAC concept", "Are airflow and environmental expectations defined?", "Operating areas require specialized environmental planning.", "critical", true),
      requirement("or-electrical", "electrical", "Medical electrical systems", "Are electrical safety zones and equipment loads known?", "Electrical design is critical for operational safety.", "critical", true),
      requirement("or-gases", "medical-gases", "Medical gas coordination", "Are gas needs and routing assumptions known?", "Medical gases influence layout and technical shafts.", "important", true),
      requirement("or-workflow", "workflow", "Sterile and patient workflow", "Are clean/dirty paths and patient movement defined?", "Workflow influences infection control and usability.", "critical", true),
    ],
    operationalConsiderations: [
      "Escalate to qualified design validation early.",
      "Separate technical planning from final engineering approval.",
      "Coordinate sterile workflow, HVAC and electrical systems together.",
    ],
    likelyValidationAreas: ["HVAC", "medical electrical", "medical gases", "infection-control workflow"],
    commonDependencies: ["hvac", "medical-electrical", "sterilization", "operational-workflow"],
    relatedServices: ["/services/constructii-medicale", "/services/amenajari-medicale"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [{ label: "Planificare proiect medical", href: "/planificare", type: "planning" }],
  },
  {
    id: "ati-critical-care",
    label: "ATI / critical care",
    description:
      "Critical-care infrastructure with medical gases, electrical resilience, workflow, monitoring and operational continuity.",
    typicalEquipment: [
      {
        id: "critical-care-bed",
        label: "Critical-care bed area",
        commonRoomTypes: ["patient bay", "nurse station", "support rooms"],
        planningNotes: ["Operational continuity is central.", "Infrastructure needs must be validated by specialists."],
      },
    ],
    roomTypes: ["patient bay", "nurse station", "support room", "clean utility", "dirty utility"],
    requirements: [
      requirement("ati-power", "ups-power", "Resilient power strategy", "Are critical loads and backup expectations defined?", "Critical care cannot rely on vague power assumptions.", "critical", true),
      requirement("ati-gases", "medical-gases", "Medical gas availability", "Are medical gas needs and redundancy expectations known?", "Medical gases are core infrastructure dependencies.", "critical", true),
      requirement("ati-workflow", "workflow", "Staff and emergency workflow", "Are observation, access and escalation paths clear?", "Workflow affects response and operational safety.", "important", true),
    ],
    operationalConsiderations: [
      "Escalate incomplete technical data quickly.",
      "Plan monitoring, power and medical gases together.",
      "Use AI output only as preparation for qualified engineering validation.",
    ],
    likelyValidationAreas: ["medical gases", "electrical resilience", "HVAC", "workflow"],
    commonDependencies: ["medical-electrical", "ups-power", "hvac", "operational-workflow"],
    relatedServices: ["/services/constructii-medicale", "/services/amenajari-medicale"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [{ label: "Etape validare infrastructura", href: "/knowledge-hub/etape-validare-infrastructura-medicala", type: "article" }],
  },
  {
    id: "sterilization",
    label: "Sterilization",
    description:
      "Sterilization planning with clean/dirty flow, utilities, equipment positioning and validation workflow.",
    typicalEquipment: [
      {
        id: "sterilization-core",
        label: "Sterilization equipment",
        commonRoomTypes: ["dirty zone", "clean zone", "sterile storage", "equipment area"],
        planningNotes: ["Workflow separation is central.", "Utilities and equipment service access must be planned."],
      },
    ],
    roomTypes: ["dirty zone", "clean zone", "sterile storage", "technical area"],
    requirements: [
      requirement("sterile-workflow", "workflow", "Clean and dirty workflow", "Are clean and dirty flows separated?", "Workflow separation is a core planning constraint.", "critical", true),
      requirement("sterile-utilities", "water-drainage", "Utilities and drainage", "Are utilities aligned with selected equipment?", "Equipment needs can change room and utility layout.", "important", true),
      requirement("sterile-hvac", "hvac", "Environmental support", "Are HVAC expectations known?", "Environmental control supports operational consistency.", "important", true),
    ],
    operationalConsiderations: [
      "Do not finalize layout before workflow separation is reviewed.",
      "Confirm equipment utilities and maintenance access.",
    ],
    likelyValidationAreas: ["workflow", "utilities", "equipment specs", "environmental requirements"],
    commonDependencies: ["hvac", "medical-electrical", "operational-workflow"],
    relatedServices: ["/services/constructii-medicale", "/services/amenajari-medicale"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [{ label: "Checklist pre-implementare", href: "/knowledge-hub/checklist-pre-implementare-imagistica", type: "article" }],
  },
  {
    id: "ultrasound",
    label: "Ultrasound",
    description:
      "Ultrasound room planning with workflow, electrical/data readiness, patient comfort and equipment acquisition context.",
    typicalEquipment: [
      {
        id: "ultrasound-system",
        label: "Ultrasound system",
        commonRoomTypes: ["consultation room", "ultrasound room"],
        planningNotes: ["Usually lower infrastructure complexity than MRI/CT.", "Workflow and acquisition planning still matter."],
      },
    ],
    roomTypes: ["consultation room", "ultrasound room", "patient changing"],
    requirements: [
      requirement("us-workflow", "workflow", "Patient and operator workflow", "Is patient flow and operator position clear?", "Small workflow issues can reduce utilization.", "important", false),
      requirement("us-electrical", "electrical", "Electrical and data readiness", "Are power outlets and data needs known?", "Basic infrastructure still needs planning.", "baseline", false),
    ],
    operationalConsiderations: [
      "Use as a lower-complexity domain in triage.",
      "Escalate only when renovation, multi-room or integration requirements appear.",
    ],
    likelyValidationAreas: ["room layout", "electrical/data readiness"],
    commonDependencies: ["operational-workflow", "medical-electrical"],
    relatedServices: ["/services/aparatura-medicala", "/services/amenajari-medicale"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [{ label: "Alegere aparatura medicala", href: "/knowledge-hub/alegere-aparatura-medicala-clinica", type: "article" }],
  },
  {
    id: "cardiology",
    label: "Cardiology",
    description:
      "Cardiology equipment and room planning with electrical/data readiness, workflow and possible procedure-room dependencies.",
    typicalEquipment: [
      {
        id: "cardiology-devices",
        label: "Cardiology diagnostic equipment",
        commonRoomTypes: ["cardiology consultation", "diagnostic room", "procedure support"],
        planningNotes: ["Clarify whether the project is diagnostic or procedure-oriented."],
      },
    ],
    roomTypes: ["consultation", "diagnostic room", "procedure support", "waiting"],
    requirements: [
      requirement("cardio-data", "data-it", "Data and reporting integration", "Are data/reporting needs defined?", "Integration affects workflow and equipment selection.", "important", false),
      requirement("cardio-electrical", "electrical", "Electrical readiness", "Are equipment loads and outlet needs known?", "Poor planning can limit room usability.", "baseline", false),
      requirement("cardio-workflow", "workflow", "Patient workflow", "Is patient movement and exam sequence defined?", "Workflow affects throughput and staff usability.", "important", false),
    ],
    operationalConsiderations: [
      "Clarify if the project includes imaging, procedure rooms or only diagnostics.",
      "Map equipment acquisition to room and workflow needs.",
    ],
    likelyValidationAreas: ["equipment specs", "data integration", "workflow"],
    commonDependencies: ["operational-workflow", "medical-electrical"],
    relatedServices: ["/services/aparatura-medicala", "/services/amenajari-medicale"],
    relatedTools: [{ label: "Project Intake", href: "/project-intake" }, { label: "Proposal Builder", href: "/proposal-builder" }],
    relatedResources: [{ label: "Alegere aparatura medicala", href: "/knowledge-hub/alegere-aparatura-medicala-clinica", type: "article" }],
  },
  {
    id: "clinic-modernization",
    label: "Clinic modernization",
    description:
      "Modernization planning for existing clinics, with downtime, phased implementation, equipment migration and operational continuity.",
    typicalEquipment: [
      {
        id: "mixed-clinic-equipment",
        label: "Mixed clinic equipment",
        commonRoomTypes: ["existing clinical rooms", "technical rooms", "support areas"],
        planningNotes: ["Existing operations create constraints.", "Downtime reduction should be planned early."],
      },
    ],
    roomTypes: ["existing clinical rooms", "technical areas", "temporary zones", "support areas"],
    requirements: [
      requirement("mod-phasing", "workflow", "Phased implementation", "Can the clinic stay operational during works?", "Downtime can be a hidden business cost.", "critical", true),
      requirement("mod-migration", "service-access", "Equipment migration", "Will equipment be moved, replaced or operated during works?", "Migration creates service and operational risk.", "important", true),
      requirement("mod-docs", "documentation", "Existing documentation", "Are current plans and equipment lists available?", "Missing documentation increases uncertainty.", "important", false),
    ],
    operationalConsiderations: [
      "Prioritize continuity before cosmetic works.",
      "Identify temporary workflows before execution.",
      "Treat missing documentation as a risk signal.",
    ],
    likelyValidationAreas: ["existing infrastructure", "downtime planning", "equipment migration", "service access"],
    commonDependencies: ["healthcare-infrastructure", "operational-workflow", "medical-electrical", "hvac"],
    relatedServices: ["/services/amenajari-medicale", "/services/service-aparatura-medicala", "/servicii/modernizare-clinica-medicala"],
    relatedTools: [
      { label: "Estimare modernizare clinica", href: "/calculatoare/modernizare-clinica-estimare" },
      { label: "Project Intake", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedResources: [
      { label: "Modernizare etapizata", href: "/knowledge-hub/modernizare-etapizata-clinica-medicala", type: "article" },
      { label: "Reducere downtime", href: "/knowledge-hub/cum-reduci-downtime-modernizare-clinica", type: "article" },
    ],
  },
  {
    id: "healthcare-infrastructure",
    label: "Healthcare infrastructure",
    description:
      "Cross-domain infrastructure planning for clinics, medical rooms, equipment integration and implementation sequencing.",
    typicalEquipment: [
      {
        id: "mixed-medical-equipment",
        label: "Mixed medical equipment",
        commonRoomTypes: ["clinic rooms", "diagnostic rooms", "technical rooms", "support spaces"],
        planningNotes: ["Use as the default broad domain when project type is unclear."],
      },
    ],
    roomTypes: ["clinic rooms", "support rooms", "technical rooms", "patient areas"],
    requirements: [
      requirement("infra-scope", "documentation", "Project scope definition", "Is the project scope clear enough to route?", "Broad projects need clear boundaries before recommendations.", "critical", false),
      requirement("infra-space", "space", "Space and layout readiness", "Are surfaces, building type and room roles known?", "Space clarity is a primary confidence driver.", "important", false),
      requirement("infra-sequence", "validation", "Implementation sequence", "Are dependencies and decision order known?", "Sequencing reduces rework and hidden cost.", "important", true),
    ],
    operationalConsiderations: [
      "Use progressive discovery when information is incomplete.",
      "Route to specialist domains once equipment or room type is identified.",
    ],
    likelyValidationAreas: ["space", "documentation", "equipment alignment", "implementation sequencing"],
    commonDependencies: ["medical-electrical", "hvac", "operational-workflow"],
    relatedServices: ["/services/constructii-medicale", "/services/amenajari-medicale", "/services/aparatura-medicala"],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Project Intake", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedResources: [
      { label: "Planificare proiect medical", href: "/planificare", type: "planning" },
      { label: "Checklist pre-implementare", href: "/knowledge-hub/checklist-pre-implementare-imagistica", type: "article" },
    ],
  },
  {
    id: "medical-electrical",
    label: "Medical electrical systems",
    description:
      "Electrical planning for medical equipment, imaging rooms, laboratories, critical loads and operational resilience.",
    typicalEquipment: [
      {
        id: "medical-electrical-loads",
        label: "Medical electrical loads",
        commonRoomTypes: ["technical room", "imaging room", "laboratory", "critical care"],
        planningNotes: ["Always align with final equipment specs.", "Do not treat indicative estimates as design approval."],
      },
    ],
    roomTypes: ["technical room", "equipment room", "clinical rooms"],
    requirements: [
      requirement("electrical-loads", "electrical", "Load and protection strategy", "Are final loads and protection needs known?", "Electrical assumptions can block commissioning.", "critical", true),
      requirement("electrical-redundancy", "ups-power", "Backup and UPS strategy", "Are critical loads and autonomy expectations known?", "Continuity requirements vary by domain and equipment.", "important", true),
      requirement("electrical-access", "service-access", "Maintenance access", "Can electrical systems be maintained safely?", "Poor access increases downtime risk.", "important", false),
    ],
    operationalConsiderations: [
      "Use equipment specs as required input before final design.",
      "Keep lead scoring sensitive to incomplete electrical data.",
    ],
    likelyValidationAreas: ["electrical design", "load calculation", "backup power strategy"],
    commonDependencies: ["ups-power", "mri", "ct", "ivd-laboratory", "ati-critical-care"],
    relatedServices: ["/services/constructii-medicale", "/servicii/planificare-electrica-imagistica"],
    relatedTools: [
      { label: "Estimare putere electrica", href: "/calculatoare/putere-electrica-imagistica" },
      { label: "Project Intake", href: "/project-intake" },
    ],
    relatedResources: [
      { label: "Cerinte electrice RMN", href: "/knowledge-hub/cerinte-electrice-rmn", type: "article" },
      { label: "Radiology electrical requirements", href: "/glosar/radiology-room-electrical-requirements", type: "glossary" },
    ],
  },
  {
    id: "hvac",
    label: "Medical HVAC",
    description:
      "HVAC planning for imaging rooms, laboratories, operating areas and equipment support environments.",
    typicalEquipment: [
      {
        id: "medical-hvac-system",
        label: "Medical HVAC system",
        commonRoomTypes: ["imaging room", "laboratory", "OR", "technical room"],
        planningNotes: ["Environmental stability and service access are both relevant."],
      },
    ],
    roomTypes: ["equipment room", "clinical room", "laboratory", "technical support"],
    requirements: [
      requirement("hvac-load", "hvac", "Thermal and environmental load", "Are heat load and environmental requirements known?", "HVAC affects equipment stability and staff operation.", "critical", true),
      requirement("hvac-access", "service-access", "Serviceable installation", "Can HVAC systems be maintained without disrupting the room?", "Poor maintainability becomes an operational cost.", "important", false),
      requirement("hvac-penetrations", "shielding", "Shielding-compatible penetrations", "Does HVAC cross RF or protected boundaries?", "MRI RF shielding requires controlled penetrations.", "critical", true),
    ],
    operationalConsiderations: [
      "Separate room comfort from equipment cooling.",
      "Coordinate HVAC with shielding, power and service access.",
    ],
    likelyValidationAreas: ["HVAC design", "equipment heat load", "shielding penetration strategy"],
    commonDependencies: ["mri", "ct", "ivd-laboratory", "surgery-or", "medical-electrical"],
    relatedServices: ["/services/constructii-medicale", "/servicii/hvac-imagistica-medicala"],
    relatedTools: [
      { label: "Estimare HVAC", href: "/calculatoare/hvac-imagistica-estimare" },
      { label: "Project Intake", href: "/project-intake" },
    ],
    relatedResources: [
      { label: "HVAC camera RMN", href: "/knowledge-hub/hvac-camera-rmn", type: "article" },
      { label: "HVAC imagistica", href: "/glosar/hvac-imagistica-medicala", type: "glossary" },
    ],
  },
  {
    id: "ups-power",
    label: "UPS / power continuity",
    description:
      "Power continuity planning for imaging, critical care, laboratories and service resilience.",
    typicalEquipment: [
      {
        id: "ups-system",
        label: "UPS / backup power system",
        commonRoomTypes: ["technical room", "equipment room", "critical-care support"],
        planningNotes: ["Clarify what is protected and for how long.", "UPS does not fix poor base electrical design."],
      },
    ],
    roomTypes: ["technical room", "equipment room", "electrical support"],
    requirements: [
      requirement("ups-critical-loads", "ups-power", "Critical load definition", "Which loads require continuity?", "UPS scope should follow operational risk, not assumptions.", "critical", true),
      requirement("ups-autonomy", "ups-power", "Autonomy and escalation", "Is required autonomy known?", "Autonomy affects cost, space and maintenance.", "important", true),
      requirement("ups-maintenance", "service-access", "Maintenance and lifecycle access", "Can the UPS be serviced safely?", "Lifecycle planning prevents avoidable downtime.", "important", false),
    ],
    operationalConsiderations: [
      "Define protected loads before sizing.",
      "Keep UPS recommendations framed as preliminary until electrical validation.",
    ],
    likelyValidationAreas: ["critical load list", "electrical design", "maintenance strategy"],
    commonDependencies: ["medical-electrical", "mri", "ct", "ati-critical-care", "ivd-laboratory"],
    relatedServices: ["/services/constructii-medicale", "/services/service-aparatura-medicala"],
    relatedTools: [
      { label: "Estimare putere electrica", href: "/calculatoare/putere-electrica-imagistica" },
      { label: "Project Intake", href: "/project-intake" },
    ],
    relatedResources: [
      { label: "Planificare UPS imagistica", href: "/knowledge-hub/planificare-ups-imagistica", type: "article" },
    ],
  },
  {
    id: "operational-workflow",
    label: "Operational workflow",
    description:
      "Workflow intelligence for patient movement, staffing assumptions, room adjacency, downtime and operational continuity.",
    typicalEquipment: [
      {
        id: "workflow-system",
        label: "Operational workflow",
        commonRoomTypes: ["patient areas", "diagnostic rooms", "support spaces"],
        planningNotes: ["Useful as a cross-domain layer, not a standalone engineering domain."],
      },
    ],
    roomTypes: ["waiting", "patient prep", "exam rooms", "support rooms", "staff areas"],
    requirements: [
      requirement("workflow-patient", "workflow", "Patient flow", "Is patient movement clear from entry to exit?", "Poor flow reduces throughput and usability.", "important", false),
      requirement("workflow-staff", "staffing", "Staff workflow and observation", "Are staff roles and observation points clear?", "Staffing assumptions influence room layout and operations.", "important", false),
      requirement("workflow-downtime", "validation", "Downtime planning", "Will the project affect active operations?", "Downtime planning is critical for modernization.", "critical", true),
    ],
    operationalConsiderations: [
      "Use workflow as an early discovery path when equipment is not yet known.",
      "Escalate to domain-specific requirements once the room or equipment type is clear.",
    ],
    likelyValidationAreas: ["patient flow", "staff workflow", "downtime planning", "adjacency"],
    commonDependencies: ["clinic-modernization", "healthcare-infrastructure", "radiology", "ivd-laboratory"],
    relatedServices: ["/services/amenajari-medicale", "/services/constructii-medicale"],
    relatedTools: [
      { label: "Evaluare preliminara", href: "/calculatoare/evaluare-preliminara-clinica" },
      { label: "Project Intake", href: "/project-intake" },
    ],
    relatedResources: [
      { label: "Flux pacienti imagistica", href: "/knowledge-hub/flux-pacienti-imagistica", type: "article" },
      { label: "Planificare fluxuri clinica", href: "/knowledge-hub/planificare-fluxuri-clinica-medicala", type: "article" },
    ],
  },
];

function requirement(
  id: string,
  category: MedicalDomainProfile["requirements"][number]["category"],
  title: string,
  planningQuestion: string,
  whyItMatters: string,
  criticality: MedicalDomainProfile["requirements"][number]["criticality"],
  validationNeeded: boolean,
) {
  return {
    id,
    category,
    title,
    planningQuestion,
    whyItMatters,
    criticality,
    validationNeeded,
  };
}
