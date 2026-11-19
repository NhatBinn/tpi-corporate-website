"use server";

import { adminDelete, adminSave } from "@/lib/admin-action";
import { productCategorySchema, productSchema, tagSchema } from "@/schemas/admin";
import * as service from "@/services/admin/catalog.service";
import type { FormValues } from "@/types/admin";

export async function saveProductCategoryAction(id: string | null, values: FormValues) {
  return adminSave(productCategorySchema, values, (data) => service.saveProductCategory(id, data));
}

export async function deleteProductCategoryAction(id: string) {
  return adminDelete(id, service.removeProductCategory);
}

export async function saveTagAction(id: string | null, values: FormValues) {
  return adminSave(tagSchema, values, (data) => service.saveTag(id, data));
}

export async function deleteTagAction(id: string) {
  return adminDelete(id, service.removeTag);
}

export async function saveProductAction(id: string | null, values: FormValues) {
  return adminSave(productSchema, values, (data) => service.saveProduct(id, data));
}

export async function deleteProductAction(id: string) {
  return adminDelete(id, service.removeProduct);
}
