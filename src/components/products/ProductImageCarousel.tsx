"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type ProductGalleryImage = {
  url: string;
  alt: string;
  verified: boolean;
};

type ProductImageCarouselProps = {
  images: ProductGalleryImage[];
  title: string;
};

export function ProductImageCarousel({ images, title }: ProductImageCarouselProps) {
  const safeImages = images.length ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  const goToPrevious = useCallback(() => {
    if (!safeImages.length) return;
    setActiveIndex((index) => (index === 0 ? safeImages.length - 1 : index - 1));
  }, [safeImages.length]);

  const goToNext = useCallback(() => {
    if (!safeImages.length) return;
    setActiveIndex((index) => (index === safeImages.length - 1 ? 0 : index + 1));
  }, [safeImages.length]);

  return (
    <div
      aria-label={`Galerie imagini produs ${title}`}
      className="rounded-3xl border border-blue-100 bg-white p-4 shadow-[0_24px_70px_rgba(15,65,118,0.14)]"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goToPrevious();
        if (event.key === "ArrowRight") goToNext();
      }}
      role="region"
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#f8fbff]">
        {activeImage && (
          <Image
            alt={activeImage.alt || title}
            className="aspect-[4/3] h-full w-full object-contain p-6"
            height={760}
            priority
            sizes="(min-width: 1024px) 44vw, 92vw"
            src={activeImage.url}
            width={960}
          />
        )}
        {safeImages.length > 1 && (
          <>
            <button
              aria-label="Imaginea anterioara"
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-white"
              onClick={goToPrevious}
              type="button"
            >
              &lt;
            </button>
            <button
              aria-label="Imaginea urmatoare"
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-white"
              onClick={goToNext}
              type="button"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {safeImages.slice(0, 10).map((image, index) => (
            <button
              aria-label={`Afiseaza imaginea ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`overflow-hidden rounded-xl border bg-white transition ${
                index === activeIndex ? "border-[#0057b8] ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-200"
              }`}
              key={`${image.url}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt={`${image.alt || title} - imagine ${index + 1}`}
                className="aspect-square w-full object-contain p-2"
                height={160}
                loading="lazy"
                sizes="96px"
                src={image.url}
                width={160}
              />
            </button>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">
        {safeImages.length > 1
          ? "Folositi sagetile sau thumbnail-urile pentru a naviga intre imaginile produsului."
          : "Imagine produs."}
      </p>
    </div>
  );
}
