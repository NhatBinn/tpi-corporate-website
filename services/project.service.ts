import {
  findProjectsByCategory,
  findProjectsBySlug,
  findProjectsCategories,
} from "@/repositories/project.repository";
import { err, ok } from "@/types/result";

export async function getProjectsCategories() {
  try {
    const data = await findProjectsCategories();
    return ok(data);
  } catch (error) {
    console.log("~getProjectsCategories~", error);
    return err("Failed to get projects");
  }
}

export async function getProjectsByCategory(categoryId: string) {
  try {
    const data = await findProjectsByCategory(categoryId);
    return ok(data);
  } catch (error) {
    console.log("~getProjectsByCategory~", error);
    return err("Failed to get projects");
  }
}

export async function getProjectsBySlug(slug: string) {
  try {
    const data = await findProjectsBySlug(slug);
    if (!data) return err("Cant get projects");
    return ok(data);
  } catch (error) {
    console.log("~getProjectsByCategory~", error);
    return err("Failed to get projects");
  }
}
