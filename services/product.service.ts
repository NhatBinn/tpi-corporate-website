import { Product } from "@/prisma/generated/prisma/client";
import { findProducts } from "@/repositories/product.repository";
import { err, ok, Result } from "@/types/result";

export async function getProducts(): Promise<Result<Product[]>> {
  try {
    const data = await findProducts();
    return ok(data);
  } catch (error) {
    console.log("~getProducts~", error);
    return err("Failed to get products");
  }
}
