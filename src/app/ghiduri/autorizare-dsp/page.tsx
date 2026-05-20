import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("autorizare-dsp");

export default function AutorizareDspPage() {
  return renderSeoClusterPage("autorizare-dsp");
}
