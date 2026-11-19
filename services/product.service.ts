import { cache } from "react";
import {
  findAllProducts,
  findCategoriesWithProducts,
  findProductsByCategory,
  findProductBySlug,
  findRelatedProducts,
} from "@/repositories/product.repository";
import { err, ok } from "@/types/result";
import type { Product, ProductStatus } from "@/types/product";

function deriveStatus(stock: number): ProductStatus {
  if (stock === 0) return "out_of_stock";
  if (stock < 10) return "low_stock";
  return "active";
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const data = await findProductsByCategory(categoryId);
    return ok(data);
  } catch (error) {
    console.log("~getProductsByCategory~", error);
    return err("Failed to get Products");
  }
}

export async function getCategoriesWithProducts() {
  try {
    const data = await findCategoriesWithProducts();
    return ok(data);
  } catch (error) {
    console.log("~getCategoriesWithProducts~", error);
    return err("Failed to get Category");
  }
}

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

export async function getAllProducts() {
  try {
    const data = await findAllProducts();
    return ok(
      data.map((p): Product => ({
        id: p.id,
        name: p.name,
        category: p.category.name,
        price: Number(p.price ?? 0),
        stock: p.stock ?? 0,
        status: deriveStatus(p.stock ?? 0),
      }))
    );
  } catch (error) {
    console.log("~getAllProducts~", error);
    return err("Failed to get All Products");
  }
}
