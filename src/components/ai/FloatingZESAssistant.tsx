"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { ZESGuide } from "@/components/ai/ZESGuide";
import { Button } from "@/components/ui/Button";
import { ZES_POPUP_OPEN_EVENT, type ZESPopupOpenDetail } from "@/lib/zes-popup";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "zes_floating_assistant_state_v1";

type FloatingState = "open" | "minimized" | "closed";

type FloatingStorage = {
  state: FloatingState;
  hasAutoOpened: boolean;
};

export function FloatingZESAssistant() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin/");
  const hiddenRoute = pathname === "/ai-discovery";
  const shouldRender = !isAdminRoute && !hiddenRoute;

  const [state, setState] = useState<FloatingState>("minimized");
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [promptSeed, setPromptSeed] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setState("minimized");
      setHasAutoOpened(false);
      setBootstrapped(true);
      return;
    }

    if (stored === "open" || stored === "minimized") {
      setState(stored);
      setHasAutoOpened(stored === "open");
      setBootstrapped(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as FloatingStorage;
      if (
        parsed &&
        (parsed.state === "open" ||
          parsed.state === "minimized" ||
          parsed.state === "closed")
      ) {
        setState(parsed.state);
        setHasAutoOpened(Boolean(parsed.hasAutoOpened));
      } else {
        setState("minimized");
        setHasAutoOpened(false);
      }
    } catch {
      setState("minimized");
      setHasAutoOpened(false);
    }
    setBootstrapped(true);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !bootstrapped) {
      return;
    }

    const storageValue: FloatingStorage = {
      state,
      hasAutoOpened,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageValue));
  }, [bootstrapped, hasAutoOpened, shouldRender, state]);

  useEffect(() => {
    if (
      !shouldRender ||
      !bootstrapped ||
      state === "open" ||
      state === "closed" ||
      hasAutoOpened
    ) {
      return;
    }

    let opened = false;
    const timeout = window.setTimeout(() => {
      opened = true;
      setState("open");
      setHasAutoOpened(true);
    }, 5000);

    const onScroll = () => {
      if (opened) return;
      if (window.scrollY > 180) {
        opened = true;
        window.clearTimeout(timeout);
        setState("open");
        setHasAutoOpened(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bootstrapped, hasAutoOpened, shouldRender, state]);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const onOpenRequest = (event: Event) => {
      const customEvent = event as CustomEvent<ZESPopupOpenDetail>;
      setState("open");
      setHasAutoOpened(true);

      const prompt = customEvent.detail?.prompt?.trim();
      if (prompt) {
        setPromptSeed(`${Date.now()}:${prompt}`);
      }
    };

    window.addEventListener(ZES_POPUP_OPEN_EVENT, onOpenRequest as EventListener);
    return () => {
      window.removeEventListener(ZES_POPUP_OPEN_EVENT, onOpenRequest as EventListener);
    };
  }, [shouldRender]);

  const isOpen = state === "open";
  const buttonLabel = useMemo(
    () => (isOpen ? "Minimizeaza ZES" : "Discuta cu ZES"),
    [isOpen],
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-[70] sm:bottom-6 sm:right-6">
      <div
        className={cn(
          "pointer-events-auto mb-3 w-[min(96vw,25.5rem)] overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-[0_24px_70px_rgba(15,65,118,0.24)] transition-all duration-300",
          isOpen
            ? "max-h-[80vh] translate-y-0 opacity-100"
            : "max-h-0 translate-y-2 opacity-0 pointer-events-none",
        )}
      >
        <div className="border-b border-blue-100 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] px-3.5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                ZES Copilot
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                <span
                  aria-hidden
                  className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                />
                <span>Asistent infrastructura medicala</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Minimizeaza ZES"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-[#0057b8]"
                type="button"
                onClick={() => setState("minimized")}
              >
                -
              </button>
              <button
                aria-label="Inchide ZES"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-[#0057b8]"
                type="button"
                onClick={() => setState("closed")}
              >
                x
              </button>
            </div>
          </div>
        </div>
        <div className="h-[min(78vh,38rem)] p-2 sm:p-3">
          <ZESGuide compactHeader externalPromptToken={promptSeed} mode="popup" />
        </div>
      </div>

      <Button
        className={cn(
          "h-11 rounded-full px-4 text-sm shadow-[0_16px_42px_rgba(0,87,184,0.30)] sm:h-12 sm:px-5 sm:text-base",
          !isOpen && "animate-pulse",
        )}
        size="md"
        type="button"
        onClick={() => {
          if (isOpen) {
            setState("minimized");
            return;
          }
          setHasAutoOpened(true);
          setState("open");
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
