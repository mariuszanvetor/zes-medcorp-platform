import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export type AdminAccessNoticeProps = {
  accessEnabled?: boolean;
};

export function AdminAccessNotice({
  accessEnabled = false,
}: AdminAccessNoticeProps) {
  return (
    <Card
      className="border-amber-200 bg-amber-50 text-amber-950 shadow-none"
      padding="md"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="critical">Admin demo mode</Badge>
            <Badge variant={accessEnabled ? "blue" : "neutral"}>
              {accessEnabled ? "Password gate active" : "No real auth"}
            </Badge>
            <Badge variant="neutral">No real lead storage</Badge>
          </div>
          <p className="mt-4 text-sm font-semibold leading-7">
            Prototip intern. Date demo. Nu există încă autentificare completă,
            bază de date, CRM sau stocare reală de leaduri.
          </p>
          <p className="mt-2 text-sm leading-7">
            Nu folosiți acest spațiu cu date reale de client până când există
            autentificare cu roluri, audit log, politici de acces și storage
            aprobat.
          </p>
        </div>
        <p className="max-w-sm text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-amber-800">
          {accessEnabled
            ? "Temporary protection: password gate enabled."
            : "Future requirement: protected admin access before production data."}
        </p>
      </div>
    </Card>
  );
}
