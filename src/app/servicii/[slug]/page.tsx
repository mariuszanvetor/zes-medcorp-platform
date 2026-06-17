import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { seoCommercialLandings } from "@/data/seo-commercial-landings";
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
  const commercialServicePaths = new Set(
    seoCommercialLandings
      .filter((page) => page.path.startsWith("/servicii/"))
      .map((page) => page.path),
  );

  return serviceFunnels
    .filter((page) => !commercialServicePaths.has(`/servicii/${page.slug}`))
    .map((page) => ({
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
