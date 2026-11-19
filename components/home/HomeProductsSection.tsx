import Link from "next/link";
import ProductCategoryBrowser from "../common/ProductCategoryBrowser";
import RedStripes from "../common/RedStripes";
import { getProductCatalog } from "@/services/product.service";

export default async function HomeProductsSection() {
  const catalog = await getProductCatalog();
  if (!catalog.success) return null;

  return (
    <section className="container-site py-12 md:py-16">
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
            href="/san-pham#danh-muc"
            className="mt-2 inline-block text-[13px] md:text-[14px] font-semibold text-brand hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        <RedStripes className="hidden md:block h-30 w-75 lg:w-112.5" />
      </div>

      <ProductCategoryBrowser
        categories={catalog.data}
        columns={4}
        pageSize={8}
        variant="section"
        interaction="click"
      />
    </section>
  );
}
