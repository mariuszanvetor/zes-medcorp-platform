import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MaintenanceContractPage } from "@/components/sections/MaintenanceContractPage";
import {
  getMaintenanceContractPage,
  maintenanceContractPages,
} from "@/data/maintenance-contracts";
import { createWebsiteMetadata } from "@/lib/seo";

type MaintenancePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return maintenanceContractPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: MaintenancePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMaintenanceContractPage(slug);

  if (!page) {
    return {};
  }

  return createWebsiteMetadata({
    title: page.metadataTitle,
    description: page.metadataDescription,
    path: `/contracte-mentenanta/${page.slug}`,
    keywords: [
      page.title,
      page.category,
      "contract mentenanta aparatura medicala",
      "service aparatura medicala",
      "mentenanta preventiva",
    ],
  });
}

export default async function MaintenanceDetailPage({
  params,
}: MaintenancePageProps) {
  const { slug } = await params;
  const page = getMaintenanceContractPage(slug);

  if (!page) {
    notFound();
  }

  return <MaintenanceContractPage page={page} />;
}
