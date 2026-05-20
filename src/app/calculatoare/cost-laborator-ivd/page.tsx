import {
  createProgrammaticCalculatorMetadata,
  renderProgrammaticCalculatorPage,
} from "@/app/calculatoare/_calculator";

export const metadata = createProgrammaticCalculatorMetadata("cost-laborator-ivd");

export default function CostLaboratorIvdCalculatorPage() {
  return renderProgrammaticCalculatorPage("cost-laborator-ivd");
}
