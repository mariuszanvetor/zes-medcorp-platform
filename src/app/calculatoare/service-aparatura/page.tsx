import {
  createProgrammaticCalculatorMetadata,
  renderProgrammaticCalculatorPage,
} from "@/app/calculatoare/_calculator";

export const metadata = createProgrammaticCalculatorMetadata("service-aparatura");

export default function ServiceAparaturaCalculatorPage() {
  return renderProgrammaticCalculatorPage("service-aparatura");
}
