"use server";

import { adminDelete, adminSave } from "@/lib/admin-action";
import { postCategorySchema, postSchema } from "@/schemas/admin";
import * as service from "@/services/admin/blog.service";
import type { FormValues } from "@/types/admin";

export async function savePostCategoryAction(id: string | null, values: FormValues) {
  return adminSave(postCategorySchema, values, (data) => service.savePostCategory(id, data));
}

export async function deletePostCategoryAction(id: string) {
  return adminDelete(id, service.removePostCategory);
}

export async function savePostAction(id: string | null, values: FormValues) {
  return adminSave(postSchema, values, (data) => service.savePost(id, data));
}

export async function deletePostAction(id: string) {
  return adminDelete(id, service.removePost);
}
