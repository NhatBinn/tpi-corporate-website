"use client";
import { useEffect, useRef, useState } from "react";
import RedStripes from "./RedStripes";

export function ParallaxLogo({ position = false }: { position: boolean }) {
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

  // Chỉ hiện từ lg (màn hẹp hơn thì hai vạch đỏ đè lên chữ). Bên trái: góc trên như web gốc, tránh khối chữ bên phải.
  return (
    <div
      ref={wrapperRef}
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      className={`absolute z-10 hidden lg:block h-35 w-55
         ${position ? "top-1/2 -translate-y-1/2 right-[14%]" : "top-10 left-[9%]"}`}
    >
      <RedStripes className="h-30 w-75 xl:w-112.5" />
    </div>
  );
}
