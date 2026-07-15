import { findCategoryByProduct } from "@/repositories/category.repository";
import { ok, err } from "@/types/result";

export async function getCategoryByProduct() {
  try {
    const data = await findCategoryByProduct();
    return ok(data);
  } catch (error) {
    console.log("~getCategoryByProduct~", error);
    return err("Failed to get Category");
  }
}
