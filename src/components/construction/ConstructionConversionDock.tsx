"use client";

import { useEffect, useState } from "react";

import { constructionSite } from "@/data/construction-site";
import { ConstructionLeadForm } from "@/components/construction/ConstructionLeadForm";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type ConstructionConversionDockProps = {
  sourcePage: string;
  contextLabel?: string;
};

export function ConstructionConversionDock({
  sourcePage,
  contextLabel = "lucrare rezidentiala",
}: ConstructionConversionDockProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionKey = "zes_construct_popup_seen";
    const params = new URLSearchParams(window.location.search);
    const paidTraffic =
      params.has("gclid") ||
      params.has("gbraid") ||
      params.has("wbraid") ||
      params.has("msclkid") ||
      params.has("ttclid") ||
      Boolean(params.get("utm_source")?.toLowerCase().includes("tiktok")) ||
      ["cpc", "ppc", "paid", "paid_search", "paid-social", "paid_social"].some((token) =>
        Boolean(params.get("utm_medium")?.toLowerCase().includes(token)),
      );

    try {
      if (window.sessionStorage.getItem(sessionKey)) return;
    } catch {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setIsOpen(true);
        pushIntentEvent("auto_popup_open", sourcePage);

        try {
          window.sessionStorage.setItem(sessionKey, "true");
        } catch {
          // Non-critical: popup frequency is a UX enhancement, not data storage.
        }
      },
      paidTraffic ? 3500 : 12000,
    );

    return () => window.clearTimeout(timeout);
  }, [sourcePage]);

  function openPopup(action: string) {
    setIsOpen(true);
    pushIntentEvent(action, sourcePage);
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#d8d0c2] bg-[#f7f3ea]/96 px-3 py-2 shadow-[0_-12px_36px_rgba(23,22,20,0.14)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            className="inline-flex min-h-11 items-center justify-center border border-[#d8d0c2] bg-white px-3 text-xs font-black uppercase tracking-[0.08em] text-[#171614]"
            href={constructionSite.phoneHref}
            onClick={() => pushIntentEvent("mobile_call_click", sourcePage)}
          >
            Suna
          </a>
          <a
            className="inline-flex min-h-11 items-center justify-center border border-[#d9b56d]/55 bg-white px-3 text-xs font-black uppercase tracking-[0.08em] text-[#5d421c]"
            href={constructionSite.whatsappHref}
            onClick={() => pushIntentEvent("mobile_whatsapp_click", sourcePage)}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
          <button
            className="inline-flex min-h-11 items-center justify-center bg-[#171614] px-3 text-xs font-black uppercase tracking-[0.08em] text-white"
            onClick={() => openPopup("mobile_offer_open")}
            type="button"
          >
            Deviz
          </button>
        </div>
      </div>

      <aside className="fixed bottom-6 right-6 z-[70] hidden items-end gap-2 md:flex md:flex-col">
        <div className="border border-[#d8d0c2] bg-[#f7f3ea]/94 p-2 shadow-[0_18px_60px_rgba(23,22,20,0.16)] backdrop-blur">
          <button
            className="inline-flex min-h-12 items-center justify-center bg-[#171614] px-5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#9b7334]"
            onClick={() => openPopup("desktop_offer_open")}
            type="button"
          >
            Deviz rapid
          </button>
        </div>
        <div className="flex gap-2">
          <a
            className="inline-flex min-h-11 items-center justify-center border border-[#d8d0c2] bg-white/94 px-4 text-xs font-black uppercase tracking-[0.08em] text-[#171614] shadow-[0_12px_40px_rgba(23,22,20,0.10)] transition hover:border-[#b78d45]"
            href={constructionSite.phoneHref}
            onClick={() => pushIntentEvent("desktop_call_click", sourcePage)}
          >
            Suna
          </a>
          <a
            className="inline-flex min-h-11 items-center justify-center border border-[#d9b56d]/55 bg-[#fff8e8] px-4 text-xs font-black uppercase tracking-[0.08em] text-[#5d421c] shadow-[0_12px_40px_rgba(23,22,20,0.10)] transition hover:bg-[#d9b56d] hover:text-[#171614]"
            href={constructionSite.whatsappHref}
            onClick={() => pushIntentEvent("desktop_whatsapp_click", sourcePage)}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </aside>

      {isOpen && (
        <div
          aria-label="Primeste un prim raspuns pentru lucrare"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#171614]/72 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
        >
          <section className="grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[#f7f3ea] shadow-[0_30px_100px_rgba(0,0,0,0.42)] md:grid-cols-[0.82fr_1.18fr]">
            <aside className="hidden bg-[#171614] p-8 text-[#f7f3ea] md:block">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d9b56d]">
                Contact rapid
              </p>
              <h2
                className="mt-4 text-3xl font-semibold leading-tight"
                id="constructii-popup-title"
              >
                Primeste un prim raspuns pentru {contextLabel}.
              </h2>
              <div className="mt-8 grid gap-4 text-sm leading-7 text-white/72">
                <p className="border-t border-white/14 pt-4">
                  Spune zona, tipul lucrarii si termenul dorit.
                </p>
                <p className="border-t border-white/14 pt-4">
                  Revenim cu intrebarile care conteaza pentru deviz.
                </p>
                <p className="border-t border-white/14 pt-4">
                  Poti continua pe telefon sau WhatsApp.
                </p>
              </div>
            </aside>
            <div className="p-4 sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-4 md:hidden">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b7334]">
                    Contact rapid
                  </p>
                  <h2
                    className="mt-2 text-2xl font-semibold leading-tight text-[#171614]"
                    id="constructii-popup-title-mobile"
                  >
                    Primeste un prim raspuns pentru lucrare
                  </h2>
                </div>
                <button
                  aria-label="Inchide formularul rapid"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#d8d0c2] bg-white text-xl font-semibold text-[#5f5a50] transition hover:bg-[#eee7da]"
                  onClick={() => {
                    setIsOpen(false);
                    pushIntentEvent("popup_close", sourcePage);
                  }}
                  type="button"
                >
                  x
                </button>
              </div>
              <button
                aria-label="Inchide formularul rapid"
                className="mb-2 ml-auto hidden h-10 w-10 shrink-0 items-center justify-center border border-[#d8d0c2] bg-white text-xl font-semibold text-[#5f5a50] transition hover:bg-[#eee7da] md:flex"
                onClick={() => {
                  setIsOpen(false);
                  pushIntentEvent("popup_close", sourcePage);
                }}
                type="button"
              >
                x
              </button>
              <ConstructionLeadForm
                anchorId="oferta-popup"
                compact
                mode="quick"
                sourcePage={`${sourcePage}-popup`}
                surface="embedded"
                title="Te sunam pentru clarificari si urmatorul pas"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function pushIntentEvent(action: string, sourcePage: string) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "construction_contact_intent",
    action,
    sourcePage,
    path: window.location.pathname,
    url: window.location.href,
  });
}
