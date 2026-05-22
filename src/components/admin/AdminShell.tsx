import Link from "next/link";
import type { ReactNode } from "react";

import { AdminAccessGate } from "@/components/admin/AdminAccessGate";
import { AdminAccessNotice } from "@/components/admin/AdminAccessNotice";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getAdminAccessStatus,
  hasValidAdminAccessCookie,
} from "@/lib/admin-access";

export type AdminShellProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: ReactNode;
};

const adminNavItems = [
  {
    label: "Leaduri demo",
    href: "/admin/leads",
    status: "Review",
  },
  {
    label: "Monitor flux leaduri",
    href: "/admin/lead-flow",
    status: "Ops",
  },
  {
    label: "Analytics",
    href: "#",
    status: "Future",
  },
  {
    label: "Content Ops",
    href: "#",
    status: "Future",
  },
  {
    label: "Settings",
    href: "#",
    status: "Future",
  },
];

export async function AdminShell({
  title,
  subtitle,
  eyebrow = "Internal admin",
  children,
}: AdminShellProps) {
  const accessStatus = getAdminAccessStatus();
  const hasAccess = await hasValidAdminAccessCookie();
  const isLocked = accessStatus.enabled && !hasAccess;

  return (
    <main className="min-h-screen bg-[#f7fbff]">
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[radial-gradient(circle_at_top_right,rgba(0,87,184,0.12),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
        spacing="lg"
      >
        <Container size="xl">
          <div className="grid gap-8 xl:grid-cols-[0.72fr_0.28fr] xl:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{eyebrow}</Badge>
                <Badge variant="neutral">noindex</Badge>
                <Badge variant="neutral">mock data</Badge>
                <Badge variant={accessStatus.enabled ? "blue" : "neutral"}>
                  {accessStatus.enabled ? "password gate" : "demo open"}
                </Badge>
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                {subtitle}
              </p>
            </div>

            <Card className="border-blue-100 bg-white" padding="md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Admin navigation
              </p>
              <nav aria-label="Internal admin navigation" className="mt-4 grid gap-2">
                {adminNavItems.map((item) =>
                  item.href === "#" ? (
                    <span
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500"
                      key={item.label}
                    >
                      {item.label}
                      <span className="text-xs uppercase tracking-[0.12em]">
                        {item.status}
                      </span>
                    </span>
                  ) : (
                    <Link
                      className="flex items-center justify-between rounded-2xl border border-blue-100 bg-[#f7fbff] px-4 py-3 text-sm font-semibold text-[#0057b8] transition hover:border-blue-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      href={item.href}
                      key={item.label}
                    >
                      {item.label}
                      <span className="text-xs uppercase tracking-[0.12em]">
                        {item.status}
                      </span>
                    </Link>
                  ),
                )}
              </nav>
            </Card>
          </div>

          {!isLocked && (
            <div className="mt-10">
              <AdminAccessNotice accessEnabled={accessStatus.enabled} />
            </div>
          )}
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="xl">
          {isLocked ? (
            <AdminAccessGate
              accessEnabled={accessStatus.enabled}
              initialHasAccess={false}
              passwordConfigured={accessStatus.passwordConfigured}
            />
          ) : (
            children
          )}
        </Container>
      </Section>
    </main>
  );
}
