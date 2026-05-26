import { AdminShell } from "@/components/admin/AdminShell";
import { ContentOpsHub } from "@/components/admin/ContentOpsHub";

export const metadata = {
  title: "Content Ops | ZES MEDCORP",
  description:
    "Internal content operations hub for LinkedIn, outreach, and authority content planning.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function ContentOpsAdminPage() {
  return (
    <AdminShell
      eyebrow="Internal content ops"
      subtitle="Use this hub to keep LinkedIn, outreach and content promotion organized around real project intent."
      title="Content Ops"
    >
      <ContentOpsHub />
    </AdminShell>
  );
}
