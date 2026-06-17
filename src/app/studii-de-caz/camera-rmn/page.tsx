import { createCaseStudyMetadata, renderCaseStudy } from "../_case";

export const metadata = createCaseStudyMetadata("camera-rmn");

export default function CameraRmnCasePage() {
  return renderCaseStudy("camera-rmn");
}
