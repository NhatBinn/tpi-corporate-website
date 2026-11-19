import { cache } from "react";
import {
  findCategoriesWithProducts,
  findHighlightedProducts,
  findProductsByCategory,
  findProductBySlug,
  findRelatedProducts,
} from "@/repositories/product.repository";
import { err, ok } from "@/types/result";
import type { CategoryWithProducts } from "@/types/common";

export async function getProductsByCategory(categoryId: string) {
  try {
    const data = await findProductsByCategory(categoryId);
    return ok(data);
  } catch (error) {
    console.log("~getProductsByCategory~", error);
    return err("Failed to get Products");
  }
}

// Danh mục thật + 2 tab ảo "Nổi bật" / "Mới" (theo cờ isFeatured / isNew) như web gốc.
// cache(): Header (mega menu) và trang chủ / trang sản phẩm dùng chung trong 1 request.
export const getProductCatalog = cache(async () => {
  try {
    const [categories, highlighted] = await Promise.all([
      findCategoriesWithProducts(),
      findHighlightedProducts(),
    ]);
    const pick = (flag: "isFeatured" | "isNew") =>
      highlighted
        .filter((p) => p[flag])
        .map(({ id, name, slug, imageUrl, description }) => ({ id, name, slug, imageUrl, description }));

    const virtual: CategoryWithProducts[] = [
      { id: "noi-bat", name: "Nổi bật", slug: "noi-bat", products: pick("isFeatured") },
      { id: "moi", name: "Mới", slug: "moi", products: pick("isNew") },
    ].filter((c) => c.products.length > 0);

    return ok([...virtual, ...categories]);
  } catch (error) {
    console.log("~getProductCatalog~", error);
    return err("Failed to get product catalog");
  }
});

// cache(): generateMetadata và page gọi cùng slug trong 1 request → chỉ query DB 1 lần.
export const getProductBySlug = cache(async (slug: string) => {
  try {
    const data = await findProductBySlug(slug);
    if (!data) return err("Không tìm thấy sản phẩm");
    return ok(data);
  } catch (error) {
    console.log("~getProductBySlug~", error);
    return err("Lỗi khi lấy sản phẩm");
  }
});

export async function getRelatedProducts(categoryId: string, excludeSlug: string) {
  try {
    const data = await findRelatedProducts(categoryId, excludeSlug);
    return ok(data);
  } catch (error) {
    console.log("~getRelatedProducts~", error);
    return err("Lỗi khi lấy sản phẩm liên quan");
  }
}
