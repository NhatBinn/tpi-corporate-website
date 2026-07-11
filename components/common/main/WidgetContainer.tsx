"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  eyebrow: string;
  titleLight: string;
  titleBold: string;
  readMoreHref: string;
  viewMoreHref: string;
}

const slides: Slide[] = [
  {
    image: "/Slider-8.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
  {
    image: "/Slider-3.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
  {
    image: "/alternative-energy-slide-2.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
  {
    image: "/Betong-duc-san.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
  {
    image: "/oncrete-in-the-construction-e1736084881793.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
  {
    image: "/Vua-tu-san.webp",
    eyebrow: "Hệ sản phẩm cho",
    titleLight: "Nhà máy bê tông",
    titleBold: "ĐÚC SẴN",
    readMoreHref: "/giai-phap/be-tong-duc-san",
    viewMoreHref: "/san-pham",
  },
];

const STRIP_COUNT = 100; // số dải dọc — nhiều hơn = mượt/tinh hơn, ít hơn = "chunky" hơn
const STRIP_DURATION_MS = 600; // thời gian mỗi dải tự mở
const MAX_DELAY_MS = 380; // độ trễ tối đa (dải chính giữa)
const AUTO_INTERVAL_MS = 6000;

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const transitioning = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (transitioning.current || nextIndex === currentIndex) return;
      transitioning.current = true;
      setPendingIndex(nextIndex);
      setRevealed(false);

      // Đợi 2 khung hình để trạng thái "ẩn" được vẽ trước khi bật animate,
      // tránh trình duyệt gộp chung 2 lần set state vào 1 lần vẽ (mất hiệu ứng)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setRevealed(true));
      });

      const totalDuration = STRIP_DURATION_MS + MAX_DELAY_MS;
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setPendingIndex(null);
        transitioning.current = false;
      }, totalDuration);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentIndex],
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % slides.length);
  }, [currentIndex, goTo]);

  const goPrev = () => goTo((currentIndex - 1 + slides.length) % slides.length);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(goNext, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const current = slides[currentIndex];
  const incoming = pendingIndex !== null ? slides[pendingIndex] : null;

  return (
    <div
      className="relative h-186 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide hiện tại - nền dưới cùng */}
      <Image
        src={current.image}
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Slide sắp vào - chia dải dọc, lan từ 2 mép vào giữa */}
      {incoming && (
        <div className="absolute inset-0 flex">
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const center = (STRIP_COUNT - 1) / 2;
            const distanceFromEdge = Math.min(i, STRIP_COUNT - 1 - i);
            const delay = Math.round(
              (distanceFromEdge / center) * MAX_DELAY_MS,
            );

            return (
              <div
                key={i}
                className="relative h-full overflow-hidden"
                style={{
                  width: `${100 / STRIP_COUNT}%`,
                  clipPath: revealed
                    ? "inset(0% 0 0% 0)"
                    : "inset(50% 0 50% 0)",
                  transition: `clip-path ${STRIP_DURATION_MS}ms cubic-bezier(0.65,0,0.35,1)`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {/* Sprite kỹ thuật: div rộng bằng cả ảnh, dịch trái đúng vị trí dải i,
                    để khi ghép 20 dải lại, ảnh khớp liền mạch như chưa từng bị cắt */}
                <div
                  className="absolute inset-0"
                  style={{
                    width: `${STRIP_COUNT * 100}%`,
                    left: `-${i * 100}%`,
                  }}
                >
                  <Image
                    src={incoming.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute inset-0 bg-black/35" />

      {/* Nội dung */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[16px] text-white/80">{current.eyebrow}</p>
        <h2 className="mt-2 text-[56px] font-light leading-none text-white sm:text-[64px]">
          {current.titleLight}
        </h2>
        <h2 className="mt-1 text-[56px] font-black leading-none text-white sm:text-[64px]">
          {current.titleBold}
        </h2>

        <div className="mt-8 flex items-center gap-4">
          <Link
            href={current.readMoreHref}
            className="rounded-full bg-[#0a8a3f] px-8 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#097535]"
          >
            Read More
          </Link>
          <Link
            href={current.viewMoreHref}
            className="rounded-full border border-white px-8 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black"
          >
            View More
          </Link>
        </div>
      </div>

      <button
        onClick={goPrev}
        aria-label="Slide trước"
        className="cursor-pointer absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
      >
        <ChevronLeft size={42} />
      </button>
      <button
        onClick={goNext}
        aria-label="Slide tiếp theo"
        className="cursor-pointer absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
      >
        <ChevronRight size={42} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 cursor-pointer">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Đi tới slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
