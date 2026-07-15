import Features from "@/components/common/Features";
import SolutionForm from "@/components/common/SolutionForm";
import HeroBanner from "@/components/product/HeroBanner";
import ProductCategorySection from "@/components/product/ProductCategorySection";

function ProductHome() {
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-350 px-4 md:px-6 py-12 md:py-16">
        <ProductCategorySection />
        <SolutionForm />
        <Features />
      </section>
    </>
  );
}

export default ProductHome;
