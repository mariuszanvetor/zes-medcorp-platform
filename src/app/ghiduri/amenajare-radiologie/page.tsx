import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("amenajare-radiologie");

export default function AmenajareRadiologiePage() {
  return renderSeoClusterPage("amenajare-radiologie");
}
