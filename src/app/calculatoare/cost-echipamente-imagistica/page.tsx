import {
  createProgrammaticCalculatorMetadata,
  renderProgrammaticCalculatorPage,
} from "@/app/calculatoare/_calculator";

export const metadata = createProgrammaticCalculatorMetadata(
  "cost-echipamente-imagistica",
);

export default function CostEchipamenteImagisticaCalculatorPage() {
  return renderProgrammaticCalculatorPage("cost-echipamente-imagistica");
}
