"use client";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div
      ref={wrapperRef}
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      className={`absolute top-1/2 z-10 h-[70px] w-[120px] -translate-y-1/2 sm:h-[100px] sm:w-[160px] md:h-[140px] md:w-[220px]
         ${position ? "right-[22%]" : "left-[8%]"}`}
    >
      <svg
        viewBox="0 0 380 150"
        className="h-[80px] w-[250px] md:h-[120px] md:w-[450px]"
      >
        <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
        <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
      </svg>
    </div>
  );
}
