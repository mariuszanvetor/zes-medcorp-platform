"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type AdminAccessGateProps = {
  accessEnabled: boolean;
  initialHasAccess: boolean;
  passwordConfigured: boolean;
  children?: ReactNode;
};

type VerifyAccessResponse = {
  success?: boolean;
  accessRequired?: boolean;
  mode?: "demo-open" | "protected";
  error?: string;
  retryAfterSeconds?: number;
};

export function AdminAccessGate({
  accessEnabled,
  initialHasAccess,
  passwordConfigured,
  children,
}: AdminAccessGateProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!accessEnabled || initialHasAccess) {
    return <>{children}</>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/verify-access", {
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json().catch(() => null)) as
        | VerifyAccessResponse
        | null;

      if (response.ok && body?.success) {
        window.sessionStorage.setItem("zes-admin-access", "verified");
        setPassword("");
        window.location.reload();
        return;
      }

      if (response.status === 429) {
        setMessage(
          `Prea multe încercări. Reîncercați după ${body?.retryAfterSeconds ?? 60} secunde.`,
        );
        return;
      }

      if (response.status === 503) {
        setMessage(
          "Protecția admin este activă, dar parola nu este configurată în mediul de producție.",
        );
        return;
      }

      setMessage("Parola introdusă nu este validă.");
    } catch {
      setMessage("Verificarea accesului nu a putut fi finalizată.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-wrap gap-2">
          <Badge variant="blue">Admin protected</Badge>
          <Badge variant="neutral">noindex</Badge>
          <Badge variant="neutral">internal only</Badge>
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
          Acces intern ZES
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Această zonă este destinată verificărilor interne. Introduceți parola
          de acces configurată în Vercel pentru a continua către instrumentele
          admin.
        </p>
        <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
          Protecția prin parolă este un prim strat de siguranță. Pentru leaduri
          reale și date private este necesară ulterior autentificare completă cu
          roluri și audit.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2" htmlFor="admin-access-password">
            <span className="text-sm font-semibold text-slate-950">
              Parolă admin
            </span>
            <input
              autoComplete="current-password"
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              disabled={!passwordConfigured || isSubmitting}
              id="admin-access-password"
              name="admin-access-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Introduceți parola internă"
              type="password"
              value={password}
            />
          </label>

          {message && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold leading-7 text-rose-800">
              {message}
            </p>
          )}

          {!passwordConfigured && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-7 text-amber-950">
              ADMIN_ACCESS_ENABLED este activ, dar ADMIN_ACCESS_PASSWORD lipsește.
              Configurați parola în variabilele server-side înainte de folosire.
            </p>
          )}

          <Button
            disabled={!passwordConfigured || !password.trim()}
            isLoading={isSubmitting}
            type="submit"
          >
            Verifică accesul
          </Button>
        </form>
      </Card>
    </div>
  );
}
