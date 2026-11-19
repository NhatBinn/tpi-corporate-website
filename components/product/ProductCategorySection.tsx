import { getProductsByCategory } from "@/services/product.service";
import ProductsList from "./ProductsList";

async function ProductCategorySection() {
  const products = await getProductsByCategory("cat-chat-thao-khuon");
  if (!products.success || products.data.length === 0) return null;

  return (
    <section>
      <div className="border-b border-gray-300">
        <h2 className="-mb-px inline-block border-b-2 border-brand pb-2 text-[20px] md:text-[24px] font-medium uppercase">
          Chất tháo khuôn
        </h2>
      </div>
      <div className="mt-6 md:mt-8">
        <ProductsList products={products.data} />
      </div>
    </section>
  );
}

export default ProductCategorySection;
