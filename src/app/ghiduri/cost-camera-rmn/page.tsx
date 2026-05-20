import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("cost-camera-rmn");

export default function CostCameraRmnPage() {
  return renderSeoClusterPage("cost-camera-rmn");
}
