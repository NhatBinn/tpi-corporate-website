import { getProductsByCategoryId } from "@/services/product.service";
import ProductsList from "./ProductsList";

async function ProductCategorySection() {
  const products = await getProductsByCategoryId("cat-thao-khuon");
  if (!products.success) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <section>
      <div className="border-b border-gray-300">
        <h1 className="inline-block border-b-[2px] border-[#1fa247] pb-2 text-[24px] font-medium uppercase">
          CHẤT THÁO KHUÔN
        </h1>
      </div>
      <div className="mt-8">
        <ProductsList products={products.data}/>
      </div>
    </section>
  );
}

export default ProductCategorySection;
