import Link from "next/link";
import ProductCategoryBrowser from "../common/ProductCategoryBrowser";
import { getCategoriesWithProducts } from "@/services/product.service";

export default async function HomeProductsSection() {
  const category = await getCategoriesWithProducts();
  if(!category.success) return <div>error</div>
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-6 py-12 md:py-16">
      <div className="mb-6 md:mb-8 flex items-start justify-between">
        <div>
          <p className="text-[13px] md:text-[14px] text-[#4a4a4a]">
            Một số <span className="font-bold text-black">Sản Phẩm Chính</span>
          </p>
          <h2 className="mt-1 text-[24px] md:text-[34px] leading-tight text-black">
            <span className="font-extrabold">Sản phẩm</span>
            <span className="font-normal"> của chúng tôi</span>
          </h2>
          <Link
            href="/san-pham"
            className="mt-2 inline-block text-[13px] md:text-[14px] font-semibold text-[#0a8a3f] hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        <svg
          viewBox="0 0 380 150"
          className="hidden md:block h-[80px] md:h-[120px] w-[300px] md:w-[450px]"
        >
          <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
          <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
        </svg>
      </div>

      <ProductCategoryBrowser
        categories={category.success ? category.data : []}
        columns={4}
        pageSize={8}
        variant="section"
        interaction="click"
      />
    </section>
  );
}
