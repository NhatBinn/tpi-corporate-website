"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";

interface UseInfiniteListOptions {
  gap?: number;
  intervalMs?: number;
  transitionMs?: number;
}

// Render 3 bản sao danh sách và luôn giữ index trong bản giữa: trượt ra ngoài
// thì nhảy về vị trí tương ứng ở bản giữa (không animation) → vòng lặp vô hạn.
function useInfiniteList<T>(items: T[], options: UseInfiniteListOptions = {}) {
  const { gap = 16, intervalMs = 5000, transitionMs = 700 } = options;
  const length = items.length;
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  const [index, setIndex] = useState(length);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [firstCardEl, setFirstCardEl] = useState<HTMLElement | null>(null);

  // Ref thay vì state để setInterval / setTimeout luôn đọc giá trị mới nhất.
  const indexRef = useRef(length);
  const animating = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = cardWidth > 0 ? cardWidth + gap : 0;

  useEffect(() => {
    if (!firstCardEl) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setCardWidth(width);
    });
    observer.observe(firstCardEl);
    return () => observer.disconnect();
  }, [firstCardEl]);

  const settle = useCallback(() => {
    if (settleTimer.current) {
      clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    const current = indexRef.current;
    if (current >= length && current < length * 2) {
      animating.current = false;
      return;
    }
    const wrapped = length + ((((current - length) % length) + length) % length);
    indexRef.current = wrapped;
    setWithTransition(false);
    setIndex(wrapped);
  }, [length]);

  const move = useCallback(
    (delta: number) => {
      if (animating.current || length === 0) return;
      animating.current = true;
      indexRef.current += delta;
      setIndex(indexRef.current);
      // transitionend không bắn khi tab bị ẩn → timer dự phòng để index không trôi mãi.
      settleTimer.current = setTimeout(settle, transitionMs + 100);
    },
    [length, settle, transitionMs],
  );

  const goNext = useCallback(() => move(1), [move]);
  const goPrev = useCallback(() => move(-1), [move]);

  useEffect(() => {
    if (isPaused || step === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      if (!document.hidden) goNext();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, step, intervalMs, goNext]);

  function handleTransitionEnd(e: TransitionEvent<HTMLElement>) {
    // Bỏ qua transition của phần tử con (hover ảnh...) bubble lên.
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    settle();
  }

  useEffect(() => {
    if (withTransition) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setWithTransition(true);
        animating.current = false;
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [withTransition]);

  useEffect(() => {
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const trackStyle: CSSProperties = {
    display: "flex",
    gap,
    transform: `translateX(-${index * step}px)`,
    transition: withTransition ? `transform ${transitionMs}ms cubic-bezier(0.65,0,0.35,1)` : "none",
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
