import { ProductsClient } from "@/components/admin/ProductsClient";
import { getAllProducts } from "@/services/product.service";

export default async function ProductsPage() {
  const res = await getAllProducts();
  return (
    <ProductsClient
      initialProducts={res.success ? res.data : []}
      initialError={res.success ? null : res.error}
    />
  );
}
