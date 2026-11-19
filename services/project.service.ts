import { cache } from "react";
import {
  findProjectsByCategory,
  findProjectsBySlug,
  findProjectsCategories,
  findRelatedProjects,
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

export async function getProjectsByCategory(categorySlug: string) {
  try {
    const data = await findProjectsByCategory(categorySlug);
    return ok(data);
  } catch (error) {
    console.log("~getProjectsByCategory~", error);
    return err("Failed to get projects");
  }
}

// cache(): generateMetadata và page gọi cùng slug trong 1 request → chỉ query DB 1 lần.
export const getProjectsBySlug = cache(async (slug: string) => {
  try {
    const data = await findProjectsBySlug(slug);
    if (!data) return err("Không tìm thấy dự án");
    return ok(data);
  } catch (error) {
    console.log("~getProjectsBySlug~", error);
    return err("Failed to get project");
  }
});

export async function getRelatedProjects(categoryId: string, excludeSlug: string) {
  try {
    const data = await findRelatedProjects(categoryId, excludeSlug);
    return ok(data);
  } catch (error) {
    console.log("~getRelatedProjects~", error);
    return err("Failed to get related projects");
  }
}
