import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("aparatura-imagistica-medicala");

export default function AparaturaImagisticaMedicalaPage() {
  return renderSeoClusterPage("aparatura-imagistica-medicala");
}
