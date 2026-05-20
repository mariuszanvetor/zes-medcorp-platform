import {
  createProgrammaticCalculatorMetadata,
  renderProgrammaticCalculatorPage,
} from "@/app/calculatoare/_calculator";

export const metadata = createProgrammaticCalculatorMetadata("cost-camera-rmn");

export default function CostCameraRmnCalculatorPage() {
  return renderProgrammaticCalculatorPage("cost-camera-rmn");
}
