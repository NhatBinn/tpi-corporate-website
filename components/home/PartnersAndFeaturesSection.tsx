"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Features from "../common/Features";

const partners = [
  { name: "DELTA-V", src: "/Delta-V-250x250.webp" },
  { name: "DELTA", src: "/Delta-250x250.webp" },
  { name: "BCONS", src: "/Unicons-250x250.webp" },
  { name: "TUẤN LÊ", src: "/Tuan-Le-250x250.webp" },
  { name: "PHƯỚC THÀNH", src: "/Phuoc-Thanh-250x250.webp" },
  { name: "ECOBA", src: "/Ecoba-250x250.webp" },
  { name: "HÒA BÌNH", src: "/Hoa-Binh-250x250.webp" },
  { name: "COTECCONS", src: "/Coteccons-250x250.webp" },
  { name: "CENTRAL", src: "/Central-250x250.webp" },
  { name: "NEWTECONS", src: "/Newtecons-250x250.webp" },
  { name: "Ricons", src: "/Ricons-250x250.webp" },
];

const DESKTOP_CARD_WIDTH = 170;
const CARD_GAP = 16;
const STEP = DESKTOP_CARD_WIDTH + CARD_GAP;
const INTERVAL_MS = 5000;

function PartnersCarousel() {
  const realLength = partners.length;
  const tripled = useMemo(() => [...partners, ...partners, ...partners], []);

  const [index, setIndex] = useState(realLength);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isAdjusting = useRef(false);

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => setIndex((i) => i - 1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(goNext, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  function handleTransitionEnd() {
    if (isAdjusting.current) return;

    if (index >= realLength * 2) {
      isAdjusting.current = true;
      setWithTransition(false);
      setIndex((i) => i - realLength);
    } else if (index < realLength) {
      isAdjusting.current = true;
      setWithTransition(false);
      setIndex((i) => i + realLength);
    }
  }

  useEffect(() => {
    if (!withTransition) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setWithTransition(true);
          isAdjusting.current = false;
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [withTransition]);

  return (
    <div
      className="mx-auto flex w-fit items-center justify-center gap-2"
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
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex ${
              withTransition
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              gap: CARD_GAP,
              transform: `translateX(-${index * STEP}px)`,
            }}
          >
            {tripled.map((partner, i) => (
              <div
                key={i}
                className="flex w-[120px] md:w-[150px] lg:w-[170px] shrink-0 items-center justify-center bg-white shadow-sm"
                style={{ height: 130 }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={140}
                  height={90}
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
