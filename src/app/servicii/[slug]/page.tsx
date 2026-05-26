import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import {
  createServiceFunnelMetadata,
  serviceFunnels,
} from "@/lib/service-funnel-engine";

type ServiceFunnelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceFunnels.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceFunnelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = serviceFunnels.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return createServiceFunnelMetadata(page);
}

export default async function ServiceFunnelRoute({ params }: ServiceFunnelPageProps) {
  const { slug } = await params;

  const page = serviceFunnels.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return <ServiceLandingPage page={page} />;
}
