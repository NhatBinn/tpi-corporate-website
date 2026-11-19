import * as repo from "@/repositories/admin/catalog.repository";
import type { ProductCategoryInput, ProductInput, TagInput } from "@/schemas/admin";
import { runMutation, runQuery, upsert } from "./shared";

// ------------------------------------------------------------
// DANH MỤC SẢN PHẨM
// ------------------------------------------------------------
export const getAdminProductCategories = () =>
  runQuery("getAdminProductCategories", repo.findAdminProductCategories);

export const getProductCategoryOptions = () =>
  runQuery("getProductCategoryOptions", repo.findProductCategoryOptions);

export function saveProductCategory(id: string | null, data: ProductCategoryInput) {
  if (id && data.parentId === id) {
    return Promise.resolve({ success: false as const, error: "Danh mục không thể là cha của chính nó" });
  }
  return upsert("saveProductCategory", id, data, data.name, repo.createProductCategory, repo.updateProductCategory);
}

export const removeProductCategory = (id: string) =>
  runMutation("removeProductCategory", () => repo.deleteProductCategory(id));

// ------------------------------------------------------------
// TAG
// ------------------------------------------------------------
export const getAdminTags = () => runQuery("getAdminTags", repo.findAdminTags);
export const getTagOptions = () => runQuery("getTagOptions", repo.findTagOptions);

export const saveTag = (id: string | null, data: TagInput) =>
  upsert("saveTag", id, data, data.name, repo.createTag, repo.updateTag);

export const removeTag = (id: string) => runMutation("removeTag", () => repo.deleteTag(id));

// ------------------------------------------------------------
// SẢN PHẨM
// ------------------------------------------------------------
export const getAdminProducts = () => runQuery("getAdminProducts", repo.findAdminProducts);
export const getProductOptions = () => runQuery("getProductOptions", repo.findProductOptions);

export const saveProduct = (id: string | null, data: ProductInput) =>
  upsert("saveProduct", id, data, data.name, repo.createProduct, repo.updateProduct);

export const removeProduct = (id: string) => runMutation("removeProduct", () => repo.deleteProduct(id));
