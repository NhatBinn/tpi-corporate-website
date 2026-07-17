"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useInfiniteList from "@/hooks/useInfiniteList";
import type { ProductItem } from "@/types/common";

function ProductsList({ products }: { products: ProductItem[] }) {
  const {
    goNext,
    goPrev,
    setIsPaused,
    handleTransitionEnd,
    tripled,
    trackStyle,
    firstCardRef,
  } = useInfiniteList(products, { gap: 24, intervalMs: 4000 });

  return (
    <div
      className="group mx-auto flex w-full items-center justify-center gap-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={goPrev}
        aria-label="Sản phẩm trước"
        className="hidden md:flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full
                bg-transparent text-[#1a1a1a] shadow-lg duration-200
                hover:border-[#0a8a3f] hover:text-[#0a8a3f] hover:shadow-xl
                opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        <ChevronLeft size={30} strokeWidth={2} />
      </button>

      <div className="w-full max-w-[calc(100vw-3rem)] overflow-hidden px-2 md:px-0 md:max-w-none">
        <div className="overflow-hidden py-6">
          <div onTransitionEnd={handleTransitionEnd} style={trackStyle}>
            {tripled.map((product, i) => (
              <Link
                key={i}
                ref={i === 0 ? firstCardRef : undefined}
                href={product.slug ? `/san-pham/${product.slug}` : "#"}
                className="group/card flex w-[150px] shrink-0 flex-col items-center text-center sm:w-[170px] lg:w-[190px]"
              >
                <div className="relative flex h-[140px] w-full items-center justify-center overflow-hidden bg-white shadow-sm">
                  <Image
                    src={product.imageUrl ?? "/placeholder-product.png"}
                    alt={product.name}
                    width={140}
                    height={100}
                    priority
                    className="h-auto max-h-[100px] w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover/card:scale-110"
                  />
                </div>
                <p className="mt-3 text-[13px] font-semibold leading-snug text-black">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={goNext}
        aria-label="Sản phẩm tiếp theo"
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

export default ProductsList;
