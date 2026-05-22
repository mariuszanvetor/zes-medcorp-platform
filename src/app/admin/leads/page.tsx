import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";
import { LeadReviewCenter } from "@/components/admin/LeadReviewCenter";
import { canRenderAdminContent } from "@/lib/admin-access";

export const dynamic = "force-dynamic";

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

export default async function AdminLeadsPage() {
  const canRender = await canRenderAdminContent();

  return (
    <AdminShell
      eyebrow="Internal prototype"
      subtitle="Prototip intern pentru evaluarea leadurilor generate de platforma ZES. Datele sunt demo, iar accesul real trebuie protejat înainte de folosirea în producție."
      title="Lead Review Center"
    >
      {canRender ? <LeadReviewCenter /> : null}
    </AdminShell>
  );
}
