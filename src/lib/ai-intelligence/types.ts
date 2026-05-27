export type MedicalDomainId =
  | "mri"
  | "ct"
  | "radiology"
  | "dental"
  | "ivd-laboratory"
  | "surgery-or"
  | "ati-critical-care"
  | "sterilization"
  | "ultrasound"
  | "cardiology"
  | "clinic-modernization"
  | "healthcare-infrastructure"
  | "medical-electrical"
  | "hvac"
  | "ups-power"
  | "operational-workflow";

export type IntelligenceIntent =
  | "new-project"
  | "modernization"
  | "equipment-acquisition"
  | "service-issue"
  | "budgeting"
  | "regulatory-or-validation"
  | "unknown";

export type ProjectStage =
  | "idea"
  | "budgeting"
  | "feasibility"
  | "design"
  | "authorization"
  | "procurement"
  | "execution"
  | "commissioning"
  | "operation"
  | "active-issue";

export type RequirementCategory =
  | "space"
  | "hvac"
  | "electrical"
  | "ups-power"
  | "data-it"
  | "shielding"
  | "radiation-protection"
  | "water-drainage"
  | "medical-gases"
  | "workflow"
  | "staffing"
  | "infection-control"
  | "structural"
  | "service-access"
  | "documentation"
  | "validation";

export type RequirementCriticality = "baseline" | "important" | "critical";
export type ConfidenceLevel = "low" | "medium" | "high";
export type ComplexityLevel = "low" | "moderate" | "high" | "critical";
export type RecommendationKind =
  | "infrastructure"
  | "operational"
  | "regulatory-awareness"
  | "service"
  | "documentation"
  | "next-step";

export type RelatedResourceType =
  | "service"
  | "calculator"
  | "comparison"
  | "glossary"
  | "article"
  | "planning"
  | "tool"
  | "contact";

export type DomainRequirement = {
  id: string;
  category: RequirementCategory;
  title: string;
  planningQuestion: string;
  whyItMatters: string;
  criticality: RequirementCriticality;
  validationNeeded: boolean;
};

export type DomainEquipmentType = {
  id: string;
  label: string;
  commonRoomTypes: string[];
  planningNotes: string[];
};

export type MedicalDomainProfile = {
  id: MedicalDomainId;
  label: string;
  description: string;
  typicalEquipment: DomainEquipmentType[];
  roomTypes: string[];
  requirements: DomainRequirement[];
  operationalConsiderations: string[];
  likelyValidationAreas: string[];
  commonDependencies: MedicalDomainId[];
  relatedServices: string[];
  relatedTools: Array<{ label: string; href: string }>;
  relatedResources: Array<{ label: string; href: string; type: RelatedResourceType }>;
};

export type DiscoveryStageId =
  | "intent"
  | "domain"
  | "space"
  | "equipment"
  | "infrastructure"
  | "documentation"
  | "operation"
  | "next-step";

export type DiscoveryQuestion = {
  id: string;
  stage: DiscoveryStageId;
  prompt: string;
  appliesTo?: MedicalDomainId[];
  requiredForConfidence?: boolean;
  options?: string[];
  skipWhenKnown?: string[];
};

export type IntelligenceInput = {
  freeText?: string;
  intent?: IntelligenceIntent;
  projectStage?: ProjectStage;
  domains?: MedicalDomainId[];
  equipmentTypes?: string[];
  roomTypes?: string[];
  existingBuilding?: boolean;
  modernization?: boolean;
  urgency?: string;
  budgetKnown?: boolean;
  timelineKnown?: boolean;
  plansAvailable?: boolean;
  equipmentSpecsAvailable?: boolean;
  locationKnown?: boolean;
  surfaceKnown?: boolean;
  constraints?: string[];
};

export type MissingInformationItem = {
  id: string;
  label: string;
  reason: string;
  stage: DiscoveryStageId;
  priority: RequirementCriticality;
};

export type IntelligenceScore = {
  score: number;
  level: ConfidenceLevel;
  reasons: string[];
};

export type ComplexityScore = {
  score: number;
  level: ComplexityLevel;
  drivers: string[];
};

export type IntelligenceRecommendation = {
  id: string;
  kind: RecommendationKind;
  title: string;
  rationale: string;
  confidence: ConfidenceLevel;
  validationRequired: boolean;
  relatedDomains: MedicalDomainId[];
  relatedResources: Array<{ label: string; href: string; type: RelatedResourceType }>;
};

export type RegulatoryAwarenessFlag = {
  id: string;
  title: string;
  appliesTo: MedicalDomainId[];
  trigger: string;
  safeExplanation: string;
  validationPath: string;
  confidence: ConfidenceLevel;
  prohibitedClaims: string[];
};

export type ProposalIntelligenceContext = {
  summary: string;
  likelyDomains: MedicalDomainId[];
  likelyServices: string[];
  assumptions: string[];
  missingInformation: MissingInformationItem[];
  validationNeeds: string[];
  recommendedNextActions: string[];
};

export type DocumentArtifactType =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "image"
  | "screenshot"
  | "room-plan"
  | "sketch"
  | "equipment-spec"
  | "photo"
  | "layout"
  | "unknown";

export type DocumentUnderstandingArtifact = {
  id: string;
  type: DocumentArtifactType;
  label: string;
  expectedSignals: string[];
  limitations: string[];
  safeUse: string;
};
