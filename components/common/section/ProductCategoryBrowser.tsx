"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export interface ProductCategory {
  key: string;
  label: string;
}

export interface Product {
  name: string;
  desc: string;
  image: string;
  href: string;
}

interface ProductCategoryBrowserProps {
  categories: ProductCategory[];
  productsByCategory: Record<string, Product[]>;
  columns?: 4 | 5;
  pageSize?: number;
  variant?: "nav" | "section";
  interaction?: "hover" | "click";
}

export default function ProductCategoryBrowser({
  categories,
  productsByCategory,
  columns = 5,
  pageSize,
  variant = "nav",
  interaction = variant === "nav" ? "hover" : "click",
}: ProductCategoryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key);
  const [page, setPage] = useState(0);

  const size = pageSize ?? columns * 2;
  const allProducts = productsByCategory[activeCategory] ?? [];
  const totalPages = Math.max(1, Math.ceil(allProducts.length / size));
  const visibleProducts = allProducts.slice(page * size, page * size + size);

  function selectCategory(key: string) {
    setActiveCategory(key);
    setPage(0);
  }

  // Gộp chung logic sự kiện cho nút category, dùng lại ở cả 2 biến thể sidebar bên dưới.
  // interaction === "hover": đổi category khi rê chuột/focus (dùng cho dropdown navbar)
  // interaction === "click": chỉ đổi khi bấm (dùng cho section tĩnh trên trang)
  const categoryTriggerProps = (key: string) =>
    interaction === "hover"
      ? {
          onMouseEnter: () => selectCategory(key),
          onFocus: () => selectCategory(key),
        }
      : { onClick: () => selectCategory(key) };

  return (
    <div className={`flex ${variant === "nav" ? "w-[1240px]" : "w-full"}`}>
      {/* Sidebar */}
      {variant === "nav" ? (
        <div className="flex w-[280px] flex-col">
          {categories.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                {...categoryTriggerProps(cat.key)}
                className={`flex items-center justify-between px-6 py-4 text-left text-[15px] font-bold transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-[#0a8a3f] text-white hover:bg-[#097535]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[560px] w-[300px] shrink-0 flex-col gap-1 bg-[#f2f2f2] px-6 py-6">
          {categories.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                {...categoryTriggerProps(cat.key)}
                className={`py-2 text-left text-[14px] font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-[#e5173f]"
                    : "text-black hover:text-[#0a8a3f]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid sản phẩm */}
      <div
        className={`flex flex-1 flex-col justify-between ${
          variant === "section" ? "border border-l-0 border-[#e5e5e5] p-8" : ""
        }`}
      >
        <div
          className={`grid gap-x-6 gap-y-8 ${
            columns === 4 ? "grid-cols-4" : "grid-cols-5"
          }`}
        >
          {visibleProducts.map((p) =>
            variant === "nav" ? (
              <NavigationMenuLink
                key={p.name}
                className="group flex flex-col items-center text-center"
                render={
                  <Link href={p.href}>
                    <ProductCardBody product={p} />
                  </Link>
                }
              />
            ) : (
              <Link
                key={p.name}
                href={p.href}
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

function ProductCardBody({ product }: { product: Product }) {
  return (
    <>
      <div className="relative h-[130px] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <p className="mt-3 text-[13px] leading-snug text-[#4a4a4a]">
        <span className="font-bold text-black">{product.name}</span>
        {" – "}
        {product.desc}
      </p>
    </>
  );
}
