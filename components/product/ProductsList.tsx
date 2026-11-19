"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useInfiniteList from "@/hooks/useInfiniteList";
import type { ProductItem } from "@/types/common";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";

// Ít sản phẩm hơn số ô hiển thị thì carousel vô hạn sẽ lặp lại chính nó → hiện dạng lưới tĩnh.
const MIN_FOR_CAROUSEL = 7;

const ARROW_CLASS =
  "hidden md:flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent text-[#1a1a1a] shadow-lg duration-200 hover:text-brand hover:shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity";

function ProductTile({ product, cardRef }: { product: ProductItem; cardRef?: (el: HTMLElement | null) => void }) {
  return (
    <Link
      ref={cardRef}
      href={product.slug ? `/san-pham/${product.slug}` : "#"}
      className="group/card flex w-37.5 shrink-0 flex-col items-center text-center sm:w-42.5 lg:w-47.5"
    >
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-white shadow-sm">
        <Image
          src={product.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={product.name}
          width={160}
          height={130}
          loading="eager"
          className="h-auto max-h-32 w-auto max-w-[85%] object-contain transition-transform duration-500 group-hover/card:scale-110"
        />
      </div>
      <p className="mt-3 text-[13px] font-semibold leading-snug text-black transition-colors group-hover/card:text-brand">
        {product.name}
      </p>
    </Link>
  );
}

function ProductsCarousel({ products }: { products: ProductItem[] }) {
  const { goNext, goPrev, setIsPaused, handleTransitionEnd, tripled, trackStyle, firstCardRef } =
    useInfiniteList(products, { gap: 24, intervalMs: 4000 });

  return (
    <div
      className="group mx-auto flex w-full items-center justify-center gap-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button onClick={goPrev} aria-label="Sản phẩm trước" className={ARROW_CLASS}>
        <ChevronLeft size={30} strokeWidth={2} />
      </button>

      <div className="min-w-0 flex-1 overflow-hidden py-6">
        <div onTransitionEnd={handleTransitionEnd} style={trackStyle}>
          {tripled.map((product, i) => (
            <ProductTile key={i} product={product} cardRef={i === 0 ? firstCardRef : undefined} />
          ))}
        </div>
      </div>

      <button onClick={goNext} aria-label="Sản phẩm tiếp theo" className={ARROW_CLASS}>
        <ChevronRight size={30} strokeWidth={2} />
      </button>
    </div>
  );
}

function ProductsList({ products }: { products: ProductItem[] }) {
  if (products.length >= MIN_FOR_CAROUSEL) return <ProductsCarousel products={products} />;

  return (
    <div className="flex flex-wrap justify-center gap-6 py-6">
      {products.map((product) => (
        <ProductTile key={product.id ?? product.name} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
