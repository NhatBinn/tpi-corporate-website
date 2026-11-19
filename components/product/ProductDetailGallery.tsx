"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string | null;
}

interface Props {
  images: GalleryImage[];
  productName: string;
}

export default function ProductDetailGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = images[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div
          className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm border border-[#e5e5e5] bg-white"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={current.url}
            alt={current.alt ?? productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#4a4a4a] opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn size={15} />
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                  i === activeIndex
                    ? "border-[#0a8a3f]"
                    : "border-[#e5e5e5] hover:border-[#0a8a3f]/50"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt ?? `${productName} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-[90vw]">
            <Image
              src={current.url}
              alt={current.alt ?? productName}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            className="absolute right-4 top-4 text-white/70 hover:text-white text-3xl leading-none"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
