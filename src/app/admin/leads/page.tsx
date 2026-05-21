import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";
import { LeadReviewCenter } from "@/components/admin/LeadReviewCenter";

export const metadata: Metadata = {
  title: {
    absolute: "Lead Review Center | ZES MEDCORP",
  },
  description:
    "Prototip intern pentru evaluarea leadurilor generate de platforma ZES.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return (
    <AdminShell
      eyebrow="Internal prototype"
      subtitle="Prototip intern pentru evaluarea leadurilor generate de platforma ZES. Datele sunt demo, iar accesul real trebuie protejat înainte de folosirea în producție."
      title="Lead Review Center"
    >
      <LeadReviewCenter />
    </AdminShell>
  );
}
