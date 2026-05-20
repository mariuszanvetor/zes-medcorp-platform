import {
  createSeoClusterMetadata,
  renderSeoClusterPage,
} from "@/app/ghiduri/_cluster";

export const metadata = createSeoClusterMetadata("echipamente-ivd-laborator");

export default function EchipamenteIvdLaboratorPage() {
  return renderSeoClusterPage("echipamente-ivd-laborator");
}
