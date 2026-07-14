"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ProductCard, ProductCategoryBrowserProps } from "@/types/common";

export default function ProductCategoryBrowser({
  categories,
  columns = 5,
  pageSize,
  variant = "nav",
  interaction = variant === "nav" ? "hover" : "click",
}: ProductCategoryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [page, setPage] = useState(0);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const size = pageSize ?? columns * 2;
  const allProducts = activeCategoryData?.products ?? [];
  const totalPages = Math.max(1, Math.ceil(allProducts.length / size));
  const visibleProducts = allProducts.slice(page * size, page * size + size);

  function selectCategory(key: string) {
    setActiveCategory(key);
    setPage(0);
  }

  const categoryTriggerProps = (key: string) =>
    interaction === "hover"
      ? {
          onMouseEnter: () => selectCategory(key),
          onFocus: () => selectCategory(key),
        }
      : { onClick: () => selectCategory(key) };

  return (
    <div
      className={`flex flex-col md:flex-row ${variant === "nav" ? "w-full max-w-[1240px]" : "w-full"}`}
    >
      {variant === "nav" ? (
        <div className="flex w-full md:w-[280px] flex-row md:flex-col overflow-x-auto">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                {...categoryTriggerProps(cat.id)}
                className={`shrink-0 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-left text-[13px] md:text-[15px] font-bold transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-[#0a8a3f] text-white hover:bg-[#097535]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full md:w-[300px] flex-row md:flex-col overflow-x-auto gap-1 bg-[#f2f2f2] px-4 md:px-6 py-4 md:py-6">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                {...categoryTriggerProps(cat.id)}
                className={`shrink-0 py-2 px-3 md:px-0 text-left text-[13px] md:text-[14px] font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-[#e5173f]"
                    : "text-black hover:text-[#0a8a3f]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      <div
        className={`flex flex-1 flex-col justify-between ${
          variant === "section"
            ? "border border-t-0 md:border-t md:border-l-0 border-[#e5e5e5] p-4 md:p-8"
            : ""
        }`}
      >
        <div
          className={`grid gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 ${
            columns === 4
              ? "grid-cols-2 md:grid-cols-4"
              : "grid-cols-2 md:grid-cols-5"
          }`}
        >
          {visibleProducts.map((p) =>
            variant === "nav" ? (
              <NavigationMenuLink
                key={p.name}
                className="group flex flex-col items-center text-center"
                render={
                  <Link href={p.slug}>
                    <ProductCardBody product={p} />
                  </Link>
                }
              />
            ) : (
              <Link
                key={p.id}
                href={p.slug}
                className="group flex flex-col items-center text-center"
              >
                <ProductCardBody product={p} />
              </Link>
            ),
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Trang ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                  i === page
                    ? "border-black bg-black"
                    : "border-[#c4c4c4] bg-transparent hover:border-black"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCardBody({ product }: { product: ProductCard }) {
  return (
    <>
      <div className="relative h-[100px] md:h-[130px] w-full overflow-hidden">
        <Image
          src={product.imageUrl ?? ""}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <p className="mt-2 md:mt-3 text-[12px] md:text-[13px] leading-snug text-[#4a4a4a]">
        <span className="font-bold text-black">{product.name}</span>
        {" – "}
        {product.description}
      </p>
    </>
  );
}
