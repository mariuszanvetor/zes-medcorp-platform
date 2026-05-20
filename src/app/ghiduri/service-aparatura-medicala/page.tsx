import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("service-aparatura-medicala");

export default function ServiceAparaturaMedicalaGhidPage() {
  return renderSeoClusterPage("service-aparatura-medicala");
}
