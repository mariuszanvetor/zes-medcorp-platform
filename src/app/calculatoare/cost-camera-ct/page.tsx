import {
  createProgrammaticCalculatorMetadata,
  renderProgrammaticCalculatorPage,
} from "@/app/calculatoare/_calculator";

export const metadata = createProgrammaticCalculatorMetadata("cost-camera-ct");

export default function CostCameraCtCalculatorPage() {
  return renderProgrammaticCalculatorPage("cost-camera-ct");
}
