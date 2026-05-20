import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("cost-camera-ct");

export default function CostCameraCtPage() {
  return renderSeoClusterPage("cost-camera-ct");
}
