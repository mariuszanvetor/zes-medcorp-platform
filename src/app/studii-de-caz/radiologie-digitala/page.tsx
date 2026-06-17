import { createCaseStudyMetadata, renderCaseStudy } from "../_case";

export const metadata = createCaseStudyMetadata("radiologie-digitala");

export default function RadiologieDigitalaCasePage() {
  return renderCaseStudy("radiologie-digitala");
}
