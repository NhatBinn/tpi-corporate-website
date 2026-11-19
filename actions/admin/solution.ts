"use server";

import { adminDelete, adminSave } from "@/lib/admin-action";
import { solutionCategorySchema, solutionSchema } from "@/schemas/admin";
import * as service from "@/services/admin/solution.service";
import type { FormValues } from "@/types/admin";

export async function saveSolutionCategoryAction(id: string | null, values: FormValues) {
  return adminSave(solutionCategorySchema, values, (data) => service.saveSolutionCategory(id, data));
}

export async function deleteSolutionCategoryAction(id: string) {
  return adminDelete(id, service.removeSolutionCategory);
}

export async function saveSolutionAction(id: string | null, values: FormValues) {
  return adminSave(solutionSchema, values, (data) => service.saveSolution(id, data));
}

export async function deleteSolutionAction(id: string) {
  return adminDelete(id, service.removeSolution);
}
