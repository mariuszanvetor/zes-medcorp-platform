import type { Metadata } from "next";

import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceProblemSolution } from "@/components/sections/ServiceProblemSolution";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getServiceBySlug } from "@/data/services";
import { createServiceMetadata } from "@/lib/seo";

const service = getServiceBySlug("protectie-radiologica");

export const metadata: Metadata = createServiceMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  slug: service.slug,
  keywords: service.keywords,
});

export default function ProtectieRadiologicaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Servicii", href: "/services" },
          { name: service.title, href: service.href },
        ]}
      />
      <ServiceSchema
        description={service.seoDescription}
        name={service.title}
        serviceType={service.schemaServiceType}
        url={service.href}
      />
      <FAQSchema items={service.faqs} />
      <ServiceHero service={service} />
      <ServiceProblemSolution service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices service={service} />
      <ServiceCTA service={service} />
    </>
  );
}
