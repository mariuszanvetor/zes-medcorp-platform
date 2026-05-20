import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("cost-clinica-medicala");

export default function CostClinicaMedicalaPage() {
  return renderSeoClusterPage("cost-clinica-medicala");
}
