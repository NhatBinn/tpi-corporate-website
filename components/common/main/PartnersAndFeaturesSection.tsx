"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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

const VISIBLE_COUNT = 8;
const CARD_WIDTH = 180;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;
const VIEWPORT_WIDTH =
  VISIBLE_COUNT * CARD_WIDTH + (VISIBLE_COUNT - 1) * CARD_GAP;
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
      className="group mx-auto flex w-fit items-center justify-center gap-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={goPrev}
        aria-label="Xem đối tác trước"
        className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full 
                bg-transparent text-[#1a1a1a] shadow-lg duration-200 
                hover:border-[#0a8a3f] hover:text-[#0a8a3f] hover:shadow-xl
                opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <ChevronLeft size={30} strokeWidth={2} />
      </button>

      <div className="overflow-hidden py-10" style={{ width: VIEWPORT_WIDTH }}>
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
              style={{ width: CARD_WIDTH, height: 140 }}
              className="flex shrink-0 items-center justify-center bg-white shadow-sm"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={100}
                className="h-auto w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goNext}
        aria-label="Xem đối tác tiếp theo"
        className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full
                bg-transparent text-[#1a1a1a] shadow-lg duration-200
                hover:border-[#0a8a3f] hover:text-[#0a8a3f] hover:shadow-xl
                opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <ChevronRight size={30} strokeWidth={2} />
      </button>
    </div>
  );
}

const features = [
  {
    label: "Giao hàng",
    sub: "Toàn quốc",
    link: "/giao-hang",
    icon: (
      <svg viewBox="0 0 40 46" fill="none" className="h-20 w-28">
        <path
          d="M4 32V14a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v18"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path
          d="M28 20h9l6 7v5a2 2 0 0 1-2 2h-2"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <circle cx="13" cy="34" r="3.5" stroke="#0a8a3f" strokeWidth="2" />
        <circle cx="35" cy="34" r="3.5" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M16.5 34h15" stroke="#0a8a3f" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Thanh toán",
    sub: "Linh hoạt",
    link: "/thanh-toan",
    icon: (
      <svg viewBox="0 0 40 46" fill="none" className="h-20 w-28">
        <rect
          x="5"
          y="12"
          width="30"
          height="21"
          rx="2"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path d="M5 19h30" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M10 27h8" stroke="#0a8a3f" strokeWidth="2" />
        <circle
          cx="38"
          cy="30"
          r="8"
          fill="white"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path
          d="M34.5 30l2.3 2.3 4.7-4.7"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Dịch vụ",
    sub: "Hướng dẫn mua hàng",
    link: "/dich-vu",
    icon: (
      <svg viewBox="0 0 40 46" fill="none" className="h-20 w-28">
        <circle cx="24" cy="15" r="7" stroke="#0a8a3f" strokeWidth="2" />
        <path
          d="M10 40v-3c0-6 6-10 14-10s14 4 14 10v3"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path d="M32 12a5 5 0 0 1 0 10" stroke="#0a8a3f" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Bảo mật",
    sub: "Thông tin khách hàng",
    link: "/bao-mat",
    icon: (
      <svg viewBox="0 0 40 46" fill="none" className="h-20 w-28">
        <path
          d="M24 5l16 6v11c0 10-7 17-16 21-9-4-16-11-16-21V11z"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M17 24l5 5 9-10"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Đổi trả",
    sub: "Chính sách đổi trả",
    link: "/doi-tra",
    icon: (
      <svg viewBox="0 0 40 46" fill="none" className="h-20 w-28">
        <path
          d="M8 18l16-9 16 9-16 9-16-9z"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M8 18v14l16 9 16-9V18" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M24 27v14" stroke="#0a8a3f" strokeWidth="2" />
        <path
          d="M31 8l4 4-4 4"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 12c0 5-4 8-9 8"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function PartnersAndFeaturesSection() {
  return (
    <>
      {/* Phần 1: Carousel đối tác trên nền ảnh công trình */}
      <section className="relative flex min-h-[380px] items-center overflow-hidden">
        <Image
          src="/Cong-Truong-tong-hop-1398x606-BW.webp"
          alt="Congtruongtonghop"
          fill
          className="object-fill"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/30" />

        <div className="relative z-10 w-full">
          <PartnersCarousel />
        </div>
      </section>

      {/* Phần 2: Hàng tiện ích */}
      <section className="mx-auto max-w-[1380px] px-2 py-13">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {features.map((feature) => (
            <Link href={feature.link} key={feature.label}>
              <div className="flex items-center gap-3">
                {feature.icon}
                <div>
                  <p className="text-[16px] font-bold uppercase text-black">
                    {feature.label}
                  </p>
                  <p className="text-[14px] text-[#9a9a9a]">{feature.sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
