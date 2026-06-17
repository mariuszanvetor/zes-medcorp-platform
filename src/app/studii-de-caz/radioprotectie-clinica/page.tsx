import { createCaseStudyMetadata, renderCaseStudy } from "../_case";

export const metadata = createCaseStudyMetadata("radioprotectie-clinica");

export default function RadioprotectieClinicaCasePage() {
  return renderCaseStudy("radioprotectie-clinica");
}
