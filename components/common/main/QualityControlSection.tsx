"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ParallaxLogo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const speed = 0.5; // tốc độ trôi so với scroll — số càng lớn di chuyển càng nhiều
    const smoothness = 0.1; // độ mượt — số càng nhỏ càng "trễ"/mượt, càng lớn càng bám sát scroll

    function handleScroll() {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      targetOffset.current = (viewportCenter - elCenter) * speed;
    }

    function animate() {
      currentOffset.current +=
        (targetOffset.current - currentOffset.current) * smoothness;
      setOffset(currentOffset.current);
      rafId.current = requestAnimationFrame(animate);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      className="absolute left-[8%] top-1/2 z-10 h-[110px] w-[180px] -translate-y-1/2 sm:h-[140px] sm:w-[220px]"
    >
      <svg viewBox="0 0 380 150" className="h-[120px] w-[450px]">
          <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
          <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
        </svg>
    </div>
  );
}

export default function QualityControlSection() {
  return (
    <section className="relative flex min-h-[1000px] items-center overflow-hidden">
      {/* Ảnh nền */}
      <Image
        src="/San-xuat-grayscale.jpg"
        alt="Nhà máy TPI tại Lái Thiêu, Bình Dương"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay tối để chữ luôn rõ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      {/* Logo mark đỏ - có parallax khi scroll */}
      <ParallaxLogo />

      {/* Khối nội dung */}
      <div className="relative z-10 ml-auto w-full max-w-[960px] px-6 sm:pr-16 mr-20">
        <div className="flex items-baseline gap-3">
          <span
            className="text-[64px] font-black leading-none text-[#0a8a3f]/30"
            style={{ textShadow: "0 0 24px rgba(10,138,63,0.5)" }}
          >
            02
          </span>
          <p className="-ml-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-white/80">
            Chủ Động Sản Xuất
          </p>
        </div>

        <h2 className="-mt-2 text-[34px] leading-tight text-white sm:text-[40px]">
          <span className="font-light">Kiểm soát </span>
          <span className="font-extrabold">CHẤT LƯỢNG</span>
        </h2>

        <p className="mt-5 text-[15px] leading-relaxed text-white/85">
          TPI sở hữu nhà máy diện tích 1,500m² tại khu vực Lái Thiêu, Bình
          Dương. Máy móc, trang thiết bị liên tục được đầu tư để đáp ứng sản
          xuất và kiểm soát chất lượng.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-white/85">
          Chúng tôi cũng thường xuyên tổ chức các buổi tham quan nhà máy cho quý
          khách hàng, đối tác, nhà cung cấp...
        </p>

        <div className="mt-7 flex items-center gap-4">
          <Link
            href="/gioi-thieu"
            className="rounded-full bg-[#0a8a3f] px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#097535]"
          >
            About Us
          </Link>
          <Link
            href="/du-an"
            className="rounded-full bg-white px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-white/90"
          >
            View More
          </Link>
        </div>

        {/* Box chứng nhận */}
        <div className="mt-8 inline-flex items-center px-5 py-3">
          <Image
            src="/AQS-VGBC.webp"
            alt="Chứng nhận ISO 9001:2015 - IQS Global và Vietnam Green Building Council"
            width={260}
            height={160}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
