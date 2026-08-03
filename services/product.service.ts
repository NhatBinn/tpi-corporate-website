import {
  findCategoriesWithProducts,
  findProductsByCategory,
} from "@/repositories/product.repository";
import { err, ok } from "@/types/result";

export async function getProductsByCategory(categoryId: string) {
  try {
    const data = await findProductsByCategory(categoryId);
    return ok(data);
  } catch (error) {
    console.log("~getProductsByCategory~", error);
    return err("Failed to get products");
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
