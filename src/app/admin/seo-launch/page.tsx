import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";
import { SeoLaunchChecklist } from "@/components/admin/SeoLaunchChecklist";
import { seoIndexingPriorityGroups } from "@/data/seo-indexing-priorities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "SEO Launch Checklist | ZES MEDCORP",
  },
  description:
    "Panou intern pentru priorizarea URL-urilor si workflow-ul manual de indexare in Search Console.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSeoLaunchPage() {
  return (
    <AdminShell
      eyebrow="Internal SEO ops"
      subtitle="Lista interna de prioritizare URL-uri, verificari post-deploy si workflow manual pentru Search Console. Nu exista API GSC, persistenta sau expunere publica."
      title="SEO Launch Checklist"
    >
      <SeoLaunchChecklist groups={seoIndexingPriorityGroups} />
    </AdminShell>
  );
}
