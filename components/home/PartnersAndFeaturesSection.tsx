"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useInfiniteList from "@/hooks/useInfiniteList";
import Features from "../common/Features";
import type { PartnerItem } from "@/types/common";

const partners: PartnerItem[] = [
  { name: "DELTA-V", imageUrl: "/Delta-V-250x250.webp" },
  { name: "DELTA", imageUrl: "/Delta-250x250.webp" },
  { name: "BCONS", imageUrl: "/Unicons-250x250.webp" },
  { name: "TUẤN LÊ", imageUrl: "/Tuan-Le-250x250.webp" },
  { name: "PHƯỚC THÀNH", imageUrl: "/Phuoc-Thanh-250x250.webp" },
  { name: "ECOBA", imageUrl: "/Ecoba-250x250.webp" },
  { name: "HÒA BÌNH", imageUrl: "/Hoa-Binh-250x250.webp" },
  { name: "COTECCONS", imageUrl: "/Coteccons-250x250.webp" },
  { name: "CENTRAL", imageUrl: "/Central-250x250.webp" },
  { name: "NEWTECONS", imageUrl: "/Newtecons-250x250.webp" },
  { name: "Ricons", imageUrl: "/Ricons-250x250.webp" },
];

function PartnersCarousel() {
  const {
    goNext,
    goPrev,
    setIsPaused,
    handleTransitionEnd,
    tripled,
    trackStyle,
    firstCardRef,
  } = useInfiniteList(partners, { gap: 16, intervalMs: 5000 });

  return (
    <div
      className="mx-auto flex w-full items-center justify-center gap-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={goPrev}
        aria-label="Xem đối tác trước"
        className="hidden md:flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full 
                bg-transparent text-[#1a1a1a] shadow-lg duration-200 
                hover:border-[#0a8a3f] hover:text-[#0a8a3f] hover:shadow-xl
                opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        <ChevronLeft size={30} strokeWidth={2} />
      </button>

      <div className="w-full max-w-[calc(100vw-3rem)] overflow-hidden px-2 md:px-0 md:max-w-none">
        <div className="overflow-hidden py-10">
          <div onTransitionEnd={handleTransitionEnd} style={trackStyle}>
            {tripled.map((partner, i) => (
              <div
                key={i}
                ref={i === 0 ? firstCardRef : undefined}
                className="flex w-[120px] md:w-[150px] lg:w-[170px] shrink-0 items-center justify-center bg-white shadow-sm"
                style={{ height: 130 }}
              >
                <Image
                  src={partner.imageUrl!}
                  alt={partner.name}
                  width={140}
                  height={90}
                  priority
                  className="h-auto w-auto max-h-[90px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={goNext}
        aria-label="Xem đối tác tiếp theo"
        className="hidden md:flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full
                bg-transparent text-[#1a1a1a] shadow-lg duration-200
                hover:border-[#0a8a3f] hover:text-[#0a8a3f] hover:shadow-xl
                opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        <ChevronRight size={30} strokeWidth={2} />
      </button>
    </div>
  );
}

export default function PartnersAndFeaturesSection() {
  return (
    <>
      <section className="relative flex min-h-[300px] md:min-h-[380px] items-center overflow-hidden">
        <Image
          src="/Cong-Truong-tong-hop-1398x606-BW.webp"
          alt="Congtruongtonghop"
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/30" />
        <div className="relative z-10 w-full">
          <PartnersCarousel />
        </div>
      </section>
      <Features />
    </>
  );
}
