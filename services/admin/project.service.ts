import * as repo from "@/repositories/admin/project.repository";
import type { ProjectCategoryInput, ProjectInput } from "@/schemas/admin";
import { runMutation, runQuery, upsert } from "./shared";

export const getAdminProjectCategories = () =>
  runQuery("getAdminProjectCategories", repo.findAdminProjectCategories);

export const getProjectCategoryOptions = () =>
  runQuery("getProjectCategoryOptions", repo.findProjectCategoryOptions);

export const saveProjectCategory = (id: string | null, data: ProjectCategoryInput) =>
  upsert("saveProjectCategory", id, data, data.name, repo.createProjectCategory, repo.updateProjectCategory);

export const removeProjectCategory = (id: string) =>
  runMutation("removeProjectCategory", () => repo.deleteProjectCategory(id));

export const getAdminProjects = () => runQuery("getAdminProjects", repo.findAdminProjects);

export const saveProject = (id: string | null, data: ProjectInput) =>
  upsert("saveProject", id, data, data.name, repo.createProject, repo.updateProject);

export const removeProject = (id: string) => runMutation("removeProject", () => repo.deleteProject(id));
