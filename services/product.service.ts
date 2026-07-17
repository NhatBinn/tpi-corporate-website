import { findProductsByCategoryId } from "@/repositories/product.repository";
import { err, ok } from "@/types/result";

export async function getProductsByCategoryId(categoryId: string) {
  try {
    const data = await findProductsByCategoryId(categoryId);
    return ok(data);
  } catch (error) {
    console.log("~getProductsByCategoryId~", error);
    return err("Failed to get products");
  }
}
