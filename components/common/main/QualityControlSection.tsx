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

    const speed = 0.5;
    const smoothness = 0.1;

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
      className="absolute left-[8%] top-1/2 z-10 h-[70px] w-[120px] -translate-y-1/2 sm:h-[100px] sm:w-[160px] md:h-[140px] md:w-[220px]"
    >
      <svg viewBox="0 0 380 150" className="h-[80px] w-[250px] md:h-[120px] md:w-[450px]">
          <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
          <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
        </svg>
    </div>
  );
}

export default function QualityControlSection() {
  return (
    <section className="relative flex min-h-[400px] md:min-h-[1000px] items-center overflow-hidden">
      <Image
        src="/San-xuat-grayscale.jpg"
        alt="Nhà máy TPI tại Lái Thiêu, Bình Dương"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      <ParallaxLogo />

      <div className="relative z-10 mx-auto md:ml-auto w-full max-w-[960px] px-4 sm:px-6 md:pr-16 md:mr-20">
        <div className="flex items-baseline gap-3">
          <span
            className="text-[40px] md:text-[64px] font-black leading-none text-[#0a8a3f]/30"
            style={{ textShadow: "0 0 24px rgba(10,138,63,0.5)" }}
          >
            02
          </span>
          <p className="-ml-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.15em] text-white/80">
            Chủ Động Sản Xuất
          </p>
        </div>

        <h2 className="-mt-2 text-[28px] md:text-[40px] leading-tight text-white">
          <span className="font-light">Kiểm soát </span>
          <span className="font-extrabold">CHẤT LƯỢNG</span>
        </h2>

        <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-white/85">
          TPI sở hữu nhà máy diện tích 1,500m² tại khu vực Lái Thiêu, Bình
          Dương. Máy móc, trang thiết bị liên tục được đầu tư để đáp ứng sản
          xuất và kiểm soát chất lượng.
        </p>

        <p className="mt-3 md:mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/85">
          Chúng tôi cũng thường xuyên tổ chức các buổi tham quan nhà máy cho quý
          khách hàng, đối tác, nhà cung cấp...
        </p>

        <div className="mt-6 md:mt-7 flex items-center gap-4">
          <Link
            href="/gioi-thieu"
            className="rounded-full bg-[#0a8a3f] px-6 py-2.5 md:px-7 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#097535]"
          >
            About Us
          </Link>
          <Link
            href="/du-an"
            className="rounded-full bg-white px-6 py-2.5 md:px-7 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-white/90"
          >
            View More
          </Link>
        </div>

        <div className="mt-6 md:mt-8 inline-flex items-center px-3 md:px-5 py-3">
          <Image
            src="/AQS-VGBC.webp"
            alt="Chứng nhận ISO 9001:2015 - IQS Global và Vietnam Green Building Council"
            width={200}
            height={120}
            className="object-contain w-[160px] md:w-[260px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
