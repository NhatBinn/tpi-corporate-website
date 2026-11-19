"use server";

import { adminDelete, adminSave } from "@/lib/admin-action";
import { projectCategorySchema, projectSchema } from "@/schemas/admin";
import * as service from "@/services/admin/project.service";
import type { FormValues } from "@/types/admin";

export async function saveProjectCategoryAction(id: string | null, values: FormValues) {
  return adminSave(projectCategorySchema, values, (data) => service.saveProjectCategory(id, data));
}

export async function deleteProjectCategoryAction(id: string) {
  return adminDelete(id, service.removeProjectCategory);
}

export async function saveProjectAction(id: string | null, values: FormValues) {
  return adminSave(projectSchema, values, (data) => service.saveProject(id, data));
}

export async function deleteProjectAction(id: string) {
  return adminDelete(id, service.removeProject);
}
