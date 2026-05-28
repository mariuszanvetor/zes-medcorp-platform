export const ZES_POPUP_OPEN_EVENT = "zes:open-popup";

export type ZESPopupOpenDetail = {
  prompt?: string;
  source?: string;
};

export function openZESPopup(detail: ZESPopupOpenDetail = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ZESPopupOpenDetail>(ZES_POPUP_OPEN_EVENT, {
      detail,
    }),
  );
}
