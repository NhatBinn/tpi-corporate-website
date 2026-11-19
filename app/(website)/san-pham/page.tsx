import Features from "@/components/common/Features";
import ProductCategoryBrowser from "@/components/common/ProductCategoryBrowser";
import SectionTitle from "@/components/common/SectionTitle";
import SolutionForm from "@/components/common/SolutionForm";
import HeroBanner from "@/components/product/HeroBanner";
import ProductCategorySection from "@/components/product/ProductCategorySection";
import { getProductCatalog } from "@/services/product.service";

type Props = { searchParams: Promise<{ "danh-muc"?: string | string[] }> };

async function ProductHome({ searchParams }: Props) {
  const params = await searchParams;
  const slug = Array.isArray(params["danh-muc"]) ? params["danh-muc"][0] : params["danh-muc"];
  const catalog = await getProductCatalog();
  const categories = catalog.success ? catalog.data : [];
  const initialCategoryId = categories.find((c) => c.slug === slug)?.id;

  return (
    <>
      <HeroBanner />
      <section className="container-site py-12 md:py-16">
        <ProductCategorySection />

        {categories.length > 0 && (
          <div id="danh-muc" className="mt-16 scroll-mt-6 md:mt-20">
            <SectionTitle className="font-medium uppercase md:text-[24px]">Danh mục sản phẩm</SectionTitle>
            <div className="mt-6 md:mt-8">
              <ProductCategoryBrowser
                categories={categories}
                columns={4}
                pageSize={12}
                variant="section"
                interaction="click"
                initialCategoryId={initialCategoryId}
              />
            </div>
          </div>
        )}

        <div className="mt-16 md:mt-20">
          <SolutionForm />
        </div>
      </section>
      <Features />
    </>
  );
}

export default ProductHome;
