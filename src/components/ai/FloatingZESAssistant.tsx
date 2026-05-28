"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { ZESGuide } from "@/components/ai/ZESGuide";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "zes_floating_assistant_state_v1";

type FloatingState = "open" | "minimized";

export function FloatingZESAssistant() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin/");
  const hiddenRoute = pathname === "/ai-discovery";
  const shouldRender = !isAdminRoute && !hiddenRoute;

  const [state, setState] = useState<FloatingState>("minimized");
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "open" || stored === "minimized") {
      setState(stored);
    } else {
      setState("minimized");
    }
    setBootstrapped(true);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !bootstrapped) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, state);
  }, [bootstrapped, shouldRender, state]);

  useEffect(() => {
    if (!shouldRender || !bootstrapped || state === "open") {
      return;
    }

    let opened = false;
    const timeout = window.setTimeout(() => {
      opened = true;
      setState("open");
    }, 5000);

    const onScroll = () => {
      if (opened) return;
      if (window.scrollY > 180) {
        opened = true;
        window.clearTimeout(timeout);
        setState("open");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bootstrapped, shouldRender, state]);

  const isOpen = state === "open";
  const buttonLabel = useMemo(
    () => (isOpen ? "Minimizeaza ZES" : "Discuta cu ZES"),
    [isOpen],
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[70] sm:bottom-6 sm:right-6">
      <div
        className={cn(
          "pointer-events-auto transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {isOpen && (
          <div className="mb-3 w-[min(92vw,26rem)] overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-[0_24px_80px_rgba(15,65,118,0.24)]">
            <div className="border-b border-blue-100 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    ZES AI Concierge
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Salut, sunt ZES. Descrie pe scurt ce ai nevoie si te ghidez.
                  </p>
                </div>
                <button
                  className="rounded-lg border border-blue-100 px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-[#0057b8]"
                  type="button"
                  onClick={() => setState("minimized")}
                >
                  Inchide
                </button>
              </div>
              <ul className="mt-2 grid gap-1 text-xs text-slate-600">
                <li>- service aparatura medicala</li>
                <li>- camere CT/RMN</li>
                <li>- radioprotectie</li>
                <li>- ofertare echipamente si proiecte medicale</li>
              </ul>
            </div>
            <div className="max-h-[72vh] overflow-y-auto p-3">
              <ZESGuide compactHeader mode="popup" />
            </div>
          </div>
        )}
      </div>

      <Button
        className={cn(
          "h-12 rounded-full px-5 shadow-[0_16px_42px_rgba(0,87,184,0.30)]",
          !isOpen && "animate-pulse",
        )}
        size="md"
        type="button"
        onClick={() => setState((current) => (current === "open" ? "minimized" : "open"))}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

