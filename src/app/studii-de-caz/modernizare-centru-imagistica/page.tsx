import { createCaseStudyMetadata, renderCaseStudy } from "../_case";

export const metadata = createCaseStudyMetadata("modernizare-centru-imagistica");

export default function ModernizareCentruImagisticaCasePage() {
  return renderCaseStudy("modernizare-centru-imagistica");
}
