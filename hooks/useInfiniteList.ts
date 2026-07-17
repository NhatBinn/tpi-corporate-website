// hooks/useInfiniteList.ts
"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

interface UseInfiniteListOptions {
  gap?: number;
  intervalMs?: number;
  transitionMs?: number;
}

function useInfiniteList<T>(items: T[], options: UseInfiniteListOptions = {}) {
  const gap = options.gap ?? 16;
  const intervalMs = options.intervalMs ?? 5000;
  const transitionMs = options.transitionMs ?? 700;

  const realLength = items.length;
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  const [index, setIndex] = useState(realLength);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [firstCardEl, setFirstCardEl] = useState<HTMLElement | null>(null);

  const isAnimating = useRef(false);
  const cycleToken = useRef(0);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const STEP = cardWidth > 0 ? cardWidth + gap : 0;

  useEffect(() => {
    if (!firstCardEl) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setCardWidth(width);
    });
    observer.observe(firstCardEl);
    return () => observer.disconnect();
  }, [firstCardEl]);

  function settleCycle(token: number) {
    if (token !== cycleToken.current) return;
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }

    const needsWrap = index < realLength || index >= realLength * 2;

    if (needsWrap) {
      const offsetFromStart = index - realLength;
      const wrapped =
        ((offsetFromStart % realLength) + realLength) % realLength;

      setWithTransition(false);
      setIndex(realLength + wrapped);
    } else {
      isAnimating.current = false;
    }
  }

  function startCycle(nextIndex: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    cycleToken.current += 1;
    const token = cycleToken.current;

    setIndex(nextIndex);
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => settleCycle(token), transitionMs + 100);
  }

  function goNext() {
    startCycle(index + 1);
  }

  function goPrev() {
    startCycle(index - 1);
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused || STEP === 0) return;

    const timer = setInterval(goNext, intervalMs);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, STEP, intervalMs]);

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    settleCycle(cycleToken.current);
  }

  useEffect(() => {
    if (!withTransition) {
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          isAnimating.current = false;
        });
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [withTransition]);

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, []);

  const trackStyle: CSSProperties = {
    display: "flex",
    gap,
    transform: `translateX(-${index * STEP}px)`,
    transition: withTransition
      ? `transform ${transitionMs}ms cubic-bezier(0.65,0,0.35,1)`
      : "none",
  };

  return {
    goNext,
    goPrev,
    setIsPaused,
    handleTransitionEnd,
    tripled,
    trackStyle,
    firstCardRef: setFirstCardEl,
  };
}

export default useInfiniteList;
