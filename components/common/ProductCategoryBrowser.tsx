"use client";

import { useState } from "react";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { ProductCategoryBrowserProps } from "@/types/common";
import { cn } from "@/lib/utils";
import ProductCardBody from "./ProductCard";

export default function ProductCategoryBrowser({
  categories,
  columns = 5,
  pageSize,
  variant = "nav",
  interaction = variant === "nav" ? "hover" : "click",
  initialCategoryId,
}: ProductCategoryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState(
    initialCategoryId && categories.some((c) => c.id === initialCategoryId)
      ? initialCategoryId
      : (categories[0]?.id ?? ""),
  );
  const [page, setPage] = useState(0);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const size = pageSize ?? columns * 2;
  const allProducts = activeCategoryData?.products ?? [];
  const totalPages = Math.max(1, Math.ceil(allProducts.length / size));
  const visibleProducts = allProducts.slice(page * size, page * size + size);
  const isSection = variant === "section";

  function selectCategory(key: string) {
    setActiveCategory(key);
    setPage(0);
  }

  const categoryTriggerProps = (key: string) =>
    interaction === "hover"
      ? { onMouseEnter: () => selectCategory(key), onFocus: () => selectCategory(key) }
      : { onClick: () => selectCategory(key) };

  return (
    <div className={cn("flex w-full flex-col md:flex-row", isSection ? "md:gap-5" : "max-w-310")}>
      <div
        className={cn(
          "flex w-full flex-row overflow-x-auto md:flex-col",
          isSection ? "gap-1 bg-[#f2f2f2] px-4 py-4 md:w-75 md:shrink-0 md:px-6 md:py-6" : "md:w-70",
        )}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={isActive}
              {...categoryTriggerProps(cat.id)}
              className={cn(
                "shrink-0 cursor-pointer text-left font-bold transition-colors",
                isSection
                  ? cn(
                      "px-3 py-2 text-[13px] uppercase tracking-wide md:px-0 md:text-[14px]",
                      isActive ? "text-brand-red" : "text-black hover:text-brand",
                    )
                  : cn(
                      "flex items-center justify-between px-4 py-3 text-[13px] md:px-6 md:py-4 md:text-[15px]",
                      isActive ? "bg-white text-black" : "bg-brand text-white hover:bg-brand-dark",
                    ),
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Bản section: lưới có kẻ ô như web gốc (viền trái/trên ở khung, viền phải/dưới ở từng ô). */}
        <div
          className={cn(
            "grid",
            columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-5",
            isSection ? "border-l border-t border-[#e5e5e5]" : "gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8",
          )}
        >
          {visibleProducts.map((p) =>
            isSection ? (
              <Link
                key={p.id}
                href={`/san-pham/${p.slug}`}
                className="group flex flex-col items-center border-b border-r border-[#e5e5e5] p-3 text-center transition-colors hover:bg-[#fafafa] md:p-5"
              >
                <ProductCardBody product={p} />
              </Link>
            ) : (
              <NavigationMenuLink
                key={p.id}
                className="group flex flex-col items-center text-center"
                render={
                  <Link href={`/san-pham/${p.slug}`}>
                    <ProductCardBody product={p} />
                  </Link>
                }
              />
            ),
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Trang ${i + 1}`}
                aria-current={i === page}
                className={cn(
                  "h-2.5 w-2.5 cursor-pointer rounded-full border transition-colors",
                  i === page ? "border-black bg-black" : "border-[#c4c4c4] bg-transparent hover:border-black",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
