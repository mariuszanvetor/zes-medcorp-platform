import type { Metadata, Viewport } from "next";

import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { FloatingZESAssistant } from "@/components/ai/FloatingZESAssistant";
import { ConversionStickyCTA } from "@/components/layout/ConversionStickyCTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { brand } from "@/lib/brand";
import { defaultMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: brand.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <AnalyticsProvider />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConversionStickyCTA />
          <FloatingZESAssistant />
        </div>
      </body>
    </html>
  );
}
