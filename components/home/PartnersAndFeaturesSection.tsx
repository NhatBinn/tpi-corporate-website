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

const ARROW_CLASS =
  "hidden md:flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center text-[#1a1a1a] transition-colors hover:text-[#0a8a3f]";

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
      className="mx-auto flex w-full max-w-310 items-center justify-center gap-2 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={goPrev}
        aria-label="Xem đối tác trước"
        className={ARROW_CLASS}
      >
        <ChevronLeft size={30} strokeWidth={1.5} />
      </button>

      <div className="min-w-0 flex-1 overflow-hidden py-10">
        <div onTransitionEnd={handleTransitionEnd} style={trackStyle}>
          {tripled.map((partner, i) => (
            <div
              key={i}
              ref={i === 0 ? firstCardRef : undefined}
              className="flex h-32.5 w-30 shrink-0 items-center justify-center bg-white shadow-sm md:w-37.5 lg:w-42.5"
            >
              <Image
                src={partner.imageUrl!}
                alt={partner.name}
                width={140}
                height={90}
                loading="eager"
                className="h-auto max-h-22.5 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goNext}
        aria-label="Xem đối tác tiếp theo"
        className={ARROW_CLASS}
      >
        <ChevronRight size={30} strokeWidth={1.5} />
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
