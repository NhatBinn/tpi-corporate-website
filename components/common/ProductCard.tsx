import Image from "next/image";
import type { ProductCard } from "@/types/common";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function ProductCardBody({ product }: { product: ProductCard }) {
  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden p-2 md:p-3">
        <Image
          src={product.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 120px, 180px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 md:mt-3 text-[12px] md:text-[13px] leading-snug text-[#4a4a4a]">
        <span className="font-bold text-black">{product.name}</span>
        {product.description && ` – ${product.description}`}
      </p>
    </>
  );
}
